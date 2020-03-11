
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import shortid from 'shortid';

import {
    display,
    position
} from '../../commonStyles.js';
import styles from './styles.js';

import actions from '../../../actions';

const Nav = ({ navigation, toggleNavDropdown, user }) => {
    const { dropdown, linkGroups } = navigation;
    const dropdownLinkGroups = dropdown.linkGroups.map(linkGroupId => {
        const lgs = linkGroups.filter(linkGroup =>
            linkGroup.id === linkGroupId
        );
        for (const key in lgs) {
            return lgs[key];
        }
    });
    return (
        <div className={css(styles.navContainer)}>
            <nav>
                <ul className={css(styles.navList)}>
                    <li className={css(display.tableCell)} />
                    <li className={css(display.tableCell)}>
                        <div>
                            <div className={css(position.relative)}>
                                <a href="/dashboard/inbox" className={css(styles.navLink)}>
                                    <div
                                        className={css(
                                            styles.underlineWrapper,
                                            styles.underlineNone
                                        )}
                                    >
                                        <div className={css(display.inline, styles.underline)}>
                                            <span>Messages</span>
                                            <svg className={css(styles.notificationBadge)}>
                                                <circle cx="3" cy="3" r="3" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className={css(display.tableCell)}>
                        <div>
                            <div className={css(position.relative)}>
                                <button className={css(styles.navLink)} type="button">
                                    <div
                                        className={css(
                                            styles.underlineWrapper,
                                            styles.underlineNone
                                        )}
                                    >
                                        <div className={css(display.inline, styles.underline)}>
                                            <span>Help</span>
                                            <svg className={css(styles.notificationBadge)}>
                                                <circle cx="3" cy="3" r="3" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className={css(display.tableCell)}>
                        <div>
                            <div className={css(position.relative)}>
                                <a
                                    href="#"
                                    className={css(styles.navLink)}
                                    onClick={toggleNavDropdown}
                                >
                                    <div
                                        className={css(
                                            styles.underlineWrapper,
                                            styles.underlineNone
                                        )}
                                    >
                                        <div className={css(display.inline, styles.underline)}>
                                            <div className={css(styles.avatar)}>
                                                <img
                                                    alt={user.first_name}
                                                    height="28"
                                                    src={user.avatar}
                                                    width="28"
                                                    className="image_1pa4v1p"
                                                />
                                            </div>
                                            <svg className={css(styles.notificationBadge)}>
                                                <circle cx="3" cy="3" r="3" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                                {
                                    dropdown.isVisible ?
                                        <div className={css(styles.menu)}>
                                            <div className={css(styles.container)}>
                                                <div className={css(styles.content)}>
                                                    <ul role="tree" className={css(styles.list)}>
                                                        {dropdownLinkGroups.map(dropdownLinkGroup =>
                                                            dropdownLinkGroup.links.map(link => (
                                                                <li
                                                                    key={shortid.generate()}
                                                                    role="treeitem"
                                                                >
                                                                    <a
                                                                        href={link.url}
                                                                        title={link.title}
                                                                        className={css(styles.container_link)}
                                                                    >
                                                                        <div
                                                                            className={css(styles.content_baseline)}
                                                                        >
                                                                            <div
                                                                                className={css(styles.container_table)}
                                                                            >
                                                                                <div
                                                                                    className={css(styles.container_table_child)}
                                                                                >
                                                                                    <div
                                                                                        className={css(styles.text)}
                                                                                    >
                                                                                        <span>{link.title}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                            ))
                                                        )}
                                                    </ul>
                                                </div>
                                                <svg
                                                    className={css(styles.fang)}
                                                    style={{
                                                        right: '20px'
                                                    }}
                                                >
                                                    <path d="M0,10 20,10 10,0z" className={css(styles.fangShape)} />
                                                    <path d="M0,10 10,0 20,10" className={css(styles.fangStroke)} />
                                                </svg>
                                            </div>
                                        </div> : null
                                }
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

Nav.propTypes = {
    navigation: PropTypes.object.isRequired,
    toggleNavDropdown: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ navigation: state.navigation });

const mapDispatchToProps = dispatch => {
    return {
        toggleNavDropdown: () => dispatch(actions.toggleNavDropdown())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
