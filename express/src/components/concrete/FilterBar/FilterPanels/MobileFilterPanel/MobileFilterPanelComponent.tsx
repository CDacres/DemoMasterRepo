import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: JSX.Element;
  // transform3d: number;
};

const MobileFilterPanelComponent = ({ children }: Props) => (
  <div className={css(styles.mobileFilterPanelContainer)}>
    <div
      className={css(styles.mobileFilterPanelContainerInner)}
      role="dialog"
    >
      {children}
    </div>
  </div>
);

export default MobileFilterPanelComponent;
