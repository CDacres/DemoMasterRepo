import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import navStyles from '../styles';

// Components
import Dropdown from '@src/components/concrete/Header/Nav/Dropdown';
import NavLinkItem from '@src/components/concrete/Header/Nav/NavLinkItem';
import { Dot } from '@src/components/concrete/Icons/svgs';
import InteractionLink from '@src/components/concrete/InteractionLink';

// Types
import { Nav, Store } from '@src/typings/types';

type Props = {
  dropdown: Nav.Dropdown;
  dropdownName: string;
  dropdownLinkGroups: Nav.DropdownLinkGroup[];
  onToggleDropdown: (dropdownName: string) => void;
  user: Store.Auth.User;
};

class Avatar extends React.Component<Props> {
  handleToggle = () => {
    const { dropdown, onToggleDropdown } = this.props;
    if (!dropdown.isVisible) {
      onToggleDropdown('dropdown');
    }
  }

  render() {
    const { dropdown, dropdownName, dropdownLinkGroups, onToggleDropdown, user } = this.props;
    return (
      <React.Fragment>
        <InteractionLink
          action={this.handleToggle}
          className={css(navStyles.navLink)}
        >
          <NavLinkItem hasUnderline={false}>
            <React.Fragment>
              <div className={css(styles.avatar)}>
                <img
                  alt={user.firstName}
                  height="28"
                  src={user.avatar}
                  width="28"
                />
              </div>
              <Dot stylesArray={[navStyles.notificationBadge]} />
            </React.Fragment>
          </NavLinkItem>
        </InteractionLink>
        {dropdown.isVisible &&
          <Dropdown
            dropdown={dropdown}
            dropdownLinkGroups={dropdownLinkGroups}
            dropdownName={dropdownName}
            onToggleDropdown={onToggleDropdown}
          />
        }
      </React.Fragment>
    );
  }
}

export default Avatar;
