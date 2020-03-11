
/* global braintree */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Payment from 'payment';

import CardExpirySelect from './CardExpirySelect';
import ProgressButton from '../../../components/ProgressButton';

import actions from '../../../../actions';

const CardPayment = ({
    bookingRequest,
    btToken,
    handleChange,
    isCompleting,
    lang,
    makeReservation,
    room,
    step
}) => {
    const monthOptions = [];
    for (let i = 1; i <= 12; i += 1) {
        let month = `${i}`;
        if (month < 10) {
            month = `0${month}`;
        }
        monthOptions.push(month);
    }
    const yearOptions = [];
    const currentYear = new Date().getFullYear();
    for (let year = 0; year <= 10; year += 1) {
        const yearVal = currentYear + year;
        yearOptions.push(yearVal);
    }
    const handleCompletion = () => {
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
        if (step[5].credit_card_name === '') {
            bootstrapError(lang.payments.payments_index_form_error_card_name);
            return isCompleting(false);
        }
        if (!Payment.fns.validateCardNumber(step[5].credit_card_number)) {
            bootstrapError(lang.payments.payments_index_form_error_card_number);
            return isCompleting(false);
        }
        if (!Payment.fns.validateCardExpiry(
            step[5].credit_card_expiry_month, step[5].credit_card_expiry_year
        )) {
            bootstrapError(lang.payments.payments_index_form_error_card_expiry);
            return isCompleting(false);
        }
        const client = new braintree.api.Client({ clientToken: btToken });
        isCompleting(true);
        client.tokenizeCard({
            number: step[5].credit_card_number,
            cardholderName: step[5].credit_card_name,
            expirationMonth: step[5].credit_card_expiry_month,
            expirationYear: step[5].credit_card_expiry_year
        }, (err, payment_nonce) => {
            if (err === null) {
                if (makeReservation(payment_nonce)) {
                    isCompleting(false);
                }
            } else {
                bootstrapError(
                    'Network error. Please wait a few minutes and try again. Thank you.'
                );
                return isCompleting(false);
            }
        });
    };
    return (
        <div className="reactCardPayment">
            <div className="row">
                <div className="col-12">
                    <div className="paymentCards">
                        <span className="siteCard siteCardVisa">
                            Visa
                        </span>
                        <span className="siteCard siteCardMastercard">
                            Master Card
                        </span>
                        <span className="siteCard siteCardAmex">
                            American Express
                        </span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <div className="inputContainer">
                        <input
                            id="credit_card_number"
                            name="credit_card_number"
                            type="text"
                            className="cardPaymentInput inspectletIgnore"
                            placeholder={lang.payments.payments_index_form_payment_card_number}
                            value={step[5].credit_card_number}
                            onChange={handleChange}
                            maxLength="19"
                        />
                    </div>
                </div>
                <div className="col-5">
                    <div className="inputContainer">
                        <input
                            id="credit_card_cvv"
                            name="credit_card_cvv"
                            type="text"
                            className="cardPaymentInput inspectletIgnore"
                            placeholder={lang.payments.payments_index_form_payment_card_cvv}
                            value={step[5].credit_card_cvv}
                            onChange={handleChange}
                            maxLength="4"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <div className="inputContainer">
                        <input
                            id="credit_card_name"
                            name="credit_card_name"
                            type="text"
                            className="cardPaymentInput"
                            placeholder={lang.payments.payments_index_form_payment_card_name}
                            value={step[5].credit_card_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-5">
                    <div className="row">
                        <div className="col-6">
                            <CardExpirySelect
                                id="credit_card_expiry_month"
                                name="credit_card_expiry_month"
                                className="inspectletIgnore"
                                options={monthOptions}
                                value={step[5].credit_card_expiry_month}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <CardExpirySelect
                                id="credit_card_expiry_year"
                                name="credit_card_expiry_year"
                                className="inspectletIgnore"
                                options={yearOptions}
                                value={step[5].credit_card_expiry_year}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                step[5].isCompleting ?
                    <div id="loader-container" className="loaderGif">
                        <img src="/images/loading.gif" />
                    </div> :
                    <ProgressButton
                        lang={lang}
                        progressAction={handleCompletion}
                    />
            }
        </div>
    );
};

CardPayment.propTypes = {
    bookingRequest: PropTypes.object.isRequired,
    btToken: PropTypes.string.isRequired,
    extraFee: PropTypes.number.isRequired,
    flexibleFee: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    isCompleting: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    makeReservation: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    setReservation: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    extraFee: state.extraFee,
    flexibleFee: state.flexibleFee,
    step: state.step
});

const mapDispatchToProps = dispatch => {
    return {
        isCompleting: (bool) => {
            dispatch(actions.handleChange('isCompleting', bool));
        },
        setReservation: (data) => {
            dispatch(actions.setReservation(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
