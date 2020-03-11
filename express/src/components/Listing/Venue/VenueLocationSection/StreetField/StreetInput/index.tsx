import * as React from 'react';
import { debounce } from 'lodash';
import Auto from 'react-autosuggest';
import { css } from 'aphrodite/no-important';

// Core
import { uid } from '@src/core';
import { specs } from '@src/core/ux';

// Styles
import styles from './styles';

// Components
import Spell from '@src/components/Listing/Translate/Spell';
import List from '@src/components/Listing/Form/List';

type StreetInputSuggestion = {
  main: string;
  placeId: string;
  secondary: string;
};

const AutoInput = Auto as new () => Auto<StreetInputSuggestion>;

type Props = {
  countryCode?: string;
  errors?: string[];
  onBlur?: (query: string, placeId: string) => void;
  options: {
    bounds?: any;
  };
  placeholder: string;
  value: string;
};

type State = {
  query: string;
  suggestion?: StreetInputSuggestion;
  suggestions: StreetInputSuggestion[];
};

class StreetInput extends React.Component<Props, State> {

  state: State = {
    query: this.props.value,
    suggestion: null,
    suggestions: [],
  };

  autoCompleteService = null;

  componentDidMount() {
    this.autoCompleteService = new google.maps.places.AutocompleteService();
  }

  handleFetch = ({ value }: Auto.SuggestionsFetchRequestedParams) => {
    const { countryCode, options } = this.props;
    const request = {
      bounds: options.bounds,
      types: ['address'],
      componentRestrictions: { country: countryCode },
      input: value,
    };
    if (this.autoCompleteService != null) {
      this.autoCompleteService.getPlacePredictions(request, this.autoCompleteCallback);
    }
  }

  autoCompleteCallback = (predictions) => {
    this.setState({
      suggestions: (predictions || []).map((i) => ({
        main: i.structured_formatting.main_text,
        secondary: i.structured_formatting.secondary_text,
        placeId: i.place_id,
      })),
    });
  }

  renderSuggestionsContainer = ({ children, containerProps, query }: Auto.RenderSuggestionsContainerParams) => {
    return (
      <List
        containerProps={containerProps}
        query={query}
      >
        {children}
      </List>
    );
  }

  renderSuggestion = (suggestion: StreetInputSuggestion, params: Auto.RenderSuggestionParams): React.ReactNode => {
    return (
      <div className={css(styles.suggestionContainer, params.isHighlighted && styles.selected)}>
        <span>
          <span className={css(styles.suggestionMain)}>
            {suggestion.main}{','}
          </span>
          {' '}
          <span>
            {suggestion.secondary}
          </span>
        </span>
      </div>
    );
  }

  handleChange = (__, v) => {
    this.setState({ query: v.newValue });
  }

  handleBlur = () => {
    const { query, suggestion } = this.state;
    this.dispatchBlur(query, suggestion && suggestion.placeId || null);
  }

  dispatchBlur = (query: string, placeId: string) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(query, placeId);
    }
  }

  handleSuggestionSelected = async (
    __: React.FormEvent<any>,
    data: Auto.SuggestionSelectedEventData<StreetInputSuggestion>) => {
    this.setState({ suggestion: data.suggestion }, this.handleBlur);
  }

  render() {
    const { errors, placeholder } = this.props;
    const { query, suggestions } = this.state;
    const debouncedFetch = debounce(this.handleFetch, 450);
    const clearSuggestions = () => this.setState({ suggestions: [] });
    const hasError = errors && errors.length > 0;
    return (
      <div className={css(styles.container)}>
        <AutoInput
          getSuggestionValue={(i) => i.main}
          inputProps={{
            autoComplete: uid(),
            value: query,
            onChange: this.handleChange,
            onBlur: this.handleBlur,
            className: css(styles.textInput, hasError && styles.containerError),
          }}
          onSuggestionsClearRequested={clearSuggestions}
          onSuggestionSelected={this.handleSuggestionSelected}
          onSuggestionsFetchRequested={debouncedFetch}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          suggestions={suggestions}
          theme={{
            container: {
              position: 'relative',
              height: '46px',
              gridColumn: 1,
              gridRow: 1,
            },
            input: {
              color: specs.textColor,
            },
            suggestionsContainerOpen: {
              position: 'absolute',
              zIndex: 1,
              left: '0px',
              right: '0px',
              backgroundColor: specs.white,
              border: specs.boxBorder,
              borderWidth: '2px',
              boxShadow: specs.boxShadow,
            },
            suggestion: {
              display: 'bloc',
            },
            suggestionsList: {
              margin: '0px',
              padding: '0px',
              listStyleType: 'none',
            },
          }}
        />
        {!query && !!placeholder &&
          <div className={css(styles.placeholder)}>
            <Spell word={placeholder} />
          </div>
        }
      </div>
    );
  }
}

export default StreetInput;
