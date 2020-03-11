$(document).ready(function()
{
    loadFancyBox();
    update_main_contact();
    update_venue_agree();
    attach_contact_modals();
    edit_review();
    delete_review();
    update_image_fields();
    set_admin_table_widths();
});

function loadFancyBox()
{
    $(".fancybox").fancybox(
    {
        tpl: {
            closeBtn: '<a title="Close" class="close fancybox-item fancybox-close" href="javascript:;"><span>×</span></a>'
        },
        maxWidth: 550,
        maxHeight: 400,
        fitToView: true,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
}

function attach_contact_modals()
{
    $('.contact_details').each(function()
    {
        $(this).click(function()
        {
            clearMainModal();
            $("#mainModal").on("shown.bs.modal", function()
            {
                $("#mainModal").on("hidden.bs.modal", function()
                {
                    $("#mainModal").off("shown.bs.modal");
                });
            });
            $('#modal_slide_up_content').load(base_url + country_lang_url + '/common_protected/modal_contact_details/' + $(this)[0].id, function()
            {
                $('#mainModal').modal('show');
                update_main_contact();
                verticallyCenterModal();
            });
        });
    });
    $('.hubspot_contact').each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            if (usefullyExists($(this).data('hubspot-id')) && usefullyExists($(this).data('hubspot-interaction')))
            {
                init_hubspot_contact($(this)); //From modal/hubspot.js
            }
            else
            {
                bootstrapError('Missing hubspot details, please report this.');
            }
        });
    });
    $('.zc_email_status').each(function()
    {
        $(this).click(function()
        {
            clearMainModal();
            $("#mainModal").on("shown.bs.modal", function()
            {
                $("#mainModal").on("hidden.bs.modal", function()
                {
                    $("#mainModal").off("shown.bs.modal");
                });
            });
            $('#modal_slide_up_content').load(base_url + country_lang_url + '/common_protected/modal_show_email_status/' + $(this).data('status'), function()
            {
                $('#mainModal').modal('show');
                verticallyCenterModal();
            });
        });
    });
}

function update_main_contact()
{
    $('.zc_contact_edit').click(function()
    {
        var asset_id = $(this).data('assetid');
        var id = $(this).data('id');
        $('.zc_contact_save, .zc_contact_enc, .zc_contact_cancel').each(function()
        {
            if (asset_id == $(this).data('assetid') && id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $(this).hide();
    });
    $('.zc_contact_save').click(function()
    {
        var asset_id = $(this).data('assetid');
        var id = $(this).data('id');

        $('.zc_contact').each(function()
        {
            if (asset_id == $(this).data('assetid') && id == $(this).data('id'))
            {
                var data = {
                    main_contact: $(this).val(),
                    asset_id: asset_id
                };
                $.ajax({
                    url: base_url + "api/v1/venues/contact",
                    data: data,
                    dataType: "json",
                    type: "PUT",
                    statusCode: {
                        200: function() {
                            location.reload();
                        },
                        403: function(err) {
                            bootstrapError(err.responseJSON);
                        },
                        405: function(err) {
                            bootstrapError(err.responseJSON);
                        }
                    },
                    error: function()
                    {
                        bootstrapError("There was a general error while updating the field.");
                    }
                });
            }
        });
        $('.zc_contact_edit').each(function()
        {
            if (asset_id == $(this).data('assetid') && id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_contact_enc, .zc_contact_cancel').each(function()
        {
            if (asset_id == $(this).data('assetid') && id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
    $('.zc_contact_cancel').click(function()
    {
        var asset_id = $(this).data('assetid');
        var id = $(this).data('id');
        $('.zc_contact_edit').each(function()
        {
            if (asset_id == $(this).data('assetid') && id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_contact_enc, .zc_contact_save').each(function()
        {
            if (asset_id == $(this).data('assetid') && id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
}

function update_venue_agree()
{
    $('.zc_venue_agree_to_list').change(function()
    {
        var data = {
            agree_to_list: +$(this).is(':checked'),
            id: $(this).val()
        };
        $.ajax({
            url: base_url + "api/v1/venues",
            data: data,
            dataType: "json",
            type: "PUT",
            statusCode: {
                403: function(err) {
                    bootstrapError(err.responseJSON);
                },
                405: function(err) {
                    bootstrapError(err.responseJSON);
                },
                409: function(err) {
                    bootstrapError(err.responseJSON);
                }
            },
            error: function()
            {
                bootstrapError("There was a general error while updating the field.");
            }
        });
    });
}

function edit_review()
{
    $('.zc_edit_review_btn').click(function()
    {
        var review_id = $(this).data('id');
        $('.zc_review').each(function()
        {
            if (review_id == $(this).data('id'))
            {
                var $textarea = $("<textarea>", {
                    val: $(this).text()
                });
                $textarea.addClass("zc_review");
                $textarea.attr('data-id', review_id);
                $textarea.attr('data-oldtext', $(this).text());
                $(this).replaceWith($textarea);
                $textarea.focus();
            }
        });
        $('.zc_review_save_btn, .zc_review_cancel_btn').each(function()
        {
            if (review_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $(this).hide();
    });
    $('.zc_review_save_btn').click(function()
    {
        var review_id = $(this).data('id');
        $('.zc_review').each(function()
        {
            if (review_id == $(this).data('id'))
            {
                var $div = $("<div>", {
                    text: $(this).val()
                });
                $div.addClass("zc_review text normal-font");
                $div.attr('data-id', review_id);
                $(this).replaceWith($div);
                var data = {
                    review: $(this).val(),
                    id: review_id
                };
                reviewFieldsAPI(data);
            }
        });
        $('.zc_edit_review_btn').each(function()
        {
            if (review_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_review_cancel_btn').each(function()
        {
            if (review_id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
    $('.zc_review_cancel_btn').click(function()
    {
        var review_id = $(this).data('id');
        $('.zc_review').each(function()
        {
            if (review_id == $(this).data('id'))
            {
                var $div = $("<div>", {
                    text: $(this).data('oldtext')
                });
                $div.addClass("zc_review text normal-font");
                $div.attr('data-id', review_id);
                $(this).replaceWith($div);
            }
        });
        $('.zc_edit_review_btn').each(function()
        {
            if (review_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_review_save_btn').each(function()
        {
            if (review_id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
}

function reviewFieldsAPI(data)
{
    $.ajax({
        url: base_url + "api/v1/reviews",
        data: data,
        dataType: "json",
        type: "PUT",
        statusCode: {
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("There was a general error while updating the field.");
        }
    });
}

function delete_review()
{
    $('.zc_delete_review_btn').click(function()
    {
        var data = {
            message: "Are you sure you want to remove this review?",
            reviewData: {
                id: $(this).data('id')
            }
        };
        init_modal_delete(data, review_delete);
    });
}

function review_delete(data)
{
    $.ajax({
        url: base_url + "api/v1/reviews",
        data: data.reviewData,
        dataType: "json",
        type: "DELETE",
        statusCode: {
            200: function() {
                enableModalButton(data.button);
                closeMainModal();
                $('.zc_review_container').each(function()
                {
                    if (data.reviewData.id == $(this).data('id'))
                    {
                        $(this).remove();
                    }
                });
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("There was a general error while deleting the review.");
        }
    });
}

function update_image_fields()
{
    $('.zc_img_flag').change(function()
    {
        if (isLoggedIn)
        {
            var data = {
                asset_id: $(this).data('asset-id'),
                flagged: +$(this).is(':checked'),
                id: $(this).val()
            };
            $.ajax({
                url: base_url + "api/v1/images",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    403: function(err) {
                        bootstrapError(err.responseJSON);
                    },
                    405: function(err) {
                        bootstrapError(err.responseJSON);
                    }
                },
                error: function()
                {
                    bootstrapError("There was a general error while updating the image.");
                }
            });
        }
        else
        {
            location.reload();
        }
    });
    $('.zc_img_cosmetic').change(function()
    {
        if (isLoggedIn)
        {
            var data = {
                asset_id: $(this).data('asset-id'),
                cosmetic: +$(this).is(':checked'),
                id: $(this).val()
            };
            $.ajax({
                url: base_url + "api/v1/images",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    403: function(err) {
                        bootstrapError(err.responseJSON);
                    },
                    405: function(err) {
                        bootstrapError(err.responseJSON);
                    }
                },
                error: function()
                {
                    bootstrapError("There was a general error while updating the image.");
                }
            });
        }
        else
        {
            location.reload();
        }
    });
}

function set_admin_table_widths()
{
    $('.administrator-table').each(function()
    {
        var adminTableHead = $(this).find('thead');
        $(this).data('header-top', adminTableHead.offset().top);
        $(this).data('header-width', adminTableHead.width());
        $(this).find('th').each(function()
        {
            $(this).data('width', $(this).width());
        });
    });
}

function sticky_admin_tables()
{
    var scopeThis = $(this);
    $('.administrator-table').each(function()
    {
        var adminTableHead = $(this).find('thead');
        if (scopeThis.scrollTop() >= $(this).data('header-top'))
        {
            adminTableHead.addClass("stuck");
            adminTableHead[0].style.width = $(this).data('header-width') + 'px';
            $(this).find('th').each(function()
            {
                $(this).width($(this).data('width'));
            });
        }
        else
        {
            adminTableHead.removeClass("stuck");
            adminTableHead[0].style.width = 'auto';
            $(this).data('header-width', adminTableHead.width());
            $(this).find('th').each(function()
            {
                $(this).width('auto');
                $(this).data('width', $(this).width());
            });
        }
    });
}

function usefullyExists(data)
{
    return (data !== 'undefined') && (data !== null) && (data !== '');
}

if ($('.administrator-table').length)
{
//    commented out until the chrome bounce doesn't happen
//    $(window).scroll(sticky_admin_tables);
}