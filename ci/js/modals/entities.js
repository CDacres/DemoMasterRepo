function init_financial_data($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_financial_entity_fin_data/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_fin_data_modal_listeners($object.data("id"));
        cancelButtonListener();
    });
}

function activate_fin_data_modal_listeners(entityId)
{
    $("#fin_entity_add_fin_data").click(function()
    {
        modalEntityFieldsAPI(entityId);
    });
}

function modalEntityFieldsAPI(entity_id)
{
    var data = {
        id: entity_id,
        account_code: $("#zc_account_code").val(),
        sort_routing_code: $("#zc_sort_code").val(),
        iban: $("#zc_iban").val(),
        bic: $("#zc_bic").val()
    };
    $.ajax({
        url: base_url + "api/v1/entities",
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
}
