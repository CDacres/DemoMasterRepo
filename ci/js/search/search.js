/* Administrative scripts. Called functions only - no long rambling scripts! */

var mappableWidth = 768; // width of window above which we launch the map
var searchtron = ZipcubeSearch;

var searchInitParams = {
    sensitivity: 0.01,  //how many degrees need change before reload
    searchPageHasMetaData: true,
    resultsBoxId: "#results",
    scrollArea: "#sidebar",
    centre: centre,
    auditToken: _r_jt,
    widgetMode: isWidget
};

var mapInitParams = {
    mapBoxId: "#search_map",
    mapOptionsId: "#map_options",
    mapRedoSearchCheckId: "#redo_search_in_map",
    callback: searchtron.mapCallback,
    callbackObject: searchtron,
    widgetMode: isWidget
};

var filterInitParams = {
    callback: searchtron.filterCallback,
    callbackObject: searchtron,
    sliderInitParams: {
        sliderId: "#slider-range",
        sliderMinDailyTextBoxId: '#slider_user_daily_min_text',
        sliderMaxDailyTextBoxId: '#slider_user_daily_max_text',
        sliderMinHourlyTextBoxId: '#slider_user_hourly_min_text',
        sliderMaxHourlyTextBoxId: '#slider_user_hourly_max_text',
        filterMinimum: price_filter_minimum,
        filterMaximum: price_filter_maximum,
        dayRateMultiplier: day_rate_multiplier
    },
    initialFilters: initialFilters
};

// var mixPanelSearch = MixPanelSearch;

var impressions = [];

var tempUrlParams;

$(document).ready(function () {
    addDynamicPageElements();
    (!isMobileVariable) && turnOffMapSearchWhenNoMap();
    initiateMapAndSearchObjects();
    mobileBottomMenu();
    if (isMobileVariable) {
        if (typeof $.mobile !== 'undefined') {
            $.mobile.pageContainer.on("pagecontainershow", function (event, ui) {
                addPositionDataAttributes();
            });
        }
    }
    else {
        addPositionDataAttributes();
    }
    // mixPanelSearch.init();
    getClickedSearchResult();
    if (!isAdmin) {
        getSearchResultImpressions();
        $('#sidebar').scroll(function () {
            getSearchResultImpressions();
        });
    }
    removeHashFromUrl();
    setInitialFilters();
    insertSelectedOption();
    if (isMobileVariable) {
        getCurrentGeo();
        // clearPopupHash()
    }
    didYouFindMessage();
    appendRoomResultUrls();
});

/* Functions only below here... */

function addDynamicPageElements() {
    attachLocationToggle();
    attachFilterToggles();
    attachDatePicker();
}

function removeHashFromUrl() {
    $("#full_modal").on("hidden.bs.modal", function () {
        searchtron.clearModalDataOnClose();
    });
}

function addPositionDataAttributes() {
    $('.search_result').each(function (index) {
        $(this).attr('data-position', index + 1);
    });
}

function getSearchResultImpressions() {
    $('.search_result:in-viewport').map(function () {
        var impressionId = this.id;
        var impression = {
            id: impressionId,
            name: $(this).data('title'),
            variant: $(this).data('venuename'),
            brand: $(this).data('companyname'),
            position: $(this).data('position')
        };
        impressions.push(impressionId);
        preUnique = impressions.concat($(impressionId).get());
        postUnique = $.unique(impressions);
        var is_unique = (preUnique.length == postUnique.length) && preUnique.every(function (element, index) {
            return element === postUnique[index];
        });
        if (is_unique) {
            getImpressionData(impression);
        }
    });
}

function getImpressionData(impression) {
    if ($('#search_bar').val() === '') {
        impression.list = "London";
    }
    else {
        impression.list = $('#search_bar').val();
    }
    sendImpressionToGa(impression);
}

function sendImpressionToGa(impression) {
    ga('ec:addImpression', impression);
    ga('send', {
        hitType: 'event',
        eventCategory: 'UX',
        eventAction: 'impression',
        eventLabel: impression.list
    });
}

function getClickedSearchResult() {
    var search;
    $('.listing-img-container').click(function () {
        if ($('#search_bar').val() === '') {
            search = "London";
        } else {
            search = $('#search_bar').val();
        }
        var data = {
            id: this.id,
            name: $(this).data('title'),
            variant: $(this).data('venuename'),
            brand: $(this).data('companyname'),
            list: search,
            position: $(this).data('position')
        };
        if (!isAdmin) {
            sendClickToGa(data);
        }
    });
}

function sendClickToGa(data) {
    ga('ec:addProduct', data);
    ga('ec:setAction', 'click', {
        list: data.list
    });
    ga('send', {
        hitType: 'event',
        eventCategory: 'UX',
        eventAction: 'click',
        eventLabel: data.list
    });
}

function attachFilterToggles() {
    $('#time_toggle').click(function () {
        $('#amenities').hide();
        $('#configurations').hide();
        $('#select_time').show();
        $('#show_listings_button').show();
    });
    $('#config_toggle').click(function () {
        $('#amenities').hide();
        $('#select_time').hide();
        $('#configurations').show();
        $('#show_listings_button').show();
    });
    $('#amenities_toggle').click(function () {
        $('#configurations').hide();
        $('#select_time').hide();
        $('#amenities').show();
        $('#show_listings_button').show();
    });
    $('#show_listings_button').click(function () {
        $('#select_time').hide();
        $('#configurations').hide();
        $('#amenities').hide();
        $('#show_listings_button').hide();
    });
}

function attachLocationToggle() {
    $('#last_breadcrumb').click(function (e) {
        e.preventDefault();
        $('#location_container').toggle();
    });
}

function attachDatePicker() {
    $('.date').datepicker({
        dateFormat: "yy-mm-dd"
    });
    $.datepicker.setDefaults($.datepicker.regional[language_code]);
}

function initiateMapAndSearchObjects() {
    searchtron.init(searchInitParams);
    searchtron.setMarkers(mapMarkers.objects);
    (!isMobileVariable) && handleMap();
    searchtron.filtertron.init(filterInitParams);
}

function turnOffMapSearchWhenNoMap() {
    $(window).resize(function () {
        handleMap();
    });
}

function handleMap() {
    if (useMap()) {
        $('#redo_search_in_map').prop('checked', true);
        searchtron.initMapOnceOrSetActive(mapInitParams);
    }
    else {
        $('#redo_search_in_map').prop('checked', false);
        searchtron.setMapActivity(false);
    }
}

function useMap() {
    /*    return $(window).width() >= mappableWidth;*/
    return true;
}

function mobileBottomMenu() {
    /*mobile bottom menu*/
    $('#map-display').click(function () {
        $('#map').addClass('visible-xs');
        $('#sidebar').addClass('sidebar-map-on');
        $('#list').addClass('hidden-xs');
    });

    $('#list-display').click(function () {

        $('#map').removeClass('visible-xs');
        $('#sidebar').removeClass('sidebar-map-on');
        $('#list').removeClass('hidden-xs');

    });
}

function setInitialFilters() {
    $('input#date').datepicker("setDate", $('.date').val());
    $('input#date').val($('.date').val()).change();
    $('.js-date-input').val($('.date').val());
    var topTimeFilter = $('select#time')[0];
    $('.js-time-input').val($(topTimeFilter).find(':selected').text());
    var topGuestsFilter = $('select#guests')[0];
    $('.js-guests-input').val($(topGuestsFilter).find(':selected').text());
    if (isMobileVariable) {
        updateFiltersFromUrl();
        checkHashUrl();
    }
}

function updateFiltersFromUrl() {
    var filters = new Url(window.location.href).query;
    var result = [];
    var minimumPrice, maximumPrice;
    for (var i in filters) result.push({ key: i, val: filters[i] });
    if (filters.location && filters.location != null) {
        $('span.location-name').text(filters.location);
        searchtron.filtertron.updateFilterValues('location', filters.location);
        searchtron.filtertron.updateFilterValues('lat', filters.lat);
        searchtron.filtertron.updateFilterValues('long', filters.long);
        // searchtron.filtertron.callback(searchtron.filtertron.callbackObject, true, 'location');
    }
    if (!filters.currentPage || filters.currentPage == null) {
        searchtron.filtertron.updateFilterValues('currentPage', 1);
        searchtron.addOneOffFilter('currentPage', 1);
    }
    result.forEach(function (filter) {
        if (filter.key == 'minimumPrice') {
            return minimumPrice = filter.val;
        }
        if (filter.key == 'maximumPrice') {
            return maximumPrice = filter.val;
        }
        if (filter.key.indexOf('configurations') == 0 || filter.key.indexOf('amenities') == 0) {
            var liId = filter.key.split('s')[1];
            if (filter.val == 'true') $('#' + liId).addClass('selected');
            return;
            // return $("#"+filter.key).attr("checked",filter.val).attr("data-cacheval",!filter.val).change();
            // $("#"+filter.key).attr("data-cacheval",!filter.val).change()
        }
        if (filter.key == 'lat' || filter.key == 'long') return;
        // if(filter.key == 'location')$('span.location-name').text(filter.val);
        //
        // searchtron.filtertron.callback(searchtron.filtertron.callbackObject, true, 'location');

        $('#' + filter.key).val(filter.val).change();

    });
    minimumPrice ? minimumPrice : minimumPrice = 0;
    maximumPrice ? maximumPrice : maximumPrice = 500;
    var sliderVal = {
        range: true,
        min: minimumPrice,
        max: maximumPrice,
        step: 5,
        values: [minimumPrice, maximumPrice]
    };
    $("#slider-range").slider({
        values: [minimumPrice, maximumPrice]
    });
    if (searchtron.loadMoreResults) {
        $('.zc_pagination').css({
            "display": 'block'
        });
    }
    else {
        $('.zc_pagination').css({
            "display": 'none'
        });
    }
    searchtron.filtertron.applyPriceSliderChanges(sliderVal);
    ZipcubeSearch.performNewSearch();
}

function checkHashUrl() {
    $(window).hashchange(function (e) {
        if (e.originalEvent.oldURL.indexOf('#select-location') >= 0) {
            this.updateFiltersFromUrl();
        }
    });
}

function getCurrentGeo() {
    var latitudeAndLongitude = document.getElementById("currentLocation"),
        location = {
            latitude: '',
            longitude: ''
        };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorGeoPosition, { maximumAge: 0, timeout: 5000 });
    }
    else {
        latitudeAndLongitude.innerHTML = "Geolocation is not supported by this browser.";
    }


}
function showPosition(position) {
    location.latitude = position.coords.latitude;
    location.longitude = position.coords.longitude;
    var geocoder = new google.maps.Geocoder();
    var latLng = new google.maps.LatLng(location.latitude, location.longitude);
    if (geocoder) {
        geocoder.geocode({
            'latLng': latLng
        }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var serachUrl = '/s?location=' + results[1].formatted_address.split(',')[0] + '&lat=' + location.latitude + '&long=' + location.longitude;
                    $('#currentLocation').attr('href', serachUrl);
                    $('#currentPlace').text(results[1].formatted_address.split(',')[0]);
                }
                else {
                    $('#current-location').remove();
                    console.log("Geocoding failed: " + status);
                }
            });
    }
}

function errorGeoPosition(error) {
    $('#current-location').remove();
    console.log('error geo', error);
}

$('#select-map').bind('pageshow', function (event) {
    handleMap();
});

$('.filter-location').click(function () {
    tempUrlParams = location.search;
});

$('#select-location').bind('pageshow', function (event) {
    updateLocationUrl();
    tempUrlParams = tempUrlParams ? tempUrlParams : location.search;
});

$('#main-menu-link').click(function () {
    tempUrlParams = location.search;
});

$(document).on('pageshow', '#main-menu', function () {
    updateRoomTypeUrl();
});

function updateLocationUrl() {
    $('.place-link').each(function () {
        $(this).click(function () {
            var locationParams = $(this).attr('params');
            var url = new Url(tempUrlParams);
            if (url.query['location'] || url.query['lat'] || url.query['long']) {
                delete url.query['location'];
                delete url.query['lat'];
                delete url.query['long'];
                url.path = '/s';
                var count = 0;
                for (var i in url.query) {
                    if (url.query.hasOwnProperty(i)) {
                        count++;
                    }
                }
                if (count > 0) {
                    location.href = url.toString() + '&' + locationParams;
                }
                else {
                    location.href = url.toString() + '?' + locationParams;
                }
            }
            else {
                if (tempUrlParams) {
                    location.href = 's' + tempUrlParams + '&' + locationParams;
                }
                else {
                    location.href = 's?' + locationParams;
                }
            }
        });
    });
}

function updateRoomTypeUrl() {
    $('#search_tabs li').each(function () {
        $(this).find("a").attr('href', '#');
        $(this).click(function () {
            var roomTypeParams = $(this).attr('zc_book_type_id');
            if (location.href.indexOf('search_filters%5Blocation%5D=&search_filters%5Blat%5D=&search_filters%5Blong%5D=&search_filters%5BbookingTypeSs%5D=') == -1) {
                if (location.search) {
                    location.href = location.href.split('#')[0] + '&search_filters%5Blocation%5D=&search_filters%5Blat%5D=&search_filters%5Blong%5D=&search_filters%5BbookingTypeSs%5D=' + roomTypeParams;
                }
                else {
                    location.href = location.href.split('#')[0] + '?search_filters%5Blocation%5D=&search_filters%5Blat%5D=&search_filters%5Blong%5D=&search_filters%5BbookingTypeSs%5D=' + roomTypeParams;
                }
            }
            else {
                var startSubstring = location.href.indexOf('search_filters%5Blocation%5D=&search_filters%5Blat%5D=&search_filters%5Blong%5D=&search_filters%5BbookingTypeSs%5D=');
                location.href = location.href.replace(location.href.substring(startSubstring, startSubstring + 116), 'search_filters%5Blocation%5D=&search_filters%5Blat%5D=&search_filters%5Blong%5D=&search_filters%5BbookingTypeSs%5D=' + roomTypeParams);
            }
        });
    });
}

function insertSelectedOption() {
    $('.date').change(function () { //when selected value changed
        $('.js-date-input').val($(this).val());  //change value in textbox
    });

    $('.time').change(function () { //when selected value changed
        $('.js-time-input').val($('option:selected', $(this)).text());  //change value in textbox
        $('.js-checkin-input').val($('option:selected', $(this)).text());  //change value in textbox
    });

    $('.duration').change(function () { //when selected value changed
        $('.js-duration-input').val($('option:selected', $(this)).text());  //change value in textbox
    });

    $('.guests').change(function () { //when selected value changed
        $('.js-guests-input').val($('option:selected', $(this)).text());  //change value in textbox
    });

}

$(document).on('pageshow', '#select-map', function () {
    handleMap();
});

$(document).on('pageinit', '#select-location', function () {
    initialize();
    var $pacContainer = null;
    $('#location').click(function (e) {
        $(this).val('');
    }).keyup(function (e) {
        if ($('#location').val() == '') {
            $('#results-list').hide();
        }
        else {
            $('#results-list').show();
        }
        if (!$pacContainer || !$pacContainer.length) {
            $pacContainer = $('.pac-container');
            $('#google-res').html($pacContainer);
        }
        if ($pacContainer.is(':visible')) {
            e.preventDefault();
        }
    });
});

function initialize() {
    var input = document.getElementById('location');
    // restrict to multiple cities? //
    var options = {
        // types: ['(cities)'],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place1 = autocomplete.getPlace();
        console.log('place1', place1);
        $('#city1').val(place1.name).change();
        $('#city1Lat').val(place1.geometry.location.lat()).change();
        $('#city1Lng').val(place1.geometry.location.lng()).change();
    });

    $('.venue-link').click(function() {
        window.dataLayer.push({
            "event": "productClick",
            "ecommerce": {
                "click": {
                    "products": [
                        {
                            "name": $(this).data('room-name'),
                            "id": $(this).data('room-id'),
                            "price": $(this).data('room-price'),
                            "brand": $(this).data('venue-name'),
                            "category": zc_booking_type
                        }
                    ]
                }
            }
        });
    });
}

function didYouFindMessage() {
    $('.message_button').click(function () {
        if (this.id == 'message_reply_yes') {
            $('#initial_question').hide();
            $('#got_it').show();
        }
    });
}

function appendRoomResultUrls() {
    $('#date').change(function () {
        var date = $(this).val();
        var $firstRoom = $($('a.media-photo')[0]);
        var old_href = $firstRoom.attr("href");
        setTimeout(function () {
            $('a.media-photo').each(function () {
                var _href = $(this).attr("href");
                if (old_href.indexOf('?') > -1) {
                    $(this).attr("href", old_href + '&date=' + date);
                } else {
                    $(this).attr("href", _href + '?date=' + date);
                }
            });
        }, 1500);
    });
    $('#time').change(function () {
        var startTime = $('select#time').val();
        var $firstRoom = $($('a.media-photo')[0]);
        var old_href = $firstRoom.attr("href");
        setTimeout(function () {
            $('a.media-photo').each(function () {
                var _href = $(this).attr("href");
                if (old_href.indexOf('?') > -1) {
                    $(this).attr("href", old_href + '&startTime=' + startTime);
                } else {
                    $(this).attr("href", _href + '?startTime=' + startTime);
                }
            });
        }, 1500);
    });
    $('#duration').change(function () {
        var duration = $('select#duration').val();
        var $firstRoom = $($('a.media-photo')[0]);
        var old_href = $firstRoom.attr("href");
        setTimeout(function () {
            $('a.media-photo').each(function () {
                var _href = $(this).attr("href");
                if (old_href.indexOf('?') > -1) {
                    $(this).attr("href", old_href + '&duration=' + duration);
                } else {
                    $(this).attr("href", _href + '?duration=' + duration);
                }
            });
        }, 1500);
    });
    $('#guests').change(function () {
        var guests = $('select#guests').val();
        var $firstRoom = $($('a.media-photo')[0]);
        var old_href = $firstRoom.attr("href");
        setTimeout(function () {
            $('a.media-photo').each(function () {
                var _href = $(this).attr("href");
                if (old_href.indexOf('?') > -1) {
                    $(this).attr("href", old_href + '&guests=' + guests);
                } else {
                    $(this).attr("href", _href + '?guests=' + guests);
                }
            });
        }, 1500);
    });
}
