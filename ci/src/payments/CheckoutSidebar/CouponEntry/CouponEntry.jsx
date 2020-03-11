
import React from 'react';
import { provideState, injectState, softUpdate } from 'freactal';

const wrapComponentWithState = provideState({
    initialState: () => ({
        showCouponEntry: false
    }),
    effects: {
        handleCoupon: softUpdate(state => ({ showCouponEntry: !state.showCouponEntry }))
    }
});

const CouponEntry = wrapComponentWithState(injectState(({ state, effects }) => {
    const { showCouponEntry } = state;
    const { handleCoupon } = effects;
    if (showCouponEntry) {
        return (
            <td colSpan="2" className="summaryCardBillingTableTdLast row">
                <div>
                    <form>
                        <div
                            className="col-sm-6 col-md-12 col-lg-6 space-md-1 summaryCardCouponCodeField"
                        >
                            <input
                                type="text"
                                className="summaryCardCouponFormInput"
                                placeholder="Coupon code"
                            />
                        </div>
                        <div
                            className="col-sm-6 col-md-12 col-lg-6 space-md-1 summaryCardApplyCouponButtonContainer"
                        >
                            <button
                                type="submit"
                                className="btn btn-block summaryCardApplyCouponButton"
                                data-prevent-default="true"
                            >
                                <span>Apply Coupon</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div
                    className="col-sm-4 pull-right summaryCardCancelCouponButton"
                >
                    <a data-prevent-default="true" href="#" onClick={handleCoupon}>
                        <span>Cancel</span>
                    </a>
                </div>
            </td>
        );
    }
    return (
        <td colSpan="2" className="summaryCardBillingTableTdLast">
            <div className="text-left">
                <a data-prevent-default="true" href="#" onClick={handleCoupon}>
                    <span>Coupon</span>
                </a>
            </div>
        </td>
    );
}));

export default CouponEntry;
