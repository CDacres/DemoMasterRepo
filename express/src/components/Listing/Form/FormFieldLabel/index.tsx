import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
  required?: boolean;
};

const FormFieldLabel = ({ children, required }: Props) => (
  <div className={css(styles.label)}>
    <span>
      <span>
        {children}
      </span>
      {required &&
        <span className={css(styles.required)}>
          *
        </span>
      }
    </span>
  </div>
);

export default FormFieldLabel;
