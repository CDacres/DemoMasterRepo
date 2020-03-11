
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import axios from 'axios';
import qs from 'qs';

import GoogleMap from './GoogleMap';
import ServiceRating from './ServiceRating';

import { parseLangLine } from '../../../lang';

import actions from '../../actions';

const Step7 = ({
    configurations,
    handleFinishing,
    handleServiceComments,
    handleServiceRating,
    lang,
    showMapModal,
    step,
    toggleFinishButton
}) => {
    let addOns = [];
    if (step[7].requestResponse.extras) {
        addOns = step[7].requestResponse.extras.objects.map(extra =>
            <li key={shortid.generate()}>{extra.desc} x {extra.quantity}</li>
        );
    }
    const openMapModal = () => showMapModal(true);
    const closeMapModal = () => showMapModal(false);
    const handleRating = (event) => {
        event.preventDefault();
        toggleFinishButton(true);
        handleServiceRating(event.target.id);
    };
    const handleComments = (event) => {
        event.preventDefault();
        handleServiceComments(event.target.value);
    };
    const handleFinish = () => {
        handleFinishing(true);
        const reviewData = {
            ...step[7].serviceRating,
            reservation_id: step[7].requestResponse.reservation.id
        };
        delete reviewData.showTextarea;
        axios.post('/' + country_lang_url + '/api_json/Service_Review', qs.stringify(reviewData))
        .then(({ data }) => {
            if (!data.error.occurred) {
                location.href = '/' + country_lang_url;
            } else {
                handleFinishing(false);
                return bootstrapError(data.error.message);
            }
        })
        .catch(error => {
            throw new Error(error);
        });
    };
    const maxCapacity = () => {
        const configuration = configurations.filter(
            config => {
                return Number(config.config_id) === Number(step[2].configuration);
            }
        );
        return Number(configuration[0].max_capacity) > 1 ?
            `${configuration[0].max_capacity} ${lang.common.common_people_lower}` :
            `${configuration[0].max_capacity} ${lang.common.common_person_lower}`;
    };
    return (
        <div className="reactStep7">
            <div className="row">
                <div className="col-12">
                    <h3>{lang.payments.payments_booking_confirmed}</h3>
                </div>
            </div>
            <div>
                <div className="sectionDiv">
                    <h4>{lang.payments.payments_booking_confirmed_heading}: {step[7].requestResponse.reservation.id}</h4>
                    <div>
                        <p
                            dangerouslySetInnerHTML={{ __html: parseLangLine(
                                lang.payments.payments_booking_confirmed_request_text_1,
                                step[7].requestResponse.reservation.venue_name
                            ) }}
                        />
                        <p
                            dangerouslySetInnerHTML={{ __html: parseLangLine(
                                lang.payments.payments_booking_confirmed_request_text_3,
                                step[7].requestResponse.reservation.client_email
                            ) }}
                        />
                    </div>
                </div>
                <h4>{lang.payments.payments_index_form_your_details_heading}</h4>
                <div className="sectionDiv">
                    <div>
                        <span>{step[7].requestResponse.reservation.client_name}</span>
                    </div>
                    <div>
                        <span>{step[7].requestResponse.reservation.client_email}</span>
                    </div>
                    <div>
                        <span>{step[7].requestResponse.reservation.client_phone}</span>
                    </div>
                </div>
                <h4>{lang.payments.payments_booking_confirmed_room_config_heading}</h4>
                <div className="sectionDiv">
                    <div className="pull-left">
                        <span
                            className={
                                `configIcon ${
                                    step[7].requestResponse.reservation.configuration.toLowerCase()
                                }`
                            }
                        />
                    </div>
                    <div className="pull-left top-p-1 left-p-1">
                        <span>{
                            step[7].requestResponse.reservation.configuration
                        } - {maxCapacity()}</span>
                    </div>
                </div>
                {addOns.length ?
                    <div>
                        <h4>{lang.payments.payments_booking_confirmed_add_ons_heading}</h4>
                        <div className="sectionDiv">
                            <ul>{addOns}</ul>
                        </div>
                    </div> :
                    null
                }
                <h4>{lang.payments.payments_booking_confirmeds_location_heading}</h4>
                <GoogleMap
                    openMapModal={openMapModal}
                    closeMapModal={closeMapModal}
                    lang={lang}
                    showMapModal={step[7].showMapModal}
                    venue_lat={step[7].requestResponse.reservation.venue_lat}
                    venue_long={step[7].requestResponse.reservation.venue_long}
                />
            </div>
            <div className="serviceRatingContainer">
                <ServiceRating
                    handleRating={handleRating}
                    handleComments={handleComments}
                    lang={lang}
                    selectedRating={step[7].serviceRating.rating}
                    showTextarea={step[7].serviceRating.showTextarea}
                />
            </div>
             <div className="row">
                <div className="col-12">
                    {
                        step[7].isFinishing ?
                            <div id="loader-container" className="loaderGif">
                                <img src="/images/loading.gif" />
                            </div> :
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleFinish}
                                disabled={!step[7].finishEnabled}
                            >
                                <span>{lang.common.common_finish}</span>
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

Step7.propTypes = {
    activeStep: PropTypes.number.isRequired,
    configurations: PropTypes.array.isRequired,
    handleFinishing: PropTypes.func.isRequired,
    handleServiceComments: PropTypes.func.isRequired,
    handleServiceRating: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    showMapModal: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    toggleFinishButton: PropTypes.func.isRequired
};

const mapStateToProps = ({ activeStep, step }) => ({ activeStep, step });

const mapDispatchToProps = dispatch => {
    return {
        handleFinishing: (bool) => {
            dispatch(actions.handleFinishing(bool));
        },
        handleServiceRating: (id) => {
            dispatch(actions.handleServiceRating(id));
        },
        handleServiceComments: (value) => {
            dispatch(actions.handleServiceComments(value));
        },
        showMapModal: (bool) => {
            dispatch(actions.showMapModal(bool));
        },
        toggleFinishButton: (bool) => {
            dispatch(actions.toggleFinishButton(bool));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step7);
