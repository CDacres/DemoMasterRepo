
import removeTrailingZeros from '../remove-trailing-zeros';

describe('removeTrailingZeros', () => {
  it('should return the stringified number without trailing zeros', () => {
    expect(removeTrailingZeros(45.00)).toEqual(45);
  });
});
