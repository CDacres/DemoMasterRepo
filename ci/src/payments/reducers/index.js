
import { clone } from 'ramda';

import { validateUserInfo } from '../Checkout/Step1/methods';

const IS_BROWSER = typeof window === 'object';

const initialState = {
    activeStep: 1,
    bookingRequest: {},
    extraFee: 0,
    flexibleFee: 0,
    showMobileSidebar: false,
    step: {
        1: {
            visited: true,
            complete: false,
            forgotPassword: false,
            password: ''
        },
        2: {
            visited: false,
            complete: true,
            configuration: '',
            comments: ''
        },
        3: {
            visited: false,
            complete: true,
            addOns: {}
        },
        4: {
            visited: false,
            complete: true,
            flexible: 'true'
        },
        5: {
            visited: false,
            complete: false,
            paymentType: 'braintree',
            credit_card_number: '',
            credit_card_name: '',
            credit_card_cvv: '',
            credit_card_expiry_month: '01',
            credit_card_expiry_year: new Date().getFullYear(),
            isCompleting: false
        },
        6: {
            complete: false,
            skipped: false,
            password: '',
            password_confirmation: ''
        },
        7: {
            finishEnabled: false,
            isFinishing: false,
            requestResponse: {},
            serviceRating: {
                comment: '',
                rating: 11,
                showTextarea: false
            },
            showMapModal: false
        }
    },
    user: IS_BROWSER ? {
        ...window.__props__.user,
        isGuest: false
    } : {
        email: '',
        first_name: '',
        id: '',
        is_admin: false,
        is_logged_in: false,
        isGuest: false,
        last_name: '',
        phone_number: ''
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'PROGRESS': {
        return ({
            ...state,
            activeStep: state.activeStep + 1
        });
    }
    case 'SET_ACTIVE_STEP': {
        const { value } = action.payload;
        return ({
            ...state,
            activeStep: value
        });
    }
    case 'SET_INITIAL_STEP': {
        const { step } = action.payload;
        return ({
            ...state,
            step
        });
    }
    case 'HANDLE_CHANGE': {
        const { key, value, stepNo } = action.payload;
        const step = clone(state.step);
        if (typeof stepNo !== 'undefined') {
            step[stepNo][key] = value;
        } else {
            step[state.activeStep][key] = value;
        }
        return ({
            ...state,
            step
        });
    }
    case 'IS_LOGGED_IN': {
        const { user, is_admin } = action.payload;
        user.is_logged_in = true;
        user.is_admin = is_admin;
        user.isGuest = false;
        const validationArr = validateUserInfo(user);
        const step = clone(state.step);
        let activeStep = clone(state.activeStep);
        if (validationArr.length) {
            activeStep = 1;
            validationArr.map(error => bootstrapError(error.message));
        } else {
            activeStep = 2;
            step[1].complete = true;
        }
        return ({
            ...state,
            activeStep,
            step,
            user
        });
    }
    case 'SET_INITIAL_USER': {
        const { user } = action.payload;
        return ({
            ...state,
            user: {
                ...state.user,
                ...user
            }
        });
    }
    case 'SET_USER': {
        const { user } = action.payload;
        const userInfo = clone(state.user);
        userInfo.id = user.id;
        userInfo.email = user.email;
        userInfo.phone_number = user.phone_number;
        userInfo.first_name = user.first_name;
        userInfo.last_name = user.last_name;
        userInfo.token = user.token;
        userInfo.isGuest = user.isGuest;
        return ({
            ...state,
            user: userInfo
        });
    }
    case 'FORGOT_PASSWORD': {
        return ({
            ...state,
            step: {
                ...state.step,
                [1]: {
                    ...state.step[1],
                    forgotPassword: true
                }
            }
        });
    }
    case 'UNDO_FORGOT_PASSWORD': {
        return ({
            ...state,
            step: {
                ...state.step,
                [1]: {
                    ...state.step[1],
                    forgotPassword: false
                }
            }
        });
    }
    case 'SET_DEFAULT_CONFIGURATION': {
        const { config_id } = action.payload;
        return ({
            ...state,
            step: {
                ...state.step,
                [2]: {
                    ...state.step[2],
                    configuration: config_id
                }
            }
        });
    }
    case 'HANDLE_PASSWORD_CHANGE': {
        const { password } = action.payload;
        return ({
            ...state,
            step: {
                ...state.step,
                [1]: {
                    ...state.step[1],
                    password
                }
            }
        });
    }
    case 'HANDLE_USER_INPUT_CHANGE': {
        const { key, value } = action.payload;
        const user = {
            ...state.user,
            [key]: value
        };
        const validationArr = validateUserInfo(user);
        const step = clone(state.step);
        if (validationArr.length) {
            step[state.activeStep].complete = false;
        } else {
            step[state.activeStep].complete = true;
        }
        return ({
            ...state,
            step,
            user
        });
    }
    case 'HANDLE_USER_PHONE_INPUT_CHANGE': {
        const { key, value } = action.payload;
        return ({
            ...state,
            user: {
                ...state.user,
                [key]: value
            }
        });
    }
    case 'TOGGLE_FLEXIBLE': {
        const { flexible } = action.payload;
        return ({
            ...state,
            step: {
                ...state.step,
                [4]: {
                    ...state.step[4],
                    flexible
                }
            }
        });
    }
    case 'HANDLE_VISITED': {
        const { step } = action.payload;
        return ({
            ...state,
            step: {
                ...state.step,
                [step]: {
                    ...state.step[step],
                    visited: true
                }
            }
        });
    }
    case 'CHECKOUT_AS_GUEST': {
        return ({
            ...state,
            user: {
                ...state.user,
                isGuest: true
            }
        });
    }
    case 'UNDO_CHECKOUT_AS_GUEST': {
        return ({
            ...state,
            user: {
                ...state.user,
                isGuest: false
            }
        });
    }
    case 'SKIP_SAVE_DETAILS': {
        return ({
            ...state,
            step: {
                ...state.step,
                [6]: {
                    ...[6],
                    complete: true,
                    skipped: true
                }
            }
        });
    }
    case 'SHOW_SIDEBAR_ON_MOBILE': {
        return ({
            ...state,
            showMobileSidebar: !state.showMobileSidebar
        });
    }
    case 'SET_INITIAL_BOOKING_REQUEST': {
        const { bookingRequest } = action.payload;
        return ({
            ...state,
            bookingRequest
        });
    }
    case 'SET_BOOKING_TOTAL': {
        const { total } = action.payload;
        return ({
            ...state,
            bookingRequest: {
                ...state.bookingRequest,
                total
            }
        });
    }
    case 'SET_FLEXIBLE_VALUE': {
        const { flexible_price } = action.payload;
        return ({
            ...state,
            bookingRequest: {
                ...state.bookingRequest,
                flexible_price
            }
        });
    }
    case 'HANDLE_ADD_ON': {
        const { key, value, extras } = action.payload;
        const step3 = clone(state.step[3]);
        if (Number(value) > 0) {
            const extraInfo = JSON.parse(extras);
            step3.addOns[key] = {};
            step3.addOns[key].id = key;
            step3.addOns[key].desc = extraInfo.desc;
            step3.addOns[key].quantity = value;
            if (typeof extraInfo.cost !== 'undefined') {
                step3.addOns[key].price = extraInfo.cost;
            } else {
                step3.addOns[key].price = null;
            }
        } else {
            delete step3.addOns[key];
        }
        return ({
            ...state,
            step: {
                ...state.step,
                [3]: step3
            }
        });
    }
    case 'HANDLE_ADMIN_OVERRIDE': {
        const { value } = action.payload;
        return ({
            ...state,
            bookingRequest: {
                ...state.bookingRequest,
                total: value
            }
        });
    }
    case 'HANDLE_SERVICE_RATING': {
        const { rating } = action.payload;
        return ({
            ...state,
            step: {
                ...state.step,
                [7]: {
                    ...state.step[7],
                    serviceRating: {
                        ...state.step[7].serviceRating,
                        rating,
                        showTextarea: true
                    }
                }
            }
        });
    }
    case 'HANDLE_SERVICE_COMMENTS': {
        const { comment } = action.payload;
        return ({
            ...state,
            step: {
                ...state.step,
                [7]: {
                    ...state.step[7],
                    serviceRating: {
                        ...state.step[7].serviceRating,
                        comment
                    }
                }
            }
        });
    }
    case 'SET_RESERVATION': {
        const { response } = action.payload;
        const step = clone(state.step);
        let activeStep = 6;
        step[5].complete = true;
        if (state.user.is_logged_in) {
            step[6].complete = true;
            activeStep = 7;
        }
        step[7].requestResponse = response;
        return ({
            ...state,
            activeStep,
            step
        });
    }
    case 'SHOW_MAP_MODAL': {
        const { showMapModal } = action.payload;
        return ({
            ...state,
            step: {
                ...state.step,
                [7]: {
                    ...state.step[7],
                    showMapModal
                }
            }
        });
    }
    case 'TOGGLE_FINISH_BUTTON': {
        const { finishEnabled } = action.payload;
        return ({
            ...state,
            step: {
                ...state.step,
                [7]: {
                    ...state.step[7],
                    finishEnabled
                }
            }
        });
    }
    case 'HANDLE_FINISHING': {
        const { isFinishing } = action.payload;
        return ({
            ...state,
            step: {
                ...state.step,
                [7]: {
                    ...state.step[7],
                    isFinishing
                }
            }
        });
    }
    default:
        return state;
    }
};

export default rootReducer;

