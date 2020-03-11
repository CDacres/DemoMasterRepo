
import React from 'react';
import { func, number, object } from 'prop-types';

export default function ListItem({ i, lang, onClick }) {
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
                    {`${i} ${i === 1 ? lang.common.common_person_lower : lang.common.common_people_lower}`}
                </div>
            </div>
        </li>
    );
}

ListItem.propTypes = {
    i: number,
    lang: object,
    onClick: func
};
