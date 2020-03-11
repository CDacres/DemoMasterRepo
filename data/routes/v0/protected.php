<?php
$app->post('message', 'Messages@create_conversation_message');
$app->patch('/bookings/{id}', 'Bookings@update');