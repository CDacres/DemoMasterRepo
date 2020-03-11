/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { lineheight, margin, pagestyles } from '@src/styles';

// Components
import Stars from '@src/components/concrete/Stars';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Prices from '@src/components/concrete/Prices';

type Props = {
  currency: string;
  price?: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating: number;
  reviews: number;
};

const RoomPrice = ({ currency, price, rating, reviews }: Props) => (
  <React.Fragment>
    <div>
      <Prices
        currency={currency}
        price={price}
        priceStyle={styles.price}
        periodStyle={styles.period}
      />
    </div>
    {(rating && reviews) &&
      <div>
        <span className={css(margin.right_0_5)}>
          <Translatable attributes={{ 'aria-label': { transKey: 'common.rating', count: rating, replacements: { number: rating } } }}>
            <span role="img">
              <Stars rating={rating} />
            </span>
          </Translatable>
        </span>
        <Translatable attributes={{ 'aria-label': { transKey: 'common.reviews', count: reviews } }}>
          <span className={css(pagestyles.fontMedium, lineheight.lineHeightSmall)}>
            {reviews}
          </span>
        </Translatable>
      </div>
    }
  </React.Fragment>
);

export default RoomPrice;
