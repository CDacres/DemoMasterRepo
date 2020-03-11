
import toggleArrayItem from '../toggle-array-item';

describe('toggleArrayItem', () => {
  it('should correctly add a new item to the array', () => {
    expect(toggleArrayItem(['foo'], 'bar')).toEqual(['foo', 'bar']);
  });

  it('should correctly remove an existing item from the array', () => {
    expect(toggleArrayItem(['foo', 'bar'], 'bar')).toEqual(['foo']);
  });
});
