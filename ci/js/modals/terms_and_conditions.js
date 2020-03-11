$(document).ready(function()
{
    $("#terms-and-conditions-anchor").click(function()
    {
        init_modal_terms();
    });
});

function init_modal_terms()
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common/modal_terms', function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
    });
}