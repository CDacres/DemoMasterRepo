function init_fin_entity($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_invoice_financial_entity/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_fin_ent_modal_listeners($object.data("id"));
        cancelButtonListener();
    });
}

function init_fin_entity_financial_data($object)
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
        activate_fin_ent_fin_data_modal_listeners($object.data("id"));
        cancelButtonListener();
    });
}

function activate_fin_ent_modal_listeners(reservationId)
{
    $('.fin_ent_select_add').click(function()
    {
        if ($('#choose_fin_ent').is(':checked'))
        {
            $('#choose_fin_ent_details').show();
        }
        else
        {
            $('#choose_fin_ent_details').hide();
        }
        if ($('#add_fin_ent').is(':checked'))
        {
            $('#add_fin_ent_details').show();
        }
        else
        {
            $('#add_fin_ent_details').hide();
        }
    });
    $("#assign_fin_entity").click(function()
    {
        getAssignData(reservationId);
    });
}

function getAssignData(reservationId)
{
    var data = {
        reservation_id: reservationId
    };
    var postData;
    if (($("#zc_financial_entity_name").val() == "" && $("#zc_financial_entity_id").val() == "") || ($("#zc_financial_entity_name").val() != "" && $("#zc_financial_entity_id").val() != ""))
    {
        bootstrapError("Please ensure either a new name exists or an option is selected from the list.");
    }
    else
    {
        data.message = "Are you sure you want to assign this financial entity to the reservations' venue?";
        if ($("#zc_financial_entity_name").val() != "")
        {
            postData = {
                new_name: $("#zc_financial_entity_name").val(),
                account_code: $("#zc_account_code").val(),
                sort_routing_code: $("#zc_sort_code").val(),
                iban: $("#zc_iban").val(),
                bic: $("#zc_bic").val()
            };
        }
        else if ($("#zc_financial_entity_id").val() != "")
        {
            postData = {
                existing_fin_id: $("#zc_financial_entity_id").val()
            };
        }
        data.post_data = postData;
        init_modal_confirm(data, make_assign);
    }
}

function make_assign(data)
{
    $.ajax({
        url: '/' + country_lang_url + '/api_json/Financial_Entity_Assign/' + data.reservation_id,
        data: data.post_data,
        dataType: 'json',
        type: 'POST',
        success: function(response)
        {
            if (response.error.occurred === false)
            {
                enableModalButton(data.button);
                closeMainModal();
                updateInvoiceTable('attention');
            }
            else
            {
                enableModalButton(data.button);
                bootstrapError(response.error.message);
            }
        },
        error: function(response)
        {
            bootstrapError("Something went wrong - " + response);
            enableModalButton(data.button);
        }
    });
}

function activate_fin_ent_fin_data_modal_listeners(entityId)
{
    $("#fin_entity_add_fin_data").click(function()
    {
        entityFieldsAPI(entityId);
    });
}

function entityFieldsAPI(entity_id)
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
                updateInvoiceTable('attention');
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
