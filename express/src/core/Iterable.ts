export const ellipse = <T extends string>(arr: T[], length: number, extra: (e: T[]) => T): T[] => {
  if (arr.length === 0) {
    return [];
  }
  if (arr.length <= length) {
    return arr;
  }
  return arr.slice(0, length - 1).concat(extra(arr.slice(length - 1)));
};

export const range = function* (total: number = 0, step: number = 1, from: number = 0) {
  for (let i = 0; i < total; yield from + i++ * step) {
  }
};
