$(document).ready(function()
{
    setReviewStars();
    submitReview();
});

var currentUserStatus;

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
    verticallyCenterModal();
    $('.rating-container:first-child').show();
    $('.zc_review_rating_holder').change(function()
    {
        $(this).parent().parent().next().fadeIn();
        verticallyCenterModal();
    });
    $('.rating-container').last().find('.zc_review_rating_holder').change(function()
    {
        $('.rating-container').slideUp("slow");
        $('#edit_stars').show().css('display: inline;');
        $('#step_2').slideDown("slow");
        verticallyCenterModal();
    });
    $('#edit_stars').click(function()
    {
        $('.rating-container').slideDown("slow");
        $('.select-block').slideUp("slow");
        $('#step_3').slideUp("slow");
        verticallyCenterModal();
    });
    $('#book_type').change(function()
    {
        $(this).parent().parent().next().fadeIn();
        $('.select-block').slideUp("slow");
        $('#step_3').slideDown("slow");
        verticallyCenterModal();
    });
    $('#edit_room').click(function()
    {
        $('.select-block').slideDown("slow");
        $('.rating-container').slideUp("slow");
        $('#step_3').slideUp("slow");
        $('#edit_review').show().css('display: inline;');
        verticallyCenterModal();
    });
    $('#zc_review_public').focus(function()
    {
        if (userStatus())
        {
            $('.write-review-container').next().fadeIn();
            verticallyCenterModal();
        }
        else
        {
            $('.write-review-container').next().fadeIn();
            $('.write-review-container').next().next().fadeIn();
            $('#edit_review').show().css('display: inline;');
            verticallyCenterModal();
        }
    });
    $('#edit_review').click(function()
    {
        $('#step_3').slideDown("slow");
        $('.select-block').slideUp("slow");
        $('.rating-container').slideUp("slow");
        verticallyCenterModal();
    });
    $('#add-feedback-link').click(function()
    {
        $('#feedback-text-area').toggleClass('hide');
        $('#add-feedback-link').text($('#add-feedback-link').text() == '+ ' + language.reviews.reviews_add_private ? '- ' + language.reviews.reviews_add_private : '+ ' + language.reviews.reviews_add_private);
        verticallyCenterModal();
    });
}

function checkForUser(reviewData, userData, button)
{
    $.post(base_url + "users/check_for_user", userData, null, "json"
    ).done(function(response)
    {
        if (response.data.exists)
        {
            postReview(reviewData, response.data.userId, button);
        }
        else
        {
            postRegister(reviewData, userData, button);
        }
    }).fail(function(response)
    {
        stopThinking(button);
        bootstrapError('Failed at finding the user.');
    });
}

function postRegister(reviewData, userData, button)
{
    userData = addNeverBounceStatusField(userData, $('input[name="nb-result"]'));
    $.post(base_url + country_lang_url + "/api_json/Signup", userData, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === false)
        {
            postReview(reviewData, response.data.id);
        }
        else
        {
            stopThinking(button);
            bootstrapError(response.error.message);
        }
    })
    .fail(function(response)
    {
        stopThinking(button);
        bootstrapError(response.error.message);
    });
}

function userStatus()
{
    $.post(base_url + "users/is_logged_in", null, null, "json"
    ).done(function(response)
    {
        currentUserStatus = response.data;
    }).fail(function(response)
    {
        bootstrapError('Failed at finding the logged in user');
    });
}

function checkContactDetails()
{
    return checkName($('#user_name').val()) && checkEmail($('#user_email').val());
}

function checkName(name)
{
    var pass = true;
    if (name === "")
    {
        $('#Econtact_name').show();
        $('#name_input').addClass('has-error');
        pass = false;
        $('#user_name').change(function()
        {
            $('#name_input').removeClass('has-error');
            $('#Econtact_name').hide();
        });
    }
    else
    {
        $('#Econtact_name').hide();
    }
    return pass;
}

function checkEmail(email)
{
    var pass = true;
    var emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
    if (email !== "" && emailReg.test(email.toLowerCase()))
    {
        $('#Econtact_email').hide();
    }
    else
    {
        pass = false;
        $('#Econtact_email').show();
        $('#email_input').addClass('has-error');
        $('#user_email').change(function()
        {
            $('#email_input').removeClass('has-error');
            $('#Econtact_email').hide();
        });
    }
    return pass;
}

function submitReview()
{
    $("#zc_modal_review_submit").click(function()
    {
        var scopeThis = $(this);
        var errorMessage = '';
        var reviewData;
        if ($("#zc_review_public").val() === '')
        {
            errorMessage = "the public review is filled in";
        }
        else if ($('#book_type').val() === null)
        {
            errorMessage = "the room is selected";
        }
        if (errorMessage === '')
        {
            reviewData = {
                review: nl2br($("#zc_review_public").val()),
                feedback: nl2br($("#zc_review_private").val()),
                subject_id: $('#book_type').val()
            };
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
        if (errorMessage === '')
        {
            startThinking(scopeThis);
            startLoading(scopeThis);
            if (!currentUserStatus)
            {
                if (!checkContactDetails())
                {
                    stopThinking(scopeThis);
                    stopLoading(scopeThis);
                    bootstrapError("Please ensure the user details fields are filled in");
                }
                else
                {
                    var userName = $("#user_name").val();
                    var nameArray = userName.split(" ");
                    var firstName = nameArray[0];
                    var lastName = nameArray[1];
                    var userData = {
                        first_name: firstName,
                        last_name: lastName,
                        email: $('#user_email').val()
                    };
                    checkForUser(reviewData, userData, scopeThis);
                }
            }
            else
            {
                postReview(reviewData, userId, scopeThis);
            }
        }
        else
        {
            stopThinking(scopeThis);
            stopLoading(scopeThis);
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
}

function postReview(reviewData, userId, button)
{
    reviewData.author_id = userId;
    $.post(base_url + country_lang_url + "/api_json/Review", reviewData, null, "json")
    .done(function(response)
    {
        if (response.error.occurred === false)
        {
            bootstrapSuccess('You have successfully posted your review.');
            closeMainModal();
            setTimeout(function()
            {
                location.reload();
            }, 2000);
        }
        else
        {
            stopThinking(button);
            stopLoading(button);
            bootstrapError(response.error.message);
        }
    })
    .fail(function(response)
    {
        stopThinking(button);
        stopLoading(button);
        bootstrapError("Failed for some reason - " + response.error.message + ".");
    });
}

$('.write_review').click(function()
{
    var scopeThis = $(this);
    $('body').css('cursor', 'default');
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $('.modal-dialog').addClass('modal-small');
    $('#modal_slide_up_content').load(base_url + country_lang_url + '/common/write_review/' + scopeThis.attr('zc_asset_id'), function()
    {
        loadLang(['modals']).then(function (language) {
            $('.modal-body').css({
                'min-height': '400px'
            });
            setReviewStars();
            toggleFormInputs(language);
            submitReview();
            $('#mainModal').modal('show');
            verticallyCenterModal();
            registerNeverBounceFields();
        });
    });
});
