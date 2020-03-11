/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Core
import { specs } from '@src/core/ux';

// Styles
import styles from './styles';

type Props = {
  height?: number | string;
  width?: number | string;
};

const GeoPin = ({ height, width }: Props) => (
  <svg
    className={css(styles.geo)}
    height={height || '64px'}
    viewBox="0 0 24 24"
    width={width || '64px'}
  >
    <path
      d="M6 6 L18 6 18 12 L6 12 L6 6 Z"
      fill={specs.dark}
    />
    <path
      d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm-1.56 10H9v-1.44l3.35-3.34 1.43 1.43L10.44 12zm4.45-4.45l-.7.7-1.44-1.44.7-.7c.15-.15.39-.15.54 0l.9.9c.15.15.15.39 0 .54z"
      fill={specs.primary}
    />
  </svg>
);

export default GeoPin;
