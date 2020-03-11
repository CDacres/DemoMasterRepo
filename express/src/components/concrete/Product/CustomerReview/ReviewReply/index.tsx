/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Avatar from '@src/components/concrete/Avatar';
import ReviewText from '@src/components/concrete/Product/CustomerReview/ReviewText';

// Utils
import { formatDate } from '@src/utils';

// Types
import { RoomReviews } from '@src/typings/types';

type Props = {
  reply: RoomReviews.ReviewReply;
};

const ReviewReply = ({ reply }: Props) => (
  <div className={css(styles.row, margin.left_2, margin.bottom_3)}>
    <div className={css(margin.right_2)}>
      <Avatar
        customStyle={styles.avatarSizeSmall}
        height="40px"
        name={{
          firstName: reply.creator_first_name,
          lastName: reply.creator_last_name,
        }}
        width="40px"
      />
    </div>
    <div>
      <Translatable content={{ transKey: 'room.review_response', count: 1, replacements: { name: reply.creator_first_name } }}>
        <div className={css(styles.avatarText, margin.bottom_0_75)} />
      </Translatable>
      <ReviewText text={reply.text} />
      <div className={css(styles.repliedAt, margin.top_1_5)}>
        {formatDate(reply.created_at)}
      </div>
    </div>
  </div>
);

export default ReviewReply;
