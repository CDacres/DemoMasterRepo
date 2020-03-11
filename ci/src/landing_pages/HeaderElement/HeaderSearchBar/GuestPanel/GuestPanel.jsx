
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import ListItem from './ListItem';
import ListItemPlus from './ListItemPlus';

const GuestPanel = ({ lang, handleClick }) => {
    const options = [];
    options.push(
        <li
            key={shortid.generate()}
            className="landing-header__guest-panel-dropdown-item"
            data-value=""
            onClick={handleClick}
        >
            <div className="landing-header__guest-panel-dropdown-item-text-container">
                <div
                    className="landing-header__guest-panel-dropdown-item-filters-text"
                >
                    {`${lang.home.home_search_any}`}
                </div>
            </div>
        </li>
    );
    for (let i = 1; i <= 1000; i++) {
        if (i === 1 || i < 100) {
            options.push(
                <ListItem
                    key={shortid.generate()}
                    i={i}
                    lang={lang}
                    onClick={handleClick}
                />
            );
        } else if (i % 10 === 0 && i <= 250) {
            options.push(
                <ListItemPlus
                    key={shortid.generate()}
                    i={i}
                    lang={lang}
                    onClick={handleClick}
                />
            );
        } else if (i % 100 === 0 && i < 1000) {
            options.push(
                <ListItemPlus
                    key={shortid.generate()}
                    i={i}
                    lang={lang}
                    onClick={handleClick}
                />
            );
        }
    }
    options.push(
        <ListItemPlus
            key={shortid.generate()}
            i={1000}
            lang={lang}
            onClick={handleClick}
        />
    );
    return (
        <div className="landing-header__guest-panel">
            <div
                id="guest_panel"
                role="menu"
                className="landing-header__guest-panel-dropdown"
            >
                <ul role="listbox">
                    {options}
                </ul>
            </div>
        </div>
    );
};

GuestPanel.propTypes = {
    handleClick: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
};

export default GuestPanel;
