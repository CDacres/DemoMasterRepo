import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import DetailDate from '@src/components/concrete/Checkout/CheckoutRightSide/Content/BookingDetails/DetailDate';
import DetailIcon from '@src/components/concrete/Checkout/CheckoutRightSide/Content/BookingDetails/DetailIcon';
import DetailItem from '@src/components/concrete/Checkout/CheckoutRightSide/Content/BookingDetails/DetailItem';
import { Arrow } from '@src/components/concrete/Icons/svgs';

type Props = {
  endDateTime?: {
    date?: {
      desc: string;
      text: string;
    };
    time?: {
      desc: string;
      text: string;
    };
  };
  guests: number;
  startDateTime?: {
    date?: {
      desc: string;
      text: string;
    };
    time?: {
      desc: string;
      text: string;
    };
  };
};

const BookingDetails = ({ endDateTime, guests, startDateTime }: Props) => (
  <div>
    <div className={css(margin.bottom_2)}>
      <DetailItem icon={<DetailIcon type="people" />}>
        <Translatable content={{ transKey: 'common.people_count', count: guests, replacements: { number: guests } }} />
      </DetailItem>
    </div>
    <DetailItem icon={<DetailIcon type="calendar" />}>
      {startDateTime &&
        <DetailDate dateTime={startDateTime} />
      }
      {(startDateTime && endDateTime) &&
        <div className={css(pagestyles.inlineBlock, margin.leftright_1_5)}>
          <Arrow direction="right" />
        </div>
      }
      {endDateTime &&
        <DetailDate dateTime={endDateTime} />
      }
    </DetailItem>
  </div>
);

export default BookingDetails;
