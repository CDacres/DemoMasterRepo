import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import { ZipcubeLogo } from '@src/components/concrete/Icons/svgs';

type Props = {
  alt?: string;
  size: {
    height: string;
    width: string;
  };
  src?: string;
};

const Thumbnail = ({ alt, size, src }: Props) => (
  <div
    className={css(styles.container)}
    style={size}
  >
    {src ? (
      <img
        alt={alt}
        className={css(styles.cell)}
        src={src}
        {...size}
      />
    ) : (
      <ZipcubeLogo
        fill="rgba(255, 255, 255, 0.8)"
        stylesArray={[styles.cell, styles.thumb]}
        viewBox="0 0 52 52"
      />
    )}
  </div>
);

export default Thumbnail;
