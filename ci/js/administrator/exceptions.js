$(document).ready(function()
{
    affectExceptionTables();
});

function affectExceptionTables()
{
    $(".exception_table_display").click(function()
    {
        var affectedTable = $(this).data('id');
        if ($("#" + affectedTable + "_rows").length)
        {
            if ($(this).attr('visibility') == 'hidden')
            {
                $(this).attr('visibility', 'shown');
                $("#" + affectedTable + "_rows").show();
            }
            else
            {
                $(this).attr('visibility', 'hidden');
                $("#" + affectedTable + "_rows").hide();
            }
        }
    });
}