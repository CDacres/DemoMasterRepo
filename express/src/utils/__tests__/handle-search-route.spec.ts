
import handleSearchRoute from '../handle-search-route';

describe('handleSearchRoute', () => {
  it('should return the correct response object if a href with tag is supplied', () => {
    const params = {
      date: '',
      guests: '',
      lat: '',
      location: '',
      lon: '',
      tag: '',
    };
    const href = '/s/meeting';
    const responseObj = handleSearchRoute(params, href);
    expect(responseObj).toEqual({
      pathname: '/s/meeting',
      query: {},
    });
  });

  it('should return the correct response object if a href with tag and location is supplied', () => {
    const params = {
      date: '',
      guests: '',
      lat: '',
      location: '',
      lon: '',
      tag: '',
    };
    const href = '/s/meeting/London--UK';
    const responseObj = handleSearchRoute(params, href);
    expect(responseObj).toEqual({
      pathname: '/s/meeting/London--UK',
      query: {},
    });
  });

  it('should return the correct response object if no href is supplied and params contain a tag', () => {
    const params = {
      date: '',
      guests: '',
      lat: '',
      location: '',
      lon: '',
      tag: 'office-space',
    };
    const responseObj = handleSearchRoute(params);
    expect(responseObj).toEqual({
      pathname: '/s/office-space',
      query: {},
    });
  });

  it('should return the correct response object if no href is supplied and params contain a tag and location', () => {
    const params = {
      date: '',
      guests: '',
      lat: '',
      location: 'London--UK',
      lon: '',
      tag: 'office-space',
    };
    const responseObj = handleSearchRoute(params);
    expect(responseObj).toEqual({
      pathname: '/s/office-space/London--UK',
      query: {},
    });
  });

  it('should return the correct object if no href is supplied and there are params other than tag and location', () => {
    const params = {
      date: '14/12/2007',
      guests: 2,
      lat: '',
      location: '',
      lon: '',
      tag: '',
    };
    const responseObj = handleSearchRoute(params);
    expect(responseObj).toEqual({
      pathname: '/s',
      query: {
        date: '14/12/2007',
        guests: 2,
      },
    });
  });

  it('should return the correct object if no href and params has no location', () => {
    const params = {
      date: '14/12/2007',
      guests: 2,
      lat: '',
      location: '',
      lon: '',
      tag: 'meeting',
    };
    const responseObj = handleSearchRoute(params);
    expect(responseObj).toEqual({
      pathname: '/s/meeting',
      query: {
        date: '14/12/2007',
        guests: 2,
      },
    });
  });

  it('should return the correct response object if href is supplied and no location or tag', () => {
    const params = {
      date: '14/12/2007',
      guests: 2,
      lat: '',
      location: '',
      lon: '',
      tag: '',
    };
    const href = '/s/meeting/London--UK';
    const responseObj = handleSearchRoute(params, href);
    expect(responseObj).toEqual({
      pathname: '/s/meeting/London--UK',
      query: {
        date: '14/12/2007',
        guests: 2,
      },
    });
  });

  it('should return the correct response object if href is supplied and params contains a tag and location', () => {
    const params = {
      date: '14/12/2007',
      guests: 2,
      lat: '',
      location: 'Birmingham--UK',
      lon: '',
      tag: 'office-space',
    };
    const href = '/s/meeting/London--UK';
    const responseObj = handleSearchRoute(params, href);
    expect(responseObj).toEqual({
      pathname: '/s/meeting/London--UK',
      query: {
        date: '14/12/2007',
        guests: 2,
      },
    });
  });
});
