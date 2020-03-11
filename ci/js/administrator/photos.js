$(document).ready(function()
{
    attach_edit_image_modals();
    updateImageFields();
});

function attach_edit_image_modals()
{
    $(".zc_view_image_btn").each(function()
    {
        $(this).click(function()
        {
            init_edit_image($(this)); //From modal/image.js
        });
    });
}

function updateImageFields()
{
    $('.zc_image_flagged').change(function()
    {
        var data = {
            flagged: +$(this).is(':checked'),
            asset_id: $(this).attr('zc_asset_id'),
            id: $(this).attr('zc_object_id')
        };
        imageFieldsAPI(data);
    });
    $('.zc_image_cosmetic').change(function()
    {
        var data = {
            cosmetic: +$(this).is(':checked'),
            asset_id: $(this).attr('zc_asset_id'),
            id: $(this).attr('zc_object_id')
        };
        imageFieldsAPI(data);
    });
    $('.zc_image_configuration').change(function()
    {
        var data = {
            configuration_id: $(this).val(),
            asset_id: $(this).attr('zc_asset_id'),
            id: $(this).attr('zc_object_id')
        };
        imageFieldsAPI(data);
    });
}

function imageFieldsAPI(data)
{
    $.ajax({
        url: base_url + "api/v1/images",
        data: data,
        dataType: "json",
        type: "PUT",
        statusCode: {
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("There was a general error while updating the field.");
        }
    });
}
