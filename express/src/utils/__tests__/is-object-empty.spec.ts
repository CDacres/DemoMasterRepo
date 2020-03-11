
import isObjectEmpty from '../is-object-empty';

describe('isObjectEmpty', () => {
  it('should return false if object is not empty', () => {
    const obj = {
      date: '',
      guests: '',
    };
    const response = isObjectEmpty(obj);
    expect(response).toEqual(false);
  });

  it('should return true if object is empty', () => {
    const obj = {};
    const response = isObjectEmpty(obj);
    expect(response).toEqual(true);
  });
});
