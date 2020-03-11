import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ModalBottom from '@src/components/concrete/Modal/ModalBottom';
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import InteractionLink from '@src/components/concrete/InteractionLink';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Fields from '@src/components/concrete/Dashboard/Modals/ReviewInvite/Fields';

// Data
import { options } from '@src/data/dashboard/popupOptions';

type Props = {
  onCancelClick: () => void;
  onSuccessClick: () => void;
};

type State = {
  children: any[];
};

class ReviewInvite extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { children: [] };
  }

  handleAddLink = () => {
    this.setState({
      children: [
        ...this.state.children,
        (
          <React.Fragment>
            <ContentSeparator marginNum={4} />
            <Fields />
          </React.Fragment>
        ),
      ],
    });
  }

  render() {
    const { onCancelClick, onSuccessClick } = this.props;
    const { children } = this.state;
    return (
      <React.Fragment>
        <ModalTop text="dashboard.send_review_invite" />
        <section>
          <Fields />
          <React.Fragment>
            {children.map((child, index) => (
              <React.Fragment key={index}>
                {child}
              </React.Fragment>
            ))}
          </React.Fragment>
          <div className={css(margin.top_3)}>
            <div className={css(pagestyles.row, pagestyles.clearfix)}>
              <div className={css(padding.leftright_1)}>
                <InteractionLink
                  action={() => this.handleAddLink()}
                  className={css(pagestyles.link, pagestyles.linkUnderlined, padding.all_0)}
                >
                  <Translatable content={{ transKey: 'dashboard.review_invite_add' }} />
                </InteractionLink>
              </div>
            </div>
          </div>
          <div className={css(margin.top_3)}>
            <div className={css(pagestyles.row, pagestyles.clearfix)}>
              <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
                <StyledInput
                  boldLabel={true}
                  id="venue_to_review"
                  label="dashboard.review_invite_select"
                  name="venue_to_review"
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
  }
}

export default ReviewInvite;
