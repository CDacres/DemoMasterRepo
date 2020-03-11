
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import shortid from 'shortid';

import EventTypeInput from './EventTypeInput';
import LocationInput from './LocationInput';
import DateInput from './DateInput';
import GuestInput from '../GuestInput';

import styles from './styles.js';

import {
    container,
    display,
    input,
    position,
    type,
    width
} from '../../../../commonStyles.js';

import actions from '../../../../../actions';

import { getMatches, highlightPortion } from '../methods';

class SearchBarLarge extends Component {
    constructor() {
        super();
        this.state = {
            dateInput: {
                visible: false
            },
            guestInput: {
                visible: false
            },
            locationInput: {
                focus: false,
                focusedResultIndex: -1,
                results: [],
                value: '',
                visible: false
            },
            eventTypeInput: {
                focus: false,
                focusedResultIndex: -1,
                visible: false,
                results: [],
                value: ''
            }
        };
        this.displayLocationSuggestions = this.displayLocationSuggestions.bind(this);
        this.displayEventTypeSuggestions = this.displayEventTypeSuggestions.bind(this);
        this.escapeKeyBinding = this.escapeKeyBinding.bind(this);
        this.handleGuestOptionClick = this.handleGuestOptionClick.bind(this);
        this.handleHideDateInput = this.handleHideDateInput.bind(this);
        this.handleHideGuestPanel = this.handleHideGuestPanel.bind(this);
        this.handleHideLocationInput = this.handleHideLocationInput.bind(this);
        this.handleHideEventTypeInput = this.handleHideEventTypeInput.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.handleEventTypeClick = this.handleEventTypeClick.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
        this.handleShowDateInput = this.handleShowDateInput.bind(this);
        this.handleShowLocationInput = this.handleShowLocationInput.bind(this);
        this.handleShowEventTypeInput = this.handleShowEventTypeInput.bind(this);
        this.eventTypeKeyboardScroll = this.eventTypeKeyboardScroll.bind(this);
        this.locationKeyboardScroll = this.locationKeyboardScroll.bind(this);
        this.selectEventType = this.selectEventType.bind(this);
        this.selectLocation = this.selectLocation.bind(this);
        this.toggleGuestPanel = this.toggleGuestPanel.bind(this);
    }

    componentDidMount() {
        const language_code = 'en';
        this.autoComplete = new google.maps.places.AutocompleteService();
        this._datePicker = $('#date_SearchBarLarge');
        this._datePicker.datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $.datepicker.setDefaults($.datepicker.regional[language_code]);
    }

    displayLocationSuggestions(predictions, status) {
        const {
            handleLocationClick,
            handleResultMouseEnter,
            handleResultMouseLeave
        } = this;
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            console.log(status);
            return;
        }
        const results = predictions.map((prediction, index) => (
            <li
                key={shortid.generate()}
                aria-selected="false"
                className={`location-result ${css(styles.result, styles.resultTall)}`}
                id={`location-result_${index}`}
                role="option"
                tabIndex="-1"
                data-location={prediction.description}
                onClick={handleLocationClick}
                onMouseEnter={handleResultMouseEnter}
                onMouseLeave={handleResultMouseLeave}
            >
                <div className={css(styles.textContainer)}>
                    <div className={css(styles.text)}>{prediction.description}</div>
                </div>
            </li>
        ));
        this.setState((prevState) => ({
            locationInput: {
                ...prevState.locationInput,
                results
            }
        }));
    }

    displayEventTypeSuggestions(matches, value) {
        const {
            handleEventTypeClick,
            handleResultMouseEnter,
            handleResultMouseLeave
        } = this;
        let eventTypes = [];
        const { defaultEventTypes } = this.props;
        if (matches) {
            eventTypes = matches;
        } else {
            eventTypes = defaultEventTypes;
        }
        const results = eventTypes.map((eventType, index) => {
            let string = `<p>${eventType}</p>`;
            if (value && value.length >= 2) {
                string = highlightPortion(eventType, value);
            }
            return (
                <li
                    key={shortid.generate()}
                    aria-selected="false"
                    className={`event-type-result ${css(styles.result, styles.resultTall)}`}
                    id={`event-type-result_${index}`}
                    role="option"
                    tabIndex="-1"
                    data-event-type={eventType}
                    onClick={handleEventTypeClick}
                    onMouseEnter={handleResultMouseEnter}
                    onMouseLeave={handleResultMouseLeave}
                >
                    <div className={css(styles.textContainer)}>
                        <div
                            className={css(styles.text)}
                            dangerouslySetInnerHTML={{ __html: `${string}` }}
                        />
                    </div>
                </li>
            );
        });
        this.setState((prevState) => ({
            eventTypeInput: {
                ...prevState.eventTypeInput,
                results: results.splice(0, 5)
            }
        }));
    }

    escapeKeyBinding(e) {
        const { handleHideEventTypeInput, handleHideLocationInput } = this;
        if (e.keyCode === 27) {
            handleHideLocationInput();
            handleHideEventTypeInput();
        }
    }

    handleGuestOptionClick(e) {
        const { selectGuests } = this.props;
        selectGuests(e.target.dataset.value);
        this.setState((prevState) => ({
            guestInput: {
                ...prevState.guestInput,
                visible: !prevState.guestInput.visible
            }
        }));
    }

    handleHideDateInput() {
        const { dateInput } = this.state;
        const { selectDate } = this.props;
        setTimeout(() => {
            const date = this._datePicker.datepicker('getDate');
            selectDate($.datepicker.formatDate('dd-mm-yy', date));
            this.setState({
                dateInput: {
                    ...dateInput,
                    visible: false
                }
            });
            this._datePicker.datepicker('hide');
        }, 100);
    }

    handleHideGuestPanel() {
        this.setState((prevState) => ({
            guestInput: {
                ...prevState.guestInput,
                visible: false
            }
        }));
    }

    handleHideLocationInput() {
        const { escapeKeyBinding, locationKeyboardScroll } = this;
        window.removeEventListener('keyup', locationKeyboardScroll);
        window.removeEventListener('keyup', escapeKeyBinding);
        this.setState((prevState) => ({
            locationInput: {
                ...prevState.locationInput,
                visible: false
            }
        }));
    }

    handleHideEventTypeInput() {
        const { escapeKeyBinding, eventTypeKeyboardScroll } = this;
        window.removeEventListener('keyup', eventTypeKeyboardScroll);
        window.removeEventListener('keyup', escapeKeyBinding);
        this.setState((prevState) => ({
            eventTypeInput: {
                ...prevState.eventTypeInput,
                visible: false
            }
        }));
    }

    handleLocationChange(e) {
        const value = e.target.value;
        if (value !== '') {
            this.autoComplete.getPlacePredictions({
                input: value
            }, this.displayLocationSuggestions);
        }
        this.setState((prevState) => ({
            locationInput: {
                ...prevState.locationInput,
                value
            }
        }));
    }

    handleEventTypeChange(e) {
        const { displayEventTypeSuggestions } = this;
        const { eventTypes } = this.props;
        const value = e.target.value;
        if (value !== '') {
            const matches = getMatches(eventTypes, value);
            if (matches.length) {
                displayEventTypeSuggestions(matches, value);
            }
        }
        this.setState((prevState) => ({
            eventTypeInput: {
                ...prevState.eventTypeInput,
                value
            }
        }));
    }

    handleLocationClick(e) {
        const { selectLocation } = this;
        selectLocation(e.target.dataset.location);
    }

    handleEventTypeClick(e) {
        const { selectEventType } = this;
        selectEventType(e.target.dataset.eventType);
    }

    handleShowDateInput() {
        this._datePicker.datepicker('show');
        this.setState((prevState) => ({
            dateInput: {
                ...prevState.dateInput,
                visible: true
            }
        }));
    }

    handleShowLocationInput() {
        const { escapeKeyBinding, locationKeyboardScroll } = this;
        window.addEventListener('keyup', locationKeyboardScroll);
        window.addEventListener('keyup', escapeKeyBinding);
        this.setState((prevState) => ({
            locationInput: {
                ...prevState.locationInput,
                visible: true
            }
        }));
    }

    handleShowEventTypeInput() {
        const {
            displayEventTypeSuggestions,
            escapeKeyBinding,
            eventTypeKeyboardScroll
        } = this;
        window.addEventListener('keyup', eventTypeKeyboardScroll);
        window.addEventListener('keyup', escapeKeyBinding);
        this.setState((prevState) => ({
            eventTypeInput: {
                ...prevState.eventTypeInput,
                visible: true
            }
        }));
        displayEventTypeSuggestions();
    }

    handleResultMouseEnter(e) {
        e.target.style.backgroundColor = '#fafafa';
    }

    handleResultMouseLeave(e) {
        e.target.style.backgroundColor = '#fff';
    }

    eventTypeKeyboardScroll(e) {
        const { selectEventType } = this;
        const { eventTypeInput } = this.state;
        let index = eventTypeInput.focusedResultIndex;
        if (eventTypeInput.results.length) {
            if (e.keyCode === 40) {
                index += 1;
                if (index < 5) {
                    const elements = document.getElementsByClassName('event-type-result');
                    for (let i = 0; i < elements.length; i += 1) {
                        elements[i].style.backgroundColor = 'transparent';
                    }
                    const element = document.getElementById(`event-type-result_${index}`);
                    element.style.backgroundColor = '#fafafa';
                    this.setState((prevState) => ({
                        eventTypeInput: {
                            ...prevState.eventTypeInput,
                            focusedResultIndex: index
                        }
                    }));
                }
            } else if (e.keyCode === 38) {
                index -= 1;
                if (index > -1) {
                    const elements = document.getElementsByClassName('event-type-result');
                    for (let i = 0; i < elements.length; i += 1) {
                        elements[i].style.backgroundColor = 'transparent';
                    }
                    const element = document.getElementById(`event-type-result_${index}`);
                    element.style.backgroundColor = '#fafafa';
                    this.setState((prevState) => ({
                        eventTypeInput: {
                            ...prevState.eventTypeInput,
                            focusedResultIndex: index
                        }
                    }));
                }
            } else if (e.keyCode === 13 && (index > -1 && index < 5)) {
                selectEventType(
                    document.querySelector(`#event-type-result_${
                        eventTypeInput.focusedResultIndex
                    }`).dataset.eventType
                );
            }
        }
    }

    locationKeyboardScroll(e) {
        const { selectLocation } = this;
        const { locationInput } = this.state;
        let index = locationInput.focusedResultIndex;
        if (locationInput.results.length) {
            if (e.keyCode === 40) {
                index += 1;
                if (index < 5) {
                    const elements = document.getElementsByClassName('location-result');
                    for (let i = 0; i < elements.length; i += 1) {
                        elements[i].style.backgroundColor = 'transparent';
                    }
                    const element = document.getElementById(`location-result_${index}`);
                    element.style.backgroundColor = '#fafafa';
                    this.setState((prevState) => ({
                        locationInput: {
                            ...prevState.locationInput,
                            focusedResultIndex: index
                        }
                    }));
                }
            } else if (e.keyCode === 38) {
                index -= 1;
                if (index > -1) {
                    const elements = document.getElementsByClassName('location-result');
                    for (let i = 0; i < elements.length; i += 1) {
                        elements[i].style.backgroundColor = 'transparent';
                    }
                    const element = document.getElementById(`location-result_${index}`);
                    element.style.backgroundColor = '#fafafa';
                    this.setState((prevState) => ({
                        locationInput: {
                            ...prevState.locationInput,
                            focusedResultIndex: index
                        }
                    }));
                }
            } else if (e.keyCode === 13 && (index > -1 && index < 5)) {
                selectLocation(
                    document.querySelector(`#location-result_${
                        locationInput.focusedResultIndex
                    }`).dataset.location
                );
            }
        }
    }

    selectLocation(location) {
        const { handleHideLocationInput } = this;
        const { selectLocation } = this.props;
        this.setState((prevState) => ({
            locationInput: {
                ...prevState.locationInput,
                focusedResultIndex: -1,
                value: location,
                visible: false
            }
        }));
        selectLocation(location);
        handleHideLocationInput();
    }

    selectEventType(eventType) {
        const { handleHideEventTypeInput } = this;
        const { selectEventType } = this.props;
        this.setState((prevState) => ({
            eventTypeInput: {
                ...prevState.eventTypeInput,
                focusedResultIndex: -1,
                value: eventType,
                visible: false
            }
        }));
        selectEventType(eventType);
        handleHideEventTypeInput();
    }

    toggleGuestPanel() {
        this.setState((prevState) => ({
            guestInput: {
                ...prevState.guestInput,
                visible: !prevState.guestInput.visible
            }
        }));
    }

    render() {
        const {
            handleHideGuestPanel,
            handleHideDateInput,
            handleGuestOptionClick,
            handleLocationChange,
            handleEventTypeChange,
            toggleGuestPanel,
            handleHideLocationInput,
            handleHideEventTypeInput,
            handleShowLocationInput,
            handleShowDateInput,
            handleShowEventTypeInput
        } = this;
        const {
            dateInput,
            guestInput,
            locationInput,
            eventTypeInput
        } = this.state;
        const {
            date,
            guests,
            lang
        } = this.props;
        return (
            <div className={css(display.block)}>
                <div
                    className={css(
                        type.base,
                        container.base,
                        container.table,
                        width.full,
                        position.relative
                    )}
                >
                    <div
                        className={
                            eventTypeInput.visible ?
                                css(container.tableCell, styles.inputExpandedFull) :
                                css(container.tableCell, width.oneThird)
                        }
                    >
                        <EventTypeInput
                            disableOnClickOutside={!eventTypeInput.visible}
                            handleEventTypeChange={handleEventTypeChange}
                            handleHideEventTypeInput={handleHideEventTypeInput}
                            handleShowEventTypeInput={handleShowEventTypeInput}
                            eventTypeInput={eventTypeInput}
                        />
                    </div>
                    <div
                        className={
                            locationInput.visible ?
                                css(
                                    container.tableCell,
                                    container.borderLeft,
                                    styles.inputExpandedFull
                                ) :
                                css(
                                    container.tableCell,
                                    container.borderLeft,
                                    width.oneThird
                                )
                        }
                    >
                        <LocationInput
                            disableOnClickOutside={!locationInput.visible}
                            handleLocationChange={handleLocationChange}
                            handleHideLocationInput={handleHideLocationInput}
                            handleShowLocationInput={handleShowLocationInput}
                            locationInput={locationInput}
                        />
                    </div>
                    <div
                        className={
                            dateInput.visible ?
                                css(
                                    container.tableCell,
                                    container.borderLeft,
                                    container.borderRight,
                                    styles.inputExpanded
                                ) :
                                css(
                                    container.tableCell,
                                    container.borderLeft,
                                    container.borderRight,
                                    width.oneThird
                                )
                        }
                    >
                        <DateInput
                            date={date}
                            dateInput={dateInput}
                            disableOnClickOutside={!dateInput.visible}
                            handleHideDateInput={handleHideDateInput}
                            handleShowDateInput={handleShowDateInput}
                        />
                    </div>
                    <div
                        className={css(
                            display.tableCell,
                            position.relative,
                            width.oneThird
                        )}
                    >
                        <GuestInput
                            disableOnClickOutside={!guestInput.visible}
                            handleHideGuestPanel={handleHideGuestPanel}
                            guests={guests}
                            handleClick={handleGuestOptionClick}
                            lang={lang}
                            toggleGuestPanel={toggleGuestPanel}
                            guestPanelOpen={guestInput.visible}
                        />
                        <div
                            className={
                                guestInput.visible ?
                                    css(input.focusUnderline, styles.showUnderline) :
                                    css(input.focusUnderline)
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

SearchBarLarge.propTypes = {
    date: PropTypes.string.isRequired,
    defaultEventTypes: PropTypes.array.isRequired,
    eventTypes: PropTypes.array.isRequired,
    guests: PropTypes.number.isRequired,
    lang: PropTypes.object.isRequired,
    selectDate: PropTypes.func.isRequired,
    selectEventType: PropTypes.func.isRequired,
    selectGuests: PropTypes.func.isRequired,
    selectLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    date: state.searchParams.date,
    defaultEventTypes: state.eventTypes.defaults,
    eventTypes: state.eventTypes.data,
    guests: state.searchParams.guests
});

const mapDispatchToProps = dispatch => {
    return {
        selectDate: value => {
            dispatch(actions.selectDate(value));
        },
        selectEventType: value => {
            dispatch(actions.selectEventType(value));
        },
        selectGuests: value => {
            dispatch(actions.selectGuests(value));
        },
        selectLocation: value => {
            dispatch(actions.selectLocation(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarLarge);
