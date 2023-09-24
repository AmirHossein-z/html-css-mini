/**
 * 0 -> nothing
 * 1 -> زوج
 * 2 -> فرد
 * 3 -> ثابت
 * 4 -> both زوج & فرد
 */
export type IClassType = "0" | "1" | "2" | "3" | "4";
/**
 * 1 -> شنبه
 * 2 -> یکشنبه
 * 3 -> دوشنبه
 * 4 -> سه‌شنبه
 * 5 -> چهارشنبه
 * 6 -> پنج‌شنبه
 */
export type TWeekDayNumber = "1" | "2" | "3" | "4" | "5" | "6";

export interface IClassTimes {
  id: string;
  day: TWeekDayNumber;
  startTime: string;
  content: string;
  type: IClassType;
}

export interface IDays {
  [key: string]: string;
}
