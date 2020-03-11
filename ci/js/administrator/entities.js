$(document).ready(function()
{
    updateEntityFields();
});

function updateEntityFields()
{
    $('.zc_entity_user_edit').click(function()
    {
        var entity_id = $(this).data('id');
        $('.zc_entity_user_save, .zc_entity_user_enc, .zc_entity_user_cancel').each(function()
        {
            if (entity_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $(this).hide();
    });
    $('.zc_entity_user_save').click(function()
    {
        var entity_id = $(this).data('id');
        $('.zc_entity_user').each(function()
        {
            if (entity_id == $(this).data('id'))
            {
                var data = {
                    account_user: $(this).val(),
                    id: entity_id
                };
                entityFieldsAPI(data, true);
            }
        });
        $('.zc_entity_user_edit').each(function()
        {
            if (entity_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_entity_user_enc, .zc_entity_user_cancel').each(function()
        {
            if (entity_id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
    $('.zc_entity_user_cancel').click(function()
    {
        var entity_id = $(this).data('id');
        $('.zc_entity_user_edit').each(function()
        {
            if (entity_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_entity_user_enc, .zc_entity_user_save').each(function()
        {
            if (entity_id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
    $(".zc_financial_data_fin_ent").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_financial_data($(this)); //From modal/entities.js
        });
    });
}

function entityFieldsAPI(data, reload = false)
{
    $.ajax({
        url: base_url + "api/v1/entities",
        data: data,
        dataType: "json",
        type: "PUT",
        statusCode: {
            200: function() {
                if (reload)
                {
                    location.reload();
                }
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
