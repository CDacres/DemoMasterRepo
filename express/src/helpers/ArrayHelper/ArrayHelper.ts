export default class ArrayHelper {
  protected array;
  protected length;

  constructor(array: any[]) {
    this.array = array;
  }

  equals(array: any[]) {
    if (!array) {
      return false;
    }
    if (this.length !== array.length) {
      return false;
    }
    for (let i = 0, l = this.length; i < l; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].equals(array[i])) {
          return false;
        }
      } else if (this[i] !== array[i]) {
        return false;
      }
    }
    return true;
  }

  sortByObjectProperty(property: any) {
    return this.array.sort(
      (a, b) =>
        a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
    );
  }
}
