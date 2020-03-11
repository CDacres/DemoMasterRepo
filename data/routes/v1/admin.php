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

$app->get('/tags_deprecated/', 'Tags@get_all_tags_deprecated');
$app->get('/configs/', 'Configs@get_all_configs');
$app->get('/atts/', 'Atts@get_all_atts');
$app->put('/assets/{asset_id}/tags/', 'Assets@add_tag');
$app->delete('/assets/{asset_id}/tags/{tag_id}', 'Assets@delete_tag');
$app->put('/assets/{asset_id}/atts/', 'Assets@add_attribute');
$app->delete('/assets/{asset_id}/atts/{att_id}', 'Assets@delete_attribute');
$app->put('/images/{image_id}/configs/', 'AssetImages@set_config');
$app->delete('/images/{image_id}/configs/{config_id}', 'AssetImages@delete_config');
$app->put('/images/{image_id}/flag/', 'AssetImages@set_flagged');
$app->put('/images/{image_id}/cosmetic/', 'AssetImages@set_cosmetic');

//Site Images
$app->get('/site_images/{image_id}', 'SiteImages@find');
$app->post('/site_images/', 'SiteImages@create');

// hack for quick solution while developing on other branch. TODO: Use real Venues controller and replace with a patch.
$app->put('/venues/{venue_id}/agreed', 'VenuesTemp@agreed_to_list');



//Standard shape: done
//All new routes should go in here. See readme above.
