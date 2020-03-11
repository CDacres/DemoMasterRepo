
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import shortid from 'shortid';

import FlyoutNavLink from './FlyoutNavLink';

import styles from './styles.js';

const FlyoutNav = ({ linkGroups }) => {
    return (
        <div tabIndex="-1" className={css(styles.childContainer)} role="menu">
            <ul className={css(styles.container)}>
                {linkGroups.map(linkGroup => (
                    linkGroup.links.map((link, index) => {
                        const element = (
                            <FlyoutNavLink
                                key={shortid.generate()}
                                icon={link.icon}
                                title={link.title}
                                url={link.url}
                            />
                        );
                        if (index === (linkGroup.links.length - 1)) {
                            return (
                                <div>
                                    {element}
                                    <li aria-hidden="true">
                                        <hr className={css(styles.divider)} />
                                    </li>
                                </div>
                            );
                        } else {
                            return element;
                        }
                    }))
                )}
            </ul>
        </div>
    );
};

FlyoutNav.propTypes = {
    linkGroups: PropTypes.array.isRequired
};

const mapStateToProps = ({ navigation }) => ({
    linkGroups: navigation.linkGroups
});

export default connect(mapStateToProps)(FlyoutNav);
