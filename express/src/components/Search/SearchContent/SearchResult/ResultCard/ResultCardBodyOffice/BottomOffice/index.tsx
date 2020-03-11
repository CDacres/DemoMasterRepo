import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import cardStyles from '../../styles';
import { lineheight, pagestyles } from '@src/styles';

// Utils
import { removeTrailingZeros } from '@src/utils';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  currencySymbol: string;
  item?: {
    price: number | null;
    text: string;
    type: string;
  };
};

const BottomOffice = ({ currencySymbol, item }: Props) => (
  <div className={css(pagestyles.thirdColumn, pagestyles.tableCell)}>
    {item !== null ? (
      <React.Fragment>
        <Translatable content={{ transKey: item.type }}>
          <div className={css(cardStyles.textColor, styles.priceTitle)} />
        </Translatable>
        <div className={css(cardStyles.textColor)}>
          <div className={css(lineheight.lineHeightNormal)}>
            <span>
              <span className={css(cardStyles.inlineText, cardStyles.textColor)}>
                <span className={css(cardStyles.hiddenText)}>
                  <Translatable content={{ transKey: 'common.price' }} />
                </span>
                <span>
                  {currencySymbol}{removeTrailingZeros(item.price)}
                </span>
              </span>
            </span>
          </div>
        </div>
        <div className={css(cardStyles.textColor)}>
          <div className={css(lineheight.lineHeightNormal)}>
            <span>
              <span className={css(cardStyles.inlineText, cardStyles.textColor)}>
                <Translatable content={{ transKey: 'common.per_month' }}>
                  <div className={css(styles.pricePeriodTitle, pagestyles.inlineBlock)} />
                </Translatable>
              </span>
            </span>
          </div>
        </div>
      </React.Fragment>
    ) : (
      null
    )}
  </div>
);

export default BottomOffice;
