
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import actions from '../../../actions';

import { validateUserInfo } from '../../Step1/methods';

const ProgressButton = ({
    activeStep,
    childElement,
    lang,
    progress,
    progressAction,
    step,
    user
}) => {
    let loading = false;
    const handleClick = () => {
        loading = true;
        if (activeStep === 1) {
            const validationArr = validateUserInfo(user);
            if (!validationArr.length) {
                if (typeof progressAction !== 'undefined') {
                    progressAction();
                }
                return progress();
            } else {
                return validationArr.map(error => bootstrapError(error.message));
            }
        }
        if (typeof progressAction !== 'undefined') {
            progressAction();
        }
        if (activeStep !== 5) {
            progress();
        }
        var payload = {
            step: activeStep
        };
        axios.put(zc_analytics_url + '/checkout/' + zc_checkout_id, payload)
            .catch(error => {
                throw new Error(error);
            });
        // window.localStorage.setItem('zc_checkout', JSON.stringify(step));
    };
    let buttonText = lang.common.common_next;
    if (activeStep === 5) {
        buttonText = lang.common.common_complete;
    }
    return (
        <section>
            <div className="row space-2 space-top-2">
                <div className="col-sm-6">
                    {!loading ?
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleClick}
                            disabled={
                                activeStep === 1 || activeStep === 5 ?
                                    false :
                                    !step[activeStep].complete
                            }
                        >
                            <span>{buttonText}</span>
                        </button> :
                        <img src="/images/loading.gif" />
                    }
                </div>
                {
                    typeof childElement !== 'undefined' ?
                        <div className="col-sm-6 text-right">
                            {childElement}
                        </div> : null
                }
            </div>
        </section>
    );
};

ProgressButton.propTypes = {
    activeStep: PropTypes.number.isRequired,
    childElement: PropTypes.node,
    lang: PropTypes.object.isRequired,
    progress: PropTypes.func.isRequired,
    progressAction: PropTypes.func,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = ({ activeStep, step, user }) => ({ activeStep, step, user });

const mapDispatchToProps = dispatch => {
    return {
        progress: () => {
            dispatch(actions.progress());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressButton);
