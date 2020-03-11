import { forEach, values } from 'ramda';

const isValidString = item => typeof item === 'string' && item !== '';
const isValidNumber = item => typeof item === 'number' && item !== 0;
const isValidObject = item => typeof item === 'object' && (!(item instanceof Array)) && !isObjectJustEmptyValues(item);
const isValidArray = item => typeof item === 'object' && (item instanceof Array) && item.length > 0;

export default function isObjectJustEmptyValues(obj: object): boolean {
  const vals = values(obj);
  let retVal = true;
  forEach(val => {
    if (isValidString(val) || isValidNumber(val) || isValidObject(val) || isValidArray(val)) {
      retVal = false;
    }
  }, vals);
  return retVal;
}
