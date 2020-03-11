
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Checkout from '../Checkout';

import actions from '../actions';

class CheckoutHOC extends Component {
    componentDidMount() {
        const {
            bookingRequest,
            handleChange,
            setInitialBookingRequest,
            setInitialUser,
            user
        } = this.props;
        const { email, first_name, last_name, phone_number } = user;
        if (email.length) {
            setInitialUser(user);
            if (email !== '' && first_name !== '' && last_name !== '' && phone_number !== '') {
                handleChange('complete', true, 1);
            }
        }
        setInitialBookingRequest(bookingRequest);
    }
    render() {
        const {
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
            step
        } = this.props;
        return (
            <Checkout
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
                step={step}
            />
        );
    }
}

CheckoutHOC.propTypes = {
    address: PropTypes.string,
    amenities: PropTypes.array.isRequired,
    bookingRequest: PropTypes.object.isRequired,
    btToken: PropTypes.string.isRequired,
    configurations: PropTypes.array.isRequired,
    country_lang_url: PropTypes.string.isRequired,
    defaultConfiguration: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    fullAddress: PropTypes.string,
    lang: PropTypes.object.isRequired,
    linkedin_login_link: PropTypes.string.isRequired,
    room: PropTypes.object.isRequired,
    setInitialBookingRequest: PropTypes.func.isRequired,
    setInitialUser: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object
};

const mapStateToProps = ({ step }) => ({ step });

const mapDispatchToProps = dispatch => {
    return {
        handleChange: (key, value, stepNo) => {
            dispatch(actions.handleChange(key, value, stepNo));
        },
        setInitialBookingRequest: (bookingRequest) => {
            dispatch(actions.setInitialBookingRequest(bookingRequest));
        },
        setInitialUser: (user) => {
            dispatch(actions.setInitialUser(user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutHOC);
