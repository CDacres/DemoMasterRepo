$(document).ready(function()
{
    changeSelectors();
    attachJqueryDatePicker();
    postTable();
});

function postTable()
{
    var data = {
        start: $("#zc_start").val(),
        duration: $("#zc_duration").val()
    };
    $('#performance').empty();
    $('#performance').append('<img src="/images/loading.gif">');
    $.post(base_url + "administrator/backend/update_daily_tables", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#performance').empty();
            $('#performance').append(response.data.html);
        }
    }).fail(function()
    {
        bootstrapError("Failed at the performance table update stage.");
    });
}

function changeSelectors()
{
    $("#zc_start, #zc_duration").change(function()
    {
        postTable();
    });
}

function attachJqueryDatePicker()
{
    $.datepicker.setDefaults($.datepicker.regional[language_code]);
    $('#zc_start').datepicker({
        dateFormat: "yy-mm-dd",
        minDate: null
    });
}