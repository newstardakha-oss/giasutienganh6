/**
 * Dữ liệu Luyện Phát Âm (Pronunciation) Tiếng Anh 6 - Global Success (Unit 1 - 12)
 * Quy ước: Phần nằm trong ngoặc vuông [ ] là âm tiết được gạch chân và in đậm, ví dụ: m[a]ths
 */

export interface SoundColumn {
  symbol: string;
  name: string;
  howToPronounce: string;
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

export interface PronunciationExercise {
  id: string;
  number: 1 | 2 | 3;
  title: string;
  instruction: string;
  questions: PronunciationExerciseQuestion[];
}

export interface UnitPronunciationData {
  unitId: string;
  unitNumber: number;
  unitTitle: string;
  topicFocus: string;
  summaryNote: string;
  sounds: [SoundColumn, SoundColumn];
  minimalPairsTitle: string;
  minimalPairs: MinimalPairItem[];
  exercises: [PronunciationExercise, PronunciationExercise, PronunciationExercise];
}

export const GS6_PRONUNCIATION_UNITS: UnitPronunciationData[] = [
  // ==========================================================================
  // UNIT 1: MY NEW SCHOOL (/ɑː/ and /ʌ/)
  // ==========================================================================
  {
    unitId: 'unit-1',
    unitNumber: 1,
    unitTitle: 'My New School',
    topicFocus: 'Sounds: /ɑː/ and /ʌ/',
    summaryNote:
      'Phân biệt nguyên âm dài /ɑː/ (mở rộng miệng, ngân dài) và nguyên âm ngắn /ʌ/ (miệng mở vừa phải, phát âm ngắn, dứt khoát).',
    sounds: [
      {
        symbol: '/ɑː/',
        name: 'Nguyên âm dài /ɑː/',
        howToPronounce:
          'Mở rộng miệng tự nhiên, hạ thấp lưỡi và kéo dài âm "a" sâu trong khoang miệng.',
        spellingPatterns: ['ar (smart, art, carton)', 'a (class, father, dance)'],
        examples: [
          { word: 'sm[ar]t', ipa: '/smɑːt/', meaningVi: 'thông minh, bảnh bao' },
          { word: '[ar]t', ipa: '/ɑːt/', meaningVi: 'mỹ thuật, nghệ thuật' },
          { word: 'c[ar]ton', ipa: '/ˈkɑːtən/', meaningVi: 'hộp giấy cứng' },
          { word: 'cl[a]ss', ipa: '/klɑːs/', meaningVi: 'lớp học' },
          { word: 'f[a]ther', ipa: '/ˈfɑːðə(r)/', meaningVi: 'bố, cha' },
          { word: 'l[ar]ge', ipa: '/lɑːdʒ/', meaningVi: 'rộng lớn' },
        ],
      },
      {
        symbol: '/ʌ/',
        name: 'Nguyên âm ngắn /ʌ/',
        howToPronounce:
          'Miệng mở hơi hẹp hơn /ɑː/, lưỡi để giữa khoang miệng, bật âm ngắn và gọn giống âm "ă" trong tiếng Việt.',
        spellingPatterns: ['u (subject, study, lunch)', 'o (Monday, brother, compass)', 'ou (cousin)'],
        examples: [
          { word: 's[u]bject', ipa: '/ˈsʌbdʒɪkt/', meaningVi: 'môn học' },
          { word: 'st[u]dy', ipa: '/ˈstʌdi/', meaningVi: 'học tập' },
          { word: 'M[o]nday', ipa: '/ˈmʌndeɪ/', meaningVi: 'thứ Hai' },
          { word: 'c[o]mpass', ipa: '/ˈkʌmpəs/', meaningVi: 'com-pa, la bàn' },
          { word: 'l[u]nch', ipa: '/lʌntʃ/', meaningVi: 'bữa trưa' },
          { word: 'S[u]nday', ipa: '/ˈsʌndeɪ/', meaningVi: 'Chủ nhật' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh âm /ɑː/ và /ʌ/',
    minimalPairs: [
      {
        leftWord: 'h[ear]t',
        leftIpa: '/hɑːt/',
        leftMeaningVi: 'trái tim',
        rightWord: 'h[u]t',
        rightIpa: '/hʌt/',
        rightMeaningVi: 'túp lều',
      },
      {
        leftWord: 'c[ar]t',
        leftIpa: '/kɑːt/',
        leftMeaningVi: 'xe đẩy',
        rightWord: 'c[u]t',
        rightIpa: '/kʌt/',
        rightMeaningVi: 'cắt',
      },
      {
        leftWord: 'm[ar]ch',
        leftIpa: '/mɑːtʃ/',
        leftMeaningVi: 'tháng Ba / diễu hành',
        rightWord: 'm[u]ch',
        rightIpa: '/mʌtʃ/',
        rightMeaningVi: 'nhiều',
      },
      {
        leftWord: 'd[ar]k',
        leftIpa: '/dɑːk/',
        leftMeaningVi: 'tối tăm',
        rightWord: 'd[u]ck',
        rightIpa: '/dʌk/',
        rightMeaningVi: 'con vịt',
      },
    ],
    exercises: [
      {
        id: 'u1-ex1',
        number: 1,
        title: 'Exercise 1: Odd One Out (Chọn từ có phần gạch chân phát âm khác)',
        instruction: 'Chọn từ có phần gạch chân (in đậm) được phát âm khác với 3 từ còn lại.',
        questions: [
          {
            id: 'u1-ex1-q1',
            prompt: 'Câu 1: Chọn từ có phần gạch chân phát âm khác:',
            options: ['sm[ar]t', '[ar]t', 's[u]bject', 'cl[a]ss'],
            correctAnswer: 's[u]bject',
            explanation: '"s[u]bject" phát âm là /ʌ/, các từ còn lại (sm[ar]t, [ar]t, cl[a]ss) phát âm là /ɑː/.',
          },
          {
            id: 'u1-ex1-q2',
            prompt: 'Câu 2: Chọn từ có phần gạch chân phát âm khác:',
            options: ['st[u]dy', 'l[u]nch', 'M[o]nday', 'c[ar]ton'],
            correctAnswer: 'c[ar]ton',
            explanation: '"c[ar]ton" phát âm là /ɑː/, các từ còn lại phát âm là /ʌ/.',
          },
          {
            id: 'u1-ex1-q3',
            prompt: 'Câu 3: Chọn từ có phần gạch chân phát âm khác:',
            options: ['c[o]mpass', 'f[a]ther', 'S[u]nday', 'r[u]bber'],
            correctAnswer: 'f[a]ther',
            explanation: '"f[a]ther" có phần gạch chân phát âm là /ɑː/, trong khi c[o]mpass, S[u]nday, r[u]bber phát âm là /ʌ/.',
          },
          {
            id: 'u1-ex1-q4',
            prompt: 'Câu 4: Chọn từ có phần gạch chân phát âm khác:',
            options: ['f[a]st', 'cl[a]ssmate', 'c[a]lculator', 'p[a]ss'],
            correctAnswer: 'c[a]lculator',
            explanation: '"c[a]lculator" phát âm là /æ/, còn f[a]st, cl[a]ssmate, p[a]ss phát âm là /ɑː/.',
          },
        ],
      },
      {
        id: 'u1-ex2',
        number: 2,
        title: 'Exercise 2: Sound Classification (Xác định âm /ɑː/ hay /ʌ/)',
        instruction: 'Xác định âm của phần gạch chân trong mỗi từ sau đây.',
        questions: [
          {
            id: 'u1-ex2-q1',
            prompt: 'Phần gạch chân trong từ "c[o]mpass" được phát âm là âm nào?',
            options: ['/ʌ/', '/ɑː/', '/æ/', '/ə/'],
            correctAnswer: '/ʌ/',
            explanation: 'compass /ˈkʌmpəs/ có chữ "o" ở âm tiết đầu phát âm là /ʌ/.',
          },
          {
            id: 'u1-ex2-q2',
            prompt: 'Phần gạch chân trong từ "cl[a]ssroom" được phát âm là âm nào?',
            options: ['/ɑː/', '/ʌ/', '/e/', '/ɪ/'],
            correctAnswer: '/ɑː/',
            explanation: 'classroom /ˈklɑːsruːm/ có chữ "a" phát âm là nguyên âm dài /ɑː/.',
          },
          {
            id: 'u1-ex2-q3',
            prompt: 'Phần gạch chân trong từ "s[u]bject" được phát âm là âm nào?',
            options: ['/ʌ/', '/ɑː/', '/uː/', '/ʊ/'],
            correctAnswer: '/ʌ/',
            explanation: 'subject /ˈsʌbdʒɪkt/ có chữ "u" phát âm là /ʌ/.',
          },
          {
            id: 'u1-ex2-q4',
            prompt: 'Phần gạch chân trong từ "sm[ar]t" được phát âm là âm nào?',
            options: ['/ɑː/', '/ʌ/', '/ɔː/', '/ɜː/'],
            correctAnswer: '/ɑː/',
            explanation: 'smart /smɑːt/ có cụm "ar" phát âm là /ɑː/.',
          },
        ],
      },
      {
        id: 'u1-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Tìm từ đúng âm trong câu)',
        instruction: 'Đọc câu và chọn từ đáp ứng yêu cầu phát âm.',
        questions: [
          {
            id: 'u1-ex3-q1',
            prompt: 'Trong câu: "My br[o]ther has a new c[o]mpass for his [ar]t cl[a]ss", từ nào chứa âm /ʌ/?',
            options: ['br[o]ther & c[o]mpass', '[ar]t & cl[a]ss', 'new & for', 'his & cl[a]ss'],
            correctAnswer: 'br[o]ther & c[o]mpass',
            explanation: 'brother /ˈbrʌðə/ và compass /ˈkʌmpəs/ đều chứa âm /ʌ/; art và class chứa âm /ɑː/.',
          },
          {
            id: 'u1-ex3-q2',
            prompt: 'Chọn từ có âm /ɑː/ để điền vào câu: "Students look very ______ in their new uniforms."',
            options: ['sm[ar]t', 'f[u]nny', 'y[ou]ng', 'l[u]cky'],
            correctAnswer: 'sm[ar]t',
            explanation: 'smart /smɑːt/ vừa mang âm /ɑː/ vừa hợp nghĩa: Học sinh trông rất bảnh bao trong bộ đồng phục mới.',
          },
          {
            id: 'u1-ex3-q3',
            prompt: 'Từ nào sau đây có cùng âm nguyên âm với từ "st[u]dy"?',
            options: ['M[o]nday', 'f[a]ther', 'c[ar]ton', 'st[ar]t'],
            correctAnswer: 'M[o]nday',
            explanation: 'study /ˈstʌdi/ và Monday /ˈmʌndeɪ/ đều có phần gạch chân phát âm là /ʌ/.',
          },
          {
            id: 'u1-ex3-q4',
            prompt: 'Từ nào sau đây có cùng âm nguyên âm với từ "[ar]t"?',
            options: ['l[ar]ge', 'l[u]nch', 'c[o]me', 's[u]n'],
            correctAnswer: 'l[ar]ge',
            explanation: 'art /ɑːt/ và large /lɑːdʒ/ đều chứa nguyên âm dài /ɑː/.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 2: MY HOUSE (Final sounds /s/ and /z/)
  // ==========================================================================
  {
    unitId: 'unit-2',
    unitNumber: 2,
    unitTitle: 'My House',
    topicFocus: 'Final sounds: /s/ and /z/',
    summaryNote:
      'Quy tắc phát âm đuôi -s/-es của danh từ số nhiều và động từ ngôi thứ 3 số ít: phát âm là /s/ sau các âm vô thanh (/p/, /k/, /t/, /f/, /θ/) và phát âm là /z/ sau nguyên âm hoặc phụ âm hữu thanh.',
    sounds: [
      {
        symbol: '/s/',
        name: 'Âm cuối vô thanh /s/',
        howToPronounce:
          'Đặt đầu lưỡi gần chân răng trên, đẩy luồng hơi nhẹ ra ngoài, dây thanh quản KHÔNG rung (đặt tay lên cổ không thấy rung).',
        spellingPatterns: ['Đứng sau các âm vô thanh: -p (lamps), -k (sinks, desks), -t (toilets, flats, cats), -f (roofs)'],
        examples: [
          { word: 'lamp[s]', ipa: '/læmps/', meaningVi: 'những chiếc đèn bàn' },
          { word: 'sink[s]', ipa: '/sɪŋks/', meaningVi: 'những bồn rửa' },
          { word: 'flat[s]', ipa: '/flæts/', meaningVi: 'những căn hộ' },
          { word: 'toilet[s]', ipa: '/ˈtɔɪləts/', meaningVi: 'những phòng vệ sinh' },
          { word: 'chopstick[s]', ipa: '/ˈtʃɒpstɪks/', meaningVi: 'đôi đũa' },
          { word: 'desk[s]', ipa: '/desks/', meaningVi: 'những chiếc bàn học' },
        ],
      },
      {
        symbol: '/z/',
        name: 'Âm cuối hữu thanh /z/',
        howToPronounce:
          'Vị trí miệng giống âm /s/ nhưng làm RUNG dây thanh quản khi luồng hơi đi qua (giống tiếng ong kêu zzz).',
        spellingPatterns: ['Đứng sau nguyên âm hoặc phụ âm hữu thanh: -a/o/i (sofas, photos), -m (rooms), -b (wardrobes), -d (beds), -l (halls), -r (chairs)'],
        examples: [
          { word: 'sofa[s]', ipa: '/ˈsəʊfəz/', meaningVi: 'những ghế sô-pha' },
          { word: 'room[s]', ipa: '/ruːmz/', meaningVi: 'những căn phòng' },
          { word: 'wardrobe[s]', ipa: '/ˈwɔːdrəʊbz/', meaningVi: 'những tủ quần áo' },
          { word: 'bed[s]', ipa: '/bedz/', meaningVi: 'những chiếc giường' },
          { word: 'chair[s]', ipa: '/tʃeəz/', meaningVi: 'những chiếc ghế' },
          { word: 'cupboard[s]', ipa: '/ˈkʌbədz/', meaningVi: 'những tủ chén' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh âm cuối /s/ và /z/',
    minimalPairs: [
      {
        leftWord: 'sink[s]',
        leftIpa: '/sɪŋks/',
        leftMeaningVi: 'những bồn rửa (kết thúc bằng /k/ + s ➔ /s/)',
        rightWord: 'thing[s]',
        rightIpa: '/θɪŋz/',
        rightMeaningVi: 'những đồ vật (kết thúc bằng /ŋ/ + s ➔ /z/)',
      },
      {
        leftWord: 'flat[s]',
        leftIpa: '/flæts/',
        leftMeaningVi: 'những căn hộ (/t/ + s ➔ /s/)',
        rightWord: 'bed[s]',
        rightIpa: '/bedz/',
        rightMeaningVi: 'những chiếc giường (/d/ + s ➔ /z/)',
      },
      {
        leftWord: 'lamp[s]',
        leftIpa: '/læmps/',
        leftMeaningVi: 'những cái đèn (/p/ + s ➔ /s/)',
        rightWord: 'room[s]',
        rightIpa: '/ruːmz/',
        rightMeaningVi: 'những căn phòng (/m/ + s ➔ /z/)',
      },
      {
        leftWord: 'desk[s]',
        leftIpa: '/desks/',
        leftMeaningVi: 'những bàn học (/k/ + s ➔ /s/)',
        rightWord: 'bag[s]',
        rightIpa: '/bæɡz/',
        rightMeaningVi: 'những chiếc cặp (/ɡ/ + s ➔ /z/)',
      },
    ],
    exercises: [
      {
        id: 'u2-ex1',
        number: 1,
        title: 'Exercise 1: Odd One Out (Chọn từ có đuôi -s phát âm khác)',
        instruction: 'Chọn từ có phần đuôi [s] được phát âm khác với 3 từ còn lại.',
        questions: [
          {
            id: 'u2-ex1-q1',
            prompt: 'Câu 1: Chọn từ có âm cuối [s] phát âm khác:',
            options: ['lamp[s]', 'sink[s]', 'sofa[s]', 'toilet[s]'],
            correctAnswer: 'sofa[s]',
            explanation: '"sofa[s]" tận cùng bằng nguyên âm nên -s phát âm là /z/. Các từ lamp[s], sink[s], toilet[s] tận cùng bằng /p/, /k/, /t/ nên -s phát âm là /s/.',
          },
          {
            id: 'u2-ex1-q2',
            prompt: 'Câu 2: Chọn từ có âm cuối [s] phát âm khác:',
            options: ['room[s]', 'bed[s]', 'chair[s]', 'flat[s]'],
            correctAnswer: 'flat[s]',
            explanation: '"flat[s]" tận cùng bằng âm vô thanh /t/ nên -s phát âm là /s/. Các từ còn lại phát âm là /z/.',
          },
          {
            id: 'u2-ex1-q3',
            prompt: 'Câu 3: Chọn từ có âm cuối [s] phát âm khác:',
            options: ['chopstick[s]', 'desk[s]', 'wardrobe[s]', 'clock[s]'],
            correctAnswer: 'wardrobe[s]',
            explanation: '"wardrobe[s]" tận cùng bằng âm hữu thanh /b/ nên -s phát âm là /z/. Các từ còn lại tận cùng bằng /k/ nên phát âm là /s/.',
          },
          {
            id: 'u2-ex1-q4',
            prompt: 'Câu 4: Chọn từ có âm cuối [s] phát âm khác:',
            options: ['picture[s]', 'table[s]', 'window[s]', 'cat[s]'],
            correctAnswer: 'cat[s]',
            explanation: '"cat[s]" tận cùng bằng /t/ nên -s phát âm là /s/. Các từ còn lại phát âm là /z/.',
          },
        ],
      },
      {
        id: 'u2-ex2',
        number: 2,
        title: 'Exercise 2: Sound Classification (Phân loại đuôi /s/ hay /z/)',
        instruction: 'Xác định đuôi [s] của từ cho sẵn được phát âm là /s/ hay /z/.',
        questions: [
          {
            id: 'u2-ex2-q1',
            prompt: 'Đuôi [s] trong từ "chopstick[s]" được phát âm là gì?',
            options: ['/s/', '/z/', '/ɪz/', '/ʃ/'],
            correctAnswer: '/s/',
            explanation: 'chopstick tận cùng bằng âm vô thanh /k/, nên khi thêm -s đọc là /s/.',
          },
          {
            id: 'u2-ex2-q2',
            prompt: 'Đuôi [s] trong từ "cupboard[s]" được phát âm là gì?',
            options: ['/z/', '/s/', '/ɪz/', '/t/'],
            correctAnswer: '/z/',
            explanation: 'cupboard tận cùng bằng âm hữu thanh /d/, nên khi thêm -s đọc là /z/.',
          },
          {
            id: 'u2-ex2-q3',
            prompt: 'Đuôi [s] trong từ "toilet[s]" được phát âm là gì?',
            options: ['/s/', '/z/', '/ɪz/', '/d/'],
            correctAnswer: '/s/',
            explanation: 'toilet tận cùng bằng âm vô thanh /t/, khi thêm -s đọc là /s/.',
          },
          {
            id: 'u2-ex2-q4',
            prompt: 'Đuôi [s] trong từ "poster[s]" được phát âm là gì?',
            options: ['/z/', '/s/', '/ɪz/', '/θ/'],
            correctAnswer: '/z/',
            explanation: 'poster tận cùng bằng nguyên âm /ə(r)/ (hữu thanh), khi thêm -s đọc là /z/.',
          },
        ],
      },
      {
        id: 'u2-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Nhận diện âm trong câu)',
        instruction: 'Chọn phương án đúng về cách phát âm đuôi -s trong câu.',
        questions: [
          {
            id: 'u2-ex3-q1',
            prompt: 'Trong câu: "There are two lamp[s] and four sofa[s] in the living room", hai đuôi -s lần lượt phát âm là:',
            options: ['/s/ và /z/', '/z/ và /s/', '/s/ và /s/', '/z/ và /z/'],
            correctAnswer: '/s/ và /z/',
            explanation: 'lamp[s] tận cùng bằng /p/ ➔ /s/; sofa[s] tận cùng bằng nguyên âm /ə/ ➔ /z/.',
          },
          {
            id: 'u2-ex3-q2',
            prompt: 'Trong câu: "My mum clean[s] the sink[s] every day", từ nào có đuôi -s phát âm là /s/?',
            options: ['sink[s]', 'clean[s]', 'Cả hai từ', 'Không từ nào'],
            correctAnswer: 'sink[s]',
            explanation: 'sink[s] (/k/ + s ➔ /s/), còn clean[s] (/n/ + s ➔ /z/).',
          },
          {
            id: 'u2-ex3-q3',
            prompt: 'Từ nào dưới đây có cùng cách phát âm đuôi -s với từ "room[s]"?',
            options: ['wall[s]', 'desk[s]', 'flat[s]', 'lamp[s]'],
            correctAnswer: 'wall[s]',
            explanation: 'room[s] và wall[s] đều có đuôi -s phát âm là /z/.',
          },
          {
            id: 'u2-ex3-q4',
            prompt: 'Từ nào dưới đây có cùng cách phát âm đuôi -s với từ "sink[s]"?',
            options: ['book[s]', 'bag[s]', 'pen[s]', 'ruler[s]'],
            correctAnswer: 'book[s]',
            explanation: 'sink[s] và book[s] đều tận cùng bằng /k/ nên đuôi -s phát âm là /s/.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 3: MY FRIENDS (/b/ and /p/)
  // ==========================================================================
  {
    unitId: 'unit-3',
    unitNumber: 3,
    unitTitle: 'My Friends',
    topicFocus: 'Sounds: /b/ and /p/',
    summaryNote:
      'Phân biệt hai phụ âm đôi môi /b/ (hữu thanh - rung dây thanh quản, ít bật hơi) và /p/ (vô thanh - không rung dây thanh quản, bật hơi mạnh).',
    sounds: [
      {
        symbol: '/b/',
        name: 'Phụ âm hữu thanh /b/',
        howToPronounce:
          'Mím hai môi lại rồi mở ra, đồng thời làm RUNG dây thanh quản (luồng hơi bật ra nhẹ hơn âm /p/).',
        spellingPatterns: ['b (big, boy, blonde, brown)', 'bb (chubby, rubber)'],
        examples: [
          { word: '[b]ig', ipa: '/bɪɡ/', meaningVi: 'to lớn' },
          { word: '[b]londe', ipa: '/blɒnd/', meaningVi: 'tóc vàng hoe' },
          { word: '[b]rown', ipa: '/braʊn/', meaningVi: 'màu nâu' },
          { word: '[b]iscuit', ipa: '/ˈbɪskɪt/', meaningVi: 'bánh quy' },
          { word: 'chu[bb]y', ipa: '/ˈtʃʌbi/', meaningVi: 'mũm mĩm' },
          { word: '[b]oy', ipa: '/bɔɪ/', meaningVi: 'cậu bé' },
        ],
      },
      {
        symbol: '/p/',
        name: 'Phụ âm vô thanh bật hơi /p/',
        howToPronounce:
          'Mím chặt hai môi rồi bật mạnh luồng hơi ra ngoài. Dây thanh quản KHÔNG rung (nếu để tờ giấy trước miệng, tờ giấy sẽ bay).',
        spellingPatterns: ['p (picnic, patient, pony, park, play)', 'pp (happy)'],
        examples: [
          { word: '[p]icnic', ipa: '/ˈpɪknɪk/', meaningVi: 'chuyến dã ngoại' },
          { word: '[p]atient', ipa: '/ˈpeɪʃnt/', meaningVi: 'kiên nhẫn' },
          { word: '[p]ony', ipa: '/ˈpəʊni/', meaningVi: 'ngựa con' },
          { word: '[p]lay', ipa: '/pleɪ/', meaningVi: 'chơi' },
          { word: '[p]encil', ipa: '/ˈpensl/', meaningVi: 'bút chì' },
          { word: 'hel[p]ful', ipa: '/ˈhelpfl/', meaningVi: 'hay giúp đỡ' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh âm /b/ và /p/',
    minimalPairs: [
      {
        leftWord: '[b]ig',
        leftIpa: '/bɪɡ/',
        leftMeaningVi: 'to lớn',
        rightWord: '[p]ig',
        rightIpa: '/pɪɡ/',
        rightMeaningVi: 'con lợn',
      },
      {
        leftWord: '[b]ear',
        leftIpa: '/beə(r)/',
        leftMeaningVi: 'con gấu',
        rightWord: '[p]ear',
        rightIpa: '/peə(r)/',
        rightMeaningVi: 'quả lê',
      },
      {
        leftWord: '[b]ack',
        leftIpa: '/bæk/',
        leftMeaningVi: 'phía sau / cái lưng',
        rightWord: '[p]ack',
        rightIpa: '/pæk/',
        rightMeaningVi: 'đóng gói, bó',
      },
      {
        leftWord: '[b]uy',
        leftIpa: '/baɪ/',
        leftMeaningVi: 'mua',
        rightWord: '[p]ie',
        rightIpa: '/paɪ/',
        rightMeaningVi: 'bánh nướng',
      },
    ],
    exercises: [
      {
        id: 'u3-ex1',
        number: 1,
        title: 'Exercise 1: Sound & Spelling Match (Chọn từ có âm khác)',
        instruction: 'Chọn từ có phần gạch chân phát âm khác hoặc chứa âm đối lập trong bài.',
        questions: [
          {
            id: 'u3-ex1-q1',
            prompt: 'Câu 1: Chọn từ bắt đầu bằng âm /p/ khác với các từ bắt đầu bằng âm /b/:',
            options: ['[b]londe', '[b]iscuit', '[p]atient', '[b]rown'],
            correctAnswer: '[p]atient',
            explanation: '"[p]atient" /ˈpeɪʃnt/ bắt đầu bằng âm vô thanh /p/, 3 từ còn lại bắt đầu bằng âm hữu thanh /b/.',
          },
          {
            id: 'u3-ex1-q2',
            prompt: 'Câu 2: Chọn từ chứa âm /b/ khác với các từ chứa âm /p/:',
            options: ['[p]icnic', '[p]ony', 'chu[bb]y', '[p]oster'],
            correctAnswer: 'chu[bb]y',
            explanation: '"chu[bb]y" /ˈtʃʌbi/ có cụm "bb" phát âm là /b/, 3 từ còn lại phát âm là /p/.',
          },
          {
            id: 'u3-ex1-q3',
            prompt: 'Câu 3: Chọn từ có chữ "b" bị câm (không phát âm là /b/):',
            options: ['[b]ook', 'clim[b]', 'ru[bb]er', '[b]asket'],
            correctAnswer: 'clim[b]',
            explanation: '"clim[b]" /klaɪm/ có chữ "b" đứng cuối sau "m" nên bị câm. Các từ còn lại phát âm rõ âm /b/.',
          },
          {
            id: 'u3-ex1-q4',
            prompt: 'Câu 4: Chọn từ có cụm chữ cái bắt đầu phát âm khác với 3 từ còn lại:',
            options: ['[p]arty', '[p]iano', '[ph]oto', '[p]ark'],
            correctAnswer: '[ph]oto',
            explanation: '"[ph]oto" /ˈfəʊtəʊ/ có "ph" phát âm là /f/, trong khi party, piano, park bắt đầu bằng âm /p/.',
          },
        ],
      },
      {
        id: 'u3-ex2',
        number: 2,
        title: 'Exercise 2: Minimal Pairs & Phonetics (Nhận diện âm /b/ và /p/)',
        instruction: 'Chọn đáp án đúng về âm của phần gạch chân.',
        questions: [
          {
            id: 'u3-ex2-q1',
            prompt: 'Phần gạch chân trong từ "[p]icnic" được phát âm là âm nào?',
            options: ['/p/', '/b/', '/f/', '/v/'],
            correctAnswer: '/p/',
            explanation: 'picnic /ˈpɪknɪk/ bắt đầu bằng phụ âm bật hơi vô thanh /p/.',
          },
          {
            id: 'u3-ex2-q2',
            prompt: 'Phần gạch chân trong từ "chu[bb]y" được phát âm là âm nào?',
            options: ['/b/', '/p/', '/d/', '/t/'],
            correctAnswer: '/b/',
            explanation: 'chubby /ˈtʃʌbi/ có hai chữ "bb" phát âm là một âm /b/.',
          },
          {
            id: 'u3-ex2-q3',
            prompt: 'Khi phát âm cặp từ "[b]ear" (/beə/) và "[p]ear" (/peə/), điểm khác biệt chính là gì?',
            options: [
              '/b/ làm rung dây thanh quản, còn /p/ bật hơi và không rung dây thanh quản',
              '/p/ làm rung dây thanh quản, còn /b/ không rung',
              'Cả hai âm phát âm giống hệt nhau',
              '/b/ dùng răng trên chạm môi dưới',
            ],
            correctAnswer: '/b/ làm rung dây thanh quản, còn /p/ bật hơi và không rung dây thanh quản',
            explanation: '/b/ là phụ âm đôi môi hữu thanh (rung cổ họng), còn /p/ là phụ âm đôi môi vô thanh bật hơi.',
          },
          {
            id: 'u3-ex2-q4',
            prompt: 'Từ nào sau đây có chứa CẢ hai âm /b/ và /p/?',
            options: ['[b]ack[p]ack', '[p]icnic', '[b]londe', '[p]atient'],
            correctAnswer: '[b]ack[p]ack',
            explanation: 'backpack /ˈbækpæk/ có chữ "b" đầu phát âm là /b/ và chữ "p" phát âm là /p/.',
          },
        ],
      },
      {
        id: 'u3-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Hoàn thành câu chuẩn âm)',
        instruction: 'Chọn từ đúng theo ngữ cảnh và yêu cầu âm /b/ hoặc /p/.',
        questions: [
          {
            id: 'u3-ex3-q1',
            prompt: 'Chọn từ bắt đầu bằng âm /b/ để điền vào câu: "Elena has ______ hair and big blue eyes."',
            options: ['[b]londe', '[p]etty', '[c]urly', '[s]traight'],
            correctAnswer: '[b]londe',
            explanation: 'blonde /blɒnd/ (tóc vàng hoe) vừa hợp nghĩa vừa bắt đầu bằng âm /b/.',
          },
          {
            id: 'u3-ex3-q2',
            prompt: 'Chọn từ bắt đầu bằng âm /p/ để điền vào câu: "We are having a ______ in the park this Sunday."',
            options: ['[p]icnic', '[b]iscuit', '[b]irthday', '[b]all'],
            correctAnswer: '[p]icnic',
            explanation: 'have a picnic (đi dã ngoại) bắt đầu bằng âm /p/.',
          },
          {
            id: 'u3-ex3-q3',
            prompt: 'Trong câu: "[P]aul is [p]laying the [p]iano at the [b]irthday party", từ nào có phần gạch chân phát âm là /b/?',
            options: ['[b]irthday', '[P]aul', '[p]laying', '[p]iano'],
            correctAnswer: '[b]irthday',
            explanation: 'birthday /ˈbɜːθdeɪ/ bắt đầu bằng âm /b/, các từ còn lại bắt đầu bằng /p/.',
          },
          {
            id: 'u3-ex3-q4',
            prompt: 'Chọn cặp từ điền vào chỗ trống chứa lần lượt âm /b/ và /p/: "Please put the ______ in your ______."',
            options: ['[b]iscuits – [p]ocket', '[p]encils – [b]ag', '[b]ooks – [b]ox', '[p]ears – [p]late'],
            correctAnswer: '[b]iscuits – [p]ocket',
            explanation: 'biscuits bắt đầu bằng /b/ và pocket bắt đầu bằng /p/ theo đúng thứ tự yêu cầu.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 4: MY NEIGHBOURHOOD (/ɪ/ and /iː/)
  // ==========================================================================
  {
    unitId: 'unit-4',
    unitNumber: 4,
    unitTitle: 'My Neighbourhood',
    topicFocus: 'Sounds: /ɪ/ and /iː/',
    summaryNote:
      'Phân biệt nguyên âm ngắn /ɪ/ (miệng mở tự nhiên, phát âm cực ngắn và dứt khoát) và nguyên âm dài /iː/ (khóe miệng kéo rộng sang hai bên như đang mỉm cười, ngân dài âm "i").',
    sounds: [
      {
        symbol: '/ɪ/',
        name: 'Nguyên âm ngắn /ɪ/',
        howToPronounce:
          'Môi mở hờ tự nhiên (không căng khóe miệng), lưỡi nâng vừa phải, phát âm ngắn và gọn.',
        spellingPatterns: ['i (noisy, historic, exciting, village, building)', 'u (busy)'],
        examples: [
          { word: 'h[i]storic', ipa: '/hɪˈstɒrɪk/', meaningVi: 'cổ kính, có tính lịch sử' },
          { word: 'exc[i]ting', ipa: '/ɪkˈsaɪtɪŋ/', meaningVi: 'thú vị, sôi động' },
          { word: 'v[i]llage', ipa: '/ˈvɪlɪdʒ/', meaningVi: 'ngôi làng' },
          { word: 'bu[i]lding', ipa: '/ˈbɪldɪŋ/', meaningVi: 'tòa nhà' },
          { word: 'b[u]sy', ipa: '/ˈbɪzi/', meaningVi: 'bận rộn, nhộn nhịp' },
          { word: 'c[i]ty', ipa: '/ˈsɪti/', meaningVi: 'thành phố' },
        ],
      },
      {
        symbol: '/iː/',
        name: 'Nguyên âm dài /iː/',
        howToPronounce:
          'Kéo căng khóe miệng sang hai bên giống như đang cười, nâng cao lưỡi và ngân dài âm "i".',
        spellingPatterns: ['ea (peaceful, cheap, clean, sea)', 'ee (street, keep, green)', 'e (convenient, cathedral)'],
        examples: [
          { word: 'p[ea]ceful', ipa: '/ˈpiːsfl/', meaningVi: 'yên bình' },
          { word: 'ch[ea]p', ipa: '/tʃiːp/', meaningVi: 'rẻ' },
          { word: 'str[ee]t', ipa: '/striːt/', meaningVi: 'đường phố' },
          { word: 'conv[e]nient', ipa: '/kənˈviːniənt/', meaningVi: 'thuận tiện' },
          { word: 'cl[ea]n', ipa: '/kliːn/', meaningVi: 'sạch sẽ' },
          { word: 'cath[e]dral', ipa: '/kəˈθiːdrəl/', meaningVi: 'nhà thờ lớn' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh âm /ɪ/ và /iː/',
    minimalPairs: [
      {
        leftWord: 'sh[i]p',
        leftIpa: '/ʃɪp/',
        leftMeaningVi: 'con tàu thủy (âm ngắn /ɪ/)',
        rightWord: 'sh[ee]p',
        rightIpa: '/ʃiːp/',
        rightMeaningVi: 'con cừu (âm dài /iː/)',
      },
      {
        leftWord: 'l[i]ve',
        leftIpa: '/lɪv/',
        leftMeaningVi: 'sống, sinh sống',
        rightWord: 'l[ea]ve',
        rightIpa: '/liːv/',
        rightMeaningVi: 'rời đi',
      },
      {
        leftWord: 'h[i]ll',
        leftIpa: '/hɪl/',
        leftMeaningVi: 'ngọn đồi',
        rightWord: 'h[ee]l',
        rightIpa: '/hiːl/',
        rightMeaningVi: 'gót chân',
      },
      {
        leftWord: 'b[i]n',
        leftIpa: '/bɪn/',
        leftMeaningVi: 'thùng rác',
        rightWord: 'b[ea]n',
        rightIpa: '/biːn/',
        rightMeaningVi: 'hạt đậu',
      },
    ],
    exercises: [
      {
        id: 'u4-ex1',
        number: 1,
        title: 'Exercise 1: Odd One Out (Chọn từ có phần gạch chân phát âm khác)',
        instruction: 'Chọn từ có phần gạch chân được phát âm khác với 3 từ còn lại.',
        questions: [
          {
            id: 'u4-ex1-q1',
            prompt: 'Câu 1: Chọn từ có phần gạch chân phát âm khác:',
            options: ['p[ea]ceful', 'ch[ea]p', 'cl[ea]n', 'h[i]storic'],
            correctAnswer: 'h[i]storic',
            explanation: '"h[i]storic" có chữ "i" phát âm là âm ngắn /ɪ/, còn p[ea]ceful, ch[ea]p, cl[ea]n phát âm là âm dài /iː/.',
          },
          {
            id: 'u4-ex1-q2',
            prompt: 'Câu 2: Chọn từ có phần gạch chân phát âm khác:',
            options: ['v[i]llage', 'bu[i]lding', 'str[ee]t', 'c[i]ty'],
            correctAnswer: 'str[ee]t',
            explanation: '"str[ee]t" phát âm là /iː/, các từ còn lại phát âm là /ɪ/.',
          },
          {
            id: 'u4-ex1-q3',
            prompt: 'Câu 3: Chọn từ có phần gạch chân phát âm khác:',
            options: ['conv[e]nient', 'cath[e]dral', 'b[u]sy', 's[ea]food'],
            correctAnswer: 'b[u]sy',
            explanation: '"b[u]sy" /ˈbɪzi/ phát âm là /ɪ/, các từ còn lại có phần gạch chân phát âm là /iː/.',
          },
          {
            id: 'u4-ex1-q4',
            prompt: 'Câu 4: Chọn từ có phần gạch chân phát âm khác:',
            options: ['exc[i]ting', 'l[i]ve', 'nois[y]', 'pol[i]ce'],
            correctAnswer: 'pol[i]ce',
            explanation: '"pol[i]ce" /pəˈliːs/ có chữ "i" phát âm là /iː/, còn các từ khác chứa âm ngắn /ɪ/.',
          },
        ],
      },
      {
        id: 'u4-ex2',
        number: 2,
        title: 'Exercise 2: Sound Classification (Phân biệt /ɪ/ và /iː/)',
        instruction: 'Xác định âm đúng của phần gạch chân trong từ.',
        questions: [
          {
            id: 'u4-ex2-q1',
            prompt: 'Phần gạch chân trong từ "conv[e]nient" được phát âm là:',
            options: ['/iː/', '/ɪ/', '/e/', '/eɪ/'],
            correctAnswer: '/iː/',
            explanation: 'convenient /kənˈviːniənt/ có chữ "e" ở âm tiết được nhấn trọng âm phát âm là /iː/.',
          },
          {
            id: 'u4-ex2-q2',
            prompt: 'Phần gạch chân trong từ "b[u]sy" được phát âm là:',
            options: ['/ɪ/', '/iː/', '/ʌ/', '/ʊ/'],
            correctAnswer: '/ɪ/',
            explanation: 'busy được phiên âm là /ˈbɪzi/, chữ "u" đọc là /ɪ/ (không đọc là /ʌ/).',
          },
          {
            id: 'u4-ex2-q3',
            prompt: 'Phần gạch chân trong từ "p[ea]ceful" được phát âm là:',
            options: ['/iː/', '/ɪ/', '/ɪə/', '/eə/'],
            correctAnswer: '/iː/',
            explanation: 'peaceful /ˈpiːsfl/ có cụm "ea" phát âm là /iː/.',
          },
          {
            id: 'u4-ex2-q4',
            prompt: 'Phần gạch chân trong từ "v[i]llage" được phát âm là:',
            options: ['/ɪ/', '/iː/', '/aɪ/', '/e/'],
            correctAnswer: '/ɪ/',
            explanation: 'village /ˈvɪlɪdʒ/ có chữ "i" phát âm là /ɪ/.',
          },
        ],
      },
      {
        id: 'u4-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Tìm từ trong câu)',
        instruction: 'Đọc câu và trả lời câu hỏi ngữ âm.',
        questions: [
          {
            id: 'u4-ex3-q1',
            prompt: 'Trong câu: "The str[ee]ts in this c[i]ty are cl[ea]n and p[ea]ceful", từ nào có phần gạch chân phát âm là /ɪ/?',
            options: ['c[i]ty', 'str[ee]ts', 'cl[ea]n', 'p[ea]ceful'],
            correctAnswer: 'c[i]ty',
            explanation: 'city /ˈsɪti/ chứa âm ngắn /ɪ/, trong khi streets, clean, peaceful đều chứa âm dài /iː/.',
          },
          {
            id: 'u4-ex3-q2',
            prompt: 'Chọn cặp từ phân biệt đúng /ɪ/ và /iː/ để điền vào câu: "Many people ______ in the countryside and ______ for the city."',
            options: ['l[i]ve (/ɪ/) – l[ea]ve (/iː/)', 'l[ea]ve (/iː/) – l[i]ve (/ɪ/)', 'sh[i]p (/ɪ/) – sh[ee]p (/iː/)', 's[i]t (/ɪ/) – s[ea]t (/iː/)'],
            correctAnswer: 'l[i]ve (/ɪ/) – l[ea]ve (/iː/)',
            explanation: 'live /lɪv/ (sinh sống) chứa âm /ɪ/, leave /liːv/ (rời đi) chứa âm /iː/.',
          },
          {
            id: 'u4-ex3-q3',
            prompt: 'Từ nào dưới đây có cùng nguyên âm gạch chân với từ "ch[ea]p"?',
            options: ['k[ee]p', 'h[i]ll', 'sl[i]m', 'th[i]n'],
            correctAnswer: 'k[ee]p',
            explanation: 'cheap /tʃiːp/ và keep /kiːp/ đều có nguyên âm dài /iː/.',
          },
          {
            id: 'u4-ex3-q4',
            prompt: 'Từ nào dưới đây có cùng nguyên âm gạch chân với từ "bu[i]lding"?',
            options: ['h[i]storic', 's[ea]food', 'gr[ee]n', 'str[ee]t'],
            correctAnswer: 'h[i]storic',
            explanation: 'building /ˈbɪldɪŋ/ và historic /hɪˈstɒrɪk/ đều có nguyên âm ngắn /ɪ/.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 5: NATURAL WONDERS OF VIET NAM (/t/ and /d/)
  // ==========================================================================
  {
    unitId: 'unit-5',
    unitNumber: 5,
    unitTitle: 'Natural Wonders of Viet Nam',
    topicFocus: 'Sounds: /t/ and /d/',
    summaryNote:
      'Phân biệt hai phụ âm đầu lưỡi - lợi: /t/ (vô thanh, bật hơi nhẹ, dây thanh quản không rung) và /d/ (hữu thanh, dây thanh quản rung rõ). Chú ý trường hợp chữ "s" câm trong "island" /ˈaɪlənd/.',
    sounds: [
      {
        symbol: '/t/',
        name: 'Phụ âm vô thanh /t/',
        howToPronounce:
          'Đặt đầu lưỡi chạm vào phần lợi phía sau răng cửa trên, sau đó hạ lưỡi xuống và bật hơi ra ngoài, dây thanh quản KHÔNG rung.',
        spellingPatterns: ['t (tent, mountain, waterfall, desert, plaster, forest, boat)'],
        examples: [
          { word: '[t]en[t]', ipa: '/tent/', meaningVi: 'cái lều trại' },
          { word: 'moun[t]ain', ipa: '/ˈmaʊntən/', meaningVi: 'ngọn núi' },
          { word: 'wa[t]erfall', ipa: '/ˈwɔːtəfɔːl/', meaningVi: 'thác nước' },
          { word: 'deser[t]', ipa: '/ˈdezət/', meaningVi: 'sa mạc' },
          { word: 'plas[t]er', ipa: '/ˈplɑːstə(r)/', meaningVi: 'băng cá nhân' },
          { word: 'fores[t]', ipa: '/ˈfɒrɪst/', meaningVi: 'khu rừng' },
        ],
      },
      {
        symbol: '/d/',
        name: 'Phụ âm hữu thanh /d/',
        howToPronounce:
          'Đặt đầu lưỡi chạm lợi trên giống hệt âm /t/, nhưng khi bật lưỡi ra thì làm RUNG dây thanh quản.',
        spellingPatterns: ['d (wonder, island, guide, deep, holiday, world)'],
        examples: [
          { word: 'won[d]er', ipa: '/ˈwʌndə(r)/', meaningVi: 'kì quan' },
          { word: 'islan[d]', ipa: '/ˈaɪlənd/', meaningVi: 'hòn đảo (chữ s câm)' },
          { word: 'gui[d]e', ipa: '/ɡaɪd/', meaningVi: 'hướng dẫn viên' },
          { word: '[d]eep', ipa: '/diːp/', meaningVi: 'sâu' },
          { word: 'holi[d]ay', ipa: '/ˈhɒlədeɪ/', meaningVi: 'kì nghỉ' },
          { word: 'worl[d]', ipa: '/wɜːld/', meaningVi: 'thế giới' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh âm /t/ và /d/',
    minimalPairs: [
      {
        leftWord: '[t]own',
        leftIpa: '/taʊn/',
        leftMeaningVi: 'thị trấn',
        rightWord: '[d]own',
        rightIpa: '/daʊn/',
        rightMeaningVi: 'bên dưới',
      },
      {
        leftWord: '[t]ent',
        leftIpa: '/tent/',
        leftMeaningVi: 'cái lều',
        rightWord: '[d]ent',
        rightIpa: '/dent/',
        rightMeaningVi: 'vết lõm',
      },
      {
        leftWord: 'bo[at]',
        leftIpa: '/bəʊt/',
        leftMeaningVi: 'con thuyền (kết thúc bằng /t/)',
        rightWord: 'roa[d]',
        rightIpa: '/rəʊd/',
        rightMeaningVi: 'con đường (kết thúc bằng /d/)',
      },
      {
        leftWord: 'hear[t]',
        leftIpa: '/hɑːt/',
        leftMeaningVi: 'trái tim (/t/)',
        rightWord: 'har[d]',
        rightIpa: '/hɑːd/',
        rightMeaningVi: 'chăm chỉ, cứng (/d/)',
      },
    ],
    exercises: [
      {
        id: 'u5-ex1',
        number: 1,
        title: 'Exercise 1: Sound Identification (Chọn từ có âm khác)',
        instruction: 'Chọn từ có phần gạch chân phát âm khác với 3 từ còn lại.',
        questions: [
          {
            id: 'u5-ex1-q1',
            prompt: 'Câu 1: Chọn từ có phần gạch chân phát âm là /d/ khác với /t/:',
            options: ['moun[t]ain', 'wa[t]erfall', 'won[d]er', 'plas[t]er'],
            correctAnswer: 'won[d]er',
            explanation: '"won[d]er" /ˈwʌndə(r)/ có phần gạch chân phát âm là /d/, 3 từ còn lại phát âm là /t/.',
          },
          {
            id: 'u5-ex1-q2',
            prompt: 'Câu 2: Chọn từ có phần gạch chân phát âm là /t/ khác với /d/:',
            options: ['islan[d]', 'gui[d]e', 'deser[t]', 'holi[d]ay'],
            correctAnswer: 'deser[t]',
            explanation: '"deser[t]" /ˈdezət/ tận cùng bằng âm /t/, 3 từ còn lại chứa âm /d/.',
          },
          {
            id: 'u5-ex1-q3',
            prompt: 'Câu 3: Chọn từ có chữ "t" bị CÂM (không được phát âm là /t/):',
            options: ['cas[t]le', 'fores[t]', '[t]ent', 'bo[at]'],
            correctAnswer: 'cas[t]le',
            explanation: '"cas[t]le" /ˈkɑːsl/ (lâu đài) và "listen", "often" có chữ "t" bị câm.',
          },
          {
            id: 'u5-ex1-q4',
            prompt: 'Câu 4: Chọn từ có phần gạch chân phát âm khác:',
            options: ['na[t]ural', '[t]ourist', '[t]orch', 'moun[t]ain'],
            correctAnswer: 'na[t]ural',
            explanation: '"na[t]ural" /ˈnætʃrəl/ có chữ "t" phát âm là /tʃ/, còn tourist, torch, mountain phát âm là /t/.',
          },
        ],
      },
      {
        id: 'u5-ex2',
        number: 2,
        title: 'Exercise 2: Sound Classification (Phân biệt /t/, /d/ và âm câm)',
        instruction: 'Xác định cách phát âm đúng của từ hoặc phần gạch chân.',
        questions: [
          {
            id: 'u5-ex2-q1',
            prompt: 'Từ "islan[d]" (hòn đảo) được phát âm chuẩn IPA là gì?',
            options: ['/ˈaɪlənd/ (chữ s câm, kết thúc bằng /d/)', '/ˈɪzlænd/', '/ˈaɪslənd/', '/ˈɪlənt/'],
            correctAnswer: '/ˈaɪlənd/ (chữ s câm, kết thúc bằng /d/)',
            explanation: 'Trong từ island /ˈaɪlənd/, chữ "s" bị câm hoàn toàn và kết thúc bằng phụ âm hữu thanh /d/.',
          },
          {
            id: 'u5-ex2-q2',
            prompt: 'Phần gạch chân trong từ "wa[t]erproof" được phát âm là âm nào?',
            options: ['/t/', '/d/', '/θ/', '/tʃ/'],
            correctAnswer: '/t/',
            explanation: 'waterproof /ˈwɔːtəpruːf/ có chữ "t" phát âm là /t/.',
          },
          {
            id: 'u5-ex2-q3',
            prompt: 'Từ "deser[t]" (sa mạc) có âm cuối là âm nào?',
            options: ['/t/', '/d/', '/s/', '/z/'],
            correctAnswer: '/t/',
            explanation: 'desert /ˈdezət/ kết thúc bằng phụ âm vô thanh /t/.',
          },
          {
            id: 'u5-ex2-q4',
            prompt: 'Từ "won[d]er" (kì quan) chứa phụ âm nào ở giữa từ?',
            options: ['/d/', '/t/', '/ð/', '/ʒ/'],
            correctAnswer: '/d/',
            explanation: 'wonder /ˈwʌndə(r)/ có chữ "d" phát âm là /d/.',
          },
        ],
      },
      {
        id: 'u5-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Áp dụng vào câu)',
        instruction: 'Đọc câu và chọn đáp án đúng.',
        questions: [
          {
            id: 'u5-ex3-q1',
            prompt: 'Trong câu: "The [t]our gui[d]e led us to a [d]eep caves on the islan[d]", từ nào chứa âm /t/?',
            options: ['[t]our', 'gui[d]e', '[d]eep', 'islan[d]'],
            correctAnswer: '[t]our',
            explanation: 'tour /tʊə(r)/ bắt đầu bằng âm /t/; còn guide, deep, island đều chứa âm /d/.',
          },
          {
            id: 'u5-ex3-q2',
            prompt: 'Chọn từ kết thúc bằng âm /t/ để điền vào câu: "Don\'t forget to bring a sleeping bag and a ______ when camping in the forest."',
            options: ['[t]en[t]', 'gui[d]e', 'islan[d]', 'c[a]ve'],
            correctAnswer: '[t]en[t]',
            explanation: 'tent /tent/ (cái lều) vừa bắt đầu vừa kết thúc bằng âm /t/ và hợp nghĩa đi cắm trại.',
          },
          {
            id: 'u5-ex3-q3',
            prompt: 'Trong từ nào sau đây cả chữ cái đầu và chữ cái cuối đều phát âm là /d/?',
            options: ['[d]ecide[d]', '[t]en[t]', '[d]eser[t]', '[t]ire[d]'],
            correctAnswer: '[d]ecide[d]',
            explanation: 'decided /dɪˈsaɪdɪd/ bắt đầu và kết thúc bằng âm /d/.',
          },
          {
            id: 'u5-ex3-q4',
            prompt: 'Cặp từ nào dưới đây là cặp tối thiểu (minimal pair) chỉ khác nhau ở âm đầu /t/ và /d/?',
            options: ['[t]own – [d]own', '[t]ent – [b]ed', 'moun[t]ain – islan[d]', 'fores[t] – won[d]er'],
            correctAnswer: '[t]own – [d]own',
            explanation: 'town /taʊn/ và down /daʊn/ giống hệt phần vần /aʊn/, chỉ khác âm đầu /t/ và /d/.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 6: OUR TET HOLIDAY (/s/ and /ʃ/)
  // ==========================================================================
  {
    unitId: 'unit-6',
    unitNumber: 6,
    unitTitle: 'Our Tet Holiday',
    topicFocus: 'Sounds: /s/ and /ʃ/',
    summaryNote:
      'Phân biệt âm xát lợi /s/ ("x nhẹ", môi tự nhiên, đầu lưỡi gần răng cửa) và âm xát vòm-lợi /ʃ/ ("s nặng", chu môi tròn về phía trước, nâng lưỡi cao hơn).',
    sounds: [
      {
        symbol: '/s/',
        name: 'Phụ âm /s/ (xát nhẹ)',
        howToPronounce:
          'Môi để tự nhiên hoặc hơi hé cười, đặt đầu lưỡi sát mặt sau răng cửa trên và thổi hơi nhẹ ra ngoài.',
        spellingPatterns: ['s (spring, smile, summer, blossom)', 'c (celebrate, city, rice)'],
        examples: [
          { word: '[s]pring', ipa: '/sprɪŋ/', meaningVi: 'mùa xuân' },
          { word: '[s]mile', ipa: '/smaɪl/', meaningVi: 'mỉm cười' },
          { word: '[c]elebrate', ipa: '/ˈselɪbreɪt/', meaningVi: 'kỷ niệm, ăn mừng' },
          { word: 'blo[ss]om', ipa: '/ˈblɒsəm/', meaningVi: 'hoa (đào, mai)' },
          { word: '[s]weet', ipa: '/swiːt/', meaningVi: 'ngọt ngào, kẹo' },
          { word: 'ri[c]e', ipa: '/raɪs/', meaningVi: 'gạo, cơm' },
        ],
      },
      {
        symbol: '/ʃ/',
        name: 'Phụ âm /ʃ/ (s nặng - chu môi)',
        howToPronounce:
          'Chu tròn hai môi về phía trước (như khi ra hiệu im lặng "Suỵt!"), nâng phần giữa lưỡi hướng lên vòm miệng và đẩy hơi mạnh.',
        spellingPatterns: ['sh (shopping, shine, wish, should, she, rubbish)', 'c/ci (special)', 's (sure, sugar)'],
        examples: [
          { word: '[sh]opping', ipa: '/ˈʃɒpɪŋ/', meaningVi: 'mua sắm' },
          { word: '[sh]ine', ipa: '/ʃaɪn/', meaningVi: 'tỏa sáng' },
          { word: 'wi[sh]', ipa: '/wɪʃ/', meaningVi: 'điều ước, chúc' },
          { word: '[sh]ould', ipa: '/ʃʊd/', meaningVi: 'nên' },
          { word: 'spe[ci]al', ipa: '/ˈspeʃl/', meaningVi: 'đặc biệt' },
          { word: '[s]ure', ipa: '/ʃʊə(r)/', meaningVi: 'chắc chắn' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh âm /s/ và /ʃ/',
    minimalPairs: [
      {
        leftWord: '[s]ee',
        leftIpa: '/siː/',
        leftMeaningVi: 'nhìn thấy',
        rightWord: '[sh]e',
        rightIpa: '/ʃiː/',
        rightMeaningVi: 'cô ấy',
      },
      {
        leftWord: '[s]ell',
        leftIpa: '/sel/',
        leftMeaningVi: 'bán',
        rightWord: '[sh]ell',
        rightIpa: '/ʃel/',
        rightMeaningVi: 'vỏ sò',
      },
      {
        leftWord: '[s]ock',
        leftIpa: '/sɒk/',
        leftMeaningVi: 'chiếc tất',
        rightWord: '[sh]ock',
        rightIpa: '/ʃɒk/',
        rightMeaningVi: 'cú sốc',
      },
      {
        leftWord: '[s]ave',
        leftIpa: '/seɪv/',
        leftMeaningVi: 'tiết kiệm, cứu',
        rightWord: '[sh]ave',
        rightIpa: '/ʃeɪv/',
        rightMeaningVi: 'cạo râu',
      },
    ],
    exercises: [
      {
        id: 'u6-ex1',
        number: 1,
        title: 'Exercise 1: Odd One Out (Chọn từ có phần gạch chân phát âm khác)',
        instruction: 'Chọn từ có phần gạch chân phát âm khác với 3 từ còn lại.',
        questions: [
          {
            id: 'u6-ex1-q1',
            prompt: 'Câu 1: Chọn từ có phần gạch chân phát âm khác:',
            options: ['[s]pring', '[s]mile', '[sh]opping', '[s]ummer'],
            correctAnswer: '[sh]opping',
            explanation: '"[sh]opping" phát âm là /ʃ/, còn spring, smile, summer phát âm là /s/.',
          },
          {
            id: 'u6-ex1-q2',
            prompt: 'Câu 2: Chọn từ có phần gạch chân phát âm khác:',
            options: ['wi[sh]', '[sh]ould', '[sh]ine', 'blo[ss]om'],
            correctAnswer: 'blo[ss]om',
            explanation: '"blo[ss]om" /ˈblɒsəm/ có "ss" phát âm là /s/, các từ còn lại phát âm là /ʃ/.',
          },
          {
            id: 'u6-ex1-q3',
            prompt: 'Câu 3: Chọn từ có chữ "s" đầu từ phát âm là /ʃ/ khác với 3 từ còn lại:',
            options: ['[s]ure', '[s]weet', '[s]ell', '[s]ing'],
            correctAnswer: '[s]ure',
            explanation: 'Chữ "s" trong "[s]ure" /ʃʊə(r)/ (và "sugar" /ˈʃʊɡə/) đặc biệt được phát âm là /ʃ/, không phải /s/.',
          },
          {
            id: 'u6-ex1-q4',
            prompt: 'Câu 4: Chọn từ có phần gạch chân phát âm khác:',
            options: ['spe[ci]al', '[c]elebrate', '[c]ity', 'ri[c]e'],
            correctAnswer: 'spe[ci]al',
            explanation: '"spe[ci]al" /ˈspeʃl/ có "ci" phát âm là /ʃ/, còn celebrate, city, rice phát âm là /s/.',
          },
        ],
      },
      {
        id: 'u6-ex2',
        number: 2,
        title: 'Exercise 2: Sound Classification (Phân loại /s/ và /ʃ/)',
        instruction: 'Xác định âm đúng của phần gạch chân.',
        questions: [
          {
            id: 'u6-ex2-q1',
            prompt: 'Trong từ "spe[ci]al" (/ˈspeʃl/), chữ "s" đầu và cụm "ci" giữa từ lần lượt phát âm là:',
            options: ['/s/ và /ʃ/', '/ʃ/ và /s/', '/s/ và /s/', '/ʃ/ và /ʃ/'],
            correctAnswer: '/s/ và /ʃ/',
            explanation: 'Trong special /ˈspeʃl/, chữ "s" đầu đọc là /s/, còn cụm "ci" đọc là /ʃ/.',
          },
          {
            id: 'u6-ex2-q2',
            prompt: 'Phần gạch chân trong từ "rubbi[sh]" được phát âm là:',
            options: ['/ʃ/', '/s/', '/z/', '/tʃ/'],
            correctAnswer: '/ʃ/',
            explanation: 'rubbish /ˈrʌbɪʃ/ kết thúc bằng cụm "sh" phát âm là /ʃ/.',
          },
          {
            id: 'u6-ex2-q3',
            prompt: 'Phần gạch chân trong từ "[c]elebrate" được phát âm là:',
            options: ['/s/', '/ʃ/', '/k/', '/tʃ/'],
            correctAnswer: '/s/',
            explanation: 'Chữ "c" đứng trước "e, i, y" trong celebrate /ˈselɪbreɪt/ được phát âm là /s/.',
          },
          {
            id: 'u6-ex2-q4',
            prompt: 'Phần gạch chân trong từ "[s]ugar" (đường ăn) được phát âm là:',
            options: ['/ʃ/', '/s/', '/z/', '/ʒ/'],
            correctAnswer: '/ʃ/',
            explanation: 'sugar được phiên âm là /ˈʃʊɡə(r)/, bắt đầu bằng âm /ʃ/.',
          },
        ],
      },
      {
        id: 'u6-ex3',
        number: 3,
        title: 'Exercise 3: Tongue Twister & Context (Nhận diện âm trong câu Tết)',
        instruction: 'Đọc câu chủ đề Tết và chọn đáp án đúng.',
        questions: [
          {
            id: 'u6-ex3-q1',
            prompt: 'Trong câu: "[Sh]e goes [sh]opping for [s]weet peach blo[ss]oms in the [s]pring", có bao nhiêu từ được đánh dấu chứa âm /ʃ/?',
            options: ['2 từ ([Sh]e, [sh]opping)', '3 từ ([s]weet, blo[ss]oms, [s]pring)', '1 từ ([sh]opping)', '4 từ'],
            correctAnswer: '2 từ ([Sh]e, [sh]opping)',
            explanation: 'She /ʃiː/ và shopping /ˈʃɒpɪŋ/ chứa âm /ʃ/; còn sweet, blossoms, spring chứa âm /s/.',
          },
          {
            id: 'u6-ex3-q2',
            prompt: 'Chọn từ chứa âm /ʃ/ để hoàn thành câu chúc Tết: "We ______ you a Happy New Year!"',
            options: ['wi[sh]', '[s]ay', '[s]ing', '[s]end'],
            correctAnswer: 'wi[sh]',
            explanation: 'wish /wɪʃ/ vừa chứa âm cuối /ʃ/ vừa đúng mẫu câu "We wish you a Happy New Year!".',
          },
          {
            id: 'u6-ex3-q3',
            prompt: 'Từ nào dưới đây có cùng phụ âm đầu với từ "[sh]ould"?',
            options: ['[sh]ine', '[s]mile', '[s]ummer', '[s]ister'],
            correctAnswer: '[sh]ine',
            explanation: 'should /ʃʊd/ và shine /ʃaɪn/ đều bắt đầu bằng âm /ʃ/.',
          },
          {
            id: 'u6-ex3-q4',
            prompt: 'Từ nào dưới đây có cùng phụ âm đầu với từ "[s]pring"?',
            options: ['[s]mile', '[sh]op', '[s]ure', '[sh]out'],
            correctAnswer: '[s]mile',
            explanation: 'spring /sprɪŋ/ và smile /smaɪl/ đều bắt đầu bằng âm /s/.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 7: TELEVISION (/θ/ and /ð/)
  // ==========================================================================
  {
    unitId: 'unit-7',
    unitNumber: 7,
    unitTitle: 'Television',
    topicFocus: 'Sounds: /θ/ and /ð/',
    summaryNote:
      'Cả hai âm /θ/ và /ð/ đều được viết bằng chữ "th" và đều đặt đầu lưỡi hơi thè nhẹ ra giữa hai hàm răng. Điểm khác nhau: /θ/ là âm vô thanh (chỉ đẩy hơi, không rung cổ họng), còn /ð/ là âm hữu thanh (làm rung dây thanh quản).',
    sounds: [
      {
        symbol: '/θ/',
        name: 'Âm "th" vô thanh /θ/',
        howToPronounce:
          'Đặt đầu lưỡi nhẹ nhàng giữa răng cửa trên và răng cửa dưới, thổi luồng hơi ra qua kẽ răng, dây thanh quản KHÔNG rung.',
        spellingPatterns: ['th trong từ mang nội dung chính (theatre, earth, think, thank, both, month, Thursday, three, thirty)'],
        examples: [
          { word: '[th]eatre', ipa: '/ˈθɪətə(r)/', meaningVi: 'nhà hát' },
          { word: 'ear[th]', ipa: '/ɜːθ/', meaningVi: 'trái đất' },
          { word: '[th]ink', ipa: '/θɪŋk/', meaningVi: 'suy nghĩ' },
          { word: 'bo[th]', ipa: '/bəʊθ/', meaningVi: 'cả hai' },
          { word: 'mon[th]', ipa: '/mʌnθ/', meaningVi: 'tháng' },
          { word: '[th]ank', ipa: '/θæŋk/', meaningVi: 'cảm ơn' },
        ],
      },
      {
        symbol: '/ð/',
        name: 'Âm "th" hữu thanh /ð/',
        howToPronounce:
          'Đặt đầu lưỡi giữa hai hàm răng giống âm /θ/, nhưng đồng thời làm RUNG mạnh dây thanh quản khi phát âm.',
        spellingPatterns: ['th trong đại từ/từ chức năng (there, them, they, this, that, neither) hoặc giữa từ (weather, brother, father, together)'],
        examples: [
          { word: '[th]ere', ipa: '/ðeə(r)/', meaningVi: 'ở đó' },
          { word: 'wea[th]er', ipa: '/ˈweðə(r)/', meaningVi: 'thời tiết' },
          { word: 'bro[th]er', ipa: '/ˈbrʌðə(r)/', meaningVi: 'anh/em trai' },
          { word: '[th]em', ipa: '/ðem/', meaningVi: 'họ, chúng' },
          { word: 'nei[th]er', ipa: '/ˈnaɪðə(r)/', meaningVi: 'không cái nào' },
          { word: 'toge[th]er', ipa: '/təˈɡeðə(r)/', meaningVi: 'cùng nhau' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh âm /θ/ và /ð/',
    minimalPairs: [
      {
        leftWord: '[th]ink (/θ/)',
        leftIpa: '/θɪŋk/',
        leftMeaningVi: 'suy nghĩ (vô thanh)',
        rightWord: '[th]is (/ð/)',
        rightIpa: '/ðɪs/',
        rightMeaningVi: 'cái này (hữu thanh)',
      },
      {
        leftWord: 'brea[th] (/θ/)',
        leftIpa: '/breθ/',
        leftMeaningVi: 'hơi thở (danh từ)',
        rightWord: 'brea[the] (/ð/)',
        rightIpa: '/briːð/',
        rightMeaningVi: 'thở (động từ)',
      },
      {
        leftWord: '[th]ree (/θ/)',
        leftIpa: '/θriː/',
        leftMeaningVi: 'số 3',
        rightWord: '[th]ey (/ð/)',
        rightIpa: '/ðeɪ/',
        rightMeaningVi: 'họ',
      },
      {
        leftWord: 'ear[th] (/θ/)',
        leftIpa: '/ɜːθ/',
        leftMeaningVi: 'trái đất',
        rightWord: 'wea[th]er (/ð/)',
        rightIpa: '/ˈweðə(r)/',
        rightMeaningVi: 'thời tiết',
      },
    ],
    exercises: [
      {
        id: 'u7-ex1',
        number: 1,
        title: 'Exercise 1: Odd One Out (Chọn từ có chữ "th" phát âm khác)',
        instruction: 'Chọn từ có phần gạch chân [th] phát âm khác với 3 từ còn lại.',
        questions: [
          {
            id: 'u7-ex1-q1',
            prompt: 'Câu 1: Chọn từ có phần gạch chân [th] phát âm khác:',
            options: ['[th]eatre', 'ear[th]', 'wea[th]er', '[th]ink'],
            correctAnswer: 'wea[th]er',
            explanation: '"wea[th]er" /ˈweðə(r)/ phát âm là /ð/ (hữu thanh), còn theatre, earth, think phát âm là /θ/ (vô thanh).',
          },
          {
            id: 'u7-ex1-q2',
            prompt: 'Câu 2: Chọn từ có phần gạch chân [th] phát âm khác:',
            options: ['[th]ere', 'bro[th]er', 'toge[th]er', '[th]irty'],
            correctAnswer: '[th]irty',
            explanation: '"[th]irty" /ˈθɜːti/ phát âm là /θ/, còn there, brother, together phát âm là /ð/.',
          },
          {
            id: 'u7-ex1-q3',
            prompt: 'Câu 3: Chọn từ có phần gạch chân [th] phát âm khác:',
            options: ['bo[th]', 'mon[th]', '[th]ank', '[th]em'],
            correctAnswer: '[th]em',
            explanation: '"[th]em" /ðem/ phát âm là /ð/, các từ both, month, thank phát âm là /θ/.',
          },
          {
            id: 'u7-ex1-q4',
            prompt: 'Câu 4: Chọn từ có phần gạch chân [th] phát âm khác:',
            options: ['nei[th]er', 'fa[th]er', '[th]an', '[th]ursday'],
            correctAnswer: '[th]ursday',
            explanation: '"[th]ursday" /ˈθɜːzdeɪ/ bắt đầu bằng âm /θ/, các từ còn lại chứa âm /ð/.',
          },
        ],
      },
      {
        id: 'u7-ex2',
        number: 2,
        title: 'Exercise 2: Sound Classification (Xác định /θ/ hay /ð/)',
        instruction: 'Chọn âm đúng cho phần gạch chân [th] trong mỗi từ.',
        questions: [
          {
            id: 'u7-ex2-q1',
            prompt: 'Chữ [th] trong từ "[th]eatre" được phát âm là:',
            options: ['/θ/ (vô thanh)', '/ð/ (hữu thanh)', '/t/', '/s/'],
            correctAnswer: '/θ/ (vô thanh)',
            explanation: 'theatre /ˈθɪətə(r)/ bắt đầu bằng âm vô thanh /θ/.',
          },
          {
            id: 'u7-ex2-q2',
            prompt: 'Chữ [th] trong từ "wea[th]er" được phát âm là:',
            options: ['/ð/ (hữu thanh)', '/θ/ (vô thanh)', '/d/', '/z/'],
            correctAnswer: '/ð/ (hữu thanh)',
            explanation: 'weather /ˈweðə(r)/ có "th" ở giữa từ phát âm là âm hữu thanh /ð/.',
          },
          {
            id: 'u7-ex2-q3',
            prompt: 'Chữ [th] trong từ "ear[th]" được phát âm là:',
            options: ['/θ/ (vô thanh)', '/ð/ (hữu thanh)', '/t/', '/f/'],
            correctAnswer: '/θ/ (vô thanh)',
            explanation: 'earth /ɜːθ/ kết thúc bằng âm vô thanh /θ/.',
          },
          {
            id: 'u7-ex2-q4',
            prompt: 'Chữ [th] trong từ "nei[th]er" được phát âm là:',
            options: ['/ð/ (hữu thanh)', '/θ/ (vô thanh)', '/t/', '/d/'],
            correctAnswer: '/ð/ (hữu thanh)',
            explanation: 'neither /ˈnaɪðə(r)/ có "th" phát âm là /ð/.',
          },
        ],
      },
      {
        id: 'u7-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Thực hành trong câu)',
        instruction: 'Phân tích âm /θ/ và /ð/ trong các câu chủ đề Television.',
        questions: [
          {
            id: 'u7-ex3-q1',
            prompt: 'Trong câu: "The wea[th]erman [th]inks [th]ere is a great film this mon[th]", những từ nào có [th] phát âm là /θ/?',
            options: ['[th]inks & mon[th]', 'wea[th]erman & [th]ere', '[th]inks & [th]ere', 'wea[th]erman & mon[th]'],
            correctAnswer: '[th]inks & mon[th]',
            explanation: 'thinks /θɪŋks/ và month /mʌnθ/ phát âm là /θ/; còn weatherman và there phát âm là /ð/.',
          },
          {
            id: 'u7-ex3-q2',
            prompt: 'Từ nào dưới đây có cùng âm [th] với từ "bro[th]er"?',
            options: ['toge[th]er', 'bir[th]day', 'heal[th]y', '[th]ing'],
            correctAnswer: 'toge[th]er',
            explanation: 'brother /ˈbrʌðə/ và together /təˈɡeðə/ đều chứa âm hữu thanh /ð/.',
          },
          {
            id: 'u7-ex3-q3',
            prompt: 'Từ nào dưới đây có cùng âm [th] với từ "[th]ink"?',
            options: ['bo[th]', '[th]is', '[th]at', '[th]ose'],
            correctAnswer: 'bo[th]',
            explanation: 'think /θɪŋk/ và both /bəʊθ/ đều chứa âm vô thanh /θ/. Các từ chỉ định this, that, those đều chứa âm /ð/.',
          },
          {
            id: 'u7-ex3-q4',
            prompt: 'Trong từ "[th]ank" và "[th]ey", hai âm đầu lần lượt là:',
            options: ['/θ/ và /ð/', '/ð/ và /θ/', '/θ/ và /θ/', '/ð/ và /ð/'],
            correctAnswer: '/θ/ và /ð/',
            explanation: 'thank /θæŋk/ bắt đầu bằng /θ/, còn đại từ nhân xưng they /ðeɪ/ bắt đầu bằng /ð/.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 8: SPORTS AND GAMES (/e/ and /æ/)
  // ==========================================================================
  {
    unitId: 'unit-8',
    unitNumber: 8,
    unitTitle: 'Sports and Games',
    topicFocus: 'Sounds: /e/ and /æ/',
    summaryNote:
      'Phân biệt nguyên âm /e/ (độ mở miệng vừa phải, gần giống âm "e" tiếng Việt) và nguyên âm "e bẹt" /æ/ (mở rộng miệng cả chiều dọc lẫn chiều ngang, hạ thấp cằm, âm pha giữa "a" và "e").',
    sounds: [
      {
        symbol: '/e/',
        name: 'Nguyên âm /e/',
        howToPronounce:
          'Miệng mở vừa phải (hẹp hơn /æ/), môi hơi bè tự nhiên, phát âm ngắn gọn giống âm "e" trong tiếng Việt.',
        spellingPatterns: ['e (chess, tennis, exercise, contest, helmet, member)'],
        examples: [
          { word: 'ch[e]ss', ipa: '/tʃes/', meaningVi: 'cờ vua' },
          { word: 't[e]nnis', ipa: '/ˈtenɪs/', meaningVi: 'quần vợt' },
          { word: '[e]xercise', ipa: '/ˈeksəsaɪz/', meaningVi: 'bài tập thể dục' },
          { word: 'cont[e]st', ipa: '/ˈkɒntest/', meaningVi: 'cuộc thi' },
          { word: 'h[e]lmet', ipa: '/ˈhelmɪt/', meaningVi: 'mũ bảo hiểm' },
          { word: 'm[e]mber', ipa: '/ˈmembə(r)/', meaningVi: 'thành viên' },
        ],
      },
      {
        symbol: '/æ/',
        name: 'Nguyên âm e bẹt /æ/',
        howToPronounce:
          'Mở to miệng theo cả hai chiều (kéo khóe miệng sang ngang đồng thời hạ thấp hàm dưới), phát âm lai giữa "a" và "e".',
        spellingPatterns: ['a (racket, match, marathon, active, badminton, champion, fan)'],
        examples: [
          { word: 'r[a]cket', ipa: '/ˈrækɪt/', meaningVi: 'cây vợt' },
          { word: 'm[a]tch', ipa: '/mætʃ/', meaningVi: 'trận đấu' },
          { word: 'm[a]rathon', ipa: '/ˈmærəθən/', meaningVi: 'cuộc chạy ma-ra-tông' },
          { word: '[a]ctive', ipa: '/ˈæktɪv/', meaningVi: 'năng động' },
          { word: 'b[a]dminton', ipa: '/ˈbædmɪntən/', meaningVi: 'cầu lông' },
          { word: 'ch[a]mpion', ipa: '/ˈtʃæmpiən/', meaningVi: 'nhà vô địch' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh âm /e/ và /æ/',
    minimalPairs: [
      {
        leftWord: 'm[e]n (/e/)',
        leftIpa: '/men/',
        leftMeaningVi: 'những người đàn ông',
        rightWord: 'm[a]n (/æ/)',
        rightIpa: '/mæn/',
        rightMeaningVi: 'một người đàn ông',
      },
      {
        leftWord: 'p[e]n (/e/)',
        leftIpa: '/pen/',
        leftMeaningVi: 'cây bút mực',
        rightWord: 'p[a]n (/æ/)',
        rightIpa: '/pæn/',
        rightMeaningVi: 'cái chảo',
      },
      {
        leftWord: 's[e]t (/e/)',
        leftIpa: '/set/',
        leftMeaningVi: 'hiệp đấu, bộ',
        rightWord: 's[a]t (/æ/)',
        rightIpa: '/sæt/',
        rightMeaningVi: 'đã ngồi (quá khứ của sit)',
      },
      {
        leftWord: 'b[e]d (/e/)',
        leftIpa: '/bed/',
        leftMeaningVi: 'chiếc giường',
        rightWord: 'b[a]d (/æ/)',
        rightIpa: '/bæd/',
        rightMeaningVi: 'tồi tệ',
      },
    ],
    exercises: [
      {
        id: 'u8-ex1',
        number: 1,
        title: 'Exercise 1: Odd One Out (Chọn từ có phần gạch chân phát âm khác)',
        instruction: 'Chọn từ có phần gạch chân được phát âm khác với 3 từ còn lại.',
        questions: [
          {
            id: 'u8-ex1-q1',
            prompt: 'Câu 1: Chọn từ có phần gạch chân phát âm khác:',
            options: ['ch[e]ss', 't[e]nnis', 'r[a]cket', 'h[e]lmet'],
            correctAnswer: 'r[a]cket',
            explanation: '"r[a]cket" /ˈrækɪt/ có phần gạch chân phát âm là /æ/, 3 từ còn lại phát âm là /e/.',
          },
          {
            id: 'u8-ex1-q2',
            prompt: 'Câu 2: Chọn từ có phần gạch chân phát âm khác:',
            options: ['m[a]tch', 'b[a]dminton', 'ch[a]mpion', '[e]xercise'],
            correctAnswer: '[e]xercise',
            explanation: '"[e]xercise" /ˈeksəsaɪz/ bắt đầu bằng âm /e/, còn match, badminton, champion chứa âm /æ/.',
          },
          {
            id: 'u8-ex1-q3',
            prompt: 'Câu 3: Chọn từ có chữ "a" phát âm khác với 3 từ còn lại:',
            options: ['m[a]rathon', '[a]ctive', 'f[a]n', 'w[a]ter'],
            correctAnswer: 'w[a]ter',
            explanation: '"w[a]ter" /ˈwɔːtə/ phát âm là /ɔː/, trong khi marathon, active, fan phát âm là /æ/.',
          },
          {
            id: 'u8-ex1-q4',
            prompt: 'Câu 4: Chọn từ có chữ "e" phát âm khác với 3 từ còn lại:',
            options: ['cont[e]st', 'm[e]mber', 't[e]nt', 'athl[e]te'],
            correctAnswer: 'athl[e]te',
            explanation: '"athl[e]te" /ˈæθliːt/ (vận động viên) có chữ "e" phát âm là /iː/, các từ còn lại phát âm là /e/.',
          },
        ],
      },
      {
        id: 'u8-ex2',
        number: 2,
        title: 'Exercise 2: Sound Classification (Phân loại /e/ và /æ/)',
        instruction: 'Xác định âm đúng của phần gạch chân.',
        questions: [
          {
            id: 'u8-ex2-q1',
            prompt: 'Phần gạch chân trong từ "b[a]dminton" được phát âm là:',
            options: ['/æ/', '/e/', '/ɑː/', '/ʌ/'],
            correctAnswer: '/æ/',
            explanation: 'badminton /ˈbædmɪntən/ có chữ "a" ở âm tiết đầu phát âm là /æ/.',
          },
          {
            id: 'u8-ex2-q2',
            prompt: 'Phần gạch chân trong từ "t[e]nnis" được phát âm là:',
            options: ['/e/', '/æ/', '/ɪ/', '/iː/'],
            correctAnswer: '/e/',
            explanation: 'tennis /ˈtenɪs/ có chữ "e" phát âm là /e/.',
          },
          {
            id: 'u8-ex2-q3',
            prompt: 'Phần gạch chân trong từ "ch[a]mpion" được phát âm là:',
            options: ['/æ/', '/e/', '/eɪ/', '/ɑː/'],
            correctAnswer: '/æ/',
            explanation: 'champion /ˈtʃæmpiən/ có chữ "a" phát âm là /æ/.',
          },
          {
            id: 'u8-ex2-q4',
            prompt: 'Phần gạch chân trong từ "[e]xercise" được phát âm là:',
            options: ['/e/', '/æ/', '/ɪ/', '/ə/'],
            correctAnswer: '/e/',
            explanation: 'exercise /ˈeksəsaɪz/ bắt đầu bằng nguyên âm /e/.',
          },
        ],
      },
      {
        id: 'u8-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Thực hành trong câu thể thao)',
        instruction: 'Đọc câu và chọn đáp án đúng.',
        questions: [
          {
            id: 'u8-ex3-q1',
            prompt: 'Trong câu: "The ch[a]mpion bought a new t[e]nnis r[a]cket y[e]sterday", những từ nào có phần gạch chân phát âm là /æ/?',
            options: ['ch[a]mpion & r[a]cket', 't[e]nnis & y[e]sterday', 'ch[a]mpion & t[e]nnis', 'r[a]cket & y[e]sterday'],
            correctAnswer: 'ch[a]mpion & r[a]cket',
            explanation: 'champion và racket chứa âm /æ/; còn tennis và yesterday chứa âm /e/.',
          },
          {
            id: 'u8-ex3-q2',
            prompt: 'Chọn từ chứa âm /e/ để điền vào câu: "My father and I often play ______ in the evening."',
            options: ['ch[e]ss', 'b[a]dminton', 'b[a]sketball', 'h[a]ndball'],
            correctAnswer: 'ch[e]ss',
            explanation: 'chess /tʃes/ (cờ vua) chứa nguyên âm /e/, các môn còn lại có phần gạch chân chứa âm /æ/ hoặc /ɑː/.',
          },
          {
            id: 'u8-ex3-q3',
            prompt: 'Từ nào dưới đây có cùng nguyên âm gạch chân với từ "m[a]tch"?',
            options: ['m[a]rathon', 'h[e]lmet', 'm[e]dal', 's[e]ven'],
            correctAnswer: 'm[a]rathon',
            explanation: 'match /mætʃ/ và marathon /ˈmærəθən/ đều chứa nguyên âm /æ/.',
          },
          {
            id: 'u8-ex3-q4',
            prompt: 'Từ nào dưới đây có cùng nguyên âm gạch chân với từ "h[e]lmet"?',
            options: ['cont[e]st', 'r[a]cket', '[a]ctive', 'f[a]n'],
            correctAnswer: 'cont[e]st',
            explanation: 'helmet /ˈhelmɪt/ và contest /ˈkɒntest/ đều có chữ "e" gạch chân phát âm là /e/.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 9: CITIES OF THE WORLD (/əʊ/ and /aʊ/)
  // ==========================================================================
  {
    unitId: 'unit-9',
    unitNumber: 9,
    unitTitle: 'Cities of the World',
    topicFocus: 'Diphthongs: /əʊ/ and /aʊ/',
    summaryNote:
      'Phân biệt hai nguyên âm đôi cùng kết thúc bằng âm trụm môi /ʊ/: âm /əʊ/ trượt từ /ə/ sang /ʊ/ (giống âm "âu/ô"), còn âm /aʊ/ mở rộng miệng ở đầu âm /a/ rồi trượt sang /ʊ/ (giống âm "ao").',
    sounds: [
      {
        symbol: '/əʊ/',
        name: 'Nguyên âm đôi /əʊ/',
        howToPronounce:
          'Bắt đầu với miệng thả lỏng ở vị trí nguyên âm trung tâm /ə/, sau đó nhanh chóng thu tròn môi về vị trí âm /ʊ/.',
        spellingPatterns: ['oa (boat, coast, road)', 'o (postcard, cold, old, photo, pagoda)', 'ow (snow, slow, window, show)'],
        examples: [
          { word: 'b[oa]t', ipa: '/bəʊt/', meaningVi: 'con thuyền' },
          { word: 'c[oa]st', ipa: '/kəʊst/', meaningVi: 'bờ biển' },
          { word: 'p[o]stcard', ipa: '/ˈpəʊstkɑːd/', meaningVi: 'bưu thiếp' },
          { word: 'sn[ow]y', ipa: '/ˈsnəʊi/', meaningVi: 'có tuyết rơi' },
          { word: 'c[o]ld', ipa: '/kəʊld/', meaningVi: 'lạnh' },
          { word: 'ph[o]t[o]', ipa: '/ˈfəʊtəʊ/', meaningVi: 'bức ảnh' },
        ],
      },
      {
        symbol: '/aʊ/',
        name: 'Nguyên âm đôi /aʊ/',
        howToPronounce:
          'Bắt đầu bằng cách mở rộng miệng phát âm /a/, rồi khép dần hàm và chu tròn môi chuyển sang âm /ʊ/.',
        spellingPatterns: ['ou (house, proud, cloud, mountain)', 'ow (town, tower, crowded, now, how)'],
        examples: [
          { word: 'h[ou]se', ipa: '/haʊs/', meaningVi: 'ngôi nhà' },
          { word: 't[ow]n', ipa: '/taʊn/', meaningVi: 'thị trấn, phố' },
          { word: 't[ow]er', ipa: '/ˈtaʊə(r)/', meaningVi: 'tòa tháp' },
          { word: 'cr[ow]ded', ipa: '/ˈkraʊdɪd/', meaningVi: 'đông đúc' },
          { word: 'pr[ou]d', ipa: '/praʊd/', meaningVi: 'tự hào' },
          { word: 'ar[ou]nd', ipa: '/əˈraʊnd/', meaningVi: 'xung quanh' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh nguyên âm đôi /əʊ/ và /aʊ/',
    minimalPairs: [
      {
        leftWord: 'n[o] (/əʊ/)',
        leftIpa: '/nəʊ/',
        leftMeaningVi: 'không',
        rightWord: 'n[ow] (/aʊ/)',
        rightIpa: '/naʊ/',
        rightMeaningVi: 'bây giờ',
      },
      {
        leftWord: 'kn[ow] (/əʊ/)',
        leftIpa: '/nəʊ/',
        leftMeaningVi: 'biết',
        rightWord: 'n[ow] (/aʊ/)',
        rightIpa: '/naʊ/',
        rightMeaningVi: 'bây giờ',
      },
      {
        leftWord: 'b[oa]t (/əʊ/)',
        leftIpa: '/bəʊt/',
        leftMeaningVi: 'con thuyền',
        rightWord: 'b[ou]t (/aʊ/)',
        rightIpa: '/baʊt/',
        rightMeaningVi: 'đợt, hiệp đấu',
      },
      {
        leftWord: 'l[ow] (/əʊ/)',
        leftIpa: '/ləʊ/',
        leftMeaningVi: 'thấp',
        rightWord: 'l[ou]d (/aʊ/)',
        rightIpa: '/laʊd/',
        rightMeaningVi: 'to, ầm ĩ',
      },
    ],
    exercises: [
      {
        id: 'u9-ex1',
        number: 1,
        title: 'Exercise 1: Odd One Out (Chú ý chữ "ow" và "o/ou")',
        instruction: 'Chọn từ có phần gạch chân được phát âm khác với 3 từ còn lại.',
        questions: [
          {
            id: 'u9-ex1-q1',
            prompt: 'Câu 1: Chọn từ có cụm [ow] phát âm khác với 3 từ còn lại:',
            options: ['t[ow]n', 'cr[ow]ded', 't[ow]er', 'sn[ow]y'],
            correctAnswer: 'sn[ow]y',
            explanation: '"sn[ow]y" /ˈsnəʊi/ phát âm là /əʊ/, trong khi town, crowded, tower có "ow" phát âm là /aʊ/.',
          },
          {
            id: 'u9-ex1-q2',
            prompt: 'Câu 2: Chọn từ có phần gạch chân phát âm khác:',
            options: ['p[o]stcard', 'c[oa]st', 'h[ou]se', 'b[oa]t'],
            correctAnswer: 'h[ou]se',
            explanation: '"h[ou]se" /haʊs/ phát âm là /aʊ/, còn postcard, coast, boat phát âm là /əʊ/.',
          },
          {
            id: 'u9-ex1-q3',
            prompt: 'Câu 3: Chọn từ có cụm [ow] phát âm khác với 3 từ còn lại:',
            options: ['sl[ow]', 'wind[ow]', 'sh[ow]', 'h[ow]'],
            correctAnswer: 'h[ow]',
            explanation: '"h[ow]" /haʊ/ phát âm là /aʊ/, còn slow, window, show phát âm là /əʊ/.',
          },
          {
            id: 'u9-ex1-q4',
            prompt: 'Câu 4: Chọn từ có phần gạch chân phát âm khác:',
            options: ['pr[ou]d', 'ar[ou]nd', 'cl[ou]d', 'fam[ou]s'],
            correctAnswer: 'fam[ou]s',
            explanation: 'Đuôi "-ous" trong "famous" /ˈfeɪməs/ phát âm là /əs/, còn proud, around, cloud phát âm là /aʊ/.',
          },
        ],
      },
      {
        id: 'u9-ex2',
        number: 2,
        title: 'Exercise 2: Sound Classification (Phân loại /əʊ/ và /aʊ/)',
        instruction: 'Xác định nguyên âm đôi của phần gạch chân.',
        questions: [
          {
            id: 'u9-ex2-q1',
            prompt: 'Phần gạch chân trong từ "cr[ow]ded" được phát âm là:',
            options: ['/aʊ/', '/əʊ/', '/ɔː/', '/ɒ/'],
            correctAnswer: '/aʊ/',
            explanation: 'crowded /ˈkraʊdɪd/ (đông đúc) có cụm "ow" phát âm là /aʊ/.',
          },
          {
            id: 'u9-ex2-q2',
            prompt: 'Phần gạch chân trong từ "p[o]stcard" được phát âm là:',
            options: ['/əʊ/', '/aʊ/', '/ɒ/', '/ɔː/'],
            correctAnswer: '/əʊ/',
            explanation: 'postcard /ˈpəʊstkɑːd/ có chữ "o" phát âm là /əʊ/.',
          },
          {
            id: 'u9-ex2-q3',
            prompt: 'Phần gạch chân trong từ "c[oa]st" (bờ biển) được phát âm là:',
            options: ['/əʊ/', '/aʊ/', '/ɔɪ/', '/eɪ/'],
            correctAnswer: '/əʊ/',
            explanation: 'coast /kəʊst/ có cụm "oa" phát âm là /əʊ/.',
          },
          {
            id: 'u9-ex2-q4',
            prompt: 'Phần gạch chân trong từ "t[ow]er" (tòa tháp) được phát âm là:',
            options: ['/aʊ/', '/əʊ/', '/ɔː/', '/ʊə/'],
            correctAnswer: '/aʊ/',
            explanation: 'tower /ˈtaʊə(r)/ bắt đầu bằng âm /taʊ-/ chứa nguyên âm đôi /aʊ/.',
          },
        ],
      },
      {
        id: 'u9-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Thực hành trong câu du lịch)',
        instruction: 'Đọc câu và trả lời câu hỏi ngữ âm.',
        questions: [
          {
            id: 'u9-ex3-q1',
            prompt: 'Trong câu: "It is very c[o]ld and sn[ow]y near the [o]ld t[ow]n", từ nào chứa âm /aʊ/?',
            options: ['t[ow]n', 'c[o]ld', 'sn[ow]y', '[o]ld'],
            correctAnswer: 't[ow]n',
            explanation: 'town /taʊn/ chứa âm /aʊ/; cả 3 từ cold, snowy, old đều chứa âm /əʊ/.',
          },
          {
            id: 'u9-ex3-q2',
            prompt: 'Trong câu: "There are many cr[ow]ded b[oa]ts near the c[oa]st", các âm gạch chân lần lượt là:',
            options: ['/aʊ/ – /əʊ/ – /əʊ/', '/əʊ/ – /aʊ/ – /əʊ/', '/aʊ/ – /aʊ/ – /əʊ/', '/əʊ/ – /əʊ/ – /aʊ/'],
            correctAnswer: '/aʊ/ – /əʊ/ – /əʊ/',
            explanation: 'crowded (/aʊ/), boats (/əʊ/), coast (/əʊ/).',
          },
          {
            id: 'u9-ex3-q3',
            prompt: 'Từ nào dưới đây có cùng nguyên âm đôi với từ "ph[o]to"?',
            options: ['pag[o]da', 'm[ou]ntain', 't[ow]er', 'h[ou]se'],
            correctAnswer: 'pag[o]da',
            explanation: 'photo /ˈfəʊtəʊ/ và pagoda /pəˈɡəʊdə/ đều có chữ "o" gạch chân phát âm là /əʊ/.',
          },
          {
            id: 'u9-ex3-q4',
            prompt: 'Từ nào dưới đây có cùng nguyên âm đôi với từ "pr[ou]d"?',
            options: ['t[ow]n', 'b[oa]t', 'sn[ow]', 'c[o]ld'],
            correctAnswer: 't[ow]n',
            explanation: 'proud /praʊd/ và town /taʊn/ đều chứa nguyên âm đôi /aʊ/.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 10: OUR HOUSES IN THE FUTURE (/dr/ and /tr/)
  // ==========================================================================
  {
    unitId: 'unit-10',
    unitNumber: 10,
    unitTitle: 'Our Houses in the Future',
    topicFocus: 'Consonant clusters: /dr/ and /tr/',
    summaryNote:
      'Phân biệt hai tổ hợp phụ âm đầu /dr/ (kết hợp âm hữu thanh /d/ và /r/, dây thanh quản rung) và /tr/ (kết hợp âm vô thanh /t/ và /r/, bật hơi nhẹ và không rung ở đầu âm). Không chèn nguyên âm /ə/ vào giữa hai phụ âm.',
    sounds: [
      {
        symbol: '/dr/',
        name: 'Tổ hợp phụ âm hữu thanh /dr/',
        howToPronounce:
          'Chu nhẹ môi chuẩn bị cho âm /r/, đặt đầu lưỡi ở lợi trên phát âm /d/ (rung cổ họng) rồi lướt cực nhanh sang âm /r/.',
        spellingPatterns: ['dr (dream, drive, drop, draw, dry, bedroom, children)'],
        examples: [
          { word: '[dr]eam', ipa: '/driːm/', meaningVi: 'giấc mơ, mơ ước' },
          { word: '[dr]ive', ipa: '/draɪv/', meaningVi: 'lái xe' },
          { word: '[dr]op', ipa: '/drɒp/', meaningVi: 'giọt (nước), làm rơi' },
          { word: '[dr]aw', ipa: '/drɔː/', meaningVi: 'vẽ' },
          { word: 'chil[dr]en', ipa: '/ˈtʃɪldrən/', meaningVi: 'trẻ em' },
          { word: 'be[dr]oom', ipa: '/ˈbedruːm/', meaningVi: 'phòng ngủ' },
        ],
      },
      {
        symbol: '/tr/',
        name: 'Tổ hợp phụ âm vô thanh /tr/',
        howToPronounce:
          'Chu nhẹ môi chuẩn bị cho âm /r/, bật âm vô thanh /t/ rồi nối liền ngay sang âm /r/ mà không tách rời.',
        spellingPatterns: ['tr (tree, train, tractor, travel, country, electric, astronaut)'],
        examples: [
          { word: '[tr]ee', ipa: '/triː/', meaningVi: 'cây cối' },
          { word: '[tr]ain', ipa: '/treɪn/', meaningVi: 'tàu hỏa' },
          { word: '[tr]actor', ipa: '/ˈtræktə(r)/', meaningVi: 'máy kéo' },
          { word: '[tr]avel', ipa: '/ˈtrævl/', meaningVi: 'đi du lịch, di chuyển' },
          { word: 'coun[tr]y', ipa: '/ˈkʌntri/', meaningVi: 'miền quê, đất nước' },
          { word: 'elec[tr]ic', ipa: '/ɪˈlektrɪk/', meaningVi: 'chạy bằng điện' },
        ],
      },
    ],
    minimalPairsTitle: 'Cặp từ so sánh tổ hợp âm /dr/ và /tr/',
    minimalPairs: [
      {
        leftWord: '[dr]ain (/dr/)',
        leftIpa: '/dreɪn/',
        leftMeaningVi: 'ống thoát nước',
        rightWord: '[tr]ain (/tr/)',
        rightIpa: '/treɪn/',
        rightMeaningVi: 'tàu hỏa',
      },
      {
        leftWord: '[dr]y (/dr/)',
        leftIpa: '/draɪ/',
        leftMeaningVi: 'khô ráo, làm khô',
        rightWord: '[tr]y (/tr/)',
        rightIpa: '/traɪ/',
        rightMeaningVi: 'cố gắng, thử',
      },
      {
        leftWord: '[dr]ip (/dr/)',
        leftIpa: '/drɪp/',
        leftMeaningVi: 'nhỏ giọt',
        rightWord: '[tr]ip (/tr/)',
        rightIpa: '/trɪp/',
        rightMeaningVi: 'chuyến đi',
      },
      {
        leftWord: '[dr]unk (/dr/)',
        leftIpa: '/drʌŋk/',
        leftMeaningVi: 'đã uống (P2 của drink)',
        rightWord: '[tr]unk (/tr/)',
        rightIpa: '/trʌŋk/',
        rightMeaningVi: 'thân cây / cốp xe',
      },
    ],
    exercises: [
      {
        id: 'u10-ex1',
        number: 1,
        title: 'Exercise 1: Odd One Out (Phân biệt cụm /dr/ và /tr/)',
        instruction: 'Chọn từ chứa tổ hợp phụ âm gạch chân khác với 3 từ còn lại.',
        questions: [
          {
            id: 'u10-ex1-q1',
            prompt: 'Câu 1: Chọn từ có phần gạch chân phát âm khác:',
            options: ['[dr]eam', '[dr]ive', '[tr]avel', '[dr]op'],
            correctAnswer: '[tr]avel',
            explanation: '"[tr]avel" bắt đầu bằng tổ hợp âm vô thanh /tr/, 3 từ còn lại bắt đầu bằng /dr/.',
          },
          {
            id: 'u10-ex1-q2',
            prompt: 'Câu 2: Chọn từ có phần gạch chân phát âm khác:',
            options: ['[tr]ee', '[tr]ain', '[tr]actor', 'chil[dr]en'],
            correctAnswer: 'chil[dr]en',
            explanation: '"chil[dr]en" chứa cụm âm /dr/, còn tree, train, tractor chứa cụm âm /tr/.',
          },
          {
            id: 'u10-ex1-q3',
            prompt: 'Câu 3: Chọn từ có phần gạch chân phát âm khác:',
            options: ['coun[tr]y', 'elec[tr]ic', 'as[tr]onaut', 'be[dr]oom'],
            correctAnswer: 'be[dr]oom',
            explanation: '"be[dr]oom" chứa cụm âm /dr/, còn country, electric, astronaut chứa cụm âm /tr/.',
          },
          {
            id: 'u10-ex1-q4',
            prompt: 'Câu 4: Chọn từ có phần gạch chân phát âm khác:',
            options: ['[dr]aw', '[dr]y', 'hi-[t]ech', 'hun[dr]ed'],
            correctAnswer: 'hi-[t]ech',
            explanation: '"hi-[t]ech" chỉ có phụ âm đơn /t/, các từ còn lại chứa tổ hợp phụ âm /dr/.',
          },
        ],
      },
      {
        id: 'u10-ex2',
        number: 2,
        title: 'Exercise 2: Cluster Identification (Nhận diện /dr/ và /tr/)',
        instruction: 'Chọn tổ hợp phụ âm đúng cho mỗi từ.',
        questions: [
          {
            id: 'u10-ex2-q1',
            prompt: 'Từ "as[tr]onaut" (phi hành gia) chứa tổ hợp phụ âm nào ở giữa từ?',
            options: ['/tr/', '/dr/', '/st/', '/str/'],
            correctAnswer: '/tr/',
            explanation: 'astronaut /ˈæstrənɔːt/ có cụm chữ "tr" phát âm là /tr/.',
          },
          {
            id: 'u10-ex2-q2',
            prompt: 'Từ "chil[dr]en" (trẻ em) chứa tổ hợp phụ âm nào ở giữa từ?',
            options: ['/dr/', '/tr/', '/ld/', '/dʒ/'],
            correctAnswer: '/dr/',
            explanation: 'children /ˈtʃɪldrən/ có cụm chữ "dr" phát âm là /dr/.',
          },
          {
            id: 'u10-ex2-q3',
            prompt: 'Khi phát âm từ "[dr]eam", lỗi nào cần tránh để phát âm chuẩn tự nhiên?',
            options: [
              'Không chèn thêm âm "ờ" (/ə/) thành "đờ-rim", mà nối liền /d/ sang /r/',
              'Phải đọc tách thành hai từ riêng biệt',
              'Không được phát âm âm /r/',
              'Đọc chữ d thành chữ t',
            ],
            correctAnswer: 'Không chèn thêm âm "ờ" (/ə/) thành "đờ-rim", mà nối liền /d/ sang /r/',
            explanation: 'Trong tổ hợp phụ âm /dr/ và /tr/, hai phụ âm được đọc lướt liền nhau không có nguyên âm xen giữa.',
          },
          {
            id: 'u10-ex2-q4',
            prompt: 'Từ nào dưới đây chứa CẢ tổ hợp /tr/ và /dr/ trong cụm danh từ "coun[tr]y [dr]eam"?',
            options: [
              'coun[tr]y chứa /tr/ và [dr]eam chứa /dr/',
              'coun[tr]y chứa /dr/ và [dr]eam chứa /tr/',
              'Cả hai đều chứa /tr/',
              'Cả hai đều chứa /dr/',
            ],
            correctAnswer: 'coun[tr]y chứa /tr/ và [dr]eam chứa /dr/',
            explanation: 'country /ˈkʌntri/ có /tr/, còn dream /driːm/ có /dr/.',
          },
        ],
      },
      {
        id: 'u10-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Thực hành câu ngôi nhà tương lai)',
        instruction: 'Chọn đáp án đúng theo ngữ cảnh và yêu cầu phát âm.',
        questions: [
          {
            id: 'u10-ex3-q1',
            prompt: 'Trong câu: "My [dr]eam house in the coun[tr]y will have green [tr]ees", có mấy từ chứa âm /tr/?',
            options: ['2 từ (coun[tr]y, [tr]ees)', '1 từ ([dr]eam)', '3 từ', 'Không từ nào'],
            correctAnswer: '2 từ (coun[tr]y, [tr]ees)',
            explanation: 'country và trees chứa /tr/, còn dream chứa /dr/.',
          },
          {
            id: 'u10-ex3-q2',
            prompt: 'Chọn cặp từ chứa lần lượt /dr/ và /tr/ để điền vào câu: "The robot can ______ a high-speed ______."',
            options: ['[dr]ive – [tr]ain', '[tr]avel – [dr]eam', '[dr]aw – [dr]op', '[tr]y – [tr]actor'],
            correctAnswer: '[dr]ive – [tr]ain',
            explanation: 'drive a high-speed train (lái tàu cao tốc) có drive bắt đầu bằng /dr/ và train bắt đầu bằng /tr/.',
          },
          {
            id: 'u10-ex3-q3',
            prompt: 'Chọn từ chứa âm /dr/ phù hợp với câu: "In the future, a smart machine will wash and ______ our clothes."',
            options: ['[dr]y', '[tr]y', '[tr]avel', '[tr]eat'],
            correctAnswer: '[dr]y',
            explanation: 'dry /draɪ/ (làm khô, sấy khô) vừa bắt đầu bằng /dr/ vừa hợp nghĩa với wash clothes.',
          },
          {
            id: 'u10-ex3-q4',
            prompt: 'Chọn từ chứa âm /tr/ phù hợp với câu: "We might ______ to the moon by super space car."',
            options: ['[tr]avel', '[dr]ink', '[dr]op', '[dr]eam'],
            correctAnswer: '[tr]avel',
            explanation: 'travel to the moon (du hành tới mặt trăng) bắt đầu bằng /tr/.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 11: OUR GREENER WORLD (Rhythm in sentences)
  // ==========================================================================
  {
    unitId: 'unit-11',
    unitNumber: 11,
    unitTitle: 'Our Greener World',
    topicFocus: 'Rhythm in sentences (Nhịp điệu trong câu)',
    summaryNote:
      'Trong tiếng Anh, nhịp điệu câu (Rhythm) được tạo nên nhờ việc NHẤN MẠNH (đọc to, rõ, dài hơn) vào các TỪ NỘI DUNG (Content words: danh từ, động từ chính, tính từ, trạng từ, từ phủ định) và ĐỌC LƯỚT NHẸ các TỪ CHỨC NĂNG (Function words: mạo từ a/an/the, giới từ in/on/to, đại từ, trợ động từ).',
    sounds: [
      {
        symbol: 'Stressed (Từ được nhấn)',
        name: 'Content Words (Từ mang nội dung chính)',
        howToPronounce:
          'Đọc TO hơn, RÕ hơn và KÉO DÀI hơn để tạo nhịp phách chính trong câu. Hiển thị bằng phần trong ngoặc vuông [gạch chân in đậm].',
        spellingPatterns: [
          'Danh từ (water, bottles, environment, trees)',
          'Động từ chính (recycle, reuse, plant, save)',
          'Tính từ & Trạng từ (green, plastic, more)',
          'Trợ động từ phủ định (don\'t, shouldn\'t, won\'t)',
        ],
        examples: [
          { word: '[re-cy-cle]', ipa: '/ˌriːˈsaɪkl/ (Verb)', meaningVi: 'tái chế (động từ chính ➔ Nhấn)' },
          { word: '[bot-tles]', ipa: '/ˈbɒtlz/ (Noun)', meaningVi: 'những cái chai (danh từ ➔ Nhấn)' },
          { word: '[greener]', ipa: '/ˈɡriːnə/ (Adj)', meaningVi: 'xanh hơn (tính từ ➔ Nhấn)' },
          { word: '[plant] [trees]', ipa: '/plɑːnt triːz/', meaningVi: 'trồng cây (V + N ➔ Nhấn cả hai)' },
          { word: '[don\'t] [throw]', ipa: '/dəʊnt θrəʊ/', meaningVi: 'đừng vứt (Phủ định + V ➔ Nhấn)' },
          { word: '[save] [water]', ipa: '/seɪv ˈwɔːtə/', meaningVi: 'tiết kiệm nước (V + N ➔ Nhấn)' },
        ],
      },
      {
        symbol: 'Unstressed (Từ đọc lướt)',
        name: 'Function Words (Từ chức năng ngữ pháp)',
        howToPronounce:
          'Đọc NHẸ, NHANH và thường giảm âm về nguyên âm yếu /ə/ (schwa) để giữ nhịp câu tự nhiên, trôi chảy.',
        spellingPatterns: [
          'Mạo từ (a, an, the) & Liên từ (if, and, or)',
          'Giới từ (in, on, of, to, for)',
          'Đại từ nhân xưng / sở hữu (we, you, they, our, their)',
          'Trợ động từ khẳng định (will, can, should, are)',
        ],
        examples: [
          { word: 'If we [re-cy-cle]...', ipa: '/ɪf wi .../ (if, we đọc nhẹ)', meaningVi: 'Nếu chúng ta tái chế...' },
          { word: '...we will [save] the [world]', ipa: '/wi wəl ... ðə .../ (will, the đọc lướt)', meaningVi: '...chúng ta sẽ cứu thế giới' },
          { word: 'a [bag] of [rub-bish]', ipa: '/ə bæɡ əv ˈrʌbɪʃ/', meaningVi: 'một túi rác (a, of đọc là /ə/, /əv/)' },
          { word: 'We should [re-use] [jars]', ipa: '/wi ʃəd .../ (we, should đọc nhẹ)', meaningVi: 'Chúng ta nên tái sử dụng lọ' },
        ],
      },
    ],
    minimalPairsTitle: 'So sánh từ được nhấn và từ đọc lướt trong câu SGK',
    minimalPairs: [
      {
        leftWord: 'If we [go] to [school] by [bus]',
        leftIpa: 'Nhấn: go – school – bus',
        leftMeaningVi: 'Từ nội dung (V, N, N) được nhấn mạnh',
        rightWord: 'if, we, to, by',
        rightIpa: 'Đọc lướt nhẹ (/ɪf wi tə baɪ/)',
        rightMeaningVi: 'Liên từ, đại từ, giới từ không nhấn',
      },
      {
        leftWord: 'We\'ll [help] the [en-vi-ron-ment]',
        leftIpa: 'Nhấn: help – environment',
        leftMeaningVi: 'Động từ chính và danh từ được nhấn',
        rightWord: 'we\'ll, the',
        rightIpa: 'Đọc lướt nhẹ (/wɪl ðə/)',
        rightMeaningVi: 'Đại từ + trợ động từ viết tắt và mạo từ',
      },
      {
        leftWord: '[Put] the [rub-bish] in the [bin]',
        leftIpa: 'Nhấn: Put – rubbish – bin',
        leftMeaningVi: 'Động từ mệnh lệnh và 2 danh từ được nhấn',
        rightWord: 'the, in, the',
        rightIpa: 'Đọc lướt nhẹ (/ðə ɪn ðə/)',
        rightMeaningVi: 'Mạo từ và giới từ đọc lướt',
      },
      {
        leftWord: '[Don\'t] [use] [plas-tic] [bags]',
        leftIpa: 'Nhấn cả 4 từ: Don\'t – use – plastic – bags',
        leftMeaningVi: 'Trợ động từ phủ định + V + Adj + N đều được nhấn',
        rightWord: 'We can [use] [cloth] [bags]',
        rightIpa: 'we, can đọc lướt; nhấn use – cloth – bags',
        rightMeaningVi: 'Trợ động từ khẳng định "can" đọc nhẹ /kən/',
      },
    ],
    exercises: [
      {
        id: 'u11-ex1',
        number: 1,
        title: 'Exercise 1: Content vs Function Words (Chọn từ được nhấn trọng âm câu)',
        instruction: 'Chọn từ được NHẤN MẠNH (Content word) hoặc từ ĐỌC LƯỚT theo yêu cầu.',
        questions: [
          {
            id: 'u11-ex1-q1',
            prompt: 'Câu 1: Trong 4 từ sau đây, từ nào là TỪ NỘI DUNG (Content word) luôn được nhấn mạnh trong câu?',
            options: ['[recycle] (tái chế)', 'will (sẽ)', 'the (mạo từ)', 'into (vào trong)'],
            correctAnswer: '[recycle] (tái chế)',
            explanation: '"recycle" là động từ chính mang nghĩa nội dung nên được nhấn mạnh; will, the, into là từ chức năng.',
          },
          {
            id: 'u11-ex1-q2',
            prompt: 'Câu 2: Trong 4 từ sau đây, từ nào là TỪ CHỨC NĂNG (Function word) thường đọc lướt nhẹ?',
            options: ['for (giới từ)', '[environment] (môi trường)', '[plastic] (nhựa)', '[reduce] (giảm thiểu)'],
            correctAnswer: 'for (giới từ)',
            explanation: 'Giới từ "for" là từ chức năng đọc lướt (/fə/); còn environment (N), plastic (Adj), reduce (V) là từ nội dung.',
          },
          {
            id: 'u11-ex1-q3',
            prompt: 'Câu 3: Trong câu "We should [plant] [more] [trees]", từ nào KHÔNG được nhấn mạnh?',
            options: ['We & should', '[plant]', '[more]', '[trees]'],
            correctAnswer: 'We & should',
            explanation: 'Đại từ "We" và trợ động từ khẳng định "should" không nhấn; động từ plant, lượng từ more và danh từ trees được nhấn.',
          },
          {
            id: 'u11-ex1-q4',
            prompt: 'Câu 4: Trợ động từ nào dưới đây ĐƯỢC NHẤN MẠNH trong câu?',
            options: ['[shouldn\'t] (dạng phủ định)', 'should (dạng khẳng định)', 'can (dạng khẳng định)', 'will (dạng khẳng định)'],
            correctAnswer: '[shouldn\'t] (dạng phủ định)',
            explanation: 'Các trợ động từ ở dạng phủ định (don\'t, shouldn\'t, can\'t, won\'t) mang thông tin quan trọng nên luôn được nhấn mạnh.',
          },
        ],
      },
      {
        id: 'u11-ex2',
        number: 2,
        title: 'Exercise 2: Sentence Rhythm Pattern (Xác định nhịp điệu đúng của câu)',
        instruction: 'Chọn cách đánh dấu các từ được nhấn [gạch chân in đậm] đúng quy tắc nhịp điệu tiếng Anh.',
        questions: [
          {
            id: 'u11-ex2-q1',
            prompt: 'Cách đánh dấu nhịp điệu nào đúng cho câu: "If you cycle, you\'ll help the Earth"?',
            options: [
              'If you [cycle], you\'ll [help] the [Earth].',
              '[If] [you] cycle, [you\'ll] help [the] Earth.',
              'If [you] [cycle], you\'ll help [the] [Earth].',
              '[If] you cycle, you\'ll [help] [the] Earth.',
            ],
            correctAnswer: 'If you [cycle], you\'ll [help] the [Earth].',
            explanation: 'Trong câu này, động từ [cycle], động từ [help] và danh từ [Earth] là 3 từ nội dung được nhấn nhịp chính.',
          },
          {
            id: 'u11-ex2-q2',
            prompt: 'Cách đánh dấu nhịp điệu nào đúng cho câu: "Water is good for your body"?',
            options: [
              '[Water] is [good] for your [body].',
              'Water [is] good [for] [your] body.',
              '[Water] [is] [good] for your body.',
              'Water is good [for] [your] [body].',
            ],
            correctAnswer: '[Water] is [good] for your [body].',
            explanation: 'Danh từ [Water], tính từ [good], và danh từ [body] được nhấn; động từ to be "is", giới từ "for", tính từ sở hữu "your" đọc lướt.',
          },
          {
            id: 'u11-ex2-q3',
            prompt: 'Cách đánh dấu nhịp điệu nào đúng cho câu: "Don\'t throw rubbish into the river"?',
            options: [
              '[Don\'t] [throw] [rubbish] into the [river].',
              'Don\'t [throw] rubbish [into] [the] river.',
              '[Don\'t] throw [rubbish] [into] the river.',
              'Don\'t throw [rubbish] into [the] [river].',
            ],
            correctAnswer: '[Don\'t] [throw] [rubbish] into the [river].',
            explanation: 'Trợ động từ phủ định [Don\'t], động từ [throw], danh từ [rubbish] và danh từ [river] được nhấn; "into the" đọc lướt.',
          },
          {
            id: 'u11-ex2-q4',
            prompt: 'Cách đánh dấu nhịp điệu nào đúng cho câu: "We\'ll reuse these glass bottles"?',
            options: [
              'We\'ll [reuse] [these] [glass] [bottles].',
              '[We\'ll] reuse these [glass] bottles.',
              '[We\'ll] [reuse] these glass [bottles].',
              'We\'ll reuse [these] glass [bottles].',
            ],
            correctAnswer: 'We\'ll [reuse] [these] [glass] [bottles].',
            explanation: '"We\'ll" là đại từ + trợ động từ nên đọc lướt; động từ [reuse], từ chỉ định [these], danh từ phụ [glass] và danh từ [bottles] được nhấn.',
          },
        ],
      },
      {
        id: 'u11-ex3',
        number: 3,
        title: 'Exercise 3: Counting Stressed Beats (Đếm số từ được nhấn trong câu)',
        instruction: 'Xác định số lượng từ mang trọng âm nhịp điệu trong câu.',
        questions: [
          {
            id: 'u11-ex3-q1',
            prompt: 'Trong câu: "We should [save] [energy] at [school]", có mấy từ được nhấn mạnh?',
            options: ['3 từ (save, energy, school)', '2 từ (We, should)', '4 từ (should, save, energy, school)', '6 từ (tất cả các từ)'],
            correctAnswer: '3 từ (save, energy, school)',
            explanation: '3 từ nội dung được nhấn là động từ [save], danh từ [energy] và danh từ [school].',
          },
          {
            id: 'u11-ex3-q2',
            prompt: 'Trong câu: "If they [use] [reusable] [bags], they\'ll [reduce] [plastic] [waste]", những từ nào được đọc lướt nhẹ?',
            options: ['If, they, they\'ll', 'use, bags, reduce', 'reusable, plastic, waste', 'reduce, plastic, they\'ll'],
            correctAnswer: 'If, they, they\'ll',
            explanation: 'Liên từ "If", đại từ "they" và "they\'ll" là các từ chức năng nên được đọc lướt nhẹ.',
          },
          {
            id: 'u11-ex3-q3',
            prompt: 'Tại sao việc giữ đúng nhịp điệu (Rhythm) khi nói tiếng Anh lại quan trọng?',
            options: [
              'Giúp câu nói tự nhiên, trôi chảy và người nghe dễ nắm bắt các từ khóa quan trọng',
              'Để đọc tất cả các từ đều nhau như robot',
              'Để bỏ qua không cần phát âm các danh từ và động từ',
              'Chỉ áp dụng khi hát, không áp dụng khi nói',
            ],
            correctAnswer: 'Giúp câu nói tự nhiên, trôi chảy và người nghe dễ nắm bắt các từ khóa quan trọng',
            explanation: 'Nhịp điệu tiếng Anh (stress-timed rhythm) giúp làm nổi bật các từ mang thông tin chính (content words).',
          },
          {
            id: 'u11-ex3-q4',
            prompt: 'Chọn từ được nhấn mạnh trong vế câu: "...so we can [protect] our [planet]."',
            options: ['[protect] & [planet]', 'so & we', 'can & our', 'we & can'],
            correctAnswer: '[protect] & [planet]',
            explanation: 'protect (động từ) và planet (danh từ) là hai từ nội dung được nhấn mạnh.',
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // UNIT 12: ROBOTS (Falling tone in statements)
  // ==========================================================================
  {
    unitId: 'unit-12',
    unitNumber: 12,
    unitTitle: 'Robots',
    topicFocus: 'Falling tone in statements (Ngữ điệu đi xuống ở cuối câu kể)',
    summaryNote:
      'Trong tiếng Anh, khi nói một câu khẳng định hoặc phủ định thông thường (Statement) nhằm thông báo sự việc, giọng đọc sẽ HẠ THẤP XUỐNG (Falling tone ↘) ở từ được nhấn cuối cùng của câu. Ngược lại, câu hỏi Yes/No (Yes/No question) thường lên giọng (↗) ở cuối câu.',
    sounds: [
      {
        symbol: 'Falling Tone (↘)',
        name: 'Ngữ điệu đi xuống ở cuối câu kể & câu hỏi Wh-',
        howToPronounce:
          'Giữ giọng đều theo nhịp câu, đến từ mang nội dung cuối cùng của câu thì HẠ GIỌNG TRẦM XUỐNG (↘) để báo hiệu câu nói đã kết thúc chắc chắn.',
        spellingPatterns: [
          'Câu kể khẳng định (Statements: Robots can work in factories. ↘)',
          'Câu kể phủ định (Negative statements: Home robots can\'t teach in classes. ↘)',
          'Câu cảm thán & Câu hỏi có từ để hỏi Wh- (What can this robot do? ↘)',
        ],
        examples: [
          { word: 'I often water the [plants]. ↘', ipa: 'Hạ giọng ở "plants" ↘', meaningVi: 'Tôi thường tưới cây. (Câu kể)' },
          { word: 'Shifa is the smartest [robot]. ↘', ipa: 'Hạ giọng ở "robot" ↘', meaningVi: 'Shifa là robot thông minh nhất. (Câu kể)' },
          { word: 'Doctor robots can look after sick [people]. ↘', ipa: 'Hạ giọng ở "people" ↘', meaningVi: 'Robot bác sĩ có thể chăm sóc người bệnh.' },
          { word: 'My robot can do the [housework]. ↘', ipa: 'Hạ giọng ở "housework" ↘', meaningVi: 'Robot của tôi có thể làm việc nhà.' },
          { word: 'Worker robots can move heavy [things]. ↘', ipa: 'Hạ giọng ở "things" ↘', meaningVi: 'Robot công nhân có thể di chuyển đồ nặng.' },
        ],
      },
      {
        symbol: 'Rising Tone (↗)',
        name: 'Ngữ điệu đi lên (Dùng để đối chiếu ở câu hỏi Yes/No hoặc liệt kê)',
        howToPronounce:
          'Nâng cao giọng (↗) ở âm tiết cuối câu hỏi Yes/No để thể hiện sự chờ đợi câu trả lời Đúng/Sai, hoặc lên giọng ở các vế đầu khi liệt kê.',
        spellingPatterns: [
          'Câu hỏi Yes/No (Can a robot cook meals? ↗)',
          'Các phần tử đứng trước trong danh sách liệt kê (wash [dishes] ↗, iron [clothes] ↗, and do the [washing] ↘)',
        ],
        examples: [
          { word: 'Can robots understand our [feelings]? ↗', ipa: 'Lên giọng ở "feelings" ↗', meaningVi: 'Robot có hiểu được cảm xúc của chúng ta không? (Yes/No)' },
          { word: 'Is WB2 the strongest [robot]? ↗', ipa: 'Lên giọng ở "robot" ↗', meaningVi: 'WB2 có phải là robot khỏe nhất không? (Yes/No)' },
          { word: 'Do you have a home [robot]? ↗', ipa: 'Lên giọng ở "robot" ↗', meaningVi: 'Bạn có robot gia đình không? (Yes/No)' },
          { word: 'It can [cook] ↗, [clean] ↗, and [wash]. ↘', ipa: 'Lên giọng khi liệt kê, hạ giọng ở từ cuối ↘', meaningVi: 'Nó có thể nấu ăn, dọn dẹp và giặt giũ.' },
        ],
      },
    ],
    minimalPairsTitle: 'So sánh ngữ điệu Câu kể (↘) và Câu hỏi Yes/No (↗)',
    minimalPairs: [
      {
        leftWord: 'Home robots can cook [meals]. ↘',
        leftIpa: 'Câu kể (Statement) ➔ Hạ giọng ↘',
        leftMeaningVi: 'Robot gia đình có thể nấu các bữa ăn.',
        rightWord: 'Can home robots cook [meals]? ↗',
        rightIpa: 'Câu hỏi Yes/No ➔ Lên giọng ↗',
        rightMeaningVi: 'Robot gia đình có thể nấu ăn không?',
      },
      {
        leftWord: 'WB2 is the strongest [robot]. ↘',
        leftIpa: 'Câu kể (Statement) ➔ Hạ giọng ↘',
        leftMeaningVi: 'WB2 là robot khỏe nhất.',
        rightWord: 'Is WB2 the strongest [robot]? ↗',
        rightIpa: 'Câu hỏi Yes/No ➔ Lên giọng ↗',
        rightMeaningVi: 'WB2 có phải là robot khỏe nhất không?',
      },
      {
        leftWord: 'Space robots can build [stations]. ↘',
        leftIpa: 'Câu kể (Statement) ➔ Hạ giọng ↘',
        leftMeaningVi: 'Robot vũ trụ có thể xây trạm không gian.',
        rightWord: 'Can space robots build [stations]? ↗',
        rightIpa: 'Câu hỏi Yes/No ➔ Lên giọng ↗',
        rightMeaningVi: 'Robot vũ trụ có xây được trạm không gian không?',
      },
      {
        leftWord: 'Teacher robots can teach [English]. ↘',
        leftIpa: 'Câu kể (Statement) ➔ Hạ giọng ↘',
        leftMeaningVi: 'Robot giáo viên có thể dạy tiếng Anh.',
        rightWord: 'Can teacher robots teach [English]? ↗',
        rightIpa: 'Câu hỏi Yes/No ➔ Lên giọng ↗',
        rightMeaningVi: 'Robot giáo viên có dạy được tiếng Anh không?',
      },
    ],
    exercises: [
      {
        id: 'u12-ex1',
        number: 1,
        title: 'Exercise 1: Intonation Identification (Chọn câu có ngữ điệu xuống ↘)',
        instruction: 'Xác định câu có ngữ điệu đi xuống (Falling tone ↘) hoặc khác với các câu còn lại.',
        questions: [
          {
            id: 'u12-ex1-q1',
            prompt: 'Câu 1: Câu nào dưới đây là câu kể (Statement) có ngữ điệu ĐI XUỐNG (↘) ở cuối câu?',
            options: [
              'Doctor robots can look after sick [people]. ↘',
              'Can doctor robots look after sick [people]? ↗',
              'Is Shifa a smart [robot]? ↗',
              'Do you like home [robots]? ↗',
            ],
            correctAnswer: 'Doctor robots can look after sick [people]. ↘',
            explanation: '"Doctor robots can look after sick people." là câu kể khẳng định nên hạ giọng (↘) ở cuối câu. Ba câu còn lại là câu hỏi Yes/No nên lên giọng (↗).',
          },
          {
            id: 'u12-ex1-q2',
            prompt: 'Câu 2: Câu nào dưới đây có ngữ điệu cuối câu KHÁC với 3 câu còn lại?',
            options: [
              'I often water the [plants].',
              'Shifa is the smartest [robot].',
              'My dad makes delicious [meals].',
              'Can worker robots build [houses]?',
            ],
            correctAnswer: 'Can worker robots build [houses]?',
            explanation: '"Can worker robots build houses?" là câu hỏi Yes/No nên lên giọng (↗), còn 3 câu kia là câu kể nên xuống giọng (↘).',
          },
          {
            id: 'u12-ex1-q3',
            prompt: 'Câu 3: Trong câu kể "My robot can iron [clothes]. ↘", giọng của em sẽ hạ thấp xuống ở từ nào?',
            options: ['[clothes]', 'My', 'robot', 'can'],
            correctAnswer: '[clothes]',
            explanation: 'Ngữ điệu đi xuống (Falling tone ↘) rơi vào từ mang trọng âm cuối cùng của câu kể, tức là từ [clothes].',
          },
          {
            id: 'u12-ex1-q4',
            prompt: 'Câu 4: Câu nào dưới đây cũng dùng ngữ điệu ĐI XUỐNG (↘) ở cuối câu giống như câu kể?',
            options: [
              'What can a home robot [do]? ↘ (Câu hỏi Wh-)',
              'Can a home robot cook [meals]? ↗',
              'Will robots replace [humans]? ↗',
              'Are these robots [expensive]? ↗',
            ],
            correctAnswer: 'What can a home robot [do]? ↘ (Câu hỏi Wh-)',
            explanation: 'Cả câu kể (Statements) và câu hỏi có từ để hỏi (Wh-questions) đều có ngữ điệu đi xuống (↘) ở cuối câu.',
          },
        ],
      },
      {
        id: 'u12-ex2',
        number: 2,
        title: 'Exercise 2: Tone Matching (Xác định ngữ điệu ↘ hay ↗)',
        instruction: 'Chọn ký hiệu ngữ điệu đúng cho từng câu.',
        questions: [
          {
            id: 'u12-ex2-q1',
            prompt: 'Chọn ngữ điệu đúng ở cuối câu: "Worker robots can move heavy [things]."',
            options: ['↘ (Falling tone – Đi xuống)', '↗ (Rising tone – Đi lên)', '→ (Giữ nguyên không đổi)', '↗↘ (Lên rồi xuống ở mọi từ)'],
            correctAnswer: '↘ (Falling tone – Đi xuống)',
            explanation: 'Đây là một câu trần thuật / câu kể (Statement) nên giọng hạ xuống (↘) ở từ cuối "things".',
          },
          {
            id: 'u12-ex2-q2',
            prompt: 'Chọn ngữ điệu đúng ở cuối câu: "Can space robots build space [stations]?"',
            options: ['↗ (Rising tone – Đi lên)', '↘ (Falling tone – Đi xuống)', '→ (Giữ ngang)', 'Không có ngữ điệu'],
            correctAnswer: '↗ (Rising tone – Đi lên)',
            explanation: 'Đây là câu hỏi Yes/No bắt đầu bằng "Can..." nên giọng nâng cao lên (↗) ở cuối câu.',
          },
          {
            id: 'u12-ex2-q3',
            prompt: 'Chọn ngữ điệu đúng ở cuối câu phủ định: "Robots cannot understand human [emotions]."',
            options: ['↘ (Falling tone – Đi xuống)', '↗ (Rising tone – Đi lên)', '↗↗ (Lên rất cao)', 'Không nhấn vào từ nào'],
            correctAnswer: '↘ (Falling tone – Đi xuống)',
            explanation: 'Câu kể phủ định vẫn là một Statement (khẳng định một sự thật), vì vậy ngữ điệu vẫn đi xuống (↘) ở cuối câu.',
          },
          {
            id: 'u12-ex2-q4',
            prompt: 'Trong câu liệt kê: "Home robots can [cook] ___, [clean] ___, and wash [dishes] ___.", thứ tự ngữ điệu ở 3 chỗ trống là:',
            options: ['↗ , ↗ , ↘', '↘ , ↘ , ↗', '↘ , ↘ , ↘', '↗ , ↗ , ↗'],
            correctAnswer: '↗ , ↗ , ↘',
            explanation: 'Khi liệt kê một chuỗi hành động, ta lên giọng (↗) ở các mục đầu (cook ↗, clean ↗) và hạ giọng (↘) ở mục cuối cùng (wash dishes ↘) để báo hiệu hết danh sách.',
          },
        ],
      },
      {
        id: 'u12-ex3',
        number: 3,
        title: 'Exercise 3: Pronunciation in Context (Thực hành ngữ điệu chủ đề Robots)',
        instruction: 'Hoàn thành các bài tập tình huống về ngữ điệu câu trong Unit 12.',
        questions: [
          {
            id: 'u12-ex3-q1',
            prompt: 'Tại buổi triển lãm Robot, người thuyết trình nói: "WB2 is the strongest [robot] in the [show]. ↘" Tại sao người nói lại hạ giọng ở cuối câu?',
            options: [
              'Vì người nói đang đưa ra một thông tin khẳng định chắc chắn (Statement)',
              'Vì người nói đang nghi ngờ và muốn hỏi khán giả',
              'Vì người nói chưa nói hết câu',
              'Vì từ "show" không quan trọng',
            ],
            correctAnswer: 'Vì người nói đang đưa ra một thông tin khẳng định chắc chắn (Statement)',
            explanation: 'Ngữ điệu đi xuống (Falling tone ↘) ở cuối câu kể thể hiện sự hoàn tất và chắc chắn của thông tin.',
          },
          {
            id: 'u12-ex3-q2',
            prompt: 'Trong đoạn hội thoại:\nA: "Can this robot repair [machines]? (1)"\nB: "Yes, it can repair broken [machines]. (2)"\nNgữ điệu ở (1) và (2) lần lượt là:',
            options: ['(1) ↗ và (2) ↘', '(1) ↘ và (2) ↗', '(1) ↘ và (2) ↘', '(1) ↗ và (2) ↗'],
            correctAnswer: '(1) ↗ và (2) ↘',
            explanation: 'Câu (1) là câu hỏi Yes/No nên lên giọng (↗); câu (2) là câu trả lời khẳng định (Statement) nên xuống giọng (↘).',
          },
          {
            id: 'u12-ex3-q3',
            prompt: 'Từ nào là từ nhận ngữ điệu đi xuống (↘) ở cuối câu: "In the future, teacher robots will teach us [history]."?',
            options: ['[history] ↘', 'future ↘', 'teacher ↘', 'robots ↘'],
            correctAnswer: '[history] ↘',
            explanation: 'Từ nội dung đứng cuối câu kể là [history], nên giọng sẽ hạ xuống ở từ này.',
          },
          {
            id: 'u12-ex3-q4',
            prompt: 'Chọn câu có đánh dấu ngữ điệu ĐÚNG chuẩn SGK Tiếng Anh 6 Unit 12:',
            options: [
              'My grandfather always waters the [trees] in the [morning]. ↘',
              'My grandfather always waters the [trees] in the [morning]. ↗',
              'Can your robot do the [washing]? ↘',
              'Is that a doctor [robot]? ↘',
            ],
            correctAnswer: 'My grandfather always waters the [trees] in the [morning]. ↘',
            explanation: 'Câu trần thuật "My grandfather always waters the trees in the morning." có ngữ điệu đi xuống (↘) ở cuối câu.',
          },
        ],
      },
    ],
  },
];

export function getUnitPronunciationData(unitNumber: number): UnitPronunciationData {
  return (
    GS6_PRONUNCIATION_UNITS.find((u) => u.unitNumber === unitNumber) ||
    GS6_PRONUNCIATION_UNITS[0]
  );
}
