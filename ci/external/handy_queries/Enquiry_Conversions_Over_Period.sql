SELECT user_id, max(created) as max_created FROM enquiries e1 WHERE created BETWEEN "2017-05-01 00:00:00" AND "2017-05-31 23:59:59"
AND EXISTS (SELECT created FROM bookings b1 WHERE e1.user_id = b1.beneficiary_id GROUP BY e1.user_id HAVING b1.created > max(e1.created) )
GROUP BY user_id