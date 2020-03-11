import * as React from 'react';
import { css } from 'aphrodite/no-important';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

// Styles
import styles from './styles';

// Components
import DropdownList from '@src/components/concrete/Header/Nav/Dropdown/DropdownList';
import { Fang } from '@src/components/concrete/Icons/svgs';

// Types
import { Nav } from '@src/typings/types';

type Props = {
  clickOutsideActive?: boolean;
  dropdown: Nav.Dropdown;
  dropdownLinkGroups: Nav.DropdownLinkGroup[];
  dropdownName: string;
  onToggleDropdown: (dropdownName: string) => void;
} & InjectedOnClickOutProps;

class Dropdown extends React.Component<Props> {
  static defaultProps = { clickOutsideActive: false };

  handleClickOutside = () => {
    const { dropdown, dropdownName, onToggleDropdown } = this.props;
    if (dropdown.isVisible) {
      onToggleDropdown(dropdownName);
    }
  }

  render() {
    const { dropdownLinkGroups } = this.props;
    return (
      <div className={css(styles.menu)}>
        <div className={css(styles.container)}>
          <div className={css(styles.content)}>
            <DropdownList
              dropdownLinkGroups={dropdownLinkGroups}
              navDropdown={true}
            />
          </div>
          <Fang stylesArray={[styles.fang]} />
        </div>
      </div>
    );
  }
}

export default onClickOutside(Dropdown);
