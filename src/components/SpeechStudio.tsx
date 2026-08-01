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

export interface DialogueOption {
  id: string;
  topicTitle: string;
  aiSpeaker: string;
  aiText: string;
  studentSuggestion: string;
  contextNote: string;
}

export const UNIT_COMMUNICATION_DIALOGUES: Record<number, DialogueOption[]> = {
  1: [
    {
      id: "u1-d1",
      topicTitle: "1. Giới thiệu bạn mới & Môn học yêu thích",
      aiSpeaker: "Nick",
      aiText: "Hi there! Welcome to Sunrise School. What is your favorite subject at school?",
      studentSuggestion: "Hi Nick! I like English and Maths best because they are very interesting.",
      contextNote: "SGK Unit 1 - Communication: Introducing someone & School subjects"
    },
    {
      id: "u1-d2",
      topicTitle: "2. Mời bạn tham gia câu lạc bộ trường",
      aiSpeaker: "Phong",
      aiText: "This is Duy, my new classmate. Do you want to join our school science club with us?",
      studentSuggestion: "Hi Duy, nice to meet you! Yes, I'd love to join the science club after school.",
      contextNote: "SGK Unit 1 - Communication: Joining school clubs"
    }
  ],
  2: [
    {
      id: "u2-d1",
      topicTitle: "1. Tả ngôi nhà & Phòng yêu thích",
      aiSpeaker: "Elena",
      aiText: "Where do you live? Which room in your house do you like best?",
      studentSuggestion: "I live in a town house in Da Nang. I like my bedroom best because it is comfortable.",
      contextNote: "SGK Unit 2 - Communication: Describing houses and rooms"
    },
    {
      id: "u2-d2",
      topicTitle: "2. Hỏi về khuôn viên & Đồ đạc trong nhà",
      aiSpeaker: "Mi",
      aiText: "Is there a garden or a balcony in your house?",
      studentSuggestion: "Yes, there is a small garden with green trees and pretty flowers in front of my house.",
      contextNote: "SGK Unit 2 - Communication: House features"
    }
  ],
  3: [
    {
      id: "u3-d1",
      topicTitle: "1. Hỏi về ngoại hình & Tính cách bạn thân",
      aiSpeaker: "Tom",
      aiText: "What does your best friend look like? Is he tall and friendly?",
      studentSuggestion: "My best friend is Nam. He is tall, has short black hair, and he is very kind and clever.",
      contextNote: "SGK Unit 3 - Communication: Describing friends' appearance & personality"
    },
    {
      id: "u3-d2",
      topicTitle: "2. Mời bạn đi dã ngoại cuối tuần",
      aiSpeaker: "Mai",
      aiText: "Would you like to go to the school picnic with us this Sunday?",
      studentSuggestion: "I'd love to! What time should we meet at the park?",
      contextNote: "SGK Unit 3 - Communication: Making plans for a picnic"
    }
  ],
  4: [
    {
      id: "u4-d1",
      topicTitle: "1. Hỏi và chỉ đường trong khu phố",
      aiSpeaker: "Tourist",
      aiText: "Excuse me! Could you tell me the way to the nearest railway station or square?",
      studentSuggestion: "Go straight ahead, then turn left at the traffic light. It is next to the art gallery.",
      contextNote: "SGK Unit 4 - Communication: Asking for and giving directions"
    },
    {
      id: "u4-d2",
      topicTitle: "2. Tả về khu phố em đang sống",
      aiSpeaker: "Vy",
      aiText: "What do you like most about your neighbourhood?",
      studentSuggestion: "I like it because the streets are peaceful and there are many convenient shops nearby.",
      contextNote: "SGK Unit 4 - Communication: Talking about your neighbourhood"
    }
  ],
  5: [
    {
      id: "u5-d1",
      topicTitle: "1. Lời khuyên chuẩn bị cho chuyến du lịch kì quan",
      aiSpeaker: "Tour Guide",
      aiText: "We are going to Ha Long Bay tomorrow! What must we bring with us?",
      studentSuggestion: "We must bring a sun hat, suncream, a camera, and a waterproof coat.",
      contextNote: "SGK Unit 5 - Communication: Travel advice & preparations"
    },
    {
      id: "u5-d2",
      topicTitle: "2. Quy tắc ứng xử khi đi rừng / Vườn quốc gia",
      aiSpeaker: "Traveler",
      aiText: "What shouldn't visitors do when exploring a national park or forest?",
      studentSuggestion: "Visitors mustn't litter or cut down trees in the forest to protect nature.",
      contextNote: "SGK Unit 5 - Communication: Rules at natural wonders"
    }
  ],
  6: [
    {
      id: "u6-d1",
      topicTitle: "1. Lời chúc Tết và đáp lời chúc",
      aiSpeaker: "Mai",
      aiText: "Wishing you and your family a Happy New Year with good health and great success!",
      studentSuggestion: "Thank you! Happy New Year! Wishing you happiness and great luck at school too!",
      contextNote: "SGK Unit 6 - Communication: Saying New Year wishes"
    },
    {
      id: "u6-d2",
      topicTitle: "2. Kể về phong tục ngày Tết Việt Nam",
      aiSpeaker: "Mark",
      aiText: "What do children in Viet Nam usually do during Tet holiday?",
      studentSuggestion: "We wear new clothes, visit grandparents, and receive lucky money in red envelopes.",
      contextNote: "SGK Unit 6 - Communication: Tet customs and activities"
    }
  ],
  7: [
    {
      id: "u7-d1",
      topicTitle: "1. Hỏi về chương trình truyền hình yêu thích",
      aiSpeaker: "Reporter",
      aiText: "What is your favorite TV programme on channel 3?",
      studentSuggestion: "My favorite programme is the educational game show because it is both fun and informative.",
      contextNote: "SGK Unit 7 - Communication: Talking about TV programmes"
    },
    {
      id: "u7-d2",
      topicTitle: "2. Bày tỏ ý kiến đồng ý / Không đồng ý về phim hoạt hình",
      aiSpeaker: "Phong",
      aiText: "I think cartoons are only for little kids. What do you think?",
      studentSuggestion: "I disagree! Many animated films have great stories and lessons for people of all ages.",
      contextNote: "SGK Unit 7 - Communication: Expressing opinions on TV shows"
    }
  ],
  8: [
    {
      id: "u8-d1",
      topicTitle: "1. Chúc mừng chiến thắng giải thể thao",
      aiSpeaker: "Coach",
      aiText: "Congratulations! Your badminton team played brilliantly and won the championship today!",
      studentSuggestion: "Thank you so much! We trained very hard and worked as a great team!",
      contextNote: "SGK Unit 8 - Communication: Congratulating someone on winning"
    },
    {
      id: "u8-d2",
      topicTitle: "2. Nói về thói quen rèn luyện thể thao",
      aiSpeaker: "Nick",
      aiText: "How often do you play sports or do exercise at the gym?",
      studentSuggestion: "I play badminton and swim three times a week to stay healthy and fit.",
      contextNote: "SGK Unit 8 - Communication: Sports habits & fitness"
    }
  ],
  9: [
    {
      id: "u9-d1",
      topicTitle: "1. Câu thốt lên cảm xúc với 'What a + N!'",
      aiSpeaker: "Tourist",
      aiText: "Look at the view of London from the top of the tower!",
      studentSuggestion: "What a beautiful city! The historic buildings and red buses are amazing!",
      contextNote: "SGK Unit 9 - Communication: Exclamations with 'What a + N!'"
    },
    {
      id: "u9-d2",
      topicTitle: "2. Chia sẻ về chuyến du lịch các thành phố nổi tiếng",
      aiSpeaker: "Anna",
      aiText: "Have you ever been to a famous capital city in Asia or Europe?",
      studentSuggestion: "Yes, I have visited Bangkok! The street food there was delicious and cheap.",
      contextNote: "SGK Unit 9 - Communication: Postcards and city trips"
    }
  ],
  10: [
    {
      id: "u10-d1",
      topicTitle: "1. Bày tỏ sự ngạc nhiên về ngôi nhà tương lai",
      aiSpeaker: "Architect",
      aiText: "Look! This futuristic house will be built on the moon and powered by solar energy!",
      studentSuggestion: "Wow! What a super smart house! It looks like a giant spaceship!",
      contextNote: "SGK Unit 10 - Communication: Expressing surprise about future houses"
    },
    {
      id: "u10-d2",
      topicTitle: "2. Tả đồ dùng thông minh trong ngôi nhà mơ ước",
      aiSpeaker: "Robot Guide",
      aiText: "What appliances will your dream house have in the year 2050?",
      studentSuggestion: "My dream house will have an automatic dishwasher and a wireless TV in every room.",
      contextNote: "SGK Unit 10 - Communication: Appliances in future homes"
    }
  ],
  11: [
    {
      id: "u11-d1",
      topicTitle: "1. Đưa ra lời cảnh báo & khuyên bảo vệ môi trường",
      aiSpeaker: "Eco Club Leader",
      aiText: "You shouldn't throw plastic bottles into the river! It harms the water environment!",
      studentSuggestion: "I'm sorry! I will put them into the recycling bin to protect our green environment.",
      contextNote: "SGK Unit 11 - Communication: Giving environmental warnings & advice"
    },
    {
      id: "u11-d2",
      topicTitle: "2. Thực hành quy tắc 3Rs tại trường học",
      aiSpeaker: "Green Ambassador",
      aiText: "What can we do at school to practice the 3Rs: Reduce, Reuse, Recycle?",
      studentSuggestion: "We can reuse refillable water bottles and recycle waste paper every day.",
      contextNote: "SGK Unit 11 - Communication: Practicing 3Rs at school"
    }
  ],
  12: [
    {
      id: "u12-d1",
      topicTitle: "1. Thảo luận về khả năng của Robot bác sĩ",
      aiSpeaker: "Scientist",
      aiText: "Do you think doctor robots can completely replace human doctors in hospitals?",
      studentSuggestion: "I don't think so. Doctor robots can help examine patients, but they cannot replace human care.",
      contextNote: "SGK Unit 12 - Communication: Expressing opinions on robots"
    },
    {
      id: "u12-d2",
      topicTitle: "2. Đồng ý về vai trò của Robot công nhân",
      aiSpeaker: "Presenter",
      aiText: "In the future, worker robots will do all heavy and dangerous tasks in factories.",
      studentSuggestion: "I agree! Robots will keep human workers safe from dangerous jobs.",
      contextNote: "SGK Unit 12 - Communication: Agreeing on robot roles"
    }
  ]
};

export const SpeechStudio: React.FC<SpeechStudioProps> = ({ units }) => {
  const [selectedUnit, setSelectedUnit] = useState<SgkUnit>(units[0]);
  const [activeTab, setActiveTab] = useState<'phoneme' | 'roleplay'>('phoneme');

  // Dynamic target sentences for currently selected unit (Phoneme mode)
  const targetSentences = UNIT_PRONUNCIATION_TARGETS[selectedUnit.unitNumber] || UNIT_PRONUNCIATION_TARGETS[1];
  const [selectedTarget, setSelectedTarget] = useState<PronunciationTarget>(targetSentences[0]);

  // Dynamic communication dialogues for currently selected unit (Roleplay mode)
  const dialogueList = UNIT_COMMUNICATION_DIALOGUES[selectedUnit.unitNumber] || UNIT_COMMUNICATION_DIALOGUES[1];
  const [selectedDialogue, setSelectedDialogue] = useState<DialogueOption>(dialogueList[0]);

  // Sync selectedTarget and selectedDialogue when selectedUnit changes
  useEffect(() => {
    const targets = UNIT_PRONUNCIATION_TARGETS[selectedUnit.unitNumber] || UNIT_PRONUNCIATION_TARGETS[1];
    if (targets && targets.length > 0) {
      setSelectedTarget(targets[0]);
    }

    const dialogues = UNIT_COMMUNICATION_DIALOGUES[selectedUnit.unitNumber] || UNIT_COMMUNICATION_DIALOGUES[1];
    if (dialogues && dialogues.length > 0) {
      setSelectedDialogue(dialogues[0]);
    }

    setEvaluation(null);
    setRecognizedText('');
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
      const targetText = activeTab === 'phoneme' ? selectedTarget.text : selectedDialogue.studentSuggestion;
      const focusPhoneme = activeTab === 'phoneme' ? selectedTarget.focusPhoneme : 'Everyday English & Communication';
      const result = await evaluateSpeechPronunciation(
        transcript,
        targetText,
        focusPhoneme
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
            Nhận diện giọng nói AI, chấm điểm phát âm theo âm tiết IPA & hội thoại Communication SGK Global Success.
          </p>
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => {
            setActiveTab('phoneme');
            setEvaluation(null);
            setRecognizedText('');
          }}
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
          onClick={() => {
            setActiveTab('roleplay');
            setEvaluation(null);
            setRecognizedText('');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'roleplay'
              ? 'bg-[#4A90E2] text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          2. Khung Hội Thoại Giao Tiếp 2 Chiều (Communication)
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
        <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-5">
          {/* Unit & Topic Selection Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Chọn Bài Học SGK (Communication)
              </span>
              <select
                value={selectedUnit.id}
                onChange={(e) => {
                  const u = units.find((x) => x.id === e.target.value);
                  if (u) setSelectedUnit(u);
                }}
                className="text-sm bg-slate-50 border border-slate-300 font-bold px-3 py-2 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber}: {u.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Switcher */}
            <div className="flex flex-wrap gap-2">
              {dialogueList.map((dlg) => {
                const isSelected = selectedDialogue.id === dlg.id;
                return (
                  <button
                    key={dlg.id}
                    onClick={() => {
                      setSelectedDialogue(dlg);
                      setEvaluation(null);
                      setRecognizedText('');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {dlg.topicTitle}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context Note Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200 text-xs text-purple-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">💬</span>
              <div>
                <span className="font-extrabold block text-purple-950">
                  {selectedDialogue.contextNote}
                </span>
                <span className="text-[11px] text-purple-700">
                  Luyện nói phản xạ: AI đọc trước $\rightarrow$ Em bấm micro để trả lời lại theo gợi ý SGK!
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-200 text-purple-900 font-extrabold text-[10px]">
              Everyday English
            </span>
          </div>

          {/* 2-Way Speech Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* AI Speaker Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-800 flex items-center gap-1.5">
                  <span>🤖 AI Speaker ({selectedDialogue.aiSpeaker}):</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 text-[10px] font-bold">
                  Câu hỏi AI
                </span>
              </div>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                "{selectedDialogue.aiText}"
              </p>
              <button
                onClick={() => handleListenTarget(selectedDialogue.aiText)}
                className="px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 inline-flex items-center gap-1.5 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" /> Nghe AI đọc giọng Native
              </button>
            </div>

            {/* Student Response Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5">
                  <span>🙋‍ Em (Gợi ý trả lời SGK):</span>
                </span>
                <button
                  onClick={() => handleListenTarget(selectedDialogue.studentSuggestion)}
                  className="p-1 rounded-full text-blue-500 hover:text-blue-700"
                  title="Nghe mẫu câu trả lời"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                "{selectedDialogue.studentSuggestion}"
              </p>

              {/* Record Action */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={startRecording}
                  disabled={isRecording || isEvaluating}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isRecording ? 'Đang lắng nghe...' : 'Bắt đầu thu âm trả lời'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recognized text & AI Evaluation for Roleplay */}
          {recognizedText && (
            <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-700 border border-slate-200">
              <span className="font-bold text-slate-500">Giọng nói em phát âm: </span>
              <span className="font-bold text-indigo-700">"{recognizedText}"</span>
            </div>
          )}

          {isEvaluating && (
            <div className="p-4 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI đang chấm điểm trôi chảy và độ chính xác giao tiếp...</span>
            </div>
          )}

          {/* Evaluation Results */}
          {evaluation && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FF9500]" />
                  <span className="font-bold text-sm text-slate-900">
                    Đánh Giá Giao Tiếp AI
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-sm">
                  {evaluation.score}/100 - {evaluation.accuracyGrade}
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-indigo-700">
                  💬 Nhận xét giao tiếp: {evaluation.teacherFeedback}
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
      )}
    </div>
  );
};
