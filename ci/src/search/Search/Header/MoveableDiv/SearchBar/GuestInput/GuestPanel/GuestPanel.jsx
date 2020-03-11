
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import shortid from 'shortid';

import styles from './styles.js';

const GuestPanel = ({ lang, handleClick }) => {
    const options = [];
    options.push(
        <li
            key={shortid.generate()}
            className={css(styles.dropdownItem)}
            data-value=""
            onClick={handleClick}
        >
            <div className={css(styles.textContainer)}>
                <div
                    className={css(styles.filtersText)}
                >
                    {`${lang.home.home_search_any}`}
                </div>
            </div>
        </li>
    );
    for (let i = 1; i <= 150; i++) {
        if (i === 1) {
            options.push(
                <li
                    key={shortid.generate()}
                    className={css(styles.dropdownItem)}
                    data-value={`${i}`}
                    onClick={handleClick}
                >
                    <div className={css(styles.textContainer)}>
                        <div
                            className={css(styles.filtersText)}
                        >
                            {`${i} ${lang.common.common_person_lower}`}
                        </div>
                    </div>
                </li>
            );
        } else if (i < 20) {
            options.push(
                <li
                    key={shortid.generate()}
                    className={css(styles.dropdownItem)}
                    data-value={`${i}`}
                    onClick={handleClick}
                >
                    <div className={css(styles.textContainer)}>
                        <div
                            className={css(styles.filtersText)}
                        >
                            {`${i} ${lang.common.common_people_lower}`}
                        </div>
                    </div>
                </li>
            );
        } else if (i % 10 === 0 && i <= 150) {
            options.push(
                <li
                    key={shortid.generate()}
                    className={css(styles.dropdownItem)}
                    data-value={`${i}`}
                    onClick={handleClick}
                >
                    <div className={css(styles.textContainer)}>
                        <div
                            className={css(styles.filtersText)}
                        >
                            {`${i}+ ${lang.common.common_people_lower}`}
                        </div>
                    </div>
                </li>
            );
        }
    }
    options.push(
        <li
            key={shortid.generate()}
            className={css(styles.dropdownItem)}
            data-value="200"
            onClick={handleClick}
        >
            <div className={css(styles.textContainer)}>
                <div
                    className={css(styles.filtersText)}
                >
                    {`200+ ${lang.common.common_people_lower}`}
                </div>
            </div>
        </li>
    );
    return (
        <div className={css(styles.panel)}>
            <div
                id="guest_panel"
                role="menu"
                className={css(styles.dropdown)}
            >
                <ul
                    className={css(styles.panelList)}
                    role="listbox"
                >
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
