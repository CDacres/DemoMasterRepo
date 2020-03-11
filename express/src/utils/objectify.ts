// Types
import { AnyObject } from '@src/typings/types';

export default function objectify(obj: AnyObject, [k, v]: [any, any]) {
  return Object.assign(obj, { [k]: v });
}
