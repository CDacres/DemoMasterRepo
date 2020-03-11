import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element [] | string;
  id?: string;
};

const EnclosingLabel = ({ children, id }: Props) => (
  <label
    className={css(styles.labelWrapper, padding.all_0)}
    {...(id ? { htmlFor: id } : {})}
  >
    {children}
  </label>
);

export default EnclosingLabel;
