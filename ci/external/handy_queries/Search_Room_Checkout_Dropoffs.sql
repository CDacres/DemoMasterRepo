SELECT profiles.Fname,
profiles.Lname,
users.id,
users.email,
users.language_pref,
profiles.phnum,
last_interaction.event_type,
CASE WHEN r1.id iS NULL THEN CONCAT('https://www.zipcube.com/', r2.id) ELSE CONCAT('https://www.zipcube.com/', r1.id) END as room_id,
CASE WHEN r1.id iS NULL THEN r2.title ELSE r1.title END as room_title,
CASE WHEN j5.event_type iS NULL THEN "no" ELSE "yes" END as has_received_email,
last_interaction.created
FROM
(
	SELECT
    DISTINCT j1.user_id
    FROM journeys j1
    WHERE j1.user_id IS NOT NULL AND
    (
    j1.event_type = "HIT_CHECKOUT" AND j1.created < DATE_SUB(NOW(), INTERVAL 1 HOUR) AND j1.created > DATE_SUB(NOW(), INTERVAL 1 WEEK)
    OR
    j1.event_type = "ROOM_VIEW" AND j1.created < DATE_SUB(NOW(), INTERVAL 1 HOUR) AND j1.created > DATE_SUB(NOW(), INTERVAL 1 WEEK)
    OR
    j1.event_type = "SEARCH_INTERACTION" AND j1.created < DATE_SUB(NOW(), INTERVAL 1 HOUR) AND j1.created > DATE_SUB(NOW(), INTERVAL 1 WEEK)
    )
    AND NOT EXISTS
    (
    	SELECT 1 FROM journeys j2 WHERE j2.user_id = j1.user_id AND j2.event_type = "MAKE_BOOKING_REQUEST" AND j2.created > DATE_SUB(j1.created, INTERVAL 1 DAY)
    )
    AND NOT EXISTS
    (
    	SELECT 1 FROM journeys j2 WHERE j2.user_id = j1.user_id AND j2.event_type = "MAKE_BOOKING_REQUEST" AND j2.created > DATE_SUB(NOW(), INTERVAL 3 DAY)
    )
    AND NOT EXISTS
    (
    	SELECT 1 FROM journeys j2 WHERE j2.user_id = j1.user_id AND j2.event_type = "MAKE_ENQUIRY" AND j2.created > DATE_SUB(j1.created, INTERVAL 1 DAY)
    )
    AND NOT EXISTS
    (
    	SELECT 1 FROM journeys j2 WHERE j2.user_id = j1.user_id AND j2.event_type = "MAKE_ENQUIRY" AND j2.created > DATE_SUB(NOW(), INTERVAL 3 DAY)
    )
) as cohort
LEFT JOIN
(
    SELECT maxy.user_id, daty.event_type, daty.context_field_1_value, daty.created FROM
    (
        SELECT j3.user_id, MAX(j3.created) as max
        FROM journeys j3
        WHERE (j3.event_type = "HIT_CHECKOUT" OR j3.event_type = "ROOM_VIEW" OR j3.event_type = "SEARCH_INTERACTION") GROUP BY j3.user_id
    ) as maxy
    INNER JOIN
    (
        SELECT j4.user_id, j4.event_type, j4.context_field_1_value, j4.created
        FROM journeys j4
        WHERE (j4.event_type = "HIT_CHECKOUT" OR j4.event_type = "ROOM_VIEW" OR j4.event_type = "SEARCH_INTERACTION")
    ) as daty
    ON maxy.user_id = daty.user_id AND maxy.max = daty.created
) as last_interaction
ON cohort.user_id = last_interaction.user_id
LEFT JOIN live.rooms r1 ON last_interaction.event_type = "ROOM_VIEW" AND last_interaction.context_field_1_value = r1.id
LEFT JOIN live.checkout c1 ON last_interaction.event_type = "HIT_CHECKOUT" AND last_interaction.context_field_1_value = c1.id
LEFT JOIN journeys j5 ON cohort.user_id = j5.user_id AND j5.event_type = "MARKETING_EMAIL_SENT"
LEFT JOIN live.rooms r2 ON c1.room_id = r2.id
LEFT JOIN live.users ON cohort.user_id = users.id
LEFT JOIN live.profiles ON profiles.user_id = users.id
WHERE users.email NOT liKE "%zipcube.com%"  AND users. userType_id = 0 AND last_interaction.created > "2017-08-18 07:00:00" GROUP BY users.id ORDER BY created ASC
