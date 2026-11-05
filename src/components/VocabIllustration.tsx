import React, { useState, useEffect, useRef } from 'react';
import { ImagePlus, RefreshCw, Upload, Link2, Check, X, Sparkles, Trash2 } from 'lucide-react';
import {
  resolveVocabImageUrl,
  buildAutoVocabImageUrl,
  getBuiltinVocabImage,
  getVocabEmoji,
  setCustomVocabImage,
  getCustomVocabImage,
  compressImageFileToDataUrl,
} from '../utils/vocabImage';

interface VocabIllustrationProps {
  word: string;
  meaningVi?: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  allowQuickEdit?: boolean;
  onImageChange?: (newImageUrl: string) => void;
  className?: string;
}

export const VocabIllustration: React.FC<VocabIllustrationProps> = ({
  word,
  meaningVi,
  imageUrl,
  size = 'md',
  allowQuickEdit = true,
  onImageChange,
  className = '',
}) => {
  const [seed, setSeed] = useState<number>(1);
  const [customUrl, setCustomUrl] = useState<string | undefined>(() => getCustomVocabImage(word));
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const hasBuiltin = Boolean(getBuiltinVocabImage(word));
  const finalUrl = resolveVocabImageUrl(word, customUrl || imageUrl, seed);
  const emoji = getVocabEmoji(word, meaningVi);

  // Đồng bộ khi đổi từ hoặc có sự kiện cập nhật ảnh
  useEffect(() => {
    const saved = getCustomVocabImage(word);
    setCustomUrl(saved);
    setIsEditorOpen(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgStatus('loaded');
    } else {
      setImgStatus('loading');
    }
  }, [word, imageUrl, finalUrl]);

  useEffect(() => {
    const handleExternalUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.word === word.toLowerCase().trim()) {
        setCustomUrl(detail.imageUrl || undefined);
        setImgStatus('loading');
      }
    };
    window.addEventListener('vocab-image-updated', handleExternalUpdate);
    return () => window.removeEventListener('vocab-image-updated', handleExternalUpdate);
  }, [word]);

  const sizeClasses = {
    sm: 'w-24 h-20 rounded-2xl',
    md: 'w-40 h-32 sm:w-48 sm:h-36 rounded-2xl',
    lg: 'w-48 h-36 sm:w-60 sm:h-44 rounded-3xl',
  }[size];

  const applyNewImage = (newUrl: string) => {
    setCustomVocabImage(word, newUrl);
    setCustomUrl(newUrl || undefined);
    setImgStatus('loading');
    onImageChange?.(newUrl);
  };

  const handleRegenerateAi = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    const nextAiUrl = buildAutoVocabImageUrl(word, nextSeed);
    applyNewImage(nextAiUrl);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const dataUrl = await compressImageFileToDataUrl(file);
      applyNewImage(dataUrl);
      setIsEditorOpen(false);
    } catch (err) {
      alert('Không thể xử lý ảnh này. Vui lòng thử ảnh khác!');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePasteClipboard = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) {
          setIsUploading(true);
          try {
            const dataUrl = await compressImageFileToDataUrl(file);
            applyNewImage(dataUrl);
            setIsEditorOpen(false);
          } finally {
            setIsUploading(false);
          }
        }
        return;
      }
    }
  };

  const handleSaveUrlInput = (e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!urlInput.trim()) return;
    applyNewImage(urlInput.trim());
    setIsEditorOpen(false);
  };

  const handleResetDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    applyNewImage('');
    setSeed(1);
    setIsEditorOpen(false);
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      onClick={isEditorOpen ? (e) => e.stopPropagation() : undefined}
    >
      <div
        className={`relative ${sizeClasses} bg-[#FFFDF5] border-2 border-indigo-100/90 shadow-sm overflow-hidden flex items-center justify-center group/illus`}
      >
        {/* Emoji & Shimmer hiển thị tức thì trong lúc ảnh đang tải hoặc nếu lỗi mạng */}
        {imgStatus !== 'loaded' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-purple-50 p-2 text-center">
            <span className={size === 'sm' ? 'text-3xl' : 'text-5xl animate-bounce'}>
              {emoji}
            </span>
            {imgStatus === 'loading' && size !== 'sm' && (
              <span className="mt-1 text-[10px] font-bold text-indigo-400 animate-pulse">
                Đang tải minh họa...
              </span>
            )}
          </div>
        )}

        {/* Hình ảnh minh họa chính */}
        <img
          ref={imgRef}
          src={finalUrl}
          alt={word}
          onLoad={() => setImgStatus('loaded')}
          onError={() => setImgStatus('error')}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            imgStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Huy hiệu Emoji góc dưới khi ảnh đã tải xong */}
        {imgStatus === 'loaded' && size !== 'sm' && (
          <span
            className="absolute bottom-1.5 left-1.5 w-7 h-7 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-2xs flex items-center justify-center text-sm pointer-events-none"
            title={meaningVi || word}
          >
            {emoji}
          </span>
        )}

        {/* Nút điều khiển nhanh cho Giáo viên khi rê chuột vào ảnh (chỉ hiện khi cho phép chỉnh sửa) */}
        {allowQuickEdit && (
          <div className="absolute top-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover/illus:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUrlInput(customUrl || imageUrl || '');
                setIsEditorOpen(!isEditorOpen);
              }}
              title="Đổi ảnh / Tải ảnh từ máy / Dán ảnh (Ctrl+V)"
              className="p-1.5 rounded-xl bg-white/90 hover:bg-purple-600 text-purple-600 hover:text-white border border-purple-200 shadow-xs transition-all cursor-pointer"
            >
              <ImagePlus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Hộp thoại nhỏ cho phép đổi ảnh siêu tốc ngay trên thẻ */}
      {isEditorOpen && (
        <div
          onPaste={handlePasteClipboard}
          className="mt-2 w-72 sm:w-80 bg-white rounded-2xl p-3.5 border-2 border-indigo-200 shadow-xl z-30 text-left space-y-2.5 animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-indigo-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Đổi hình minh họa: “{word}”
            </span>
            <button
              type="button"
              onClick={() => setIsEditorOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hàng nút nhanh: Tải file hoặc Tạo lại AI (chỉ hiện nút AI nếu từ chưa có ảnh bộ thẻ chuẩn) */}
          <div className={hasBuiltin ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-2 gap-2'}>
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="py-2 px-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs inline-flex items-center justify-center gap-1.5 border border-indigo-200 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Đang nén...' : 'Tải ảnh máy'}</span>
            </button>

            {!hasBuiltin && (
              <button
                type="button"
                onClick={handleRegenerateAi}
                className="py-2 px-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-xs inline-flex items-center justify-center gap-1.5 border border-purple-200 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Đổi ảnh AI</span>
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Ô dán link hoặc Ctrl+V ảnh trực tiếp */}
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveUrlInput(e);
                  }
                }}
                placeholder="Dán link ảnh hoặc bấm Ctrl+V ảnh..."
                className="w-full pl-8 pr-2 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveUrlInput}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
              title="Lưu link ảnh"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            {(customUrl || imageUrl) && (
              <button
                type="button"
                onClick={handleResetDefault}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                title="Khôi phục ảnh AI mặc định"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <p className="text-[10px] font-semibold text-slate-400 leading-tight">
            💡 Mẹo nhanh: Copy bất kỳ hình nào trên Google/Word rồi nhấn <strong>Ctrl + V</strong> vào khung này!
          </p>
        </div>
      )}
    </div>
  );
};
