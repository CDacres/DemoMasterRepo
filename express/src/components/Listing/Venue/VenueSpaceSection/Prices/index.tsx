import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Core
import { priceOrder } from '@src/core';
import { ListingsV1Space, PriceCoverage } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import PriceItem from '@src/components/Listing/Venue/VenueSpaceSection/Prices/PriceItem';

type Props = {
  space: ListingsV1Space;
};

const Prices = ({ space }: Props) => {
  const prices = priceOrder(space.prices).map((i) => {
    if (i.parameters.coverage === PriceCoverage.MINIMUMSPEND) {
      return (
        <PriceItem
          amount={i.parameters.constraints.spend.minSpendAmount}
          unit="listing.MINIMUMSPEND_priceTitle"
        />
      );
    } else {
      return (
        <PriceItem
          amount={i.parameters.unitPrice}
          unit={(i.parameters.coverage === PriceCoverage.FLATRATE) ? 'listing.FLATRATE_priceTitle' : `listing.${i.parameters.unit}_perShort`}
        />
      );
    }
  });
  return (
    <React.Fragment>
      <span className={css(styles.price)}>
        {prices.first()}
      </span>
      <span className={css(styles.subPrices)}>
        {prices.skip(1).map((i, index) => (
          <React.Fragment key={index}>
            {i}{' '}
          </React.Fragment>
        ))}
      </span>
    </React.Fragment>
  );
};

export default Prices;
