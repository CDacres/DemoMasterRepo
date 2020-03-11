function init_edit_image($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_image_edit_details/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_image_modal_listeners($object.data("id"), $object.data("asset-id"));
        cancelButtonListener();
    });
}

function activate_image_modal_listeners(imageId, assetId)
{
    $("#edit_image").click(function()
    {
        var data = {
            comments: $("#zc_image_comments").val(),
            asset_id: assetId,
            id: imageId
        };
        $.ajax({
            url: base_url + "api/v1/images",
            data: data,
            dataType: "json",
            type: "PUT",
            statusCode: {
                200: function() {
                    closeMainModal();
                    location.reload();
                },
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
    });
}
