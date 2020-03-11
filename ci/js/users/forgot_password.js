$(document).ready(function()
{
    $("#submit_email").click(function()
    {
        $('#button-container').hide();
        $('#loader-container').show();
        var email = $('#email_address').val();
        if (typeof email !== 'undefined' && email !== null && email !== '')
        {
            var data = {
                email: email
            };
            $.post(base_url + "users/forgot_password", data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    $('#button-container').show();
                    $('#loader-container').hide();
                    bootstrapError('Request failed: ' + response.error.message);
                }
                else
                {
                    $('#button-container').show();
                    $('#loader-container').hide();
                    $('#email_address').val('');
                    bootstrapSuccess(response.error.message);
                }
            }).fail(function(response)
            {
                $('#button-container').show();
                $('#loader-container').hide();
                bootstrapError('Request failed: ' + response);
            });
        }
        else
        {
            $('#button-container').show();
            $('#loader-container').hide();
            bootstrapError('Please enter an email.');
        }
    });
});