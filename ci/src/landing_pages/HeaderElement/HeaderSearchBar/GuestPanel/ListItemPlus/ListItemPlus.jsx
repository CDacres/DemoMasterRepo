
import React from 'react';
import { func, number, object } from 'prop-types';

export default function ListItemPlus({ i, lang, onClick }) {
    return (
        <li
            className="landing-header__guest-panel-dropdown-item"
            data-value={`${i}`}
            onClick={onClick}
        >
            <div className="landing-header__guest-panel-dropdown-item-text-container">
                <div
                    className="landing-header__guest-panel-dropdown-item-filters-text"
                >
                    {`${i}+ ${lang.common.common_people_lower}`}
                </div>
            </div>
        </li>
    );
}

ListItemPlus.propTypes = {
    i: number,
    lang: object,
    onClick: func
};
