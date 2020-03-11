/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Stars from '@src/components/concrete/Stars';

type Props = {
  rating: number;
  reviewsCount: number;
};

const Review = ({ rating, reviewsCount }: Props) => (
  <div>
    <span className={css(margin.right_0_5)}>
      <Translatable attributes={{ 'aria-label': { transKey: 'common.rating', count: rating, replacements: { number: rating } } }}>
        <span role="img">
          <Stars rating={rating} />
        </span>
      </Translatable>
    </span>
    <Translatable content={{ transKey: 'common.reviews_count', count: reviewsCount, replacements: { number: reviewsCount } }}>
      <span className={css(pagestyles.hiddenText)} />
    </Translatable>
    <span>
      <Translatable content={{ transKey: 'common.reviews_count', count: reviewsCount, replacements: { number: reviewsCount } }}>
        <span className={css(pagestyles.smallSubtitle, pagestyles.fontMedium, margin.all_0)} />
      </Translatable>
    </span>
  </div>
);

export default Review;
