var paymentType = null;

$('#calendar').load(scheduler());

function attachPhoneHelper()
{
    $(".zc_user_phone_number").intlTelInput({ initialCountry: locale_code });
    if (!$(".zc_user_phone_number").intlTelInput("isValidNumber"))
    {
        $(".zc_user_phone_number").intlTelInput("setCountry", locale_code);
    }
}

function scheduler()
{
    $(document).ready(function()
    {
        loadLang(['dashboard']).then(function (language) {
            var chooseDateIdString = "choose_date";
            $('#calendar').fullCalendar({
                lang: language_code,
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                resourceAreaWidth: '30%',
                scrollTime: '07:00',
                customButtons:
                {
                    datePicker:
                    {
                        text: language.dashboard.dashboard_cal_datepicker,
                        click: function()
                        {
                            attachDatePicker($(this), chooseDateIdString);
                        }
                    },
                    myPrev:
                    {
                        icon: 'left-single-arrow',
                        click: function()
                        {
                            $('#calendar').fullCalendar('prev');
                            setDatePickerDate(chooseDateIdString);
                        }
                    },
                    myNext:
                    {
                        icon: 'right-single-arrow',
                        click: function()
                        {
                            $('#calendar').fullCalendar('next');
                            setDatePickerDate(chooseDateIdString);
                        }
                    },
                    myToday:
                    {
                        text: language.dashboard.dashboard_cal_today,
                        click: function()
                        {
                            $('#calendar').fullCalendar('today');
                            setDatePickerDate(chooseDateIdString);
                        }
                    }
                },
                header: {
                    left: 'myToday myPrev,myNext, datePicker',
                    center: 'title',
                    right: ''
                },
                defaultView: 'timelineDay',
                views: {
                    timelineDay: {
                        titleFormat: 'dddd D MMMM, YYYY'
                    }
                },
                //resourceGroupField: 'company',
                resourceLabelText: language.dashboard.dashboard_cal_spaces,
//                resourceColumns: [
//                    {
//                        labelText: 'Rooms',
//                        field: 'title',
//                        width: 45
//                    },
//                    {
//                        labelText: 'Completion Steps',
//                        render: function(resource, el)
//                        {
//                            el.children().replaceWith(resource.link);
//                        },
//                        width: 40
//                    },
//                    {
//                        labelText: 'Price',
//                        field: 'price',
//                        width: 15
//                    }
//                ],
                resources: {
                    url: 'findrooms',
                    type: 'POST',
                    data: {},
                    error: function()
                    {
                        bootstrapError("There was an error while fetching venues/rooms!");
                    }
                },
                slotLabelFormat: 'HH:mm',
                selectable: true,
                selectHelper: true,
                select: function(start, end, jsEvent, view, resource)
                {
                    if (!resource.unbookable)
                    {
                        init_modal_select_action(start, end, resource);
                    }
                },
                eventLimit: true,
                events: {
                    url: 'findevents',
                    type: 'POST',
                    data: {},
                    error: function()
                    {
                        var alertData = {
                            message: "There was an error while fetching opening hours!"
                        };
                        customAlert(alertData);
                    },
                    textColor: 'black',
                    editable: false
                },
                eventRender: function(event, element)
                {
                    element.click(function()
                    {
                        init_modal_details(event);
                    });
                },
                viewRender: function(view, element)
                {
                    $('#calendar .fc-icon-down-triangle:not(:first)').each(function (i, icon)
                    {
                        //find all the triangle symbols
                        $(icon).click(); //send a click event and let FC handle it
                    });
                    $('#calendar').fullCalendar('rerenderEvents');
                }
            });
        });
    });
}

function attachDatePicker($element, id)
{
    if ($('input#' + id).length === 0)
    {
        var $input = $('<input>').attr('type', 'hidden').attr('id', id);
        $element.before($input);
        $('#' + id).datepicker({
//            dateFormat: 'dd-mm-yy',
            onSelect: function(dateText, inst)
            {
                var d = $input.datepicker("getDate");
                $('#calendar').fullCalendar('gotoDate', d);
            },
            minDate: null
        });
        $.datepicker.setDefaults($.datepicker.regional[language_code]);
        setDatePickerDate(id);
    }
    $('#' + id).datepicker('show');
}

function setDatePickerDate(id)
{
    var moment = $('#calendar').fullCalendar('getDate');
    var date = moment.format("DD-MM-YYYY");
    $('#' + id).datepicker("setDate", date);
}

function init_modal_select_action(start, end, resource)
{
    clearMainModal();
    $('.modal-dialog').addClass('modal-tiny');
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_schedule_select_action', function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        cancelButtonListener();
        selectActionListener(start, end, resource);
    });
}

function selectActionListener(start, end, resource)
{
    $('.action').each(function()
    {
        $(this).click(function()
        {
            if (this.id == 'book')
            {
                init_modal_book(start, end, resource);
            }
            else if (this.id == 'hold')
            {
                init_modal_hold(start, end, resource);
            }
            else
            {
                init_modal_block(start, end, resource);
            }
        });
    });
}

function attachJqueryDatePicker()
{
    $(".datepicker").datepicker({
        dateFormat: "dd/mm/yy"
    });
    $.datepicker.setDefaults($.datepicker.regional[language_code]);
}

function switchToBooking(start, end, resource)
{
    $('#book_instead').click(function()
    {
        init_modal_book(start, end, resource);
    });
}

function init_modal_book(start, end, resource)
{
    clearMainModal();
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_schedule_book/' + resource.asset_id, function()
    {
        verticallyCenterModal();
        registerNeverBounceFields();
        attachPhoneHelper();
        attachJqueryDatePicker();
        $('#toggler_braintree').show();
        $('#toggler_venue').hide();
        paymentToggleListener();
        populateFields(start, end);
        cancelButtonListener();
        attachAutoNamer();
        $('[data-toggle="popover"]').popover();
        $('#request_booking').click(function()
        {
            launchBookingRequest(resource);
        });
    });
}

function paymentConfirmation()
{
    bootstrapSuccess("Payment confirmed. A confirmation email has been sent.");
}

function populateFields(start, end)
{
    var startDate = start.format("DD/MM/YYYY");
    var endDate = end.format("DD/MM/YYYY");
    var startTime = start.format("HH:mm");
    var endTime = end.format("HH:mm");
    $('#zc_schedule_booking_start_date').val(startDate);
    $('#zc_schedule_booking_end_date').val(endDate);
    $('#zc_schedule_booking_start_time').val(startTime);
    $('#zc_schedule_booking_end_time').val(endTime);
}

//function init_modal_hold(start, end, resource)
//{
//  clearMainModal();
//  $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_schedule_hold' + resource.asset_id, function()
//  {
//
//    attachPhoneHelper();
//    attachJqueryDatePicker();
//    var type = 'venue';
//    $('#checkout_form_booking_payment_type_venue').is(':checked');
//    changePaymentType();
//    paymentToggleListener();
//    populateFields(start, end);
//    cancelButtonListener();
//    launchBlockRequest(start, end, resource);
//  });
//}

function init_modal_block(start, end, resource)
{
    clearMainModal();
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_schedule_block/' + resource.asset_id, function()
    {
        verticallyCenterModal();
        registerNeverBounceFields();
        attachJqueryDatePicker();
        populateFields(start, end);
        cancelButtonListener();
        switchToBooking(start, end, resource);
        $('#add_event').click(function()
        {
            launchBlockRequest(resource);
        });
    });
}

function checkBlockFields(description)
{
    return checkDescriptionField(description) && checkDates($('#zc_schedule_booking_start_date').val(), $('#zc_schedule_booking_end_date').val());
}

function checkDates(startDate, endDate)
{
    var pass = true;
    if (startDate == '' || endDate == '')
    {
        $('#Econtact_dates').show();
        $('.date_input').addClass('has-error');
        pass = false;
        $('.datepicker').change(function()
        {
            $('.date_input').removeClass('has-error');
            $('#Econtact_dates').hide();
        });
    }
    else
    {
        $('#Econtact_dates').hide();
    }
    return pass;
}

function checkDescriptionField(description)
{
    var pass = true;
    if (description === "")
    {
        $('#Edescription').show();
        $('#description_formgroup').addClass('has-error');
        pass = false;
        $('#block_description').change(function()
        {
            $('#description_formgroup').removeClass('has-error');
            $('#Edescription').hide();
        });
    }
    else
    {
        $('#Edescription').hide();
    }
    return pass;
}

function launchBlockRequest(resource)
{
    var description = $('#block_description').val();
    var start = moment($('#zc_schedule_booking_start_date').val() + " " + $('#zc_schedule_booking_start_time').val() + ":00", "DD-MM-YYYY HH:mm:ss");
    var end = moment($('#zc_schedule_booking_end_date').val() + " " + $('#zc_schedule_booking_end_time').val() + ":00", "DD-MM-YYYY HH:mm:ss");
    var eventData = {
        title: description,
        start: start,
        end: end,
        resourceId: resource.id,
        asset_id: resource.asset_id
    };
    var data = {
        title: description,
        start: start.format('YYYY-MM-DD HH:mm:ss'),
        end: end.format('YYYY-MM-DD HH:mm:ss'),
        asset_id: resource.asset_id
    };
    if (checkBlockFields(description))
    {
        disableBlock();
        submitBlockRequest(eventData, data);
    }
    else
    {
        enableBlock();
        bootstrapError('Something went wrong - please check all required fields and try again. Thank you.');
    }
}

function disableBlock()
{
    $('#add_event').prop("disabled", true);
    $('body').css('cursor', 'wait');
    $('.modal-footer').prepend('<div id="loader-wrapper"><img src="/images/loading.gif"></div>');
}

function enableBlock()
{
    $('#add_event').val('Try Again!').prop("disabled", false);
    $('body').css('cursor', 'default');
    $('#loader-wrapper').remove();
}

function submitBlockRequest(eventData, data)
{
    $.post(base_url + country_lang_url + "/dashboard/insertevent", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
            enableBlock();
        }
        else
        {
            eventData.id=response.data.id;
            closeMainModal();
            enableBlock();
            $('#calendar').fullCalendar('renderEvent', eventData, true);
        }
    }).fail(function(response)
    {
        bootstrapError("Failed for some reason - " + response.error.message + ".");
        enableBlock();
    });
    $('#calendar').fullCalendar('unselect');
}

function init_modal_details(event)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function ()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_reservation_details/' + event.id, function()
    {
        $('.modal-dialog').addClass('modal-small');
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_reservation_modal_listeners(event.id);
    });
}
