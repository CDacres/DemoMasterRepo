import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import wrapperStyles from '../styles';

type Props = {
  src: string;
};

const MobileImageWrapper = ({ src }: Props) => (
  <div className={css(styles.imgWrapper)}>
    <div className={css(wrapperStyles.imgContainer)}>
      <div className={css(wrapperStyles.imgInner)}>
        <img
          className={css(wrapperStyles.imgContent)}
          src={src}
        />
        <div className={css(wrapperStyles.backgroundImageWrapper, styles.backgroundImage)} />
      </div>
    </div>
  </div>
);

export default MobileImageWrapper;
