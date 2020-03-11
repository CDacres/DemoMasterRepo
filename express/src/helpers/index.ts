export { default as AddDataToDataLayer } from './AddDataToDataLayer';
export { default as ArrayHelper } from './ArrayHelper';
export { default as ColorHelper } from './ColorHelper';
export { default as CurrencyHelper } from './CurrencyHelper';
export { default as GetRelevantNonce } from './GetRelevantNonce';
export { default as PatchMerge } from './PatchMerge';
export { default as SetGlobalVars } from './SetGlobalVars';
export { default as StringHelper } from './StringHelper';
export { default as TimeHelper } from './TimeHelper';
export { default as TranslationHelper } from './TranslationHelper';
export { validateUserInfo as ValidateUserInfo } from './ValidateUserInfo';

export function isEqual(x: object, y: object) {
  if (x === y) {
    return true;
  }
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }
  if (x.constructor !== y.constructor) {
    return false;
  }
  for (const p in x) {
    if (!x.hasOwnProperty(p)) {
      continue;
    }
    if (!y.hasOwnProperty(p)) {
      return false;
    }
    if (x[p] === y[p]) {
      continue;
    }
    if (typeof x[p] !== 'object') {
      return false;
    }
    if (!isEqual(x[p], y[p])) {
      return false;
    }
  }
  for (const p in y) {
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false;
    }
  }
  return true;
}

export function debounce(callback: (...args: any[]) => any, wait: number, context: object) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => callback.apply(context, callbackArgs);

  return () => {
    callbackArgs = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const flatten = arr =>
  arr.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  );
