import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Step5 from './Step5.jsx';

import actions from '../../actions';

class Step5HOC extends Component {
    constructor() {
        super();
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleCollapse(event) {
        const { setActiveStep } = this.props;
        event.preventDefault();
        setActiveStep(Number(event.target.id));
    }

    handleChange(event) {
        const { handleInputChange } = this.props;
        handleInputChange(event.target.id, event.target.value);
    }

    handleRadioChange(event) {
        const { handleInputChange } = this.props;
        handleInputChange(event.target.name, event.target.value);
    }

    render() {
        const { handleCollapse, handleChange, handleRadioChange } = this;
        const {
            activeStep,
            bookingRequest,
            btToken,
            handleVisited,
            lang,
            room,
            step,
            user
        } = this.props;
        return (
            <Step5
                activeStep={activeStep}
                bookingRequest={bookingRequest}
                btToken={btToken}
                handleChange={handleChange}
                handleCollapse={handleCollapse}
                handleRadioChange={handleRadioChange}
                handleVisited={handleVisited}
                lang={lang}
                paymentType={step[5].paymentType}
                room={room}
                user={user}
            />
        );
    }
}

Step5HOC.propTypes = {
    activeStep: PropTypes.number.isRequired,
    bookingRequest: PropTypes.object.isRequired,
    btToken: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
    setActiveStep: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = ({ activeStep, step }) => ({ activeStep, step });

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (name, value) => {
            dispatch(actions.handleChange(name, value));
        },
        handleVisited: (step) => {
            dispatch(actions.handleVisited(step));
        },
        setActiveStep: (id) => {
            dispatch(actions.setActiveStep(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step5HOC);
