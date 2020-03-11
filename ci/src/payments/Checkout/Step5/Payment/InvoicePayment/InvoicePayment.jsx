
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InvoicePayment extends Component {
    constructor() {
        super();
        this.state = {
            isCompleting: false,
            showComplete: false
        };
        this.sendBookingRequest = this.sendBookingRequest.bind(this);
    }

    sendBookingRequest(payment_nonce) {
        const { makeReservation } = this.props;
        this.setState({ isCompleting: true });
        makeReservation(payment_nonce);
    }

    render() {
        const { sendBookingRequest } = this;
        const { isCompleting, nonce } = this.state;
        const { bookingRequest, lang, room } = this.props;
        const handleComplete = (event) => {
            event.preventDefault();
            window.dataLayer.push({
                'ecommerce': {
                    'currencyCode': bookingRequest.currency_code,
                    'checkout': {
                        'actionField': {
                            'step': 2
                        },
                        'products': [
                            {
                                'name': room.title,
                                'id': room.id,
                                'price': bookingRequest.zipcube_revenue.toString(),
                                'brand': room.venue_name,
                                'category': room.usage_superset_desc,
                                'variant': '',
                                'quantity': 1,
                                'coupon': ''
                            }
                        ]
                    }
                },
                'event': 'checkout'
            });
            sendBookingRequest(null);
        };
        return (
            <div className="row">
                <div className="col-12">
                    {
                        <div className="complete-button-container">
                            {
                                isCompleting ?
                                    <div id="loader-container" className="loaderGif">
                                        <img src="/images/loading.gif" />
                                    </div> :
                                    <button
                                        className="btn btn-primary"
                                        data-nonce={nonce}
                                        onClick={handleComplete}
                                    >{lang.common.common_complete}</button>
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

InvoicePayment.propTypes = {
    bookingRequest: PropTypes.object.isRequired,
    extraFee: PropTypes.number.isRequired,
    flexibleFee: PropTypes.number.isRequired,
    handleComplete: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    makeReservation: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    setReservation: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default InvoicePayment;
