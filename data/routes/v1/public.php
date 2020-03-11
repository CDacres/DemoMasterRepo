<?php

/*
        ██████╗ ███████╗ █████╗ ██████╗     ███╗   ███╗███████╗
        ██╔══██╗██╔════╝██╔══██╗██╔══██╗    ████╗ ████║██╔════╝
        ██████╔╝█████╗  ███████║██║  ██║    ██╔████╔██║█████╗
        ██╔══██╗██╔══╝  ██╔══██║██║  ██║    ██║╚██╔╝██║██╔══╝
        ██║  ██║███████╗██║  ██║██████╔╝    ██║ ╚═╝ ██║███████╗
        ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝     ╚═╝     ╚═╝╚══════╝
 *
 *  We are aiming to standardise all publically available json points.
 *  This means there are rules.
 *  If you do not know the rules, ask someone who does.
 *  If this is post-zombie-apocalypse and you are the last person alive (and
 *  so there's *nobody* to ask) check the venues controller and check out
 *  the transformers and serialisers in there and try to work it out from that
 */

//  Standard shape: pending  - Not yet standardised. Move to bottom set when done
//  No new routes should go in here



$app->get('search', 'Search@get');

$app->get('tagging/default_label', 'TagLabels@get_default');
$app->get('tagging/default_labels', 'TagLabels@get_default_labels');
$app->get('tagging/home_sub_tags', 'TagLabels@get_home_sub_tags');
$app->get('tagging/search_labels', 'TagLabels@get_all_labels_and_defaults_for_search');
$app->get('tagging/all_labels', 'TagLabels@get_all_labels');
$app->get('tagging/label_by_id/{id}', 'TagLabels@get_by_id');
$app->get('tagging/label_by_vertical_id/{vertical_id}', 'TagLabels@get_by_vertical_id');
$app->get('tagging/metas_by_slug/{tag_slug}', 'TagLabelMetas@get_by_slug');
$app->get('tagging/metas_by_tag_id/{tag_id}', 'TagLabelMetas@get_by_tag_id');
$app->get('landing_pages/{landing_page_id}', 'LandingPages@get_landing_page_by_id');
$app->get('landing_pages/by_tag_id/{tag_id}', 'LandingPages@get_browse_pages_by_tag_id');
$app->get('landing_pages/by_tag_label_id/{tag_label_id}', 'LandingPages@get_landing_pages_by_tag_label_id');
$app->get('landing_pages/by_location_id/{location_id}', 'LandingPages@get_landing_pages_by_location_id');
$app->get('landing_pages/by_tag_label_and_location_ids/{tag_label_id}/{location_id}', 'LandingPages@get_landing_pages_by_tag_label_and_location_ids');

$app->get('tags/default_tag', 'TagLabels@get_default'); //deprecated. Remove when safe.

$app->get('verticals/', 'Verticals@get_all_verticals');
$app->get('verticals/{vertical_id}', 'Verticals@get_vertical_by_id');

//Standard shape: done
//All new routes should go in here. See readme above.

//Contexts
$app->get('contexts/', 'Contexts@get_all');
$app->get('contexts/{context}', 'Contexts@get');

//Dining Periods
$app->get('dining_periods/', 'DiningPeriods@get_all');

//Facilities
$app->get('assets/{asset_id}/facilities', 'Facilities@get_all_by_asset');
$app->get('facilities/{id}', 'Facilities@get');

//Filters
$app->get('filters/', 'Amenities@get_all_filters');

//Images
$app->get('asset_images/{id}', 'AssetImages@get');

//Rooms
$app->get('rooms/{id}', 'Rooms@get');
$app->get('venues/{id}/rooms', 'Rooms@get_venue_collection');

//Venues
$app->get('venues/{id}', 'Venues@get');

//Browse + Landing Pages
$app->post('browse', 'Browse@get_browse');
$app->post('landing', 'Landings@get_landing');

//Widget
$app->get('widget/{domain}/{token}', 'Widgets@get_widget');