
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

class FlexibleTable extends Component {
    componentDidMount() {
        const { handleVisited } = this.props;
        handleVisited(4);
    }

    render() {
        const { cancelPrice, currencySymbol, lang, flex, handleRadioChange, price } = this.props;
        return (
            <div className="reactFlexTable">
                <div className="flexibleTable">
                    <div className="row">
                        <div className="col-sm-6">
                            <p className="flexibleTitlePush">
                                <b>{lang.payments.payments_index_form_flexible_table_heading}</b>
                            </p>
                            <div className="textTitleContainer">
                                <p className="labelText">
                                    {lang.payments.payments_index_form_flexible_cancel}
                                    <span
                                        className="questionIcon"
                                        data-tip={lang.payments.payments_index_form_flexible_cancel_tooltip}
                                    >?</span>
                                </p>
                                <p className="labelText">
                                    {lang.payments.payments_index_form_flexible_amendments}
                                </p>
                                <p className="labelText">
                                    {lang.payments.payments_index_form_flexible_priority}
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-4 fadedPackage">
                            <p
                                className="packageTitle"
                            >
                                {lang.payments.payments_index_form_flexible_non_refundable}
                            </p>
                            <p
                                className="priceText"
                                dangerouslySetInnerHTML={{ __html: `${currencySymbol}${price}` }}
                            />
                            <p className="fadedP">
                                <i className="fa fa-times-circle faIcon" aria-hidden="true" />
                            </p>
                            <p className="fadedP">
                                <i className="fa fa-times-circle faIcon" aria-hidden="true" />
                            </p>
                            <p className="fadedP">
                                <i className="fa fa-times-circle faIcon" aria-hidden="true" />
                            </p>
                            <div className="paymentTypeInputContainer">
                                <label
                                    className="paymentTypeInputLabel"
                                    htmlFor="braintree-payment"
                                >
                                    <input
                                        id="not_flexible"
                                        type="radio"
                                        name="flexible"
                                        checked={!flex}
                                        value={false}
                                        className="paymentTypeInput"
                                        onChange={handleRadioChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-2 recommendedPackage">
                            <p className="packageTitle">
                                <b>{lang.payments.payments_index_form_flexible_flexible}</b>
                            </p>
                            <p
                                className="priceText"
                                dangerouslySetInnerHTML={{ __html: `${currencySymbol}${cancelPrice}` }}
                            />
                            <p className="checkP">
                                <i className="fa fa-check-circle faIcon" aria-hidden="true" />
                            </p>
                            <p className="checkP">
                                <i className="fa fa-check-circle faIcon" aria-hidden="true" />
                            </p>
                            <p className="checkP">
                                <i className="fa fa-check-circle faIcon" aria-hidden="true" />
                            </p>
                            <div className="paymentTypeInputContainer">
                                <label
                                    className="paymentTypeInputLabel"
                                    htmlFor="braintree-payment"
                                >
                                    <input
                                        id="flexible"
                                        type="radio"
                                        name="flexible"
                                        checked={flex}
                                        value
                                        className="paymentTypeInput"
                                        onChange={handleRadioChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactTooltip
                    place="right"
                />
            </div>
        );
    }
};

FlexibleTable.propTypes = {
    cancelPrice: PropTypes.string.isRequired,
    currencySymbol: PropTypes.string.isRequired,
    flex: PropTypes.bool.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired
};

export default FlexibleTable;
