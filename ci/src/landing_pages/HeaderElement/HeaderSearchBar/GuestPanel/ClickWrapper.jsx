
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import GuestPanel from '../GuestPanel';

class ClickWrapper extends Component {
    constructor() {
        super();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside() {
        const { showGuestPanel, toggleGuestPanel } = this.props;
        if (showGuestPanel) {
            toggleGuestPanel();
        }
    }

    render() {
        const { guests, handleClick, lang, toggleGuestPanel, showGuestPanel } = this.props;
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
                    className="landing-header__dropdown-button"
                    onClick={toggleGuestPanel}
                >
                    <span className="landing-header__dropdown-icon" />
                    <span className="landing-header__dropdown-placeholder">
                        <span>
                            <span>{guestVal}</span>
                        </span>
                    </span>
                    <span className="landing-header__dropdown-chevron">
                        <div
                            className="landing-header__dropdown-chevron-wrapper"
                            style={
                                showGuestPanel ?
                                    { transform: 'rotate(180deg)' } :
                                    null
                            }
                        >
                            <svg
                                viewBox="0 0 18 18"
                                role="presentation"
                                aria-hidden="true"
                                focusable="false"
                                style={{
                                    display: 'block',
                                    fill: 'currentcolor',
                                    height: '12px',
                                    width: '12px'
                                }}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"
                                />
                            </svg>
                        </div>
                    </span>
                </button>
                {showGuestPanel &&
                    <GuestPanel
                        lang={lang}
                        handleClick={handleClick}
                    />
                }
            </div>
        );
    }
}

ClickWrapper.propTypes = {
    guests: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    lang: PropTypes.object.isRequired,
    showGuestPanel: PropTypes.bool,
    toggleGuestPanel: PropTypes.func
};

export default onClickOutside(ClickWrapper);
