---
description: Hướng dẫn chi tiết xây dựng ứng dụng web phân quyền (Role-Based) với React + Vite + TypeScript + TailwindCSS + Supabase. Bao gồm database design, RLS, auth, routing, layouts, CRUD, notifications realtime, và các pattern tránh lỗi.
---

# Xây Dựng App Phân Quyền với React + Supabase

> Skill này đúc kết từ kinh nghiệm xây dựng PickleBall Pro – hệ thống quản lý sân thể thao với 3 role: Admin, Staff, Customer. Áp dụng được cho mọi app quản lý tương tự (booking, quản lý kho, CRM, LMS, v.v.)

---

## PHẦN 1: KHỞI TẠO DỰ ÁN

### 1.1 Tạo project Vite + React + TypeScript

```bash
npx -y create-vite@latest ./ --template react-ts
npm install
```

### 1.2 Cài dependencies

```bash
# Core
npm install @supabase/supabase-js react-router-dom zustand lucide-react date-fns

# UI & Charts (nếu cần)
npm install recharts

# CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 1.3 Cấu hình TailwindCSS

**tailwind.config.js:**
```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Hiệu ứng glassmorphism */
.glass-strong {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Animations */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up { animation: slide-up 0.3s ease-out forwards; }

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
```

### 1.4 Cấu trúc thư mục chuẩn

```
src/
├── components/         # Components dùng chung
│   ├── AdminLayout.tsx    # Layout sidebar cho admin/staff
│   ├── CustomerLayout.tsx # Layout header cho customer
│   └── NotificationBell.tsx
├── lib/
│   ├── supabase.ts     # Supabase client init
│   └── helpers.ts      # Hàm format, utils
├── pages/              # Tất cả các trang
│   ├── AuthPage.tsx       # Đăng nhập/Đăng ký
│   ├── DashboardPage.tsx  # Admin dashboard
│   └── ...
├── store/
│   └── authStore.ts    # Zustand store cho auth state
├── types/
│   └── index.ts        # TypeScript interfaces
├── App.tsx             # Router + Auth logic
└── main.tsx
```

---

## PHẦN 2: SUPABASE SETUP

### 2.1 Khởi tạo Supabase Client

**src/lib/supabase.ts:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**`.env` (ở root):**
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

> ⚠️ **QUAN TRỌNG**: Luôn dùng prefix `VITE_` cho env variables trong Vite.

### 2.2 Tạo bảng `profiles` – PHẢI LÀM ĐẦU TIÊN

Đây là bảng trung tâm cho phân quyền. Mọi user đăng ký sẽ tự động có record ở đây.

```sql
-- Bảng profiles liên kết với auth.users
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'staff', 'customer')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bật RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admin can view all profiles"
  ON profiles FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admin can update any profile"
  ON profiles FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
```

### 2.3 Trigger tự tạo profile khi user đăng ký

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'  -- Mặc định là customer
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

> ⚠️ **LƯU Ý**: Trigger này dùng `SECURITY DEFINER` vì nó cần INSERT vào `profiles` mà không bị RLS chặn. PHẢI có `SET search_path = ''` để bảo mật.

### 2.4 Tạo user admin đầu tiên

Sau khi đăng ký user đầu tiên, chạy SQL này để thăng cấp admin:

```sql
UPDATE profiles SET role = 'admin' WHERE id = 'USER_ID_HERE';
```

Hoặc tắt xác nhận email trong Supabase Dashboard:
**Authentication → Settings → Email → Disable "Confirm email"**

---

## PHẦN 3: THIẾT KẾ DATABASE & RLS

### 3.1 Nguyên tắc thiết kế bảng

1. **Mọi bảng PHẢI có `id uuid PRIMARY KEY DEFAULT gen_random_uuid()`**
2. **Mọi bảng PHẢI bật RLS**: `ALTER TABLE xxx ENABLE ROW LEVEL SECURITY;`
3. **Mọi bảng cần field `created_by uuid REFERENCES auth.users(id)`** nếu cần biết ai tạo
4. **Viết RLS policies NGAY KHI tạo bảng**, không để sau

### 3.2 Template RLS cho bảng dữ liệu chính (admin/staff quản lý)

```sql
-- Ví dụ: bảng courts (sân) – chỉ admin/staff CRUD, tất cả xem

-- Admin/Staff xem tất cả
CREATE POLICY "Staff can view all"
  ON courts FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- Customer cũng xem được (để đặt sân)
CREATE POLICY "Customers can view active"
  ON courts FOR SELECT TO authenticated
  USING (status = 'active');

-- Chỉ admin/staff tạo/sửa/xóa
CREATE POLICY "Staff can insert"
  ON courts FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Staff can update"
  ON courts FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Admin can delete"
  ON courts FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### 3.3 Template RLS cho bảng user-owned (customer tự quản lý)

```sql
-- Ví dụ: bảng bookings – customer tạo, admin quản lý

-- Customer xem booking của mình
CREATE POLICY "Customers view own bookings"
  ON bookings FOR SELECT TO authenticated
  USING (
    created_by = auth.uid()
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- Customer tạo booking
CREATE POLICY "Customers can create bookings"
  ON bookings FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Customer hủy booking của mình (update status)
CREATE POLICY "Customers can cancel own bookings"
  ON bookings FOR UPDATE TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Admin/Staff update bất kỳ booking nào
CREATE POLICY "Staff can update any booking"
  ON bookings FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );
```

### 3.4 ⚠️ XỬ LÝ BẪY RLS PHỔ BIẾN

#### Bẫy 1: Customer không thể INSERT vào bảng liên quan
**Vấn đề**: Customer đặt booking → cần tạo record `customers` → RLS chặn INSERT.
**Giải pháp**: Dùng `SECURITY DEFINER` function:

```sql
CREATE OR REPLACE FUNCTION get_or_create_customer(
  p_name text, p_phone text, p_email text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_id uuid;
BEGIN
  -- Tìm customer theo email
  SELECT id INTO v_id FROM public.customers WHERE email = p_email LIMIT 1;

  IF v_id IS NULL THEN
    INSERT INTO public.customers (name, phone, email)
    VALUES (p_name, p_phone, p_email)
    RETURNING id INTO v_id;
  END IF;

  RETURN v_id;
END;
$$;

-- Cho phép authenticated user gọi function này
GRANT EXECUTE ON FUNCTION get_or_create_customer TO authenticated;
```

**Frontend gọi bằng RPC:**
```typescript
const { data: customerId, error } = await supabase.rpc('get_or_create_customer', {
  p_name: 'Nguyễn Văn A',
  p_phone: '0901234567',
  p_email: user.email,
});
```

#### Bẫy 2: Policy SELECT tham chiếu bảng khác bị lỗi vòng lặp
**Vấn đề**: Policy trên bảng A query bảng B, bảng B có policy query bảng A → infinite loop.
**Giải pháp**: Luôn dùng `profiles` làm bảng trung tâm cho role check, và policy của `profiles` chỉ nên check `auth.uid()` trực tiếp.

#### Bẫy 3: auth.users không truy cập được từ RLS policy
**Vấn đề**: Policy tham chiếu `auth.users` → lỗi "permission denied for table users".
**Giải pháp**: KHÔNG BAO GIỜ tham chiếu `auth.users` trong RLS policy. Luôn dùng `profiles` thay thế.

```sql
-- ❌ SAI
USING (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid()))

-- ✅ ĐÚNG
USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
```

---

## PHẦN 4: AUTHENTICATION & STATE MANAGEMENT

### 4.1 Auth Store (Zustand)

**src/store/authStore.ts:**
```typescript
import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string;
  phone: string;
  role: 'admin' | 'staff' | 'customer';
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  fetchProfile: (userId: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),

  fetchProfile: async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    set({ profile: data as Profile | null });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },
}));
```

### 4.2 Auth Listener trong App.tsx

```typescript
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';

export default function App() {
  const { user, profile, setUser, fetchProfile } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy session hiện tại
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id).finally(() => setLoading(false));
      else setLoading(false);
    });

    // Lắng nghe thay đổi auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) await fetchProfile(u.id);
        else useAuthStore.getState().setProfile(null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!user) return <AuthPage />;

  // PHÂN LUỒNG THEO ROLE
  const isAdmin = profile?.role === 'admin' || profile?.role === 'staff';

  return (
    <BrowserRouter>
      <Routes>
        {isAdmin ? (
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="courts" element={<CourtsPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <Route element={<CustomerLayout />}>
            <Route index element={<CustomerBookingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}
```

> ⚠️ **QUAN TRỌNG**: Luôn kiểm tra `profile?.role` trước khi render routes. Nếu profile chưa load xong → hiện loading spinner.

---

## PHẦN 5: LAYOUT THEO ROLE

### 5.1 Admin Layout (Sidebar navigation)

```typescript
import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Columns3, Users,
  Settings, LogOut,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Tổng quan' },
  { to: '/bookings', icon: Calendar, label: 'Lịch đặt' },
  { to: '/courts', icon: Columns3, label: 'Sân' },
  { to: '/customers', icon: Users, label: 'Khách hàng' },
  { to: '/settings', icon: Settings, label: 'Cài đặt' },
];

export default function AdminLayout() {
  const { profile, signOut } = useAuthStore();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 glass-strong border-r border-white/30 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="font-bold text-lg">App Name</h1>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-gray-100 pt-4">
          <div className="text-sm font-medium">{profile?.full_name}</div>
          <div className="text-xs text-gray-500 capitalize">{profile?.role}</div>
          <button onClick={signOut} className="mt-2 flex items-center gap-2 text-sm text-red-500">
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
```

### 5.2 Customer Layout (Header only, mobile-first)

```typescript
import { Outlet } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import NotificationBell from './NotificationBell';

export default function CustomerLayout() {
  const { profile, signOut } = useAuthStore();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 glass-strong border-b border-white/30">
        <div className="max-w-2xl mx-auto h-14 flex items-center justify-between px-4">
          <span className="font-bold text-sm">App Name</span>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <span className="text-sm">{profile?.full_name || 'Khách'}</span>
            <button onClick={signOut} className="p-2 text-red-500">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-2xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## PHẦN 6: PATTERNS CRUD PAGE

### 6.1 Template trang CRUD chuẩn

Mọi trang quản lý (Courts, Customers, Products) đều theo pattern này:

```typescript
import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ItemType } from '../types';

export default function ItemsPage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ItemType | null>(null);
  const [form, setForm] = useState({ name: '', /* ... */ });
  const [search, setSearch] = useState('');

  useEffect(() => { loadItems(); }, []);

  async function loadItems() {
    const { data } = await supabase.from('items').select('*').order('name');
    setItems(data || []);
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: '' });
    setShowModal(true);
  }

  function openEdit(item: ItemType) {
    setEditing(item);
    setForm({ name: item.name });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await supabase.from('items').update(form).eq('id', editing.id);
    } else {
      await supabase.from('items').insert(form);
    }
    setShowModal(false);
    loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm('Xác nhận xóa?')) return;
    await supabase.from('items').delete().eq('id', id);
    loadItems();
  }

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  // ... return JSX với bảng/card + modal form
}
```

### 6.2 Quy tắc khi tạo trang CRUD

1. **Luôn có `loadItems()` riêng** – gọi sau mỗi thao tác thay đổi dữ liệu
2. **Dùng 1 form + 1 modal** cho cả Create và Edit (phân biệt bằng `editing`)
3. **Search/filter ở client-side** cho dataset nhỏ (<1000 records)
4. **Loading spinner** khi chưa load xong data
5. **Confirm trước khi xóa** bằng `confirm()`

---

## PHẦN 7: HỆ THỐNG THÔNG BÁO REALTIME

### 7.1 Bảng notifications

```sql
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  is_read boolean DEFAULT false,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- User chỉ xem/sửa notifications của mình
CREATE POLICY "Users view own" ON notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users update own" ON notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Admin/Staff tạo notifications
CREATE POLICY "Staff insert" ON notifications FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- Bật Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
```

### 7.2 Gửi notification khi thay đổi trạng thái

```typescript
async function updateStatus(id: string, status: string) {
  await supabase.from('bookings').update({ status }).eq('id', id);

  // Tìm booking để lấy thông tin
  const booking = bookings.find((b) => b.id === id);
  if (booking?.created_by) {
    const messages: Record<string, { title: string; message: string; type: string }> = {
      confirmed: { title: '✅ Đã xác nhận', message: `Booking của bạn đã được xác nhận.`, type: 'booking_confirmed' },
      cancelled: { title: '❌ Đã hủy', message: `Booking của bạn đã bị hủy.`, type: 'booking_cancelled' },
    };
    const info = messages[status];
    if (info) {
      await supabase.from('notifications').insert({
        user_id: booking.created_by,
        title: info.title,
        message: info.message,
        type: info.type,
        booking_id: id,
      });
    }
  }
  loadData(); // Reload
}
```

### 7.3 Component NotificationBell (Realtime)

```typescript
import { useEffect, useState, useRef } from 'react';
import { Bell, CheckCheck, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export default function NotificationBell() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (!user) return;
    loadNotifications();

    // Realtime subscription
    const channel = supabase
      .channel('notifications-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        setNotifications((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function loadNotifications() {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(20);
    setNotifications(data || []);
  }

  async function markAsRead(id: string) {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
  }

  async function markAllRead() {
    const ids = notifications.filter((n) => !n.is_read).map((n) => n.id);
    if (ids.length === 0) return;
    await supabase.from('notifications').update({ is_read: true }).in('id', ids);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="relative p-2.5 rounded-xl hover:bg-white/80">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">
          {/* Header + List + Mark all read */}
        </div>
      )}
    </div>
  );
}
```

---

## PHẦN 8: HELPER FUNCTIONS

**src/lib/helpers.ts:**
```typescript
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('vi-VN');
}

export function formatTime(time: string): string {
  return time?.slice(0, 5) || '';
}

// Status mapping – tái sử dụng cho booking, invoice, etc.
export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    confirmed: 'bg-blue-50 text-blue-700 border border-blue-200',
    checked_in: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    completed: 'bg-gray-100 text-gray-600 border border-gray-200',
    cancelled: 'bg-red-50 text-red-600 border border-red-200',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    checked_in: 'Đang sử dụng',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
  };
  return map[status] || status;
}
```

---

## PHẦN 9: CHECKLIST TRIỂN KHAI (THỨ TỰ BẮT BUỘC)

> ⚠️ **PHẢI TUÂN THỦ THỨ TỰ NÀY** để tránh sửa lỗi chồng chéo:

### Giai đoạn 1: Database First
- [ ] Thiết kế tất cả bảng trên giấy/markdown trước
- [ ] Viết SQL tạo bảng + RLS policies cho TỪNG bảng
- [ ] Tạo trigger `handle_new_user` cho profiles
- [ ] Test RLS bằng cách đăng ký user mới → kiểm tra profiles
- [ ] Tạo user admin đầu tiên

### Giai đoạn 2: Auth + Routing
- [ ] Setup Supabase client (`lib/supabase.ts`)
- [ ] Tạo auth store (Zustand)
- [ ] Tạo AuthPage (đăng nhập/đăng ký)
- [ ] Tạo App.tsx với phân luồng role
- [ ] Tạo AdminLayout + CustomerLayout

### Giai đoạn 3: Admin Pages
- [ ] DashboardPage (thống kê tổng quan)
- [ ] Trang CRUD cho từng entity (Courts, Customers, Products...)
- [ ] Trang chức năng chính (Bookings, Invoices, Reports...)
- [ ] SettingsPage
- [ ] UsersPage (quản lý role)

### Giai đoạn 4: Customer Pages
- [ ] Trang cho customer (xem sản phẩm, đặt hàng...)
- [ ] Test SECURITY DEFINER functions nếu customer cần INSERT
- [ ] Kiểm tra mọi thao tác customer không bị RLS chặn

### Giai đoạn 5: Notifications
- [ ] Tạo bảng notifications + RLS + Realtime
- [ ] Tạo NotificationBell component
- [ ] Thêm logic gửi notification trong Admin pages
- [ ] Tích hợp NotificationBell vào CustomerLayout
- [ ] Test: admin đổi status → customer nhận thông báo

### Giai đoạn 6: Polish & Deploy
- [ ] Review tất cả RLS policies
- [ ] Test flow hoàn chỉnh (đăng ký → đặt hàng → admin xử lý → customer nhận thông báo)
- [ ] Responsive check (mobile + desktop)
- [ ] Build production: `npm run build`
- [ ] Deploy lên Vercel/Netlify

---

## PHẦN 10: LỖI THƯỜNG GẶP & CÁCH XỬ LÝ

| Lỗi | Nguyên nhân | Cách sửa |
|-----|------------|----------|
| `permission denied for table users` | RLS policy tham chiếu `auth.users` | Đổi sang tham chiếu `profiles` |
| `new row violates row-level security policy` | Thiếu INSERT policy cho role tương ứng | Thêm policy hoặc dùng SECURITY DEFINER function |
| Customer đặt hàng bị lỗi | Thiếu INSERT policy trên bảng liên kết | Dùng RPC function với SECURITY DEFINER |
| Booking lưu nhưng không thấy trên UI | SELECT policy thiếu → data không trả về | Thêm SELECT policy cho role customer |
| Notification không realtime | Chưa bật realtime cho bảng | Chạy `ALTER PUBLICATION supabase_realtime ADD TABLE xxx;` |
| Profile null sau đăng nhập | Trigger tạo profile chưa chạy | Kiểm tra trigger `on_auth_user_created` |
| Trang không redirect theo role | `profile` chưa load xong khi render routes | Thêm loading state, chờ fetchProfile() xong |
| RLS policy conflict/loop | Policy bảng A query bảng B, B policy query A | Redesign policy, luôn dùng profiles làm trung tâm |

---

## PHẦN 11: TYPES TEMPLATE

**src/types/index.ts:**
```typescript
export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  role: 'admin' | 'staff' | 'customer';
  created_at: string;
  updated_at: string;
}

// Thêm interfaces cho từng bảng
export interface Court {
  id: string;
  name: string;
  type: string;
  status: string;
  hourly_rate: number;
  // ... thêm fields theo nhu cầu
}

export interface Booking {
  id: string;
  court_id: string;
  customer_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string;
  created_by: string;
  court?: Court;
  customer?: Customer;
  // ... thêm fields
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  booking_id: string | null;
  created_at: string;
}
```

---

## TÓM TẮT GOLDEN RULES

1. **Database first, UI after** – Thiết kế bảng + RLS xong mới code frontend
2. **RLS ngay khi tạo bảng** – Không bao giờ tạo bảng mà chưa có RLS
3. **profiles là trung tâm** – Mọi role check đều qua bảng profiles
4. **SECURITY DEFINER cho cross-table** – Khi customer cần INSERT bảng không thuộc quyền
5. **Luôn có created_by** – Trên bảng user-owned để biết ai tạo
6. **1 form, 1 modal** – Cho cả tạo mới và chỉnh sửa
7. **loadData() sau mỗi mutation** – Đảm bảo UI luôn đồng bộ
8. **Notification sau mỗi action quan trọng** – Để customer luôn biết trạng thái
9. **Test RLS trước khi code UI** – Dùng Supabase Dashboard kiểm tra
10. **Không tham chiếu auth.users** – Luôn dùng profiles thay thế
