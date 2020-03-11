import { ZDate } from './Date';
import { ZMinute } from './Minute';

export type ZDateTime = {
  date: ZDate;
  time: ZMinute;
};

export type ZDateTimeInput = ZDateTime;
