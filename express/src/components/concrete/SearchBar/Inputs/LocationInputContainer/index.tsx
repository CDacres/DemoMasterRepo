/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import searchBarStyles from '../../styles';
import { getDropdownTheme } from '../dropdownTheme';
import { pagestyles } from '@src/styles';

// Components
import StatefulComponent, { StatefulProps } from '@src/components/base/StatefulComponent';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = StatefulProps & {
  children: (arg: ChildArgs) => JSX.Element | JSX.Element[];
  // focused: boolean;
  hasTagInput?: boolean;
};

type State = {
  machine: {
    focused: boolean;
  };
  name: string;
  value?: any;
};

type ChildArgs = {
  getDropdownTheme: (editing: boolean) => object;
  handleContainerBlur: () => void;
  handleContainerFocus: () => void;
};

class LocationInputContainer extends StatefulComponent<Props, State> {
  static defaultProps = {
    hasTagInput: true,
    observers: [],
  };

  state: State = {
    machine: this.generateState('default'),
    name: 'default',
    value: '',
  };

  generateState(stateName: string) { // not sure if this is necessary combined with focus state in LocationInput
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

  handleBlur = () => {
    this.goToState('default');
  }

  handleFocus = () => {
    this.goToState('focused');
  }

  render() {
    const { hasTagInput } = this.props;
    const { machine: { focused } } = this.state;
    return (
      <div className={css(pagestyles.tableCellMiddle, hasTagInput ? searchBarStyles.searchBarInputContainer_borderLeft : searchBarStyles.searchBarInputContainer)}>
        <Translatable content={{ transKey: 'common.where' }}>
          <div className={css(searchBarStyles.searchBarInputLabel)} />
        </Translatable>
        <div className={css(searchBarStyles.searchBarGeoInputContainer)}>
          <div className={css(pagestyles.relativePosition)}>
            <div className={css(searchBarStyles.searchBarBlockFullWidth)}>
              <Translatable content={{ transKey: 'common.where' }}>
                <label
                  className={css(searchBarStyles.visuallyHidden)}
                  htmlFor="location_string"
                />
              </Translatable>
              <div className={css(searchBarStyles.searchBarInputContainer_borderless)}>
                {this.props.children({ getDropdownTheme, handleContainerBlur: this.handleBlur, handleContainerFocus: this.handleFocus })}
              </div>
            </div>
          </div>
        </div>
        <div
          className={css(searchBarStyles.searchBarFocusUnderline)}
          style={focused ? { opacity: 1 } : null}
        />
      </div>
    );
  }
}

export default LocationInputContainer;
