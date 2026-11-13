import type { QuestionWordEntry } from './types';

export const questionWords: QuestionWordEntry[] = [
  { id: 'nani',    word: '何',    reading: 'なに / なん', meaning: 'Gì / cái gì',          category: 'vật',       pattern: '何を Vますか',          exampleQ: '何を食べますか。',      exampleA: 'パンを食べます。',   lesson: '3', examPriority: true },
  { id: 'dare',    word: 'だれ',  reading: 'だれ',       meaning: 'Ai',                     category: 'người',     pattern: 'だれですか',            exampleQ: 'だれですか。',          exampleA: 'ナムさんです。',     lesson: '1', examPriority: true },
  { id: 'doko',    word: 'どこ',  reading: 'どこ',       meaning: 'Ở đâu / đi đâu',        category: 'nơi chốn', pattern: 'どこへ Vますか / N はどこですか', exampleQ: 'どこへ行きますか。', exampleA: '学校へ行きます。', lesson: '2', examPriority: true },
  { id: 'dochira', word: 'どちら', reading: 'どちら',    meaning: 'Ở đâu (lịch sự)',       category: 'nơi chốn', pattern: 'おくにはどちらですか',  exampleQ: 'おくにはどちらですか。', exampleA: 'ベトナムです。', lesson: '1' },
  { id: 'dore',    word: 'どれ',  reading: 'どれ',       meaning: 'Cái nào (đứng một mình)', category: 'chọn',   pattern: 'どれですか',            exampleQ: 'どれですか。',          exampleA: 'これです。',         lesson: '2' },
  { id: 'dono',    word: 'どの',  reading: 'どの',       meaning: 'N nào (đi với danh từ)', category: 'chọn',   pattern: 'どの N ですか',         exampleQ: 'どのカメラですか。',   exampleA: 'このカメラです。',   lesson: '2' },
  { id: 'dokono',  word: 'どこの', reading: 'どこの',   meaning: 'Của nước nào / từ đâu',  category: 'xuất xứ', pattern: 'どこの N ですか',       exampleQ: 'どこのカメラですか。', exampleA: '日本のです。',       lesson: '2' },
  { id: 'dareno',  word: 'だれの', reading: 'だれの',   meaning: 'Của ai',                 category: 'sở hữu',  pattern: 'これはだれの N ですか', exampleQ: 'これはだれのかばんですか。', exampleA: 'ナムさんのです。', lesson: '2', examPriority: true },
  { id: 'nanno',   word: '何の',  reading: 'なんの',     meaning: 'Loại gì / N gì',         category: 'loại',   pattern: 'なんの N ですか',       exampleQ: 'なんのカレーですか。', exampleA: 'ぎゅうにくのカレーです。', lesson: '2' },
  { id: 'itsu',    word: 'いつ',  reading: 'いつ',       meaning: 'Khi nào',                category: 'thời gian', pattern: 'いつですか',          exampleQ: '誕生日はいつですか。', exampleA: '三月五日です。',     lesson: '1' },
  { id: 'ikura',   word: 'いくら', reading: 'いくら',   meaning: 'Bao nhiêu tiền',          category: 'giá',    pattern: 'N はいくらですか',      exampleQ: 'このカメラはいくらですか。', exampleA: 'せんえんです。', lesson: '2', examPriority: true },
  { id: 'ikutsu',  word: 'いくつ', reading: 'いくつ',   meaning: 'Bao nhiêu cái',           category: 'số lượng', pattern: 'N はいくつですか',   exampleQ: 'りんごはいくつですか。', exampleA: 'みっつです。',     lesson: '2' },
  { id: 'nansai',  word: '何歳',  reading: 'なんさい',   meaning: 'Bao nhiêu tuổi',          category: 'tuổi',   pattern: '何歳ですか',            exampleQ: '何歳ですか。',          exampleA: 'じゅうきゅうさいです。', lesson: '1', examPriority: true },
  { id: 'nangatsu', word: '何月', reading: 'なんがつ',  meaning: 'Tháng mấy',               category: 'thời gian', pattern: '何月ですか',          exampleQ: '誕生日は何月ですか。', exampleA: 'さんがつです。',     lesson: '1' },
  { id: 'nannichi', word: '何日', reading: 'なんにち',  meaning: 'Ngày mấy',                category: 'thời gian', pattern: '何日ですか',          exampleQ: '誕生日は何日ですか。', exampleA: 'ふつかです。',       lesson: '1' },
  { id: 'nanyoubi', word: '何曜日', reading: 'なんようび', meaning: 'Thứ mấy',             category: 'lịch',   pattern: '何曜日ですか',          exampleQ: '今日は何曜日ですか。', exampleA: 'げつようびです。',   lesson: '3', examPriority: true },
  { id: 'nanji',   word: '何時',  reading: 'なんじ',     meaning: 'Mấy giờ',                category: 'giờ',    pattern: '何時ですか / 何時に Vますか', exampleQ: '今、何時ですか。', exampleA: 'くじです。',       lesson: '3', examPriority: true },
  { id: 'nanpun',  word: '何分',  reading: 'なんぷん',   meaning: 'Mấy phút',               category: 'giờ',    pattern: '何分ですか',            exampleQ: '今、何分ですか。',      exampleA: 'じゅっぷんです。',   lesson: '3' },
  { id: 'nankai',  word: '何階',  reading: 'なんかい',   meaning: 'Tầng mấy',               category: 'nơi chốn', pattern: 'N は何階ですか',      exampleQ: 'レストランは何階ですか。', exampleA: 'さんがいです。', lesson: '2' },
];
