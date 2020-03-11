/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  hasEqualPadding?: boolean;
  hasMoreLeftPadding?: boolean;
  isBold?: boolean;
  text: React.ReactNode;
};

const TextAdornment = ({ hasEqualPadding, hasMoreLeftPadding, isBold, text }: Props) => (
  <span className={css(styles.text, hasEqualPadding ? styles.equalPadding : hasMoreLeftPadding ? styles.leftPadding : null, isBold ? styles.boldText : null)}>
    {text}
  </span>
);

export default TextAdornment;
