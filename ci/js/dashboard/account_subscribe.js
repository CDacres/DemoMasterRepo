$(document).ready(function()
{
    $("#zc_subscribe_submit").click(function()
    {
        disableButton();
        var data = {
            id: user.id,
            marketing_subscribed: +$('#zc_subscribe').is(':checked')
        };
        $.ajax({
            url: base_url + "api/v1/users/subscribe",
            data: data,
            dataType: "json",
            type: "PUT",
            statusCode: {
                200: function() {
                    $('#success').removeClass('hide');
                    enableButton(false);
                },
                400: function(err) {
                    enableButton(true);
                    bootstrapError(err.responseJSON);
                },
                401: function(err) {
                    enableButton(true);
                    bootstrapError(err.responseJSON);
                },
                405: function(err) {
                    enableButton(true);
                    bootstrapError(err.responseJSON);
                }
            }
        });
    });
});

function disableButton()
{
    $('#zc_subscribe_submit').hide();
    $('#zc_subscribe_submit').prop('disabled', true);
    $('html').css('cursor', 'wait');
    if ($('#loader').length)
    {
        $('#loader').show();
    }
    else
    {
        $('.panel-footer').append('<img id="loader" src="/images/loading.gif">');
    }
}

function enableButton(error)
{
    if (error)
    {
        $('#zc_subscribe_submit').val('Try Again!');
    }
    $('#zc_subscribe_submit').show();
    $('#loader').hide();
    $('#zc_subscribe_submit').prop('disabled', false);
    $('html').css('cursor', 'default');
}