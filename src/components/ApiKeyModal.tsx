import React, { useState } from 'react';
import { Key, Eye, EyeOff, CheckCircle2, AlertCircle, Cpu, ExternalLink, X, RefreshCw } from 'lucide-react';
import { AppSettings } from '../types';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (newSettings: Partial<AppSettings>) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [apiKey, setApiKey] = useState(settings.geminiApiKey || '');
  const [selectedModel, setSelectedModel] = useState<AppSettings['selectedModel']>(
    settings.selectedModel || 'gemini-3.6-flash'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setStatusMessage('Đang kiểm tra kết nối với hệ thống Gemini AI...');
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        setTestStatus('success');
        setStatusMessage('Kết nối server AI hoàn toàn sẵn sàng!');
      } else {
        throw new Error('Lỗi phản hồi từ server');
      }
    } catch (err: any) {
      setTestStatus('error');
      setStatusMessage(err.message || 'Khong thể kết nối server AI.');
    }
  };

  const handleSave = () => {
    onSaveSettings({
      geminiApiKey: apiKey.trim(),
      selectedModel,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Cấu Hình Gemini AI Key
            </h2>
            <p className="text-xs text-slate-500">
              Quản lý API Key & Tùy chọn Model cho Gia Sư AI
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* API Key Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Gemini API Key (Tùy chọn dành cho Giáo viên / Admin)
            </label>
            <div className="relative">
              <input
                id="api-key-input"
                type={showPassword ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Dán API Key riêng nếu muốn (Mặc định dùng Key Server)"
                className="w-full px-4 py-2.5 pr-10 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Green Reassuring Notice for Keyless Access & Link to Get Key */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-3.5 text-xs text-emerald-900 dark:text-emerald-300 space-y-1.5">
            <div className="flex items-center justify-between gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Hệ Thống AI Máy Chủ Đã Sẵn Sàng!</span>
              </div>
              <a
                href="https://aistudio.google.com/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-rose-600 hover:text-rose-700 font-bold underline flex items-center gap-1"
              >
                <span>Lấy API Key Miễn Phí</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="leading-relaxed">
              Hệ thống đã tích hợp sẵn <strong>AI Key dùng chung của máy chủ</strong> và <strong>Bộ trợ lý offline</strong>. Học sinh hoàn toàn <strong>không bắt buộc nhập API key</strong> khi vào học!
            </p>
            <p className="text-[11px] opacity-90 italic">
              💡 Nếu hết quota key dùng chung hoặc muốn dùng key riêng của Gmail cá nhân, em/thầy cô có thể lấy key tại <a href="https://aistudio.google.com/api-keys" target="_blank" rel="noreferrer" className="underline font-bold text-blue-600">aistudio.google.com/api-keys</a> và dán vào đây.
            </p>
          </div>

          {/* Model Selector Cards */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-500" />
              Lựa Chọn AI Model (Dạng Thẻ - Cards)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: 'gemini-3.6-flash',
                  name: 'Gemini 3.6 Flash',
                  badge: 'Mặc định • Khuyên dùng',
                  color: 'indigo',
                  desc: 'Nhanh nhất, tối ưu 5 bước Socratic & bài tập SGK Lớp 6',
                },
                {
                  id: 'gemini-3.1-pro-preview',
                  name: 'Gemini 3.1 Pro',
                  badge: 'Tư duy sâu',
                  color: 'purple',
                  desc: 'Giải thích ngữ pháp chuyên sâu & chấm bài viết chi tiết',
                },
                {
                  id: 'gemini-3.1-flash-lite',
                  name: 'Gemini 3.1 Flash Lite',
                  badge: 'Siêu tốc',
                  color: 'emerald',
                  desc: 'Phản hồi cực nhanh, tiết kiệm dữ liệu & token',
                },
                {
                  id: 'gemini-2.5-flash',
                  name: 'Gemini 2.5 Flash',
                  badge: 'Dự phòng',
                  color: 'amber',
                  desc: 'Kết nối ổn định khi các server thế hệ mới bận',
                },
              ].map((m) => {
                const isSelected = selectedModel === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModel(m.id as any)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all text-left relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                          {m.name}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            m.color === 'indigo'
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300'
                              : m.color === 'purple'
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
                              : m.color === 'emerald'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
                          }`}
                        >
                          {m.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        {m.desc}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="mt-2 text-right">
                        <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đang chọn
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Status Banner */}
          {testStatus !== 'idle' && (
            <div
              className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                testStatus === 'testing'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                  : testStatus === 'success'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
              }`}
            >
              {testStatus === 'testing' && <RefreshCw className="w-4 h-4 animate-spin" />}
              {testStatus === 'success' && <CheckCircle2 className="w-4 h-4" />}
              {testStatus === 'error' && <AlertCircle className="w-4 h-4" />}
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-3 flex items-center justify-between gap-3">
            <button
              id="test-connection-btn"
              type="button"
              onClick={handleTestConnection}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Kiểm Tra Kết Nối
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
              >
                Hủy
              </button>
              <button
                id="save-api-key-btn"
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
