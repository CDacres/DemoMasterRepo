
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import { withGoogleMap, GoogleMap as Gmap, Marker } from 'react-google-maps';
import shortid from 'shortid';

import styles from './styles.js';

const GoogleMap = withGoogleMap(({ handleMarkerClick, markers, onMapLoad }) => (
    <Gmap
        id="googleMap"
        ref={onMapLoad}
        defaultZoom={14}
        defaultCenter={{ lat: 51.5072996, lng: -0.1280232 }}
        // onClick={onMapClick}
    >
        {markers.map(marker => (
            <Marker
                {...marker}
                key={shortid.generate()}
                onClick={handleMarkerClick}
                // onRightClick={_.noop}
            />
        ))}
    </Gmap>
));

export default GoogleMap;
