$(document).ready(function()
{
    roomSelector();
    replyClickListener();
});

function roomSelector()
{
    $(".zc_room_list").click(function()
    {
        var data = {};
        if ($(this).attr('zc_object_id'))
        {
            data.asset_id = $(this).attr('zc_object_id');
        }
        else
        {
            data.option = $(this).attr('filter_type');
        }
        $.post(base_url + country_lang_url + "/dashboard/update_room_reviews_list", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                $('#zc_review_list').empty();
                $('#zc_review_list').append(response.data.html);
                $('#zc_room_option_btn').contents().first().replaceWith(response.data.buttonText);
                setRatingStars();
                replyClickListener();
            }
        }).fail(function()
        {
            bootstrapError('Failed at the room list update stage.');
        });
    });
}

function replyClickListener()
{
    $('.review_reply').click(function()
    {
        init_modal_reply($(this).attr('zc_review_id'));
    });
}

function init_modal_reply(reviewId)
{
    clearMainModal();
    $('.modal-dialog').addClass('modal-small');
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_review_reply', function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        replyToReviewListener(reviewId);
        cancelButtonListener();
    });
}

function replyToReviewListener(reviewId)
{
    $('#reply_to_review').click(function()
    {
        var scopeThis = $(this);
        disableModalButton(scopeThis);
        var errorMessage = '';
        if ($("#review_reply").val() == '')
        {
            errorMessage = "the reply is filled in";
        }
        if (errorMessage == '')
        {
            var data = {
                author_id: $("#review_reply").attr('author_id'),
                review_id: reviewId,
                reply: $("#review_reply").val()
            };
            $.post(base_url + country_lang_url + "/api_json/Review_Reply", data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred == true)
                {
                    enableModalButton(scopeThis);
                    bootstrapError(response.error.message);
                }
                else
                {
                    bootstrapSuccess("Reply successfully sent!");
                    closeMainModal();
                    setTimeout(function()
                    {
                        location.reload();
                    }, 2000);
                }
            }).fail(function()
            {
                enableModalButton(scopeThis);
                bootstrapError('failed for some reason');
            });
        }
        else
        {
            enableModalButton(scopeThis);
            bootstrapError('Please ensure ' + errorMessage + '.');
        }
    });
}
