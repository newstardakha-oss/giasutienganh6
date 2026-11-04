import React, { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  Trash2,
  CheckCircle2,
  Sliders,
  AlertTriangle,
} from 'lucide-react';
import { VocabSrsSettings } from '../types';
import { speakWithSynthesis } from '../speech';

interface VocabSettingsViewProps {
  settings: VocabSrsSettings;
  onUpdateSettings: (newSettings: VocabSrsSettings) => void;
  onResetProgress: () => void;
  onBack: () => void;
}

export const VocabSettingsView: React.FC<VocabSettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onResetProgress,
  onBack,
}) => {
  const [form, setForm] = useState<VocabSrsSettings>(settings);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

  const handleSave = (next: VocabSrsSettings) => {
    setForm(next);
    onUpdateSettings(next);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border-2 border-purple-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ⚙️ Cài Đặt Học Từ Vựng
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Tùy chỉnh hạn mức từ mới, giọng phát âm và tốc độ đọc
            </p>
          </div>
        </div>

        {savedNotice && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-extrabold">
            <CheckCircle2 className="w-4 h-4" />
            Đã lưu tự động
          </span>
        )}
      </div>

      {/* Cài đặt học tập & âm thanh */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 space-y-6">
        {/* 1. Số từ mới mỗi ngày */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Số từ mới mỗi ngày</span>
            </label>
            <span className="px-3.5 py-1 rounded-xl bg-indigo-100 text-indigo-800 font-black text-base">
              {form.newWordsPerDay} từ / ngày ({form.newWordsPerDay * 3} lượt thẻ)
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={25}
            step={1}
            value={form.newWordsPerDay}
            onChange={(e) =>
              handleSave({ ...form, newWordsPerDay: Number(e.target.value) })
            }
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <p className="text-xs text-slate-500 font-semibold">
            Mặc định là 10 từ mới/ngày (tương đương ít nhất 30 lượt ôn cho 3 loại thẻ).
          </p>
        </div>

        {/* 2. Tự động phát audio */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-sm sm:text-base font-black text-slate-900 block">
              Tự động phát âm thanh khi mở thẻ
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Tự phát 1 lần ở Thẻ 1 (Làm quen) và Thẻ 2 (Nghe & đoán)
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              handleSave({ ...form, autoPlayAudio: !form.autoPlayAudio })
            }
            className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
              form.autoPlayAudio ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${
                form.autoPlayAudio ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 3. Chọn giọng Anh-Mỹ hoặc Anh-Anh */}
        <div className="space-y-2 pt-4 border-t border-slate-100">
          <span className="text-sm sm:text-base font-black text-slate-900 block">
            Chọn giọng phát âm tiếng Anh
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSave({ ...form, voiceLang: 'en-US' })}
              className={`p-4 rounded-2xl border-2 font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                form.voiceLang === 'en-US'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              <span>🇺🇸 Giọng Anh – Mỹ (en-US)</span>
            </button>
            <button
              type="button"
              onClick={() => handleSave({ ...form, voiceLang: 'en-GB' })}
              className={`p-4 rounded-2xl border-2 font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                form.voiceLang === 'en-GB'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              <span>🇬🇧 Giọng Anh – Anh (en-GB)</span>
            </button>
          </div>
        </div>

        {/* 4. Tốc độ đọc */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-black text-slate-900">
              Tốc độ đọc (mặc định 0.9x rõ ràng cho học sinh lớp 6)
            </span>
            <span className="px-3 py-1 rounded-xl bg-sky-100 text-sky-800 font-black text-sm">
              {form.speechRate.toFixed(2)}x
            </span>
          </div>
          <input
            type="range"
            min={0.6}
            max={1.2}
            step={0.05}
            value={form.speechRate}
            onChange={(e) =>
              handleSave({ ...form, speechRate: Number(e.target.value) })
            }
            className="w-full accent-sky-500 cursor-pointer"
          />
          <button
            type="button"
            onClick={() =>
              speakWithSynthesis(
                'English is my favourite subject at school.',
                form.voiceLang,
                form.speechRate
              )
            }
            className="px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-extrabold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>🔊 Nghe thử giọng đọc</span>
          </button>
        </div>
      </div>

      {/* Khu vực Xóa tiến độ (có hộp thoại xác nhận) */}
      <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-rose-700 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              <span>Xóa Toàn Bộ Tiến Độ Học Từ Vựng</span>
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Đặt lại toàn bộ trạng thái thẻ của các từ về trạng thái ban đầu (chưa học). Danh sách từ vựng vẫn được giữ nguyên.
            </p>
          </div>

          {!showConfirmReset && (
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="px-4 py-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-extrabold text-xs shrink-0 cursor-pointer"
            >
              Xóa tiến độ...
            </button>
          )}
        </div>

        {showConfirmReset && (
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>
                Em có chắc chắn muốn xóa toàn bộ tiến độ ôn tập và chuỗi ngày học liên tiếp không?
              </span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-extrabold text-xs cursor-pointer"
              >
                Không, giữ lại tiến độ
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setShowConfirmReset(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs cursor-pointer"
              >
                Có, xóa toàn bộ tiến độ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
