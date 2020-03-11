import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SectionHeading = ({
    activeStep,
    handleCollapse,
    headingText,
    lang,
    step,
    stepNo
}) => {
    if (activeStep === Number(stepNo)) {
        return (
            <section className="reactSectionHeading">
                <header className="accordionHeader text-lead">
                    {Number(stepNo) !== 1 &&
                        <hr
                            className="accordionHeaderDivider space-top-1 space-3"
                        />
                    }
                    <div className="row">
                        <div className="col-md-12 text-left">
                            <div className="h3 pull-left headingText">
                                {stepNo}. {headingText}
                            </div>
                            <div
                                className="hide-sm pull-left titleContentWrapper"
                            />
                        </div>
                    </div>
                    {(activeStep === Number(stepNo) &&
                        <div className="space-lg-6 space-md-6 space-sm-6 space-xs-6" />) ||
                        (<div className="space-lg-2 space-md-2 space-sm-2 space-xs-2" />)
                    }
                </header>
            </section>
        );
    }
    return (
        <section className="reactSectionHeading">
            <header className="accordionHeader text-lead">
                {Number(stepNo) !== 1 &&
                    <hr
                        className="accordionHeaderDivider space-top-1 space-3"
                    />
                }
                <div className="row">
                    <div
                        className={`col-md-10 text-left${
                                activeStep !== Number(stepNo) ?
                                ' text-light-gray' :
                                ''
                            }
                        `}
                    >
                        <div className="h3 pull-left headingText">
                            {stepNo}. {headingText}
                        </div>
                        <div className="hide-sm pull-left titleContentWrapper" />
                    </div>
                    {step[Number(stepNo)].visited &&
                        <div className="col-md-2 text-right header-edit-link">
                            <a
                                id={stepNo}
                                href="#"
                                onClick={handleCollapse}
                            >{lang.common.common_edit}</a>
                        </div>
                    }
                </div>
                {(activeStep === Number(stepNo) &&
                    <div className="space-lg-6 space-md-6 space-sm-6 space-xs-6" />) ||
                    (<div className="space-lg-2 space-md-2 space-sm-2 space-xs-2" />)
                }
            </header>
        </section>
    );
};

SectionHeading.propTypes = {
    activeStep: PropTypes.number.isRequired,
    handleCollapse: PropTypes.func.isRequired,
    headingText: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired,
    step: PropTypes.object.isRequired,
    stepNo: PropTypes.string.isRequired
};

const mapStateToProps = ({ activeStep, step }) => ({ activeStep, step });

export default connect(mapStateToProps)(SectionHeading);
