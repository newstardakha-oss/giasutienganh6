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
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SgkUnit, StudySession } from '../types';

interface ReadingMasteryGameProps {
  units: SgkUnit[];
  onSessionCompleted?: (session: StudySession) => void;
  onBackToPractice?: () => void;
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
  questions: Array<{
    id: string;
    type: string;
    question: string;
    options: string[];
    correct: string;
    explanation: string;
    quote: string;
  }>;
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
        type: 'Chi tiết (Detail)',
        question: 'Where is Sunrise boarding school located?',
        options: ['In Sydney', 'In Bac Giang', 'In Ha Noi', 'In London'],
        correct: 'In Sydney',
        explanation: 'Sunrise là trường nội trú ở Sydney, Úc.',
        quote: 'Sunrise is a boarding school in Sydney.'
      },
      {
        id: 'u1-q2',
        type: 'Chi tiết (Detail)',
        question: 'How many classes are there at An Son school?',
        options: ['8 classes', '12 classes', '20 classes', '1,200 classes'],
        correct: '8 classes',
        explanation: 'Trường An Sơn ở Bắc Giang chỉ có 8 lớp học.',
        quote: 'It has only 8 classes.'
      },
      {
        id: 'u1-q3',
        type: 'Chi tiết (Detail)',
        question: 'What do students at Dream school do in the afternoon?',
        options: ['They join many interesting clubs', 'They sleep in dorms', 'They go home immediately', 'They do heavy homework'],
        correct: 'They join many interesting clubs',
        explanation: 'Vào buổi chiều, học sinh trường Dream tham gia các câu lạc bộ thú vị.',
        quote: 'In the afternoon, they join many interesting clubs.'
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
        type: 'Chi tiết (Detail)',
        question: 'How many rooms are there in the Crazy House Hotel?',
        options: ['Ten rooms', 'Eight rooms', 'Twelve rooms', 'Five rooms'],
        correct: 'Ten rooms',
        explanation: 'Khách sạn Crazy House có 10 phòng.',
        quote: 'There are ten rooms in the hotel.'
      },
      {
        id: 'u2-q2',
        type: 'Chi tiết (Detail)',
        question: 'Why is Nick’s room named "Tiger Room"?',
        options: [
          'Because there is a big tiger on the wall',
          'Because there is a live tiger inside',
          'Because Nick loves tigers',
          'Because it is painted orange'
        ],
        correct: 'Because there is a big tiger on the wall',
        explanation: 'Phòng được gọi là Tiger Room vì có hình con hổ lớn trên tường.',
        quote: 'It’s called the Tiger Room because there’s a big tiger on the wall.'
      },
      {
        id: 'u2-q3',
        type: 'Vị trí (Prepositions)',
        question: 'Where is the tiger located on the wall?',
        options: [
          'Between the bathroom door and the window',
          'Under the bed',
          'Next to the wardrobe',
          'Behind the desk'
        ],
        correct: 'Between the bathroom door and the window',
        explanation: 'Con hổ nằm giữa cửa phòng tắm và cửa sổ.',
        quote: 'The tiger is between the bathroom door and the window.'
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
        type: 'Chi tiết (Detail)',
        question: 'Who asked the students to write emails in English at the camp?',
        options: ['Mr Black', 'Nam’s father', 'Phong', 'Jimmy'],
        correct: 'Mr Black',
        explanation: 'Thầy Black yêu cầu học sinh viết email bằng tiếng Anh.',
        quote: 'Mr Black asked us to write emails in English!'
      },
      {
        id: 'u3-q2',
        type: 'Ngoại hình & Tính cách',
        question: 'What is Phong like according to Nam?',
        options: [
          'He is tall, sporty and plays basketball very well',
          'He has blonde hair and blue eyes',
          'He has curly black hair and plays violin',
          'He likes taking photos'
        ],
        correct: 'He is tall, sporty and plays basketball very well',
        explanation: 'Phong là cậu bạn cao ráo, yêu thể thao và chơi bóng rổ rất giỏi.',
        quote: 'Phong is the tall boy. He’s sporty and plays basketball very well.'
      },
      {
        id: 'u3-q3',
        type: 'Hành động hiện tại (Present Continuous)',
        question: 'What is Nhung doing right now at the camp?',
        options: [
          'She’s playing the violin',
          'She’s reading a comic book',
          'She’s taking photos of Nam',
          'She’s eating lunch'
        ],
        correct: 'She’s playing the violin',
        explanation: 'Nhung đang chơi đàn violin.',
        quote: '...and Nhung’s playing the violin.'
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
        type: 'Địa điểm (Location)',
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
        type: 'Chi tiết (Detail)',
        question: 'Why is Khang’s neighbourhood great for outdoor activities?',
        options: [
          'Because it has beautiful parks, sandy beaches and fine weather',
          'Because there are many modern buildings',
          'Because the streets are crowded',
          'Because it has a computer room'
        ],
        correct: 'Because it has beautiful parks, sandy beaches and fine weather',
        explanation: 'Khu phố tuyệt vời cho hoạt động ngoài trời vì có công viên đẹp, bãi biển cát mịn và thời tiết tốt.',
        quote: 'It’s great for outdoor activities because it has beautiful parks, sandy beaches and fine weather.'
      },
      {
        id: 'u4-q3',
        type: 'Ý kiến trái chiều (Dislikes)',
        question: 'What are the two things Khang dislikes about his neighbourhood?',
        options: [
          'Modern buildings/offices and busy/crowded streets',
          'Friendly people and good food',
          'Shops, restaurants, and markets',
          'Sandy beaches and parks'
        ],
        correct: 'Modern buildings/offices and busy/crowded streets',
        explanation: 'Khang không thích 2 điều: nhiều tòa nhà hiện đại và đường phố quá đông đúc.',
        quote: '...there are two things I dislike about it: there are many modern buildings and offices; and the streets are busy and crowded.'
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
        type: 'Địa danh (Location)',
        question: 'Where is Ha Long Bay located?',
        options: ['In Quang Ninh', 'In Da Nang', 'In Phan Thiet', 'In Bac Giang'],
        correct: 'In Quang Ninh',
        explanation: 'Vịnh Hạ Long nằm ở tỉnh Quảng Ninh.',
        quote: 'Ha Long Bay is in Quang Ninh.'
      },
      {
        id: 'u5-q2',
        type: 'Chi tiết Mũi Né',
        question: 'What colours does the sand in Mui Ne have?',
        options: [
          'White, yellow, red ...',
          'Blue, green, black',
          'Pink and purple',
          'Only white'
        ],
        correct: 'White, yellow, red ...',
        explanation: 'Cát ở Mũi Né có nhiều màu sắc: trắng, vàng, đỏ...',
        quote: 'The sand has different colours: white, yellow, red ...'
      },
      {
        id: 'u5-q3',
        type: 'Lời khuyên (Advice)',
        question: 'What should you remember to bring when visiting Mui Ne Sand Dunes?',
        options: [
          'Wear suncream and bring water',
          'Bring a heavy coat and umbrella',
          'Bring a comic book and violin',
          'Wear warm gloves'
        ],
        correct: 'Wear suncream and bring water',
        explanation: 'Bài đọc nhắc nhở nhớ bôi kem chống nắng và mang theo nước uống.',
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
        type: 'Địa danh & Lễ hội',
        question: 'Where does Russ go with his parents to welcome the New Year?',
        options: ['Times Square', 'Ha Noi', 'Da Lat', 'Stockholm'],
        correct: 'Times Square',
        explanation: 'Russ cùng bố mẹ đến Quảng trường Thời Đại (Times Square) ở Mỹ đón năm mới.',
        quote: 'I often go to Times Square with my parents to welcome the New Year.'
      },
      {
        id: 'u6-q2',
        type: 'Phong tục Việt Nam',
        question: 'Why do Vietnamese people buy salt at Tet according to Mai?',
        options: [
          'To wish for good luck',
          'To wish for enough food',
          'Because cats cry like poor',
          'To give to grandparents'
        ],
        correct: 'To wish for good luck',
        explanation: 'Người Việt mua muối đầu năm để cầu may mắn.',
        quote: '...and buy salt to wish for good luck.'
      },
      {
        id: 'u6-q3',
        type: 'Quan niệm may mắn',
        question: 'Why are cats NOT considered lucky animals during Tet in Viet Nam?',
        options: [
          'Because a cat’s cry sounds like "poor" in Vietnamese',
          'Because cats eat too much rice',
          'Because cats bring salt',
          'Because cats do not like fireworks'
        ],
        correct: 'Because a cat’s cry sounds like "poor" in Vietnamese',
        explanation: 'Mèo không được coi là may mắn vì tiếng kêu "meo meo" nghe giống từ "nghèo" trong tiếng Việt.',
        quote: 'Dogs are lucky animals but cats are not. A cat\'s cry sounds like "poor" in Vietnamese.'
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
        type: 'Lịch trình (Schedule)',
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
        type: 'Chi tiết chương trình',
        question: 'Which game show can you join to answer questions about pets at 11.00?',
        options: [
          'Children are Always Right',
          'The Pig Race',
          'The Fox Teacher',
          'Cuc Phuong Forest'
        ],
        correct: 'Children are Always Right',
        explanation: 'Chương trình Game show lúc 11h00 tên là "Children are Always Right".',
        quote: '11.00 | Game show: Children are Always Right'
      },
      {
        id: 'u7-q3',
        type: 'Thời gian phát sóng',
        question: 'What time does the Science programme about intelligent dolphins start?',
        options: ['12.15', '8.00', '10.30', '9.00'],
        correct: '12.15',
        explanation: 'Chương trình khoa học về cá heo thông minh phát sóng lúc 12h15.',
        quote: '12.15 | Science: The Dolphins'
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
        type: 'Năm sinh & Quốc gia',
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
        type: 'Thành tích (World Cup)',
        question: 'When did Pelé win his first World Cup?',
        options: ['In 1958', 'In 1940', 'In 1999', 'At age 15'],
        correct: 'In 1958',
        explanation: 'Pelé vô địch World Cup đầu tiên vào năm 1958.',
        quote: 'In 1958, he won his first World Cup.'
      },
      {
        id: 'u8-q3',
        type: 'Danh hiệu (Titles)',
        question: 'What title did Pelé become in 1999?',
        options: [
          'Football Player of the Century',
          'PE Teacher of the Year',
          'Santos Football Club Owner',
          'World Cup Referee'
        ],
        correct: 'Football Player of the Century',
        explanation: 'Năm 1999, Pelé trở thành "Cầu thủ bóng đá của thế kỷ".',
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
        type: 'Địa danh (City)',
        question: 'Which city is Mai writing her letter from?',
        options: ['Stockholm', 'Sydney', 'Da Lat', 'Da Nang'],
        correct: 'Stockholm',
        explanation: 'Mai đang ở thành phố Stockholm (Thụy Điển) viết thư cho ông bà.',
        quote: 'Stockholm is fantastic!'
      },
      {
        id: 'u9-q2',
        type: 'Hoạt động (Activities)',
        question: 'How did Mai’s family go to the Old Town?',
        options: [
          'They rented three bikes and cycled',
          'They took a red bus',
          'They walked on foot',
          'They drove a car'
        ],
        correct: 'They rented three bikes and cycled',
        explanation: 'Gia đình Mai thuê 3 chiếc xe đạp và đạp xe đến Phố Cổ.',
        quote: 'Yesterday Mum, Dad and I rented three bikes and cycled to the Old Town.'
      },
      {
        id: 'u9-q3',
        type: 'Văn hóa Thụy Điển',
        question: 'What is "fika" in Swedish culture according to the text?',
        options: [
          'A coffee break in a traditional café',
          'A kind of bicycle helmet',
          'A famous painting in Royal Palace',
          'A swimming pool game'
        ],
        correct: 'A coffee break in a traditional café',
        explanation: '"Fika" trong văn hóa Thụy Điển là giờ nghỉ uống cà phê thư giãn.',
        quote: 'After that, we had "fika", a coffee break, in a traditional café.'
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
        type: 'Vị trí nhà (Location)',
        question: 'Where will the author’s future house be built?',
        options: ['On an island', 'In the city center', 'Under the sea', 'In a forest'],
        correct: 'On an island',
        explanation: 'Ngôi nhà tương lai sẽ được xây trên một hòn đảo.',
        quote: 'My future house will be on an island.'
      },
      {
        id: 'u10-q2',
        type: 'Phương tiện di chuyển',
        question: 'How will the author fly to school in the future?',
        options: [
          'By a helicopter on the roof',
          'By a flying car',
          'By riding a bike',
          'By a smart TV'
        ],
        correct: 'By a helicopter on the roof',
        explanation: 'Tác giả đi học bằng máy bay trực thăng đỗ trên mái nhà.',
        quote: 'There will be a helicopter on the roof. I can fly to school in it.'
      },
      {
        id: 'u10-q3',
        type: 'Chức năng thiết bị',
        question: 'What can the super smart TV help the author do?',
        options: [
          'Send/receive emails, contact friends on other planets, and buy food',
          'Clean the floors and wash clothes',
          'Cook meals and water flowers',
          'Feed dogs and cats'
        ],
        correct: 'Send/receive emails, contact friends on other planets, and buy food',
        explanation: 'Tivi siêu thông minh giúp gửi/nhận email, liên lạc bạn bè ở hành tinh khác và mua thức ăn.',
        quote: 'It will help me to send and receive emails, and contact my friends on other planets. It will also help me to buy food...'
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
        type: 'Chi tiết (Tips)',
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
        type: 'Tiết kiệm tài nguyên',
        question: 'Why is borrowing books from the library a good tip?',
        options: [
          'Because it saves much paper',
          'Because books are free to keep forever',
          'Because students don’t need to read',
          'Because it makes noise'
        ],
        correct: 'Because it saves much paper',
        explanation: 'Mượn sách ở thư viện giúp tiết kiệm được rất nhiều giấy.',
        quote: 'Reporter: Great! You can save much paper.'
      },
      {
        id: 'u11-q3',
        type: 'Mẹo cuối cùng (Final tip)',
        question: 'What is Nam’s final tip for a greener school?',
        options: [
          'Find creative ways to reuse old items before throwing them away',
          'Buy new uniforms every month',
          'Drink sugary drinks in plastic cups',
          'Cut down old trees'
        ],
        correct: 'Find creative ways to reuse old items before throwing them away',
        explanation: 'Mẹo cuối cùng là tìm cách sáng tạo tái sử dụng đồ cũ trước khi bỏ đi.',
        quote: 'Finally, we usually find creative ways to reuse old items before throwing them away.'
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
        type: 'Địa điểm (Event Location)',
        question: 'Where is the international robot show taking place?',
        options: ['In Ha Noi', 'In Sydney', 'In Da Nang', 'In Stockholm'],
        correct: 'In Ha Noi',
        explanation: 'Triển lãm robot quốc tế đang diễn ra tại Hà Nội.',
        quote: 'Today there is an international robot show in Ha Noi.'
      },
      {
        id: 'u12-q2',
        type: 'Chức năng Teacher Robots',
        question: 'What can teacher robots do to help children?',
        options: [
          'Teach English, maths, literature & improve pronunciation',
          'Build houses and move heavy things',
          'Look after sick people in hospitals',
          'Build space stations on the Moon'
        ],
        correct: 'Teach English, maths, literature & improve pronunciation',
        explanation: 'Robot giáo viên dạy tiếng Anh, Toán, Ngữ văn và cải thiện phát âm.',
        quote: 'They can teach them English, literature, maths... improve their English pronunciation.'
      },
      {
        id: 'u12-q3',
        type: 'Phân loại robot chuyên dụng',
        question: 'Which type of robot can look after sick people?',
        options: ['Doctor robots', 'Worker robots', 'Space robots', 'Home robots'],
        correct: 'Doctor robots',
        explanation: 'Robot bác sĩ (doctor robots) có nhiệm vụ chăm sóc người bệnh.',
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

  const handleAnswerReading = (qId: string, option: string, correct: string) => {
    if (readingAnswers[qId]) return;

    setReadingAnswers((prev) => ({ ...prev, [qId]: option }));

    if (option === correct) {
      setScore((s) => s + 10);
      setReadingScored((prev) => ({ ...prev, [qId]: true }));
      speakText('Correct answer!');
    } else {
      setReadingScored((prev) => ({ ...prev, [qId]: false }));
      speakText('Try again!');
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
            Reading Mastery Game • Đủ 12 Bài Đọc SGK Tiếng Anh 6
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {currentUnitData.topicTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Đọc bài văn chuẩn SGK, luyện phát âm AI, từ vựng IPA & câu hỏi đọc hiểu kèm trích dẫn chi tiết.
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
          ❓ 3. Đọc Hiểu ({currentUnitData.questions.length} Câu)
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

      {/* SUB TAB 3: READING QUIZ */}
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
                  <span className="text-xs font-bold text-[#4A90E2]">
                    Câu {qIdx + 1}/{currentUnitData.questions.length} • Dạng bài: {q.type}
                  </span>
                  <button
                    onClick={() => speakText(q.question)}
                    className="text-xs text-slate-500 hover:text-[#4A90E2] flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe câu hỏi
                  </button>
                </div>

                <p className="text-sm font-bold text-slate-900">{q.question}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = readingAnswers[q.id] === opt;
                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerReading(q.id, opt, q.correct)}
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

                {isAnswered && (
                  <div
                    className={`p-3 rounded-xl text-xs space-y-1 ${
                      isCorrect
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border border-rose-200 text-rose-900'
                    }`}
                  >
                    <p className="font-bold">
                      {isCorrect ? '✅ Đúng rồi! +10 XP' : `❌ Chưa đúng! Đáp án đúng là: ${q.correct}`}
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
                {score >= 50 ? 'Xuất Sắc' : score >= 30 ? 'Giỏi' : 'Khá'}
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
