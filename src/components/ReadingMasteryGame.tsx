import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Volume2,
  Play,
  Pause,
  Square,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Zap,
  Download,
  HelpCircle,
  Flame,
  ArrowRight,
  ChevronDown
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
    passages: [
      {
        id: 'u1-p1',
        heading: 'Sunrise Boarding School',
        text: 'Sunrise is a boarding school in Sydney. Students study and live there. About 1,200 boys and girls go to Sunrise. It has students from all over Australia. They study subjects like maths, science and English.'
      },
      {
        id: 'u1-p2',
        heading: 'An Son Lower Secondary School',
        text: 'An Son is a lower secondary school in Bac Giang. It has only 8 classes. There are mountains and green fields around the school. There is a computer room and a library. There is also a school garden and a playground.'
      },
      {
        id: 'u1-p3',
        heading: 'Dream International School',
        text: 'Dream is an international school. Here students learn English with English-speaking teachers. In the afternoon, they join many interesting clubs. They play sports and games. Some students do paintings in the art club.'
      }
    ],
    vocabList: [
      { id: 'u1-v1', word: 'boarding school', ipa: '/ˈbɔː.dɪŋ ˌskuːl/', meaning: 'trường nội trú', example: 'Sunrise is a boarding school in Sydney.', dist: ['trường bán trú', 'trường quốc tế', 'trường tiểu học'] },
      { id: 'u1-v2', word: 'secondary school', ipa: '/ˈsek.ən.dri ˌskuːl/', meaning: 'trường trung học cơ sở', example: 'An Son is a lower secondary school in Bac Giang.', dist: ['trường đại học', 'mầm non', 'trường nghề'] },
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
        explanation: 'Bài đọc viết rõ Sunrise là trường nội trú ở Sydney.',
        quote: 'Sunrise is a boarding school in Sydney.'
      },
      {
        id: 'u1-q2',
        type: 'Chi tiết (Detail)',
        question: 'How many classes does An Son school have?',
        options: ['8 classes', '12 classes', '20 classes', '1,200 classes'],
        correct: '8 classes',
        explanation: 'Trường An Sơn ở Bắc Giang chỉ có 8 lớp học.',
        quote: 'It has only 8 classes.'
      },
      {
        id: 'u1-q3',
        type: 'Chi tiết (Detail)',
        question: 'What do students at Dream school do in the afternoon?',
        options: ['They join many interesting clubs', 'They sleep in the dorm', 'They go home immediately', 'They do heavy homework'],
        correct: 'They join many interesting clubs',
        explanation: 'Buổi chiều học sinh trường Dream tham gia nhiều câu lạc bộ thú vị.',
        quote: 'In the afternoon, they join many interesting clubs.'
      }
    ]
  },
  {
    unitId: 'unit-2',
    unitNumber: 2,
    title: 'MY HOUSE',
    topicTitle: 'Unit 2: My House (Crazy House Hotel in Da Lat)',
    passages: [
      {
        id: 'u2-p1',
        text: 'Hi Phong and Mi,\nHow are you? I’m in Da Lat with my parents. We’re staying at the Crazy House Hotel. Wow! It really is crazy.'
      },
      {
        id: 'u2-p2',
        text: 'There are ten rooms in the hotel. There’s a Kangaroo Room, an Eagle Room, and even an Ant Room. I’m staying in the Tiger Room. It’s called the Tiger Room because there’s a big tiger on the wall.'
      },
      {
        id: 'u2-p3',
        text: 'The tiger is between the bathroom door and the window. The bed is next to the window, but the window is a strange shape. I put my bag under the bed. There’s a lamp, a wardrobe and a desk.\nYou should stay here when you visit Da Lat. It’s great.\nSee you soon!\nNick'
      }
    ],
    vocabList: [
      { id: 'u2-v1', word: 'hotel', ipa: '/həʊˈtel/', meaning: 'khách sạn', example: 'We are staying at the Crazy House Hotel.', dist: ['nhà riêng', 'trường học', 'bệnh viện'] },
      { id: 'u2-v2', word: 'strange', ipa: '/streɪndʒ/', meaning: 'kỳ lạ / lạ mắt', example: 'The window is a strange shape.', dist: ['bình thường', 'to lớn', 'đẹp đẽ'] },
      { id: 'u2-v3', word: 'wardrobe', ipa: '/ˈwɔː.drəʊb/', meaning: 'tủ quần áo', example: 'There is a lamp, a wardrobe and a desk.', dist: ['tủ lạnh', 'bàn học', 'giường ngủ'] },
      { id: 'u2-v4', word: 'bathroom', ipa: '/ˈbɑːθ.ruːm/', meaning: 'phòng tắm', example: 'The tiger is between the bathroom door and the window.', dist: ['phòng khách', 'phòng bếp', 'ban công'] }
    ],
    questions: [
      {
        id: 'u2-q1',
        type: 'Chi tiết (Detail)',
        question: 'Who is Nick staying with in Da Lat?',
        options: ['With his parents', 'With Phong and Mi', 'With his teacher', 'Alone'],
        correct: 'With his parents',
        explanation: 'Nick đi Đà Lạt cùng với bố mẹ.',
        quote: 'I’m in Da Lat with my parents.'
      },
      {
        id: 'u2-q2',
        type: 'Chi tiết (Detail)',
        question: 'Why is Nick’s room called the Tiger Room?',
        options: [
          'Because there’s a big tiger on the wall',
          'Because there is a live tiger inside',
          'Because Nick likes tigers',
          'Because it is yellow'
        ],
        correct: 'Because there’s a big tiger on the wall',
        explanation: 'Phòng được gọi là Tiger Room vì có con hổ lớn vẽ trên tường.',
        quote: 'It’s called the Tiger Room because there’s a big tiger on the wall.'
      },
      {
        id: 'u2-q3',
        type: 'Vị trí (Prepositions)',
        question: 'Where did Nick put his bag?',
        options: ['Under the bed', 'On the desk', 'Inside the wardrobe', 'Near the window'],
        correct: 'Under the bed',
        explanation: 'Nick để cặp sách của mình ở dưới gầm giường.',
        quote: 'I put my bag under the bed.'
      }
    ]
  },
  {
    unitId: 'unit-3',
    unitNumber: 3,
    title: 'MY FRIENDS',
    topicTitle: 'Unit 3: My Friends (Superb Summer Camp)',
    passages: [
      {
        id: 'u3-p1',
        text: 'Hi Mum and Dad,\nHere I am at the Superb Summer Camp. Mr Black asked us to write emails in English! Wow, everything here is in English!'
      },
      {
        id: 'u3-p2',
        text: 'I have some new friends: Jimmy, Phong, and Nhung. They’re in the photo. Jimmy has blonde hair and blue eyes. He’s clever and creative. He likes taking photos. Phong is the tall boy. He’s sporty and plays basketball very well. Nhung has curly black hair. She’s kind. She shared her lunch with me today.'
      },
      {
        id: 'u3-p3',
        text: 'We’re having fun. Jimmy’s taking photos of me. Phong’s reading a comic book, and Nhung’s playing the violin. I must go now.\nPlease write soon.\nLove,\nNam'
      }
    ],
    vocabList: [
      { id: 'u3-v1', word: 'summer camp', ipa: '/ˈsʌm.ə ˌkæmp/', meaning: 'trại hè', example: 'Here I am at the Superb Summer Camp.', dist: ['lớp học thêm', 'công viên', 'trường học'] },
      { id: 'u3-v2', word: 'clever', ipa: '/ˈklev.ər/', meaning: 'thông minh / khéo léo', example: 'Jimmy is clever and creative.', dist: ['nhút nhát', 'lười biếng', 'thể thao'] },
      { id: 'u3-v3', word: 'creative', ipa: '/kriˈeɪ.tɪv/', meaning: 'sáng tạo', example: 'He is clever and creative.', dist: ['tốt bụng', 'cao ráo', 'nghiêm túc'] },
      { id: 'u3-v4', word: 'sporty', ipa: '/ˈspɔː.ti/', meaning: 'yêu thể thao / năng động', example: 'Phong is sporty and plays basketball very well.', dist: ['sáng tạo', 'tốt bụng', 'tóc xoăn'] }
    ],
    questions: [
      {
        id: 'u3-q1',
        type: 'Chi tiết ngoại hình (Appearance)',
        question: 'What does Jimmy look like?',
        options: [
          'He has blonde hair and blue eyes',
          'He has curly black hair',
          'He is tall and has brown eyes',
          'He has dark hair'
        ],
        correct: 'He has blonde hair and blue eyes',
        explanation: 'Jimmy có mái tóc vàng và đôi mắt màu xanh biển.',
        quote: 'Jimmy has blonde hair and blue eyes.'
      },
      {
        id: 'u3-q2',
        type: 'Tính cách (Personality)',
        question: 'Why is Nhung considered kind?',
        options: [
          'She shared her lunch with Nam today',
          'She plays basketball very well',
          'She takes photos of everyone',
          'She has blonde hair'
        ],
        correct: 'She shared her lunch with Nam today',
        explanation: 'Nhung tốt bụng vì cô ấy đã chia sẻ phần ăn trưa với Nam.',
        quote: 'She’s kind. She shared her lunch with me today.'
      }
    ]
  },
  {
    unitId: 'unit-4',
    unitNumber: 4,
    title: 'MY NEIGHBOURHOOD',
    topicTitle: 'Unit 4: My Neighbourhood (Suburbs of Da Nang)',
    passages: [
      {
        id: 'u4-p1',
        text: 'I live in the suburbs of Da Nang City. There are many things I like about my neighbourhood.\nIt’s great for outdoor activities because it has beautiful parks, sandy beaches and fine weather. There’s almost everything I need here: shops, restaurants, and markets. The people here are friendlier, and the food is better than in other places.'
      },
      {
        id: 'u4-p2',
        text: 'However, there are two things I dislike about it: there are many modern buildings and offices; and the streets are busy and crowded.\nPosted by Khang at 4:55 PM'
      }
    ],
    vocabList: [
      { id: 'u4-v1', word: 'suburbs', ipa: '/ˈsʌb.ɜːbz/', meaning: 'vùng ngoại ô', example: 'I live in the suburbs of Da Nang City.', dist: ['trung tâm thành phố', 'bãi biển', 'công viên'] },
      { id: 'u4-v2', word: 'outdoor activities', ipa: '/ˈaʊt.dɔː ækˈtɪv.ə.ti/', meaning: 'hoạt động ngoài trời', example: 'It is great for outdoor activities.', dist: ['trò chơi trong nhà', 'mua sắm', 'nấu ăn'] },
      { id: 'u4-v3', word: 'crowded', ipa: '/ˈkraʊ.dɪd/', meaning: 'đông đúc / chật chội', example: 'The streets are busy and crowded.', dist: ['yên tĩnh', 'vắng vẻ', 'sạch sẽ'] }
    ],
    questions: [
      {
        id: 'u4-q1',
        type: 'Chi tiết (Detail)',
        question: 'Where does Khang live?',
        options: ['In the suburbs of Da Nang City', 'In Ha Noi center', 'In Sydney', 'In Da Lat'],
        correct: 'In the suburbs of Da Nang City',
        explanation: 'Khang sống ở vùng ngoại ô thành phố Đà Nẵng.',
        quote: 'I live in the suburbs of Da Nang City.'
      },
      {
        id: 'u4-q2',
        type: 'So sánh & Ý kiến',
        question: 'What are the two things Khang dislikes about his neighbourhood?',
        options: [
          'Modern buildings/offices and busy/crowded streets',
          'Sandy beaches and fine weather',
          'Shops, restaurants, and markets',
          'Friendly people and good food'
        ],
        correct: 'Modern buildings/offices and busy/crowded streets',
        explanation: 'Hai điều Khang không thích là có quá nhiều tòa nhà hiện đại và đường phố đông đúc.',
        quote: 'However, there are two things I dislike about it: there are many modern buildings and offices; and the streets are busy and crowded.'
      }
    ]
  },
  {
    unitId: 'unit-5',
    unitNumber: 5,
    title: 'NATURAL WONDERS OF VIET NAM',
    topicTitle: 'Unit 5: Natural Wonders of Viet Nam (Ha Long Bay & Mui Ne)',
    passages: [
      {
        id: 'u5-p1',
        heading: 'Ha Long Bay',
        text: 'Ha Long Bay is in Quang Ninh. It has many islands and caves. Tuan Chau, with its beautiful beaches, is a popular tourist attraction in Ha Long Bay. There you can enjoy great seafood. And you can join in exciting activities. Ha Long Bay is Viet Nam’s best natural wonder.'
      },
      {
        id: 'u5-p2',
        heading: 'Mui Ne Sand Dunes',
        text: 'Mui Ne is popular for its amazing landscapes. The sand has different colours: white, yellow, red ... It’s like a desert here. You can ride a bike down the slopes. You can also fly kites, or have a picnic by the beach. The best time to visit the Mui Ne Sand Dunes is early morning or late afternoon. Remember to wear suncream and bring water.'
      }
    ],
    vocabList: [
      { id: 'u5-v1', word: 'island', ipa: '/ˈaɪ.lənd/', meaning: 'hòn đảo', example: 'Ha Long Bay has many islands and caves.', dist: ['ngọn núi', 'dòng sông', 'bãi cát'] },
      { id: 'u5-v2', word: 'landscape', ipa: '/ˈlænd.skeɪp/', meaning: 'phong cảnh / danh thắng', example: 'Mui Ne is popular for its amazing landscapes.', dist: ['khí hậu', 'ẩm thực', 'động vật'] },
      { id: 'u5-v3', word: 'suncream', ipa: '/ˈsʌn.kriːm/', meaning: 'kem chống nắng', example: 'Remember to wear suncream and bring water.', dist: ['áo mưa', 'nước uống', 'kính râm'] }
    ],
    questions: [
      {
        id: 'u5-q1',
        type: 'Địa danh (Location)',
        question: 'Where is Ha Long Bay located?',
        options: ['In Quang Ninh', 'In Da Nang', 'In Phan Thiet', 'In Bac Giang'],
        correct: 'In Quang Ninh',
        explanation: 'Vịnh Hạ Long thuộc tỉnh Quảng Ninh.',
        quote: 'Ha Long Bay is in Quang Ninh.'
      },
      {
        id: 'u5-q2',
        type: 'Thời điểm (Best Time)',
        question: 'When is the best time to visit Mui Ne Sand Dunes?',
        options: [
          'Early morning or late afternoon',
          'At midday when it is hot',
          'Late at night',
          'During rainy midnight'
        ],
        correct: 'Early morning or late afternoon',
        explanation: 'Thời điểm tốt nhất ghé thăm đồi cát Mũi Né là sáng sớm hoặc chiều muộn.',
        quote: 'The best time to visit the Mui Ne Sand Dunes is early morning or late afternoon.'
      }
    ]
  },
  {
    unitId: 'unit-6',
    unitNumber: 6,
    title: 'OUR TET HOLIDAY',
    topicTitle: 'Unit 6: Our Tet Holiday (New Year Customs)',
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
      { id: 'u6-v2', word: 'lucky money', ipa: '/ˈlʌk.i ˌmʌn.i/', meaning: 'tiền lì xì', example: 'Grandparents give us lucky money.', dist: ['quà tặng', 'bánh kẹo', 'quần áo'] },
      { id: 'u6-v3', word: 'custom', ipa: '/ˈkʌs.təm/', meaning: 'tục lệ / phong tục', example: 'I learn some customs about Tet from my parents.', dist: ['luật pháp', 'môn học', 'lễ hội'] }
    ],
    questions: [
      {
        id: 'u6-q1',
        type: 'Phong tục (Customs)',
        question: 'Why do Vietnamese people buy salt at Tet according to Mai?',
        options: [
          'To wish for good luck',
          'To wish for enough food',
          'To feed lucky dogs',
          'To make fireworks'
        ],
        correct: 'To wish for good luck',
        explanation: 'Người Việt mua muối đầu năm với mong muốn cầu may mắn.',
        quote: '...and buy salt to wish for good luck.'
      }
    ]
  },
  {
    unitId: 'unit-7',
    unitNumber: 7,
    title: 'TELEVISION',
    topicTitle: 'Unit 7: Television (TV Programme Schedule)',
    passages: [
      {
        id: 'u7-p1',
        text: '8.00 | Wildlife: Cuc Phuong Forest - Watch the colourful world of plants, flowers, and animals in their real life.\n9.00 | Comedy: The Fox Teacher - Have a lot of fun with a fox teacher and his students on their first day at school.'
      },
      {
        id: 'u7-p2',
        text: '10.30 | Sports: The Pig Race - Watch the cute pigs compete in the most exciting races. Who wins?\n11.00 | Game show: Children are Always Right - Join this game show today and try to answer interesting questions about pets.\n12.15 | Science: The Dolphins - Watch funny and interesting clips of intelligent dolphins in their natural life - the sea.'
      }
    ],
    vocabList: [
      { id: 'u7-v1', word: 'wildlife', ipa: '/ˈwaɪld.laɪf/', meaning: 'cuộc sống hoang dã', example: 'Watch the colourful world of plants and animals.', dist: ['thể thao', 'hài hước', 'khoa học'] },
      { id: 'u7-v2', word: 'intelligent', ipa: '/ɪnˈtel.ɪ.dʒənt/', meaning: 'thông minh', example: 'Clips of intelligent dolphins in the sea.', dist: ['dễ thương', 'hài hước', 'nguy hiểm'] }
    ],
    questions: [
      {
        id: 'u7-q1',
        type: 'Thời gian phát sóng (Schedule)',
        question: 'What time is the Science programme "The Dolphins" broadcasted?',
        options: ['12.15', '8.00', '10.30', '9.00'],
        correct: '12.15',
        explanation: 'Chương trình khoa học về cá heo phát sóng lúc 12h15.',
        quote: '12.15 | Science: The Dolphins'
      }
    ]
  },
  {
    unitId: 'unit-8',
    unitNumber: 8,
    title: 'SPORTS AND GAMES',
    topicTitle: 'Unit 8: Sports and Games (Pelé - Football Legend)',
    passages: [
      {
        id: 'u8-p1',
        text: 'Teacher: Today we’re going to talk about Pelé. Do you know him?\nNick: Yes, I think he’s the best footballer of all time.\nTeacher: Right. He was born in 1940 in Brazil. His father taught him to play football at a very young age.'
      },
      {
        id: 'u8-p2',
        text: 'Susan: Oh. When did he begin his career in football?\nTeacher: At 15, when he started playing for Santos Football Club. In 1958, he won his first World Cup.\nNick: How many goals did he score in his career?\nTeacher: 1,281 goals in total, I think.\nNick and Susan: Wow! Amazing!\nTeacher: And he became "Football Player of the Century" in 1999.'
      }
    ],
    vocabList: [
      { id: 'u8-v1', word: 'career', ipa: '/kəˈrɪər/', meaning: 'sự nghiệp', example: 'When did he begin his career in football?', dist: ['tuổi thơ', 'trận đấu', 'câu lạc bộ'] },
      { id: 'u8-v2', word: 'score', ipa: '/skɔːr/', meaning: 'ghi bàn / ghi điểm', example: 'How many goals did he score in total?', dist: ['thua trận', 'tập luyện', 'giảng dạy'] }
    ],
    questions: [
      {
        id: 'u8-q1',
        type: 'Con số / Sự kiện',
        question: 'How many goals did Pelé score in total during his career?',
        options: ['1,281 goals', '1958 goals', '1940 goals', '15 goals'],
        correct: '1,281 goals',
        explanation: 'Huyền thoại Pelé đã ghi tổng cộng 1.281 bàn thắng trong sự nghiệp.',
        quote: 'Teacher: 1,281 goals in total, I think.'
      }
    ]
  },
  {
    unitId: 'unit-9',
    unitNumber: 9,
    title: 'CITIES OF THE WORLD',
    topicTitle: 'Unit 9: Cities of the World (Mai in Stockholm)',
    passages: [
      {
        id: 'u9-p1',
        text: 'Dear Grandpa and Grandma,\nStockholm is fantastic! Its weather is perfect, sunny all the time! Our hotel is good. It has a swimming pool and a gym. It offers delicious breakfast. Yesterday Mum, Dad and I rented three bikes and cycled to the Old Town. My parents wore their helmets and I wore mine. We visited the Royal Palace first. What a beautiful place! Mum loved it. She said, "Swedish art is amazing." After that, we had "fika", a coffee break, in a traditional café. Everything is so wonderful!\nWish you were here!\nLove,\nMai'
      }
    ],
    vocabList: [
      { id: 'u9-v1', word: 'fantastic', ipa: '/fænˈtæs.tɪk/', meaning: 'tuyệt vời', example: 'Stockholm is fantastic!', dist: ['chán ngắt', 'đông đúc', 'ầm ĩ'] },
      { id: 'u9-v2', word: 'traditional', ipa: '/trəˈdɪʃ.ən.əl/', meaning: 'truyền thống', example: 'We had fika in a traditional café.', dist: ['hiện đại', 'xa xỉ', 'lạ mắt'] }
    ],
    questions: [
      {
        id: 'u9-q1',
        type: 'Phương tiện / Chi tiết',
        question: 'How did Mai and her parents travel to the Old Town in Stockholm?',
        options: [
          'They rented three bikes and cycled',
          'They took a taxi',
          'They swam across the lake',
          'They walked on foot'
        ],
        correct: 'They rented three bikes and cycled',
        explanation: 'Gia đình Mai đã thuê 3 chiếc xe đạp và đạp xe đến khu Phố Cổ.',
        quote: 'Yesterday Mum, Dad and I rented three bikes and cycled to the Old Town.'
      }
    ]
  },
  {
    unitId: 'unit-10',
    unitNumber: 10,
    title: 'OUR HOUSES IN THE FUTURE',
    topicTitle: 'Unit 10: Our Houses in the Future (House on an Island)',
    passages: [
      {
        id: 'u10-p1',
        text: 'My future house will be on an island. It will be surrounded by tall trees and the blue sea. There will be a swimming pool in front of the house. There will be a helicopter on the roof. I can fly to school in it.'
      },
      {
        id: 'u10-p2',
        text: 'There will be some robots in the house. They will help me to clean the floors, cook meals, wash clothes and water the flowers. They will also help me to feed the dogs and cats.\nThere will be a super smart TV. It will help me to send and receive emails, and contact my friends on other planets. It will also help me to buy food from the supermarket.'
      }
    ],
    vocabList: [
      { id: 'u10-v1', word: 'surrounded', ipa: '/səˈraʊn.dɪd/', meaning: 'được bao quanh', example: 'It will be surrounded by tall trees and blue sea.', dist: ['ở xa', 'bị phá hủy', 'xây dựng'] },
      { id: 'u10-v2', word: 'helicopter', ipa: '/ˈhel.ɪˌkɒp.tər/', meaning: 'máy bay trực thăng', example: 'There will be a helicopter on the roof.', dist: ['xe đạp', 'ô tô điện', 'thuyền bè'] }
    ],
    questions: [
      {
        id: 'u10-q1',
        type: 'Địa điểm (Location)',
        question: 'Where will the author’s future house be?',
        options: ['On an island', 'In the city center', 'Under the ground', 'In the mountains'],
        correct: 'On an island',
        explanation: 'Ngôi nhà tương lai sẽ ở trên một hòn đảo.',
        quote: 'My future house will be on an island.'
      }
    ]
  },
  {
    unitId: 'unit-11',
    unitNumber: 11,
    title: 'OUR GREENER WORLD',
    topicTitle: 'Unit 11: Our Greener World (Nam’s Tips for a Greener School)',
    passages: [
      {
        id: 'u11-p1',
        text: 'Reporter: Can you share with us some tips to make your school greener?\nNam: Sure. Firstly, we put recycling bins in every classroom.\nReporter: What about old books and uniforms?\nNam: We exchange them with our friends or give them to charity. We don’t throw them away.'
      },
      {
        id: 'u11-p2',
        text: 'Reporter: Anything else?\nNam: We borrow books from the school library instead of buying new ones.\nReporter: Great! You can save much paper.\nNam: And there’s another tip. We bring reusable water bottles to school.\nReporter: I see lots of trees in your school. Is planting trees a good tip?\nNam: Yeah. It makes our school greener.\nReporter: Thanks for sharing. Do you want to add anything?\nNam: Finally, we usually find creative ways to reuse old items before throwing them away.'
      }
    ],
    vocabList: [
      { id: 'u11-v1', word: 'recycling bin', ipa: '/ˌriːˈsaɪ.klɪŋ ˌbɪn/', meaning: 'thùng rác tái chế', example: 'We put recycling bins in every classroom.', dist: ['hộp sách', 'tủ đồ', 'chai nước'] },
      { id: 'u11-v2', word: 'reusable', ipa: '/riːˈjuː.zə.bəl/', meaning: 'có thể tái sử dụng', example: 'We bring reusable water bottles to school.', dist: ['dùng 1 lần', 'đắt tiền', 'độc hại'] }
    ],
    questions: [
      {
        id: 'u11-q1',
        type: 'Mẹo môi trường (Tips)',
        question: 'What do Nam and his friends do with old books and uniforms?',
        options: [
          'Exchange them with friends or give to charity',
          'Throw them away in the trash',
          'Burn them in the yard',
          'Sell them for expensive money'
        ],
        correct: 'Exchange them with friends or give to charity',
        explanation: 'Nam và các bạn trao đổi sách cũ/đồng phục với bạn bè hoặc quyên góp từ thiện.',
        quote: 'We exchange them with our friends or give them to charity.'
      }
    ]
  },
  {
    unitId: 'unit-12',
    unitNumber: 12,
    title: 'ROBOTS',
    topicTitle: 'Unit 12: Robots (International Robot Show in Ha Noi)',
    passages: [
      {
        id: 'u12-p1',
        text: 'Today there is an international robot show in Ha Noi. People can see many types of robots there.\nHome robots are useful for housework. They can do most of the housework: cook meals, clean the house, do the washing, and iron clothes.'
      },
      {
        id: 'u12-p2',
        text: 'Teacher robots are the best choice for children. They can help them to study. They can teach them English, literature, maths and other subjects. They can also help children to improve their English pronunciation.\nPeople are also interested in other types of robots at the show. Worker robots can build houses and move heavy things; doctor robots can look after sick people and space robots can build space stations on the Moon and on planets.'
      }
    ],
    vocabList: [
      { id: 'u12-v1', word: 'housework', ipa: '/ˈhaʊs.wɜːk/', meaning: 'việc nhà', example: 'Home robots are useful for housework.', dist: ['bài tập về nhà', 'xây dựng', 'mua sắm'] },
      { id: 'u12-v2', word: 'pronunciation', ipa: '/prəˌnʌn.siˈeɪ.ʃən/', meaning: 'sự phát âm', example: 'Teacher robots help improve English pronunciation.', dist: ['từ vựng', 'ngữ pháp', 'kỹ năng viết'] }
    ],
    questions: [
      {
        id: 'u12-q1',
        type: 'Phân loại Robot',
        question: 'Which type of robot can help children improve their English pronunciation?',
        options: ['Teacher robots', 'Home robots', 'Worker robots', 'Space robots'],
        correct: 'Teacher robots',
        explanation: 'Robot giáo viên có thể dạy học và cải thiện phát âm tiếng Anh cho học sinh.',
        quote: 'Teacher robots... can also help children to improve their English pronunciation.'
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
