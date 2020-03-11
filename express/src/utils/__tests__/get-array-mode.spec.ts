
import getArrayMode from '../get-array-mode';

describe('getArrayMode', () => {
  it('should return the mode of the array', () => {
    const array = [1, 5, 5, 23];

    expect(getArrayMode(array)).toEqual(5);
  });

  it('should return undefined if there is no array mode', () => {
    const array = [1, 3, 5, 23];

    expect(getArrayMode(array)).toEqual(undefined);
  });
});
