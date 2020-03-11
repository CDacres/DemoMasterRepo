import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: JSX.Element;
  height: string;
  width: string;
};

const ImageWrapper = ({ children, height, width }: Props) => (
  <div
    className={css(styles.wrapper)}
    style={{
      height: height,
      width: width,
    }}
  >
    {children}
  </div>
);

export default ImageWrapper;
