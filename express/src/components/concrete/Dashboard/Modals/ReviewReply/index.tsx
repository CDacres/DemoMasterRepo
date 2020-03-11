/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ModalBottom from '@src/components/concrete/Modal/ModalBottom';
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import ListItem from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  onCancelClick: () => void;
  onSuccessClick: () => void;
  reviewer: {
    first_name: string;
    last_name: string;
  };
};

const ReviewReply = ({ onCancelClick, onSuccessClick, reviewer }: Props) => (
  <React.Fragment>
    <Translatable attributes={{ text: { transKey: 'dashboard.review_reply_title', count: 1, replacements: { name: reviewer.first_name } } }}>
      <ModalTop />
    </Translatable>
    <section>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(padding.leftright_1)}>
            <ListItem
              noBorder={true}
              title="dashboard.review_reply_subtitle"
            >
              <div className={css(margin.topbottom_3)}>
                <Translatable attributes={{ placeholder: { transKey: 'dashboard.review_reply_placeholder' } }}>
                  <StyledInput
                    id="reply"
                    isBig={true}
                    name="reply"
                  />
                </Translatable>
              </div>
            </ListItem>
          </div>
        </div>
      </div>
    </section>
    <ModalBottom
      onCancelClick={onCancelClick}
      onSuccessClick={onSuccessClick}
      successText="common.send"
    />
  </React.Fragment>
);

export default ReviewReply;
