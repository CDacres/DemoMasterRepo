
import handleRequestParams from '../handle-request-params';

describe('handleRequestParams', () => {
  it('should return the correct object when query has bounds', () => {
    const reqInfo = {
      params: {
        '1': 'meeting-rooms',
        '2': 'London--UK',
      },
      query: {
        guests: '14',
        neLat: '-33.890542',
        neLon: '151.274856',
        swLat: '-33.423036',
        swLon: '151.259052',
      },
    };
    expect(handleRequestParams(reqInfo)).toEqual({
      bounds: {
        neLat: '-33.890542',
        neLon: '151.274856',
        swLat: '-33.423036',
        swLon: '151.259052',
      },
      params: {
        guests: '14',
        location: 'London--UK',
        tag: 'meeting-rooms',
      },
    });
  });

  it('should return the correct object when query has no bounds', () => {
    const reqInfo = {
      params: {
        '1': 'meeting-rooms',
        '2': 'London--UK',
      },
      query: {
        guests: '14',
      },
    };
    expect(handleRequestParams(reqInfo)).toEqual({
      params: {
        guests: '14',
        location: 'London--UK',
        tag: 'meeting-rooms',
      },
    });
  });

  it('should return the correct object when query has no bounds, location or tag', () => {
    const reqInfo = {
      params: {
        '1': 'meeting-rooms',
        '2': 'London--UK',
      },
    };
    expect(handleRequestParams(reqInfo)).toEqual({
      params: {
        location: 'London--UK',
        tag: 'meeting-rooms',
      },
    });
  });
});
