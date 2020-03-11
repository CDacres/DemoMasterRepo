<?php
$app->post('booking', 'Bookings@create_booking_request');
$app->post('review', 'Reviews@create_review');
$app->post('reviewreply', 'Reviews@create_review_reply');
$app->post('enquiry', 'Enquiries@create_enquiry');