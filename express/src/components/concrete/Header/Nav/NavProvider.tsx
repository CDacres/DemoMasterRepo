import * as React from 'react';

// Types
import { Nav } from '@src/typings/types';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type State = {
  [x: string]: Nav.Dropdown;
};

export type ContextValue = {
  adminHelpDropdown: Nav.Dropdown;
  dropdown: Nav.Dropdown;
  helpDropdown: Nav.Dropdown;
  inventDropdown: Nav.Dropdown;
  invoiceDropdown: Nav.Dropdown;
  mobAdminHelpDropdown: Nav.Dropdown;
  mobDropdown: Nav.Dropdown;
  mobHelpDropdown: Nav.Dropdown;
  mobInventDropdown: Nav.Dropdown;
  mobInvoiceDropdown: Nav.Dropdown;
  mobPerfDropdown: Nav.Dropdown;
  mobVenueDropdown: Nav.Dropdown;
  perfDropdown: Nav.Dropdown;
  toggleDropdown: (dropdownName: string) => void;
  venueDropdown: Nav.Dropdown;
};

const defaultState = {
  adminHelpDropdown: {
    isVisible: false,
    linkGroups: [7],
  },
  dropdown: {
    isVisible: false,
    linkGroups: [2],
  },
  helpDropdown: {
    isVisible: false,
    linkGroups: [3],
  },
  inventDropdown: {
    isVisible: false,
    linkGroups: [6],
  },
  invoiceDropdown: {
    isVisible: false,
    linkGroups: [5],
  },
  mobAdminHelpDropdown: {
    isVisible: false,
    linkGroups: [7],
  },
  mobDropdown: {
    isVisible: false,
    linkGroups: [2],
  },
  mobHelpDropdown: {
    isVisible: false,
    linkGroups: [3],
  },
  mobInventDropdown: {
    isVisible: false,
    linkGroups: [6],
  },
  mobInvoiceDropdown: {
    isVisible: false,
    linkGroups: [5],
  },
  mobPerfDropdown: {
    isVisible: false,
    linkGroups: [4],
  },
  mobVenueDropdown: {
    isVisible: false,
    linkGroups: [1],
  },
  perfDropdown: {
    isVisible: false,
    linkGroups: [4],
  },
  venueDropdown: {
    isVisible: false,
    linkGroups: [1],
  },
};

export const NavContext = React.createContext(defaultState);

class NavProvider extends React.PureComponent<Props, State> {
  state = defaultState;

  toggleDropdown = (dropdownName: string): void => {
    this.setState(prevState => ({
      [dropdownName]: {
        ...prevState[dropdownName],
        isVisible: !prevState[dropdownName].isVisible,
      },
    }));
  }

  render() {
    const { children } = this.props;
    const value: ContextValue = {
      ...this.state,
      toggleDropdown: this.toggleDropdown,
    };
    return (
      <NavContext.Provider value={value}>
        {children}
      </NavContext.Provider>
    );
  }
}

export default NavProvider;
