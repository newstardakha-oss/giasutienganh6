---
name: lms-role-based-app
description: Hướng dẫn chi tiết tạo app LMS có phân quyền Giáo viên (quản trị) và Học sinh, với đầy đủ chức năng quản lý điểm số, thời gian, anti-cheat, leaderboard
---

# 🎓 Skill: Tạo App LMS Phân Quyền Giáo Viên - Học Sinh

## Tổng Quan

Skill này hướng dẫn **từng bước** tạo một ứng dụng LMS (Learning Management System) hoàn chỉnh với:
- **Phân quyền 3 vai trò**: Admin, Giáo viên (teacher), Học sinh (student)
- **GV có thể**: Quản lý câu hỏi, xem điểm HS, xem thời gian làm bài, theo dõi vi phạm, tạo đề thi
- **HS có thể**: Làm bài, xem điểm của mình, xem leaderboard, học lý thuyết
- **Hỗ trợ 2 phương án backend**: Google Sheets + Apps Script (miễn phí) HOẶC Supabase (chuyên nghiệp)

---

## 📋 MỤC LỤC

1. [Lựa chọn kiến trúc](#1-lựa-chọn-kiến-trúc)
2. [Thiết kế Database](#2-thiết-kế-database)
3. [Hệ thống Authentication & Phân quyền](#3-hệ-thống-authentication--phân-quyền)
4. [Backend API](#4-backend-api)
5. [Frontend - Cấu trúc app React/Vite](#5-frontend---cấu-trúc-app-reactvite)
6. [Giao diện theo vai trò](#6-giao-diện-theo-vai-trò)
7. [Chức năng cho Giáo viên (Admin Panel)](#7-chức-năng-cho-giáo-viên-admin-panel)
8. [Chức năng cho Học sinh](#8-chức-năng-cho-học-sinh)
9. [Anti-Cheat System](#9-anti-cheat-system)
10. [Realtime & Leaderboard](#10-realtime--leaderboard)
11. [Triển khai Production](#11-triển-khai-production)
12. [Checklist hoàn thành](#12-checklist-hoàn-thành)

---

## 1. Lựa Chọn Kiến Trúc

### Phương án A: Google Sheets + Apps Script (Đơn giản, miễn phí)

**Ưu điểm:**
- ✅ Hoàn toàn miễn phí
- ✅ GV quen thuộc với Google Sheets
- ✅ Không cần server riêng
- ✅ Dễ backup (export sheet)

**Nhược điểm:**
- ⚠️ Giới hạn 300 request/phút
- ⚠️ Không có realtime
- ⚠️ Phân quyền đơn giản (dựa trên logic code)

**Tech Stack:**
```
Frontend: React + Vite + TypeScript + TailwindCSS
Backend: Google Apps Script (code.gs)
Database: Google Sheets
Hosting: Vercel / Netlify (miễn phí)
```

### Phương án B: Supabase (Chuyên nghiệp)

**Ưu điểm:**
- ✅ Phân quyền chi tiết (Row Level Security)
- ✅ Realtime updates
- ✅ SQL quen thuộc, dễ query
- ✅ Auth tích hợp sẵn
- ✅ Free tier: 500MB database, 50k users, 200 realtime concurrent

**Nhược điểm:**
- ⚠️ Cần học SQL cơ bản
- ⚠️ Free tier có giới hạn bandwidth

**Tech Stack:**
```
Frontend: React + Vite + TypeScript + TailwindCSS
Backend: Supabase (PostgreSQL + Auth + Realtime + Storage)
SDK: @supabase/supabase-js
Hosting: Vercel / Netlify
```

> **Khuyến nghị:** Nếu lớp < 100 HS → Phương án A. Nếu cần mở rộng hoặc realtime → Phương án B.

---

## 2. Thiết Kế Database

### 2.1 Bảng `users` / `profiles` (Người dùng)

| Cột | Kiểu | Mô tả | Ví dụ |
|-----|------|-------|-------|
| id / email | text (PK) | Định danh user | `gv@school.edu` |
| name | text | Họ tên | `Cô Lan` |
| class | text | Lớp | `10A` |
| avatar | text | URL ảnh đại diện | `https://...` |
| totalScore | number | Tổng điểm tích lũy | `850` |
| currentLevel | number | Level hiện tại | `3` |
| progress | json | Tiến độ theo chủ đề | `{"12_ĐạoHàm": 3}` |
| role | text | Vai trò | `teacher` / `student` / `admin` |
| password | text | Mật khẩu (hash) | `123456` |
| created_at | timestamp | Ngày tạo | `2024-01-15` |

### 2.2 Bảng `questions` (Câu hỏi)

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| exam_id | text (PK) | Mã câu hỏi duy nhất |
| level | text | Mức độ (Nhận biết/Thông hiểu/VD/VDC) |
| question_type | text | Loại: `Trắc nghiệm` / `Đúng/Sai` / `Trả lời ngắn` |
| question_text | text | Nội dung câu hỏi (hỗ trợ LaTeX) |
| image_id | text | ID ảnh minh họa (nếu có) |
| option_A, B, C, D | text | 4 đáp án |
| answer_key | text | Đáp án đúng: `A` / `Đ-S-Đ-S` / `15` |
| solution | text | Giải thích chi tiết |
| topic | text | Chủ đề: `Đạo hàm`, `Logarithm`... |
| grade | number | Khối: 10, 11, 12 |
| quiz_level | number | Level trong chủ đề: 1-10 |

### 2.3 Bảng `results` / `attempts` (Kết quả làm bài)

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| result_id | text (PK) | UUID |
| email / student_id | text | Email HS |
| topic | text | Chủ đề |
| grade | number | Khối lớp |
| level | number | Level bài thi |
| score | number | Số câu đúng |
| total_questions | number | Tổng số câu |
| percentage | number | Phần trăm (0-100) |
| status | text | `PASS` / `FAIL` |
| time_spent | number | Thời gian làm (giây) |
| submission_reason | text | `normal` / `cheat_tab` / `timeout` |
| answers | json | Chi tiết đáp án HS |
| timestamp | timestamp | Thời điểm nộp bài |

### 2.4 Bảng `sessions` (Phiên đăng nhập)

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| email | text | Email user |
| token | text | Session token (UUID) |
| device | text | Device ID |
| login_time | timestamp | Thời gian đăng nhập |
| status | text | `active` / `expired` / `logged_out` |
| logout_time | timestamp | Thời gian đăng xuất |
| last_heartbeat | timestamp | Lần cuối hoạt động |

### 2.5 Bảng `violations` (Vi phạm)

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | text (PK) | UUID |
| email | text | Email HS vi phạm |
| type | text | `tab_switch` / `session_conflict` / `copy_paste` / `devtools` / `timeout` |
| topic | text | Chủ đề đang thi |
| level | number | Level đang thi |
| details | json | Chi tiết vi phạm |
| timestamp | timestamp | Thời điểm |

### 2.6 Bảng `theory` (Lý thuyết)

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| grade | number | Khối lớp |
| topic | text | Chủ đề |
| level | number | Level |
| title | text | Tiêu đề |
| content | text | Nội dung |
| examples | text | Ví dụ |
| tips | text | Mẹo |

### 2.7 Bảng `subjects` (Chủ đề/Môn)

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | uuid (PK) | ID tự tạo |
| name | text | Tên chủ đề |
| description | text | Mô tả |
| teacher_id | uuid | GV tạo |
| grade | text | Khối lớp áp dụng |

---

## 3. Hệ Thống Authentication & Phân Quyền

### 3.1 Flow Đăng nhập

```
┌─────────┐     ┌─────────────┐     ┌──────────┐
│  Login   │────▶│ Verify User │────▶│  Check   │
│  Form    │     │ email+pass  │     │  Role    │
└─────────┘     └─────────────┘     └──────────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    ▼                    ▼                    ▼
              ┌───────────┐      ┌───────────┐       ┌───────────┐
              │  ADMIN    │      │  TEACHER  │       │  STUDENT  │
              │  Panel    │      │  Dashboard│       │  Dashboard│
              └───────────┘      └───────────┘       └───────────┘
```

### 3.2 Logic phân quyền cơ bản (Phương án A - Apps Script)

```javascript
// Trong hàm handleLogin - xác định role
function handleLogin(email, password, deviceId) {
  const cleanEmail = email.trim().toLowerCase();
  
  // Tìm user trong sheet Users
  const sheet = getSheet('Users');
  const data = sheet.getDataRange().getValues();
  let user = null;
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).toLowerCase() === cleanEmail) {
      // Kiểm tra mật khẩu
      if (String(data[i][8]) && String(password) !== String(data[i][8])) {
        return createResponse('error', null, 'Sai mật khẩu');
      }
      user = {
        email: data[i][0],
        name: data[i][1],
        class: data[i][2],
        avatar: data[i][3],
        totalScore: Number(data[i][4] || 0),
        role: data[i][7] || 'student'  // ← QUAN TRỌNG: Lấy role
      };
      break;
    }
  }
  
  // Auto-register nếu chưa có
  if (!user) {
    const role = cleanEmail.includes('gv') || cleanEmail.includes('admin') 
      ? 'teacher' : 'student';
    user = { email: cleanEmail, name: cleanEmail.split('@')[0], role: role };
    sheet.appendRow([user.email, user.name, '', '', 0, 1, '{}', user.role, password]);
  }
  
  // Tạo session token
  const sessionToken = Utilities.getUuid();
  getSheet('Sessions').appendRow([user.email, sessionToken, deviceId, new Date().toISOString(), 'active']);
  
  return createResponse('success', { user, sessionToken });
}
```

### 3.3 Logic phân quyền nâng cao (Phương án B - Supabase RLS)

```sql
-- Bảng profiles
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('teacher', 'student', 'admin')),
  full_name text,
  class_id text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Trigger tự tạo profile khi đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS: HS chỉ xem điểm mình, GV xem tất cả
CREATE POLICY "Attempt access" ON attempts FOR SELECT
USING (
  auth.uid() = student_id
  OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
  )
);

-- RLS: GV tạo câu hỏi, HS không được
CREATE POLICY "Teachers create questions" ON questions FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
  )
);
```

### 3.4 Frontend Auth Context (React)

```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  class: string;
  avatar?: string;
  totalScore: number;
  role: 'student' | 'teacher' | 'admin';
}

interface AuthContextType {
  user: User | null;
  sessionToken: string | null;
  loading: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Khôi phục session từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('lms_user');
    const savedToken = localStorage.getItem('lms_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setSessionToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(API_URL + '?action=login', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', email, password, deviceId: getDeviceId() })
    });
    const result = await response.json();
    if (result.status === 'success') {
      setUser(result.data.user);
      setSessionToken(result.data.sessionToken);
      localStorage.setItem('lms_user', JSON.stringify(result.data.user));
      localStorage.setItem('lms_token', result.data.sessionToken);
    } else {
      throw new Error(result.message);
    }
  };

  const logout = () => {
    setUser(null);
    setSessionToken(null);
    localStorage.removeItem('lms_user');
    localStorage.removeItem('lms_token');
  };

  const value = {
    user,
    sessionToken,
    loading,
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    isAdmin: user?.role === 'admin',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

---

## 4. Backend API

### 4.1 Danh sách API Actions

Dưới đây là tất cả actions mà backend cần hỗ trợ:

#### Authentication (Tất cả roles):
| Action | Mô tả | Params |
|--------|-------|--------|
| `login` | Đăng nhập | email, password, deviceId |
| `validateSession` | Kiểm tra session | email, sessionToken |
| `heartbeat` | Gửi heartbeat giữ session | email, sessionToken |
| `logout` | Đăng xuất | email, sessionToken |

#### Quiz System (Student):
| Action | Mô tả | Params |
|--------|-------|--------|
| `getQuestions` | Lấy câu hỏi theo filter | grade, topic, level |
| `getTopics` | Lấy danh sách chủ đề | grade |
| `getTheory` | Lấy lý thuyết | grade, topic, level |
| `getUserProgress` | Lấy tiến độ HS | email |
| `submitQuiz` | Nộp bài | score, answers, timeSpent, ... |

#### Admin/Teacher:
| Action | Mô tả | Params |
|--------|-------|--------|
| `getAllQuestions` | Lấy tất cả câu hỏi | - |
| `getFilteredQuestions` | Lọc câu hỏi | grade, topic |
| `saveQuestion` | Thêm/sửa câu hỏi | question data |
| `deleteQuestion` | Xóa câu hỏi | exam_id |
| `getAllStudents` | Lấy danh sách HS | - |
| `getStudentResults` | Xem kết quả của 1 HS | email |
| `saveTheory` | Thêm/sửa lý thuyết | theory data |
| `createInstantExam` | Tạo đề thi nhanh | questions, title, grade |
| `getLeaderboard` | Bảng xếp hạng | limit |

### 4.2 Template Code Backend (Google Apps Script)

```javascript
// ============================================================================
// GOOGLE APPS SCRIPT - BACKEND API
// ============================================================================

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Thay bằng ID Sheet của bạn

const SHEET_NAMES = {
  USERS: 'Users',
  QUESTIONS: 'Questions',
  RESULTS: 'Results',
  SESSIONS: 'Sessions',
  VIOLATIONS: 'Violations',
  THEORY: 'Theory',
};

// HTTP Handlers
function doGet(e) {
  try {
    const action = e?.parameter?.action;
    if (!action) return createResponse('success', { message: 'LMS API Online' });
    return handleAction(action, e.parameter);
  } catch (error) {
    return createResponse('error', null, error.toString());
  }
}

function doPost(e) {
  try {
    let data = {};
    if (e.postData?.contents) data = JSON.parse(e.postData.contents);
    else if (e.parameter) data = e.parameter;
    const action = data.action || e.parameter?.action;
    return handleAction(action, data);
  } catch (error) {
    return createResponse('error', null, error.toString());
  }
}

// Router
function handleAction(action, data) {
  switch(action) {
    case 'login': return handleLogin(data.email, data.password, data.deviceId);
    case 'getAllStudents': return handleGetAllStudents();
    case 'getStudentResults': return handleGetStudentResults(data.email);
    case 'getQuestions': return handleGetQuestions(data.grade, data.topic, data.level);
    case 'submitQuiz': return handleSubmitQuiz(data);
    case 'getLeaderboard': return handleGetLeaderboard(data.limit);
    case 'reportViolation': return handleReportViolation(data);
    // ... thêm các action khác
    default: return createResponse('error', null, 'Unknown action: ' + action);
  }
}

// ---- ADMIN: Lấy danh sách HS ----
function handleGetAllStudents() {
  const sheet = getSheet(SHEET_NAMES.USERS);
  const data = sheet.getDataRange().getValues();
  const students = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][7] === 'student') {
      students.push({
        email: data[i][0], name: data[i][1],
        class: data[i][2], totalScore: data[i][4]
      });
    }
  }
  return createResponse('success', students);
}

// ---- ADMIN: Xem kết quả 1 HS ----
function handleGetStudentResults(email) {
  const sheet = getSheet(SHEET_NAMES.RESULTS);
  const data = sheet.getDataRange().getValues();
  const results = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === email) {
      results.push({
        resultId: data[i][0], topic: data[i][2], grade: data[i][3],
        level: data[i][4], score: data[i][5], total: data[i][6],
        percentage: data[i][7], passed: data[i][8] === 'PASS',
        timeSpent: data[i][9], reason: data[i][10], timestamp: data[i][12]
      });
    }
  }
  return createResponse('success', results.reverse());
}

// ---- Helpers ----
function createResponse(status, data, message) {
  return ContentService.createTextOutput(
    JSON.stringify({ status, data, message: message || '' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    initializeSheet(sheet, name);
  }
  return sheet;
}
```

### 4.3 Template Code Backend (Supabase)

```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ---- Đăng ký với role ----
export const signUp = async (email, password, fullName, role = 'student') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role } }
  });
  if (error) throw error;
  return data;
};

// ---- GV: Lấy tất cả điểm HS ----
export const getAllScores = async (classId) => {
  let query = supabase
    .from('attempts')
    .select(`*, student:profiles(full_name, class_id), subjects(name)`)
    .order('created_at', { ascending: false });
  if (classId) query = query.eq('profiles.class_id', classId);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// ---- HS: Xem điểm bản thân (RLS tự lọc) ----
export const getMyScores = async () => {
  const { data, error } = await supabase
    .from('attempts')
    .select(`*, subjects(name)`)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};
```

---

## 5. Frontend - Cấu Trúc App React/Vite

### 5.1 Khởi tạo project

```bash
npx -y create-vite@latest ./ --template react-ts
npm install
npm install lucide-react
# Nếu dùng Supabase:
npm install @supabase/supabase-js
```

### 5.2 Cấu trúc thư mục

```
src/
├── components/
│   ├── AdminPanel.tsx          # ← Panel cho GV
│   ├── StudentDashboard.tsx    # ← Dashboard cho HS
│   ├── LoginForm.tsx           # ← Màn hình đăng nhập
│   ├── QuizView.tsx            # ← Giao diện làm bài
│   ├── ResultView.tsx          # ← Xem kết quả
│   ├── Leaderboard.tsx         # ← Bảng xếp hạng
│   ├── QuestionManager.tsx     # ← GV quản lý câu hỏi
│   ├── StudentList.tsx         # ← GV xem danh sách HS
│   ├── StudentDetail.tsx       # ← GV xem chi tiết 1 HS
│   ├── MathText.tsx            # ← Render LaTeX
│   └── Loading.tsx             # ← Loading spinner
├── contexts/
│   └── AuthContext.tsx         # ← Authentication context
├── lib/
│   └── supabase.ts             # ← Supabase client (hoặc api.ts cho Apps Script)
├── types/
│   └── index.ts                # ← TypeScript types
├── App.tsx                     # ← App chính, routing theo role
├── main.tsx
└── index.css
```

### 5.3 TypeScript Types quan trọng

```typescript
// src/types/index.ts

// ---- View States ----
export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  TOPIC_SELECT = 'TOPIC_SELECT',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
  LEADERBOARD = 'LEADERBOARD',
  THEORY_REVIEW = 'THEORY_REVIEW',
  ADMIN_PANEL = 'ADMIN_PANEL',  // ← Cho GV
}

// ---- User types ----
export interface User {
  email: string;
  name: string;
  class: string;
  avatar?: string;
  totalScore: number;
  currentLevel?: number;
  progress?: Record<string, number>;
  role?: 'student' | 'teacher' | 'admin';
}

// ---- Question types ----
export type QuestionType = 'Trắc nghiệm' | 'Đúng/Sai' | 'Trả lời ngắn';

export interface Question {
  exam_id: string;
  level: string;
  question_type: QuestionType | string;
  question_text: string;
  image_id?: string;
  option_A: string;
  option_B: string;
  option_C: string;
  option_D: string;
  answer_key: string;
  solution: string;
  topic: string;
  grade: number;
  quiz_level?: number;
}

// ---- Quiz State ----
export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (string | null)[];
  startTime: number;
  endTime?: number;
  timeSpent?: number;
  tabSwitchCount: number;
  isComplete: boolean;
  score: number;
  submissionReason: 'normal' | 'cheat_tab' | 'cheat_conflict' | 'timeout';
}

// ---- Quiz Result ----
export interface QuizResult {
  resultId?: string;
  email: string;
  topic: string;
  grade: number;
  level: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpent: number;
  submissionReason: string;
  timestamp: string;
}

// ---- Violation ----
export interface Violation {
  violationId?: string;
  email: string;
  type: 'tab_switch' | 'session_conflict' | 'copy_paste' | 'devtools' | 'timeout';
  topic?: string;
  level?: number;
  details: string;
  timestamp: string;
}

// ---- Leaderboard ----
export interface LeaderboardEntry {
  rank: number;
  email: string;
  name: string;
  class: string;
  avatar?: string;
  totalScore: number;
}

// ---- Admin: Chi tiết HS ----
export interface StudentDetail {
  user: User;
  results: QuizResult[] | null;
  violations: Violation[];
}
```

---

## 6. Giao Diện Theo Vai Trò

### 6.1 App.tsx - Routing theo role

```tsx
// src/App.tsx
import { useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const { user, loading, isTeacher, isAdmin } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <LoginForm />;

  return (
    <div className="app">
      {/* Header chung cho tất cả roles */}
      <header className="flex items-center justify-between p-4">
        <h1>📚 LMS Học Tập</h1>
        <div className="flex items-center gap-4">
          <span>{user.name} ({user.role})</span>
          {/* GV/Admin có nút chuyển qua Admin Panel */}
          {(isTeacher || isAdmin) && (
            <button onClick={() => setView(ViewState.ADMIN_PANEL)}>
              ⚙️ Quản lý
            </button>
          )}
          <button onClick={logout}>🚪 Đăng xuất</button>
        </div>
      </header>

      {/* Render view theo role */}
      {view === ViewState.ADMIN_PANEL && (isTeacher || isAdmin)
        ? <AdminPanel />
        : <StudentDashboard />
      }
    </div>
  );
}
```

### 6.2 Giao diện Login

```tsx
// src/components/LoginForm.tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🎓 Hệ Thống Học Tập</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email (VD: hs@school.edu)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Đăng nhập</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="hint">
          GV: email bắt đầu bằng "gv" hoặc "admin"<br/>
          HS: email bất kỳ (tự đăng ký)
        </p>
      </div>
    </div>
  );
}
```

---

## 7. Chức Năng Cho Giáo Viên (Admin Panel)

### 7.1 Admin Panel - Tổng quan

```tsx
// src/components/AdminPanel.tsx
type AdminTab = 'students' | 'questions' | 'results' | 'violations' | 'exams';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>('students');

  return (
    <div className="admin-panel">
      <h2>⚙️ Panel Quản Lý (Giáo Viên)</h2>

      {/* Tab Navigation */}
      <div className="tabs">
        <button onClick={() => setActiveTab('students')} className={activeTab === 'students' ? 'active' : ''}>
          👥 Danh sách HS
        </button>
        <button onClick={() => setActiveTab('results')} className={activeTab === 'results' ? 'active' : ''}>
          📊 Kết quả thi
        </button>
        <button onClick={() => setActiveTab('questions')} className={activeTab === 'questions' ? 'active' : ''}>
          📝 Ngân hàng câu hỏi
        </button>
        <button onClick={() => setActiveTab('violations')} className={activeTab === 'violations' ? 'active' : ''}>
          🚨 Vi phạm
        </button>
        <button onClick={() => setActiveTab('exams')} className={activeTab === 'exams' ? 'active' : ''}>
          📋 Đề thi
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'students' && <StudentListView />}
      {activeTab === 'results' && <ResultsOverview />}
      {activeTab === 'questions' && <QuestionManager />}
      {activeTab === 'violations' && <ViolationLog />}
      {activeTab === 'exams' && <ExamManager />}
    </div>
  );
}
```

### 7.2 GV xem danh sách HS và điểm

```tsx
function StudentListView() {
  const [students, setStudents] = useState<User[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    // Fetch danh sách HS
    const fetchStudents = async () => {
      const res = await callAPI('getAllStudents');
      if (res.status === 'success') setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const viewStudentDetail = async (email: string) => {
    setSelectedStudent(email);
    const res = await callAPI('getStudentResults', { email });
    if (res.status === 'success') setResults(res.data);
  };

  return (
    <div>
      <h3>👥 Danh Sách Học Sinh</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Lớp</th>
            <th>Tổng điểm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.email}>
              <td>{i + 1}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.class}</td>
              <td>{s.totalScore}</td>
              <td>
                <button onClick={() => viewStudentDetail(s.email)}>
                  📊 Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chi tiết HS được chọn */}
      {selectedStudent && (
        <div className="student-detail">
          <h4>📊 Kết quả của: {selectedStudent}</h4>
          <table>
            <thead>
              <tr>
                <th>Chủ đề</th>
                <th>Level</th>
                <th>Điểm</th>
                <th>%</th>
                <th>Thời gian</th>
                <th>Kết quả</th>
                <th>Lý do nộp</th>
                <th>Ngày thi</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.resultId} className={r.passed ? 'pass' : 'fail'}>
                  <td>{r.topic}</td>
                  <td>{r.level}</td>
                  <td>{r.score}/{r.totalQuestions}</td>
                  <td>{r.percentage}%</td>
                  <td>{formatTime(r.timeSpent)}</td>
                  <td>{r.passed ? '✅ PASS' : '❌ FAIL'}</td>
                  <td className={r.submissionReason !== 'normal' ? 'cheat-warning' : ''}>
                    {r.submissionReason === 'normal' ? '🟢 Bình thường' :
                     r.submissionReason === 'cheat_tab' ? '🔴 Chuyển tab' :
                     r.submissionReason === 'timeout' ? '⏰ Hết giờ' : r.submissionReason}
                  </td>
                  <td>{new Date(r.timestamp).toLocaleDateString('vi-VN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
```

### 7.3 GV quản lý câu hỏi

```tsx
function QuestionManager() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const saveQuestion = async (q: Question) => {
    const res = await callAPI('saveQuestion', q);
    if (res.status === 'success') {
      // Refresh danh sách
      fetchQuestions();
      setEditingQuestion(null);
    }
  };

  const deleteQuestion = async (examId: string) => {
    if (confirm('Xóa câu hỏi này?')) {
      await callAPI('deleteQuestion', { exam_id: examId });
      fetchQuestions();
    }
  };

  // Form thêm/sửa câu hỏi...
  // (Bao gồm: loại câu hỏi, nội dung, đáp án, giải thích, chủ đề, khối, level)
}
```

---

## 8. Chức Năng Cho Học Sinh

### 8.1 Dashboard HS

```tsx
function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="student-dashboard">
      {/* Thông tin cá nhân */}
      <div className="user-info">
        <img src={user.avatar || '/default-avatar.png'} alt="Avatar" />
        <h2>{user.name}</h2>
        <p>Lớp: {user.class}</p>
        <p>Tổng điểm: ⭐ {user.totalScore}</p>
      </div>

      {/* Menu chức năng */}
      <div className="action-grid">
        <button onClick={() => setView('TOPIC_SELECT')}>
          📚 Ôn tập theo chủ đề
        </button>
        <button onClick={() => setView('LEADERBOARD')}>
          🏆 Bảng xếp hạng
        </button>
        <button onClick={() => setView('THEORY_REVIEW')}>
          📖 Xem lý thuyết
        </button>
      </div>

      {/* Tiến độ học tập */}
      <div className="progress-section">
        <h3>📈 Tiến Độ Học Tập</h3>
        {Object.entries(user.progress || {}).map(([key, level]) => (
          <div key={key} className="progress-bar">
            <span>{key.replace('_', ' ')}</span>
            <div className="bar">
              <div style={{ width: `${(level / 10) * 100}%` }} />
            </div>
            <span>Level {level}/10</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 8.2 Giao diện làm bài thi

```tsx
function QuizView() {
  const [quiz, setQuiz] = useState<QuizState | null>(null);

  // Timer đếm ngược
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleSubmit('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="quiz-view">
      {/* Header: Timer + Progress */}
      <div className="quiz-header">
        <span>⏰ {formatTime(timeLeft)}</span>
        <span>Câu {quiz.currentQuestionIndex + 1}/{quiz.questions.length}</span>
        <span>📊 Đã trả lời: {answeredCount}/{quiz.questions.length}</span>
      </div>

      {/* Câu hỏi */}
      <div className="question-card">
        <h3>{currentQuestion.question_text}</h3>

        {/* Render đáp án theo loại câu hỏi */}
        {currentQuestion.question_type === 'Trắc nghiệm' && (
          <div className="choices">
            {['A', 'B', 'C', 'D'].map(choice => (
              <button
                key={choice}
                className={selected === choice ? 'selected' : ''}
                onClick={() => selectAnswer(choice)}
              >
                {choice}. {currentQuestion[`option_${choice}`]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="nav-buttons">
        <button onClick={prevQuestion} disabled={quiz.currentQuestionIndex === 0}>
          ◀ Câu trước
        </button>
        <button onClick={nextQuestion}>
          Câu sau ▶
        </button>
        <button onClick={() => handleSubmit('normal')} className="submit-btn">
          ✅ Nộp bài
        </button>
      </div>
    </div>
  );
}
```

---

## 9. Anti-Cheat System

### 9.1 Phát hiện chuyển tab

```typescript
// Trong component Quiz
useEffect(() => {
  const onVisibility = () => {
    if (document.hidden && quiz && !quiz.isComplete) {
      setTabSwitchCount(prev => prev + 1);

      // Báo vi phạm
      reportViolation({
        email: user.email,
        type: 'tab_switch',
        topic: quiz.topic,
        level: quiz.level,
        details: `Chuyển tab lần ${tabSwitchCount + 1}`
      });

      // Tự nộp bài nếu chuyển tab >= 3 lần
      if (tabSwitchCount + 1 >= 3) {
        handleSubmit('cheat_tab');
      }
    }
  };

  document.addEventListener('visibilitychange', onVisibility);
  return () => document.removeEventListener('visibilitychange', onVisibility);
}, [quiz, tabSwitchCount]);
```

### 9.2 Session Conflict (Chống login nhiều thiết bị)

```typescript
// Heartbeat mỗi 30 giây
useEffect(() => {
  const interval = setInterval(async () => {
    if (user && sessionToken) {
      const res = await callAPI('heartbeat', {
        email: user.email,
        sessionToken
      });
      if (res.data?.valid === false) {
        // Session bị đá ra (login từ thiết bị khác)
        alert('⚠️ Tài khoản đã đăng nhập từ thiết bị khác!');
        if (quiz && !quiz.isComplete) {
          handleSubmit('cheat_conflict');
        }
        logout();
      }
    }
  }, 30000);
  return () => clearInterval(interval);
}, [user, sessionToken]);
```

### 9.3 Chống copy/paste và DevTools

```typescript
useEffect(() => {
  // Chống copy
  const onCopy = (e: ClipboardEvent) => {
    e.preventDefault();
    reportViolation({ type: 'copy_paste', details: 'Attempted copy' });
  };

  // Chống paste
  const onPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    reportViolation({ type: 'copy_paste', details: 'Attempted paste' });
  };

  // Phát hiện DevTools (cơ bản)
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
      reportViolation({ type: 'devtools', details: 'Attempted open DevTools' });
    }
  };

  document.addEventListener('copy', onCopy);
  document.addEventListener('paste', onPaste);
  document.addEventListener('keydown', onKeyDown);
  return () => {
    document.removeEventListener('copy', onCopy);
    document.removeEventListener('paste', onPaste);
    document.removeEventListener('keydown', onKeyDown);
  };
}, []);
```

---

## 10. Realtime & Leaderboard

### 10.1 Leaderboard component

```tsx
function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await callAPI('getLeaderboard', { limit: 20 });
      if (res.status === 'success') {
        setEntries(res.data.map((e, i) => ({ ...e, rank: i + 1 })));
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2>🏆 Bảng Xếp Hạng</h2>
      <div className="entries">
        {entries.map(entry => (
          <div
            key={entry.email}
            className={`entry ${entry.email === user?.email ? 'current-user' : ''} ${entry.rank <= 3 ? 'top-3' : ''}`}
          >
            <span className="rank">
              {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
            </span>
            <img src={entry.avatar || '/default.png'} alt="" className="avatar" />
            <span className="name">{entry.name}</span>
            <span className="class">{entry.class}</span>
            <span className="score">⭐ {entry.totalScore}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 10.2 Realtime (Supabase only)

```typescript
// GV theo dõi HS đang làm bài realtime
useEffect(() => {
  const subscription = supabase
    .channel('attempts-channel')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'attempts',
    }, (payload) => {
      console.log('Realtime update:', payload);
      fetchAttempts(); // Refresh data
    })
    .subscribe();

  return () => subscription.unsubscribe();
}, []);
```

---

## 11. Triển Khai Production

### 11.1 Phương án A: Deploy lên Vercel

```bash
# 1. Build project
npm run build

# 2. Deploy
npm install -g vercel
vercel --prod

# 3. Hoặc push lên GitHub → Vercel tự deploy
```

### 11.2 Phương án B: Google Apps Script Deployment

1. Mở **Google Apps Script** → Tạo project mới
2. Copy toàn bộ code vào `Code.gs`
3. **Deploy** → **New deployment** → **Web app**
4. **Execute as**: Me
5. **Who has access**: Anyone
6. Copy URL → Dùng làm `API_URL` trong frontend

### 11.3 Supabase Production Checklist

```sql
-- Bật RLS cho tất cả bảng
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

-- Bật email confirmation
-- Supabase Dashboard → Authentication → Providers → Email → Confirm email: ON

-- Setup Site URL
-- Authentication → URL Configuration → Site URL: https://your-app.vercel.app
```

### 11.4 Biến môi trường (.env)

```env
# Google Sheets (Phương án A)
VITE_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

# Supabase (Phương án B)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 12. Checklist Hoàn Thành

### Setup cơ bản:
- [ ] Chọn phương án backend (A hoặc B)
- [ ] Tạo project React + Vite + TypeScript
- [ ] Setup database (Google Sheets hoặc Supabase tables)
- [ ] Tạo các bảng: users, questions, results, sessions, violations, theory

### Authentication:
- [ ] Tạo form đăng nhập
- [ ] Implement logic phân quyền (role: teacher/student/admin)
- [ ] Session management (token, heartbeat)
- [ ] Auto-register cho HS mới

### Giao diện GV (Admin Panel):
- [ ] Tab "Danh sách HS" - xem tất cả HS
- [ ] Tab "Kết quả thi" - xem điểm, thời gian, % từng HS
- [ ] Tab "Ngân hàng câu hỏi" - CRUD câu hỏi
- [ ] Tab "Vi phạm" - xem log vi phạm của HS
- [ ] Tab "Đề thi" - tạo đề thi từ ngân hàng

### Giao diện HS:
- [ ] Dashboard với thông tin cá nhân + tiến độ
- [ ] Chọn chủ đề / môn học
- [ ] Giao diện làm bài (timer, navigation, nộp bài)
- [ ] Xem kết quả + giải thích
- [ ] Leaderboard
- [ ] Xem lý thuyết

### Anti-Cheat:
- [ ] Phát hiện chuyển tab (tự nộp bài)
- [ ] Session conflict (1 device cùng lúc)
- [ ] Chống copy/paste
- [ ] Chống DevTools
- [ ] Ghi log vi phạm

### Production:
- [ ] RLS / phân quyền đã test
- [ ] Build thành công
- [ ] Deploy lên Vercel/Netlify
- [ ] Test đăng nhập với GV và HS khác nhau
- [ ] Test HS chỉ xem được dữ liệu của mình
- [ ] Test GV xem được tất cả

---

## 📎 Tài Liệu Tham Khảo

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth + RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Google Apps Script Web App](https://developers.google.com/apps-script/guides/web)
- [React + Vite](https://vitejs.dev/guide/)
- [Lucide Icons](https://lucide.dev)

---

> **💡 Mẹo:** Khi sử dụng skill này, hãy bắt đầu từ database → auth → backend API → frontend. Luôn test phân quyền trước khi làm UI. Dữ liệu mẫu trong Google Sheets có thể copy từ sheet mẫu có sẵn trong thư mục `LMS THAY PHUC/Sheet mẫu.xlsx`.
