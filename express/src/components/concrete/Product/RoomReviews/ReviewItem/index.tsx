/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Stars from '@src/components/concrete/Stars';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { RoomReviews } from '@src/typings/types';

type Props = {
  rating: RoomReviews.ReviewRating;
};

const ReviewItem = ({ rating }: Props) => (
  <div className={css(margin.top_1)}>
    <Translatable attributes={{ 'aria-label': { transKey: 'common.rating', count: rating.avg, replacements: { number: rating.avg } } }}>
      <div className={css(styles.ratingContainer)}>
        <div className={css(margin.right_2)}>
          <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)}>
            {rating.avg}
          </div>
        </div>
        <span>
          <span>
            <span>
              <Stars
                rating={rating.avg}
                size="large"
              />
            </span>
          </span>
        </span>
      </div>
    </Translatable>
  </div>
);

export default ReviewItem;
