import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

type Props = {
  children: JSX.Element;
};

const MobileFilterPanelContent = ({ children }: Props) => (
  <div className={css(styles.filterPanelContent)}>
    <div className={css(padding.leftright_3)}>
      <div className={css(margin.top_1)}>
        {children}
      </div>
    </div>
  </div>
);

export default MobileFilterPanelContent;
