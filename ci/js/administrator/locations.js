$(document).ready(function()
{
    attachModals();
    updateLocationFields();
});

function attachModals()
{
    $(".zc_view_location_btn").each(function()
    {
        $(this).click(function()
        {
            init_edit_location($(this)); //From modal/location_details.js
        });
    });
    $("#zc_add_location_btn").click(function()
    {
        init_add_location($(this)); //From modal/location_details.js
    });
}

function updateLocationFields()
{
    $('.zc_crawl').change(function()
    {
        var data = {
            in_sitemap: +$(this).is(':checked'),
            id: $(this).val()
        };
        locationFieldsAPI(data);
    });
}

function locationFieldsAPI(data)
{
    $.ajax({
        url: base_url + "api/v1/locations",
        data: data,
        dataType: "json",
        type: "PUT",
        statusCode: {
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            error: function()
            {
                bootstrapError("There was a general error while updating the field.");
            }
        });
    });
}
