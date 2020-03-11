$(document).ready(function()
{
    setFilters();
    changeFilters();
    filterCheckboxSelect();
    populateDateSelector();
    if (typeof $.mobile !== 'undefined') {
        $.mobile.pageContainer.on('pagecontainershow', function(event, ui) {
            getLocation();
            populateRecentLocations();
        });
    }
    $('#number_of_guests').change(function() {
        if (typeof $.mobile !== 'undefined') {
            $.mobile.silentScroll(0);
        }
    });
});

function setFilters()
{
    $('.browse-filter').each(function()
    {
        var id = $(this).attr('id');
        $('.' + id + '-filter-text').text($('option:selected', this).text());
    });
}

function changeFilters()
{
    $('.browse-filter').change(function()
    {
        var id = $(this).attr('id');
        $('.' + id + '-filter-text').text($('option:selected', this).text());
    });
}

function filterCheckboxSelect()
{
    $('li.checkbox-option').click(function()
    {
        $(this).toggleClass('selected');
        var id = $(this).attr('id');
        var name = $(this).attr('name');
        var checkbox = $('#'+name+id);
        var checked = checkbox.prop('checked');
        checkbox.prop('checked', !checked).change();
    });
}

function getUrlParameter(sParam)
{
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');
    var sParameterName;
    var i;
    for (i = 0; i < sURLVariables.length; i++)
    {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam)
        {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function getLocation()
{
    var locationName = $('.location-name').text();
    var location = {
        "name": locationName
    };
    if (locationName == 'London')
    {
        location.lat = "51.5073509";
        location.long = "-0.12775829999998223";
    }
    else
    {
        location.lat = getUrlParameter('lat');
        location.long = getUrlParameter('long');
    }
    storeRecentLocations(location);
}

function checkForDuplicateLocations(arr, location)
{
  return arr.some(function(el)
  {
    return el.name === location;
  });
}

function storeRecentLocations(location)
{
    var recentLocationsStr = sessionStorage.getItem('recentLocations');
    if (recentLocationsStr !== null)
    {
        var recentLocationsObj = JSON.parse(recentLocationsStr);
        var locationsArray = recentLocationsObj.locations;
        if (!checkForDuplicateLocations(locationsArray, location.name))
        {
            locationsArray.push(location);
            recentLocationsStr = JSON.stringify(recentLocationsObj);
        }
    }
    else
    {
        var recentLocations = {
            locations: []
        };
        var locations = recentLocations.locations;
        locations.push(location);
        recentLocationsStr = JSON.stringify(recentLocations);
    }
    sessionStorage.setItem('recentLocations', recentLocationsStr);
}

function populateRecentLocations()
{
    var recentLocationsObj = sessionStorage.getItem('recentLocations');
    if (recentLocationsObj !== null)
    {
        var recentLocationsCopy = JSON.parse(recentLocationsObj);
        var locationsArray = recentLocationsCopy.locations;
        $.each(locationsArray, function(index, location)
        {
            $('#recent-locations').append('<li class="search-result-locations"><a data-id="1" href="#" params="location=' + location.name + '&lat=' + location.lat + '&long=' + location.long + '" class="ui-btn ui-btn-icon-right ui-icon-carat-r location-link place-link" data-ajax="false">' + location.name + '</a></li>');
        });
    }
}

function populateDateSelector()
{
    var d = new Date();
    var tomorrow = new Date(d.setDate(d.getDate() + 1));
    var todayFormated = formatDate(new Date());
    var tomorrowFormated = formatDate(tomorrow);
    $('#date').append('<option class="today" value="'+todayFormated.val+'">Today</option>');
    $('#date').append('<option class="tomorrow" value="'+tomorrowFormated.val+'">Tomorrow</option>');
    for (var i = 0; i < 30; i++)
    {
        var day = new Date(d.setDate(d.getDate()+1));
        var formatedDate = formatDate(day);
        $('#date').append('<option class="day" value="'+formatedDate.val+'">'+formatedDate.label+'</option>');
    }
}

function formatDate(date)
{
    if (date != 'Invalid Date')
    {
        var month = date.getMonth();
        var monthLength = date.getMonth().toString().length;
        if (monthLength == 1 && month !== 9)
        {
            month = '0' + (date.getMonth() + 1);
        }
        else
        {
            month = date.getMonth() + 1;
        }
        var day = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate();
        var dateFormat = date.getFullYear() + '-' + month + '-' + day;
        var dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var labelFormat=dateFormat+ ' '+dayOfWeek[date.getDay()];
        return {
            val:dateFormat,
            label:labelFormat
        };
    }
}

$('#location').change(function()
{
    if ($('#location').val() === '')
    {
        $('#location').blur();
    }
});
