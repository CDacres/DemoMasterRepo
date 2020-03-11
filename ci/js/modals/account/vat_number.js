function init_modal_vat_number()
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_add_vat_number', function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
    });
}