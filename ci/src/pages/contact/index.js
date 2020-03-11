/* global $ */

import { errorNotification, successNotification } from 'CommonFunctions';

function contactForm() {
    const form = $('#submit_message_form');
    const validator = $('#submit_message_form').validate({
        rules: {
            name: 'required',
            email: {
                required: true,
                email: true,
            },
            message: 'required',
        },
    });
    form.submit((e) => {
        if (form.valid()) {
            e.preventDefault();
            if (validator.form()) {
                $.ajax({
                    type: 'POST',
                    url: base_url + country_lang_url + '/contact',
                    data: form.serialize(),
                })
                .done((res) => {
                    if (res.error) {
                        return errorNotification(res.error);
                    }
                    form[0].reset();
                    return successNotification('Your message was successfully sent.');
                })
                .fail(console.log);
            }
        }
    });
}

export default contactForm;
