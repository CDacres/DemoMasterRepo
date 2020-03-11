import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import searchBarStyles from '../../styles';
import { pagestyles } from '@src/styles';

// Components
import StatefulComponent, { StatefulProps } from '@src/components/base/StatefulComponent';
import GuestPanel from '@src/components/concrete/SearchBar/Inputs/GuestInput/GuestPanel';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = StatefulProps & {
  guests: number | string;
  selectGuestOption: (guests: number) => any;
};

type State = {
  name: string;
  machine: Machine;
  value: number | string;
};

type Machine = {
  focused: boolean;
};

class GuestInput extends StatefulComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: 'default',
      machine: this.generateState('default'),
      value: props.guests,
    };
  }

  generateState(stateName: string): Machine {
    switch (stateName) {
      case 'focused':
        return {
          focused: true,
        };
      default:
        return {
          focused: false,
        };
    }
  }

  handleGuestsSelected = (value: number): void => {
    const { selectGuestOption } = this.props;
    this.toggleGuestPanel();
    this.setState({ value });
    selectGuestOption(value);
  }

  toggleGuestPanel = (): void => {
    const { focused } = this.state.machine;
    if (focused) {
      this.goToState('default');
    } else {
      this.goToState('focused');
    }
  }

  render() {
    const { machine: { focused }, value } = this.state;
    return (
      <div className={css(searchBarStyles.searchBarInputContainer, pagestyles.tableCellMiddle)}>
        <Translatable content={{ transKey: 'common.guests' }}>
          <div className={css(searchBarStyles.searchBarInputLabel)} />
        </Translatable>
        <div>
          <GuestPanel
            focused={focused}
            guests={value !== '' ? Number(value) : ''}
            onGuestsSelected={this.handleGuestsSelected}
            toggleGuestPanel={this.toggleGuestPanel}
          />
        </div>
        <div
          className={css(searchBarStyles.searchBarFocusUnderline)}
          style={focused ? { opacity: 1 } : null}
        />
      </div>
    );
  }
}

export default GuestInput;
