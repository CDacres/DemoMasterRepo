/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: JSX.Element;
  collapsed: boolean;
  multiField?: boolean;
};

const BusinessItemFieldWrapper = ({ children, collapsed, multiField }: Props) => (
  <div className={css(styles.wrapper, multiField ? collapsed ? styles.wrapperMultiOpen : styles.wrapperMultiClosed : collapsed ? styles.wrapperOpen : styles.wrapperClosed)}>
    <div className={css(styles.container)}>
      {children}
    </div>
  </div>
);

export default BusinessItemFieldWrapper;
