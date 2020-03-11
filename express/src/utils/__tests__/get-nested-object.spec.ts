
import getNestedObject from '../get-nested-object';

describe('getNestedObject', () => {
  it('should return an object nested in a given object', () => {
    const obj = {
      foo: {
        bar: {
          baz: 'BOOM!',
        },
      },
    };

    expect(getNestedObject(obj, ['foo', 'bar'])).toEqual({
      baz: 'BOOM!',
    });
  });

  it('should return undefined if path contains non-existant key', () => {
    const obj = {
      foo: {
        bar: {
          baz: 'BOOM!',
        },
      },
    };

    expect(getNestedObject(obj, ['foo', 'boo'])).toEqual(undefined);
  });

  it('should return null if provided object is not an object', () => {
    const obj = [];

    expect(getNestedObject(obj, ['foo', 'boo'])).toEqual(null);
  });
});
