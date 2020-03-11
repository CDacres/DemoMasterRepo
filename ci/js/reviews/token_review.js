$(document).ready(function()
{
    loadLang(['reviews']).then(function (language) {
        setReviewStars();
        submitReview();
        toggleFormInputs(language);
    });
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

function toggleFormInputs(language)
{
    if (hasReservation)
    {
        $('.rating-container:first-child').show();
    }
    $('#room_select').change(function()
    {
        $(this).parent().parent().next().fadeIn();
    });
    $('.zc_review_rating_holder').change(function()
    {
        $(this).parent().parent().next().fadeIn();
    });
    $('#zc_review_public').keypress(function()
    {
        $('.write-review-container').next().fadeIn();
        $('.write-review-container').next().next().fadeIn();
    });
    $('#add-feedback-link').click(function()
    {
        $('#feedback-text-area').toggleClass('hide');
        var text = $('#add-feedback-link').text();
        $('#add-feedback-link').text($('#add-feedback-link').text() == "+ " + language.reviews.reviews_add_private ? "- " + language.reviews.reviews_add_private : "+ " + language.reviews.reviews_add_private);
    });
}

function submitReview()
{
    $("#zc_modal_review_submit").click(function()
    {
        startThinking($(this));
        $('#button-container').hide();
        $('#loader-container').show();
        var errorMessage = '';
        if ($("#zc_review_public").val() == '')
        {
            errorMessage = "the public review is filled in";
        }
        if (errorMessage == '')
        {
            var reviewData = {
                review: nl2br($("#zc_review_public").val()),
                feedback: nl2br($("#zc_review_private").val()),
                author_id: userId
            };
            var subjectAttr = $('.reviewdetails').attr('zc_asset_id');
            if (hasReservation && typeof subjectAttr !== 'undefined')
            {
                reviewData.subject_id = subjectAttr;
            }
            else
            {
                if ($('#room_select').val() == null)
                {
                    errorMessage = "the room is selected";
                }
                else
                {
                    reviewData.subject_id = $('#room_select').val();
                }
            }
        }
        if (errorMessage == '')
        {
            var reservationAttr = $('.reviewdetails').attr('zc_reservation_id');
            if (hasReservation && typeof reservationAttr !== 'undefined')
            {
                reviewData.reservation_id = reservationAttr;
            }
            $(".zc_review_rating_auditor").each(function()
            {
                var ratingType = $(this).attr('zc_rating_type');
                var value = $("[name='" + ratingType + "']:checked").val();
                if (typeof value === "undefined")
                {
                    errorMessage = "you have rated the venue for " + ratingType;
                    return false;
                }
                reviewData[ratingType] = value;
            });
        }
        if (errorMessage == '')
        {
            postReview(reviewData, $(this));
        }
        else
        {
            $('#button-container').show();
            $('#loader-container').hide();
            stopThinking($(this));
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
}

function postReview(reviewData, button)
{
    $.post(base_url + country_lang_url + "/api_json/Review", reviewData, null, "json")
    .done(function(response)
    {
        if (response.error.occurred === false)
        {
            bootstrapSuccess('You have successfully posted your review.');
            closeMainModal();
            setTimeout(function()
            {
                window.location.href = base_url + country_lang_url;
            }, 2000);
        }
        else
        {
            $('#button-container').show();
            $('#loader-container').hide();
            stopThinking(button);
            bootstrapError(response.error.message);
        }
    })
    .fail(function(response)
    {
        $('#button-container').show();
        $('#loader-container').hide();
        stopThinking(button);
        bootstrapError("Failed for some reason - " + response.error.message + ".");
    });
}