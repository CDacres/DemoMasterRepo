import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ModalBottom from '@src/components/concrete/Modal/ModalBottom';
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import ListItem from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem';

// Data
import { options } from '@src/data/dashboard/popupOptions';

type Props = {
  onCancelClick: () => void;
  onSuccessClick: () => void;
};

const BulkInvite = ({ onCancelClick, onSuccessClick }: Props) => (
  <React.Fragment>
    <ModalTop text="dashboard.bulk_invite_title" />
    <section>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(padding.leftright_1)}>
            <ListItem
              noBorder={true}
              title="dashboard.bulk_invite_subtitle"
            >
              <div className={css(margin.topbottom_3)}>
                <StyledInput
                  id="people_input"
                  isBig={true}
                  placeholder="e.g. Paul, paul@mail.com, Jerry, jerry@mail.com"
                  name="people_input"
                />
                {/* {value &&
                  <div>
                    e.g. Paul, paul@mail.com, Jerry, jerry@mail.com
                  </div>
                } */}
              </div>
            </ListItem>
          </div>
        </div>
      </div>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
            <StyledInput
              id="venue_select"
              label="common.venue"
              name="venue_select"
              selectOptions={options}
            />
          </div>
        </div>
      </div>
    </section>
    <ModalBottom
      onCancelClick={onCancelClick}
      onSuccessClick={onSuccessClick}
      successText="dashboard.send_review_invite"
    />
  </React.Fragment>
);

export default BulkInvite;
