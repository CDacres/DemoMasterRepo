/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

// Styles
import guestInputStyles from '../styles';
import { pagestyles } from '@src/styles';

// Components
import GuestDropdown from '@src/components/concrete/SearchBar/Inputs/GuestInput/GuestPanel/GuestDropdown';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  focused: boolean;
  guests: string | number;
  onGuestsSelected: (value: number) => void;
  toggleGuestPanel: () => void;
} & InjectedOnClickOutProps;

class GuestPanel extends React.PureComponent<Props> {
  handleClick = () => {
    const { toggleGuestPanel } = this.props;
    toggleGuestPanel();
  }

  handleClickOutside = () => {
    const { focused, toggleGuestPanel } = this.props;
    if (focused) {
      toggleGuestPanel();
    }
  }

  handleGuestsSelected = value => {
    const { onGuestsSelected } = this.props;
    onGuestsSelected(value);
  }

  render() {
    const { focused, guests } = this.props;
    return (
      <div>
        <button
          className={css(guestInputStyles.guestPanelButton)}
          id="show_guest_panel"
          onClick={this.handleClick}
          type="button"
        >
          <span className={css(guestInputStyles.guestPanelDropdownIcon)} />
          <span className={css(guestInputStyles.guestPanelPlaceholder)}>
            <Translatable content={{ transKey: 'common.people_count', count: guests === '' ? 0 : Number(guests), replacements: { number: guests === '' ? 0 : guests } }} />
          </span>
          <span className={css(guestInputStyles.guestPanelDropdownChevron)}>
            <div
              className={css(guestInputStyles.guestPanelDropdownChevronWrapper, pagestyles.tableCellMiddle)}
              style={focused ? { transform: 'rotate(180deg)' } : null}
            >
              <Chevron stylesArray={[pagestyles.icon, pagestyles.icon12]} />
            </div>
          </span>
        </button>
        {focused &&
          <GuestDropdown onClick={this.handleGuestsSelected} />
        }
      </div>
    );
  }
}

export default onClickOutside(GuestPanel);
