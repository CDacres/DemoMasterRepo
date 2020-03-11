import { createSelector } from 'reselect';

const addOnsTotal = (addOns) => {
    let totalExtras = 0;
    for (const addOn in addOns) {
        totalExtras += (Number(addOns[addOn].quantity) * Number(addOns[addOn].price));
    }
    return totalExtras;
};

const getAddOns = ({ step }) => step[3];
const getBookingRequest = ({ bookingRequest }) => bookingRequest;

export const getBookingTotal = createSelector(
    [ getBookingRequest ],
    (bookingRequest) => `${bookingRequest.total}`
);

export const getFinalBookingTotal = createSelector(
    [ getAddOns, getBookingRequest ],
    (step, bookingRequest) => {
        let total = Number(bookingRequest.total);
        total += Number(addOnsTotal(step.addOns));
        return `${
            bookingRequest.currency_symbol_left
        }${
            Number(total).toFixed(2)
        }${
            bookingRequest.currency_symbol_right
        }`;
    }
);

export const getAddOnsTotal = createSelector(
    [ getAddOns ],
    (step) => {
        let total = 0;
        total += Number(addOnsTotal(step.addOns));
        return total;
    }
);

export const getFlexiblePrice = createSelector(
    [ getBookingRequest ],
    (bookingRequest) => Number(bookingRequest.flexible_price)
);

export const getGivenPrice = createSelector(
    [ getAddOns, getBookingRequest ],
    (step, bookingRequest) => {
        let total = Number(bookingRequest.total);
        total += Number(addOnsTotal(step.addOns));
        return total;
    }
);