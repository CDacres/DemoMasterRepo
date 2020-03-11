SELECT
count(DISTINCT j1.user_id) as bookers,
sum(`revenue`) as total_revenue
FROM journeys j1
LEFT JOIN pbi_reservation_tracking on j1.`context_field_1_value` = pbi_reservation_tracking.`booking_id`
WHERE j1.user_id IS NOT NULL
AND
j1.event_type = "MAKE_BOOKING_REQUEST" AND j1.created <  NOW()
AND EXISTS
(
    SELECT 1 FROM journeys j2 WHERE j1.user_id = j2.user_id
        AND j2.event_type = "MARKETING_EMAIL_SENT" AND j2.created < j1.created
);
SELECT
count(DISTINCT j1.user_id) as openers
FROM journeys j1
WHERE j1.user_id IS NOT NULL
AND
j1.event_type = "EMAIL_OPENED" AND j1.created <  NOW()
AND EXISTS
(
    SELECT 1 FROM journeys j2 WHERE j1.user_id = j2.user_id
        AND j2.event_type = "MARKETING_EMAIL_SENT" AND j2.created < j1.created
);
    SELECT
count(DISTINCT j1.user_id) as clickers
FROM journeys j1
WHERE j1.user_id IS NOT NULL
AND
j1.event_type = "EMAIL_CLICKED" AND j1.created <  NOW()
AND EXISTS
(
    SELECT 1 FROM journeys j2 WHERE j1.user_id = j2.user_id
        AND j2.event_type = "MARKETING_EMAIL_SENT" AND j2.created < j1.created
);
SELECT
count(DISTINCT j1.user_id) as receivers
FROM journeys j1
WHERE j1.user_id IS NOT NULL
AND
j1.event_type = "MARKETING_EMAIL_SENT" AND j1.created <  NOW()

