
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import styles from './styles.js';

import actions from '../../../actions';

import GoogleMap from './GoogleMap';

class MapSection extends Component {
    constructor() {
        super();
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }

    handleMarkerClick() {
        console.log('Marker clicked');
    }

    render() {
        const { handleMarkerClick } = this;
        const {
            mapState,
            toggleSearchOnMapMove
        } = this.props;
        return (
            <div>
                <div
                    className={
                        mapState.mapPanelVisible ?
                        css(
                            styles.mapWrapper,
                            styles.mapWrapper_withTabs,
                            styles.mapPanelVisible
                        ) : css(
                            styles.mapWrapper,
                            styles.mapWrapper_withTabs
                        )
                    }
                >
                    <div
                        id="mapContainer"
                        className="search-results-map"
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <GoogleMap
                            containerElement={
                                <div style={{ height: '100%' }} />
                            }
                            mapElement={
                                <div style={{ height: '100%' }} />
                            }
                            handleMarkerClick={handleMarkerClick}
                            markers={[
                                {
                                    position: {
                                        lat: 51.546846,
                                        lng: -0.106146
                                    }
                                }
                            ]}
                        />
                        <div className={css(styles.mapRefreshControls)}>
                            <div className={css(styles.panel, styles.mapAutoRefresh)}>
                                <label
                                    className={css(styles.checkbox)}
                                    htmlFor="map-auto-refresh-checkbox"
                                >
                                    <input
                                        className={css(styles.refreshInput)}
                                        id="map-auto-refresh-checkbox"
                                        value="on"
                                        type="checkbox"
                                        onChange={toggleSearchOnMapMove}
                                    />
                                    <span
                                        data-fake-checkbox="true"
                                        className={
                                            mapState.searchOnMapMove ?
                                                css(styles.fakeCheckboxChecked) :
                                                css(styles.fakeCheckbox)
                                        }
                                    >
                                        {
                                            mapState.searchOnMapMove ?
                                                <span
                                                    className={css(
                                                        styles.fakeCheckboxCheckmark
                                                    )}
                                                >
                                                    <svg
                                                        className={css(
                                                            styles.fakeCheckboxCheckmarkSvg
                                                        )}
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
                                    <span
                                        className={css(
                                            styles.refreshText
                                        )}
                                    >Search as I move the map</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

MapSection.propTypes = {
    mapState: PropTypes.object.isRequired,
    toggleSearchOnMapMove: PropTypes.func.isRequired
};

const mapStateToProps = ({ mapState }) => ({ mapState });

const mapDispatchToProps = dispatch => {
    return {
        toggleSearchOnMapMove: () => dispatch(actions.toggleSearchOnMapMove())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapSection);

// <a className="map-manual-refresh btn btn-primary hide">
//     <span>Redo search here</span>
//     <i className="icon icon-refresh icon-space-left" />
// </a>
