export default function convertArrayToObject(arr: any[]): object {
  const obj = {};
  arr.forEach((item, index) => {
    obj[index] = item;
  });
  return obj;
}
