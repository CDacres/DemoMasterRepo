
import React from 'react';
import PropTypes from 'prop-types';

const ServiceRating = ({
    handleComments,
    handleRating,
    lang,
    selectedRating,
    showTextarea
}) => {
    return (
        <div className="reactServiceRating">
            <div className="serviceRatingGridContainer">
                {showTextarea &&
                    <div className="serviceRatingComments">
                        <textarea onChange={handleComments} />
                    </div>
                }
                <div className="serviceRatingQuestion">
                    <p>{lang.payments.payments_service_rating_how_likely}</p>
                </div>
                <div className="serviceRatingScore">
                    <label
                        className="serviceRatingQuestionLabel"
                    >{
                        lang.payments.payments_service_rating_not_at_all
                    }</label>
                    <ul className="serviceRatingUl">
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="0"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 0 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >0</li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                            className="serviceRatingAnchor"
                        >
                            <li
                                id="1"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 1 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >1</li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="2"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 2 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >2</li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="3"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 3 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >3</li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="4"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 4 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >4
                            </li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="5"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 5 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >5
                            </li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="6"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 6 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >6</li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="7"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 7 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >7</li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="8"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 8 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >8</li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="9"
                                className={
                                    `serviceRatingLi${Number(selectedRating) === 9 ?
                                        ' ratingSelected' :
                                        ''}`
                                }
                            >9</li>
                        </a>
                        <a
                            className="serviceRatingAnchor"
                            href="#"
                            onClick={handleRating}
                        >
                            <li
                                id="10"
                                className={
                                    `serviceRatingLi serviceRatingLiLast${
                                        Number(selectedRating) === 10 ?
                                        ' ratingSelected' :
                                        ''
                                    }`
                                }
                            >10</li>
                        </a>
                    </ul>
                    <label className="serviceRatingQuestionLabel">{
                        lang.payments.payments_service_rating_extremely
                    }</label>
                </div>
            </div>
        </div>
    );
};

ServiceRating.propTypes = {
    handleComments: PropTypes.func.isRequired,
    handleRating: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    selectedRating: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    showTextarea: PropTypes.bool.isRequired
};

export default ServiceRating;
