/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import SubtitleItem from '@src/components/concrete/Dashboard/Subtitle/SubtitleItem';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  disabled: boolean;
  onChange: (e: any) => void;
  onClick: (e: any) => void;
};

const WorkItemComponent = ({ disabled, onChange, onClick }: Props) => (
  <section>
    <SubtitleItem
      tag="h3"
      text="dashboard.work_travel_content_subtitle"
    />
    <div className={css(margin.top_2, margin.bottom_4)}>
      <div className={css(pagestyles.text, margin.all_0)}>
        <Translatable content={{ transKey: 'dashboard.work_travel_content_description' }}>
          <div />
        </Translatable>
      </div>
    </div>
    <form>
      <StyledInput
        id="email_input"
        label="dashboard.work_travel_content_input_label"
        name="email_input"
        onChange={onChange}
      />
      <div className={css(margin.topbottom_1)}>
        <div>
          <Translatable content={{ transKey: 'dashboard.work_travel_add_work_email' }}>
            <StyledButton
              action={onClick}
              buttonColor="primary"
              buttonStyle="updated"
              customStyle={[styles.button]}
              disabled={disabled}
            />
          </Translatable>
        </div>
      </div>
    </form>
  </section>
);

export default WorkItemComponent;
