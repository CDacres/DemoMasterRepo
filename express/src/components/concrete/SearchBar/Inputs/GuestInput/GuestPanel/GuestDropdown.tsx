import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import guestInputStyles from '../styles';
import { pagestyles } from '@src/styles';

// Components
import ListItem from '@src/components/concrete/SearchBar/Inputs/GuestInput/GuestPanel/ListItem';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  onClick: (value: string | number) => void;
};

class GuestDropdown extends React.PureComponent<Props> {
  handleAnyClick = () => {
    this.props.onClick('');
  }

  render() {
    const { onClick } = this.props;
    const options = [];
    options.push(
      <li
        className={css(guestInputStyles.guestPanelDropdownItem)}
        key={shortid.generate()}
        onClick={this.handleAnyClick}
      >
        <div className={css(guestInputStyles.guestPanelDropdownItemTextContainer, pagestyles.tableCellTop)}>
          <Translatable content={{ transKey: 'common.any' }}>
            <div className={css(guestInputStyles.guestPanelDropdownItemFiltersText)} />
          </Translatable>
        </div>
      </li>
    );
    for (let i = 1; i <= 1000; i++) {
      if (i === 1 || i < 100) {
        options.push(
          <ListItem
            i={i}
            key={shortid.generate()}
            onClick={onClick}
          />
        );
      } else if (i % 10 === 0 && i <= 250) {
        options.push(
          <ListItem
            i={i}
            key={shortid.generate()}
            onClick={onClick}
          />
        );
      } else if (i % 100 === 0) {
        options.push(
          <ListItem
            i={i}
            key={shortid.generate()}
            onClick={onClick}
          />
        );
      }
    }
    return (
      <div className={css(guestInputStyles.guestPanel)}>
        <div
          className={css(guestInputStyles.guestPanelDropdown)}
          id="guest_panel"
          role="menu"
        >
          <ul
            className={css(guestInputStyles.guestPanelDropdownItems)}
            role="listbox"
          >
            {options}
          </ul>
        </div>
      </div>
    );
  }
}

export default GuestDropdown;
