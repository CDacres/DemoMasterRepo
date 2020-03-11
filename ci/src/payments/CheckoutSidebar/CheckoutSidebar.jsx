import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import shortid from 'shortid';

import actions from '../actions';
import { getBookingTotal, getGivenPrice, getFinalBookingTotal, getAddOnsTotal, getFlexiblePrice } from '../selectors';

const CheckoutSidebar = ({
    addOnsTotal,
    adminOverride,
    address,
    bookingRequest,
    extraFee,
    flexibleFee,
    finalBookingTotal,
    bookingTotal,
    hideTotal,
    lang,
    room,
    showMobileSidebar,
    showSidebar,
    step,
    user
}) => {
    const ratingStars = [];
    for (let i = 0; i < Number(room.review_score); i += 1) {
        ratingStars.push(
            <span key={shortid.generate()}>
                <i
                    className="icon fa fa-star"
                    aria-hidden="true"
                />
            </span>
        );
    }
    const showSidebarOnMobile = () => showSidebar();
    const handleAdminOverride = (event) => {
        adminOverride(event.target.value);
    };
    let venueDetails = null;
    if (step[5].complete)
    {
        venueDetails = <div><div>{room.venue_name}</div><div>{address}</div></div>;
    }
    else
    {
        venueDetails = <div className="underlined" data-tip={lang.payments.payments_address_tooltip}>{address}</div>;
    }
    return (
        <div className="reactCheckoutSidebar">
            <div className="summary-card col-center">
                <div
                    className="background-cover summaryCardListingImage"
                    style={{ backgroundImage: `url(${room.image_medium})` }}
                />
                <div className="panel summaryCardPanel">
                    <div className="panel-body summaryCardPanelBodyFirst">
                        <div className="summaryCardTextLarge">{room.title}</div>
                        <div className={`${!showMobileSidebar ? 'hide-sm ' : ''}text-muted`}>
                            {
                                Number(room.review_count_wrangled) > 0 ?
                                <ul className="list-layout">
                                    <li className="summaryCardListItem">
                                        <small>
                                            <div className="starRatingWrapper">
                                                <div className="star-rating">
                                                    <div className="starRatingForeground">
                                                        <span>
                                                            {ratingStars}
                                                        </span>
                                                    </div>
                                                    <div className="background">
                                                        <span>
                                                            <span>
                                                                <i
                                                                    className="icon fa fa-star"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                            <span>
                                                                <i
                                                                    className="icon fa fa-star"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                            <span>
                                                                <i
                                                                    className="icon fa fa-star"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                            <span>
                                                                <i
                                                                    className="icon fa fa-star"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                            <span>
                                                                <i
                                                                    className="icon fa fa-star"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </small>
                                    </li>
                                    <li
                                        className="summaryCardListItem summaryCardReviewCount"
                                    >
                                        <span>{room.review_count_wrangled}</span>
                                    </li>
                                </ul> : null
                            }
                            {venueDetails}
                        </div>
                    </div>
                    <div
                        className={
                            `panel-body summaryCardPanelBody ${!showMobileSidebar ?
                                ' hide-sm' :
                                ''
                            }`
                        }
                    >
                        <div className="row row-condensed">
                            <div className="col-sm-5">
                                <div className="text-muted space-bottom-2">
                                    <span>
                                        {lang.payments.payments_index_sidebar_booking_details_checkin}
                                    </span>
                                </div>
                                {bookingRequest.checkin}
                            </div>
                            <div className="col-sm-2 summaryCardCheckinIconWrapper">
                                <i
                                    className="fa fa-chevron-right summaryCardCheckinIcon"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="col-sm-5">
                                <div className="text-muted space-bottom-2">
                                    <span>
                                        {lang.payments.payments_index_sidebar_booking_details_checkout}
                                    </span>
                                </div>
                                {bookingRequest.checkout}
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            `panel-body summaryCardPanelBody ${!showMobileSidebar ?
                                ' hide-sm ' :
                                ''
                            }`
                        }
                    >
                        <table className="sdfsdf summaryCardBillingTable">
                            <tbody>
                                <tr>
                                    <th className="summaryCardBillingTableTh">
                                        <span className="summaryCardBillingTableText">
                                            {lang.payments.payments_index_sidebar_booking_details_property_id}
                                        </span>
                                    </th>
                                    <td className="summaryCardBillingTableTd">
                                        <span className="summaryCardBillingTableText">
                                            {room.id}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="summaryCardBillingTableTh">
                                        <span className="summaryCardBillingTableText">
                                            {lang.payments.payments_index_sidebar_booking_details_guests}
                                        </span>
                                    </th>
                                    <td className="summaryCardBillingTableTd">
                                        <span className="summaryCardBillingTableText">
                                            {bookingRequest.guests_wrangled}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="summaryCardBillingTableTh">
                                        <span className="summaryCardBillingTableText">
                                            {lang.common.common_duration}
                                        </span>
                                    </th>
                                    <td className="summaryCardBillingTableTd">
                                        <span className="summaryCardBillingTableText">
                                            {bookingRequest.duration}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {user && user.is_admin && !step[5].complete ?
                        <div
                            className={
                                `panel-body summaryCardPanelBody ${!showMobileSidebar ?
                                    ' hide-sm' :
                                    ''
                                }`
                            }
                        >
                            <table className="summaryCardBillingTable">
                                <tbody>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                Transaction (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />) (inc VAT)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput"
                                                value={bookingTotal}
                                                onChange={handleAdminOverride}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                - Extra Fee (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />) (inc VAT)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={extraFee}
                                                readOnly={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                - Flexible Fee (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />) (inc VAT)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={flexibleFee}
                                                readOnly={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                - Add Ons (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />) (inc VAT)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={addOnsTotal}
                                                readOnly={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td>
                                            <hr />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                = Display Price (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />) (inc VAT)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={0}
                                                readOnly={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                - Price Control Fee (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />) (inc VAT)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={0}
                                                readOnly={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td>
                                            <hr />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                = Base Venue Price (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />) (inc VAT)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={0}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                + Add Ons (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />) (inc VAT)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={addOnsTotal}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td>
                                            <hr />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                = Commissionable Amount (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={0}
                                                readOnly={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                - Commission
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={0}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={0}
                                                readOnly={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td>
                                            <hr />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                = Payout (<span dangerouslySetInnerHTML={{__html: bookingRequest.currency_symbol_left}} />) (inc VAT)
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <input
                                                type="text"
                                                className="summaryCardAdminInput form-control"
                                                value={0}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="summaryCardBillingTableTh">
                                            <span className="summaryCardBillingTableText">
                                                {lang.payments.payments_index_sidebar_admin_total}
                                            </span>
                                        </th>
                                        <td className="summaryCardBillingTableTdLast">
                                            <span className="summaryCardBillingTableText">
                                                <div>
                                                    <span
                                                        dangerouslySetInnerHTML={
                                                            { __html: finalBookingTotal }
                                                        }
                                                    />
                                                </div>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        :!hideTotal ?
                            <div
                                className={
                                    `panel-body summaryCardPanelBody ${!showMobileSidebar ?
                                        ' hide-sm' :
                                        ''
                                    }`
                                }
                            >
                                <table className="summaryCardBillingTable">
                                    <tbody>
                                        <tr>
                                            <th className="summaryCardBillingTableTh">
                                                <span className="summaryCardBillingTableText">
                                                    Total (inc VAT)
                                                </span>
                                            </th>
                                            <td className="summaryCardBillingTableTdLast">
                                                <span className="summaryCardBillingTableText">
                                                    <div>
                                                        <span
                                                            dangerouslySetInnerHTML={
                                                                { __html: finalBookingTotal }
                                                            }
                                                        />
                                                    </div>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        :null
                    }
                    <div
                        className={
                            `panel-body summaryCardPanelBody text-center${
                            !showMobileSidebar ?
                                ' show-sm' :
                                ''
                            }`
                        }
                    >
                        <a
                            href="#"
                            onClick={showSidebarOnMobile}
                        >
                            <span>{
                                !showMobileSidebar ?
                                    lang.payments.payments_pricing_booking_summary :
                                    lang.common.common_hide
                            }</span>
                        </a>
                    </div>
                </div>
            </div>
            <ReactTooltip place="right" />
        </div>
    );
};

CheckoutSidebar.propTypes = {
    addOnsTotal: PropTypes.number.isRequired,
    adminOverride: PropTypes.func.isRequired,
    address: PropTypes.string,
    applyExtraFee: PropTypes.func.isRequired,
    bookingRequest: PropTypes.object.isRequired,
    bookingTotal: PropTypes.number.isRequired,
    extraFee: PropTypes.number.isRequired,
    flexibleFee: PropTypes.number.isRequired,
    finalBookingTotal: PropTypes.string.isRequired,
    hideTotal: PropTypes.bool,
    lang: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
    showMobileSidebar: PropTypes.bool.isRequired,
    showSidebar: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    extraFee: state.extraFee,
    flexibleFee: getFlexiblePrice(state),
    showMobileSidebar: state.showMobileSidebar,
    step: state.step,
    user: state.user,
    bookingTotal: getGivenPrice(state),
    finalBookingTotal: getFinalBookingTotal(state),
    addOnsTotal: getAddOnsTotal(state)
});

const mapDispatchToProps = dispatch => {
    return {
        adminOverride: (value) => {
            dispatch(actions.handleAdminOverride(value));
        },
        showSidebar: () => {
            dispatch(actions.showSidebarOnMobile());
        },
        showMapModal: (bool) => {
            dispatch(actions.handleChange('showMapModal', bool));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSidebar);
