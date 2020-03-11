
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import styles from './styles.js';

import actions from '../../../../../../actions';

const WishlistHeart = ({ roomId, toggleFavourite, userFavourites }) => {
    const isFavourite = userFavourites.filter(id => {
        return Number(id) === Number(roomId);
    }).length;
    const toggleUserFavourite = () => toggleFavourite(roomId);
    return (
        <div
            className={css(
                styles.wishlistHeartContainer
            )}
        >
            <label
                htmlFor={`favourites-listing_${roomId}`}
                className={css(styles.container)}
                style= {{
                    height: '32px',
                    width: '32px'
                }}
            >
                <input
                    type="checkbox"
                    id={`favourites-listing_${roomId}`}
                    className={css(styles.wishlistHeartCheckbox)}
                    onChange={toggleUserFavourite}
                />
                <div className={css(styles.wishlistHeartIcon)}>
                    <svg
                        viewBox="0 0 32 32"
                        fill={
                            isFavourite ?
                                '#00c8ff' : '#484848'
                        }
                        fillOpacity={
                            isFavourite ?
                                '1' : '0.5'
                        }
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        aria-label="Save to Wish List"
                        role="img"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            height: '32px',
                            width: '32px',
                            display: 'block',
                            pointerEvents: 'none'
                        }}
                    >
                        <path
                            d="M23.993 2.75c-.296 0-.597.017-.898.051-1.14.131-2.288.513-3.408 1.136-1.23.682-2.41 1.621-3.688 2.936-1.28-1.316-2.458-2.254-3.687-2.937-1.12-.622-2.268-1.004-3.41-1.135a7.955 7.955 0 0 0-.896-.051C6.123 2.75.75 4.289.75 11.128c0 7.862 12.238 16.334 14.693 17.952a1.004 1.004 0 0 0 1.113 0c2.454-1.618 14.693-10.09 14.693-17.952 0-6.84-5.374-8.378-7.256-8.378"
                        />
                    </svg>
                </div>
            </label>
        </div>
    );
};

WishlistHeart.propTypes = {
    roomId: PropTypes.number.isRequired,
    toggleFavourite: PropTypes.func.isRequired,
    userFavourites: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    userFavourites: state.user.favourites
});

const mapDispatchToProps = dispatch => {
    return {
        toggleFavourite: roomId => dispatch(actions.toggleFavourite(roomId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistHeart);
