$(document).ready(function()
{
    setReviewStars();
    submitReview();
});

function setReviewStars()
{
    $('.hover-star1').rating({
        required: {}
    });
    $('.hover-star2').rating({
        required: {}
    });
    $('.hover-star3').rating({
        required: {}
    });
    $('.hover-star4').rating({
        required: {}
    });
    $('.hover-star5').rating({
        required: {}
    });
    $('.hover-star6').rating({
        required: {}
    });
}

function submitReview()
{
    $("#zc_review_submit").click(function()
    {
        var errorMessage = '';
        if ($("#zc_review_public").val() == '')
        {
            errorMessage = "the public review is filled in";
        }
        if (errorMessage == '')
        {
            var data = {
                subject_id: $("#zc_review_data").attr('subject_id'),
                author_id: $("#zc_review_data").attr('author_id'),
                reservation_id: $("#zc_review_data").attr('reservation_id'),
                review: nl2br($("#zc_review_public").val()),
                feedback: nl2br($("#zc_review_private").val())
            };
            $(".zc_review_rating_auditor").each(function()
            {
                var ratingType = $(this).attr('zc_rating_type');
                var value = $("[name='" + ratingType + "']:checked").val();
                if (typeof value === "undefined")
                {
                    errorMessage = "you have rated the room for " + ratingType;
                    return false;
                }
                data[ratingType] = value;
            });
        }
        if (errorMessage === '')
        {
            $.post(base_url + country_lang_url + "/api_json/Review", data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred == true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    location.reload();
                }
            }).fail(function()
            {
                bootstrapError('failed for some reason');
            });
        }
        else
        {
            bootstrapError('Please ensure ' + errorMessage + '.');
        }
   });
}