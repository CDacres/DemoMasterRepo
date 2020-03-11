/* global locale_code */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckoutSidebar from '../CheckoutSidebar';
// import PromoBox from '../PromoBox';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';

const IS_BROWSER = typeof window === 'object';

const Checkout = ({
    address,
    amenities,
    bookingRequest,
    btToken,
    configurations,
    defaultConfiguration,
    country_lang_url,
    fullAddress,
    lang,
    linkedin_login_link,
    room,
    step,
    user
}) => {
    if (
        step[1].complete &&
        step[2].complete &&
        step[3].complete &&
        step[4].complete &&
        step[5].complete &&
        step[6].complete
    ) {
        return (
            <div className="row">
                <div
                    className="col-md-5 col-md-push-7 space-lg-2 space-md-2 space-sm-2 side-summary-container"
                >
                    <CheckoutSidebar
                        address={fullAddress}
                        bookingRequest={bookingRequest}
                        hideTotal={false}
                        lang={lang}
                        room={room}
                    />
                </div>
                <div className="col-md-7 col-md-pull-5 space-lg-4 space-md-4 space-sm-2">
                    <Step7
                        configurations={configurations}
                        lang={lang}
                        user={user}
                    />
                </div>
            </div>
        );
    } else if (
        !step[4].visited
    ) {
        return (
            <div className="row">
                <div className="col-md-5 col-md-push-7 space-lg-2 space-md-2 space-sm-2 side-summary-container">
                    <CheckoutSidebar
                        address={address}
                        bookingRequest={bookingRequest}
                        hideTotal={true}
                        lang={lang}
                        room={room}
                        user={user}
                    />
                </div>
                <div className="col-md-7 col-md-pull-5 space-lg-4 space-md-4 space-sm-2">
                    <Step1
                        country_lang_url={country_lang_url}
                        IS_BROWSER={IS_BROWSER}
                        lang={lang}
                        linkedin_login_link={linkedin_login_link}
                        user={user}
                    />
                    <Step2
                        configurations={configurations}
                        defaultConfiguration={defaultConfiguration}
                        lang={lang}
                    />
                    <Step3
                        amenities={amenities}
                        configurations={configurations}
                        lang={lang}
                        user={user}
                    />
                    <Step4
                        bookingRequest={bookingRequest}
                        lang={lang}
                    />
                    <Step5
                        bookingRequest={bookingRequest}
                        btToken={btToken}
                        lang={lang}
                        room={room}
                        user={user}
                    />
                </div>
            </div>
        );
    } else if (
        step[1].complete &&
        step[2].complete &&
        step[3].complete &&
        step[4].complete &&
        step[5].complete &&
        user.isGuest
    ) {
        return (
            <div className="row">
                <div
                    className="col-md-5 col-md-push-7 space-lg-2 space-md-2 space-sm-2 side-summary-container"
                >
                    <CheckoutSidebar
                        address={address}
                        bookingRequest={bookingRequest}
                        hideTotal={false}
                        lang={lang}
                        room={room}
                    />
                </div>
                <div className="col-md-7 col-md-pull-5 space-lg-4 space-md-4 space-sm-2">
                    <Step6
                        lang={lang}
                        user={user}
                    />
                </div>
            </div>
        );
    }
    return (
        <div className="row">
            <div className="col-md-5 col-md-push-7 space-lg-2 space-md-2 space-sm-2 side-summary-container">
                <CheckoutSidebar
                    address={address}
                    bookingRequest={bookingRequest}
                    hideTotal={false}
                    lang={lang}
                    room={room}
                    user={user}
                />
            </div>
            <div className="col-md-7 col-md-pull-5 space-lg-4 space-md-4 space-sm-2">
                <Step1
                    country_lang_url={country_lang_url}
                    IS_BROWSER={IS_BROWSER}
                    lang={lang}
                    linkedin_login_link={linkedin_login_link}
                    user={user}
                />
                <Step2
                    configurations={configurations}
                    defaultConfiguration={defaultConfiguration}
                    lang={lang}
                />
                <Step3
                    amenities={amenities}
                    configurations={configurations}
                    lang={lang}
                    user={user}
                />
                <Step4
                    bookingRequest={bookingRequest}
                    lang={lang}
                />
                <Step5
                    bookingRequest={bookingRequest}
                    btToken={btToken}
                    lang={lang}
                    room={room}
                    user={user}
                />
            </div>
        </div>
    );
};

Checkout.propTypes = {
    address: PropTypes.string.isRequired,
    amenities: PropTypes.array.isRequired,
    bookingRequest: PropTypes.object.isRequired,
    btToken: PropTypes.string.isRequired,
    configurations: PropTypes.array.isRequired,
    country_lang_url: PropTypes.string.isRequired,
    defaultConfiguration: PropTypes.object,
    fullAddress: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired,
    linkedin_login_link: PropTypes.string.isRequired,
    room: PropTypes.object.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = ({ step, user }) => ({ step, user });

export default connect(mapStateToProps)(Checkout);

// <div
//     className={
//         `urgency-commitment-message col-md-7
//         col-md-pull-5 space-lg-4 space-md-4 space-sm-2`
//     }
// >
//     <PromoBox
//         country_lang_url={country_lang_url}
//         lang={lang}
//     />
// </div>
