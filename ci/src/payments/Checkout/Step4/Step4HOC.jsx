import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Step4 from './Step4.jsx';

import actions from '../../actions';

class Step4HOC extends Component {
    constructor() {
        super();
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleCollapse(event) {
        const { setActiveStep } = this.props;
        event.preventDefault();
        setActiveStep(Number(event.target.id));
    }

    handleRadioChange(event) {
        const { bookingRequest, toggleFlexible } = this.props;
        toggleFlexible(bookingRequest, event.target.value);
    }

    render() {
        const { handleCollapse, handleRadioChange } = this;
        const {
            activeStep,
            bookingRequest,
            handleVisited,
            lang,
            step
        } = this.props;
        return (
            <Step4
                activeStep={activeStep}
                bookingRequest={bookingRequest}
                flex={step[4].flexible}
                handleCollapse={handleCollapse}
                handleRadioChange={handleRadioChange}
                handleVisited={handleVisited}
                lang={lang}
            />
        );
    }
}

Step4HOC.propTypes = {
    activeStep: PropTypes.number.isRequired,
    bookingRequest: PropTypes.object.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    setActiveStep: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    toggleFlexible: PropTypes.func.isRequired
};

const mapStateToProps = ({ activeStep, bookingRequest, step }) =>
    ({ activeStep, bookingRequest, step });

const mapDispatchToProps = dispatch => {
    return {
        toggleFlexible: (bookingRequest, flexible) => {
            dispatch(actions.toggleFlexible(flexible));
            if (flexible === 'true') {
                dispatch(actions.setBookingTotal(bookingRequest.cancel_price));
                dispatch(actions.setFlexValue(Number(bookingRequest.cancel_price - bookingRequest.base_price).toFixed(2)));
            } else {
                dispatch(actions.setBookingTotal(bookingRequest.base_price));
                dispatch(actions.setFlexValue(0));
            }
        },
        handleVisited: step => {
            dispatch(actions.handleVisited(step));
        },
        setActiveStep: id => {
            dispatch(actions.setActiveStep(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step4HOC);
