
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import Logo from './Logo';
import FlyoutMenu from './FlyoutMenu';
import Nav from './Nav';
import MoveableDiv from './MoveableDiv';

import styles from './styles.js';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            flyoutOpen: false
        };
        this.toggleFlyout = this.toggleFlyout.bind(this);
    }

    toggleFlyout() {
        this.setState({ flyoutOpen: !this.state.flyoutOpen });
    }

    render() {
        const { toggleFlyout } = this;
        const { flyoutOpen } = this.state;
        const { IS_BROWSER, lang, user } = this.props;
        return (
            <div className={css(styles.headerController)}>
                <header role="banner" className={css(styles.containerRelative)}>
                    <div className={css(styles.contentFloating)}>
                        <div className={css(styles.containerTable)}>
                            <div className={css(styles.containerTableChildCellAlignMiddle)}>
                                <div>
                                    <Logo
                                        flyoutOpen={flyoutOpen}
                                        handleFlyoutMenu={toggleFlyout}
                                    />
                                    <FlyoutMenu
                                        flyoutOpen={flyoutOpen}
                                    />
                                </div>
                            </div>
                            <div className={css(styles.containerTableChildCellMiddleAlignMiddle)} />
                            {
                                IS_BROWSER ?
                                    <div className={css(styles.containerTableChildCellAlignMiddle)}>
                                        <Nav
                                            user={user}
                                        />
                                    </div> : null
                            }
                        </div>
                    </div>
                </header>
                <MoveableDiv
                    IS_BROWSER={IS_BROWSER}
                    lang={lang}
                />
            </div>
        );
    }
}

Header.propTypes = {
    IS_BROWSER: PropTypes.bool,
    lang: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);
