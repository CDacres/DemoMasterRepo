
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import CardPayment from './CardPayment';
import PaypalPayment from './PaypalPayment';
import InvoicePayment from './InvoicePayment';

import actions from '../../../actions';

import { getGivenPrice } from '../../../selectors';

import { addDataToDataLayer, setGlobalVars } from '../methods';

class Payment extends Component {
    constructor() {
        super();
        this.makeReservation = this.makeReservation.bind(this);
    }

    componentDidMount() {
        const { handleVisited } = this.props;
        handleVisited(5);
    }

    makeReservation(payment_nonce) {
        const {
            bookingRequest,
            extraFee,
            flexibleFee,
            givenPrice,
            room,
            setReservation,
            step,
            user
        } = this.props;
        const bookingData = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            asset_id: room.asset_id,
            booking_type: bookingRequest.booking_type,
            start_date: bookingRequest.start_date,
            end_date: bookingRequest.end_date,
            slots: bookingRequest.slots,
            guests: bookingRequest.guests,
            comments: step[2].comments,
            configuration_id: step[2].configuration,
            extras: step[3].addOns,
            given_price: givenPrice,
            cancel_applied: step[4].flexible,
            extra_fee: extraFee,
            flexible_fee: flexibleFee,
            payment_type: step[5].paymentType,
            payment_nonce,
            bookingChannel_id: 1
        };
        if (isWidget)
        {
            bookingData.bookingChannel_id = 3;
        }
        axios.post('/' + country_lang_url + '/api_json/Booking_Request', qs.stringify(bookingData))
        .then(({ data }) => {
            if (data.error.occurred) {
                this.setState({ isCompleting: false });
                bootstrapError(data.error.message);
                return false;
            } else {
                // Set global variables for tags triggered by 'purchase' event
                setGlobalVars(data.data.reservation);
                // Fire 'purchase' event via dataLayer push
                addDataToDataLayer(data.data.reservation);
                // Set reservation in the Redux store
                setReservation(data.data);
                return true;
            }
        })
        .catch(error => {
            throw new Error(error);
        });
    }

    render() {
        const { makeReservation } = this;
        const {
            bookingRequest,
            btToken,
            extraFee,
            flexibleFee,
            handleChange,
            handleCompletion,
            handleRadioChange,
            lang,
            paymentType,
            room,
            setReservation,
            step,
            user
        } = this.props;
        const handleComplete = (event) => {
            event.preventDefault();
            handleCompletion(bookingRequest, event.target.dataset.nonce, room);
        };
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="paymentTypeInputContainer">
                            <label
                                className="paymentTypeInputLabel"
                                htmlFor="card-payment"
                            >
                                <input
                                    id="card-payment"
                                    type="radio"
                                    name="paymentType"
                                    value="braintree"
                                    className="paymentTypeInput"
                                    onChange={handleRadioChange}
                                    checked={paymentType === 'braintree'}
                                />
                                {lang.payments.payments_index_form_payment_card}
                            </label>
                        </div>
                        <div className="paymentTypeInputContainer">
                            <label
                                className="paymentTypeInputLabel"
                                htmlFor="paypal-payment"
                            >
                                <input
                                    id="paypal-payment"
                                    type="radio"
                                    name="paymentType"
                                    value="paypal"
                                    className="paymentTypeInput"
                                    onChange={handleRadioChange}
                                    checked={paymentType === 'paypal'}
                                />
                                {lang.payments.payments_index_form_payment_paypal}
                            </label>
                        </div>
                        {
                             user.is_admin ?
                             <div className="paymentTypeInputContainer">
                                <label
                                    className="paymentTypeInputLabel"
                                    htmlFor="paypal-payment"
                                >
                                    <input
                                        id="admin-payment"
                                        type="radio"
                                        name="paymentType"
                                        value="admin"
                                        className="paymentTypeInput"
                                        onChange={handleRadioChange}
                                        checked={paymentType === 'admin'}
                                    />
                                    {lang.common.common_invoice}
                                </label>
                            </div> : null
                        }
                    </div>
                </div>
                {
                    paymentType === 'braintree' ?
                    <CardPayment
                        bookingRequest={bookingRequest}
                        btToken={btToken}
                        handleChange={handleChange}
                        makeReservation={makeReservation}
                        lang={lang}
                        room={room}
                        user={user}
                    /> : null
                }
                {
                    paymentType === 'paypal' ?
                    <PaypalPayment
                        btToken={btToken}
                        bookingRequest={bookingRequest}
                        extraFee={extraFee}
                        flexibleFee={flexibleFee}
                        handleComplete={handleComplete}
                        lang={lang}
                        makeReservation={makeReservation}
                        room={room}
                        setReservation={setReservation}
                        step={step}
                        user={user}
                    /> : null
                }
                {
                    paymentType === 'admin' ?
                    <InvoicePayment
                        bookingRequest={bookingRequest}
                        extraFee={extraFee}
                        flexibleFee={flexibleFee}
                        handleComplete={handleComplete}
                        lang={lang}
                        makeReservation={makeReservation}
                        room={room}
                        setReservation={setReservation}
                        step={step}
                        user={user}
                    /> : null
                }
            </div>
        );
    }
}

Payment.propTypes = {
    bookingRequest: PropTypes.object.isRequired,
    btToken: PropTypes.string.isRequired,
    extraFee: PropTypes.number.isRequired,
    flexibleFee: PropTypes.number.isRequired,
    givenPrice: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCompletion: PropTypes.func.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    paymentType: PropTypes.string.isRequired,
    room: PropTypes.object.isRequired,
    setReservation: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    extraFee: state.extraFee,
    flexibleFee: state.flexibleFee,
    givenPrice: getGivenPrice(state),
    step: state.step
});

const mapDispatchToProps = dispatch => {
    return {
        handleCompletion: (bookingRequest, nonce, room) => {
            dispatch(actions.handleCompletion(bookingRequest, nonce, room));
        },
        setReservation: (data) => {
            dispatch(actions.setReservation(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
