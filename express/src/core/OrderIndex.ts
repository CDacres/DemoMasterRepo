import { Int } from './Scalar';

export interface WithOrderIndex {
  orderIndex?: Int;
}

export const updateOrder = <T extends WithOrderIndex>(list: T[]) => {
  if (!list) {
    return [];
  }
  let ix = 0;
  for (const i of list) {
    if (!i) {
      continue;
    }
    i.orderIndex = ++ix;
  }
  return list;
};

export const reorder = <T>(list: T[], startIndex: Int, endIndex: Int) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
