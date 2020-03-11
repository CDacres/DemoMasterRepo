
import convertObjectToMap from '../convert-object-to-map';

describe('convertObjectToMap', () => {
  it('should convert an object to a map', () => {
    const expectedMap = new Map();
    expectedMap.set('foo', 'bar');

    expect(convertObjectToMap({ foo: 'bar' })).toEqual(expectedMap);
  });
});
