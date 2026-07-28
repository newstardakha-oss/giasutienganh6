import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  Send,
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { SgkUnit, ChatMessage } from '../types';
import { callSocraticTutor } from '../services/api';

interface SocraticTutorProps {
  units: SgkUnit[];
}

export const SocraticTutor: React.FC<SocraticTutorProps> = ({ units }) => {
  const [selectedUnit, setSelectedUnit] = useState<SgkUnit>(units[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'tutor',
      text: `Chào em! Thầy/Cô là **Gia Sư AI Tiếng Anh Lớp 6**. 👋

Thầy/Cô sẽ đồng hành cùng em học tập bám sát chương trình **SGK Global Success**! Thầy/Cô áp dụng phương pháp **5 bước tự tư duy (Socratic)**: *Ví dụ ➔ Nhận xét ➔ Giải thích ➔ Luyện tập ➔ Vận dụng*. Thầy/Cô sẽ không làm bài hộ em, mà sẽ đặt câu hỏi gợi mở để em tự tìm ra đáp án đúng nhé!

Em muốn hỏi về kiến thức gì trong **${units[0].title}** hôm nay nào?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      socraticStep: 'Example',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<ChatMessage['socraticStep']>('Example');
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const stepsList: { id: ChatMessage['socraticStep']; label: string; desc: string }[] = [
    { id: 'Example', label: '1. Ví Dụ', desc: 'Xem ví dụ trực quan' },
    { id: 'Notice', label: '2. Nhận Xét', desc: 'Quan sát & Phát hiện quy luật' },
    { id: 'Explain', label: '3. Giải Thích', desc: 'Hiểu rõ bản chất ngữ pháp' },
    { id: 'Practice', label: '4. Luyện Tập', desc: 'Làm câu hỏi thực hành' },
    { id: 'Apply', label: '5. Vận Dụng', desc: 'Áp dụng vào thực tế' },
  ];

  const presetQuestions = [
    `Giúp em hiểu cấu trúc ${selectedUnit.grammar[0]}`,
    `Phát âm chuẩn âm IPA ${selectedUnit.pronunciationIPA}`,
    `Cho em ví dụ bài tập thực hành trong ${selectedUnit.title}`,
    `Em đang gặp khó khăn khi làm bài tập về từ vựng ${selectedUnit.title}`,
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputPrompt).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!customText) setInputPrompt('');
    setIsLoading(true);

    try {
      const responseText = await callSocraticTutor(
        textToSend,
        newHistory,
        selectedUnit.title,
        selectedUnit.grammar.join(', '),
        currentStep
      );

      const tutorMsg: ChatMessage = {
        id: `tut-${Date.now()}`,
        sender: 'tutor',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        socraticStep: currentStep,
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'tutor',
        text: `⚠️ **Thông báo:** ${err.message || 'Không thể kết nối đến Gia Sư AI. Vui lòng thử lại.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng đọc giọng nói Web Speech.');
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean text from markdown stars before speech
    const cleanText = text.replace(/[*_#`~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Unit Context Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-[#FF9500]" />
            Phương Pháp Socratic 5 Bước
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Gia Sư Gemini • Unit {selectedUnit.unitNumber}: {selectedUnit.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-[#FF9500]">Ngữ pháp:</span> {selectedUnit.grammar.join(' • ')}
            <br />
            <span className="font-semibold text-[#FF9500]">Phát âm trọng tâm:</span> {selectedUnit.pronunciationIPA}
          </p>
        </div>

        {/* Unit Selector */}
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shrink-0 min-w-[240px]">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Chọn Bài Học SGK Tiếng Anh 6:
          </label>
          <select
            value={selectedUnit.id}
            onChange={(e) => {
              const u = units.find((item) => item.id === e.target.value);
              if (u) {
                setSelectedUnit(u);
                setMessages((prev) => [
                  ...prev,
                  {
                    id: `switch-${Date.now()}`,
                    sender: 'tutor',
                    text: `Em đã chuyển sang **Unit ${u.unitNumber}: ${u.title}** (${u.theme}). Em có thắc mắc gì về phần ngữ pháp "${u.grammar[0]}" hay phát âm "${u.pronunciationIPA}" không?`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }
            }}
            className="w-full bg-white text-slate-800 font-semibold px-3 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                Unit {u.unitNumber}: {u.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5-Step Socratic Progress Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FF9500]" />
            Tiến Trình Tư Duy Socratic:
          </span>
          <span className="text-xs font-semibold text-[#4A90E2]">
            Gợi mở tự suy luận
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {stepsList.map((step) => {
            const isActive = currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isActive
                    ? 'bg-blue-50 border-[#4A90E2] text-[#4A90E2] font-bold shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-[#4A90E2]/50'
                }`}
              >
                <div className="text-[11px] sm:text-xs font-bold truncate">{step.label}</div>
                <div className="hidden sm:block text-[10px] text-slate-400 mt-0.5 truncate">
                  {step.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200 flex flex-col h-[560px] overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${
                  isTutor ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-xs ${
                    isTutor
                      ? 'bg-gradient-to-tr from-[#4A90E2] to-indigo-600'
                      : 'bg-[#FF9500]'
                  }`}
                >
                  {isTutor ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Bubble */}
                <div className="space-y-1">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isTutor
                        ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-2xs'
                        : 'bg-[#4A90E2] text-white rounded-tr-none shadow-2xs'
                    }`}
                  >
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-2 text-[11px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {isTutor && (
                      <button
                        onClick={() => handleTextToSpeech(msg.id, msg.text)}
                        className="hover:text-[#4A90E2] flex items-center gap-1 transition-colors"
                        title="Đọc tiếng Việt / tiếng Anh"
                      >
                        {speakingMsgId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-[#FF9500] animate-bounce" />
                            <span className="text-[#FF9500]">Đang đọc...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Đọc câu trả lời</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs italic p-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#4A90E2] animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <span>Gia Sư AI đang tạo gợi ý Socratic...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Starter Prompts */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-[#4A90E2]" />
            Hỏi nhanh:
          </span>
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold hover:border-[#4A90E2] hover:text-[#4A90E2] transition-all whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            id="socratic-chat-input"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={`Hỏi gia sư AI về Unit ${selectedUnit.unitNumber}...`}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2] border border-slate-200 transition-all"
          />
          <button
            id="send-socratic-chat-btn"
            onClick={() => handleSend()}
            disabled={isLoading || !inputPrompt.trim()}
            className="p-3 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white disabled:opacity-50 transition-all shadow-2xs"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
