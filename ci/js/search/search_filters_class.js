var SearchFilters = {

    $priceFilter: {},
    filters: {},

    init: function(params)
    {
        this.parseParams(params);
        this.attachListeners();
    },

    parseParams: function(params)
    {
        this.callbackObject = params.callbackObject;
        this.callback = params.callback;
        this.$priceFilter = $(params.sliderInitParams.sliderId);
        this.$priceFilter.$minDailyText = $(params.sliderInitParams.sliderMinDailyTextBoxId);
        this.$priceFilter.$maxDailyText = $(params.sliderInitParams.sliderMaxDailyTextBoxId);
        this.$priceFilter.$minHourlyText = $(params.sliderInitParams.sliderMinHourlyTextBoxId);
        this.$priceFilter.$maxHourlyText = $(params.sliderInitParams.sliderMaxHourlyTextBoxId);
        this.$priceFilter.filterMinimum = params.sliderInitParams.filterMinimum;
        this.$priceFilter.filterMaximum = params.sliderInitParams.filterMaximum;
        this.$priceFilter.dayRateMultiplier = params.sliderInitParams.dayRateMultiplier;
        this.updateFilterValues('location', params.initialFilters.location);
        this.updateFilterValues('bookingTypeSs', params.initialFilters.bookingTypeSs);
        this.updateFilterValues('lat', params.initialFilters.lat);
        this.updateFilterValues('long', params.initialFilters.long);
        this.updateFilterValues('guests', params.initialFilters.guests);
        this.updateFilterValues('companyId', params.initialFilters.companyId);
        this.updateFilterValues('token', params.initialFilters.token);
    },

    attachListeners: function ()
    {
        if (isMobileVariable)
        {
            this.attachLocationInputListenersMobile();
            this.attachBookingTypeListeners();
        }
        else
        {
            this.attachLocationInputListeners();
        }
        this.attachPriceFilterListeners();
        this.attachCheckInputListeners();
        this.attachValueInputListeners();
        this.attachClearAllListeners();
    },

    attachLocationInputListeners: function()
    {
        var options = {};
        var scopeThis = this;
        $('.zc_search_input').each(function()
        {
            var autocomplete = new google.maps.places.Autocomplete($(this).get(0), options);
            google.maps.event.addListener(autocomplete, 'place_changed', function()
            {
                try
                {
                    ga('send', 'event', 'Search Filter', 'Interaction', 'location');
                }
                catch (ex)
                {
                }
                var place = autocomplete.getPlace();
                if (typeof place.geometry !== "undefined")
                {
                    scopeThis.updateFilterValues('location', place.name);
                    scopeThis.updateFilterValues('lat', place.geometry.location.lat());
                    scopeThis.updateFilterValues('long', place.geometry.location.lng());
                    scopeThis.callback(scopeThis.callbackObject, true, 'location');
                    zipcubeNav.updateLocationInput(place.name);
                    zipcubeNav.closeVerticalMenu();
                }
            });
        });
    },

    attachLocationInputListenersMobile: function()
    {
        var scopeThis = this;
        $('.zc_search_input').each(function()
        {
            $(this).change(function()
            {
                setTimeout(function()
                {
                    scopeThis.updateFilterValues('location',$('#city1').val());
                    scopeThis.updateFilterValues('lat', $('#city1Lat').val());
                    scopeThis.updateFilterValues('long', $('#city1Lng').val());
                    $('span.location-name').text($('#city1').val());
                    scopeThis.addParamsToUrl('location', $('#city1').val());
                    scopeThis.addParamsToUrl('lat', $('#city1Lat').val());
                    scopeThis.addParamsToUrl('long',$('#city1Lng').val());
                    scopeThis.callback(scopeThis.callbackObject, true, 'location');
                    location.href = location.href.split('#')[0];
                },10);
            });
        });
    },

    attachValueInputListeners: function()
    {
        var scopeThis = this;
        $('.zc_value_input').each(function()
        {
            $(this).change(function()
            {
                try
                {
                   ga('send', 'event', 'Search Filter', 'Interaction', $(this).attr('zc_filter_name'));
                }
                catch (ex)
                {
                }
                scopeThis.updateFilterValues($(this).attr('zc_filter_name'), $(this).val());
                scopeThis.addParamsToUrl($(this).attr('zc_filter_name'),$(this).val());
                scopeThis.callback(scopeThis.callbackObject, false, $(this).attr('zc_filter_name'));
            });
        });
    },

    attachCheckInputListeners: function ()
    {
        var scopeThis=this;
        $('.zc_check_input').each(function()
        {
            $(this).change(function()
            {
                try
                {
                   ga('send', 'event', 'Search Filter', 'Interaction', $(this).attr('zc_filter_name'));
                }
                catch (ex)
                {
                }
                var itemId = $(this).val();
                var checked = $(this).prop('checked');
                var name = $(this).attr('zc_filter_name');
                var id = $(this).attr('id');
                scopeThis.updateCheckFilterValues(name, itemId, checked);
                var type = 'off';
                if (checked)
                {
                    type = 'on';
                }
                if (isMobileVariable)
                {
                    if (checked)
                    {
                        $("label[for="+id+"]").removeClass('ui-checkbox-off').addClass('ui-checkbox-on');
                    }
                    else
                    {
                        $("label[for="+id+"]").removeClass('ui-checkbox-on').addClass('ui-checkbox-off');
                    }
                }
                scopeThis.addParamsToUrl(id, checked);
                scopeThis.callback(scopeThis.callbackObject, false, name, type, itemId);
            });
        });
    },

    attachPriceFilterListeners: function()
    {
        var scopeThis = this;
        this.$priceFilter.currentMin = this.$priceFilter.filterMinimum;
        this.$priceFilter.currentMax = this.$priceFilter.filterMaximum;
        this.$priceFilter.slider(
        {
            range: true,
            min: this.$priceFilter.filterMinimum,
            max: this.$priceFilter.filterMaximum,
            step: 5,
            values: [this.$priceFilter.filterMinimum, this.$priceFilter.filterMaximum],
            slide: function (event, slider)
            {
                scopeThis.applyPriceSliderChanges(slider);
            },
            change: function (event, slider)
            {
                if (event && event.originalEvent && event.originalEvent.type === "mouseup")
                {
                    try
                    {
                        ga('send', 'event', 'Search Filter', 'Interaction', 'price');
                    }
                    catch (ex)
                    {
                    }
                    var selectedMax = slider.values[1];
                    var selectedMin = slider.values[0];
                    var varType = null;
                    if (selectedMax !== scopeThis.$priceFilter.currentMax)
                    {
                        scopeThis.$priceFilter.currentMax = selectedMax;
                        if (selectedMax === scopeThis.$priceFilter.slider("option", "max"))
                        {
                            selectedMax = 0;
                        }
                        scopeThis.updateFilterValues('maximumPrice', selectedMax);
                        varType = 'maximumPrice';
                        scopeThis.addParamsToUrl('maximumPrice', selectedMax);
                    }
                    else if (selectedMin !== scopeThis.$priceFilter.currentMin)
                    {
                        scopeThis.updateFilterValues('minimumPrice', selectedMin);
                        scopeThis.$priceFilter.currentMin=selectedMin;
                        varType = 'minimumPrice';
                        scopeThis.addParamsToUrl('minimumPrice', selectedMin);
                    }
                    scopeThis.callback(scopeThis.callbackObject, false, varType);
                }
            }
        });
    },

    attachClearAllListeners: function()
    {
        $('#clearAllBtn').click(function()
        {
            $('#date').val('').change();
            $('#time').val('-1').change();
            $('#duration').val('0').change();
            $('#guests').val('0').change();
            $("#slider-range").slider({
                values: [0, 500]
            }).change();
            $('#slider_user_hourly_min_text').text(0);
            $('#slider_user_hourly_max_text').text(500);
            $('li.checkbox-option.option').each(function()
            {
                $(this).removeClass('selected');
            });
            history.pushState("", document.title, window.location.pathname);
        });
    },

    attachBookingTypeListeners: function()
    {
        var scopeThis = this;
        $('#search_tabs').find('li').click(function()
        {
            var book_type_id = $(this).attr('zc_book_type_id');
            $('#home_search_book_type').val(book_type_id);
            scopeThis.updateFilterValues('bookingTypeSs', book_type_id);
        });
    },

    addParamsToUrl: function(filter,value)
    {
        if (isMobileVariable)
        {
            var param;
            if (window.location.search == '')
            {
                param = '?'+filter+'='+ value;
            }
            else
            {
                var url = new Url(window.location.href);
                url.query[filter] = value;
                param = '?' + url.toString().split('?')[1];
            }
            history.pushState({
                filter: 1
            }, document.title, param);
        }
    },

    applyPriceSliderChanges: function(slider)
    {
        var absoluteMax = this.$priceFilter.slider("option", "max");
        this.$priceFilter.$minHourlyText.html(slider.values[0]);
        this.$priceFilter.$minDailyText.html((slider.values[0]*this.$priceFilter.dayRateMultiplier));
        this.$priceFilter.$maxHourlyText.html([slider.values[1], ((slider.values[1] === absoluteMax) ? "+" : "")].join(""));
        this.$priceFilter.$maxDailyText.html([(slider.values[1]*this.$priceFilter.dayRateMultiplier), ((slider.values[1] === absoluteMax) ? "+" : "")].join(""));
    },

    updateFilterValues: function(name, value)
    {
        this.filters[name] = value;
    },

    updateCheckFilterValues: function(filterName, value, include)
    {
        if (include)
        {
            if (typeof this.filters[filterName] === 'undefined')
            {
                this.filters[filterName] = [];
            }
            this.filters[filterName].push(value);
        }
        else
        {
            if (!(typeof this.filters[filterName] === 'undefined'))
            {
                var filterIndex = this.filters[filterName].indexOf(value);
                if (filterIndex !== -1)
                {
                    this.filters[filterName].splice(filterIndex,1);
                }
            }
        }
    },

    getFiltersAsJson: function()
    {
        var filtersObject = {};
        $.extend(filtersObject, this.filters);
        return filtersObject;
    }
};