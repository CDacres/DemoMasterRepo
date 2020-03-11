
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import styles from './styles.js';

import actions from '../../../actions';

import SearchBar from './SearchBar';
import HorizontalTabs from './HorizontalTabs';

const MoveableDiv = ({ activeVerticalIndex, changeVertical, IS_BROWSER, lang, verticals }) => {
    const tabItemsArray = verticals.map(vertical => ({
        id: vertical.id,
        title: vertical.title
    }));
    return (
        <div
            className={
                IS_BROWSER ?
                    css(styles.moveableDivWithTabs) :
                    css(styles.moveableDivWithTabs, styles.moveableDiv_hidden)
            }
        >
            <div className={css(styles.searchBarWrapper)}>
                <SearchBar
                    lang={lang}
                />
            </div>
            {
                IS_BROWSER ?
                    <div className={css(styles.horizontalNavWrapper)}>
                        <HorizontalTabs
                            activeVerticalIndex={activeVerticalIndex}
                            clickAction={changeVertical}
                            tabItems={tabItemsArray}
                        />
                    </div> : null
            }
        </div>
    );
};

MoveableDiv.propTypes = {
    IS_BROWSER: PropTypes.bool,
    activeVerticalIndex: PropTypes.number.isRequired,
    changeVertical: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    verticals: PropTypes.array.isRequired
};

const mapStateToProps = ({
    activeVerticalIndex,
    verticals
}) => ({
    activeVerticalIndex,
    verticals
});

const mapDispatchToProps = dispatch => {
    return {
        changeVertical: (event) =>
            dispatch(actions.changeVertical(event.target.dataset.verticalIndex))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveableDiv);
