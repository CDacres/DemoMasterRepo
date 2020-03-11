
import cleanObjectOfUselessFalsyValues from '../clean-object-of-useless-falsy-values';

describe('cleanObjectOfUselessFalsyValues', () => {
  it('should clear object of useless falsy values', () => {
    const obj = {
      foo: 'bar',
      removeThis: '',
    };
    expect(cleanObjectOfUselessFalsyValues(obj)).toEqual({ foo: 'bar' });
  });

  it('should clear object of useless falsy values but keep false values', () => {
    const obj = {
      foo: 'bar',
      baz: false,
      removeThis: '',
    };
    expect(cleanObjectOfUselessFalsyValues(obj)).toEqual({ foo: 'bar', baz: false });
  });
});
