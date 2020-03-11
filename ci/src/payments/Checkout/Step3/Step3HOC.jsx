import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Step3 from './Step3.jsx';

import actions from '../../actions';

class Step3HOC extends Component {
    constructor() {
        super();
        this.handleAddOn = this.handleAddOn.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
    }

    handleAddOn(event) {
        const { handleAddAddOn } = this.props;
        const key = event.target.id.split('_')[1];
        handleAddAddOn(key, event.target.value, event.target.dataset.extra);
    }

    handleCollapse(event) {
        event.preventDefault();
        const { setActiveStep } = this.props;
        setActiveStep(Number(event.target.id));
    }

    render() {
        const { handleAddOn, handleCollapse } = this;
        const {
            activeStep,
            amenities,
            configurations,
            handleVisited,
            lang
        } = this.props;
        return (
            <Step3
                activeStep={activeStep}
                amenities={amenities}
                configurations={configurations}
                handleAddOn={handleAddOn}
                handleCollapse={handleCollapse}
                handleVisited={handleVisited}
                lang={lang}
            />
        );
    }
}

Step3HOC.propTypes = {
    activeStep: PropTypes.number.isRequired,
    amenities: PropTypes.array.isRequired,
    configurations: PropTypes.array.isRequired,
    handleAddAddOn: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    setActiveStep: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = ({ activeStep, step }) => ({ activeStep, step });

const mapDispatchToProps = dispatch => {
    return {
        handleAddAddOn: (key, value, extra) => {
            dispatch(actions.handleAddOn(key, value, extra));
        },
        handleVisited: (step) => {
            dispatch(actions.handleVisited(step));
        },
        setActiveStep: (id) => {
            dispatch(actions.setActiveStep(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3HOC);
