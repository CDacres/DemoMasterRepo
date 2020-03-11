
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { css } from 'aphrodite';

import styles from './styles.js';

class HorizontalTabs extends Component {
    static propTypes = {
        activeTabId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        clickAction: PropTypes.func,
        defaultTabId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        domain: PropTypes.string.isRequired,
        location: PropTypes.string,
        tabItems: PropTypes.array.isRequired
    }

    // componentDidMount() {
    //     this.verticalLinks = document.getElementsByClassName('vertical-link');
    //     for (let i = 0, len = this.verticalLinks.length; i < len; i++) {
    //         this.verticalLinks[i].addEventListener('click', this.interceptLink, false);
    //     }
    // }

    // componentWillUnmount() {
    //     for (let i = 0, len = this.verticalLinks.length; i < len; i++) {
    //         this.verticalLinks[i].removeEventListener('click', this.interceptLink, false);
    //     }
    // }

    // interceptLink = e => {
    //     e.preventDefault();
    //     this.props.clickAction(event.target.dataset.verticalId);
    // }

    render() {
        const { domain, location, tabItems } = this.props;
        return (
            <div className="horizontal-tabs">
                <div>
                    <div role="tablist" className="tabs">
                        <div className="container-relative">
                            <div className="container-wrapper--no-horizontal-scroll">
                                <div className="container-outer--no-horizontal-scroll">
                                    <div className="container-inner--horizontal-scroll">
                                        {tabItems.map((tabItem) => (
                                            <a
                                                key={shortid.generate()}
                                                className={`${css(styles.text)} vertical-link`}
                                                role="tab"
                                                title={
                                                    typeof tabItem.title !== 'undefined' ?
                                                        `${tabItem.title.charAt(0).toUpperCase()}${tabItem.title.slice(1)}` : ''
                                                }
                                                data-vertical-id={tabItem.id}
                                                data-vertical-slug={tabItem.slug}
                                                href={`/${domain}/s/${tabItem.slug}${location ? `/${location}` : ''}`}
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
            </div>
        );
    }
}

export default HorizontalTabs;
