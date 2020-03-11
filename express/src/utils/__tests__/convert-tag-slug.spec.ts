
import { convertTagSlugToString, convertTagStringToSlug } from '../convert-tag-slug';

describe('convertTagSlugToString', () => {
  it('should convert a tag slug to a string', () => {
    expect(convertTagSlugToString('meeting-rooms')).toEqual('meeting rooms');
  });
});

describe('convertTagStringToSlug', () => {
  it('should convert a tag string to a slug', () => {
    expect(convertTagStringToSlug('meeting rooms')).toEqual('meeting-rooms');
  });
});
