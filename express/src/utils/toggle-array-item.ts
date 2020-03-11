export default function toggleArrayItem(array: any[], item: any) {
  if (array.indexOf(item) > -1) {
    return array.filter(i => i !== item);
  }
  return [
    ...array,
    item,
  ];
}
