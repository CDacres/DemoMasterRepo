import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
  href?: string;
  isError?: boolean;
  onClick?: VoidFunction;
  stylesArray?: object[];
};

const Anchor = ({ children, href, isError, onClick, stylesArray }: Props) => (
  <a
    className={css(styles.a, stylesArray, isError && styles.red)}
    href={href}
    onClick={onClick}
  >
    {children}
  </a>
);

export default Anchor;
