/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import cardStyles from '../styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Stars from '@src/components/concrete/Stars';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  rating: number;
  reviewsCountString: string;
};

const ResultReviews = ({ rating, reviewsCountString }: Props) => (
  <div className={css(styles.reviewSection, pagestyles.textMap)}>
    <div className={css(pagestyles.inlineBlock)}>
      <span className={css(styles.verticallyAligned_middle, margin.right_0_25)}>
        <Translatable attributes={{ 'aria-label': { transKey: 'common.rating', count: 1, replacements: { number: rating } } }}>
          <span role="img">
            <Stars rating={rating} />
          </span>
        </Translatable>
      </span>
      <span className={css(cardStyles.hiddenText)}>
        {reviewsCountString}
      </span>
      <span
        aria-hidden="true"
        className={css(styles.verticallyAligned_middle)}
      >
        <span className={css(styles.reviewSectionText, cardStyles.textColor, margin.all_0)}>
          {reviewsCountString}
        </span>
      </span>
    </div>
  </div>
);

export default ResultReviews;
