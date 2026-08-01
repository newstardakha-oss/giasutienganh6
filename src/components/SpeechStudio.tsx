import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
  Music,
  ArrowRight
} from 'lucide-react';
import { PronunciationEvaluation, SgkUnit } from '../types';
import { evaluateSpeechPronunciation } from '../services/api';

interface SpeechStudioProps {
  units: SgkUnit[];
}

export interface PronunciationTarget {
  text: string;
  ipa: string;
  focusPhoneme: string;
}

export const UNIT_PRONUNCIATION_TARGETS: Record<number, PronunciationTarget[]> = {
  1: [
    { text: "Students always look smart in their uniforms on Monday.", ipa: "/ɑː/ & /ʌ/", focusPhoneme: "/ɑː/ & /ʌ/" },
    { text: "My brother has a new compass and calculator for his art class.", ipa: "/aːt/ & /ˈkʌmpəs/", focusPhoneme: "/ɑː/ & /ʌ/" },
    { text: "They are studying math and history in the classroom on Sunday.", ipa: "/ˈstʌdiɪŋ/ & /ˈklɑːsruːm/", focusPhoneme: "/ɑː/ & /ʌ/" },
    { text: "We do exercise and study science after lunch.", ipa: "/lʌntʃ/ & /ˈstʌdi/", focusPhoneme: "/ʌ/" },
  ],
  2: [
    { text: "There are two lamps and four sofas in the living room.", ipa: "/læmps/ vs /ˈsəʊfəz/", focusPhoneme: "/s/ & /z/" },
    { text: "My sister cleans the sinks and puts the chopsticks on the table.", ipa: "/sɪŋks/ vs /tʃɒpstɪks/", focusPhoneme: "/s/ & /z/" },
    { text: "He has three posters, two desks, and many chairs in his bedroom.", ipa: "/dɛsks/ vs /ˈpəʊstəz/", focusPhoneme: "/s/ & /z/" },
    { text: "The cats sleep on the rugs next to the wardrobes.", ipa: "/kæts/ vs /ˈwɔːdrəʊbz/", focusPhoneme: "/s/ & /z/" },
  ],
  3: [
    { text: "The boy with blonde hair is playing with a big ball.", ipa: "/bɔɪ/ vs /blɒnd/", focusPhoneme: "/b/ & /p/" },
    { text: "We are having a picnic in the park with our best friends.", ipa: "/ˈpɪknɪk/ vs /pɑːk/", focusPhoneme: "/b/ & /p/" },
    { text: "My patient friend Paul is playing the piano at the party.", ipa: "/ˈpeɪʃənt/ vs /pɪˈænəʊ/", focusPhoneme: "/b/ & /p/" },
    { text: "Peter has brown eyes and a black pony in his photo.", ipa: "/ˈpiːtə/ vs /braʊn/", focusPhoneme: "/b/ & /p/" },
  ],
  4: [
    { text: "The streets in this historic city are clean and peaceful.", ipa: "/hɪˈstɒrɪk/ vs /kliːn/", focusPhoneme: "/iː/ & /ɪ/" },
    { text: "It is very convenient and cheap to live in this quiet village.", ipa: "/kənˈviːniənt/ vs /tʃiːp/", focusPhoneme: "/iː/ & /ɪ/" },
    { text: "She lives in a noisy neighbourhood near the city building.", ipa: "/ˈnɔɪzi/ vs /ˈbɪldɪŋ/", focusPhoneme: "/iː/ & /ɪ/" },
    { text: "We can see a modern art gallery and a big square on this street.", ipa: "/striːt/ vs /ˈgæləri/", focusPhoneme: "/iː/ & /ɪ/" },
  ],
  5: [
    { text: "We visited Ha Long Bay and saw famous islands and caves.", ipa: "/ˈaɪləndz/ vs /keɪvz/", focusPhoneme: "/t/ & /d/" },
    { text: "Take a plaster and a tent when you go to the forest.", ipa: "/ˈplɑːstə/ vs /tɛnt/", focusPhoneme: "/t/ & /d/" },
    { text: "The tour guide led us to the deep desert and mountain in Viet Nam.", ipa: "/gaɪd/ vs /ˈdɛzət/", focusPhoneme: "/t/ & /d/" },
    { text: "Don't forget to pack your waterproof coat and sleeping bag.", ipa: "/ˈwɔːtəpruːf/ vs /kəʊt/", focusPhoneme: "/t/ & /d/" },
  ],
  6: [
    { text: "We should eat banh chung and wish happy New Year at Tet.", ipa: "/ʃʊd/ vs /wɪʃ/", focusPhoneme: "/s/ & /ʃ/" },
    { text: "She goes shopping for sweet peach blossoms in the spring.", ipa: "/ˈʃɒpɪŋ/ vs /swiːt/", focusPhoneme: "/s/ & /ʃ/" },
    { text: "We should show our New Year wishes to our grandparents.", ipa: "/ʃəʊ/ vs /ˈwɪʃɪz/", focusPhoneme: "/s/ & /ʃ/" },
    { text: "Children smile and receive lucky money in red envelopes.", ipa: "/smaɪl/ vs /rɪˈsiːv/", focusPhoneme: "/s/ & /ʃ/" },
  ],
  7: [
    { text: "They think 3D films at the theatre are very exciting.", ipa: "/θɪŋk/ vs /ˈθɪətə/", focusPhoneme: "/θ/ & /ð/" },
    { text: "The weather forecaster on channel 3 is talking about the earth.", ipa: "/ˈwɛðə/ vs /ɜːθ/", focusPhoneme: "/θ/ & /ð/" },
    { text: "There are many educational programmes on television this month.", ipa: "/ðɛə/ vs /mʌnθ/", focusPhoneme: "/θ/ & /ð/" },
    { text: "My brother and I like watching game shows together.", ipa: "/ˈbrʌðə/ vs /təˈgɛðə/", focusPhoneme: "/θ/ & /ð/" },
  ],
  8: [
    { text: "The badminton match yesterday was very exciting for all fans.", ipa: "/ˈmætʃ/ vs /fænz/", focusPhoneme: "/e/ & /æ/" },
    { text: "They play chess and tennis at the gym every weekend.", ipa: "/tʃɛs/ vs /ˈtɛnɪs/", focusPhoneme: "/e/ & /æ/" },
    { text: "The champion won the marathon with his new racket.", ipa: "/ˈtʃæmpiən/ vs /ˈrækɪt/", focusPhoneme: "/e/ & /æ/" },
    { text: "Wear your helmet and goggles before you start the race.", ipa: "/ˈhɛlmɪt/ vs /ˈgɒglz/", focusPhoneme: "/e/ & /æ/" },
  ],
  9: [
    { text: "It is very cold and snowy near the old town tower.", ipa: "/kəʊld/ vs /taʊə/", focusPhoneme: "/əʊ/ & /aʊ/" },
    { text: "We took a nice photo of the house in the mountain town.", ipa: "/ˈfəʊtəʊ/ vs /haʊs/", focusPhoneme: "/əʊ/ & /aʊ/" },
    { text: "There are many crowded boats near the coast of the old city.", ipa: "/bəʊts/ vs /kraʊdɪd/", focusPhoneme: "/əʊ/ & /aʊ/" },
    { text: "Look at that famous palace with a big clock in London.", ipa: "/klɒk/ vs /ˈpælɪs/", focusPhoneme: "/əʊ/ & /aʊ/" },
  ],
  10: [
    { text: "My dream house will have a smart driver robot and automatic trees.", ipa: "/driːm/ vs /triːz/", focusPhoneme: "/dr/ & /tr/" },
    { text: "She travels by high-speed train to her dream space cottage.", ipa: "/trævlz/ vs /driːm/", focusPhoneme: "/dr/ & /tr/" },
    { text: "The robot is driving a tractor near the green trees.", ipa: "/ˈdraɪvɪŋ/ vs /ˈtræktə/", focusPhoneme: "/dr/ & /tr/" },
    { text: "I draw a picture of an electric car and a train on paper.", ipa: "/drɔː/ vs /treɪn/", focusPhoneme: "/dr/ & /tr/" },
  ],
  11: [
    { text: "If we recycle plastic bottles, we will save the environment.", ipa: "/riːˈsaɪkl/ & /ɪnˈvaɪərənmənt/", focusPhoneme: "Sentence Rhythm" },
    { text: "We should reuse glass jars and plant more green trees.", ipa: "/riːˈjuːz/ & /plɑːnt/", focusPhoneme: "Sentence Rhythm" },
    { text: "Joining the 3Rs club helps reduce rubbish in our town.", ipa: "/rɪˈdjuːs/ & /ˈrʌbɪʃ/", focusPhoneme: "Sentence Rhythm" },
    { text: "Turn off the lights when you leave the room to save energy.", ipa: "/laɪts/ & /ˈɛnədʒi/", focusPhoneme: "Sentence Rhythm" },
  ],
  12: [
    { text: "Doctor robots can look after sick people in hospitals.", ipa: "Statement ↘", focusPhoneme: "Falling Intonation ↘" },
    { text: "Can worker robots repair heavy machines in factories?", ipa: "Yes/No Question ↗", focusPhoneme: "Rising Intonation ↗" },
    { text: "My smart robot can do the housework, wash dishes, and cook meals.", ipa: "Statement ↘", focusPhoneme: "Falling Intonation ↘" },
    { text: "What can your home robot do to help your family?", ipa: "Wh-Question ↘", focusPhoneme: "Falling Intonation ↘" },
  ],
};

export const SpeechStudio: React.FC<SpeechStudioProps> = ({ units }) => {
  const [selectedUnit, setSelectedUnit] = useState<SgkUnit>(units[0]);
  const [activeTab, setActiveTab] = useState<'phoneme' | 'roleplay'>('phoneme');

  // Dynamic target sentences for currently selected unit
  const targetSentences = UNIT_PRONUNCIATION_TARGETS[selectedUnit.unitNumber] || UNIT_PRONUNCIATION_TARGETS[1];
  const [selectedTarget, setSelectedTarget] = useState<PronunciationTarget>(targetSentences[0]);

  // Sync selectedTarget when selectedUnit changes
  useEffect(() => {
    const targets = UNIT_PRONUNCIATION_TARGETS[selectedUnit.unitNumber] || UNIT_PRONUNCIATION_TARGETS[1];
    if (targets && targets.length > 0) {
      setSelectedTarget(targets[0]);
      setEvaluation(null);
      setRecognizedText('');
    }
  }, [selectedUnit.id]);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [evaluation, setEvaluation] = useState<PronunciationEvaluation | null>(null);
  const [isEvaluating, setIsLoading] = useState(false);

  // Web Speech Synthesis
  const handleListenTarget = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt không hỗ trợ phát âm.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition setup
  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói Web Speech API (như Chrome, Edge).');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);
    setRecognizedText('');
    setEvaluation(null);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
      setIsRecording(false);
      // Auto evaluate with AI
      handleEvaluate(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleEvaluate = async (transcript: string) => {
    if (!transcript) return;
    setIsLoading(true);
    try {
      const result = await evaluateSpeechPronunciation(
        transcript,
        selectedTarget.text,
        selectedTarget.focusPhoneme
      );
      setEvaluation(result);
    } catch (err: any) {
      alert(`Lỗi đánh giá phát âm: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <Mic className="w-4 h-4 text-[#FF9500]" />
            Luyện Phát Âm & Giao Tiếp Phản Xạ 2 Chiều
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Phòng Luyện Phát Âm Chuẩn IPA Lớp 6</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Nhận diện giọng nói AI, chấm điểm phát âm theo âm tiết IPA SGK Global Success.
          </p>
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('phoneme')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'phoneme'
              ? 'bg-[#4A90E2] text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Music className="w-4 h-4" />
          1. Luyện Âm Trọng Tâm (Phonemes / IPA)
        </button>
        <button
          onClick={() => setActiveTab('roleplay')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'roleplay'
              ? 'bg-[#4A90E2] text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          2. Khung Hội Thoại Giao Tiếp 2 Chiều
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'phoneme' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Target List */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Mẫu Câu Luyện Tập Trọng Tâm
              </span>
              <select
                value={selectedUnit.id}
                onChange={(e) => {
                  const u = units.find((x) => x.id === e.target.value);
                  if (u) setSelectedUnit(u);
                }}
                className="text-xs bg-slate-50 border border-slate-200 font-semibold px-2.5 py-1.5 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber}: {u.title}
                  </option>
                ))}
              </select>
            </div>

            {/* SGK A Closer Look 1 Pronunciation Focus Badge */}
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 text-xs">
              <div className="font-bold text-blue-900 flex items-center justify-between">
                <span>📘 Unit {selectedUnit.unitNumber}: A Closer Look 1</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-[10px]">
                  Pronunciation
                </span>
              </div>
              <p className="text-[#4A90E2] font-semibold mt-1">
                Âm trọng tâm: <span className="font-extrabold text-blue-900">{selectedUnit.pronunciationIPA}</span>
              </p>
            </div>

            <div className="space-y-2">
              {targetSentences.map((tgt, i) => {
                const isSelected = selectedTarget.text === tgt.text;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedTarget(tgt);
                      setEvaluation(null);
                      setRecognizedText('');
                    }}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-[#4A90E2] font-semibold shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:border-[#4A90E2]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[#4A90E2] font-bold text-[10px]">
                        IPA Focus: {tgt.focusPhoneme}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleListenTarget(tgt.text);
                        }}
                        className="p-1 rounded-full text-slate-400 hover:text-[#4A90E2]"
                        title="Nghe phát âm mẫu"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-800 font-medium">{tgt.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recording & AI Feedback */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-6">
            {/* Target Card */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Câu Mẫu Cần Đọc:
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900">
                "{selectedTarget.text}"
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                <span>IPA Trọng tâm: {selectedTarget.ipa}</span>
              </div>
              <div>
                <button
                  onClick={() => handleListenTarget(selectedTarget.text)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-[#4A90E2] inline-flex items-center gap-2 shadow-2xs"
                >
                  <Volume2 className="w-4 h-4 text-[#4A90E2]" />
                  Nghe Giọng Đọc Mẫu Native
                </button>
              </div>
            </div>

            {/* Microphone Button */}
            <div className="text-center space-y-3">
              <button
                id="mic-record-btn"
                onClick={startRecording}
                disabled={isRecording || isEvaluating}
                className={`w-20 h-20 rounded-full inline-flex items-center justify-center transition-all shadow-md ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-200'
                    : 'bg-[#4A90E2] text-white hover:scale-105 shadow-blue-500/20'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              <p className="text-xs font-semibold text-slate-500">
                {isRecording
                  ? 'Đang lắng nghe... Hãy đọc to câu mẫu ở trên nhé!'
                  : 'Bấm biểu tượng micro để bắt đầu thu âm phát âm'}
              </p>
            </div>

            {/* Recognized text */}
            {recognizedText && (
              <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-700">
                <span className="font-bold text-slate-500">Văn bản ghi nhận: </span>
                <span className="font-semibold text-[#4A90E2]">
                  "{recognizedText}"
                </span>
              </div>
            )}

            {isEvaluating && (
              <div className="p-4 rounded-xl bg-blue-50 text-[#4A90E2] text-xs font-semibold flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI đang phân tích khẩu hình và ngữ âm IPA...</span>
              </div>
            )}

            {/* Evaluation Results */}
            {evaluation && (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#FF9500]" />
                    <span className="font-bold text-sm text-slate-900">
                      Kết Quả Đánh Giá Phát Âm AI
                    </span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-sm">
                    {evaluation.score}/100 - {evaluation.accuracyGrade}
                  </div>
                </div>

                {/* Phoneme accuracy breakdown */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500">Chi Tiết Âm IPA:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {evaluation.phonemesAccuracy?.map((ph, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <span className="font-bold text-[#4A90E2]">
                          {ph.phoneme}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ph.status === 'correct'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {ph.status === 'correct' ? 'Chuẩn' : 'Cần chú ý'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-[#4A90E2]">
                    💬 Lời khuyên thầy cô: {evaluation.teacherFeedback}
                  </p>
                  {evaluation.tipsToImprove?.map((tip, i) => (
                    <p key={i} className="text-slate-500 flex items-center gap-1">
                      <span>•</span> {tip}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Roleplay Dialogue Mode */
        <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
            <h4 className="font-bold text-sm">Giao Tiếp Tương Tác 2 Chiều Cùng AI</h4>
            <p>
              Luyện tập các bài hội thoại trong SGK Tiếng Anh 6: Giới thiệu bạn mới, Hỏi chỉ đường, Nói về Tết, Ngôi nhà mơ ước...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#FF9500]">AI (Nick):</span>
              <p className="text-sm font-semibold text-slate-900">
                "Hi there! Nice to meet you. What is your favorite subject at school?"
              </p>
              <button
                onClick={() => handleListenTarget('Hi there! Nice to meet you. What is your favorite subject at school?')}
                className="text-xs text-[#4A90E2] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe AI đọc
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#4A90E2]">Em (Gợi ý trả lời):</span>
              <p className="text-sm font-semibold text-slate-900">
                "Hi Nick! I like English and History best because they are very interesting."
              </p>
              <button
                onClick={startRecording}
                className="text-xs px-3.5 py-1.5 rounded-xl bg-[#4A90E2] text-white font-semibold hover:bg-blue-600 inline-flex items-center gap-1 shadow-2xs"
              >
                <Mic className="w-3.5 h-3.5" /> Bắt đầu thu âm trả lời
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
