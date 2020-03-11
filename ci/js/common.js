$(document).ready(function(b)
{
    $("input[maxlength], textarea[maxlength]").keyup(function()
    {
        var charsLeft = $(this).attr("maxlength") - $(this).val().length;
        if (charsLeft >= 0)
        {
            $("#counter_" + $(this).attr("id")).text(charsLeft + ' character' + ((charsLeft === 0 || charsLeft > 1)?'s':'') + ' left');
        }
        else
        {
            $("#counter_" + $(this).attr("id")).text(Math.abs(charsLeft) + ' characters too many');
        }
    });
    $("input[maxlength], textarea[maxlength]").bind('paste', function()
    {
        var charsLeft = $(this).attr("maxlength") - $(this).val().length;
        if (charsLeft >= 0)
        {
            $("#counter_" + $(this).attr("id")).text(charsLeft + ' character' + ((charsLeft === 0 || charsLeft > 1)?'s':'') + ' left');
        }
        else
        {
            $("#counter_" + $(this).attr("id")).text(Math.abs(charsLeft) + ' characters too many');
        }
    });
    $("input[maxlength], textarea[maxlength]").each(function()
    {
        var charsLeft = $(this).attr("maxlength") - $(this).val().length;
        if (charsLeft >= 0)
        {
            $("#counter_" + $(this).attr("id")).text(charsLeft + ' character' + ((charsLeft === 0 || charsLeft > 1)?'s':'') + ' left');
        }
        else
        {
            $("#counter_" + $(this).attr("id")).text(Math.abs(charsLeft) + ' characters too many');
        }
    });
    bootstrapErrorClickListener();
    flashMessageAutoClose();
    setRatingStars();
    forgotPassword();
    applySwitchesToCheckboxes();
    attachAdvert();
    changeCountry();
    closeCountrySuggestBar();
});

function forgotPassword()
{
    $('#forgot_password').click(function()
    {
        clearMainModal();
        $('#modal_slide_up_content').load(base_url + country_lang_url + '/common/modal_forgot_password', function()
        {
            $('.modal-dialog').addClass('modal-tiny');
            $('.modal-body').addClass('bg-blue');
            $('#mainModal').modal('show');
            verticallyCenterModal();
        });
    });
}

function flashMessageAutoClose()
{
    if ($('.flash_message').length > 0)
    {
        setTimeout(function()
        {
            $('.flash_message').fadeOut();
        }, 3000);
    }
}

function bootstrapErrorClickListener()
{
    $('.close-alert').click(function()
    {
        $('#error_message').empty();
        $('.error-message').hide();
    });
}

function clearBootstrapError()
{
    if ($('#bootstrap_error'))
    {
        $('#bootstrap_error').remove();
    }
}

function clearBootstrapSuccess()
{
    if ($('#bootstrap_success'))
    {
        $('#bootstrap_success').remove();
    }
}

function bootstrapError(message, fade, speed)
{
    clearBootstrapError();
    $('body').css('cursor', 'default')
    .prepend('<div id="bootstrap_error" class="alert error-message" role="alert" style="display: none;"><a href="#" class="close-alert" data-dismiss="alert" aria-label="close">&times;</a><div id="error_message"></div></div>');
    $('#error_message').text(message);
    $('.error-message').toggleClass('alert-danger')
    .show();
    if (fade)
    {
        setTimeout(function()
        {
            $('#error-message').remove();
            $('.error-message').fadeOut();
        }, speed);
    }
}

function bootstrapSuccess(message)
{
    clearBootstrapSuccess();
    $('body').css('cursor', 'default')
    .prepend('<div id="bootstrap_success" class="alert success-message" role="alert" style="display: none;"><a href="#" class="close-alert" data-dismiss="alert" aria-label="close">&times;</a><div id="success_message"></div></div>');
    $('#success_message').text(message);
    $('.success-message').toggleClass('alert-success')
    .show();
    setTimeout(function()
    {
        $('#success_message').remove();
        $('.success-message').fadeOut();
    }, 5000);
}

function isMobile()
{
    var ua = navigator.userAgent.toLowerCase();
    var platform = navigator.platform.toLowerCase();
    var platformName = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0];
    var is_mobile = /ios|android|webos/.test(platformName);
    return !!is_mobile;
}

function getUaInfo()
{
    return navigator.userAgent.toLowerCase();
}

function isIphone()
{
    var ua = navigator.userAgent.toLowerCase();
    return !!ua.match(/iphone/);
}

function isAndroid()
{
    var ua = navigator.userAgent.toLowerCase();
    return !!ua.match(/android/);
}

function registerNeverBounceFields()
{
    $('.email-check').each(function()
    {
        if (typeof _nb != 'undefined')
        {
            _nb.fields.registerListener($(this).context, true);
        }
    });
}

function addNeverBounceStatusField(data, field)
{
    if (field.length)
    {
        data['never_bounce_status'] = field.val();
    }
    return data;
}

function cancelButtonListener()
{
    $('#cancel').click(function()
    {
        closeMainModal();
    });
}

function clearMainModal()
{
    $('.modal-dialog').removeClass('modal-small');
    $('.modal-dialog').removeClass('modal-tiny');
    $("#modal_slide_up_content").empty();
}

function closeMainModal()
{
    clearMainModal();
    $("#mainModal").modal('hide');
}

function clearFullModal()
{
    $("#full_modal_content").empty();
}

function closeFullModal()
{
    clearFullModal();
    $("#full_modal").modal('hide');
}

function clearFullDimensionModal()
{
    $("#full_dimension_modal_content").empty();
}

function closeFullDimensionModal()
{
    clearFullDimensionModal();
    $("#full_dimension_modal").modal('hide');
}

function verticallyCenterModal()
{
    var object = $('#modal_slide_up_content');
    var object_outerheight = object.outerHeight();
    var window_height = $(window).height();
    var object_top = ((window_height - object_outerheight)/2) - 30;
    if (!isMobile())
    {
        if (object_top < 0)
        {
            object_top = 0;
        }
        object.css({
            marginTop: object_top + 'px'
        });
    }
    $(window).resize(function()
    {
        var window_height = $(window).height();
        var object_top = ((window_height - object_outerheight)/2) - 30;
        if (!isMobile())
        {
            if (object_top < 0)
            {
                object_top = 0;
            }
            object.css({
                marginTop: object_top + 'px'
            });
        }
    });
}

function init_modal_confirm(data, callback)
{
    clearMainModal();
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_confirm', function()
    {
        $('.modal-dialog').addClass('modal-small');
        $('#mainModal').modal('show');
        verticallyCenterModal();
        $('#messageText').text(data.message);
        confirmationModal(data, callback);
        cancelButtonListener();
    });
}

function confirmationModal(data, callback)
{
    $('#yes').click(function()
    {
        data.button = this;
        disableModalButton(data.button);
        callback(data);
    });
}

function init_modal_delete(data, callback)
{
    clearMainModal();
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_delete', function()
    {
        $('.modal-dialog').addClass('modal-tiny');
        $('#mainModal').modal('show');
        verticallyCenterModal();
        $('#messageText').text(data.message);
        deleteModal(data, callback);
        cancelButtonListener();
    });
}

function deleteModal(data, callback)
{
    $('#delete').click(function()
    {
        data.button = this;
        disableModalButton(data.button);
        callback(data);
    });
}

function disableModalButton(button)
{
    $(button).prop("disabled", true);
    $('body').css('cursor', 'wait');
    $('.modal-footer').prepend('<div id="loader-wrapper"><img src="/images/loading.gif"></div>');
}

function enableModalButton(button)
{
    $(button).val('Try Again!').prop("disabled", false);
    $('body').css('cursor', 'default');
    $('#loader-wrapper').remove();
}

function startThinking(button)
{
    $('html').css('cursor', 'wait');
    button.attr('disabled', true);
}

function stopThinking(button)
{
    $('html').css('cursor', 'default');
    button.attr('disabled', false);
}

function startLoading(button)
{
    $(button).hide();
    $('.loading-gif').show();
}

function stopLoading(button)
{
    $('.loading-gif').hide();
    $(button).show();
}

function customAlert(data, callback, callbackVars)
{
    clearMainModal();
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_custom_alert', function()
    {
        $('.modal-dialog').addClass('modal-small');
        $('#mainModal').modal('show');
        verticallyCenterModal();
        $('#messageText').text(data.message);
        $('#ok').click(function()
        {
            if (callback)
            {
                callback.apply(this, callbackVars);
            }
            else
            {
                closeMainModal();
            }
        });
    });
}

function setRatingStars()
{
    $('.star_rating').each(function()
    {
        var rating = $(this).attr('zc_rating');
        var fullStarCount = Math.floor(rating);
        $rating = $(this);
        $rating.find('span:lt(' + fullStarCount + ')').addClass('filled-star');
        if (rating % 1 !== 0)
        {
            $rating.find('span:eq(' + fullStarCount + ')').addClass('half-star');
        }
    });
}

function applySwitchesToCheckboxes()
{
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    elems.forEach(function(html)
    {
        var colour = '#46D633';
        if (typeof $(html).data('colour') != 'undefined')
        {
            colour = $(html).data('colour');
        }
        var size;
        if (typeof $(html).data('size') != 'undefined')
        {
            size = $(html).data('size');
        }
        var className = 'switchery';
        if (typeof $(html).data('class') != 'undefined')
        {
            className += ' ' + $(html).data('class');
        }
        var switchery = new Switchery(html, { color: colour, className: className, size: size });
    });
}

function nl2br(str, is_xhtml)
{
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function getUrlParameter(sParam)
{
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++)
    {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam)
        {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function removeFromArray(array, id) {
    var index = array.indexOf(id);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function nullObject(identifier) {
    if (identifier === null)
        return true;
    return false;
}

function isDefined(identifier) {
    if (typeof identifier !== 'undefined')
        return true;
    return false;
}

function inputIsEmpty($textInput) {
    if ($textInput.val() === '')
        return true;
    return false;
}

function atLeastOneInputFilled(inputGroupName) {
    var inputsChecked = 0;
    var valid = 0;
    $('.' + inputGroupName).each(function() {
        if ($(this).val() !== '')
            valid ++;
        inputsChecked++;
    });
    if (inputsChecked == $('.' + inputGroupName).length && valid > 0)
        return true;
    return false;
}

function radioOptionChecked(radioGroupName) {
    if ($('input:radio[name="' + radioGroupName + '"]').is(':checked'))
        return true;
    return false;
}

function checkboxIsChecked(checkboxGroupName) {
    if ($('input:checkbox[name="' + checkboxGroupName + '"]').is(':checked'))
        return true;
    return false;
}

function selectOptionSelected($select) {
    if ($select.val() !== null)
        return true;
    return false;
}

function throwInputError($textInput) {
    $textInput.parent().addClass('has-error');
    $textInput.change(function() {
        $textInput.parent().removeClass('has-error');
    });
}

function throwRadioError($radioInput) {
    $radioInput.addClass('has-error');
    $radioInput.change(function() {
        $radioInput.removeClass('has-error');
    });
}

function throwCheckboxError($checkbox) {
    $checkbox.parent().parent().addClass('has-error');
    $checkbox.parent().parent().change(function() {
        $checkbox.parent().parent().removeClass('has-error');
    });
}

function throwSelectError($select) {
    $select.parent().parent().addClass('has-error');
    $select.change(function() {
        $select.parent().parent().removeClass('has-error');
    });
}

function attachAdvert()
{
    $('.ipad_promo').click(function()
    {
        clearMainModal();
        $("#modal_slide_up_content").load(base_url + country_lang_url + '/common/modal_advert', function()
        {
            $(".modal-dialog").addClass('modal-lg');
            $("#mainModal").modal('show');
            verticallyCenterModal();
            $('.super-small-link').click(function() {
                $('.modal-body').animate({ scrollTop: $('.super-small-link').offset().top }, 1000);
            });
        });
    });
}

function getLangFile(page) {
    var url = '/lang/' + language_code + '/' + page + '_lang.json'; // eslint-disable-line camelcase
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function loadLang() {
    var pages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var lang = {};
    var counter = 0;
    return new Promise(function (resolve) {
        pages.map(function (page) {
            getLangFile(page).then(function (response) {
                lang[page] = JSON.parse(response);
                counter += 1;
                if (counter === pages.length) {
                    resolve(lang);
                }
            }).catch(function (err)
            {
                console.log(err);
            });
        });
    });
}

function parseLangLine(line) {
    var string = line;
    for (var i = 1; i < (arguments.length <= 1 ? 0 : arguments.length - 1) + 1; i += 1) {
        var regex = new RegExp('{{(' + i + ')}}', 'g');
        string = string.replace(regex, arguments.length <= i - 1 + 1 ? undefined : arguments[i - 1 + 1]);
    }
    return string;
}

function changeCountry()
{
    $('.locale_code').click(function()
    {
        var data = {
            locale_code: $(this).data('val')
        };
        $.ajax({
            url: base_url + "api/v1/users/userlanguage",
            data: data,
            dataType: "json",
            type: "PUT",
            statusCode: {
                405: function(err) {
                    bootstrapError(err.responseJSON);
                }
            }
        });
    });
}

function closeCountrySuggestBar()
{
    $('#close_btn').click(function()
    {
        $('#site-suggest-bar').remove();
    });
}

function add_editor($editor)
{
    if (!$editor.data('froala.editor'))
    {
        $editor.froalaEditor({
            language: 'en_gb',
            toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'help', 'html', '|', 'undo', 'redo'],
            quickInsertTags: ''
        });
    }
}

function check_editor_data($editor, $object)
{
    var edited = false;
    var newData = '';
    if ($editor.froalaEditor('codeView.isActive') && $editor.froalaEditor('codeView.get') !== $object.text())
    {
        edited = true;
        newData = $editor.froalaEditor('codeView.get');
    }
    else if ($editor.val() !== $object.text())
    {
        edited = true;
        newData = $editor.val();
    }
    if (edited)
    {
        return newData;
    }
    return false;
}

function remove_editor($editor)
{
    if ($editor.data('froala.editor'))
    {
        $editor.froalaEditor('destroy');
        $editor.hide();
    }
}


// For Jest testing:
//
// module.exports = {
//     emptyString: emptyString,
//     nullObject: nullObject,
//     isDefined: isDefined
// }
