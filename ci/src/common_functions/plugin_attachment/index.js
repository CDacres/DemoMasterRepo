/* global $ */

function attachPhoneHelper() {
    $('.zc_user_phone_number').intlTelInput({ initialCountry: locale_code });
    if (!$('.zc_user_phone_number').intlTelInput('isValidNumber')) {
        $('.zc_user_phone_number').intlTelInput('setCountry', locale_code);
    }
}

export {
    attachPhoneHelper,
};
