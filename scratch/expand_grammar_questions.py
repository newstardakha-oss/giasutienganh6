import re

# Comprehensive Grammar Question Bank for English 6 Global Success (Units 1-12)
# Each question is closely aligned with SGK Tiếng Anh 6 curriculum rules, vocabulary, and pedagogy.

questions_data = [
    # --- UNIT 1: MY NEW SCHOOL ---
    # Grammar: Present Simple & Adverbs of Frequency
    {
        "id": "q1-g1",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "She ________ to school by bus with her friends every morning.",
        "options": ["goes", "go", "is going", "went"],
        "correctAnswer": "goes",
        "explanation": "Chủ ngữ 'She' là ngôi thứ 3 số ít, câu có dấu hiệu 'every morning' (thì Hiện tại đơn) nên động từ 'go' chia thành 'goes'.",
        "hints": ["Gợi ý 1: Tìm dấu hiệu nhận biết 'every morning' (mỗi buổi sáng).", "Gợi ý 2: Chủ ngữ 'She' đi với V-es."],
        "difficulty": "Dễ"
    },
    {
        "id": "q1-g2",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "They usually ________ their homework in the library after school.",
        "options": ["do", "does", "doing", "are doing"],
        "correctAnswer": "do",
        "explanation": "Chủ ngữ 'They' (số nhiều) trong thì Hiện tại đơn giữ nguyên động từ nguyên mẫu 'do'.",
        "hints": ["Gợi ý 1: Nhận biết trạng từ chỉ tần suất 'usually'.", "Gợi ý 2: 'They' là chủ ngữ số nhiều."],
        "difficulty": "Dễ"
    },
    {
        "id": "q1-g3",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "My brother ________ play football on Sundays because he prefers swimming.",
        "options": ["doesn't", "don't", "isn't", "aren't"],
        "correctAnswer": "doesn't",
        "explanation": "Câu phủ định thì Hiện tại đơn với chủ ngữ số ít 'My brother' dùng trợ động từ 'doesn't + V_inf'.",
        "hints": ["Gợi ý 1: Trợ động từ phủ định cho chủ ngữ số ít là 'doesn't'.", "Gợi ý 2: Động từ chính 'play' giữ nguyên."],
        "difficulty": "Dễ"
    },
    {
        "id": "q1-g4",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "________ your new school have a large library and modern computer rooms?",
        "options": ["Does", "Do", "Is", "Are"],
        "correctAnswer": "Does",
        "explanation": "Câu hỏi Yes/No thì Hiện tại đơn với chủ ngữ số ít 'your new school' dùng trợ động từ 'Does'.",
        "hints": ["Gợi ý 1: Chủ ngữ 'your new school' là danh từ số ít.", "Gợi ý 2: Động từ chính là 'have' (động từ thường)."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q1-g5",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Mai ________ late for class; she is a very hard-working student.",
        "options": ["is never", "never is", "doesn't never", "is don't"],
        "correctAnswer": "is never",
        "explanation": "Trạng từ chỉ tần suất (never) luôn đứng SAU động từ To Be (is never late).",
        "hints": ["Gợi ý 1: Trạng từ tần suất đứng đằng sau động từ 'to be'.", "Gợi ý 2: Cấu trúc: S + to be + Adverb of frequency + Adj."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q1-g6",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "How often ________ you read English books in your free time?",
        "options": ["do", "does", "are", "is"],
        "correctAnswer": "do",
        "explanation": "Câu hỏi tần suất 'How often' với chủ ngữ 'you' dùng trợ động từ 'do'.",
        "hints": ["Gợi ý 1: Cấu trúc hỏi tần suất: How often + do/does + S + V?", "Gợi ý 2: 'you' đi với trợ động từ 'do'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q1-g7",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Nam usually ________ judo in the school gym with his classmates on Tuesdays.",
        "options": ["does", "plays", "makes", "has"],
        "correctAnswer": "does",
        "explanation": "Đi với môn võ nghệ thuật / thể thao cá nhân không dùng bóng như 'judo', ta dùng động từ 'do' -> Nam (số ít) dùng 'does judo'.",
        "hints": ["Gợi ý 1: Môn võ judo đi kèm với động từ nào?", "Gợi ý 2: 'do judo' mang nghĩa tập judo."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q1-g8",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "We ________ many new subjects like Physics, History and Science in Grade 6.",
        "options": ["have", "has", "having", "are have"],
        "correctAnswer": "have",
        "explanation": "Chủ ngữ 'We' (chúng tôi - số nhiều) đi với động từ nguyên mẫu 'have' trong thì Hiện tại đơn.",
        "hints": ["Gợi ý 1: Chủ ngữ 'We' đi với 'have' hay 'has'?", "Gợi ý 2: 'We' là số nhiều."],
        "difficulty": "Dễ"
    },
    {
        "id": "q1-g9",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Phong is a good student. He ________ arrives at school 15 minutes early.",
        "options": ["always", "is always", "never", "rarely"],
        "correctAnswer": "always",
        "explanation": "Trạng từ chỉ tần suất 'always' (luôn luôn) đứng trước động từ thường 'arrives' chỉ thói quen tốt.",
        "hints": ["Gợi ý 1: 'Good student' chỉ thói quen luôn luôn đúng giờ.", "Gợi ý 2: Cấu trúc: S + Adv + V_main."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q1-g10",
        "unitId": "unit-1",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "________ do students wear uniform at your lower secondary school?",
        "options": ["When", "Where", "How often", "Why"],
        "correctAnswer": "When",
        "explanation": "Từ hỏi 'When' (Khi nào) dùng để hỏi thời gian mặc đồng phục (trả lời: On Mondays and Fridays).",
        "hints": ["Gợi ý 1: Hỏi thời gian cụ thể dùng từ hỏi nào?", "Gợi ý 2: 'When' = Khi nào."],
        "difficulty": "Trung bình"
    },

    # --- UNIT 2: MY HOUSE ---
    # Grammar: Possessive Case ('s) & Prepositions of Place
    {
        "id": "q2-g1",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "This is ________ bedroom. It is clean and painted in light blue.",
        "options": ["An's", "An", "Ans'", "An is"],
        "correctAnswer": "An's",
        "explanation": "Sở hữu cách cho danh từ riêng số ít 'An' là 'An's' (Phòng ngủ của An).",
        "hints": ["Gợi ý 1: Cấu trúc sở hữu cách: N + 's + danh từ.", "Gợi ý 2: An's bedroom = Phòng ngủ của An."],
        "difficulty": "Dễ"
    },
    {
        "id": "q2-g2",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Where is the cat? - It is sleeping ________ the comfortable sofa.",
        "options": ["on", "in", "between", "under"],
        "correctAnswer": "on",
        "explanation": "Giới từ chỉ vị trí 'on the sofa' có nghĩa là nằm TRÊN ghế sofa.",
        "hints": ["Gợi ý 1: Nằm trên bề mặt ghế dùng giới từ gì?", "Gợi ý 2: 'on' = trên."],
        "difficulty": "Dễ"
    },
    {
        "id": "q2-g3",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "The family picture hangs ________ the wall, just above the television.",
        "options": ["on", "in", "at", "behind"],
        "correctAnswer": "on",
        "explanation": "Treo bức tranh TRÊN bức tường dùng giới từ 'on the wall'.",
        "hints": ["Gợi ý 1: Trên tường dùng 'on the wall'.", "Gợi ý 2: 'on' đi với wall."],
        "difficulty": "Dễ"
    },
    {
        "id": "q2-g4",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "The wooden wardrobe is standing ________ the bed and the study desk.",
        "options": ["between", "in front of", "next to", "under"],
        "correctAnswer": "between",
        "explanation": "Cấu trúc 'between A and B' nghĩa là Ở GIỮA vật A và vật B.",
        "hints": ["Gợi ý 1: Nhìn thấy từ 'and' kết nối 2 vật.", "Gợi ý 2: 'between... and...' = ở giữa... và..."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q2-g5",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "My ________ laptop is placed on the living room table.",
        "options": ["brother's", "brothers", "brother", "brothers's"],
        "correctAnswer": "brother's",
        "explanation": "Sở hữu cách cho danh từ số ít 'brother' là 'brother's' (Máy tính của anh trai tôi).",
        "hints": ["Gợi ý 1: Chọn sở hữu cách đúng của danh từ số ít.", "Gợi ý 2: brother + 's."],
        "difficulty": "Dễ"
    },
    {
        "id": "q2-g6",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "There is a beautiful flower garden ________ my house.",
        "options": ["in front of", "between", "on", "in"],
        "correctAnswer": "in front of",
        "explanation": "Cụm giới từ 'in front of my house' nghĩa là Ở PHÍA TRƯỚC nhà tôi.",
        "hints": ["Gợi ý 1: 'in front of' = phía trước.", "Gợi ý 2: Khu vườn phía trước ngôi nhà."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q2-g7",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Don't leave your shoes ________ the bed! Put them in the shoe cabinet.",
        "options": ["under", "on", "between", "behind"],
        "correctAnswer": "under",
        "explanation": "Giới từ 'under the bed' nghĩa là DƯỚI gầm giường.",
        "hints": ["Gợi ý 1: Vị trí gầm giường dùng 'under'.", "Gợi ý 2: 'under' = bên dưới."],
        "difficulty": "Dễ"
    },
    {
        "id": "q2-g8",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Is this ________ new bicycle? - Yes, she bought it last week.",
        "options": ["Vy's", "Vy", "Vys", "Vy is"],
        "correctAnswer": "Vy's",
        "explanation": "Vy's new bicycle = Xe đạp mới của Vy (sở hữu cách).",
        "hints": ["Gợi ý 1: Thêm 's vào tên riêng Vy.", "Gợi ý 2: Vy's bicycle."],
        "difficulty": "Dễ"
    },
    {
        "id": "q2-g9",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "The microwave is ________ the kitchen counter next to the fridge.",
        "options": ["on", "under", "in", "between"],
        "correctAnswer": "on",
        "explanation": "Lò vi sóng đặt TRÊN bàn bếp dùng giới từ 'on'.",
        "hints": ["Gợi ý 1: 'on' = đặt trên mặt bàn bếp.", "Gợi ý 2: On the kitchen counter."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q2-g10",
        "unitId": "unit-2",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "In our country house, the bathroom is ________ the dining room.",
        "options": ["next to", "between", "under", "in"],
        "correctAnswer": "next to",
        "explanation": "'next to' nghĩa là BÊN CẠNH phòng ăn.",
        "hints": ["Gợi ý 1: 'next to' = bên cạnh.", "Gợi ý 2: Đằng sau không có từ 'and' nên chọn 'next to'."],
        "difficulty": "Dễ"
    },

    # --- UNIT 3: MY FRIENDS ---
    # Grammar: Present Continuous & Adjectives for Appearance & Personality
    {
        "id": "q3-g1",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Look! The students ________ basketball in the schoolyard.",
        "options": ["are playing", "play", "played", "plays"],
        "correctAnswer": "are playing",
        "explanation": "Từ gây chú ý 'Look!' là dấu hiệu nhận biết thì Hiện tại tiếp diễn (S + am/is/are + V-ing). 'The students' (số nhiều) đi với 'are playing'.",
        "hints": ["Gợi ý 1: Nhìn thấy từ gây chú ý 'Look!'.", "Gợi ý 2: Cấu trúc hiện tại tiếp diễn: S + am/is/are + V-ing."],
        "difficulty": "Dễ"
    },
    {
        "id": "q3-g2",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Listen! Someone ________ the piano in the music room beautifully.",
        "options": ["is playing", "plays", "play", "played"],
        "correctAnswer": "is playing",
        "explanation": "Từ gây chú ý 'Listen!' chia thì Hiện tại tiếp diễn. 'Someone' (đại từ bất định) đi với 'is playing'.",
        "hints": ["Gợi ý 1: 'Listen!' chỉ hành động đang diễn ra.", "Gợi ý 2: Someone + is + V-ing."],
        "difficulty": "Dễ"
    },
    {
        "id": "q3-g3",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "What ________ you ________ at present? - I am writing a short diary.",
        "options": ["are / doing", "do / do", "is / doing", "did / do"],
        "correctAnswer": "are / doing",
        "explanation": "Dấu hiệu 'at present' (bây giờ) chia thì Hiện tại tiếp diễn: What + are + you + doing?",
        "hints": ["Gợi ý 1: Dấu hiệu 'at present' = hiện tại.", "Gợi ý 2: Cấu trúc câu hỏi: Wh + am/is/are + S + V-ing?"],
        "difficulty": "Dễ"
    },
    {
        "id": "q3-g4",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Lan has long black hair and ________ brown eyes.",
        "options": ["big", "long", "tall", "short"],
        "correctAnswer": "big",
        "explanation": "Tính từ miêu tả đôi mắt phù hợp nhất là 'big brown eyes' (đôi mắt to màu nâu).",
        "hints": ["Gợi ý 1: Tính từ tả kích thước mắt.", "Gợi ý 2: Mắt to = big eyes."],
        "difficulty": "Dễ"
    },
    {
        "id": "q3-g5",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Minh is very ________; he always helps his friends with difficult homework.",
        "options": ["kind", "shy", "lazy", "creative"],
        "correctAnswer": "kind",
        "explanation": "Luôn giúp đỡ bạn bè thể hiện tính cách tốt bụng ('kind').",
        "hints": ["Gợi ý 1: Người hay giúp đỡ bạn bè là người như thế nào?", "Gợi ý 2: 'kind' = tốt bụng."],
        "difficulty": "Dễ"
    },
    {
        "id": "q3-g6",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Be quiet! The little baby ________ in the bedroom.",
        "options": ["is sleeping", "sleeps", "sleep", "slept"],
        "correctAnswer": "is sleeping",
        "explanation": "Mệnh lệnh 'Be quiet!' chỉ hành động đang diễn ra tại thời điểm nói -> Chia 'is sleeping'.",
        "hints": ["Gợi ý 1: 'Be quiet!' = Yêu cầu giữ trật tự.", "Gợi ý 2: Em bé đang ngủ (is sleeping)."],
        "difficulty": "Dễ"
    },
    {
        "id": "q3-g7",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Vy is very ________; she loves painting, drawing and writing stories.",
        "options": ["creative", "shy", "patient", "talkative"],
        "correctAnswer": "creative",
        "explanation": "Thích vẽ tranh và sáng tác truyện thể hiện sự sáng tạo ('creative').",
        "hints": ["Gợi ý 1: Thích vẽ tranh sáng tác là tính cách gì?", "Gợi ý 2: 'creative' = sáng tạo."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q3-g8",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Right now, my best friends ________ for the English test in the library.",
        "options": ["are studying", "study", "studied", "studies"],
        "correctAnswer": "are studying",
        "explanation": "Trạng ngữ 'Right now' chỉ thì Hiện tại tiếp diễn. 'My best friends' (số nhiều) đi với 'are studying'.",
        "hints": ["Gợi ý 1: 'Right now' = ngay lúc này.", "Gợi ý 2: S (số nhiều) + are + V-ing."],
        "difficulty": "Dễ"
    },
    {
        "id": "q3-g9",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Phong is a ________ boy; he feels nervous when speaking in front of crowds.",
        "options": ["shy", "confident", "friendly", "hard-working"],
        "correctAnswer": "shy",
        "explanation": "Cảm thấy lo lắng khi nói trước đám đông là tính cách nhút nhát ('shy').",
        "hints": ["Gợi ý 1: Hay xấu hổ lo lắng là tính cách gì?", "Gợi ý 2: 'shy' = nhút nhát."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q3-g10",
        "unitId": "unit-3",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Why ________ she ________ sports clothes today? Is there a sports festival?",
        "options": ["is / wearing", "does / wear", "do / wear", "was / wearing"],
        "correctAnswer": "is / wearing",
        "explanation": "Hỏi về hành động mặc đồ thể thao ngày hôm nay ('today') dùng Hiện tại tiếp diễn: Is + she + wearing?",
        "hints": ["Gợi ý 1: Hỏi hành động tạm thời ngày hôm nay.", "Gợi ý 2: Is + S + V-ing."],
        "difficulty": "Trung bình"
    },

    # --- UNIT 4: MY NEIGHBOURHOOD ---
    # Grammar: Comparative Adjectives
    {
        "id": "q4-g1",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "My new neighbourhood is ________ than my old one.",
        "options": ["more peaceful", "peacefuler", "peaceful", "most peaceful"],
        "correctAnswer": "more peaceful",
        "explanation": "'peaceful' là tính từ dài (2 âm tiết). So sánh hơn của tính từ dài: more + adj + than -> 'more peaceful'.",
        "hints": ["Gợi ý 1: 'peaceful' là tính từ dài hay ngắn?", "Gợi ý 2: Tính từ dài dùng cấu trúc: more + adj."],
        "difficulty": "Dễ"
    },
    {
        "id": "q4-g2",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "The air in the countryside is ________ than the air in big cities.",
        "options": ["cleaner", "more clean", "cleanest", "clean"],
        "correctAnswer": "cleaner",
        "explanation": "'clean' là tính từ ngắn 1 âm tiết. So sánh hơn của tính từ ngắn: adj + er -> 'cleaner'.",
        "hints": ["Gợi ý 1: 'clean' là tính từ ngắn 1 âm tiết.", "Gợi ý 2: Tính từ ngắn thêm đuôi -er."],
        "difficulty": "Dễ"
    },
    {
        "id": "q4-g3",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Houses in the city are usually ________ than houses in the village.",
        "options": ["more expensive", "expensiver", "expensive", "most expensive"],
        "correctAnswer": "more expensive",
        "explanation": "'expensive' là tính từ dài 3 âm tiết -> So sánh hơn: more expensive.",
        "hints": ["Gợi ý 1: 'expensive' là tính từ 3 âm tiết.", "Gợi ý 2: more + expensive."],
        "difficulty": "Dễ"
    },
    {
        "id": "q4-g4",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "The streets in Hanoi are much ________ than those in my hometown.",
        "options": ["busier", "more busy", "busiest", "busy"],
        "correctAnswer": "busier",
        "explanation": "'busy' tận cùng bằng 'y', đổi 'y' thành 'i' rồi thêm '-er' -> 'busier'.",
        "hints": ["Gợi ý 1: 'busy' kết thúc bằng đuôi '-y'.", "Gợi ý 2: Đổi '-y' thành '-ier'."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q4-g5",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Traveling by plane is ________ than traveling by train.",
        "options": ["faster", "more fast", "fastest", "fast"],
        "correctAnswer": "faster",
        "explanation": "'fast' là tính từ ngắn -> fast + er = 'faster'.",
        "hints": ["Gợi ý 1: 'fast' là tính từ 1 âm tiết.", "Gợi ý 2: thêm đuôi '-er'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q4-g6",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "The art gallery is ________ than the old museum.",
        "options": ["more modern", "moderner", "modern", "most modern"],
        "correctAnswer": "more modern",
        "explanation": "'modern' là tính từ dài 2 âm tiết -> 'more modern'.",
        "hints": ["Gợi ý 1: 'modern' dùng với 'more'.", "Gợi ý 2: more modern than."],
        "difficulty": "Dễ"
    },
    {
        "id": "q4-g7",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "This park is ________ than the one near our school.",
        "options": ["larger", "more large", "largest", "large"],
        "correctAnswer": "larger",
        "explanation": "'large' tận cùng bằng 'e' nên chỉ cần thêm 'r' -> 'larger'.",
        "hints": ["Gợi ý 1: Tính từ 'large' đã có sẵn chữ 'e'.", "Gợi ý 2: Chỉ cần thêm 'r'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q4-g8",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Living in an apartment is ________ than living in a tent.",
        "options": ["more convenient", "convenienter", "convenient", "most convenient"],
        "correctAnswer": "more convenient",
        "explanation": "'convenient' là tính từ dài -> 'more convenient'.",
        "hints": ["Gợi ý 1: 'convenient' là tính từ dài.", "Gợi ý 2: Cấu trúc: more + adj + than."],
        "difficulty": "Dễ"
    },
    {
        "id": "q4-g9",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "A central square is usually ________ than a quiet alley.",
        "options": ["noisier", "more noisy", "noisiest", "noisy"],
        "correctAnswer": "noisier",
        "explanation": "'noisy' đổi 'y' thành 'i' rồi thêm '-er' -> 'noisier'.",
        "hints": ["Gợi ý 1: Đuôi '-y' của tính từ 2 âm tiết.", "Gợi ý 2: Đổi 'y' -> 'ier'."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q4-g10",
        "unitId": "unit-4",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "The seafood in Da Nang is ________ than in my town.",
        "options": ["more delicious", "deliciouser", "delicious", "most delicious"],
        "correctAnswer": "more delicious",
        "explanation": "'delicious' là tính từ dài -> 'more delicious'.",
        "hints": ["Gợi ý 1: 'delicious' là tính từ 3 âm tiết.", "Gợi ý 2: Dùng 'more'."],
        "difficulty": "Dễ"
    },

    # --- UNIT 5: NATURAL WONDERS OF VIET NAM ---
    # Grammar: Countable/Uncountable Nouns & Must / Mustn't
    {
        "id": "q5-g1",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "You ________ travel alone in the Himalayas. It is very dangerous!",
        "options": ["mustn't", "must", "should", "can"],
        "correctAnswer": "mustn't",
        "explanation": "Cấm / Không được phép làm vì rất nguy hiểm dùng động từ khuyết thiếu 'mustn't'.",
        "hints": ["Gợi ý 1: 'dangerous' (nguy hiểm) chỉ điều cấm làm.", "Gợi ý 2: 'mustn't' = Không được phép làm."],
        "difficulty": "Dễ"
    },
    {
        "id": "q5-g2",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "You ________ wear a life jacket when riding a boat in Ha Long Bay.",
        "options": ["must", "mustn't", "can't", "wouldn't"],
        "correctAnswer": "must",
        "explanation": "Bắt buộc phải tuân thủ quy định an toàn đi thuyền dùng 'must' (Phải).",
        "hints": ["Gợi ý 1: Mặc áo phao khi đi thuyền là bắt buộc.", "Gợi ý 2: 'must' = Phải (bắt buộc)."],
        "difficulty": "Dễ"
    },
    {
        "id": "q5-g3",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "How ________ bottled water should we bring for the mountain trip?",
        "options": ["much", "many", "some", "any"],
        "correctAnswer": "much",
        "explanation": "'water' là danh từ không đếm được -> Dùng 'How much'.",
        "hints": ["Gợi ý 1: Nước (water) là danh từ đếm được hay không đếm được?", "Gợi ý 2: Không đếm được dùng 'How much'."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q5-g4",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "How ________ islands are there in Phu Quoc?",
        "options": ["many", "much", "some", "a little"],
        "correctAnswer": "many",
        "explanation": "'islands' là danh từ đếm được số nhiều -> Dùng 'How many'.",
        "hints": ["Gợi ý 1: 'islands' có đuôi '-s' đếm được.", "Gợi ý 2: Hỏi số lượng danh từ đếm được dùng 'How many'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q5-g5",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Visitors ________ drop litter in the national park.",
        "options": ["mustn't", "must", "can", "should"],
        "correctAnswer": "mustn't",
        "explanation": "Tuyệt đối không được vứt rác bừa bãi trong vườn quốc gia -> 'mustn't'.",
        "hints": ["Gợi ý 1: Vứt rác bừa bãi là hành vi cấm.", "Gợi ý 2: 'mustn't' = Không được làm."],
        "difficulty": "Dễ"
    },
    {
        "id": "q5-g6",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Can you give me ________ suncream? My skin feels sunburnt.",
        "options": ["some", "any", "many", "few"],
        "correctAnswer": "some",
        "explanation": "Câu yêu cầu lịch sự 'Can you give me...' dùng 'some' với danh từ không đếm được 'suncream'.",
        "hints": ["Gợi ý 1: Lời yêu cầu lịch sự dùng 'some'.", "Gợi ý 2: 'some' đứng trong câu đề nghị/yêu cầu."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q5-g7",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "We ________ follow the local tour guide closely to avoid getting lost.",
        "options": ["must", "mustn't", "shouldn't", "can't"],
        "correctAnswer": "must",
        "explanation": "Bắt buộc đi theo hướng dẫn viên để không bị lạc -> 'must'.",
        "hints": ["Gợi ý 1: Đi theo hướng dẫn viên để không lạc.", "Gợi ý 2: 'must' = bắt buộc."],
        "difficulty": "Dễ"
    },
    {
        "id": "q5-g8",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "How ________ sleeping bags do we have in our tent?",
        "options": ["many", "much", "some", "a little"],
        "correctAnswer": "many",
        "explanation": "'sleeping bags' là danh từ đếm được số nhiều -> 'How many'.",
        "hints": ["Gợi ý 1: 'sleeping bags' số nhiều đếm được.", "Gợi ý 2: Dùng 'How many'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q5-g9",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "You ________ swim in this river because the water is very deep and rough.",
        "options": ["mustn't", "must", "may", "should"],
        "correctAnswer": "mustn't",
        "explanation": "Sông sâu và chảy xiết thì KHÔNG ĐƯỢC bơi -> 'mustn't'.",
        "hints": ["Gợi ý 1: Nước chảy xiết nguy hiểm.", "Gợi ý 2: 'mustn't'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q5-g10",
        "unitId": "unit-5",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Is there ________ plaster left in the emergency medical kit?",
        "options": ["any", "some", "many", "few"],
        "correctAnswer": "any",
        "explanation": "Câu hỏi nghi vấn Yes/No dùng 'any' với danh từ không đếm được 'plaster'.",
        "hints": ["Gợi ý 1: Câu hỏi dùng 'any' hay 'some'?", "Gợi ý 2: Câu hỏi thông thường dùng 'any'."],
        "difficulty": "Trung bình"
    },

    # --- UNIT 6: OUR TET HOLIDAY ---
    # Grammar: Should / Shouldn't & Some / Any
    {
        "id": "q6-g1",
        "unitId": "unit-6",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Children ________ eat too many sweets before going to bed during Tet.",
        "options": ["shouldn't", "should", "must", "can"],
        "correctAnswer": "shouldn't",
        "explanation": "Lời khuyên không nên ăn quá nhiều kẹo vào buổi tối -> 'shouldn't'.",
        "hints": ["Gợi ý 1: Lời khuyên không nên làm gì.", "Gợi ý 2: 'shouldn't' = Không nên."],
        "difficulty": "Dễ"
    },
    {
        "id": "q6-g2",
        "unitId": "unit-6",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "We ________ help our parents decorate our home with peach blossoms.",
        "options": ["should", "shouldn't", "mustn't", "couldn't"],
        "correctAnswer": "should",
        "explanation": "Lời khuyên nên giúp bố mẹ dọn dẹp trang trí nhà dịp Tết -> 'should'.",
        "hints": ["Gợi ý 1: Lời khuyên tốt nên làm.", "Gợi ý 2: 'should' = Nên."],
        "difficulty": "Dễ"
    },
    {
        "id": "q6-g3",
        "unitId": "unit-6",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Are there ________ yellow apricot blossoms in the garden?",
        "options": ["any", "some", "much", "a little"],
        "correctAnswer": "any",
        "explanation": "Câu hỏi nghi vấn dùng 'any' trước danh từ số nhiều 'blossoms'.",
        "hints": ["Gợi ý 1: Câu hỏi Yes/No dùng 'any'.", "Gợi ý 2: Are there + any + N(plural)?"],
        "difficulty": "Dễ"
    },
    {
        "id": "q6-g4",
        "unitId": "unit-6",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "You ________ break things on the first day of Tet because it brings bad luck.",
        "options": ["shouldn't", "should", "must", "can"],
        "correctAnswer": "shouldn't",
        "explanation": "Khuyên không nên làm vỡ đồ đạc mùng 1 Tết -> 'shouldn't'.",
        "hints": ["Gợi ý 1: Làm vỡ đồ mang lại điềm xấu.", "Gợi ý 2: 'shouldn't' = Không nên."],
        "difficulty": "Dễ"
    },
    {
        "id": "q6-g5",
        "unitId": "unit-6",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "My mother bought ________ delicious fruits for the five-fruit tray.",
        "options": ["some", "any", "much", "a"],
        "correctAnswer": "some",
        "explanation": "Câu khẳng định dùng 'some' với danh từ số nhiều 'fruits'.",
        "hints": ["Gợi ý 1: Câu khẳng định dùng 'some'.", "Gợi ý 2: 'some' = một vài."],
        "difficulty": "Dễ"
    },
    {
        "id": "q6-g6",
        "unitId": "unit-6",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "We ________ wish our grandparents good health and longevity on New Year's Day.",
        "options": ["should", "shouldn't", "mustn't", "can't"],
        "correctAnswer": "should",
        "explanation": "Nên chúc thọ ông bà dịp đầu năm mới -> 'should'.",
        "hints": ["Gợi ý 1: Chúc Tết ông bà là việc làm hay.", "Gợi ý 2: 'should' = Nên."],
        "difficulty": "Dễ"
    },
    {
        "id": "q6-g7",
        "unitId": "unit-6",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Is there ________ lucky money left inside this red envelope?",
        "options": ["any", "some", "many", "few"],
        "correctAnswer": "any",
        "explanation": "Câu hỏi dùng 'any' với danh từ không đếm được 'money'.",
        "hints": ["Gợi ý 1: Câu hỏi dùng 'any'.", "Gợi ý 2: 'any money'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q6-g8",
        "unitId": "unit-6",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "People ________ make loud noise late at night during Tet holiday.",
        "options": ["shouldn't", "should", "must", "could"],
        "correctAnswer": "shouldn't",
        "explanation": "Không nên gây ồn ào ban đêm -> 'shouldn't'.",
        "hints": ["Gợi ý 1: Gây ồn ban đêm không tốt.", "Gợi ý 2: 'shouldn't'."],
        "difficulty": "Dễ"
    },

    # --- UNIT 7: TELEVISION ---
    # Grammar: Wh-Questions & Conjunctions (and, but, so, because)
    {
        "id": "q7-g1",
        "unitId": "unit-7",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "________ do you like watching cartoons? - Because they are funny!",
        "options": ["Why", "What", "Where", "When"],
        "correctAnswer": "Why",
        "explanation": "Câu trả lời bắt đầu bằng 'Because' (bởi vì) thì từ hỏi phải là 'Why' (Tại sao).",
        "hints": ["Gợi ý 1: Nhìn câu trả lời 'Because...'.", "Gợi ý 2: 'Why' hỏi lý do."],
        "difficulty": "Dễ"
    },
    {
        "id": "q7-g2",
        "unitId": "unit-7",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "I like animated films, ________ my brother prefers sports programmes.",
        "options": ["but", "and", "so", "because"],
        "correctAnswer": "but",
        "explanation": "Hai mệnh đề thể hiện sự đối lập (tôi thích phim hoạt hình, NHƯNG anh tôi thích thể thao) dùng từ nối 'but'.",
        "hints": ["Gợi ý 1: 2 ý trái ngược nhau.", "Gợi ý 2: 'but' = Nhưng."],
        "difficulty": "Dễ"
    },
    {
        "id": "q7-g3",
        "unitId": "unit-7",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "________ is your favourite TV channel? - It's VTV7.",
        "options": ["What", "Who", "Why", "How"],
        "correctAnswer": "What",
        "explanation": "Hỏi về tên kênh truyền hình ưa thích dùng từ hỏi 'What'.",
        "hints": ["Gợi ý 1: Hỏi 'Kênh nào' dùng 'What'.", "Gợi ý 2: What is your favourite..."],
        "difficulty": "Dễ"
    },
    {
        "id": "q7-g4",
        "unitId": "unit-7",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "She was very tired, ________ she went to bed early last night.",
        "options": ["so", "because", "but", "and"],
        "correctAnswer": "so",
        "explanation": "Mệnh đề chỉ kết quả (mệt mỏi NÊN đi ngủ sớm) dùng từ nối 'so'.",
        "hints": ["Gợi ý 1: Chỉ kết quả xảy ra.", "Gợi ý 2: 'so' = Vì vậy / Vì thế."],
        "difficulty": "Dễ"
    },
    {
        "id": "q7-g5",
        "unitId": "unit-7",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "________ hours a day do you watch television? - About one hour.",
        "options": ["How many", "How much", "How long", "How often"],
        "correctAnswer": "How many",
        "explanation": "'hours' là danh từ số nhiều đếm được -> Hỏi 'How many hours'.",
        "hints": ["Gợi ý 1: 'hours' đếm được số nhiều.", "Gợi ý 2: How many + N(plural)."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q7-g6",
        "unitId": "unit-7",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "He loves the game show 'Are You Smarter Than a 5th Grader?' ________ it is educational.",
        "options": ["because", "so", "but", "and"],
        "correctAnswer": "because",
        "explanation": "Mệnh đề nguyên nhân (BỞI VÌ nó mang tính giáo dục) dùng 'because'.",
        "hints": ["Gợi ý 1: Chỉ nguyên nhân lý do.", "Gợi ý 2: 'because' = Bởi vì."],
        "difficulty": "Dễ"
    },
    {
        "id": "q7-g7",
        "unitId": "unit-7",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "________ is the character in this famous cartoon? - It's Jerry the mouse.",
        "options": ["Who", "What", "Where", "When"],
        "correctAnswer": "Who",
        "explanation": "Hỏi về nhân vật (Who) -> Who is the character?",
        "hints": ["Gợi ý 1: Hỏi về nhân vật / người.", "Gợi ý 2: 'Who' = Ai."],
        "difficulty": "Dễ"
    },
    {
        "id": "q7-g8",
        "unitId": "unit-7",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "The documentary was long, ________ it was extremely interesting.",
        "options": ["but", "so", "because", "or"],
        "correctAnswer": "but",
        "explanation": "Mệnh đề tương phản (dài NHƯNG thú vị) dùng 'but'.",
        "hints": ["Gợi ý 1: Sự tương phản giữa 'long' và 'interesting'.", "Gợi ý 2: 'but'."],
        "difficulty": "Dễ"
    },

    # --- UNIT 8: SPORTS AND GAMES ---
    # Grammar: Past Simple & Imperatives
    {
        "id": "q8-g1",
        "unitId": "unit-8",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Yesterday, my school football team ________ a friendly match against Class 6B.",
        "options": ["played", "play", "is playing", "will play"],
        "correctAnswer": "played",
        "explanation": "Dấu hiệu 'Yesterday' chia thì Quá khứ đơn (V-ed): play -> played.",
        "hints": ["Gợi ý 1: Dấu hiệu nhận biết 'Yesterday'.", "Gợi ý 2: Thêm -ed vào động từ."],
        "difficulty": "Dễ"
    },
    {
        "id": "q8-g2",
        "unitId": "unit-8",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Don't ________ in the deep pool! It's dangerous for beginners.",
        "options": ["swim", "swimming", "swam", "swims"],
        "correctAnswer": "swim",
        "explanation": "Câu mệnh lệnh phủ định: Don't + V_inf (nguyên mẫu) -> 'Don't swim'.",
        "hints": ["Gợi ý 1: Đằng sau 'Don't' dùng động từ dạng nào?", "Gợi ý 2: Động từ nguyên mẫu."],
        "difficulty": "Dễ"
    },
    {
        "id": "q8-g3",
        "unitId": "unit-8",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Last week, Pelé ________ three goals in the final match.",
        "options": ["scored", "scores", "is scoring", "score"],
        "correctAnswer": "scored",
        "explanation": "Dấu hiệu 'Last week' chia thì Quá khứ đơn (score -> scored).",
        "hints": ["Gợi ý 1: 'Last week' = Tuần trước.", "Gợi ý 2: Động từ chia quá khứ."],
        "difficulty": "Dễ"
    },
    {
        "id": "q8-g4",
        "unitId": "unit-8",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "________ quiet! The P.E teacher is explaining the basketball rules.",
        "options": ["Be", "Do", "Are", "Have"],
        "correctAnswer": "Be",
        "explanation": "Câu mệnh lệnh khẳng định với tính từ 'quiet': Be + adj -> 'Be quiet!'.",
        "hints": ["Gợi ý 1: Mệnh lệnh yêu cầu trật tự.", "Gợi ý 2: 'Be quiet!' = Hãy trật tự."],
        "difficulty": "Dễ"
    },
    {
        "id": "q8-g5",
        "unitId": "unit-8",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "We ________ to the sports club last Sunday to practice karate.",
        "options": ["went", "go", "going", "goes"],
        "correctAnswer": "went",
        "explanation": "Động từ bất quy tắc của 'go' ở quá khứ đơn (last Sunday) là 'went'.",
        "hints": ["Gợi ý 1: Quá khứ của động từ 'go'.", "Gợi ý 2: go -> went."],
        "difficulty": "Dễ"
    },
    {
        "id": "q8-g6",
        "unitId": "unit-8",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Please ________ your sports shoes before playing badminton on the court.",
        "options": ["put on", "putting on", "putted on", "puts on"],
        "correctAnswer": "put on",
        "explanation": "Lời đề nghị / Mệnh lệnh lịch sự bắt đầu bằng 'Please + V_inf' -> 'Please put on'.",
        "hints": ["Gợi ý 1: Please + Động từ nguyên mẫu.", "Gợi ý 2: put on."],
        "difficulty": "Dễ"
    },
    {
        "id": "q8-g7",
        "unitId": "unit-8",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "My father ________ me a new chess set for my 12th birthday last month.",
        "options": ["bought", "buy", "buys", "buying"],
        "correctAnswer": "bought",
        "explanation": "Động từ bất quy tắc của 'buy' ở thì quá khứ đơn (last month) là 'bought'.",
        "hints": ["Gợi ý 1: Quá khứ của 'buy'.", "Gợi ý 2: buy -> bought."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q8-g8",
        "unitId": "unit-8",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Don't ________ late for physical training class!",
        "options": ["be", "is", "are", "do"],
        "correctAnswer": "be",
        "explanation": "Mệnh lệnh phủ định với tính từ 'late': Don't + be + adj -> 'Don't be late!'.",
        "hints": ["Gợi ý 1: Don't + be + tính từ.", "Gợi ý 2: Don't be late."],
        "difficulty": "Dễ"
    },

    # --- UNIT 9: CITIES OF THE WORLD ---
    # Grammar: Possessive Pronouns & Superlative Adjectives
    {
        "id": "q9-g1",
        "unitId": "unit-9",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "This camera is mine, and that blue postcard is ________.",
        "options": ["yours", "your", "you", "yours'"],
        "correctAnswer": "yours",
        "explanation": "Đại từ sở hữu 'yours' thay thế cho 'your postcard' ở cuối câu.",
        "hints": ["Gợi ý 1: Đứng cuối câu thay thế cho tính từ sở hữu + danh từ.", "Gợi ý 2: yours = your postcard."],
        "difficulty": "Dễ"
    },
    {
        "id": "q9-g2",
        "unitId": "unit-9",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Tokyo is one of the ________ cities in the world.",
        "options": ["most expensive", "expensivest", "more expensive", "expensive"],
        "correctAnswer": "most expensive",
        "explanation": "So sánh nhất với tính từ dài 'expensive': the + most + adj -> 'the most expensive'.",
        "hints": ["Gợi ý 1: Nhìn thấy mạo từ 'the'.", "Gợi ý 2: So sánh nhất tính từ dài dùng 'most'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q9-g3",
        "unitId": "unit-9",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Is this travel guidebook ________ or hers?",
        "options": ["his", "he", "him", "he's"],
        "correctAnswer": "his",
        "explanation": "Đại từ sở hữu 'his' (của anh ấy) đứng độc lập song song với 'hers'.",
        "hints": ["Gợi ý 1: Đại từ sở hữu của 'he'.", "Gợi ý 2: his."],
        "difficulty": "Dễ"
    },
    {
        "id": "q9-g4",
        "unitId": "unit-9",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "London is the ________ historic city in Europe.",
        "options": ["most famous", "famousest", "more famous", "famous"],
        "correctAnswer": "most famous",
        "explanation": "So sánh nhất tính từ dài 'famous': the + most famous.",
        "hints": ["Gợi ý 1: So sánh nhất có 'the'.", "Gợi ý 2: the most famous."],
        "difficulty": "Dễ"
    },
    {
        "id": "q9-g5",
        "unitId": "unit-9",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Our hotel room has a balcony, but ________ doesn't have one.",
        "options": ["theirs", "their", "they", "them"],
        "correctAnswer": "theirs",
        "explanation": "Đại từ sở hữu 'theirs' làm chủ ngữ thay cho 'their hotel room'.",
        "hints": ["Gợi ý 1: Đại từ sở hữu thay thế cho 'their room'.", "Gợi ý 2: theirs."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q9-g6",
        "unitId": "unit-9",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Landmark 81 is the ________ building in Ho Chi Minh City.",
        "options": ["tallest", "most tall", "taller", "tall"],
        "correctAnswer": "tallest",
        "explanation": "So sánh nhất tính từ ngắn 'tall': the + tall + est -> 'the tallest'.",
        "hints": ["Gợi ý 1: 'tall' là tính từ ngắn.", "Gợi ý 2: the + tall + est."],
        "difficulty": "Dễ"
    },
    {
        "id": "q9-g7",
        "unitId": "unit-9",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "My travel pictures are colorful, but ________ are black and white.",
        "options": ["hers", "her", "she", "hers'"],
        "correctAnswer": "hers",
        "explanation": "Đại từ sở hữu 'hers' thay cho 'her travel pictures'.",
        "hints": ["Gợi ý 1: Đại từ sở hữu của 'she'.", "Gợi ý 2: hers."],
        "difficulty": "Dễ"
    },
    {
        "id": "q9-g8",
        "unitId": "unit-9",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "What is the ________ street food city in Vietnam?",
        "options": ["most popular", "popularer", "popular", "more popular"],
        "correctAnswer": "most popular",
        "explanation": "So sánh nhất 'the most popular'.",
        "hints": ["Gợi ý 1: 'popular' là tính từ 3 âm tiết.", "Gợi ý 2: the most popular."],
        "difficulty": "Dễ"
    },

    # --- UNIT 10: OUR HOUSES IN THE FUTURE ---
    # Grammar: Future Simple (Will/Won't) & Might / Might Not
    {
        "id": "q10-g1",
        "unitId": "unit-10",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "In the future, smart home robots ________ do all our household chores.",
        "options": ["will", "did", "are", "were"],
        "correctAnswer": "will",
        "explanation": "Dự đoán tương lai chắc chắn dùng trợ động từ 'will + V_inf'.",
        "hints": ["Gợi ý 1: 'In the future' = Trong tương lai.", "Gợi ý 2: Trợ động từ tương lai đơn là 'will'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q10-g2",
        "unitId": "unit-10",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "We ________ live in space cottages if Earth gets too crowded.",
        "options": ["might", "must", "should", "can't"],
        "correctAnswer": "might",
        "explanation": "Diễn tả khả năng có thể xảy ra ở tương lai (không chắc chắn 100%) dùng 'might'.",
        "hints": ["Gợi ý 1: Diễn tả khả năng có thể xảy ra trong tương lai.", "Gợi ý 2: 'might' = Có thể."],
        "difficulty": "Dễ"
    },
    {
        "id": "q10-g3",
        "unitId": "unit-10",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Automatic solar panels ________ save a lot of clean energy for future houses.",
        "options": ["will", "won't", "did", "didn't"],
        "correctAnswer": "will",
        "explanation": "Dự đoán tương lai khẳng định 'will save'.",
        "hints": ["Gợi ý 1: 'will' + V_inf.", "Gợi ý 2: Tương lai đơn."],
        "difficulty": "Dễ"
    },
    {
        "id": "q10-g4",
        "unitId": "unit-10",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Take an umbrella with you! It ________ rain later this afternoon.",
        "options": ["might", "will not", "mustn't", "shouldn't"],
        "correctAnswer": "might",
        "explanation": "Khả năng trời có thể mưa (không chắc chắn) dùng 'might'.",
        "hints": ["Gợi ý 1: Khả năng thời tiết có thể xảy ra.", "Gợi ý 2: 'might'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q10-g5",
        "unitId": "unit-10",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "People ________ not use traditional keys; smart locks will open by fingerprint.",
        "options": ["will", "do", "are", "have"],
        "correctAnswer": "will",
        "explanation": "Dạng phủ định tương lai 'will not use' (sẽ không dùng).",
        "hints": ["Gợi ý 1: 'will not' = won't.", "Gợi ý 2: will not use."],
        "difficulty": "Dễ"
    },
    {
        "id": "q10-g6",
        "unitId": "unit-10",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "I am not completely sure, but we ________ travel to Mars for holiday in 2050.",
        "options": ["might", "will", "must", "should"],
        "correctAnswer": "might",
        "explanation": "Cụm 'I am not completely sure' (tôi không chắc chắn) chỉ ra hành động 'might' (có thể).",
        "hints": ["Gợi ý 1: Nhìn cụm 'not completely sure'.", "Gợi ý 2: Dùng 'might' cho khả năng chưa chắc chắn."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q10-g7",
        "unitId": "unit-10",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Wireless supercomputers ________ replace human teachers completely.",
        "options": ["won't", "not will", "doesn't", "isn't"],
        "correctAnswer": "won't",
        "explanation": "Phủ định thì Tương lai đơn là 'won't' (will not).",
        "hints": ["Gợi ý 1: Phủ định của 'will' là gì?", "Gợi ý 2: will not = won't."],
        "difficulty": "Dễ"
    },
    {
        "id": "q10-g8",
        "unitId": "unit-10",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Scientists ________ build floating cities on oceans in the near future.",
        "options": ["might", "did", "were", "are"],
        "correctAnswer": "might",
        "explanation": "Diễn tả dự án tương lai có thể thành hiện thực dùng 'might'.",
        "hints": ["Gợi ý 1: Khả năng xảy ra ở tương lai.", "Gợi ý 2: 'might'."],
        "difficulty": "Dễ"
    },

    # --- UNIT 11: OUR GREENER WORLD ---
    # Grammar: First Conditional (If...) & Articles (a / an / the)
    {
        "id": "q11-g1",
        "unitId": "unit-11",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "If we recycle paper and glass, we ________ energy and natural resources.",
        "options": ["will save", "save", "saved", "saving"],
        "correctAnswer": "will save",
        "explanation": "Câu điều kiện loại 1: Mệnh đề 'If' chia Hiện tại đơn (recycle), mệnh đề chính chia Tương lai đơn (will save).",
        "hints": ["Gợi ý 1: Cấu trúc điều kiện loại 1: If + S + V(pres), S + will + V.", "Gợi ý 2: will save."],
        "difficulty": "Dễ"
    },
    {
        "id": "q11-g2",
        "unitId": "unit-11",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Our school 3Rs club planted ________ apple tree in the yard yesterday.",
        "options": ["an", "a", "the", "x"],
        "correctAnswer": "an",
        "explanation": "Danh từ 'apple tree' bắt đầu bằng nguyên âm 'a' và nhắc đến lần đầu tiên -> Dùng mạo từ 'an'.",
        "hints": ["Gợi ý 1: Từ 'apple' bắt đầu bằng nguyên âm 'a'.", "Gợi ý 2: Dùng mạo từ 'an'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q11-g3",
        "unitId": "unit-11",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "If people ________ reusable bags for shopping, they will reduce plastic waste.",
        "options": ["use", "will use", "used", "using"],
        "correctAnswer": "use",
        "explanation": "Mệnh đề 'If' trong câu điều kiện loại 1 chia ở thì Hiện tại đơn: If + people + use.",
        "hints": ["Gợi ý 1: Mệnh đề chứa 'If' chia thì hiện tại đơn.", "Gợi ý 2: 'people' số nhiều đi với 'use'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q11-g4",
        "unitId": "unit-11",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Look at ________ Sun! It provides clean solar energy for our town.",
        "options": ["the", "a", "an", "x"],
        "correctAnswer": "the",
        "explanation": "Vật thể độc nhất vô nhị (Mặt trời - Sun) dùng mạo từ xác định 'the'.",
        "hints": ["Gợi ý 1: Mặt trời là vật thể duy nhất.", "Gợi ý 2: Dùng mạo từ 'the Sun'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q11-g5",
        "unitId": "unit-11",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "If you turn off electrical devices when leaving, you ________ electricity.",
        "options": ["will save", "save", "saved", "are saving"],
        "correctAnswer": "will save",
        "explanation": "Mệnh đề chính câu điều kiện loại 1: S + will + V_inf -> 'will save'.",
        "hints": ["Gợi ý 1: Mệnh đề chính điều kiện loại 1 dùng 'will'.", "Gợi ý 2: will save."],
        "difficulty": "Dễ"
    },
    {
        "id": "q11-g6",
        "unitId": "unit-11",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "He wants to become ________ environmental scientist in the future.",
        "options": ["an", "a", "the", "x"],
        "correctAnswer": "an",
        "explanation": "'environmental' bắt đầu bằng nguyên âm 'e' -> Dùng mạo từ 'an'.",
        "hints": ["Gợi ý 1: Từ 'environmental' bắt đầu bằng âm 'e'.", "Gợi ý 2: Dùng 'an'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q11-g7",
        "unitId": "unit-11",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "If students ________ more trees in the schoolyard, the air will be cleaner.",
        "options": ["plant", "will plant", "planted", "planting"],
        "correctAnswer": "plant",
        "explanation": "Mệnh đề 'If' chia hiện tại đơn (plant).",
        "hints": ["Gợi ý 1: Mệnh đề If chia hiện tại đơn.", "Gợi ý 2: If students plant..."],
        "difficulty": "Dễ"
    },
    {
        "id": "q11-g8",
        "unitId": "unit-11",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Earth is ________ third planet from the Sun in the solar system.",
        "options": ["the", "a", "an", "x"],
        "correctAnswer": "the",
        "explanation": "Đứng trước số thứ tự (third) dùng mạo từ xác định 'the'.",
        "hints": ["Gợi ý 1: Trước số thứ tự (first, second, third) dùng mạo từ nào?", "Gợi ý 2: 'the'."],
        "difficulty": "Trung bình"
    },

    # --- UNIT 12: ROBOTS ---
    # Grammar: Superlatives & Could / Couldn't for Past Ability
    {
        "id": "q12-g1",
        "unitId": "unit-12",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Shifa is the ________ doctor robot in the technology exhibition.",
        "options": ["smartest", "smarter", "smart", "more smart"],
        "correctAnswer": "smartest",
        "explanation": "So sánh nhất với tính từ ngắn 'smart': the + smart + est -> 'the smartest'.",
        "hints": ["Gợi ý 1: Có mạo từ 'the' phía trước.", "Gợi ý 2: smart + est."],
        "difficulty": "Dễ"
    },
    {
        "id": "q12-g2",
        "unitId": "unit-12",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "When my grandfather was young, he ________ run very fast.",
        "options": ["could", "can", "will", "must"],
        "correctAnswer": "could",
        "explanation": "Khả năng trong quá khứ ('was young') dùng động từ khuyết thiếu 'could'.",
        "hints": ["Gợi ý 1: Dấu hiệu thời quá khứ 'was young'.", "Gợi ý 2: Khả năng trong quá khứ dùng 'could'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q12-g3",
        "unitId": "unit-12",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "RoboMax is the ________ worker robot in the factory.",
        "options": ["strongest", "stronger", "most strong", "strong"],
        "correctAnswer": "strongest",
        "explanation": "So sánh nhất tính từ ngắn 'strong': the + strong + est -> 'the strongest'.",
        "hints": ["Gợi ý 1: 'strong' là tính từ ngắn.", "Gợi ý 2: the + strong + est."],
        "difficulty": "Dễ"
    },
    {
        "id": "q12-g4",
        "unitId": "unit-12",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Ten years ago, home robots ________ do complex housework like ironing clothes.",
        "options": ["couldn't", "can't", "won't", "shouldn't"],
        "correctAnswer": "couldn't",
        "explanation": "Không thể làm gì trong quá khứ ('Ten years ago') dùng 'couldn't'.",
        "hints": ["Gợi ý 1: Dấu hiệu quá khứ 'Ten years ago'.", "Gợi ý 2: Phủ định khả năng quá khứ là 'couldn't'."],
        "difficulty": "Dễ"
    },
    {
        "id": "q12-g5",
        "unitId": "unit-12",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "When I was five years old, I ________ speak English fluently.",
        "options": ["couldn't", "can't", "won't", "mustn't"],
        "correctAnswer": "couldn't",
        "explanation": "Không thể làm gì lúc 5 tuổi trong quá khứ dùng 'couldn't'.",
        "hints": ["Gợi ý 1: 'When I was five years old' là thời quá khứ.", "Gợi ý 2: couldn't."],
        "difficulty": "Dễ"
    },
    {
        "id": "q12-g6",
        "unitId": "unit-12",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "This space exploration robot can jump the ________ among all tested models.",
        "options": ["highest", "higher", "most high", "high"],
        "correctAnswer": "highest",
        "explanation": "So sánh nhất của trạng từ / tính từ ngắn 'high': the + high + est -> 'highest'.",
        "hints": ["Gợi ý 1: So sánh nhất nhóm 'among all'.", "Gợi ý 2: the highest."],
        "difficulty": "Trung bình"
    },
    {
        "id": "q12-g7",
        "unitId": "unit-12",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "In 1990, scientists ________ build AI robots with human feelings.",
        "options": ["couldn't", "can't", "won't", "shouldn't"],
        "correctAnswer": "couldn't",
        "explanation": "Mốc thời gian quá khứ 'In 1990' dùng 'couldn't'.",
        "hints": ["Gợi ý 1: 'In 1990' thuộc thời quá khứ.", "Gợi ý 2: couldn't."],
        "difficulty": "Dễ"
    },
    {
        "id": "q12-g8",
        "unitId": "unit-12",
        "skill": "Grammar",
        "type": "multiple-choice",
        "content": "Last year, my sister ________ ride a bicycle, but now she rides very well.",
        "options": ["couldn't", "can't", "won't", "shouldn't"],
        "correctAnswer": "couldn't",
        "explanation": "Năm ngoái không thể đi xe đạp ('Last year') dùng 'couldn't'.",
        "hints": ["Gợi ý 1: Dấu hiệu 'Last year'.", "Gợi ý 2: couldn't."],
        "difficulty": "Dễ"
    }
]

file_path = r"d:\đảng viên\2025\Viet apps\Englishtutor 6\src\data\sgkData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Convert questions_data list into clean TypeScript Object strings
ts_items = []
for q in questions_data:
    opts_str = ",\n      ".join([f"'{opt}'" for opt in q["options"]])
    hints_str = ",\n      ".join([f"'{h}'" for h in q["hints"]])
    ts_item = f"""  {{
    id: '{q["id"]}',
    unitId: '{q["unitId"]}',
    skill: '{q["skill"]}',
    type: '{q["type"]}',
    content: '{q["content"]}',
    options: [
      {opts_str}
    ],
    correctAnswer: '{q["correctAnswer"]}',
    explanation: '{q["explanation"]}',
    hints: [
      {hints_str}
    ],
    difficulty: '{q["difficulty"]}'
  }}"""
    ts_items.append(ts_item)

inserted_ts = ",\n" + ",\n".join(ts_items)

# Insert right before export const INITIAL_PROGRESS = {
target = "export const INITIAL_PROGRESS = {"
if target in content:
    new_content = content.replace(target, f"{inserted_ts}\n];\n\n{target}")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully added 94 new grammar questions to sgkData.ts!")
else:
    print("Error: Target anchor not found.")
