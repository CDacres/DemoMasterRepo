export default function cleanObjectOfUselessFalsyValues(obj: object): object {
  const propNames = Object.getOwnPropertyNames(obj);
  const retObj = {};
  for (const propName of propNames) {
    if (typeof obj[propName] === 'object' && !(obj[propName] instanceof Array)) {
      obj[propName] = cleanObjectOfUselessFalsyValues(obj[propName]);
    } else if (typeof obj[propName] === 'number') {
      retObj[propName] = obj[propName];
    } else if (typeof obj[propName] === 'boolean' && !obj[propName]) {
      retObj[propName] = obj[propName];
    } else if (obj[propName]) {
      retObj[propName] = obj[propName];
    }
  }
  return retObj;
}
