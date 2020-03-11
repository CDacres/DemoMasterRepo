import * as React from 'react';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

// Styles
import { getDropdownTheme } from './dropdownTheme';
// TODO: check whether this can be the same as the one from SearchBar?

// Connectors
import { useConfig, useSearch, useSearchMap } from '@src/store/connectors';

// Components
import StatefulComponent, { StatefulProps } from '@src/components/base/StatefulComponent';
import SearchBarComponent from '@src/components/concrete/Header/SearchBar/SearchBarComponent';
import CombinedInput from '@src/components/concrete/SearchBarInputs/CombinedInput';

// Types
import { Search, Store } from '@src/typings/types';

interface Props extends StatefulProps {
  clearMapBounds?: () => void;
  config?: Store.Config;
  recentSearches?: Search;
  search?: Store.Search;
  setSearchParams?: (params: Store.Search.Params) => void;
}

export type State = {
  name: string;
  machine: {
    activeInput: boolean;
    showResults: boolean;
  };
  value: string;
};

export type InputState = {
  name: string;
  machine: {
    focused: boolean;
    results: object[];
  };
  value: string;
};

class SearchBarContainer extends StatefulComponent<Props & InjectedOnClickOutProps, State> {

  constructor(props: Props & InjectedOnClickOutProps) {
    super(props);
    this.state = {
      name: 'default',
      machine: this.generateState('default'),
      value: '',
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { search: { params: { location, tag } } } = this.props;
    const { name, machine: { showResults } } = this.state;
    if (nextProps.search.params.location !== location) {
      return true;
    }
    if (nextProps.search.params.tag !== tag) {
      return true;
    }
    if (nextState && nextState.name !== name) {
      return true;
    }
    if (nextState && nextState.machine.showResults !== showResults) {
      return true;
    }
    return false;
  }

  generateState(stateName: string, stateParam?: boolean) {
    const previousState = this.state ? { ...this.state.machine } : { showResults: false };
    switch (stateName) {
      case 'activeInput':
        return {
          activeInput: true,
          showResults: typeof stateParam !== 'undefined' ? stateParam : previousState.showResults,
        };
      default:
        return {
          activeInput: false,
          showResults: false,
        };
    }
  }

  handleBlur = (trueBlur: boolean): void => {
    if (trueBlur) {
      this.goToState('default');
    }
  }

  handleClickOutside = (): void => {
    this.handleBlur(true);
  }

  handleFocus = () => {
    this.goToState('activeInput');
  }

  shouldRenderSuggestions = (state: InputState): boolean => {
    const { machine: { focused }, value } = state;
    return focused && (value !== '') && (state.machine.results.length > 0);
  }

  setValue = (value: string): void => {
    this.props.setSearchParams({ tag: value });
    // TODO: this needs to be a mixture of setLocation & setTag below
    // to allow location & tag props (set to tag currently just to do something)
  }

  // setLocation = (placeId: string, newLocation: string, latLon?: object): void => {
  //   const { clearMapBounds, search: { params: { location } }, setSearchParams } = this.props;
  //   if (newLocation !== location) {
  //     let params = {
  //       location: newLocation,
  //       placeId,
  //     };
  //     if (latLon) {
  //       params = {
  //         location: newLocation,
  //         ...latLon,
  //         placeId,
  //       };
  //     }
  //     clearMapBounds();
  //     setSearchParams(params);
  //   }
  // }

  // setTag = (tag: string): void => {
  //   this.props.setSearchParams({ tag });
  // }

  render() {
    const { search: { params: { location, tag }, recentSearches, url } } = this.props;
    const { machine: { activeInput } } = this.state;
    let inputValue = '';
    if (typeof location !== 'undefined') {
      inputValue = location;
      if (typeof tag !== 'undefined' && !activeInput) {
        inputValue += ` · ${tag}`;
      }
    }
    return (
      <SearchBarComponent
        isInputActive={activeInput}
        recentSearches={recentSearches}
        url={url.url}
      >
        <CombinedInput
          getDropdownTheme={getDropdownTheme}
          handleContainerBlur={this.handleBlur}
          handleContainerFocus={this.handleFocus}
          selectValue={this.setValue}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          value={inputValue}
        />
      </SearchBarComponent>
    );
  }
}

export default useConfig(useSearch(useSearchMap(onClickOutside(SearchBarContainer))));
