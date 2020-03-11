import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

type Props = {
  height: string;
  src: string;
  width: string;
};

const BaseImage = ({ height, src, width }: Props) => (
  <div
    className={css(pagestyles.relativePosition)}
    style={{
      height: height,
      width: width,
    }}
  >
    <div
      className={css(styles.img)}
      style={{
        backgroundImage: `url(${src})`,
        height: height,
        width: width,
      }}
    />
  </div>
);

export default BaseImage;
