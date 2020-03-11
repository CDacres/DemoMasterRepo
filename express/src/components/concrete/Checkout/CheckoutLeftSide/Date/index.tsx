/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import DateItem from '@src/components/concrete/Checkout/CheckoutLeftSide/Date/DateItem';

type Props = {
  dayFrom: number;
  dayTo: number;
  monthFrom: string;
  monthTo: string;
  monthShortFrom: string;
  monthShortTo: string;
  textFrom: string;
  textTo: string;
  timeFrom: string;
  timeTo: string;
  title: string;
};

const Date = ({ dayFrom, dayTo, monthFrom, monthTo, monthShortFrom, monthShortTo, textFrom, textTo, timeFrom, timeTo, title }: Props) => (
  <div>
    <div className={css(pagestyles.noBottomBorder, padding.topbottom_3)}>
      <Translatable content={{ transKey: title }}>
        <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
      </Translatable>
    </div>
    <div>
      <div className={css(pagestyles.inlineBlock, margin.right_3)}>
        <div className={css(pagestyles.inlineBlock, margin.bottom_3)}>
          <DateItem
            day={dayFrom}
            month={monthFrom}
            monthShort={monthShortFrom}
            text={textFrom}
            time={timeFrom}
          />
        </div>
      </div>
      <div className={css(pagestyles.inlineBlock, margin.bottom_3)}>
        <DateItem
          day={dayTo}
          month={monthTo}
          monthShort={monthShortTo}
          text={textTo}
          time={timeTo}
        />
      </div>
    </div>
  </div>
);

export default Date;
