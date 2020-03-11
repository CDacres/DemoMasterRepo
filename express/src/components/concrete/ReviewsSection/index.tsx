/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { lineheight, margin, pagestyles } from '@src/styles';

// Components
import Stars from '@src/components/concrete/Stars';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  rating: number;
  reviewsCount: number;
};

const ReviewsSection = ({ rating, reviewsCount }: Props) => (
  <div className={css(margin.top_0_25)}>
    <div className={css(styles.reviewsWrapper, pagestyles.textMap)}>
      <div className={css(pagestyles.inlineBlock)}>
        <span className={css(lineheight.lineHeightSmall, margin.right_0_5)}>
          <Translatable attributes={{ 'aria-label': { transKey: 'common.rating', count: rating, replacements: { number: rating } } }}>
            <span role="img">
              <Stars rating={rating} />
            </span>
          </Translatable>
        </span>
        <Translatable attributes={{ 'aria-label': { transKey: 'common.reviews', count: reviewsCount } }}>
          <span className={css(lineheight.lineHeightSmall)}>
            <Translatable content={{ transKey: 'common.reviews_count', count: reviewsCount, replacements: { number: reviewsCount } }}>
              <span className={css(styles.reviewsCount, margin.all_0)} />
            </Translatable>
          </span>
        </Translatable>
      </div>
    </div>
  </div>
);

export default ReviewsSection;
