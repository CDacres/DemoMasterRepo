function init_reservation_audit($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_reservation_audit/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
    });
}

function init_reservation_messages($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_reservation_messages/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
    });
}

function init_reservation_payment_audit($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_reservation_payment_audit/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
    });
}