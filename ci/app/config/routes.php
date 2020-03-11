<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = "welcome";
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = "errors/page_missing";
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

$route['default_controller'] = "home/index/uk";
$route['en'] = "redirects/generic"; //for old links
$route['en/gb'] = "redirects/generic"; //for old links
$route['([a-zA-Z]{2})'] = "home/index/$1";
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})'] = 'redirects/generic'; //for old links
$route['([a-zA-Z]{2})/sitemaps'] = "home/sitemaps";
$route['([a-zA-Z]{2})/sitemaps/([a-zA-Z0-9%\'\.~-]+)'] = "home/sitemaps/$2";
$route['expire/cron'] = "expire/cron";

$route['auth/facebook/login/callback'] = "auth/facebook_login_callback";
$route['auth/facebook/signup/callback'] = "auth/facebook_signup_callback";
$route['auth/linkedin/login/callback'] = "auth/linkedin_login_callback";
$route['auth/linkedin/signup/callback'] = "auth/linkedin_signup_callback";
$route['auth/google/callback'] = "auth/google_callback";
$route['auth/close'] = "auth/close";

//static
$route['en/contact'] = "redirects/generic//contact"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/contact'] = "redirects/generic//contact"; //for old links
$route['en/faq'] = "redirects/generic//faq"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/faq'] = "redirects/generic//faq"; //for old links
$route['en/how-it-works'] = "redirects/generic//how-it-works"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/how-it-works'] = "redirects/generic//how-it-works"; //for old links
$route['en/how-to-share'] = "redirects/generic//how-to-share"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/how-to-share'] = "redirects/generic//how-to-share"; //for old links
$route['en/about'] = "redirects/generic//about"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/about'] = "redirects/generic//about"; //for old links
$route['en/legal'] = "redirects/generic//legal"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/legal'] = "redirects/generic//legal"; //for old links
$route['en/survey-terms-and-conditions'] = "redirects/generic//survey-terms-and-conditions"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/survey-terms-and-conditions'] = "redirects/generic//survey-terms-and-conditions"; //for old links
$route['get_started'] = "redirects/generic//get-started"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/get_started'] = "redirects/generic//get-started"; //for old links
$route['en/get-started'] = "redirects/generic//get-started"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/get-started'] = "redirects/generic//get-started"; //for old links
$route['en/s'] = "redirects/search"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/404_override'] = "redirects/generic//404_override"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/maintenance'] = "redirects/generic//maintenance"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/request-new-password'] = "redirects/generic//request-new-password"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/set-new-password'] = "redirects/generic//set-new-password"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/terms-and-conditions'] = "redirects/generic//terms-and-conditions"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/home/dashboard'] = "redirects/generic/dashboard"; //for old links
$route['([a-zA-Z]{2}/)?home/dashboard'] = "redirects/generic/dashboard"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/widget'] = "redirects/generic//widget"; //for old links

$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/payments'] = "redirects/generic_with_get//payments"; //for old links

$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/messages/conversation/(:num)'] = "redirects/generic_with_id/messages/conversation/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/write-review/(:any)'] = "redirects/write_review/$3"; //for old links

$route['([a-zA-Z]{2}/)?contact'] = "pages/contact";
$route['([a-zA-Z]{2}/)?faq'] = "pages/faq";
$route['([a-zA-Z]{2}/)?how-it-works'] = "pages/how_it_works";
$route['([a-zA-Z]{2}/)?how-to-share'] = "pages/how_to_share";
$route['([a-zA-Z]{2}/)?about'] = "pages/about";
$route['([a-zA-Z]{2}/)?legal'] = "pages/legal";
$route['([a-zA-Z]{2}/)?survey-terms-and-conditions'] = "pages/survey_ts_and_cs";
$route['([a-zA-Z]{2}/)?get-started'] = "pages/get_started";
$route['sitemap'] = "sitemap_dynamic/index";
$route['([a-zA-Z]{2}/)?404_override'] = "errors/page_missing";
$route['404_override'] = "errors/page_missing";
$route['([a-zA-Z]{2}/)?maintenance'] = "out_of_context/maintenance";
$route['([a-zA-Z]{2}/)?messages/conversation/(:num)'] = "messages/conversation/$2";
$route['([a-zA-Z]{2}/)?request-new-password'] = "users/request_new_password";
$route['([a-zA-Z]{2}/)?set-new-password'] = "users/token_login";
$route['([a-zA-Z]{2}/)?terms-and-conditions'] = "common/modal_terms";
$route['([a-zA-Z]{2}/)?widget'] = "search/widget";
$route['([a-zA-Z]{2}/)?write-review/(:any)'] = "reviews/index/$2";
$route['([a-zA-Z]{2}/)?w/r'] = "reviews/index/reservation";
$route['([a-zA-Z]{2}/)?payments'] = "payments";

// users
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/users/signin'] = "redirects/generic/users/signin"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/users/logout'] = "redirects/generic/users/logout"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/users/signup']= "redirects/generic/users/signup"; //for old links

$route['([a-zA-Z]{2}/)?users/signin'] = "users/signin";
$route['([a-zA-Z]{2}/)?users/logout'] = "users/logout";
$route['([a-zA-Z]{2}/)?users/signup']= "users/signup";
$route['([a-zA-Z]{2}/)?unsubscribe']= "users/unsubscribe";

// administrator
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/administrator'] = 'administrator/backend'; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/administrator/login'] = 'administrator/auth/login'; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/administrator/adopt_profile/(:num)'] = 'administrator/adopt_profile/index/$3'; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/administrator/(:any)'] = 'administrator/$3'; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/info/admin_deny']= 'info/admin_deny'; //for old links

$route['([a-zA-Z]{2}/)?administrator'] = "administrator/backend";
$route['([a-zA-Z]{2}/)?administrator/login'] = "administrator/auth/login";
$route['([a-zA-Z]{2}/)?administrator/adopt_profile/(:num)'] = "administrator/adopt_profile/index/$2";
$route['([a-zA-Z]{2}/)?administrator/(:any)'] = "administrator/$2";
$route['([a-zA-Z]{2}/)?info/admin_deny']= "info/admin_deny";

// dashboard
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard'] = "redirects/generic/dashboard"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/accept_requests/accept_decline_token'] = "redirects/generic_with_get/dashboard/accept-decline-token";  //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/accept-decline-token'] = "redirects/generic_with_get/dashboard/accept-decline-token"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/venue-bookings'] = "redirects/generic/dashboard/venue-bookings"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/team-members'] = "redirects/generic/dashboard/team-members"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/user-members'] = "redirects/generic/dashboard/user-members"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/edit-profile'] = "redirects/generic/dashboard/edit-profile"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/change-password'] = "redirects/generic/dashboard/change-password"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/review-booster'] = "redirects/generic/dashboard/review-booster"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/widget'] = "redirects/generic/dashboard/widget"; //for old links

$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/message-request/(:num)'] = "redirects/generic_with_id/dashboard/message-request/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/message-conversation/(:num)'] = "redirects/generic_with_id/dashboard/message-conversation/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/message-review/(:num)'] = "redirects/generic_with_id/dashboard/message-review/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/dashboard/([a-zA-Z]+)'] = "redirects/generic_with_id/dashboard/index/$3"; //for old links

$route['([a-zA-Z]{2}/)?dashboard'] = "dashboard/index";
$route['([a-zA-Z]{2}/)?accept_requests/accept_decline_token'] = "dashboard/accept_decline_token"; //only need this route until all reservations created before Jan 10th have been accepted/declined.
$route['([a-zA-Z]{2}/)?dashboard/accept-decline-token'] = "dashboard/accept_decline_token";
$route['([a-zA-Z]{2}/)?dashboard/venue-bookings'] = "dashboard/venue_bookings";
$route['([a-zA-Z]{2}/)?dashboard/team-members'] = "dashboard/venue_team_members";
$route['([a-zA-Z]{2}/)?dashboard/user-members'] = "dashboard/user_members";
$route['([a-zA-Z]{2}/)?dashboard/edit-profile'] = "dashboard/account_profile";
$route['([a-zA-Z]{2}/)?dashboard/change-password'] = "dashboard/account_password";
$route['([a-zA-Z]{2}/)?dashboard/subscribe'] = "dashboard/account_subscribe";
$route['([a-zA-Z]{2}/)?dashboard/review-booster'] = "dashboard/request_reviews";
$route['([a-zA-Z]{2}/)?dashboard/widget'] = "dashboard/account_widget";
$route['([a-zA-Z]{2}/)?dashboard/message-request/(:num)'] = "dashboard/message_request/$2";
$route['([a-zA-Z]{2}/)?dashboard/message-conversation/(:num)'] = "dashboard/message_conversation/$2";
$route['([a-zA-Z]{2}/)?dashboard/message-review/(:num)'] = "dashboard/message_review/$2";
$route['([a-zA-Z]{2}/)?dashboard/([a-zA-Z]+)'] = "dashboard/$2";

// venues
$route['venues/(:num)'] = "redirects/generic_with_id/venues/index/$1"; //for old links
$route['venue/(:num)'] = "redirects/generic_with_id/venues/index/$1"; //for old links
$route['([a-zA-Z]{2}/)?venues/(:num)'] = "redirects/generic_with_id/venues/index/$2"; //for old links
$route['([a-zA-Z]{2}/)?venue/(:num)'] = "redirects/generic_with_id/venues/index/$2"; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%-]+)/venues/(:num)'] = "redirects/generic_with_id/venues/index/$4"; //for old links
$route['([a-zA-Z]{2})/([a-zA-Z0-9%-]+)/venues/([a-zA-Z0-9%-]+)/(:num)'] = "redirects/generic_with_id/venues/index/$4"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/venues/([a-zA-Z0-9%-]+)/(:num)'] = "redirects/generic_with_id/venues/index/$5"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/venues/preview/(:num)'] = "venues/index/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/venues/(:num)'] = "redirects/generic_with_id/venues/index/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/venues/([a-zA-Z0-9%\'\.~-]+)/(:num)'] = "redirects/generic_with_id/venues/index/$4"; //for old links

$route['([a-zA-Z]{2}/)?venues/preview/(:num)'] = "venues/index/$2";
$route['([a-zA-Z]{2}/)?venues/(:num)'] = "venues/index/$2";
$route['([a-zA-Z]{2}/)?venues/([a-zA-Z0-9%\'\.~-]+)/(:num)'] = "venues/index/$3/$2";

// venue listing
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/venues/new'] = "redirects/generic/venues/new"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/venues/(:num)/edit'] = "redirects/venue_listing/$3/edit"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/venues/([a-zA-Z0-9%\'\.~-]+)/(:num)/edit'] = "redirects/venue_listing/$4/edit/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/venues/([a-zA-Z0-9%\'\.~-]+)/(:num)/new'] = "redirects/venue_listing/$4/new/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/venues/edit/(:any)'] = "redirects/generic/venues/new"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/venues/([a-zA-Z0-9%\'\.~-]+)/edit/(:any)'] = "redirects/generic/venues/new"; //for old links
$route['([a-zA-Z]{2}/)?venues/edit/(:any)'] = "redirects/generic/venues/new";
$route['([a-zA-Z]{2}/)?venues/([a-zA-Z0-9%\'\.~-]+)/edit/(:any)'] = "redirects/generic/venues/new";

$route['([a-zA-Z]{2}/)?venues/new'] = "venues/venue_listing";
$route['([a-zA-Z]{2}/)?venues/([a-zA-Z0-9%\'\.~-]+)/(:num)/edit'] = "venues/venue_listing/$3//$2";
$route['([a-zA-Z]{2}/)?venues/([a-zA-Z0-9%\'\.~-]+)/(:num)/edit/([a-zA-Z0-9%-]+)'] = "venues/venue_listing/$3/$4/$2";
$route['([a-zA-Z]{2}/)?venues/([a-zA-Z0-9%\'\.~-]+)/(:num)/new'] = "rooms/room_listing//$3";

// rooms
$route['rooms/(:num)'] = "redirects/generic_with_id//index/$1"; //for old links
$route['room/(:num)'] = "redirects/generic_with_id//index/$1"; //for old links
$route['([a-zA-Z]{2}/)?rooms/(:num)'] = "redirects/generic_with_id//index/$2"; //for old links
$route['([a-zA-Z]{2}/)?room/(:num)'] = "redirects/generic_with_id//index/$2"; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/rooms/(:num)'] = "redirects/generic_with_id//index/$3"; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/room/(:num)'] = "redirects/generic_with_id//index/$3"; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%-]+)/venues/([a-zA-Z0-9%-]+)/rooms/(:num)'] = "redirects/generic_with_id//index/$5"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/rooms/preview/(:num)'] = "rooms/index/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/book-room/(:num)'] = "redirects/mobile_room/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/book-room/(:num)'] = "redirects/mobile_room/$4/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)/book-room/(:num)'] = "redirects/mobile_room/$5/$3/$4"; //for old links
$route['([a-zA-Z]{2}/)?book-room/([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%\'\.~-]+)/venues/([a-zA-Z0-9%-]+)/rooms/(:num)'] = "redirects/mobile_room/$5/meeting-rooms/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/book-room/([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%\'\.~-]+)/venues/([a-zA-Z0-9%-]+)/rooms/(:num)'] = "redirects/mobile_room/$6/meeting-rooms/$4"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/(:num)'] = "redirects/generic_with_id//index/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/(:num)'] = "redirects/generic_with_id//index/$4"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)/(:num)'] = "redirects/generic_with_id//index/$5"; //for old links

$route['([a-zA-Z]{2}/)?rooms/preview/(:num)'] = "rooms/index/$2";
$route['([a-zA-Z]{2}/)?book-room/(:num)'] = "rooms/index/$2///book-room";
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/book-room/(:num)'] = "rooms/index/$3/$2//book-room";
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)/book-room/(:num)'] = "rooms/index/$4/$2/$3/book-room";
$route['(:num)'] = "rooms/index/$1";
$route['([a-zA-Z]{2}/)?/(:num)'] = "rooms/index/$2";
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/(:num)'] = "rooms/index/$3/$2";
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)/(:num)'] = "rooms/index/$4/$2/$3";

// room listing
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/rooms/new'] = "redirects/generic/rooms/new"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/rooms/(:num)/edit'] = "redirects/room_listing/$3/edit"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)/(:num)/edit'] = "redirects/room_listing/$5/edit/$3/$4"; //for old links

$route['([a-zA-Z]{2}/)?rooms/new'] = "rooms/room_listing";
$route['([a-zA-Z]{2}/)?rooms/(:num)/edit'] = "rooms/room_listing/$2";
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)/(:num)/edit'] = "rooms/room_listing/$4//$2/$3";

// search
$route['([a-zA-Z]{2}/)?search/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%-]+)--([a-zA-Z0-9%-]+)'] = "redirects/search/$2/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/s'] = "redirects/search"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/s/([a-zA-Z0-9%-]+)'] = "redirects/search/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/s/([a-zA-Z0-9%-]+)/(:any)'] = "redirects/search/$3/$4"; //for old links

$route['([a-zA-Z]{2}/)?s'] = "redirects/search";
$route['([a-zA-Z]{2}/)?s/([a-zA-Z0-9%-]+)'] = "redirects/search/$2";
$route['([a-zA-Z]{2}/)?s/([a-zA-Z0-9%-]+)/(:any)'] = "search/index/$2/$3";

// old urls default to uk
$route['([a-zA-Z]{2}/)?meeting-rooms-hire'] = "redirects/browse/uk/meeting-rooms"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/meeting-rooms-hire'] = "redirects/browse/uk/meeting-rooms"; //for old links
$route['([a-zA-Z]{2}/)?boardrooms-rental'] = "redirects/browse/uk/meeting-rooms"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/boardrooms-rental'] = "redirects/browse/uk/meeting-rooms"; //for old links
$route['([a-zA-Z]{2}/)?training-rooms-rental'] = "redirects/browse/uk/training-rooms"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/training-rooms-rental'] = "redirects/browse/uk/training-rooms"; //for old links
$route['([a-zA-Z]{2}/)?coworking'] = "redirects/browse/uk/hot-desks"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/coworking'] = "redirects/browse/uk/hot-desks"; //for old links
$route['([a-zA-Z]{2}/)?hotdesks'] = "redirects/browse/uk/hot-desks"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/hotdesks'] = "redirects/browse/uk/hot-desks"; //for old links
$route['([a-zA-Z]{2}/)?event-space-hire'] = "redirects/browse/uk/function-rooms"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/event-space-hire'] = "redirects/browse/uk/function-rooms"; //for old links

// browse
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)'] = "home/lander/$2//$1";

$route['en/gb/browse/([a-zA-Z0-9%-]+)'] = "redirects/browse/uk/$1"; //for old links
$route['en/gb/browse/([a-zA-Z0-9%-]+)/book-for-today'] = "redirects/browse/uk/$1/0"; //for old links
$route['en/gb/browse/([a-zA-Z0-9%-]+)/book-for-tomorrow'] = "redirects/browse/uk/$1/1"; //for old links
$route['en/gb/browse/([a-zA-Z0-9%-]+)/book-for-next-week'] = "redirects/browse/uk/$1/7"; //for old links
$route['en/ie/browse/([a-zA-Z0-9%-]+)'] = "redirects/browse/ie/$1"; //for old links
$route['en/ie/browse/([a-zA-Z0-9%-]+)/book-for-today'] = "redirects/browse/ie/$1/0"; //for old links
$route['en/ie/browse/([a-zA-Z0-9%-]+)/book-for-tomorrow'] = "redirects/browse/ie/$1/1"; //for old links
$route['en/ie/browse/([a-zA-Z0-9%-]+)/book-for-next-week'] = "redirects/browse/ie/$1/7"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)'] = 'redirects/browse/$1/$3'; //for old links

// location landing
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)'] = "home/lander/$2/$3";

$route['en/gb/([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)'] = "redirects/location_landing/uk/$2/$1"; //for old links
$route['en/ie/([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)'] = "redirects/location_landing/ie/$2/$1"; //for old links
$route['([a-zA-Z]{2}/)?top/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)'] = "redirects/location_redirect/$2/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/top/([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)'] = 'redirects/location_redirect/$3/$4'; //for old links
$route['([a-zA-Z]{2}/)?top/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)'] = "redirects/location_redirect/$2/$4/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/top/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)'] = 'redirects/location_redirect/$3/$5/$4'; //for old links
$route['([a-zA-Z]{2}/)?top/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)'] = "redirects/location_redirect/$4/$3/$2"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/top/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)'] = 'redirects/location_redirect/$5/$4/$3'; //for old links
$route['([a-zA-Z]{2}/)?top/(:any)/(:any)'] = "redirects/top_page_redirect/$2/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/top/(:any)/(:any)'] = "redirects/top_page_redirect/$3/$4"; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)'] = "redirects/location_redirect/$2/$4/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)'] = "redirects/location_redirect/$3/$5/$4"; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)/book-for-today'] = "redirects/location_redirect/$2/$4/$3/0"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)/book-for-today'] = "redirects/location_redirect/$3/$5/$4/0"; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)/book-for-tomorrow'] = "redirects/location_redirect/$2/$4/$3/1"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)/book-for-tomorrow'] = "redirects/location_redirect/$3/$5/$4/1"; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)/book-for-next-week'] = "redirects/location_redirect/$2/$4/$3/7"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/([a-zA-Z0-9%-]+)/book-for-next-week'] = "redirects/location_redirect/$3/$5/$4/7"; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)'] = "redirects/location_redirect/$3/$2/$4"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)'] = 'redirects/location_redirect/$4/$3/$5'; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/book-for-today'] = "redirects/location_redirect/$3/$2/$4/0"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/book-for-today'] = 'redirects/location_redirect/$4/$3/$5/0'; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/book-for-tomorrow'] = "redirects/location_redirect/$3/$2/$4/1"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/book-for-tomorrow'] = 'redirects/location_redirect/$4/$3/$5/1'; //for old links
$route['([a-zA-Z]{2}/)?([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/book-for-next-week'] = "redirects/location_redirect/$3/$2/$4/7"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)--([a-zA-Z0-9%\'\.~-]+)/book-for-next-week'] = 'redirects/location_redirect/$4/$3/$5/7'; //for old links
$route['([a-zA-Z]{2}/)?search/spaces/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)'] = "redirects/location_redirect/$3/$2"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/search/spaces/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)'] = "redirects/location_redirect/$4/$3"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/([a-zA-Z0-9%-]+)/([a-zA-Z0-9%\'\.~-]+)'] = 'redirects/location_redirect/$4/$3'; //for old links

// api_json
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/api_json/(:any)/(:any)'] = "api_json/index/$3/$4"; //for old links
$route['([a-zA-Z]{2})/([a-z]{2}\_{0,1}[A-Z]{0,2})/api_json/(:any)'] = "api_json/index/$3"; //for old links

$route['([a-zA-Z]{2}/)?api_json/(:any)/(:any)'] = "api_json/index/$2/$3";
$route['([a-zA-Z]{2}/)?api_json/(:any)'] = "api_json/index/$2";

//anything else
$route['([a-zA-Z]{2}/)?(.*)'] = "$2";

// api
$route['api/v1/venues'] = "rest/Venue_REST";
$route['api/v1/venues/contact'] = "rest/Venue_REST/contact";
$route['api/v1/venues/commission'] = "rest/Venue_REST/commission";
$route['api/v1/images'] = "rest/Image_REST";
$route['api/v1/enquiries'] = "rest/Enquiry_REST";
$route['api/v1/enquiries/durations'] = "rest/Enquiry_REST/durations";
$route['api/v1/enquiries/closepastpending'] = "rest/Enquiry_REST/closepastpending";
$route['api/v1/enquiries/hubspotdeal'] = "rest/Enquiry_REST/hubspotdeal";
$route['api/v1/rooms'] = "rest/Room_REST";
$route['api/v1/rooms/rates'] = "rest/Room_REST/rates";
$route['api/v1/rooms/availabilities'] = "rest/Room_REST/availabilities";
$route['api/v1/rooms/configurations'] = "rest/Room_REST/configurations";
$route['api/v1/rooms/vatrate'] = "rest/Room_REST/vatrate";
$route['api/v1/rooms/flexiblepercent'] = "rest/Room_REST/flexiblepercent";
$route['api/v1/rooms/pricecontrolpercent'] = "rest/Room_REST/pricecontrolpercent";
$route['api/v1/rooms/attribute'] = "rest/Room_REST/attribute";
$route['api/v1/rooms/favourite'] = "rest/Room_REST/favourite";
$route['api/v1/rooms/allfavourites'] = "rest/Room_REST/allfavourites";
$route['api/v1/rooms/catalogue'] = "rest/Room_REST/catalogue";
$route['api/v1/reviews'] = "rest/Review_REST";
$route['api/v1/configurations'] = "rest/Configuration_REST";
$route['api/v1/reservations'] = "rest/Reservation_REST";
$route['api/v1/reservations/paid'] = "rest/Reservation_REST/paid";
$route['api/v1/reservations/recent'] = "rest/Reservation_REST/recent";
$route['api/v1/reservations/commission'] = "rest/Reservation_REST/commission";
$route['api/v1/reservations/baseprice'] = "rest/Reservation_REST/baseprice";
$route['api/v1/reservations/openinghours'] = "rest/Reservation_REST/openinghours";
$route['api/v1/entities'] = "rest/FinancialEntity_REST";
$route['api/v1/invoicenotes'] = "rest/InvoiceNotes_REST";
$route['api/v1/locations'] = "rest/Location_REST";
$route['api/v1/landings'] = "rest/Landing_REST";
$route['api/v1/landings/rooms'] = "rest/Landing_REST/landingpages";
$route['api/v1/landings/vertical'] = "rest/Landing_REST/vertical";
$route['api/v1/landings/carousel'] = "rest/Landing_REST/carousel";
$route['api/v1/landings/similar'] = "rest/Landing_REST/similar";
$route['api/v1/landings/tag'] = "rest/Landing_REST/adminlanding";
$route['api/v1/landings/nearby'] = "rest/Landing_REST/nearby";
$route['api/v1/finance/monthly'] = "rest/Admin_REST/monthly";
$route['api/v1/finance/flexible'] = "rest/Admin_REST/flexible";
$route['api/v1/finance/split'] = "rest/Admin_REST/split";
$route['api/v1/finance/control'] = "rest/Admin_REST/control";
$route['api/v1/finance/venue'] = "rest/Admin_REST/venue";
$route['api/v1/finance/room'] = "rest/Admin_REST/room";
$route['api/v1/analytics'] = "rest/Analytics_REST";
$route['api/v1/analytics/userdata'] = "rest/Analytics_REST/userdata";
$route['api/v1/users'] = "rest/User_REST";
$route['api/v1/users/onboardvenueusers'] = "rest/User_REST/onboardvenueuser";
$route['api/v1/users/remember'] = "rest/User_REST/remember";
$route['api/v1/users/updatepassword'] = "rest/User_REST/updatepassword";
$route['api/v1/users/admin'] = "rest/User_REST/admin";
$route['api/v1/users/adminuserupdate'] = "rest/User_REST/adminuserupdate";
$route['api/v1/users/userautocomplete'] = "rest/User_REST/userautocomplete";
$route['api/v1/users/userlanguage'] = "rest/User_REST/userlanguage";
$route['api/v1/users/adduser'] = "rest/User_REST/adduser";
$route['api/v1/users/subscribe'] = "rest/User_REST/subscribe";
$route['api/v1/users/discount'] = "rest/User_REST/discount";
$route['api/v1/hubspot/deals'] = "rest/Hubspot_REST/deals";
$route['api/v1/hubspot/contacts'] = "rest/Hubspot_REST/contacts";
$route['api/v1/auth/google'] = "rest/User_REST/verify_google_id";
$route['api/v1/auth/facebook'] = "rest/User_REST/verify_facebook_access_token";
$route['api/v1/auth/linkedin'] = "rest/User_REST/verify_linkedin_access_token";

/* End of file routes.php */
/* Location: ./application/config/routes.php */
