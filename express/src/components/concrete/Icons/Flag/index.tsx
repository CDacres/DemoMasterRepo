import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  alt: string;
  src: string;
};

const Flag = ({ alt, src }: Props) => (
  <div className={css(styles.flagContainer)}>
    <img
      alt={alt}
      className={css(styles.flagImage)}
      src={src}
    />
  </div>
);

export default Flag;
