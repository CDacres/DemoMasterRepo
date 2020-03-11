export default function convertObjectToMap(obj: object) {
  const map = new Map();
  Object.keys(obj).forEach(key => {
    map.set(key, obj[key]);
  });
  return map;
}
