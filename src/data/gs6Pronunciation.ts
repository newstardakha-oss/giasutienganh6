/**
 * Dữ liệu Luyện Phát Âm (Pronunciation) Tiếng Anh 6 - Global Success (Unit 1 - 12)
 * Tích hợp đầy đủ lý thuyết I. LEARN (So sánh âm, Mẹo phát âm, Ví dụ, Minimal Pairs, Lưu ý mở rộng)
 * và II. PRACTICE (Exercise 1: 10 câu phát âm, Exercise 2: 10 câu trọng âm, Exercise 3: Tongue Twisters & Bài tập ngữ cảnh/ngữ điệu).
 * Quy ước: Phần nằm trong ngoặc vuông [ ] là âm tiết được gạch chân và in đậm, ví dụ: m[a]ths
 */

export interface SoundColumn {
  symbol: string;
  name: string;
  howToPronounce: string;
  pronunciationTip?: string;
  spellingPatterns: string[];
  examples: {
    word: string;
    ipa: string;
    meaningVi: string;
  }[];
}

export interface MinimalPairItem {
  leftWord: string;
  leftIpa: string;
  leftMeaningVi: string;
  rightWord: string;
  rightIpa: string;
  rightMeaningVi: string;
}

export interface PronunciationExerciseQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface TongueTwisterItem {
  sentence: string;
  ipa: string;
}

export interface PronunciationExercise {
  id: string;
  number: 1 | 2 | 3;
  title: string;
  instruction: string;
  questions: PronunciationExerciseQuestion[];
  tongueTwisters?: TongueTwisterItem[];
}

export interface UnitPronunciationData {
  unitId: string;
  unitNumber: number;
  unitTitle: string;
  book?: string;
  pages?: string;
  topicFocus: string;
  summaryNote: string;
  extraNotes?: string[];
  sounds: [SoundColumn, SoundColumn];
  minimalPairsTitle: string;
  minimalPairs: MinimalPairItem[];
  exercises: [PronunciationExercise, PronunciationExercise, PronunciationExercise];
}

export const GS6_PRONUNCIATION_UNITS: UnitPronunciationData[] = [
  {
    "unitId": "unit-1",
    "unitNumber": 1,
    "unitTitle": "My New School",
    "topicFocus": "Sounds: /ɑː/ and /ʌ/",
    "summaryNote": "Phân biệt nguyên âm dài /ɑː/ (mở rộng miệng, ngân dài) và nguyên âm ngắn /ʌ/ (miệng mở vừa phải, phát âm ngắn, dứt khoát).",
    "sounds": [
      {
        "symbol": "/ɑː/",
        "name": "Nguyên âm dài /ɑː/",
        "howToPronounce": "Miệng mở rộng, hàm dưới hạ thấp tự nhiên, lưỡi nằm thấp ở phía sau khoang miệng. Luồng hơi đi ra tự do và kéo dài, đồng thời dây thanh quản rung lên để tạo ra âm dài và sâu từ cổ họng.",
        "spellingPatterns": [
          "ar (smart, art, carton)",
          "a (class, father, dance)"
        ],
        "examples": [
          {
            "word": "sm[ar]t",
            "ipa": "/smɑːt/",
            "meaningVi": "thông minh, bảnh bao"
          },
          {
            "word": "[ar]t",
            "ipa": "/ɑːt/",
            "meaningVi": "mỹ thuật, nghệ thuật"
          },
          {
            "word": "c[ar]ton",
            "ipa": "/ˈkɑːtən/",
            "meaningVi": "hộp giấy cứng"
          },
          {
            "word": "cl[a]ss",
            "ipa": "/klɑːs/",
            "meaningVi": "lớp học"
          },
          {
            "word": "f[a]ther",
            "ipa": "/ˈfɑːðə(r)/",
            "meaningVi": "bố, cha"
          },
          {
            "word": "l[ar]ge",
            "ipa": "/lɑːdʒ/",
            "meaningVi": "rộng lớn"
          }
        ],
        "pronunciationTip": "Gần giống âm \"a\" trong tiếng Việt, nhưng miệng mở rộng hơn, kéo dài âm và phát ra từ sâu trong cổ họng."
      },
      {
        "symbol": "/ʌ/",
        "name": "Nguyên âm ngắn /ʌ/",
        "howToPronounce": "Miệng mở vừa phải, hàm hơi hạ, lưỡi đặt ở vị trí trung tâm và môi thả lỏng không tròn. Luồng hơi đi ra tự do, đồng thời dây thanh quản rung lên để tạo ra âm ngắn, gọn và dứt khoát.",
        "spellingPatterns": [
          "u (subject, study, lunch)",
          "o (Monday, brother, compass)",
          "ou (cousin)"
        ],
        "examples": [
          {
            "word": "s[u]bject",
            "ipa": "/ˈsʌbdʒɪkt/",
            "meaningVi": "môn học"
          },
          {
            "word": "st[u]dy",
            "ipa": "/ˈstʌdi/",
            "meaningVi": "học tập"
          },
          {
            "word": "M[o]nday",
            "ipa": "/ˈmʌndeɪ/",
            "meaningVi": "thứ Hai"
          },
          {
            "word": "c[o]mpass",
            "ipa": "/ˈkʌmpəs/",
            "meaningVi": "com-pa, la bàn"
          },
          {
            "word": "l[u]nch",
            "ipa": "/lʌntʃ/",
            "meaningVi": "bữa trưa"
          },
          {
            "word": "S[u]nday",
            "ipa": "/ˈsʌndeɪ/",
            "meaningVi": "Chủ nhật"
          }
        ],
        "pronunciationTip": "Gần giống âm \"â\" trong tiếng Việt, nhưng âm phát ra ngắn, gọn và dứt khoát hơn."
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh âm /ɑː/ và /ʌ/",
    "minimalPairs": [
      {
        "leftWord": "h[ear]t",
        "leftIpa": "/hɑːt/",
        "leftMeaningVi": "trái tim",
        "rightWord": "h[u]t",
        "rightIpa": "/hʌt/",
        "rightMeaningVi": "túp lều"
      },
      {
        "leftWord": "c[ar]t",
        "leftIpa": "/kɑːt/",
        "leftMeaningVi": "xe đẩy",
        "rightWord": "c[u]t",
        "rightIpa": "/kʌt/",
        "rightMeaningVi": "cắt"
      },
      {
        "leftWord": "m[ar]ch",
        "leftIpa": "/mɑːtʃ/",
        "leftMeaningVi": "tháng Ba / diễu hành",
        "rightWord": "m[u]ch",
        "rightIpa": "/mʌtʃ/",
        "rightMeaningVi": "nhiều"
      },
      {
        "leftWord": "d[ar]k",
        "leftIpa": "/dɑːk/",
        "leftMeaningVi": "tối tăm",
        "rightWord": "d[u]ck",
        "rightIpa": "/dʌk/",
        "rightMeaningVi": "con vịt"
      }
    ],
    "exercises": [
      {
        "id": "u1-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u1-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "m[a]ths",
              "cl[a]ss",
              "p[a]ss",
              "gr[a]ss"
            ],
            "correctAnswer": "m[a]ths",
            "explanation": "m[a]ths /mæθs/ phát âm là /æ/, các từ còn lại (cl[a]ss, p[a]ss, gr[a]ss) phát âm là /ɑː/ (theo chuẩn Anh – Anh)."
          },
          {
            "id": "u1-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "d[a]nce",
              "l[a]st",
              "[a]fter",
              "b[a]g"
            ],
            "correctAnswer": "b[a]g",
            "explanation": "b[a]g /bæɡ/ phát âm là /æ/, các từ còn lại (d[a]nce, l[a]st, [a]fter) phát âm là /ɑː/."
          },
          {
            "id": "u1-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "st[ar]t",
              "p[ar]k",
              "w[ar]m",
              "sm[ar]t"
            ],
            "correctAnswer": "w[ar]m",
            "explanation": "w[ar]m /wɔːm/ phát âm là /ɔː/, các từ còn lại (st[ar]t, p[ar]k, sm[ar]t) phát âm là /ɑː/."
          },
          {
            "id": "u1-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "l[u]nch",
              "r[u]le",
              "st[u]dy",
              "r[u]bber"
            ],
            "correctAnswer": "r[u]le",
            "explanation": "r[u]le /ruːl/ phát âm là /uː/, các từ còn lại (l[u]nch, st[u]dy, r[u]bber) phát âm là /ʌ/."
          },
          {
            "id": "u1-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "j[u]mp",
              "[u]niform",
              "m[u]st",
              "b[u]s"
            ],
            "correctAnswer": "[u]niform",
            "explanation": "[u]niform /ˈjuːnɪfɔːm/ phát âm là /juː/, các từ còn lại (j[u]mp, m[u]st, b[u]s) phát âm là /ʌ/."
          },
          {
            "id": "u1-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "n[o]t",
              "m[o]ney",
              "br[o]ther",
              "M[o]nday"
            ],
            "correctAnswer": "n[o]t",
            "explanation": "n[o]t /nɒt/ phát âm là /ɒ/, các từ còn lại (m[o]ney, br[o]ther, M[o]nday) phát âm là /ʌ/."
          },
          {
            "id": "u1-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "c[o]me",
              "s[o]n",
              "m[o]ther",
              "g[o]"
            ],
            "correctAnswer": "g[o]",
            "explanation": "g[o] /ɡəʊ/ phát âm là /əʊ/, các từ còn lại (c[o]me, s[o]n, m[o]ther) phát âm là /ʌ/."
          },
          {
            "id": "u1-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ab[ou]t",
              "y[ou]ng",
              "c[ou]sin",
              "c[ou]ntry"
            ],
            "correctAnswer": "ab[ou]t",
            "explanation": "ab[ou]t /əˈbaʊt/ phát âm là /aʊ/, các từ còn lại (y[ou]ng, c[ou]sin, c[ou]ntry) phát âm là /ʌ/."
          },
          {
            "id": "u1-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "h[a]lf",
              "b[a]th",
              "b[a]ck",
              "[a]sk"
            ],
            "correctAnswer": "b[a]ck",
            "explanation": "b[a]ck /bæk/ phát âm là /æ/, các từ còn lại (h[a]lf, b[a]th, [a]sk) phát âm là /ɑː/."
          },
          {
            "id": "u1-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "l[u]nch",
              "p[u]t",
              "c[u]p",
              "m[u]m"
            ],
            "correctAnswer": "p[u]t",
            "explanation": "p[u]t /pʊt/ phát âm là /ʊ/, các từ còn lại (l[u]nch, c[u]p, m[u]m) phát âm là /ʌ/."
          }
        ]
      },
      {
        "id": "u1-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u1-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "classroom",
              "notebook",
              "teacher",
              "cartoon"
            ],
            "correctAnswer": "cartoon",
            "explanation": "\"cartoon\" /kɑːˈtuːn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (classroom, notebook, teacher) có trọng âm rơi vào âm tiết thứ 1."
          },
          {
            "id": "u1-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "music",
              "advice",
              "science",
              "village"
            ],
            "correctAnswer": "advice",
            "explanation": "\"advice\" /ədˈvaɪs/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (music, science, village) nhấn âm tiết thứ 1."
          },
          {
            "id": "u1-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "country",
              "exam",
              "breakfast",
              "money"
            ],
            "correctAnswer": "exam",
            "explanation": "\"exam\" /ɪɡˈzæm/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (country, breakfast, money) nhấn âm tiết thứ 1."
          },
          {
            "id": "u1-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "student",
              "garden",
              "hello",
              "dinner"
            ],
            "correctAnswer": "hello",
            "explanation": "\"hello\" /həˈləʊ/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (student, garden, dinner) nhấn âm tiết thứ 1."
          },
          {
            "id": "u1-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "about",
              "heavy",
              "study",
              "healthy"
            ],
            "correctAnswer": "about",
            "explanation": "\"about\" /əˈbaʊt/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (heavy, study, healthy) nhấn âm tiết thứ 1."
          },
          {
            "id": "u1-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "today",
              "minute",
              "reason",
              "secret"
            ],
            "correctAnswer": "today",
            "explanation": "\"today\" /təˈdeɪ/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (minute, reason, secret) nhấn âm tiết thứ 1."
          },
          {
            "id": "u1-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "favourite",
              "exercise",
              "remember",
              "cinema"
            ],
            "correctAnswer": "remember",
            "explanation": "\"remember\" /rɪˈmembə(r)/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (favourite, exercise, cinema) nhấn âm tiết thứ 1."
          },
          {
            "id": "u1-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "computer",
              "uniform",
              "library",
              "holiday"
            ],
            "correctAnswer": "computer",
            "explanation": "\"computer\" /kəmˈpjuːtə(r)/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (uniform, library, holiday) nhấn âm tiết thứ 1."
          },
          {
            "id": "u1-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "interesting",
              "history",
              "eraser",
              "bicycle"
            ],
            "correctAnswer": "eraser",
            "explanation": "\"eraser\" /ɪˈreɪzə(r)/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (interesting, history, bicycle) nhấn âm tiết thứ 1."
          },
          {
            "id": "u1-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "painting",
              "classmate",
              "English",
              "between"
            ],
            "correctAnswer": "between",
            "explanation": "\"between\" /bɪˈtwiːn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (painting, classmate, English) nhấn âm tiết thứ 1."
          }
        ]
      },
      {
        "id": "u1-ex3",
        "number": 3,
        "title": "Exercise 3: Tongue Twisters & Context Practice (Luyện đọc câu xoắn lưỡi & Bài tập ngữ cảnh)",
        "instruction": "Phần A: Nghe và đọc to 5 câu Tongue Twisters bên dưới. Phần B: Hoàn thành các câu hỏi trắc nghiệm ứng dụng.",
        "questions": [
          {
            "id": "u1-ex3-q1",
            "prompt": "Trong câu: \"My br[o]ther has a new c[o]mpass for his [ar]t cl[a]ss\", từ nào chứa âm /ʌ/?",
            "options": [
              "br[o]ther & c[o]mpass",
              "[ar]t & cl[a]ss",
              "new & for",
              "his & cl[a]ss"
            ],
            "correctAnswer": "br[o]ther & c[o]mpass",
            "explanation": "brother /ˈbrʌðə/ và compass /ˈkʌmpəs/ đều chứa âm /ʌ/; art và class chứa âm /ɑː/."
          },
          {
            "id": "u1-ex3-q2",
            "prompt": "Chọn từ có âm /ɑː/ để điền vào câu: \"Students look very ______ in their new uniforms.\"",
            "options": [
              "sm[ar]t",
              "f[u]nny",
              "y[ou]ng",
              "l[u]cky"
            ],
            "correctAnswer": "sm[ar]t",
            "explanation": "smart /smɑːt/ vừa mang âm /ɑː/ vừa hợp nghĩa: Học sinh trông rất bảnh bao trong bộ đồng phục mới."
          },
          {
            "id": "u1-ex3-q3",
            "prompt": "Từ nào sau đây có cùng âm nguyên âm với từ \"st[u]dy\"?",
            "options": [
              "M[o]nday",
              "f[a]ther",
              "c[ar]ton",
              "st[ar]t"
            ],
            "correctAnswer": "M[o]nday",
            "explanation": "study /ˈstʌdi/ và Monday /ˈmʌndeɪ/ đều có phần gạch chân phát âm là /ʌ/."
          },
          {
            "id": "u1-ex3-q4",
            "prompt": "Từ nào sau đây có cùng âm nguyên âm với từ \"[ar]t\"?",
            "options": [
              "l[ar]ge",
              "l[u]nch",
              "c[o]me",
              "s[u]n"
            ],
            "correctAnswer": "l[ar]ge",
            "explanation": "art /ɑːt/ và large /lɑːdʒ/ đều chứa nguyên âm dài /ɑː/."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "My smart brother studies art on Monday.",
            "ipa": "/maɪ smɑːt ˈbrʌðə ˈstʌdiz ɑːt ɒn ˈmʌndeɪ/"
          },
          {
            "sentence": "The funny class loves the fast bus.",
            "ipa": "/ðə ˈfʌni klɑːs lʌvz ðə fɑːst bʌs/"
          },
          {
            "sentence": "Mum has a cup in the dark park.",
            "ipa": "/mʌm hæz ə kʌp ɪn ðə dɑːk pɑːk/"
          },
          {
            "sentence": "Pass the compass to my hungry aunt.",
            "ipa": "/pɑːs ðə ˈkʌmpəs tə maɪ ˈhʌŋɡri ɑːnt/"
          },
          {
            "sentence": "Half the club jumps in the yard.",
            "ipa": "/hɑːf ðə klʌb dʒʌmps ɪn ðə jɑːd/"
          }
        ]
      }
    ],
    "book": "Book 1",
    "pages": "16–18",
    "extraNotes": [
      "/ɑː/ thường được viết bằng \"ar\" hoặc \"a\" trước một số phụ âm nhất định → art, smart, carton, class",
      "/ʌ/ thường được viết bằng chữ \"u\" hoặc \"o\" trong các âm tiết đóng → study, subject, lunch, Monday",
      "Lưu ý sự khác biệt Anh – Anh (BrE) và Anh – Mỹ (AmE):",
      "  • Các từ như class, dance, ask, half…: BrE phát âm /ɑː/, AmE phát âm /æ/ — class: /klɑːs/ (BrE) – /klæs/ (AmE)",
      "  • Các từ chứa \"ar\" (art, smart…): BrE âm \"r\" bị câm, chỉ phát âm /ɑː/; AmE phát âm rõ \"r\" thành /ɑːr/ — art: /ɑːt/ (BrE) – /ɑːrt/ (AmE)"
    ]
  },
  {
    "unitId": "unit-2",
    "unitNumber": 2,
    "unitTitle": "My House",
    "topicFocus": "Final sounds: /s/ and /z/",
    "summaryNote": "Quy tắc phát âm đuôi -s/-es của danh từ số nhiều và động từ ngôi thứ 3 số ít: phát âm là /s/ sau các âm vô thanh (/p/, /k/, /t/, /f/, /θ/) và phát âm là /z/ sau nguyên âm hoặc phụ âm hữu thanh.",
    "sounds": [
      {
        "symbol": "/s/",
        "name": "Âm cuối vô thanh /s/",
        "howToPronounce": "Khép hờ hai răng cắn nhẹ, đầu lưỡi đặt gần mặt sau của răng cửa trên. Luồng hơi được đẩy mạnh ra ngoài qua khe hẹp giữa hai hàm răng mà không làm rung dây thanh quản (âm vô thanh).",
        "spellingPatterns": [
          "Đứng sau các âm vô thanh: -p (lamps), -k (sinks, desks), -t (toilets, flats, cats), -f (roofs)"
        ],
        "examples": [
          {
            "word": "lamp[s]",
            "ipa": "/læmps/",
            "meaningVi": "những chiếc đèn bàn"
          },
          {
            "word": "sink[s]",
            "ipa": "/sɪŋks/",
            "meaningVi": "những bồn rửa"
          },
          {
            "word": "flat[s]",
            "ipa": "/flæts/",
            "meaningVi": "những căn hộ"
          },
          {
            "word": "toilet[s]",
            "ipa": "/ˈtɔɪləts/",
            "meaningVi": "những phòng vệ sinh"
          },
          {
            "word": "chopstick[s]",
            "ipa": "/ˈtʃɒpstɪks/",
            "meaningVi": "đôi đũa"
          },
          {
            "word": "desk[s]",
            "ipa": "/desks/",
            "meaningVi": "những chiếc bàn học"
          }
        ],
        "pronunciationTip": "Gần giống âm \"x\" trong tiếng Việt nhưng chỉ đẩy hơi ra ngoài, không tạo âm thanh hoàn chỉnh."
      },
      {
        "symbol": "/z/",
        "name": "Âm cuối hữu thanh /z/",
        "howToPronounce": "Khép hờ hai răng cắn nhẹ, đầu lưỡi đặt gần mặt sau của răng cửa trên tương tự như âm /s/. Không dùng hơi hoặc dùng hơi thật nhẹ đẩy ra ngoài qua khe hẹp giữa hai hàm răng, đồng thời dây thanh quản rung mạnh (âm hữu thanh).",
        "spellingPatterns": [
          "Đứng sau nguyên âm hoặc phụ âm hữu thanh: -a/o/i (sofas, photos), -m (rooms), -b (wardrobes), -d (beds), -l (halls), -r (chairs)"
        ],
        "examples": [
          {
            "word": "sofa[s]",
            "ipa": "/ˈsəʊfəz/",
            "meaningVi": "những ghế sô-pha"
          },
          {
            "word": "room[s]",
            "ipa": "/ruːmz/",
            "meaningVi": "những căn phòng"
          },
          {
            "word": "wardrobe[s]",
            "ipa": "/ˈwɔːdrəʊbz/",
            "meaningVi": "những tủ quần áo"
          },
          {
            "word": "bed[s]",
            "ipa": "/bedz/",
            "meaningVi": "những chiếc giường"
          },
          {
            "word": "chair[s]",
            "ipa": "/tʃeəz/",
            "meaningVi": "những chiếc ghế"
          },
          {
            "word": "cupboard[s]",
            "ipa": "/ˈkʌbədz/",
            "meaningVi": "những tủ chén"
          }
        ],
        "pronunciationTip": "Gần giống âm \"gi\" trong tiếng Việt, nhưng chỉ tạo độ rung, không tạo thành âm hoàn chỉnh."
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh âm cuối /s/ và /z/",
    "minimalPairs": [
      {
        "leftWord": "sink[s]",
        "leftIpa": "/sɪŋks/",
        "leftMeaningVi": "những bồn rửa (kết thúc bằng /k/ + s ➔ /s/)",
        "rightWord": "thing[s]",
        "rightIpa": "/θɪŋz/",
        "rightMeaningVi": "những đồ vật (kết thúc bằng /ŋ/ + s ➔ /z/)"
      },
      {
        "leftWord": "flat[s]",
        "leftIpa": "/flæts/",
        "leftMeaningVi": "những căn hộ (/t/ + s ➔ /s/)",
        "rightWord": "bed[s]",
        "rightIpa": "/bedz/",
        "rightMeaningVi": "những chiếc giường (/d/ + s ➔ /z/)"
      },
      {
        "leftWord": "lamp[s]",
        "leftIpa": "/læmps/",
        "leftMeaningVi": "những cái đèn (/p/ + s ➔ /s/)",
        "rightWord": "room[s]",
        "rightIpa": "/ruːmz/",
        "rightMeaningVi": "những căn phòng (/m/ + s ➔ /z/)"
      },
      {
        "leftWord": "desk[s]",
        "leftIpa": "/desks/",
        "leftMeaningVi": "những bàn học (/k/ + s ➔ /s/)",
        "rightWord": "bag[s]",
        "rightIpa": "/bæɡz/",
        "rightMeaningVi": "những chiếc cặp (/ɡ/ + s ➔ /z/)"
      }
    ],
    "exercises": [
      {
        "id": "u2-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u2-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "room[s]",
              "sink[s]",
              "flat[s]",
              "lamp[s]"
            ],
            "correctAnswer": "room[s]",
            "explanation": "room[s] /ruːmz/ có đuôi -s phát âm là /z/ (sau âm hữu thanh /m/), các từ còn lại (sink[s], flat[s], lamp[s]) phát âm là /s/."
          },
          {
            "id": "u2-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "sofa[s]",
              "bowl[s]",
              "kitchen[s]",
              "toilet[s]"
            ],
            "correctAnswer": "toilet[s]",
            "explanation": "toilet[s] /ˈtɔɪləts/ có đuôi -s phát âm là /s/ (sau âm vô thanh /t/), các từ còn lại (sofa[s], bowl[s], kitchen[s]) phát âm là /z/."
          },
          {
            "id": "u2-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "cupboard[s]",
              "desk[s]",
              "door[s]",
              "bed[s]"
            ],
            "correctAnswer": "desk[s]",
            "explanation": "desk[s] /desks/ có đuôi -s phát âm là /s/ (sau âm vô thanh /k/), các từ còn lại (cupboard[s], door[s], bed[s]) phát âm là /z/."
          },
          {
            "id": "u2-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "cooker[s]",
              "photo[s]",
              "chair[s]",
              "chopstick[s]"
            ],
            "correctAnswer": "chopstick[s]",
            "explanation": "chopstick[s] /ˈtʃɒpstɪks/ có đuôi -s phát âm là /s/ (sau âm vô thanh /k/), các từ còn lại (cooker[s], photo[s], chair[s]) phát âm là /z/."
          },
          {
            "id": "u2-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "apartment[s]",
              "aunt[s]",
              "cousin[s]",
              "parent[s]"
            ],
            "correctAnswer": "cousin[s]",
            "explanation": "cousin[s] /ˈkʌznz/ có đuôi -s phát âm là /z/ (sau âm hữu thanh /n/), các từ còn lại (apartment[s], aunt[s], parent[s]) tận cùng bằng /t/ nên phát âm là /s/."
          },
          {
            "id": "u2-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "sister[s]",
              "brother[s]",
              "uncle[s]",
              "parent[s]"
            ],
            "correctAnswer": "parent[s]",
            "explanation": "parent[s] /ˈpeərənts/ có đuôi -s phát âm là /s/ (sau âm vô thanh /t/), các từ còn lại (sister[s], brother[s], uncle[s]) phát âm là /z/."
          },
          {
            "id": "u2-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "book[s]",
              "dog[s]",
              "cat[s]",
              "map[s]"
            ],
            "correctAnswer": "dog[s]",
            "explanation": "dog[s] /dɒɡz/ có đuôi -s phát âm là /z/ (sau âm hữu thanh /ɡ/), các từ còn lại (book[s], cat[s], map[s]) phát âm là /s/."
          },
          {
            "id": "u2-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "hat[s]",
              "pen[s]",
              "bag[s]",
              "ruler[s]"
            ],
            "correctAnswer": "hat[s]",
            "explanation": "hat[s] /hæts/ có đuôi -s phát âm là /s/ (sau âm vô thanh /t/), các từ còn lại (pen[s], bag[s], ruler[s]) phát âm là /z/."
          },
          {
            "id": "u2-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "br[o]ther",
              "h[o]me",
              "c[o]me",
              "m[o]ther"
            ],
            "correctAnswer": "h[o]me",
            "explanation": "h[o]me /həʊm/ phát âm là /əʊ/, các từ còn lại (br[o]ther, c[o]me, m[o]ther) phát âm là /ʌ/."
          },
          {
            "id": "u2-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "h[a]ll",
              "t[a]ll",
              "fl[a]t",
              "w[a]ll"
            ],
            "correctAnswer": "fl[a]t",
            "explanation": "fl[a]t /flæt/ phát âm là /æ/, các từ còn lại (h[a]ll, t[a]ll, w[a]ll) phát âm là /ɔː/."
          }
        ]
      },
      {
        "id": "u2-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u2-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "behind",
              "bedroom",
              "kitchen",
              "bathroom"
            ],
            "correctAnswer": "behind",
            "explanation": "\"behind\" /bɪˈhaɪnd/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (bedroom, kitchen, bathroom) nhấn âm tiết thứ 1."
          },
          {
            "id": "u2-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "cooker",
              "sofa",
              "between",
              "picture"
            ],
            "correctAnswer": "between",
            "explanation": "\"between\" /bɪˈtwiːn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (cooker, sofa, picture) nhấn âm tiết thứ 1."
          },
          {
            "id": "u2-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "toilet",
              "shower",
              "cupboard",
              "hotel"
            ],
            "correctAnswer": "hotel",
            "explanation": "\"hotel\" /həʊˈtel/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (toilet, shower, cupboard) nhấn âm tiết thứ 1."
          },
          {
            "id": "u2-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "cousin",
              "sister",
              "forget",
              "brother"
            ],
            "correctAnswer": "forget",
            "explanation": "\"forget\" /fəˈɡet/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (cousin, sister, brother) nhấn âm tiết thứ 1."
          },
          {
            "id": "u2-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "mother",
              "guitar",
              "father",
              "uncle"
            ],
            "correctAnswer": "guitar",
            "explanation": "\"guitar\" /ɡɪˈtɑː(r)/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (mother, father, uncle) nhấn âm tiết thứ 1."
          },
          {
            "id": "u2-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "nephew",
              "machine",
              "parents",
              "daughter"
            ],
            "correctAnswer": "machine",
            "explanation": "\"machine\" /məˈʃiːn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (nephew, parents, daughter) nhấn âm tiết thứ 1."
          },
          {
            "id": "u2-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "motorbike",
              "dishwasher",
              "furniture",
              "apartment"
            ],
            "correctAnswer": "apartment",
            "explanation": "\"apartment\" /əˈpɑːtmənt/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (motorbike, dishwasher, furniture) nhấn âm tiết thứ 1."
          },
          {
            "id": "u2-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "computer",
              "favourite",
              "dishwasher",
              "beautiful"
            ],
            "correctAnswer": "computer",
            "explanation": "\"computer\" /kəmˈpjuːtə(r)/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (favourite, dishwasher, beautiful) nhấn âm tiết thứ 1."
          },
          {
            "id": "u2-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "computer",
              "department",
              "furniture",
              "apartment"
            ],
            "correctAnswer": "furniture",
            "explanation": "\"furniture\" /ˈfɜːnɪtʃə(r)/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (computer, department, apartment) nhấn âm tiết thứ 2."
          },
          {
            "id": "u2-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "motorbike",
              "electric",
              "favourite",
              "beautiful"
            ],
            "correctAnswer": "electric",
            "explanation": "\"electric\" /ɪˈlektrɪk/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (motorbike, favourite, beautiful) nhấn âm tiết thứ 1."
          }
        ]
      },
      {
        "id": "u2-ex3",
        "number": 3,
        "title": "Exercise 3: Tongue Twisters & Context Practice (Luyện đọc câu xoắn lưỡi & Bài tập ngữ cảnh)",
        "instruction": "Phần A: Nghe và đọc to 5 câu Tongue Twisters bên dưới. Phần B: Hoàn thành các câu hỏi trắc nghiệm ứng dụng.",
        "questions": [
          {
            "id": "u2-ex3-q1",
            "prompt": "Trong câu: \"There are two lamp[s] and four sofa[s] in the living room\", hai đuôi -s lần lượt phát âm là:",
            "options": [
              "/s/ và /z/",
              "/z/ và /s/",
              "/s/ và /s/",
              "/z/ và /z/"
            ],
            "correctAnswer": "/s/ và /z/",
            "explanation": "lamp[s] tận cùng bằng /p/ ➔ /s/; sofa[s] tận cùng bằng nguyên âm /ə/ ➔ /z/."
          },
          {
            "id": "u2-ex3-q2",
            "prompt": "Trong câu: \"My mum clean[s] the sink[s] every day\", từ nào có đuôi -s phát âm là /s/?",
            "options": [
              "sink[s]",
              "clean[s]",
              "Cả hai từ",
              "Không từ nào"
            ],
            "correctAnswer": "sink[s]",
            "explanation": "sink[s] (/k/ + s ➔ /s/), còn clean[s] (/n/ + s ➔ /z/)."
          },
          {
            "id": "u2-ex3-q3",
            "prompt": "Từ nào dưới đây có cùng cách phát âm đuôi -s với từ \"room[s]\"?",
            "options": [
              "wall[s]",
              "desk[s]",
              "flat[s]",
              "lamp[s]"
            ],
            "correctAnswer": "wall[s]",
            "explanation": "room[s] và wall[s] đều có đuôi -s phát âm là /z/."
          },
          {
            "id": "u2-ex3-q4",
            "prompt": "Từ nào dưới đây có cùng cách phát âm đuôi -s với từ \"sink[s]\"?",
            "options": [
              "book[s]",
              "bag[s]",
              "pen[s]",
              "ruler[s]"
            ],
            "correctAnswer": "book[s]",
            "explanation": "sink[s] và book[s] đều tận cùng bằng /k/ nên đuôi -s phát âm là /s/."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "The cats and dogs sit on the mats near the logs.",
            "ipa": "/ðə kæts ənd dɒɡz sɪt ɒn ðə mæts nɪə ðə lɒɡz/"
          },
          {
            "sentence": "My aunts and uncles buy cups and bowls.",
            "ipa": "/maɪ ɑːnts ənd ˈʌŋklz baɪ kʌps ənd bəʊlz/"
          },
          {
            "sentence": "Six flats have rooms with beds and lamps.",
            "ipa": "/sɪks flæts hæv ruːmz wɪð bedz ənd læmps/"
          },
          {
            "sentence": "The boys put books and pens on the desks.",
            "ipa": "/ðə bɔɪz pʊt bʊks ənd penz ɒn ðə desks/"
          },
          {
            "sentence": "The girls clean sinks and cookers and pans.",
            "ipa": "/ðə ɡɜːlz kliːn sɪŋks ənd ˈkʊkəz ənd pænz/"
          }
        ]
      }
    ],
    "book": "Book 1",
    "pages": "56–58",
    "extraNotes": [
      "Âm /s/ thường xuất hiện khi từ tận cùng bằng các phụ âm vô thanh: /p/, /t/, /k/, /f/, /θ/ → lamps, flats, sinks",
      "Âm /z/ thường xuất hiện khi từ tận cùng bằng các nguyên âm hoặc phụ âm hữu thanh (trừ các âm xuýt) → rooms, sofas, cupboards"
    ]
  },
  {
    "unitId": "unit-3",
    "unitNumber": 3,
    "unitTitle": "My Friends",
    "topicFocus": "Sounds: /b/ and /p/",
    "summaryNote": "Phân biệt hai phụ âm đôi môi /b/ (hữu thanh - rung dây thanh quản, ít bật hơi) và /p/ (vô thanh - không rung dây thanh quản, bật hơi mạnh).",
    "sounds": [
      {
        "symbol": "/b/",
        "name": "Phụ âm hữu thanh /b/",
        "howToPronounce": "Hai môi mím chặt để cản luồng hơi từ phổi đi lên, tạo áp suất phía sau môi, sau đó mở môi ra đột ngột để luồng hơi bật mạnh ra ngoài mà không làm rung dây thanh quản (âm bật hơi, vô thanh).",
        "spellingPatterns": [
          "b (big, boy, blonde, brown)",
          "bb (chubby, rubber)"
        ],
        "examples": [
          {
            "word": "[b]ig",
            "ipa": "/bɪɡ/",
            "meaningVi": "to lớn"
          },
          {
            "word": "[b]londe",
            "ipa": "/blɒnd/",
            "meaningVi": "tóc vàng hoe"
          },
          {
            "word": "[b]rown",
            "ipa": "/braʊn/",
            "meaningVi": "màu nâu"
          },
          {
            "word": "[b]iscuit",
            "ipa": "/ˈbɪskɪt/",
            "meaningVi": "bánh quy"
          },
          {
            "word": "chu[bb]y",
            "ipa": "/ˈtʃʌbi/",
            "meaningVi": "mũm mĩm"
          },
          {
            "word": "[b]oy",
            "ipa": "/bɔɪ/",
            "meaningVi": "cậu bé"
          }
        ],
        "pronunciationTip": "Gần giống âm \"p\" trong tiếng Việt nhưng bật hơi mạnh hơn, không rung dây thanh quản."
      },
      {
        "symbol": "/p/",
        "name": "Phụ âm vô thanh bật hơi /p/",
        "howToPronounce": "Hai môi mím chặt tương tự như âm /p/. Tuy nhiên, thay vì bật hơi mạnh, hãy làm rung dây thanh quản trước khi mở môi bật âm ra ngoài (âm rung, hữu thanh).",
        "spellingPatterns": [
          "p (picnic, patient, pony, park, play)",
          "pp (happy)"
        ],
        "examples": [
          {
            "word": "[p]icnic",
            "ipa": "/ˈpɪknɪk/",
            "meaningVi": "chuyến dã ngoại"
          },
          {
            "word": "[p]atient",
            "ipa": "/ˈpeɪʃnt/",
            "meaningVi": "kiên nhẫn"
          },
          {
            "word": "[p]ony",
            "ipa": "/ˈpəʊni/",
            "meaningVi": "ngựa con"
          },
          {
            "word": "[p]lay",
            "ipa": "/pleɪ/",
            "meaningVi": "chơi"
          },
          {
            "word": "[p]encil",
            "ipa": "/ˈpensl/",
            "meaningVi": "bút chì"
          },
          {
            "word": "hel[p]ful",
            "ipa": "/ˈhelpfl/",
            "meaningVi": "hay giúp đỡ"
          }
        ],
        "pronunciationTip": "Gần giống âm \"b\" trong tiếng Việt, có rung dây thanh quản."
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh âm /b/ và /p/",
    "minimalPairs": [
      {
        "leftWord": "[b]ig",
        "leftIpa": "/bɪɡ/",
        "leftMeaningVi": "to lớn",
        "rightWord": "[p]ig",
        "rightIpa": "/pɪɡ/",
        "rightMeaningVi": "con lợn"
      },
      {
        "leftWord": "[b]ear",
        "leftIpa": "/beə(r)/",
        "leftMeaningVi": "con gấu",
        "rightWord": "[p]ear",
        "rightIpa": "/peə(r)/",
        "rightMeaningVi": "quả lê"
      },
      {
        "leftWord": "[b]ack",
        "leftIpa": "/bæk/",
        "leftMeaningVi": "phía sau / cái lưng",
        "rightWord": "[p]ack",
        "rightIpa": "/pæk/",
        "rightMeaningVi": "đóng gói, bó"
      },
      {
        "leftWord": "[b]uy",
        "leftIpa": "/baɪ/",
        "leftMeaningVi": "mua",
        "rightWord": "[p]ie",
        "rightIpa": "/paɪ/",
        "rightMeaningVi": "bánh nướng"
      }
    ],
    "exercises": [
      {
        "id": "u3-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u3-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "num[b]er",
              "clim[b]",
              "clu[b]",
              "[b]asket"
            ],
            "correctAnswer": "clim[b]",
            "explanation": "clim[b] /klaɪm/ có chữ \"b\" bị câm (đứng cuối sau \"m\"), các từ còn lại (num[b]er, clu[b], [b]asket) phát âm rõ âm /b/."
          },
          {
            "id": "u3-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "kee[p]",
              "su[pp]er",
              "cu[p]board",
              "[p]atient"
            ],
            "correctAnswer": "cu[p]board",
            "explanation": "cu[p]board /ˈkʌbəd/ có chữ \"p\" bị câm, các từ còn lại (kee[p], su[pp]er, [p]atient) phát âm rõ âm /p/."
          },
          {
            "id": "u3-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ra[bb]it",
              "com[b]",
              "[b]rother",
              "we[b]"
            ],
            "correctAnswer": "com[b]",
            "explanation": "com[b] /kəʊm/ có chữ \"b\" bị câm (đứng sau \"m\"), các từ còn lại (ra[bb]it, [b]rother, we[b]) phát âm là /b/."
          },
          {
            "id": "u3-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[p]icture",
              "a[pp]le",
              "recei[p]t",
              "cu[p]"
            ],
            "correctAnswer": "recei[p]t",
            "explanation": "recei[p]t /rɪˈsiːt/ có chữ \"p\" bị câm, các từ còn lại ([p]icture, a[pp]le, cu[p]) phát âm là /p/."
          },
          {
            "id": "u3-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ze[b]ra",
              "cra[b]",
              "lam[b]",
              "[b]ear"
            ],
            "correctAnswer": "lam[b]",
            "explanation": "lam[b] /læm/ có chữ \"b\" bị câm (đứng sau \"m\"), các từ còn lại (ze[b]ra, cra[b], [b]ear) phát âm là /b/."
          },
          {
            "id": "u3-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[p]erson",
              "cam[p]ing",
              "sto[p]",
              "ras[p]berry"
            ],
            "correctAnswer": "ras[p]berry",
            "explanation": "ras[p]berry /ˈrɑːzbəri/ có chữ \"p\" bị câm, các từ còn lại ([p]erson, cam[p]ing, sto[p]) phát âm là /p/."
          },
          {
            "id": "u3-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[b]usy",
              "thum[b]",
              "tu[b]",
              "ca[bb]age"
            ],
            "correctAnswer": "thum[b]",
            "explanation": "thum[b] /θʌm/ có chữ \"b\" bị câm (đứng sau \"m\"), các từ còn lại ([b]usy, tu[b], ca[bb]age) phát âm là /b/."
          },
          {
            "id": "u3-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "plum[b]er",
              "[b]uilding",
              "ro[b]",
              "su[b]ject"
            ],
            "correctAnswer": "plum[b]er",
            "explanation": "plum[b]er /ˈplʌmə(r)/ có chữ \"b\" bị câm, các từ còn lại ([b]uilding, ro[b], su[b]ject) phát âm là /b/."
          },
          {
            "id": "u3-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[p]sychology",
              "shi[p]",
              "[p]arent",
              "su[pp]ort"
            ],
            "correctAnswer": "[p]sychology",
            "explanation": "[p]sychology /saɪˈkɒlədʒi/ có chữ \"p\" đứng trước \"s\" bị câm, các từ còn lại (shi[p], [p]arent, su[pp]ort) phát âm là /p/."
          },
          {
            "id": "u3-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "jo[b]",
              "we[b]site",
              "[b]eautiful",
              "dou[b]t"
            ],
            "correctAnswer": "dou[b]t",
            "explanation": "dou[b]t /daʊt/ có chữ \"b\" bị câm, các từ còn lại (jo[b], we[b]site, [b]eautiful) phát âm là /b/."
          }
        ]
      },
      {
        "id": "u3-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u3-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "summer",
              "picnic",
              "careful",
              "enjoy"
            ],
            "correctAnswer": "enjoy",
            "explanation": "\"enjoy\" /ɪnˈdʒɔɪ/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (summer, picnic, careful) nhấn âm tiết thứ 1."
          },
          {
            "id": "u3-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "funny",
              "active",
              "clever",
              "relax"
            ],
            "correctAnswer": "relax",
            "explanation": "\"relax\" /rɪˈlæks/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (funny, active, clever) nhấn âm tiết thứ 1."
          },
          {
            "id": "u3-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "patient",
              "honest",
              "sporty",
              "decide"
            ],
            "correctAnswer": "decide",
            "explanation": "\"decide\" /dɪˈsaɪd/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (patient, honest, sporty) nhấn âm tiết thứ 1."
          },
          {
            "id": "u3-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "arrive",
              "biscuits",
              "believe",
              "forget"
            ],
            "correctAnswer": "biscuits",
            "explanation": "\"biscuits\" /ˈbɪskɪts/ (danh từ) có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (arrive, believe, forget) là động từ nhấn âm tiết thứ 2."
          },
          {
            "id": "u3-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "around",
              "sandwich",
              "comic",
              "teamwork"
            ],
            "correctAnswer": "around",
            "explanation": "\"around\" /əˈraʊnd/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (sandwich, comic, teamwork) nhấn âm tiết thứ 1."
          },
          {
            "id": "u3-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "creative",
              "leadership",
              "favourite",
              "confident"
            ],
            "correctAnswer": "creative",
            "explanation": "\"creative\" /kriˈeɪtɪv/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (leadership, favourite, confident) nhấn âm tiết thứ 1."
          },
          {
            "id": "u3-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "remember",
              "important",
              "character",
              "computer"
            ],
            "correctAnswer": "character",
            "explanation": "\"character\" /ˈkærəktə(r)/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (remember, important, computer) nhấn âm tiết thứ 2."
          },
          {
            "id": "u3-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "beautiful",
              "generous",
              "tomorrow",
              "energy"
            ],
            "correctAnswer": "tomorrow",
            "explanation": "\"tomorrow\" /təˈmɒrəʊ/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (beautiful, generous, energy) nhấn âm tiết thứ 1."
          },
          {
            "id": "u3-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "friendly",
              "caring",
              "appear",
              "loving"
            ],
            "correctAnswer": "appear",
            "explanation": "\"appear\" /əˈpɪə(r)/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (friendly, caring, loving) nhấn âm tiết thứ 1."
          },
          {
            "id": "u3-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "agree",
              "shoulder",
              "become",
              "begin"
            ],
            "correctAnswer": "shoulder",
            "explanation": "\"shoulder\" /ˈʃəʊldə(r)/ (danh từ) có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (agree, become, begin) là động từ nhấn âm tiết thứ 2."
          }
        ]
      },
      {
        "id": "u3-ex3",
        "number": 3,
        "title": "Exercise 3: Tongue Twisters & Context Practice (Luyện đọc câu xoắn lưỡi & Bài tập ngữ cảnh)",
        "instruction": "Phần A: Nghe và đọc to 5 câu Tongue Twisters bên dưới. Phần B: Hoàn thành các câu hỏi trắc nghiệm ứng dụng.",
        "questions": [
          {
            "id": "u3-ex3-q1",
            "prompt": "Chọn từ bắt đầu bằng âm /b/ để điền vào câu: \"Elena has ______ hair and big blue eyes.\"",
            "options": [
              "[b]londe",
              "[p]etty",
              "[c]urly",
              "[s]traight"
            ],
            "correctAnswer": "[b]londe",
            "explanation": "blonde /blɒnd/ (tóc vàng hoe) vừa hợp nghĩa vừa bắt đầu bằng âm /b/."
          },
          {
            "id": "u3-ex3-q2",
            "prompt": "Chọn từ bắt đầu bằng âm /p/ để điền vào câu: \"We are having a ______ in the park this Sunday.\"",
            "options": [
              "[p]icnic",
              "[b]iscuit",
              "[b]irthday",
              "[b]all"
            ],
            "correctAnswer": "[p]icnic",
            "explanation": "have a picnic (đi dã ngoại) bắt đầu bằng âm /p/."
          },
          {
            "id": "u3-ex3-q3",
            "prompt": "Trong câu: \"[P]aul is [p]laying the [p]iano at the [b]irthday party\", từ nào có phần gạch chân phát âm là /b/?",
            "options": [
              "[b]irthday",
              "[P]aul",
              "[p]laying",
              "[p]iano"
            ],
            "correctAnswer": "[b]irthday",
            "explanation": "birthday /ˈbɜːθdeɪ/ bắt đầu bằng âm /b/, các từ còn lại bắt đầu bằng /p/."
          },
          {
            "id": "u3-ex3-q4",
            "prompt": "Chọn cặp từ điền vào chỗ trống chứa lần lượt âm /b/ và /p/: \"Please put the ______ in your ______.\"",
            "options": [
              "[b]iscuits – [p]ocket",
              "[p]encils – [b]ag",
              "[b]ooks – [b]ox",
              "[p]ears – [p]late"
            ],
            "correctAnswer": "[b]iscuits – [p]ocket",
            "explanation": "biscuits bắt đầu bằng /b/ và pocket bắt đầu bằng /p/ theo đúng thứ tự yêu cầu."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "Big brown bears pick plums and pears.",
            "ipa": "/bɪɡ braʊn beəz pɪk plʌmz ənd peəz/"
          },
          {
            "sentence": "Paul puts big black books in pink plastic bags.",
            "ipa": "/pɔːl pʊts bɪɡ blæk bʊks ɪn pɪŋk ˈplæstɪk bæɡz/"
          },
          {
            "sentence": "Ben bakes perfect pies for people at the picnic.",
            "ipa": "/ben beɪks ˈpɜːfɪkt paɪz fə ˈpiːpl ət ðə ˈpɪknɪk/"
          },
          {
            "sentence": "Pat's pet pig bites brown biscuits from the bag.",
            "ipa": "/pæts pet pɪɡ baɪts braʊn ˈbɪskɪts frəm ðə bæɡ/"
          },
          {
            "sentence": "The brave boy bought pretty boats and painted them pink.",
            "ipa": "/ðə breɪv bɔɪ bɔːt ˈprɪti bəʊts ənd ˈpeɪntɪd ðəm pɪŋk/"
          }
        ]
      }
    ],
    "book": "Book 1",
    "pages": "92–94",
    "extraNotes": [
      "/p/ thường được viết bằng \"p\" hoặc \"pp\" → picnic, playing, apple",
      "  Lưu ý – Âm câm (Silent letters): chữ \"p\" không được phát âm trong một số từ, ví dụ: cupboard (/ˈkʌbəd/), receipt (/rɪˈsiːt/).",
      "/b/ thường được viết bằng \"b\" hoặc \"bb\" → biscuit, bringing, rabbit",
      "  Lưu ý – Âm câm (Silent letters): chữ \"b\" thường bị câm khi đứng sau \"m\" ở cuối từ, ví dụ: climb (/klaɪm/), comb (/kəʊm/)."
    ]
  },
  {
    "unitId": "unit-4",
    "unitNumber": 4,
    "unitTitle": "My Neighbourhood",
    "topicFocus": "Sounds: /ɪ/ and /iː/",
    "summaryNote": "Phân biệt nguyên âm ngắn /ɪ/ (miệng mở tự nhiên, phát âm cực ngắn và dứt khoát) và nguyên âm dài /iː/ (khóe miệng kéo rộng sang hai bên như đang mỉm cười, ngân dài âm \"i\").",
    "sounds": [
      {
        "symbol": "/ɪ/",
        "name": "Nguyên âm ngắn /ɪ/",
        "howToPronounce": "Miệng hơi mở và môi thả lỏng. Khi phát âm, phần giữa lưỡi hơi nâng lên, đầu lưỡi chạm nhẹ vào răng cửa dưới. Luồng hơi đi ra tự do, không bị cản trở, đồng thời dây thanh quản rung để tạo ra một âm ngắn, dứt khoát.",
        "spellingPatterns": [
          "i (noisy, historic, exciting, village, building)",
          "u (busy)"
        ],
        "examples": [
          {
            "word": "h[i]storic",
            "ipa": "/hɪˈstɒrɪk/",
            "meaningVi": "cổ kính, có tính lịch sử"
          },
          {
            "word": "exc[i]ting",
            "ipa": "/ɪkˈsaɪtɪŋ/",
            "meaningVi": "thú vị, sôi động"
          },
          {
            "word": "v[i]llage",
            "ipa": "/ˈvɪlɪdʒ/",
            "meaningVi": "ngôi làng"
          },
          {
            "word": "bu[i]lding",
            "ipa": "/ˈbɪldɪŋ/",
            "meaningVi": "tòa nhà"
          },
          {
            "word": "b[u]sy",
            "ipa": "/ˈbɪzi/",
            "meaningVi": "bận rộn, nhộn nhịp"
          },
          {
            "word": "c[i]ty",
            "ipa": "/ˈsɪti/",
            "meaningVi": "thành phố"
          }
        ],
        "pronunciationTip": "Phát âm như chữ \"ê\" trong tiếng Việt và pha chút \"i\" nhưng nhanh, gọn và thả lỏng."
      },
      {
        "symbol": "/iː/",
        "name": "Nguyên âm dài /iː/",
        "howToPronounce": "Môi kéo sang hai bên như đang cười và miệng hẹp. Khi phát âm, phần giữa lưỡi nâng cao, đầu lưỡi chạm nhẹ vào răng cửa dưới. Luồng hơi đi ra tự do, không bị cản trở, đồng thời dây thanh quản rung để tạo ra một âm kéo dài, vang.",
        "spellingPatterns": [
          "ea (peaceful, cheap, clean, sea)",
          "ee (street, keep, green)",
          "e (convenient, cathedral)"
        ],
        "examples": [
          {
            "word": "p[ea]ceful",
            "ipa": "/ˈpiːsfl/",
            "meaningVi": "yên bình"
          },
          {
            "word": "ch[ea]p",
            "ipa": "/tʃiːp/",
            "meaningVi": "rẻ"
          },
          {
            "word": "str[ee]t",
            "ipa": "/striːt/",
            "meaningVi": "đường phố"
          },
          {
            "word": "conv[e]nient",
            "ipa": "/kənˈviːniənt/",
            "meaningVi": "thuận tiện"
          },
          {
            "word": "cl[ea]n",
            "ipa": "/kliːn/",
            "meaningVi": "sạch sẽ"
          },
          {
            "word": "cath[e]dral",
            "ipa": "/kəˈθiːdrəl/",
            "meaningVi": "nhà thờ lớn"
          }
        ],
        "pronunciationTip": "Phát âm như chữ \"i\" trong tiếng Việt nhưng căng hơn, mạnh hơn và kéo dài."
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh âm /ɪ/ và /iː/",
    "minimalPairs": [
      {
        "leftWord": "sh[i]p",
        "leftIpa": "/ʃɪp/",
        "leftMeaningVi": "con tàu thủy (âm ngắn /ɪ/)",
        "rightWord": "sh[ee]p",
        "rightIpa": "/ʃiːp/",
        "rightMeaningVi": "con cừu (âm dài /iː/)"
      },
      {
        "leftWord": "l[i]ve",
        "leftIpa": "/lɪv/",
        "leftMeaningVi": "sống, sinh sống",
        "rightWord": "l[ea]ve",
        "rightIpa": "/liːv/",
        "rightMeaningVi": "rời đi"
      },
      {
        "leftWord": "h[i]ll",
        "leftIpa": "/hɪl/",
        "leftMeaningVi": "ngọn đồi",
        "rightWord": "h[ee]l",
        "rightIpa": "/hiːl/",
        "rightMeaningVi": "gót chân"
      },
      {
        "leftWord": "b[i]n",
        "leftIpa": "/bɪn/",
        "leftMeaningVi": "thùng rác",
        "rightWord": "b[ea]n",
        "rightIpa": "/biːn/",
        "rightMeaningVi": "hạt đậu"
      }
    ],
    "exercises": [
      {
        "id": "u4-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u4-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "cl[ea]n",
              "ch[ea]p",
              "p[ea]ceful",
              "h[ea]vy"
            ],
            "correctAnswer": "h[ea]vy",
            "explanation": "h[ea]vy /ˈhevi/ phát âm là /e/, các từ còn lại (cl[ea]n, ch[ea]p, p[ea]ceful) phát âm là /iː/."
          },
          {
            "id": "u4-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "s[i]t",
              "f[i]t",
              "pol[i]ce",
              "l[i]ve"
            ],
            "correctAnswer": "pol[i]ce",
            "explanation": "pol[i]ce /pəˈliːs/ phát âm là nguyên âm dài /iː/, các từ còn lại (s[i]t, f[i]t, l[i]ve) phát âm là nguyên âm ngắn /ɪ/."
          },
          {
            "id": "u4-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "car[ee]r",
              "str[ee]t",
              "tr[ee]",
              "s[ee]"
            ],
            "correctAnswer": "car[ee]r",
            "explanation": "car[ee]r /kəˈrɪə(r)/ phát âm là /ɪə/, các từ còn lại (str[ee]t, tr[ee], s[ee]) phát âm là /iː/."
          },
          {
            "id": "u4-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "bus[y]",
              "sk[y]",
              "friendl[y]",
              "nois[y]"
            ],
            "correctAnswer": "sk[y]",
            "explanation": "sk[y] /skaɪ/ phát âm là /aɪ/, các từ còn lại (bus[y], friendl[y], nois[y]) có đuôi -y phát âm là /i/ (/ɪ/)."
          },
          {
            "id": "u4-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "c[i]ty",
              "p[i]cnic",
              "mach[i]ne",
              "v[i]llage"
            ],
            "correctAnswer": "mach[i]ne",
            "explanation": "mach[i]ne /məˈʃiːn/ phát âm là /iː/, các từ còn lại (c[i]ty, p[i]cnic, v[i]llage) phát âm là /ɪ/."
          },
          {
            "id": "u4-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "th[e]se",
              "b[e]gin",
              "d[e]cide",
              "b[e]fore"
            ],
            "correctAnswer": "th[e]se",
            "explanation": "th[e]se /ðiːz/ phát âm là /iː/, các từ còn lại (b[e]gin, d[e]cide, b[e]fore) phát âm là /ɪ/."
          },
          {
            "id": "u4-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "sh[e]",
              "b[e]",
              "d[e]scribe",
              "w[e]"
            ],
            "correctAnswer": "d[e]scribe",
            "explanation": "d[e]scribe /dɪˈskraɪb/ phát âm là /ɪ/, các từ còn lại (sh[e], b[e], w[e]) phát âm là /iː/."
          },
          {
            "id": "u4-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "m[ea]t",
              "s[ea]t",
              "b[ea]ch",
              "h[ea]d"
            ],
            "correctAnswer": "h[ea]d",
            "explanation": "h[ea]d /hed/ phát âm là /e/, các từ còn lại (m[ea]t, s[ea]t, b[ea]ch) phát âm là /iː/."
          },
          {
            "id": "u4-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "w[i]ndow",
              "l[i]tre",
              "sh[i]p",
              "b[i]n"
            ],
            "correctAnswer": "l[i]tre",
            "explanation": "l[i]tre /ˈliːtə(r)/ phát âm là /iː/, các từ còn lại (w[i]ndow, sh[i]p, b[i]n) phát âm là /ɪ/."
          },
          {
            "id": "u4-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "happ[y]",
              "cr[y]",
              "prett[y]",
              "funn[y]"
            ],
            "correctAnswer": "cr[y]",
            "explanation": "cr[y] /kraɪ/ phát âm là /aɪ/, các từ còn lại (happ[y], prett[y], funn[y]) phát âm là /i/ (/ɪ/)."
          }
        ]
      },
      {
        "id": "u4-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u4-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "modern",
              "crowded",
              "police",
              "noisy"
            ],
            "correctAnswer": "police",
            "explanation": "\"police\" /pəˈliːs/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (modern, crowded, noisy) nhấn âm tiết thứ 1."
          },
          {
            "id": "u4-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "busy",
              "decide",
              "peaceful",
              "boring"
            ],
            "correctAnswer": "decide",
            "explanation": "\"decide\" /dɪˈsaɪd/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (busy, peaceful, boring) nhấn âm tiết thứ 1."
          },
          {
            "id": "u4-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "pretty",
              "quiet",
              "begin",
              "market"
            ],
            "correctAnswer": "begin",
            "explanation": "\"begin\" /bɪˈɡɪn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (pretty, quiet, market) nhấn âm tiết thứ 1."
          },
          {
            "id": "u4-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "temple",
              "building",
              "suburb",
              "dislike"
            ],
            "correctAnswer": "dislike",
            "explanation": "\"dislike\" /dɪsˈlaɪk/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (temple, building, suburb) nhấn âm tiết thứ 1."
          },
          {
            "id": "u4-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "neighbour",
              "partner",
              "centre",
              "avoid"
            ],
            "correctAnswer": "avoid",
            "explanation": "\"avoid\" /əˈvɔɪd/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (neighbour, partner, centre) nhấn âm tiết thứ 1."
          },
          {
            "id": "u4-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "factory",
              "cathedral",
              "museum",
              "pagoda"
            ],
            "correctAnswer": "factory",
            "explanation": "\"factory\" /ˈfæktri/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (cathedral, museum, pagoda) nhấn âm tiết thứ 2."
          },
          {
            "id": "u4-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "exciting",
              "fantastic",
              "beautiful",
              "expensive"
            ],
            "correctAnswer": "beautiful",
            "explanation": "\"beautiful\" /ˈbjuːtɪfl/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (exciting, fantastic, expensive) nhấn âm tiết thứ 2."
          },
          {
            "id": "u4-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "wonderful",
              "important",
              "cathedral",
              "delicious"
            ],
            "correctAnswer": "wonderful",
            "explanation": "\"wonderful\" /ˈwʌndəfl/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (important, cathedral, delicious) nhấn âm tiết thứ 2."
          },
          {
            "id": "u4-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "friendly",
              "correct",
              "repeat",
              "arrive"
            ],
            "correctAnswer": "friendly",
            "explanation": "\"friendly\" /ˈfrendli/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (correct, repeat, arrive) nhấn âm tiết thứ 2."
          },
          {
            "id": "u4-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "cathedral",
              "gallery",
              "suggestion",
              "direction"
            ],
            "correctAnswer": "gallery",
            "explanation": "\"gallery\" /ˈɡæləri/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (cathedral, suggestion, direction) nhấn âm tiết thứ 2."
          }
        ]
      },
      {
        "id": "u4-ex3",
        "number": 3,
        "title": "Exercise 3: Tongue Twisters & Context Practice (Luyện đọc câu xoắn lưỡi & Bài tập ngữ cảnh)",
        "instruction": "Phần A: Nghe và đọc to 5 câu Tongue Twisters bên dưới. Phần B: Hoàn thành các câu hỏi trắc nghiệm ứng dụng.",
        "questions": [
          {
            "id": "u4-ex3-q1",
            "prompt": "Trong câu: \"The str[ee]ts in this c[i]ty are cl[ea]n and p[ea]ceful\", từ nào có phần gạch chân phát âm là /ɪ/?",
            "options": [
              "c[i]ty",
              "str[ee]ts",
              "cl[ea]n",
              "p[ea]ceful"
            ],
            "correctAnswer": "c[i]ty",
            "explanation": "city /ˈsɪti/ chứa âm ngắn /ɪ/, trong khi streets, clean, peaceful đều chứa âm dài /iː/."
          },
          {
            "id": "u4-ex3-q2",
            "prompt": "Chọn cặp từ phân biệt đúng /ɪ/ và /iː/ để điền vào câu: \"Many people ______ in the countryside and ______ for the city.\"",
            "options": [
              "l[i]ve (/ɪ/) – l[ea]ve (/iː/)",
              "l[ea]ve (/iː/) – l[i]ve (/ɪ/)",
              "sh[i]p (/ɪ/) – sh[ee]p (/iː/)",
              "s[i]t (/ɪ/) – s[ea]t (/iː/)"
            ],
            "correctAnswer": "l[i]ve (/ɪ/) – l[ea]ve (/iː/)",
            "explanation": "live /lɪv/ (sinh sống) chứa âm /ɪ/, leave /liːv/ (rời đi) chứa âm /iː/."
          },
          {
            "id": "u4-ex3-q3",
            "prompt": "Từ nào dưới đây có cùng nguyên âm gạch chân với từ \"ch[ea]p\"?",
            "options": [
              "k[ee]p",
              "h[i]ll",
              "sl[i]m",
              "th[i]n"
            ],
            "correctAnswer": "k[ee]p",
            "explanation": "cheap /tʃiːp/ và keep /kiːp/ đều có nguyên âm dài /iː/."
          },
          {
            "id": "u4-ex3-q4",
            "prompt": "Từ nào dưới đây có cùng nguyên âm gạch chân với từ \"bu[i]lding\"?",
            "options": [
              "h[i]storic",
              "s[ea]food",
              "gr[ee]n",
              "str[ee]t"
            ],
            "correctAnswer": "h[i]storic",
            "explanation": "building /ˈbɪldɪŋ/ và historic /hɪˈstɒrɪk/ đều có nguyên âm ngắn /ɪ/."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "Pete eats cheap chips and peaches in the busy city street.",
            "ipa": "/piːt iːts tʃiːp tʃɪps ənd ˈpiːtʃɪz ɪn ðə ˈbɪzi ˈsɪti striːt/"
          },
          {
            "sentence": "Six simple sheep sleep in the green field.",
            "ipa": "/sɪks ˈsɪmpl ʃiːp sliːp ɪn ðə ɡriːn fiːld/"
          },
          {
            "sentence": "Tim sits and sees a slim sheep eating green beans.",
            "ipa": "/tɪm sɪts ənd siːz ə slɪm ʃiːp ˈiːtɪŋ ɡriːn biːnz/"
          },
          {
            "sentence": "Bill feeds the clean pig with big sweet peaches.",
            "ipa": "/bɪl fiːdz ðə kliːn pɪɡ wɪð bɪɡ swiːt ˈpiːtʃɪz/"
          },
          {
            "sentence": "A busy queen cleans the green clinic quickly.",
            "ipa": "/ə ˈbɪzi kwiːn kliːnz ðə ɡriːn ˈklɪnɪk ˈkwɪkli/"
          }
        ]
      }
    ],
    "book": "Book 1",
    "pages": "131–133",
    "extraNotes": [
      "/ɪ/ thường được viết bằng:",
      "  • Chữ \"i\" trong các từ ngắn → sit, bin, fit",
      "  • Chữ \"y\" ở cuối các từ có 2 âm tiết trở lên → noisy, friendly, busy",
      "  • Tiền tố \"ex-\" → exciting, expensive",
      "/iː/ thường được viết bằng:",
      "  • Chữ \"ea\" → clean, cheap, peaceful",
      "  • Chữ \"ee\" → street, see, tree",
      "  • Chữ \"ie\" hoặc \"ei\" → convenient, believe, receive"
    ]
  },
  {
    "unitId": "unit-5",
    "unitNumber": 5,
    "unitTitle": "Natural Wonders of Viet Nam",
    "topicFocus": "Sounds: /t/ and /d/",
    "summaryNote": "Phân biệt hai phụ âm đầu lưỡi - lợi: /t/ (vô thanh, bật hơi nhẹ, dây thanh quản không rung) và /d/ (hữu thanh, dây thanh quản rung rõ). Chú ý trường hợp chữ \"s\" câm trong \"island\" /ˈaɪlənd/.",
    "sounds": [
      {
        "symbol": "/t/",
        "name": "Phụ âm vô thanh /t/",
        "howToPronounce": "Đặt đầu lưỡi ở phần lợi phía sau răng cửa hàm trên để chặn luồng hơi lại. Sau đó, bật lưỡi ra thật nhanh để luồng hơi thoát ra ngoài đột ngột tạo thành âm bật hơi, đồng thời dây thanh quản không rung.",
        "spellingPatterns": [
          "t (tent, mountain, waterfall, desert, plaster, forest, boat)"
        ],
        "examples": [
          {
            "word": "[t]en[t]",
            "ipa": "/tent/",
            "meaningVi": "cái lều trại"
          },
          {
            "word": "moun[t]ain",
            "ipa": "/ˈmaʊntən/",
            "meaningVi": "ngọn núi"
          },
          {
            "word": "wa[t]erfall",
            "ipa": "/ˈwɔːtəfɔːl/",
            "meaningVi": "thác nước"
          },
          {
            "word": "deser[t]",
            "ipa": "/ˈdezət/",
            "meaningVi": "sa mạc"
          },
          {
            "word": "plas[t]er",
            "ipa": "/ˈplɑːstə(r)/",
            "meaningVi": "băng cá nhân"
          },
          {
            "word": "fores[t]",
            "ipa": "/ˈfɒrɪst/",
            "meaningVi": "khu rừng"
          }
        ],
        "pronunciationTip": "Gần giống âm \"t\" trong tiếng Việt nhưng bật hơi mạnh hơn từ đầu lưỡi, không rung dây thanh quản."
      },
      {
        "symbol": "/d/",
        "name": "Phụ âm hữu thanh /d/",
        "howToPronounce": "Vị trí lưỡi và miệng đặt tương tự như khi phát âm /t/. Tuy nhiên, thay vì bật hơi mạnh, hãy làm rung dây thanh quản khi hơi thoát ra để tạo thành âm rung.",
        "spellingPatterns": [
          "d (wonder, island, guide, deep, holiday, world)"
        ],
        "examples": [
          {
            "word": "won[d]er",
            "ipa": "/ˈwʌndə(r)/",
            "meaningVi": "kì quan"
          },
          {
            "word": "islan[d]",
            "ipa": "/ˈaɪlənd/",
            "meaningVi": "hòn đảo (chữ s câm)"
          },
          {
            "word": "gui[d]e",
            "ipa": "/ɡaɪd/",
            "meaningVi": "hướng dẫn viên"
          },
          {
            "word": "[d]eep",
            "ipa": "/diːp/",
            "meaningVi": "sâu"
          },
          {
            "word": "holi[d]ay",
            "ipa": "/ˈhɒlədeɪ/",
            "meaningVi": "kì nghỉ"
          },
          {
            "word": "worl[d]",
            "ipa": "/wɜːld/",
            "meaningVi": "thế giới"
          }
        ],
        "pronunciationTip": "Gần giống âm \"đ\" trong tiếng Việt, có rung dây thanh quản."
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh âm /t/ và /d/",
    "minimalPairs": [
      {
        "leftWord": "[t]own",
        "leftIpa": "/taʊn/",
        "leftMeaningVi": "thị trấn",
        "rightWord": "[d]own",
        "rightIpa": "/daʊn/",
        "rightMeaningVi": "bên dưới"
      },
      {
        "leftWord": "[t]ent",
        "leftIpa": "/tent/",
        "leftMeaningVi": "cái lều",
        "rightWord": "[d]ent",
        "rightIpa": "/dent/",
        "rightMeaningVi": "vết lõm"
      },
      {
        "leftWord": "bo[at]",
        "leftIpa": "/bəʊt/",
        "leftMeaningVi": "con thuyền (kết thúc bằng /t/)",
        "rightWord": "roa[d]",
        "rightIpa": "/rəʊd/",
        "rightMeaningVi": "con đường (kết thúc bằng /d/)"
      },
      {
        "leftWord": "hear[t]",
        "leftIpa": "/hɑːt/",
        "leftMeaningVi": "trái tim (/t/)",
        "rightWord": "har[d]",
        "rightIpa": "/hɑːd/",
        "rightMeaningVi": "chăm chỉ, cứng (/d/)"
      }
    ],
    "exercises": [
      {
        "id": "u5-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u5-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "Chris[t]mas",
              "deser[t]",
              "lis[t]en",
              "cas[t]le"
            ],
            "correctAnswer": "deser[t]",
            "explanation": "deser[t] /ˈdezət/ phát âm rõ âm cuối /t/, các từ còn lại (Chris[t]mas, lis[t]en, cas[t]le) có chữ \"t\" bị câm."
          },
          {
            "id": "u5-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "holi[d]ay",
              "han[d]some",
              "un[d]er",
              "won[d]er"
            ],
            "correctAnswer": "han[d]some",
            "explanation": "han[d]some /ˈhænsəm/ có chữ \"d\" bị câm, các từ còn lại (holi[d]ay, un[d]er, won[d]er) phát âm rõ âm /d/."
          },
          {
            "id": "u5-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ques[t]ion",
              "for[t]une",
              "fores[t]",
              "na[t]ural"
            ],
            "correctAnswer": "fores[t]",
            "explanation": "fores[t] /ˈfɒrɪst/ phát âm là /t/, các từ còn lại (ques[t]ion, for[t]une, na[t]ural) có chữ \"t\" phát âm là /tʃ/."
          },
          {
            "id": "u5-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "educa[t]ion",
              "direc[t]ion",
              "tradi[t]ion",
              "ticke[t]"
            ],
            "correctAnswer": "ticke[t]",
            "explanation": "ticke[t] /ˈtɪkɪt/ phát âm là /t/, các từ còn lại (educa[t]ion, direc[t]ion, tradi[t]ion) có \"ti\" phát âm là /ʃ/."
          },
          {
            "id": "u5-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "gar[d]en",
              "rea[d]y",
              "e[d]ucation",
              "win[d]y"
            ],
            "correctAnswer": "e[d]ucation",
            "explanation": "e[d]ucation /ˌedʒuˈkeɪʃn/ có chữ \"d\" phát âm là /dʒ/, các từ còn lại (gar[d]en, rea[d]y, win[d]y) phát âm là /d/."
          },
          {
            "id": "u5-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "cap[t]ure",
              "pic[t]ure",
              "moun[t]ain",
              "na[t]ure"
            ],
            "correctAnswer": "moun[t]ain",
            "explanation": "moun[t]ain /ˈmaʊntən/ phát âm là /t/, các từ còn lại (cap[t]ure, pic[t]ure, na[t]ure) có \"tu\" phát âm là /tʃ/."
          },
          {
            "id": "u5-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ac[t]ivity",
              "sta[t]ion",
              "prepara[t]ion",
              "na[t]ion"
            ],
            "correctAnswer": "ac[t]ivity",
            "explanation": "ac[t]ivity /ækˈtɪvəti/ phát âm là /t/, các từ còn lại (sta[t]ion, prepara[t]ion, na[t]ion) có \"ti\" phát âm là /ʃ/."
          },
          {
            "id": "u5-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "rus[t]le",
              "fas[t]en",
              "whis[t]le",
              "plas[t]er"
            ],
            "correctAnswer": "plas[t]er",
            "explanation": "plas[t]er /ˈplɑːstə(r)/ phát âm rõ âm /t/, các từ còn lại (rus[t]le, fas[t]en, whis[t]le) có chữ \"t\" bị câm."
          },
          {
            "id": "u5-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "fin[d]",
              "frien[d]",
              "sen[d]",
              "We[d]nesday"
            ],
            "correctAnswer": "We[d]nesday",
            "explanation": "We[d]nesday /ˈwenzdeɪ/ có chữ \"d\" đầu tiên bị câm, các từ còn lại (fin[d], frien[d], sen[d]) phát âm rõ âm /d/."
          },
          {
            "id": "u5-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "gui[d]e",
              "sol[d]ier",
              "in[d]ividual",
              "gra[d]uate"
            ],
            "correctAnswer": "gui[d]e",
            "explanation": "gui[d]e /ɡaɪd/ có chữ \"d\" phát âm là /d/, trong khi sol[d]ier /ˈsəʊldʒə/, in[d]ividual (hoặc proce[d]ure) và gra[d]uate /ˈɡrædʒuət/ có âm /dʒ/."
          }
        ]
      },
      {
        "id": "u5-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u5-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "island",
              "wonder",
              "explore",
              "desert"
            ],
            "correctAnswer": "explore",
            "explanation": "\"explore\" /ɪkˈsplɔː(r)/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (island, wonder, desert) nhấn âm tiết thứ 1."
          },
          {
            "id": "u5-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "plaster",
              "prepare",
              "compass",
              "mountain"
            ],
            "correctAnswer": "prepare",
            "explanation": "\"prepare\" /prɪˈpeə(r)/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (plaster, compass, mountain) nhấn âm tiết thứ 1."
          },
          {
            "id": "u5-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "valley",
              "river",
              "enjoy",
              "forest"
            ],
            "correctAnswer": "enjoy",
            "explanation": "\"enjoy\" /ɪnˈdʒɔɪ/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (valley, river, forest) nhấn âm tiết thứ 1."
          },
          {
            "id": "u5-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "popular",
              "wonderful",
              "natural",
              "exciting"
            ],
            "correctAnswer": "exciting",
            "explanation": "\"exciting\" /ɪkˈsaɪtɪŋ/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (popular, wonderful, natural) nhấn âm tiết thứ 1."
          },
          {
            "id": "u5-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "important",
              "attractive",
              "amazing",
              "beautiful"
            ],
            "correctAnswer": "beautiful",
            "explanation": "\"beautiful\" /ˈbjuːtɪfl/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (important, attractive, amazing) nhấn âm tiết thứ 2."
          },
          {
            "id": "u5-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "prevent",
              "visit",
              "protect",
              "arrive"
            ],
            "correctAnswer": "visit",
            "explanation": "\"visit\" /ˈvɪzɪt/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (prevent, protect, arrive) nhấn âm tiết thứ 2."
          },
          {
            "id": "u5-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "gallery",
              "monument",
              "scenery",
              "cathedral"
            ],
            "correctAnswer": "cathedral",
            "explanation": "\"cathedral\" /kəˈθiːdrəl/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (gallery, monument, scenery) nhấn âm tiết thứ 1."
          },
          {
            "id": "u5-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "special",
              "active",
              "correct",
              "friendly"
            ],
            "correctAnswer": "correct",
            "explanation": "\"correct\" /kəˈrekt/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (special, active, friendly) nhấn âm tiết thứ 1."
          },
          {
            "id": "u5-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "expensive",
              "dangerous",
              "waterfall",
              "family"
            ],
            "correctAnswer": "expensive",
            "explanation": "\"expensive\" /ɪkˈspensɪv/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (dangerous, waterfall, family) nhấn âm tiết thứ 1."
          },
          {
            "id": "u5-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "alone",
              "blanket",
              "scissors",
              "backpack"
            ],
            "correctAnswer": "alone",
            "explanation": "\"alone\" /əˈləʊn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (blanket, scissors, backpack) nhấn âm tiết thứ 1."
          }
        ]
      },
      {
        "id": "u5-ex3",
        "number": 3,
        "title": "Exercise 3: Tongue Twisters & Context Practice (Luyện đọc câu xoắn lưỡi & Bài tập ngữ cảnh)",
        "instruction": "Phần A: Nghe và đọc to 5 câu Tongue Twisters bên dưới. Phần B: Hoàn thành các câu hỏi trắc nghiệm ứng dụng.",
        "questions": [
          {
            "id": "u5-ex3-q1",
            "prompt": "Trong câu: \"The [t]our gui[d]e led us to a [d]eep caves on the islan[d]\", từ nào chứa âm /t/?",
            "options": [
              "[t]our",
              "gui[d]e",
              "[d]eep",
              "islan[d]"
            ],
            "correctAnswer": "[t]our",
            "explanation": "tour /tʊə(r)/ bắt đầu bằng âm /t/; còn guide, deep, island đều chứa âm /d/."
          },
          {
            "id": "u5-ex3-q2",
            "prompt": "Chọn từ kết thúc bằng âm /t/ để điền vào câu: \"Don't forget to bring a sleeping bag and a ______ when camping in the forest.\"",
            "options": [
              "[t]en[t]",
              "gui[d]e",
              "islan[d]",
              "c[a]ve"
            ],
            "correctAnswer": "[t]en[t]",
            "explanation": "tent /tent/ (cái lều) vừa bắt đầu vừa kết thúc bằng âm /t/ và hợp nghĩa đi cắm trại."
          },
          {
            "id": "u5-ex3-q3",
            "prompt": "Trong từ nào sau đây cả chữ cái đầu và chữ cái cuối đều phát âm là /d/?",
            "options": [
              "[d]ecide[d]",
              "[t]en[t]",
              "[d]eser[t]",
              "[t]ire[d]"
            ],
            "correctAnswer": "[d]ecide[d]",
            "explanation": "decided /dɪˈsaɪdɪd/ bắt đầu và kết thúc bằng âm /d/."
          },
          {
            "id": "u5-ex3-q4",
            "prompt": "Cặp từ nào dưới đây là cặp tối thiểu (minimal pair) chỉ khác nhau ở âm đầu /t/ và /d/?",
            "options": [
              "[t]own – [d]own",
              "[t]ent – [b]ed",
              "moun[t]ain – islan[d]",
              "fores[t] – won[d]er"
            ],
            "correctAnswer": "[t]own – [d]own",
            "explanation": "town /taʊn/ và down /daʊn/ giống hệt phần vần /aʊn/, chỉ khác âm đầu /t/ và /d/."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "Two tiny turtles took ten days to dig deep down.",
            "ipa": "/tuː ˈtaɪni ˈtɜːtlz tʊk ten deɪz tə dɪɡ diːp daʊn/"
          },
          {
            "sentence": "David drove a dirty truck down the dusty road on Tuesday.",
            "ipa": "/ˈdeɪvɪd drəʊv ə ˈdɜːti trʌk daʊn ðə ˈdʌsti rəʊd ɒn ˈtjuːzdeɪ/"
          },
          {
            "sentence": "Tom told Dan to tidy the ten dirty desks today.",
            "ipa": "/tɒm təʊld dæn tə ˈtaɪdi ðə ten ˈdɜːti desks təˈdeɪ/"
          },
          {
            "sentence": "Ten tall doctors travel together to the drumming beat.",
            "ipa": "/ten tɔːl ˈdɒktəz ˈtrævl təˈɡeðə tə ðə ˈdrʌmɪŋ biːt/"
          },
          {
            "sentence": "Diana tries to tie a tight knot on the drafty deck.",
            "ipa": "/daɪˈænə traɪz tə taɪ ə taɪt nɒt ɒn ðə ˈdrɑːfti dek/"
          }
        ]
      }
    ],
    "book": "Book 1",
    "pages": "172–175",
    "extraNotes": [
      "/t/ thường được viết bằng chữ \"t\" hoặc \"tt\" → want, boat, cat, butter",
      "  Lưu ý – Âm câm (Silent letters): chữ \"t\" không được phát âm trong một số từ, ví dụ: listen (/ˈlɪsn/), castle (/ˈkɑːsl/), often (/ˈɒfn/).",
      "/d/ thường được viết bằng chữ \"d\" hoặc \"dd\" → do, head, need, ladder",
      "  Lưu ý – Âm câm (Silent letters): chữ \"d\" không được phát âm trong một số từ quen thuộc, ví dụ: handsome (/ˈhænsəm/), Wednesday (/ˈwenzdeɪ/), sandwich (/ˈsænwɪdʒ/).",
      "Hiện tượng biến âm trong giao tiếp thực tế:",
      "  • Flap T (âm /t/ lướt): Trong tiếng Anh – Mỹ, khi âm /t/ đứng giữa hai nguyên âm (hoặc sau âm /r/ và trước một nguyên âm) và không nằm trong âm tiết được nhấn trọng âm, nó thường được phát âm nhanh và nhẹ gần giống âm /d/ (ví dụ: butter, water, city).",
      "  • Glottal Stop T (âm tắc thanh hầu): Khi âm /t/ đứng cuối từ (đặc biệt khi từ tiếp theo bắt đầu bằng một phụ âm) hoặc đứng trước âm /n/ (ví dụ: button, kitten, mountain), luồng hơi có thể bị chặn lại ở cổ họng mà không cần bật mạnh hơi ra ngoài thành âm /t/ rõ ràng.",
      "  Lưu ý: Đây là các cách phát âm biến đổi khi giao tiếp nhanh và tự nhiên (connected speech). Khi làm các bài tập phát âm trên giấy, các em không áp dụng quy tắc biến âm này mà vẫn dùng âm bật hơi /t/ chuẩn."
    ]
  },
  {
    "unitId": "unit-6",
    "unitNumber": 6,
    "unitTitle": "Our Tet Holiday",
    "topicFocus": "Sounds: /s/ and /ʃ/",
    "summaryNote": "Phân biệt âm xát lợi /s/ (\"x nhẹ\", môi tự nhiên, đầu lưỡi gần răng cửa) và âm xát vòm-lợi /ʃ/ (\"s nặng\", chu môi tròn về phía trước, nâng lưỡi cao hơn).",
    "sounds": [
      {
        "symbol": "/s/",
        "name": "Phụ âm /s/ (xát nhẹ)",
        "howToPronounce": "Đặt đầu lưỡi nhẹ hướng về phía chân răng hàm trên (phần lợi) nhưng không chạm vào. Khép hai hàm răng lại gần nhau. Đẩy luồng hơi thoát ra ngoài qua khe hở hẹp giữa đầu lưỡi và chân răng để tạo ra tiếng rít nhẹ, đồng thời dây thanh quản không rung.",
        "spellingPatterns": [
          "s (spring, smile, summer, blossom)",
          "c (celebrate, city, rice)"
        ],
        "examples": [
          {
            "word": "[s]pring",
            "ipa": "/sprɪŋ/",
            "meaningVi": "mùa xuân"
          },
          {
            "word": "[s]mile",
            "ipa": "/smaɪl/",
            "meaningVi": "mỉm cười"
          },
          {
            "word": "[c]elebrate",
            "ipa": "/ˈselɪbreɪt/",
            "meaningVi": "kỷ niệm, ăn mừng"
          },
          {
            "word": "blo[ss]om",
            "ipa": "/ˈblɒsəm/",
            "meaningVi": "hoa (đào, mai)"
          },
          {
            "word": "[s]weet",
            "ipa": "/swiːt/",
            "meaningVi": "ngọt ngào, kẹo"
          },
          {
            "word": "ri[c]e",
            "ipa": "/raɪs/",
            "meaningVi": "gạo, cơm"
          }
        ],
        "pronunciationTip": "Gần giống âm \"x\" trong tiếng Việt khi phát âm nhẹ nhàng, thả lỏng môi và không rung dây thanh quản."
      },
      {
        "symbol": "/ʃ/",
        "name": "Phụ âm /ʃ/ (s nặng - chu môi)",
        "howToPronounce": "Đặt lưỡi lùi về phía sau hơn một chút so với khi phát âm /s/ (phần sau của lợi). Cong phần giữa lưỡi lên hướng về vòm họng. Tròn môi và đưa môi về phía trước. Đẩy luồng hơi mạnh thoát ra ngoài qua khe hở giữa lưỡi và vòm họng để tạo ra tiếng xì mạnh, đồng thời dây thanh quản không rung.",
        "spellingPatterns": [
          "sh (shopping, shine, wish, should, she, rubbish)",
          "c/ci (special)",
          "s (sure, sugar)"
        ],
        "examples": [
          {
            "word": "[sh]opping",
            "ipa": "/ˈʃɒpɪŋ/",
            "meaningVi": "mua sắm"
          },
          {
            "word": "[sh]ine",
            "ipa": "/ʃaɪn/",
            "meaningVi": "tỏa sáng"
          },
          {
            "word": "wi[sh]",
            "ipa": "/wɪʃ/",
            "meaningVi": "điều ước, chúc"
          },
          {
            "word": "[sh]ould",
            "ipa": "/ʃʊd/",
            "meaningVi": "nên"
          },
          {
            "word": "spe[ci]al",
            "ipa": "/ˈspeʃl/",
            "meaningVi": "đặc biệt"
          },
          {
            "word": "[s]ure",
            "ipa": "/ʃʊə(r)/",
            "meaningVi": "chắc chắn"
          }
        ],
        "pronunciationTip": "Gần giống âm \"s\" (s nặng, uốn lưỡi) trong tiếng Việt nhưng tròn môi (chu môi) và đẩy hơi xì mạnh ra ngoài, không rung dây thanh quản."
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh âm /s/ và /ʃ/",
    "minimalPairs": [
      {
        "leftWord": "[s]ee",
        "leftIpa": "/siː/",
        "leftMeaningVi": "nhìn thấy",
        "rightWord": "[sh]e",
        "rightIpa": "/ʃiː/",
        "rightMeaningVi": "cô ấy"
      },
      {
        "leftWord": "[s]ell",
        "leftIpa": "/sel/",
        "leftMeaningVi": "bán",
        "rightWord": "[sh]ell",
        "rightIpa": "/ʃel/",
        "rightMeaningVi": "vỏ sò"
      },
      {
        "leftWord": "[s]ock",
        "leftIpa": "/sɒk/",
        "leftMeaningVi": "chiếc tất",
        "rightWord": "[sh]ock",
        "rightIpa": "/ʃɒk/",
        "rightMeaningVi": "cú sốc"
      },
      {
        "leftWord": "[s]ave",
        "leftIpa": "/seɪv/",
        "leftMeaningVi": "tiết kiệm, cứu",
        "rightWord": "[sh]ave",
        "rightIpa": "/ʃeɪv/",
        "rightMeaningVi": "cạo râu"
      }
    ],
    "exercises": [
      {
        "id": "u6-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u6-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[s]ure",
              "[s]uper",
              "[s]unny",
              "[s]ummer"
            ],
            "correctAnswer": "[s]ure",
            "explanation": "[s]ure /ʃɔː(r)/ phát âm là /ʃ/, các từ còn lại ([s]uper, [s]unny, [s]ummer) phát âm là /s/."
          },
          {
            "id": "u6-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[s]urvive",
              "[s]upport",
              "[s]ugar",
              "[s]uit"
            ],
            "correctAnswer": "[s]ugar",
            "explanation": "[s]ugar /ˈʃʊɡə(r)/ phát âm là /ʃ/, các từ còn lại ([s]urvive, [s]upport, [s]uit) phát âm là /s/."
          },
          {
            "id": "u6-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ri[c]e",
              "fa[c]e",
              "pla[c]e",
              "o[c]ean"
            ],
            "correctAnswer": "o[c]ean",
            "explanation": "o[c]ean /ˈəʊʃn/ có chữ \"c\" phát âm là /ʃ/, các từ còn lại (ri[c]e, fa[c]e, pla[c]e) phát âm là /s/."
          },
          {
            "id": "u6-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "le[ss]on",
              "pa[ss]enger",
              "ti[ss]ue",
              "cla[ss]ic"
            ],
            "correctAnswer": "ti[ss]ue",
            "explanation": "ti[ss]ue /ˈtɪʃuː/ có \"ss\" phát âm là /ʃ/, các từ còn lại (le[ss]on, pa[ss]enger, cla[ss]ic) phát âm là /s/."
          },
          {
            "id": "u6-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "de[ci]de",
              "so[ci]al",
              "spe[ci]al",
              "offi[ci]al"
            ],
            "correctAnswer": "de[ci]de",
            "explanation": "de[ci]de /dɪˈsaɪd/ có \"ci\" phát âm là /saɪ/ (âm /s/), các từ còn lại (so[ci]al, spe[ci]al, offi[ci]al) có \"ci\" phát âm là /ʃ/."
          },
          {
            "id": "u6-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ma[ns]ion",
              "pe[ns]ion",
              "te[ns]ion",
              "se[ns]e"
            ],
            "correctAnswer": "se[ns]e",
            "explanation": "se[ns]e /sens/ phát âm là /ns/, các từ còn lại (ma[ns]ion, pe[ns]ion, te[ns]ion) có \"si\" phát âm là /ʃ/."
          },
          {
            "id": "u6-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "sta[ti]on",
              "ques[ti]on",
              "na[ti]on",
              "tradi[ti]on"
            ],
            "correctAnswer": "ques[ti]on",
            "explanation": "ques[ti]on /ˈkwestʃən/ có \"ti\" phát âm là /tʃ/, các từ còn lại (sta[ti]on, na[ti]on, tradi[ti]on) phát âm là /ʃ/."
          },
          {
            "id": "u6-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "expre[ss]",
              "cla[ss]",
              "pre[ss]ure",
              "profe[ss]or"
            ],
            "correctAnswer": "pre[ss]ure",
            "explanation": "pre[ss]ure /ˈpreʃə(r)/ có \"ss\" phát âm là /ʃ/, các từ còn lại (expre[ss], cla[ss], profe[ss]or) phát âm là /s/."
          },
          {
            "id": "u6-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "re[s]cue",
              "i[s]land",
              "fo[s]sil",
              "fe[s]tival"
            ],
            "correctAnswer": "i[s]land",
            "explanation": "i[s]land /ˈaɪlənd/ có chữ \"s\" bị câm, các từ còn lại (re[s]cue, fo[s]sil, fe[s]tival) phát âm là /s/."
          },
          {
            "id": "u6-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[Ch]ristmas",
              "[ch]ef",
              "[ch]emistry",
              "[ch]aracter"
            ],
            "correctAnswer": "[ch]ef",
            "explanation": "[ch]ef /ʃef/ (từ mượn tiếng Pháp) có \"ch\" phát âm là /ʃ/, các từ còn lại ([Ch]ristmas, [ch]emistry, [ch]aracter) phát âm là /k/."
          }
        ]
      },
      {
        "id": "u6-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u6-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "special",
              "prepare",
              "blossom",
              "cleaner"
            ],
            "correctAnswer": "prepare",
            "explanation": "\"prepare\" /prɪˈpeə(r)/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (special, blossom, cleaner) nhấn âm tiết thứ 1."
          },
          {
            "id": "u6-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "housework",
              "clothing",
              "custom",
              "behave"
            ],
            "correctAnswer": "behave",
            "explanation": "\"behave\" /bɪˈheɪv/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (housework, clothing, custom) nhấn âm tiết thứ 1."
          },
          {
            "id": "u6-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "invite",
              "advice",
              "balloon",
              "practice"
            ],
            "correctAnswer": "practice",
            "explanation": "\"practice\" /ˈpræktɪs/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (invite, advice, balloon) nhấn âm tiết thứ 2."
          },
          {
            "id": "u6-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "furniture",
              "celebrate",
              "tradition",
              "holiday"
            ],
            "correctAnswer": "tradition",
            "explanation": "\"tradition\" /trəˈdɪʃn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (furniture, celebrate, holiday) nhấn âm tiết thứ 1."
          },
          {
            "id": "u6-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "calendar",
              "remember",
              "relative",
              "gathering"
            ],
            "correctAnswer": "remember",
            "explanation": "\"remember\" /rɪˈmembə(r)/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (calendar, relative, gathering) nhấn âm tiết thứ 1."
          },
          {
            "id": "u6-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "friendship",
              "shopping",
              "agree",
              "music"
            ],
            "correctAnswer": "agree",
            "explanation": "\"agree\" /əˈɡriː/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (friendship, shopping, music) nhấn âm tiết thứ 1."
          },
          {
            "id": "u6-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "lucky",
              "winter",
              "colour",
              "begin"
            ],
            "correctAnswer": "begin",
            "explanation": "\"begin\" /bɪˈɡɪn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (lucky, winter, colour) nhấn âm tiết thứ 1."
          },
          {
            "id": "u6-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "exciting",
              "colourful",
              "beautiful",
              "yesterday"
            ],
            "correctAnswer": "exciting",
            "explanation": "\"exciting\" /ɪkˈsaɪtɪŋ/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (colourful, beautiful, yesterday) nhấn âm tiết thứ 1."
          },
          {
            "id": "u6-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "welcome",
              "village",
              "around",
              "market"
            ],
            "correctAnswer": "around",
            "explanation": "\"around\" /əˈraʊnd/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (welcome, village, market) nhấn âm tiết thứ 1."
          },
          {
            "id": "u6-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "delicious",
              "decorate",
              "everyone",
              "history"
            ],
            "correctAnswer": "delicious",
            "explanation": "\"delicious\" /dɪˈlɪʃəs/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (decorate, everyone, history) nhấn âm tiết thứ 1."
          }
        ]
      },
      {
        "id": "u6-ex3",
        "number": 3,
        "title": "Exercise 3: Tongue Twisters & Context Practice (Luyện đọc câu xoắn lưỡi & Bài tập ngữ cảnh)",
        "instruction": "Phần A: Nghe và đọc to 5 câu Tongue Twisters bên dưới. Phần B: Hoàn thành các câu hỏi trắc nghiệm ứng dụng.",
        "questions": [
          {
            "id": "u6-ex3-q1",
            "prompt": "Trong câu: \"[Sh]e goes [sh]opping for [s]weet peach blo[ss]oms in the [s]pring\", có bao nhiêu từ được đánh dấu chứa âm /ʃ/?",
            "options": [
              "2 từ ([Sh]e, [sh]opping)",
              "3 từ ([s]weet, blo[ss]oms, [s]pring)",
              "1 từ ([sh]opping)",
              "4 từ"
            ],
            "correctAnswer": "2 từ ([Sh]e, [sh]opping)",
            "explanation": "She /ʃiː/ và shopping /ˈʃɒpɪŋ/ chứa âm /ʃ/; còn sweet, blossoms, spring chứa âm /s/."
          },
          {
            "id": "u6-ex3-q2",
            "prompt": "Chọn từ chứa âm /ʃ/ để hoàn thành câu chúc Tết: \"We ______ you a Happy New Year!\"",
            "options": [
              "wi[sh]",
              "[s]ay",
              "[s]ing",
              "[s]end"
            ],
            "correctAnswer": "wi[sh]",
            "explanation": "wish /wɪʃ/ vừa chứa âm cuối /ʃ/ vừa đúng mẫu câu \"We wish you a Happy New Year!\"."
          },
          {
            "id": "u6-ex3-q3",
            "prompt": "Từ nào dưới đây có cùng phụ âm đầu với từ \"[sh]ould\"?",
            "options": [
              "[sh]ine",
              "[s]mile",
              "[s]ummer",
              "[s]ister"
            ],
            "correctAnswer": "[sh]ine",
            "explanation": "should /ʃʊd/ và shine /ʃaɪn/ đều bắt đầu bằng âm /ʃ/."
          },
          {
            "id": "u6-ex3-q4",
            "prompt": "Từ nào dưới đây có cùng phụ âm đầu với từ \"[s]pring\"?",
            "options": [
              "[s]mile",
              "[sh]op",
              "[s]ure",
              "[sh]out"
            ],
            "correctAnswer": "[s]mile",
            "explanation": "spring /sprɪŋ/ và smile /smaɪl/ đều bắt đầu bằng âm /s/."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "She sells special sweets and spring seeds at the shop.",
            "ipa": "/ʃiː selz ˈspeʃl swiːts ənd sprɪŋ siːdz ət ðə ʃɒp/"
          },
          {
            "sentence": "Seven silent sheep sleep slowly in the shade.",
            "ipa": "/ˈsevn ˈsaɪlənt ʃiːp sliːp ˈsləʊli ɪn ðə ʃeɪd/"
          },
          {
            "sentence": "Phong should show his sister some shiny silver shoes.",
            "ipa": "/fɒŋ ʃʊd ʃəʊ hɪz ˈsɪstə səm ˈʃaɪni ˈsɪlvə ʃuːz/"
          },
          {
            "sentence": "Sally shares special shellfish she found by the sea.",
            "ipa": "/ˈsæli ʃeəz ˈspeʃl ˈʃelfɪʃ ʃi faʊnd baɪ ðə siː/"
          },
          {
            "sentence": "Shy students should sing in spring with a smile.",
            "ipa": "/ʃaɪ ˈstjuːdnts ʃʊd sɪŋ ɪn sprɪŋ wɪð ə smaɪl/"
          }
        ]
      }
    ],
    "book": "Book 1",
    "pages": "211–214",
    "extraNotes": [
      "/s/ thường được viết bằng:",
      "  • Chữ \"s\" hoặc \"ss\" → spring (/sprɪŋ/), smile (/smaɪl/), dress (/dres/)",
      "  • Chữ \"c\" (khi đứng trước e, i, y) → celebrate (/ˈselɪbreɪt/), rice (/raɪs/), city (/ˈsɪti/)",
      "/ʃ/ thường được viết bằng:",
      "  • Chữ \"sh\" → shopping (/ˈʃɒpɪŋ/), wish (/wɪʃ/), shine (/ʃaɪn/)",
      "  • Chữ \"t\" hoặc \"c\" (trong các đuôi -tion, -cial, -cious) → special (/ˈspeʃl/), traditional (/trəˈdɪʃənl/), delicious (/dɪˈlɪʃəs/)",
      "  • Chữ \"ch\" (trong một số từ mượn từ tiếng Pháp) → chef (/ʃef/), machine (/məˈʃiːn/)",
      "  • Chữ \"su\" (trong một số trường hợp đặc biệt) → sugar (/ˈʃʊɡə/), sure (/ʃɔː/), pressure (/ˈpreʃə/)",
      "Cẩn thận với âm \"s\" câm (Silent \"s\"): một số từ tuy có chữ cái \"s\" nhưng chữ \"s\" này hoàn toàn là âm câm:",
      "  • island (/ˈaɪlənd/ – hòn đảo)",
      "  • aisle (/aɪl/ – lối đi giữa các hàng ghế)",
      "  • debris (/ˈdebriː/ – mảnh vụn, mảnh vỡ)"
    ]
  },
  {
    "unitId": "unit-7",
    "unitNumber": 7,
    "unitTitle": "Television",
    "topicFocus": "Sounds: /θ/ and /ð/",
    "summaryNote": "Cả hai âm /θ/ và /ð/ đều được viết bằng chữ \"th\" và đều đặt đầu lưỡi hơi thè nhẹ ra giữa hai hàm răng. Điểm khác nhau: /θ/ là âm vô thanh (chỉ đẩy hơi, không rung cổ họng), còn /ð/ là âm hữu thanh (làm rung dây thanh quản).",
    "sounds": [
      {
        "symbol": "/θ/",
        "name": "Âm \"th\" vô thanh /θ/",
        "howToPronounce": "Đặt đầu lưỡi ở giữa hai hàm răng, chạm nhẹ vào răng cửa hàm trên. Đẩy luồng hơi thoát ra ngoài qua khe hở giữa đầu lưỡi và răng cửa trên để tạo ra tiếng xì gió nhẹ, đồng thời dây thanh quản không rung (âm vô thanh).",
        "spellingPatterns": [
          "th trong từ mang nội dung chính (theatre, earth, think, thank, both, month, Thursday, three, thirty)"
        ],
        "examples": [
          {
            "word": "[th]eatre",
            "ipa": "/ˈθɪətə(r)/",
            "meaningVi": "nhà hát"
          },
          {
            "word": "ear[th]",
            "ipa": "/ɜːθ/",
            "meaningVi": "trái đất"
          },
          {
            "word": "[th]ink",
            "ipa": "/θɪŋk/",
            "meaningVi": "suy nghĩ"
          },
          {
            "word": "bo[th]",
            "ipa": "/bəʊθ/",
            "meaningVi": "cả hai"
          },
          {
            "word": "mon[th]",
            "ipa": "/mʌnθ/",
            "meaningVi": "tháng"
          },
          {
            "word": "[th]ank",
            "ipa": "/θæŋk/",
            "meaningVi": "cảm ơn"
          }
        ],
        "pronunciationTip": "Đặt đầu lưỡi giữa hai hàm răng và thổi hơi nhẹ ra ngoài, không phát ra tiếng từ cổ họng."
      },
      {
        "symbol": "/ð/",
        "name": "Âm \"th\" hữu thanh /ð/",
        "howToPronounce": "Đặt đầu lưỡi ở giữa hai hàm răng tương tự như khi phát âm /θ/. Đẩy luồng hơi thoát ra ngoài đồng thời làm rung mạnh dây thanh quản để tạo thành âm rung (âm hữu thanh).",
        "spellingPatterns": [
          "th trong đại từ/từ chức năng (there, them, they, this, that, neither) hoặc giữa từ (weather, brother, father, together)"
        ],
        "examples": [
          {
            "word": "[th]ere",
            "ipa": "/ðeə(r)/",
            "meaningVi": "ở đó"
          },
          {
            "word": "wea[th]er",
            "ipa": "/ˈweðə(r)/",
            "meaningVi": "thời tiết"
          },
          {
            "word": "bro[th]er",
            "ipa": "/ˈbrʌðə(r)/",
            "meaningVi": "anh/em trai"
          },
          {
            "word": "[th]em",
            "ipa": "/ðem/",
            "meaningVi": "họ, chúng"
          },
          {
            "word": "nei[th]er",
            "ipa": "/ˈnaɪðə(r)/",
            "meaningVi": "không cái nào"
          },
          {
            "word": "toge[th]er",
            "ipa": "/təˈɡeðə(r)/",
            "meaningVi": "cùng nhau"
          }
        ],
        "pronunciationTip": "Gần giống cách phát âm /θ/ nhưng phát ra tiếng rung từ cổ họng."
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh âm /θ/ và /ð/",
    "minimalPairs": [
      {
        "leftWord": "[th]ink (/θ/)",
        "leftIpa": "/θɪŋk/",
        "leftMeaningVi": "suy nghĩ (vô thanh)",
        "rightWord": "[th]is (/ð/)",
        "rightIpa": "/ðɪs/",
        "rightMeaningVi": "cái này (hữu thanh)"
      },
      {
        "leftWord": "brea[th] (/θ/)",
        "leftIpa": "/breθ/",
        "leftMeaningVi": "hơi thở (danh từ)",
        "rightWord": "brea[the] (/ð/)",
        "rightIpa": "/briːð/",
        "rightMeaningVi": "thở (động từ)"
      },
      {
        "leftWord": "[th]ree (/θ/)",
        "leftIpa": "/θriː/",
        "leftMeaningVi": "số 3",
        "rightWord": "[th]ey (/ð/)",
        "rightIpa": "/ðeɪ/",
        "rightMeaningVi": "họ"
      },
      {
        "leftWord": "ear[th] (/θ/)",
        "leftIpa": "/ɜːθ/",
        "leftMeaningVi": "trái đất",
        "rightWord": "wea[th]er (/ð/)",
        "rightIpa": "/ˈweðə(r)/",
        "rightMeaningVi": "thời tiết"
      }
    ],
    "exercises": [
      {
        "id": "u7-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u7-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "any[th]ing",
              "ear[th]",
              "[th]ere",
              "[th]eatre"
            ],
            "correctAnswer": "[th]ere",
            "explanation": "[th]ere /ðeə(r)/ phát âm là âm hữu thanh /ð/, các từ còn lại (any[th]ing, ear[th], [th]eatre) phát âm là âm vô thanh /θ/."
          },
          {
            "id": "u7-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[th]em",
              "[th]rough",
              "wea[th]er",
              "nei[th]er"
            ],
            "correctAnswer": "[th]rough",
            "explanation": "[th]rough /θruː/ phát âm là /θ/, các từ còn lại ([th]em, wea[th]er, nei[th]er) phát âm là /ð/."
          },
          {
            "id": "u7-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "bo[th]",
              "[th]an",
              "[th]in",
              "[th]ink"
            ],
            "correctAnswer": "[th]an",
            "explanation": "[th]an /ðæn/ phát âm là /ð/, các từ còn lại (bo[th], [th]in, [th]ink) phát âm là /θ/."
          },
          {
            "id": "u7-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[th]ank",
              "[th]ese",
              "[th]at",
              "[th]is"
            ],
            "correctAnswer": "[th]ank",
            "explanation": "[th]ank /θæŋk/ phát âm là /θ/, các từ còn lại ([th]ese, [th]at, [th]is) là đại từ chỉ định nên phát âm là /ð/."
          },
          {
            "id": "u7-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "tee[th]",
              "mou[th]",
              "clo[th]e",
              "sou[th]"
            ],
            "correctAnswer": "clo[th]e",
            "explanation": "clo[th]e /kləʊð/ (động từ) phát âm là /ð/, các từ còn lại (tee[th], mou[th], sou[th]) phát âm là /θ/."
          },
          {
            "id": "u7-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "smoo[th]",
              "ba[th]e",
              "brea[th]",
              "brea[th]e"
            ],
            "correctAnswer": "brea[th]",
            "explanation": "brea[th] /breθ/ (danh từ: hơi thở) phát âm là /θ/, các từ còn lại (smoo[th], ba[th]e, brea[th]e) phát âm là /ð/."
          },
          {
            "id": "u7-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "toge[th]er",
              "[th]under",
              "[th]ousand",
              "[th]irsty"
            ],
            "correctAnswer": "toge[th]er",
            "explanation": "toge[th]er /təˈɡeðə(r)/ phát âm là /ð/, các từ còn lại ([th]under, [th]ousand, [th]irsty) phát âm là /θ/."
          },
          {
            "id": "u7-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "bro[th]er",
              "[th]ird",
              "mo[th]er",
              "fa[th]er"
            ],
            "correctAnswer": "[th]ird",
            "explanation": "[th]ird /θɜːd/ phát âm là /θ/, các từ còn lại (bro[th]er, mo[th]er, fa[th]er) phát âm là /ð/."
          },
          {
            "id": "u7-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ma[th]s",
              "au[th]or",
              "nor[th]",
              "al[th]ough"
            ],
            "correctAnswer": "al[th]ough",
            "explanation": "al[th]ough /ɔːlˈðəʊ/ phát âm là /ð/, các từ còn lại (ma[th]s, au[th]or, nor[th]) phát âm là /θ/."
          },
          {
            "id": "u7-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[th]ose",
              "fur[th]er",
              "[th]us",
              "[th]ief"
            ],
            "correctAnswer": "[th]ief",
            "explanation": "[th]ief /θiːf/ phát âm là /θ/, các từ còn lại ([th]ose, fur[th]er, [th]us) phát âm là /ð/."
          }
        ]
      },
      {
        "id": "u7-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u7-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "channel",
              "viewer",
              "compete",
              "clever"
            ],
            "correctAnswer": "compete",
            "explanation": "\"compete\" /kəmˈpiːt/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (channel, viewer, clever) nhấn âm tiết thứ 1."
          },
          {
            "id": "u7-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "programme",
              "prefer",
              "depend",
              "attract"
            ],
            "correctAnswer": "programme",
            "explanation": "\"programme\" /ˈprəʊɡræm/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (prefer, depend, attract) nhấn âm tiết thứ 2."
          },
          {
            "id": "u7-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "funny",
              "weather",
              "boring",
              "cartoon"
            ],
            "correctAnswer": "cartoon",
            "explanation": "\"cartoon\" /kɑːˈtuːn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (funny, weather, boring) nhấn âm tiết thứ 1."
          },
          {
            "id": "u7-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "repeat",
              "connect",
              "enjoy",
              "talent"
            ],
            "correctAnswer": "talent",
            "explanation": "\"talent\" /ˈtælənt/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (repeat, connect, enjoy) nhấn âm tiết thứ 2."
          },
          {
            "id": "u7-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "wonderful",
              "delicious",
              "popular",
              "comedy"
            ],
            "correctAnswer": "delicious",
            "explanation": "\"delicious\" /dɪˈlɪʃəs/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (wonderful, popular, comedy) nhấn âm tiết thứ 1."
          },
          {
            "id": "u7-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "computer",
              "character",
              "decorate",
              "animal"
            ],
            "correctAnswer": "computer",
            "explanation": "\"computer\" /kəmˈpjuːtə(r)/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (character, decorate, animal) nhấn âm tiết thứ 1."
          },
          {
            "id": "u7-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "exciting",
              "expensive",
              "exercise",
              "important"
            ],
            "correctAnswer": "exercise",
            "explanation": "\"exercise\" /ˈeksəsaɪz/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (exciting, expensive, important) nhấn âm tiết thứ 2."
          },
          {
            "id": "u7-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "dolphin",
              "childhood",
              "event",
              "wildlife"
            ],
            "correctAnswer": "event",
            "explanation": "\"event\" /ɪˈvent/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (dolphin, childhood, wildlife) nhấn âm tiết thứ 1."
          },
          {
            "id": "u7-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "national",
              "stadium",
              "history",
              "volunteer"
            ],
            "correctAnswer": "volunteer",
            "explanation": "\"volunteer\" /ˌvɒlənˈtɪə(r)/ có trọng âm rơi vào âm tiết thứ 3; các từ còn lại (national, stadium, history) nhấn âm tiết thứ 1."
          },
          {
            "id": "u7-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "direction",
              "interview",
              "tradition",
              "instruction"
            ],
            "correctAnswer": "interview",
            "explanation": "\"interview\" /ˈɪntəvjuː/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (direction, tradition, instruction) nhấn âm tiết thứ 2."
          }
        ]
      },
      {
        "id": "u7-ex3",
        "number": 3,
        "title": "Exercise 3: Tongue Twisters & Context Practice (Luyện đọc câu xoắn lưỡi & Bài tập ngữ cảnh)",
        "instruction": "Phần A: Nghe và đọc to 5 câu Tongue Twisters bên dưới. Phần B: Hoàn thành các câu hỏi trắc nghiệm ứng dụng.",
        "questions": [
          {
            "id": "u7-ex3-q1",
            "prompt": "Trong câu: \"The wea[th]erman [th]inks [th]ere is a great film this mon[th]\", những từ nào có [th] phát âm là /θ/?",
            "options": [
              "[th]inks & mon[th]",
              "wea[th]erman & [th]ere",
              "[th]inks & [th]ere",
              "wea[th]erman & mon[th]"
            ],
            "correctAnswer": "[th]inks & mon[th]",
            "explanation": "thinks /θɪŋks/ và month /mʌnθ/ phát âm là /θ/; còn weatherman và there phát âm là /ð/."
          },
          {
            "id": "u7-ex3-q2",
            "prompt": "Từ nào dưới đây có cùng âm [th] với từ \"bro[th]er\"?",
            "options": [
              "toge[th]er",
              "bir[th]day",
              "heal[th]y",
              "[th]ing"
            ],
            "correctAnswer": "toge[th]er",
            "explanation": "brother /ˈbrʌðə/ và together /təˈɡeðə/ đều chứa âm hữu thanh /ð/."
          },
          {
            "id": "u7-ex3-q3",
            "prompt": "Từ nào dưới đây có cùng âm [th] với từ \"[th]ink\"?",
            "options": [
              "bo[th]",
              "[th]is",
              "[th]at",
              "[th]ose"
            ],
            "correctAnswer": "bo[th]",
            "explanation": "think /θɪŋk/ và both /bəʊθ/ đều chứa âm vô thanh /θ/. Các từ chỉ định this, that, those đều chứa âm /ð/."
          },
          {
            "id": "u7-ex3-q4",
            "prompt": "Trong từ \"[th]ank\" và \"[th]ey\", hai âm đầu lần lượt là:",
            "options": [
              "/θ/ và /ð/",
              "/ð/ và /θ/",
              "/θ/ và /θ/",
              "/ð/ và /ð/"
            ],
            "correctAnswer": "/θ/ và /ð/",
            "explanation": "thank /θæŋk/ bắt đầu bằng /θ/, còn đại từ nhân xưng they /ðeɪ/ bắt đầu bằng /ð/."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "They think that the weather there is healthy for their brother.",
            "ipa": "/ðeɪ θɪŋk ðət ðə ˈweðə ðeər ɪz ˈhelθi fə ðeə ˈbrʌðə/"
          },
          {
            "sentence": "Both these brothers thanked their mother for the theatre tickets.",
            "ipa": "/bəʊθ ðiːz ˈbrʌðəz θæŋkt ðeə ˈmʌðə fə ðə ˈθɪətə ˈtɪkɪts/"
          },
          {
            "sentence": "The author thought that this book was worth reading together.",
            "ipa": "/ðiː ˈɔːθə θɔːt ðət ðɪs bʊk wəz wɜːθ ˈriːdɪŋ təˈɡeðə/"
          },
          {
            "sentence": "My father thinks that this path is smoother than that path.",
            "ipa": "/maɪ ˈfɑːðə θɪŋks ðət ðɪs pɑːθ ɪz ˈsmuːðə ðən ðæt pɑːθ/"
          },
          {
            "sentence": "Three brothers walked through the northern forest on Thursday the third.",
            "ipa": "/θriː ˈbrʌðəz wɔːkt θruː ðə ˈnɔːðən ˈfɒrɪst ɒn ˈθɜːzdeɪ ðə θɜːd/"
          }
        ]
      }
    ],
    "book": "Book 2",
    "pages": "13–15",
    "extraNotes": [
      "Cả hai âm /θ/ và /ð/ trong tiếng Anh đều được viết bằng cụm chữ cái \"th\".",
      "/θ/ thường xuất hiện ở:",
      "  • Đầu các từ mang nội dung (danh từ, động từ, tính từ) → theatre, through, thin, thank, think",
      "  • Cuối các từ có tận cùng bằng \"th\" → earth, both, teeth, breath, bath (ngoại lệ: một số ít từ tận cùng bằng \"th\" nhưng phát âm là /ð/ → smooth)",
      "/ð/ thường xuất hiện ở:",
      "  • Đầu các từ chỉ định, đại từ, liên từ hoặc từ chức năng → there, them, than, this, that, they",
      "  • Giữa hai nguyên âm trong từ → weather, neither, brother, together, father",
      "  • Cuối các từ có tận cùng bằng \"the\" → breathe, bathe, clothe (và ngoại lệ đuôi \"th\" như smooth)"
    ]
  },
  {
    "unitId": "unit-8",
    "unitNumber": 8,
    "unitTitle": "Sports and Games",
    "topicFocus": "Sounds: /e/ and /æ/",
    "summaryNote": "Phân biệt nguyên âm /e/ (độ mở miệng vừa phải, gần giống âm \"e\" tiếng Việt) và nguyên âm \"e bẹt\" /æ/ (mở rộng miệng cả chiều dọc lẫn chiều ngang, hạ thấp cằm, âm pha giữa \"a\" và \"e\").",
    "sounds": [
      {
        "symbol": "/e/",
        "name": "Nguyên âm /e/",
        "howToPronounce": "Miệng mở vừa phải, hai môi hơi kéo nhẹ sang hai bên. Lưỡi nâng lên ở độ cao trung bình và đầu lưỡi chạm nhẹ vào chân răng cửa dưới. Luồng hơi thoát ra tự do và dây thanh quản rung lên để tạo ra âm ngắn, gọn và dứt khoát.",
        "spellingPatterns": [
          "e (chess, tennis, exercise, contest, helmet, member)"
        ],
        "examples": [
          {
            "word": "ch[e]ss",
            "ipa": "/tʃes/",
            "meaningVi": "cờ vua"
          },
          {
            "word": "t[e]nnis",
            "ipa": "/ˈtenɪs/",
            "meaningVi": "quần vợt"
          },
          {
            "word": "[e]xercise",
            "ipa": "/ˈeksəsaɪz/",
            "meaningVi": "bài tập thể dục"
          },
          {
            "word": "cont[e]st",
            "ipa": "/ˈkɒntest/",
            "meaningVi": "cuộc thi"
          },
          {
            "word": "h[e]lmet",
            "ipa": "/ˈhelmɪt/",
            "meaningVi": "mũ bảo hiểm"
          },
          {
            "word": "m[e]mber",
            "ipa": "/ˈmembə(r)/",
            "meaningVi": "thành viên"
          }
        ],
        "pronunciationTip": "Gần giống âm \"e\" trong tiếng Việt nhưng phát âm ngắn, gọn và dứt khoát hơn."
      },
      {
        "symbol": "/æ/",
        "name": "Nguyên âm e bẹt /æ/",
        "howToPronounce": "Miệng mở rộng hơn /e/, hàm dưới hạ thấp và môi mở rộng sang hai bên. Lưỡi đặt ở vị trí thấp trong khoang miệng và đầu lưỡi chạm chân răng cửa dưới. Luồng hơi thoát ra tự do, dây thanh quản rung tạo ra âm kết hợp giữa \"a\" và \"e\".",
        "spellingPatterns": [
          "a (racket, match, marathon, active, badminton, champion, fan)"
        ],
        "examples": [
          {
            "word": "r[a]cket",
            "ipa": "/ˈrækɪt/",
            "meaningVi": "cây vợt"
          },
          {
            "word": "m[a]tch",
            "ipa": "/mætʃ/",
            "meaningVi": "trận đấu"
          },
          {
            "word": "m[a]rathon",
            "ipa": "/ˈmærəθən/",
            "meaningVi": "cuộc chạy ma-ra-tông"
          },
          {
            "word": "[a]ctive",
            "ipa": "/ˈæktɪv/",
            "meaningVi": "năng động"
          },
          {
            "word": "b[a]dminton",
            "ipa": "/ˈbædmɪntən/",
            "meaningVi": "cầu lông"
          },
          {
            "word": "ch[a]mpion",
            "ipa": "/ˈtʃæmpiən/",
            "meaningVi": "nhà vô địch"
          }
        ],
        "pronunciationTip": "Gần giống âm kết hợp giữa \"a\" và \"e\". Mở khẩu hình miệng nói âm \"a\" sau đó luyến qua âm \"e\"."
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh âm /e/ và /æ/",
    "minimalPairs": [
      {
        "leftWord": "m[e]n (/e/)",
        "leftIpa": "/men/",
        "leftMeaningVi": "những người đàn ông",
        "rightWord": "m[a]n (/æ/)",
        "rightIpa": "/mæn/",
        "rightMeaningVi": "một người đàn ông"
      },
      {
        "leftWord": "p[e]n (/e/)",
        "leftIpa": "/pen/",
        "leftMeaningVi": "cây bút mực",
        "rightWord": "p[a]n (/æ/)",
        "rightIpa": "/pæn/",
        "rightMeaningVi": "cái chảo"
      },
      {
        "leftWord": "s[e]t (/e/)",
        "leftIpa": "/set/",
        "leftMeaningVi": "hiệp đấu, bộ",
        "rightWord": "s[a]t (/æ/)",
        "rightIpa": "/sæt/",
        "rightMeaningVi": "đã ngồi (quá khứ của sit)"
      },
      {
        "leftWord": "b[e]d (/e/)",
        "leftIpa": "/bed/",
        "leftMeaningVi": "chiếc giường",
        "rightWord": "b[a]d (/æ/)",
        "rightIpa": "/bæd/",
        "rightMeaningVi": "tồi tệ"
      }
    ],
    "exercises": [
      {
        "id": "u8-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u8-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ch[e]ss",
              "m[e]mber",
              "t[e]nnis",
              "s[e]cret"
            ],
            "correctAnswer": "s[e]cret",
            "explanation": "s[e]cret /ˈsiːkrət/ phát âm là /iː/, các từ còn lại (ch[e]ss, m[e]mber, t[e]nnis) phát âm là /e/."
          },
          {
            "id": "u8-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "m[a]rathon",
              "f[a]st",
              "m[a]tch",
              "r[a]cket"
            ],
            "correctAnswer": "f[a]st",
            "explanation": "f[a]st /fɑːst/ phát âm là /ɑː/ (chuẩn Anh – Anh), các từ còn lại (m[a]rathon, m[a]tch, r[a]cket) phát âm là /æ/."
          },
          {
            "id": "u8-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "h[ea]d",
              "t[ea]m",
              "h[ea]vy",
              "br[ea]d"
            ],
            "correctAnswer": "t[ea]m",
            "explanation": "t[ea]m /tiːm/ phát âm là /iː/, các từ còn lại (h[ea]d, h[ea]vy, br[ea]d) phát âm là /e/."
          },
          {
            "id": "u8-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ch[a]mpion",
              "p[a]ssenger",
              "f[a]mous",
              "[a]ctive"
            ],
            "correctAnswer": "f[a]mous",
            "explanation": "f[a]mous /ˈfeɪməs/ phát âm là /eɪ/, các từ còn lại (ch[a]mpion, p[a]ssenger, [a]ctive) phát âm là /æ/."
          },
          {
            "id": "u8-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[e]xcellent",
              "[e]quipment",
              "[e]xercise",
              "[e]ffort"
            ],
            "correctAnswer": "[e]quipment",
            "explanation": "[e]quipment /ɪˈkwɪpmənt/ phát âm là /ɪ/, các từ còn lại ([e]xcellent, [e]xercise, [e]ffort) phát âm là /e/."
          },
          {
            "id": "u8-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "b[a]dminton",
              "tr[a]ffic",
              "f[a]ntastic",
              "b[a]ll"
            ],
            "correctAnswer": "b[a]ll",
            "explanation": "b[a]ll /bɔːl/ phát âm là /ɔː/, các từ còn lại (b[a]dminton, tr[a]ffic, f[a]ntastic) phát âm là /æ/."
          },
          {
            "id": "u8-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "sw[ea]ter",
              "w[ea]ther",
              "cl[ea]n",
              "r[ea]dy"
            ],
            "correctAnswer": "cl[ea]n",
            "explanation": "cl[ea]n /kliːn/ phát âm là /iː/, các từ còn lại (sw[ea]ter, w[ea]ther, r[ea]dy) phát âm là /e/."
          },
          {
            "id": "u8-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "st[a]dium",
              "b[a]ck",
              "st[a]nd",
              "c[a]tch"
            ],
            "correctAnswer": "st[a]dium",
            "explanation": "st[a]dium /ˈsteɪdiəm/ phát âm là /eɪ/, các từ còn lại (b[a]ck, st[a]nd, c[a]tch) phát âm là /æ/."
          },
          {
            "id": "u8-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "th[e]se",
              "r[e]d",
              "b[e]d",
              "s[e]nd"
            ],
            "correctAnswer": "th[e]se",
            "explanation": "th[e]se /ðiːz/ phát âm là /iː/, các từ còn lại (r[e]d, b[e]d, s[e]nd) phát âm là /e/."
          },
          {
            "id": "u8-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "fl[a]g",
              "b[a]g",
              "h[a]nd",
              "cl[a]ss"
            ],
            "correctAnswer": "cl[a]ss",
            "explanation": "cl[a]ss /klɑːs/ phát âm là /ɑː/ (chuẩn Anh – Anh), các từ còn lại (fl[a]g, b[a]g, h[a]nd) phát âm là /æ/."
          }
        ]
      },
      {
        "id": "u8-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u8-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "winner",
              "career",
              "racket",
              "tennis"
            ],
            "correctAnswer": "career",
            "explanation": "\"career\" /kəˈrɪə(r)/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (winner, racket, tennis) nhấn âm tiết thứ 1."
          },
          {
            "id": "u8-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "cycling",
              "football",
              "goggles",
              "event"
            ],
            "correctAnswer": "event",
            "explanation": "\"event\" /ɪˈvent/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (cycling, football, goggles) nhấn âm tiết thứ 1."
          },
          {
            "id": "u8-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "sporty",
              "award",
              "compete",
              "result"
            ],
            "correctAnswer": "sporty",
            "explanation": "\"sporty\" /ˈspɔːti/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (award, compete, result) nhấn âm tiết thứ 2."
          },
          {
            "id": "u8-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "marathon",
              "badminton",
              "exercise",
              "equipment"
            ],
            "correctAnswer": "equipment",
            "explanation": "\"equipment\" /ɪˈkwɪpmənt/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (marathon, badminton, exercise) nhấn âm tiết thứ 1."
          },
          {
            "id": "u8-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "stadium",
              "fantastic",
              "exhausted",
              "athletic"
            ],
            "correctAnswer": "stadium",
            "explanation": "\"stadium\" /ˈsteɪdiəm/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (fantastic, exhausted, athletic) nhấn âm tiết thứ 2."
          },
          {
            "id": "u8-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "famous",
              "receive",
              "contest",
              "special"
            ],
            "correctAnswer": "receive",
            "explanation": "\"receive\" /rɪˈsiːv/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (famous, contest, special) nhấn âm tiết thứ 1."
          },
          {
            "id": "u8-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "passenger",
              "champion",
              "exciting",
              "tournament"
            ],
            "correctAnswer": "exciting",
            "explanation": "\"exciting\" /ɪkˈsaɪtɪŋ/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (passenger, champion, tournament) nhấn âm tiết thứ 1."
          },
          {
            "id": "u8-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "relax",
              "playground",
              "begin",
              "protect"
            ],
            "correctAnswer": "playground",
            "explanation": "\"playground\" /ˈpleɪɡraʊnd/ (danh từ ghép) có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (relax, begin, protect) nhấn âm tiết thứ 2."
          },
          {
            "id": "u8-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "history",
              "capital",
              "delicious",
              "popular"
            ],
            "correctAnswer": "delicious",
            "explanation": "\"delicious\" /dɪˈlɪʃəs/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (history, capital, popular) nhấn âm tiết thứ 1."
          },
          {
            "id": "u8-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "decide",
              "member",
              "swimming",
              "player"
            ],
            "correctAnswer": "decide",
            "explanation": "\"decide\" /dɪˈsaɪd/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (member, swimming, player) nhấn âm tiết thứ 1."
          }
        ]
      },
      {
        "id": "u8-ex3",
        "number": 3,
        "title": "Exercise 3: Tongue Twisters & Context Practice (Luyện đọc câu xoắn lưỡi & Bài tập ngữ cảnh)",
        "instruction": "Phần A: Nghe và đọc to 5 câu Tongue Twisters bên dưới. Phần B: Hoàn thành các câu hỏi trắc nghiệm ứng dụng.",
        "questions": [
          {
            "id": "u8-ex3-q1",
            "prompt": "Trong câu: \"The ch[a]mpion bought a new t[e]nnis r[a]cket y[e]sterday\", những từ nào có phần gạch chân phát âm là /æ/?",
            "options": [
              "ch[a]mpion & r[a]cket",
              "t[e]nnis & y[e]sterday",
              "ch[a]mpion & t[e]nnis",
              "r[a]cket & y[e]sterday"
            ],
            "correctAnswer": "ch[a]mpion & r[a]cket",
            "explanation": "champion và racket chứa âm /æ/; còn tennis và yesterday chứa âm /e/."
          },
          {
            "id": "u8-ex3-q2",
            "prompt": "Chọn từ chứa âm /e/ để điền vào câu: \"My father and I often play ______ in the evening.\"",
            "options": [
              "ch[e]ss",
              "b[a]dminton",
              "b[a]sketball",
              "h[a]ndball"
            ],
            "correctAnswer": "ch[e]ss",
            "explanation": "chess /tʃes/ (cờ vua) chứa nguyên âm /e/, các môn còn lại có phần gạch chân chứa âm /æ/ hoặc /ɑː/."
          },
          {
            "id": "u8-ex3-q3",
            "prompt": "Từ nào dưới đây có cùng nguyên âm gạch chân với từ \"m[a]tch\"?",
            "options": [
              "m[a]rathon",
              "h[e]lmet",
              "m[e]dal",
              "s[e]ven"
            ],
            "correctAnswer": "m[a]rathon",
            "explanation": "match /mætʃ/ và marathon /ˈmærəθən/ đều chứa nguyên âm /æ/."
          },
          {
            "id": "u8-ex3-q4",
            "prompt": "Từ nào dưới đây có cùng nguyên âm gạch chân với từ \"h[e]lmet\"?",
            "options": [
              "cont[e]st",
              "r[a]cket",
              "[a]ctive",
              "f[a]n"
            ],
            "correctAnswer": "cont[e]st",
            "explanation": "helmet /ˈhelmɪt/ và contest /ˈkɒntest/ đều có chữ \"e\" gạch chân phát âm là /e/."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "Ted's fat cat sat on the bed and emptied the red pan.",
            "ipa": "/tedz fæt kæt sæt ɒn ðə bed ənd ˈemptid ðə red pæn/"
          },
          {
            "sentence": "The men with ten red rackets met the champion on the track.",
            "ipa": "/ðə men wɪð ten red ˈrækɪts met ðə ˈtʃæmpiən ɒn ðə træk/"
          },
          {
            "sentence": "Ben sent ten bad matches to the best expert in the camp.",
            "ipa": "/ben sent ten bæd ˈmætʃɪz tə ðə best ˈekspɜːt ɪn ðə kæmp/"
          },
          {
            "sentence": "Can seven clever men catch the black backpacker with extra bags?",
            "ipa": "/kən ˈsevn ˈklevə men kætʃ ðə blæk ˈbækpækə wɪð ˈekstrə bæɡz/"
          },
          {
            "sentence": "That sad man left his heavy bag next to the red van.",
            "ipa": "/ðæt sæd mæn left hɪz ˈhevi bæɡ nekst tə ðə red væn/"
          }
        ]
      }
    ],
    "book": "Book 2",
    "pages": "55–57",
    "extraNotes": [
      "/e/ thường được viết bằng:",
      "  • Chữ \"e\" trong các từ ngắn hoặc âm tiết đóng → chess, tennis, contest, bed",
      "  • Chữ \"ea\" → head, bread, weather",
      "/æ/ thường được viết bằng:",
      "  • Chữ \"a\" trong các từ ngắn hoặc âm tiết được nhấn trọng âm → racket, match, marathon, active, cat",
      "Lưu ý sự khác biệt Anh – Anh (BrE) và Anh – Mỹ (AmE): một số từ chứa chữ \"a\" được phát âm là /ɑː/ trong BrE nhưng là /æ/ trong AmE:",
      "  • fast: /fɑːst/ (BrE) – /fæst/ (AmE) – nhanh",
      "  • dance: /dɑːns/ (BrE) – /dæns/ (AmE) – khiêu vũ, nhảy múa",
      "  • ask: /ɑːsk/ (BrE) – /æsk/ (AmE) – hỏi, yêu cầu",
      "  • class: /klɑːs/ (BrE) – /klæs/ (AmE) – lớp học",
      "  • can't: /kɑːnt/ (BrE) – /kænt/ (AmE) – không thể",
      "  Lưu ý: Chương trình học và các đề thi tiếng Anh cấp THCS và THPT hiện nay chủ yếu được xây dựng theo chuẩn Anh – Anh (BrE). Vì vậy, các em hãy ưu tiên áp dụng phát âm theo chuẩn Anh – Anh khi làm bài tập và bài kiểm tra ngữ âm."
    ]
  },
  {
    "unitId": "unit-9",
    "unitNumber": 9,
    "unitTitle": "Cities of the World",
    "topicFocus": "Diphthongs: /əʊ/ and /aʊ/",
    "summaryNote": "Phân biệt hai nguyên âm đôi cùng kết thúc bằng âm trụm môi /ʊ/: âm /əʊ/ trượt từ /ə/ sang /ʊ/ (giống âm \"âu/ô\"), còn âm /aʊ/ mở rộng miệng ở đầu âm /a/ rồi trượt sang /ʊ/ (giống âm \"ao\").",
    "sounds": [
      {
        "symbol": "/əʊ/",
        "name": "Nguyên âm đôi /əʊ/",
        "howToPronounce": "Bắt đầu bằng âm /a/ (khẩu hình miệng mở rộng, hàm hạ thấp, lưỡi nằm thấp) rồi lướt nhanh và mượt dần sang âm /ʊ/ (khẩu hình môi hơi tròn lại và đưa về phía trước, cuống lưỡi nâng cao). Luồng hơi thoát ra tự do và dây thanh quản rung liên tục.",
        "spellingPatterns": [
          "oa (boat, coast, road)",
          "o (postcard, cold, old, photo, pagoda)",
          "ow (snow, slow, window, show)"
        ],
        "examples": [
          {
            "word": "b[oa]t",
            "ipa": "/bəʊt/",
            "meaningVi": "con thuyền"
          },
          {
            "word": "c[oa]st",
            "ipa": "/kəʊst/",
            "meaningVi": "bờ biển"
          },
          {
            "word": "p[o]stcard",
            "ipa": "/ˈpəʊstkɑːd/",
            "meaningVi": "bưu thiếp"
          },
          {
            "word": "sn[ow]y",
            "ipa": "/ˈsnəʊi/",
            "meaningVi": "có tuyết rơi"
          },
          {
            "word": "c[o]ld",
            "ipa": "/kəʊld/",
            "meaningVi": "lạnh"
          },
          {
            "word": "ph[o]t[o]",
            "ipa": "/ˈfəʊtəʊ/",
            "meaningVi": "bức ảnh"
          }
        ],
        "pronunciationTip": "Gần giống âm \"ao\" trong tiếng Việt."
      },
      {
        "symbol": "/aʊ/",
        "name": "Nguyên âm đôi /aʊ/",
        "howToPronounce": "Bắt đầu bằng âm /ə/ (khẩu hình miệng mở vừa phải, môi thả lỏng tự nhiên, lưỡi đặt ở vị trí trung tâm) rồi lướt nhanh và mượt dần sang âm /ʊ/ (khẩu hình môi hơi tròn lại, cuống lưỡi nâng cao). Luồng hơi thoát ra tự do và dây thanh quản rung liên tục.",
        "spellingPatterns": [
          "ou (house, proud, cloud, mountain)",
          "ow (town, tower, crowded, now, how)"
        ],
        "examples": [
          {
            "word": "h[ou]se",
            "ipa": "/haʊs/",
            "meaningVi": "ngôi nhà"
          },
          {
            "word": "t[ow]n",
            "ipa": "/taʊn/",
            "meaningVi": "thị trấn, phố"
          },
          {
            "word": "t[ow]er",
            "ipa": "/ˈtaʊə(r)/",
            "meaningVi": "tòa tháp"
          },
          {
            "word": "cr[ow]ded",
            "ipa": "/ˈkraʊdɪd/",
            "meaningVi": "đông đúc"
          },
          {
            "word": "pr[ou]d",
            "ipa": "/praʊd/",
            "meaningVi": "tự hào"
          },
          {
            "word": "ar[ou]nd",
            "ipa": "/əˈraʊnd/",
            "meaningVi": "xung quanh"
          }
        ],
        "pronunciationTip": "Gần giống âm \"âu\" trong tiếng Việt."
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh nguyên âm đôi /əʊ/ và /aʊ/",
    "minimalPairs": [
      {
        "leftWord": "n[o] (/əʊ/)",
        "leftIpa": "/nəʊ/",
        "leftMeaningVi": "không",
        "rightWord": "n[ow] (/aʊ/)",
        "rightIpa": "/naʊ/",
        "rightMeaningVi": "bây giờ"
      },
      {
        "leftWord": "kn[ow] (/əʊ/)",
        "leftIpa": "/nəʊ/",
        "leftMeaningVi": "biết",
        "rightWord": "n[ow] (/aʊ/)",
        "rightIpa": "/naʊ/",
        "rightMeaningVi": "bây giờ"
      },
      {
        "leftWord": "b[oa]t (/əʊ/)",
        "leftIpa": "/bəʊt/",
        "leftMeaningVi": "con thuyền",
        "rightWord": "b[ou]t (/aʊ/)",
        "rightIpa": "/baʊt/",
        "rightMeaningVi": "đợt, hiệp đấu"
      },
      {
        "leftWord": "l[ow] (/əʊ/)",
        "leftIpa": "/ləʊ/",
        "leftMeaningVi": "thấp",
        "rightWord": "l[ou]d (/aʊ/)",
        "rightIpa": "/laʊd/",
        "rightMeaningVi": "to, ầm ĩ"
      }
    ],
    "exercises": [
      {
        "id": "u9-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u9-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "cr[ow]ded",
              "sn[ow]",
              "t[ow]er",
              "t[ow]n"
            ],
            "correctAnswer": "sn[ow]",
            "explanation": "sn[ow] /snəʊ/ phát âm là /əʊ/, các từ còn lại (cr[ow]ded, t[ow]er, t[ow]n) phát âm là /aʊ/."
          },
          {
            "id": "u9-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "sl[ow]",
              "kn[ow]",
              "sh[ow]",
              "n[ow]"
            ],
            "correctAnswer": "n[ow]",
            "explanation": "n[ow] /naʊ/ phát âm là /aʊ/, các từ còn lại (sl[ow], kn[ow], sh[ow]) phát âm là /əʊ/."
          },
          {
            "id": "u9-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "ar[ou]nd",
              "sh[ou]lder",
              "m[ou]th",
              "h[ou]se"
            ],
            "correctAnswer": "sh[ou]lder",
            "explanation": "sh[ou]lder /ˈʃəʊldə(r)/ phát âm là /əʊ/, các từ còn lại (ar[ou]nd, m[ou]th, h[ou]se) phát âm là /aʊ/."
          },
          {
            "id": "u9-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "h[o]me",
              "p[o]stcard",
              "m[o]st",
              "c[o]st"
            ],
            "correctAnswer": "c[o]st",
            "explanation": "c[o]st /kɒst/ phát âm là /ɒ/, các từ còn lại (h[o]me, p[o]stcard, m[o]st) phát âm là /əʊ/."
          },
          {
            "id": "u9-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "fl[ow]er",
              "arr[ow]",
              "wind[ow]",
              "yell[ow]"
            ],
            "correctAnswer": "fl[ow]er",
            "explanation": "fl[ow]er /ˈflaʊə(r)/ phát âm là /aʊ/, các từ còn lại (arr[ow], wind[ow], yell[ow]) phát âm là /əʊ/."
          },
          {
            "id": "u9-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "s[ou]th",
              "c[ou]ch",
              "c[ou]ntry",
              "f[ou]nd"
            ],
            "correctAnswer": "c[ou]ntry",
            "explanation": "c[ou]ntry /ˈkʌntri/ phát âm là /ʌ/, các từ còn lại (s[ou]th, c[ou]ch, f[ou]nd) phát âm là /aʊ/."
          },
          {
            "id": "u9-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "pian[o]",
              "phot[o]",
              "sh[o]p",
              "pag[o]da"
            ],
            "correctAnswer": "sh[o]p",
            "explanation": "sh[o]p /ʃɒp/ phát âm là /ɒ/, các từ còn lại (pian[o], phot[o], pag[o]da) phát âm là /əʊ/."
          },
          {
            "id": "u9-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "gr[ou]p",
              "cl[ou]d",
              "sh[ou]t",
              "s[ou]nd"
            ],
            "correctAnswer": "gr[ou]p",
            "explanation": "gr[ou]p /ɡruːp/ phát âm là /uː/, các từ còn lại (cl[ou]d, sh[ou]t, s[ou]nd) phát âm là /aʊ/."
          },
          {
            "id": "u9-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "c[oa]st",
              "r[oa]d",
              "abr[oa]d",
              "b[oa]t"
            ],
            "correctAnswer": "abr[oa]d",
            "explanation": "abr[oa]d /əˈbrɔːd/ phát âm là /ɔː/, các từ còn lại (c[oa]st, r[oa]d, b[oa]t) phát âm là /əʊ/."
          },
          {
            "id": "u9-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "h[o]ld",
              "h[o]liday",
              "[o]ld",
              "c[o]ld"
            ],
            "correctAnswer": "h[o]liday",
            "explanation": "h[o]liday /ˈhɒlədeɪ/ phát âm là /ɒ/, các từ còn lại (h[o]ld, [o]ld, c[o]ld) phát âm là /əʊ/."
          }
        ]
      },
      {
        "id": "u9-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u9-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "palace",
              "city",
              "landmark",
              "hotel"
            ],
            "correctAnswer": "hotel",
            "explanation": "\"hotel\" /həʊˈtel/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (palace, city, landmark) nhấn âm tiết thứ 1."
          },
          {
            "id": "u9-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "crowded",
              "famous",
              "friendly",
              "attract"
            ],
            "correctAnswer": "attract",
            "explanation": "\"attract\" /əˈtrækt/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (crowded, famous, friendly) nhấn âm tiết thứ 1."
          },
          {
            "id": "u9-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "around",
              "postcard",
              "visit",
              "modern"
            ],
            "correctAnswer": "around",
            "explanation": "\"around\" /əˈraʊnd/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (postcard, visit, modern) nhấn âm tiết thứ 1."
          },
          {
            "id": "u9-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "receive",
              "rainy",
              "ancient",
              "sunny"
            ],
            "correctAnswer": "receive",
            "explanation": "\"receive\" /rɪˈsiːv/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (rainy, ancient, sunny) nhấn âm tiết thứ 1."
          },
          {
            "id": "u9-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "explore",
              "prepare",
              "weather",
              "compete"
            ],
            "correctAnswer": "weather",
            "explanation": "\"weather\" /ˈweðə(r)/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (explore, prepare, compete) nhấn âm tiết thứ 2."
          },
          {
            "id": "u9-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "delicious",
              "capital",
              "pagoda",
              "exciting"
            ],
            "correctAnswer": "capital",
            "explanation": "\"capital\" /ˈkæpɪtl/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (delicious, pagoda, exciting) nhấn âm tiết thứ 2."
          },
          {
            "id": "u9-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "interesting",
              "wonderful",
              "colourful",
              "expensive"
            ],
            "correctAnswer": "expensive",
            "explanation": "\"expensive\" /ɪkˈspensɪv/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (interesting, wonderful, colourful) nhấn âm tiết thứ 1."
          },
          {
            "id": "u9-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "monument",
              "passenger",
              "convenient",
              "holiday"
            ],
            "correctAnswer": "convenient",
            "explanation": "\"convenient\" /kənˈviːniənt/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (monument, passenger, holiday) nhấn âm tiết thứ 1."
          },
          {
            "id": "u9-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "natural",
              "historic",
              "beautiful",
              "popular"
            ],
            "correctAnswer": "historic",
            "explanation": "\"historic\" /hɪˈstɒrɪk/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (natural, beautiful, popular) nhấn âm tiết thứ 1."
          },
          {
            "id": "u9-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "river",
              "building",
              "design",
              "temple"
            ],
            "correctAnswer": "design",
            "explanation": "\"design\" /dɪˈzaɪn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (river, building, temple) nhấn âm tiết thứ 1."
          }
        ]
      },
      {
        "id": "u9-ex3",
        "number": 3,
        "title": "Exercise 3: Tongue Twisters & Context Practice (Luyện đọc câu xoắn lưỡi & Bài tập ngữ cảnh)",
        "instruction": "Phần A: Nghe và đọc to 5 câu Tongue Twisters bên dưới. Phần B: Hoàn thành các câu hỏi trắc nghiệm ứng dụng.",
        "questions": [
          {
            "id": "u9-ex3-q1",
            "prompt": "Trong câu: \"It is very c[o]ld and sn[ow]y near the [o]ld t[ow]n\", từ nào chứa âm /aʊ/?",
            "options": [
              "t[ow]n",
              "c[o]ld",
              "sn[ow]y",
              "[o]ld"
            ],
            "correctAnswer": "t[ow]n",
            "explanation": "town /taʊn/ chứa âm /aʊ/; cả 3 từ cold, snowy, old đều chứa âm /əʊ/."
          },
          {
            "id": "u9-ex3-q2",
            "prompt": "Trong câu: \"There are many cr[ow]ded b[oa]ts near the c[oa]st\", các âm gạch chân lần lượt là:",
            "options": [
              "/aʊ/ – /əʊ/ – /əʊ/",
              "/əʊ/ – /aʊ/ – /əʊ/",
              "/aʊ/ – /aʊ/ – /əʊ/",
              "/əʊ/ – /əʊ/ – /aʊ/"
            ],
            "correctAnswer": "/aʊ/ – /əʊ/ – /əʊ/",
            "explanation": "crowded (/aʊ/), boats (/əʊ/), coast (/əʊ/)."
          },
          {
            "id": "u9-ex3-q3",
            "prompt": "Từ nào dưới đây có cùng nguyên âm đôi với từ \"ph[o]to\"?",
            "options": [
              "pag[o]da",
              "m[ou]ntain",
              "t[ow]er",
              "h[ou]se"
            ],
            "correctAnswer": "pag[o]da",
            "explanation": "photo /ˈfəʊtəʊ/ và pagoda /pəˈɡəʊdə/ đều có chữ \"o\" gạch chân phát âm là /əʊ/."
          },
          {
            "id": "u9-ex3-q4",
            "prompt": "Từ nào dưới đây có cùng nguyên âm đôi với từ \"pr[ou]d\"?",
            "options": [
              "t[ow]n",
              "b[oa]t",
              "sn[ow]",
              "c[o]ld"
            ],
            "correctAnswer": "t[ow]n",
            "explanation": "proud /praʊd/ và town /taʊn/ đều chứa nguyên âm đôi /aʊ/."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "Joe rowed a slow boat around the crowded town.",
            "ipa": "/dʒəʊ rəʊd ə sləʊ bəʊt əˈraʊnd ðə ˈkraʊdɪd taʊn/"
          },
          {
            "sentence": "The brown cow now shows its nose in the snow.",
            "ipa": "/ðə braʊn kaʊ naʊ ʃəʊz ɪts nəʊz ɪn ðə snəʊ/"
          },
          {
            "sentence": "A loud clown knows how to post an old postcard.",
            "ipa": "/ə laʊd klaʊn nəʊz haʊ tə pəʊst ən əʊld ˈpəʊstkɑːd/"
          },
          {
            "sentence": "The proud owl floats slowly around the coast town.",
            "ipa": "/ðə praʊd aʊl fləʊts ˈsləʊli əˈraʊnd ðə kəʊst taʊn/"
          },
          {
            "sentence": "Shout loudly from the tower to the boats below!",
            "ipa": "/ʃaʊt ˈlaʊdli frəm ðə ˈtaʊə tə ðə bəʊts bɪˈləʊ/"
          }
        ]
      }
    ],
    "book": "Book 2",
    "pages": "99–102",
    "extraNotes": [
      "/aʊ/ thường được viết bằng:",
      "  • Chữ \"ou\" → house, around, south, found, mouth",
      "  • Chữ \"ow\" → town, tower, crowded, now, cow",
      "/əʊ/ thường được viết bằng:",
      "  • Chữ \"oa\" → boat, coast, road, coat",
      "  • Chữ \"ow\" → snow, show, know, slow, window",
      "  • Chữ \"o_e\" (o + phụ âm + e) → home, hope, phone, stone, close",
      "  • Chữ \"o\" ở cuối từ hoặc trước các phụ âm -st, -ld → photo, pagoda, postcard, most, cold, old",
      "Lưu ý về ký hiệu phiên âm Anh – Anh (BrE) và Anh – Mỹ (AmE): trong các từ điển chuẩn Anh – Mỹ, nguyên âm đôi /əʊ/ thường được ký hiệu là /oʊ/ (ví dụ: boat /boʊt/, snow /snoʊ/). Trong chương trình học và các kỳ thi tại Việt Nam, chuẩn phiên âm Anh – Anh /əʊ/ được sử dụng chính thức."
    ]
  },
  {
    "unitId": "unit-10",
    "unitNumber": 10,
    "unitTitle": "Our Houses in the Future",
    "topicFocus": "Consonant clusters: /dr/ and /tr/",
    "summaryNote": "Phân biệt hai tổ hợp phụ âm đầu /dr/ (kết hợp âm hữu thanh /d/ và /r/, dây thanh quản rung) và /tr/ (kết hợp âm vô thanh /t/ và /r/, bật hơi nhẹ và không rung ở đầu âm). Không chèn nguyên âm /ə/ vào giữa hai phụ âm.",
    "sounds": [
      {
        "symbol": "/dr/",
        "name": "Tổ hợp phụ âm hữu thanh /dr/",
        "howToPronounce": "Chu nhẹ môi chuẩn bị cho âm /r/, đặt đầu lưỡi ở lợi trên phát âm /d/ (rung cổ họng) rồi lướt cực nhanh sang âm /r/.",
        "spellingPatterns": [
          "dr (dream, drive, drop, draw, dry, bedroom, children)"
        ],
        "examples": [
          {
            "word": "[dr]eam",
            "ipa": "/driːm/",
            "meaningVi": "giấc mơ, mơ ước"
          },
          {
            "word": "[dr]ive",
            "ipa": "/draɪv/",
            "meaningVi": "lái xe"
          },
          {
            "word": "[dr]op",
            "ipa": "/drɒp/",
            "meaningVi": "giọt (nước), làm rơi"
          },
          {
            "word": "[dr]aw",
            "ipa": "/drɔː/",
            "meaningVi": "vẽ"
          },
          {
            "word": "chil[dr]en",
            "ipa": "/ˈtʃɪldrən/",
            "meaningVi": "trẻ em"
          },
          {
            "word": "be[dr]oom",
            "ipa": "/ˈbedruːm/",
            "meaningVi": "phòng ngủ"
          }
        ]
      },
      {
        "symbol": "/tr/",
        "name": "Tổ hợp phụ âm vô thanh /tr/",
        "howToPronounce": "Chu nhẹ môi chuẩn bị cho âm /r/, bật âm vô thanh /t/ rồi nối liền ngay sang âm /r/ mà không tách rời.",
        "spellingPatterns": [
          "tr (tree, train, tractor, travel, country, electric, astronaut)"
        ],
        "examples": [
          {
            "word": "[tr]ee",
            "ipa": "/triː/",
            "meaningVi": "cây cối"
          },
          {
            "word": "[tr]ain",
            "ipa": "/treɪn/",
            "meaningVi": "tàu hỏa"
          },
          {
            "word": "[tr]actor",
            "ipa": "/ˈtræktə(r)/",
            "meaningVi": "máy kéo"
          },
          {
            "word": "[tr]avel",
            "ipa": "/ˈtrævl/",
            "meaningVi": "đi du lịch, di chuyển"
          },
          {
            "word": "coun[tr]y",
            "ipa": "/ˈkʌntri/",
            "meaningVi": "miền quê, đất nước"
          },
          {
            "word": "elec[tr]ic",
            "ipa": "/ɪˈlektrɪk/",
            "meaningVi": "chạy bằng điện"
          }
        ]
      }
    ],
    "minimalPairsTitle": "Cặp từ so sánh tổ hợp âm /dr/ và /tr/",
    "minimalPairs": [
      {
        "leftWord": "[dr]ain (/dr/)",
        "leftIpa": "/dreɪn/",
        "leftMeaningVi": "ống thoát nước",
        "rightWord": "[tr]ain (/tr/)",
        "rightIpa": "/treɪn/",
        "rightMeaningVi": "tàu hỏa"
      },
      {
        "leftWord": "[dr]y (/dr/)",
        "leftIpa": "/draɪ/",
        "leftMeaningVi": "khô ráo, làm khô",
        "rightWord": "[tr]y (/tr/)",
        "rightIpa": "/traɪ/",
        "rightMeaningVi": "cố gắng, thử"
      },
      {
        "leftWord": "[dr]ip (/dr/)",
        "leftIpa": "/drɪp/",
        "leftMeaningVi": "nhỏ giọt",
        "rightWord": "[tr]ip (/tr/)",
        "rightIpa": "/trɪp/",
        "rightMeaningVi": "chuyến đi"
      },
      {
        "leftWord": "[dr]unk (/dr/)",
        "leftIpa": "/drʌŋk/",
        "leftMeaningVi": "đã uống (P2 của drink)",
        "rightWord": "[tr]unk (/tr/)",
        "rightIpa": "/trʌŋk/",
        "rightMeaningVi": "thân cây / cốp xe"
      }
    ],
    "exercises": [
      {
        "id": "u10-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u10-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "r[oo]m",
              "m[oo]n",
              "p[oo]l",
              "c[oo]ker"
            ],
            "correctAnswer": "c[oo]ker",
            "explanation": "c[oo]ker /ˈkʊkə(r)/ phát âm là nguyên âm ngắn /ʊ/, các từ còn lại (r[oo]m, m[oo]n, p[oo]l) phát âm là nguyên âm dài /uː/."
          },
          {
            "id": "u10-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "s[o]lar",
              "p[o]nd",
              "p[o]stcard",
              "r[o]bot"
            ],
            "correctAnswer": "p[o]nd",
            "explanation": "p[o]nd /pɒnd/ phát âm là /ɒ/, các từ còn lại (s[o]lar, p[o]stcard, r[o]bot) phát âm là /əʊ/."
          },
          {
            "id": "u10-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[i]sland",
              "v[i]llage",
              "w[i]reless",
              "l[i]ke"
            ],
            "correctAnswer": "v[i]llage",
            "explanation": "v[i]llage /ˈvɪlɪdʒ/ phát âm là /ɪ/, các từ còn lại ([i]sland, w[i]reless, l[i]ke) phát âm là /aɪ/."
          },
          {
            "id": "u10-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "kit[ch]en",
              "[ch]ess",
              "ma[ch]ine",
              "tea[ch]er"
            ],
            "correctAnswer": "ma[ch]ine",
            "explanation": "ma[ch]ine /məˈʃiːn/ có \"ch\" phát âm là /ʃ/, các từ còn lại (kit[ch]en, [ch]ess, tea[ch]er) phát âm là /tʃ/."
          },
          {
            "id": "u10-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "mo[th]er",
              "clo[th]es",
              "ear[th]",
              "[th]ere"
            ],
            "correctAnswer": "ear[th]",
            "explanation": "ear[th] /ɜːθ/ phát âm là âm vô thanh /θ/, các từ còn lại (mo[th]er, clo[th]es, [th]ere) phát âm là âm hữu thanh /ð/."
          },
          {
            "id": "u10-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "loc[a]tion",
              "sp[a]ce",
              "pl[a]te",
              "p[a]lace"
            ],
            "correctAnswer": "p[a]lace",
            "explanation": "p[a]lace /ˈpæləs/ phát âm là /æ/, các từ còn lại (loc[a]tion, sp[a]ce, pl[a]te) phát âm là /eɪ/."
          },
          {
            "id": "u10-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "h[ou]se",
              "m[ou]ntain",
              "ar[ou]nd",
              "c[ou]ntryside"
            ],
            "correctAnswer": "c[ou]ntryside",
            "explanation": "c[ou]ntryside /ˈkʌntrisaɪd/ phát âm là /ʌ/, các từ còn lại (h[ou]se, m[ou]ntain, ar[ou]nd) phát âm là /aʊ/."
          },
          {
            "id": "u10-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "watch[es]",
              "cloth[es]",
              "hous[es]",
              "dish[es]"
            ],
            "correctAnswer": "cloth[es]",
            "explanation": "cloth[es] /kləʊðz/ có đuôi -es phát âm là /z/, các từ còn lại (watch[es], hous[es], dish[es]) phát âm là /ɪz/."
          },
          {
            "id": "u10-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "gr[ea]t",
              "m[ea]l",
              "s[ea]",
              "cl[ea]n"
            ],
            "correctAnswer": "gr[ea]t",
            "explanation": "gr[ea]t /ɡreɪt/ phát âm là /eɪ/, các từ còn lại (m[ea]l, s[ea], cl[ea]n) phát âm là /iː/."
          },
          {
            "id": "u10-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "f[u]ture",
              "c[u]pboard",
              "b[u]t",
              "f[u]n"
            ],
            "correctAnswer": "f[u]ture",
            "explanation": "f[u]ture /ˈfjuːtʃə(r)/ phát âm là /juː/, các từ còn lại (c[u]pboard, b[u]t, f[u]n) phát âm là /ʌ/."
          }
        ]
      },
      {
        "id": "u10-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u10-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "robot",
              "machine",
              "picture",
              "bedroom"
            ],
            "correctAnswer": "machine",
            "explanation": "\"machine\" /məˈʃiːn/ (ngoại lệ danh từ 2 âm tiết) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (robot, picture, bedroom) nhấn âm tiết thứ 1."
          },
          {
            "id": "u10-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "palace",
              "village",
              "cottage",
              "receive"
            ],
            "correctAnswer": "receive",
            "explanation": "\"receive\" /rɪˈsiːv/ (động từ 2 âm tiết) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (palace, village, cottage) là danh từ nhấn âm tiết thứ 1."
          },
          {
            "id": "u10-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "protect",
              "mountain",
              "kitchen",
              "solar"
            ],
            "correctAnswer": "protect",
            "explanation": "\"protect\" /prəˈtekt/ (động từ 2 âm tiết) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (mountain, kitchen, solar) nhấn âm tiết thứ 1."
          },
          {
            "id": "u10-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "enjoy",
              "modern",
              "perform",
              "prepare"
            ],
            "correctAnswer": "modern",
            "explanation": "\"modern\" /ˈmɒdn/ (tính từ 2 âm tiết) có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (enjoy, perform, prepare) là động từ nhấn âm tiết thứ 2."
          },
          {
            "id": "u10-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "hotel",
              "future",
              "housework",
              "garden"
            ],
            "correctAnswer": "hotel",
            "explanation": "\"hotel\" /həʊˈtel/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (future, housework, garden) nhấn âm tiết thứ 1."
          },
          {
            "id": "u10-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "island",
              "police",
              "destroy",
              "advice"
            ],
            "correctAnswer": "island",
            "explanation": "\"island\" /ˈaɪlənd/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (police, destroy, advice) nhấn âm tiết thứ 2."
          },
          {
            "id": "u10-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "clever",
              "peaceful",
              "explore",
              "wireless"
            ],
            "correctAnswer": "explore",
            "explanation": "\"explore\" /ɪkˈsplɔː(r)/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (clever, peaceful, wireless) là tính từ nhấn âm tiết thứ 1."
          },
          {
            "id": "u10-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "become",
              "decide",
              "forget",
              "water"
            ],
            "correctAnswer": "water",
            "explanation": "\"water\" /ˈwɔːtə(r)/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (become, decide, forget) là động từ nhấn âm tiết thứ 2."
          },
          {
            "id": "u10-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "beautiful",
              "favourite",
              "appliance",
              "interesting"
            ],
            "correctAnswer": "appliance",
            "explanation": "\"appliance\" /əˈplaɪəns/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (beautiful, favourite, interesting) nhấn âm tiết thứ 1."
          },
          {
            "id": "u10-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "location",
              "delicious",
              "energy",
              "computer"
            ],
            "correctAnswer": "energy",
            "explanation": "\"energy\" /ˈenədʒi/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (location, delicious, computer) nhấn âm tiết thứ 2."
          }
        ]
      },
      {
        "id": "u10-ex3",
        "number": 3,
        "title": "Exercise 3: Pronunciation in Context (Thực hành câu ngôi nhà tương lai)",
        "instruction": "Chọn đáp án đúng theo ngữ cảnh và yêu cầu phát âm.",
        "questions": [
          {
            "id": "u10-ex3-q1",
            "prompt": "Trong câu: \"My [dr]eam house in the coun[tr]y will have green [tr]ees\", có mấy từ chứa âm /tr/?",
            "options": [
              "2 từ (coun[tr]y, [tr]ees)",
              "1 từ ([dr]eam)",
              "3 từ",
              "Không từ nào"
            ],
            "correctAnswer": "2 từ (coun[tr]y, [tr]ees)",
            "explanation": "country và trees chứa /tr/, còn dream chứa /dr/."
          },
          {
            "id": "u10-ex3-q2",
            "prompt": "Chọn cặp từ chứa lần lượt /dr/ và /tr/ để điền vào câu: \"The robot can ______ a high-speed ______.\"",
            "options": [
              "[dr]ive – [tr]ain",
              "[tr]avel – [dr]eam",
              "[dr]aw – [dr]op",
              "[tr]y – [tr]actor"
            ],
            "correctAnswer": "[dr]ive – [tr]ain",
            "explanation": "drive a high-speed train (lái tàu cao tốc) có drive bắt đầu bằng /dr/ và train bắt đầu bằng /tr/."
          },
          {
            "id": "u10-ex3-q3",
            "prompt": "Chọn từ chứa âm /dr/ phù hợp với câu: \"In the future, a smart machine will wash and ______ our clothes.\"",
            "options": [
              "[dr]y",
              "[tr]y",
              "[tr]avel",
              "[tr]eat"
            ],
            "correctAnswer": "[dr]y",
            "explanation": "dry /draɪ/ (làm khô, sấy khô) vừa bắt đầu bằng /dr/ vừa hợp nghĩa với wash clothes."
          },
          {
            "id": "u10-ex3-q4",
            "prompt": "Chọn từ chứa âm /tr/ phù hợp với câu: \"We might ______ to the moon by super space car.\"",
            "options": [
              "[tr]avel",
              "[dr]ink",
              "[dr]op",
              "[dr]eam"
            ],
            "correctAnswer": "[tr]avel",
            "explanation": "travel to the moon (du hành tới mặt trăng) bắt đầu bằng /tr/."
          }
        ]
      }
    ],
    "book": "Book 2",
    "pages": "138–140",
    "extraNotes": [
      "Ngoại lệ với tính từ: một số ít tính từ 2 âm tiết có trọng âm rơi vào âm tiết thứ hai (thường bắt đầu bằng tiền tố a-): alone /əˈləʊn/ (cô đơn), afraid /əˈfreɪd/ (lo sợ), asleep /əˈsliːp/ (đang ngủ), alive /əˈlaɪv/ (còn sống).",
      "Ngoại lệ với danh từ: một số danh từ 2 âm tiết có trọng âm rơi vào âm tiết thứ hai: machine /məˈʃiːn/ (máy móc), hotel /həʊˈtel/ (khách sạn), police /pəˈliːs/ (cảnh sát), advice /ədˈvaɪs/ (lời khuyên).",
      "Ngoại lệ với động từ: một số động từ 2 âm tiết có trọng âm rơi vào âm tiết thứ nhất (thường có âm tiết thứ 2 là nguyên âm ngắn hoặc kết thúc bằng -en, -er, -el, -ish, -y…): listen /ˈlɪsn/ (lắng nghe), open /ˈəʊpən/ (mở), visit /ˈvɪzɪt/ (thăm quan), water /ˈwɔːtə/ (tưới nước), happen /ˈhæpən/ (xảy ra), answer /ˈɑːnsə/ (trả lời).",
      "Danh từ ghép (Compound nouns): đa số danh từ ghép có 2 âm tiết có trọng âm rơi vào từ đầu tiên (âm tiết thứ nhất): bedroom /ˈbedruːm/ (bed + room), housework /ˈhaʊswɜːk/ (house + work)."
    ]
  },
  {
    "unitId": "unit-11",
    "unitNumber": 11,
    "unitTitle": "Our Greener World",
    "topicFocus": "Rhythm in sentences (Nhịp điệu trong câu)",
    "summaryNote": "Trong tiếng Anh, nhịp điệu câu (Rhythm) được tạo nên nhờ việc NHẤN MẠNH (đọc to, rõ, dài hơn) vào các TỪ NỘI DUNG (Content words: danh từ, động từ chính, tính từ, trạng từ, từ phủ định) và ĐỌC LƯỚT NHẸ các TỪ CHỨC NĂNG (Function words: mạo từ a/an/the, giới từ in/on/to, đại từ, trợ động từ).",
    "sounds": [
      {
        "symbol": "Stressed (Từ được nhấn)",
        "name": "Content Words (Từ mang nội dung chính)",
        "howToPronounce": "Đọc TO hơn, RÕ hơn và KÉO DÀI hơn để tạo nhịp phách chính trong câu. Hiển thị bằng phần trong ngoặc vuông [gạch chân in đậm].",
        "spellingPatterns": [
          "Danh từ (water, bottles, environment, trees)",
          "Động từ chính (recycle, reuse, plant, save)",
          "Tính từ & Trạng từ (green, plastic, more)",
          "Trợ động từ phủ định (don't, shouldn't, won't)"
        ],
        "examples": [
          {
            "word": "[re-cy-cle]",
            "ipa": "/ˌriːˈsaɪkl/ (Verb)",
            "meaningVi": "tái chế (động từ chính ➔ Nhấn)"
          },
          {
            "word": "[bot-tles]",
            "ipa": "/ˈbɒtlz/ (Noun)",
            "meaningVi": "những cái chai (danh từ ➔ Nhấn)"
          },
          {
            "word": "[greener]",
            "ipa": "/ˈɡriːnə/ (Adj)",
            "meaningVi": "xanh hơn (tính từ ➔ Nhấn)"
          },
          {
            "word": "[plant] [trees]",
            "ipa": "/plɑːnt triːz/",
            "meaningVi": "trồng cây (V + N ➔ Nhấn cả hai)"
          },
          {
            "word": "[don't] [throw]",
            "ipa": "/dəʊnt θrəʊ/",
            "meaningVi": "đừng vứt (Phủ định + V ➔ Nhấn)"
          },
          {
            "word": "[save] [water]",
            "ipa": "/seɪv ˈwɔːtə/",
            "meaningVi": "tiết kiệm nước (V + N ➔ Nhấn)"
          }
        ]
      },
      {
        "symbol": "Unstressed (Từ đọc lướt)",
        "name": "Function Words (Từ chức năng ngữ pháp)",
        "howToPronounce": "Đọc NHẸ, NHANH và thường giảm âm về nguyên âm yếu /ə/ (schwa) để giữ nhịp câu tự nhiên, trôi chảy.",
        "spellingPatterns": [
          "Mạo từ (a, an, the) & Liên từ (if, and, or)",
          "Giới từ (in, on, of, to, for)",
          "Đại từ nhân xưng / sở hữu (we, you, they, our, their)",
          "Trợ động từ khẳng định (will, can, should, are)"
        ],
        "examples": [
          {
            "word": "If we [re-cy-cle]...",
            "ipa": "/ɪf wi .../ (if, we đọc nhẹ)",
            "meaningVi": "Nếu chúng ta tái chế..."
          },
          {
            "word": "...we will [save] the [world]",
            "ipa": "/wi wəl ... ðə .../ (will, the đọc lướt)",
            "meaningVi": "...chúng ta sẽ cứu thế giới"
          },
          {
            "word": "a [bag] of [rub-bish]",
            "ipa": "/ə bæɡ əv ˈrʌbɪʃ/",
            "meaningVi": "một túi rác (a, of đọc là /ə/, /əv/)"
          },
          {
            "word": "We should [re-use] [jars]",
            "ipa": "/wi ʃəd .../ (we, should đọc nhẹ)",
            "meaningVi": "Chúng ta nên tái sử dụng lọ"
          }
        ]
      }
    ],
    "minimalPairsTitle": "So sánh từ được nhấn và từ đọc lướt trong câu SGK",
    "minimalPairs": [
      {
        "leftWord": "If we [go] to [school] by [bus]",
        "leftIpa": "Nhấn: go – school – bus",
        "leftMeaningVi": "Từ nội dung (V, N, N) được nhấn mạnh",
        "rightWord": "if, we, to, by",
        "rightIpa": "Đọc lướt nhẹ (/ɪf wi tə baɪ/)",
        "rightMeaningVi": "Liên từ, đại từ, giới từ không nhấn"
      },
      {
        "leftWord": "We'll [help] the [en-vi-ron-ment]",
        "leftIpa": "Nhấn: help – environment",
        "leftMeaningVi": "Động từ chính và danh từ được nhấn",
        "rightWord": "we'll, the",
        "rightIpa": "Đọc lướt nhẹ (/wɪl ðə/)",
        "rightMeaningVi": "Đại từ + trợ động từ viết tắt và mạo từ"
      },
      {
        "leftWord": "[Put] the [rub-bish] in the [bin]",
        "leftIpa": "Nhấn: Put – rubbish – bin",
        "leftMeaningVi": "Động từ mệnh lệnh và 2 danh từ được nhấn",
        "rightWord": "the, in, the",
        "rightIpa": "Đọc lướt nhẹ (/ðə ɪn ðə/)",
        "rightMeaningVi": "Mạo từ và giới từ đọc lướt"
      },
      {
        "leftWord": "[Don't] [use] [plas-tic] [bags]",
        "leftIpa": "Nhấn cả 4 từ: Don't – use – plastic – bags",
        "leftMeaningVi": "Trợ động từ phủ định + V + Adj + N đều được nhấn",
        "rightWord": "We can [use] [cloth] [bags]",
        "rightIpa": "we, can đọc lướt; nhấn use – cloth – bags",
        "rightMeaningVi": "Trợ động từ khẳng định \"can\" đọc nhẹ /kən/"
      }
    ],
    "exercises": [
      {
        "id": "u11-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u11-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "pl[a]stic",
              "p[a]per",
              "s[a]ve",
              "st[a]tion"
            ],
            "correctAnswer": "pl[a]stic",
            "explanation": "pl[a]stic /ˈplæstɪk/ phát âm là /æ/, các từ còn lại (p[a]per, s[a]ve, st[a]tion) phát âm là /eɪ/."
          },
          {
            "id": "u11-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "l[ea]f",
              "cl[ea]n",
              "h[ea]d",
              "t[ea]ch"
            ],
            "correctAnswer": "h[ea]d",
            "explanation": "h[ea]d /hed/ phát âm là /e/, các từ còn lại (l[ea]f, cl[ea]n, t[ea]ch) phát âm là /iː/."
          },
          {
            "id": "u11-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "b[o]ttle",
              "cl[o]thes",
              "dr[o]p",
              "sh[o]p"
            ],
            "correctAnswer": "cl[o]thes",
            "explanation": "cl[o]thes /kləʊðz/ phát âm là /əʊ/, các từ còn lại (b[o]ttle, dr[o]p, sh[o]p) phát âm là /ɒ/."
          },
          {
            "id": "u11-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "c[u]t",
              "r[u]bbish",
              "p[u]blic",
              "f[u]ture"
            ],
            "correctAnswer": "f[u]ture",
            "explanation": "f[u]ture /ˈfjuːtʃə(r)/ phát âm là /juː/, các từ còn lại (c[u]t, r[u]bbish, p[u]blic) phát âm là /ʌ/."
          },
          {
            "id": "u11-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[c]ity",
              "[c]ycle",
              "re[c]ycle",
              "[c]lean"
            ],
            "correctAnswer": "[c]lean",
            "explanation": "[c]lean /kliːn/ có chữ \"c\" phát âm là /k/, các từ còn lại ([c]ity, [c]ycle, re[c]ycle) phát âm là /s/."
          },
          {
            "id": "u11-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[th]row",
              "[th]ing",
              "clo[th]es",
              "ear[th]"
            ],
            "correctAnswer": "clo[th]es",
            "explanation": "clo[th]es /kləʊðz/ phát âm là /ð/, các từ còn lại ([th]row, [th]ing, ear[th]) phát âm là /θ/."
          },
          {
            "id": "u11-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "b[i]n",
              "t[i]me",
              "l[i]brary",
              "env[i]ronment"
            ],
            "correctAnswer": "b[i]n",
            "explanation": "b[i]n /bɪn/ phát âm là /ɪ/, các từ còn lại (t[i]me, l[i]brary, env[i]ronment) phát âm là /aɪ/."
          },
          {
            "id": "u11-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "b[oo]k",
              "l[oo]k",
              "sch[oo]l",
              "g[oo]d"
            ],
            "correctAnswer": "sch[oo]l",
            "explanation": "sch[oo]l /skuːl/ phát âm là /uː/, các từ còn lại (b[oo]k, l[oo]k, g[oo]d) phát âm là /ʊ/."
          },
          {
            "id": "u11-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "n[ow]",
              "gr[ow]",
              "t[ow]n",
              "fl[ow]er"
            ],
            "correctAnswer": "gr[ow]",
            "explanation": "gr[ow] /ɡrəʊ/ phát âm là /əʊ/, các từ còn lại (n[ow], t[ow]n, fl[ow]er) phát âm là /aʊ/."
          },
          {
            "id": "u11-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "reu[s]e",
              "de[s]k",
              "pla[s]tic",
              "ba[s]ket"
            ],
            "correctAnswer": "reu[s]e",
            "explanation": "reu[s]e /ˌriːˈjuːz/ có chữ \"s\" phát âm là /z/, các từ còn lại (de[s]k, pla[s]tic, ba[s]ket) phát âm là /s/."
          }
        ]
      },
      {
        "id": "u11-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u11-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "bottle",
              "paper",
              "reduce",
              "rubbish"
            ],
            "correctAnswer": "reduce",
            "explanation": "\"reduce\" /rɪˈdjuːs/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (bottle, paper, rubbish) là danh từ nhấn âm tiết thứ 1."
          },
          {
            "id": "u11-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "plastic",
              "super",
              "garden",
              "exchange"
            ],
            "correctAnswer": "exchange",
            "explanation": "\"exchange\" /ɪksˈtʃeɪndʒ/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (plastic, super, garden) nhấn âm tiết thứ 1."
          },
          {
            "id": "u11-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "create",
              "protect",
              "warning",
              "pollute"
            ],
            "correctAnswer": "warning",
            "explanation": "\"warning\" /ˈwɔːnɪŋ/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (create, protect, pollute) là động từ nhấn âm tiết thứ 2."
          },
          {
            "id": "u11-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "market",
              "prevent",
              "picnic",
              "symbol"
            ],
            "correctAnswer": "prevent",
            "explanation": "\"prevent\" /prɪˈvent/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (market, picnic, symbol) nhấn âm tiết thứ 1."
          },
          {
            "id": "u11-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "surround",
              "forest",
              "arrive",
              "destroy"
            ],
            "correctAnswer": "forest",
            "explanation": "\"forest\" /ˈfɒrɪst/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (surround, arrive, destroy) là động từ nhấn âm tiết thứ 2."
          },
          {
            "id": "u11-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "reward",
              "clever",
              "river",
              "dirty"
            ],
            "correctAnswer": "reward",
            "explanation": "\"reward\" /rɪˈwɔːd/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (clever, river, dirty) nhấn âm tiết thứ 1."
          },
          {
            "id": "u11-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "interview",
              "president",
              "article",
              "recycle"
            ],
            "correctAnswer": "recycle",
            "explanation": "\"recycle\" /ˌriːˈsaɪkl/ có trọng âm chính rơi vào âm tiết thứ 2; các từ còn lại (interview, president, article) nhấn âm tiết thứ 1."
          },
          {
            "id": "u11-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "favourite",
              "creative",
              "container",
              "polluted"
            ],
            "correctAnswer": "favourite",
            "explanation": "\"favourite\" /ˈfeɪvərɪt/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (creative, container, polluted) nhấn âm tiết thứ 2."
          },
          {
            "id": "u11-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "expensive",
              "battery",
              "general",
              "charity"
            ],
            "correctAnswer": "expensive",
            "explanation": "\"expensive\" /ɪkˈspensɪv/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (battery, general, charity) nhấn âm tiết thứ 1."
          },
          {
            "id": "u11-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "activity",
              "environment",
              "supermarket",
              "reusable"
            ],
            "correctAnswer": "supermarket",
            "explanation": "\"supermarket\" /ˈsuːpəmɑːkɪt/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (activity, environment, reusable) nhấn âm tiết thứ 2."
          }
        ]
      },
      {
        "id": "u11-ex3",
        "number": 3,
        "title": "Exercise 3: Counting Stressed Beats (Đếm số từ được nhấn trong câu)",
        "instruction": "Xác định số lượng từ mang trọng âm nhịp điệu trong câu.",
        "questions": [
          {
            "id": "u11-ex3-q1",
            "prompt": "Trong câu: \"We should [save] [energy] at [school]\", có mấy từ được nhấn mạnh?",
            "options": [
              "3 từ (save, energy, school)",
              "2 từ (We, should)",
              "4 từ (should, save, energy, school)",
              "6 từ (tất cả các từ)"
            ],
            "correctAnswer": "3 từ (save, energy, school)",
            "explanation": "3 từ nội dung được nhấn là động từ [save], danh từ [energy] và danh từ [school]."
          },
          {
            "id": "u11-ex3-q2",
            "prompt": "Trong câu: \"If they [use] [reusable] [bags], they'll [reduce] [plastic] [waste]\", những từ nào được đọc lướt nhẹ?",
            "options": [
              "If, they, they'll",
              "use, bags, reduce",
              "reusable, plastic, waste",
              "reduce, plastic, they'll"
            ],
            "correctAnswer": "If, they, they'll",
            "explanation": "Liên từ \"If\", đại từ \"they\" và \"they'll\" là các từ chức năng nên được đọc lướt nhẹ."
          },
          {
            "id": "u11-ex3-q3",
            "prompt": "Tại sao việc giữ đúng nhịp điệu (Rhythm) khi nói tiếng Anh lại quan trọng?",
            "options": [
              "Giúp câu nói tự nhiên, trôi chảy và người nghe dễ nắm bắt các từ khóa quan trọng",
              "Để đọc tất cả các từ đều nhau như robot",
              "Để bỏ qua không cần phát âm các danh từ và động từ",
              "Chỉ áp dụng khi hát, không áp dụng khi nói"
            ],
            "correctAnswer": "Giúp câu nói tự nhiên, trôi chảy và người nghe dễ nắm bắt các từ khóa quan trọng",
            "explanation": "Nhịp điệu tiếng Anh (stress-timed rhythm) giúp làm nổi bật các từ mang thông tin chính (content words)."
          },
          {
            "id": "u11-ex3-q4",
            "prompt": "Chọn từ được nhấn mạnh trong vế câu: \"...so we can [protect] our [planet].\"",
            "options": [
              "[protect] & [planet]",
              "so & we",
              "can & our",
              "we & can"
            ],
            "correctAnswer": "[protect] & [planet]",
            "explanation": "protect (động từ) và planet (danh từ) là hai từ nội dung được nhấn mạnh."
          }
        ],
        "tongueTwisters": [
          {
            "sentence": "If you reduce plastic, you will save the Earth.",
            "ipa": "Nếu bạn giảm dùng đồ nhựa, bạn sẽ bảo vệ Trái Đất."
          },
          {
            "sentence": "The children are collecting bottles in the park.",
            "ipa": "Trẻ em đang thu gom chai lọ trong công viên."
          },
          {
            "sentence": "Planting trees will make our neighbourhood green.",
            "ipa": "Trồng cây xanh sẽ làm cho khu phố của chúng ta thêm xanh."
          },
          {
            "sentence": "We can bring reusable bags to the market.",
            "ipa": "Chúng ta có thể mang túi tái sử dụng đi chợ."
          },
          {
            "sentence": "Is it easy to recycle old paper?",
            "ipa": "Việc tái chế giấy cũ có dễ dàng không?"
          }
        ]
      }
    ],
    "book": "Book 2",
    "pages": "180–181",
    "extraNotes": [
      "Dạng yếu của từ chức năng (Weak forms): khi nói tự nhiên theo nhịp điệu, các từ chức năng thường được phát âm ở dạng yếu (chuyển nguyên âm thành âm /ə/ hoặc /ɪ/):",
      "  • to /tuː/ → /tə/;  for /fɔː/ → /fə/;  can /kæn/ → /kən/",
      "  • and /ænd/ → /ənd/ hoặc /ən/;  of /ɒv/ → /əv/;  them /ðem/ → /ðəm/",
      "Ngoại lệ khi nhấn mạnh (Emphasis / Contrast): khi người nói muốn làm nổi bật ý đối lập, đính chính thông tin hoặc bày tỏ cảm xúc mạnh mẽ, từ chức năng có thể được nhấn trọng âm:",
      "  • I said put it ON the table, not UNder it! (Tôi bảo đặt TRÊN bàn, không phải DƯỚI gầm bàn!)"
    ]
  },
  {
    "unitId": "unit-12",
    "unitNumber": 12,
    "unitTitle": "Robots",
    "topicFocus": "Falling tone in statements (Ngữ điệu đi xuống ở cuối câu kể)",
    "summaryNote": "Trong tiếng Anh, khi nói một câu khẳng định hoặc phủ định thông thường (Statement) nhằm thông báo sự việc, giọng đọc sẽ HẠ THẤP XUỐNG (Falling tone ↘) ở từ được nhấn cuối cùng của câu. Ngược lại, câu hỏi Yes/No (Yes/No question) thường lên giọng (↗) ở cuối câu.",
    "sounds": [
      {
        "symbol": "Falling Tone (↘)",
        "name": "Ngữ điệu đi xuống ở cuối câu kể & câu hỏi Wh-",
        "howToPronounce": "Giữ giọng đều theo nhịp câu, đến từ mang nội dung cuối cùng của câu thì HẠ GIỌNG TRẦM XUỐNG (↘) để báo hiệu câu nói đã kết thúc chắc chắn.",
        "spellingPatterns": [
          "Câu kể khẳng định (Statements: Robots can work in factories. ↘)",
          "Câu kể phủ định (Negative statements: Home robots can't teach in classes. ↘)",
          "Câu cảm thán & Câu hỏi có từ để hỏi Wh- (What can this robot do? ↘)"
        ],
        "examples": [
          {
            "word": "I often water the [plants]. ↘",
            "ipa": "Hạ giọng ở \"plants\" ↘",
            "meaningVi": "Tôi thường tưới cây. (Câu kể)"
          },
          {
            "word": "Shifa is the smartest [robot]. ↘",
            "ipa": "Hạ giọng ở \"robot\" ↘",
            "meaningVi": "Shifa là robot thông minh nhất. (Câu kể)"
          },
          {
            "word": "Doctor robots can look after sick [people]. ↘",
            "ipa": "Hạ giọng ở \"people\" ↘",
            "meaningVi": "Robot bác sĩ có thể chăm sóc người bệnh."
          },
          {
            "word": "My robot can do the [housework]. ↘",
            "ipa": "Hạ giọng ở \"housework\" ↘",
            "meaningVi": "Robot của tôi có thể làm việc nhà."
          },
          {
            "word": "Worker robots can move heavy [things]. ↘",
            "ipa": "Hạ giọng ở \"things\" ↘",
            "meaningVi": "Robot công nhân có thể di chuyển đồ nặng."
          }
        ]
      },
      {
        "symbol": "Rising Tone (↗)",
        "name": "Ngữ điệu đi lên (Dùng để đối chiếu ở câu hỏi Yes/No hoặc liệt kê)",
        "howToPronounce": "Nâng cao giọng (↗) ở âm tiết cuối câu hỏi Yes/No để thể hiện sự chờ đợi câu trả lời Đúng/Sai, hoặc lên giọng ở các vế đầu khi liệt kê.",
        "spellingPatterns": [
          "Câu hỏi Yes/No (Can a robot cook meals? ↗)",
          "Các phần tử đứng trước trong danh sách liệt kê (wash [dishes] ↗, iron [clothes] ↗, and do the [washing] ↘)"
        ],
        "examples": [
          {
            "word": "Can robots understand our [feelings]? ↗",
            "ipa": "Lên giọng ở \"feelings\" ↗",
            "meaningVi": "Robot có hiểu được cảm xúc của chúng ta không? (Yes/No)"
          },
          {
            "word": "Is WB2 the strongest [robot]? ↗",
            "ipa": "Lên giọng ở \"robot\" ↗",
            "meaningVi": "WB2 có phải là robot khỏe nhất không? (Yes/No)"
          },
          {
            "word": "Do you have a home [robot]? ↗",
            "ipa": "Lên giọng ở \"robot\" ↗",
            "meaningVi": "Bạn có robot gia đình không? (Yes/No)"
          },
          {
            "word": "It can [cook] ↗, [clean] ↗, and [wash]. ↘",
            "ipa": "Lên giọng khi liệt kê, hạ giọng ở từ cuối ↘",
            "meaningVi": "Nó có thể nấu ăn, dọn dẹp và giặt giũ."
          }
        ]
      }
    ],
    "minimalPairsTitle": "So sánh ngữ điệu Câu kể (↘) và Câu hỏi Yes/No (↗)",
    "minimalPairs": [
      {
        "leftWord": "Home robots can cook [meals]. ↘",
        "leftIpa": "Câu kể (Statement) ➔ Hạ giọng ↘",
        "leftMeaningVi": "Robot gia đình có thể nấu các bữa ăn.",
        "rightWord": "Can home robots cook [meals]? ↗",
        "rightIpa": "Câu hỏi Yes/No ➔ Lên giọng ↗",
        "rightMeaningVi": "Robot gia đình có thể nấu ăn không?"
      },
      {
        "leftWord": "WB2 is the strongest [robot]. ↘",
        "leftIpa": "Câu kể (Statement) ➔ Hạ giọng ↘",
        "leftMeaningVi": "WB2 là robot khỏe nhất.",
        "rightWord": "Is WB2 the strongest [robot]? ↗",
        "rightIpa": "Câu hỏi Yes/No ➔ Lên giọng ↗",
        "rightMeaningVi": "WB2 có phải là robot khỏe nhất không?"
      },
      {
        "leftWord": "Space robots can build [stations]. ↘",
        "leftIpa": "Câu kể (Statement) ➔ Hạ giọng ↘",
        "leftMeaningVi": "Robot vũ trụ có thể xây trạm không gian.",
        "rightWord": "Can space robots build [stations]? ↗",
        "rightIpa": "Câu hỏi Yes/No ➔ Lên giọng ↗",
        "rightMeaningVi": "Robot vũ trụ có xây được trạm không gian không?"
      },
      {
        "leftWord": "Teacher robots can teach [English]. ↘",
        "leftIpa": "Câu kể (Statement) ➔ Hạ giọng ↘",
        "leftMeaningVi": "Robot giáo viên có thể dạy tiếng Anh.",
        "rightWord": "Can teacher robots teach [English]? ↗",
        "rightIpa": "Câu hỏi Yes/No ➔ Lên giọng ↗",
        "rightMeaningVi": "Robot giáo viên có dạy được tiếng Anh không?"
      }
    ],
    "exercises": [
      {
        "id": "u12-ex1",
        "number": 1,
        "title": "Exercise 1: Odd One Out – Phát âm (10 câu)",
        "instruction": "Choose the word whose underlined part is pronounced differently from the others.",
        "questions": [
          {
            "id": "u12-ex1-q1",
            "prompt": "Câu 1: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "str[o]ng",
              "d[o]ctor",
              "h[o]me",
              "h[o]spital"
            ],
            "correctAnswer": "h[o]me",
            "explanation": "h[o]me /həʊm/ phát âm là /əʊ/, các từ còn lại (str[o]ng, d[o]ctor, h[o]spital) phát âm là /ɒ/."
          },
          {
            "id": "u12-ex1-q2",
            "prompt": "Câu 2: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "t[ea]cher",
              "m[ea]l",
              "h[ea]vy",
              "cl[ea]n"
            ],
            "correctAnswer": "h[ea]vy",
            "explanation": "h[ea]vy /ˈhevi/ phát âm là /e/, các từ còn lại (t[ea]cher, m[ea]l, cl[ea]n) phát âm là /iː/."
          },
          {
            "id": "u12-ex1-q3",
            "prompt": "Câu 3: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "d[i]sh",
              "l[i]ke",
              "pr[i]ce",
              "l[i]fe"
            ],
            "correctAnswer": "d[i]sh",
            "explanation": "d[i]sh /dɪʃ/ phát âm là /ɪ/, các từ còn lại (l[i]ke, pr[i]ce, l[i]fe) phát âm là /aɪ/."
          },
          {
            "id": "u12-ex1-q4",
            "prompt": "Câu 4: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "s[u]n",
              "[u]seful",
              "b[u]t",
              "m[u]ch"
            ],
            "correctAnswer": "[u]seful",
            "explanation": "[u]seful /ˈjuːsfl/ phát âm là /juː/, các từ còn lại (s[u]n, b[u]t, m[u]ch) phát âm là /ʌ/."
          },
          {
            "id": "u12-ex1-q5",
            "prompt": "Câu 5: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "m[a]ke",
              "st[a]tion",
              "sp[a]ce",
              "sm[a]rt"
            ],
            "correctAnswer": "sm[a]rt",
            "explanation": "sm[a]rt /smɑːt/ phát âm là /ɑː/, các từ còn lại (m[a]ke, st[a]tion, sp[a]ce) phát âm là /eɪ/."
          },
          {
            "id": "u12-ex1-q6",
            "prompt": "Câu 6: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[c]lean",
              "re[c]eive",
              "pri[c]e",
              "[c]ity"
            ],
            "correctAnswer": "[c]lean",
            "explanation": "[c]lean /kliːn/ có chữ \"c\" phát âm là /k/, các từ còn lại (re[c]eive, pri[c]e, [c]ity) phát âm là /s/."
          },
          {
            "id": "u12-ex1-q7",
            "prompt": "Câu 7: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[th]ing",
              "[th]ese",
              "[th]ink",
              "mon[th]"
            ],
            "correctAnswer": "[th]ese",
            "explanation": "[th]ese /ðiːz/ phát âm là /ð/, các từ còn lại ([th]ing, [th]ink, mon[th]) phát âm là /θ/."
          },
          {
            "id": "u12-ex1-q8",
            "prompt": "Câu 8: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "m[oo]n",
              "l[oo]k",
              "r[oo]m",
              "f[oo]d"
            ],
            "correctAnswer": "l[oo]k",
            "explanation": "l[oo]k /lʊk/ phát âm là /ʊ/, các từ còn lại (m[oo]n, r[oo]m, f[oo]d) phát âm là /uː/."
          },
          {
            "id": "u12-ex1-q9",
            "prompt": "Câu 9: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "[ch]ore",
              "tea[ch]",
              "[ch]eap",
              "s[ch]ool"
            ],
            "correctAnswer": "s[ch]ool",
            "explanation": "s[ch]ool /skuːl/ có \"ch\" phát âm là /k/, các từ còn lại ([ch]ore, tea[ch], [ch]eap) phát âm là /tʃ/."
          },
          {
            "id": "u12-ex1-q10",
            "prompt": "Câu 10: Chọn từ có phần gạch chân được phát âm khác với các từ còn lại:",
            "options": [
              "a[s]",
              "[s]pace",
              "[s]mart",
              "[s]mall"
            ],
            "correctAnswer": "a[s]",
            "explanation": "a[s] /æz/ có chữ \"s\" phát âm là /z/, các từ còn lại ([s]pace, [s]mart, [s]mall) phát âm là /s/."
          }
        ]
      },
      {
        "id": "u12-ex2",
        "number": 2,
        "title": "Exercise 2: Word Stress – Trọng âm từ (10 câu)",
        "instruction": "Choose the word that has a different stress pattern from the others.",
        "questions": [
          {
            "id": "u12-ex2-q1",
            "prompt": "Câu 1: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "repair",
              "robot",
              "doctor",
              "worker"
            ],
            "correctAnswer": "repair",
            "explanation": "\"repair\" /rɪˈpeə(r)/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (robot, doctor, worker) là danh từ nhấn âm tiết thứ 1."
          },
          {
            "id": "u12-ex2-q2",
            "prompt": "Câu 2: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "perform",
              "useful",
              "teacher",
              "heavy"
            ],
            "correctAnswer": "perform",
            "explanation": "\"perform\" /pəˈfɔːm/ (động từ) có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (useful, teacher, heavy) nhấn âm tiết thứ 1. (Lưu ý: phương án a \"perform\" nhấn âm 2 khác với b, c, d nhấn âm 1)."
          },
          {
            "id": "u12-ex2-q3",
            "prompt": "Câu 3: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "express",
              "human",
              "agree",
              "complete"
            ],
            "correctAnswer": "human",
            "explanation": "\"human\" /ˈhjuːmən/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (express, agree, complete) nhấn âm tiết thứ 2."
          },
          {
            "id": "u12-ex2-q4",
            "prompt": "Câu 4: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "washing",
              "garden",
              "machine",
              "planet"
            ],
            "correctAnswer": "machine",
            "explanation": "\"machine\" /məˈʃiːn/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (washing, garden, planet) nhấn âm tiết thứ 1."
          },
          {
            "id": "u12-ex2-q5",
            "prompt": "Câu 5: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "feeling",
              "destroy",
              "receive",
              "prevent"
            ],
            "correctAnswer": "feeling",
            "explanation": "\"feeling\" /ˈfiːlɪŋ/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (destroy, receive, prevent) nhấn âm tiết thứ 2."
          },
          {
            "id": "u12-ex2-q6",
            "prompt": "Câu 6: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "quiet",
              "simple",
              "protect",
              "clever"
            ],
            "correctAnswer": "protect",
            "explanation": "\"protect\" /prəˈtekt/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (quiet, simple, clever) nhấn âm tiết thứ 1."
          },
          {
            "id": "u12-ex2-q7",
            "prompt": "Câu 7: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "favourite",
              "hospital",
              "marvellous",
              "delicious"
            ],
            "correctAnswer": "delicious",
            "explanation": "\"delicious\" /dɪˈlɪʃəs/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (favourite, hospital, marvellous) nhấn âm tiết thứ 1."
          },
          {
            "id": "u12-ex2-q8",
            "prompt": "Câu 8: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "important",
              "invention",
              "expensive",
              "century"
            ],
            "correctAnswer": "century",
            "explanation": "\"century\" /ˈsentʃəri/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (important, invention, expensive) nhấn âm tiết thứ 2."
          },
          {
            "id": "u12-ex2-q9",
            "prompt": "Câu 9: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "general",
              "difficult",
              "furniture",
              "assistant"
            ],
            "correctAnswer": "assistant",
            "explanation": "\"assistant\" /əˈsɪstənt/ có trọng âm rơi vào âm tiết thứ 2; các từ còn lại (general, difficult, furniture) nhấn âm tiết thứ 1."
          },
          {
            "id": "u12-ex2-q10",
            "prompt": "Câu 10: Chọn từ có vị trí trọng âm khác với các từ còn lại:",
            "options": [
              "ability",
              "supermarket",
              "activity",
              "environment"
            ],
            "correctAnswer": "supermarket",
            "explanation": "\"supermarket\" /ˈsuːpəmɑːkɪt/ có trọng âm rơi vào âm tiết thứ 1; các từ còn lại (ability, activity, environment) nhấn âm tiết thứ 2."
          }
        ]
      },
      {
        "id": "u12-ex3",
        "number": 3,
        "title": "Exercise 3: Intonation Practice (Chọn ngữ điệu đúng cho câu - 10 câu)",
        "instruction": "Choose the correct intonation (Rising ↗ or Falling ↘) for each sentence then practise saying it.",
        "questions": [
          {
            "id": "u12-ex3-q1",
            "prompt": "Câu 1: \"Robots can help humans do the housework.\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Falling ↘ (Xuống giọng ở cuối câu)",
            "explanation": "Câu trần thuật khẳng định (Statement) nên dùng ngữ điệu xuống (Falling ↘) ở cuối câu."
          },
          {
            "id": "u12-ex3-q2",
            "prompt": "Câu 2: \"Can your home robot cook meals?\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Rising ↗ (Lên giọng ở cuối câu)",
            "explanation": "Câu hỏi Yes/No bắt đầu bằng \"Can...?\" nên dùng ngữ điệu lên (Rising ↗) ở cuối câu."
          },
          {
            "id": "u12-ex3-q3",
            "prompt": "Câu 3: \"What can worker robots do in factories?\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Falling ↘ (Xuống giọng ở cuối câu)",
            "explanation": "Câu hỏi có từ để hỏi Wh- (\"What...?\") nên dùng ngữ điệu xuống (Falling ↘) ở cuối câu."
          },
          {
            "id": "u12-ex3-q4",
            "prompt": "Câu 4: \"Is that the biggest robot in the exhibition?\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Rising ↗ (Lên giọng ở cuối câu)",
            "explanation": "Câu hỏi Yes/No bắt đầu bằng \"Is that...?\" nên dùng ngữ điệu lên (Rising ↗) ở cuối câu."
          },
          {
            "id": "u12-ex3-q5",
            "prompt": "Câu 5: \"Doctor robots cannot understand human emotions.\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Falling ↘ (Xuống giọng ở cuối câu)",
            "explanation": "Câu trần thuật phủ định (Negative statement) khẳng định một thông tin nên dùng ngữ điệu xuống (Falling ↘)."
          },
          {
            "id": "u12-ex3-q6",
            "prompt": "Câu 6: \"Please put the dirty dishes into the sink.\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Falling ↘ (Xuống giọng ở cuối câu)",
            "explanation": "Câu mệnh lệnh / yêu cầu (Command) dùng ngữ điệu xuống (Falling ↘) ở cuối câu."
          },
          {
            "id": "u12-ex3-q7",
            "prompt": "Câu 7: \"Will robots replace teachers in the future?\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Rising ↗ (Lên giọng ở cuối câu)",
            "explanation": "Câu hỏi Yes/No bắt đầu bằng \"Will...?\" nên dùng ngữ điệu lên (Rising ↗) ở cuối câu."
          },
          {
            "id": "u12-ex3-q8",
            "prompt": "Câu 8: \"My father bought a modern robot last week.\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Falling ↘ (Xuống giọng ở cuối câu)",
            "explanation": "Câu trần thuật kể lại sự việc đã xảy ra (Statement) nên dùng ngữ điệu xuống (Falling ↘)."
          },
          {
            "id": "u12-ex3-q9",
            "prompt": "Câu 9: \"Do you agree with his opinion about robots?\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Rising ↗ (Lên giọng ở cuối câu)",
            "explanation": "Câu hỏi Yes/No bắt đầu bằng \"Do you...?\" nên dùng ngữ điệu lên (Rising ↗) ở cuối câu."
          },
          {
            "id": "u12-ex3-q10",
            "prompt": "Câu 10: \"WB2 is the strongest machine in the lab.\"",
            "options": [
              "Rising ↗ (Lên giọng ở cuối câu)",
              "Falling ↘ (Xuống giọng ở cuối câu)"
            ],
            "correctAnswer": "Falling ↘ (Xuống giọng ở cuối câu)",
            "explanation": "Câu trần thuật khẳng định thông tin (Statement) nên dùng ngữ điệu xuống (Falling ↘) ở cuối câu."
          }
        ]
      }
    ],
    "book": "Book 2",
    "pages": "220–222",
    "extraNotes": [
      "Vị trí bắt đầu hạ giọng: ngữ điệu xuống thường bắt đầu rơi từ trọng âm của từ nội dung cuối cùng trong câu và hạ thấp hẳn ở âm tiết kết thúc câu.",
      "So sánh với câu hỏi Yes/No:",
      "  • Câu trần thuật (Statements): xuống giọng ở cuối câu (ví dụ: Robots can cook meals ↘.)",
      "  • Câu hỏi Yes/No: lên giọng ở cuối câu (ví dụ: Can robots cook meals ↗?)",
      "Các loại câu khác cũng dùng ngữ điệu xuống ↘: câu hỏi có từ để hỏi (Wh-questions), câu mệnh lệnh (Commands / Orders), câu cảm thán (Exclamations), mục cuối cùng trong liệt kê (Final list item)."
    ]
  }
];

export function getUnitPronunciationData(unitNumber: number): UnitPronunciationData {
  return (
    GS6_PRONUNCIATION_UNITS.find((u) => u.unitNumber === unitNumber) ||
    GS6_PRONUNCIATION_UNITS[0]
  );
}
