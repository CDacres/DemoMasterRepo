import React from 'react';
// import CSSModules from 'react-css-modules';

// import styles from './TrustCarousel.css';

function TrustCarousel() {
    return (
        <div className="trust-container">
            <div className="row room-carousel-container m-0">
                <div className="col-md-12 room-carousel">
                    <ul>
                        <li>
                            <div className="row room-row">
                                <div className="col-md-4 col-sm-4 col-xs-4">
                                    <div className="trust-box">
                                        <div className="trust-icon">
                                            <span className="glyphicon glyphicon-tags"></span>
                                        </div>
                                        <div>
                                            <span className="trust-title">Best Price Guarantee</span>
                                        </div>
                                        <div>
                                            <span>New spaces listed daily - for every budget. No booking fees. Save money and book now!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-4">
                                    <div className="trust-box">
                                        <div className="trust-icon">
                                            <span className="glyphicon glyphicon-globe"></span>
                                        </div>
                                        <div>
                                            <span className="trust-title">UK’s Biggest Online Space Marketplace</span>
                                        </div>
                                        <div>
                                            <span>Working with over 6000 venues and offices in the UK, we can find and book the right space in the right place, at the right price.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-4">
                                    <div className="trust-box">
                                        <div className="trust-icon">
                                            <span className="glyphicon glyphicon-refresh"></span>
                                        </div>
                                        <div>
                                            <span className="trust-title">Manage your bookings, anytime</span>
                                        </div>
                                        <div>
                                            <span>Send a booking request or cancel an existing one in just a few clicks.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row room-row">
                                <div className="col-md-4 col-sm-4 col-xs-4">
                                    <div className="trust-box">
                                        <div className="trust-icon">
                                            <span className="glyphicon glyphicon-star"></span>
                                        </div>
                                        <div>
                                            <span className="trust-title">5 years of trusted customer reviews</span>
                                        </div>
                                        <div>
                                            <span>We ask each of our customers to rate the venue and space they book, to help you make the right choice.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-4">
                                    <div className="trust-box">
                                        <div className="trust-icon">
                                            <span className="glyphicon glyphicon-phone-alt"></span>
                                        </div>
                                        <div>
                                            <span className="trust-title">We’re here to help</span>
                                        </div>
                                        <div>
                                            <span>Find answers, manage your bookings and more, our Customer Support Team is here to help.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TrustCarousel;
