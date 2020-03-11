import equal from 'deep-equal';

export default class PatchMerge {
  arrayEquals(b: any[], a: any[]) {
    if (b.length !== a.length) {
      return false;
    }
    for (let i = 0; i < b.length; i++) {
      if (!equal(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  generate(before: any, after: any, ignoreId: boolean = false) {
    if (
      before === null ||
      after === null ||
      typeof before !== 'object' ||
      typeof after !== 'object' ||
      Array.isArray(before) !== Array.isArray(after)
    ) {
      return after;
    }

    if (Array.isArray(before)) {
      if (!this.arrayEquals(before, after)) {
        return after;
      }
      return undefined;
    }

    const patch = {};
    const beforeKeys = Object.keys(before);
    const afterKeys = Object.keys(after);

    let key;
    let i;

    // Stuff added to new data
    const newKeys = {};
    for (i = 0; i < afterKeys.length; i++) {
      key = afterKeys[i];
      if (
        // If value isn't null or empty string
        after[key] !== null &&
        after[key] !== '' &&
        // If it doesn't exist in before object
        beforeKeys.indexOf(key) === -1 &&
        // If key isn't type
        key !== 'type'
      ) {
        // If ignoreId is set, ignore id keys
        if (!ignoreId) {
          newKeys[key] = true;
          patch[key] = after[key];
        } else if (key !== 'id') {
          newKeys[key] = true;
          patch[key] = after[key];
        }
      }
    }

    // Stuff removed from old data
    const removedKeys = {};
    for (i = 0; i < beforeKeys.length; i++) {
      key = beforeKeys[i];
      if (
        afterKeys.indexOf(key) === -1 &&
        key !== 'links' &&
        key !== 'relationships'
      ) {
        removedKeys[key] = true;
        patch[key] = null;
      } else if (before[key] !== null && typeof before[key] === 'object') {
        const subPatch = this.generate(before[key], after[key]);
        if (subPatch !== undefined) {
          patch[key] = subPatch;
        }
      } else if (before[key] !== after[key] && key !== 'type') {
        // If ignoreId is set, ignore id keys
        if (!ignoreId) {
          patch[key] = after[key];
        } else if (key !== 'id') {
          patch[key] = after[key];
        }
      }
    }

    return Object.keys(patch).length > 0 ? patch : undefined;
  }
}
