import * as React from 'react';

// Components
import TextAdornment from '@src/components/Listing/Form/TextAdornment';

// Types
import { currencySymbol, CurrencyProps } from '@src/components/Listing/Form';

const Currency = ({ currency }: CurrencyProps) => {
  return (
    <TextAdornment
      hasMoreLeftPadding={true}
      isBold={true}
      text={currencySymbol(currency)}
    />
  );
};

export default Currency;
