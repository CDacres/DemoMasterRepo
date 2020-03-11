
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import axios from 'axios';

import Autosuggest from 'react-autosuggest';

import ClickWrapper from './GuestPanel/ClickWrapper.jsx';

import { getMatches } from './methods';

const AutosuggestHighlightMatch = require('autosuggest-highlight/match');
const AutosuggestHighlightParse = require('autosuggest-highlight/parse');

class HeaderSearchBar extends Component {
    static propTypes = {
        attribute: PropTypes.string,
        country_lang_url: PropTypes.string.isRequired,
        date: PropTypes.string,
        defaultTags: PropTypes.array.isRequired,
        guests: PropTypes.string.isRequired,
        homePage: PropTypes.bool.isRequired,
        isBrowsePage: PropTypes.bool,
        lang: PropTypes.object.isRequired,
        language_code: PropTypes.string.isRequired,
        lat: PropTypes.string,
        locationSelected: PropTypes.bool.isRequired,
        location_desc: PropTypes.string,
        lon: PropTypes.string,
        onSubmitSearch: PropTypes.func.isRequired,
        search_url: PropTypes.string,
        selectDate: PropTypes.func.isRequired,
        selectGuestOption: PropTypes.func.isRequired,
        selectLocation: PropTypes.func.isRequired,
        selectTag: PropTypes.func.isRequired,
        setTagLabel: PropTypes.func.isRequired,
        tag: PropTypes.object,
        tagLabel: PropTypes.string,
        tags: PropTypes.array.isRequired
    }

    state = {
        dateInputFocus: false,
        disableSubmit: false,
        filtersOpen: false,
        focusedResultIndex: -1,
        hideGeoResults: true,
        geoResults: [],
        locationInput: {
            value: this.props.homePage || this.props.isBrowsePage ? '' : this.props.location_desc
        },
        locationInputFocus: false,
        showGuestPanel: false,
        tagInput: {
            focus: false,
            visible: false,
            results: this.props.defaultTags,
            value: this.props.tagLabel
        }
    }

    componentDidMount() {
        const { language_code } = this.props;
        this.autoComplete = new google.maps.places.AutocompleteService();
        if (this.props.isBrowsePage && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation);
        } else {
            console.log('No geolocation API to get user location.');
        }
        $('#date_search').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $.datepicker.setDefaults($.datepicker.regional[language_code]);
    }

    setUserLocation = position => {
        this.getUserLocation(position.coords.latitude, position.coords.longitude)
            .then(res => {
                if (
                    res.data.status === 'OK' &&
                    res.data.results &&
                    res.data.results[0] &&
                    res.data.results[0].address_components
                ) {
                    const userLocation = res.data.results[0].address_components.find(component =>
                        component.types.find(type =>
                            type === 'neighborhood' || type === 'political'
                        )
                    );
                    this.setState({
                        locationInput: {
                            value: userLocation.long_name
                        }
                    });
                } else {
                    console.log('Something went wrong');
                }
            })
            .catch(console.log);
    }

    getUserLocation = (lat, lng) => {
        return axios({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false&key=AIzaSyALXMs8-iGTe7vIV5ItmF9YrhoJrttFiJg`
        });
    }

    displaySuggestions = (predictions, status) => {
        const { keyboardScroll, selectLocation } = this;
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log(status);
            return;
        }
        const geoResults = predictions.map((prediction, index) => (
            <li
                key={shortid.generate()}
                id={`result_${index}`}
                className="landing-header__geolocation-result location-result"
                data-location={prediction.description}
                onClick={selectLocation}
            >
                <div className="landing-header__geolocation-result-text-container">
                    <div className="landing-header__geolocation-result-location-text">
                        {prediction.description}
                    </div>
                </div>
            </li>
        ));
        if (geoResults.length) {
            window.addEventListener('keyup', keyboardScroll);
        }
        this.setState({
            geoResults,
            hideGeoResults: false
        });
    }

    escapeKeyBinding = e => {
        const { toggleBlur } = this;
        if (e.keyCode === 27) {
            toggleBlur();
        }
    }

    handleTagChange = e => {
        const { displayTagSuggestions } = this;
        const { tags } = this.props;
        const value = e.target.value;
        if (value !== '') {
            const matches = getMatches(tags, value);
            if (matches.length) {
                displayTagSuggestions(matches, value);
            }
        }
        this.setState(prevState => ({
            tagInput: {
                ...prevState.tagInput,
                value
            }
        }));
    }

    handleTagClick = (e, { suggestion }) => {
        const { selectTag, setTagLabel } = this.props;
        selectTag(suggestion);
        setTagLabel(suggestion.label);
    }

    selectTag = tag => {
        const { toggleBlur } = this;
        const { selectTag, setTagLabel } = this.props;
        this.setState(prevState => ({
            tagInput: {
                ...prevState.tagInput,
                value: tag.label,
                visible: false
            }
        }), toggleBlur);
        selectTag(tag);
        setTagLabel(tag.label);
    }

    handleResultMouseEnter = e => {
        e.target.style.backgroundColor = '#fafafa';
    }

    handleResultMouseLeave = e => {
        e.target.style.backgroundColor = '#fff';
    }

    selectLocation = (event, location) => {
        event.preventDefault();
        event.stopPropagation();
        let value;
        if (typeof location === 'string') {
            value = location;
        } else {
            value = event.target.dataset.location;
        }
        this.setState(prevState => ({
            disableSubmit: false,
            locationInput: {
                ...prevState.locationInput,
                value
            }
        }), () => {
            this.props.selectLocation(value);
            this.toggleBlur();
        });
    }

    toggleGuestPanel = () => {
        const { showGuestPanel } = this.state;
        this.setState({
            showGuestPanel: !showGuestPanel
        });
    }

    toggleFocus = event => {
        event.persist();
        setTimeout(() => {
            const id = event.target.id.split('_')[0];
            if (id === 'date') {
                $('#date_search').datepicker('show');
                this.setState({
                    [`${id}InputFocus`]: true
                });
            }
            if (id === 'location') {
                if (event.target.value !== '') {
                    this.autoComplete.getPlacePredictions({
                        input: event.target.value
                    }, this.displaySuggestions);
                }
                this.setState({
                    [`${id}InputFocus`]: true
                });
            }
            if (id === 'tag') {
                const {
                    disableEnterKey,
                    displayTagSuggestions,
                    escapeKeyBinding,
                    tagKeyboardScroll
                } = this;
                document.getElementById('search_form').addEventListener('keydown', disableEnterKey);
                window.addEventListener('keyup', tagKeyboardScroll);
                window.addEventListener('keyup', escapeKeyBinding);
                this.setState({
                    tagInput: {
                        ...this.state.tagInput,
                        focus: true
                    }
                });
                displayTagSuggestions();
            }
        }, 110);
    }

    keyboardScroll = event => {
        let index = this.state.focusedResultIndex;
        if (this.state.geoResults.length) {
            if (event.keyCode === 40) {
                index += 1;
                if (index < 5) {
                    const elements = document.getElementsByClassName('location-result');
                    for (let i = 0; i < elements.length; i += 1) {
                        elements[i].style.backgroundColor = 'transparent';
                    }
                    const element = document.getElementById(`result_${index}`);
                    element.style.backgroundColor = '#fafafa';
                    this.setState({
                        disableSubmit: true,
                        focusedResultIndex: index
                    });
                }
            } else if (event.keyCode === 38) {
                index -= 1;
                if (index > -1) {
                    const elements = document.getElementsByClassName('location-result');
                    for (let i = 0; i < elements.length; i += 1) {
                        elements[i].style.backgroundColor = 'transparent';
                    }
                    const element = document.getElementById(`result_${index}`);
                    element.style.backgroundColor = '#fafafa';
                    this.setState({
                        disableSubmit: true,
                        focusedResultIndex: index
                    });
                }
            } else if (event.keyCode === 13 && (index > -1 && index < 5)) {
                this.selectLocation(event, document.querySelector(`#result_${this.state.focusedResultIndex}`).dataset.location);
                this.setState({
                    focusedResultIndex: -1,
                    hideGeoResults: true
                });
            }
        }
    }

    handleShowTagInput = () => {
        this.setState(prevState => ({
            tagInput: {
                ...prevState.tagInput,
                visible: true
            }
        }));
    }

    handleHideTagInput = () => {
        this.setState(prevState => ({
            tagInput: {
                ...prevState.tagInput,
                visible: false
            }
        }));
    }

    toggleBlur = event => {
        if (event) {
            event.persist();
        }
        setTimeout(() => {
            if (event) {
                event.stopPropagation();
                const id = event.target.id.split('_')[0];
                if (id === 'date') {
                    const date = $('#date_search').datepicker('getDate');
                    this.props.selectDate($.datepicker.formatDate('dd-mm-yy', date));
                }
                if (id === 'location') {
                    document.getElementById('search_form')
                        .removeEventListener('keydown', this.disableEnterKey);
                    window.removeEventListener('keyup', this.keyboardScroll);
                    // if (event.target.value !== '') {
                    //     this.selectLocation(event, document.querySelector(`#result_0`).dataset.location);
                    // } else {
                    //     this.selectLocation(event, '');
                    // }
                    setTimeout(() => {
                        this.setState({
                            [`${id}InputFocus`]: false
                        });
                    }, 500);
                }
                if (id === 'tag') {
                    document.getElementById('search_form')
                        .removeEventListener('keydown', this.disableEnterKey);
                    window.removeEventListener('keyup', this.tagKeyboardScroll);
                    window.removeEventListener('keyup', this.escapeKeyBinding);
                    this.setState({
                        tagInput: {
                            ...this.state.tagInput,
                            focus: false
                        }
                    });
                } else {
                    this.setState({
                        [`${id}InputFocus`]: false
                    });
                }
            } else {
                this.setState({
                    locationInputFocus: false,
                    tagInput: {
                        ...this.state.tagInput,
                        focus: false
                    }
                });
            }
        }, 250);
    }

    shouldRenderSuggestions = () => {
        return true;
    }

    onTagChange = (event, { newValue }) => {
        this.setState(prevState => ({
            tagInput: {
                ...prevState.tagInput,
                value: newValue
            }
        }));
    }

    onSuggestionsFetchRequested = ({ value }) => {
        const { getSuggestions } = this;
        this.setState(prevState => ({
            tagInput: {
                ...prevState.tagInput,
                results: getSuggestions(value)
            }
        }));
    }

    onSuggestionsClearRequested = () => {
        this.setState(prevState => ({
            tagInput: {
                ...prevState.tagInput,
                results: this.props.defaultTags
            }
        }));
    }

    escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    getSuggestions = value => {
        const { escapeRegexCharacters } = this;
        if (value) {
            const { tags } = this.props;
            const escapedValue = escapeRegexCharacters(value.trim());

            if (escapedValue === '') {
                return [];
            }
            const inputLength = escapedValue.length;

            return inputLength === 0 ? [] : tags.filter(item =>
                item.label.toLowerCase()
                    .slice(0, inputLength) === escapedValue.toLowerCase()
            );
        }
        return this.props.defaultTags;
    }

    getSuggestionValue = suggestion => {
        return `${suggestion.label}`;
    }

    renderSuggestion = (suggestion, { query }) => {
        const matches = AutosuggestHighlightMatch(suggestion, query);
        const parts = AutosuggestHighlightParse(suggestion, matches);
        return (
            <span>
                <span>
                    {
                        parts.map(part => {
                            const style = part.highlight ? { color: '#00c8ff' } : {};
                            return (
                                <span
                                    key={shortid.generate()}
                                    style={style}
                                >{part.text.label}</span>
                            );
                        })
                    }
                </span>
            </span>
        );
    }

    render() {
        const {
            getSuggestionValue,
            handleHideTagInput,
            handleShowTagInput,
            handleTagClick,
            onTagChange,
            onSuggestionsFetchRequested,
            onSuggestionsClearRequested,
            renderSuggestion,
            shouldRenderSuggestions,
            toggleBlur,
            toggleFocus,
            toggleGuestPanel
        } = this;
        const {
            dateInputFocus,
            tagInput,
            hideGeoResults,
            geoResults,
            locationInput,
            locationInputFocus,
            showGuestPanel
        } = this.state;
        const {
            attribute,
            country_lang_url,
            date,
            guests,
            homePage,
            lang,
            language_code,
            lat,
            locationSelected,
            location_desc,
            lon,
            onSubmitSearch,
            selectGuestOption,
            tag
        } = this.props;
        const handleGuestOptionClick = event => {
            toggleGuestPanel();
            return selectGuestOption(event.target.dataset.value);
        };
        const handleChange = event => {
            const value = event.target.value;
            this.setState(prevState => ({
                locationInput: {
                    ...prevState.locationInput,
                    value
                }
            }), () => {
                if (value !== '') {
                    this.autoComplete.getPlacePredictions({
                        input: value
                    }, this.displaySuggestions);
                }
            });
        };
        const handleSubmit = event => {
            event.preventDefault();
            const { disableSubmit } = this.state;
            if (!disableSubmit) {
                onSubmitSearch(locationSelected, location_desc);
            }
        };
        const inputProps = {
            placeholder: lang.home.home_search_what,
            value: tagInput.value,
            onChange: onTagChange,
            onBlur: handleHideTagInput,
            onFocus: handleShowTagInput
        };
        return (
            <div className="landing-header__search-wrapper">
                <div className="landing-header__search-container">
                    <div className="">
                        <form
                            id="search_form"
                            method="get"
                            action={`/${country_lang_url}/s/${tag.quick_slug}/`}
                            onSubmit={handleSubmit}
                        >
                            <input type="hidden" name="lat" value={lat} />
                            <input type="hidden" name="lon" value={lon} />
                            <input type="hidden" name="action" value={`/${country_lang_url}/s/${tag.quick_slug}/`} />
                            <input type="hidden" name="guests" value={guests} />
                            <input type="hidden" name="lang" value={language_code} />
                            {typeof attribute !== 'undefined' && attribute !== null ?
                                <input type="hidden" name="atts[0]" value={attribute} /> : null
                            }
                            <div
                                className="landing-header__search-bar-container"
                                style={
                                    country_lang_url === 'fr' ? {
                                        tableLayout: 'auto'
                                    } : null
                                }
                            >
                                {
                                    homePage ?
                                        <div
                                            className="landing-header__search-bar-input-container"
                                            style={
                                                country_lang_url === 'fr' ? {
                                                    width: '27%'
                                                } : null
                                            }
                                        >
                                            <div className="landing-header__search-bar-input-label">{lang.home.home_search_what}</div>
                                            <div className="landing-header__search-bar-geo-input-container">
                                                <div className="landing-header__search-bar-relative-container">
                                                    <div className="landing-header__search-bar-block-fullwidth">
                                                        <label
                                                            className="landing-header__visually-hidden"
                                                            htmlFor="tag"
                                                        >{lang.home.home_search_what}</label>
                                                        <div className="landing-header__search-bar-input-container--borderless">
                                                            <Autosuggest
                                                                suggestions={tagInput.results}
                                                                shouldRenderSuggestions={shouldRenderSuggestions}
                                                                onSuggestionSelected={handleTagClick}
                                                                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                                                onSuggestionsClearRequested={onSuggestionsClearRequested}
                                                                getSuggestionValue={getSuggestionValue}
                                                                renderSuggestion={renderSuggestion}
                                                                inputProps={inputProps}
                                                                theme={
                                                                    tagInput.visible ?
                                                                    {
                                                                        input: {
                                                                            fontFamily: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif,
                                                                            fontSize: '19px',
                                                                            lineHeight: '24px',
                                                                            letterSpacing: '0.2px',
                                                                            paddingTop: '0px',
                                                                            paddingBottom: '0px',
                                                                            color: '#484848',
                                                                            backgroundColor: 'transparent',
                                                                            border: '0px',
                                                                            padding: '11px',
                                                                            width: '100%',
                                                                            textOverflow: 'ellipsis',
                                                                            outline: 'none'
                                                                        },
                                                                        inputFocused: {
                                                                            width: '100%'
                                                                        },
                                                                        suggestionsContainer: {
                                                                            backgroundColor: 'rgb(255, 255, 255)',
                                                                            marginTop: '0px',
                                                                            position: 'absolute',
                                                                            borderColor: 'rgb(219, 219, 219)',
                                                                            borderRadius: '0px 0px 2px 2px',
                                                                            borderStyle: 'solid',
                                                                            borderWidth: '1px',
                                                                            padding: '0px',
                                                                            overflow: 'hidden',
                                                                            width: '273px',
                                                                            left: '-8px',
                                                                            top: '48px',
                                                                            zIndex: 9999
                                                                        },
                                                                        suggestionHighlighted: {
                                                                            backgroundColor: '#fafafa'
                                                                        },
                                                                        suggestionsList: {
                                                                            padding: 0
                                                                        },
                                                                        suggestion: {
                                                                            cursor: 'pointer',
                                                                            display: 'table',
                                                                            listStyleType: 'none',
                                                                            width: '100%',
                                                                            outline: 'none',
                                                                            padding: '8px 12px'
                                                                        }
                                                                    } :
                                                                    {
                                                                        input: {
                                                                            fontFamily: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif,
                                                                            fontSize: '19px',
                                                                            lineHeight: '18px',
                                                                            letterSpacing: '0.2px',
                                                                            paddingTop: '0px',
                                                                            paddingBottom: '0px',
                                                                            color: '#484848',
                                                                            backgroundColor: 'transparent',
                                                                            border: '0px',
                                                                            padding: '11px',
                                                                            width: '100%',
                                                                            textOverflow: 'ellipsis',
                                                                            outline: 'none'
                                                                        },
                                                                        inputFocused: {
                                                                            width: '100%'
                                                                        },
                                                                        suggestionsContainer: {
                                                                            backgroundColor: 'rgb(255, 255, 255)',
                                                                            marginTop: '0px',
                                                                            position: 'absolute',
                                                                            borderColor: 'rgb(219, 219, 219)',
                                                                            borderRadius: '0px 0px 2px 2px',
                                                                            borderStyle: 'solid',
                                                                            borderWidth: '0px',
                                                                            padding: '0px',
                                                                            overflow: 'hidden',
                                                                            width: '572px',
                                                                            left: '-32px',
                                                                            top: '42px'
                                                                        },
                                                                        suggestionHighlighted: {
                                                                            backgroundColor: '#fafafa'
                                                                        },
                                                                        suggestionsList: {
                                                                            padding: '0px',
                                                                            margin: '0px'
                                                                        },
                                                                        suggestion: {
                                                                            cursor: 'pointer',
                                                                            display: 'table',
                                                                            listStyleType: 'none',
                                                                            width: '100%',
                                                                            outline: 'none',
                                                                            padding: '8px 12px'
                                                                        }
                                                                    }
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="landing-header__focus-underline"
                                                style={tagInput.visible ? { opacity: 1 } : null}
                                            />
                                        </div> : null
                                }
                                <div
                                    className={
                                        `landing-header__search-bar-input-container${
                                            homePage ? '--border-left' : ''
                                        }`
                                    }
                                    style={
                                        country_lang_url === 'fr' ? {
                                            width: '27%'
                                        } : null
                                    }
                                >
                                    <div
                                        className="landing-header__search-bar-input-label"
                                    >
                                        {lang.home.home_search_where}
                                    </div>
                                    <div className="landing-header__search-bar-geo-input-container">
                                        <div className="landing-header__search-bar-relative-container">
                                            <div className="landing-header__search-bar-block-fullwidth">
                                                <label
                                                    className="landing-header__visually-hidden"
                                                    htmlFor="location_string"
                                                >{lang.home.home_search_where}</label>
                                                <div className="landing-header__search-bar-input-container--borderless">
                                                    <input
                                                        id="location_string"
                                                        type="text"
                                                        autoComplete="off"
                                                        className="landing-header__search-bar-input"
                                                        name="location_string"
                                                        placeholder={lang.home.home_search_where}
                                                        value={locationInput.value}
                                                        onFocus={toggleFocus}
                                                        onBlur={toggleBlur}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            {(locationInputFocus && !hideGeoResults) ?
                                                <ul
                                                    id="geo-results"
                                                    className="landing-header__geolocation-results"
                                                >
                                                    {geoResults}
                                                </ul> : null
                                            }
                                        </div>
                                    </div>
                                    <div
                                        className="landing-header__focus-underline"
                                        style={locationInputFocus ? { opacity: 1 } : null}
                                    />
                                </div>
                                <div
                                    className="landing-header__search-bar-input-container--border-left-right"
                                    style={
                                        country_lang_url === 'fr' ? {
                                            width: '27%'
                                        } : null
                                    }
                                >
                                    <div className="landing-header__search-bar-input-label">{lang.home.home_search_when}</div>
                                    <div className="landing-header__search-bar-geo-input-container">
                                        <div className="landing-header__search-bar-relative-container">
                                            <div className="landing-header__search-bar-block-fullwidth">
                                                <label
                                                    className="landing-header__visually-hidden"
                                                    htmlFor="GeocompleteController-via-SearchBarLarge"
                                                >{lang.home.home_search_when}</label>
                                                <div className="landing-header__search-bar-input-container--borderless">
                                                    <input
                                                        id="date_search"
                                                        type="text"
                                                        autoComplete="off"
                                                        className="landing-header__search-bar-input date-input"
                                                        name="date"
                                                        placeholder={lang.home.home_search_when}
                                                        value={date}
                                                        onFocus={toggleFocus}
                                                        onBlur={toggleBlur}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="landing-header__focus-underline"
                                        style={dateInputFocus ? { opacity: 1 } : null}
                                    />
                                </div>
                                <div
                                    className="landing-header__search-bar-input-container"
                                    style={
                                        country_lang_url === 'fr' ? {
                                            width: '27%'
                                        } : null
                                    }
                                >
                                    <div
                                        className="landing-header__search-bar-input-label"
                                    >
                                        {lang.home.home_search_guests}
                                    </div>
                                    <div>
                                        <ClickWrapper
                                            lang={lang}
                                            guests={guests}
                                            handleClick={handleGuestOptionClick}
                                            toggleGuestPanel={toggleGuestPanel}
                                            showGuestPanel={showGuestPanel}
                                        />
                                    </div>
                                    <div
                                        className="landing-header__focus-underline"
                                        style={showGuestPanel ? { opacity: 1 } : null}
                                    />
                                </div>
                                <div
                                    className="landing-header__search-bar-input-container search-button"
                                >
                                    <button type="submit" className="landing-header__search-button">
                                        <span>{lang.common.common_search}</span>
                                    </button>
                                    <div
                                        className="landing-header__focus-underline"
                                        style={showGuestPanel ? { opacity: 1 } : null}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderSearchBar;
