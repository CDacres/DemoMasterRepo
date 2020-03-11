/* tslint:disable:max-line-length */
import * as React from 'react';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import isEqual from 'react-fast-compare';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Connectors
import { useConfig, useSearch } from '@src/store/connectors';

// Components
import StatefulComponent, { StatefulProps } from '@src/components/base/StatefulComponent';
import LocationInput from '@src/components/concrete/SearchBarInputs/LocationInput';
import TagInput from '@src/components/concrete/SearchBarInputs/TagInput';
import DateInput from '@src/components/concrete/SearchBar/Inputs/DateInput';
import GuestInput from '@src/components/concrete/SearchBar/Inputs/GuestInput';
import LocationInputContainer from '@src/components/concrete/SearchBar/Inputs/LocationInputContainer';
import SearchButton from '@src/components/concrete/SearchBar/Inputs/SearchButton';
import TagInputContainer from '@src/components/concrete/SearchBar/Inputs/TagInputContainer';

// Types
import { Store, Tag } from '@src/typings/types';

type Props = StatefulProps & {
  attribute?: string;
  config: Store.Config;
  fullSearchUrl: string;
  hasTagInput?: boolean;
  search?: {
    params: Store.Search.Params;
    tags: Store.Search.Tags;
  };
  searchUrl: string;
  selectDate: (date: moment.Moment) => void;
  selectGuestOption: (guests: number) => void;
  selectLocation: (location: string) => void;
  selectTag: (tag: any) => void;
  startSearch: () => void;
  tag?: Tag;
};

type State = {
  machine: {
    submitDisabled: boolean;
  };
  name: string;
};

class SearchBar extends StatefulComponent<Props, State> {
  static defaultProps = {
    hasTagInput: true,
    observers: [],
    selectDate: () => {
      throw new Error('selectDate method not connected');
    },
    selectGuestOption: () => {
      throw new Error('selectGuestOption method not connected');
    },
    selectLocation: () => {
      throw new Error('selectLocation method not connected');
    },
    selectTag: () => {
      throw new Error('selectTag method not connected');
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      machine: this.generateState('default'),
      name: 'default',
    };
  }

  shouldComponentUpdate(nextProps: Props) {
    if (!isEqual(nextProps, this.props)) {
      return true;
    }
    return false;
  }

  focusedInputObserver = (_, state): void => {
    const { focused } = state.machine;
    this.toggleDisableSubmit(focused);
  }

  generateState(stateName: string): { submitDisabled: boolean } {
    switch (stateName) {
      case 'submit_disabled':
        return {
          submitDisabled: true,
        };
      default:
        return {
          submitDisabled: false,
        };
    }
  }

  handleSubmit = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    const { startSearch } = this.props;
    const { machine: { submitDisabled } } = this.state;
    if (!submitDisabled) {
      startSearch();
    }
  }

  hackForHandleSubmit = (event) => {
    event.preventDefault();
    const { config: { domain }, fullSearchUrl } = this.props;
    const { machine: { submitDisabled } } = this.state;
    if (!submitDisabled) {
      window.location.href = `/${domain}${fullSearchUrl}`;
    }
  }

  toggleDisableSubmit = (isDisabled: boolean): void => {
    setTimeout(() => {
      this.goToState(isDisabled ? 'submit_disabled' : 'default');
    }, isDisabled ? 0 : 250);
  }

  render() {
    const { attribute, config: { datepickerLang, defaultLocation, domain }, hasTagInput, search, selectDate, selectGuestOption, selectTag } = this.props;
    const { params: { date, guests, lat, location, lon, tag } } = search;

    return (
      <div className={css(styles.searchBarWrapper)}>
        <div className={css(pagestyles.block)}>
          <input
            name="lat"
            type="hidden"
            value={lat ? lat : defaultLocation.lat}
          />
          <input
            name="lon"
            type="hidden"
            value={lon ? lon : defaultLocation.lon}
          />
          <input
            name="guests"
            type="hidden"
            value={guests}
          />
          <input
            name="date"
            type="hidden"
            value={date}
          />
          {(typeof attribute !== 'undefined' && attribute !== null) &&
            <input
              name="atts[0]"
              type="hidden"
              value={attribute}
            />
          }
          <div className={css(styles.searchBarInputsContainer)}>
            {hasTagInput &&
              <TagInputContainer>
                {({ getDropdownTheme, handleContainerBlur, handleContainerFocus }) => (
                  <TagInput
                    domain={domain}
                    getDropdownTheme={getDropdownTheme}
                    handleContainerBlur={handleContainerBlur}
                    handleContainerFocus={handleContainerFocus}
                    observers={[this.focusedInputObserver]}
                    selectTag={selectTag}
                    tag={tag}
                    tags={search.tags}
                  />
                )}
              </TagInputContainer>
            }
            <LocationInputContainer hasTagInput={hasTagInput}>
              {({ getDropdownTheme, handleContainerBlur, handleContainerFocus }) => (
                <LocationInput
                  domain={domain}
                  getDropdownTheme={getDropdownTheme}
                  handleContainerBlur={handleContainerBlur}
                  handleContainerFocus={handleContainerFocus}
                  location={location}
                  observers={[this.focusedInputObserver]}
                />
              )}
            </LocationInputContainer>
            <DateInput
              date={date}
              datepickerLang={datepickerLang}
              observers={[this.focusedInputObserver]}
              selectDate={selectDate}
            />
            <GuestInput
              guests={guests}
              observers={[this.focusedInputObserver]}
              selectGuestOption={selectGuestOption}
            />
            <SearchButton onClick={this.hackForHandleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default useConfig(useSearch(SearchBar));
