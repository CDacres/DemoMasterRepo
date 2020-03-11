import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

type Props = {
  children: JSX.Element;
  hasUnderline?: boolean;
};

const NavLinkItem: React.FunctionComponent<Props> = ({ children, hasUnderline }) => (
  <div className={css(styles.itemWrapper, hasUnderline ? styles.itemInnerUnderlined : null)}>
    <div className={css(styles.itemInner, padding.all_1)}>
      {children}
    </div>
  </div>
);

NavLinkItem.defaultProps = { hasUnderline: true };

export default NavLinkItem;
