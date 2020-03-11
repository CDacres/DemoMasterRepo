
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import onClickOutside from 'react-onclickoutside';

import {
    display,
    input,
    position,
    width
} from '../../../../../commonStyles.js';
import styles from '../styles.js';

class LocationInput extends Component {
    constructor() {
        super();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside() {
        const { handleHideLocationInput } = this.props;
        handleHideLocationInput();
    }

    render() {
        const {
            handleLocationChange,
            handleShowLocationInput,
            locationInput
        } = this.props;
        return (
            <div id="location_input">
                <div className={css(position.relative)}>
                    <div className={css(display.block, width.fullWidth)}>
                        <label
                            className={css(styles.hiddenLabel)}
                            htmlFor="autocomplete_SearchBarLarge"
                        >Where</label>
                        <div
                            className={
                                css(styles.container, styles.container_noMargins)
                            }
                        >
                            <div className={css(styles.prefixContainer)}>
                                <div className={css(styles.prefix)}>
                                    <div>
                                        <svg
                                            viewBox="0 0 24 24"
                                            role="presentation"
                                            aria-hidden="true"
                                            focusable="false"
                                            style={{
                                                display: 'block',
                                                fill: 'rgb(118, 118, 118)',
                                                height: '18px',
                                                width: '18px'
                                            }}
                                        >
                                            <path d="M10.4 18.2c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2 8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6M23 22l-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7 2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7v.1l5 5c.3.3.8.3 1.1 0 .3-.3.4-.8.1-1.1" fillRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={css(styles.inputContainer)}>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className={css(styles.input)}
                                    id="autocomplete_SearchBarLarge"
                                    name="location"
                                    placeholder="Where"
                                    value={locationInput.value}
                                    onChange={handleLocationChange}
                                    onClick={handleShowLocationInput}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        locationInput.visible ?
                            css(input.focusUnderline, styles.showUnderline) :
                            css(input.focusUnderline)
                    }
                />
                {
                    // locationInput.visible && locationInput.results.length ?
                    locationInput.visible ?
                        <ul
                            className={css(styles.results)}
                            id=""
                            role="listbox"
                            style={{
                                width: '572px',
                                left: '-1px'
                            }}
                        >
                            {locationInput.results}
                        </ul> : null
                }
            </div>
        );
    }
}

LocationInput.propTypes = {
    handleHideLocationInput: PropTypes.func.isRequired,
    handleLocationChange: PropTypes.func.isRequired,
    handleShowLocationInput: PropTypes.func.isRequired,
    locationInput: PropTypes.object.isRequired
};

export default onClickOutside(LocationInput);
