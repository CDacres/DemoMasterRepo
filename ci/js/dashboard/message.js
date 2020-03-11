$(document).ready(function()
{
   $("#zc_message_submit").click(function()
   {
        var data = {
            receiving_user_id: $("#zc_message_data").attr('receiving_user_id'),
            message: $("#zc_message_text").val(),
            sending_user_id: $("#zc_message_data").attr('sending_user_id'),
            is_conversation: $("#zc_message_data").attr('is_conversation'),
            reservation_id: $("#zc_message_data").attr('reservation_id'),
            message_type: $("#zc_message_data").attr('message_type')
        };
        $.post(base_url + country_lang_url + "/api_json/Message",data,null,"json"
        ).done(function(response)
        {
            if (response.error.occurred == true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                location.reload();
            }
        }).fail(function(response)
        {
            bootstrapError("Failed for some reason - " + response.error.message + ".");
        });
    });
});