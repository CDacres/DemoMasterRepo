import * as React from 'react';

// Core
import { CurrencyAmount } from '@src/core/domain';

// Components
import Spell from '@src/components/Listing/Translate/Spell';

// Types
import { currencySymbol } from '@src/components/Listing/Form';

type Props = {
  amount: CurrencyAmount;
  unit: string;
};

const PriceItem = ({ amount, unit }: Props) => (
  <React.Fragment>
    {currencySymbol(amount.currency)}{amount.value.toFixed(0)}
    {' '}
    <Spell word={unit} />
  </React.Fragment>
);

export default PriceItem;
