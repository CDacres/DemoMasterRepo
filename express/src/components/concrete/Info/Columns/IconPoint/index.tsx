import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { Step } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
};

const IconPoint = ({ text }: Props) => (
  <div className={css(margin.bottom_4)}>
    <div className={css(styles.wrapper)}>
      <div className={css(pagestyles.tableCellMiddle)}>
        <Step stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconBlue]} />
      </div>
      <div className={css(pagestyles.tableCellMiddle)}>
        <div className={css(margin.left_2)}>
          <Translatable content={{ transKey: text }}>
            <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
          </Translatable>
        </div>
      </div>
    </div>
  </div>
);

export default IconPoint;
