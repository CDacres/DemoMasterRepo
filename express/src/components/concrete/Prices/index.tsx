import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  currency: string;
  periodStyle?: object;
  price: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  priceStyle?: object;
};

const Prices: React.FunctionComponent<Props> = ({ currency, periodStyle, price, priceStyle }) => {
  const renderPrice = (itemCurrency, itemPrice, transKey) => (
    <React.Fragment>
      <span {...(priceStyle ? { className: css(priceStyle) } : {})}>
        {itemCurrency}{itemPrice}
      </span>
      <Translatable content={{ transKey: transKey }}>
        <span {...(periodStyle ? { className: css(periodStyle) } : {})} />
      </Translatable>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      {price.hourly ? (
        <React.Fragment>
          {renderPrice(currency, price.hourly, 'common.per_hour')}
        </React.Fragment>
      ) : (price.daily ? (
        <React.Fragment>
          {renderPrice(currency, price.daily, 'common.per_day')}
        </React.Fragment>
      ) : (price.monthly ? (
        <React.Fragment>
          {renderPrice(currency, price.monthly, 'common.per_month')}
        </React.Fragment>
      ) : (
        null
      )))}
    </React.Fragment>
  );
};

Prices.defaultProps = {
  periodStyle: null,
  priceStyle: margin.right_0_5,
};

export default Prices;
