
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import onClickOutside from 'react-onclickoutside';

import GuestPanel from './GuestPanel';

import {
    display,
    input,
    type,
    width
} from '../../../../commonStyles.js';

class GuestInput extends Component {
    constructor() {
        super();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside() {
        const { toggleGuestPanel } = this.props;
        toggleGuestPanel();
    }

    render() {
        const { guestPanelOpen, guests, handleClick, lang, toggleGuestPanel } = this.props;
        let guestVal = `${lang.home.home_search_any}`;
        if (guests !== '' && Number(guests) === 1) {
            guestVal = `${guests} ${lang.common.common_person_lower}`;
        } else if (guests !== '' && Number(guests) > 1) {
            guestVal = `${guests} ${lang.common.common_people_lower}`;
        }
        return (
            <div>
                <button
                    id="show_guest_panel"
                    type="button"
                    className={css(input.button, width.full)}
                    onClick={toggleGuestPanel}
                >
                    <span className={css(input.icon)}>
                        <span className={css(display.inline)}>
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
                                    d="M3.31 11.565c-.657.503-1.101.992-1.47 1.664-1.141 2.08-1.464 6.818-.199 8.523 1.302 1.755 2.688 2.154 6.542 2.154 2.814 0 4.703-1.003 5.166-3.427.16-.839.139-1.547-.013-2.588l-.055-.367c-.122-.797-.163-1.179-.16-1.662.01-1.547.733-2.278 2.623-3.239.555-.283.903-.854.901-1.476-.001-.468-.2-.842-.538-1.209a3.055 3.055 0 0 1-.48-.69c-.315-.618-.397-1.19-.388-1.977v-.123c0-1.648.812-2.646 2.161-2.646 1.35 0 2.16.998 2.16 2.646 0 1.037-.233 1.974-.987 2.79-.34.368-.538.74-.54 1.209a1.65 1.65 0 0 0 .904 1.476c1.869.952 2.601 1.693 2.634 3.25.009.405.022.767.049 1.366.109 2.45.06 3.222-.338 3.904-.474.809-1.603 1.24-3.89 1.263-1.194.012-1.64-.018-2.362-.184a.75.75 0 1 0-.335 1.462c.86.198 1.41.235 2.713.222 2.758-.028 4.371-.643 5.168-2.006.611-1.043.666-1.932.543-4.727-.027-.589-.04-.941-.048-1.331-.048-2.273-1.14-3.377-3.454-4.556a.15.15 0 0 1-.083-.135c0-.016.032-.077.141-.196.61-.66.996-1.43 1.204-2.265.14-.558.182-1.028.182-1.542 0-2.416-1.407-4.146-3.661-4.146s-3.66 1.73-3.66 4.146l-.001.108c-.01 1.01.1 1.788.55 2.673.188.368.425.712.716 1.027.108.117.14.178.14.196a.15.15 0 0 1-.082.134c-2.343 1.192-3.429 2.289-3.442 4.567-.003.585.044 1.026.177 1.897l.054.357c.13.89.146 1.448.023 2.09-.298 1.564-1.513 2.21-3.692 2.21-3.422 0-4.397-.282-5.337-1.549-.86-1.159-.578-5.29.309-6.907.26-.475.566-.811 1.067-1.195.291-.223 1.9-1.297 2.423-1.673.446-.321.71-.839.709-1.388l-.001-.15a1.755 1.755 0 0 0-.649-1.34C6.01 7.628 5.537 6.17 5.537 4.721c0-1.928 1.107-3.13 2.646-3.13s2.646 1.202 2.646 3.13c0 1.465-.458 2.913-1.144 3.481-.415.344-.65.836-.65 1.404a1.698 1.698 0 0 0 .922 1.519c.408.208.57.29.791.407a.75.75 0 1 0 .7-1.327c-.23-.12-.396-.206-.808-.416a.198.198 0 0 1-.106-.177c0-.123.034-.193.108-.254 1.1-.911 1.687-2.77 1.687-4.637 0-2.73-1.75-4.63-4.146-4.63s-4.146 1.9-4.146 4.63c0 1.85.606 3.724 1.71 4.637.07.059.106.13.106.193v.15a.204.204 0 0 1-.084.163c-.487.35-2.12 1.441-2.459 1.7z"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </span>
                    </span>
                    <span className={css(type.copy)}>
                        <span>
                            <span>{guestVal}</span>
                        </span>
                    </span>
                </button>
                {guestPanelOpen ?
                    <GuestPanel
                        lang={lang}
                        handleClick={handleClick}
                    /> : null
                }
            </div>
        );
    }
}

GuestInput.propTypes = {
    guestPanelOpen: PropTypes.bool,
    guests: PropTypes.number.isRequired,
    handleClick: PropTypes.func,
    lang: PropTypes.object.isRequired,
    toggleGuestPanel: PropTypes.func
};

export default onClickOutside(GuestInput);
