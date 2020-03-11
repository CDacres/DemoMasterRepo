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

//auth
$app->get('/auth/me', 'AuthController@me');

//users
$app->get('/users/{id}', 'Users@find');
$app->get('/users/{id}/venues', 'Venues@get_user_collection');

//Standard shape: done
//All new routes should go in here. See readme above.

//Attributes
$app->post('/asset_attributes/', 'AssetAttributes@create');
$app->delete('/asset_attributes/{id}', 'AssetAttributes@delete');

//Cancellation Terms
$app->post('/cancellation_terms/', 'CancellationTerms@create');
$app->patch('/cancellation_terms/{id}', 'CancellationTerms@update');
$app->delete('/cancellation_terms/{id}', 'CancellationTerms@delete');

//Configurations
$app->post('assets/{asset_id}/guest_capacities/', 'AssetConfigurations@create_for_asset');
$app->post('/guest_capacities/', 'AssetConfigurations@create');
$app->patch('/guest_capacities/{id}', 'AssetConfigurations@update');
$app->delete('/guest_capacities/{id}', 'AssetConfigurations@delete');

//DDR Includes
$app->post('assets/{asset_id}/ddr_includes/', 'AssetDDRIncludes@create_for_asset');
$app->post('/ddr_includes/', 'AssetDDRIncludes@create');
$app->patch('/ddr_includes/{id}', 'AssetDDRIncludes@update');
$app->delete('/ddr_includes/{id}', 'AssetDDRIncludes@delete');

//Facilities
$app->post('assets/{asset_id}/facilities/', 'Facilities@create_for_asset');
$app->post('/facilities/', 'Facilities@create');
$app->patch('/facilities/{id}', 'Facilities@update');
$app->delete('/facilities/{id}', 'Facilities@delete');

//Asset Images
$app->get('/assets/{asset_id}/images/', 'AssetImages@find');
$app->post('/asset_images/', 'AssetImages@create');
$app->post('/assets/{asset_id}/images', 'AssetImages@create_for_asset');
$app->patch('/asset_images/{id}', 'AssetImages@update');
$app->delete('/asset_images/{id}', 'AssetImages@delete');

//Incentives
$app->post('/booking_incentives/', 'AssetBookingIncentives@create');
$app->patch('/booking_incentives/{id}', 'AssetBookingIncentives@update');
$app->delete('/booking_incentives/{id}', 'AssetBookingIncentives@delete');
$app->post('/office_incentives/', 'AssetOfficeIncentives@create');
$app->patch('/office_incentives/{id}', 'AssetOfficeIncentives@update');
$app->delete('/office_incentives/{id}', 'AssetOfficeIncentives@delete');

//Discounts
$app->post('/discounts/', 'AssetDiscounts@create');
$app->patch('/discounts/{id}', 'AssetDiscounts@update');
$app->delete('/discounts/{id}', 'AssetDiscounts@delete');

//Set Menus
$app->post('/set_menus/', 'AssetSetMenus@create');
$app->patch('/set_menus/{id}', 'AssetSetMenus@update');
$app->delete('/set_menus/{id}', 'AssetSetMenus@delete');

//Min Spend
$app->post('/minimum_spend_requirements/', 'AssetMinimumSpends@create');
$app->patch('/minimum_spend_requirements/{id}', 'AssetMinimumSpends@update');
$app->delete('/minimum_spend_requirements/{id}', 'AssetMinimumSpends@delete');

//Rooms
$app->post('/rooms/', 'Rooms@create');
$app->patch('/rooms/{id}', 'Rooms@update');
$app->delete('/rooms/{id}', 'Rooms@delete');

//Tags
$app->get('/tags/', 'Tags@get_all');
$app->post('/asset_tags/', 'AssetTags@create');
$app->patch('/asset_tags/{id}', 'AssetTags@update');
$app->delete('/asset_tags/{id}', 'AssetTags@delete');

//Venues
$app->post('/venues/', 'Venues@create');
$app->patch('/venues/{id}', 'Venues@update');
$app->delete('/venues/{id}', 'Venues@delete');

//Mirrors
$app->post('/mirrors/', 'Mirrors@create');
$app->post('/asset_mirrors/', 'AssetMirrors@create');