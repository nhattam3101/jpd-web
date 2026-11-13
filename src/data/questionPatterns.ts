import { allLessonCards } from './vocabulary';
import { speakingQuestionSeeds } from './speakingQuestionSeeds';
import type { SpeakingQuestion } from '../types';

export type PatternExample = { question: string; answer: string; meaning?: string; visual?: string; vocabularyIds: string[]; seed?: SpeakingQuestion };
export type QuestionPattern = {
  id: string; lesson: string; category: string; pattern: string; meaning: string;
  questionWord: string; answerPattern: string; difficulty: SpeakingQuestion['difficulty'];
  group: SpeakingQuestion['group']; examples: PatternExample[];
};

type Spec = Omit<QuestionPattern, 'examples'>;
const specs: Spec[] = [
  {id:'identify',lesson:'2',category:'Nhận diện đồ vật',pattern:'これは なんですか。',meaning:'Đây là gì?',questionWord:'なん / なに',answerPattern:'N です。',difficulty:'easy',group:'objects'},
  {id:'person',lesson:'1',category:'Người',pattern:'だれですか。',meaning:'Ai?',questionWord:'だれ',answerPattern:'～さんです。',difficulty:'easy',group:'personal'},
  {id:'owner',lesson:'2',category:'Người sở hữu',pattern:'これは だれの N ですか。',meaning:'Đồ của ai?',questionWord:'だれの',answerPattern:'～さんのです。',difficulty:'medium',group:'objects'},
  {id:'location',lesson:'2',category:'Vị trí',pattern:'N は どこですか。',meaning:'Ở đâu?',questionWord:'どこ',answerPattern:'ここ / そこ / あそこです。',difficulty:'easy',group:'objects'},
  {id:'direction',lesson:'1',category:'Quê quán hoặc phương hướng',pattern:'おくには どちらですか。',meaning:'Ở đâu (lịch sự)?',questionWord:'どちら',answerPattern:'ベトナムです。',difficulty:'easy',group:'personal'},
  {id:'choice',lesson:'2',category:'Chọn đồ vật',pattern:'どれですか。',meaning:'Cái nào? どれ đứng một mình.',questionWord:'どれ',answerPattern:'これ / それ / あれです。',difficulty:'medium',group:'objects'},
  {id:'choice-noun',lesson:'2',category:'Chọn đồ vật theo tên',pattern:'どの N ですか。',meaning:'N nào? どの phải đi với danh từ.',questionWord:'どの',answerPattern:'この / その / あの N です。',difficulty:'medium',group:'objects'},
  {id:'origin',lesson:'2',category:'Xuất xứ',pattern:'どこの N ですか。',meaning:'N của nước nào?',questionWord:'どこの',answerPattern:'日本のです。',difficulty:'medium',group:'objects'},
  {id:'nationality',lesson:'1',category:'Quốc tịch',pattern:'なんじんですか。',meaning:'Người nước nào?',questionWord:'なんじん',answerPattern:'ベトナムじんです。',difficulty:'easy',group:'personal'},
  {id:'language',lesson:'1',category:'Ngôn ngữ',pattern:'何語ですか。',meaning:'Tiếng gì?',questionWord:'何語',answerPattern:'日本語です。',difficulty:'medium',group:'personal'},
  {id:'price',lesson:'2',category:'Giá tiền',pattern:'N は いくらですか。',meaning:'Bao nhiêu tiền?',questionWord:'いくら',answerPattern:'[giá] 円です。',difficulty:'easy',group:'commerce'},
  {id:'quantity',lesson:'2',category:'Số lượng',pattern:'N は いくつですか。',meaning:'Bao nhiêu cái?',questionWord:'いくつ',answerPattern:'ひとつ / ふたつ / … です。',difficulty:'easy',group:'commerce'},
  {id:'order',lesson:'2',category:'Gọi món',pattern:'ごちゅうもんは？',meaning:'Bạn gọi món gì?',questionWord:'ごちゅうもん',answerPattern:'N を [số lượng] ください。',difficulty:'medium',group:'commerce'},
  {id:'ingredient',lesson:'2',category:'Loại hoặc nguyên liệu',pattern:'なんの N ですか。',meaning:'N loại gì?',questionWord:'なんの',answerPattern:'N の N です。',difficulty:'medium',group:'commerce'},
  {id:'age',lesson:'1',category:'Tuổi',pattern:'なんさいですか。',meaning:'Bao nhiêu tuổi?',questionWord:'なんさい',answerPattern:'[tuổi] さいです。',difficulty:'easy',group:'personal'},
  {id:'when',lesson:'1',category:'Thời điểm',pattern:'いつですか。',meaning:'Khi nào?',questionWord:'いつ',answerPattern:'[ngày / thứ] です。',difficulty:'easy',group:'personal'},
  {id:'month',lesson:'1',category:'Tháng',pattern:'なんがつですか。',meaning:'Tháng mấy?',questionWord:'なんがつ',answerPattern:'[tháng] がつです。',difficulty:'easy',group:'personal'},
  {id:'date',lesson:'1',category:'Ngày',pattern:'なんにちですか。',meaning:'Ngày mấy?',questionWord:'なんにち',answerPattern:'[ngày] です。',difficulty:'medium',group:'personal'},
  {id:'weekday',lesson:'3',category:'Thứ trong tuần',pattern:'なんようびですか。',meaning:'Thứ mấy?',questionWord:'なんようび',answerPattern:'[thứ] ようびです。',difficulty:'easy',group:'schedule'},
  {id:'time',lesson:'3',category:'Giờ',pattern:'なんじですか。',meaning:'Mấy giờ?',questionWord:'なんじ',answerPattern:'[giờ] じです。',difficulty:'easy',group:'schedule'},
  {id:'minute',lesson:'3',category:'Phút',pattern:'なんぷんですか。',meaning:'Mấy phút?',questionWord:'なんぷん',answerPattern:'[phút] です。',difficulty:'medium',group:'schedule'},
  {id:'floor',lesson:'2',category:'Tầng',pattern:'なんかいですか。',meaning:'Tầng mấy?',questionWord:'なんかい',answerPattern:'[số tầng] かいです。',difficulty:'medium',group:'objects'},
  {id:'range',lesson:'3',category:'Khoảng thời gian',pattern:'なんじから なんじまでですか。',meaning:'Từ mấy giờ đến mấy giờ? から = từ; まで = đến.',questionWord:'なんじ',answerPattern:'[giờ] から [giờ] までです。',difficulty:'hard',group:'schedule'},
  {id:'routine',lesson:'3',category:'Giờ sinh hoạt',pattern:'まいあさ なんじに おきますか。',meaning:'Thức dậy lúc mấy giờ? に chỉ thời điểm.',questionWord:'なんじ',answerPattern:'[giờ] に おきます。',difficulty:'medium',group:'schedule'},
  {id:'eat',lesson:'3',category:'Món ăn',pattern:'なにを たべますか。',meaning:'Ăn gì? なに + を chỉ đối tượng.',questionWord:'なに',answerPattern:'[món ăn] を たべます。',difficulty:'easy',group:'schedule'},
  {id:'drink',lesson:'3',category:'Đồ uống',pattern:'なにを のみますか。',meaning:'Uống gì?',questionWord:'なに',answerPattern:'[đồ uống] を のみます。',difficulty:'easy',group:'schedule'},
  {id:'go',lesson:'3',category:'Đi đến đâu',pattern:'どこへ いきますか。',meaning:'Đi đâu? へ chỉ hướng đến.',questionWord:'どこ',answerPattern:'[nơi] へ いきます。',difficulty:'medium',group:'schedule'},
  {id:'activity',lesson:'3',category:'Làm gì ở đâu',pattern:'どこで なにを しますか。',meaning:'Làm gì ở đâu? で chỉ nơi diễn ra hành động.',questionWord:'どこ / なに',answerPattern:'[nơi] で N を Vます。',difficulty:'hard',group:'schedule'},
  {id:'hobby',lesson:'1',category:'Sở thích',pattern:'しゅみは なんですか。',meaning:'Sở thích là gì?',questionWord:'なん',answerPattern:'[sở thích] です。',difficulty:'easy',group:'personal'},
];

function patternFor(q: SpeakingQuestion): string {
  const s = q.question;
  if (/ごちゅうもん/.test(s)) return 'order';
  if (/から.*まで/.test(s)) return 'range';
  if (/何時何分|何分/.test(s)) return 'minute';
  if (/何曜日/.test(s)) return 'weekday';
  if (/何月/.test(s)) return 'month';
  if (/何日/.test(s)) return 'date';
  if (/何さい/.test(s)) return 'age';
  if (/何かい/.test(s)) return 'floor';
  if (/何時/.test(s)) return /おきます|ねます/.test(s) ? 'routine' : 'time';
  if (/いくら/.test(s)) return 'price';
  if (/いくつ/.test(s)) return 'quantity';
  if (/だれの/.test(s)) return 'owner';
  if (/だれ/.test(s)) return 'person';
  if (/しゅみ/.test(s)) return 'hobby';
  if (/何語|えいご/.test(s)) return 'language';
  if (/いつ/.test(s)) return 'when';
  if (/どこで.*何を/.test(s)) return 'activity';
  if (/どこへ/.test(s)) return 'go';
  if (/どこ|どちら/.test(s)) return q.group === 'personal' ? 'direction' : 'location';
  if (/食べます|たべます/.test(s)) return 'eat';
  if (/飲みます|のみます/.test(s)) return 'drink';
  return q.group === 'personal' ? 'person' : q.group === 'schedule' ? 'activity' : 'identify';
}
function refs(text: string): string[] {
  return allLessonCards.filter(c => c.kana.length >= 2 && !/[()（）／〜～\s]/.test(c.kana) && text.includes(c.kana)).map(c => c.id);
}
const patterns = specs.map(spec => ({...spec, examples: [] as PatternExample[]}));
function add(id: string, question: string, answer: string, visual?: string) {
  const target = patterns.find(p => p.id === id)!;
  target.examples.push({question, answer, visual, vocabularyIds: refs(question + answer)});
}
for (const seed of speakingQuestionSeeds) {
  const id = patternFor(seed);
  patterns.find(p => p.id === id)!.examples.push({ question: seed.question, answer: seed.expectedAnswers[0], meaning: seed.vietnameseMeaning, visual: seed.visual?.content, vocabularyIds: refs(seed.question + seed.expectedAnswers.join('')), seed });
}
const objects = ['カメラ','パソコン','とけい','ほん','ペン','けいたいでんわ','でんしじしょ','けしゴム','かばん','さいふ'];
objects.forEach((v,i) => add('identify', `${['これ','それ','あれ'][i%3]}は なんですか。`, `${v}です。`, `${v}`));
const places = ['トイレ','レストラン','きっさてん','ぎんこう','としょかん','びょういん','ゆうびんきょく','スーパー','こうえん','コンビニ'];
places.forEach((v,i) => add('location', `${v}は どこですか。`, `${['ここ','そこ','あそこ'][i%3]}です。`, `${v}：${['ここ','そこ','あそこ'][i%3]}`));
objects.slice(0,8).forEach((v,i) => {add('choice',`${v}は どれですか。`,`${['これ','それ','あれ'][i%3]}です。`,`${v} → ${['これ','それ','あれ'][i%3]}`);add('choice-noun',`どの ${v}ですか。`,`${['この','その','あの'][i%3]} ${v}です。`,`${['この','その','あの'][i%3]} ${v}`);});
['日本','ベトナム','アメリカ','イタリア','かんこく','タイ','ちゅうごく','フランス','ドイツ','インド'].forEach(v => { add('origin', 'どこの カメラですか。', `${v}のです。`, `カメラ：${v}`); add('nationality','なんじんですか。',`${v}じんです。`,v); });
['日本語','えいご','かんこくご','ちゅうごくご','ベトナムご'].forEach(v => add('language','何語ですか。',`${v}です。`,v));
const prices = ['ひゃく','にひゃく','さんびゃく','ろっぴゃく','はっぴゃく','せん','さんぜん','はっせん','いちまん','にまん'];
prices.forEach((v,i) => add('price',`この ${objects[i]}は いくらですか。`,`${v}えんです。`,`${objects[i]}：${[100,200,300,600,800,1000,3000,8000,10000,20000][i]}円`));
const quantities = ['ひとつ','ふたつ','みっつ','よっつ','いつつ','むっつ','ななつ','やっつ','ここのつ','とお'];
const foods = ['りんご','いちご','たまご','ケーキ','パン','カレー','スープ','とんかつ','ハンバーグ','ごはん'];
quantities.forEach((v,i) => {add('quantity',`${foods[i]}は いくつですか。`,`${v}です。`,`${foods[i]} × ${i+1}`);add('order','ごちゅうもんは？',`${foods[i]}を ${v}と ${['おちゃ','ジュース','コーヒー','こうちゃ'][i%4]}を ひとつ ください。`,`${foods[i]} × ${i+1}、${['おちゃ','ジュース','コーヒー','こうちゃ'][i%4]} × 1`);});
['ぶたにく','とりにく','ぎゅうにく','さかな','やさい'].forEach(v => add('ingredient','なんの カレーですか。',`${v}の カレーです。`,`${v}の カレー`));
['いっさい','はっさい','じゅっさい','じゅうきゅうさい','はたち'].forEach(v => add('age','何さいですか。',`${v}です。`,v));
const months=['いちがつ','にがつ','さんがつ','しがつ','ごがつ','ろくがつ','しちがつ','はちがつ','くがつ','じゅうがつ','じゅういちがつ','じゅうにがつ'];
months.forEach((v,i)=>add('month','誕生日は 何月ですか。',`${v}です。`,`📅 ${i+1}月`));
const dates=['ついたち','ふつか','みっか','よっか','いつか','むいか','なのか','ようか','ここのか','とおか','じゅうよっか','はつか','にじゅうよっか'];
dates.forEach((v,i)=>{add('date','誕生日は 何日ですか。',`${v}です。`,`📅 ${[1,2,3,4,5,6,7,8,9,10,14,20,24][i]}日`); add('when','誕生日は いつですか。',`${months[i%12]} ${v}です。`,`📅 ${i%12+1}月 ${[1,2,3,4,5,6,7,8,9,10,14,20,24][i]}日`);});
['げつようび','かようび','すいようび','もくようび','きんようび','どようび','にちようび'].forEach(v=>add('weekday','きょうは 何曜日ですか。',`${v}です。`,v));
['いちじ','にじ','さんじ','よじ','ごじ','ろくじ','しちじ','はちじ','くじ','じゅうじ'].forEach((v,i)=>add('time','いま 何時ですか。',`${v}です。`,`🕒 ${i+1}:00`));
['いっぷん','にふん','さんぷん','よんぷん','ごふん','ろっぷん','はっぷん','じゅっぷん','はん'].forEach(v=>add('minute','いま 何分ですか。',`${v}です。`,`🕒 ${v}`));
['いっかい','にかい','さんがい','よんかい','ごかい'].forEach((v,i)=>add('floor',`${places[i]}は 何かいですか。`,`${v}です。`,`${places[i]}：${i+1}かい`));
places.slice(3,8).forEach((v,i)=>add('range',`${v}は 何時から 何時までですか。`,`${['九時','八時','十時','九時','八時'][i]}から 五時までです。`,`${v}：${[9,8,10,9,8][i]}:00〜17:00`));
foods.forEach(v=>add('eat','何を たべますか。',`${v}を たべます。`,v));
['おちゃ','みず','ジュース','コーヒー','こうちゃ','ぎゅうにゅう','ビール','ワイン'].forEach(v=>add('drink','何を のみますか。',`${v}を のみます。`,v));
places.forEach(v=>add('go','どこへ いきますか。',`${v}へ いきます。`,v));
['スポーツ','サッカー','テニス','すいえい','おんがく','どくしょ','りょこう','りょうり','えいが'].forEach(v=>add('hobby','しゅみは なんですか。',`${v}です。`,v));

['ナム','アン','キム','マリア','ジョン'].forEach(v => {add('person','だれですか。',`${v}さんです。`, `👤 ${v}さん`);add('owner','これは だれの かばんですか。',`${v}さんのです。`,`👜 ${v}さん`);});
['ベトナム','日本','アメリカ','イタリア','かんこく'].forEach(v => add('direction','おくには どちらですか。',`${v}です。`,v));
[['としょかん','本','よみます'],['こうえん','サッカー','します'],['うち','テレビ','みます'],['大学','日本語','べんきょうします'],['スーパー','りんご','かいます']].forEach(([place,thing,verb]) => add('activity','どこで 何を しますか。',`${place}で ${thing}を ${verb}。`,`${place}：${thing}`));
['六時','七時','八時','九時','十時'].forEach(v => add('routine','まいあさ 何時に おきますか。',`${v}に おきます。`,v));
// Exam visuals are also recognition examples, keeping both modes on one source.
['カリナ','アンナ','ナム','リン','マリア','ジョン','キム','アン'].forEach((name, i) => {
  const age = [31,20,19,22,25,28,30,24][i];
  add('age', `${name}さんは何さいですか。`, `${age}さいです。`, `👤 ${name}  ${age}さい`);
});
const locationSigns: [string, string, string][] = [
  ['としょかん','LIBRARY','📚'],['ぎんこう','BANK','🏦'],['びょういん','HOSPITAL','🏥'],
  ['ゆうびんきょく','POST OFFICE','📮'],['コンビニ','CONVENIENCE STORE','🏪'],
  ['レストラン','RESTAURANT','🍽️'],['きっさてん','CAFE','☕'],['スーパー','SUPERMARKET','🛒'],['こうえん','PARK','🌳']
];
locationSigns.forEach(([place, sign, icon]) => add('location', 'ここはどこですか。', `${place}です。`, `${icon}\n${sign}`));
const orderFoods = ['カレー','スープ','とんかつ','ハンバーグ','ごはん','パン','ケーキ','おすし'];
const orderDrinks = ['ジュース','コーヒー','おちゃ','こうちゃ','ぎゅうにゅう','みず'];
orderFoods.forEach((food, i) => orderDrinks.forEach((drink, j) => {
  const a = (i + j) % 3, b = (i * 2 + j + 1) % 3;
  add('order', 'ごちゅうもんは？', `${food}を${quantities[a]}と${drink}を${quantities[b]}ください。`, `🍽️ ${food} × ${a + 1}\n🥤 ${drink} × ${b + 1}`);
}));
[['なつやすみ、りょこうをしますか。','はい、りょこうをします。'],['なつやすみ、りょこうをしますか。','いいえ、りょこうをしません。'],['まいあさ、何をたべますか。','パンをたべます。'],['日曜日、どこへいきますか。','こうえんへいきます。'],['やすみは何曜日ですか。','日曜日です。'],['何をしますか。','本をよみます。']].forEach(([q,a]) => add('activity', q, a));
export const questionPatterns: QuestionPattern[] = patterns;
