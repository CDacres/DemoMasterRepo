/* tslint:disable:max-line-length */
import { Asset, ConfigurationKind, NearbyPlaceType, PriceCoverage, ProductCategory, TimeUnit, VenueImageTypes } from '@src/core/domain';
import { AreaUnit, Currency, DayOfWeek, LengthUnit, Ref } from '@src/core';
import { amenities as meetingAmenities } from '@src/data/product/meeting';

export const resolveAsset = (__, { id, category }: { id: string; category: ProductCategory }) => {
  switch (category) {
    case ProductCategory.MEETING:
    case ProductCategory.OFFICE:
    case ProductCategory.DINING:
      return resolveOfficeAsset(id, category);
    default:
      return null;
  }
};

export const resolveOfficeAsset = (id: Ref, category: ProductCategory): Asset => {
  const res: Asset = {
    aliases: [
      {
        category,
        description: `Trailer Happiness is an intimate lounge bar, den and kitchen on Portobello Road with the e-z-boy feel of a low rent, mid-60s California valley bachelor pad. Set in a basement on Portobello Road, this is one of the very fine cocktail bars in West London and certainly Notting Hill. The decor is quirky, off-beat and buzzes with young Londoner's looking to party and sample of the best cocktails around. It's a cosmopolitan kitsch Tiki Bar in London, something a little different and a fun night in London. Booking recommended. Ideal for all cocktail aficionados, their team of mixologists will amaze even the most die-hard of cocktail fans with their incredibly innovative mixes. Also hosting regular DJ nights, it's a really fun party place that you won't want to miss out from.`,
        name: `WeWork ${id} Merchant Square`,
      },
    ],
    // weird back & forth
    amenities: meetingAmenities.map(({ name, amenity_id, image_url, price }) => ({
      amenity: {
        description: name,
        id: amenity_id,
        imageUrl: image_url,
      },
      isActive: true,
      note: '',
      price: {
        currency: Currency.GBP,
        value: price,
      },
    })),
    capacity: {
      area: {
        unit: AreaUnit.M2,
        value: 100,
      },
      configurations: [
        {
          kind: ConfigurationKind.RECEPTION,
          maxPax: 50,
        },
        {
          kind: ConfigurationKind.THEATRE,
          maxPax: 20,
        },
      ],
    },
    currency: 'GBP',
    description: `Trailer Happiness is an intimate lounge bar, den and kitchen on Portobello Road with the e-z-boy feel of a low rent, mid-60s California valley bachelor pad. Set in a basement on Portobello Road, this is one of the very fine cocktail bars in West London and certainly Notting Hill. The decor is quirky, off-beat and buzzes with young Londoner's looking to party and sample of the best cocktails around. It's a cosmopolitan kitsch Tiki Bar in London, something a little different and a fun night in London. Booking recommended. Ideal for all cocktail aficionados, their team of mixologists will amaze even the most die-hard of cocktail fans with their incredibly innovative mixes. Also hosting regular DJ nights, it's a really fun party place that you won't want to miss out from.`,
    images: [
      {
        description: 'VM',
        image: {
          id: 'i0',
          tags: [],
          type: VenueImageTypes.FOOD,
          urls: { thumbUrl: 'https://static.wixstatic.com/media/5d2821_e123807f9d454208a94d27320d191a5e~mv2.jpg' },
        },
        orderIndex: 0,
      },
      {
        description: 'MV2',
        image: {
          id: 'i1',
          tags: [],
          type: VenueImageTypes.FOOD,
          urls: { thumbUrl: 'https://static.wixstatic.com/media/5d2821_d390ae8a83794a73bd45742df6607de5~mv2.jpg' },
        },
        orderIndex: 1,
      },
    ],
    location: {
      address: {
        country: 'United Kingdom',
        countryCode: 'GB',
        city: 'London',
        formattedAddress: '',
        street: '',
      },
      coords: {
        lat: 51.0,
        lng: 0.0,
      },
      nearbyPlaces: [
        {
          distance: {
            unit: LengthUnit.METER,
            value: 700,
          },
          name: 'Westminster',
          types: [NearbyPlaceType.SUBWAY_STATION],
        },
        {
          distance: {
            unit: LengthUnit.METER,
            value: 300,
          },
          name: 'Oxford Circus',
          types: [NearbyPlaceType.SUBWAY_STATION],
        },
      ],
      specialInstructions: 'Step right in',
    },
    menus: [
      {
        id: 'mmm',
        description: 'Set Menu 1',
        groups: [
          {
            description: 'MAIN',
            items: [
              {
                description: 'Steak',
                orderIndex: 0,
                priceOptions: [],
              },
            ],
            orderIndex: 0,
          },
        ],
        priceOptions: [
          {
            description: 'STANDARD',
            kind: 'STD',
            price: {
              currency: Currency.GBP,
              value: 20,
            },
          },
        ],
      },
    ],
    name: `WeWork ${id} Merchant Square`,
    openingHours: [
      {
        day: DayOfWeek.MONDAY,
        spans: [
          {
            end: 880,
            start: 480,
          },
        ],
      },
      {
        day: DayOfWeek.TUESDAY,
        spans: [
          {
            end: 880,
            start: 480,
          },
        ],
      },
    ],
    products: [
      {
        category: ProductCategory.MEETING,
        description: '...',
        id: '2',
        includes: [
          {
            description: 'Picasso',
            orderIndex: 0,
          },
        ],
        name: 'Meeting Basic',
        parameters: {
          constraints: {},
          coverage: PriceCoverage.ALLIN,
          depositAmount: {
            currency: Currency.GBP,
            value: 0,
          },
          depositPercent: 0,
          schedule: {
            days: [
              {
                day: DayOfWeek.MONDAY,
                spans: [
                  {
                    end: 880,
                    start: 480,
                  },
                ],
              },
              {
                day: DayOfWeek.TUESDAY,
                spans: [
                  {
                    end: 880,
                    start: 480,
                  },
                ],
              },
            ],
          },
          unit: TimeUnit.DAY,
          unitPrice: {
            currency: Currency.GBP,
            value: 100,
          },
        },
        perPerson: true,
      },
      {
        category: ProductCategory.MEETING,
        description: 'XX',
        id: '1',
        includes: [],
        name: 'Basic Pieces',
        perPerson: false,
        parameters: {
          constraints: {},
          coverage: PriceCoverage.ALLIN,
          depositAmount: {
            currency: Currency.GBP,
            value: 0,
          },
          depositPercent: 0,
          schedule: {
            days: [
              {
                day: DayOfWeek.MONDAY,
                spans: [
                  {
                    end: 880,
                    start: 480,
                  },
                ],
              },
              {
                day: DayOfWeek.TUESDAY,
                spans: [
                  {
                    end: 880,
                    start: 480,
                  },
                ],
              },
            ],
          },
          unit: TimeUnit.DAY,
          unitPrice: {
            currency: Currency.GBP,
            value: 600,
          },
        },
      },
      {
        category: ProductCategory.MEETING,
        description: 'XX',
        id: '1',
        includes: [],
        name: 'Basic Pieces',
        perPerson: false,
        parameters: {
          constraints: {},
          coverage: PriceCoverage.ALLIN,
          depositAmount: {
            currency: Currency.GBP,
            value: 0,
          },
          depositPercent: 0,
          schedule: {
            days: [
              {
                day: DayOfWeek.MONDAY,
                spans: [
                  {
                    end: 13 * 60,
                    start: 9 * 60,
                  },
                  {
                    end: 18 * 60,
                    start: 14 * 60,
                  },
                ],
              },
              {
                day: DayOfWeek.TUESDAY,
                spans: [
                  {
                    end: 13 * 60,
                    start: 9 * 60,
                  },
                ],
              },
            ],
          },
          unit: TimeUnit.SPAN,
          unitPrice: {
            currency: Currency.GBP,
            value: 400,
          },
        },
      },
      {
        category: ProductCategory.MEETING,
        description: 'XX',
        id: '1',
        includes: [],
        name: 'Basic Pieces',
        perPerson: false,
        parameters: {
          constraints: {},
          coverage: PriceCoverage.ALLIN,
          depositAmount: {
            currency: Currency.GBP,
            value: 0,
          },
          depositPercent: 0,
          schedule: {
            days: [
              {
                day: DayOfWeek.MONDAY,
                spans: [
                  {
                    end: 880,
                    start: 480,
                  },
                ],
              },
              {
                day: DayOfWeek.TUESDAY,
                spans: [
                  {
                    end: 880,
                    start: 480,
                  },
                ],
              },
            ],
          },
          unit: TimeUnit.HOUR,
          unitPrice: {
            currency: Currency.GBP,
            value: 150,
          },
        },
      },
      {
        category: ProductCategory.MEETING,
        description: 'XX',
        id: '1',
        includes: [],
        name: 'Basic Pieces',
        perPerson: false,
        parameters: {
          constraints: {},
          coverage: PriceCoverage.ALLIN,
          depositAmount: {
            currency: Currency.GBP,
            value: 0,
          },
          depositPercent: 0,
          unit: TimeUnit.HOUR,
          unitPrice: {
            currency: Currency.GBP,
            value: 200,
          },
          schedule: {
            days: [
              {
                day: DayOfWeek.MONDAY,
                spans: [
                  {
                    end: 1440,
                    start: 880,
                  },
                ],
              },
            ],
          },
        },
      },
      {
        category: ProductCategory.MEETING,
        description: 'XX',
        id: '1',
        includes: [],
        name: 'Basic Pieces',
        perPerson: false,
        parameters: {
          constraints: {
            guests: {
              maxPax: 50,
              minPax: 1,
            },
          },
          coverage: PriceCoverage.ALLIN,
          depositAmount: {
            currency: Currency.GBP,
            value: 0,
          },
          depositPercent: 0,
          schedule: {
            days: [
              {
                day: DayOfWeek.MONDAY,
                spans: [
                  {
                    end: 880,
                    start: 480,
                  },
                ],
              },
              {
                day: DayOfWeek.TUESDAY,
                spans: [
                  {
                    end: 880,
                    start: 480,
                  },
                ],
              },
            ],
          },
          unit: TimeUnit.MONTH,
          unitPrice: {
            currency: Currency.GBP,
            value: 3000,
          },
        },
      },
    ],
    website: 'www.sample.com',
  };
  return res;
};
