export default function getNestedObject(nestedObj: object, pathArr: string[]) {
  return pathArr.reduce((obj, key) =>
    (obj && obj[key] !== 'undefined') ? obj[key] : null
  , nestedObj);
}
