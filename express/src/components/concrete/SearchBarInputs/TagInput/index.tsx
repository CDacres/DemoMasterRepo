/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import isMobile from 'ismobilejs';
import shortid from 'shortid';

// Styles
import searchInputStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Connectors
import { useConfig } from '@src/store/connectors';

// Utils
import { convertTagSlugToString } from '@src/utils';

// Components
import StatefulComponent, { StatefulProps, StatefulState } from '@src/components/base/StatefulComponent';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Store, Tag, Tags } from '@src/typings/types';

type Props = StatefulProps & {
  changeTag?: (tag: string) => void;
  config: Store.Config;
  domain: string;
  fetchTags?: () => Tags;
  getDropdownTheme: (editing: boolean) => object;
  handleContainerBlur: (trueBlur?: boolean) => void;
  handleContainerFocus: () => void;
  highlightFirstSuggestion?: (state: State) => boolean;
  lang?: Store.Lang;
  selectTag?: (tag: string) => void;
  shouldRenderSuggestions?: (state: State) => boolean;
  tag: string;
  tags: {
    defaultTags: Tag[];
    tags: Tag[];
  };
};
type State = StatefulState & {
  machine: {
    focused: boolean;
    results: Tag[];
  };
  name: string;
  value: string;
};

class TagInput extends StatefulComponent<Props, State> {
  static defaultProps = {
    highlightFirstSuggestion: state => state.value !== '',
    observers: [],
    tags: {
      defaultTags: [],
      tags: [],
    },
  };

  // inputName required for focus init at grandparent level.
  // Retrieved from the passed instance to select correct state
  public inputName: string = 'tags';

  protected inputElement: HTMLInputElement = null;
  protected unstable: boolean;

  constructor(props: Props) {
    super(props);
    this.state = {
      name: 'default',
      machine: this.generateState('default', props.tags.defaultTags),
      value: props.tag ? convertTagSlugToString(props.tag) : '',
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { tag } = this.props;
    const { name, value } = this.state;
    if (nextProps.tag !== tag) {
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
    const { tag } = this.props;
    if (prevProps.tag !== tag) {
      this.setState({ value: convertTagSlugToString(tag) });
    }
  }

  bindInputElement = inputElement => {
    this.inputElement = inputElement;
  }

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  generateState(stateName: string, stateParam: Tag[]) {
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
          results: stateParam || previousState.results,
        };
    }
  }

  getSuggestions = value => {
    const { tags: { defaultTags, tags } } = this.props;
    if (value) {
      const escapedValue = this.escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return [];
      }
      const inputLength = escapedValue.length;

      return inputLength === 0 ? [] : tags.filter(item => item.label.toLowerCase().slice(0, inputLength) === escapedValue.toLowerCase()).slice(0, 5);
    }
    return defaultTags;
  }

  getSuggestionValue = suggestion => {
    return `${suggestion.label}`;
  }

  handleBlur = (_, { highlightedSuggestion }) => {
    const { handleContainerBlur } = this.props;
    const { machine: { focused }, value } = this.state;
    if (!this.unstable && focused && value !== '' && highlightedSuggestion) {
      this.setTag(highlightedSuggestion);
    }
    this.goToState('default');
    handleContainerBlur();
  }

  handleChange = (_, { newValue }) => {
    if (newValue === '') {
      this.setState({ value: '' });
    } else {
      this.setState({ value: newValue });
    }
  }

  handleFocus = () => {
    const { handleContainerFocus } = this.props;
    this.goToState('focused');
    handleContainerFocus();
  }

  handleSuggestionsClearRequested = () => {
    const { tags: { defaultTags } } = this.props;
    this.goToState('default', defaultTags);
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.goToState('focused', this.getSuggestions(value));
  }

  handleTagSelected = (_, { suggestion }) => {
    const { handleContainerBlur } = this.props;
    this.unstable = true;
    this.setTag(suggestion);
    this.goToState('default');
    handleContainerBlur(true);
    this.inputElement.blur();
    this.unstable = false;
  }

  highlightFirstSuggestion = () => {
    const { highlightFirstSuggestion } = this.props;
    return highlightFirstSuggestion(this.state);
  }

  renderInputComponent = inputProps => <input {...inputProps} ref={this.bindInputElement} />;

  renderSuggestion = (suggestion, { query }) => {
    const matches = AutosuggestHighlightMatch(suggestion.label, query);
    const parts = AutosuggestHighlightParse(suggestion.label, matches);
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
    const { shouldRenderSuggestions } = this.props;
    if (shouldRenderSuggestions && !shouldRenderSuggestions(this.state)) {
      return null;
    }
    return (
      <div {...containerProps}>
        {children}
      </div>
    );
  }

  setTag = tag => {
    this.props.selectTag(tag.quickSlug);
  }

  shouldRenderSuggestions = () => {
    const { shouldRenderSuggestions } = this.props;
    if (shouldRenderSuggestions) {
      return shouldRenderSuggestions(this.state);
    }
    return true;
  }

  render() {
    const { getDropdownTheme } = this.props;
    const { machine: { focused, results }, value } = this.state;
    return (
      <Translatable attributes={{ id: { transKey: 'common.what' }, inputProps: { placeholder: { transKey: 'common.what' } } }}>
        <Autosuggest
          focusInputOnSuggestionClick={!isMobile.any}
          getSuggestionValue={this.getSuggestionValue}
          highlightFirstSuggestion={this.highlightFirstSuggestion()}
          id="tag-input"
          inputProps={{
            autoComplete: 'off',
            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            value,
          }}
          onSuggestionSelected={this.handleTagSelected}
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

export default useConfig(TagInput);
