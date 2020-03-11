/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import FlyoutNav from '@src/components/concrete/Header/FlyoutMenu/FlyoutNav';

// Types
import { Nav, Store } from '@src/typings/types';

type Props = {
  config: Store.Config;
  flyoutOpen: boolean;
  mobAdminHelpDropdown: Nav.Dropdown;
  mobDropdown: Nav.Dropdown;
  mobHelpDropdown: Nav.Dropdown;
  mobInventDropdown: Nav.Dropdown;
  mobInvoiceDropdown: Nav.Dropdown;
  mobPerfDropdown: Nav.Dropdown;
  mobVenueDropdown: Nav.Dropdown;
};

const FlyoutMenu = ({ flyoutOpen, ...context }: Props) => (
  <React.Fragment>
    {flyoutOpen ? (
      <React.Fragment>
        <div className={css(styles.flyoutMenuMask)} />
        <div className={css(styles.flyoutMenuContainer)}>
          <FlyoutNav {...context} />
        </div>
      </React.Fragment>
    ) : (
      null
    )}
  </React.Fragment>
);

export default FlyoutMenu;
