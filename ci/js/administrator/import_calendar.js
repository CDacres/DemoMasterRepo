function attach_room_chooser()
{
    $('#choose_room').click(function()
    {
        $.get(base_url + country_lang_url + "/api_json/Room_Skeleton/" + $('#room_choice').val(), null, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred == true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                show_file_loader(response.data.title, response.data.asset_id);
            }
        }).fail(function()
        {
            bootstrapError("Failed at choosing the room.");
        });
    });
}

function show_file_loader(asset_title, asset_id)
{
    $('#room_name').html(asset_title);
    $('#asset_id').val(asset_id);
    $('#room_confirmation').show();
}

function attach_file_chooser()
{
    $('#upload_file').change(function()
    {
        var formData = new FormData();
        formData.append("zc_calendar_import", $("#upload_file")[0].files[0]);
        formData.append("asset_id", $('#asset_id').val());
        $.ajax({
            url: base_url + country_lang_url + "/api_json/Import_Calendar/",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            type: "POST",
            success: function(response)
            {
                if (response.error.occurred == true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    location.reload();
                }
            },
            error: function()
            {
                bootstrapError("Failed at the file upload stage.");
            }
        });
    });
}

$(document).ready(function()
{
    attach_room_chooser();
    attach_file_chooser();
});