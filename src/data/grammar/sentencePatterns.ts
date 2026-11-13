import type { GrammarPattern } from './types';

export const sentencePatterns: GrammarPattern[] = [
  {
    id: 'a-wa-b-desu',
    title: 'A は B です',
    pattern: 'N は N です',
    meaning: 'A là B',
    explanation:
      'は (wa) là trợ từ chủ đề (topic marker). Không dịch máy móc "は = là" — は chỉ nêu lên chủ đề đang nói đến, còn です mới xác định danh tính. Câu phủ định: じゃありません.',
    lesson: '1',
    particles: ['は'],
    examples: [
      { japanese: '私は学生です。', reading: 'わたしは がくせいです。', vietnamese: 'Tôi là sinh viên.' },
      { japanese: '私はベトナム人です。', reading: 'わたしは ベトナムじんです。', vietnamese: 'Tôi là người Việt Nam.' },
      { japanese: 'これはカメラです。', reading: 'これは カメラです。', vietnamese: 'Đây là máy ảnh.' },
      { japanese: 'FPT大学は月曜日から土曜日までです。', reading: 'FPTだいがくは げつようびから どようびまでです。', vietnamese: 'Trường FPT từ thứ 2 đến thứ 7.' },
    ],
    commonMistakes: [
      'Dịch は thành "là" rồi bỏ です — sai. Phải có です ở cuối câu.',
      'Nhầm は với が: は = chủ đề đã biết, が = thông tin mới (chưa học ở giai đoạn này).',
    ],
    priority: 'high',
    examPriority: true,
  },
  {
    id: 'a-wa-b-ja-arimasen',
    title: 'A は B じゃありません',
    pattern: 'N は N じゃありません',
    meaning: 'A không phải là B',
    explanation:
      'じゃありません là dạng phủ định của です. Dùng khi phủ nhận danh tính hoặc tư cách. Dạng trang trọng hơn: ではありません.',
    lesson: '1',
    particles: ['は'],
    examples: [
      { japanese: '私は先生じゃありません。', reading: 'わたしは せんせいじゃありません。', vietnamese: 'Tôi không phải là giáo viên.' },
      { japanese: 'これはカメラじゃありません。', reading: 'これは カメラじゃありません。', vietnamese: 'Đây không phải máy ảnh.' },
      { japanese: '私は学生じゃありません。', reading: 'わたしは がくせいじゃありません。', vietnamese: 'Tôi không phải sinh viên.' },
    ],
    commonMistakes: [
      'ではありません cũng đúng nhưng trang trọng hơn じゃありません.',
      'Không dùng: 私はじゃありません学生 — じゃありません phải đứng sau danh từ.',
    ],
    priority: 'high',
    examPriority: true,
  },
  {
    id: 'n1-no-n2',
    title: 'N1 の N2',
    pattern: 'N の N',
    meaning: 'N2 của / thuộc / từ N1',
    explanation:
      'の có nhiều nghĩa tùy context: (1) Sở hữu: 私のペン, (2) Thuộc về/affiliation: FPT大学の学生, (3) Xuất xứ: 日本のカメラ, (4) Thành phần/loại: 牛肉の料理. Nhìn context để xác định nghĩa.',
    lesson: '1',
    particles: ['の'],
    examples: [
      { japanese: '私のペン', reading: 'わたしの ペン', vietnamese: 'Cây bút của tôi (sở hữu)' },
      { japanese: 'FPT大学の学生', reading: 'FPTだいがくの がくせい', vietnamese: 'Sinh viên trường FPT (thuộc về)' },
      { japanese: '日本のカメラ', reading: 'にほんの カメラ', vietnamese: 'Máy ảnh Nhật (xuất xứ)' },
      { japanese: '牛肉の料理', reading: 'ぎゅうにくの りょうり', vietnamese: 'Món ăn từ thịt bò (thành phần)' },
    ],
    commonMistakes: [
      'の không có nghĩa cố định — cần đọc context để xác định nghĩa.',
    ],
    priority: 'high',
    examPriority: true,
  },
  {
    id: 'n1-to-n2',
    title: 'N1 と N2',
    pattern: 'N と N',
    meaning: 'N1 và N2',
    explanation:
      'と nối hai danh từ. Khác với "và" trong câu dài — と chỉ dùng để nối danh từ, không nối mệnh đề hay động từ.',
    lesson: '2',
    particles: ['と'],
    examples: [
      { japanese: 'コーヒーとジュース', reading: 'コーヒーと ジュース', vietnamese: 'Cà phê và nước ép' },
      { japanese: 'ジュースをみっつとコーヒーをふたつください。', reading: 'ジュースを みっつと コーヒーを ふたつ ください。', vietnamese: 'Cho tôi 3 nước ép và 2 cà phê.' },
    ],
    commonMistakes: [
      'と chỉ nối danh từ, không nối mệnh đề hay động từ.',
    ],
    priority: 'normal',
    examPriority: false,
  },
  {
    id: 'n-mo',
    title: 'N も',
    pattern: 'N も ...',
    meaning: 'N cũng ...',
    explanation:
      'も thay thế は để nói "cũng". Dùng khi thông tin mới giống với thông tin đã nói trước. Không dùng は và も cùng lúc.',
    lesson: '1',
    particles: ['も'],
    examples: [
      { japanese: '私は学生です。ナムさんも学生です。', reading: 'わたしは がくせいです。ナムさんも がくせいです。', vietnamese: 'Tôi là sinh viên. Bạn Nam cũng là sinh viên.' },
      { japanese: 'これもカメラです。', reading: 'これも カメラです。', vietnamese: 'Cái này cũng là máy ảnh.' },
    ],
    commonMistakes: [
      '✗ 私はも学生です。— Không dùng は và も cùng lúc. Chọn một trong hai.',
    ],
    priority: 'normal',
  },
];
