
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import shortid from 'shortid';

import styles from './styles.js';

const HorizontalTabs = ({ activeVerticalIndex, clickAction, tabItems }) => {
    return (
        <div>
            <div role="tablist" className={css(styles.tabs)}>
                <div className={css(styles.containerRelative)}>
                    <div className={css(styles.noHorizontalScroll)}>
                        <div className={css(styles.noHorizontalScroll)}>
                            <div className={css(styles.horizontalScroll)}>
                                {tabItems.map((tabItem, index) => (
                                    <a
                                        key={shortid.generate()}
                                        className={
                                            activeVerticalIndex === index ?
                                                css(styles.text, styles.textActive) :
                                                css(styles.text)
                                        }
                                        role="tab"
                                        title={
                                            typeof tabItem.title !== 'undefined' ?
                                                tabItem.title : ''
                                        }
                                        data-vertical-index={index}
                                        onClick={clickAction}
                                    >
                                        {tabItem.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

HorizontalTabs.propTypes = {
    activeVerticalIndex: PropTypes.number,
    clickAction: PropTypes.func,
    tabItems: PropTypes.array.isRequired
};

export default HorizontalTabs;
