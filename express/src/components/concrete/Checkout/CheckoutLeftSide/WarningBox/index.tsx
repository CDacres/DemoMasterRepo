import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
};

const WarningBox = ({ text }: Props) => (
  <div className={css(margin.bottom_3)}>
    <div className={css(styles.warningWrapper, padding.topbottom_3, padding.left_3, padding.right_4)}>
      <div className={css(margin.bottom_1)}>
        <Translatable content={{ transKey: text }}>
          <div className={css(pagestyles.text, margin.all_0)} />
        </Translatable>
      </div>
    </div>
  </div>
);

export default WarningBox;
