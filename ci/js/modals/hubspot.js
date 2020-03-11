function init_hubspot_contact($object)
{
    clearFullDimensionModal();
    $("#full_dimension_modal").on("shown.bs.modal", function()
    {
        $("#full_dimension_modal").on("hidden.bs.modal", function()
        {
            $("#full_dimension_modal").off("shown.bs.modal");
        });
    });
    $("#full_dimension_modal_content").load(base_url + country_lang_url + '/common_protected/modal_hubspot_contact/' + $object.data("hubspot-id") + '/' + $object.data("hubspot-interaction"), function()
    {
        $("#full_dimension_modal").modal('show');
        verticallyCenterModal();
    });
}