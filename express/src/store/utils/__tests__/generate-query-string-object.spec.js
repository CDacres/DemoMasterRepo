import generateQueryStringObject from '../generate-query-string-object';

describe('generateQueryStringObject', () => {
  it('should return the correct query string object', () => {
    const searchQueryObject = {
      includes: ['images', 'configurations'],
      fields: {
        rooms: ['name', 'hourlyPrice', 'guestCapacities'],
        guestCapacities: ['maxCapacity']
      }
    };
    expect(generateQueryStringObject(searchQueryObject)).toEqual({
      includes: 'images,configurations',
      fields: {
        rooms: 'name,hourlyPrice,guestCapacities',
        guestCapacities: 'maxCapacity'
      }
    });
  });
});
