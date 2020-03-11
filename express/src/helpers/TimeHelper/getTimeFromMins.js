export default function getTimeFromMins(mins) {
  if (mins >= 24 * 60 || mins < 0) {
    throw new RangeError(
      'Valid input should be greater than or equal to 0 and less than 1440.'
    );
  }
  const h = mins / 60 | 0;
  const m = mins % 60 | 0;
  return `${h}:${m < 10 ? `0${m}` : m}`;
}
