/* global braintree */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PaypalPayment extends Component {
    constructor() {
        super();
        this.state = {
            isCompleting: false,
            nonce: '',
            showComplete: false
        };
        this.sendBookingRequest = this.sendBookingRequest.bind(this);
    }

    componentDidMount() {
        const { btToken } = this.props;
        braintree.setup(btToken, 'paypal', {
            container: 'paypal-button',
            singleUse: true,
            onSuccess: (nonce) => {
                this.setState({
                    nonce,
                    showComplete: true
                });
            },
            onUnsupported: () => {
                throw new Error('Not supported...');
            }
        });
    }

    sendBookingRequest(payment_nonce) {
        const { makeReservation } = this.props;
        this.setState({ isCompleting: true });
        makeReservation(payment_nonce);
    }

    render() {
        const { sendBookingRequest } = this;
        const { isCompleting, nonce, showComplete } = this.state;
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
            sendBookingRequest(event.target.dataset.nonce);
        };
        return (
            <div className="row">
                <div className="col-12">
                    <p>
                        {lang.payments.payments_index_form_payment_paypal_text}
                    </p>
                    <div id="paypal-button" />
                    {
                        showComplete &&
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

PaypalPayment.propTypes = {
    bookingRequest: PropTypes.object.isRequired,
    btToken: PropTypes.string.isRequired,
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

export default PaypalPayment;
