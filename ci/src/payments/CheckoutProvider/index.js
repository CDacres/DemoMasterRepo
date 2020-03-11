
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import CheckoutHOC from '../Checkout/CheckoutHOC.jsx';

import store from '../stores';

const CheckoutProvider = ({
    address,
    amenities,
    btToken,
    bookingRequest,
    configurations,
    country_lang_url,
    defaultConfiguration,
    fullAddress,
    lang,
    linkedin_login_link,
    room,
    user
}) => {
    return (
        <Provider store={store}>
            <CheckoutHOC
                address={address}
                amenities={amenities}
                btToken={btToken}
                bookingRequest={bookingRequest}
                configurations={configurations}
                country_lang_url={country_lang_url}
                defaultConfiguration={defaultConfiguration}
                fullAddress={fullAddress}
                lang={lang}
                linkedin_login_link={linkedin_login_link}
                room={room}
                user={user}
            />
        </Provider>
    );
};

CheckoutProvider.propTypes = {
    address: PropTypes.string,
    amenities: PropTypes.array.isRequired,
    bookingRequest: PropTypes.object.isRequired,
    btToken: PropTypes.string.isRequired,
    configurations: PropTypes.array.isRequired,
    country_lang_url: PropTypes.string.isRequired,
    defaultConfiguration: PropTypes.object,
    fullAddress: PropTypes.string,
    lang: PropTypes.object.isRequired,
    linkedin_login_link: PropTypes.string.isRequired,
    room: PropTypes.object.isRequired,
    user: PropTypes.object
};

export default CheckoutProvider;
