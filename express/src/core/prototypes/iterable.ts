Array.prototype.mapBy = mapBy;
Array.prototype.remove = remove;
Array.prototype.maxBy = maxBy;
Array.prototype.minBy = minBy;
Array.prototype.groupBy = groupBy;
Array.prototype.clusterBy = clusterBy;
Array.prototype.orderBy = orderBy;
Array.prototype.first = first;
Array.prototype.last = last;
Array.prototype.skip = skip;
Array.prototype.skipWhile = skipWhile;
Array.prototype.take = take;
Array.prototype.takeWhile = takeWhile;
Array.prototype.pairLeft = leftJoin;
Array.prototype.pair = pair;
Array.prototype.sortBy = sortBy;
Array.prototype.count = count;
Array.prototype.clear = clear;
Array.prototype.any = any;
Array.prototype.all = all;
Array.prototype.move = move;
Array.prototype.many = many;
Array.prototype.contains = contains;
Array.prototype.clone = clone;
Array.prototype.distinct = distinct;
Array.prototype.zip = zip;

declare global {
  interface Array<T> {
    mapBy: typeof mapBy;
    many: typeof many;
    remove: typeof remove;
    maxBy: typeof maxBy;
    minBy: typeof minBy;
    orderBy: typeof orderBy;
    groupBy: typeof groupBy;
    clusterBy: typeof clusterBy;
    first: typeof first;
    last: typeof last;
    skip: typeof skip;
    take: typeof take;
    skipWhile: typeof skipWhile;
    takeWhile: typeof takeWhile;
    pairLeft: typeof leftJoin;
    pair: typeof pair;
    sortBy: typeof sortBy;
    count: typeof count;
    clear: typeof clear;
    any: typeof any;
    all: typeof all;
    move: typeof move;
    contains: typeof contains;
    clone: typeof clone;
    distinct: typeof distinct;
    zip: typeof zip;
  }
}

function mapBy<T, K extends string | number>(this: T[], k: (item: T, index: number) => K): Record<K, T> {
  return this.reduce((m, item, index) => {
    m[k(item, index)] = item;
    return m;
  }, {} as Record<K, T>);
}

function many<T, I>(this: T[], selector: (i: T) => I[]): I[] {
  if (!this || !selector) {
    return [];
  }
  return this.map(selector).reduce((c, i) => {
    c.push(...i);
    return c;
  }, [] as I[]);
}

function remove<T>(this: T[], i: T): void {
  if (!this || !i) {
    return;
  }
  const k = this.indexOf(i);
  if (k !== -1) {
    this.splice(k, 1);
  }
}

function minBy<T, K>(this: T[], k: (i: T) => K): K | null {
  if (!this || this.length === 0) {
    throw Error('fail: arr is null or empty');
  }
  return this.reduce((m, i) => k(i) < m ? k(i) : m, k(this[0]));
}

function maxBy<T, K>(this: T[], k: (i: T) => K): K | null {
  if (this.length === 0) {
    return null;
  }
  return this.reduce((m, i) => k(i) > m ? k(i) : m, k(this[0]));
}

class Group<Key extends string | number, Item> {
  key: Key;
  items: Item[] = [];

  constructor(key: Key) {
    this.key = key;
  }
}

function groupBy<T, K extends string | number>(this: T[], k: (i: T) => K): Array<Group<K, T>> {
  const groups: Array<Group<K, T>> = [];
  const map: Record<K, Group<K, T>> = {} as Record<K, Group<K, T>>;
  for (const item of this) {
    const key = k(item);
    let group = map[key];
    if (!group) {
      group = map[key] = new Group<K, T>(key);
      groups.push(group);
    }
    group.items.push(item);
  }
  return groups;
}

function clusterBy<T, K extends string | number>(this: T[], k: (i: T) => K): Record<K, T[]> {
  const map: Record<K, T[]> = {} as Record<K, T[]>;
  for (const item of this) {
    const key = k(item);
    let group = map[key];
    if (!group) {
      group = map[key] = [];
    }
    group.push(item);
  }
  return map;
}

function sortBy<T, K extends number>(this: T[], k: (i: T) => K): T[] {
  const clone1 = [...this];
  clone1.sort((a, b) => k(a) - k(b));
  return clone1;
}

function orderBy<T, K>(this: T[], k: (i: T) => K): T[] {
  const clone2 = [...this];
  clone2.sort((a, b) => {
    const va = k(a), vb = k(b);
    return va === vb ? 0 : (va < vb ? -1 : 1);
  });
  return clone2;
}

function first<T>(this: T[], k?: (i: T) => boolean): T | null {
  if (!this || this.length === 0) {
    return null;
  }
  return !!k ? this.find(k) : this[0];
}

function last<T>(this: T[], k?: (i: T) => boolean): T | null {
  if (!this || this.length === 0) {
    return null;
  }
  return k && this.reverse().first(k) || this[this.length - 1];
}

function skip<T>(this: T[], count3: number): T[] {
  return this.slice(count3);
}

function skipWhile<T>(this: T[], predicate: (item: T, index: number) => boolean): T[] {
  if (!this || this.length === 0) {
    return [];
  }
  let index = 0;
  for (const item of this) {
    if (predicate(item, index)) {
      index++;
      continue;
    }
    return this.slice(index);
  }
  return [];
}

function take<T>(this: T[], count4: number): T[] {
  return this.slice(0, count4);
}

function takeWhile<T>(this: T[], predicate: (item: T, index: number) => boolean): T[] {
  if (!this || this.length === 0) {
    return [];
  }
  const result = [];
  let index = 0;
  for (const item of this) {
    if (!predicate(item, index)) {
      break;
    }
    result.push(item);
    index++;
  }
  return result;
}

function pair<T1, T2, TK>(
  this: T1[], a2: T2[],
  k1: (i1: T1) => TK, k2: (i2: T2) => TK
)
  : Array<{ key: TK; left: T1; right: T2 }> {

  const m1 = new Map<TK, T1>(this.map(i => [k1(i), i] as [TK, T1]));
  const m2 = new Map<TK, T2>(a2.map(i => [k2(i), i] as [TK, T2]));

  const result = [];
  for (const [key1, i1] of m1.entries()) {
    const i2 = m2.get(key1);
    if (i2) {
      result.push({ key: key1, left: i1, right: i2 });
    }
  }
  return result;
}

function leftJoin<T1, T2, TK>(
  this: T1[], a2: T2[],
  k1: (i1: T1) => TK, k2: (i2: T2) => TK
)
  : Array<{ key: TK; left: T1; right: T2 }> {
  const m1 = new Map<TK, T1>(this.map(i => [k1(i), i] as [TK, T1]));
  const m2 = new Map<TK, T2>(a2.map(i => [k2(i), i] as [TK, T2]));

  const result = [];
  for (const [key, left] of m1.entries()) {
    const right = m2.get(key);
    result.push({ key, left, right });
  }
  return result;
}

function count<T>(this: T[], predicate?: (i: T) => boolean): number {
  if (!this || this.length === 0) {
    return 0;
  }
  return !!predicate ? this.reduce((c, i) => c + (predicate(i) ? 1 : 0), 0) : this.length;
}

function clear<T>(this: T[]): void {
  if (!this || this.length === 0) {
    return;
  }
  this.splice(0, this.length);
}

function any<T>(this: T[], predicate?: (i: T) => boolean): boolean {
  return this && !!this.first(predicate);
}

// at least one
function all<T>(this: T[], predicate?: (i: T) => boolean): boolean {
  if (!this || this.length === 0) {
    return false;
  }
  for (const item of this) {
    if (!predicate(item)) {
      return false;
    }
  }
  return true;
}

function move<T>(this: T[], from: number, to: number) {
  this.splice(to < 0 ? this.length + to : to, 0, this.splice(from, 1)[0]);
}

function contains<T>(this: T[], i: T): boolean {
  return this.indexOf(i) !== -1;
}

function clone<T>(this: T[]): T[] {
  return !!this ? this.map(x => x) : [];
}

function distinct<T extends string | number>(this: T[]): T[] {
  return this.groupBy(x => x).map(x => x.key);
}

function zip<T>(this: T[], a2: T[]): Array<{ i1: T; i2: T }> {
  if (!a2) {
    return [];
  }
  return this
    .slice(0, Math.min(this.length, a2.length))
    .map((i, k) => ({ i1: i, i2: a2[k] }));
}

export default (() => null)();
