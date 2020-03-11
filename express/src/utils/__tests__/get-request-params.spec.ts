
import getRequestParams from '../get-request-params';

describe('getRequestParams', () => {
  it('should return an object with a params key and a query key', () => {
    const responseObj = getRequestParams('');
    expect(responseObj).toEqual({
      params: {},
      query: {},
    });
  });

  it('should return the correct response object with only tag', () => {
    const url = '/uk/s/meeting';
    const responseObj = getRequestParams(url);
    expect(responseObj).toEqual({
      params: {
        '0': 's',
        '1': 'meeting',
      },
      query: {},
    });
  });

  it('should return the correct response object with tag and location', () => {
    const url = '/uk/s/meeting/London--UK';
    const responseObj = getRequestParams(url);
    expect(responseObj).toEqual({
      params: {
        '0': 's',
        '1': 'meeting',
        '2': 'London--UK',
      },
      query: {},
    });
  });

  it('should return the correct response object with tag, location and query params', () => {
    const url = '/uk/s/meeting/London--UK?guests=14';
    const responseObj = getRequestParams(url);
    expect(responseObj).toEqual({
      params: {
        '0': 's',
        '1': 'meeting',
        '2': 'London--UK',
      },
      query: {
        guests: '14',
      },
    });
  });
});
