
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Payment from 'payment';

import CardPayment from './CardPayment.jsx';

class CardPaymentHOC extends Component {
    // componentDidMount() {
    //     Payment.formatCardNumber(document.querySelector('#credit_card_number'));
    //     Payment.formatCardCVC(document.querySelector('#credit_card_cvv'));
    // }
    render() {
        const {
            bookingRequest,
            btToken,
            handleChange,
            lang,
            makeReservation,
            room,
            user
        } = this.props;
        return (
            <CardPayment
                bookingRequest={bookingRequest}
                btToken={btToken}
                handleChange={handleChange}
                lang={lang}
                makeReservation={makeReservation}
                room={room}
                user={user}
            />
        );
    }
}

CardPaymentHOC.propTypes = {
    bookingRequest: PropTypes.object.isRequired,
    btToken: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    makeReservation: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default CardPaymentHOC;
