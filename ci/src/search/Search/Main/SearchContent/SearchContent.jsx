
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { CSSTransitionGroup } from 'react-transition-group';

import TopMessage from './TopMessage';
import SearchResults from './SearchResults';
import FullScreenPanel from '../FullScreenPanel';

class SearchContent extends Component {
    constructor() {
        super();
        this.state = {
            fullScreenPanel: {
                isVisible: false
            }
        };
        this.hideFullScreenPanel = this.hideFullScreenPanel.bind(this);
        this.showFullScreenPanel = this.showFullScreenPanel.bind(this);
    }

    hideFullScreenPanel() {
        const { fullScreenPanel } = this.state;
        this.setState({
            fullScreenPanel: {
                ...fullScreenPanel,
                isVisible: false
            }
        });
    }

    showFullScreenPanel() {
        const { fullScreenPanel } = this.state;
        this.setState({
            fullScreenPanel: {
                ...fullScreenPanel,
                isVisible: true
            }
        });
    }

    render() {
        const { hideFullScreenPanel } = this;
        const { fullScreenPanel } = this.state;
        const { domContentLoading, user } = this.props;
        return (
            <div>
                <TopMessage />
                <SearchResults
                    domContentLoading={domContentLoading}
                    user={user}
                />
                {
                    fullScreenPanel.isVisible ?
                        <FullScreenPanel
                            handleClose={hideFullScreenPanel}
                            // headingText={`Active Filters (${getActiveFilters})`}
                            withHeader
                            withFooter
                        >

                        </FullScreenPanel> : null
                }
            </div>
        );
    }
};

SearchContent.propTypes = {
    domContentLoading: PropTypes.bool.isRequired,
    user: PropTypes.object
};

export default SearchContent;
