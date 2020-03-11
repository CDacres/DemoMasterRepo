
import { convertLocationSlugToString, convertLocationStringToSlug } from '../convert-location-slug';

describe('convertLocationSlugToString', () => {
  it('should convert a location slug to a string', () => {
    expect(convertLocationSlugToString('London--UK')).toEqual('London, UK');
  });
});

describe('convertLocationStringToSlug', () => {
  it('should convert a location string to a slug', () => {
    expect(convertLocationStringToSlug('London, UK')).toEqual('London--UK');
  });
});
