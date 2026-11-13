import { card } from './types';
const rows: [string,string,string,number][] = [['一','いち/ひと','Một',1],['二','に/ふた','Hai',2],['三','さん/みっ','Ba',3],['四','し/よん','Bốn',4],['五','ご','Năm',5],['六','ろく','Sáu',6],['七','しち/なな','Bảy',7],['八','はち','Tám',8],['九','きゅう/く','Chín',9],['十','じゅう/とお','Mười',10],['百','ひゃく','Trăm',100],['千','せん','Nghìn',1000],['万','まん','Vạn',10000],['円','えん','Yên',0]];
export const numbers = rows.map(([k,r,m,value]) => card(k,r,m,'number',{value: value || undefined}));
