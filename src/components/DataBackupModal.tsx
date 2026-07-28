import React, { useRef } from 'react';
import { Download, Upload, X, HardDrive, CheckCircle } from 'lucide-react';
import { AppDataSchema } from '../types';
import { exportBackupJSON, saveAppData } from '../services/storage';

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  appData: AppDataSchema;
  onDataRestored: (newData: AppDataSchema) => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  appData,
  onDataRestored,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMsg, setSuccessMsg] = React.useState('');

  if (!isOpen) return null;

  const handleExport = () => {
    exportBackupJSON(appData);
    setSuccessMsg('Đã xuất file sao lưu JSON thành công!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.units && parsed.progress) {
          saveAppData(parsed);
          onDataRestored(parsed);
          setSuccessMsg('Đã khôi phục dữ liệu thành công!');
          setTimeout(() => setSuccessMsg(''), 3000);
        } else {
          alert('File JSON không đúng định dạng dữ liệu của ứng dụng.');
        }
      } catch (err) {
        alert('Lỗi đọc file sao lưu JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Sao Lưu & Khôi Phục Dữ Liệu
            </h2>
            <p className="text-xs text-slate-500">
              Quản lý điểm số, tiến độ học và lịch sử bài làm
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="space-y-3">
          <button
            id="export-data-btn"
            onClick={handleExport}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all hover:shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Xuất File Backup (JSON)
                </h4>
                <p className="text-xs text-slate-500">
                  Tải về tiến độ học tập và bài tập của em
                </p>
              </div>
            </div>
          </button>

          <button
            id="import-data-btn"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all hover:shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Nhập Khôi Phục File (JSON)
                </h4>
                <p className="text-xs text-slate-500">
                  Tải lên file dữ liệu đã lưu từ thiết bị khác
                </p>
              </div>
            </div>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            className="hidden"
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
