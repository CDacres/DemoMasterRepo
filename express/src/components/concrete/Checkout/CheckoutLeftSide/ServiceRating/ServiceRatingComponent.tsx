/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Item from '@src/components/concrete/Checkout/CheckoutLeftSide/ServiceRating/Item';

type Props = {
  handleRating: (e: any) => void;
  selectedRating: string | number;
  showInput: boolean;
};

const ServiceRating = ({ handleRating, selectedRating, showInput }: Props) => {
  const list = [];
  for (let i = 0; i < 11; i++) {
    list.push(
      <Item
        action={() => handleRating(i)}
        isLast={i === 11}
        key={i}
        selected={Number(selectedRating) === i}
        text={i}
      />
    );
  }

  return (
    <div>
      <div className={css(styles.serviceRatingGridContainer, padding.top_1)}>
        {showInput &&
          <StyledInput
            id="comment"
            isBig={true}
            name="comment"
          />
        }
        <div className={css(margin.bottom_1)}>
          <Translatable content={{ transKey: 'checkout.payments_service_rating_how_likely' }}>
            <p />
          </Translatable>
        </div>
        <div className={css(margin.bottom_1)}>
          <Translatable content={{ transKey: 'checkout.payments_service_rating_not_at_all' }}>
            <label className={css(styles.serviceRatingQuestionLabel, padding.bottom_2)} />
          </Translatable>
          <ul className={css(styles.serviceRatingList, margin.all_0_5, padding.all_0)}>
            {list}
          </ul>
          <Translatable content={{ transKey: 'checkout.payments_service_rating_extremely' }}>
            <label className={css(styles.serviceRatingQuestionLabel, padding.bottom_2, styles.serviceRatingQuestionLabelLast)} />
          </Translatable>
        </div>
      </div>
    </div>
  );
};

export default ServiceRating;
