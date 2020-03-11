import checkoutActionTypes from './checkoutActionTypes';

const actions = {
  progress: () => ({
    type: checkoutActionTypes.PROGRESS
  }),
  userLogin: (payload) => ({
    type: checkoutActionTypes.LOGIN,
    payload
  }),
  resetPassword: (payload) => ({
    type: checkoutActionTypes.RESSET_PASSWORD_REQUEST,
    payload
  }),
  setActiveStep: value => ({
    type: checkoutActionTypes.SET_ACTIVE_STEP,
    payload: {
      value
    }
  }),
  setInitialStep: step => ({
    type: checkoutActionTypes.SET_INITIAL_STEP,
    payload: {
      step
    }
  }),
  setBookingTotal: total => ({
    type: checkoutActionTypes.SET_BOOKING_TOTAL,
    payload: {
      total
    }
  }),
  forgotPassword: () => {
    return ({
      type: checkoutActionTypes.FORGOT_PASSWORD
    });
  },
  undoForgotPassword: () => ({
    type: checkoutActionTypes.UNDO_FORGOT_PASSWORD
  }),
  setDefaultConfiguration: config_id => ({
    type: checkoutActionTypes.SET_DEFAULT_CONFIGURATION,
    payload: {
      config_id
    }
  }),
  handleAddOn: (key, value, extras) => ({
    type: checkoutActionTypes.HANDLE_ADD_ON,
    payload: {
      key,
      value,
      extras
    }
  }),
  handleAdminOverride: value => ({
    type: checkoutActionTypes.HANDLE_ADMIN_OVERRIDE,
    payload: {
      value
    }
  }),
  handleExtraFee: value => ({
    type: checkoutActionTypes.HANDLE_EXTRA_FEE,
    payload: {
      value
    }
  }),
  handleServiceRating: rating => ({
    type: checkoutActionTypes.HANDLE_SERVICE_RATING,
    payload: {
      rating
    }
  }),
  handleServiceComments: comment => ({
    type: checkoutActionTypes.HANDLE_SERVICE_COMMENTS,
    payload: {
      comment
    }
  }),
  setReservation: response => ({
    type: checkoutActionTypes.SET_RESERVATION,
    payload: {
      response
    }
  }),
  showSidebarOnMobile: () => ({
    type: checkoutActionTypes.SHOW_SIDEBAR_ON_MOBILE
  }),
  isLoggedIn: (user, is_admin) => ({
    type: checkoutActionTypes.IS_LOGGED_IN,
    payload: {
      user,
      is_admin
    }
  }),
  setInitialBookingRequest: bookingRequest => ({
    type: checkoutActionTypes.SET_INITIAL_BOOKING_REQUEST,
    payload: {
      bookingRequest
    }
  }),
  setInitialUser: user => ({
    type: checkoutActionTypes.SET_INITIAL_USER,
    payload: {
      user
    }
  }),
  setUser: user => ({
    type: checkoutActionTypes.SET_USER,
    payload: {
      user
    }
  }),
  handleChange: (key, val, stepNo) => ({
    type: checkoutActionTypes.HANDLE_CHANGE,
    payload: {
      key,
      val,
      stepNo
    }
  }),
  handlePasswordChange: password => ({
    type: checkoutActionTypes.HANDLE_PASSWORD_CHANGE,
    payload: {
      password
    }
  }),
  handleUserInputChange: (key, value) => ({
    type: checkoutActionTypes.HANDLE_USER_INPUT_CHANGE,
    payload: {
      key,
      value
    }
  }),
  handleUserPhoneInputChange: (key, value) => ({
    type: checkoutActionTypes.HANDLE_USER_PHONE_INPUT_CHANGE,
    payload: {
      key,
      value
    }
  }),
  toggleFlexible: flexible => ({
    type: checkoutActionTypes.TOGGLE_FLEXIBLE,
    payload: {
      flexible
    }
  }),
  handleVisited: step => ({
    type: checkoutActionTypes.HANDLE_VISITED,
    payload: {
      step
    }
  }),
  checkoutAsGuest: () => ({
    type: checkoutActionTypes.CHECKOUT_AS_GUEST
  }),
  undoCheckoutAsGuest: () => ({
    type: checkoutActionTypes.UNDO_CHECKOUT_AS_GUEST
  }),
  skipSaveDetails: () => ({
    type: checkoutActionTypes.SKIP_SAVE_DETAILS
  }),
  saveDetails: payload => {
    return {
      type: checkoutActionTypes.SAVE_DETAILS_REQUEST,
      payload
    };
  },
  handleFinishingCheckout: (reviewData, countryLangUrl) => ({
    type: checkoutActionTypes.REVIEW_DATA_REQUEST,
    payload: { reviewData, countryLangUrl }
  }),
  showMapModal: (showMapModal) => ({
    type: checkoutActionTypes.SHOW_MAP_MODAL,
    payload: {
      showMapModal
    }
  }),
  toggleFinishButton: (finishEnabled) => ({
    type: checkoutActionTypes.TOGGLE_FINISH_BUTTON,
    payload: {
      finishEnabled
    }
  }),
  handleFinishing: (isFinishing) => ({
    type: checkoutActionTypes.HANDLE_FINISHING,
    payload: {
      isFinishing
    }
  }),
  addOrUpdateUser: payload => ({
    type: checkoutActionTypes.ADD_OR_UPDATE_USER_REQUEST,
    payload
  }),
  saveBookingRequest: payload => ({
    type: checkoutActionTypes.SAVE_BOOKING_REQUEST,
    payload
  })
};

export default actions;
