/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { RightSidebar } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Stars from '@src/components/concrete/Stars';
import FullStar from '@src/components/concrete/Stars/FullStar';

type Props = {
  rating: number;
  reviewsCount: number;
};

const ReviewItem = ({ rating, reviewsCount }: Props) => (
  <div className={css(styles.reviewWrapper)}>
    <Translatable attributes={{ 'aria-label': { transKey: 'common.rating', count: rating, replacements: { number: rating } } }}>
      <div
        className={css(styles.reviewContainer, styles.alignCenter)}
        role="img"
      >
        <div className={css(styles.reviewContainer)}>
          <div className={css(margin.right_0_25)}>
            <div className={css(styles.reviewValue, pagestyles.smallSubtitle, pagestyles.fontBlack, margin.all_0)}>
              {rating}
            </div>
          </div>
        </div>
        <div className={css(styles.reviewContainer, margin.right_0_25)}>
          <RightSidebar>
            {matches => {
              if (matches) {
                return (
                  <FullStar />
                );
              }
              return (
                <Stars rating={rating} />
              );
            }}
          </RightSidebar>
        </div>
      </div>
    </Translatable>
    <RightSidebar>
      {matches => {
        if (matches) {
          return (
            <React.Fragment>
              <Translatable content={{ transKey: 'common.reviews_count', count: reviewsCount, replacements: { number: reviewsCount } }}>
                <span className={css(pagestyles.hiddenText)} />
              </Translatable>
              <div
                aria-hidden="true"
                className={css(styles.reviewContainer)}
              >
                <span className={css(styles.reviewText, pagestyles.smallSubtitle, margin.all_0)}>
                  ({reviewsCount})
                </span>
              </div>
            </React.Fragment>
          );
        }
        return (
          <Translatable content={{ transKey: 'common.reviews_count', count: reviewsCount, replacements: { number: reviewsCount } }}>
            <div className={css(styles.reviewText, pagestyles.smallSubtitle, margin.all_0)} />
          </Translatable>
        );
      }}
    </RightSidebar>
  </div>
);

export default ReviewItem;
