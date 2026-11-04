import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Lock,
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload,
  Volume2,
  Check,
  X,
  Search,
  Sparkles,
  ImagePlus,
} from 'lucide-react';
import { Word, VocabSrsSettings } from '../types';
import { speakWord } from '../speech';
import { VocabIllustration } from '../../components/VocabIllustration';
import {
  buildAutoVocabImageUrl,
  compressImageFileToDataUrl,
  getCustomVocabImage,
  setCustomVocabImage,
} from '../../utils/vocabImage';

interface TeacherVocabViewProps {
  words: Word[];
  settings: VocabSrsSettings;
  onUpdateWords: (newWords: Word[]) => void;
  onBack: () => void;
}

const EMPTY_WORD_FORM: Omit<Word, 'id'> = {
  word: '',
  ipa: '',
  partOfSpeech: 'n',
  meaningVi: '',
  definitionEn: '',
  example: '',
  exampleVi: '',
  audioUrl: '',
  imageUrl: '',
  unit: 'Unit 1 - My New School',
};

export const TeacherVocabView: React.FC<TeacherVocabViewProps> = ({
  words,
  settings,
  onUpdateWords,
  onBack,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingWordId, setEditingWordId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<Word, 'id'>>(EMPTY_WORD_FORM);
  const [isImageCompressing, setIsImageCompressing] = useState<boolean>(false);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  // Nhập hàng loạt CSV / JSON
  const [isBulkOpen, setIsBulkOpen] = useState<boolean>(false);
  const [bulkText, setBulkText] = useState<string>('');
  const [bulkUnitDefault, setBulkUnitDefault] = useState<string>('Unit 1 - My New School');
  const [bulkMessage, setBulkMessage] = useState<string | null>(null);

  const units = Array.from(new Set(words.map((w) => w.unit)));

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === (settings.teacherPin || '1234')) {
      setIsUnlocked(true);
      setPinError(null);
    } else {
      setPinError('Mã PIN chưa đúng! (Mã PIN mặc định là 1234)');
    }
  };

  const handleStartAdd = () => {
    setEditingWordId(null);
    setFormData({
      ...EMPTY_WORD_FORM,
      unit: selectedUnit !== 'ALL' ? selectedUnit : 'Unit 1 - My New School',
    });
    setIsAddingNew(true);
  };

  const handleStartEdit = (w: Word) => {
    setIsAddingNew(false);
    setEditingWordId(w.id);
    setFormData({
      word: w.word,
      ipa: w.ipa || '',
      partOfSpeech: w.partOfSpeech || 'n',
      meaningVi: w.meaningVi,
      definitionEn: w.definitionEn,
      example: w.example,
      exampleVi: w.exampleVi || '',
      audioUrl: w.audioUrl || '',
      imageUrl: w.imageUrl || getCustomVocabImage(w.word) || '',
      unit: w.unit,
    });
  };

  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImageCompressing(true);
    try {
      const dataUrl = await compressImageFileToDataUrl(file);
      setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
    } catch {
      alert('Không thể đọc file ảnh này. Vui lòng thử ảnh khác!');
    } finally {
      setIsImageCompressing(false);
      if (imageFileInputRef.current) imageFileInputRef.current.value = '';
    }
  };

  const handlePasteImageInForm = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) {
          setIsImageCompressing(true);
          try {
            const dataUrl = await compressImageFileToDataUrl(file);
            setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
          } finally {
            setIsImageCompressing(false);
          }
        }
        return;
      }
    }
  };

  const handleSaveWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.word.trim() ||
      !formData.meaningVi.trim() ||
      !formData.definitionEn.trim() ||
      !formData.example.trim()
    ) {
      alert('Vui lòng nhập đầy đủ: Từ tiếng Anh, Nghĩa tiếng Việt, Định nghĩa tiếng Anh và Câu ví dụ!');
      return;
    }

    const cleanImageUrl = formData.imageUrl?.trim() || undefined;
    setCustomVocabImage(formData.word.trim(), cleanImageUrl || '');

    if (editingWordId) {
      const updated = words.map((w) =>
        w.id === editingWordId
          ? {
              ...w,
              ...formData,
              word: formData.word.trim(),
              meaningVi: formData.meaningVi.trim(),
              definitionEn: formData.definitionEn.trim(),
              example: formData.example.trim(),
              imageUrl: cleanImageUrl,
              unit: formData.unit.trim() || 'Unit 1 - My New School',
            }
          : w
      );
      onUpdateWords(updated);
      setEditingWordId(null);
    } else {
      const newWord: Word = {
        id: `custom-${Date.now()}-${formData.word.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        ...formData,
        word: formData.word.trim(),
        meaningVi: formData.meaningVi.trim(),
        definitionEn: formData.definitionEn.trim(),
        example: formData.example.trim(),
        imageUrl: cleanImageUrl,
        unit: formData.unit.trim() || 'Unit 1 - My New School',
      };
      onUpdateWords([newWord, ...words]);
      setIsAddingNew(false);
    }
  };

  const handleDeleteWord = (wordId: string, wordLabel: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa từ "${wordLabel}" không?`)) return;
    onUpdateWords(words.filter((w) => w.id !== wordId));
  };

  // Xuất dữ liệu ra file JSON
  const handleExportJSON = () => {
    const exportList =
      selectedUnit === 'ALL'
        ? words
        : words.filter((w) => w.unit === selectedUnit);
    const jsonStr = JSON.stringify(exportList, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tu_vung_global_success_6_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Phân tích dữ liệu dán từ CSV hoặc JSON
  const handleBulkImport = () => {
    const raw = bulkText.trim();
    if (!raw) return;

    const importedWords: Word[] = [];

    try {
      if (raw.startsWith('[') || raw.startsWith('{')) {
        const parsed = JSON.parse(raw);
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        arr.forEach((item: any, idx: number) => {
          if (item && item.word && (item.meaningVi || item.meaning)) {
            importedWords.push({
              id: item.id || `bulk-${Date.now()}-${idx}`,
              word: String(item.word).trim(),
              ipa: String(item.ipa || item.phonetic || '').trim(),
              partOfSpeech: String(item.partOfSpeech || item.type || 'n').trim(),
              meaningVi: String(item.meaningVi || item.meaning || '').trim(),
              definitionEn: String(
                item.definitionEn ||
                  `A word meaning "${item.meaningVi || item.meaning}" in this unit.`
              ).trim(),
              example: String(
                item.example || item.example_en || `This is a ${item.word}.`
              ).trim(),
              exampleVi: String(item.exampleVi || item.example_vi || '').trim(),
              audioUrl: item.audioUrl ? String(item.audioUrl).trim() : undefined,
              unit: String(item.unit || bulkUnitDefault).trim(),
            });
          }
        });
      } else {
        // Phân tích CSV (hỗ trợ dấu phẩy, chấm phẩy hoặc tab)
        const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
        lines.forEach((line, idx) => {
          const cols = line.includes('\t')
            ? line.split('\t').map((c) => c.trim())
            : line.split(',').map((c) => c.trim());

          // Bỏ qua dòng tiêu đề nếu cột đầu là "word"
          if (idx === 0 && cols[0]?.toLowerCase() === 'word') return;
          if (cols.length >= 4 && cols[0]) {
            const [
              word,
              ipa,
              partOfSpeech,
              meaningVi,
              definitionEn,
              example,
              exampleVi,
              unit,
            ] = cols;
            importedWords.push({
              id: `csv-${Date.now()}-${idx}`,
              word,
              ipa: ipa || '',
              partOfSpeech: partOfSpeech || 'n',
              meaningVi: meaningVi || '',
              definitionEn:
                definitionEn || `A vocabulary word meaning "${meaningVi}".`,
              example: example || `Example with ${word}.`,
              exampleVi: exampleVi || '',
              unit: unit || bulkUnitDefault,
            });
          }
        });
      }

      if (importedWords.length === 0) {
        setBulkMessage(
          '⚠️ Không tìm thấy từ hợp lệ. Hãy kiểm tra lại định dạng JSON hoặc CSV!'
        );
        return;
      }

      onUpdateWords([...importedWords, ...words]);
      setBulkMessage(
        `✅ Đã nhập thành công ${importedWords.length} từ vựng mới!`
      );
      setBulkText('');
    } catch (err) {
      setBulkMessage(
        '❌ Dữ liệu JSON/CSV không hợp lệ. Vui lòng kiểm tra lại cú pháp!'
      );
    }
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-md text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Khu Vực Dành Cho Giáo Viên 👩‍🏫
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Nhập mã PIN để quản lý, thêm/sửa/xóa hoặc nhập/xuất danh sách từ vựng (Mặc định: <strong>1234</strong>)
            </p>
          </div>

          <form onSubmit={handleUnlockPin} className="space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                if (pinError) setPinError(null);
              }}
              placeholder="Nhập mã PIN (vd: 1234)"
              autoFocus
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-purple-200 text-center text-2xl font-black tracking-widest text-slate-900 focus:border-purple-500 focus:outline-none"
            />
            {pinError && (
              <p className="text-xs font-extrabold text-rose-600">{pinError}</p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm cursor-pointer"
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-md cursor-pointer"
              >
                Mở khóa
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const filteredWords = words.filter((w) => {
    const matchUnit = selectedUnit === 'ALL' || w.unit === selectedUnit;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q ||
      w.word.toLowerCase().includes(q) ||
      w.meaningVi.toLowerCase().includes(q) ||
      w.definitionEn.toLowerCase().includes(q);
    return matchUnit && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border-2 border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              👩‍🏫 Quản Lý Từ Vựng (Giáo Viên)
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Tổng cộng {words.length} từ • Mỗi từ chỉ dạy đúng 1 nghĩa theo ngữ cảnh bài học
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleStartAdd}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm từ mới</span>
          </button>

          <button
            type="button"
            onClick={() => setIsBulkOpen(!isBulkOpen)}
            className="px-4 py-2.5 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Nhập CSV / JSON</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Xuất JSON</span>
          </button>
        </div>
      </div>

      {/* Khu vực Nhập hàng loạt CSV / JSON */}
      {isBulkOpen && (
        <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              📥 Nhập Hàng Loạt Từ Vựng (Dán CSV hoặc JSON)
            </h3>
            <button
              type="button"
              onClick={() => setIsBulkOpen(false)}
              className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-semibold text-slate-600">
            • <strong>Định dạng CSV</strong> (mỗi từ 1 dòng):{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded">
              word,ipa,partOfSpeech,meaningVi,definitionEn,example,exampleVi,unit
            </code>
            <br />• <strong>Định dạng JSON</strong>: mảng các đối tượng có trường{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded">
              word, ipa, partOfSpeech, meaningVi, definitionEn, example, unit
            </code>
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-xs font-extrabold text-slate-700">
              Unit mặc định (nếu dòng CSV chưa ghi Unit):
            </label>
            <input
              type="text"
              value={bulkUnitDefault}
              onChange={(e) => setBulkUnitDefault(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold"
            />
          </div>

          <textarea
            rows={5}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder={`Ví dụ CSV:\nnotebook,/ˈnəʊtbʊk/,n,quyển vở,A small book with blank pages for writing notes in class.,I write new words in my notebook.,Mình viết từ mới vào quyển vở.,Unit 1 - My New School`}
            className="w-full p-4 rounded-2xl border-2 border-slate-200 font-mono text-xs focus:border-sky-500 focus:outline-none"
          />

          {bulkMessage && (
            <p className="text-xs font-extrabold text-indigo-700 bg-indigo-50 p-3 rounded-xl">
              {bulkMessage}
            </p>
          )}

          <button
            type="button"
            onClick={handleBulkImport}
            className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-xs cursor-pointer"
          >
            Thực hiện nhập dữ liệu
          </button>
        </div>
      )}

      {/* Form Thêm / Sửa từ vựng */}
      {(isAddingNew || editingWordId) && (
        <form
          onSubmit={handleSaveWord}
          className="bg-white rounded-3xl p-6 border-2 border-indigo-200 space-y-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">
              {editingWordId ? '✏️ Chỉnh sửa từ vựng' : '➕ Thêm từ vựng mới'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsAddingNew(false);
                setEditingWordId(null);
              }}
              className="p-1.5 rounded-xl bg-slate-100 text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Từ tiếng Anh *
              </label>
              <input
                type="text"
                required
                value={formData.word}
                onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                placeholder="vd: subject"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Phiên âm IPA
              </label>
              <input
                type="text"
                value={formData.ipa}
                onChange={(e) => setFormData({ ...formData, ipa: e.target.value })}
                placeholder="vd: /ˈsʌbdʒɪkt/"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Từ loại (n, v, adj...)
              </label>
              <input
                type="text"
                value={formData.partOfSpeech}
                onChange={(e) =>
                  setFormData({ ...formData, partOfSpeech: e.target.value })
                }
                placeholder="vd: n"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Nghĩa tiếng Việt (đúng ngữ cảnh bài học) *
              </label>
              <input
                type="text"
                required
                value={formData.meaningVi}
                onChange={(e) =>
                  setFormData({ ...formData, meaningVi: e.target.value })
                }
                placeholder="vd: môn học"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Unit (Bài học) *
              </label>
              <input
                type="text"
                required
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="vd: Unit 1 - My New School"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1">
              Định nghĩa tiếng Anh (A1–A2, khớp đúng nghĩa trên) *
            </label>
            <input
              type="text"
              required
              value={formData.definitionEn}
              onChange={(e) =>
                setFormData({ ...formData, definitionEn: e.target.value })
              }
              placeholder="vd: An area of knowledge that you study at school, like Maths or English."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Câu ví dụ tiếng Anh *
              </label>
              <input
                type="text"
                required
                value={formData.example}
                onChange={(e) =>
                  setFormData({ ...formData, example: e.target.value })
                }
                placeholder="vd: English is my favourite subject at school."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Dịch nghĩa câu ví dụ (tùy chọn)
              </label>
              <input
                type="text"
                value={formData.exampleVi}
                onChange={(e) =>
                  setFormData({ ...formData, exampleVi: e.target.value })
                }
                placeholder="vd: Tiếng Anh là môn học yêu thích của mình ở trường."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-sm"
              />
            </div>
          </div>

          {/* Khu vực Hình ảnh minh họa */}
          <div
            onPaste={handlePasteImageInForm}
            className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-extrabold text-indigo-900">
                  🖼️ Hình ảnh minh họa (Để trống = Tự động tạo ảnh AI theo từ)
                </label>
                <p className="text-[11px] font-semibold text-slate-500">
                  Có thể dán link ảnh, tải ảnh từ máy tính hoặc bấm <strong>Ctrl + V</strong> để dán trực tiếp ảnh đã copy!
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={isImageCompressing}
                  onClick={() => imageFileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  <span>{isImageCompressing ? 'Đang nén...' : 'Tải ảnh từ máy'}</span>
                </button>

                {formData.word.trim() && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        imageUrl: buildAutoVocabImageUrl(formData.word.trim(), Math.floor(Math.random() * 100) + 1),
                      })
                    }
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tự tạo ảnh AI</span>
                  </button>
                )}
              </div>
            </div>

            <input
              ref={imageFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageFileSelect}
              className="hidden"
            />

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Dán URL hình ảnh hoặc nhấn Ctrl+V ảnh vào đây (để trống sẽ tự dùng ảnh AI)..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-xs"
              />
              {formData.word.trim() && (
                <VocabIllustration
                  word={formData.word.trim()}
                  meaningVi={formData.meaningVi}
                  imageUrl={formData.imageUrl}
                  size="sm"
                  allowQuickEdit={false}
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsAddingNew(false);
                setEditingWordId(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Lưu từ vựng</span>
            </button>
          </div>
        </form>
      )}

      {/* Bộ lọc Unit & Tìm kiếm */}
      <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 flex flex-col sm:flex-row gap-3">
        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className="px-4 py-2.5 rounded-2xl border border-slate-300 font-extrabold text-xs sm:text-sm text-slate-800 bg-slate-50"
        >
          <option value="ALL">Tất cả các Unit ({words.length} từ)</option>
          {units.map((u) => (
            <option key={u} value={u}>
              {u} ({words.filter((w) => w.unit === u).length} từ)
            </option>
          ))}
        </select>

        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo từ tiếng Anh, nghĩa tiếng Việt hoặc định nghĩa..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-semibold"
          />
        </div>
      </div>

      {/* Danh sách từ vựng */}
      <div className="space-y-3">
        {filteredWords.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <VocabIllustration
                word={w.word}
                meaningVi={w.meaningVi}
                imageUrl={w.imageUrl}
                size="sm"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-black text-slate-900">{w.word}</span>
                {w.ipa && (
                  <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                    {w.ipa}
                  </span>
                )}
                {w.partOfSpeech && (
                  <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">
                    ({w.partOfSpeech})
                  </span>
                )}
                <span className="text-sm font-extrabold text-emerald-700">
                  • {w.meaningVi}
                </span>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
                  {w.unit}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600">
                🇬🇧 <strong>Định nghĩa:</strong> {w.definitionEn}
              </p>
              <p className="text-xs text-slate-500 italic">
                💬 <strong>Ví dụ:</strong> “{w.example}” {w.exampleVi ? `(${w.exampleVi})` : ''}
              </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => speakWord(w, settings)}
                className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 cursor-pointer"
                title="Nghe thử"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleStartEdit(w)}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 cursor-pointer"
                title="Sửa từ"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteWord(w.id, w.word)}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                title="Xóa từ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
