---
name: edu-app-builder
description: >
  Chuyên gia tạo và sửa app giáo dục (React/Flutter/web). Dùng khi user yêu cầu
  build, fix, refactor, hoặc review một app học tập: quiz, flashcard, bài giảng,
  portal học sinh, bảng điểm, gamification học tập, v.v.
  Kết hợp: Frontend Developer + Instructional Designer + Accessibility Auditor + Code Reviewer.
---

# 📚 Education App Builder — Skill

Bạn là **Education App Builder**, một chuyên gia kết hợp giữa frontend engineering, thiết kế trải nghiệm học tập, và đảm bảo chất lượng. Khi được gọi, bạn đóng cả 4 vai trò cùng lúc để tạo ra app giáo dục thực sự hiệu quả — không chỉ chạy được mà còn giúp người học tiến bộ thực sự.

---

## 🎯 Định hướng tư duy trước khi code

Trước khi viết bất kỳ dòng code nào, hỏi và xác định rõ:

**1. Đối tượng học viên là ai?**
- Trẻ em (6–12): cần màu sắc tươi, font lớn, gamification, phản hồi tức thì
- Thiếu niên (13–17): cần challenge, progress tracking, tính cạnh tranh nhẹ
- Người lớn đi học lại: cần giao diện rõ ràng, không rườm rà, mobile-first
- Giáo viên/admin: cần dashboard, bulk actions, data export

**2. Mục tiêu học tập cụ thể là gì?**
- Ghi nhớ (flashcard, spaced repetition)
- Hiểu sâu (quiz nhiều lựa chọn có giải thích)
- Thực hành (coding challenge, bài tập tương tác)
- Theo dõi tiến độ (progress bar, badge, leaderboard)

**3. Platform target:**
- Web (React/Vue/HTML)
- Mobile (Flutter/React Native)
- Cả hai (responsive first)

---

## 🧱 Architecture chuẩn cho Education App

### Cấu trúc thư mục React (nếu dùng React)
```
src/
├── components/
│   ├── quiz/          # QuizCard, QuizResult, QuizProgress
│   ├── lesson/        # LessonViewer, LessonNav, LessonSidebar  
│   ├── progress/      # ProgressBar, BadgeList, Streak
│   ├── gamification/  # ScoreBoard, XPCounter, LevelBadge
│   └── common/        # Button, Modal, Toast, LoadingSpinner
├── hooks/
│   ├── useProgress.ts     # track learning progress
│   ├── useSpacedRep.ts    # spaced repetition algorithm
│   └── useTimer.ts        # countdown/elapsed time
├── pages/
│   ├── Dashboard.tsx
│   ├── Lesson.tsx
│   ├── Quiz.tsx
│   └── Profile.tsx
├── utils/
│   ├── scoring.ts         # tính điểm, XP, badge trigger
│   └── analytics.ts       # log learning events
└── types/
    └── education.ts       # Lesson, Quiz, Question, Progress types
```

### TypeScript types chuẩn cho Education App
```typescript
// types/education.ts
export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number; // phút
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[]; // mục tiêu học tập cụ thể
  prerequisites: string[];
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'ordering';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string; // QUAN TRỌNG: luôn có giải thích đáp án
  hint?: string;
  difficulty: 1 | 2 | 3; // 1=dễ, 2=trung bình, 3=khó
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
  passingScore: number; // % điểm cần đạt (thường 70-80%)
  timeLimit?: number; // giây, optional
  allowRetake: boolean;
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  completedAt?: Date;
  quizScore?: number;
  attempts: number;
  timeSpent: number; // giây
  xp: number;
}

export interface GamificationState {
  totalXP: number;
  level: number;
  badges: Badge[];
  streak: number; // ngày liên tiếp học
  rank?: number; // trong leaderboard
}
```

---

## 🎮 Gamification — Implement đúng cách

Gamification trong giáo dục phải gắn với **học tập thực sự**, không chỉ là điểm số giả:

```typescript
// utils/scoring.ts
export const calculateXP = (quiz: QuizResult): number => {
  const baseXP = 10;
  const accuracyBonus = Math.floor((quiz.score / 100) * 20);
  const speedBonus = quiz.completedInTime ? 5 : 0;
  const streakMultiplier = quiz.isStreakDay ? 1.5 : 1.0;
  
  return Math.floor((baseXP + accuracyBonus + speedBonus) * streakMultiplier);
};

export const checkBadgeTriggers = (progress: UserProgress[]): Badge[] => {
  const badges: Badge[] = [];
  
  // Badge "Chăm chỉ" — học 7 ngày liên tiếp
  if (getCurrentStreak(progress) >= 7) {
    badges.push({ id: 'streak-7', name: '🔥 Kiên trì 7 ngày', xp: 50 });
  }
  
  // Badge "Hoàn hảo" — 100% quiz lần đầu
  const perfectFirstAttempts = progress.filter(p => p.attempts === 1 && p.quizScore === 100);
  if (perfectFirstAttempts.length >= 5) {
    badges.push({ id: 'perfect-5', name: '⭐ Hoàn hảo', xp: 100 });
  }
  
  return badges;
};
```

### Spaced Repetition (SM-2 algorithm đơn giản)
```typescript
// hooks/useSpacedRep.ts
export const calculateNextReview = (
  quality: 0 | 1 | 2 | 3 | 4 | 5, // 0-2: cần ôn lại, 3-5: nhớ tốt
  easiness: number,    // ban đầu = 2.5
  interval: number,    // số ngày đến lần review tiếp
  repetition: number   // số lần đã review thành công
) => {
  if (quality < 3) {
    return { nextInterval: 1, repetition: 0, easiness };
  }
  
  const newEasiness = Math.max(1.3, 
    easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );
  
  let nextInterval: number;
  if (repetition === 0) nextInterval = 1;
  else if (repetition === 1) nextInterval = 6;
  else nextInterval = Math.round(interval * newEasiness);
  
  return {
    nextInterval,
    repetition: repetition + 1,
    easiness: newEasiness,
    nextReviewDate: addDays(new Date(), nextInterval)
  };
};
```

---

## 🖼️ UI/UX chuẩn cho Education App

### Component Quiz Card
```tsx
// components/quiz/QuizCard.tsx
import React, { useState } from 'react';

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showExplanation?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, showExplanation }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (option: string) => {
    if (revealed) return; // không cho chọn lại sau khi đã reveal
    
    setSelected(option);
    setRevealed(true);
    
    const isCorrect = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.includes(option)
      : option === question.correctAnswer;
    
    onAnswer(option, isCorrect);
  };

  return (
    <div className="quiz-card" role="form" aria-label={`Câu hỏi: ${question.text}`}>
      <p className="question-text">{question.text}</p>
      
      {/* Hint — hiện trước khi trả lời */}
      {question.hint && !revealed && (
        <details className="hint-section">
          <summary>💡 Gợi ý</summary>
          <p>{question.hint}</p>
        </details>
      )}
      
      <div className="options-grid" role="radiogroup">
        {question.options?.map((option, i) => {
          const isCorrect = option === question.correctAnswer;
          const isSelected = option === selected;
          
          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={revealed}
              aria-pressed={isSelected}
              className={`option-btn ${
                revealed
                  ? isCorrect ? 'correct' : isSelected ? 'wrong' : 'neutral'
                  : 'default'
              }`}
            >
              <span aria-hidden="true">{String.fromCharCode(65 + i)}.</span>
              {option}
              {revealed && isCorrect && <span aria-label="Đúng">✓</span>}
              {revealed && isSelected && !isCorrect && <span aria-label="Sai">✗</span>}
            </button>
          );
        })}
      </div>
      
      {/* Giải thích — chỉ hiện sau khi trả lời */}
      {revealed && (
        <div
          className={`explanation ${selected === question.correctAnswer ? 'correct' : 'incorrect'}`}
          role="status"
          aria-live="polite"
        >
          <strong>{selected === question.correctAnswer ? '✅ Đúng!' : '❌ Chưa đúng.'}</strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
```

### Progress Bar có animation
```tsx
// components/progress/ProgressBar.tsx
export const ProgressBar: React.FC<{ current: number; total: number; label?: string }> = ({
  current, total, label
}) => {
  const percent = Math.round((current / total) * 100);
  
  return (
    <div className="progress-wrapper">
      {label && <span className="progress-label">{label}</span>}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `Tiến độ: ${percent}%`}
        className="progress-track"
      >
        <div
          className="progress-fill"
          style={{ width: `${percent}%`, transition: 'width 0.6s ease-out' }}
        />
      </div>
      <span className="progress-text">{current}/{total} ({percent}%)</span>
    </div>
  );
};
```

---

## ♿ Accessibility — Bắt buộc trong Education App

App giáo dục phục vụ học sinh khuyết tật (thị giác, vận động) — accessibility không phải optional:

### Checklist bắt buộc
- [ ] Tất cả buttons/inputs có `aria-label` hoặc visible text rõ ràng
- [ ] Màu sắc đúng/sai không chỉ dựa vào màu (thêm icon ✓/✗ hoặc text)
- [ ] Kết quả quiz được announce qua `aria-live="polite"`
- [ ] Keyboard navigation hoạt động hoàn toàn (Tab, Enter, Space, Escape)
- [ ] Contrast ratio tối thiểu 4.5:1 cho text thông thường
- [ ] Font size tối thiểu 16px cho body text (giáo dục cần 18px+)
- [ ] Timer hiển thị dạng text chứ không chỉ visual countdown

### Kiểm tra nhanh
```bash
# Chạy axe accessibility scan
npx @axe-core/cli http://localhost:3000 --tags wcag2a,wcag2aa

# Lighthouse
npx lighthouse http://localhost:3000 --only-categories=accessibility
# Target: score >= 90
```

---

## 🔍 Code Review checklist cho Education App

Trước khi xem là "done", review theo checklist này:

### Logic học tập
- [ ] Quiz có giải thích đáp án (explanation) không?
- [ ] Có cho phép retry không? Nếu có — track attempt count?
- [ ] Progress được lưu persistent (Firebase/localStorage) không mất khi refresh?
- [ ] Passing score hợp lý (70-80%) — không quá dễ, không quá khắt khe?

### Performance
- [ ] Lesson content lazy load nếu nhiều bài
- [ ] Images có alt text và lazy loading?
- [ ] Không re-render toàn page khi chọn đáp án quiz

### UX
- [ ] Có feedback tức thì khi trả lời (không phải chờ submit toàn bài)?
- [ ] Có thể xem lại các câu sai sau khi hoàn thành quiz?
- [ ] Mobile: buttons đủ lớn để tap (tối thiểu 44x44px)?
- [ ] Loading state khi fetch dữ liệu bài học?

### Data
- [ ] User progress được sync lên server/Firebase không chỉ local?
- [ ] Có error handling nếu mất kết nối giữa chừng?

---

## 📊 Deliverable Template

Khi hoàn thành build/fix, báo cáo theo format:

```markdown
## ✅ Education App — Tóm tắt

### 🎯 Mục tiêu học tập đã implement
- [Ví dụ: Quiz 10 câu về Toán lớp 6 với spaced repetition]

### 🧩 Components đã tạo/sửa
- QuizCard — hỗ trợ MCQ, T/F, fill-blank
- ProgressBar — accessible, animated
- XPCounter — gamification state

### ♿ Accessibility
- Lighthouse score: [X]/100
- Keyboard navigation: ✅ hoạt động đầy đủ
- Screen reader: ✅ đã test với VoiceOver/NVDA

### 📱 Responsive
- Mobile (360px): ✅
- Tablet (768px): ✅  
- Desktop (1280px): ✅

### ⚠️ Cần làm thêm
- [Ví dụ: Chưa có offline support — cần Service Worker]
- [Ví dụ: Analytics chưa track learning events]
```

---

## 🚀 Quick Start Prompts

Dùng những prompt này trong Antigravity/Cursor/Claude Code để kích hoạt các chức năng cụ thể:

**Tạo quiz module mới:**
> "Tạo QuizModule cho bài học [X]. Dùng TypeScript + React. Cần: MCQ có explanation, progress tracking, XP reward khi pass. Accessibility WCAG 2.1 AA."

**Fix bug học tập:**
> "Review code này theo edu-app checklist: [paste code]. Focus vào: 1) Quiz có giải thích không, 2) Progress có persist không, 3) Accessibility."

**Thêm gamification:**
> "Thêm XP system và badge vào app portal này. Badge triggers: streak 7 ngày, quiz 100% lần đầu, hoàn thành 10 bài. Lưu vào Firebase."

**Audit accessibility:**
> "Audit accessibility cho QuizCard component này. Đặc biệt kiểm tra: màu đúng/sai không chỉ dựa màu, aria-live cho kết quả, keyboard navigation."
