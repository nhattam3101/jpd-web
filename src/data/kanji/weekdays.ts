import { card } from './types';
export const weekdays = [['月曜日','げつようび','Thứ hai'],['火曜日','かようび','Thứ ba'],['水曜日','すいようび','Thứ tư'],['木曜日','もくようび','Thứ năm'],['金曜日','きんようび','Thứ sáu'],['土曜日','どようび','Thứ bảy'],['日曜日','にちようび','Chủ nhật']].map(([k,r,m])=>card(k,r,m,'weekday'));
