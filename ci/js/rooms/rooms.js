/* global RoomBooker roomId assetId bookingData closedDaysData isWidget room cancelButtonListener */

var bookatron = RoomBooker;
var bookatronParams = {
    roomId: roomId,
    assetId: assetId,
    bookingData: bookingData,
    closedDaysData: closedDaysData,
    widgetMode: isWidget,
    calendarParams: {
        closedDaysData: closedDaysData,
        callbackObject: bookatron
    }
};

$(document).ready(function () {
    loadLang(['common', 'rooms']).then(function (language) {
        initiateObjects(language);
        attachEventTriggers();
        attachDeviceSpecificFormatters(language);
        requestBubbleHelpers();
        RoomBooker.hideSelectors();
        RoomBooker.showCheckIn();
        if (!mobileSite) {
            $('#hourly_booking_toggle').tooltip();
            $('[data-toggle="tooltip"]').tooltip();
            loadFancyBox();
        }
        $('.enquiries-button').click(function () {
            init_modal($(this).data('modal'));
        });
        $('input[readonly]').focus(function () {
            this.blur();
        });
    });
});

function initiateObjects(language) {
    bookatron.init(bookatronParams, language);
}

function attachEventTriggers() {
    attachToggleClick();
    attachSmoothAnchorScroll();
}

function loadFancyBox() {
    $('.fancybox').fancybox({
        tpl: {
            closeBtn: '<a title="Close" class="close fancybox-item fancybox-close" href="javascript:;"><span>×</span></a>'
        },
        maxWidth: 550,
        maxHeight: 400,
        fitToView: true,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
    $('.map-iframe').fancybox({
        tpl: {
            closeBtn: '<a title="Close" class="close fancybox-item fancybox-close" href="javascript:;"><span>×</span></a>'
        },
        maxWidth: 900,
        maxHeight: 600,
        fitToView: true,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
}

function attachToggleClick() {
    $('.toggler-offer-content').hide();
    $('.toggler-offer').click(function () {
        $(this).next('.toggler-offer-content').slideToggle(500);
    });
}

function attachDeviceSpecificFormatters(language) {
    fixMenuOnScrollHandler();
    bookingSectionRevealHandler();
    bookingSectionHideHandler(language);
}

function fixMenuOnScrollHandler() {
    $(function () {
        $(window).scroll(function () {
            handleStickyMenu($(window).scrollTop());
        });
    });
}

function handleStickyMenu(scroll) {
    var sticky = true;
    var header = $('.sticky-wrapper');
    if (scroll >= 420) {
        header.addClass('sticky-menu-room');
    } else {
        sticky = false;
        header.removeClass('sticky-menu-room');
    }
    return sticky;
}

function attachSmoothAnchorScroll() {
    $('.anchor-links-wrapper a, .location a').click(function (e) {
        e.preventDefault();
        var section = this.id.replace('_link', '');
        var position = $('#' + section).offset().top;
        if (handleStickyMenu(position)) {
            position = $('#' + section).offset().top;
        }
        $('html, body').animate(
            {
                scrollTop: position - 100
            }, 300);
        $('.anchor-links-wrapper li').removeClass('on');
        $(this).parent().parent().addClass('on');
    });
}

function requestBubbleHelpers() {
    if ($('#r-col').is(':visible')) {
        bookatron.initiateBubbleHelpers();
    }
}

function bookingSectionRevealHandler() {
    $('#add').click(function () {
        $('#dp').addClass('dp-on');
        $('#r-col').addClass('display');
        $('.back_room').addClass('display');
        $('#menubar').hide();
        $('#nav_container').hide();
        $('.filters-footer').hide();
        $('.section-middle').hide();
        bookatron.initiateBubbleHelpers();
    });
}

function bookingSectionHideHandler(language) {
    $('#back').click(function () {
        bookatron.reset(language);
        $('#dp').removeClass('dp-on');
        $('#r-col').removeClass('display');
        $('.back_room').removeClass('display');
        $('#menubar').show();
        $('#nav_container').show();
        $('.filters-footer').show();
        $('.section-middle').show();
    });
}

function init_modal(modal, formData, userData) {
    clearMainModal();
    $('#mainModal').on('shown.bs.modal', function () {
        $('#mainModal').on('hidden.bs.modal', function () {
            $('#mainModal').off('shown.bs.modal');
        });
    });
    if (modal == 'sign_in') {
        $('.modal-dialog').addClass('modal-tiny');
    } else {
        $('.modal-dialog').addClass('modal-small');
    }
    $('#modal_slide_up_content').load(base_url + country_lang_url + '/common/' + modal + '/' + roomId, function () {
        ga(function (tracker) {
            $('#ga_id').val(tracker.get('clientId'));
        });
        $('#mainModal').modal('show');
        verticallyCenterModal();
        cancelButtonListener();
        registerNeverBounceFields();
        if (modal !== 'sign_in') {
            $('.datepicker').datepicker({
                dateFormat: 'yy-mm-dd'
            });
            $.datepicker.setDefaults($.datepicker.regional[language_code]);
            attachPhoneHelper();
            if (typeof formData !== 'undefined') {
                setTimeout(function () {
                    populateEventFields(formData);
                }, 250);
            }
            if (typeof userData !== 'undefined') {
                populateUserFields(userData);
            }
            $('#send').click(function () {
                if (checkDetailFields()) {
                    if ($('#zc_user_password').length > 0) {
                        if (checkPasswordEntered()) {
                            if (checkFormData(modal)) {
                                createUser($(this));
                            } else {
                                bootstrapError('Please check the required fields and try again.', true, 3000);
                            }
                        } else {
                            addInputError($('.password-input').parent());
                            $('.password-input').change(function () {
                                removeInputError($('.password-input').parent());
                            });
                            bootstrapError('Please enter a password and password confirmation.', true, 3000);
                        }
                    } else {
                        if (checkFormData(modal)) {
                            postData($(this), collectFormData());
                        } else {
                            bootstrapError('Please check the required fields and try again.', true, 3000);
                        }
                    }
                } else {
                    bootstrapError('Please check all required fields and try again.', true, 3000);
                }
            });
            $('#sign-in').click(function () {
                signInModal(collectFormData(), modal);
            });
        }
    });
}

function populateEventFields(formData) {
    $('#eventDate').val(typeof formData.eventDate !== 'undefined' ? formData.eventDate : '');
    if ($('#eventTime').length > 0) {
        $('#eventTime').val(typeof formData.eventTime !== 'undefined' ? formData.eventTime : '');
    }
    $('#duration').val(typeof formData.duration !== 'undefined' ? formData.duration : '');
    $('#guests').val(typeof formData.guests !== 'undefined' ? formData.guests : '');
    $('#tourDate').val(typeof formData.tourDate !== 'undefined' ? formData.tourDate : '');
    $('#deskCount').val(typeof formData.deskCount !== 'undefined' ? formData.deskCount : '');
    if (typeof formData.dateFlexible !== 'undefined' && formData.dateFlexible == 1) {
        $('#flexible').prop('checked', true);
    }
    $('#message').val(typeof formData.message !== 'undefined' ? formData.message : '');
}

function populateUserFields(userData) {
    $('#zc_first_name').val(userData.first_name);
    $('#zc_last_name').val(userData.last_name);
    $('#zc_email_address').val(userData.email);
    $('#zc_user_phone_number').intlTelInput('setNumber', userData.phone_number);
}

function signInModal(formData, modal) {
    clearMainModal();
    $('#mainModal').on('shown.bs.modal', function () {
        $('#mainModal').on('hidden.bs.modal', function () {
            $('#mainModal').off('shown.bs.modal');
        });
    });
    $('.modal-dialog').addClass('modal-tiny');
    $('#modal_slide_up_content').load(base_url + country_lang_url + '/common/sign_in/', function () {
        $('#mainModal').modal('show');
        verticallyCenterModal();
        cancelButtonListener();
        $('#sign_in').click(function () {
            var userData = postSignIn();
            setTimeout(function () {
                init_modal(modal, formData, userData);
            }, 250);
        });
    });
}

function postSignIn() {
    var data = {
        zc_login_user_name: $('#zc_login_user_name').val(),
        zc_login_password: $('#zc_login_password').val()
    };
    $.post('/users/remote_signin', data, null, 'json').done(function (response) {
        if (response.error.occurred === true) {
            bootstrapError(response.error.message);
        } else {
            return response.data;
        }
    })
    .fail(function () {
        bootstrapError('Network error. Please wait a few minutes and try again. Thank you.', true, 3000);
    });
}

function checkPasswordEntered() {
    var passwordEntered = $('#zc_user_password').val() != '' ? true : false;
    var confirmPasswordEntered = $('#zc_user_password_confirmation').val() != '' ? true : false;
    return passwordEntered && confirmPasswordEntered;
}

function createUser($button) {
    var userData = {
        first_name: $('#zc_first_name').val(),
        last_name: $('#zc_last_name').val(),
        phone_number: $('#zc_user_phone_number').intlTelInput('getNumber', intlTelInputUtils.numberFormat.INTERNATIONAL),
        email: $('#zc_email_address').val(),
        password: $('#zc_user_password').val(),
        confirmpassword: $('#zc_user_password_confirmation').val(),
        ga_id: $('#ga_id').val()
    };
    userData = addNeverBounceStatusField(userData, $('input[name="nb-result"]'));
    $.post('/users/new_signup', userData, null, 'json').done(function (response) {
        if (response.error.occurred === true) {
            bootstrapError(response.error.message);
        } else {
            postData($button, collectFormData());
        }
    })
    .fail(function (response) {
        bootstrapError('Failed for some reason - ' + response.responseText + '.');
    });
}

function checkDetailFields() {
    var namePassed = checkName($('#zc_first_name').val(), $('#zc_last_name').val());
    var emailPassed = checkEmail($('#zc_email_address').val());
    var phonePassed = captureContactNumber($('#zc_user_phone_number'));
    return namePassed && emailPassed && phonePassed;
}

function checkFormData(modalType) {
    var datePassed = true;
    var timePassed = true;
    var durationPassed = true;
    var guestsPassed = true;
    var messagePassed = true;
    if (modalType == 'request_to_book')
    {
        datePassed = $('#eventDate').val() !== '';
        if (!datePassed) {
            addInputError($('#eventDate').parent());
            $('#eventDate').change(function () {
                removeInputError($('#eventDate').parent());
            });
        }
        if ($('#eventTime').length > 0) {
            timePassed = $('#eventTime').val() !== '';
            if (!timePassed) {
                addInputError($('#eventTime').parent());
                $('#eventTime').change(function () {
                    removeInputError($('#eventTime').parent());
                });
            }
        }
        durationPassed = $('#duration').val() !== '';
        if (!durationPassed) {
            addInputError($('#duration').parent());
            $('#duration').change(function () {
                removeInputError($('#duration').parent());
            });
        }
    }
    else if (modalType == 'message_host')
    {
        messagePassed = $('#message').val() !== '';
        if (!messagePassed) {
            addInputError($('#message').parent());
            $('#message').change(function () {
                removeInputError($('#message').parent());
            });
            bootstrapError('Please enter a message to the host.', true, 3000);
        }
    }
    if ($('#guests').length > 0) {
        guestsPassed = ($('#guests').val() !== '' && !isNaN($('#guests').val()));
        if (!guestsPassed) {
            addInputError($('#guests').parent());
            $('#guests').change(function () {
                removeInputError($('#guests').parent());
            });
        }
    }
    return datePassed && timePassed && durationPassed && guestsPassed && messagePassed;
}

function collectFormData() {
    var formData = {
        user_email: $('#zc_email_address').val(),
        selectedRooms: [roomId],
        description: $('#request_desc').val(),
        dateFlexible: +$('#flexible').is(':checked'),
        message: $('#message').val(),
        user_phone: $('#zc_user_phone_number').intlTelInput('getNumber', intlTelInputUtils.numberFormat.INTERNATIONAL)
    };
    if ($('#eventDate').length > 0 && $('#eventDate').val() !== '') {
        formData.eventDate = $('#eventDate').val();
    }
    if ($('#eventTime').length > 0 && typeof $('#eventTime').val() !== 'undefined') {
        formData.eventTime = $('#eventTime').val();
    }
    if (typeof $('#duration').val() !== 'undefined' && $('#duration').val() !== '') {
        formData.duration = $('#duration').val();
    }
    if (typeof $('#guests').val() !== 'undefined' && $('#guests').val() !== '') {
        formData.guests = $('#guests').val();
    }
    if ($('#tourDate').length > 0 && $('#tourDate').val() !== '') {
        formData.tourDate = $('#tourDate').val();
    }
    if ($('#deskCount').length > 0 && $('#deskCount').val() !== '0') {
        formData.deskCount = $('#deskCount').val();
    }
    return formData;
}

function postData($button, formData) {
    $button.hide();
    $('.modal-footer').prepend('<img id="loader-gif" src="/images/loading.gif" style="margin-right: 10px" />');
    $.post('/api/v1/enquiries', formData, null, 'json')
    .done(function () {
        $('#loader-gif').remove();
        closeMainModal();
        bootstrapSuccess('Successfully sent!');
    })
    .fail(function (response) {
        bootstrapError('Error: ' + response.responseJSON);
    });
}

function checkName(firstName, lastName) {
    var pass = true;
    if (firstName === '' || lastName === '') {
        addInputError($('.name-input').parent());
        $('.name-input').change(function () {
            removeInputError($('.name-input').parent());
        });
        bootstrapError('Please enter a valid first name and last name.');
        pass = false;
    }
    return pass;
}

function checkEmail(email) {
    var pass = true;
    if (email === '' || typeof email === 'undefined') {
        if (isMobileVariable) {
            $('#error-message').text('Please enter a valid email address.');
            $('#error-popup').popup('open', {
                transition: 'pop'
            });
        } else {
            addInputError($('#zc_email_address').parent());
            $('#zc_email_address').change(function () {
                removeInputError($('#zc_email_address').parent());
            });
            bootstrapError('Please enter a valid email address.', true, 3000);
        }
        pass = false;
    }
    return pass;
}

function attachPhoneHelper() {
    $('#zc_user_phone_number').intlTelInput({ initialCountry: locale_code });
    if (!$('#zc_user_phone_number').intlTelInput('isValidNumber')) {
        $('#zc_user_phone_number').intlTelInput('setCountry', locale_code);
    }
    if ($('#zc_user_phone_number').is(":hidden"))
    {
        $('.intl-tel-input').addClass('hide');
    }
}

function captureContactNumber(phoneNumber) {
    var pass = false;
    if (phoneNumber.intlTelInput('isValidNumber')) {
        pass = true;
    } else {
        var error = phoneNumber.intlTelInput('getValidationError');
        var errMsg;
        switch (error) {

            case intlTelInputUtils.validationError.IS_POSSIBLE:
                errMsg = 'Your phone number is invalid';
            break;

            case intlTelInputUtils.validationError.INVALID_COUNTRY_CODE:
                errMsg = 'Your phone number country code is invalid';
            break;

            case intlTelInputUtils.validationError.TOO_SHORT:
                errMsg = 'Your phone number is too short';
            break;

            case intlTelInputUtils.validationError.TOO_LONG:
                errMsg = 'Your phone number is too long';
            break;

            case intlTelInputUtils.validationError.NOT_A_NUMBER:
                errMsg = 'Your phone number is not a number';
            break;

            default:
                errMsg = 'Please enter a valid phone number';
            break;
        }
        addInputError($('#zc_user_phone_number').parent().parent());
        $('#zc_user_phone_number').change(function () {
            removeInputError($('#zc_user_phone_number').parent().parent());
        });
        bootstrapError(errMsg, true, 3000);
    }
    return pass;
}

function addInputError($parent) {
    $parent.addClass('has-error');
}

function removeInputError($parent) {
    $parent.removeClass('has-error');
}

function setFilters() {
    $('.browse-filter').each(function () {
        $('.' + $(this).attr('id') + '-filter-text').text($('option:selected', this).text());
    });
}

function changeFilters() {
    $('.browse-filter').change(function () {
        $('.' + $(this).attr('id') + '-filter-text').text($('option:selected', this).text());
    });
}

$(document).on('pageinit', '#book-room', function () {
    setFilters();
    changeFilters();
});
