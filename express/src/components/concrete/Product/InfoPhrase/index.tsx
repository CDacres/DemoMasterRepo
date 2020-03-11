import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children?: JSX.Element;
};

const InfoPhrase = ({ children }: Props) => (
  <div className={css(styles.phrase)}>
    {children}
  </div>
);

export default InfoPhrase;
