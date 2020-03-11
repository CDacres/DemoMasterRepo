$(document).ready(function()
{
    loadLang(['dashboard']).then(function (language) {
        $('a[name=message_filter]').click(function()
        {
            var messageli = document.getElementsByTagName('li');
            $('#dropdown_label').text($(this).text());
            for (var l=0; l<messageli.length; ++l)
            {
                if ($(this).attr('filter_type') == 'all')
                {
                    $(messageli[l]).show();
                    $(messageli[l]).next().show();
                }
                else if ($(this).attr('filter_type') == 'unread')
                {
                    if (typeof $(messageli[l]).attr('message_id') != 'undefined')
                    {
                        if ($(messageli[l]).attr('message_read') == 0)
                        {
                            $(messageli[l]).show();
                            $(messageli[l]).next().show();
                        }
                        else
                        {
                            $(messageli[l]).hide();
                            $(messageli[l]).next().hide();
                        }
                    }
                }
                else
                {
                    if (typeof $(messageli[l]).attr('message_id') != 'undefined')
                    {
                        if ($(this).attr('filter_type') == $(messageli[l]).attr('message_type'))
                        {
                            $(messageli[l]).show();
                            $(messageli[l]).next().show();
                        }
                        else
                        {
                            $(messageli[l]).hide();
                            $(messageli[l]).next().hide();
                        }
                    }
                }
            }
        });
        $('.zc_starred').click(function()
        {
            var star_value;
            var className = $('#starred_' + $(this).attr('message_id')).attr('class');
            if (className == 'glyphicon starred glyphicon-star-empty')
            {
                $('#starred_' + $(this).attr('message_id')).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                $(this).find('.star-text').text(language.dashboard.dashboard_message_starred);
                star_value = 1;
            }
            else
            {
                $('#starred_' + $(this).attr('message_id')).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                $(this).find('.star-text').text(language.dashboard.dashboard_message_star);
                star_value = 0;
            }
            var data = {
                is_starred: star_value
            };
            $.post(base_url + country_lang_url + "/api_json/Message/" + $(this).attr('message_id'), data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    var success_message;
                    if (star_value === 0)
                    {
                        success_message = 'Message unstarred successfully.';
                    }
                    else
                    {
                        success_message = 'Message starred successfully.';
                    }
                    $('.alert').append(success_message);
                    $('.alert').addClass('alert-success');
                    $('.alert').show();
                    $('.alert').delay(1000).fadeOut('slow', function()
                    {
                        $('.alert').removeClass('alert-success');
                        $('.alert').empty();
                    });
                }
            }).fail(function()
            {
                bootstrapError("Failed while starring the message.");
            });
        });
        $('a[name=messagelink]').click(function()
        {
            var redirect_url = $(this).attr('redirect_url');
            var data = {
                is_read: 1
            };
            $.post(base_url + country_lang_url + "/api_json/Message/" + $(this).attr('message_id'), data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    $(location).attr('href', redirect_url);
                }
            }).fail(function()
            {
                bootstrapError("Failed while reading the message.");
            });
        });
        $('.zc_delete').click(function()
        {
            var data = {
                message: 'Are you sure you want to delete the message?',
                messageId: $(this).children().attr('message_id')
            };
            init_modal_delete(data, deleteMessage);
        });
        $('#request_print').click(function()
        {
            print_confirmation();
        });
        $('#req_accept').click(function()
        {
            if ($('#accept').css('display') == 'none')
            {
                $(this).parent().removeClass('accept').addClass('click');
                $('#req_decline').parent().removeClass('click').addClass('decline');
                $('#decline').hide();
                $('#accept').show();
            }
            else
            {
                $(this).parent().removeClass('click').addClass('accept');
                $('#decline').hide();
                $('#accept').hide();
            }
        });
        $('#req_decline').click(function()
        {
            if ($('#decline').css('display') == 'none')
            {
                $(this).parent().removeClass('decline').addClass('click');
                $('#req_accept').parent().removeClass('click').addClass('accept');
                $('#decline').show();
                $('#accept').hide();
            }
            else
            {
                $(this).parent().removeClass('click').addClass('decline');
                $('#decline').hide();
                $('#accept').hide();
            }
        });
        $('button[name=accept_decline_button]').click(function()
        {
            var type = $(this).attr('decision_type');
            var data = {
                new_status_id: $(this).attr('zc_status_id')
            };
            if (type == 'accept')
            {
                data.comments = $("#comment_accept").val();
            }
            else
            {
                data.comments = $("#comment_decline").val();
            }
            $('#' + type).hide();
            $('#loader-container').show();
            $.post(base_url + country_lang_url + "/api_json/" + $(this).attr('zc_object_type') + "/" + $("#reservation_id").val(), data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    $('#' + type).show();
                    $('#loader-container').hide();
                    bootstrapError(response.error.message);
                }
                else
                {
                    location.reload(true);
                }
            }).fail(function()
            {
                $('#' + type).show();
                $('#loader-container').hide();
                bootstrapError("Failed at the reservation update stage.");
            });
        });
        attachHoverIcons(language);
    });
});

function attachHoverIcons(language)
{
    $('.message-row').each(function()
    {
        $(this).mouseenter(function()
        {
            $(this).find('.message-icon').removeClass('hide');
        });
        $(this).mouseleave(function()
        {
            if ($(this).find('.star-text').text() == language.dashboard.dashboard_message_starred)
            {
                $('.trash').addClass('hide');
            }
            else
            {
                $(this).find('.message-icon').addClass('hide');
            }
        });
    });
}

function deleteMessage(data)
{
    var postData = {
        message_id: data.messageId
    };
    $.post(base_url + country_lang_url + "/messages/delete_message/", postData, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('.alert').append('Message deleted successfully.');
            $('.alert').addClass('alert-danger');
            $('.alert').show();
            $('.alert').delay(1000).fadeOut('slow', function()
            {
                $('.alert').removeClass('alert-danger');
                $('.alert').empty();
            });
            var messageli = document.getElementsByTagName('li');
            for (var l=0; l<messageli.length; ++l)
            {
                if ($(messageli[l]).attr('message_id') == data.messageId)
                {
                    $(messageli[l]).remove();
                    enableModalButton(data.button);
                }
            }
            closeMainModal();
        }
    }).fail(function()
    {
        bootstrapError("There was a general error while deleting the message.");
    });
}