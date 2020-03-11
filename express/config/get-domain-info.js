const getDomainInfo = domain => {
  switch (domain) {
    case 'de':
      return {
        bounds: {
          neLat: 55.1781815,
          neLon: 14.9318521,
          swLat: 47.0060938,
          swLon: 6.7033105
        },
        countryCode: 'de',
        countryName: 'Deutschland',
        datepickerLang: 'de',
        defaultLocation: {
          lat: '52.5213100',
          locationDesc: 'Berlin, Deutschland',
          locationSlug: 'Berlin--Deutschland',
          lon: '13.4054600'
        },
        defaultSlug: 'meetingraum',
        language: 'de',
        languageName: 'Deutsch',
        locale: 'de_DE',
        phone: {
          phoneNumber: '+4932211121730',
          phoneNumberDisplay: '+49 (0)3221 1121730'
        }
      };
    case 'fr':
      return {
        bounds: {
          neLat: 51.0891285,
          neLon: 9.5597934,
          swLat: 41.3427780,
          swLon: -5.1422579
        },
        countryCode: 'fr',
        countryName: 'France',
        datepickerLang: 'fr',
        defaultLocation: {
          lat: '48.8569240',
          locationDesc: 'Paris, France',
          locationSlug: 'Paris--France',
          lon: '2.3526841'
        },
        defaultSlug: 'salle-de-r%C3%A9union',
        language: 'fr',
        languageName: 'Français',
        locale: 'fr_FR',
        phone: {
          phoneNumber: '+33974592000',
          phoneNumberDisplay: '+33 9 74 59 20 00'
        }
      };
    case 'ie':
      return {
        bounds: {
          neLat: 55.7712184,
          neLon: -7.1779374,
          swLat: 51.0401947,
          swLon: -9.1641758
        },
        countryCode: 'ie',
        countryName: 'Ireland',
        datepickerLang: 'en-IE',
        defaultLocation: {
          lat: '53.3497915',
          locationDesc: 'Dublin, Ireland',
          locationSlug: 'Dublin--Ireland',
          lon: '-6.2602366'
        },
        defaultSlug: 'meeting-rooms',
        language: 'en_IE',
        languageName: 'English (IE)',
        locale: 'en_IE',
        phone: {
          phoneNumber: '+35319079700',
          phoneNumberDisplay: '+353 (0)1 907 9700'
        }
      };
    case 'us':
      return {
        bounds: {
          neLat: 54.2335075,
          neLon: -69.4351731,
          swLat: 16.4393707,
          swLon: -111.3653281
        },
        countryCode: 'us',
        countryName: 'United States',
        datepickerLang: 'en-US',
        defaultLocation: {
          lat: '40.7127461',
          locationDesc: 'New York, NY, United States',
          locationSlug: 'New York--NY--United States',
          lon: '-74.0059740'
        },
        defaultSlug: 'meeting-space',
        language: 'en_US',
        languageName: 'English (US)',
        locale: 'en_US',
        phone: {
          phoneNumber: '+16469922212',
          phoneNumberDisplay: '+1 646-992-2212'
        }
      };
    default:
      return {
        bounds: {
          neLat: 59.5000000,
          neLon: 2.0000000,
          swLat: 49.8200000,
          swLon: -10.8500000
        },
        countryCode: 'gb',
        countryName: 'United Kingdom',
        datepickerLang: 'en-GB',
        defaultLocation: {
          lat: '51.5072996',
          locationDesc: 'London, UK',
          locationSlug: 'London--UK',
          lon: '-0.1280232'
        },
        defaultSlug: 'meeting-rooms',
        language: 'en',
        languageName: 'English (UK)',
        locale: 'en_GB',
        phone: {
          phoneNumber: '+442071832212',
          phoneNumberDisplay: '+44 (0)20 7183 2212'
        }
      };
  }
};

module.exports = getDomainInfo;
