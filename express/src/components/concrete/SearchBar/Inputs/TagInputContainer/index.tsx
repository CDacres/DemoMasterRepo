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
  focused?: boolean;
  onBlur?: (trueBlur: boolean) => void;
  tag?: string;
};

type State = {
  name: string;
  machine: {
    focused: boolean;
  };
};

type ChildArgs = {
  getDropdownTheme: (editing: boolean) => object;
  handleContainerBlur: () => void;
  handleContainerFocus: () => void;
};

class TagInputContainer extends StatefulComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: 'default',
      machine: this.generateState('default'),
    };
  }

  generateState(stateName: string) {
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
    const { machine: { focused } } = this.state;
    return (
      <div className={css(searchBarStyles.searchBarInputContainer, pagestyles.tableCellMiddle)}>
        <Translatable content={{ transKey: 'common.what' }}>
          <div className={css(searchBarStyles.searchBarInputLabel)} />
        </Translatable>
        <div className={css(searchBarStyles.searchBarGeoInputContainer)}>
          <div className={css(pagestyles.relativePosition)}>
            <div className={css(searchBarStyles.searchBarBlockFullWidth)}>
              <Translatable content={{ transKey: 'common.what' }}>
                <label
                  className={css(searchBarStyles.visuallyHidden)}
                  htmlFor="tags_SearchBarLarge"
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

export default TagInputContainer;
