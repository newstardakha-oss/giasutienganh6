---
description: Lưu/khôi phục phiên làm việc vào localStorage + Tự động xoay API key dự phòng khi hết quota - áp dụng cho mọi app React dùng Gemini/OpenAI API
---

# Session Persistence + API Key Auto-Rotation Skill

## Tổng quan

Skill này giải quyết 2 vấn đề phổ biến khi xây dựng app AI:
1. **Mất tiến trình** khi user tắt app/trình duyệt giữa chừng
2. **Đứt đoạn** khi API key hết quota - app dừng và user không biết phải làm gì

---

## PHẦN 1: SESSION PERSISTENCE (Lưu/Khôi phục phiên)

### Nguyên lý
- Tự động lưu toàn bộ state vào `localStorage` mỗi 2 giây (debounced)
- Khi mở app lại → hiện modal hỏi "Tiếp tục hay bắt đầu mới?"
- Khôi phục: form data, nội dung đã tạo, bước hiện tại, lịch sử chat AI

### Bước 1: Định nghĩa SessionData interface

```typescript
// Cấu trúc dữ liệu phiên cần lưu
const SESSION_SAVE_KEY = 'app_session_data';

interface SessionData {
  // Dữ liệu form/user input (bỏ các field quá lớn như file upload)
  formData: any;
  // Trạng thái tiến trình
  state: {
    step: number;         // Bước hiện tại
    messages: any[];      // Lịch sử chat
    generatedContent: string; // Nội dung đã tạo
  };
  // Dữ liệu phụ (tùy app)
  extraData: any;
  // Lịch sử chat AI (để khôi phục context)
  chatHistory: any[];
  // Timestamp
  savedAt: string;
}
```

### Bước 2: Hàm lưu phiên (auto-save)

```tsx
// Hàm lưu phiên
const saveSession = useCallback(() => {
  // Chỉ lưu khi đã bắt đầu làm việc
  if (state.step <= INITIAL_STEP || state.isLoading) return;

  try {
    const sessionData: SessionData = {
      formData: {
        ...formData,
        // KHÔNG lưu file content (quá lớn) → dùng flag
        fileContent: '',
        hasFileContent: !!formData.fileContent,
      },
      state: {
        step: state.step,
        messages: state.messages,
        generatedContent: state.generatedContent,
      },
      extraData: extraState,
      chatHistory: getChatHistory(), // Từ service
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(SESSION_SAVE_KEY, JSON.stringify(sessionData));
    console.log('💾 Đã lưu phiên');
  } catch (e) {
    console.warn('Không thể lưu phiên (dữ liệu quá lớn?):', e);
  }
}, [state, formData, extraState]);

// Auto-save debounced 2 giây
useEffect(() => {
  if (state.step <= INITIAL_STEP || state.isLoading) return;
  const timer = setTimeout(() => saveSession(), 2000);
  return () => clearTimeout(timer);
}, [state.step, state.generatedContent, extraState, saveSession]);
```

### Bước 3: Khôi phục phiên khi mount

```tsx
// State cho modal khôi phục
const [showRestoreModal, setShowRestoreModal] = useState(false);
const [pendingSession, setPendingSession] = useState<SessionData | null>(null);

// Kiểm tra phiên đã lưu khi app mount
useEffect(() => {
  try {
    const saved = localStorage.getItem(SESSION_SAVE_KEY);
    if (saved) {
      const data: SessionData = JSON.parse(saved);
      if (data.state && data.state.step > INITIAL_STEP) {
        setPendingSession(data);
        setShowRestoreModal(true);
      }
    }
  } catch (e) {
    localStorage.removeItem(SESSION_SAVE_KEY);
  }
}, []);

// Hàm khôi phục
const restoreSession = (data: SessionData) => {
  setFormData(prev => ({ ...prev, ...data.formData }));
  setState({
    step: data.state.step,
    messages: data.state.messages as any,
    generatedContent: data.state.generatedContent || '',
    isLoading: false,
    error: null,
  });
  if (data.extraData) setExtraState(data.extraData);

  // Khôi phục chat history cho AI
  if (data.chatHistory?.length > 0) {
    setChatHistory(data.chatHistory);
  }

  // Reinit AI session
  const savedKey = localStorage.getItem('api_key');
  if (savedKey) {
    initializeChat(savedKey);
    // Init reset history → set lại
    if (data.chatHistory?.length > 0) {
      setChatHistory(data.chatHistory);
    }
  }
};

// Hàm xóa phiên
const clearSession = () => {
  localStorage.removeItem(SESSION_SAVE_KEY);
};
```

### Bước 4: Modal khôi phục phiên (UI)

```tsx
{showRestoreModal && pendingSession && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-sky-500 p-6 text-white">
        <h3 className="text-lg font-bold">Khôi phục phiên làm việc</h3>
        <p className="text-sm text-blue-100">Bạn có phiên làm việc chưa hoàn thành</p>
      </div>
      <div className="p-6">
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            Đã lưu lúc: {new Date(pendingSession.savedAt).toLocaleString('vi-VN')}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => {
            setShowRestoreModal(false);
            clearSession();
            setPendingSession(null);
          }} className="flex-1 px-4 py-3 bg-gray-100 rounded-xl">
            ✖ Bắt đầu mới
          </button>
          <button onClick={() => {
            restoreSession(pendingSession);
            setShowRestoreModal(false);
            setPendingSession(null);
          }} className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl font-bold">
            ✔ Tiếp tục làm
          </button>
        </div>
      </div>
    </div>
  </div>
)}
```

### Bước 5: Nút Lưu/Xóa phiên (sidebar)

```tsx
{/* Nút lưu phiên thủ công */}
<div className="flex gap-2">
  <button onClick={saveSession}
    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs border border-emerald-200">
    <Save size={13} /> Lưu phiên
  </button>
  <button onClick={() => { if (confirm('Xóa phiên đã lưu?')) clearSession(); }}
    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs border border-red-200">
    <Trash2 size={13} />
  </button>
</div>
```

### Bước 6: Export/Import chat history từ AI service

```typescript
// Trong file AI service (geminiService.ts, openaiService.ts, ...)
let history: any[] = [];

// Export để lưu phiên
export const getChatHistory = (): any[] => [...history];

// Import để khôi phục phiên
export const setChatHistory = (savedHistory: any[]) => {
  history = savedHistory || [];
};
```

---

## PHẦN 2: API KEY AUTO-ROTATION (Tự động xoay key)

### Nguyên lý
- Khi API key hết quota → tự động chuyển sang key dự phòng → retry ngay
- User không cần làm gì, app tự xử lý
- Nếu hết tất cả key → hiện thông báo rõ ràng với 2 lựa chọn

### Bước 1: Tạo ApiKeyManager (singleton)

```typescript
// File: services/apiKeyManager.ts

const BACKUP_API_KEYS = [
  { key: 'AIza...xxx', name: 'Backup Key 1' },
  { key: 'AIza...yyy', name: 'Backup Key 2' },
  // Thêm bao nhiêu key tùy ý
];

class ApiKeyManager {
  private keys: Array<{
    key: string;
    name: string;
    status: 'active' | 'cooldown' | 'error';
    errorCount: number;
    cooldownUntil?: number;
  }> = [];
  private currentIndex = 0;

  constructor() { this.loadFromStorage(); }

  loadFromStorage() {
    // Load từ localStorage
    // Migration: lấy key cũ nếu có
    // Inject backup keys nếu chưa có
  }

  getActiveKey(): string | null {
    // Tìm key active gần nhất
  }

  markKeyError(key: string, errorType: string) {
    // Đánh dấu key lỗi → cooldown
    // Xoay sang key tiếp theo
    return this.rotateToNextKey(errorType);
  }

  rotateToNextKey(reason: string) {
    // Tìm key active tiếp theo
    // Return { success, hasMoreKeys, newKey, message }
  }

  resetAllKeys() {
    // Reset tất cả key về active (sau khi hết cooldown)
  }
}

export const apiKeyManager = new ApiKeyManager();
```

### Bước 2: Tích hợp auto-rotation vào catch block

```tsx
// Trong catch block của hàm generate/send message
} catch (error: any) {
  const errorType = parseApiError(error); // 'QUOTA_EXCEEDED' | 'RATE_LIMIT' | ...

  if (errorType === 'QUOTA_EXCEEDED' || errorType === 'RATE_LIMIT') {
    // Tự động xoay key
    const rotation = apiKeyManager.markKeyError(apiKey, errorType);
    if (rotation.success && rotation.newKey) {
      console.log(`🔄 Tự động xoay key: ${rotation.message}`);
      setApiKey(rotation.newKey);
      localStorage.setItem('api_key', rotation.newKey);
      initializeChat(rotation.newKey, selectedModel);

      // Tự động retry với key mới
      setState(prev => ({ ...prev, isLoading: false, error: null }));
      setTimeout(() => continueGeneration(), 500);
      return; // Không hiện lỗi!
    }
  }

  // Chỉ hiện lỗi nếu không xoay được key
  setState(prev => ({ ...prev, isLoading: false, error: error.message }));
}
```

### Bước 3: Nút "Thử lại (đổi key)" thủ công

```tsx
<button onClick={() => {
  // Xoay sang key tiếp theo
  const rotation = apiKeyManager.rotateToNextKey('manual_retry');
  let keyToUse = apiKey;

  if (rotation.success && rotation.newKey) {
    keyToUse = rotation.newKey;
    setApiKey(keyToUse);
    localStorage.setItem('api_key', keyToUse);
  } else {
    // Hết key → reset tất cả và thử lại
    apiKeyManager.resetAllKeys();
    const freshKey = apiKeyManager.getActiveKey();
    if (freshKey) {
      keyToUse = freshKey;
      setApiKey(keyToUse);
      localStorage.setItem('api_key', keyToUse);
    }
  }

  setState(prev => ({ ...prev, error: null }));
  initializeChat(keyToUse, selectedModel);

  // Khôi phục chat history trước khi retry
  const savedHistory = getChatHistory();
  if (savedHistory.length > 0) setChatHistory(savedHistory);

  setTimeout(() => continueGeneration(), 300);
}} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
  🔄 Thử lại (đổi key)
</button>
```

### Bước 4: Thông báo hướng dẫn cho user khi lỗi

```tsx
{/* Hướng dẫn thao tác khi gặp lỗi */}
{state.step > INITIAL_STEP && (
  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-4 mt-3 border border-blue-200">
    <p className="text-sm font-bold text-blue-800 mb-2">📋 Bạn có 2 lựa chọn:</p>
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <span className="text-emerald-600 font-bold">1.</span>
        <p className="text-sm text-gray-700">
          <strong className="text-emerald-700">Bấm "🔄 Thử lại (đổi key)"</strong>
          - App tự chuyển sang API key dự phòng và tiếp tục chạy ngay.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-sky-600 font-bold">2.</span>
        <p className="text-sm text-gray-700">
          <strong className="text-sky-700">Bấm "💾 Lưu phiên"</strong>
          rồi tắt app. Hôm sau mở lại, API key sẽ reset và tiếp tục từ chỗ dừng.
        </p>
      </div>
    </div>
  </div>
)}
```

---

## PHẦN 3: CHECKLIST TRIỂN KHAI

### Session Persistence
- [ ] Tạo `SessionData` interface phù hợp với app
- [ ] Tạo `SESSION_SAVE_KEY` constant
- [ ] Thêm `saveSession()` với useCallback
- [ ] Thêm `useEffect` auto-save debounced 2 giây
- [ ] Thêm `restoreSession()` function
- [ ] Thêm `clearSession()` function
- [ ] Thêm kiểm tra phiên đã lưu trong mount `useEffect`
- [ ] Thêm state `showRestoreModal` + `pendingSession`
- [ ] Thêm modal khôi phục phiên UI
- [ ] Thêm nút 💾 Lưu phiên / 🗑 Xóa phiên trong sidebar
- [ ] Export `getChatHistory()` / `setChatHistory()` từ AI service
- [ ] **LƯU Ý**: Không lưu file content lớn → dùng flag `hasFileContent`

### API Key Rotation
- [ ] Tạo file `services/apiKeyManager.ts` (hoặc copy từ SKKN PRO)
- [ ] Thêm backup API keys vào `BACKUP_API_KEYS`
- [ ] Import `apiKeyManager` vào component chính
- [ ] Import `parseApiError` từ AI service
- [ ] Thêm auto-rotation trong catch blocks (startGeneration, generateNext...)
- [ ] Cập nhật nút "Thử lại" → xoay key trước khi retry
- [ ] Thêm thông báo hướng dẫn 2 lựa chọn cho user
- [ ] Test: gây lỗi quota → verify auto-rotation → verify retry button

---

## ÁP DỤNG CHO CÁC LOẠI APP

| Loại App | Thay đổi cần làm |
|----------|------------------|
| App dùng Gemini API | Dùng nguyên, không sửa gì |
| App dùng OpenAI API | Đổi `initializeGeminiChat` → `initializeOpenAI` |
| App dùng Claude API | Đổi init function + error parsing |
| App multi-step (wizard) | Lưu thêm `currentStep`, form data từng bước |
| App chat đơn giản | Chỉ cần lưu `messages[]` |

## Tips

1. **localStorage limit ~5MB** → Không lưu file/image content, dùng flag
2. **Debounce 2s** → Tránh ghi quá nhiều, nhưng đủ nhanh để không mất data
3. **Chat history** → Init AI session reset history, phải `setChatHistory` SAU `init`
4. **Cooldown 5 phút** → Key tự active lại sau 5 phút, phù hợp rate limit thực tế
5. **Reset all keys** → Fallback cuối cùng khi hết tất cả key
