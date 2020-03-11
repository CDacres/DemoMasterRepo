
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import onClickOutside from 'react-onclickoutside';

import { input } from '../../../../../commonStyles.js';
import styles from '../styles.js';

class DateInput extends Component {
    constructor() {
        super();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside() {
        const { handleHideDateInput } = this.props;
        handleHideDateInput();
    }

    render() {
        const { dateInput, handleShowDateInput } = this.props;
        return (
            <div>
                <label className={css(styles.hiddenLabel)} htmlFor="autocomplete_SearchBarLarge">When</label>
                <div className={css(styles.container, styles.container_noMargins)}>
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
                                        fill: 'currentColor',
                                        height: '18px',
                                        width: '18px'
                                    }}
                                >
                                    <path
                                        d="M22 9.5V3h-4.75V1a.75.75 0 1 0-1.5 0v2H8.249l.001-2a.75.75 0 1 0-1.5 0l-.001 2H2v19.008a1 1 0 0 0 .992.992h18.016a1 1 0 0 0 .992-.992V9.5zm-18.5-5h3.248V5a.75.75 0 0 0 1.5 0v-.5h7.502V5a.75.75 0 0 0 1.5 0v-.5h3.25V8h-17V4.5zm0 17v-12h17v12h-17z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={css(styles.inputContainer)}>
                        <input
                            type="text"
                            autoComplete="off"
                            className={
                                dateInput.visible ?
                                    css(styles.input) :
                                    css(styles.input)
                            }
                            id="date_SearchBarLarge"
                            name="date"
                            placeholder="When"
                            value={dateInput.value}
                            onClick={handleShowDateInput}
                        />
                    </div>
                </div>
                <div
                    className={
                        dateInput.visible ?
                            css(input.focusUnderline, styles.showUnderline) :
                            css(input.focusUnderline)
                    }
                />
            </div>
        );
    }
}

DateInput.propTypes = {
    dateInput: PropTypes.object.isRequired,
    handleHideDateInput: PropTypes.func.isRequired,
    handleShowDateInput: PropTypes.func.isRequired
};

export default onClickOutside(DateInput);
