$(document).ready(function()
{
    requestClickListener();
    addReviewerListener();
    venueSelectListener();
    selectVenueTooltip();
    reviewsTabListener();
    launchBoostArrow();
    appendTableOrderingListeners();
});

function launchBoostArrow()
{
    $('div#flash_instruction, img#instruction_arrow')
    .delay(1000)
    .fadeIn({
        duration: 1000
    });
}

function reviewsTabListener()
{
    if ($('#review_about_you').parent().hasClass('active'))
    {
        $('#flash_instruction').fadeIn();
        $('#instruction_arrow').fadeIn();
    }
    $('li#about_you').click(function()
    {
        $('#flash_instruction').fadeIn();
        $('#instruction_arrow').fadeIn();
    });
    $('li#by_you').click(function()
    {
        $('#flash_instruction').hide();
        $('#instruction_arrow').hide();
    });
}

function requestClickListener()
{
    $('#request_reviews').click(function()
    {
        var scopeThis = $(this);
        var userInfoArray = $('#user_info').val().split(",");
        var userInfoArrayLength = userInfoArray.length;
        var collection = [];
        var passArray = [];
        for (var i = 0; i < userInfoArrayLength; i+=2)
        {
            if (userInfoArray[i+1] !== undefined && validateName(userInfoArray[i] !== undefined))
            {
                var object = {};
                var validatedName = validateName(userInfoArray[i].trim());
                var email = userInfoArray[i+1].trim();
                var validatedEmail = validateEmail(email.toLowerCase());
                if (validatedName && validatedEmail)
                {
                    object.first_name = userInfoArray[i].trim();
                    object.email = email.toLowerCase();
                    collection.push(object);
                    passArray.push(true);
                }
                else
                {
                    $('#Edetails').show();
                    passArray.push(false);
                }
            }
            else
            {
                $('#Edetails').show();
                passArray.push(false);
            }
        }

        var passed = $.inArray(false, passArray);
        if (passed === -1)
        {
            postUserCollection(collection, $('#venue_select').val(), scopeThis, bulkSendSuccess);
        }
    });
}

function validateName(first_name)
{
    var pass = true;
    if (first_name === "")
    {
        pass = false;
    }
    resetErrorMessage();
    return pass;
}

function validateEmail(email)
{
    var pass = true;
    var emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
    if (!(email !== "" && emailReg.test(email.toLowerCase())))
    {
        pass = false;
    }
    return pass;
}

function resetErrorMessage()
{
    $('#user_info').focus(function()
    {
        $('#Edetails').hide();
    });
}

function addReviewerListener()
{
    $('.add_reviewer').click(function()
    {
        init_modal_add_reviewer();
    });
}

function venueSelectListener()
{
    if ($('#venue_select option').length === 1)
    {
        $('#request_reviews').show();
    }
    else
    {
        $('#venue_select').change(function()
        {
            $('#request_reviews').fadeIn();
        });
    }
}

function init_modal_add_reviewer()
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_add_reviewer', function()
    {
        $('.modal-dialog').addClass('modal-tiny');
        $('#add_new_reviewers').hide();
        $("#mainModal").modal('show');
        verticallyCenterModal();
        registerNeverBounceFields();
        selectVenueTooltip();
        if ($('#modal_venue_select option').length === 1)
        {
            $('#add_new_reviewers').show();
        }
        else
        {
            $('#modal_venue_select').change(function()
            {
                $('#add_new_reviewers').show();
            });
        }
        $('#add_another').click(function()
        {
            addFormInputs();
        });
        $('#add_new_reviewers').click(function()
        {
            startThinking($(this));
            collateInputData($(this));
        });
    });
}

function addFormInputs()
{
    $('#inputs_container').append($('<div class="review_input_row row bottom-m-1"><form><div class="col-sm-12"><label for="first_name">First Name</label><input type="text" name="first_name" class="name_input"></div><div class="col-sm-12"><label for="email_address">Email Address</label><input type="email" name="email_address" class="email_input email-check"></div></form></div><hr>'));
    verticallyCenterModal();
    registerNeverBounceFields();
}

function selectVenueTooltip()
{
    $('[data-toggle="tooltip"]').tooltip();
}

function collateInputData(button)
{
    var collection = [];
    var pass = false;
    $('.review_input_row').each(function(index)
    {
        if (typeof $(this).find('.name_input').val() !== 'undefined' && typeof $(this).find('.email_input').val() !== 'undefined' && validateName($(this).find('.name_input').val()) && validateEmail($(this).find('.email_input').val()))
        {
            var object = {
                first_name: $(this).find('.name_input').val(),
                email: $(this).find('.email_input').val().toLowerCase()
            };
            object = addNeverBounceStatusField(object, $(this).find('input[name="nb-result"]'));
            collection.push(object);
            pass = true;
        }
        else
        {
            $('#Emodal_details').show();
            stopThinking(button);
            resetModalErrorMessage();
        }
    });
    if (pass)
    {
        postUserCollection(collection, $('#modal_venue_select').val(), button, modalSendSuccess);
    }
}

function resetModalErrorMessage()
{
    $('input').focus(function()
    {
        $('#Emodal_details').hide();
    });
}

function postUserCollection(collection, assetId, button, callback)
{
    startThinking(button);
    var data = {
        users: collection,
        asset_id: assetId
    };
    $.post(base_url + country_lang_url + "/api_json/Meta_Venue_Reviews_Request", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === false)
        {
            stopThinking(button);
            callback();
            var successMessage;
            if (response.data.recipient_count === 1)
            {
                successMessage = "Review request sent to 1 recipient.";
            }
            else
            {
                successMessage = "Review requests sent to " + response.data.recipient_count + " recipients.";
            }
            if (response.data.existing_count > 0)
            {
                if (response.data.existing_count === 1)
                {
                    successMessage += " 1 person has already been sent a review request.";
                }
                else
                {
                    successMessage += " " + response.data.existing_count + " people have already been sent review requests.";
                }
            }
            bootstrapSuccess(successMessage);
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

function bulkSendSuccess()
{
    $('#user_info').val("");
    $('#venue_select').prop('selectedIndex', 0);
    //$('#request_reviews').hide();
    updateSentReviewsList();
}

function modalSendSuccess()
{
    closeMainModal();
    if (reviewBooster)
    {
        updateSentReviewsList();
    }
}

function updateSentReviewsList()
{
    $.post(base_url + country_lang_url + "/dashboard/update_sent_reviews_list", null, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#sent-list').show();
            $('#zc_sent_rows').empty();
            $('#zc_sent_rows').append(response.data.html);
        }
    }).fail(function()
    {
        bootstrapError('Failed at the review list update stage.');
    });
}

function appendTableOrderingListeners()
{
    $(".zc_review_ordering").click(function()
    {
        var scopeThis = $(this);
        var data = {
            order_field: $(this).attr('ordering_field'),
            order_direction: $(this).attr('zc_current_order')
        };
        $.post(base_url + country_lang_url + "/dashboard/update_sent_reviews_list", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                $('#sent-list').show();
                $('#zc_sent_rows').empty();
                $('#zc_sent_rows').append(response.data.html);
                scopeThis.attr('zc_current_order', scopeThis.attr('zc_current_order') * -1);
            }
        }).fail(function()
        {
            bootstrapError("Failed at the booking list update stage.");
        });
    });
}
