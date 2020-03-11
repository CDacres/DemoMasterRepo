
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import styles from './styles.js';

import CardSlider from '../../CardSlider';
import Pagination from './Pagination';

import { roomCards } from '../../data.js';

import actions from '../../../../actions';

const SearchResults = ({
    domContentLoading,
    paginateNext,
    paginatePrev,
    searchResults,
    user
}) => {
    return (
        <div className="search-results" aria-live="polite">
            <div />
            <div className={css(styles.container)}>
                <div className={css(styles.innerContainer)}>
                    <div className={css(styles.sectionContainer)}>
                        <div className={css(styles.sectionInnerContainer)}>
                            <CardSlider
                                cards={searchResults.rooms}
                                cardType="normal"
                                domContentLoading={domContentLoading}
                                isListing
                                containerClass="responsiveColumn_search"
                                sliderDisabled
                                user={user}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                paginateNext={paginateNext}
                paginatePrev={paginatePrev}
                pageSize={searchResults.pageSize}
                params={searchResults.params}
                roomCount={searchResults.roomCount}
            />
        </div>
    );
};

SearchResults.propTypes = {
    domContentLoading: PropTypes.bool.isRequired,
    paginateNext: PropTypes.func.isRequired,
    paginatePrev: PropTypes.func.isRequired,
    searchResults: PropTypes.object.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    searchResults: state.searchResults
});

const mapDispatchToProps = dispatch => {
    return {
        paginateNext: () => dispatch(actions.paginateNext()),
        paginatePrev: () => dispatch(actions.paginatePrev())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
