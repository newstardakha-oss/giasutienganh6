const CUSTOM_VOCAB_IMAGES_KEY = 'global_success_6_custom_vocab_images_v1';

/**
 * Lưu trữ map { [normalizedWord]: imageUrl } trong localStorage
 * giúp đồng bộ ảnh tùy chỉnh của giáo viên giữa cả chế độ SRS (3 Thẻ) và Lật Thẻ Tự Do.
 */
export function getCustomVocabImagesMap(): Record<string, string> {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return {};
    const raw = window.localStorage.getItem(CUSTOM_VOCAB_IMAGES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getCustomVocabImage(word: string): string | undefined {
  if (!word) return undefined;
  const map = getCustomVocabImagesMap();
  return map[word.toLowerCase().trim()];
}

export function setCustomVocabImage(word: string, imageUrl: string): void {
  if (!word) return;
  try {
    const key = word.toLowerCase().trim();
    const map = getCustomVocabImagesMap();
    if (imageUrl && imageUrl.trim()) {
      map[key] = imageUrl.trim();
    } else {
      delete map[key];
    }
    window.localStorage.setItem(CUSTOM_VOCAB_IMAGES_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('vocab-image-updated', { detail: { word: key, imageUrl } }));
  } catch (err) {
    console.error('[VocabImage] Không thể lưu ảnh tùy chỉnh:', err);
  }
}

/**
 * Tạo link ảnh minh họa AI 3D hoạt hình tự động (miễn phí, không cần API key)
 * dựa trên từ vựng tiếng Anh, phù hợp lứa tuổi học sinh lớp 6.
 */
export function buildAutoVocabImageUrl(word: string, seedVariant: number = 1): string {
  const cleanWord = word.trim().toLowerCase();
  const prompt = `cute 3d cartoon educational flashcard illustration of ${cleanWord}, school textbook style for kids, bright vibrant colors, simple centered object, clean soft pastel background, no text`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=320&height=320&nologo=true&seed=${seedVariant}`;
}

/**
 * Kho hình ảnh minh họa chuẩn SGK cho Unit 1 - My New School (26 từ vựng từ bộ thẻ hình ảnh đính kèm).
 */
export const BUILTIN_VOCAB_IMAGES: Record<string, string> = {
  // 1. School things (Đồ dùng học tập)
  'school bag': './images/vocab/unit1/school-bag.jpg',
  compass: './images/vocab/unit1/compass.jpg',
  calculator: './images/vocab/unit1/calculator.jpg',
  'pencil case': './images/vocab/unit1/pencil-case.jpg',
  notebook: './images/vocab/unit1/notebook.jpg',
  textbook: './images/vocab/unit1/textbook.jpg',
  rubber: './images/vocab/unit1/rubber.jpg',
  ruler: './images/vocab/unit1/ruler.jpg',
  sharpener: './images/vocab/unit1/sharpener.jpg',
  uniform: './images/vocab/unit1/uniform.jpg',
  // 2. Con người và loại hình trường học
  classmate: './images/vocab/unit1/classmate.jpg',
  'boarding school': './images/vocab/unit1/boarding-school.jpg',
  'international school': './images/vocab/unit1/international-school.jpg',
  // 3. Subjects & Learning (Môn học & Học tập)
  subject: './images/vocab/unit1/subject.jpg',
  maths: './images/vocab/unit1/maths.jpg',
  science: './images/vocab/unit1/science.jpg',
  history: './images/vocab/unit1/history.jpg',
  art: './images/vocab/unit1/art.jpg',
  homework: './images/vocab/unit1/homework.jpg',
  lesson: './images/vocab/unit1/lesson.jpg',
  timetable: './images/vocab/unit1/timetable.jpg',
  // 4. School facilities (Cơ sở vật chất trường học)
  library: './images/vocab/unit1/library.jpg',
  canteen: './images/vocab/unit1/canteen.jpg',
  gym: './images/vocab/unit1/gym.jpg',
  playground: './images/vocab/unit1/playground.jpg',
  classroom: './images/vocab/unit1/classroom.jpg',
};

/**
 * Lấy link ảnh ưu tiên:
 * 1. Ảnh tùy chỉnh đã lưu trong kho ảnh chung theo từ (nếu giáo viên tự đổi)
 * 2. imageUrl truyền trực tiếp từ dữ liệu từ vựng
 * 3. Ảnh minh họa chuẩn có sẵn trong kho BUILTIN_VOCAB_IMAGES
 * 4. Ảnh AI tự động sinh theo từ vựng
 */
export function resolveVocabImageUrl(
  word: string,
  explicitImageUrl?: string,
  seedVariant: number = 1
): string {
  const savedCustom = getCustomVocabImage(word);
  if (savedCustom) {
    return savedCustom;
  }
  if (explicitImageUrl && explicitImageUrl.trim()) {
    return explicitImageUrl.trim();
  }
  const cleanKey = word.toLowerCase().trim();
  if (BUILTIN_VOCAB_IMAGES[cleanKey]) {
    return BUILTIN_VOCAB_IMAGES[cleanKey];
  }
  return buildAutoVocabImageUrl(word, seedVariant);
}

/**
 * Nén file ảnh người dùng tải lên (hoặc dán từ clipboard) sang Base64 JPEG nhỏ gọn (~15-30KB)
 * để lưu an toàn trong localStorage mà không lo đầy bộ nhớ.
 */
export function compressImageFileToDataUrl(
  file: File,
  maxSize: number = 280,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc file ảnh'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('File không phải là định dạng ảnh hợp lệ'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        // Vẽ nền trắng cho ảnh PNG trong suốt trước khi xuất JPEG
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Từ điển Emoji minh họa tức thì cho từ vựng Tiếng Anh 6 Global Success (Unit 1 -> Unit 12).
 * Hiển thị ngay lập tức (0ms) khi đang tải ảnh hoặc khi ngoại tuyến.
 */
const WORD_EMOJI_MAP: Record<string, string> = {
  // Unit 1: My New School
  subject: '📚',
  uniform: '🎽',
  calculator: '🖩',
  compass: '📐',
  rubber: '🧼',
  'pencil case': '✏️',
  'school bag': '🎒',
  classmate: '🧑‍🤝‍🧑',
  homework: '📝',
  history: '🏛️',
  science: '🔬',
  library: '📖',
  playground: '🛝',
  'boarding school': '🏫',
  'international school': '🌍',
  smart: '✨',
  notebook: '📓',
  ruler: '📏',
  textbook: '📕',
  sharpener: '✏️',
  maths: '➕',
  art: '🎨',
  lesson: '👩‍🏫',
  timetable: '🗓️',
  canteen: '🍱',
  gym: '🏀',
  classroom: '🏫',
  // Unit 2: My House
  house: '🏠',
  flat: '🏢',
  apartment: '🏢',
  townhouse: '🏘️',
  'country house': '🏡',
  villa: '🏰',
  'living room': '🛋️',
  bedroom: '🛏️',
  kitchen: '🍳',
  bathroom: '🛁',
  hall: '🚪',
  attic: '🪜',
  fridge: '🧊',
  dishwasher: '🍽️',
  'chest of drawers': '🗄️',
  wardrobe: '👗',
  sink: '🚰',
  lamp: '💡',
  sofa: '🛋️',
  pillow: '🛌',
  chopsticks: '🥢',
  cupboard: '柜',
  mirror: '🪞',
  shower: '🚿',
  // Unit 3: My Friends
  careful: '🔍',
  caring: '🤗',
  cheeky: '😜',
  clever: '🧠',
  confident: '😎',
  creative: '🎨',
  friendly: '🤝',
  funny: '😂',
  'hard-working': '💪',
  kind: '💖',
  shy: '😳',
  talkative: '🗣️',
  active: '🏃',
  patient: '🧘',
  // Unit 4: My Neighbourhood
  neighbourhood: '🏘️',
  square: '⛲',
  cathedral: '⛪',
  'railway station': '🚉',
  'art gallery': '🖼️',
  statue: '🗽',
  memorial: '🏛️',
  palace: '🏯',
  pagoda: '🛕',
  temple: '⛩️',
  suburb: '🌳',
  crowded: '👥',
  peaceful: '🕊️',
  modern: '🏙️',
  noisy: '📢',
  quiet: '🤫',
  narrow: '↔️',
  convenient: '🏪',
  // Unit 5: Natural Wonders
  waterfall: '🏞️',
  cave: '🦇',
  desert: '🏜️',
  forest: '🌲',
  island: '🏝️',
  valley: '⛰️',
  mountain: '🏔️',
  beach: '🏖️',
  river: '🏞️',
  lake: '💧',
  backpack: '🎒',
  plaster: '🩹',
  suncream: '🧴',
  scissors: '✂️',
  painkiller: '💊',
  sleeping: '😴',
  // Unit 6: Our Tet Holiday
  tet: '🧧',
  firework: '🎆',
  fireworks: '🎆',
  'lucky money': '🧧',
  'peach blossom': '🌸',
  'apricot blossom': '🌼',
  wish: '🌠',
  decorate: '🏮',
  celebrate: '🎉',
  calendar: '📅',
  relative: '👨‍👩‍👧‍👦',
  relatives: '👨‍👩‍👧‍👦',
  furniture: '🪑',
  special: '⭐',
  // Unit 7: Television
  television: '📺',
  channel: '📡',
  programme: '🎬',
  cartoon: '🐭',
  comedy: '🎭',
  viewer: '👀',
  mc: '🎤',
  weatherman: '⛅',
  newsreader: '📰',
  remote: '🎛️',
  'remote control': '🎛️',
  educational: '🎓',
  entertaining: '🎪',
  // Unit 8: Sports and Games
  sport: '⚽',
  football: '⚽',
  swimming: '🏊',
  badminton: '🏸',
  volleyball: '🏐',
  basketball: '🏀',
  cycling: '🚴',
  aerobics: '🤸',
  karate: '🥋',
  chess: '♟️',
  goggles: '🥽',
  racket: '🎾',
  boat: '🚤',
  marathon: '🏃‍♂️',
  champion: '🏆',
  // Unit 9: Cities of the World
  city: '🌆',
  continent: '🌍',
  landmark: '🗼',
  tower: '🗼',
  postcard: ' postcards',
  stall: '🎪',
  'street food': '🍜',
  'floating market': '🛶',
  sunny: '☀️',
  rainy: '🌧️',
  windy: '💨',
  cloudy: '☁️',
  snowy: '❄️',
  // Unit 10: Our Houses in the Future
  'future house': '🛸',
  'smart tv': '📺',
  'solar energy': '☀️',
  appliance: '🔌',
  wireless: '📶',
  helicopter: '🚁',
  ocean: '🌊',
  space: '🚀',
  moon: '🌙',
  // Unit 11: Our Greener World
  reduce: '📉',
  reuse: '🔄',
  recycle: '♻️',
  environment: '🌱',
  plastic: '🛍️',
  rubbish: '🗑️',
  charity: '💝',
  pollute: '🏭',
  pollution: '🌫️',
  green: '🌿',
  tree: '🌳',
  water: '💧',
  // Unit 12: Robots
  robot: '🤖',
  robots: '🤖',
  iron: '👔',
  guard: '🛡️',
  repair: '🔧',
  broken: '🛠️',
  planet: '🪐',
  astronaut: '👨‍🚀',
  hospital: '🏥',
  factory: '🏭',
  gardening: '🌻',
};

export function getVocabEmoji(word: string, meaningVi?: string): string {
  const clean = word.toLowerCase().trim();
  if (WORD_EMOJI_MAP[clean]) return WORD_EMOJI_MAP[clean];

  for (const [k, emoji] of Object.entries(WORD_EMOJI_MAP)) {
    if (clean.includes(k) || k.includes(clean)) {
      return emoji;
    }
  }

  const m = (meaningVi || '').toLowerCase();
  if (m.includes('trường') || m.includes('học')) return '🏫';
  if (m.includes('nhà') || m.includes('phòng')) return '🏠';
  if (m.includes('ăn') || m.includes('món') || m.includes('bếp')) return '🍲';
  if (m.includes('thể thao') || m.includes('chơi') || m.includes('bóng')) return '⚽';
  if (m.includes('cây') || m.includes('hoa') || m.includes('rừng') || m.includes('môi trường')) return '🌿';
  if (m.includes('biển') || m.includes('nước') || m.includes('sông')) return '🌊';
  if (m.includes('máy') || m.includes('robot') || m.includes('điện')) return '🤖';
  if (m.includes('tết') || m.includes('lễ')) return '🧧';
  if (m.includes('bạn') || m.includes('người')) return '😊';

  return '🖼️';
}
