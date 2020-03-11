$(document).on("mobileinit", function()
{
    $.mobile.toolbar.prototype.options.addBackBtn = true;
});

$(document).ready(function()
{
    $('a').click(function()
    {
        // console.log("Click");
        // $.mobile.navigate('#rooms-page');
        // $(document).on('pagebeforeshow', '#rooms-page', function(e, data)
        // {
        //     alert("My name is " + data.prevPage.find($(this)).attr('data-id'));
        // });
    });
});
