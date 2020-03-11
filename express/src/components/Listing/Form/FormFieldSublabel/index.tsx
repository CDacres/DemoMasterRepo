import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
};

const FormFieldSublabel = ({ children }: Props) => (
  <div className={css(styles.sublabel)}>
    <span>
      {children}
    </span>
  </div>
);

export default FormFieldSublabel;
