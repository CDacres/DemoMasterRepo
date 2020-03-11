/* tslint:disable:max-line-length */
import { DayOfWeek, timeString } from '@src/core';
import { Span } from '@src/core/domain';
import { dayOfWeekCatalog } from '@src/core/meta';

const TIME_08_00 = 8 * 60;
const TIME_10_00 = 10 * 60;
const TIME_12_00 = 12 * 60;
const TIME_14_00 = 14 * 60;
const TIME_17_00 = 17 * 60;
const TIME_19_00 = 19 * 60;

export type DaySpan = Span;

export type DailyHours = {
  day: DayOfWeek;
  spans?: DaySpan[];
};

export const planString = (days: DailyHours[]) => {
  if (!days || days.all(x => dayIsClosed(x))) {
    return [
      {
        days: ['common.closed'],
        time: null,
      },
    ];
  }
  if (days && days.all(x => dayIs247(x))) {
    return [
      {
        days: ['listing.opening_hours_twenty_four_seven'],
        time: null,
      },
    ];
  }
  return days.filter(x => !dayIsClosed(x)).groupBy(d => spanString(d.spans)).map(g => {
    return {
      days: weekArray(g.items.map(i => i.day)),
      time: g.items.first().spans.map(spanString).join(', '),
    };
  });
};

export const weekArray = (week: DayOfWeek[]) => {
  const dow = dayOfWeekCatalog.byId;
  const str: (day: DayOfWeek) => string = (day) => dow[day].ddd;

  let left = dayOfWeekCatalog.items.orderBy(x => x.orderIndex).pairLeft(week, d => d.id, d => d).skipWhile(x => !x.right);

  const splits: Array<{ days: DayOfWeek[] }> = [];
  while (left.any()) {
    const days = left.takeWhile(x => !!x.right).map(x => x.key);
    splits.push({ days });
    left = left.skip(days.length).skipWhile(x => !x.right);
  }

  const dayArr = [];
  splits.forEach(s => {
    switch (s.days.length) {
      case 0:
        break;

      case 1:
        dayArr.push(str(s.days.first()));
        break;

      default:
        dayArr.push(str(s.days.first()));
        dayArr.push('-');
        dayArr.push(str(s.days.last()));
        break;
    }
  });
  return dayArr;
};

export const spanString = (x: Span | Span[]) => {
  const str: (span: Span) => string = (y) => `${timeString(y.start)} - ${timeString(y.end)}`;
  if (Array.isArray(x)) {
    return x.map(str).join(' ');
  } else {
    return str(x);
  }
};

export const dayMaxInterval = (day: DailyHours): DaySpan => {
  if (!day || !day.spans || day.spans.length === 0) {
    return { start: 0, end: 0 };
  }
  const min = day.spans.minBy(i => Math.min(i.start, i.end));
  const max = day.spans.maxBy(i => Math.max(i.start, i.end));
  return { start: min, end: max };
};

export const dayIsHalfday = (day: DailyHours): boolean => {
  return day && day.spans && day.spans.all(s =>
    (TIME_08_00 <= s.start && s.start <= TIME_10_00 && TIME_12_00 <= s.end && s.end <= TIME_14_00) || (TIME_12_00 <= s.start && s.start <= TIME_14_00 && TIME_17_00 <= s.end && s.end <= TIME_19_00));
};

export const dayIs247 = (day: DailyHours): boolean => {
  if (!day || !day.spans) {
    return false;
  }
  const span = dayMaxInterval(day);
  const midnight = 24 * 60;
  return span.start === 0 && span.end === midnight;
};

export const dayIsClosed = (day: DailyHours): boolean => {
  return !dayIsOpen(day);
};

export const dayIsOpen = (day: DailyHours): boolean => {
  return !!day && !!day.spans && day.spans.length > 0 && day.spans.any(({ start, end }) => start !== end);
};

export const dayOpenDuration = (day: DailyHours): number => {
  if (!day || day.spans) {
    return 0;
  }
  const start = day.spans.minBy(x => x.end);
  const end = day.spans.maxBy(x => x.end);
  return start > end ? 24 * 60 - start + end : end - start;
};

export const dayIsSplit = (day: DailyHours): boolean => {
  return dayIsOpen(day) && day.spans.length > 1;
};

export const dayEvenSpans = (day: DailyHours) => {
  if (!day || !day.spans || day.spans.length === 0) {
    return;
  }

  const min = day.spans.minBy(x => Math.min(x.start, x.end));
  const max = day.spans.maxBy(x => Math.max(x.start, x.end));

  if (min !== max) {
    const step = Math.round((max - min) / day.spans.length);
    day.spans[0].start = min;
    day.spans[0].end = min + step;
    day.spans.slice(1).reduce((p, i) => {
      i.start = p.end;
      i.end = i.start + step;
      return i;
    }, day.spans[0]);
    day.spans[day.spans.length - 1].end = max;
  } else {
    Object.assign(day.spans[0], { start: 9 * 60, end: 18 * 60 });
  }
};

export const dayEnsureSpans = (day: DailyHours, count: number) => {
  if (!day) {
    return;
  }
  if (!day.spans) {
    day.spans = [];
  }

  while (day.spans.length < count) {
    day.spans.push({ start: 540, end: 1080 });
  }
  while (day.spans.length > count) {
    day.spans.pop();
  }
  dayEvenSpans(day);
};

export const daySplit = (day: DailyHours) => {
  dayEnsureSpans(day, 2);
  const x = dayMaxInterval(day);
  const noon = 12 * 60;
  if (x.start < noon && x.end > noon) {
    day.spans[0].start = x.start;
    day.spans[0].end = day.spans[1].start = noon;
    day.spans[1].end = x.end;
  } else {
    dayEvenSpans(day);
  }
};

export const dayCollapse = (day: DailyHours) => {
  if (day.spans.length > 0) {
    const max = dayMaxInterval(day);
    day.spans.splice(0);
    day.spans.push(max);
  }
};

export const dayMake247 = (day: DailyHours) => {
  dayEnsureSpans(day, 1);
  Object.assign(day.spans[0], { start: 0, end: 24 * 60 });
};

export const dayMake9to6WithSplit = (day: DailyHours) => {
  dayEnsureSpans(day, 2);
  Object.assign(day.spans[0], { start: 9 * 60, end: 12 * 60 });
  Object.assign(day.spans[1], { start: 12 * 60, end: 18 * 60 });
};

export const dayMake9to6 = (day: DailyHours) => {
  dayEnsureSpans(day, 1);
  Object.assign(day.spans[0], { start: 9 * 60, end: 18 * 60 });
};

export const dayToggleOpen = (day: DailyHours) => {
  if (dayIsOpen(day)) {
    dayEnsureSpans(day, 0);
  } else {
    dayEnsureSpans(day, 1);
  }
};

export const validateHours = (days: DailyHours[]) => {
  const errors = [];
  days.filter(x => !dayIsClosed(x)).forEach(day => {
    if (dayIsSplit(day) && day.spans[0].end > day.spans[1].start) {
      errors.push({
        day: day,
        result: ['validation.opening_period_invalid_split'],
        span: 1,
      });
    }
    day.spans.forEach((span, index) => {
      if (span.start > span.end) {
        errors.push({
          day: day,
          result: ['validation.opening_period_invalid_time'],
          span: index,
        });
      }
    });
  });
  return errors;
};
