import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  description: string;
  text: string;
};

const MotivationSection = ({ description, text }: Props) => (
  <div className={css(margin.top_2, margin.bottom_6)}>
    <GenericCard
      borderColor="#e4e4e4"
      boxShadow="none"
      customStyle={pagestyles.fullColumn}
      padding="12px"
    >
      <div className={css(pagestyles.leftText, pagestyles.tableCellMiddle, padding.leftright_2)}>
        <div>
          <img
            className={css(styles.img)}
            src="/_express/images/commonsite/daily_deal.gif"
          />
        </div>
      </div>
      <div className={css(pagestyles.fullColumn, pagestyles.leftText, pagestyles.tableCellMiddle)}>
        <div className={css(pagestyles.inline, margin.right_1)}>
          <Translatable content={{ transKey: text }}>
            <span className={css(pagestyles.smallText, pagestyles.fontBlack, margin.all_0)} />
          </Translatable>
        </div>
        <Translatable content={{ transKey: description }}>
          <span className={css(pagestyles.smallText, margin.all_0)} />
        </Translatable>
      </div>
    </GenericCard>
  </div>
);

export default MotivationSection;
