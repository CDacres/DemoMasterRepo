/* global $ */

function clearErrorNotification() {
    if ($('#bootstrap_error')) {
        $('#bootstrap_error').remove();
    }
}

function clearSuccessNotification() {
    if ($('#bootstrap_success')) {
        $('#bootstrap_success').remove();
    }
}

function errorNotification(message, fade, speed) {
    clearErrorNotification();
    $('body').css('cursor', 'default')
    .prepend('<div id="bootstrap_error" class="alert error-message" role="alert" style="display: none;"><a href="#" class="close-alert" data-dismiss="alert" aria-label="close">&times;</a><div id="error_message"></div></div>');
    $('#error_message').text(message);
    $('.error-message').toggleClass('alert-danger').show();
    if (fade) {
        setTimeout(() => {
            $('#error-message').remove();
            $('.error-message').fadeOut();
        }, speed);
    }
}

function successNotification(message) {
    clearSuccessNotification();
    $('body').css('cursor', 'default')
    .prepend('<div id="bootstrap_success" class="alert success-message" role="alert" style="display: none;"><a href="#" class="close-alert" data-dismiss="alert" aria-label="close">&times;</a><div id="success_message"></div></div>');
    $('#success_message').text(message);
    $('.success-message').toggleClass('alert-success').show();
    setTimeout(() => {
        $('#success_message').remove();
        $('.success-message').fadeOut();
    }, 5000);
}

export {
    clearErrorNotification,
    clearSuccessNotification,
    errorNotification,
    successNotification,
};
