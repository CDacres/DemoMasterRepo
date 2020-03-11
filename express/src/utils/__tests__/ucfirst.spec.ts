
import ucfirst from '../ucfirst';

describe('ucfirst', () => {
  it('should return the correct string', () => {
    expect(ucfirst('foobar')).toEqual('Foobar');
  });
});
