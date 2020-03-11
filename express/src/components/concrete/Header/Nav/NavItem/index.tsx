import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
  isLast?: boolean;
};

const NavItem = ({ children, isLast }: Props) => (
  <li className={css(pagestyles.tableCell)}>
    <div className={css(pagestyles.relativePosition, isLast ? margin.right_1 : null)}>
      {children}
    </div>
  </li>
);

export default NavItem;
