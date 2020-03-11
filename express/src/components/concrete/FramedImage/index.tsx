import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  alt?: string;
  src: string;
};

const FramedImage = ({ alt, src }: Props) => (
  <div className={css(styles.frame, margin.topbottom_1_25, padding.all_3_large)}>
    <img
      alt={alt}
      className={css(pagestyles.fullColumn)}
      src={src}
    />
  </div>
);

export default FramedImage;
