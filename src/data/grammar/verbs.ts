import type { VerbEntry } from './types';

export const verbs: VerbEntry[] = [
  // DAILY ROUTINE
  {
    id: 'okimasu',
    kana: 'おきます',
    kanji: '起きます',
    meaning: 'Thức dậy',
    category: 'daily',
    particles: ['に'],
    affirmative: 'おきます',
    negative: 'おきません',
    examples: [
      { japanese: '七時に起きます。', reading: 'しちじに おきます。', meaning: 'Thức dậy lúc 7 giờ.' },
      { japanese: '毎朝六時に起きます。', reading: 'まいあさ ろくじに おきます。', meaning: 'Mỗi sáng thức dậy lúc 6 giờ.' },
    ],
    questionPatterns: [
      { q: '毎朝、何時に起きますか。', a: '七時に起きます。', vi: 'Mỗi sáng thức dậy lúc mấy giờ? — Thức dậy lúc 7 giờ.' },
    ],
    lesson: '3',
  },
  {
    id: 'nemasu',
    kana: 'ねます',
    kanji: '寝ます',
    meaning: 'Ngủ',
    category: 'daily',
    particles: ['に'],
    affirmative: 'ねます',
    negative: 'ねません',
    examples: [
      { japanese: '十一時に寝ます。', reading: 'じゅういちじに ねます。', meaning: 'Ngủ lúc 11 giờ.' },
    ],
    questionPatterns: [
      { q: '何時に寝ますか。', a: '十一時に寝ます。', vi: 'Ngủ lúc mấy giờ? — Ngủ lúc 11 giờ.' },
    ],
    lesson: '3',
  },
  {
    id: 'hatarakimasu',
    kana: 'はたらきます',
    kanji: '働きます',
    meaning: 'Làm việc',
    category: 'daily',
    particles: ['で'],
    affirmative: 'はたらきます',
    negative: 'はたらきません',
    examples: [
      { japanese: 'コンビニで働きます。', reading: 'コンビニで はたらきます。', meaning: 'Làm việc ở cửa hàng 24h.' },
    ],
    questionPatterns: [
      { q: 'どこで働きますか。', a: 'コンビニで働きます。', vi: 'Làm việc ở đâu? — Làm ở cửa hàng 24h.' },
    ],
    lesson: '3',
  },
  {
    id: 'benkyo-shimasu',
    kana: 'べんきょうします',
    kanji: '勉強します',
    meaning: 'Học',
    category: 'study',
    particles: ['を', 'で'],
    affirmative: 'べんきょうします',
    negative: 'べんきょうしません',
    examples: [
      { japanese: '日本語を勉強します。', reading: 'にほんごを べんきょうします。', meaning: 'Học tiếng Nhật.' },
      { japanese: '図書館で勉強します。', reading: 'としょかんで べんきょうします。', meaning: 'Học ở thư viện.' },
    ],
    questionPatterns: [
      { q: 'どこで勉強しますか。', a: '図書館で勉強します。', vi: 'Học ở đâu? — Học ở thư viện.' },
      { q: '何を勉強しますか。', a: '日本語を勉強します。', vi: 'Học gì? — Học tiếng Nhật.' },
    ],
    lesson: '3',
  },
  // FOOD
  {
    id: 'tabemasu',
    kana: 'たべます',
    kanji: '食べます',
    meaning: 'Ăn',
    category: 'food',
    particles: ['を'],
    affirmative: 'たべます',
    negative: 'たべません',
    examples: [
      { japanese: 'パンを食べます。', reading: 'パンを たべます。', meaning: 'Ăn bánh mì.' },
      { japanese: 'ごはんを食べます。', reading: 'ごはんを たべます。', meaning: 'Ăn cơm.' },
    ],
    questionPatterns: [
      { q: '毎朝、何を食べますか。', a: 'パンを食べます。', vi: 'Mỗi sáng ăn gì? — Ăn bánh mì.' },
    ],
    lesson: '3',
  },
  {
    id: 'nomimasu',
    kana: 'のみます',
    kanji: '飲みます',
    meaning: 'Uống',
    category: 'food',
    particles: ['を'],
    affirmative: 'のみます',
    negative: 'のみません',
    examples: [
      { japanese: 'コーヒーを飲みます。', reading: 'コーヒーを のみます。', meaning: 'Uống cà phê.' },
      { japanese: 'みずを飲みます。', reading: 'みずを のみます。', meaning: 'Uống nước.' },
    ],
    questionPatterns: [
      { q: '何を飲みますか。', a: 'コーヒーを飲みます。', vi: 'Uống gì? — Uống cà phê.' },
    ],
    lesson: '3',
  },
  // MEDIA
  {
    id: 'mimasu',
    kana: 'みます',
    kanji: '見ます',
    meaning: 'Xem',
    category: 'media',
    particles: ['を'],
    affirmative: 'みます',
    negative: 'みません',
    examples: [
      { japanese: 'テレビを見ます。', reading: 'テレビを みます。', meaning: 'Xem TV.' },
    ],
    questionPatterns: [
      { q: '何を見ますか。', a: 'テレビを見ます。', vi: 'Xem gì? — Xem TV.' },
    ],
    lesson: '3',
  },
  {
    id: 'kikimasu',
    kana: 'ききます',
    kanji: '聞きます',
    meaning: 'Nghe',
    category: 'media',
    particles: ['を'],
    affirmative: 'ききます',
    negative: 'ききません',
    examples: [
      { japanese: '音楽を聞きます。', reading: 'おんがくを ききます。', meaning: 'Nghe nhạc.' },
    ],
    questionPatterns: [
      { q: '何を聞きますか。', a: '音楽を聞きます。', vi: 'Nghe gì? — Nghe nhạc.' },
    ],
    lesson: '3',
  },
  {
    id: 'yomimasu',
    kana: 'よみます',
    kanji: '読みます',
    meaning: 'Đọc',
    category: 'media',
    particles: ['を'],
    affirmative: 'よみます',
    negative: 'よみません',
    examples: [
      { japanese: '本を読みます。', reading: 'ほんを よみます。', meaning: 'Đọc sách.' },
      { japanese: '新聞を読みます。', reading: 'しんぶんを よみます。', meaning: 'Đọc báo.' },
    ],
    questionPatterns: [
      { q: '何を読みますか。', a: '本を読みます。', vi: 'Đọc gì? — Đọc sách.' },
    ],
    lesson: '3',
  },
  // SHOPPING
  {
    id: 'kaimasu',
    kana: 'かいます',
    kanji: '買います',
    meaning: 'Mua',
    category: 'shopping',
    particles: ['を', 'で'],
    affirmative: 'かいます',
    negative: 'かいません',
    examples: [
      { japanese: 'りんごを買います。', reading: 'りんごを かいます。', meaning: 'Mua táo.' },
      { japanese: 'スーパーでりんごを買います。', reading: 'スーパーで りんごを かいます。', meaning: 'Mua táo ở siêu thị.' },
    ],
    questionPatterns: [
      { q: 'どこで買いますか。', a: 'スーパーで買います。', vi: 'Mua ở đâu? — Mua ở siêu thị.' },
    ],
    lesson: '3',
  },
  // MOVEMENT
  {
    id: 'ikimasu',
    kana: 'いきます',
    kanji: '行きます',
    meaning: 'Đi',
    category: 'movement',
    particles: ['へ'],
    affirmative: 'いきます',
    negative: 'いきません',
    examples: [
      { japanese: '学校へ行きます。', reading: 'がっこうへ いきます。', meaning: 'Đi đến trường.' },
      { japanese: 'コンビニへ行きます。', reading: 'コンビニへ いきます。', meaning: 'Đi đến cửa hàng 24h.' },
    ],
    questionPatterns: [
      { q: 'どこへ行きますか。', a: '学校へ行きます。', vi: 'Đi đâu? — Đi đến trường.' },
      { q: '日曜日、どこへ行きますか。', a: 'こうえんへ行きます。', vi: 'Chủ nhật đi đâu? — Đi công viên.' },
    ],
    lesson: '3',
  },
  {
    id: 'kimasu',
    kana: 'きます',
    kanji: '来ます',
    meaning: 'Đến',
    category: 'movement',
    particles: ['へ'],
    affirmative: 'きます',
    negative: 'きません',
    examples: [
      { japanese: 'うちへ来ます。', reading: 'うちへ きます。', meaning: 'Đến nhà.' },
    ],
    questionPatterns: [
      { q: 'どこへ来ますか。', a: 'うちへ来ます。', vi: 'Đến đâu? — Đến nhà.' },
    ],
    lesson: '3',
  },
  {
    id: 'kaerimasu',
    kana: 'かえります',
    kanji: '帰ります',
    meaning: 'Về',
    category: 'movement',
    particles: ['へ'],
    affirmative: 'かえります',
    negative: 'かえりません',
    examples: [
      { japanese: 'うちへ帰ります。', reading: 'うちへ かえります。', meaning: 'Về nhà.' },
    ],
    questionPatterns: [
      { q: '何時に帰りますか。', a: '五時に帰ります。', vi: 'Về lúc mấy giờ? — Về lúc 5 giờ.' },
    ],
    lesson: '3',
  },
  // GENERAL
  {
    id: 'shimasu',
    kana: 'します',
    meaning: 'Làm / Chơi',
    category: 'general',
    particles: ['を'],
    affirmative: 'します',
    negative: 'しません',
    examples: [
      { japanese: 'サッカーをします。', reading: 'サッカーを します。', meaning: 'Chơi bóng đá.' },
      { japanese: 'アルバイトをします。', reading: 'アルバイトを します。', meaning: 'Làm thêm.' },
      { japanese: '旅行をします。', reading: 'りょこうを します。', meaning: 'Đi du lịch.' },
    ],
    questionPatterns: [
      { q: '夏休み、旅行をしますか。', a: 'はい、します。', vi: 'Nghỉ hè có đi du lịch không? — Có.' },
      { q: '夏休み、旅行をしますか。', a: 'いいえ、しません。', vi: 'Nghỉ hè có đi du lịch không? — Không.' },
    ],
    lesson: '3',
  },
];
