
import { defaultSize, defaultSizes, getWidth, mobileParser } from '../mobile-parser';

describe('mobileParser', () => {
  it('should return the correct object for Desktop User-Agent', () => {
    // tslint:disable-next-line
    const ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';
    expect(mobileParser({ headers: { 'User-Agent': ua } })).toEqual({
      phone: false,
      tablet: false,
      mobile: false,
      desktop: true,
    });
  });

  it('should return the correct object for Desktop user-agent', () => {
    // tslint:disable-next-line
    const ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';
    expect(mobileParser({ headers: { 'user-agent': ua } })).toEqual({
      phone: false,
      tablet: false,
      mobile: false,
      desktop: true,
    });
  });

  it('should return the correct object for Mobile User-Agent', () => {
    // tslint:disable-next-line
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
    expect(mobileParser({ headers: { 'User-Agent': ua } })).toEqual({
      phone: true,
      tablet: false,
      mobile: true,
      desktop: false,
    });
  });

  it('should return the correct object for Desktop user-agent', () => {
    // tslint:disable-next-line
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
    expect(mobileParser({ headers: { 'user-agent': ua } })).toEqual({
      phone: true,
      tablet: false,
      mobile: true,
      desktop: false,
    });
  });

  it('should return the correct object for Mobile User-Agent', () => {
    // tslint:disable-next-line
    const ua = 'Mozilla/5.0 (Linux; Android 7.0; SM-T827R4 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.116 Safari/537.36';
    expect(mobileParser({ headers: { 'User-Agent': ua } })).toEqual({
      phone: false,
      tablet: true,
      mobile: true,
      desktop: false,
    });
  });

  it('should return the correct object for Desktop user-agent', () => {
    // tslint:disable-next-line
    const ua = 'Mozilla/5.0 (Linux; Android 7.0; SM-T827R4 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.116 Safari/537.36';
    expect(mobileParser({ headers: { 'user-agent': ua } })).toEqual({
      phone: false,
      tablet: true,
      mobile: true,
      desktop: false,
    });
  });
});

describe('getWidth', () => {
  it('should return the correct default size', () => {
    expect(getWidth()).toEqual(defaultSize);
  });

  it('should return the correct size for default mobile', () => {
    expect(getWidth({
      phone: false,
      tablet: false,
      mobile: true,
      desktop: false,
    })).toEqual(defaultSizes.phone);
  });

  it('should return the correct size for mobile phone', () => {
    expect(getWidth({
      phone: true,
      tablet: false,
      mobile: true,
      desktop: false,
    })).toEqual(defaultSizes.phone);
  });

  it('should return the correct size for mobile tablet', () => {
    expect(getWidth({
      phone: false,
      tablet: true,
      mobile: true,
      desktop: false,
    })).toEqual(defaultSizes.tablet);
  });

  it('should return the correct size for desktop', () => {
    expect(getWidth({
      phone: false,
      tablet: false,
      mobile: false,
      desktop: true,
    })).toEqual(defaultSizes.desktop);
  });
});
