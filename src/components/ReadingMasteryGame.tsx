import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Play,
  Pause,
  Square,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageSquare,
  CheckSquare,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SgkUnit, StudySession } from '../types';

interface ReadingMasteryGameProps {
  units: SgkUnit[];
  onSessionCompleted?: (session: StudySession) => void;
  onBackToPractice?: () => void;
}

export interface UnitReadingQuestion {
  id: string;
  type: 'MCQ' | 'True/False' | 'ShortAnswer';
  question: string;
  options?: string[]; // For MCQ and True/False
  correct: string;
  acceptableAnswers?: string[]; // For ShortAnswer
  explanation: string;
  quote: string;
}

export interface UnitReadingData {
  unitId: string;
  unitNumber: number;
  title: string;
  topicTitle: string;
  fullTextFormatted: string;
  passages: Array<{
    id: string;
    heading?: string;
    text: string;
  }>;
  vocabList: Array<{
    id: string;
    word: string;
    ipa: string;
    meaning: string;
    example: string;
    dist: string[];
  }>;
  questions: UnitReadingQuestion[];
}

export const UNIT_READINGS: UnitReadingData[] = [
  {
    unitId: 'unit-1',
    unitNumber: 1,
    title: 'MY NEW SCHOOL',
    topicTitle: 'Unit 1: My New School (Sunrise, An Son & Dream Schools)',
    fullTextFormatted: `Sunrise is a boarding school in Sydney. Students study and live there. About 1,200 boys and girls go to Sunrise. It has students from all over Australia. They study subjects like maths, science and English.\n\nAn Son is a lower secondary school in Bac Giang. It has only 8 classes. There are mountains and green fields around the school. There is a computer room and a library. There is also a school garden and a playground.\n\nDream is an international school. Here students learn English with English-speaking teachers. In the afternoon, they join many interesting clubs. They play sports and games. Some students do paintings in the art club.`,
    passages: [
      {
        id: 'u1-p1',
        heading: '1. Sunrise Boarding School',
        text: 'Sunrise is a boarding school in Sydney. Students study and live there. About 1,200 boys and girls go to Sunrise. It has students from all over Australia. They study subjects like maths, science and English.'
      },
      {
        id: 'u1-p2',
        heading: '2. An Son Lower Secondary School',
        text: 'An Son is a lower secondary school in Bac Giang. It has only 8 classes. There are mountains and green fields around the school. There is a computer room and a library. There is also a school garden and a playground.'
      },
      {
        id: 'u1-p3',
        heading: '3. Dream International School',
        text: 'Dream is an international school. Here students learn English with English-speaking teachers. In the afternoon, they join many interesting clubs. They play sports and games. Some students do paintings in the art club.'
      }
    ],
    vocabList: [
      { id: 'u1-v1', word: 'boarding school', ipa: '/ˈbɔː.dɪŋ ˌskuːl/', meaning: 'trường nội trú', example: 'Sunrise is a boarding school in Sydney.', dist: ['trường bán trú', 'trường quốc tế', 'trường tiểu học'] },
      { id: 'u1-v2', word: 'lower secondary school', ipa: '/ˈləʊ.ər ˈsek.ən.dri ˌskuːl/', meaning: 'trường trung học cơ sở', example: 'An Son is a lower secondary school in Bac Giang.', dist: ['trường đại học', 'mầm non', 'trường nghề'] },
      { id: 'u1-v3', word: 'international', ipa: '/ˌɪn.təˈnæʃ.ən.əl/', meaning: 'quốc tế', example: 'Dream is an international school.', dist: ['địa phương', 'nông thôn', 'tư thục'] },
      { id: 'u1-v4', word: 'subject', ipa: '/ˈsʌb.dʒekt/', meaning: 'môn học', example: 'They study subjects like maths, science and English.', dist: ['dụng cụ', 'sân chơi', 'câu lạc bộ'] },
      { id: 'u1-v5', word: 'playground', ipa: '/ˈpleɪ.ɡraʊnd/', meaning: 'sân chơi', example: 'There is also a school garden and a playground.', dist: ['thư viện', 'phòng máy tính', 'lớp học'] }
    ],
    questions: [
      {
        id: 'u1-q1',
        type: 'MCQ',
        question: 'Where is Sunrise boarding school located?',
        options: ['In Sydney', 'In Bac Giang', 'In Ha Noi', 'In London'],
        correct: 'In Sydney',
        explanation: 'Sunrise là trường nội trú ở Sydney, Úc.',
        quote: 'Sunrise is a boarding school in Sydney.'
      },
      {
        id: 'u1-q2',
        type: 'True/False',
        question: 'An Son lower secondary school has 20 classes.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Trường An Sơn ở Bắc Giang chỉ có 8 lớp học (only 8 classes).',
        quote: 'An Son is a lower secondary school in Bac Giang. It has only 8 classes.'
      },
      {
        id: 'u1-q3',
        type: 'True/False',
        question: 'Sunrise is a boarding school where students study and live.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Trường nội trú Sunrise là nơi học sinh học tập và sinh sống tại đó.',
        quote: 'Sunrise is a boarding school in Sydney. Students study and live there.'
      },
      {
        id: 'u1-q4',
        type: 'ShortAnswer',
        question: 'What subjects do students at Sunrise study?',
        correct: 'maths, science and English',
        acceptableAnswers: ['maths', 'science', 'english', 'maths, science and english'],
        explanation: 'Học sinh trường Sunrise học các môn toán, khoa học và tiếng Anh.',
        quote: 'They study subjects like maths, science and English.'
      }
    ]
  },
  {
    unitId: 'unit-2',
    unitNumber: 2,
    title: 'MY HOUSE',
    topicTitle: 'Unit 2: My House (Crazy House Hotel in Da Lat)',
    fullTextFormatted: `To: phong@webmail.com; mi@webmail.com\nSubject: A room at the Crazy House Hotel\n\nHi Phong and Mi,\nHow are you? I’m in Da Lat with my parents. We’re staying at the Crazy House Hotel. Wow! It really is crazy.\n\nThere are ten rooms in the hotel. There’s a Kangaroo Room, an Eagle Room, and even an Ant Room. I’m staying in the Tiger Room. It’s called the Tiger Room because there’s a big tiger on the wall.\n\nThe tiger is between the bathroom door and the window. The bed is next to the window, but the window is a strange shape. I put my bag under the bed. There’s a lamp, a wardrobe and a desk.\n\nYou should stay here when you visit Da Lat. It’s great.\n\nSee you soon!\nNick`,
    passages: [
      {
        id: 'u2-p1',
        heading: 'Email Header & Greeting',
        text: 'To: phong@webmail.com; mi@webmail.com\nSubject: A room at the Crazy House Hotel\n\nHi Phong and Mi,\nHow are you? I’m in Da Lat with my parents. We’re staying at the Crazy House Hotel. Wow! It really is crazy.'
      },
      {
        id: 'u2-p2',
        heading: 'Hotel Rooms Description',
        text: 'There are ten rooms in the hotel. There’s a Kangaroo Room, an Eagle Room, and even an Ant Room. I’m staying in the Tiger Room. It’s called the Tiger Room because there’s a big tiger on the wall.'
      },
      {
        id: 'u2-p3',
        heading: 'Furniture & Room Layout',
        text: 'The tiger is between the bathroom door and the window. The bed is next to the window, but the window is a strange shape. I put my bag under the bed. There’s a lamp, a wardrobe and a desk.\nYou should stay here when you visit Da Lat. It’s great.\nSee you soon!\nNick'
      }
    ],
    vocabList: [
      { id: 'u2-v1', word: 'hotel', ipa: '/həʊˈtel/', meaning: 'khách sạn', example: 'We’re staying at the Crazy House Hotel.', dist: ['nhà riêng', 'bệnh viện', 'bưu điện'] },
      { id: 'u2-v2', word: 'strange shape', ipa: '/streɪndʒ ʃeɪp/', meaning: 'hình dạng kỳ lạ', example: 'The window is a strange shape.', dist: ['hình tròn chuẩn', 'màu sắc đẹp', 'kích thước to'] },
      { id: 'u2-v3', word: 'wardrobe', ipa: '/ˈwɔː.drəʊb/', meaning: 'tủ quần áo', example: 'There’s a lamp, a wardrobe and a desk.', dist: ['bàn ăn', 'ghế sofa', 'tủ lạnh'] },
      { id: 'u2-v4', word: 'under the bed', ipa: '/ˈʌn.dər ðə bed/', meaning: 'dưới gầm giường', example: 'I put my bag under the bed.', dist: ['trên bàn', 'trong tủ', 'cạnh cửa'] }
    ],
    questions: [
      {
        id: 'u2-q1',
        type: 'MCQ',
        question: 'How many rooms are there in the Crazy House Hotel?',
        options: ['Ten rooms', 'Eight rooms', 'Twelve rooms', 'Five rooms'],
        correct: 'Ten rooms',
        explanation: 'Khách sạn Crazy House có 10 phòng.',
        quote: 'There are ten rooms in the hotel.'
      },
      {
        id: 'u2-q2',
        type: 'True/False',
        question: 'Nick is staying in the Kangaroo Room.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Nick ở trong phòng con hổ (Tiger Room).',
        quote: 'I’m staying in the Tiger Room.'
      },
      {
        id: 'u2-q3',
        type: 'True/False',
        question: 'There is a big tiger on the wall in Nick’s room.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Có một con hổ lớn trên tường trong phòng Nick.',
        quote: 'It’s called the Tiger Room because there’s a big tiger on the wall.'
      },
      {
        id: 'u2-q4',
        type: 'ShortAnswer',
        question: 'Where did Nick put his bag in the room?',
        correct: 'under the bed',
        acceptableAnswers: ['under the bed', 'under bed'],
        explanation: 'Nick đặt chiếc cặp của mình dưới gầm giường.',
        quote: 'I put my bag under the bed.'
      }
    ]
  },
  {
    unitId: 'unit-3',
    unitNumber: 3,
    title: 'MY FRIENDS',
    topicTitle: 'Unit 3: My Friends (Superb Summer Camp)',
    fullTextFormatted: `Friday 16th June\nTo: My parents <parents.nguyen@webmail.com>\nSubject: My first day at the Superb Summer Camp\n\nHi Mum and Dad,\nHere I am at the Superb Summer Camp. Mr Black asked us to write emails in English! Wow, everything here is in English!\n\nI have some new friends: Jimmy, Phong, and Nhung. They’re in the photo. Jimmy has blonde hair and blue eyes. He’s clever and creative. He likes taking photos. Phong is the tall boy. He’s sporty and plays basketball very well. Nhung has curly black hair. She’s kind. She shared her lunch with me today.\n\nWe’re having fun. Jimmy’s taking photos of me. Phong’s reading a comic book, and Nhung’s playing the violin. I must go now.\n\nPlease write soon.\nLove,\nNam`,
    passages: [
      {
        id: 'u3-p1',
        heading: 'Email Header & Greeting',
        text: 'Friday 16th June\nTo: My parents <parents.nguyen@webmail.com>\nSubject: My first day at the Superb Summer Camp\n\nHi Mum and Dad,\nHere I am at the Superb Summer Camp. Mr Black asked us to write emails in English! Wow, everything here is in English!'
      },
      {
        id: 'u3-p2',
        heading: 'Describing New Friends',
        text: 'I have some new friends: Jimmy, Phong, and Nhung. They’re in the photo. Jimmy has blonde hair and blue eyes. He’s clever and creative. He likes taking photos. Phong is the tall boy. He’s sporty and plays basketball very well. Nhung has curly black hair. She’s kind. She shared her lunch with me today.'
      },
      {
        id: 'u3-p3',
        heading: 'Current Activities & Sign-off',
        text: 'We’re having fun. Jimmy’s taking photos of me. Phong’s reading a comic book, and Nhung’s playing the violin. I must go now.\nPlease write soon.\nLove,\nNam'
      }
    ],
    vocabList: [
      { id: 'u3-v1', word: 'blonde hair', ipa: '/blɒnd heər/', meaning: 'tóc vàng', example: 'Jimmy has blonde hair and blue eyes.', dist: ['tóc đen xoăn', 'tóc nâu ngắn', 'tóc đỏ'] },
      { id: 'u3-v2', word: 'clever and creative', ipa: '/ˈklev.ər ænd kriˈeɪ.tɪv/', meaning: 'thông minh và sáng tạo', example: 'He’s clever and creative.', dist: ['nhút nhát và lười', 'thể thao', 'nghiêm túc'] },
      { id: 'u3-v3', word: 'sporty', ipa: '/ˈspɔː.ti/', meaning: 'yêu thể thao / năng động', example: 'Phong is the tall boy. He’s sporty.', dist: ['khéo léo', 'tốt bụng', 'tóc vàng'] },
      { id: 'u3-v4', word: 'curly black hair', ipa: '/ˈkɜː.li blæk heər/', meaning: 'tóc đen xoăn', example: 'Nhung has curly black hair.', dist: ['tóc vàng thẳng', 'tóc ngắn', 'tóc nâu'] }
    ],
    questions: [
      {
        id: 'u3-q1',
        type: 'MCQ',
        question: 'Who asked the students to write emails in English at the camp?',
        options: ['Mr Black', 'Nam’s father', 'Phong', 'Jimmy'],
        correct: 'Mr Black',
        explanation: 'Thầy Black yêu cầu học sinh viết email bằng tiếng Anh.',
        quote: 'Mr Black asked us to write emails in English!'
      },
      {
        id: 'u3-q2',
        type: 'True/False',
        question: 'Jimmy has curly black hair.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Jimmy có mái tóc vàng và mắt màu xanh biển (blonde hair and blue eyes).',
        quote: 'Jimmy has blonde hair and blue eyes.'
      },
      {
        id: 'u3-q3',
        type: 'True/False',
        question: 'Nhung shared her lunch with Nam today.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Nhung tốt bụng đã chia sẻ bữa ăn trưa với Nam.',
        quote: 'She’s kind. She shared her lunch with me today.'
      },
      {
        id: 'u3-q4',
        type: 'ShortAnswer',
        question: 'What sport does Phong play very well?',
        correct: 'basketball',
        acceptableAnswers: ['basketball', 'plays basketball'],
        explanation: 'Phong chơi môn bóng rổ rất giỏi.',
        quote: 'He’s sporty and plays basketball very well.'
      }
    ]
  },
  {
    unitId: 'unit-4',
    unitNumber: 4,
    title: 'MY NEIGHBOURHOOD',
    topicTitle: 'Unit 4: My Neighbourhood (Suburbs of Da Nang)',
    fullTextFormatted: `Friday, December 23rd ...\nMY NEIGHBOURHOOD\n\nI live in the suburbs of Da Nang City. There are many things I like about my neighbourhood.\n\nIt’s great for outdoor activities because it has beautiful parks, sandy beaches and fine weather. There’s almost everything I need here: shops, restaurants, and markets. The people here are friendlier, and the food is better than in other places.\n\nHowever, there are two things I dislike about it: there are many modern buildings and offices; and the streets are busy and crowded.\n\nPosted by Khang at 4:55 PM`,
    passages: [
      {
        id: 'u4-p1',
        heading: 'Likes About Neighbourhood',
        text: 'Friday, December 23rd ...\nMY NEIGHBOURHOOD\n\nI live in the suburbs of Da Nang City. There are many things I like about my neighbourhood.\nIt’s great for outdoor activities because it has beautiful parks, sandy beaches and fine weather. There’s almost everything I need here: shops, restaurants, and markets. The people here are friendlier, and the food is better than in other places.'
      },
      {
        id: 'u4-p2',
        heading: 'Dislikes & Post Info',
        text: 'However, there are two things I dislike about it: there are many modern buildings and offices; and the streets are busy and crowded.\n\nPosted by Khang at 4:55 PM'
      }
    ],
    vocabList: [
      { id: 'u4-v1', word: 'suburbs', ipa: '/ˈsʌb.ɜːbz/', meaning: 'vùng ngoại ô', example: 'I live in the suburbs of Da Nang City.', dist: ['trung tâm thành phố', 'bãi biển', 'công viên'] },
      { id: 'u4-v2', word: 'sandy beaches', ipa: '/ˈsæn.di biːtʃɪz/', meaning: 'bãi biển cát mịn', example: 'It has beautiful parks and sandy beaches.', dist: ['ngọn núi cao', 'tòa nhà hiện đại', 'chợ đêm'] },
      { id: 'u4-v3', word: 'busy and crowded', ipa: '/ˈbɪz.i ænd ˈkraʊ.dɪd/', meaning: 'đông đúc và nhộn nhịp', example: 'The streets are busy and crowded.', dist: ['vắng vẻ yên tĩnh', 'rộng rãi', 'sạch sẽ'] }
    ],
    questions: [
      {
        id: 'u4-q1',
        type: 'MCQ',
        question: 'Where does Khang live?',
        options: [
          'In the suburbs of Da Nang City',
          'In the center of Da Lat',
          'In a boarding school in Sydney',
          'Near Ha Long Bay'
        ],
        correct: 'In the suburbs of Da Nang City',
        explanation: 'Khang sống ở vùng ngoại ô thành phố Đà Nẵng.',
        quote: 'I live in the suburbs of Da Nang City.'
      },
      {
        id: 'u4-q2',
        type: 'True/False',
        question: 'Khang dislikes the beautiful parks and sandy beaches in his neighbourhood.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Khang rất thích các công viên đẹp và bãi biển cát mịn.',
        quote: 'There are many things I like about my neighbourhood. It’s great for outdoor activities because it has beautiful parks, sandy beaches...'
      },
      {
        id: 'u4-q3',
        type: 'True/False',
        question: 'The streets in Khang’s neighbourhood are busy and crowded.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Đường phố nơi Khang sống rất đông đúc và nhộn nhịp.',
        quote: '...and the streets are busy and crowded.'
      },
      {
        id: 'u4-q4',
        type: 'ShortAnswer',
        question: 'In which city does Khang live in the suburbs?',
        correct: 'Da Nang',
        acceptableAnswers: ['da nang', 'da nang city', 'danang'],
        explanation: 'Khang sống ở ngoại ô thành phố Đà Nẵng.',
        quote: 'I live in the suburbs of Da Nang City.'
      }
    ]
  },
  {
    unitId: 'unit-5',
    unitNumber: 5,
    title: 'NATURAL WONDERS OF VIET NAM',
    topicTitle: 'Unit 5: Natural Wonders of Viet Nam (Ha Long Bay & Mui Ne)',
    fullTextFormatted: `Ha Long Bay is in Quang Ninh. It has many islands and caves. Tuan Chau, with its beautiful beaches, is a popular tourist attraction in Ha Long Bay. There you can enjoy great seafood. And you can join in exciting activities. Ha Long Bay is Viet Nam’s best natural wonder.\n\nMui Ne is popular for its amazing landscapes. The sand has different colours: white, yellow, red ... It’s like a desert here. You can ride a bike down the slopes. You can also fly kites, or have a picnic by the beach. The best time to visit the Mui Ne Sand Dunes is early morning or late afternoon. Remember to wear suncream and bring water.`,
    passages: [
      {
        id: 'u5-p1',
        heading: '1. Ha Long Bay',
        text: 'Ha Long Bay is in Quang Ninh. It has many islands and caves. Tuan Chau, with its beautiful beaches, is a popular tourist attraction in Ha Long Bay. There you can enjoy great seafood. And you can join in exciting activities. Ha Long Bay is Viet Nam’s best natural wonder.'
      },
      {
        id: 'u5-p2',
        heading: '2. Mui Ne Sand Dunes',
        text: 'Mui Ne is popular for its amazing landscapes. The sand has different colours: white, yellow, red ... It’s like a desert here. You can ride a bike down the slopes. You can also fly kites, or have a picnic by the beach. The best time to visit the Mui Ne Sand Dunes is early morning or late afternoon. Remember to wear suncream and bring water.'
      }
    ],
    vocabList: [
      { id: 'u5-v1', word: 'tourist attraction', ipa: '/ˈtʊə.rɪst əˈtræk.ʃən/', meaning: 'điểm thu hút du lịch', example: 'Tuan Chau is a popular tourist attraction.', dist: ['khu công nghiệp', 'trường học', 'bệnh viện'] },
      { id: 'u5-v2', word: 'amazing landscapes', ipa: '/əˈmeɪ.zɪŋ ˈlænd.skeɪps/', meaning: 'danh thắng tuyệt vời', example: 'Mui Ne is popular for its amazing landscapes.', dist: ['món ăn ngon', 'khách sạn đẹp', 'thành phố lớn'] },
      { id: 'u5-v3', word: 'suncream', ipa: '/ˈsʌn.kriːm/', meaning: 'kem chống nắng', example: 'Remember to wear suncream and bring water.', dist: ['nước ngọt', 'mũ bảo hiểm', 'xe đạp'] }
    ],
    questions: [
      {
        id: 'u5-q1',
        type: 'MCQ',
        question: 'Where is Ha Long Bay located?',
        options: ['In Quang Ninh', 'In Da Nang', 'In Phan Thiet', 'In Bac Giang'],
        correct: 'In Quang Ninh',
        explanation: 'Vịnh Hạ Long nằm ở tỉnh Quảng Ninh.',
        quote: 'Ha Long Bay is in Quang Ninh.'
      },
      {
        id: 'u5-q2',
        type: 'True/False',
        question: 'The sand in Mui Ne only has one colour: white.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Cát ở Mũi Né có nhiều màu sắc khác nhau: trắng, vàng, đỏ...',
        quote: 'The sand has different colours: white, yellow, red ...'
      },
      {
        id: 'u5-q3',
        type: 'True/False',
        question: 'Ha Long Bay is Viet Nam’s best natural wonder.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Vịnh Hạ Long là kỳ quan thiên nhiên tuyệt vời nhất của Việt Nam.',
        quote: 'Ha Long Bay is Viet Nam’s best natural wonder.'
      },
      {
        id: 'u5-q4',
        type: 'ShortAnswer',
        question: 'What item should you wear to protect your skin when visiting Mui Ne Sand Dunes?',
        correct: 'suncream',
        acceptableAnswers: ['suncream', 'wear suncream'],
        explanation: 'Bạn nên bôi kem chống nắng (suncream) để bảo vệ da.',
        quote: 'Remember to wear suncream and bring water.'
      }
    ]
  },
  {
    unitId: 'unit-6',
    unitNumber: 6,
    title: 'OUR TET HOLIDAY',
    topicTitle: 'Unit 6: Our Tet Holiday (New Year Celebrations)',
    fullTextFormatted: `A. Russ - the USA:\nI often go to Times Square with my parents to welcome the New Year. When the clock strikes midnight, colourful fireworks light up the sky. Everybody cheers and sings.\n\nB. Wu - China:\nOn New Year's Day, we dress beautifully and go to our grandparents' houses. We wish them Happy New Year and they give us lucky money. Then we go out and have a day full of fun.\n\nC. Mai - Viet Nam:\nI learn some customs about Tet from my parents. People give rice to wish for enough food and buy salt to wish for good luck. Dogs are lucky animals but cats are not. A cat's cry sounds like "poor" in Vietnamese.`,
    passages: [
      {
        id: 'u6-p1',
        heading: 'A. Russ - the USA',
        text: 'I often go to Times Square with my parents to welcome the New Year. When the clock strikes midnight, colourful fireworks light up the sky. Everybody cheers and sings.'
      },
      {
        id: 'u6-p2',
        heading: 'B. Wu - China',
        text: 'On New Year\'s Day, we dress beautifully and go to our grandparents\' houses. We wish them Happy New Year and they give us lucky money. Then we go out and have a day full of fun.'
      },
      {
        id: 'u6-p3',
        heading: 'C. Mai - Viet Nam',
        text: 'I learn some customs about Tet from my parents. People give rice to wish for enough food and buy salt to wish for good luck. Dogs are lucky animals but cats are not. A cat\'s cry sounds like "poor" in Vietnamese.'
      }
    ],
    vocabList: [
      { id: 'u6-v1', word: 'fireworks', ipa: '/ˈfaɪə.wɜːks/', meaning: 'pháo hoa', example: 'Colourful fireworks light up the sky.', dist: ['đèn lồng', 'bánh chưng', 'tiền may mắn'] },
      { id: 'u6-v2', word: 'lucky money', ipa: '/ˈlʌk.i ˌmʌn.i/', meaning: 'tiền lì xì', example: 'They give us lucky money.', dist: ['quà mừng', 'quần áo', 'đồ chơi'] },
      { id: 'u6-v3', word: 'customs', ipa: '/ˈkʌs.təmz/', meaning: 'các phong tục tập quán', example: 'I learn some customs about Tet from my parents.', dist: ['môn học', 'luật lệ', 'trò chơi'] }
    ],
    questions: [
      {
        id: 'u6-q1',
        type: 'MCQ',
        question: 'Where does Russ go with his parents to welcome the New Year?',
        options: ['Times Square', 'Ha Noi', 'Da Lat', 'Stockholm'],
        correct: 'Times Square',
        explanation: 'Russ cùng bố mẹ đến Quảng trường Thời Đại (Times Square) ở Mỹ đón năm mới.',
        quote: 'I often go to Times Square with my parents to welcome the New Year.'
      },
      {
        id: 'u6-q2',
        type: 'True/False',
        question: 'In Viet Nam, cats are considered lucky animals during Tet.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Ở Việt Nam chó mới là loài vật may mắn, còn mèo thì không.',
        quote: 'Dogs are lucky animals but cats are not.'
      },
      {
        id: 'u6-q3',
        type: 'True/False',
        question: 'Wu and his family visit their grandparents on New Year’s Day.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Wu và gia đình mặc đẹp và đến nhà ông bà chúc Tết.',
        quote: 'On New Year\'s Day, we dress beautifully and go to our grandparents\' houses.'
      },
      {
        id: 'u6-q4',
        type: 'ShortAnswer',
        question: 'What do Vietnamese people buy at Tet to wish for good luck?',
        correct: 'salt',
        acceptableAnswers: ['salt', 'buy salt'],
        explanation: 'Người Việt mua muối đầu năm với ước nguyện cầu may mắn.',
        quote: '...and buy salt to wish for good luck.'
      }
    ]
  },
  {
    unitId: 'unit-7',
    unitNumber: 7,
    title: 'TELEVISION',
    topicTitle: 'Unit 7: Television (TV Programme Guide)',
    fullTextFormatted: `8.00 | Wildlife: Cuc Phuong Forest | Watch the colourful world of plants, flowers, and animals in their real life.\n9.00 | Comedy: The Fox Teacher | Have a lot of fun with a fox teacher and his students on their first day at school.\n10.30 | Sports: The Pig Race | Watch the cute pigs compete in the most exciting races. Who wins?\n11.00 | Game show: Children are Always Right | Join this game show today and try to answer interesting questions about pets.\n12.15 | Science: The Dolphins | Watch funny and interesting clips of intelligent dolphins in their natural life - the sea.`,
    passages: [
      {
        id: 'u7-p1',
        heading: '8.00 - Wildlife & 9.00 - Comedy',
        text: '8.00 | Wildlife: Cuc Phuong Forest - Watch the colourful world of plants, flowers, and animals in their real life.\n9.00 | Comedy: The Fox Teacher - Have a lot of fun with a fox teacher and his students on their first day at school.'
      },
      {
        id: 'u7-p2',
        heading: '10.30 - Sports, 11.00 - Game show & 12.15 - Science',
        text: '10.30 | Sports: The Pig Race - Watch the cute pigs compete in the most exciting races. Who wins?\n11.00 | Game show: Children are Always Right - Join this game show today and try to answer interesting questions about pets.\n12.15 | Science: The Dolphins - Watch funny and interesting clips of intelligent dolphins in their natural life - the sea.'
      }
    ],
    vocabList: [
      { id: 'u7-v1', word: 'wildlife', ipa: '/ˈwaɪld.laɪf/', meaning: 'thiên nhiên hoang dã', example: 'Wildlife: Cuc Phuong Forest.', dist: ['hài hước', 'thể thao', 'trò chơi'] },
      { id: 'u7-v2', word: 'comedy', ipa: '/ˈkɒm.ə.di/', meaning: 'phim / chương trình hài', example: 'Comedy: The Fox Teacher.', dist: ['khoa học', 'tin tức', 'phim tài liệu'] },
      { id: 'u7-v3', word: 'intelligent dolphins', ipa: '/ɪnˈtel.ɪ.dʒənt ˈdɒl.fɪnz/', meaning: 'những chú cá heo thông minh', example: 'Clips of intelligent dolphins in the sea.', dist: ['những chú heo đáng yêu', 'thầy giáo cáo', 'động vật hoang dã'] }
    ],
    questions: [
      {
        id: 'u7-q1',
        type: 'MCQ',
        question: 'What programme is on TV at 9.00?',
        options: [
          'Comedy: The Fox Teacher',
          'Wildlife: Cuc Phuong Forest',
          'Sports: The Pig Race',
          'Science: The Dolphins'
        ],
        correct: 'Comedy: The Fox Teacher',
        explanation: 'Lúc 9h00 là chương trình phim hài "The Fox Teacher".',
        quote: '9.00 | Comedy: The Fox Teacher'
      },
      {
        id: 'u7-q2',
        type: 'True/False',
        question: 'The Pig Race is a sports programme broadcasted at 10.30.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Chương trình "The Pig Race" là môn thể thao phát sóng lúc 10h30.',
        quote: '10.30 | Sports: The Pig Race'
      },
      {
        id: 'u7-q3',
        type: 'True/False',
        question: 'The Dolphins is a comedy show about cartoon animals.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! "The Dolphins" là một chương trình Khoa học (Science).',
        quote: '12.15 | Science: The Dolphins'
      },
      {
        id: 'u7-q4',
        type: 'ShortAnswer',
        question: 'What time is the Wildlife programme about Cuc Phuong Forest broadcasted?',
        correct: '8.00',
        acceptableAnswers: ['8.00', '8:00', '8'],
        explanation: 'Chương trình Wildlife Cuc Phuong Forest phát sóng lúc 8h00.',
        quote: '8.00 | Wildlife: Cuc Phuong Forest'
      }
    ]
  },
  {
    unitId: 'unit-8',
    unitNumber: 8,
    title: 'SPORTS AND GAMES',
    topicTitle: 'Unit 8: Sports and Games (Pelé - Football Legend)',
    fullTextFormatted: `The PE teacher is talking to her students about Pelé.\n\nTeacher: Today we’re going to talk about Pelé. Do you know him?\nNick: Yes, I think he’s the best footballer of all time.\nTeacher: Right. He was born in 1940 in Brazil. His father taught him to play football at a very young age.\nSusan: Oh. When did he begin his career in football?\nTeacher: At 15, when he started playing for Santos Football Club. In 1958, he won his first World Cup.\nNick: How many goals did he score in his career?\nTeacher: 1,281 goals in total, I think.\nNick and Susan: Wow! Amazing!\nTeacher: And he became "Football Player of the Century" in 1999.\nMichael: Surely Pelé's a national hero in Brazil.\nTeacher: Yes, and he's known around the world as "The King of Football".`,
    passages: [
      {
        id: 'u8-p1',
        heading: 'Part 1: Early Life & First World Cup',
        text: 'The PE teacher is talking to her students about Pelé.\n\nTeacher: Today we’re going to talk about Pelé. Do you know him?\nNick: Yes, I think he’s the best footballer of all time.\nTeacher: Right. He was born in 1940 in Brazil. His father taught him to play football at a very young age.\nSusan: Oh. When did he begin his career in football?\nTeacher: At 15, when he started playing for Santos Football Club. In 1958, he won his first World Cup.'
      },
      {
        id: 'u8-p2',
        heading: 'Part 2: Goals Record & Titles',
        text: 'Nick: How many goals did he score in his career?\nTeacher: 1,281 goals in total, I think.\nNick and Susan: Wow! Amazing!\nTeacher: And he became "Football Player of the Century" in 1999.\nMichael: Surely Pelé\'s a national hero in Brazil.\nTeacher: Yes, and he\'s known around the world as "The King of Football".'
      }
    ],
    vocabList: [
      { id: 'u8-v1', word: 'career', ipa: '/kəˈrɪər/', meaning: 'sự nghiệp', example: 'When did he begin his career in football?', dist: ['tuổi thơ', 'trận đấu', 'câu lạc bộ'] },
      { id: 'u8-v2', word: 'score goals', ipa: '/skɔːr ɡəʊlz/', meaning: 'ghi bàn thắng', example: 'He scored 1,281 goals in total.', dist: ['bắt bóng', 'tập thể lực', 'truyền bóng'] },
      { id: 'u8-v3', word: 'The King of Football', ipa: '/ðə kɪŋ əv ˈfʊt.bɔːl/', meaning: 'Vua Bóng Đá', example: 'He is known around the world as The King of Football.', dist: ['Cầu thủ trẻ nhất', 'Huấn luyện viên xuất sắc', 'Trọng tài quốc tế'] }
    ],
    questions: [
      {
        id: 'u8-q1',
        type: 'MCQ',
        question: 'When and where was Pelé born?',
        options: [
          'In 1940 in Brazil',
          'In 1958 in Santos',
          'In 1999 in Sydney',
          'In 1950 in England'
        ],
        correct: 'In 1940 in Brazil',
        explanation: 'Pelé sinh năm 1940 tại đất nước Brazil.',
        quote: 'He was born in 1940 in Brazil.'
      },
      {
        id: 'u8-q2',
        type: 'True/False',
        question: 'Pelé won his first World Cup in 1958.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Pelé vô địch World Cup đầu tiên vào năm 1958.',
        quote: 'In 1958, he won his first World Cup.'
      },
      {
        id: 'u8-q3',
        type: 'True/False',
        question: 'Pelé scored 500 goals in total during his career.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Tổng số bàn thắng Pelé đã ghi trong sự nghiệp là 1.281 bàn.',
        quote: 'Teacher: 1,281 goals in total, I think.'
      },
      {
        id: 'u8-q4',
        type: 'ShortAnswer',
        question: 'What famous title became Pelé in 1999?',
        correct: 'Football Player of the Century',
        acceptableAnswers: ['football player of the century', 'player of the century'],
        explanation: 'Năm 1999, ông trở thành Cầu thủ bóng đá của thế kỷ.',
        quote: 'And he became "Football Player of the Century" in 1999.'
      }
    ]
  },
  {
    unitId: 'unit-9',
    unitNumber: 9,
    title: 'CITIES OF THE WORLD',
    topicTitle: 'Unit 9: Cities of the World (Mai in Stockholm)',
    fullTextFormatted: `September 6\n\nDear Grandpa and Grandma,\n\nStockholm is fantastic! Its weather is perfect, sunny all the time! Our hotel is good. It has a swimming pool and a gym. It offers delicious breakfast. Yesterday Mum, Dad and I rented three bikes and cycled to the Old Town. My parents wore their helmets and I wore mine. We visited the Royal Palace first. What a beautiful place! Mum loved it. She said, "Swedish art is amazing." After that, we had "fika", a coffee break, in a traditional café. Everything is so wonderful!\n\nWish you were here!\n\nLove,\nMai`,
    passages: [
      {
        id: 'u9-p1',
        heading: 'Letter to Grandparents from Stockholm',
        text: 'September 6\n\nDear Grandpa and Grandma,\nStockholm is fantastic! Its weather is perfect, sunny all the time! Our hotel is good. It has a swimming pool and a gym. It offers delicious breakfast. Yesterday Mum, Dad and I rented three bikes and cycled to the Old Town. My parents wore their helmets and I wore mine. We visited the Royal Palace first. What a beautiful place! Mum loved it. She said, "Swedish art is amazing." After that, we had "fika", a coffee break, in a traditional café. Everything is so wonderful!\nWish you were here!\nLove,\nMai'
      }
    ],
    vocabList: [
      { id: 'u9-v1', word: 'fantastic weather', ipa: '/fænˈtæs.tɪk ˈweð.ər/', meaning: 'thời tiết tuyệt vời', example: 'Stockholm is fantastic! Weather is perfect.', dist: ['thời tiết mưa phùn', 'tuyết rơi lạnh', 'bão lớn'] },
      { id: 'u9-v2', word: 'Royal Palace', ipa: '/ˈrɔɪ.əl ˈpæl.əs/', meaning: 'Cung điện Hoàng gia', example: 'We visited the Royal Palace first.', dist: ['Bảo tàng lịch sử', 'Công viên giải trí', 'Khách sạn 5 sao'] },
      { id: 'u9-v3', word: 'fika', ipa: '/ˈfiː.kə/', meaning: 'giờ nghỉ uống cà phê (Thụy Điển)', example: 'After that, we had fika, a coffee break.', dist: ['món ăn tối', 'trò chơi đua xe', 'lễ hội âm nhạc'] }
    ],
    questions: [
      {
        id: 'u9-q1',
        type: 'MCQ',
        question: 'Which city is Mai writing her letter from?',
        options: ['Stockholm', 'Sydney', 'Da Lat', 'Da Nang'],
        correct: 'Stockholm',
        explanation: 'Mai đang ở thành phố Stockholm (Thụy Điển) viết thư cho ông bà.',
        quote: 'Stockholm is fantastic!'
      },
      {
        id: 'u9-q2',
        type: 'True/False',
        question: 'Mai and her parents rented three bikes to cycle to the Old Town.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Cả nhà Mai đã thuê 3 chiếc xe đạp để đi đến Phố Cổ.',
        quote: 'Yesterday Mum, Dad and I rented three bikes and cycled to the Old Town.'
      },
      {
        id: 'u9-q3',
        type: 'True/False',
        question: 'The weather in Stockholm was rainy and stormy all the time.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Thời tiết ở Stockholm rất hoàn hảo, luôn có nắng.',
        quote: 'Its weather is perfect, sunny all the time!'
      },
      {
        id: 'u9-q4',
        type: 'ShortAnswer',
        question: 'What famous place did Mai’s family visit first in the Old Town?',
        correct: 'Royal Palace',
        acceptableAnswers: ['royal palace', 'the royal palace'],
        explanation: 'Gia đình Mai đã ghé thăm Cung điện Hoàng gia (Royal Palace) đầu tiên.',
        quote: 'We visited the Royal Palace first.'
      }
    ]
  },
  {
    unitId: 'unit-10',
    unitNumber: 10,
    title: 'OUR HOUSES IN THE FUTURE',
    topicTitle: 'Unit 10: Our Houses in the Future (House on an Island)',
    fullTextFormatted: `My future house will be on an island. It will be surrounded by tall trees and the blue sea. There will be a swimming pool in front of the house. There will be a helicopter on the roof. I can fly to school in it.\n\nThere will be some robots in the house. They will help me to clean the floors, cook meals, wash clothes and water the flowers. They will also help me to feed the dogs and cats.\n\nThere will be a super smart TV. It will help me to send and receive emails, and contact my friends on other planets. It will also help me to buy food from the supermarket.`,
    passages: [
      {
        id: 'u10-p1',
        heading: 'Location & Outside House',
        text: 'My future house will be on an island. It will be surrounded by tall trees and the blue sea. There will be a swimming pool in front of the house. There will be a helicopter on the roof. I can fly to school in it.'
      },
      {
        id: 'u10-p2',
        heading: 'Robots & Super Smart TV',
        text: 'There will be some robots in the house. They will help me to clean the floors, cook meals, wash clothes and water the flowers. They will also help me to feed the dogs and cats.\nThere will be a super smart TV. It will help me to send and receive emails, and contact my friends on other planets. It will also help me to buy food from the supermarket.'
      }
    ],
    vocabList: [
      { id: 'u10-v1', word: 'island', ipa: '/ˈaɪ.lənd/', meaning: 'hòn đảo', example: 'My future house will be on an island.', dist: ['ngọn núi', 'thành phố', 'vùng ngoại ô'] },
      { id: 'u10-v2', word: 'helicopter on the roof', ipa: '/ˈhel.ɪˌkɒp.tər ɒn ðə ruːf/', meaning: 'máy bay trực thăng trên mái nhà', example: 'There will be a helicopter on the roof.', dist: ['xe đạp trong sân', 'thuyền dưới biển', 'ô tô trong gara'] },
      { id: 'u10-v3', word: 'super smart TV', ipa: '/ˈsuː.pər smɑːt ˌtiːˈviː/', meaning: 'tivi siêu thông minh', example: 'It will help me send and receive emails.', dist: ['máy tính cá nhân', 'điện thoại nắp gập', 'đài cassette'] }
    ],
    questions: [
      {
        id: 'u10-q1',
        type: 'MCQ',
        question: 'Where will the author’s future house be built?',
        options: ['On an island', 'In the city center', 'Under the sea', 'In a forest'],
        correct: 'On an island',
        explanation: 'Ngôi nhà tương lai sẽ được xây trên một hòn đảo.',
        quote: 'My future house will be on an island.'
      },
      {
        id: 'u10-q2',
        type: 'True/False',
        question: 'There will be a helicopter on the roof of the future house.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Trên mái nhà sẽ có một chiếc máy bay trực thăng để đi học.',
        quote: 'There will be a helicopter on the roof. I can fly to school in it.'
      },
      {
        id: 'u10-q3',
        type: 'True/False',
        question: 'Robots will do all school homework for the author.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Robot trong nhà chỉ làm việc nhà như lau sàn, nấu ăn, giặt quần áo, tưới cây, cho thú cưng ăn.',
        quote: 'They will help me to clean the floors, cook meals, wash clothes and water the flowers...'
      },
      {
        id: 'u10-q4',
        type: 'ShortAnswer',
        question: 'What facility will be in front of the future house?',
        correct: 'a swimming pool',
        acceptableAnswers: ['swimming pool', 'a swimming pool'],
        explanation: 'Phía trước ngôi nhà sẽ có một bể bơi.',
        quote: 'There will be a swimming pool in front of the house.'
      }
    ]
  },
  {
    unitId: 'unit-11',
    unitNumber: 11,
    title: 'OUR GREENER WORLD',
    topicTitle: 'Unit 11: Our Greener World (Nam’s Tips for a Greener School)',
    fullTextFormatted: `Reporter: Can you share with us some tips to make your school greener?\nNam: Sure. Firstly, we put recycling bins in every classroom.\nReporter: What about old books and uniforms?\nNam: We exchange them with our friends or give them to charity. We don't throw them away.\nReporter: Anything else?\nNam: We borrow books from the school library instead of buying new ones.\nReporter: Great! You can save much paper.\nNam: And there's another tip. We bring reusable water bottles to school.\nReporter: I see lots of trees in your school. Is planting trees a good tip?\nNam: Yeah. It makes our school greener.\nReporter: Thanks for sharing. Do you want to add anything?\nNam: Finally, we usually find creative ways to reuse old items before throwing them away.`,
    passages: [
      {
        id: 'u11-p1',
        heading: 'Interview Part 1: Bins & Books',
        text: 'Reporter: Can you share with us some tips to make your school greener?\nNam: Sure. Firstly, we put recycling bins in every classroom.\nReporter: What about old books and uniforms?\nNam: We exchange them with our friends or give them to charity. We don\'t throw them away.'
      },
      {
        id: 'u11-p2',
        heading: 'Interview Part 2: Bottles & Reuse',
        text: 'Reporter: Anything else?\nNam: We borrow books from the school library instead of buying new ones.\nReporter: Great! You can save much paper.\nNam: And there\'s another tip. We bring reusable water bottles to school.\nReporter: I see lots of trees in your school. Is planting trees a good tip?\nNam: Yeah. It makes our school greener.\nReporter: Thanks for sharing. Do you want to add anything?\nNam: Finally, we usually find creative ways to reuse old items before throwing them away.'
      }
    ],
    vocabList: [
      { id: 'u11-v1', word: 'recycling bins', ipa: '/ˌriːˈsaɪ.klɪŋ bɪnz/', meaning: 'thùng rác tái chế', example: 'We put recycling bins in every classroom.', dist: ['tủ sách', 'bàn học', 'chai nhựa'] },
      { id: 'u11-v2', word: 'reusable water bottles', ipa: '/riːˈjuː.zə.bəl ˈwɔː.tər ˈbɒt.əlz/', meaning: 'chai nước dùng lại nhiều lần', example: 'We bring reusable water bottles to school.', dist: ['chai nhựa dùng 1 lần', 'cốc giấy', 'túi nilon'] },
      { id: 'u11-v3', word: 'give to charity', ipa: '/ɡɪv tuː ˈtʃær.ə.ti/', meaning: 'quyên góp từ thiện', example: 'We exchange them or give them to charity.', dist: ['vứt vào thùng rác', 'đốt đi', 'bán đắt'] }
    ],
    questions: [
      {
        id: 'u11-q1',
        type: 'MCQ',
        question: 'Where do Nam and his classmates put recycling bins?',
        options: [
          'In every classroom',
          'Only in the school yard',
          'At the school gate',
          'In the computer room'
        ],
        correct: 'In every classroom',
        explanation: 'Các bạn đặt thùng rác tái chế trong mỗi phòng học.',
        quote: '...we put recycling bins in every classroom.'
      },
      {
        id: 'u11-q2',
        type: 'True/False',
        question: 'Nam and his friends throw old books away into the trash.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Các bạn đổi sách với bạn bè hoặc đem làm từ thiện chứ không vứt đi.',
        quote: 'We exchange them with our friends or give them to charity. We don\'t throw them away.'
      },
      {
        id: 'u11-q3',
        type: 'True/False',
        question: 'Bringing reusable water bottles helps make the school greener.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Mang theo bình nước tái sử dụng giúp hạn chế rác thải nhựa.',
        quote: 'We bring reusable water bottles to school.'
      },
      {
        id: 'u11-q4',
        type: 'ShortAnswer',
        question: 'What do students borrow from the school library to save paper?',
        correct: 'books',
        acceptableAnswers: ['books', 'old books'],
        explanation: 'Học sinh mượn sách ở thư viện thay vì mua mới để tiết kiệm giấy.',
        quote: 'We borrow books from the school library instead of buying new ones.'
      }
    ]
  },
  {
    unitId: 'unit-12',
    unitNumber: 12,
    title: 'ROBOTS',
    topicTitle: 'Unit 12: Robots (International Robot Show in Ha Noi)',
    fullTextFormatted: `Today there is an international robot show in Ha Noi. People can see many types of robots there.\n\nHome robots are useful for housework. They can do most of the housework: cook meals, clean the house, do the washing, and iron clothes.\n\nTeacher robots are the best choice for children. They can help them to study. They can teach them English, literature, maths and other subjects. They can also help children to improve their English pronunciation.\n\nPeople are also interested in other types of robots at the show. Worker robots can build houses and move heavy things; doctor robots can look after sick people and space robots can build space stations on the Moon and on planets.`,
    passages: [
      {
        id: 'u12-p1',
        heading: '1. International Robot Show & Home Robots',
        text: 'Today there is an international robot show in Ha Noi. People can see many types of robots there.\nHome robots are useful for housework. They can do most of the housework: cook meals, clean the house, do the washing, and iron clothes.'
      },
      {
        id: 'u12-p2',
        heading: '2. Teacher Robots & Special Robots',
        text: 'Teacher robots are the best choice for children. They can help them to study. They can teach them English, literature, maths and other subjects. They can also help children to improve their English pronunciation.\nPeople are also interested in other types of robots at the show. Worker robots can build houses and move heavy things; doctor robots can look after sick people and space robots can build space stations on the Moon and on planets.'
      }
    ],
    vocabList: [
      { id: 'u12-v1', word: 'home robots', ipa: '/həʊm ˈrəʊ.bɒts/', meaning: 'robot gia đình / việc nhà', example: 'Home robots are useful for housework.', dist: ['robot công nhân', 'robot bác sĩ', 'robot vũ trụ'] },
      { id: 'u12-v2', word: 'teacher robots', ipa: '/ˈtiː.tʃər ˈrəʊ.bɒts/', meaning: 'robot giáo viên', example: 'Teacher robots are the best choice for children.', dist: ['robot gia đình', 'robot xây dựng', 'bác sĩ'] },
      { id: 'u12-v3', word: 'improve pronunciation', ipa: '/ɪmˈpruːv prəˌnʌn.siˈeɪ.ʃən/', meaning: 'cải thiện sự phát âm', example: 'They help children to improve English pronunciation.', dist: ['nấu ăn', 'xây nhà', 'chữa bệnh'] }
    ],
    questions: [
      {
        id: 'u12-q1',
        type: 'MCQ',
        question: 'Where is the international robot show taking place?',
        options: ['In Ha Noi', 'In Sydney', 'In Da Nang', 'In Stockholm'],
        correct: 'In Ha Noi',
        explanation: 'Triển lãm robot quốc tế đang diễn ra tại Hà Nội.',
        quote: 'Today there is an international robot show in Ha Noi.'
      },
      {
        id: 'u12-q2',
        type: 'True/False',
        question: 'Home robots can build space stations on the Moon.',
        options: ['True', 'False'],
        correct: 'False',
        explanation: 'Sai! Robot vũ trụ (space robots) mới làm nhiệm vụ xây trạm vũ trụ trên Mặt Trăng.',
        quote: 'space robots can build space stations on the Moon and on planets.'
      },
      {
        id: 'u12-q3',
        type: 'True/False',
        question: 'Teacher robots can help children improve their English pronunciation.',
        options: ['True', 'False'],
        correct: 'True',
        explanation: 'Đúng! Robot giáo viên giúp các em học sinh cải thiện phát âm tiếng Anh.',
        quote: 'They can also help children to improve their English pronunciation.'
      },
      {
        id: 'u12-q4',
        type: 'ShortAnswer',
        question: 'Which type of robots can look after sick people in hospitals?',
        correct: 'doctor robots',
        acceptableAnswers: ['doctor robots', 'doctor robot'],
        explanation: 'Robot bác sĩ (doctor robots) có thể chăm sóc bệnh nhân.',
        quote: 'doctor robots can look after sick people...'
      }
    ]
  }
];

export const ReadingMasteryGame: React.FC<ReadingMasteryGameProps> = ({
  units,
  onSessionCompleted,
  onBackToPractice,
}) => {
  const [selectedUnitIdx, setSelectedUnitIdx] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'passage' | 'vocab' | 'quiz' | 'result'>('passage');
  const [speechRate, setSpeechRate] = useState<number>(0.8);
  const [currentPassageIdx, setCurrentPassageIdx] = useState<number>(-1);
  const [isPlayingPassage, setIsPlayingPassage] = useState<boolean>(false);

  // Quiz States
  const [vocabAnswers, setVocabAnswers] = useState<Record<string, string>>({});
  const [vocabScored, setVocabScored] = useState<Record<string, boolean>>({});

  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [readingScored, setReadingScored] = useState<Record<string, boolean>>({});
  const [shortInputs, setShortInputs] = useState<Record<string, string>>({});

  const [score, setScore] = useState<number>(0);

  const currentUnitData = UNIT_READINGS[selectedUnitIdx] || UNIT_READINGS[0];

  // SpeechSynthesis helpers
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = speechRate;
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };

  const handlePlayPassage = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingPassage(true);

    let idx = 0;
    const playNext = () => {
      if (idx >= currentUnitData.passages.length) {
        setIsPlayingPassage(false);
        setCurrentPassageIdx(-1);
        return;
      }
      setCurrentPassageIdx(idx);
      const u = new SpeechSynthesisUtterance(currentUnitData.passages[idx].text);
      u.rate = speechRate;
      u.lang = 'en-US';
      u.onend = () => {
        idx++;
        playNext();
      };
      window.speechSynthesis.speak(u);
    };

    playNext();
  };

  const handleStopPassage = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingPassage(false);
    setCurrentPassageIdx(-1);
  };

  const handleAnswerVocab = (vocabId: string, option: string, correct: string) => {
    if (vocabAnswers[vocabId]) return;

    setVocabAnswers((prev) => ({ ...prev, [vocabId]: option }));

    if (option === correct) {
      setScore((s) => s + 10);
      setVocabScored((prev) => ({ ...prev, [vocabId]: true }));
      speakText('Correct!');
    } else {
      setVocabScored((prev) => ({ ...prev, [vocabId]: false }));
      speakText('Not quite right.');
    }
  };

  const handleAnswerReading = (q: UnitReadingQuestion, option: string) => {
    if (readingAnswers[q.id]) return;

    setReadingAnswers((prev) => ({ ...prev, [q.id]: option }));

    if (option === q.correct) {
      setScore((s) => s + 10);
      setReadingScored((prev) => ({ ...prev, [q.id]: true }));
      speakText('Correct answer!');
    } else {
      setReadingScored((prev) => ({ ...prev, [q.id]: false }));
      speakText('Try again!');
    }
  };

  const handleSubmitShortAnswer = (q: UnitReadingQuestion) => {
    const userInput = (shortInputs[q.id] || '').trim();
    if (!userInput || readingAnswers[q.id]) return;

    setReadingAnswers((prev) => ({ ...prev, [q.id]: userInput }));

    const normUser = userInput.toLowerCase();
    const normCorrect = q.correct.toLowerCase();
    const acceptable = (q.acceptableAnswers || []).map((a) => a.toLowerCase());

    const isMatch =
      normUser === normCorrect ||
      acceptable.includes(normUser) ||
      normUser.includes(normCorrect) ||
      acceptable.some((acc) => normUser.includes(acc));

    if (isMatch) {
      setScore((s) => s + 10);
      setReadingScored((prev) => ({ ...prev, [q.id]: true }));
      speakText('Great answer!');
    } else {
      setReadingScored((prev) => ({ ...prev, [q.id]: false }));
      speakText('Keep learning!');
    }
  };

  const handleFinishGame = () => {
    setActiveSubTab('result');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    if (onSessionCompleted) {
      const correctCount =
        Object.values(vocabScored).filter(Boolean).length +
        Object.values(readingScored).filter(Boolean).length;
      const totalQ = currentUnitData.vocabList.length + currentUnitData.questions.length;
      const pct = Math.round((correctCount / totalQ) * 100);

      onSessionCompleted({
        id: `reading-game-${Date.now()}`,
        unitId: currentUnitData.unitId,
        unitTitle: `Reading: ${currentUnitData.title}`,
        skill: 'Reading',
        score: pct,
        totalQuestions: totalQ,
        correctAnswers: correctCount,
        timeSpentSeconds: 300,
        date: new Date().toISOString(),
        xpEarned: score,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner & Unit Selector */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
            <BookOpen className="w-4 h-4 text-[#38BDF8]" />
            Reading Mastery Game • 12 Bài Đọc SGK + Câu Hỏi True/False & Trả Lời Ngắn
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {currentUnitData.topicTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Đọc bài văn chuẩn SGK, luyện nghe AI, trắc nghiệm MCQs, True/False & tự điền câu trả lời ngắn.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {/* Select Unit 1 to 12 Dropdown */}
          <div className="flex items-center gap-2 bg-white/10 p-2 rounded-xl border border-white/15">
            <span className="text-xs font-bold text-slate-300">Chọn Bài:</span>
            <select
              value={selectedUnitIdx}
              onChange={(e) => {
                setSelectedUnitIdx(Number(e.target.value));
                setScore(0);
                setVocabAnswers({});
                setVocabScored({});
                setReadingAnswers({});
                setReadingScored({});
                setShortInputs({});
                setActiveSubTab('passage');
              }}
              className="bg-slate-900 text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none"
            >
              {UNIT_READINGS.map((u, idx) => (
                <option key={u.unitId} value={idx}>
                  Unit {u.unitNumber}: {u.title}
                </option>
              ))}
            </select>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Tổng Điểm</span>
            <span className="text-xl font-extrabold text-[#FF9500]">{score} XP</span>
          </div>

          {onBackToPractice && (
            <button
              onClick={onBackToPractice}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              Quay Lại Kho Bài Tập
            </button>
          )}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('passage')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'passage'
              ? 'bg-[#4A90E2] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📖 1. Bài Đọc & Audio AI
        </button>

        <button
          onClick={() => setActiveSubTab('vocab')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'vocab'
              ? 'bg-[#4A90E2] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🔤 2. Từ Vựng Trọng Tâm ({currentUnitData.vocabList.length} Từ)
        </button>

        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'quiz'
              ? 'bg-[#4A90E2] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ❓ 3. Đọc Hiểu & True/False ({currentUnitData.questions.length} Câu)
        </button>

        <button
          onClick={() => {
            setActiveSubTab('result');
            handleFinishGame();
          }}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'result'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🏆 4. Báo Cáo Kết Quả
        </button>
      </div>

      {/* SUB TAB 1: PASSAGE & AUDIO */}
      {activeSubTab === 'passage' && (
        <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 space-y-5">
          {/* Audio Toolbar */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {!isPlayingPassage ? (
                <button
                  onClick={handlePlayPassage}
                  className="px-4 py-2 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4" /> Nghe Đọc Toàn Bài AI
                </button>
              ) : (
                <button
                  onClick={handleStopPassage}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Square className="w-4 h-4" /> Dừng Đọc
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>Tốc độ đọc:</span>
              {[0.6, 0.8, 1.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    speechRate === rate
                      ? 'bg-blue-100 border-blue-400 text-blue-800'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Passage Text Blocks */}
          <div className="space-y-4">
            {currentUnitData.passages.map((p, pIdx) => (
              <div
                key={p.id}
                onClick={() => speakText(p.text)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  currentPassageIdx === pIdx
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-300/30'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-blue-50/50'
                }`}
              >
                {p.heading && (
                  <h4 className="font-extrabold text-sm text-[#4A90E2] mb-1.5 uppercase tracking-wider">
                    {p.heading}
                  </h4>
                )}
                <p className="text-sm leading-relaxed text-slate-800 whitespace-pre-line font-medium">
                  {p.text}
                </p>
                <span className="text-[10px] text-slate-400 font-semibold mt-2 inline-block">
                  🔊 Nhấp vào đoạn để nghe AI đọc đoạn này
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: VOCABULARY */}
      {activeSubTab === 'vocab' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUnitData.vocabList.map((v) => {
              const isAnswered = Boolean(vocabAnswers[v.id]);

              return (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="text-lg font-bold text-[#4A90E2]">{v.word}</span>
                      <span className="text-xs text-amber-600 italic block">{v.ipa}</span>
                    </div>
                    <button
                      onClick={() => speakText(v.word)}
                      className="p-2 rounded-xl bg-blue-50 text-[#4A90E2] hover:bg-blue-100 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-slate-700">Nghĩa: {v.meaning}</p>
                  <p className="text-[11px] text-slate-500 italic">"{v.example}"</p>

                  {/* Options */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      Chọn nghĩa đúng của từ:
                    </span>
                    {[v.meaning, ...v.dist].sort().map((opt, idx) => {
                      const isSelected = vocabAnswers[v.id] === opt;
                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleAnswerVocab(v.id, opt, v.meaning)}
                          className={`w-full text-left text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                            isAnswered
                              ? opt === v.meaning
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                                : isSelected
                                ? 'bg-rose-100 border-rose-400 text-rose-900'
                                : 'bg-slate-50 border-slate-200 text-slate-500'
                              : 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB TAB 3: READING QUIZ (MCQ, True/False, Short Answer) */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-4">
          {currentUnitData.questions.map((q, qIdx) => {
            const isAnswered = Boolean(readingAnswers[q.id]);
            const isCorrect = readingScored[q.id];

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-[#4A90E2] flex items-center gap-1.5">
                    {q.type === 'True/False' && <CheckSquare className="w-3.5 h-3.5 text-amber-500" />}
                    {q.type === 'ShortAnswer' && <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />}
                    {q.type === 'MCQ' && <HelpCircle className="w-3.5 h-3.5 text-blue-500" />}
                    Câu {qIdx + 1}/{currentUnitData.questions.length} • Dạng bài: {q.type === 'True/False' ? 'Đúng hay Sai (True/False)' : q.type === 'ShortAnswer' ? 'Trả Lời Câu Hỏi (Short Answer)' : 'Trắc Nghiệm (MCQ)'}
                  </span>
                  <button
                    onClick={() => speakText(q.question)}
                    className="text-xs text-slate-500 hover:text-[#4A90E2] flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe câu hỏi
                  </button>
                </div>

                <p className="text-sm font-bold text-slate-900">{q.question}</p>

                {/* DẠNG 1: MCQ (A, B, C, D) */}
                {q.type === 'MCQ' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(q.options || []).map((opt, optIdx) => {
                      const isSelected = readingAnswers[q.id] === opt;
                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleAnswerReading(q, opt)}
                          className={`text-left text-xs font-semibold p-3 rounded-xl border transition-all ${
                            isAnswered
                              ? opt === q.correct
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                                : isSelected
                                ? 'bg-rose-100 border-rose-400 text-rose-900'
                                : 'bg-slate-50 border-slate-200 text-slate-500'
                              : 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* DẠNG 2: TRUE / FALSE */}
                {q.type === 'True/False' && (
                  <div className="flex items-center gap-3 max-w-md">
                    {['True', 'False'].map((tfVal) => {
                      const isSelected = readingAnswers[q.id] === tfVal;
                      return (
                        <button
                          key={tfVal}
                          disabled={isAnswered}
                          onClick={() => handleAnswerReading(q, tfVal)}
                          className={`flex-1 py-3 px-4 rounded-xl border text-xs font-extrabold transition-all cursor-pointer text-center ${
                            isAnswered
                              ? tfVal === q.correct
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                                : isSelected
                                ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                                : 'bg-slate-100 border-slate-200 text-slate-400'
                              : tfVal === 'True'
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                              : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                          }`}
                        >
                          {tfVal === 'True' ? '✅ TRUE (Đúng)' : '❌ FALSE (Sai)'}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* DẠNG 3: SHORT ANSWER (Tự điền câu trả lời) */}
                {q.type === 'ShortAnswer' && (
                  <div className="space-y-2">
                    {!isAnswered ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={shortInputs[q.id] || ''}
                          onChange={(e) =>
                            setShortInputs((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSubmitShortAnswer(q);
                          }}
                          placeholder="Nhập câu trả lời bằng tiếng Anh..."
                          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#4A90E2]"
                        />
                        <button
                          onClick={() => handleSubmitShortAnswer(q)}
                          className="px-4 py-2.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Send className="w-3.5 h-3.5" /> Nộp Bài
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                        <span>Câu trả lời của bạn: </span>
                        <span className="font-bold text-slate-900">"{readingAnswers[q.id]}"</span>
                      </div>
                    )}
                  </div>
                )}

                {/* GIẢI THÍCH KHI ĐÃ TRẢ LỜI */}
                {isAnswered && (
                  <div
                    className={`p-3 rounded-xl text-xs space-y-1 ${
                      isCorrect
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border border-rose-200 text-rose-900'
                    }`}
                  >
                    <p className="font-bold">
                      {isCorrect ? '✅ Chính xác! +10 XP' : `❌ Chưa chính xác! Đáp án chuẩn là: "${q.correct}"`}
                    </p>
                    <p className="text-[11px] text-slate-600">💡 {q.explanation}</p>
                    <p className="text-[11px] italic text-slate-500">📌 Trích dẫn: "{q.quote}"</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SUB TAB 4: RESULT REPORT */}
      {activeSubTab === 'result' && (
        <div className="bg-white rounded-2xl p-6 shadow-2xs border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-[#FF9500] flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Kết Quả Bài Đọc: {currentUnitData.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Bạn đã tích lũy được <span className="font-extrabold text-[#FF9500]">{score} XP</span>!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Từ Vựng Đã Đúng</span>
              <span className="text-xl font-extrabold text-[#4A90E2]">
                {Object.values(vocabScored).filter(Boolean).length}/{currentUnitData.vocabList.length}
              </span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Đọc Hiểu Đã Đúng</span>
              <span className="text-xl font-extrabold text-emerald-600">
                {Object.values(readingScored).filter(Boolean).length}/{currentUnitData.questions.length}
              </span>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Tổng XP Đạt Được</span>
              <span className="text-xl font-extrabold text-[#FF9500]">{score} XP</span>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Xếp Loại</span>
              <span className="text-xl font-extrabold text-purple-700">
                {score >= 60 ? 'Xuất Sắc' : score >= 40 ? 'Giỏi' : 'Khá'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setScore(0);
                setVocabAnswers({});
                setVocabScored({});
                setReadingAnswers({});
                setReadingScored({});
                setShortInputs({});
                setActiveSubTab('passage');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#4A90E2] hover:bg-blue-600 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Luyện Lại Bài Này
            </button>

            {selectedUnitIdx < UNIT_READINGS.length - 1 && (
              <button
                onClick={() => {
                  setSelectedUnitIdx((idx) => idx + 1);
                  setScore(0);
                  setVocabAnswers({});
                  setVocabScored({});
                  setReadingAnswers({});
                  setReadingScored({});
                  setShortInputs({});
                  setActiveSubTab('passage');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Chuyển Bài Tiếp Theo (Unit {selectedUnitIdx + 2}) ➔
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
