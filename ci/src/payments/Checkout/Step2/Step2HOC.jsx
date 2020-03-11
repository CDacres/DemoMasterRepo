import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Step2 from './Step2.jsx';

import actions from '../../actions';

class Step2HOC extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
    }

    componentDidMount() {
        const {
            defaultConfiguration,
            setDefaultConfiguration
        } = this.props;
        setDefaultConfiguration(defaultConfiguration.config_id);
    }

    handleChange(event) {
        const { handleComplete, handleInputChange } = this.props;
        handleInputChange(event.target.name, event.target.value);
        handleComplete();
    }

    handleCollapse(event) {
        event.preventDefault();
        const { setActiveStep } = this.props;
        setActiveStep(Number(event.target.id));
    }

    render() {
        const { handleChange, handleCollapse } = this;
        const {
            activeStep,
            configurations,
            defaultConfiguration,
            handleVisited,
            lang
        } = this.props;
        return (
            <Step2
                activeStep={activeStep}
                configurations={configurations}
                defaultConfiguration={defaultConfiguration}
                handleChange={handleChange}
                handleCollapse={handleCollapse}
                handleVisited={handleVisited}
                lang={lang}
            />
        );
    }
}

Step2HOC.propTypes = {
    activeStep: PropTypes.number.isRequired,
    configurations: PropTypes.array.isRequired,
    defaultConfiguration: PropTypes.object.isRequired,
    handleComplete: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    setActiveStep: PropTypes.func.isRequired,
    setDefaultConfiguration: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired
};

const mapStateToProps = ({ activeStep, step }) =>
    ({ activeStep, step });

const mapDispatchToProps = dispatch => {
    return {
        handleComplete: () => {
            dispatch(actions.handleChange('complete', true));
        },
        handleInputChange: (name, value) => {
            dispatch(actions.handleChange(name, value));
        },
        handleVisited: (step) => {
            dispatch(actions.handleVisited(step));
        },
        setActiveStep: (id) => {
            dispatch(actions.setActiveStep(id));
        },
        setDefaultConfiguration: (config_id) => {
            dispatch(actions.setDefaultConfiguration(config_id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2HOC);
