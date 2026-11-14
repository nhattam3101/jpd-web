import { questionPatterns } from '../questionPatterns';

export type Category = 'basic'|'hundreds'|'thousands'|'things'|'people'|'age'|'month'|'date'|'weekday'|'hour'|'minute'|'half'|'floor'|'money';
export type NumberEntry = { id:string; value:number|string; display:string; reading:string; category:Category; isException?:boolean; priority?:'high'|'normal'; meaning?:string };
const digits=['ゼロ','いち','に','さん','よん','ご','ろく','なな','はち','きゅう'];
const kanji=['零','一','二','三','四','五','六','七','八','九'];
/** Numbers from zero through 99,999, grouped in Japanese units of ten thousand. */
export function readNumber(n:number):string {
 if (!Number.isInteger(n)||n<0||n>99999) throw new RangeError('Số phải từ 0 đến 99999');
 if(n===0)return digits[0];
 const man=Math.floor(n/10000), rest=n%10000, thousand=Math.floor(rest/1000), hundred=Math.floor(rest%1000/100), ten=Math.floor(rest%100/10), one=rest%10;
 return (man?digits[man]+'まん':'')+(['','せん','にせん','さんぜん','よんせん','ごせん','ろくせん','ななせん','はっせん','きゅうせん'][thousand])+(['','ひゃく','にひゃく','さんびゃく','よんひゃく','ごひゃく','ろっぴゃく','ななひゃく','はっぴゃく','きゅうひゃく'][hundred])+(ten?(ten===1?'':digits[ten])+'じゅう':'')+(one?digits[one]:'');
}
export function numberKanji(n:number):string { if(n===0)return '零'; let result=''; for(const [unit,symbol] of [[10000,'万'],[1000,'千'],[100,'百'],[10,'十']] as const){const d=Math.floor(n/unit); if(d){result+=(d===1&&unit!==10000?'':kanji[d])+symbol;n%=unit;}} return result+(n?kanji[n]:''); }
const make=(category:Category,value:number|string,display:string,reading:string,isException=false):NumberEntry=>({id:`${category}-${value}`,category,value,display,reading,isException,priority:isException?'high':'normal'});
const sequence=(category:Category, readings:string[],suffix:string,exceptions:number[]=[])=>readings.map((r,i)=>make(category,i+1,`${i+1}${suffix}`,r,exceptions.includes(i+1)));
export const basicNumbers=Array.from({length:100},(_,n)=>make('basic',n,numberKanji(n),n===0?'ゼロ / れい':n===4?'よん / し':n===7?'なな / しち':n===9?'きゅう / く':readNumber(n)));
export const largeNumbers=[...Array.from({length:9},(_,i)=>(i+1)*100),...Array.from({length:9},(_,i)=>(i+1)*1000),10000].map(n=>make(n<1000?'hundreds':'thousands',n,numberKanji(n),readNumber(n),[300,600,800,3000,8000].includes(n)));
export const things=sequence('things',['ひとつ','ふたつ','みっつ','よっつ','いつつ','むっつ','ななつ','やっつ','ここのつ','とお'],'つ',[1,2,3,4,5,6,7,8,9,10]);
export const people=sequence('people',['ひとり','ふたり','さんにん','よにん','ごにん','ろくにん','ななにん','はちにん','きゅうにん','じゅうにん'],'人',[1,2,4]);
export function readAge(n:number):string {if(!Number.isInteger(n)||n<1||n>99)throw new RangeError('Tuổi phải từ 1 đến 99'); if(n===20)return 'はたち'; const last=n%10; return n===10?'じゅっさい':last===1?readNumber(n-1).replace(/^ゼロ$/,'')+'いっさい':last===8?readNumber(n-8).replace(/^ゼロ$/,'')+'はっさい':last===0?(n===10?'':readNumber(n/10))+'じゅっさい':readNumber(n)+'さい';}
export const ages=Array.from({length:99},(_,i)=>i+1).map(n=>make('age',n,`${n}歳`,readAge(n),[1,8,10,20].includes(n)));
export const months=sequence('month',['いちがつ','にがつ','さんがつ','しがつ','ごがつ','ろくがつ','しちがつ','はちがつ','くがつ','じゅうがつ','じゅういちがつ','じゅうにがつ'],'月',[4,7,9]);
export const specialDates:Record<number,string>={1:'ついたち',2:'ふつか',3:'みっか',4:'よっか',5:'いつか',6:'むいか',7:'なのか',8:'ようか',9:'ここのか',10:'とおか',14:'じゅうよっか',20:'はつか',24:'にじゅうよっか'};
export function readDate(n:number):string {if(!Number.isInteger(n)||n<1||n>31)throw new RangeError('Ngày phải từ 1 đến 31');return specialDates[n]||readNumber(n)+'にち';}
export const dates=Array.from({length:31},(_,i)=>i+1).map(n=>make('date',n,`${n}日`,readDate(n),n in specialDates));
export function birthday(month:number,date:number):string {if(!months[month-1])throw new RangeError('Tháng phải từ 1 đến 12');return `${months[month-1].reading} ${readDate(date)}`;}
export const weekdays=['月','火','水','木','金','土','日'].map((d,i)=>make('weekday',d,`${d}曜日`,['げつ','か','すい','もく','きん','ど','にち'][i]+'ようび'));
export const hours=sequence('hour',['いちじ','にじ','さんじ','よじ','ごじ','ろくじ','しちじ','はちじ','くじ','じゅうじ','じゅういちじ','じゅうにじ'],'時',[4,7,9]);
export const minutes=sequence('minute',['いっぷん','にふん','さんぷん','よんぷん','ごふん','ろっぷん','ななふん','はっぷん','きゅうふん','じゅっぷん / じっぷん'],'分',[1,3,4,6,8,10]);
export const halves=hours.map(h=>make('half',h.value,`${h.value}時半`,`${h.reading}はん`));
export const floors=sequence('floor',['いっかい','にかい','さんがい','よんかい','ごかい','ろっかい','ななかい','はっかい','きゅうかい','じゅっかい'],'階',[1,3,6,8,10]);
export function readMoney(n:number):string{return readNumber(n)+'えん';}
export const money=[100,200,300,400,500,600,700,800,900,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000].map(n=>make('money',n,`${n}円`,readMoney(n),[300,600,800,3000,8000].includes(n)));
export const entries=[...basicNumbers,...largeNumbers,...things,...people,...ages,...months,...dates,...weekdays,...hours,...minutes,...halves,...floors,...money];
export const exceptionEntries=entries.filter(e=>e.isException && e.category!=='money');
export const groups:{id:string;label:string;categories:Category[];patternId?:string}[]=[{id:'basic',label:'Số thường',categories:['basic']},{id:'large',label:'百・千・万',categories:['hundreds','thousands']},{id:'things',label:'Đếm cái',categories:['things'],patternId:'quantity'},{id:'people',label:'Đếm người',categories:['people']},{id:'age',label:'Tuổi',categories:['age'],patternId:'age'},{id:'month',label:'Tháng',categories:['month'],patternId:'month'},{id:'date',label:'Ngày',categories:['date'],patternId:'date'},{id:'weekday',label:'Thứ',categories:['weekday'],patternId:'weekday'},{id:'hour',label:'Giờ',categories:['hour','half'],patternId:'time'},{id:'minute',label:'Phút',categories:['minute'],patternId:'minute'},{id:'floor',label:'Tầng',categories:['floor'],patternId:'floor'},{id:'money',label:'Tiền',categories:['money'],patternId:'price'}];
export function patternForGroup(id?:string){return questionPatterns.find(p=>p.id===id);}
export function validateNumbers():string[]{const errors:string[]=[];const ids=new Set<string>(); for(const e of entries){if(ids.has(e.id))errors.push(`ID trùng: ${e.id}`);ids.add(e.id);if(!e.reading.trim())errors.push(`Thiếu cách đọc: ${e.id}`);if(!groups.some(g=>g.categories.includes(e.category)))errors.push(`Nhóm không hợp lệ: ${e.id}`);} for(const [label,list,count] of [['tháng',months,12],['thứ',weekdays,7],['đếm cái',things,10],['giờ',hours,12],['phút',minutes,10]] as const)if(list.length!==count)errors.push(`Thiếu ${label}`);for(const n of Object.keys(specialDates))if(!dates.find(e=>e.value===Number(n)&&e.isException))errors.push(`Thiếu ngày ${n}`);for(const e of money)if(e.reading!==readMoney(Number(e.value)))errors.push(`Sai tiền ${e.value}`);return errors;}
