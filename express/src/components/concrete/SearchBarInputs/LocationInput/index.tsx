/* tslint:disable:max-line-length */
import * as React from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import isMobile from 'ismobilejs';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import searchInputStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Connectors
import { useConfig, useSearch } from '@src/store/connectors';

// Utils
import { convertLocationSlugToString, convertLocationStringToSlug } from '@src/utils';

// Components
import StatefulComponent, { StatefulProps } from '@src/components/base/StatefulComponent';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Store, Tag } from '@src/typings/types';

declare const google: any;

type Props = StatefulProps & {
  config?: Store.Config;
  domain: string;
  getDropdownTheme?: (editing: boolean) => object;
  handleContainerBlur?: (trueBlur?: boolean) => void;
  handleContainerFocus?: () => void;
  highlightFirstSuggestion?: (state: State) => boolean;
  lang?: Store.Lang;
  location?: string;
  selectLocation?: (placeId: string, location: string, latLon?: object) => any;
  shouldRenderSuggestions?: (state: State) => boolean;
};

type State = {
  name: string;
  machine: {
    focused: boolean;
    results: Tag[];
  };
  value: string;
};

type AutocompleteService = {
  getPlacePredictions: (obj: { input: string; bounds: any }, cb: (predictions: any[], status: string) => void) => void;
};

// type suggestionType = {
//   description: string
// };

class LocationInput extends StatefulComponent<Props, State> {
  static defaultProps = {
    highlightFirstSuggestion: state => state.value !== '',
    observers: [],
  };

  // inputName required for focus init at grandparent level.
  // Retrieved from the passed instance to select correct state
  public inputName: string = 'location';

  protected autoComplete: AutocompleteService;
  protected inputElement: HTMLInputElement = null;
  protected unstable: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      name: 'default',
      machine: this.generateState('default', { results: [] }),
      value: props.location ? convertLocationSlugToString(props.location) : '',
    };
  }

  componentDidMount() {
    this.autoComplete = new google.maps.places.AutocompleteService();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { location } = this.props;
    const { name, value } = this.state;
    if (nextProps.location !== location) {
      return true;
    }
    if (nextState.name !== name) {
      return true;
    }
    if (nextState.value !== value) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps: Props) {
    const { location } = this.props;
    if (prevProps.location !== location) {
      this.setState({ value: convertLocationSlugToString(location) });
    }
  }

  bindInputElement = inputElement => {
    this.inputElement = inputElement;
  }

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  generateState(stateName: string, stateParam: any) { // not sure if this is necessary combined with focus state in LocationInputContainer
    const previousState = this.state ? { ...this.state.machine } : { results: [] };
    switch (stateName) {
      case 'focused':
        return {
          focused: true,
          results: stateParam || previousState.results,
        };
      default:
        return {
          focused: false,
          results: [],
        };
    }
  }

  getSuggestions = value => {
    if (value) {
      const { results } = this.state.machine;
      const escapedValue = this.escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return [];
      }
      const inputLength = escapedValue.length;

      return inputLength === 0 ? [] : results.filter(item => item.description.toLowerCase().slice(0, inputLength) === escapedValue.toLowerCase()).slice(0, 5);
    }
    return [];
  }

  getSuggestionValue = suggestion => {
    return `${suggestion.description}`;
  }

  handleBlur = (_, { highlightedSuggestion }) => {
    const { handleContainerBlur } = this.props;
    const { focused } = this.state.machine;
    if (!this.unstable && focused && highlightedSuggestion && highlightedSuggestion.description) {
      this.setState({ value: highlightedSuggestion.description });
      this.setLocation(highlightedSuggestion);
    }
    this.goToState('default');
    handleContainerBlur();
  }

  handleChange = (_, { newValue, method }) => {
    if (method === 'enter' || method === 'click') {
      this.setState({ value: newValue });
    } else if (method === 'type' && newValue !== '') {
      this.setState({ value: newValue });
    } else if (method === 'type' && newValue === '') {
      this.setState({ value: '' });
    }
    if (method !== 'enter' && method !== 'click' && method !== 'down' && method !== 'up' && newValue !== '') {
      this.handleGooglePlaces(newValue);
    }
  }

  handleFocus = () => {
    const { handleContainerFocus, location } = this.props;
    if (location !== '') {
      this.handleGooglePlaces(location);
    } else {
      this.goToState('focused');
    }
    handleContainerFocus();
  }

  handleGeocoding = location => {
    const { config: { domain } } = this.props;
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        {
          address: location,
          region: domain,
        },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
            const place = results[0];
            const lat = place.geometry.location.lat();
            const lon = place.geometry.location.lng();
            resolve({ lat, lon });
          } else {
            reject(status);
          }
        }
      );
    });
  }

  handleGooglePlaces = value => {
    const { config: { bounds } } = this.props;
    const defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.swLat, bounds.swLon), new google.maps.LatLng(bounds.neLat, bounds.neLon));
    this.autoComplete.getPlacePredictions(
      {
        input: value,
        bounds: defaultBounds,
      },
      (predictions, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          throw new Error(status);
        }
        if (!this.unstable) {
          this.goToState('focused', predictions);
        }
      }
    );
  }

  handleLocationSelected = async (_, { suggestion }) => {
    this.setLocation(suggestion);
  }

  handleSuggestionsClearRequested = () => {
    this.goToState('default');
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    if (!this.unstable) {
      this.goToState('focused', this.getSuggestions(value));
    }
  }

  highlightFirstSuggestion = () => {
    const { highlightFirstSuggestion } = this.props;
    return highlightFirstSuggestion(this.state);
  }

  renderInputComponent = inputProps => <input {...inputProps} ref={this.bindInputElement} />;

  renderSuggestion = (suggestion, { query }) => {
    const matches = AutosuggestHighlightMatch(suggestion.description, query);
    const parts = AutosuggestHighlightParse(suggestion.description, matches);
    return (
      <span className={css(searchInputStyles.textContainer, pagestyles.tableCellTop)}>
        <span className={css(searchInputStyles.text, margin.all_0, padding.topbottom_0)}>
          {parts.map(part => {
            const style = part.highlight ? { color: '#00c6ff' } : {};
            return (
              <span
                key={shortid.generate()}
                style={style}
              >
                {part.text}
              </span>
            );
          })}
        </span>
      </span>
    );
  }

  renderSuggestionsContainer = ({ containerProps, children }) => {
    const { value } = this.state;
    if (value !== '') {
      return (
        <div {...containerProps}>
          {children}
        </div>
      );
    }
    return null;
  }

  setLocation = async (suggestion) => {
    const { description, place_id } = suggestion;
    const { handleContainerBlur, selectLocation } = this.props;
    this.unstable = true;
    const latLon: any = await this.handleGeocoding(description);
    selectLocation(place_id, convertLocationStringToSlug(description), latLon);
    this.goToState('default');
    handleContainerBlur(true);
    this.inputElement.blur();
    this.unstable = false;
  }

  shouldRenderSuggestions = () => {
    const { shouldRenderSuggestions } = this.props;
    const { focused } = this.state.machine;
    if (shouldRenderSuggestions) {
      return focused && shouldRenderSuggestions(this.state);
    }
    return focused;
  }

  render() {
    const { getDropdownTheme } = this.props;
    const { machine: { focused, results }, value } = this.state;
    return (
      <Translatable attributes={{ inputProps: { placeholder: { transKey: 'common.where' } } }}>
        <Autosuggest
          focusInputOnSuggestionClick={!isMobile.any}
          getSuggestionValue={this.getSuggestionValue}
          highlightFirstSuggestion={this.highlightFirstSuggestion()}
          id="location-input"
          inputProps={{
            autoComplete: 'off',
            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            value,
          }}
          onSuggestionSelected={this.handleLocationSelected}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          renderInputComponent={this.renderInputComponent}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          suggestions={results}
          theme={getDropdownTheme(focused)}
        />
      </Translatable>
    );
  }
}

export default useConfig(useSearch(LocationInput));
