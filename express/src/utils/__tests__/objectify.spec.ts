
import objectify from '../objectify';

describe('objectify', () => {
  it('should convert a given key/value array to an object', () => {
    const obj = {
      foo: 'bar',
    };
    expect(objectify(obj, ['baz', 'BOOM!'])).toEqual({
      foo: 'bar',
      baz: 'BOOM!',
    });
  });
});
