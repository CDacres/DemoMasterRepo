export const concatAll = (array: any[]): any[] => {
  const results = [];
  array.forEach(subArray => results.push(...subArray));
  return results;
};

export default (array: any[], projectionFunction: (arg: any) => any): any[] =>
  concatAll(array.map(item => projectionFunction(item)));
