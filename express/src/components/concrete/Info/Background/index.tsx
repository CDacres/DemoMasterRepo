import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';

const Background = () => (
  <SectionInner>
    <div className={css(styles.background)} />
  </SectionInner>
);

export default Background;
