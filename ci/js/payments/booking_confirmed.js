$(document).ready(function()
{
    // addAttendee();
    reformatAddOns();
    loadMapModal();
    setTagCookie();
    // mixpanel.track("Booking Confirmed Page");
});

var awaitingServerResponse = false;

function reformatAddOns()
{
    var addons = $('#addons').val();
    if (!!addons)
    {
        var splitAddons = addons.trim().split(';').filter(function(value)
        {
            return value !== '';
        });
        $.each(splitAddons, function(index, value)
        {
            $('#addons_list').append('<li>' + value + '</li>');
        });
    }
}

function loadMapModal()
{
    $('#google_map').click(function()
    {
        var lat = $(this).data("lat");
        var long = $(this).data("long");
        $('#map_modal_content').html('<iframe id="mapIframe" src="//maps.google.com/maps?q=loc:' + lat + '+' + long + '&z=15&output=embed" width="100%" height="100%" frameborder="0"></iframe>');
    });
}

function setTagCookie()
{
    if (typeof $.cookie('user_reservation_ids') != 'undefined')
    {
        var cvalue = '';
        var resArr = $.cookie('user_reservation_ids').split(',');
        if (resArr.indexOf(zc_reservation_id) === -1)
        {
            var cvalue = ',' + zc_reservation_id;
        }
        $.cookie('user_reservation_ids', $.cookie('user_reservation_ids') + cvalue, { expires: 365, path: '/' });
    }
    else
    {
        $.cookie('user_reservation_ids', zc_reservation_id, { expires: 365, path: '/' });
    }
}


// function addAttendee()
// {
//   var i = 2;
//   var attendeeInputs =
//   '<div class="form-group col-lg-5 col-md-3 col-sm-3 col-xs-12 left-padding right-padding">' +
//     '<input id="attendee_' + i + '_name" class="attendee_invite_input" type="text" name="Name" class="name" placeholder="Name">' +
//   '</div>' +
//   '<div class="form-group col-lg-5 col-md-3 col-sm-3 col-xs-12 right-padding">' +
//     '<input id="attendee_' + i + '_email" class="attendee_invite_input" type="text" name="email" class="login-email required" placeholder="Email address">' +
//   '</div>';
//
//   $('#add_attendee').click(function()
//   {
//     $('#attendee_invite_form').append(attendeeInputs);
//     i++;
//   });
// }

// function getAttendeesDetails()
// {
//   var data = {};
//
//   $('.attendee_invite_input').map(function()
//   {
//     console.log(this.id);
//   });
// }
//
// function sendInvitation()
// {
//     awaitingServerResponse = true;
//     var scopeThis = this;
//     $.post(base_url + "booking-confirmed/send-invitation", getAttendeesDetails(), null, "json"
//     ).done(function(response)
//     {
//         $('body').css('cursor', 'default');
//         if (response.error.occurred === true)
//         {
//             scopeThis.modalAlert(response.error.message);
//             scopeThis.enableBooking();
//         }
//         else
//         {
//             scopeThis.modalSuccess(response.data);
//             scopeThis.fireGoogleAnalytics();
//         }
//     }).fail(function(error)
//     {
//         scopeThis.modalAlert(error.responseText);
//     }).always(function()
//     {
//         scopeThis.awaitingServerResponse = false;
//     });
// }
