export default function getArrayMode(arr: number[]): number | undefined {
  const mode = arr.sort((a, b) =>
    arr.filter(v => v === a).length
    - arr.filter(v => v === b).length
  ).pop();
  if (arr.indexOf(mode) > -1) {
    return mode;
  }
  return undefined;
}
