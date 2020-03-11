
import convertMinutesToTime from '../convert-minutes-to-time';

describe('convertMinutesToTime', () => {
  it('should convert minutes to time', () => {
    expect(convertMinutesToTime(1080)).toEqual('18:00');
  });
});
