$(document).ready(function()
{
    $('#close_past_pending').click(function()
    {
        $.ajax({
            url: base_url + "api/v1/enquiries/closepastpending",
            dataType: "json",
            type: "PUT",
            statusCode: {
                200: function() {
                    location.reload();
                },
                403: function(err) {
                    bootstrapError(err.responseJSON);
                }
            },
            error: function()
            {
                bootstrapError("There was a general error while updating the enquiries.");
            }
        });
    });
    $('.resend_enquiry_email').click(function()
    {
        var data = {
            message: 'Are you sure you want to resend the enquiry email?',
            enquiry_id: $(this).data('enquiry-id')
        };
        init_modal_confirm(data, resend_enquiry_email);
    });
});

function resend_enquiry_email(data)
{
    var postData = {
        enquiry_id: data.enquiry_id
    };
    $.post(base_url + 'messages/resend_enquiry_email', postData, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
            enableModalButton(data.button);
        }
        else
        {
            enableModalButton(data.button);
            closeMainModal();
            bootstrapSuccess('Emails sent successfully (as long as venue is set to agree to list and the receiving email is not a zipcube email).');
        }
    }).fail(function()
    {
        bootstrapError('Failed at resending the email.');
    });
}