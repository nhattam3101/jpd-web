import type { ParticleEntry } from './types';

export const particles: ParticleEntry[] = [
  {
    id: 'ha',
    particle: 'は',
    role: 'Topic marker',
    roleVi: 'Trợ từ chủ đề',
    pattern: 'N は ...',
    examples: [
      { japanese: '私は学生です。', reading: 'わたしは がくせいです。', vietnamese: 'Tôi là sinh viên.' },
      { japanese: 'FPT大学は月曜日から土曜日までです。', reading: 'FPTだいがくは げつようびから どようびまでです。', vietnamese: 'Trường FPT từ thứ 2 đến thứ 7.' },
    ],
    commonMistakes: [
      'Đừng dịch は = "là". は chỉ đánh dấu chủ đề, không xác định danh tính — đó là vai trò của です.',
    ],
    miniPractice: [
      { blank: '私___ 学生です。', answer: 'は', full: '私は学生です。', vi: 'Tôi là sinh viên.' },
      { blank: 'これ___ カメラです。', answer: 'は', full: 'これはカメラです。', vi: 'Đây là máy ảnh.' },
      { blank: 'FPT大学___ 月曜日から土曜日までです。', answer: 'は', full: 'FPT大学は月曜日から土曜日までです。', vi: 'Trường FPT từ thứ 2 đến thứ 7.' },
    ],
    lessons: ['1', '2', '3'],
    examPriority: true,
  },
  {
    id: 'no',
    particle: 'の',
    role: 'Possessive / Modifier',
    roleVi: 'Sở hữu / Liên kết danh từ',
    pattern: 'N の N',
    examples: [
      { japanese: '私のペン', reading: 'わたしの ペン', vietnamese: 'Bút của tôi (sở hữu)' },
      { japanese: '日本のカメラ', reading: 'にほんの カメラ', vietnamese: 'Máy ảnh Nhật (xuất xứ)' },
      { japanese: 'FPT大学の学生', reading: 'FPTだいがくの がくせい', vietnamese: 'Sinh viên trường FPT (thuộc về)' },
    ],
    commonMistakes: [
      'の không có nghĩa cố định — cần đọc context: sở hữu, thuộc về, xuất xứ, hay loại.',
    ],
    miniPractice: [
      { blank: '私___ ペン', answer: 'の', full: '私のペン', vi: 'Bút của tôi' },
      { blank: '日本___ カメラ', answer: 'の', full: '日本のカメラ', vi: 'Máy ảnh Nhật' },
    ],
    lessons: ['1', '2'],
    examPriority: true,
  },
  {
    id: 'mo',
    particle: 'も',
    role: 'Inclusive (also)',
    roleVi: 'Cũng (thay thế は)',
    pattern: 'N も ...',
    examples: [
      { japanese: 'ナムさんも学生です。', reading: 'ナムさんも がくせいです。', vietnamese: 'Nam cũng là sinh viên.' },
      { japanese: 'これもカメラです。', reading: 'これも カメラです。', vietnamese: 'Cái này cũng là máy ảnh.' },
    ],
    commonMistakes: [
      'も thay thế は, không dùng hai cái cùng lúc: ✗ 私はも学生です。',
    ],
    miniPractice: [
      { blank: 'ナムさん___ 学生です。', answer: 'も', full: 'ナムさんも学生です。', vi: 'Nam cũng là sinh viên.' },
    ],
    lessons: ['1'],
  },
  {
    id: 'to',
    particle: 'と',
    role: 'And (nouns only)',
    roleVi: 'Và (nối danh từ)',
    pattern: 'N と N',
    examples: [
      { japanese: 'コーヒーとジュース', reading: 'コーヒーと ジュース', vietnamese: 'Cà phê và nước ép' },
      { japanese: 'ジュースをみっつとコーヒーをふたつください。', reading: 'ジュースを みっつと コーヒーを ふたつ ください。', vietnamese: 'Cho 3 nước ép và 2 cà phê.' },
    ],
    commonMistakes: [
      'と chỉ nối danh từ, không nối mệnh đề hay động từ.',
    ],
    miniPractice: [
      { blank: 'コーヒー___ ジュース', answer: 'と', full: 'コーヒーとジュース', vi: 'Cà phê và nước ép' },
    ],
    lessons: ['2'],
  },
  {
    id: 'wo',
    particle: 'を',
    role: 'Object marker',
    roleVi: 'Trợ từ tân ngữ (object)',
    pattern: 'N を Vます',
    examples: [
      { japanese: 'ごはんを食べます。', reading: 'ごはんを たべます。', vietnamese: 'Ăn cơm.' },
      { japanese: 'コーヒーを飲みます。', reading: 'コーヒーを のみます。', vietnamese: 'Uống cà phê.' },
      { japanese: '本を読みます。', reading: 'ほんを よみます。', vietnamese: 'Đọc sách.' },
      { japanese: '日本語を勉強します。', reading: 'にほんごを べんきょうします。', vietnamese: 'Học tiếng Nhật.' },
    ],
    commonMistakes: [
      'Nhầm を với は: を chỉ đối tượng của hành động, は là chủ đề.',
      '✗ パンは食べます。(dùng を mới đúng khi ăn là hành động chính)',
    ],
    miniPractice: [
      { blank: 'パン___ 食べます。', answer: 'を', full: 'パンを食べます。', vi: 'Ăn bánh mì.' },
      { blank: 'コーヒー___ 飲みます。', answer: 'を', full: 'コーヒーを飲みます。', vi: 'Uống cà phê.' },
      { blank: '日本語___ 勉強します。', answer: 'を', full: '日本語を勉強します。', vi: 'Học tiếng Nhật.' },
    ],
    lessons: ['3'],
    examPriority: true,
  },
  {
    id: 'ni',
    particle: 'に',
    role: 'Time point',
    roleVi: 'Thời điểm xảy ra hành động',
    pattern: 'TIME に Vます',
    examples: [
      { japanese: '七時に起きます。', reading: 'しちじに おきます。', vietnamese: 'Thức dậy lúc 7 giờ.' },
      { japanese: '九時に寝ます。', reading: 'くじに ねます。', vietnamese: 'Ngủ lúc 9 giờ.' },
    ],
    compare: [
      { particle: 'で', example: '図書館で勉強します。', vi: 'Học ở thư viện. (địa điểm hành động)' },
    ],
    commonMistakes: [
      'に chỉ dùng với thời điểm cụ thể (giờ, ngày, tháng). KHÔNG dùng に với まいにち、まいあさ、いつ.',
    ],
    miniPractice: [
      { blank: '七時___ 起きます。', answer: 'に', full: '七時に起きます。', vi: 'Thức dậy lúc 7 giờ.' },
      { blank: '九時___ 寝ます。', answer: 'に', full: '九時に寝ます。', vi: 'Ngủ lúc 9 giờ.' },
    ],
    lessons: ['3'],
    examPriority: true,
  },
  {
    id: 'e',
    particle: 'へ',
    role: 'Direction / Destination',
    roleVi: 'Hướng tới nơi (di chuyển)',
    pattern: 'PLACE へ 行きます / 来ます / 帰ります',
    examples: [
      { japanese: '学校へ行きます。', reading: 'がっこうへ いきます。', vietnamese: 'Đi đến trường.' },
      { japanese: 'うちへ帰ります。', reading: 'うちへ かえります。', vietnamese: 'Về nhà.' },
      { japanese: 'コンビニへ行きます。', reading: 'コンビニへ いきます。', vietnamese: 'Đi đến cửa hàng 24h.' },
    ],
    compare: [
      { particle: 'で', example: '学校で勉強します。', vi: 'Học ở trường. (nơi hành động diễn ra)' },
    ],
    commonMistakes: [
      'へ = hướng tới nơi. で = hành động diễn ra tại nơi.',
      '✗ 学校へ勉強します。— Học không phải động từ di chuyển, phải dùng で.',
    ],
    miniPractice: [
      { blank: '学校___ 行きます。', answer: 'へ', full: '学校へ行きます。', vi: 'Đi đến trường.' },
      { blank: 'うち___ 帰ります。', answer: 'へ', full: 'うちへ帰ります。', vi: 'Về nhà.' },
    ],
    lessons: ['3'],
    examPriority: true,
  },
  {
    id: 'de',
    particle: 'で',
    role: 'Location of action',
    roleVi: 'Nơi diễn ra hành động',
    pattern: 'PLACE で ACTION',
    examples: [
      { japanese: '図書館で本を読みます。', reading: 'としょかんで ほんを よみます。', vietnamese: 'Đọc sách ở thư viện.' },
      { japanese: 'コンビニでアルバイトをします。', reading: 'コンビニで アルバイトを します。', vietnamese: 'Làm thêm ở cửa hàng 24h.' },
      { japanese: 'レストランでごはんを食べます。', reading: 'レストランで ごはんを たべます。', vietnamese: 'Ăn cơm ở nhà hàng.' },
    ],
    compare: [
      { particle: 'へ', example: '学校へ行きます。', vi: 'Đi đến trường. (hướng tới)' },
    ],
    commonMistakes: [
      'Nhầm で với へ: で = tại nơi đó làm gì, へ = di chuyển đến nơi đó.',
      '✗ 図書館へ本を読みます。— Đọc sách diễn ra tại thư viện → phải dùng で.',
    ],
    miniPractice: [
      { blank: '図書館___ 本を読みます。', answer: 'で', full: '図書館で本を読みます。', vi: 'Đọc sách ở thư viện.' },
      { blank: 'コンビニ___ アルバイトをします。', answer: 'で', full: 'コンビニでアルバイトをします。', vi: 'Làm thêm ở cửa hàng 24h.' },
      { blank: '学校___ 日本語を勉強します。', answer: 'で', full: '学校で日本語を勉強します。', vi: 'Học tiếng Nhật ở trường.' },
    ],
    lessons: ['3'],
    examPriority: true,
  },
  {
    id: 'kara-made',
    particle: 'から / まで',
    role: 'From / Until (range)',
    roleVi: 'Từ ... đến ...',
    pattern: 'N から N まで',
    examples: [
      { japanese: '月曜日から金曜日まで', reading: 'げつようびから きんようびまで', vietnamese: 'Từ thứ 2 đến thứ 6' },
      { japanese: '九時から十二時まで', reading: 'くじから じゅうにじまで', vietnamese: 'Từ 9h đến 12h' },
      { japanese: '学校は八時から五時までです。', reading: 'がっこうは はちじから ごじまでです。', vietnamese: 'Trường từ 8h đến 5h.' },
    ],
    commonMistakes: [
      'から và まで thường đi cùng nhau nhưng có thể dùng độc lập.',
      'Hỏi: 何時から何時までですか。→ [giờ]から[giờ]までです。',
    ],
    miniPractice: [
      { blank: '月曜日___ 金曜日まで', answer: 'から', full: '月曜日から金曜日まで', vi: 'Từ thứ 2 đến thứ 6' },
      { blank: '九時から十二時___', answer: 'まで', full: '九時から十二時まで', vi: 'Từ 9h đến 12h' },
    ],
    lessons: ['3'],
    examPriority: true,
  },
  {
    id: 'ka',
    particle: 'か',
    role: 'Question marker',
    roleVi: 'Trợ từ nghi vấn (câu hỏi)',
    pattern: '... か。',
    examples: [
      { japanese: '学生ですか。', reading: 'がくせいですか。', vietnamese: 'Có phải sinh viên không?' },
      { japanese: '何を食べますか。', reading: 'なにを たべますか。', vietnamese: 'Ăn gì?' },
      { japanese: '何時ですか。', reading: 'なんじですか。', vietnamese: 'Mấy giờ?' },
    ],
    commonMistakes: [
      'Tiếng Nhật không dùng dấu ? khi đã có か. Dùng か là đủ.',
    ],
    miniPractice: [
      { blank: '学生です___。', answer: 'か', full: '学生ですか。', vi: 'Có phải sinh viên không?' },
      { blank: '何を食べます___。', answer: 'か', full: '何を食べますか。', vi: 'Ăn gì?' },
    ],
    lessons: ['1', '2', '3'],
  },
];
