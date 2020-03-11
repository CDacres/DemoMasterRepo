
const IS_BROWSER = typeof window === 'object';

const initialState = {
    activeStep: 1,
    bookingRequest: IS_BROWSER ? window.__props__.bookingRequest : {},
    extraFee: 0,
    flexibleFee: 0,
    showMobileSidebar: false,
    step: {
        1: {
            visited: false,
            complete: true,
            password: ''
        },
        2: {
            visited: false,
            complete: true,
            configuration: {},
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
            requestResponse: {},
            serviceRating: {
                comment: '',
                rating: 5,
                showTextarea: false
            },
            showMapModal: false
        }
    },
    user: IS_BROWSER ? {
        isGuest: false,
        ...window.__props__.user
    } : {
        isGuest: false
    }
};

export default initialState;
