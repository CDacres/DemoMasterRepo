/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Prices from '@src/components/concrete/Prices';

type Props = {
  currency?: string;
  maxCapacity?: number | string;
  price?: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  showText?: boolean;
  text?: string;
  with3?: boolean;
};

const CardText: React.FunctionComponent<Props> = ({ currency, maxCapacity, price, showText, text, with3 }) => (
  <React.Fragment>
    {showText &&
      <div className={css(styles.cardTextContainer, pagestyles.smallText, pagestyles.textMap, margin.all_0, with3 ? styles.cardTextContainer_3 : styles.cardTextContainer_7)}>
        <div className={css(styles.cardText)}>
          {text}
        </div>
      </div>
    }
    <div className={css(styles.priceTextContainer, pagestyles.smallText, pagestyles.textMap, margin.top_0_75)}>
      <div className={css(styles.priceText)}>
        {(price && Object.keys(price).length > 0) &&
          <Prices
            currency={currency}
            price={price}
          />
        }
        {maxCapacity &&
          <React.Fragment>
            {(Object.keys(price).length > 0 && (price.hourly || price.daily || price.monthly)) &&
              <React.Fragment>
                {' '}·{' '}
              </React.Fragment>
            }
            <span>
              {maxCapacity}
            </span>
          </React.Fragment>
        }
      </div>
    </div>
  </React.Fragment>
);

CardText.defaultProps = {
  showText: true,
  with3: false,
};

export default CardText;
