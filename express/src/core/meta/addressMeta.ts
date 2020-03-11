// ISO 3166-1 alpha-2
import { Address } from '@src/core/domain';

type CountryCode = string;

type AddressMeta = Record<'def' | CountryCode, AddressTemplate>;

export type AddressTemplate = {
  disableSuggestion?: boolean;
  fields: Array<(keyof Address)>;
  placeholders: { [P in keyof Address]?: string };
  requiredFields: Array<(keyof Address)>;
};

export const addressMeta: AddressMeta = {
  'def': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'Apt., suite, building access code',
      'street': 'House name/number + street/road',
    },
  },
  'DE': {
    'fields': [
      'street',
      'extra',
      'city',
      'postcode',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'postcode': 'z. B 10719',
      'extra': 'z. B Gebäude 1',
      'city': 'z. B Berlin',
      'street': 'z. B Kurfürstendamm 67',
    },
  },
  'HK': {
    'fields': [
      'county',
      'city',
      'street',
      'extra',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'extra': '例如：雅佳大廈1108室',
      'city': '例如：尖沙咀',
      'street': '例如：廣東道88號',
      'county': '例如：九龍',
    },
    'disableSuggestion': true,
  },
  'RU': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'например, кв. №7',
      'street': 'например, ул. Ленина, д. 12',
    },
  },
  'PT': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'ex: 2 DTO',
      'street': 'ex: Rua do Farol 2',
    },
  },
  'JP': {
    'fields': [
      'postcode',
      'county',
      'city',
      'street',
      'extra',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'postcode': '例）123-4567',
      'extra': '例）101号室',
      'city': '例）中央区',
      'street': '例）銀座1丁目１−１',
      'county': '例）東京都',
    },
    'disableSuggestion': true,
  },
  'DK': {
    'fields': [
      'street',
      'extra',
      'postcode',
      'city',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'postcode': 'f.eks.: 1000',
      'extra': 'f.eks.: stuen',
      'city': 'f.eks.: København K',
      'street': 'f.eks.: Gæstgivergade 1',
    },
  },
  'HR': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'npr. stan br. 7',
      'street': 'npr. Glavna ulica 123',
    },
  },
  'FR': {
    'fields': [
      'street',
      'extra',
      'postcode',
      'city',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'postcode': 'ex : 75010',
      'extra': 'ex : Bât. B',
      'city': 'ex : Paris',
      'street': 'ex : 27 rue Jean Goujon',
    },
  },
  'NZ': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'e.g. Apt #7',
      'street': 'e.g. 173 Park Road',
    },
  },
  'BR': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'postcode': 'ex. 4377190',
      'extra': 'ex. apt 50',
      'city': 'ex. Campinas',
      'street': 'ex. Rua Bossoroca, 1',
      'county': 'ex. SP',
    },
  },
  'SG': {
    'fields': [
      'street',
      'extra',
      'city',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'postcode': 'e.g. 308215',
      'extra': 'e.g. # 13–37 Mandalay Towers',
      'city': 'e.g. Singapore',
      'street': 'e.g. Blk 35 Mandalay Road',
    },
  },
  'GB': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'postcode': 'e.g. SW1P 3PA',
      'extra': 'e.g. Apart. 2',
      'city': 'e.g. London',
      'street': 'e.g. 20 Deans Yd',
      'county': 'e.g. Greater London',
    },
  },
  'ID': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'misalnya, Apartemen #7',
      'street': 'misalnya, 30 Jalan Banda',
    },
  },
  'IE': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'postcode': 'e.g. 14',
      'extra': 'e.g. Apt. 2',
      'city': 'e.g. Dublin',
      'street': 'e.g. 12 Drumcondra Road',
      'county': 'e.g. Galway',
    },
  },
  'US': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'postcode': 'e.g. 94103',
      'extra': 'e.g. Apt #7',
      'city': 'e.g. San Francisco',
      'street': 'e.g. 123 Main St.',
      'county': 'e.g. CA',
    },
  },
  'CA': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'postcode': 'e.g. T5H 3Z3',
      'extra': 'e.g. Suite #7',
      'city': 'e.g. Edmonton',
      'street': 'e.g. 11108 108th Avenue',
      'county': 'e.g. Alberta',
    },
  },
  'IL': {
    'fields': [
      'street',
      'extra',
      'city',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'postcode': 'ex. 64312',
      'extra': 'ex. apartment 1',
      'city': 'ex. Tel Aviv',
      'street': 'ex. 7 Bloch',
    },
  },
  'KR': {
    'fields': [
      'county',
      'city',
      'street',
      'extra',
      'postcode',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'postcode': '예) 135-919',
      'extra': '예) 35동 4층 407호',
      'city': '예) 강남구',
      'street': '예) 언주로 406',
      'county': '예) 서울특별시',
    },
    'disableSuggestion': true,
  },
  'ZA': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'e.g. Apt #7',
      'street': 'e.g. 1234 Church Street',
    },
  },
  'CL': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'p. ej.: Piso 5',
      'street': 'p. ej.: Moneda 1152',
    },
  },
  'IT': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'postcode': 'ad es. 20121',
      'extra': 'ad es. Int. 21',
      'city': 'ad es. Milano',
      'street': 'ad es. Via Garibaldi, 90',
      'county': 'ad es. (MI)',
    },
  },
  'CN': {
    'fields': [
      'county',
      'city',
      'street',
      'extra',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'extra': '例如：街道门牌号、小区楼号、楼层、房间号',
      'city': '例如：青岛市',
      'street': '如不清楚，可输入名称以搜索',
      'county': '例如：山东省',
    },
    'disableSuggestion': true,
  },
  'MX': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'p. ej.: Piso 2',
      'street': 'p. ej.: Urión 30',
    },
  },
  'GR': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'π.χ. Διαμέρισμα #7',
      'street': 'π.χ. Εγνατίας 123',
    },
  },
  'CO': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'p. ej: Apto 702',
      'street': 'p. ej.: Carrera 7 # 65 - 23',
    },
  },
  'ES': {
    'fields': [
      'street',
      'extra',
      'city',
      'postcode',
      'county',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'postcode': 'ej.: 28013',
      'extra': 'ej.: 2º 4ª',
      'city': 'ej.: Madrid',
      'street': 'ej.: Gran Vía, 41',
      'county': 'ej.: Madrid',
    },
  },
  'CU': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'p. ej: apt. 4a',
      'street': 'p. ej.: Reina #35',
    },
  },
  'AU': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
      'county',
    ],
    'placeholders': {
      'postcode': 'e.g. 2010',
      'extra': 'e.g. Unit 401',
      'city': 'e.g. Surry Hills',
      'street': 'e.g. 123 Main St',
      'county': 'e.g. NSW',
    },
  },
  'CW': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'Apt., suite, building access code',
      'street': 'e.g. Waaigatplein 1',
    },
  },
  'NL': {
    'fields': [
      'street',
      'extra',
      'postcode',
      'city',
    ],
    'requiredFields': [
      'postcode',
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'postcode': 'b.v. 1234 AB',
      'extra': 'b.v. Gebouw A',
      'city': 'b.v. Amsterdam',
      'street': 'b.v. Kerklaan 1',
    },
  },
  'TR': {
    'fields': [
      'street',
      'extra',
      'city',
      'county',
      'postcode',
    ],
    'requiredFields': [
      'countryCode',
      'city',
      'street',
    ],
    'placeholders': {
      'extra': 'Ör. Kat 5 D:13',
      'street': 'Ör. Fazlipasa Caddesi No. 8',
    },
  },
};
