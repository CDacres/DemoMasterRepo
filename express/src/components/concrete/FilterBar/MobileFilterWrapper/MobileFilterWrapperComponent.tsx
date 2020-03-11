import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: JSX.Element;
};

const MobileFilterWrapperComponent = ({ children }: Props) => (
  <div className={css(styles.mobileFilterWrapper)}>
    {children}
  </div>
);

export default MobileFilterWrapperComponent;
