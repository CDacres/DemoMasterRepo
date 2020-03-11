import axios from 'axios';
import qs from 'qs';
import { clone } from 'ramda';

const attachPhoneHelper = () => {
    $('.zc_user_phone_number').intlTelInput({ initialCountry: locale_code });
    if (!$('.zc_user_phone_number').intlTelInput('isValidNumber')) {
        $('.zc_user_phone_number').intlTelInput('setCountry', locale_code);
    }
};

const saveUserDetails = (user) => {
    return new Promise((resolve, reject) => {
        const userInfo = clone(user);
        userInfo.phone_number = $('#phone_number').intlTelInput(
            'getNumber', intlTelInputUtils.numberFormat.INTERNATIONAL
        );
        let method = 'post';
        let url = '/api/v1/users/adduser';
        if (userInfo.is_logged_in) {
            method = 'put';
            url = '/api/v1/users';
            delete userInfo.email;
        } else {
            delete userInfo.id;
        }
        delete userInfo.is_admin;
        delete userInfo.is_logged_in;
        delete userInfo.isGuest;
        axios({
            method,
            url,
            data: qs.stringify(userInfo),
            validateStatus: (status) => {
                return status;
            }
        })
        .then((response) => {
            if (response.status !== 200) {
                resolve({
                    error: {
                        occurred: true,
                        message: response.data
                    }
                });
            } else {
                resolve({
                    data: response.data,
                    error: {
                        occurred: false
                    }
                });
            }
        })
        .catch(reject);
    });
};

const validateUserField = (field, value) => {
    let validation;
    if (field === 'first_name' || field === 'last_name') {
        validation = nameValidation(field, value);
    } else if (field === 'email') {
        validation = emailValidation(value);
    } else if (field === 'phone_number') {
        validation = phoneValidation(value);
    }
    return validation;
};

const validateUserInfo = (user) => {
    const validationArray = [];
    for (const field in user) {
        if (field !== 'id' && field !== 'is_admin' && field !== 'token' &&
        field !== 'is_logged_in' && field !== 'isGuest' && field !== 'password') {
            let validation = {
                pass: false,
                message: ''
            };
            if (field === 'first_name' || field === 'last_name') {
                validation = nameValidation(field, user[field]);
            } else if (field === 'email') {
                validation = emailValidation(user[field]);
            } else if (field === 'phone_number') {
                validation = phoneValidation(user[field]);
            }
            if (!validation.pass) {
                validationArray.push(validation);
            }
        }
    }
    return validationArray;
};

const splitFieldForMessage = (field) => {
    return field.split('_').join(' ');
};

const nameValidation = (field, value) => {
    const validation = {
        pass: true,
        message: ''
    };
    if (value === '') {
        validation.pass = false;
        validation.message = `Please enter your ${splitFieldForMessage(field)}`;
    }
    return validation;
};

const emailValidation = (value) => {
    const validation = {
        pass: true,
        message: ''
    };
    const emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
    if (value === '' || !emailReg.test(value.toLowerCase())) {
        validation.pass = false;
        validation.message = 'Please enter a valid email address';
    }
    return validation;
};

const phoneValidation = (value) => {
    const validation = {
        pass: true,
        message: ''
    };
    if (value === '' || value === null || typeof value === 'undefined') {
        validation.pass = false;
        validation.message = 'Please enter a valid phone number';
    }
    if (!$('#phone_number').intlTelInput('isValidNumber')) {
        const error = $('#phone_number').intlTelInput('getValidationError');
        let errMsg;
        switch (error) {
        case intlTelInputUtils.validationError.IS_POSSIBLE:
            errMsg = 'Your phone number is invalid';
            break;
        case intlTelInputUtils.validationError.INVALID_COUNTRY_CODE:
            errMsg = 'Your country code is invalid';
            break;
        case intlTelInputUtils.validationError.TOO_SHORT:
            errMsg = 'Your phone number is too short';
            break;
        case intlTelInputUtils.validationError.TOO_LONG:
            errMsg = 'Your phone number is too long';
            break;
        default:
            errMsg = 'Please enter a valid phone number';
            break;
        }
        validation.pass = false;
        validation.message = errMsg;
    }
    return validation;
};

const postUserData = (user) => {
    axios.post('/api/v1/users', qs.stringify(user))
    .catch(error => {
        throw new Error(error);
    });
};

export {
    attachPhoneHelper,
    saveUserDetails,
    validateUserField,
    validateUserInfo
};
