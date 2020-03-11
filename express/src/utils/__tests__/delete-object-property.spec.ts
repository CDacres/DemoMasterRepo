
import deleteObjectProperty from '../delete-object-property';

describe('deleteObjectProperty', () => {
  it('should return the correct response object when a property key is supplied', () => {
    const obj = {
      date: '14/07/2001',
      guests: 4,
    };
    const responseObj = deleteObjectProperty(obj, 'date');
    expect(responseObj).toEqual({
      guests: 4,
    });
  });
});
