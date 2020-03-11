export function padStart(num: number, size: number, pad: string = '0') {
  let result = num.toString();
  while (result.length < size) {
    result = pad + result;
  }
  return result;
}

export const timeString = (minuteOfDay: number) => {
  const hours = padStart(Math.floor(minuteOfDay / 60), 2);
  const minutes = padStart(minuteOfDay % 60, 2);
  return `${hours}:${minutes}`;
};

export const durationString = (minuteOfDay: number) => {
  if (!minuteOfDay) {
    return '';
  } else if (minuteOfDay < 60) {
    return minuteOfDay;
  } else {
    return Math.round((minuteOfDay / 60) * 100) / 100;
  }
};
