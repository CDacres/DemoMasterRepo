function init_enquiry_audit($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_enquiry_audit/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
    });
}