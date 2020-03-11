
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import {
    align,
    border,
    display,
    whiteSpace,
    width
} from '../../../../../commonStyles.js';
import styles from './styles.js';

const Checkbox = ({ filter, filterIcon, filterIndex, filterGroupIndex, handleCheckboxChange }) => {
    return (
        <div className={css(display.table, width.full)}>
            <div className={css(display.tableCell, width.full, align.verticalAlignMiddle)}>
                <div style={{ marginRight: '8px' }}>
                    <label
                        className={css(styles.container, border.none, display.table)}
                        htmlFor={`checkbox-filter_${filterIndex}-${filterGroupIndex}`}
                    >
                        <div
                            className={css(
                                display.tableCell,
                                align.verticalAlignTop,
                                whiteSpace.normal
                            )}
                        >
                            <span className={css(styles.container)}>
                                <input
                                    type="checkbox"
                                    id={`checkbox-filter_${filterIndex}-${filterGroupIndex}`}
                                    checked={filter.data.value}
                                    className={css(styles.checkboxInput)}
                                    data-filter-index={filterIndex}
                                    data-input-type={filter.inputType}
                                    name={`filter_${filterIndex}`}
                                    onChange={handleCheckboxChange}
                                />
                                <span
                                    data-fake-checkbox="true"
                                    className={
                                        filter.data.value ?
                                            css(styles.fakeCheckboxChecked) :
                                            css(styles.fakeCheckbox)
                                    }
                                >
                                    {
                                        filter.data.value ?
                                            <span className={css(styles.fakeCheckboxCheckmark)}>
                                                <svg
                                                    className={css(styles.fakeCheckboxCheckmarkSvg)}
                                                    viewBox="0 0 52 52"
                                                    fill="currentColor"
                                                    fillOpacity="0"
                                                    stroke="#ffffff"
                                                    strokeWidth="3"
                                                    aria-hidden="true"
                                                    role="presentation"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M19.1 25.2l4.7 6.2 12.1-11.2" />
                                                </svg>
                                            </span> : null
                                    }
                                </span>
                            </span>
                        </div>
                        <div
                            className={css(
                                display.tableCell,
                                align.verticalAlignTop,
                                whiteSpace.normal
                            )}
                        >
                            <span className={css(styles.title)}
                            >
                                <span>{filter.title}</span>
                            </span>
                            {
                                filter.subtitle ?
                                    <span
                                        className={css(
                                            styles.subtitle
                                        )}
                                    >{filter.subtitle}</span> : null
                            }
                        </div>
                    </label>
                </div>
            </div>
            {
                filter.icon ?
                    <div className={css(display.tableCell, align.verticalAlignTop)}>
                        <svg
                            viewBox="0 0 32 32"
                            role="presentation"
                            aria-hidden="true"
                            focusable="false"
                            style={{
                                display: 'block',
                                height: '28px',
                                width: '28px'
                            }}
                        >
                            <path
                                d="M22 10.506C22 9.675 22.673 9 23.5 9s1.5.675 1.5 1.506V15h-3v-4.494zM21.75 16h3.5a.75.75 0 0 0 .75-.75v-4.744A2.505 2.505 0 0 0 23.5 8a2.505 2.505 0 0 0-2.5 2.506v4.745a.76.76 0 0 0 .75.749zM17 26h-3v-4.494c0-.83.673-1.506 1.5-1.506s1.5.676 1.5 1.506V26zm-1.5-7a2.506 2.506 0 0 0-2.5 2.506v4.745a.76.76 0 0 0 .75.749h3.5a.75.75 0 0 0 .75-.75v-4.744A2.506 2.506 0 0 0 15.5 19zm1.5-4h-3v-4.494C14 9.675 14.673 9 15.5 9s1.5.675 1.5 1.506V15zm-1.5-7a2.506 2.506 0 0 0-2.5 2.506v4.745a.76.76 0 0 0 .75.749h3.5a.75.75 0 0 0 .75-.75v-4.744A2.506 2.506 0 0 0 15.5 8zM29 31h-3v-9.324C26 20.2 24.879 19 23.5 19S21 20.2 21 21.676V31H10V6.602l9.5-5.446L29 6.602V31zM1.615 26L3.5 16.952 5.385 26h-3.77zM31.5 31H30V6.023L26 3.73V.5a.5.5 0 0 0-1 0v2.657L19.5.004 9 6.023V31H4v-4h2a.5.5 0 0 0 .489-.601l-2.5-12.001a.499.499 0 0 0-.978 0l-2.5 12A.5.5 0 0 0 1 27h2v4H.5a.5.5 0 0 0 0 1H22V21.676c0-.924.673-1.676 1.5-1.676s1.5.752 1.5 1.676V32h6.5a.5.5 0 1 0 0-1z"
                            />
                        </svg>
                    </div> : null
            }
        </div>
    );
};

Checkbox.propTypes = {
    filter: PropTypes.object.isRequired,
    // filterIcon: PropTypes.node,
    filterGroupIndex: PropTypes.number.isRequired,
    filterIndex: PropTypes.number.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired
};

export default Checkbox;
