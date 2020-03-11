import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Avatar from '@src/components/concrete/Avatar';
import Stars from '@src/components/concrete/Stars';
import ReviewReply from '@src/components/concrete/Product/CustomerReview/ReviewReply';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Flag } from '@src/components/concrete/Icons/svgs';
import ReviewText from '@src/components/concrete/Product/CustomerReview/ReviewText';

// Utils
import { formatDate } from '@src/utils';

// Types
import { RoomReviews } from '@src/typings/types';

type Props = {
  inVenuePage?: boolean;
  review: RoomReviews.VenueReview;
};

const CustomerReview = ({ inVenuePage, review }: Props) => (
  <React.Fragment>
    <div className={css(styles.reviewOwner, margin.bottom_1)}>
      <div className={css(pagestyles.tableCellTop)}>
        <Avatar
          customStyle={styles.avatarSize}
          height="48px"
          name={{
            firstName: review.owner_first_name,
            lastName: review.owner_last_name,
          }}
          width="48px"
        />
      </div>
      <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
        <div className={css(margin.left_2)}>
          <div>
            <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
              {review.owner_first_name}{' · '}
              <Stars rating={review.ranking} />
            </div>
          </div>
          <div>
            <span className={css(pagestyles.smallText, margin.all_0)}>
              {formatDate(review.created_at)}
            </span>
          </div>
        </div>
      </div>
      <div className={css(pagestyles.tableCellTop, pagestyles.rightText)}>
        <Flag stylesArray={[styles.icon, pagestyles.icon, pagestyles.icon16, pagestyles.iconGrey]} />
        {/* TODO: what does this do? */}
      </div>
    </div>
    <div className={css(margin.bottom_2)}>
      <ReviewText
        inVenuePage={inVenuePage}
        text={review.text}
      />
    </div>
    {review.reply &&
      <ReviewReply reply={review.reply} />
    }
    <ContentSeparator marginNum={3} />
  </React.Fragment>
);

export default CustomerReview;
