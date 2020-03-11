
import handlePathname from '../handle-pathname';

describe('handlePathname', () => {
  it('should handle a pathname without variables', () => {
    const route = {
      name: 'meeting-rooms-london',
      regExp: '^\/(meeting-rooms)\/(london)\/?$',
      pathname: 'meeting-rooms/london',
      langKey: 'location',
      filePath: '/landing_pages/location',
      domainSpecific: true
    };

    expect(handlePathname(route, '/meeting-rooms/london')).toEqual('meeting-rooms/london');
  });

  it('should handle a pathname with a variable', () => {
    const route = {
      name: 'browse',
      regExp: '^\/([a-zA-Z0-9%-]+)\/?$',
      pathname: '$1',
      langKey: 'browse',
      filePath: '/landing_pages/browse',
      domainSpecific: true
    };

    expect(handlePathname(route, '/training-rooms')).toEqual('training-rooms');
  });

  it('should handle a pathname with a domain and a variable', () => {
    const route = {
      name: 'browse',
      regExp: '^\/([a-zA-Z0-9%-]+)\/?$',
      pathname: '$1',
      langKey: 'browse',
      filePath: '/landing_pages/browse',
      domainSpecific: true
    };

    expect(handlePathname(route, '/training-rooms')).toEqual('training-rooms');
  });

  it('should handle a pathname with multiple variables', () => {
    const route = {
      name: 'location',
      regExp: '^\/([a-zA-Z0-9%-]+)\/([a-zA-Z0-9%-]+)\/?$',
      pathname: '$1/$2',
      langKey: 'location',
      filePath: '/landing_pages/location',
      domainSpecific: true
    };

    expect(handlePathname(route, '/training-rooms/london')).toEqual('training-rooms/london');
  });

  it('should handle a pathname with a domain and multiple variables', () => {
    const route = {
      name: 'location',
      regExp: '^\/([a-zA-Z0-9%-]+)\/([a-zA-Z0-9%-]+)\/?$',
      pathname: '$1/$2',
      langKey: 'location',
      filePath: '/landing_pages/location',
      domainSpecific: true
    };

    expect(handlePathname(route, '/training-rooms/london')).toEqual('training-rooms/london');
  });

  it ('should handle a pathname with multiple separated variables', () => {
    const route = {
      name: 'location',
      regExp: '^\/([a-zA-Z0-9%-]+)\/bobbins\/([a-zA-Z0-9%-]+)\/babadook\/([a-zA-Z0-9%-]+)\/?$',
      pathname: '$1/bobbins/$2/babadook/$3',
      langKey: 'location',
      filePath: '/landing_pages/location',
      domainSpecific: true
    };

    expect(handlePathname(route, '/training-rooms/bobbins/london/babadook/karachi'))
      .toEqual('training-rooms/bobbins/london/babadook/karachi');
  });

  it('should throw error if the wrong route has been supplied', () => {
    const route = {
      name: 'location',
      regExp: '^\/([a-zA-Z0-9%-]+)\/bobbins\/([a-zA-Z0-9%-]+)\/babadook\/([a-zA-Z0-9%-]+)\/?$',
      pathname: '$1/bobbins/$2/babadook/$3',
      langKey: 'location',
      filePath: '/landing_pages/location',
      domainSpecific: true
    };

    expect(() => handlePathname(route, '/training-rooms/bobbins/london'))
      .toThrow();
  });
});
