import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  play: boolean;
};

const AnimationLine = ({ play }: Props) => (
  <div className={css(pagestyles.tableCell, padding.leftright_0_25)}>
    <div className={css(play ? styles.animation : styles.lineContainer)}>
      {/* {play &&
        <div className={css(styles.animation)} />
      } */}
    </div>
  </div>
);

export default AnimationLine;
