$(document).ready(function()
{
    update_month_pay_period();
    updateInvoiceTable();
});

function attachModals()
{
    $(".zc_reservation_audit").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_reservation_audit($(this)); //From modal/reservation_audit.js
        });
    });
    $(".zc_inv_fin_ent").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_fin_entity($(this)); //From modal/invoices.js
        });
    });
    $(".zc_financial_data_fin_ent").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_fin_entity_financial_data($(this)); //From modal/invoices.js
        });
    });
    attach_contact_modals();
}

function updateInvoiceTable(type = 'to_pay_GBP')
{
    var data = {
        period_id: $("#zc_payment_periods").val(),
        type: type
    };
    $('#zc_invoice_table').empty();
    $('#zc_payout_table').empty();
    $('#zc_invoice_table').append('<img src="/images/loading.gif">');
    $.post(base_url + "administrator/payouts/update_invoice_table", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#zc_invoice_table').empty();
            $('#zc_invoice_table').append(response.data.html);
            $('#zc_payout_table').empty();
            $('#zc_payout_table').append(response.data.payout_html);
            toggle_entity_reservations();
            attachModals();
            set_admin_table_widths();
            $(window).scroll(sticky_admin_tables);
            updateInvoices();
            view_invoice_click();
        }
    }).fail(function()
    {
        bootstrapError("Failed at the invoice table update stage.");
    });
}

function update_month_pay_period()
{
    $("#zc_payment_periods").change(function()
    {
        updateInvoiceTable();
    });
}

function toggle_entity_reservations()
{
    $(".zc_entity").click(function()
    {
        var entity_id = $(this).data('id');
        $(".zc_entity_reservations").each(function()
        {
            if ($(this).data('entity') == entity_id)
            {
                if ($(this).is(':hidden'))
                {
                    $(this).show();
                }
                else
                {
                    $(this).hide();
                }
            }
        });
    });
}

function updateInvoices()
{
    $('.zc_invoice_notes_edit').click(function()
    {
        var entity_id = $(this).data('entity');
        var country = $(this).data('country');
        $('.zc_invoice_notes').each(function()
        {
            if (entity_id == $(this).data('entity') && country == $(this).data('country'))
            {
                var $textarea = $("<textarea>", {
                    val: $(this).text()
                });
                $textarea.addClass("zc_invoice_notes");
                $textarea.attr('data-entity', entity_id);
                $textarea.attr('data-country', country);
                $textarea.attr('data-oldtext', $(this).text());
                $(this).replaceWith($textarea);
                $textarea.focus();
            }
        });
        $('.zc_invoice_notes_save, .zc_invoice_notes_cancel').each(function()
        {
            if (entity_id == $(this).data('entity') && country == $(this).data('country'))
            {
                $(this).show();
            }
        });
        $(this).hide();
    });
    $('.zc_invoice_notes_save').click(function()
    {
        var period_id = $(this).data('period');
        var entity_id = $(this).data('entity');
        var country = $(this).data('country');
        $('.zc_invoice_notes').each(function()
        {
            if (entity_id == $(this).data('entity') && country == $(this).data('country'))
            {
                var $span = $("<span>", {
                    text: $(this).val()
                });
                $span.addClass("zc_invoice_notes");
                $span.attr('data-entity', entity_id);
                $span.attr('data-country', country);
                $(this).replaceWith($span);
                var data = {
                    period_id: period_id,
                    entity_id: entity_id,
                    country_code: country,
                    notes: $(this).val()
                };
                $.ajax({
                    url: base_url + "api/v1/invoicenotes",
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
        });
        $('.zc_invoice_notes_edit').each(function()
        {
            if (entity_id == $(this).data('entity') && country == $(this).data('country'))
            {
                $(this).show();
            }
        });
        $('.zc_invoice_notes_cancel').each(function()
        {
            if (entity_id == $(this).data('entity') && country == $(this).data('country'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
    $('.zc_invoice_notes_cancel').click(function()
    {
        var entity_id = $(this).data('entity');
        var country = $(this).data('country');
        $('.zc_invoice_notes').each(function()
        {
            if (entity_id == $(this).data('entity') && country == $(this).data('country'))
            {
                var $span = $("<span>", {
                    text: $(this).data('oldtext')
                });
                $span.addClass("zc_invoice_notes");
                $span.attr('data-entity', entity_id);
                $span.attr('data-country', country);
                $(this).replaceWith($span);
            }
        });
        $('.zc_invoice_notes_edit').each(function()
        {
            if (entity_id == $(this).data('entity') && country == $(this).data('country'))
            {
                $(this).show();
            }
        });
        $('.zc_invoice_notes_save').each(function()
        {
            if (entity_id == $(this).data('entity') && country == $(this).data('country'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
    $('.zc_invoice_paid').click(function()
    {
        var data = {
            period_id: $(this).data('period'),
            entity_id: $(this).data('entity'),
            country_code: $(this).data('country')
        };
        var type = $(this).data('type');
        $.ajax({
            url: base_url + "api/v1/reservations/paid",
            data: data,
            dataType: "json",
            type: "POST",
            statusCode: {
                201: function() {
                    updateInvoiceTable(type);
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
    $('#zc_all_btn').click(function()
    {
        updateInvoiceTable('all');
    });
    $('#zc_attention_btn').click(function()
    {
        updateInvoiceTable('attention');
    });
    $('#zc_to_pay_EUR_btn').click(function()
    {
        updateInvoiceTable('to_pay_EUR');
    });
    $('#zc_to_pay_GBP_btn').click(function()
    {
        updateInvoiceTable();
    });
    $('#zc_to_pay_USD_btn').click(function()
    {
        updateInvoiceTable('to_pay_USD');
    });
    $('#zc_paid_btn').click(function()
    {
        updateInvoiceTable('paid');
    });
}

function view_invoice_click()
{
    $('.zc_view_invoice').click(function()
    {
        var myWindow = window.open('', '_blank', 'width=800, height=500');
        var data = {
            period_id: $("#zc_payment_periods").val(),
            entity_id: $(this).data('entity'),
            country: $(this).data('country'),
            language: language_code
        };
        $.post(base_url + "administrator/payouts/view_invoice", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                myWindow.document.write(response.data.html);
                myWindow.document.title = response.data.invoice_save_as;
                myWindow.print();
            }
        }).fail(function()
        {
            bootstrapError("Failed at the invoice table update stage.");
        });
    });
}
