
const actions = {
    progress: () => ({
        type: 'PROGRESS'
    }),
    setActiveStep: value => ({
        type: 'SET_ACTIVE_STEP',
        payload: {
            value
        }
    }),
    setInitialStep: step => ({
        type: 'SET_INITIAL_STEP',
        payload: {
            step
        }
    }),
    setBookingTotal: total => ({
        type: 'SET_BOOKING_TOTAL',
        payload: {
            total
        }
    }),
    setFlexValue: flexible_price => ({
        type: 'SET_FLEXIBLE_VALUE',
        payload: {
            flexible_price
        }
    }),
    forgotPassword: () => ({
        type: 'FORGOT_PASSWORD'
    }),
    undoForgotPassword: () => ({
        type: 'UNDO_FORGOT_PASSWORD'
    }),
    setDefaultConfiguration: config_id => ({
        type: 'SET_DEFAULT_CONFIGURATION',
        payload: {
            config_id
        }
    }),
    handleAddOn: (key, value, extras) => ({
        type: 'HANDLE_ADD_ON',
        payload: {
            key,
            value,
            extras
        }
    }),
    handleAdminOverride: value => ({
        type: 'HANDLE_ADMIN_OVERRIDE',
        payload: {
            value
        }
    }),
    handleServiceRating: rating => ({
        type: 'HANDLE_SERVICE_RATING',
        payload: {
            rating
        }
    }),
    handleServiceComments: comment => ({
        type: 'HANDLE_SERVICE_COMMENTS',
        payload: {
            comment
        }
    }),
    setReservation: response => ({
        type: 'SET_RESERVATION',
        payload: {
            response
        }
    }),
    showSidebarOnMobile: () => ({
        type: 'SHOW_SIDEBAR_ON_MOBILE'
    }),
    isLoggedIn: (user, is_admin) => ({
        type: 'IS_LOGGED_IN',
        payload: {
            user,
            is_admin
        }
    }),
    setInitialBookingRequest: bookingRequest => ({
        type: 'SET_INITIAL_BOOKING_REQUEST',
        payload: {
            bookingRequest
        }
    }),
    setInitialUser: user => ({
        type: 'SET_INITIAL_USER',
        payload: {
            user
        }
    }),
    setUser: user => ({
        type: 'SET_USER',
        payload: {
            user
        }
    }),
    handleChange: (key, value, stepNo) => ({
        type: 'HANDLE_CHANGE',
        payload: {
            key,
            value,
            stepNo
        }
    }),
    handlePasswordChange: password => ({
        type: 'HANDLE_PASSWORD_CHANGE',
        payload: {
            password
        }
    }),
    handleUserInputChange: (key, value) => ({
        type: 'HANDLE_USER_INPUT_CHANGE',
        payload: {
            key,
            value
        }
    }),
    handleUserPhoneInputChange: (key, value) => ({
        type: 'HANDLE_USER_PHONE_INPUT_CHANGE',
        payload: {
            key,
            value
        }
    }),
    toggleFlexible: flexible => ({
        type: 'TOGGLE_FLEXIBLE',
        payload: {
            flexible
        }
    }),
    handleVisited: step => ({
        type: 'HANDLE_VISITED',
        payload: {
            step
        }
    }),
    checkoutAsGuest: () => ({
        type: 'CHECKOUT_AS_GUEST'
    }),
    undoCheckoutAsGuest: () => ({
        type: 'UNDO_CHECKOUT_AS_GUEST'
    }),
    skipSaveDetails: () => ({
        type: 'SKIP_SAVE_DETAILS'
    }),
    showMapModal: (showMapModal) => ({
        type: 'SHOW_MAP_MODAL',
        payload: {
            showMapModal
        }
    }),
    toggleFinishButton: (finishEnabled) => ({
        type: 'TOGGLE_FINISH_BUTTON',
        payload: {
            finishEnabled
        }
    }),
    handleFinishing: (isFinishing) => ({
        type: 'HANDLE_FINISHING',
        payload: {
            isFinishing
        }
    })
};

export default actions;
