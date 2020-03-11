
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';

const GoogleMap = ({ openMapModal, closeMapModal, lang, showMapModal, venue_lat, venue_long }) => {
    const map = {
        width: 600,
        height: 270,
        zoom: 14,
        scale: 1
    };
    const mapUrl = `//maps.googleapis.com/maps/api/staticmap?scale=${map.scale}&center=${venue_lat},${venue_long}&zoom=${map.zoom}&size=${map.width}x${map.height}&markers=${venue_lat},${venue_long}&key=AIzaSyDnWODbV69tYJm9PxIV_1vXuA2j679QCVE`;
    return (
        <div className="reactGoogleMap">
            <div id="map">
                <a
                    id="google_map"
                    href="#"
                    data-toggle="modal"
                    data-target="#map_modal"
                    data-lat={venue_lat}
                    data-long={venue_long}
                    onClick={openMapModal}
                >
                    <div id="static-map" className="staticMap">
                        <img
                            className="staticMap"
                            alt={
                                !isEmpty(lang) ?
                                    lang.common.Map :
                                    ''
                            }
                            title={
                                !isEmpty(lang) ?
                                    lang.common.Map :
                                    ''
                            }
                            src={mapUrl}
                        />
                        <div className="zoom">
                            <div className="siteZoom" />
                        </div>
                    </div>
                </a>
            </div>
            {showMapModal &&
                <div className="mapModalOverlay">
                    <div className="mapModal">
                        <a
                            title="Close"
                            className="mapModalClose"
                            href="#"
                            onClick={closeMapModal}
                        >
                            <span>×</span>
                        </a>
                        <iframe
                            id="mapIframe"
                            src={`//maps.google.com/maps?q=loc:${venue_lat}+${venue_long}&z=15&output=embed`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                        />
                    </div>
                </div>
            }
        </div>
    );
};

GoogleMap.propTypes = {
    closeMapModal: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    openMapModal: PropTypes.func.isRequired,
    showMapModal: PropTypes.bool.isRequired,
    venue_lat: PropTypes.string.isRequired,
    venue_long: PropTypes.string.isRequired
};

export default GoogleMap;
