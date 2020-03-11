import * as React from 'react';
import DE from '@src/components/concrete/Icons/flags/DE';
import FR from '@src/components/concrete/Icons/flags/FR';
import IE from '@src/components/concrete/Icons/flags/IE';
import UK from '@src/components/concrete/Icons/flags/UK';
import US from '@src/components/concrete/Icons/flags/US';

const domains = [
  {
    prefix: 'de',
    flag: <DE />,
    transkey: 'Deutschland',
  },
  {
    prefix: 'fr',
    flag: <FR />,
    transkey: 'France',
  },
  {
    prefix: 'uk',
    flag: <UK />,
    transkey: 'UK',
  },
  {
    prefix: 'us',
    flag: <US />,
    transkey: 'US',
  },
  {
    prefix: 'ie',
    flag: <IE />,
    transkey: 'Ireland',
  },
];

export default domains;
