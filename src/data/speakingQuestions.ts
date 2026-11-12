import { SpeakingQuestion } from '../types';

export const speakingQuestions: SpeakingQuestion[] = [
  // ==========================================
  // PART 1: IMAGE QUESTIONS (26 câu tranh)
  // ==========================================
  {
    id: 'sq_img_01',
    lesson: '2.3',
    type: 'image',
    category: 'Gọi món (ごちゅうもん)',
    question: 'ごちゅうもんは？',
    visual: {
      kind: 'emoji',
      content: '🍛🍛  🥤🥤🥤'
    },
    image: '🍛🍛  🥤🥤🥤',
    expectedAnswers: [
      'カレーをふたつとジュースをみっつください。',
      'カレー２つとジュース３つおねがいします。'
    ],
    vietnameseMeaning: 'Quý khách muốn gọi món gì ạ? → Cho tôi 2 phần cà ri và 3 ly nước ép.'
  },
  {
    id: 'sq_img_02',
    lesson: '2.3',
    type: 'image',
    category: 'Gọi món (ごちゅうもん)',
    question: 'ごちゅうもんは？',
    visual: {
      kind: 'emoji',
      content: '☕☕☕  🥪🥪'
    },
    image: '☕☕☕  🥪🥪',
    expectedAnswers: [
      'コーヒーをみっつとサンドイッチをふたつください。',
      'コーヒー３つとサンドイッチ２つおねがいします。'
    ],
    vietnameseMeaning: 'Quý khách muốn gọi món gì ạ? → Cho tôi 3 ly cà phê và 2 phần bánh mì kẹp.'
  },
  {
    id: 'sq_img_03',
    lesson: '2.3',
    type: 'image',
    category: 'Gọi món (ごちゅうもん)',
    question: 'ごちゅうもんは？',
    visual: {
      kind: 'emoji',
      content: '🍜  🍦'
    },
    image: '🍜  🍦',
    expectedAnswers: [
      'ラーメンをひとつとアイスクリームをひとつください。',
      'ラーメン１つとアイスクリーム１つおねがいします。'
    ],
    vietnameseMeaning: 'Quý khách gọi món gì? → Cho tôi 1 tô ramen và 1 cây kem.'
  },
  {
    id: 'sq_img_04',
    lesson: '2.3',
    type: 'image',
    category: 'Gọi món (ごちゅうもん)',
    question: 'ごちゅうもんは？',
    visual: {
      kind: 'emoji',
      content: '🍕🍕🍕🍕  🥤🥤'
    },
    image: '🍕🍕🍕🍕  🥤🥤',
    expectedAnswers: [
      'ピザをよっつとコーラをふたつください。',
      'ピザをよっつとジュースをふたつください。'
    ],
    vietnameseMeaning: 'Quý khách gọi món gì? → Cho tôi 4 bánh pizza và 2 phần nước ngọt.'
  },
  {
    id: 'sq_img_05',
    lesson: '2.3',
    type: 'image',
    category: 'Gọi món (ごちゅうもん)',
    question: 'ごちゅうもんは？',
    visual: {
      kind: 'emoji',
      content: '🍱  🍵'
    },
    image: '🍱  🍵',
    expectedAnswers: [
      'おべんとうをひとつとおちゃをひとつください。',
      'おべんとう１つとおちゃ１つおねがいします。'
    ],
    vietnameseMeaning: 'Quý khách dùng gì? → Cho tôi 1 phần cơm hộp và 1 tách trà.'
  },
  {
    id: 'sq_img_06',
    lesson: '2.2',
    type: 'image',
    category: 'Hỏi giá tiền (いくら)',
    question: 'このかばんはいくらですか。',
    visual: {
      kind: 'text',
      content: '👜\n【 ¥3,500 】'
    },
    image: '👜\n【 ¥3,500 】',
    expectedAnswers: [
      'さんぜんごひゃくえんです。',
      '3500えんです。'
    ],
    vietnameseMeaning: 'Chiếc cặp này giá bao nhiêu tiền? → 3,500 yên.'
  },
  {
    id: 'sq_img_07',
    lesson: '2.2',
    type: 'image',
    category: 'Hỏi giá tiền (いくら)',
    question: 'このカメラはいくらですか。',
    visual: {
      kind: 'text',
      content: '📷\n【 ¥28,000 】'
    },
    image: '📷\n【 ¥28,000 】',
    expectedAnswers: [
      'にまんはっせんえんです。',
      '28,000えんです。'
    ],
    vietnameseMeaning: 'Máy ảnh này giá bao nhiêu tiền? → 28,000 yên.'
  },
  {
    id: 'sq_img_08',
    lesson: '2.2',
    type: 'image',
    category: 'Hỏi giá tiền (いくら)',
    question: 'このくつはいくらですか。',
    visual: {
      kind: 'text',
      content: '👞\n【 ¥8,000 】'
    },
    image: '👞\n【 ¥8,000 】',
    expectedAnswers: [
      'はっせんえんです。',
      '8000えんです。'
    ],
    vietnameseMeaning: 'Đôi giày này bao nhiêu tiền? → 8,000 yên.'
  },
  {
    id: 'sq_img_09',
    lesson: '2.2',
    type: 'image',
    category: 'Hỏi giá tiền (いくら)',
    question: 'このほんはいくらですか。',
    visual: {
      kind: 'text',
      content: '📖\n【 ¥1,200 】'
    },
    image: '📖\n【 ¥1,200 】',
    expectedAnswers: [
      'せんにひゃくえんです。',
      '1200えんです。'
    ],
    vietnameseMeaning: 'Quyển sách này giá bao nhiêu? → 1,200 yên.'
  },
  {
    id: 'sq_img_10',
    lesson: '2.2',
    type: 'image',
    category: 'Hỏi giá tiền (いくら)',
    question: 'このパソコンはいくらですか。',
    visual: {
      kind: 'text',
      content: '💻\n【 ¥95,000 】'
    },
    image: '💻\n【 ¥95,000 】',
    expectedAnswers: [
      'きゅうまんごせんえんです。',
      '95000えんです。'
    ],
    vietnameseMeaning: 'Chiếc máy tính này bao nhiêu tiền? → 95,000 yên.'
  },
  {
    id: 'sq_img_11',
    lesson: '2.1',
    type: 'image',
    category: 'Đồ vật (これは何ですか)',
    question: 'これは何ですか。',
    visual: {
      kind: 'emoji',
      content: '⌚'
    },
    image: '⌚',
    expectedAnswers: [
      'とけいです。',
      'これはとけいです。'
    ],
    vietnameseMeaning: 'Đây là cái gì? → Đó là đồng hồ.'
  },
  {
    id: 'sq_img_12',
    lesson: '2.1',
    type: 'image',
    category: 'Đồ vật (これは何ですか)',
    question: 'これは何ですか。',
    visual: {
      kind: 'text',
      content: '📚\n【 電子辞書 】'
    },
    image: '📚\n【 電子辞書 】',
    expectedAnswers: [
      'でんしじしょです。',
      'それはでんしじしょです。'
    ],
    vietnameseMeaning: 'Đây là cái gì? → Đó là kim từ điển.'
  },
  {
    id: 'sq_img_13',
    lesson: '2.1',
    type: 'image',
    category: 'Đồ vật (これは何ですか)',
    question: 'これは何ですか。',
    visual: {
      kind: 'emoji',
      content: '📱'
    },
    image: '📱',
    expectedAnswers: [
      'けいたいでんわです。',
      'スマホです。',
      'それはけいたいでんわです。'
    ],
    vietnameseMeaning: 'Đây là cái gì? → Đó là điện thoại di động.'
  },
  {
    id: 'sq_img_14',
    lesson: '2.1',
    type: 'image',
    category: 'Đồ vật (これは何ですか)',
    question: 'これは何ですか。',
    visual: {
      kind: 'emoji',
      content: '🌂'
    },
    image: '🌂',
    expectedAnswers: [
      'かさです。',
      'それはかさです。'
    ],
    vietnameseMeaning: 'Đây là cái gì? → Đó là chiếc dù (cây ô).'
  },
  {
    id: 'sq_img_15',
    lesson: '2.1',
    type: 'image',
    category: 'Vị trí tầng (何階)',
    question: 'ほんやは何階ですか。',
    visual: {
      kind: 'text',
      content: '🏢\n【 3F: 📚 本屋 】'
    },
    image: '🏢\n【 3F: 📚 本屋 】',
    expectedAnswers: [
      'さんがいです。',
      '三階です。',
      'さんかいです。'
    ],
    vietnameseMeaning: 'Tiệm sách ở tầng mấy? → Ở tầng 3.'
  },
  {
    id: 'sq_img_16',
    lesson: '2.1',
    type: 'image',
    category: 'Vị trí tầng (何階)',
    question: 'くつやは何階ですか。',
    visual: {
      kind: 'text',
      content: '🏢\n【 1F: 👞 靴屋 】'
    },
    image: '🏢\n【 1F: 👞 靴屋 】',
    expectedAnswers: [
      'いっかいです。',
      '一階です。'
    ],
    vietnameseMeaning: 'Tiệm giày ở tầng mấy? → Ở tầng 1.'
  },
  {
    id: 'sq_img_17',
    lesson: '2.1',
    type: 'image',
    category: 'Vị trí tầng (何階)',
    question: 'ひゃくえんショップは何階ですか。',
    visual: {
      kind: 'text',
      content: '🏢\n【 B1F: 🪙 100円ショップ 】'
    },
    image: '🏢\n【 B1F: 🪙 100円ショップ 】',
    expectedAnswers: [
      'ちかいっかいです。',
      '地下1階です。'
    ],
    vietnameseMeaning: 'Cửa hàng 100 yên ở tầng mấy? → Ở tầng hầm 1.'
  },
  {
    id: 'sq_img_18',
    lesson: '2.1',
    type: 'image',
    category: 'Vị trí tầng (何階)',
    question: 'トイレは何階ですか。',
    visual: {
      kind: 'text',
      content: '🏢\n【 2F: 🚻 トイレ 】'
    },
    image: '🏢\n【 2F: 🚻 トイレ 】',
    expectedAnswers: [
      'にかいです。',
      '二階です。'
    ],
    vietnameseMeaning: 'Nhà vệ sinh ở tầng mấy? → Ở tầng 2.'
  },
  {
    id: 'sq_img_19',
    lesson: '3.1',
    type: 'image',
    category: 'Hỏi giờ (今何時)',
    question: '今何時ですか。',
    visual: {
      kind: 'text',
      content: '🕒\n【 3:00 】'
    },
    image: '🕒\n【 3:00 】',
    expectedAnswers: [
      'さんじです。',
      '午後3時です。',
      '3時です。'
    ],
    vietnameseMeaning: 'Bây giờ là mấy giờ? → 3 giờ đúng.'
  },
  {
    id: 'sq_img_20',
    lesson: '3.1',
    type: 'image',
    category: 'Hỏi giờ (今何時)',
    question: '今何時ですか。',
    visual: {
      kind: 'text',
      content: '🕢\n【 7:30 】'
    },
    image: '🕢\n【 7:30 】',
    expectedAnswers: [
      'しちじはんです。',
      'しちじさんじゅっぷんです。',
      '7時半です。'
    ],
    vietnameseMeaning: 'Bây giờ là mấy giờ? → 7 giờ rưỡi (7 giờ 30 phút).'
  },
  {
    id: 'sq_img_21',
    lesson: '3.1',
    type: 'image',
    category: 'Hỏi giờ (今何時)',
    question: '今何時ですか。',
    visual: {
      kind: 'text',
      content: '🕤\n【 9:15 】'
    },
    image: '🕤\n【 9:15 】',
    expectedAnswers: [
      'くじじゅうごふんです。',
      '9時15分です。'
    ],
    vietnameseMeaning: 'Bây giờ là mấy giờ? → 9 giờ 15 phút.'
  },
  {
    id: 'sq_img_22',
    lesson: '1.2',
    type: 'image',
    category: 'Ngày tháng (何月何日)',
    question: '今日は何月何日ですか。',
    visual: {
      kind: 'text',
      content: '📅\n【 10月10日 】'
    },
    image: '📅\n【 10月10日 】',
    expectedAnswers: [
      'じゅうがつとおかです。',
      '10月10日です。'
    ],
    vietnameseMeaning: 'Hôm nay là ngày mấy tháng mấy? → Ngày 10 tháng 10.'
  },
  {
    id: 'sq_img_23',
    lesson: '1.2',
    type: 'image',
    category: 'Ngày tháng (何月何日)',
    question: '今日は何月何日ですか。',
    visual: {
      kind: 'text',
      content: '📅\n【 3月5日 】'
    },
    image: '📅\n【 3月5日 】',
    expectedAnswers: [
      'さんがついつかです。',
      '3月5日です。'
    ],
    vietnameseMeaning: 'Hôm nay là ngày mấy tháng mấy? → Ngày 5 tháng 3.'
  },
  {
    id: 'sq_img_24',
    lesson: '1.2',
    type: 'image',
    category: 'Ngày tháng (何月何日)',
    question: '誕生日は何月何日ですか。',
    visual: {
      kind: 'text',
      content: '🎂\n【 12月25日 】'
    },
    image: '🎂\n【 12月25日 】',
    expectedAnswers: [
      'じゅうにがつにじゅうごにちです。',
      '12月25日です。'
    ],
    vietnameseMeaning: 'Sinh nhật là ngày mấy tháng mấy? → Ngày 25 tháng 12.'
  },
  {
    id: 'sq_img_25',
    lesson: '2.3',
    type: 'image',
    category: 'Đếm đồ vật (いくつ)',
    question: 'りんごがいくつありますか。',
    visual: {
      kind: 'emoji',
      content: '🍎🍎🍎🍎'
    },
    image: '🍎🍎🍎🍎',
    expectedAnswers: [
      'よっつです。',
      'よっつあります。',
      '4つです。'
    ],
    vietnameseMeaning: 'Có bao nhiêu quả táo? → Có 4 quả.'
  },
  {
    id: 'sq_img_26',
    lesson: '2.3',
    type: 'image',
    category: 'Đếm đồ vật (いくつ)',
    question: 'たまごがいくつありますか。',
    visual: {
      kind: 'emoji',
      content: '🥚🥚🥚🥚🥚🥚'
    },
    image: '🥚🥚🥚🥚🥚🥚',
    expectedAnswers: [
      'むっつです。',
      'むっつあります。',
      '6つです。'
    ],
    vietnameseMeaning: 'Có bao nhiêu quả trứng? → Có 6 quả.'
  },

  // ==========================================
  // PART 2: DIRECT QUESTIONS (26 câu vấn đáp trực tiếp)
  // ==========================================
  {
    id: 'sq_dir_01',
    lesson: '1.1',
    type: 'direct',
    category: 'Thông tin cá nhân',
    question: 'お名前は？',
    expectedAnswers: [
      'わたしはナムです。',
      'ナムです。',
      'タムです。'
    ],
    vietnameseMeaning: 'Bạn tên là gì? → Tôi là Nam.'
  },
  {
    id: 'sq_dir_02',
    lesson: '1.1',
    type: 'direct',
    category: 'Thông tin cá nhân',
    question: 'お国はどちらですか。',
    expectedAnswers: [
      'ベトナムです。',
      'くに（国）はベトナムです。'
    ],
    vietnameseMeaning: 'Đất nước của bạn ở đâu (quê bạn ở đâu)? → Là Việt Nam.'
  },
  {
    id: 'sq_dir_03',
    lesson: '1.1',
    type: 'direct',
    category: 'Thông tin cá nhân',
    question: '何人（なにじん）ですか。',
    expectedAnswers: [
      'ベトナムじんです。',
      'わたしはベトナムじんです。'
    ],
    vietnameseMeaning: 'Bạn là người nước nào? → Tôi là người Việt Nam.'
  },
  {
    id: 'sq_dir_04',
    lesson: '1.1',
    type: 'direct',
    category: 'Thông tin cá nhân',
    question: '何歳ですか。',
    expectedAnswers: [
      'はたちです。',
      'じゅうきゅうさいです。',
      'にじゅっさいです。'
    ],
    vietnameseMeaning: 'Bạn bao nhiêu tuổi? → Tôi 20 tuổi (hoặc 19 tuổi).'
  },
  {
    id: 'sq_dir_05',
    lesson: '1.1',
    type: 'direct',
    category: 'Nghề nghiệp',
    question: '学生ですか、会社員ですか。',
    expectedAnswers: [
      '学生です。',
      'がくせいです。',
      'FPT大学の学生です。'
    ],
    vietnameseMeaning: 'Bạn là học sinh sinh viên hay nhân viên công ty? → Tôi là sinh viên.'
  },
  {
    id: 'sq_dir_06',
    lesson: '1.2',
    type: 'direct',
    category: 'Ngày tháng & Sinh nhật',
    question: '誕生日はいつですか。',
    expectedAnswers: [
      'さんがついつかです。',
      'じゅうがつとおかです。',
      'いちがつじゅうにちにちです。'
    ],
    vietnameseMeaning: 'Sinh nhật của bạn là khi nào? → Là ngày 5 tháng 3 (trả lời ngày sinh của bạn).'
  },
  {
    id: 'sq_dir_07',
    lesson: '1.2',
    type: 'direct',
    category: 'Ngày tháng & Sinh nhật',
    question: '何月何日ですか。',
    expectedAnswers: [
      'さんがついつかです。',
      'きょうはさんがついつかです。'
    ],
    vietnameseMeaning: 'Là ngày mấy tháng mấy? → Là ngày 5 tháng 3.'
  },
  {
    id: 'sq_dir_08',
    lesson: '1.3',
    type: 'direct',
    category: 'Sở thích (しゅみ)',
    question: '趣味は何ですか。',
    expectedAnswers: [
      'サッカーです。',
      'おんがくです。',
      'えいがです。',
      'りょこうです。',
      'わたしのしゅみはサッカーです。'
    ],
    vietnameseMeaning: 'Sở thích của bạn là gì? → Sở thích của tôi là bóng đá / nghe nhạc / xem phim.'
  },
  {
    id: 'sq_dir_09',
    lesson: '2.1',
    type: 'direct',
    category: 'Hỏi vị trí',
    question: '教室はどこですか。',
    expectedAnswers: [
      'にかいです。',
      'あそこです。',
      'ここです。'
    ],
    vietnameseMeaning: 'Phòng học ở đâu vậy? → Ở tầng 2 / Ở đằng kia.'
  },
  {
    id: 'sq_dir_10',
    lesson: '2.1',
    type: 'direct',
    category: 'Hỏi vị trí',
    question: 'トイレはどこですか。',
    expectedAnswers: [
      'あそこです。',
      'いっかいです。',
      'そこです。'
    ],
    vietnameseMeaning: 'Nhà vệ sinh ở đâu? → Ở đằng kia / Ở tầng 1.'
  },
  {
    id: 'sq_dir_11',
    lesson: '2.1',
    type: 'direct',
    category: 'Hỏi vị trí lịch sự',
    question: '事務所はどちらですか。',
    expectedAnswers: [
      'あちらです。',
      'さんかいです。',
      'こちらです。'
    ],
    vietnameseMeaning: 'Văn phòng ở hướng nào ạ? → Ở phía đằng kia / Ở tầng 3 ạ.'
  },
  {
    id: 'sq_dir_12',
    lesson: '2.2',
    type: 'direct',
    category: 'Sở hữu (誰の)',
    question: 'これは誰のかばんですか。',
    expectedAnswers: [
      'わたしの（かばん）です。',
      'たなかさんの（かばん）です。',
      'せんせいの（かばん）です。'
    ],
    vietnameseMeaning: 'Đây là chiếc cặp của ai? → Là của tôi / Là của anh Tanaka.'
  },
  {
    id: 'sq_dir_13',
    lesson: '2.2',
    type: 'direct',
    category: 'Xuất xứ (どこの)',
    question: 'これはどこのカメラですか。',
    expectedAnswers: [
      'にほんのカメラです。',
      'ベトナムのカメラです。',
      'ソニーのカメラです。'
    ],
    vietnameseMeaning: 'Đây là máy ảnh của nước nào/hãng nào? → Là máy ảnh của Nhật Bản.'
  },
  {
    id: 'sq_dir_14',
    lesson: '3.1',
    type: 'direct',
    category: 'Hỏi thời gian',
    question: '今何時ですか。',
    expectedAnswers: [
      'くじです。',
      'じゅうじはんです。',
      'さんじです。'
    ],
    vietnameseMeaning: 'Bây giờ là mấy giờ? → Bây giờ là 9 giờ / 10 giờ rưỡi.'
  },
  {
    id: 'sq_dir_15',
    lesson: '3.1',
    type: 'direct',
    category: 'Thứ trong tuần',
    question: '今日は何曜日ですか。',
    expectedAnswers: [
      'きんようびです。',
      'げつようびです。',
      'すいようびです。',
      'どようびです。'
    ],
    vietnameseMeaning: 'Hôm nay là thứ mấy? → Hôm nay là thứ sáu (hoặc thứ tương ứng).'
  },
  {
    id: 'sq_dir_16',
    lesson: '3.1',
    type: 'direct',
    category: 'Thứ trong tuần',
    question: '明日は何曜日ですか。',
    expectedAnswers: [
      'どようびです。',
      'にちようびです。',
      'かようびです。'
    ],
    vietnameseMeaning: 'Ngày mai là thứ mấy? → Ngày mai là thứ bảy.'
  },
  {
    id: 'sq_dir_17',
    lesson: '3.1',
    type: 'direct',
    category: 'Lịch trình (から〜まで)',
    question: '日本語の授業は何時から何時までですか。',
    expectedAnswers: [
      'はちじからじゅういちじはんまでです。',
      '8時から11時半までです。'
    ],
    vietnameseMeaning: 'Tiết học tiếng Nhật từ mấy giờ đến mấy giờ? → Từ 8 giờ đến 11 giờ rưỡi.'
  },
  {
    id: 'sq_dir_18',
    lesson: '3.1',
    type: 'direct',
    category: 'Lịch trình (から〜まで)',
    question: '銀行は何時から何時までですか。',
    expectedAnswers: [
      'くじからごじまでです。',
      '9時から5時までです。'
    ],
    vietnameseMeaning: 'Ngân hàng mở cửa từ mấy giờ đến mấy giờ? → Từ 9 giờ sáng đến 5 giờ chiều.'
  },
  {
    id: 'sq_dir_19',
    lesson: '3.1',
    type: 'direct',
    category: 'Ngày nghỉ (やすみ)',
    question: '大学の休みは何曜日ですか。',
    expectedAnswers: [
      'どようびとにちようびです。',
      '土曜日と日曜日です。'
    ],
    vietnameseMeaning: 'Ngày nghỉ của trường đại học là thứ mấy? → Là thứ bảy và chủ nhật.'
  },
  {
    id: 'sq_dir_20',
    lesson: '3.2',
    type: 'direct',
    category: 'Thói quen hằng ngày',
    question: '毎朝何時に起きますか。',
    expectedAnswers: [
      'ろくじにおきます。',
      'しちじにおきます。',
      '6時におきます。'
    ],
    vietnameseMeaning: 'Mỗi sáng bạn thức dậy lúc mấy giờ? → Tôi thức dậy lúc 6 giờ sáng.'
  },
  {
    id: 'sq_dir_21',
    lesson: '3.2',
    type: 'direct',
    category: 'Thói quen hằng ngày',
    question: '毎晩何時に寝ますか。',
    expectedAnswers: [
      'じゅういちじにねます。',
      'じゅうにじにねます。',
      '11時にねます。'
    ],
    vietnameseMeaning: 'Mỗi tối bạn đi ngủ lúc mấy giờ? → Tôi đi ngủ lúc 11 giờ đêm.'
  },
  {
    id: 'sq_dir_22',
    lesson: '3.2',
    type: 'direct',
    category: 'Ăn uống (何をたべますか)',
    question: '朝ごはんに何を食べますか。',
    expectedAnswers: [
      'パンをたべます。',
      'ごはんをたべます。',
      'なにもたべません。'
    ],
    vietnameseMeaning: 'Bữa sáng bạn ăn gì? → Tôi ăn bánh mì / ăn cơm.'
  },
  {
    id: 'sq_dir_23',
    lesson: '3.2',
    type: 'direct',
    category: 'Ăn uống (何をのみますか)',
    question: '昼休みに何を飲みますか。',
    expectedAnswers: [
      'おちゃをのみます。',
      'コーヒーをのみます。',
      'みずをのみます。'
    ],
    vietnameseMeaning: 'Giờ nghỉ trưa bạn uống gì? → Tôi uống trà / cà phê / nước lọc.'
  },
  {
    id: 'sq_dir_24',
    lesson: '3.3',
    type: 'direct',
    category: 'Đi lại (どこへ行きますか)',
    question: '週末はどこへ行きますか。',
    expectedAnswers: [
      'スーパーへいきます。',
      'まちへいきます。',
      'どこへもいきません。うちでやすみます。'
    ],
    vietnameseMeaning: 'Cuối tuần bạn đi đâu? → Tôi đi siêu thị / lên phố / ở nhà nghỉ ngơi.'
  },
  {
    id: 'sq_dir_25',
    lesson: '3.2',
    type: 'direct',
    category: 'Hành động ở địa điểm',
    question: '図書館で何をしますか。',
    expectedAnswers: [
      'べんきょうします。',
      'ほんをよみます。',
      'にほんごをべんきょうします。'
    ],
    vietnameseMeaning: 'Bạn làm gì ở thư viện? → Tôi học bài / đọc sách.'
  },
  {
    id: 'sq_dir_26',
    lesson: '3.3',
    type: 'direct',
    category: 'Phương tiện đi lại',
    question: '何で大学へ行きますか。',
    expectedAnswers: [
      'バスでいきます。',
      'バイクでいきます。',
      'あるいていきます。'
    ],
    vietnameseMeaning: 'Bạn đến trường đại học bằng phương tiện gì? → Tôi đi bằng xe buýt / xe máy / đi bộ.'
  }
];

