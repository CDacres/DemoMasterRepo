$(document).ready(function() {
    getUserVenues();
});

function getUserVenues() {
    $.get(base_url + 'api/v1/venues', function(response) {
        populateUserVenues(response);
    })
    .error(console.log);
}

function populateUserVenues(userVenues) {
    if (_.isArray(userVenues) && !_.isEmpty(userVenues)) {
        var counter = 0;
        _.each(userVenues, function(venue, i) {
            var venueCardTemplate = _.template($('#VenueCard').html());
            $('#venueCards').append(venueCardTemplate(venue));
            counter++;
        });
        if (counter == userVenues.length) {
            var AddVenueCardTemplate = _.template($('#AddVenueCard').html());
            $('#venueCards').append(AddVenueCardTemplate());
        }
    }
    else
    {
        var NoVenuesCardTemplate = _.template($('#NoVenuesCard').html());
        $('#venueCards').append(NoVenuesCardTemplate());
    }
}

// module.exports = {
//     getUserVenues: getUserVenues,
//     populateUserVenues: populateUserVenues
// }
