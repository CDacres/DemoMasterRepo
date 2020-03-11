export default class StringHelper {
  protected string: string;

  constructor(str: string) {
    this.string = str;
  }

  capitalise() {
    return (
      this.string.charAt(0).toUpperCase() + this.string.slice(1).toLowerCase()
    );
  }

  toCamelcase() {
    return this.string.replace(/(\-[a-z])/g, letter =>
      letter.toUpperCase().replace('-', '')
    );
  }

  toSnakeCase() {
    return this.string.replace(
      /([A-Z])/g,
      letter => `_${letter.toLowerCase()}`
    );
  }
}
