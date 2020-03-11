
import isObjectJustEmptyValues from '../is-object-just-empty-values';

describe('isObjectJustEmptyValues', () => {
  it('should return true if object contains only an empty string', () => {
    expect(isObjectJustEmptyValues({ foo: '' })).toBe(true);
  });

  it('should return true if object contains only a 0 value', () => {
    expect(isObjectJustEmptyValues({ foo: 0 })).toBe(true);
  });

  it('should return true if object contains only an empty array', () => {
    expect(isObjectJustEmptyValues({ foo: [] })).toBe(true);
  });

  it('should return true if object contains an empty object', () => {
    expect(isObjectJustEmptyValues({ foo: {} })).toBe(true);
  });

  it('should return false if object contains a valid value amongst empty values', () => {
    expect(isObjectJustEmptyValues({ foo: 'bar', baz: '' })).toBe(false);
  });
});
