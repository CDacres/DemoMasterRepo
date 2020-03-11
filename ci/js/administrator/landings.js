$(document).ready(function()
{
    update_country();
    update_tag_label();
    update_location();
    update_vertical();
    update_linked_tag_label();
});

function update_country()
{
    $('#zc_country').change(function()
    {
        var data = {
            country_code: $("#zc_country").val()
        };
        reset_html($('#metas_table'));
        reset_html($('#landing_page_list'), false);
        reset_html($('#linked_tag_label_grid'), false);
        reset_html($('#zc_tag_label'), false);
        reset_html($('#zc_location'), false);
        reset_html($('#zc_vertical'), false);
        reset_html($('#zc_linked_tag_label'), false);
        $.post(base_url + "administrator/landings/update_country", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                reset_html($('#metas_table'), false);
                reset_html($('#linked_tag_label_list'), false);
                if (typeof response != 'undefined')
                {
                    reset_select($('#zc_tag_label'), response.data, 'tag_labels', 'label');
                    reset_select($('#zc_location'), response.data, 'locations', 'human_desc');
                    reset_select($('#zc_vertical'), response.data, 'verticals', 'title');
                    reset_select($('#zc_linked_tag_label'));
                    $('#metas_table').append(response.data.meta_table_html);
                }
            }
        }).fail(function()
        {
            bootstrapError("Failed at the country update stage.");
        });
    });
}

function reset_html($object, appendLoading = true, appendHtml = '')
{
    $object.empty();
    if (appendLoading)
    {
        $object.append('<img src="/images/loading.gif">');
    }
    else if (appendHtml != '')
    {
        $object.append(appendHtml);
    }
}

function reset_select($object, response, arrayKey, arrayField)
{
    $object.append('<option value="-1" selected>Select...</option>');
    if (typeof response != 'undefined' && response != null)
    {
        $object.data('language', response.language);
        $object.data('country_lang_url', response.country_lang_url);
        if (typeof response[arrayKey] != 'undefined')
        {
            var data = response[arrayKey].objects;
            var opts = '';
            $.each(data, function(index) {
                opts += '<option value="' + data[index].id + '">' + data[index][arrayField] + '</option>';
            });
            $object.append(opts);
        }
    }
}

function update_tag_label()
{
    $('#zc_tag_label').change(function()
    {
        if ($(this).val() == '-1')
        {
            if ($('#zc_location').val() != '-1')
            {
                location_update($('#zc_location'));
            }
            else
            {
                reset_html($('#landing_page_list'), false);
            }
        }
        else
        {
            if ($('#zc_location').val() != '-1')
            {
                update_tag_label_location($(this), $('#zc_location'));
            }
            else
            {
                tag_label_update($(this));
            }
        }
    });
}

function update_location()
{
    $('#zc_location').change(function()
    {
        if ($(this).val() == '-1')
        {
            if ($('#zc_tag_label').val() != '-1')
            {
                tag_label_update($('#zc_tag_label'));
            }
            else
            {
                reset_html($('#landing_page_list'), false);
            }
        }
        else
        {
            if ($('#zc_tag_label').val() != '-1')
            {
                update_tag_label_location($('#zc_tag_label'), $(this));
            }
            else
            {
                location_update($(this));
            }
        }
    });
}

function tag_label_update(tag_label)
{
    var data = {
        tag_label_id: tag_label.val(),
        language: tag_label.data('language'),
        country_lang_url: tag_label.data('country_lang_url')
    };
    landing_page_list_update('administrator/landings/update_tag_label', data);
}

function location_update(location)
{
    var data = {
        location_id: location.val(),
        language: location.data('language'),
        country_lang_url: location.data('country_lang_url')
    };
    landing_page_list_update('administrator/landings/update_location', data);
}

function update_tag_label_location(tag_label, location)
{
    var data = {
        tag_label_id: tag_label.val(),
        location_id: location.val(),
        language: tag_label.data('language'),
        country_lang_url: tag_label.data('country_lang_url')
    };
    landing_page_list_update('administrator/landings/update_tag_label_location', data);
}

function landing_page_list_update(url, data)
{
    reset_html($('#landing_page_list'));
    $.post(base_url + url, data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            reset_html($('#landing_page_list'), false, response.data.landing_page_html);
        }
    }).fail(function()
    {
        bootstrapError("Failed at the landing page list update stage.");
    });
}

function update_vertical()
{
    $('#zc_vertical').change(function()
    {
        if ($(this).val() == '-1')
        {
            reset_html($('#linked_tag_label_grid'), false);
        }
        else
        {
            var data = {
                vertical_id: $(this).val(),
                language: $(this).data('language')
            };
            reset_html($('#linked_tag_label_grid'));
            reset_html($('#zc_linked_tag_label'), false);
            $.post(base_url + "administrator/landings/update_vertical", data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    reset_select($('#zc_linked_tag_label'), response.data, 'vertical_tag_labels', 'label');
                    reset_html($('#linked_tag_label_grid'), false, response.data.linked_tag_label_grid_html);
                }
            }).fail(function()
            {
                bootstrapError("Failed at the vertical update stage.");
            });
        }
    });
}

function update_linked_tag_label()
{
    $('#zc_linked_tag_label').change(function()
    {
        if ($(this).val() == '-1')
        {
            reset_html($('#linked_tag_label_list'), false);
        }
        else
        {
            var data = {
                tag_label_id: $(this).val(),
                language: $(this).data('language')
            };
            reset_html($('#linked_tag_label_list'));
            $.post(base_url + "administrator/landings/update_linked_tag_label", data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    reset_html($('#linked_tag_label_list'), false, response.data.linked_tag_label_list_html);
                }
            }).fail(function()
            {
                bootstrapError("Failed at the linked tag label update stage.");
            });
        }
    });
}