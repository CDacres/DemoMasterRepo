-- Series of sql commands that update the data to exist within associated new structures/features
-- These can't just be used indisriminately since ids and server names may be different
-- But they exist to remind you the changes that need to be made during a migration.
use dev;

CREATE TABLE `venues` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address` text NOT NULL,
  `phone` varchar(20) NOT NULL,
  `lat` decimal(10,7) NOT NULL,
  `long` decimal(10,7) NOT NULL,
  `street_view` tinyint(1) NOT NULL DEFAULT '0',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `dev`.`list`
DROP COLUMN `is_enable`,
CHANGE COLUMN `enabled` `disabled` TINYINT(4) NOT NULL DEFAULT 0 ;
UPDATE dev.list SET disabled= CASE WHEN disabled=1 THEN 0 ELSE 1 END WHERE id>0;
ALTER TABLE `dev`.`price`
ADD COLUMN `disabled` TINYINT(1) NOT NULL DEFAULT 0 AFTER `ranking`;
ALTER TABLE `dev`.`list_photo`
ADD COLUMN `disabled` TINYINT(1) NOT NULL DEFAULT 0 AFTER `slider`;

ALTER TABLE `dev`.`users`
ADD COLUMN `disabled` TINYINT(4) NOT NULL DEFAULT 0 AFTER `salt`;
ALTER TABLE `dev`.`profiles`
ADD COLUMN `disabled` TINYINT(4) NOT NULL DEFAULT 0 AFTER `room_agreement_upload`;
ALTER TABLE `dev`.`reviews`
ADD COLUMN `disabled` TINYINT(4) NOT NULL DEFAULT 0 AFTER `created`;
ALTER TABLE `dev`.`currency`
CHANGE COLUMN `currency_symbol` `currency_symbol_left` VARCHAR(10) NULL ,
CHANGE COLUMN `status` `disabled` INT(11) NOT NULL DEFAULT 0 ,
ADD COLUMN `currency_symbol_right` VARCHAR(10) NULL AFTER `currency_symbol_left`;

UPDATE currency SET disabled = case when disabled=1 THEN 0 ELSE 1 END;
ALTER TABLE `dev`.`currency_change`
CHANGE COLUMN `currFrom` `currFrom` CHAR(3) NOT NULL ,
CHANGE COLUMN `currInto` `currInto` CHAR(3) NOT NULL;
ALTER TABLE `dev`.`currency`
DROP COLUMN `id`,
CHANGE COLUMN `currency_code` `id` CHAR(3) NOT NULL FIRST,
CHANGE COLUMN `disabled` `disabled` TINYINT(4) NOT NULL DEFAULT 0 ,
CHANGE COLUMN `default` `default` TINYINT(4) NOT NULL DEFAULT 0 ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`);
ALTER TABLE `dev`.`currency`
CHANGE COLUMN `currency_symbol_left` `currency_symbol_left` VARCHAR(10) NOT NULL ,
CHANGE COLUMN `currency_symbol_right` `currency_symbol_right` VARCHAR(10) NOT NULL ;

ALTER TABLE `dev`.`room_ameniti_rent`
CHANGE COLUMN `aminty_name` `name` VARCHAR(200) NOT NULL ,
CHANGE COLUMN `aminty_rent` `cost` DECIMAL(11,2) UNSIGNED NOT NULL ,
ADD COLUMN `max_available` INT(11) NOT NULL DEFAULT 1 AFTER `cost`,
ADD COLUMN `disabled` TINYINT(4) NOT NULL DEFAULT 0 AFTER `max_available`;
ALTER TABLE `dev`.`room_ameniti_rent`
RENAME TO  `dev`.`addOns` ;

ALTER TABLE `dev`.`list`
CHANGE COLUMN `room_agreement_upload` `room_agreement_upload` VARCHAR(255) NULL ;

ALTER TABLE `dev`.`profiles`
CHANGE COLUMN `room_agreement_upload` `room_agreement_upload` VARCHAR(255) NULL DEFAULT NULL ;
ALTER TABLE `dev`.`profiles`
ADD COLUMN `user_id` INT(11) NULL AFTER `id`;

UPDATE dev.profiles SET user_id=id;
ALTER TABLE `dev`.`profiles`
CHANGE COLUMN `user_id` `user_id` INT(11) NOT NULL ,
ADD UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC);

ALTER TABLE `dev`.`language`
DROP COLUMN `id`,
CHANGE COLUMN `code` `code` CHAR(2) NOT NULL ,
CHANGE COLUMN `active` `disabled` INT(11) NOT NULL DEFAULT 1 ,
ADD PRIMARY KEY (`code`),
DROP INDEX `id`;
UPDATE dev.language SET disabled=CASE WHEN disabled=1 THEN 0 ELSE 1 END;

ALTER TABLE `dev`.`language`
ADD COLUMN `default` TINYINT(4) NOT NULL DEFAULT 0 AFTER `name`;

UPDATE `dev`.`language` SET `default`='1' WHERE `code`='en';
ALTER TABLE `dev`.`currency`
CHANGE COLUMN `currency_name` `name` VARCHAR(150) NOT NULL ,
CHANGE COLUMN `currency_symbol_left` `symbol_left` VARCHAR(10) NOT NULL ,
CHANGE COLUMN `currency_symbol_right` `symbol_right` VARCHAR(10) NOT NULL ;
ALTER TABLE `dev`.`room_availability`
CHANGE COLUMN `select_status` `disabled` TINYINT(4) NOT NULL AFTER `time_block2`;
UPDATE dev.room_availability SET disabled = CASE WHEN disabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`room_availability`
CHANGE COLUMN `start1` `start1` DECIMAL(4,2) NOT NULL ,
CHANGE COLUMN `end1` `end1` DECIMAL(4,2) NOT NULL ,
CHANGE COLUMN `start2` `start2` DECIMAL(4,2) NOT NULL ,
CHANGE COLUMN `end2` `end2` DECIMAL(4,2) NOT NULL ;
CREATE TABLE `dev`.`days` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `disabled` TINYINT(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));

INSERT INTO `dev`.`days` (`id`, `name`) VALUES ('0', 'Sunday');
INSERT INTO `dev`.`days` (`id`, `name`) VALUES ('1', 'Monday');
INSERT INTO `dev`.`days` (`id`, `name`) VALUES ('2', 'Tuesday');
INSERT INTO `dev`.`days` (`id`, `name`) VALUES ('3', 'Wednesday');
INSERT INTO `dev`.`days` (`id`, `name`) VALUES ('4', 'Thursday');
INSERT INTO `dev`.`days` (`id`, `name`) VALUES ('5', 'Friday');
INSERT INTO `dev`.`days` (`id`, `name`) VALUES ('6', 'Saturday');
ALTER TABLE `dev`.`addOns`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.addOns SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`amenities`
CHANGE COLUMN `amenityType_id` `amenityType_id` VARCHAR(45) NOT NULL DEFAULT '1' AFTER `long_desc`,
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.amenities SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`amenity_types`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `desc`;

ALTER TABLE `dev`.`bookingTypes`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.bookingTypes SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`bookingTypesSuperset_bookingType`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `bookingType_id`;

ALTER TABLE `dev`.`bookingTypesSuperset_configuration`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `configuration_id`;

ALTER TABLE `dev`.`bookingTypesSupersets`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;
UPDATE dev.bookingTypesSupersets SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`configurations`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.configurations SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`currency`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.currency SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;

ALTER TABLE `dev`.`currency_change`
ADD COLUMN `disabled` TINYINT(1) NOT NULL DEFAULT 0 AFTER `rate`;

ALTER TABLE `dev`.`currency_change`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.currency_change SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`days`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.days SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`language`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' ;

UPDATE dev.language SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`list`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' ;

UPDATE dev.list SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`list_photo`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;
UPDATE dev.list_photo SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`locations`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `in_sitemap`;
ALTER TABLE `dev`.`price`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.price SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`profiles`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.profiles SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`reservation`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `referrer_paid`;

ALTER TABLE `dev`.`reservation_status`
ADD COLUMN `disabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `name`;

ALTER TABLE `dev`.`room_amenity`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.room_amenity SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`room_availability`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.room_availability SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`room_bookingType`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.room_bookingType SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`room_configuration` CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1;
UPDATE dev.room_configuration SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;
ALTER TABLE `dev`.`search_audit`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `time`;

ALTER TABLE `dev`.`users`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE dev.users SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;

ALTER TABLE `dev`.`reviews`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT 1 ;

UPDATE `dev`.`reviews` SET enabled = CASE WHEN enabled=0 THEN 1 ELSE 0 END;

ALTER TABLE `dev`.`room_availability`
CHANGE COLUMN `start2` `start2` DECIMAL(4,2) NULL DEFAULT NULL ,
CHANGE COLUMN `end2` `end2` DECIMAL(4,2) NULL DEFAULT NULL ,
CHANGE COLUMN `time_block` `time_block` VARCHAR(250) NULL DEFAULT NULL ,
CHANGE COLUMN `time_block2` `time_block2` VARCHAR(250) NULL DEFAULT NULL ;

INSERT INTO dev.room_availability (room_id, day_id, start1, end1, enabled)
SELECT room_id, day_id, start2, end2, enabled FROM dev.room_availability WHERE start2!=0 AND end2!=0 AND start2 >= end1 AND end2 > start2;

ALTER TABLE `dev`.`room_availability`
DROP COLUMN `time_block2`,
DROP COLUMN `time_block`,
DROP COLUMN `end2`,
DROP COLUMN `start2`,
CHANGE COLUMN `start1` `start` DECIMAL(4,2) NOT NULL ,
CHANGE COLUMN `end1` `end` DECIMAL(4,2) NOT NULL ;

/*Updates from the arrival of Cott*/

ALTER TABLE `dev`.`room_availability`
ADD COLUMN `price_per_hour` DECIMAL(8,3) NULL AFTER `end`,
ADD COLUMN `minimum_hours` DECIMAL(4,2) NOT NULL DEFAULT 1 AFTER `price_per_hour`,
ADD COLUMN `slot_length_hours` DECIMAL(4,2) NOT NULL DEFAULT 1 AFTER `minimum_hours`;

ALTER TABLE `dev`.`room_availability`
CHANGE COLUMN `minimum_hours` `minimum_hours` DECIMAL(4,2) NULL DEFAULT NULL ,
CHANGE COLUMN `slot_length_hours` `slot_length_hours` DECIMAL(4,2) NULL DEFAULT NULL ;
UPDATE dev.room_availability LEFT JOIN list ON room_availability.room_id=list.id LEFT JOIN price ON list.id=price.id
SET room_availability.price_per_hour=CAST(price.night AS decimal(8,3)), room_availability.minimum_hours=CAST(list.min_stay as decimal(4,2));
UPDATE dev.room_availability LEFT JOIN list ON room_availability.room_id=list.id
SET room_availability.enabled=0 WHERE list.id IS NULL;
UPDATE dev.room_availability
SET room_availability.price_per_hour=NULL WHERE price_per_hour=0;

CREATE TABLE `dev`.`room_day_rates` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room_id` INT NOT NULL,
  `standard_day_rate` DECIMAL(8,3) NULL DEFAULT NULL,
  `daily_delegate_rate` DECIMAL(8,3) NULL DEFAULT NULL,
  `minimum_delegate_number` INT(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

INSERT INTO room_day_rates (room_id, standard_day_rate, minimum_delegate_number, daily_delegate_rate)
SELECT id, week, guests, addguests FROM dev.price WHERE week>0 OR addguests>0;

UPDATE dev.room_day_rates
SET daily_delegate_rate=NULL WHERE daily_delegate_rate=0;

UPDATE dev.room_day_rates
SET minimum_delegate_number=NULL WHERE daily_delegate_rate IS NULL;

CREATE TABLE `dev`.`parkingTypes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `enabled` INT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

INSERT INTO `dev`.`parkingTypes` (`id`, `description`, `enabled`) VALUES ('1', 'Free', '1');
INSERT INTO `dev`.`parkingTypes` (`id`, `description`, `enabled`) VALUES ('2', 'Additional Charge', '1');
INSERT INTO `dev`.`parkingTypes` (`id`, `description`, `enabled`) VALUES ('3', 'Free Parking Nearby', '1');
INSERT INTO `dev`.`parkingTypes` (`id`, `description`, `enabled`) VALUES ('4', 'Paid Parking Nearby', '1');

ALTER TABLE `dev`.`venues`
ADD COLUMN `description` TEXT NULL DEFAULT NULL AFTER `long`,
ADD COLUMN `parking` INT(3) NULL DEFAULT NULL AFTER `description`;

ALTER TABLE `dev`.`venues`
ADD COLUMN `directions` TEXT NULL DEFAULT NULL AFTER `parking`;

CREATE TABLE `dev`.`venueTypes` (
  `id` INT NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `enabled` INT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

UPDATE dev.profiles SET venue_type=venue_type+1;
UPDATE dev.profiles SET venue_type=venue_type+1 WHERE venue_type=8;

INSERT INTO `dev`.`venueTypes` (`id`, `description`) VALUES ('1', 'Art / Theater');
INSERT INTO `dev`.`venueTypes` (`id`, `description`) VALUES ('2', 'Coffee house');
INSERT INTO `dev`.`venueTypes` (`id`, `description`) VALUES ('3', 'Convention center');
INSERT INTO `dev`.`venueTypes` (`id`, `description`) VALUES ('4', 'Government / Non-profit');
INSERT INTO `dev`.`venueTypes` (`id`, `description`) VALUES ('5', 'Hotel');
INSERT INTO `dev`.`venueTypes` (`id`, `description`) VALUES ('6', 'Office / Commercial building');
INSERT INTO `dev`.`venueTypes` (`id`, `description`) VALUES ('7', 'School / University / Professional Training');
INSERT INTO `dev`.`venueTypes` (`id`, `description`) VALUES ('8', 'Restaurant / bar / club');
INSERT INTO `dev`.`venueTypes` (`id`, `description`) VALUES ('9', 'Unique Space');

ALTER TABLE `dev`.`venues`
ADD COLUMN `venue_type` INT(3) NOT NULL AFTER `street_view`;

ALTER TABLE `dev`.`venues`
ADD COLUMN `website` VARCHAR(100) NULL DEFAULT NULL AFTER `enabled`;

CREATE TABLE `dev`.`assets` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `asset_type` VARCHAR(45) NOT NULL,
  `reference_id` INT NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`list`
ADD COLUMN `asset_id` INT NOT NULL AFTER `id`, RENAME TO  `dev`.`rooms` ;

INSERT INTO assets (id,asset_type,reference_id) SELECT id, 'room', id FROM rooms;

ALTER TABLE `dev`.`venues`
CHANGE COLUMN `website` `website` VARCHAR(100) NULL DEFAULT NULL AFTER `venue_type`;

INSERT INTO venues (id, address, phone, lat, `long`, description, parking, directions, street_view, venue_type, website)
SELECT id, address, phnum, lat, `long`, `describe`, parking, directions, street_view, venue_type, website FROM profiles WHERE user_type=1;

INSERT INTO assets (asset_type,reference_id) SELECT 'venue', id FROM venues;

ALTER TABLE `dev`.`venues`
ADD COLUMN `asset_id` INT NOT NULL AFTER `id`;

UPDATE rooms LEFT JOIN assets ON assets.reference_id=rooms.id SET rooms.asset_id=assets.id WHERE assets.asset_type="room";

UPDATE venues LEFT JOIN assets ON assets.reference_id=venues.id SET venues.asset_id=assets.id WHERE assets.asset_type="venue";

ALTER TABLE `dev`.`rooms`
ADD COLUMN `venue_id` INT NOT NULL AFTER `asset_id`;

UPDATE rooms SET venue_id=user_id;

CREATE TABLE `dev`.`user_asset_privileges` (
  `user_id` INT NOT NULL,
  `asset_id` INT NOT NULL,
  `privileges_mask` INT NOT NULL DEFAULT 15,
  `enabled` TINYINT NOT NULL DEFAULT 1);

ALTER TABLE `dev`.`user_asset_privileges`
ADD PRIMARY KEY (`user_id`, `asset_id`);

INSERT INTO user_asset_privileges (user_id, asset_id)
SELECT user_id, asset_id FROM rooms;

INSERT INTO user_asset_privileges (user_id, asset_id)
SELECT id, asset_id FROM venues;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `desc` `desc` TEXT CHARACTER SET 'utf8' NULL AFTER `title`,
CHANGE COLUMN `currency` `currency` VARCHAR(10) NOT NULL AFTER `desc`,
CHANGE COLUMN `page_viewed` `page_viewed` BIGINT(20) NOT NULL AFTER `currency`,
CHANGE COLUMN `review` `review` INT(11) NOT NULL DEFAULT '0' AFTER `page_viewed`,
CHANGE COLUMN `created` `created` INT(31) NOT NULL AFTER `review`,
CHANGE COLUMN `updated` `updated` INT(31) NOT NULL AFTER `created`,
CHANGE COLUMN `approved_ts` `approved_ts` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00' AFTER `updated`,
CHANGE COLUMN `comm` `comm` INT(11) NOT NULL AFTER `approved_ts`,
CHANGE COLUMN `comm_host` `comm_host` INT(11) NOT NULL AFTER `comm`,
CHANGE COLUMN `room_cancel_percent` `room_cancel_percent` INT(11) NOT NULL AFTER `comm_host`,
CHANGE COLUMN `room_cancel_days` `room_cancel_days` INT(11) NOT NULL AFTER `room_cancel_percent`,
CHANGE COLUMN `room_agreement_status` `room_agreement_status` ENUM('0','1') NOT NULL DEFAULT '0' AFTER `room_cancel_days`,
CHANGE COLUMN `room_agreement_upload` `room_agreement_upload` VARCHAR(255) NULL AFTER `room_agreement_status`,
CHANGE COLUMN `room_edit` `room_edit` INT(11) NOT NULL AFTER `room_agreement_upload`,
CHANGE COLUMN `area` `area` INT(11) NOT NULL AFTER `room_edit`,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `area`,
CHANGE COLUMN `user_id` `legacy_user_id` INT(11) NOT NULL AFTER `enabled`,
CHANGE COLUMN `email` `legacy_email` VARCHAR(50) NOT NULL ,
CHANGE COLUMN `phone` `legacy_phone` VARCHAR(50) NOT NULL ,
CHANGE COLUMN `address` `legacy_address` TEXT CHARACTER SET 'utf8' NULL ,
CHANGE COLUMN `exact` `legacy_exact` INT(11) NOT NULL ,
CHANGE COLUMN `directions` `legacy_directions` TEXT CHARACTER SET 'utf8' NULL ,
CHANGE COLUMN `lat` `legacy_lat` DECIMAL(18,14) NOT NULL ,
CHANGE COLUMN `long` `legacy_long` DECIMAL(18,14) NOT NULL ,
CHANGE COLUMN `property_id` `legacy_property_id` INT(11) NOT NULL ,
CHANGE COLUMN `room_type` `legacy_room_type` VARCHAR(50) NOT NULL ,
CHANGE COLUMN `bedrooms` `legacy_bedrooms` INT(11) NOT NULL ,
CHANGE COLUMN `beds` `legacy_beds` INT(11) NOT NULL ,
CHANGE COLUMN `bed_type` `legacy_bed_type` VARCHAR(50) NOT NULL ,
CHANGE COLUMN `bathrooms` `legacy_bathrooms` FLOAT NOT NULL ,
CHANGE COLUMN `amenities` `legacy_amenities` VARCHAR(111) NOT NULL ,
CHANGE COLUMN `capacity` `legacy_capacity` INT(11) NOT NULL ,
CHANGE COLUMN `street_view` `legacy_street_view` SMALLINT(6) NOT NULL ,
CHANGE COLUMN `price` `legacy_price` INT(11) NOT NULL ,
CHANGE COLUMN `sublet_price` `legacy_sublet_price` INT(50) NOT NULL ,
CHANGE COLUMN `sublet_status` `legacy_sublet_status` ENUM('0','1') NOT NULL ,
CHANGE COLUMN `sublet_startdate` `legacy_sublet_startdate` VARCHAR(150) NOT NULL ,
CHANGE COLUMN `sublet_enddate` `legacy_sublet_enddate` VARCHAR(150) NOT NULL ,
CHANGE COLUMN `manual` `legacy_manual` TEXT CHARACTER SET 'utf8' NOT NULL ,
CHANGE COLUMN `neighbor` `legacy_neighbor` VARCHAR(60) NOT NULL ,
CHANGE COLUMN `min_stay` `legacy_min_stay` INT(11) NOT NULL ,
CHANGE COLUMN `comm_trav` `legacy_comm_trav` INT(11) NOT NULL ,
CHANGE COLUMN `room_uses` `legacy_room_uses` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `selectall_status` `legacy_selectall_status` ENUM('0','1') NOT NULL DEFAULT '0' ,
CHANGE COLUMN `twosets_status` `legacy_twosets_status` ENUM('0','1') NOT NULL DEFAULT '0' ,
CHANGE COLUMN `startend_status` `legacy_startend_status` ENUM('0','1') NOT NULL DEFAULT '0' ,
CHANGE COLUMN `start_date` `legacy_start_date` DATE NOT NULL ,
CHANGE COLUMN `end_date` `legacy_end_date` DATE NOT NULL ,
CHANGE COLUMN `setuptime_status` `legacy_setuptime_status` ENUM('0','1') NOT NULL ,
CHANGE COLUMN `setuptime_hourse` `legacy_setuptime_hourse` VARCHAR(20) NOT NULL ,
CHANGE COLUMN `selltime_status` `legacy_selltime_status` ENUM('0','1') NOT NULL ,
CHANGE COLUMN `selltime_days` `legacy_selltime_days` VARCHAR(20) NOT NULL ,
CHANGE COLUMN `room_envior_att` `legacy_room_envior_att` VARCHAR(200) NOT NULL ,
CHANGE COLUMN `room_audio` `legacy_room_audio` VARCHAR(200) NOT NULL ,
CHANGE COLUMN `room_catering` `legacy_room_catering` VARCHAR(200) NOT NULL ,
CHANGE COLUMN `other_specification` `legacy_other_specification` VARCHAR(200) NOT NULL ,
CHANGE COLUMN `special_comments` `legacy_special_comments` TEXT NOT NULL ;

ALTER TABLE `dev`.`venues`
ADD COLUMN `company_id` INT NOT NULL AFTER `asset_id`;

CREATE TABLE `dev`.`temp_rooms_to_companies` (
  `name` VARCHAR(100) NULL,
  `company_user` VARCHAR(100) NULL,
  `room_user` VARCHAR(100) NULL);

ALTER TABLE `dev`.`temp_rooms_to_companies`
ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT AFTER `room_user`,
ADD PRIMARY KEY (`id`);

ALTER TABLE `dev`.`temp_rooms_to_companies`
CHANGE COLUMN `room_user` `venue_user` VARCHAR(100) NULL DEFAULT NULL ,
ADD COLUMN `venue_name` VARCHAR(100) NULL DEFAULT NULL AFTER `id`, RENAME TO  `dev`.`temp_venues_to_companies` ;

ALTER TABLE `dev`.`temp_venues_to_companies`
CHANGE COLUMN `venue_name` `venue_name` VARCHAR(100) NULL DEFAULT NULL AFTER `venue_user`;

ALTER TABLE `dev`.`temp_venues_to_companies`
ADD COLUMN `broken` TINYINT NOT NULL DEFAULT 0 AFTER `venue_name`;



/* IMPORT RELEVANT COLUMNS FROM DAVID'S VENUES SPREADSHEET INTO temp_venues_to_companies - then test with the following and solve multiples*/
SELECT * FROM temp_venues_to_companies WHERE name IN (SELECT name FROM temp_venues_to_companies GROUP BY name HAVING count(DISTINCT company_user)>1) ORDER BY name;
SELECT * FROM temp_venues_to_companies WHERE company_user IN (SELECT company_user FROM temp_venues_to_companies GROUP BY company_user HAVING count(DISTINCT name)>1);

CREATE TABLE `dev`.`companies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `rf_temp_user_email` VARCHAR(100) NOT NULL,
  `enabled` VARCHAR(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

INSERT INTO companies (`name`, rf_temp_user_email) SELECT DISTINCT `name`, company_user FROM temp_venues_to_companies;

/* Another test for widowed rooms - should be none but check and fix */
SELECT companies.name, temp_venues_to_companies.venue_user FROM companies LEFT JOIN temp_venues_to_companies ON companies.rf_temp_user_email=temp_venues_to_companies.company_user LEFT JOIN rooms ON temp_venues_to_companies.venue_user=rooms.legacy_email
WHERE rooms.legacy_email IS NULL;

UPDATE venues LEFT JOIN rooms ON venues.id=rooms.venue_id
LEFT JOIN temp_venues_to_companies ON rooms.legacy_email=temp_venues_to_companies.venue_user
LEFT JOIN companies ON temp_venues_to_companies.company_user=companies.rf_temp_user_email
SET venues.company_id=companies.id;

ALTER TABLE `dev`.`companies`
ADD COLUMN `asset_id` INT NOT NULL AFTER `id`;

INSERT INTO assets (asset_type, reference_id) SELECT "company", id FROM companies;

UPDATE companies LEFT JOIN assets ON companies.id=assets.reference_id AND assets.asset_type="company" SET companies.asset_id=assets.id;

DROP TABLE `dev`.`user_temp`;
DROP TABLE `dev`.`user_profile_new`;
DROP TABLE `dev`.`user_profile`;
DROP TABLE `dev`.`toplocations`;
DROP TABLE `dev`.`toplocation_categories`;
DROP TABLE `dev`.`settings_extra`;
DROP TABLE `dev`.`room_new_calendar`;
DROP TABLE `dev`.`referrals_booking`;
DROP TABLE `dev`.`referrals_amount`;
DROP TABLE `dev`.`referrals`;
DROP TABLE `dev`.`recommends`;
DROP TABLE `dev`.`permissions`;
DROP TABLE `dev`.`paywhom`;
DROP TABLE `dev`.`neighbor_city`;
DROP TABLE `dev`.`neighbor_area`;
DROP TABLE `dev`.`ical_import`;

ALTER TABLE `dev`.`room_availability`
RENAME TO  `dev`.`room_hour_rates` ;

ALTER TABLE `dev`.`room_hour_rates`
CHANGE COLUMN `start` `start` DECIMAL(10,2) NOT NULL ,
CHANGE COLUMN `end` `end` DECIMAL(10,2) NOT NULL ,
CHANGE COLUMN `minimum_hours` `minimum_hours` DECIMAL(10,2) NULL ,
CHANGE COLUMN `slot_length_hours` `slot_length_hours` DECIMAL(10,2) NULL DEFAULT NULL ;

UPDATE room_hour_rates SET start=60*start, end=60*end, minimum_hours=60*minimum_hours, slot_length_hours=60*slot_length_hours;

ALTER TABLE `dev`.`room_hour_rates`
CHANGE COLUMN `start` `start` INT NOT NULL ,
CHANGE COLUMN `end` `end` INT NOT NULL ,
CHANGE COLUMN `minimum_hours` `minimum_minutes` INT NULL ,
CHANGE COLUMN `slot_length_hours` `slot_length_minutes` INT NULL DEFAULT NULL ;

CREATE TABLE `dev`.`room_availability` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `room_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `available_from` INT NULL DEFAULT NULL,
  `available_to` INT NULL DEFAULT NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`room_hour_rates`
CHANGE COLUMN `room_id` `asset_id` INT(11) NOT NULL , RENAME TO  `dev`.`hourRates` ;

INSERT INTO hourRates (asset_id, day_id, start, `end`, price_per_hour, minimum_minutes, slot_length_minutes)
SELECT venues.asset_id, day_id, min(start), max(`end`), max(price_per_hour), max(minimum_minutes), max(slot_length_minutes)
FROM dev.hourRates
LEFT JOIN rooms ON hourRates.asset_id=rooms.asset_id
LEFT JOIN venues ON rooms.venue_id=venues.id
GROUP BY venues.asset_id, day_id
HAVING venues.asset_id IS NOT NULL;

INSERT INTO hourRates (asset_id, day_id, start, `end`, price_per_hour, minimum_minutes, slot_length_minutes)
SELECT companies.asset_id, day_id, min(start), max(`end`), max(price_per_hour), max(minimum_minutes), max(slot_length_minutes)
FROM dev.hourRates
LEFT JOIN venues ON hourRates.asset_id=venues.asset_id
LEFT JOIN companies ON venues.company_id=companies.id
GROUP BY companies.asset_id, day_id
HAVING companies.asset_id IS NOT NULL;

ALTER TABLE `dev`.`rooms`
ADD INDEX `asset_id` (`asset_id` ASC),
ADD INDEX `venue_id` (`venue_id` ASC);

ALTER TABLE `dev`.`venues`
ADD INDEX `asset_id` (`asset_id` ASC),
ADD INDEX `company_id` (`company_id` ASC);

ALTER TABLE `dev`.`companies`
ADD INDEX `asset_id` (`asset_id` ASC);

ALTER TABLE `dev`.`hourRates`
DROP INDEX `idx_rid_did_ss` ,
ADD INDEX `asset_id` (`asset_id` ASC);

ALTER TABLE `dev`.`room_day_rates`
ADD COLUMN `enabled` TINYINT NOT NULL DEFAULT 1 AFTER `minimum_delegate_number`,
ADD INDEX `room_id` (`room_id` ASC), RENAME TO  `dev`.`dayRates` ;

ALTER TABLE `dev`.`dayRates`
CHANGE COLUMN `room_id` `asset_id` INT(11) NOT NULL ;

ALTER TABLE `dev`.`room_availability`
RENAME TO  `dev`.`roomAvailability` ;

ALTER TABLE `dev`.`roomAvailability`
CHANGE COLUMN `room_id` `asset_id` INT(11) NOT NULL ;

CREATE TABLE `dev`.`hourlyPeriodPrices` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `openingPeriod_id` INT UNSIGNED NOT NULL,
  `price_per_hour` DECIMAL(8,3) NOT NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `openingPeriod_id_UNIQUE` (`openingPeriod_id` ASC),
  INDEX `price` (`price_per_hour` ASC));

INSERT INTO hourlyPeriodPrices (openingPeriod_id,price_per_hour)
SELECT id,price_per_hour from hourRates WHERE price_per_hour IS NOT NULL;

ALTER TABLE `dev`.`hourRates`
DROP COLUMN `price_per_hour`, RENAME TO  `dev`.`openingPeriods` ;

ALTER TABLE `dev`.`roomAvailability`
CHANGE COLUMN `asset_id` `period_id` INT(11) NOT NULL ,
ADD INDEX `date_search` (`period_id` ASC, `date` ASC),
DROP INDEX `id_UNIQUE` ;

ALTER TABLE `dev`.`openingPeriods`
ADD INDEX `period_search` (`asset_id` ASC, `day_id` ASC);

ALTER TABLE `dev`.`hourlyPeriodPrices`
RENAME TO  `dev`.`hourRates` ;

ALTER TABLE `dev`.`venues`
ADD COLUMN `name` VARCHAR(200) NOT NULL AFTER `company_id`;

UPDATE venues LEFT JOIN profiles ON venues.id=profiles.id SET venues.name=profiles.bussiness_name;

ALTER TABLE `dev`.`roomAvailability`
CHANGE COLUMN `period_id` `asset_id` INT(11) NOT NULL ;

ALTER TABLE `dev`.`roomAvailability`
ADD COLUMN `period_id` INT NULL DEFAULT NULL AFTER `date`;

ALTER TABLE `dev`.`roomAvailability`
CHANGE COLUMN `period_id` `openingPeriod_id` INT(11) NULL DEFAULT NULL ;

ALTER TABLE `dev`.`roomAvailability`
ADD INDEX `asset_search` (`asset_id` ASC);

ALTER TABLE `dev`.`openingPeriods`
ADD COLUMN `aggregate` TINYINT NOT NULL DEFAULT 0 AFTER `slot_length_minutes`;

CREATE TABLE `reservationPeriods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reservation_id` int(11) DEFAULT NULL,
  `asset_id` int(11) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `allDay` tinyint(1) NOT NULL DEFAULT '0',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservation_id` (`reservation_id`),
  KEY `asset_id` (`asset_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `dev`.`search_audit`
RENAME TO  `dev`.`searchAudit` ;
ALTER TABLE `dev`.`searchAudit`
CHANGE COLUMN `time` `date_time` DATETIME NOT NULL ;

ALTER TABLE `dev`.`rooms`
ADD COLUMN `ranking` INT UNSIGNED NOT NULL DEFAULT 50 AFTER `review`;

UPDATE rooms LEFT JOIN price ON rooms.id=price.id SET rooms.ranking=price.ranking;

CREATE TABLE `dev`.`landingPages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `location_id` INT NOT NULL,
  `location_text` TEXT NOT NULL,
  `search_url` VARCHAR(255) NOT NULL,
  `map_url` VARCHAR(255) NOT NULL,
  `background_url` VARCHAR(255) NOT NULL,
  `reserved_meta_keywords` VARCHAR(45) NOT NULL,
  `reserved_title` VARCHAR(45) NOT NULL,
  `reserved_meta_description` VARCHAR(255) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `dev`.`landingPage_rooms` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `landingpage_id` INT NOT NULL,
  `room_id` INT NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `dev`.`landingPage_venues` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `landingpage_id` INT NOT NULL,
  `venue_id` INT NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`room_amenity`
CHANGE COLUMN `room_id` `asset_id` INT(11) NOT NULL ;

ALTER TABLE `dev`.`reviews`
CHANGE COLUMN `list_id` `asset_id` BIGINT(20) NOT NULL ;

ALTER TABLE `dev`.`list_photo`
CHANGE COLUMN `list_id` `asset_id` BIGINT(20) NOT NULL , RENAME TO  `dev`.`assetPhotos` ;

ALTER TABLE `dev`.`addOns`
CHANGE COLUMN `room_id` `asset_id` INT(11) NOT NULL ;

ALTER TABLE `dev`.`addOns`
ADD INDEX `asset_id` (`asset_id` ASC);

ALTER TABLE `dev`.`addOns` ENGINE = InnoDB ;
ALTER TABLE `user_notification` ENGINE=InnoDB;
ALTER TABLE `user_autologin` ENGINE=InnoDB;
ALTER TABLE `users` ENGINE=InnoDB;
ALTER TABLE `settings` ENGINE=InnoDB;
ALTER TABLE `room_environment` ENGINE=InnoDB;
ALTER TABLE `room_catring` ENGINE=InnoDB;
ALTER TABLE `room_capacity` ENGINE=InnoDB;
ALTER TABLE `room_audio_visual` ENGINE=InnoDB;
ALTER TABLE `rooms` ENGINE=InnoDB;
ALTER TABLE `roles` ENGINE=InnoDB;
ALTER TABLE `reviews` ENGINE=InnoDB;
ALTER TABLE `reservation_status` ENGINE=InnoDB;
ALTER TABLE `reservation` ENGINE=InnoDB;
ALTER TABLE `profile_picture` ENGINE=InnoDB;
ALTER TABLE `profiles` ENGINE=InnoDB;
ALTER TABLE `price` ENGINE=InnoDB;
ALTER TABLE `payout_preferences` ENGINE=InnoDB;
ALTER TABLE `paymode` ENGINE=InnoDB;
ALTER TABLE `payment_details` ENGINE=InnoDB;
ALTER TABLE `payments` ENGINE=InnoDB;
ALTER TABLE `page` ENGINE=InnoDB;
ALTER TABLE `openingPeriods` ENGINE=InnoDB;
ALTER TABLE `metas` ENGINE=InnoDB;
ALTER TABLE `message_type` ENGINE=InnoDB;
ALTER TABLE `messages` ENGINE=InnoDB;
ALTER TABLE `login_attempts` ENGINE=InnoDB;
ALTER TABLE `language` ENGINE=InnoDB;
ALTER TABLE `faq` ENGINE=InnoDB;
ALTER TABLE `email_templates` ENGINE=InnoDB;
ALTER TABLE `email_settings` ENGINE=InnoDB;
ALTER TABLE `currency` ENGINE=InnoDB;
ALTER TABLE `country` ENGINE=InnoDB;
ALTER TABLE `contact_info` ENGINE=InnoDB;
ALTER TABLE `ci_sessions` ENGINE=InnoDB;
ALTER TABLE `calendar` ENGINE=InnoDB;
ALTER TABLE `assetPhotos` ENGINE=InnoDB;
ALTER TABLE `amnities` ENGINE=InnoDB;
ALTER TABLE `admin` ENGINE=InnoDB;

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDb DEFAULT CHARSET=latin1;

CREATE TABLE `user_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(34) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `activation_key` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_ip` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDb DEFAULT CHARSET=latin1;



/*DELETE ID 0 FROM PROFILES*/



ALTER TABLE `dev`.`profiles`
CHANGE COLUMN `id` `id` BIGINT(20) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `dev`.`bookingTypes`
RENAME TO  `dev`.`usages` ;
ALTER TABLE `dev`.`bookingTypesSupersets`
RENAME TO  `dev`.`usageSupersets` ;
ALTER TABLE `dev`.`bookingTypesSuperset_bookingType`
RENAME TO  `dev`.`usageSuperset_usage` ;
ALTER TABLE `dev`.`usageSuperset_usage`
CHANGE COLUMN `bookingTypesSuperset_id` `usageSuperset_id` INT(11) NOT NULL ,
CHANGE COLUMN `bookingType_id` `usage_id` INT(11) NOT NULL ;
ALTER TABLE `dev`.`bookingTypesSuperset_configuration`
CHANGE COLUMN `bookingTypesSuperset_id` `usageSuperset_id` INT(11) NOT NULL , RENAME TO  `dev`.`usageSuperset_configuration` ;

ALTER TABLE `dev`.`payments`
CHANGE COLUMN `is_enabled` `enabled` SMALLINT(6) NOT NULL DEFAULT '0' AFTER `note`, RENAME TO  `dev`.`paymentTypes` ;

CREATE TABLE `dev`.`payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `paymentType_id` INT NOT NULL,
  `amount` DECIMAL NOT NULL,
  `currency` VARCHAR(5) NOT NULL,
  `notes` VARCHAR(255) NULL,
  `timestamp` DATETIME NOT NULL,
  `settlementTimestamp` DATETIME NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

ALTER TABLE `dev`.`reservation`
RENAME TO  `dev`.`reservations_old` ;

CREATE TABLE `dev`.`reservations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `booking_id` INT NOT NULL,
  `asset_id` INT NOT NULL,
  `guest` INT NOT NULL,
  `currency` VARCHAR(5) NOT NULL,
  `price` DECIMAL(10,4) NOT NULL,
  `toVenue` DECIMAL(10,4) NOT NULL,
  `toZipcube` DECIMAL(10,4) NULL,
  `status` INT NOT NULL DEFAULT 1,
  `bookingDate` DATETIME NOT NULL,
  `comments` TEXT NULL,
  `meetingType` VARCHAR(255) NULL,
  `configuration` VARCHAR(45) NOT NULL,
  `venuePaymentDate` DATETIME NULL,
  `enabled` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `enabled_UNIQUE` (`enabled` ASC));

ALTER TABLE `dev`.`payments`
CHANGE COLUMN `timestamp` `paymentTime` DATETIME NOT NULL ,
CHANGE COLUMN `settlementTimestamp` `settlementTime` DATETIME NULL DEFAULT NULL ;

CREATE TABLE `dev`.`bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `booker_id` INT NOT NULL,
  `beneficiary_id` INT NOT NULL,
  `bookingChannel_id` INT NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `bookingDate` `created` DATETIME NOT NULL ;

ALTER TABLE `dev`.`bookings`
ADD COLUMN `created` DATETIME NOT NULL AFTER `bookingChannel_id`;

ALTER TABLE `dev`.`payments`
CHANGE COLUMN `paymentTime` `created` DATETIME NOT NULL ,
CHANGE COLUMN `settlementTime` `settled` DATETIME NULL ;

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `guest` `guests` INT(11) NOT NULL ;

ALTER TABLE `dev`.`payments`
ADD COLUMN `booking_id` INT(11) NOT NULL AFTER `id`;

ALTER TABLE `dev`.`reservations`
ADD INDEX `booking_id` (`booking_id` ASC),
ADD INDEX `asset_id` (`asset_id` ASC),
DROP INDEX `enabled_UNIQUE` ;

ALTER TABLE `dev`.`payments`
ADD COLUMN `external_reference` VARCHAR(45) NULL AFTER `paymentType_id`,
ADD COLUMN `status` TINYINT NOT NULL DEFAULT 0 AFTER `settled`;

CREATE TABLE `dev`.`paymentAudits` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `payment_id` INT NOT NULL,
  `paymentStatus_id` INT NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

ALTER TABLE `dev`.`paymentAudits`
ADD INDEX `payment_id` (`payment_id` ASC),
ADD INDEX `status_id` (`paymentStatus_id` ASC);

CREATE TABLE `dev`.`reservationAudits` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `reservation_id` INT NOT NULL,
  `reservationsStatus_id` INT NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `reservation_id` (`reservation_id` ASC),
  INDEX `status_id` (`reservationsStatus_id` ASC));

ALTER TABLE `dev`.`bookings`
ADD COLUMN `closed` DATETIME NULL DEFAULT NULL AFTER `created`;

ALTER TABLE `dev`.`reservations`
DROP COLUMN `venuePaymentDate`,
DROP COLUMN `created`,
CHANGE COLUMN `status` `reservationStatus_id` INT(11) NOT NULL DEFAULT '1' ;

ALTER TABLE `dev`.`bookings`
ADD INDEX `booker_id` (`booker_id` ASC),
ADD INDEX `beneficiary_id` (`beneficiary_id` ASC),
ADD INDEX `channel_id` (`bookingChannel_id` ASC);

ALTER TABLE `dev`.`reservationAudits`
CHANGE COLUMN `reservationsStatus_id` `reservationStatus_id` INT(11) NOT NULL ;

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `toZipcube` `toZipcube` DECIMAL(10,4) NULL DEFAULT NULL AFTER `price`,
ADD COLUMN `venuePaymentDateTime` DATETIME NULL DEFAULT NULL AFTER `toVenue`;

ALTER TABLE `dev`.`payments`
DROP COLUMN `settled`,
DROP COLUMN `created`,
CHANGE COLUMN `status` `paymentStatus_id` TINYINT(4) NOT NULL DEFAULT '0' ;

ALTER TABLE `dev`.`reservations`
ADD COLUMN `addOns` VARCHAR(255) NULL DEFAULT NULL AFTER `comments`;

ALTER TABLE `dev`.`currency_change`
ADD COLUMN `id` INT(11) NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`),
ADD UNIQUE INDEX `runt_unique` (`currFrom` ASC, `currInto` ASC),
ADD INDEX `runt_index` (`currFrom` ASC, `currInto` ASC);

ALTER TABLE `dev`.`reservations`
ADD COLUMN `title` VARCHAR(255) NULL DEFAULT NULL AFTER `asset_id`;

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `price` `price` DECIMAL(10,4) NULL DEFAULT NULL ;
ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `toVenue` `toVenue` DECIMAL(10,4) NULL DEFAULT NULL ;
ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `configuration` `configuration` VARCHAR(45) NULL DEFAULT NULL ;
ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `guests` `guests` INT(11) NULL DEFAULT NULL ,
CHANGE COLUMN `currency` `currency` VARCHAR(5) NULL DEFAULT NULL ;

ALTER TABLE `dev`.`searchAudit`
ADD INDEX `variable_value` (`variable` ASC, `value` ASC),
ADD INDEX `token` (`token` ASC);

ALTER TABLE `dev`.`assetPhotos`
ADD INDEX `asset_id` (`asset_id` ASC);

ALTER TABLE `dev`.`reviews`
ADD INDEX `asset_id` (`asset_id` ASC);

ALTER TABLE `dev`.`room_configuration`
ADD INDEX `asset_id` (`room_id` ASC),
ADD INDEX `conf_id` (`configuration_id` ASC);

ALTER TABLE `dev`.`hourRates`
DROP INDEX `openingPeriod_id_UNIQUE` ,
ADD INDEX `openingPeriod_id` (`openingPeriod_id` ASC),
DROP INDEX `price` ;

ALTER TABLE `dev`.`rooms`
ADD INDEX `currency` (`currency` ASC);

ALTER TABLE `dev`.`roomAvailability`
DROP COLUMN `date`,
CHANGE COLUMN `available_from` `available_from` DATETIME NOT NULL ,
CHANGE COLUMN `available_to` `available_to` DATETIME NOT NULL ,
ADD COLUMN `available` TINYINT(1) NOT NULL DEFAULT 1 AFTER `available_to`,
DROP INDEX `date_search` ,
ADD INDEX `date_search` (`asset_id` ASC);

ALTER TABLE `dev`.`roomAvailability`
CHANGE COLUMN `openingPeriod_id` `openingPeriod_id` INT(11) NOT NULL ,
CHANGE COLUMN `available_from` `start` INT(11) NOT NULL ,
CHANGE COLUMN `available_to` `end` INT(11) NOT NULL ,
ADD COLUMN `date` DATE NOT NULL AFTER `end`;

ALTER TABLE `dev`.`paymentAudits`
ADD COLUMN `user_id` INT(11) NOT NULL AFTER `paymentStatus_id`;

ALTER TABLE `dev`.`reservationAudits`
ADD COLUMN `user_id` INT(11) NOT NULL AFTER `reservationStatus_id`;

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`) VALUES ('admin_no_contact', 'Admin No Contact for Reservation', 'No Contact', 'No Contact for reservation: {reservation_id}.', '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight:normal;\"><!--<![endif]--> There is no contact for reservation: {reservation_id}. The booking has been taken, regardless, but the venue has yet to be notified.</p></td> </tr> <tr> <td width=\"100%\" height=\"30\"><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">&nbsp;</p> </td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br> </span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div> <div></div></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!------- Section 11 1 col CUM THREE COL-----------> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody><tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"image195\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!-- End Wrapper 2 --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table>');

ALTER TABLE `dev`.`messages`
DROP COLUMN `subject`,
DROP COLUMN `list_id`,
CHANGE COLUMN `conversation_id` `conversation_id` INT(11) NULL DEFAULT NULL ,
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `message_type`;
ALTER TABLE `dev`.`messages`
CHANGE COLUMN `is_starred` `is_starred` TINYINT(4) NOT NULL DEFAULT 0 ;
ALTER TABLE `dev`.`messages`
CHANGE COLUMN `created` `created_old` INT(31) NOT NULL ;
ALTER TABLE `dev`.`messages`
ADD COLUMN `created` DATETIME NOT NULL AFTER `created_old`;
UPDATE messages SET created=FROM_UNIXTIME(`created_old`);
ALTER TABLE `dev`.`messages`
DROP COLUMN `created_old`;

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' ;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `approved_ts` `approved_ts` TIMESTAMP NULL DEFAULT NULL ;

ALTER TABLE `dev`.`reservations`
ADD COLUMN `is_paid` TINYINT(1) NULL DEFAULT 0 AFTER `venuePaymentDateTime`;

ALTER TABLE `dev`.`reservation_status`
CHANGE COLUMN `disabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1';

CREATE TABLE `dev`.`payment_status` (
  `id` TINYINT(4) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

ALTER TABLE `dev`.`message_type`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `url`;

UPDATE `dev`.`message_type` SET `url`='dashboard/message_request' WHERE `message_type`.`url`='trips/request' AND `message_type`.`id`='1';
UPDATE `dev`.`message_type` SET `url`='dashboard/message_conversation' WHERE `message_type`.`url`='trips/conversation' AND `message_type`.`id`='2';
UPDATE `dev`.`message_type` SET `url`='dashboard/message_conversation' WHERE `message_type`.`url`='trips/conversation' AND `message_type`.`id`='3';
UPDATE `dev`.`message_type` SET `url`='dashboard/message_conversation' WHERE `message_type`.`url`='trips/conversation' AND `message_type`.`id`='6';
UPDATE `dev`.`message_type` SET `url`='dashboard/message_review' WHERE `message_type`.`url`='trips/review_by_traveller' AND `message_type`.`id`='5';

ALTER TABLE `dev`.`metas`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `subtitle`;

ALTER TABLE `dev`.`users`
CHANGE COLUMN `last_ip` `last_ip` VARCHAR(40) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NULL ;

use dev;
INSERT INTO users (email, ref_id, coupon_code, last_ip, created, modified)
SELECT bus_email, md5(bus_email), (FLOOR(RAND() * 89999) + 10000), NULL, unix_timestamp(now()), now()
FROM (SELECT distinct bus_email from profiles LEFT JOIN users on profiles.bus_email=users.email
WHERE bus_email iS NOT NULL AND bus_email != "" and bus_email != profiles.email and users.email IS NULL) as distincts;

ALTER TABLE `dev`.`user_asset_privileges`
ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`),
ADD UNIQUE INDEX `tuple` (`user_id` ASC, `asset_id` ASC);



/*RUN THIS and note them down, then advise David. The next line make user place holders*/

SELECT companies.rf_temp_user_email FROM companies LEFT JOIN users ON companies.rf_temp_user_email = users.email WHERE users.email IS NULL

INSERT INTO users (email, ref_id, coupon_code, last_ip, created, modified)
SELECT rf_temp_user_email, md5(rf_temp_user_email), (FLOOR(RAND() * 89999) + 10000), NULL, unix_timestamp(now()), now()
FROM (SELECT distinct rf_temp_user_email from companies LEFT JOIN users on companies.rf_temp_user_email = users.email WHERE users.email IS NULL) as distincts;

/*END*/

use dev;
INSERT IGNORE INTO user_asset_privileges (user_id, asset_id, privileges_mask)
SELECT DISTINCT users.id, companies.asset_id, 15 FROM dev.companies INNER JOIN users ON companies.rf_temp_user_email = users.email;

INSERT IGNORE INTO user_asset_privileges (user_id, asset_id, privileges_mask)
SELECT user_asset_privileges.user_id, venues.asset_id, user_asset_privileges.privileges_mask FROM user_asset_privileges
INNER JOIN assets ON asset_id=assets.id
INNER JOIN companies ON assets.id=companies.asset_id
INNER JOIN venues on venues.company_id=companies.id
WHERE asset_type='company';

use dev;
INSERT IGNORE INTO user_asset_privileges (user_id, asset_id, privileges_mask)
SELECT notees.id, venues.asset_id, 8 FROM venues left join user_asset_privileges ON venues.asset_id=user_asset_privileges.asset_id LEFT JOIN users ON user_asset_privileges.user_id=users.id
inner JOIN profiles ON users.id=profiles.user_id
INNER JOIN users as notees ON profiles.bus_email = notees.email;

INSERT IGNORE INTO user_asset_privileges (user_id, asset_id, privileges_mask)
SELECT user_asset_privileges.user_id, rooms.asset_id, user_asset_privileges.privileges_mask FROM user_asset_privileges
INNER JOIN assets ON asset_id=assets.id
INNER JOIN venues ON assets.id=venues.asset_id
INNER JOIN rooms on rooms.venue_id=venues.id
WHERE asset_type='venue' ORDER BY privileges_mask desc;


INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`) VALUES ('admin_refund_required', 'Admin Refund Reservation', 'Refund Required', 'Refund reservation: {reservation_id}', '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight:normal;\"><!--<![endif]--> Reservation {reservation_id} has been cancelled and must therefore be refunded.</p></td> </tr> <tr> <td width=\"100%\" height=\"30\"><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">&nbsp;</p> </td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br> </span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div> <div></div></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!------- Section 11 1 col CUM THREE COL-----------> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody><tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"image195\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!-- End Wrapper 2 --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table>');
UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight:normal;\"><!--<![endif]--> Payment {payment_id} must be refunded.</p></td> </tr> <tr> <td width=\"100%\" height=\"30\"><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">&nbsp;</p> </td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br> </span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div> <div></div></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!------- Section 11 1 col CUM THREE COL-----------> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody><tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"image195\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!-- End Wrapper 2 --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table>' WHERE `id`='86';
INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`) VALUES ('admin_exception', 'Admin Technical Exception', 'Technical Exception. Tell the tech team!', 'Exception: {message}', '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight:normal;\"><!--<![endif]--> Exception message:</p><p> {message}</p><p>Please alert the tech team.</p></td> </tr> <tr> <td width=\"100%\" height=\"30\"><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">&nbsp;</p> </td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br> </span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div> <div></div></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!------- Section 11 1 col CUM THREE COL-----------> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody><tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"image195\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!-- End Wrapper 2 --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table>');

ALTER TABLE `dev`.`reviews`
ADD COLUMN `newcreated` DATETIME NOT NULL AFTER `enabled`;
UPDATE reviews SET newcreated = from_unixtime(created) WHERE id>0;
ALTER TABLE `dev`.`reviews`
DROP COLUMN `created`,
CHANGE COLUMN `newcreated` `created` DATETIME NOT NULL AFTER `value`;

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Hurrah - Your booking request has been accepted!<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your booking request has been successfully accepted by {venue_name}. Please review the details of your reservation and contact {host_name} if you need to clarify anything. <br><br> If you require an invoice or receipt of payment please follow <a href=\"https://www.zipcube.com/dashboard/message_request/{reservation_id}\">this link</a>, click ‘print receipt’ and then you can save the file. Please note not all venues charge VAT on their rooms. <br /><br /> Thank you for using Zipcube.com</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div> <div><br></div></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Your booking details to be shared with your attendees.<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_email}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Address:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_address}</span></div><br><br> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {list_title}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} until {time_out}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Comments</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{comments}</span></div> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Total price: {market_price}{currency_price}<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"mailto:?subject=FW: Our next Meeting on {checkin} - Zipcube.com &amp;body=Hi,%0D%0A%0D%0A Here are the details for our next meeting recently booked with Zipcube.com: %0D%0A%0D%0A Check-in: {checkin} from {time_in} %0D%0A%0D%0A Check out: {checkout} from {time_out} %0D%0A%0D%0A Address: {venue_address}. %0D%0A%0D%0A %0D%0A%0D%0A Need a meeting space, desk, event space? Compare and book online https://www.zipcube.com. &amp;cc= &amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Click to share with your attendees</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!------- Section 11 1 col CUM THREE COL-----------> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody><tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"image195\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody><tr> <td width=\"100%\" align=\"center\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"30\"></td> </tr> </tbody></table><!-- End Space --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"><!--<![endif]--> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> <!--[if !mso]><!--></span><!--<![endif]--> </p> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body= I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc= &amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> </tr> </tbody></table><!-- End Wrapper 2 --> </div></td> </tr> </tbody></table><!-- End Wrapper --> <!-- End Wrapper 2 --> <!--map--> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody><tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#1f253d\" c-style=\"darkBlueBG\" style=\"background-color: rgb(31, 37, 61);\"> <div mc:hideable=\"\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td class=\"header-img\"> <!-- Space --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- Space --> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"bigImage\"> <tbody><tr> <td valign=\"middle\" width=\"100%\" style=\"text-align: center; font-family: Helvetica, Arial, sans-serif; font-size: 26px; color: rgb(255, 255, 255); font-weight: normal; line-height: 32px;\" t-style=\"whiteText\" class=\"fullCenter\" mc:edit=\"47\"> <p object=\"text-editable\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight: normal;\"><!--<![endif]--> <singleline>Your next Zipcube meeting</singleline> <!--[if !mso]><!--></span><!--<![endif]--> </p> </td> </tr> <tr> <td width=\"100%\" height=\"35\"></td> </tr> <tr> <td valign=\"middle\" width=\"100%\" style=\"text-align: center; font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: rgb(255, 255, 255); font-weight: normal; line-height: 22px;\" t-style=\"whiteText\" class=\"fullCenter\" mc:edit=\"48_1\"> </td> </tr> <tr> <td width=\"100%\" height=\"65\"></td> </tr> <tr> <td width=\"100%\" height=\"130\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <img src=\"{url_googlemap}\" alt=\"map\" width=\"300\" height=\"300\" border=\"0\" style=\"width: 100%; height: auto;\" class=\"hover\" mc:edit=\"49\"> </td> </tr> </tbody></table> </td> </tr> </tbody></table><!-- End Wrapper --> </div> </td> </tr> </tbody></table> <!--/map--> </td> </tr> </tbody></table>' WHERE `id`='51';


UPDATE dev.reservation_status SET Name="Tentative" WHERE id=0;
ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `booking_id` `booking_id` INT(11) NULL DEFAULT NULL ;

ALTER TABLE `dev`.`users`
ADD COLUMN `userType_id` INT NOT NULL DEFAULT 0 AFTER `role_id`;
UPDATE users INNER JOIN profiles on profiles.user_id=users.id SET users.userType_id = profiles.user_type;


ALTER TABLE `dev`.`assets`
RENAME TO `dev`.`assetAudit`;

ALTER TABLE `dev`.`venues`
ADD COLUMN `approved` TINYINT(4) NOT NULL DEFAULT '0' AFTER `website`,
ADD COLUMN `approved_datetime` DATETIME NULL DEFAULT NULL AFTER `approved`;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `approved_ts` `approved_datetime` DATETIME NULL DEFAULT NULL;

ALTER TABLE `dev`.`companies`
ADD COLUMN `approved` TINYINT(4) NOT NULL DEFAULT '1' AFTER `rf_temp_user_email`,
ADD COLUMN `approved_datetime` DATETIME NULL DEFAULT NULL AFTER `approved`;

ALTER TABLE `dev`.`venues`
CHANGE COLUMN `address` `address` TEXT NULL,
CHANGE COLUMN `phone` `phone` VARCHAR(20) NULL,
CHANGE COLUMN `lat` `lat` DECIMAL(10,7) NULL,
CHANGE COLUMN `long` `long` DECIMAL(10,7) NULL;

ALTER TABLE `dev`.`venues`
ADD COLUMN `transport` TEXT NULL DEFAULT NULL AFTER `description`;

CREATE TABLE `dev`.`venueOpeningPeriods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `asset_id` INT NOT NULL,
  `opening_type` INT NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`));

ALTER TABLE `dev`.`venueTypes`
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `dev`.`amenities`
ADD COLUMN `amenityAsset_id` INT(11) NOT NULL DEFAULT 0 AFTER `long_desc`;

ALTER TABLE `dev`.`room_amenity`
RENAME TO  `dev`.`asset_amenity`;

INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('Parking', 'Parking', '1');
UPDATE `dev`.`amenities` SET `amenityAsset_id`='1' WHERE `id`='15';
INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('Accessibility', 'Accessibility', '1');
INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('Flipchart', 'Flipchart', '1');
INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('Pen/Paper', 'Pen/Paper', '1');
INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('Projector/TV/Screen', 'Projector/TV/Screen', '1');
UPDATE `dev`.`amenities` SET `amenityAsset_id`='1' WHERE `id`='20';
UPDATE `dev`.`amenities` SET `amenityAsset_id`='1' WHERE `id`='18';
INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('Tea/coffee', 'Tea/coffee', '1');
INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('External catering allowed', 'External catering allowed', '1');
UPDATE `dev`.`amenities` SET `enabled`='0' WHERE `id`='2';
INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('Projector/TV/Screen', 'Projector/TV/Screen', '0');
UPDATE `dev`.`amenities` SET `enabled`='0' WHERE `id`='13';
UPDATE `dev`.`amenities` SET `enabled`='0' WHERE `id`='14';
UPDATE `dev`.`amenities` SET `enabled`='0' WHERE `id`='16';
UPDATE `dev`.`amenities` SET `enabled`='0' WHERE `id`='17';
UPDATE `dev`.`amenities` SET `enabled`='0' WHERE `id`='21';
INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('Conferencing Phone', 'Conferencing Phone', '0');
INSERT INTO `dev`.`amenities` (`desc`, `long_desc`, `amenityAsset_id`) VALUES ('Video Conference Phone', 'Video Conference Phone', '0');

ALTER TABLE `dev`.`asset_amenity`
ADD COLUMN `cost` DECIMAL(10,4) NULL DEFAULT NULL AFTER `amenity_id`;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `currency` `currency` VARCHAR(10) NULL DEFAULT 'GBP',
CHANGE COLUMN `page_viewed` `page_viewed` BIGINT(20) NULL DEFAULT NULL,
CHANGE COLUMN `updated` `updated` INT(31) NULL DEFAULT NULL,
CHANGE COLUMN `comm` `comm` INT(11) NULL DEFAULT NULL,
CHANGE COLUMN `comm_host` `comm_host` INT(11) NULL DEFAULT NULL,
CHANGE COLUMN `room_cancel_percent` `room_cancel_percent` INT(11) NULL DEFAULT NULL,
CHANGE COLUMN `room_cancel_days` `room_cancel_days` INT(11) NULL DEFAULT NULL,
CHANGE COLUMN `room_edit` `room_edit` INT(11) NULL DEFAULT NULL,
CHANGE COLUMN `area` `area` INT(11) NULL DEFAULT NULL,
CHANGE COLUMN `legacy_user_id` `legacy_user_id` INT(11) NULL,
CHANGE COLUMN `legacy_email` `legacy_email` VARCHAR(50) NULL,
CHANGE COLUMN `legacy_phone` `legacy_phone` VARCHAR(50) NULL,
CHANGE COLUMN `legacy_exact` `legacy_exact` INT(11) NULL,
CHANGE COLUMN `legacy_lat` `legacy_lat` DECIMAL(18,14) NULL,
CHANGE COLUMN `legacy_long` `legacy_long` DECIMAL(18,14) NULL,
CHANGE COLUMN `legacy_property_id` `legacy_property_id` INT(11) NULL,
CHANGE COLUMN `legacy_room_type` `legacy_room_type` VARCHAR(50) NULL,
CHANGE COLUMN `legacy_bedrooms` `legacy_bedrooms` INT(11) NULL,
CHANGE COLUMN `legacy_beds` `legacy_beds` INT(11) NULL,
CHANGE COLUMN `legacy_bed_type` `legacy_bed_type` VARCHAR(50) NULL,
CHANGE COLUMN `legacy_bathrooms` `legacy_bathrooms` FLOAT NULL,
CHANGE COLUMN `legacy_amenities` `legacy_amenities` VARCHAR(111) NULL,
CHANGE COLUMN `legacy_capacity` `legacy_capacity` INT(11) NULL,
CHANGE COLUMN `legacy_street_view` `legacy_street_view` SMALLINT(6) NULL,
CHANGE COLUMN `legacy_price` `legacy_price` INT(11) NULL,
CHANGE COLUMN `legacy_sublet_price` `legacy_sublet_price` INT(50) NULL,
CHANGE COLUMN `legacy_sublet_status` `legacy_sublet_status` ENUM('0', '1') NULL,
CHANGE COLUMN `legacy_sublet_startdate` `legacy_sublet_startdate` VARCHAR(150) NULL,
CHANGE COLUMN `legacy_sublet_enddate` `legacy_sublet_enddate` VARCHAR(150) NULL,
CHANGE COLUMN `legacy_manual` `legacy_manual` TEXT CHARACTER SET 'utf8' NULL,
CHANGE COLUMN `legacy_neighbor` `legacy_neighbor` VARCHAR(60) NULL,
CHANGE COLUMN `legacy_min_stay` `legacy_min_stay` INT(11) NULL,
CHANGE COLUMN `legacy_comm_trav` `legacy_comm_trav` INT(11) NULL,
CHANGE COLUMN `legacy_room_uses` `legacy_room_uses` VARCHAR(255) NULL,
CHANGE COLUMN `legacy_selectall_status` `legacy_selectall_status` ENUM('0', '1') NULL DEFAULT '0',
CHANGE COLUMN `legacy_twosets_status` `legacy_twosets_status` ENUM('0', '1') NULL DEFAULT '0',
CHANGE COLUMN `legacy_startend_status` `legacy_startend_status` ENUM('0', '1') NULL DEFAULT '0',
CHANGE COLUMN `legacy_start_date` `legacy_start_date` DATE NULL,
CHANGE COLUMN `legacy_end_date` `legacy_end_date` DATE NULL,
CHANGE COLUMN `legacy_setuptime_status` `legacy_setuptime_status` ENUM('0', '1') NULL,
CHANGE COLUMN `legacy_setuptime_hourse` `legacy_setuptime_hourse` VARCHAR(20) NULL,
CHANGE COLUMN `legacy_selltime_status` `legacy_selltime_status` ENUM('0', '1') NULL,
CHANGE COLUMN `legacy_selltime_days` `legacy_selltime_days` VARCHAR(20) NULL,
CHANGE COLUMN `legacy_room_envior_att` `legacy_room_envior_att` VARCHAR(200) NULL,
CHANGE COLUMN `legacy_room_audio` `legacy_room_audio` VARCHAR(200) NULL,
CHANGE COLUMN `legacy_room_catering` `legacy_room_catering` VARCHAR(200) NULL,
CHANGE COLUMN `legacy_other_specification` `legacy_other_specification` VARCHAR(200) NULL,
CHANGE COLUMN `legacy_special_comments` `legacy_special_comments` TEXT NULL;

ALTER TABLE `dev`.`room_configuration`
CHANGE COLUMN `room_id` `asset_id` INT(11) NOT NULL;

ALTER TABLE `dev`.`rooms`
ADD COLUMN `listing_hourly_rate` DECIMAL(8,3) NOT NULL DEFAULT 0 AFTER `desc`;

/* Start ALLY IMPORT */

CREATE TABLE `dev`.`opening_types` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `opening_type` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`));

CREATE TABLE `dev`.`opening_types_times` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `opening_type` INT(11) NOT NULL,
  `day_id` INT(11) NOT NULL,
  `start` INT(11) NOT NULL,
  `end` INT(11) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`));

INSERT INTO `dev`.`opening_types` (`opening_type`) VALUES ('24/7');
INSERT INTO `dev`.`opening_types` (`opening_type`) VALUES ('mon-fri 8-6');
INSERT INTO `dev`.`opening_types` (`opening_type`) VALUES ('mon-fri 9-6');
INSERT INTO `dev`.`opening_types` (`opening_type`) VALUES ('mon-sun 9-6');
INSERT INTO `dev`.`opening_types` (`opening_type`) VALUES ('custom');

INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('1', '0', '0', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('1', '1', '0', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('1', '2', '0', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('1', '3', '0', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('1', '4', '0', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('1', '5', '0', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('1', '6', '0', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('2', '1', '480', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('2', '2', '480', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('2', '3', '480', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('2', '4', '480', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('2', '5', '480', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('3', '1', '540', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('3', '2', '540', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('3', '3', '540', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('3', '4', '540', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('3', '5', '540', '1080');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('4', '0', '540', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('4', '1', '540', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('4', '2', '540', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('4', '3', '540', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('4', '4', '540', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('4', '5', '540', '1440');
INSERT INTO `dev`.`opening_types_times` (`opening_type`, `day_id`, `start`, `end`) VALUES ('4', '6', '540', '1440');

UPDATE dev.opening_types_times SET `end`=1080 WHERE `opening_type`=4;

ALTER TABLE `dev`.`assetPhotos`
CHANGE COLUMN `created` `created_old` INT(31) NOT NULL;

ALTER TABLE `dev`.`assetPhotos`
ADD COLUMN `created` DATETIME NOT NULL AFTER `is_featured`;

UPDATE dev.assetPhotos SET created=FROM_UNIXTIME(`created_old`);

ALTER TABLE `dev`.`assetPhotos`
DROP COLUMN `created_old`;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `created` `created_old` INT(31) NOT NULL;

ALTER TABLE `dev`.`rooms`
ADD COLUMN `created` DATETIME NOT NULL AFTER `ranking`;

UPDATE dev.rooms SET created=FROM_UNIXTIME(`created_old`);

ALTER TABLE `dev`.`rooms`
DROP COLUMN `created_old`;

ALTER TABLE `dev`.`assetPhotos`
ADD COLUMN `configuration_id` INT(11) NULL DEFAULT NULL AFTER `is_featured`;

CREATE TABLE `dev`.`cancellation_types` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `cancel_percent` INT(11) NOT NULL,
  `cancel_days` INT(11) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`));

ALTER TABLE `dev`.`venues`
ADD COLUMN `cancellation_type` INT(11) NULL AFTER `website`,
ADD COLUMN `cancel_percent` INT(11) NULL AFTER `cancellation_type`,
ADD COLUMN `cancel_days` INT(11) NULL AFTER `cancel_percent`;

INSERT INTO dev.cancellation_types (description, cancel_percent, cancel_days) VALUES ('Full refund', 100, 0);
INSERT INTO dev.cancellation_types (description, cancel_percent, cancel_days) VALUES ('100% refund 2 working days before meeting', 100, 2);
INSERT INTO dev.cancellation_types (description, cancel_percent, cancel_days) VALUES ('50% refund 2 working days before meeting', 50, 2);
INSERT INTO dev.cancellation_types (description, cancel_percent, cancel_days) VALUES ('Custom', 0, 0);

ALTER TABLE `dev`.`opening_types`
CHANGE COLUMN `opening_type` `name` VARCHAR(45) NOT NULL ;

UPDATE `dev`.`opening_types` SET `name`='Mon-Fri 8-6' WHERE `id`='2';
UPDATE `dev`.`opening_types` SET `name`='Mon-Fri 9-6' WHERE `id`='3';
UPDATE `dev`.`opening_types` SET `name`='Mon-Sun 9-6' WHERE `id`='4';
UPDATE `dev`.`opening_types` SET `name`='Custom' WHERE `id`='5';

INSERT INTO venueOpeningPeriods (asset_id, opening_type)
SELECT asset_id, 4 AS opening_type FROM venues;

TRUNCATE dev.openingPeriods;
ALTER TABLE dev.openingPeriods AUTO_INCREMENT = 1;

INSERT INTO openingPeriods (asset_id, day_id, start, end)
SELECT venueOpeningPeriods.asset_id, day_id, start, end FROM dev.venueOpeningPeriods
INNER JOIN opening_types_times ON venueOpeningPeriods.opening_type=opening_types_times.opening_type;

INSERT INTO openingPeriods (asset_id, day_id, start, end)
SELECT rooms.asset_id, day_id, start, end FROM dev.venueOpeningPeriods
INNER JOIN venues ON venueOpeningPeriods.asset_id=venues.asset_id
INNER JOIN rooms on venues.id=rooms.venue_id
INNER JOIN opening_types_times ON venueOpeningPeriods.opening_type=opening_types_times.opening_type;

ALTER TABLE `dev`.`currency`
CHANGE COLUMN `id` `code` CHAR(3) NOT NULL;

ALTER TABLE `dev`.`reservations`
ADD COLUMN `legacy_reservation_id` INT NOT NULL DEFAULT 0 AFTER `enabled`;

use dev;
TRUNCATE bookings;
TRUNCATE reservations;
TRUNCATE reservationPeriods;
TRUNCATE payments;
ALTER TABLE bookings AUTO_INCREMENT = 1;
ALTER TABLE reservations AUTO_INCREMENT = 1;
ALTER TABLE reservationPeriods AUTO_INCREMENT = 1;
ALTER TABLE payments AUTO_INCREMENT = 1;
TRUNCATE reservationAudits;
ALTER TABLE reservationAudits AUTO_INCREMENT = 1;
TRUNCATE paymentAudits;
ALTER TABLE paymentAudits AUTO_INCREMENT = 1;
TRUNCATE roomAvailability;
ALTER TABLE roomAvailability AUTO_INCREMENT = 1;

/* THEN RUN administrator/refactor/reservations*/

UPDATE venueOpeningPeriods SET opening_type=3;

TRUNCATE dev.openingPeriods;
ALTER TABLE dev.openingPeriods AUTO_INCREMENT = 1;

ALTER TABLE `dev`.`openingPeriods`
CHANGE COLUMN `minimum_minutes` `minimum_minutes` INT(11) NOT NULL DEFAULT 60 ,
CHANGE COLUMN `slot_length_minutes` `slot_length_minutes` INT(11) NOT NULL DEFAULT 30 ;

INSERT INTO openingPeriods (asset_id, day_id, start, end)
SELECT venueOpeningPeriods.asset_id, day_id, start, end FROM dev.venueOpeningPeriods
INNER JOIN opening_types_times ON venueOpeningPeriods.opening_type=opening_types_times.opening_type;

INSERT INTO openingPeriods (asset_id, day_id, start, end)
SELECT rooms.asset_id, day_id, start, end FROM dev.venueOpeningPeriods
INNER JOIN venues ON venueOpeningPeriods.asset_id=venues.asset_id
INNER JOIN rooms on venues.id=rooms.venue_id
INNER JOIN opening_types_times ON venueOpeningPeriods.opening_type=opening_types_times.opening_type;


UPDATE rooms LEFT JOIN price ON rooms.id=price.id SET rooms.listing_hourly_rate = price.night;

TRUNCATE dev.hourRates;
ALTER TABLE dev.hourRates AUTO_INCREMENT = 1;

INSERT INTO dev.hourRates (openingPeriod_id, price_per_hour) SELECT openingPeriods.id, rooms.listing_hourly_rate FROM openingPeriods INNER JOIN rooms on openingPeriods.asset_id=rooms.asset_id;

UPDATE dev.openingPeriods SET minimum_minutes=60, slot_length_minutes=30;

UPDATE `dev`.`currency` SET `default`='0' WHERE `code`='USD';
UPDATE `dev`.`currency` SET `default`='1' WHERE `code`='GBP';

UPDATE `dev`.`currency_change` SET `rate`='1' WHERE `id`='1';
UPDATE `dev`.`currency_change` SET `rate`='1' WHERE `id`='5';

UPDATE messages left join reservations ON messages.reservation_id=reservations.legacy_reservation_id SET messages.reservation_id=reservations.id;

UPDATE reviews left join reservations ON reviews.reservation_id=reservations.legacy_reservation_id SET reviews.reservation_id=reservations.id;

UPDATE venues left join rooms ON rooms.venue_id=venues.id SET venues.approved=1 WHERE rooms.approved=1 AND rooms.enabled=1 AND rooms.status=1;

UPDATE reservationPeriods left join reservations on reservationPeriods.id=reservations.id SET reservationPeriods.enabled=1 WHERE reservations.reservationStatus_id=1;

UPDATE reservations SET is_paid=1 WHERE venuePaymentDateTime iS NOT NULL;

INSERT INTO `payment_status` (`name`, `enabled`) VALUES ('CREATED', '1');
INSERT INTO `payment_status` (`name`, `enabled`) VALUES ('VOID', '1');
INSERT INTO `payment_status` (`name`, `enabled`) VALUES ('COMPLETE', '1');
INSERT INTO `payment_status` (`name`, `enabled`) VALUES ('REFUND', '1');

ALTER TABLE `reservations`
ADD COLUMN `zipcube_notes` TEXT NULL DEFAULT NULL AFTER `enabled`;

ALTER TABLE `reservations`
CHANGE COLUMN `addOns` `addOns` TEXT NULL DEFAULT NULL;

UPDATE users SET username='Requires Update' WHERE username is null;

/*24/02/16 addition Ally*/

ALTER TABLE `dev`.`landingPages`
DROP COLUMN `background_url`,
DROP COLUMN `map_url`;

/**/

/* 25/02/16 addition Andrew (Email for password successfully changed) */

INSERT INTO `dev`.`email_templates` (`id`, `type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`) VALUES ('88', 'updated_password', 'Your password has been changed', 'Your password has been changed', 'Hi {username}, Your password has been successfully changed.', '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Text --> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> <!--<![endif]--> Hi {username},<!--[if !mso]><!--> </span> <!--<![endif]--> </p> </td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Your password has been successfully changed. <br><br> </span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"> <i> Feel free to share and help us to provide the best possible online experience for you. <br> - The Zipcube Team. </i> </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> <br> </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"> Your account details: </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"> <br> </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Email (log in): {email} </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Password: {password} </span> </div> <div> <br> </div> <p> </p> </td> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Log in to your account</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!-- End Wrapper 2 --> </td> </tr> </tbody> </table> <!-- End Wrapper --> </td> </tr> </tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Text --> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> <!--<![endif]--> Hi {username},<!--[if !mso]><!--> </span> <!--<![endif]--> </p> </td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Your password has been successfully changed. <br><br> </span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"> <i> Feel free to share and help us to provide the best possible online experience for you. <br> - The Zipcube Team. </i> </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> <br> </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"> Your account details: </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"> <br> </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Email (log in): {email} </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Password: {password} </span> </div> <div> <br> </div> <p> </p> </td> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Log in to your account</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!-- End Wrapper 2 --> </td> </tr> </tbody> </table> <!-- End Wrapper --> </td> </tr> </tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Text --> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> <!--<![endif]--> Hi {username},<!--[if !mso]><!--> </span> <!--<![endif]--> </p> </td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Your password has been successfully changed. <br><br> </span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"> <i> Feel free to share and help us to provide the best possible online experience for you. <br> - The Zipcube Team. </i> </span> </div> <div> <br> </div> <p> </p> </td> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Log in to your account</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!-- End Wrapper 2 --> </td> </tr> </tbody> </table> <!-- End Wrapper --> </td> </tr> </tbody> </table> ');
UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Text --> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> <!--<![endif]--> Hi {username},<!--[if !mso]><!--> </span> <!--<![endif]--> </p> </td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Your password has been successfully changed. <br><br> </span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"> <i> Feel free to share and help us to provide the best possible online experience for you. <br> - The Zipcube Team. </i> </span> </div> <div> <br> </div> <p> </p> </td> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Log in to your account</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!-- End Wrapper 2 --> </td> </tr> </tbody> </table> <!-- End Wrapper --> </td> </tr> </tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Text --> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> <!--<![endif]--> Hi {username},<!--[if !mso]><!--> </span> <!--<![endif]--> </p> </td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Your password has been successfully changed. <br><br> </span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"> <i> Feel free to share and help us to provide the best possible online experience for you. <br> - The Zipcube Team. </i> </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> <br> </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"> Your account details: </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"> <br> </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Email (log in): {email} </span> </div> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Password: {password} </span> </div> <div> <br> </div> <p> </p> </td> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Log in to your account</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!-- End Wrapper 2 --> </td> </tr> </tbody> </table> <!-- End Wrapper --> </td> </tr> </tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody> </table> <!-- End Space --> <!-- Text --> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> <!--<![endif]--> Hi {username},<!--[if !mso]><!--> </span> <!--<![endif]--> </p> </td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> Your password has been successfully changed. <br><br> </span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"> <i> Feel free to share and help us to provide the best possible online experience for you. <br> - The Zipcube Team. </i> </span> </div> <div> <br> </div> <p> </p> </td> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <!--<![endif]--> <a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Log in to your account</a> <!--[if !mso]><!--> </span> <!--<![endif]--> </td> </tr> </tbody> </table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!-- End Wrapper 2 --> </td> </tr> </tbody> </table> <!-- End Wrapper --> </td> </tr> </tbody> </table>' WHERE `id`='88';

/* ANDREW MIGRATED TO HERE ON 25/02/16 */

/*26/02/16 addition Ally (for hiding rooms)*/

ALTER TABLE `dev`.`rooms`
ADD COLUMN `hidden` TINYINT(1) NOT NULL DEFAULT 0 AFTER `approved`;

/*26/02/16 addition Ally (new created columns for venues/companies)*/

ALTER TABLE `dev`.`venues`
ADD COLUMN `created` DATETIME NOT NULL AFTER `cancel_days`;

ALTER TABLE `dev`.`companies`
ADD COLUMN `created` DATETIME NOT NULL AFTER `rf_temp_user_email`;

/*26/02/16 addition Ally (change amount field to have decimal places)*/

ALTER TABLE `dev`.`payments`
CHANGE COLUMN `amount` `amount` DECIMAL(10,4) NOT NULL;

/* ANDREW MIGRATED TO HERE ON 29/02/16 */
/*29/02/16 addition Ally (update rooms to use hidden field)*/

UPDATE rooms SET `hidden`=1 WHERE `enabled`=0;

/* ANDREW MIGRATED TO HERE ON 29/02/16 */

/*01/03/16 addition Ally (change of column name + update)*/

ALTER TABLE `dev`.`room_bookingType`
CHANGE COLUMN `room_id` `legacy_room_id` INT(11) NULL ,
ADD COLUMN `asset_id` INT(11) NOT NULL AFTER `id`;

UPDATE dev.room_bookingType
INNER JOIN rooms ON room_bookingType.legacy_room_id=rooms.id
SET room_bookingType.asset_id=rooms.asset_id;

/* ANDREW MIGRATED TO HERE ON 01/03/16 */

/*01/03/16 addition Ally (move opening_type column into venues table)*/

ALTER TABLE `dev`.`venues`
ADD COLUMN `opening_type` INT(11) NOT NULL AFTER `venue_type`;

UPDATE dev.venues
INNER JOIN venueOpeningPeriods ON venueOpeningPeriods.asset_id=venues.asset_id
SET venues.opening_type=venueOpeningPeriods.opening_type;

ALTER TABLE `dev`.`venues`
ADD COLUMN `minimum_minutes` INT(11) NOT NULL DEFAULT '60' AFTER `opening_type`;

/*then find all venues with rooms with minimum_minutes <> 60 using the following query and updates the venue to be a sensible option from the rooms minimum_minutes*/

SELECT DISTINCT venues.id FROM dev.openingPeriods
INNER JOIN rooms ON rooms.asset_id=openingPeriods.asset_id
INNER JOIN venues ON rooms.venue_id=venues.id
WHERE openingPeriods.minimum_minutes<>60;

DROP TABLE `dev`.`venueOpeningPeriods`;

/*02/03/16 addition Ally (to solve non-null fields being set to zero on creation)*/

ALTER TABLE `dev`.`venues`
CHANGE COLUMN `opening_type` `opening_type` INT(11) NULL DEFAULT NULL;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `listing_hourly_rate` `listing_hourly_rate` DECIMAL(8,3) NULL DEFAULT NULL;

/* ANDREW MIGRATED TO HERE ON 03/03/16 */
/* Will migrated to here on 2016-03-03 15:04 */

/*08/03/16 addition Ally (new table for asset cancellation policies)*/

CREATE TABLE `dev`.`asset_cancellation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `asset_id` INT(11) NOT NULL,
  `cancel_percent` DECIMAL(10,2) NOT NULL,
  `cancel_days` INT(11) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`));

/*09/03/16 addition Ally (changeover of data for asset cancellation table)*/

INSERT INTO `dev`.asset_cancellation (asset_id, cancel_percent, cancel_days)
SELECT venues.asset_id, cancellation_types.cancel_percent, cancellation_types.cancel_days FROM venues
INNER JOIN cancellation_types ON cancellation_types.id=venues.cancellation_type
WHERE cancellation_type IS NOT NULL AND cancellation_type<>4;

INSERT INTO `dev`.asset_cancellation (asset_id, cancel_percent, cancel_days)
SELECT venues.asset_id, venues.cancel_percent, venues.cancel_days FROM venues
WHERE cancellation_type=4;

INSERT INTO `dev`.asset_cancellation (asset_id, cancel_percent, cancel_days)
SELECT rooms.asset_id, cancellation_types.cancel_percent, cancellation_types.cancel_days FROM venues
INNER JOIN cancellation_types ON cancellation_types.id=venues.cancellation_type
INNER JOIN rooms ON venues.id=rooms.venue_id
WHERE cancellation_type IS NOT NULL AND cancellation_type<>4;

INSERT INTO `dev`.asset_cancellation (asset_id, cancel_percent, cancel_days)
SELECT rooms.asset_id, venues.cancel_percent, venues.cancel_days FROM venues
INNER JOIN rooms ON venues.id=rooms.venue_id
WHERE cancellation_type=4;

ALTER TABLE `dev`.`venues`
DROP COLUMN `cancel_days`,
DROP COLUMN `cancel_percent`;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `room_cancel_percent` `legacy_room_cancel_percent` INT(11) NULL DEFAULT NULL AFTER `legacy_long`,
CHANGE COLUMN `room_cancel_days` `legacy_room_cancel_days` INT(11) NULL DEFAULT NULL AFTER `legacy_room_cancel_percent`;

/*09/03/16 addition Ally (new table for user email history)*/

CREATE TABLE `dev`.`user_info_history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `email` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`));

/* ANDREW MIGRATED TO HERE ON 09/03/16 */

/*10/03/16 addition Ally (new tables for asset types)*/

CREATE TABLE `dev`.`asset_types` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `asset_type` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`));

INSERT INTO dev.asset_types (asset_type) VALUES ('company');
INSERT INTO dev.asset_types (asset_type) VALUES ('venue');
INSERT INTO dev.asset_types (asset_type) VALUES ('room');

ALTER TABLE `dev`.`amenities`
CHANGE COLUMN `amenityAsset_id` `amenity_asset_type` INT(11) NOT NULL,
CHANGE COLUMN `amenityType_id` `amenity_type` INT(11) NOT NULL,
ADD COLUMN `filterable` TINYINT(1) NOT NULL DEFAULT 0 AFTER `amenity_type`;

UPDATE dev.amenities SET amenity_asset_type = 2 WHERE amenity_asset_type=1;
UPDATE dev.amenities SET amenity_asset_type = 3 WHERE amenity_asset_type=0;

TRUNCATE dev.amenity_types;
ALTER TABLE dev.amenity_types AUTO_INCREMENT = 1;

INSERT INTO dev.amenity_types (`desc`) VALUES ('General');
INSERT INTO dev.amenity_types (`desc`) VALUES ('Equipment');
INSERT INTO dev.amenity_types (`desc`) VALUES ('Catering');

/*11/03/16 addition Ally (new column for user token)*/

ALTER TABLE `dev`.`users`
ADD COLUMN `token` VARCHAR(50) NOT NULL AFTER `coupon_code`;

/*14/03/16 addition Ally (change of column name for alias)*/

ALTER TABLE `dev`.`amenity_types`
CHANGE COLUMN `desc` `name` VARCHAR(45) NOT NULL;

ALTER TABLE `dev`.`amenities`
DROP COLUMN `amenity_asset_type`,
CHANGE COLUMN `long_desc` `long_desc` VARCHAR(45) NULL DEFAULT NULL;

ALTER TABLE `dev`.`asset_amenity`
ADD COLUMN `currency` VARCHAR(10) NULL DEFAULT 'GBP' AFTER `amenity_id`;

/*15/03/16 addition Ally (new column for amenity instructions)*/

ALTER TABLE `dev`.`asset_amenity`
ADD COLUMN `instructions` TEXT NULL DEFAULT NULL AFTER `cost`;

ALTER TABLE `dev`.`amenities`
ADD COLUMN `allow_price` TINYINT(1) NOT NULL DEFAULT '1' AFTER `filterable`;

ALTER TABLE `dev`.`asset_amenity`
ADD COLUMN `available` TINYINT(1) NOT NULL DEFAULT '1' AFTER `instructions`;

ALTER TABLE `dev`.`asset_amenity`
RENAME TO  `dev`.`asset_amenity_old`;

CREATE TABLE `asset_amenity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `asset_id` int(11) NOT NULL,
  `amenity_id` int(11) NOT NULL,
  `currency` varchar(10) DEFAULT 'GBP',
  `cost` decimal(10,4) DEFAULT NULL,
  `instructions` text,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `combo_UNIQUE` (`asset_id`,`amenity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

UPDATE `dev`.`amenities` SET `enabled`=0;
UPDATE `dev`.`amenities` SET `amenity_type`=1, `enabled`=1 WHERE `id` in (1, 15, 22, 23);
UPDATE `dev`.`amenities` SET `amenity_type`=2, `enabled`=1 WHERE `id` in (18, 19, 20, 24, 25, 26);
UPDATE `dev`.`amenities` SET `amenity_type`=3, `enabled`=1 WHERE `id` in (27, 28);
UPDATE `dev`.`amenities` SET `allow_price`=0 WHERE `id` in (1, 15, 23);
UPDATE `dev`.`amenities` SET `filterable`=1 WHERE `id` in (1, 15, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28);
INSERT INTO `dev`.`amenities` (`desc`, `amenity_type`, `filterable`, `allow_price`)
VALUES ('Lunch', 3, 1, 1);

/*16/03/16 addition Ally (inserts for new asset_amenity table)*/

ALTER TABLE `dev`.`asset_amenity`
CHANGE COLUMN `available` `available` TINYINT(1) NOT NULL DEFAULT '0';

INSERT INTO `dev`.`asset_amenity` (`asset_id`, `amenity_id`)
SELECT `asset_id`, `amenities`.`id` FROM `venues`
CROSS JOIN `amenities`
WHERE `amenities`.`enabled`=1 AND `amenities`.`filterable`=1;

INSERT INTO `dev`.`asset_amenity` (`asset_id`, `amenity_id`)
SELECT `rooms`.`asset_id`, `amenity_id` FROM `asset_amenity`
INNER JOIN `venues` ON `asset_amenity`.`asset_id`=`venues`.`asset_id`
INNER JOIN `rooms` ON `rooms`.`venue_id`=`venues`.`id`
WHERE `rooms`.`enabled`=1;

UPDATE `dev`.`asset_amenity` SET `available`=1 WHERE `amenity_id`=15;

/* WILL MIGRATED TO HERE 2016-03-17 18:09 */

/* ANDREW MIGRATED TO HERE ON 21/03/16 */

/*29/03/16 addition Ally (review columns in venues table)*/

ALTER TABLE `dev`.`venues`
ADD COLUMN `review_count` INT(11) NOT NULL DEFAULT '0' AFTER `transport`,
ADD COLUMN `review_score` DECIMAL(4,1) NULL DEFAULT NULL AFTER `review_count`;

UPDATE `dev`.`venues`
INNER JOIN (SELECT ROUND(SUM(room_alias.score)/COUNT(room_alias.asset_id),1) AS venue_score, venues.id FROM venues
INNER JOIN `rooms` ON `venues`.`id`=`rooms`.`venue_id`
INNER JOIN (SELECT SUM(`cleanliness` + `accuracy` + `checkin` + `communication` + `location` + `value`)/(6*COUNT(`id`)) as score, `asset_id` FROM `dev`.`reviews` GROUP BY `asset_id`) room_alias
ON room_alias.`asset_id`=`rooms`.`asset_id`
WHERE `rooms`.`review` <> 0
GROUP BY venues.id) venue_alias
ON venue_alias.id=venues.id
SET `venues`.`review_score`=venue_alias.venue_score;

UPDATE `dev`.`venues`
INNER JOIN (SELECT `venues`.`id`, COUNT(`reviews`.`id`) count FROM `venues`
INNER JOIN `rooms` ON `venues`.`id`=`rooms`.`venue_id`
INNER JOIN `dev`.`reviews` ON `reviews`.`asset_id`=`rooms`.`asset_id`
WHERE `rooms`.`review` <> 0
GROUP BY `venues`.`id`) alias
ON alias.id=`venues`.`id`
SET `venues`.`review_count` = alias.count;

/* ANDREW MIGRATED TO HERE ON 29/03/16 */
/*24/03/16 addition Will*/

INSERT INTO `dev`.`payment_status` (`id`, `name`, `enabled`) VALUES ('5', 'SUBMITTED', '1');
INSERT INTO `dev`.`paymentTypes` (`id`, `payment_name`, `is_live`, `is_payout`, `arrives_on`, `fees`, `currency`, `enabled`) VALUES ('6', 'Venue Invoice', '1', '1', 'Instant', 'None', 'GBP', '1');

/* End */

/*29/03/16 addition Will*/

CREATE TABLE `dev`.`bookingChannels` (
 `id` INT NOT NULL,
 `desc` VARCHAR(45) NOT NULL);

ALTER TABLE `dev`.`bookingChannels`
ADD PRIMARY KEY (`id`);

insert into dev.bookingChannels VALUES (1, 'Front End');
INSERT INTO `dev`.`bookingChannels` (`id`, `desc`) VALUES ('2', 'Venue Calendar');
INSERT INTO `dev`.`bookingChannels` (`id`, `desc`) VALUES ('3', 'Widget');
INSERT INTO `dev`.`bookingChannels` (`id`, `desc`) VALUES ('4', 'Admin');

/* End */

/* Ally migrated to here on 30/03/16 11:30 */
/* ANDREW MIGRATED TO HERE ON 30/03/16 17:56 */

/*07/03/16 addition Ally (new email for asset creation, new ready_for_approval fields for rooms and venues)*/

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`)
VALUES ('asset_created', 'New Asset Created', 'New {asset_type} created', 'Hello Admin', '<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="full" style="position: relative; z-index: 0; background-color: rgb(255, 255, 255);"> <tbody><tr> <td width="100%" valign="top"> <!-- Wrapper --> <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="mobile"> <tbody><tr> <td> <!-- Wrapper --> <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="full"> <tbody><tr> <td width="100%" class="img185"> <!-- Space --> <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="full"> <tbody><tr> <td width="100%" height="70"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width="1" border="0" cellpadding="0" cellspacing="0" align="right" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="full"> <tbody><tr> <td width="100%" height="40"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width="470" border="0" cellpadding="0" cellspacing="0" align="left" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="fullCenter"> <tbody><tr> <td width="100%" style="font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;"> <p cu-identify="element_09541608470026404"> <!--[if !mso]><!--><span style="font-family: Helvetica; font-weight:normal;"><!--<![endif]--> There has been a new {asset_type} created. It’s details are: <br>ID - {id}<br>Name - {asset_name}</p></td> </tr> <tr> <td width="100%" height="30"><p style="font-family: proxima_nova_rgregular, Helvetica; font-size: medium;">&nbsp;</p> </td> </tr> <tr> <td width="100%" style="font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;" class="fullCenter"> <p cu-identify="element_027774083777330816"></p> <div><span style="font-family: proxima_nova_rgregular, Helvetica; font-size: large;"><br> </span></div> <div><span style="font-family: proxima_nova_rgregular, Helvetica; font-size: large;"><br></span></div> <div></div></td> </tr> <tr> <td width="100%" height="30"></td> </tr> <tr> <td width="100%" style="font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;" class="fullCenter"> <p cu-identify="element_027774083777330816"></p> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> </tr> <tr> <td width="100%" height="45"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class="buttonScale" width="auto" align="left"> <table border="0" cellpadding="0" cellspacing="0" align="left" class="buttonScale"> <tbody><tr> <td width="auto" align="center" height="36" bgcolor="#17c3c6" style="border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);"> <!--[if !mso]><!--><span style="font-family: Helvetica; font-weight: normal;"><!--<![endif]--> <a href="https://www.zipcube.com/administrator" style="color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;" cu-identify="element_02023590081371367">Sign in admin</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width="100%" style="font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;" class="fullCenter"> <br> </td> </tr> <tr> <td width="100%" height="40" class="h70"></td> </tr> </tbody></table> <table width="85" border="0" cellpadding="0" cellspacing="0" align="right" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="fullCenter"> <tbody><tr> <td width="100%" class="fullCenter" style="line-height: 1px; text-align: center;"> <!--<a href="#" style="text-decoration: none;"> <img src="" width="185" height="auto" style="width: 185px; height:auto;" alt="" border="0" class="hover"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!------- Section 11 1 col CUM THREE COL-----------> <div class="dcontrols removeme" style="text-align: right;"><div style="background-image: url(assets/images/button1.png); cursor:pointer;" class="img" onclick="copyIt(this);">&nbsp;</div><div style="background-image: url(assets/images/button2.png); cursor:pointer;" class="img" onclick="deleteIt(this);">&nbsp;</div></div><table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="full" object="drag-module"> <tbody><tr mc:repeatable=""> <td width="100%" valign="top" bgcolor="#f9f9f9" c-style="greyBG" style="background-color: rgb(249, 249, 249);"> <div mc:hideable=""> <!-- Wrapper --> <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="mobile"> <tbody><tr> <td> <!-- Wrapper --> <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="full"> <tbody><tr> <td width="100%" class="image195"> <!-- Space --> <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="full"> <tbody><tr> <td width="100%" height="25"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!-- End Wrapper 2 --> <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" style="text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="fullCenter"> <tbody><tr> <td width="100%" height="25"></td> </tr> </tbody></table> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table>');

ALTER TABLE `dev`.`rooms`
ADD COLUMN `ready_for_approval` TINYINT(4) NOT NULL DEFAULT '0' AFTER `status`;

ALTER TABLE `dev`.`venues`
ADD COLUMN `ready_for_approval` TINYINT(4) NOT NULL DEFAULT '0' AFTER `created`;

/* 04/04/16 16:11 addition Ally (new updated column for venue and company tables)*/

ALTER TABLE `dev`.`venues`
ADD COLUMN `updated` DATETIME NOT NULL AFTER `created`;

UPDATE dev.venues SET updated=created WHERE updated IS NULL OR updated='0000-00-00 00:00:00';

ALTER TABLE `dev`.`companies`
ADD COLUMN `updated` DATETIME NOT NULL AFTER `created`;

UPDATE dev.companies SET updated=created WHERE updated IS NULL OR updated='0000-00-00 00:00:00';

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `updated` `updated_old` INT(31) NULL DEFAULT NULL;

ALTER TABLE `dev`.`rooms`
ADD COLUMN `updated` DATETIME NOT NULL AFTER `updated_old`;

UPDATE dev.rooms SET updated=FROM_UNIXTIME(updated_old);
UPDATE dev.rooms SET updated=created WHERE updated IS NULL OR updated='0000-00-00 00:00:00';

ALTER TABLE `dev`.`rooms`
DROP COLUMN `updated_old`;

/* ANDREW MIGRATED TO HERE ON 05/04/16 11:07 */

/*11/04/16 15:03 addition Will (new column for calendar uploading)*/

ALTER TABLE `dev`.`reservations`
ADD COLUMN `batch_id` VARCHAR(100) NULL DEFAULT NULL AFTER `legacy_reservation_id`;

/* ANDREW MIGRATED TO HERE ON 11/04/16 16:22 */

ALTER TABLE `dev`.`venues`
ADD COLUMN `uses_live_bookings` TINYINT(1) NOT NULL DEFAULT '0' AFTER `review_score`;

ALTER TABLE `dev`.`assetAudit`
ADD COLUMN `token` VARCHAR(50) NOT NULL AFTER `reference_id`;

CREATE TABLE `dev`.`booking_status` (
  `id` TINYINT(4) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

ALTER TABLE `dev`.`bookings`
ADD COLUMN `bookingStatus_id` INT(11) NULL DEFAULT NULL AFTER `bookingChannel_id`;

UPDATE `dev`.`bookings`
INNER JOIN (SELECT `bookings`.`id`, MAX(`reservationAudits`.`dateTime`) AS status_date FROM `dev`.`bookings`
INNER JOIN `reservations` ON `bookings`.`id`=`reservations`.`booking_id`
INNER JOIN `reservationAudits` ON `reservations`.`id`=`reservationAudits`.`reservation_id`
WHERE `reservations`.`reservationStatus_id` in (7, 8, 9, 10) AND `bookings`.`closed` IS NULL
GROUP BY `bookings`.`id`) alias
ON alias.id=`bookings`.`id`
SET `bookings`.`closed`=status_date, `bookings`.`bookingStatus_id`=3;

UPDATE `dev`.`bookings`
INNER JOIN `reservations` ON `bookings`.`id`=`reservations`.`booking_id`
SET `bookings`.`bookingStatus_id`=3
WHERE `reservations`.`reservationStatus_id` in (7, 8, 9, 10) AND `bookings`.`bookingStatus_id` IS NULL;

UPDATE `dev`.`bookings`
INNER JOIN (SELECT `bookings`.`id`, MAX(`reservationAudits`.`dateTime`) AS status_date FROM `dev`.`bookings`
INNER JOIN `reservations` ON `bookings`.`id`=`reservations`.`booking_id`
INNER JOIN `reservationAudits` ON `reservations`.`id`=`reservationAudits`.`reservation_id`
WHERE `reservations`.`reservationStatus_id`=6 AND `bookings`.`closed` IS NULL
GROUP BY `bookings`.`id`) alias
ON alias.id=`bookings`.`id`
SET `bookings`.`closed`=status_date, `bookings`.`bookingStatus_id`=1;

UPDATE `dev`.`bookings`
INNER JOIN `reservations` ON `bookings`.`id`=`reservations`.`booking_id`
SET `bookings`.`bookingStatus_id`=1
WHERE `reservations`.`reservationStatus_id`=6 AND `bookings`.`bookingStatus_id` IS NULL;

UPDATE `dev`.`bookings`
INNER JOIN (SELECT `bookings`.`id`, MAX(`reservationAudits`.`dateTime`) AS status_date FROM `dev`.`bookings`
INNER JOIN `reservations` ON `bookings`.`id`=`reservations`.`booking_id`
INNER JOIN `reservationAudits` ON `reservations`.`id`=`reservationAudits`.`reservation_id`
WHERE `reservations`.`reservationStatus_id` in (2, 4, 5, -1) AND `bookings`.`closed` IS NULL
GROUP BY `bookings`.`id`) alias
ON alias.id=`bookings`.`id`
SET `bookings`.`closed`=status_date, `bookings`.`bookingStatus_id`=2;

UPDATE `dev`.`bookings`
INNER JOIN `reservations` ON `bookings`.`id`=`reservations`.`booking_id`
SET `bookings`.`bookingStatus_id`=2
WHERE `reservations`.`reservationStatus_id` in (2, 4, 5, -1) AND `bookings`.`bookingStatus_id` IS NULL;

INSERT INTO `dev`.`booking_status` (`id`, `name`)
VALUES (1, 'Cancelled by user');
INSERT INTO `dev`.`booking_status` (`id`, `name`)
VALUES (2, 'Finished badly');
INSERT INTO `dev`.`booking_status` (`id`, `name`)
VALUES (3, 'Finished Happily');

/*v1.4 release point 18/04/16 17:16*/

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `batch_id`,
ADD COLUMN `created` DATETIME NOT NULL AFTER `zipcube_notes`;

UPDATE `dev`.`reservations`
INNER JOIN `dev`.`reservationAudits` ON `reservations`.`id`=`reservationAudits`.`reservation_id`
SET `reservations`.`created`=`reservationAudits`.`dateTime`
WHERE `reservationAudits`.`reservationStatus_id`=1;

/*v1.5 release point 19/04/16 12:35*/

UPDATE `dev`.`reservations`
INNER JOIN `dev`.`reservationAudits` ON `reservations`.`id`=`reservationAudits`.`reservation_id`
SET `reservations`.`created`=`reservationAudits`.`dateTime`
WHERE `reservationAudits`.`reservationStatus_id`=0 AND `reservations`.`created`='0000-00-00 00:00:00';

/*v1.6 release point 19/04/16 19:27*/

CREATE TABLE `dev`.`assetCommissions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `asset_id` INT NOT NULL,
  `bookingChannel_id` INT NOT NULL,
  `commissionPercentage` DECIMAL(4,2) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`bookingChannels`
ADD COLUMN `defaultCommission` DECIMAL(4,2) NOT NULL DEFAULT 15 AFTER `desc`,
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `defaultCommission`;

UPDATE `dev`.`bookingChannels` SET `defaultCommission`='5' WHERE `id`='2';
UPDATE `dev`.`bookingChannels` SET `defaultCommission`='5' WHERE `id`='3';

INSERT INTO `dev`.assetCommissions (asset_id, bookingChannel_id, commissionPercentage)
SELECT asset_id, BC.id, BC.defaultCommission from `dev`.companies JOIN (SELECT * from `dev`.bookingChannels) as BC;

/*v1.7 release point 20/04/16 11:20*/

UPDATE `dev`.`bookings`
INNER JOIN `reservations` ON `reservations`.`booking_id`=`bookings`.`id`
SET `bookings`.`closed` = NULL
WHERE `reservations`.`reservationStatus_id`=7;

/*hotfix for "checkin" closed bookings 20/04/16 19:06*/

UPDATE `dev`.`bookings`
SET `bookings`.`bookingStatus_id` = NULL
WHERE `bookings`.`closed` IS NULL AND `bookings`.`bookingStatus_id` IS NOT NULL;

UPDATE `dev`.`bookings`
INNER JOIN `reservations` ON `reservations`.`booking_id`=`bookings`.`id`
SET `bookings`.`closed` = NULL, `bookings`.`bookingStatus_id` = NULL
WHERE `bookings`.`closed` IS NOT NULL and `reservations`.`reservationStatus_id` = 3;

/*hotfix for "accepted" closed bookings 25/04/16 11:16*/

ALTER TABLE `dev`.`assetAudit`
ADD COLUMN `asset_type_new` INT(11) NOT NULL AFTER `asset_type`;

UPDATE `dev`.`assetAudit`
INNER JOIN `asset_types` ON `assetAudit`.`asset_type`=`asset_types`.`asset_type`
SET `assetAudit`.`asset_type_new`=`asset_types`.`id`;

ALTER TABLE `dev`.`assetAudit`
CHANGE COLUMN `asset_type` `asset_type_old` VARCHAR(45) NOT NULL,
CHANGE COLUMN `asset_type_new` `asset_type` INT(11) NOT NULL;

ALTER TABLE `dev`.`assetAudit`
DROP COLUMN `asset_type_old`;

/*done in live 29/04/16*/

INSERT INTO `dev`.`payment_status` (`name`)
VALUES ('ZIPCUBE COVERED');

/**/

/*done in live 04/05/16*/

ALTER TABLE `dev`.`locations`
ADD COLUMN `category_type` INT(11) NULL DEFAULT NULL AFTER `parent_id`;

CREATE TABLE `dev`.`location_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `location_category` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`));

INSERT INTO `dev`.`location_categories` (`location_category`)
VALUES ('Country');
INSERT INTO `dev`.`location_categories` (`location_category`)
VALUES ('City');
INSERT INTO `dev`.`location_categories` (`location_category`)
VALUES ('District');
INSERT INTO `dev`.`location_categories` (`location_category`)
VALUES ('Landmark');
INSERT INTO `dev`.`location_categories` (`location_category`)
VALUES ('Airport');
INSERT INTO `dev`.`location_categories` (`location_category`)
VALUES ('Post Code');

UPDATE `dev`.`locations`
SET `category_type` = 1
WHERE `parent_id` = 0 AND `in_sitemap` = 1;

UPDATE `dev`.`locations`
SET `category_type` = 2
WHERE `parent_id` = 1 AND `in_sitemap` = 1;

UPDATE `dev`.`locations`
SET `category_type` = 3
WHERE `parent_id` = 2 AND `in_sitemap` = 1;

UPDATE `dev`.`locations`
SET `category_type` = 3
WHERE `category_type` IS NULL AND `url_desc_long` like '%--london';

UPDATE `dev`.`locations`
SET `category_type` = 5
WHERE `category_type` IS NULL AND `url_desc_long` like '%airport%';

UPDATE `dev`.`locations`
SET `category_type` = 6
WHERE `category_type` IS NULL AND LENGTH(`human_desc`) <= 4;

/**/

/*v1.8 release point 06/05/16 14:30*/

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`)
VALUES ('venue_user_created', 'New Venue User Created', 'Welcome to Zipcube', 'Dear Member,\n\nPleasure to meet you and welcome to the {site_name}.\n\nBelow we have mentioned your account details.\n\nHere we go,\n\nEmail_id : {email}\n\nPassword : {password}\n\n--\nThanks and Regards,\n\nAdmin\n{site_name}', '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\">\n<tbody><tr>\n<td width=\"100%\" valign=\"top\">\n\n<!-- Wrapper -->\n<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\">\n<tbody><tr>\n<td>\n\n<!-- Wrapper -->\n<table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\">\n<tbody><tr>\n<td width=\"100%\" class=\"img185\">\n\n<!-- Space -->\n<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\">\n<tbody><tr>\n<td width=\"100%\" height=\"70\"></td>\n</tr>\n</tbody></table><!-- End Space -->\n\n<!-- Round Image 187_2 -->\n\n\n<!-- Space -->\n<table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\">\n<tbody><tr>\n<td width=\"100%\" height=\"40\"></td>\n</tr>\n</tbody></table><!-- End Space -->\n\n<!-- Text -->\n<table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\">\n<tbody><tr>\n<td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\">\n<p cu-identify=\"element_09541608470026404\">\n<!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->\nWelcome<!--[if !mso]><!--></span><!--<![endif]-->\n</p></td>\n</tr>\n<tr>\n<td width=\"100%\" height=\"30\"></td>\n</tr>\n<tr>\n<td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\">\n<p cu-identify=\"element_027774083777330816\"></p><h6><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">You have been signed up with Zipcube.&nbsp;</span></h6><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Zipcube allows you to manage your venues and spaces quickly and easily.<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"><i>Feel free to share and help us to provide the best possible online experience for you.<br>- The Zipcube Team.</i></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\">Your account details:</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Email (log in): {email}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Password: {password}</span></div><div><br></div><p>\n</p></td>\n</tr>\n<tr>\n<td width=\"100%\" height=\"45\"></td>\n</tr>\n<!----------------- Button Left, Scale Center ----------------->\n<tr>\n<td class=\"buttonScale\" width=\"auto\" align=\"left\">\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\">\n<tbody><tr>\n<td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\">\n<!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]-->\n<a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a>\n<!--[if !mso]><!--></span><!--<![endif]-->\n</td>\n</tr>\n</tbody></table>\n\n</td>\n</tr>\n<!----------------- End Button Left, Scale Center ----------------->\n<tr>\n<td width=\"100%\" height=\"40\" class=\"h70\"></td>\n</tr>\n</tbody></table>\n\n<table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\">\n<tbody><tr>\n<td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\">\n<!--<a href=\"#\" style=\"text-decoration: none;\">\n<img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\">\n</a>-->\n</td>\n</tr>\n</tbody></table></td>\n</tr>\n</tbody></table><!-- End Wrapper 2 -->\n\n</td>\n</tr>\n</tbody></table><!-- End Wrapper -->\n\n\n</td>\n</tr>\n</tbody></table>');

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\">\n<tbody><tr>\n<td width=\"100%\" valign=\"top\">\n\n<!-- Wrapper -->\n<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\">\n<tbody><tr>\n<td>\n\n<!-- Wrapper -->\n<table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\">\n<tbody><tr>\n<td width=\"100%\" class=\"img185\">\n\n<!-- Space -->\n<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\">\n<tbody><tr>\n<td width=\"100%\" height=\"70\"></td>\n</tr>\n</tbody></table><!-- End Space -->\n\n<!-- Round Image 187_2 -->\n\n\n<!-- Space -->\n<table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\">\n<tbody><tr>\n<td width=\"100%\" height=\"40\"></td>\n</tr>\n</tbody></table><!-- End Space -->\n\n<!-- Text -->\n<table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\">\n<tbody><tr>\n<td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\">\n<p cu-identify=\"element_09541608470026404\">\n<!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->\nHi {username},<!--[if !mso]><!--></span><!--<![endif]-->\n</p></td>\n</tr>\n<tr>\n<td width=\"100%\" height=\"30\"></td>\n</tr>\n<tr>\n<td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\">\n<p cu-identify=\"element_027774083777330816\"></p><h6><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Your account details have been changed.&nbsp;</span></h6><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"><i>Feel free to share and help us to provide the best possible online experience for you.<br>- The Zipcube Team.</i></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\">Your account details:</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Email (log in): {email}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Password: {password}</span></div><div><br></div><p>\n</p></td>\n</tr>\n<tr>\n<td width=\"100%\" height=\"45\"></td>\n</tr>\n<!----------------- Button Left, Scale Center ----------------->\n<tr>\n<td class=\"buttonScale\" width=\"auto\" align=\"left\">\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\">\n<tbody><tr>\n<td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\">\n<!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]-->\n<a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a>\n<!--[if !mso]><!--></span><!--<![endif]-->\n</td>\n</tr>\n</tbody></table>\n\n</td>\n</tr>\n<!----------------- End Button Left, Scale Center ----------------->\n<tr>\n<td width=\"100%\" height=\"40\" class=\"h70\"></td>\n</tr>\n</tbody></table>\n\n<table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\">\n<tbody><tr>\n<td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\">\n<!--<a href=\"#\" style=\"text-decoration: none;\">\n<img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\">\n</a>-->\n</td>\n</tr>\n</tbody></table></td>\n</tr>\n</tbody></table><!-- End Wrapper 2 -->\n\n</td>\n</tr>\n</tbody></table><!-- End Wrapper -->\n\n\n</td>\n</tr>\n</tbody></table>' WHERE `id`=88;

/*v1.9 release point 12/05/16 14:24*/

UPDATE `dev`.`reservations`
INNER JOIN `reservationPeriods` ON `reservations`.`id`=`reservationPeriods`.`reservation_id`
SET `reservations`.`venuePaymentDateTime`=`reservationPeriods`.`end`
WHERE `venuePaymentDateTime` IS NOT NULL AND `venuePaymentDateTime` = `created` AND `venuePaymentDateTime` < `end` AND `legacy_reservation_id` <> 0;

UPDATE `dev`.`bookings`
INNER JOIN `reservations` ON `bookings`.`id`=`reservations`.`booking_id`
INNER JOIN `reservationPeriods` ON `reservations`.`id`=`reservationPeriods`.`reservation_id`
SET `bookings`.`closed`=`reservationPeriods`.`end`
WHERE `legacy_reservation_id` <> 0 AND `closed` IS NOT NULL AND `bookingStatus_id` = 3;

UPDATE `dev`.`reservationAudits`
INNER JOIN `reservations` ON `reservationAudits`.`reservation_id`=`reservations`.`booking_id`
INNER JOIN `reservationPeriods` ON `reservations`.`id`=`reservationPeriods`.`reservation_id`
SET `reservationAudits`.`dateTime` = `reservationPeriods`.`start`
WHERE `legacy_reservation_id` <> 0 AND `reservations`.`reservationStatus_id` >= 7 AND `reservationAudits`.`reservationStatus_id` = 7;

UPDATE `dev`.`reservationAudits`
INNER JOIN `reservations` ON `reservationAudits`.`reservation_id`=`reservations`.`booking_id`
INNER JOIN `reservationPeriods` ON `reservations`.`id`=`reservationPeriods`.`reservation_id`
SET `reservationAudits`.`dateTime` = `reservationPeriods`.`end`
WHERE `legacy_reservation_id` <> 0 AND `reservations`.`reservationStatus_id` > 7 AND `reservationAudits`.`reservationStatus_id` > 7;

/* Updates for fixing legacy reservation/reservation audit/booking dates */

ALTER TABLE `dev`.`reviews`
CHANGE COLUMN `reservation_id` `reservation_id` BIGINT(20) NULL;

UPDATE dev.reviews SET reservation_id = NULL WHERE reservation_id = 0;

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`) VALUES ('host_review_notification', 'New Review Received', 'New Review Received', 'New Review Received', '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Hi&nbsp;{host_name},&nbsp;{room_name}&nbsp;has received a new review. </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Review:</b><br/><br/>{review}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Feedback:</b><br/><br/>{feedback}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Cleanliness:</b>&nbsp;&nbsp;{cleanliness}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Communication:</b>&nbsp;&nbsp;{communication}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>House Rules:</b>&nbsp;&nbsp;{house_rules}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Accuracy:</b>&nbsp;&nbsp;{accuracy}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Check-In:</b>&nbsp;&nbsp;{checkin}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Location:</b>&nbsp;&nbsp;{location}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Value:</b>&nbsp;&nbsp;{value}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">You can <a href=\"\" target=\"_blank\">view the review</a> live on your venue page.</span></div></td></tr></tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>');

ALTER TABLE `dev`.`reservations`
ADD COLUMN `review_token` VARCHAR(50) NULL DEFAULT NULL AFTER `created`;

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Mission accomplished, we have lift off! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi{client_fname},<br><br>The Zipcube team hope that your{venue_name}-{list_title}booking was everything you hoped for and more.<br><br>We\'d love it if you could take a minute to <a href=\"{review_link}\">write a review</a> for{venue_name}. <br><br>If you would like to book this room again you can do that here:<br><br>{link_booking}<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"></span></div><p> </p></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Search for a new space</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"image195\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody> <tr> <td width=\"100%\" align=\"center\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"30\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body=I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody></table>' WHERE `id`='71';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Mission accomplished, we have lift off! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi&nbsp;{client_fname},<br><br>The Zipcube team hope that your&nbsp;{venue_name}-{list_title}&nbsp;booking was everything you hoped for and more.<br><br>We\'d love it if you could take a minute to <a href=\"{review_link}\">write a review</a>. <br><br>If you would like to book this room again you can do that here:<br><br>{link_booking}<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"></span></div><p> </p></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Search for a new space</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"image195\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody> <tr> <td width=\"100%\" align=\"center\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"30\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body=I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody></table>' WHERE `id`='71';

CREATE TABLE `dev`.`membership` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `asset_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`membership`
RENAME TO  `dev`.`reviewAudit`;

ALTER TABLE `dev`.`reviewAudit`
ADD UNIQUE INDEX `VENUE_USER` (`asset_id` ASC, `user_id` ASC);

ALTER TABLE `dev`.`reviewAudit`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `asset_id`;

ALTER TABLE `dev`.`reviewAudit`
ADD COLUMN `created` DATETIME NOT NULL AFTER `enabled`;

ALTER TABLE `dev`.`reviewAudit`
ADD COLUMN `review_token` VARCHAR(50) NULL DEFAULT NULL AFTER `created`;

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`) VALUES ('venue_review_request', 'Venue Review Request', 'Review Request', 'Review Request');
UPDATE `dev`.`email_templates` SET `email_body_html`='<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\" width=\"100%\"> <tbody> <tr> <td valign=\"top\" width=\"100%\"> <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"mobile\" width=\"100%\"> <tbody> <tr> <td> <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"full\" width=\"600\"> <tbody> <tr> <td class=\"img185\" width=\"100%\"> <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"full\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" width=\"100%\"> <tbody> <tr> <td height=\"70\" width=\"100%\"> </td></tr></tbody> </table> <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"fullCenter\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" width=\"100%\"> <tbody> <tr> <td style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\" width=\"100%\"> <p> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Hi&nbsp;{first_name},&nbsp;{venue_name}&nbsp;has&nbsp;requested&nbsp;that&nbsp;you&nbsp;write&nbsp;a&nbsp;review&nbsp;about&nbsp;your&nbsp;recent&nbsp;reservation.</span></p></td></tr><tr> <td height=\"30\" width=\"100%\"> </td></tr><tr> <td class=\"fullCenter\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" width=\"100%\"> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"> You&nbsp;can&nbsp;<a href=\"\"target=\"_blank\">write&nbsp;a&nbsp;review&nbsp;here</a>.</span> </div></td></tr></tbody> </table> <table align=\"right\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"fullCenter\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" width=\"185\"> <tbody> <tr> <td class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\" width=\"100%\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div class=\"img\" onclick=\"copyIt(this);\" style=\"background-image: url(assets/images/button1.png); cursor:pointer;\"> &nbsp; </div><div class=\"img\" onclick=\"deleteIt(this);\" style=\"background-image: url(assets/images/button2.png); cursor:pointer;\"> &nbsp; </div></div></td></tr></tbody></table>' WHERE `id`='93';
UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Hi&nbsp;{first_name},&nbsp;{venue_name}&nbsp;has&nbsp;requested&nbsp;that&nbsp;you&nbsp;wite&nbsp;a&nbsp;review&nbsp;about&nbsp;your&nbsp;recent&nbsp;reservation. </span> </p><p><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">You can <a href=\"{review_link}\" target=\"_blank\">write your review here</a>.</span></p></td></tr></tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>' WHERE `id`='93';
UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div> <p><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi&nbsp;{first_name},&nbsp;{venue_name}&nbsp;has&nbsp;requested&nbsp;that&nbsp;you&nbsp;wite&nbsp;a&nbsp;review&nbsp;about&nbsp;your&nbsp;recent&nbsp;reservation.</span></p><p><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">You can <a href=\"{review_link}\" target=\"_blank\">write your review here</a>.</span></p></div></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Search for a new space</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"image195\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody> <tr> <td width=\"100%\" align=\"center\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"30\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body=I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody></table>' WHERE `id`='93';
UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div> <p><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi&nbsp;{first_name},</span></p><br/> <p><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">{venue_name}&nbsp;has requested that you write a review about your recent reservation.</span></p><br/> <p><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">You can <a href=\"{review_link}\" target=\"_blank\">write your review here</a>.</span></p></div></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"image195\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody> <tr> <td width=\"100%\" align=\"center\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"30\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body=I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody></table>' WHERE `id`='93';

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`)
SELECT 'client_reservation_token_notification', `title`, `mail_subject`, `email_body_text`, `email_body_html` FROM `dev`.`email_templates` WHERE `type`='client_reservation_notification';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><!-- Wrapper --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><!-- Wrapper --><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><!-- Space --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><!-- End Space --><!-- Round Image 187_2 --><!-- Space --><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><!-- End Space --><!-- Text --><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->Booking request sent!<!--[if !mso]><!--></span><!--<![endif]--></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your booking request has been successfully sent to {venue_name}. <br><br> We have made an authorisation for the full amount of the transaction, but the booking has not been paid for yet. If your request is refused by the venue or expires, the transaction will not occur. The venue has up to 24 hours to accept or reject your request. If it is rejected zipcube will respond to you with alternative options. <br><br> Over 50% of our booking requests receive a response within 1 hour.</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->Your booking request details<!--[if !mso]><!--></span><!--<![endif]--></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {checkout} until {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Meeting type:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->Total price: {market_price}{currency_price}<!--[if !mso]><!--></span><!--<![endif]--></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><!----------------- Button Left, Scale Center -----------------><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]--><a href=\"https://www.zipcube.com/set-new-password?token={token}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">To access your account to download invoices, leave reviews and have the system remember you for next time please click here to set up your password!</a><!--[if !mso]><!--></span><!--<![endif]--></td></tr></tbody></table></td></tr><!----------------- End Button Left, Scale Center -----------------><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table><!-- End Wrapper 2 --></td></tr></tbody></table><!-- End Wrapper --><!------- Section 11 1 col CUM  THREE COL-----------><div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><!-- Wrapper --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><!-- Wrapper --><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><!-- Space --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table><!-- End Space --><!-- Text --><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"><tbody><tr><td width=\"100%\" align=\"center\"><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 20px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"><p object=\"text-editable\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(167, 169, 177);\"><!--<![endif]--><singleline>Frequently Asked Questions</singleline><!--[if !mso]><!--></span><!--<![endif]--></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td width=\"100%\" align=\"left\" style=\"font-size: 14px; color: rgb(167, 169, 177); font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" t-style=\"textColor\" mc:edit=\"71\"><p object=\"text-editable\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;\"><!--<![endif]--><singleline>What is a booking request? Not every venue is integrated with zipcube, so we cannot guarantee that the venue\'s calendar is 100% up to date. We are moving towards full integration, which will allow us to offer live booking, but in the interim booking requests are sent. The venue has 24 hours to either accept or decline the booking based on their availability. While 24 hours is the deadline for venues to respond, we are striving to ensure that every request receives a response within 20 minutes. If it is rejected zipcube will respond to you with alternative options. <br><br> What is an authorisation? An authorisation is a request to make sure your credit card is valid, and that the payment can be processed. If the booking request is accepted then the payment is made, if the request is declined or expires then the authorization is voided. The payment is only made once the venue accepts the request.</singleline><!--[if !mso]><!--></span><!--<![endif]--></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!-- End Wrapper 2 --></td></tr></tbody></table><!-- End Wrapper --><!-- End Wrapper 2 --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table></td></tr></tbody></table>' WHERE `type`='client_reservation_token_notification';

CREATE TABLE `dev`.`journeyTokens` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(45) NOT NULL,
  `marketingChannel_id` INT NULL,
  `datetime` DATETIME NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC));

CREATE TABLE `dev`.`marketingChannels` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

INSERT INTO `dev`.`marketingChannels` (`name`) VALUES ('Internal');
INSERT INTO `dev`.`marketingChannels` (`name`) VALUES ('Direct');
INSERT INTO `dev`.`marketingChannels` (`name`) VALUES ('Paid');
INSERT INTO `dev`.`marketingChannels` (`name`) VALUES ('Organic');
INSERT INTO `dev`.`marketingChannels` (`name`) VALUES ('Referral');

ALTER TABLE `dev`.`bookings`
ADD COLUMN `journeyToken` VARCHAR(45) NULL AFTER `bookingStatus_id`;

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`) VALUES ('thank_reviewer', 'Your review has been published!', 'Your review has been published!', 'Your review has been published!', '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your review has been published! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi{first_name}, your review of{venue_name}has been published.</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><br></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>');
UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your review has been published! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">H&nbsp;{first_name}, your review of&nbsp;{venue_name}&nbsp;has been published.</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"></span></div><div><br></div></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>' WHERE `id`='95';
UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your review has been published! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi&nbsp;{first_name}, your review of&nbsp;{venue_name}&nbsp;has been published.</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"></span></div><div><br></div></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>' WHERE `id`='95';

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`) VALUES ('thank_reviewer_token', 'Your review has been published!', 'Your review has been published!', 'Your review has been published!', '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your review has been published! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi{first_name}, your review of{venue_name}has been published.</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"{set_password_link}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">To access your account to see the reviews you have left please click here to set your password!</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><br></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>');
UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your review has been published! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi&nbsp;{first_name}, your review of&nbsp;{venue_name}&nbsp;has been published.</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">By the way, you can set a password for your new Zipcube account so that you can take a look back at any reviews you have written.</span></div><div><br></div></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"{set_password_link}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\"> Set a password for your account now </a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><br></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>' WHERE `id`='96';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Hi&nbsp;{host_name},&nbsp;{room_name}&nbsp;has received a new review. </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Review:</b><br/><br/>{review}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Feedback:</b><br/><br/>{feedback}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Cleanliness:</b>&nbsp;&nbsp;{cleanliness}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Communication:</b>&nbsp;&nbsp;{communication}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Accuracy:</b>&nbsp;&nbsp;{accuracy}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Check-In:</b>&nbsp;&nbsp;{checkin}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Location:</b>&nbsp;&nbsp;{location}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Value:</b>&nbsp;&nbsp;{value}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">You can <a href=\"\" target=\"_blank\">view the review</a> live on your venue page.</span></div></td></tr></tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>' WHERE `id`='92';

/*v1.10 release point 08/06/16 11:10*/

CREATE TABLE `dev`.`review_replies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userby` INT(11) NOT NULL,
  `review_id` INT(11) NOT NULL,
  `reply` TEXT CHARACTER SET 'utf8' NOT NULL,
  `created` DATETIME NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`));

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`) VALUES ('review_reply_notification', 'Your review received a reply', 'Your review received a reply', 'Your review received a reply', '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your review has been published! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi&nbsp;{first_name},&nbsp;{reply_author}&nbsp;has replied to your review of&nbsp;{venue_name}:</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">{reply}.</span></div><div><br></div></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"{set_password_link}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\"> Set a password for your account now </a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><br></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>');
UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; color: rgb(57, 66, 100);\">Hi&nbsp;{first_name},<br/><br/>{reply_author}&nbsp;has replied to your review of&nbsp;{venue_name}:</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; color: rgb(167, 169, 177);\">\"{reply}\"</span></div><div><br></div></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"{review_page_link}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\"> See the reply in your dashboard </a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><br></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>' WHERE `id`='97';

/*hotfix v1.10.2 14/06/16 16:58*/

ALTER TABLE `dev`.`reviews`
CHANGE COLUMN `review` `review` VARCHAR(5000) CHARACTER SET 'utf8' NOT NULL,
CHANGE COLUMN `feedback` `feedback` VARCHAR(5000) CHARACTER SET 'utf8' NOT NULL;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `title` `title` VARCHAR(255) CHARACTER SET 'utf8' NULL DEFAULT NULL,
CHANGE COLUMN `desc` `desc` VARCHAR(3000) CHARACTER SET 'utf8' NULL DEFAULT NULL;

ALTER TABLE `dev`.`messages`
CHANGE COLUMN `message` `message` VARCHAR(1500) CHARACTER SET 'utf8' NOT NULL;

ALTER TABLE `dev`.`review_replies`
CHANGE COLUMN `reply` `reply` VARCHAR(2000) CHARACTER SET 'utf8' NOT NULL;

ALTER TABLE `dev`.`reviewAudit`
CHANGE COLUMN `review_token` `review_token` VARCHAR(50) NULL DEFAULT NULL AFTER `asset_id`,
CHANGE COLUMN `created` `created` DATETIME NOT NULL AFTER `review_token`;

ALTER TABLE `dev`.`asset_amenity`
CHANGE COLUMN `instructions` `instructions` VARCHAR(500) NULL DEFAULT NULL;

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `comments` `comments` VARCHAR(1500) NULL DEFAULT NULL,
CHANGE COLUMN `addOns` `addOns` VARCHAR(500) NULL DEFAULT NULL,
CHANGE COLUMN `zipcube_notes` `zipcube_notes` VARCHAR(1000) NULL DEFAULT NULL;

ALTER TABLE `dev`.`venues`
CHANGE COLUMN `address` `address` VARCHAR(255) NULL DEFAULT NULL,
CHANGE COLUMN `description` `description` VARCHAR(3000) NULL DEFAULT NULL,
CHANGE COLUMN `transport` `transport` VARCHAR(3000) NULL DEFAULT NULL,
CHANGE COLUMN `directions` `directions` VARCHAR(2000) NULL DEFAULT NULL;

DROP TABLE `dev`.`landingPage_rooms`;
DROP TABLE `dev`.`landingPage_venues`;
DROP TABLE `dev`.`landingPages`;

ALTER TABLE `dev`.`locations`
CHANGE COLUMN `category_type` `category_type` INT(11) NOT NULL,
ADD INDEX `category` (`category_type` ASC);

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`)
SELECT 'signup_token', 'Users Signup', `mail_subject`, `email_body_text`, `email_body_html` FROM `dev`.`email_templates` WHERE `type`='users_signin';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><!-- Wrapper --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><!-- Wrapper --><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><!-- Space --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><!-- End Space --><!-- Round Image 187_2 --><!-- Space --><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><!-- End Space --><!-- Text --><table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->Welcome<!--[if !mso]><!--></span><!--<![endif]--></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><h6><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Thank you for signing up with Zipcube.&nbsp;</span></h6><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">With Zipcube you can compare and book meeting, office or event spaces in less than a minute. Select your perfect space and book it instantaneously. It is that simple.<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"><i>Feel free to share and help us to provide the best possible online experience for you.<br>- The Zipcube Team.</i></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\">Your account details:</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Email (log in): {email}</span></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><!----------------- Button Left, Scale Center -----------------><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]--><a href=\"{set_password_link}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\"> Set a password for your account now </a><!--[if !mso]><!--></span><!--<![endif]--></td></tr></tbody></table></td></tr><!----------------- End Button Left, Scale Center -----------------><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table><!-- End Wrapper 2 --></td></tr></tbody></table><!-- End Wrapper --></td></tr></tbody></table>' WHERE `id`='98';

ALTER TABLE `dev`.`locations`
ADD COLUMN `venue_count` INT(11) NULL DEFAULT NULL AFTER `in_sitemap`,
ADD COLUMN `room_count` INT(11) NULL DEFAULT NULL AFTER `venue_count`;

/*v1.11 release point 23/06/16 11:25*/

ALTER TABLE `dev`.`assetPhotos`
ADD COLUMN `flagged` TINYINT(1) NOT NULL DEFAULT 0 AFTER `slider`,
ADD COLUMN `comments` VARCHAR(500) NULL DEFAULT NULL AFTER `flagged`;

/*v1.12 release point 27/06/16 08:08*/

ALTER TABLE `dev`.`addOns`
RENAME TO `dev`.`addOns_old`;

UPDATE `dev`.`configurations` SET `desc`='Hotdesk' WHERE `id`='5';
UPDATE `dev`.`configurations` SET `desc`='Reception' WHERE `id`='6';

INSERT INTO `dev`.`configurations` (`id`, `desc`, `enabled`) VALUES ('8', 'Cabaret', '1');

/*v1.13 release point 13/07/16 15:38*/

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Hi&nbsp;{host_name},&nbsp;{venue_name}&nbsp;-&nbsp;{room_name}&nbsp;has received a new review.</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Review:</b><br/><br/>{review}</span></div><br/><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Feedback:</b><br/><br/>{feedback}</span></div><br/><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Cleanliness:</b>&nbsp;&nbsp;{cleanliness}</span></div><br/><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Communication:</b>&nbsp;&nbsp;{communication}</span></div><br/><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Accuracy:</b>&nbsp;&nbsp;{accuracy}</span></div><br/><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Check-In:</b>&nbsp;&nbsp;{checkin}</span></div><br/><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Location:</b>&nbsp;&nbsp;{location}</span></div><br/><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Value:</b>&nbsp;&nbsp;{value}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">You can <a href=\"\" target=\"_blank\">view the review</a> live on your venue page.</span></div></td></tr></tbody></table><table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>' WHERE `id`='92';

CREATE TABLE `dev`.`user_asset_members` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `asset_id` INT(11) NOT NULL,
  `member_type` INT(11) NOT NULL,
  `discount` DECIMAL(5,2) NOT NULL DEFAULT 0,
  `created` DATETIME NOT NULL,
  `enabled` TINYINT(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

UPDATE `dev`.`email_templates` SET `type`='asset_team_member_created', `title`='New Asset Team Member Created' WHERE `type`='venue_user_created';

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`)
SELECT 'asset_user_member_created', 'New Asset User Member Created', `mail_subject`, `email_body_text`, `email_body_html` FROM `dev`.`email_templates` WHERE `type`='asset_team_member_created';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\">  <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td>  <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\">  <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Round Image 187_2 -->   <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Dear {username}<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">{asset_name} are now using Zipcube to manage their meeting rooms and have created an account for you so that you can book their rooms online. Please <a href="{login_link}\">activate your account now</a> to gain access to your exclusive member booking rate and to update your password.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Login: {email}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Password: {password}</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">With your account you can:</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">-     Book {asset_name} meeting rooms using <a href="{asset_link}">their microsite</a></span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">-     View your upcoming bookings and access payment receipts</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">-     Leave positive reviews for {asset_name}</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Zipcube’s mission is to provide the fastest, easiest and most convenient way to find and book meeting rooms. If you are interested in using Zipcube for your office or if you have any feedback on our service, we would love to hear from you <a href=\"mailto:info@zipcube.com\">info@zipcube.com</a>.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Warm regards</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">The Zipcube Team</span></div><br></td> </tr> </tbody></table>  <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 -->  </td> </tr> </tbody></table><!-- End Wrapper -->   </td> </tr> </tbody></table>' WHERE `id`='99';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\">  <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td>  <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\">  <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Round Image 187_2 -->   <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Dear {username}<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">{company_name} are using Zipcube to market their meeting rooms online and have created an account for you, allowing you to access your bookings, edit the room listings and use the free space management software.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">{completion_str}</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Login: {email}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Password: {password}</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Zipcube’s mission is to provide the fastest, easiest and most convenient way to find and book meeting rooms. If you are interested in using Zipcube for additional venues or if you have any feedback on our service, we would love to hear from you <a href=\"mailto:info@zipcube.com\">info@zipcube.com</a>.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Warm regards</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">The Zipcube Team</span></div><br></td> </tr> </tbody></table>  <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 -->  </td> </tr> </tbody></table><!-- End Wrapper -->   </td> </tr> </tbody></table>' WHERE `id`='91';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><!-- Wrapper --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><!-- Wrapper --><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><!-- Space --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><!-- End Space --><!-- Round Image 187_2 --><!-- Space --><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><!-- End Space --><!-- Text --><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->Booking request sent!<!--[if !mso]><!--></span><!--<![endif]--></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your booking request has been successfully sent to {venue_name}. <br><br> We have made an authorisation for the full amount of the transaction, but the booking has not been paid for yet. If your request is refused by the venue or expires, the transaction will not occur. The venue has up to 24 hours to accept or reject your request. If it is rejected zipcube will respond to you with alternative options. <br><br> Over 50% of our booking requests receive a response within 1 hour.</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->Your booking request details<!--[if !mso]><!--></span><!--<![endif]--></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {checkout} until {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Meeting type:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->Total price: {market_price}{currency_price}<!--[if !mso]><!--></span><!--<![endif]--></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><!----------------- Button Left, Scale Center -----------------><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]--><a href=\"{set_password_link}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">To access your account to download invoices, leave reviews and have the system remember you for next time please click here to set up your password!</a><!--[if !mso]><!--></span><!--<![endif]--></td></tr></tbody></table></td></tr><!----------------- End Button Left, Scale Center -----------------><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table><!-- End Wrapper 2 --></td></tr></tbody></table><!-- End Wrapper --><!------- Section 11 1 col CUM  THREE COL-----------><div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><!-- Wrapper --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><!-- Wrapper --><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><!-- Space --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table><!-- End Space --><!-- Text --><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"><tbody><tr><td width=\"100%\" align=\"center\"><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 20px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"><p object=\"text-editable\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(167, 169, 177);\"><!--<![endif]--><singleline>Frequently Asked Questions</singleline><!--[if !mso]><!--></span><!--<![endif]--></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td width=\"100%\" align=\"left\" style=\"font-size: 14px; color: rgb(167, 169, 177); font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" t-style=\"textColor\" mc:edit=\"71\"><p object=\"text-editable\"><!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;\"><!--<![endif]--><singleline>What is a booking request? Not every venue is integrated with zipcube, so we cannot guarantee that the venue\'s calendar is 100% up to date. We are moving towards full integration, which will allow us to offer live booking, but in the interim booking requests are sent. The venue has 24 hours to either accept or decline the booking based on their availability. While 24 hours is the deadline for venues to respond, we are striving to ensure that every request receives a response within 20 minutes. If it is rejected zipcube will respond to you with alternative options. <br><br> What is an authorisation? An authorisation is a request to make sure your credit card is valid, and that the payment can be processed. If the booking request is accepted then the payment is made, if the request is declined or expires then the authorization is voided. The payment is only made once the venue accepts the request.</singleline><!--[if !mso]><!--></span><!--<![endif]--></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!-- End Wrapper 2 --></td></tr></tbody></table><!-- End Wrapper --><!-- End Wrapper 2 --><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table></td></tr></tbody></table>' WHERE `id`='94';

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`)
SELECT 'new_client_non_frontend', 'New User Created Calendar/Widget', `mail_subject`, `email_body_text`, `email_body_html` FROM `dev`.`email_templates` WHERE `type`='asset_user_member_created';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\">  <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td>  <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\">  <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Round Image 187_2 -->   <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Dear {client_fname}<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">{venue_name} use Zipcube to manage their meeting rooms and have created an account for you to facilitate your booking. Please <a href=\"{set_password_link}\">activate your account now</a> to gain access to your booking dashboard and to update your password.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">With your account you can:</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">-     ‘Quick Book’ {venue_name} meeting rooms using <a href=\"{widget_link}\">their microsite</a></span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">-     View your upcoming bookings and access payment receipts</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">-     Leave positive reviews for {venue_name}</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Zipcube’s mission is to provide the fastest, easiest and most convenient way to find and book meeting rooms. If you are interested in using Zipcube for your office or if you have any feedback on our service, we would love to hear from you <a href=\"mailto:info@zipcube.com\">info@zipcube.com</a>.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Warm regards</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">The Zipcube Team</span></div><br></td> </tr> </tbody></table>  <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 -->  </td> </tr> </tbody></table><!-- End Wrapper -->   </td> </tr> </tbody></table>' WHERE `id`='100';

UPDATE `dev`.`email_templates` SET `type`='asset_member_updated_password', `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\">  <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td>  <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\">  <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Round Image 187_2 -->   <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Text --> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]-->Dear {username}<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">{company_admin_fname} has changed your account settings. To update your password <a href="{login_link}">log in now</a>.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Login: {email}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Password: {password}</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Did you know that with Zipcube’s free space management software you can now take credit card payments, with automated invoicing and confirmation emails, directly <a href="{calendar_link}">from your calendar</a>? Using your bespoke <a href=\"{asset_link}\">microsite</a> you can also take live bookings through your website. Start taking bookings even as you sleep! To find out more please contact <a href=\"mailto:info@zipcube.com\">info@zipcube.com</a>.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Warm regards</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">The Zipcube Team</span></div><br></td> </tr> </tbody></table>  <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 -->  </td> </tr> </tbody></table><!-- End Wrapper -->   </td> </tr> </tbody></table>' WHERE `id`='88';

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`)
SELECT 'asset_user_member_created_token', 'New Asset User Member Created (token)', `mail_subject`, `email_body_text`, `email_body_html` FROM `dev`.`email_templates` WHERE `type`='asset_user_member_created';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\">  <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td>  <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\">  <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Round Image 187_2 -->   <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space -->  <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Dear {username}<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">{asset_name} are now using Zipcube to manage their meeting rooms and have created an account for you so that you can book their rooms online. Please <a href=\"{set_password_link}\">activate your account now</a> to gain access to your exclusive member booking rate and to update your password.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">With your account you can:</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">     -     Book {asset_name} meeting rooms using <a href=\"{asset_link}\">their microsite</a></span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">     -     View your upcoming bookings and access payment receipts</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">     -     Leave positive reviews for {asset_name}</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Zipcube’s mission is to provide the fastest, easiest and most convenient way to find and book meeting rooms. If you are interested in using Zipcube for your office or if you have any feedback on our service, we would love to hear from you <a href=\"mailto:info@zipcube.com\">info@zipcube.com</a>.</span></div><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Warm regards</span><br><br><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">The Zipcube Team</span></div><br></td> </tr> </tbody></table>  <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 -->  </td> </tr> </tbody></table><!-- End Wrapper -->   </td> </tr> </tbody></table>' WHERE `id`='101';

ALTER TABLE `dev`.`user_asset_members`
ADD UNIQUE INDEX `tuple` (`user_id` ASC, `asset_id` ASC);

ALTER TABLE `dev`.`reservations`
ADD COLUMN `discount_applied` DECIMAL(5,2) NULL DEFAULT NULL AFTER `toVenue`;

CREATE TABLE `dev`.`member_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

INSERT INTO `dev`.`member_type` (`name`) VALUES ('New member');
INSERT INTO `dev`.`member_type` (`name`) VALUES ('Existing member');

UPDATE `dev`.`email_templates` SET `type`='venue_created', `title`='New Venue Created', `mail_subject`='New venue created', `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight:normal;\"><!--<![endif]-->There has been a new venue created. It’s details are: <br><br>ID - <a href="{asset_website}" target="_blank">{asset_id}</a><br><br>Name - {asset_name}<br><br>Company Name - {company_name}<br><br>Venue Address - {address}<br><br>Venue Admins - {venue_admins}</p></td> </tr> <tr> <td width=\"100%\" height=\"30\"><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">&nbsp;</p> </td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br> </span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div> <div></div></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!------- Section 11 1 col CUM THREE COL-----------> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody><tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"image195\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!-- End Wrapper 2 --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table>' WHERE `id`='90';

INSERT INTO `dev`.`email_templates` (`type`, `title`, `mail_subject`, `email_body_text`, `email_body_html`)
SELECT 'room_created', 'New Room Created', 'New room created', `email_body_text`, `email_body_html` FROM `dev`.`email_templates` WHERE `type`='venue_created';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight:normal;\"><!--<![endif]-->There has been a new venue created. It’s details are: <br><br>ID - <a href="{asset_website}" target="_blank">{asset_id}</a><br><br>Name - {asset_name}<br><br>Company Name - {company_name}<br><br>Venue Name - {venue_name}<br><br>Venue ID - <a href="{venue_website}" target="_blank">{venue_id}</a><br><br>Venue Address - {address}<br><br>Venue Admins - {venue_admins}</p></td> </tr> <tr> <td width=\"100%\" height=\"30\"><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">&nbsp;</p> </td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br> </span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div> <div></div></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--><span style=\"font-family: Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!------- Section 11 1 col CUM THREE COL-----------> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody><tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"image195\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!-- End Wrapper 2 --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table>' WHERE `id`='102';

ALTER TABLE `dev`.`companies`
ADD COLUMN `approver` INT(11) NULL DEFAULT NULL AFTER `approved_datetime`;

ALTER TABLE `dev`.`venues`
ADD COLUMN `approver` INT(11) NULL DEFAULT NULL AFTER `approved_datetime`;

ALTER TABLE `dev`.`rooms`
ADD COLUMN `approver` INT(11) NULL DEFAULT NULL AFTER `approved_datetime`;

/*v1.13.4 release point 04/08/16 15:50*/

ALTER TABLE `dev`.`contact_info`
ADD COLUMN `phone_clean` VARCHAR(30) NOT NULL AFTER `phone`;

UPDATE `dev`.`contact_info` SET `phone_clean`='+442071832212', `street`='8 Rivington Place', `city`='London', `pincode`='EC2A 3BA' WHERE `id`='1';

INSERT INTO `dev`.`contact_info` (`id`, `phone`, `phone_clean`, `email`, `name`, `street`, `city`, `state`, `country`, `pincode`) VALUES ('2', '+353 (0) 1 556 3395', '+35315563395', 'info@zipcube.com', 'Zipcube Ltd', '8 Rivington Place', 'London', 'London', 'United Kingdom', 'EC2A 3BA');

ALTER TABLE `dev`.`contact_info`
ADD COLUMN `locale` VARCHAR(30) NOT NULL AFTER `id`;

UPDATE `dev`.`contact_info` SET `locale`='gb' WHERE `id`='1';
UPDATE `dev`.`contact_info` SET `locale`='ie', `street`='', `city`='', `state`='', `country`='Ireland', `pincode`='' WHERE `id`='2';

ALTER TABLE `dev`.`contact_info`
CHANGE COLUMN `pincode` `postcode` VARCHAR(10) NOT NULL ;

ALTER TABLE `dev`.`contact_info`
ADD COLUMN `default` INT NOT NULL AFTER `postcode`;

UPDATE `dev`.`contact_info` SET `default`='1' WHERE `id`='1';

ALTER TABLE `dev`.`contact_info`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `default`;

ALTER TABLE `dev`.`contact_info`
CHANGE COLUMN `postcode` `postcode` VARCHAR(10) NOT NULL AFTER `state`,
ADD COLUMN `country_img` VARCHAR(55) NOT NULL AFTER `country`;

ALTER TABLE `dev`.`contact_info`
CHANGE COLUMN `country_img` `country_img_url` VARCHAR(55) NOT NULL ;

UPDATE `dev`.`contact_info` SET `country_img_url`='css/images/footer/uk_flag_large_2x.png' WHERE `id`='1';

UPDATE `dev`.`contact_info` SET `country`='UK' WHERE `id`='1';

ALTER TABLE `dev`.`contact_info`
CHANGE COLUMN `country_img_url` `country_img_url` TEXT(255) NOT NULL ;

UPDATE `dev`.`contact_info` SET `country_img_url`='css/images/footer/ie_flag_large_2x.png' WHERE `id`='2';
UPDATE `dev`.`contact_info` SET `country_img_url`='css/images/footer/uk_flag_large_2x.png' WHERE `id`='1';

/*v1.13.5 release point 16/08/16 12:30*/

ALTER TABLE `dev`.`email_templates`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `email_body_html`;

UPDATE `dev`.`email_templates` SET `enabled`='0' WHERE `id`='40';
UPDATE `dev`.`email_templates` SET `enabled`='0' WHERE `id`='44';
UPDATE `dev`.`email_templates` SET `enabled`='0' WHERE `id`='45';
UPDATE `dev`.`email_templates` SET `enabled`='0' WHERE `id`='46';
UPDATE `dev`.`email_templates` SET `enabled`='0' WHERE `id`='47';
UPDATE `dev`.`email_templates` SET `enabled`='0' WHERE `id`='72';
UPDATE `dev`.`email_templates` SET `enabled`='0' WHERE `id`='74';
UPDATE `dev`.`email_templates` SET `enabled`='0' WHERE `id`='76';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Hurrah - Your booking request has been accepted! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi{client_fname}, your booking request has been successfully accepted by{venue_name}. Please review the details of your reservation and contact{host_name}if you need to clarify anything. <br><br>If you require an invoice or receipt of payment please follow <a href=\"https://www.zipcube.com/dashboard/message_request/{reservation_id}\">this link</a>, click ‘print receipt’ and then you can save the file. Please note not all venues charge VAT on their rooms.<br/><br/>Please note that if you receive an invoice from the venue, this has been sent by them in error, and you should ignore it. Your room has been secured and paid for through Zipcube.<br/><br/>Thank you for using Zipcube.com</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your booking details to be shared with your attendees. </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_email}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Address:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_address}</span></div><br><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin}from{time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout}until{time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Add-ons</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{addons}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Comments</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{comments}</span></div><br><div></div><div><br></div><p> </p></td></tr><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Total price:{market_price}{currency_price}</span> </p></td></tr><tr> <td width=\"100%\" height=\"45\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: Our next Meeting on{checkin}- Zipcube.com &amp;body=Hi,%0D%0A%0D%0A Here are the details for our next meeting recently booked with Zipcube.com: %0D%0A%0D%0A Check-in:{checkin}from{time_in}%0D%0A%0D%0A Check out:{checkout}from{time_out}%0D%0A%0D%0A Address:{venue_address}. %0D%0A%0D%0A %0D%0A%0D%0A Need a meeting space, desk, event space? Compare and book online https://www.zipcube.com. &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Click to share with your attendees</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> </td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> </td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"image195\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody> <tr> <td width=\"100%\" align=\"center\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"30\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body=I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#1f253d\" c-style=\"darkBlueBG\" style=\"background-color: rgb(31, 37, 61);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td class=\"header-img\"> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"bigImage\"> <tbody> <tr> <td valign=\"middle\" width=\"100%\" style=\"text-align: center; font-family: Helvetica, Arial, sans-serif; font-size: 26px; color: rgb(255, 255, 255); font-weight: normal; line-height: 32px;\" t-style=\"whiteText\" class=\"fullCenter\" mc:edit=\"47\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight: normal;\"> <singleline>Your next Zipcube meeting</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"35\"></td></tr><tr> <td valign=\"middle\" width=\"100%\" style=\"text-align: center; font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: rgb(255, 255, 255); font-weight: normal; line-height: 22px;\" t-style=\"whiteText\" class=\"fullCenter\" mc:edit=\"48_1\"> </td></tr><tr> <td width=\"100%\" height=\"65\"></td></tr><tr> <td width=\"100%\" height=\"130\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <img src=\"{url_googlemap}\" alt=\"map\" width=\"300\" height=\"300\" border=\"0\" style=\"width: 100%; height: auto;\" class=\"hover\" mc:edit=\"49\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody></table>' WHERE `id`='51';

ALTER TABLE `dev`.`reservations`
ADD COLUMN `assigned_user` INT(11) NULL DEFAULT NULL AFTER `batch_id`;

/*v1.14 release point 05/09/16 11:00*/

ALTER TABLE `dev`.`location_categories`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`locations`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `parent_id` `parent_id` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `category_type` `category_type` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `venue_count` `venue_count` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `room_count` `room_count` INT(11) UNSIGNED NULL DEFAULT NULL;

ALTER TABLE `dev`.`locations`
CHANGE COLUMN `category_type` `location_categories_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`locations`
ADD CONSTRAINT `cat_id`
  FOREIGN KEY (`location_categories_id`)
  REFERENCES `dev`.`location_categories` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`amenities`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `amenity_type` `amenity_types_id` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`amenity_types`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `dev`.`amenities`
ADD INDEX `amen_type_id_idx` (`amenity_types_id` ASC);

ALTER TABLE `dev`.`amenities`
ADD CONSTRAINT `amen_type_id`
  FOREIGN KEY (`amenity_types_id`)
  REFERENCES `dev`.`amenity_types` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`assetAudit`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_type` `asset_type` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `reference_id` `reference_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`asset_amenity`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `amenity_id` `amenity_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`asset_amenity`
ADD INDEX `amen_id_idx` (`amenity_id` ASC);

DELETE `dev`.`asset_amenity` FROM `asset_amenity`
LEFT JOIN `assetAudit` ON `asset_amenity`.`asset_id`=`assetAudit`.`id`
WHERE `assetAudit`.`id` IS NULL;

ALTER TABLE `dev`.`asset_amenity`
ADD CONSTRAINT `asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `amen_id`
  FOREIGN KEY (`amenity_id`)
  REFERENCES `dev`.`amenities` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`asset_cancellation`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `cancel_days` `cancel_days` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`asset_cancellation`
ADD INDEX `asset_id_idx` (`asset_id` ASC);

ALTER TABLE `dev`.`asset_cancellation`
ADD CONSTRAINT `can_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`assetCommissions`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `bookingChannel_id` `bookingChannel_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`bookingChannels`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`assetCommissions`
ADD INDEX `com_asset_id_idx` (`asset_id` ASC),
ADD INDEX `book_channel_id_idx` (`bookingChannel_id` ASC);

DELETE `dev`.`assetCommissions` FROM `assetCommissions`
LEFT JOIN `assetAudit` ON `assetCommissions`.`asset_id`=`assetAudit`.`id`
WHERE `assetAudit`.`id` IS NULL;

ALTER TABLE `dev`.`assetCommissions`
ADD CONSTRAINT `com_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `book_channel_id`
  FOREIGN KEY (`bookingChannel_id`)
  REFERENCES `dev`.`bookingChannels` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`assetPhotos`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `is_featured` `is_featured` TINYINT(1) NOT NULL DEFAULT '0' ,
CHANGE COLUMN `configuration_id` `configuration_id` INT(11) UNSIGNED NULL DEFAULT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`configurations`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`assetPhotos`
ADD INDEX `config_id_idx` (`configuration_id` ASC);

DELETE FROM `dev`.`assetPhotos` WHERE `id`='286';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='287';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='288';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='289';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='290';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='294';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='295';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='297';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='298';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='299';
DELETE FROM `dev`.`assetPhotos` WHERE `id`='300';
DELETE FROM `dev`.`assetPhotos` WHERE `asset_id`=0;

ALTER TABLE `dev`.`assetPhotos`
ADD CONSTRAINT `img_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `config_id`
  FOREIGN KEY (`configuration_id`)
  REFERENCES `dev`.`configurations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`asset_types`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`assetAudit`
CHANGE COLUMN `asset_type` `asset_type_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`assetAudit`
ADD INDEX `type_id_idx` (`asset_type_id` ASC);

ALTER TABLE `dev`.`assetAudit`
ADD INDEX `ref_id_idx` (`reference_id` ASC);

ALTER TABLE `dev`.`assetAudit`
ADD CONSTRAINT `type_id`
  FOREIGN KEY (`asset_type_id`)
  REFERENCES `dev`.`asset_types` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`venues`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `company_id` `company_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `review_count` `review_count` INT(11) UNSIGNED NOT NULL DEFAULT '0' ,
CHANGE COLUMN `venue_type` `venue_type` INT(3) UNSIGNED NOT NULL ,
CHANGE COLUMN `opening_type` `opening_type` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `minimum_minutes` `minimum_minutes` INT(11) UNSIGNED NOT NULL DEFAULT '60' ,
CHANGE COLUMN `cancellation_type` `cancellation_type` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `approver` `approver` INT(11) UNSIGNED NULL DEFAULT NULL;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `venue_id` `venue_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `review` `review` INT(11) UNSIGNED NOT NULL DEFAULT '0' ,
CHANGE COLUMN `ranking` `ranking` INT(11) UNSIGNED NOT NULL DEFAULT '50' ,
CHANGE COLUMN `approver` `approver` INT(11) UNSIGNED NULL DEFAULT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`companies`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `approver` `approver` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1';

ALTER TABLE `dev`.`bookings`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `booker_id` `booker_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `beneficiary_id` `beneficiary_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `bookingChannel_id` `bookingChannel_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `bookingStatus_id` `bookingStatus_id` INT(11) UNSIGNED NULL DEFAULT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`booking_status`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`users`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `role_id` `role_id` INT(11) UNSIGNED NOT NULL DEFAULT '1' ,
CHANGE COLUMN `userType_id` `userType_id` INT(11) UNSIGNED NOT NULL DEFAULT '0' ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`bookings`
ADD INDEX `status_id_idx` (`bookingStatus_id` ASC);

ALTER TABLE `dev`.`bookings`
ADD CONSTRAINT `chan_id`
  FOREIGN KEY (`bookingChannel_id`)
  REFERENCES `dev`.`bookingChannels` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `status_id`
  FOREIGN KEY (`bookingStatus_id`)
  REFERENCES `dev`.`booking_status` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `book_user_id`
  FOREIGN KEY (`booker_id`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `ben_user_id`
  FOREIGN KEY (`beneficiary_id`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`cancellation_types`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `cancel_percent` `cancel_percent` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `cancel_days` `cancel_days` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`companies`
CHANGE COLUMN `approved` `approved` TINYINT(1) NOT NULL DEFAULT '1';

ALTER TABLE `dev`.`companies`
ADD CONSTRAINT `comp_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`companies`
ADD INDEX `comp_approver_id_idx` (`approver` ASC);

ALTER TABLE `dev`.`companies`
ADD CONSTRAINT `comp_approver_id`
  FOREIGN KEY (`approver`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`venues`
CHANGE COLUMN `ready_for_approval` `ready_for_approval` TINYINT(1) NOT NULL DEFAULT '0' ,
CHANGE COLUMN `approved` `approved` TINYINT(1) NOT NULL DEFAULT '0';

ALTER TABLE `dev`.`venues`
ADD CONSTRAINT `venue_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`venues`
CHANGE COLUMN `venue_type` `venue_type_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `opening_type` `opening_type_id` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `cancellation_type` `cancellation_type_id` INT(11) UNSIGNED NULL DEFAULT NULL ,
ADD INDEX `venue_approver_id_idx` (`approver` ASC);

ALTER TABLE `dev`.`venues`
ADD CONSTRAINT `venue_approver_id`
  FOREIGN KEY (`approver`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`venues`
ADD INDEX `venue_type_idx` (`venue_type_id` ASC);

ALTER TABLE `dev`.`venueTypes`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`venues`
ADD CONSTRAINT `venue_type`
  FOREIGN KEY (`venue_type_id`)
  REFERENCES `dev`.`venueTypes` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`opening_types`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`opening_types_times`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `opening_type` `opening_type` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `day_id` `day_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `start` `start` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `end` `end` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`days`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`opening_types_times`
CHANGE COLUMN `opening_type` `opening_type_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`opening_types_times`
ADD INDEX `open_day_id_idx` (`day_id` ASC);

ALTER TABLE `dev`.`opening_types_times`
ADD CONSTRAINT `open_day_id`
  FOREIGN KEY (`day_id`)
  REFERENCES `dev`.`days` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`opening_types_times`
ADD INDEX `open_type_id_idx` (`opening_type_id` ASC);

ALTER TABLE `dev`.`opening_types_times`
ADD CONSTRAINT `open_type_id`
  FOREIGN KEY (`opening_type_id`)
  REFERENCES `dev`.`opening_types` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`venues`
ADD INDEX `venue_open_type_id_idx` (`opening_type_id` ASC);

ALTER TABLE `dev`.`venues`
ADD CONSTRAINT `venue_open_type_id`
  FOREIGN KEY (`opening_type_id`)
  REFERENCES `dev`.`opening_types` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`venues`
ADD INDEX `venue_cancel_type_id_idx` (`cancellation_type_id` ASC);

ALTER TABLE `dev`.`venues`
ADD CONSTRAINT `venue_cancel_type_id`
  FOREIGN KEY (`cancellation_type_id`)
  REFERENCES `dev`.`cancellation_types` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `ready_for_approval` `ready_for_approval` TINYINT(1) NOT NULL DEFAULT '0' ,
CHANGE COLUMN `approved` `approved` TINYINT(1) NOT NULL DEFAULT '0';

ALTER TABLE `dev`.`rooms`
ADD CONSTRAINT `room_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`rooms`
ADD INDEX `room_approver_id_idx` (`approver` ASC);

ALTER TABLE `dev`.`rooms`
ADD CONSTRAINT `room_approver_id`
  FOREIGN KEY (`approver`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`rooms`
ADD CONSTRAINT `room_venue_id`
  FOREIGN KEY (`venue_id`)
  REFERENCES `dev`.`venues` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`contact_info`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `default` `default` TINYINT(1) NOT NULL DEFAULT '0' ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`currency`
CHANGE COLUMN `default` `default` TINYINT(1) NOT NULL DEFAULT '0' AFTER `symbol_right`,
ADD UNIQUE INDEX `code_UNIQUE` (`code` ASC);

ALTER TABLE `dev`.`currency_change`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`dayRates`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `standard_day_rate` `standard_day_rate` DECIMAL(10,4) NULL DEFAULT NULL ,
CHANGE COLUMN `daily_delegate_rate` `daily_delegate_rate` DECIMAL(10,4) NULL DEFAULT NULL ,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`dayRates`
DROP INDEX `room_id` ,
ADD INDEX `asset_id` (`asset_id` ASC);

ALTER TABLE `dev`.`dayRates`
ADD CONSTRAINT `day_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`hourRates`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `openingPeriod_id` `openingPeriod_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `price_per_hour` `price_per_hour` DECIMAL(10,4) NOT NULL ,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`openingPeriods`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `day_id` `day_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `start` `start` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `end` `end` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `minimum_minutes` `minimum_minutes` INT(11) UNSIGNED NOT NULL DEFAULT '60' ,
CHANGE COLUMN `slot_length_minutes` `slot_length_minutes` INT(11) UNSIGNED NOT NULL DEFAULT '30' ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

DELETE `dev`.`hourRates` FROM `hourRates`
LEFT JOIN `openingPeriods` ON `openingPeriods`.`id`=`hourRates`.`openingPeriod_id`
WHERE `openingPeriods`.`id` IS NULL;

ALTER TABLE `dev`.`hourRates`
ADD CONSTRAINT `open_period_id`
  FOREIGN KEY (`openingPeriod_id`)
  REFERENCES `dev`.`openingPeriods` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`openingPeriods`
ADD CONSTRAINT `open_period_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`openingPeriods`
ADD INDEX `open_period_day_id_idx` (`day_id` ASC);

ALTER TABLE `dev`.`openingPeriods`
ADD CONSTRAINT `open_period_day_id`
  FOREIGN KEY (`day_id`)
  REFERENCES `dev`.`days` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`journeyTokens`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `marketingChannel_id` `marketingChannel_id` INT(11) UNSIGNED NULL DEFAULT NULL;

ALTER TABLE `dev`.`marketingChannels`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `dev`.`journeyTokens`
ADD INDEX `journey_marketing_channel_id_idx` (`marketingChannel_id` ASC);

ALTER TABLE `dev`.`journeyTokens`
ADD CONSTRAINT `journey_marketing_channel_id`
  FOREIGN KEY (`marketingChannel_id`)
  REFERENCES `dev`.`marketingChannels` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`language`
CHANGE COLUMN `default` `default` TINYINT(1) NOT NULL DEFAULT '0' ,
ADD UNIQUE INDEX `code_UNIQUE` (`code` ASC);

ALTER TABLE `dev`.`locations`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `in_sitemap` `in_sitemap` TINYINT(1) NULL DEFAULT '0';

ALTER TABLE `dev`.`login_attempts`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`member_type`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1';

ALTER TABLE `dev`.`message_type`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`messages`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `reservation_id` `reservation_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `conversation_id` `conversation_id` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `userby` `userby` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `userto` `userto` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `is_read` `is_read` TINYINT(1) NOT NULL DEFAULT '0' ,
CHANGE COLUMN `is_starred` `is_starred` TINYINT(1) NOT NULL DEFAULT '0' ,
CHANGE COLUMN `message_type` `message_type` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`messages`
CHANGE COLUMN `message_type` `message_type_id` INT(11) UNSIGNED NOT NULL AFTER `message`;

ALTER TABLE `dev`.`messages`
ADD INDEX `mess_type_id_idx` (`message_type_id` ASC);

ALTER TABLE `dev`.`messages`
ADD CONSTRAINT `mess_type_id`
  FOREIGN KEY (`message_type_id`)
  REFERENCES `dev`.`message_type` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `booking_id` `booking_id` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `guests` `guests` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `discount_applied` `discount_applied` DECIMAL(10,4) NULL DEFAULT NULL ,
CHANGE COLUMN `reservationStatus_id` `reservationStatus_id` INT(11) NOT NULL DEFAULT '1' ,
CHANGE COLUMN `assigned_user` `assigned_user` INT(11) UNSIGNED NULL DEFAULT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`messages`
ADD INDEX `mess_res_id_idx` (`reservation_id` ASC);

DELETE FROM `dev`.`messages` WHERE `reservation_id`=0;

ALTER TABLE `dev`.`messages`
ADD CONSTRAINT `mess_res_id`
  FOREIGN KEY (`reservation_id`)
  REFERENCES `dev`.`reservations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`messages`
ADD INDEX `mess_user_by_idx` (`userby` ASC);

UPDATE `dev`.`messages`
LEFT JOIN `users` ON `messages`.`userby`=`users`.`id`
INNER JOIN `reservations` ON `messages`.`reservation_id`=`reservations`.`id`
INNER JOIN `bookings` ON `bookings`.`id`=`reservations`.`booking_id`
SET `messages`.`userby`=`bookings`.`booker_id`
WHERE `users`.`id` IS NULL;

ALTER TABLE `dev`.`messages`
ADD CONSTRAINT `mess_user_by`
  FOREIGN KEY (`userby`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`messages`
ADD INDEX `mess_user_to_idx` (`userto` ASC);

ALTER TABLE `dev`.`messages`
ADD CONSTRAINT `mess_user_to`
  FOREIGN KEY (`userto`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`metas`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`paymentAudits`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `payment_id` `payment_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `paymentStatus_id` `paymentStatus_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `user_id` `user_id` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`payments`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `booking_id` `booking_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `paymentType_id` `paymentType_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `paymentStatus_id` `paymentStatus_id` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`payments`
ADD INDEX `pay_book_id_idx` (`booking_id` ASC);

ALTER TABLE `dev`.`payments`
ADD CONSTRAINT `pay_book_id`
  FOREIGN KEY (`booking_id`)
  REFERENCES `dev`.`bookings` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`payment_status`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`paymentTypes`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `is_live` `is_live` TINYINT(1) NOT NULL DEFAULT '0' ,
CHANGE COLUMN `is_payout` `is_payout` TINYINT(1) NOT NULL DEFAULT '0' ,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '0' ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`payments`
ADD INDEX `pay_type_id_idx` (`paymentType_id` ASC);

ALTER TABLE `dev`.`payments`
ADD CONSTRAINT `pay_type_id`
  FOREIGN KEY (`paymentType_id`)
  REFERENCES `dev`.`paymentTypes` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`payments`
ADD INDEX `pay_status_id_idx` (`paymentStatus_id` ASC);

ALTER TABLE `dev`.`payments`
ADD CONSTRAINT `pay_status_id`
  FOREIGN KEY (`paymentStatus_id`)
  REFERENCES `dev`.`payment_status` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`profiles`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `user_id` `user_id` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

DELETE FROM `dev`.`profiles` WHERE `id`='55';
DELETE FROM `dev`.`profiles` WHERE `id`='56';

ALTER TABLE `dev`.`profiles`
ADD CONSTRAINT `profile_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reservationAudits`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `reservation_id` `reservation_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `reservationStatus_id` `reservationStatus_id` INT(11) NOT NULL ,
CHANGE COLUMN `user_id` `user_id` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`reservationPeriods`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `reservation_id` `reservation_id` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`reservationPeriods`
ADD CONSTRAINT `period_res_id`
  FOREIGN KEY (`reservation_id`)
  REFERENCES `dev`.`reservations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reservationPeriods`
ADD CONSTRAINT `period_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reservations`
ADD CONSTRAINT `res_book_id`
  FOREIGN KEY (`booking_id`)
  REFERENCES `dev`.`bookings` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reservations`
ADD CONSTRAINT `res_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reservation_status`
CHANGE COLUMN `id` `id` INT(11) NOT NULL ,
ADD PRIMARY KEY (`id`),
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

INSERT INTO `dev`.`reservation_status` (`id`, `name`) VALUES ('-1', 'Deleted');

ALTER TABLE `dev`.`reservations`
ADD INDEX `res_status_id_idx` (`reservationStatus_id` ASC);

ALTER TABLE `dev`.`reservations`
ADD CONSTRAINT `res_status_id`
  FOREIGN KEY (`reservationStatus_id`)
  REFERENCES `dev`.`reservation_status` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reservations`
ADD INDEX `res_user_id_idx` (`assigned_user` ASC);

ALTER TABLE `dev`.`reservations`
ADD CONSTRAINT `res_user_id`
  FOREIGN KEY (`assigned_user`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reviewAudit`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `user_id` `user_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`review_replies`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `userby` `userby` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `review_id` `review_id` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`reviews`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `userby` `userby` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `userto` `userto` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `reservation_id` `reservation_id` INT(11) UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `cleanliness` `cleanliness` TINYINT(1) NOT NULL ,
CHANGE COLUMN `communication` `communication` TINYINT(1) NOT NULL ,
CHANGE COLUMN `house_rules` `house_rules` TINYINT(1) NOT NULL ,
CHANGE COLUMN `accuracy` `accuracy` TINYINT(1) NOT NULL ,
CHANGE COLUMN `checkin` `checkin` TINYINT(1) NOT NULL ,
CHANGE COLUMN `location` `location` TINYINT(1) NOT NULL ,
CHANGE COLUMN `value` `value` TINYINT(1) NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`reviewAudit`
ADD INDEX `review_user_id_idx` (`user_id` ASC);

ALTER TABLE `dev`.`reviewAudit`
ADD CONSTRAINT `audit_review_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reviewAudit`
ADD CONSTRAINT `audit_review_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`review_replies`
ADD INDEX `reply_review_id_idx` (`review_id` ASC);

ALTER TABLE `dev`.`review_replies`
ADD CONSTRAINT `reply_review_id`
  FOREIGN KEY (`review_id`)
  REFERENCES `dev`.`reviews` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`review_replies`
ADD INDEX `reply_user_id_idx` (`userby` ASC);

ALTER TABLE `dev`.`review_replies`
ADD CONSTRAINT `reply_user_id`
  FOREIGN KEY (`userby`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reviews`
ADD CONSTRAINT `review_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reviews`
ADD INDEX `review_user_id_idx` (`userby` ASC);

ALTER TABLE `dev`.`reviews`
ADD CONSTRAINT `review_user_id`
  FOREIGN KEY (`userby`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`reviews`
ADD INDEX `review_res_id_idx` (`reservation_id` ASC);

ALTER TABLE `dev`.`reviews`
ADD CONSTRAINT `review_res_id`
  FOREIGN KEY (`reservation_id`)
  REFERENCES `dev`.`reservations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`roomAvailability`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `openingPeriod_id` `openingPeriod_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`roomAvailability`
ADD CONSTRAINT `avail_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`roomAvailability`
ADD INDEX `avail_opening_id_idx` (`openingPeriod_id` ASC);

ALTER TABLE `dev`.`roomAvailability`
DROP INDEX `date_search` ,
ADD INDEX `date_search` (`date` ASC);

ALTER TABLE `dev`.`room_bookingType`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `bookingType_id` `bookingType_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`room_bookingType`
ADD INDEX `room_book_asset_id_idx` (`asset_id` ASC);

ALTER TABLE `dev`.`room_bookingType`
ADD CONSTRAINT `room_book_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`usages`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `dev`.`room_bookingType`
ADD INDEX `room_book_usage_id_idx` (`bookingType_id` ASC);

DELETE FROM `dev`.`room_bookingType` WHERE `id`='3217';

ALTER TABLE `dev`.`room_bookingType`
ADD CONSTRAINT `room_book_usage_id`
  FOREIGN KEY (`bookingType_id`)
  REFERENCES `dev`.`usages` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`room_configuration`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `configuration_id` `configuration_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `max_capacity` `max_capacity` INT(11) UNSIGNED NOT NULL;

DELETE FROM `dev`.`room_configuration` WHERE `asset_id` in (143,145,146,147,150,153,154,156,293);

ALTER TABLE `dev`.`room_configuration`
ADD CONSTRAINT `config_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`room_configuration`
ADD CONSTRAINT `room_config_id`
  FOREIGN KEY (`configuration_id`)
  REFERENCES `dev`.`configurations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`searchAudit`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `dev`.`settings`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `int_value` `int_value` TINYINT(1) NULL DEFAULT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`usageSuperset_configuration`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `usageSuperset_id` `usageSuperset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `configuration_id` `configuration_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`usageSupersets`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`usageSuperset_usage`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `usageSuperset_id` `usageSuperset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `usage_id` `usage_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`usageSuperset_configuration`
ADD INDEX `usage_config_id_idx` (`configuration_id` ASC);

ALTER TABLE `dev`.`usageSuperset_configuration`
ADD CONSTRAINT `superset_conf_config_id`
  FOREIGN KEY (`configuration_id`)
  REFERENCES `dev`.`configurations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`usageSuperset_configuration`
ADD CONSTRAINT `superset_conf_superset_id`
  FOREIGN KEY (`usageSuperset_id`)
  REFERENCES `dev`.`usageSupersets` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`usageSuperset_usage`
ADD INDEX `usage_usage_superset_id_idx` (`usageSuperset_id` ASC);

ALTER TABLE `dev`.`usageSuperset_usage`
ADD CONSTRAINT `superset_usage_superset_id`
  FOREIGN KEY (`usageSuperset_id`)
  REFERENCES `dev`.`usageSupersets` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`usageSuperset_usage`
ADD CONSTRAINT `superset_usage_usage_id`
  FOREIGN KEY (`usage_id`)
  REFERENCES `dev`.`usages` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`user_asset_members`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `user_id` `user_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `member_type` `member_type` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `discount` `discount` DECIMAL(10,4) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1';

ALTER TABLE `dev`.`user_asset_privileges`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `user_id` `user_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `asset_id` `asset_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `privileges_mask` `privileges_mask` INT(11) UNSIGNED NOT NULL DEFAULT '15' ,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`user_asset_members`
ADD CONSTRAINT `member_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`user_asset_members`
ADD INDEX `member_asset_id_idx` (`asset_id` ASC);

ALTER TABLE `dev`.`user_asset_members`
ADD CONSTRAINT `member_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`user_asset_members`
CHANGE COLUMN `member_type` `member_type_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `dev`.`user_asset_members`
ADD INDEX `member_type_id_idx` (`member_type_id` ASC);

ALTER TABLE `dev`.`user_asset_members`
ADD CONSTRAINT `member_type_id`
  FOREIGN KEY (`member_type_id`)
  REFERENCES `dev`.`member_type` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`user_asset_privileges`
ADD CONSTRAINT `priv_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`user_asset_privileges`
ADD INDEX `prive_asset_id_idx` (`asset_id` ASC);

ALTER TABLE `dev`.`user_asset_privileges`
ADD CONSTRAINT `prive_asset_id`
  FOREIGN KEY (`asset_id`)
  REFERENCES `dev`.`assetAudit` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`user_info_history`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `user_id` `user_id` INT(11) UNSIGNED NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`user_info_history`
ADD INDEX `user_history_user_id_idx` (`user_id` ASC);

DELETE `dev`.`user_info_history` FROM `user_info_history`
LEFT JOIN `users` ON `users`.`id`=`user_info_history`.`user_id`
WHERE `users`.`id` IS NULL;

ALTER TABLE `dev`.`user_info_history`
ADD CONSTRAINT `user_history_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`roles`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

ALTER TABLE `dev`.`users`
ADD INDEX `user_role_id_idx` (`role_id` ASC);

ALTER TABLE `dev`.`users`
ADD CONSTRAINT `user_role_id`
  FOREIGN KEY (`role_id`)
  REFERENCES `dev`.`roles` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`venueTypes`
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div> <p><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {first_name},</span></p><br/> <p><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">{venue_name} has requested that you write a review about your recent reservation.</span></p><br/> </div></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"{review_link}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" target=\"_blank\">Write your review here</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"image195\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody> <tr> <td width=\"100%\" align=\"center\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"30\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body=I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody></table>' WHERE (`id`='93') LIMIT 1;

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Hi {host_name}, {venue_name} - {room_name} has received a new review.</span></p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Review:</b><br/><br/>{review}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Feedback:</b><br/><br/>{feedback}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Cleanliness:</b>&nbsp;&nbsp;{cleanliness}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Communication:</b>&nbsp;&nbsp;{communication}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Accuracy:</b>&nbsp;&nbsp;{accuracy}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Check-In:</b>&nbsp;&nbsp;{checkin}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Location:</b>&nbsp;&nbsp;{location}</span></div><br/> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><b>Value:</b>&nbsp;&nbsp;{value}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"{review_link}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" target=\"_blank\">View this review</a> </span> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div></td></tr></tbody></table>' WHERE `id` = '92';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Booking request sent!</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your booking request has been successfully sent to {venue_name}.<br><br>We have made an authorisation for the full amount of the transaction, but the booking has not been paid for yet. If your request is refused by the venue or expires, the transaction will not occur. The venue has up to 24 hours to accept or reject your request. If it is rejected zipcube will respond to you with alternative options.<br><br>Over 50% of our booking requests receive a response within 1 hour.</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Your booking request details</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} until {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Total price: {market_price} {currency_price}</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in to your account</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"><tbody><tr><td width=\"100%\" align=\"center\"><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 20px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(167, 169, 177);\"><singleline>Frequently Asked Questions</singleline></span></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td width=\"100%\" align=\"left\" style=\"font-size: 14px; color: rgb(167, 169, 177); font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" t-style=\"textColor\" mc:edit=\"71\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;\"><singleline>What is a booking request? Not every venue is integrated with zipcube, so we cannot guarantee that the venue''s calendar is 100% up to date. We are moving towards full integration, which will allow us to offer live booking, but in the interim booking requests are sent. The venue has 24 hours to either accept or decline the booking based on their availability. While 24 hours is the deadline for venues to respond, we are striving to ensure that every request receives a response within 20 minutes. If it is rejected zipcube will respond to you with alternative options.<br><br>What is an authorisation? An authorisation is a request to make sure your credit card is valid, and that the payment can be processed. If the booking request is accepted then the payment is made, if the request is declined or expires then the authorization is voided. The payment is only made once the venue accepts the request.</singleline></span></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '49';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Sorry - Your booking request was declined</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your booking request for \"{list_title}\" was declined by {venue_name}. The payment authorization has been voided.<br><br>We apologise for the inconvenience. Our team are currently finding you an alternative venue, so rest easy, we will find you somewhere nearby. If you would like to contact us in the meantime you can call zipcube on <br>+44 (0)20 7183 2212 or email info@zipcube.com.<br><br>{venue_name} message (optional): <i>{comment}</i></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Alternatively you can start searching for a new space, now!</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Search a new space</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"><tbody><tr><td width=\"100%\" align=\"center\"><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 20px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(167, 169, 177);\"><singleline>Frequently Asked Questions</singleline></span></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td width=\"100%\" align=\"left\" style=\"font-size: 14px; color: rgb(167, 169, 177); font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" t-style=\"textColor\" mc:edit=\"71\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;\"><singleline></singleline>How can my booking request be declined? Not every venue is integrated with zipcube, so we cannot guarantee that the venue''s calendar is 100% up to date. We are moving towards full integration, which will allow us to offer live booking, but in the interim booking requests are sent. The venue has 24 hours to either accept or decline the booking based on their availability. While 24 hours is the deadline for venues to respond, we are striving to ensure that every request receives a response within 20 minutes.</span></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '52';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Sorry - Your booking request has expired</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your booking request for {venue_name} has expired. Your payment authorization has been voided.<br><br>We apologise for the inconvenience. Our team are currently finding you an alternative venue, so rest easy, we will find you somewhere nearby. If you would like to contact us in the meantime you can call zipcube on <br>+44 (0)20 7183 2212 or email info@zipcube.com<br><br><br></span></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Alternatively you can start searching for a new space, now!</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Search a new space</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"><tbody><tr><td width=\"100%\" align=\"center\"><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 20px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(167, 169, 177);\"><singleline>Frequently Asked Questions</singleline></span></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td width=\"100%\" align=\"left\" style=\"font-size: 14px; color: rgb(167, 169, 177); font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" t-style=\"textColor\" mc:edit=\"71\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;\"><singleline></singleline>How can my booking request expire? Not every venue is integrated with zipcube, so we cannot guarantee that the venue''s calendar is 100% up to date. We are moving towards full integration, which will allow us to offer live booking, but in the interim booking requests are sent. The venue has 24 hours to either accept or decline the booking based on their availability. If the venue takes longer than 24 hours to respond to the request, the request expires and is automatically rejected, as we feel it is an unacceptable length of time for you to have to wait. While 24 hours is the deadline for venues to respond, we are striving to ensure that every request receives a response within 20 minutes.</span></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '53';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Booking request has expired </span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {host_name}, the booking request for {list_title} ({venue_name}) has expired.<br><br>Our team are now searching for alternative venues for the requester. Please respond to every request within 24 hours or else it will automatically expire and you will lose the booking.<br><br>If you have any questions please contact zipcube on +44 (0)20 7183 2212 or email info@zipcube.com<br><br><br></span></div></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"><tbody><tr><td width=\"100%\" align=\"center\"><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 20px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(167, 169, 177);\"><singleline>Frequently Asked Questions</singleline></span></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td width=\"100%\" align=\"left\" style=\"font-size: 14px; color: rgb(167, 169, 177); font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" t-style=\"textColor\" mc:edit=\"71\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;\">Why do booking requests expire? Each venue has 24 hours to either accept or decline the booking based on their availability. If the venue takes longer than 24 hours to respond to the request, the request expires and is automatically rejected, as we feel it is an unacceptable length of time for customers to have to wait. While 24 hours is the deadline for venues to respond, we are striving to ensure that every request receives a response within 20 minutes.</span></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '54';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation expired</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi, this booking request for {venue_name} has expired.<br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation details</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Client:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_fname}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Contact:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_email}<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">List:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} from {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Total price: {market_price} {currency_price}</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '55';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation accepted</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi Admin, {host_name} accepted the {client_fname} reservation request for the space \"{list_title}\" ({venue_name}).<br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div></div></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '57';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Booking request declined!</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {host_name}, you have declined {client_fname}''s booking request for {list_title} ({venue_name}).<br><br>Our team are now searching for alternative venues for the requester. If you have any questions please contact zipcube on +44 (0)20 7183 2212 or email info@zipcube.com.</span></div></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in to your account</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></td></tr></tbody></table>' WHERE `id` = '58';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation declined</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi admin<br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation details</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Client:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_fname}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Contact:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_email}<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">List:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} from {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Total price: {market_price} {currency_price}</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '59';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Sorry - your reservation had been cancelled</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your confirmed booking for the space \"{list_title}\" has been cancelled by {host_name}. Your payment will be refunded.<br><br>{venue_name} message (optional): <i>{comment}</i><br><br>We apologise for the inconvenience. Our team are currently finding you an alternative venue, so rest easy, we will find you somewhere nearby.If you would like to contact us in the meantime you can call zipcube on +44 (0)20 7183 2212 or email info@zipcube.com.<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Alternatively you can start searching for a new space, now!</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Search a new space</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '60';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation cancelled by client</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation details</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Client:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_fname}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Contact:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_email}<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">List:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} from {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Total price: {market_price} {currency_price}</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '61';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Booking cancelled.</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, you have cancelled your booking for {list_title} ({venue_name}).We will administer the cancellation policy in line with {venue_name}''s zipcube page at the time of booking and refund any money owed to you.<br><br>Thank you for using Zipcube.com</span></div></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"http://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in</a></span></td></tr></tbody></table></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table> </td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> </td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"><tbody><tr><td width=\"100%\" align=\"center\"><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 20px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(167, 169, 177);\"><singleline>Frequently Asked Questions</singleline></span></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td width=\"100%\" align=\"left\" style=\"font-size: 14px; color: rgb(167, 169, 177); font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" t-style=\"textColor\" mc:edit=\"71\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;\">How does cancellation works? Zipcube will refund any payment balance in line with the cancellation policy of {venue_name} at the time of booking.</span></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table> </div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '62';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Hi {username},</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">You recently asked for a reminder of your password.<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"><i>Feel free to share and help us to provide the best possible online experience for you.<br>- The Zipcube Team.</i></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\">Your account details:</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Email (log in): {email}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Password: {password}</span></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Log in to your account</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>' WHERE `id` = '63';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Welcome</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><h6><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Thank you for signing up with Zipcube.</span></h6><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">With Zipcube you can compare and book meeting, office or event spaces in less than a minute. Select your perfect space and book it instantaneously. It is that simple.<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"><i>Feel free to share and help us to provide the best possible online experience for you.<br>- The Zipcube Team.</i></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\">Your account details:</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Email (log in): {email}</span></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Start your search now</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>' WHERE `id` = '64';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">NEW Message!</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {username_receiver},<br>{username} sent you a new message.<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\">Details:</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Message: {message}</span></div><p></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in to your account to reply to {username}.</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>' WHERE `id` = '68';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Review</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {host_name},<br><br>Review {traveler_name}, once he checkout. Sign in to Zipcube and give your opinion to help other venue owners.<br><br>The Zipcube team hope you had a great experiencerenting your space \"{list_title}\". Once you completed the review, you will receive the review from {traveler_name}.<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"></span></div><p></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in to your account to review {traveler_name}.</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>' WHERE `id` = '72';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Review {list_title}</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {traveler_name},<br><br>Sign in to Zipcube and give your opinion to help users choose the best place. Make your review now!<br><br>The Zipcube team hope you had a great experience hiring \"{list_title}\" and look forward to seeing you again soon.<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"></span></div><p></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in to your account to review {list_title}.</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>' WHERE `id` = '74';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">New listing</span>!</p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi admin, <br>A new space has been listed: {list_title} ({venue_name}).<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Details of the new space.</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue name:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_email}</span></div><div></div><br><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div></div><div></div><div></div><div></div><div></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Listing url</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_url}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"{list_url}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Check the new listing</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"mailto:?subject=FW: Venue to be approved&amp;body=Venue to be approved%0D%0A%0D%0A listing url: {list_url}%0D%0A%0D%0A Venue name: {venue_name}%0D%0A%0D%0A Phone: {venue_phone}%0D%0A%0D%0A Venue email: {venue_email}&amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Approve it now</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"mailto:?subject=FW: Venue to be approved&amp;body=Venue not yet ready %0D%0A%0D%0A listing url: {list_url}%0D%0A%0D%0A Venue name: {venue_name}%0D%0A%0D%0A Phone: {venue_phone}%0D%0A%0D%0A Venue email: {venue_email}%0D%0A%0D%0A Write your comment for the team:&amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Not yet ready! write comment</a></span></td></tr></tbody></table></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table> </td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '75';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"370\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Hi {username},</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">You recently changed your email login. Connect to your account using the following email as your login.<br><br></span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;color: rgb(57, 66, 100);\"></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\">Here are your account details:</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large; font-weight: bold;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Email: {new_email}</span></div></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Log in your account</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"185\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>' WHERE `id` = '76';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation cancelled by Venue</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation details</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Client:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_fname}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Contact:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_email}<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">List:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} from {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Total price: {market_price} {currency_price}</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '77';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Sorry - your reservation had been cancelled</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your confirmed booking for the space \"{list_title}\" has been cancelled by {host_name}. Your payment will be refunded.<br><br>{venue_name} message (optional): <i>{comment}</i><br><br>We apologise for the inconvenience. Our team are currently finding you an alternative venue, so rest easy, we will find you somewhere nearby.If you would like to contact us in the meantime you can call zipcube on +44 (0)20 7183 2212 or email info@zipcube.com.<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Alternatively you can start searching for a new space, now!</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Search a new space</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '78';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Booking cancelled.</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, you have cancelled your booking for {list_title} ({venue_name}).We will administer the cancellation policy in line with {venue_name}''s zipcube page at the time of booking and refund any money owed to you.<br><br>Thank you for using Zipcube.com</span></div></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"http://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in</a></span></td></tr></tbody></table></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table> </td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> </td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"><tbody><tr><td width=\"100%\" align=\"center\"><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 20px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(167, 169, 177);\"><singleline>Frequently Asked Questions</singleline></span></p></td></tr><tr><td width=\"100%\" height=\"25\"></td></tr><tr><td width=\"100%\" align=\"left\" style=\"font-size: 14px; color: rgb(167, 169, 177); font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" t-style=\"textColor\" mc:edit=\"71\"><p object=\"text-editable\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;\">How does cancellation works? Zipcube will refund any payment balance in line with the cancellation policy of {venue_name} at the time of booking.</span></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table></td></tr></tbody></table>' WHERE `id` = '79';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation cancelled by Client</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation details</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Client:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_fname}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Contact:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_email}<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">List:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} from {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Total price: {market_price} {currency_price}</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '80';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation cancelled by Client</span></p></td></tr><tr><td width=\"100%\" height=\"30\"><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">&nbsp;</p><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">Hi, </p><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_fname} has cancelled the booking for {list_title} ({venue_name}).<br>We will administer the cancellation policy in line with {venue_name}''s zipcube page at the time of booking.</p></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation details</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Client:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_fname}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Contact:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_email}<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">List:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} from {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Total price: {market_price} {currency_price}</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '81';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"><tbody><tr><td width=\"100%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"img185\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"70\"></td></tr></tbody></table><table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"40\"></td></tr></tbody></table><table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation cancelled</span> by {venue_name}</p></td></tr><tr><td width=\"100%\" height=\"30\"><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">&nbsp;</p><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">Hi,</p><p style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> The confirmed booking for the space \"{list_title}\" in {venue_name} has been cancelled. The payment will be refunded to the client.</p></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div></div></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Reservation details</span></p></td></tr><tr><td width=\"100%\" height=\"30\"></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Client:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_fname}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Contact:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_email}<br><br></span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">List:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} from {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr><td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"><p cu-identify=\"element_09541608470026404\"><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\">Total price: {market_price} {currency_price}</span></p></td></tr><tr><td width=\"100%\" height=\"45\"></td></tr><tr><td class=\"buttonScale\" width=\"auto\" align=\"left\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"><tbody><tr><td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><a href=\"https://www.zipcube.com/administrator\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Sign in admin</a></span></td></tr></tbody></table></td></tr><tr><td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr><td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody></table><table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"><!--<a href=\"#\" style=\"text-decoration: none;\"><img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"></a>--></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"><div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"><tbody><tr mc:repeatable=\"\"><td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"><div mc:hideable=\"\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"><tbody><tr><td><table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"><tbody><tr><td width=\"100%\" class=\"image195\"><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"><tbody><tr><td width=\"100%\" height=\"25\"></td></tr></tbody></table></div></td></tr></tbody></table> </td></tr></tbody></table>' WHERE `id` = '82';

UPDATE `dev`.`email_templates` SET `email_body_html` = '<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Booking request sent! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your booking request has been successfully sent to {venue_name}. <br><br>We have made an authorisation for the full amount of the transaction, but the booking has not been paid for yet. If your request is refused by the venue or expires, the transaction will not occur. The venue has up to 24 hours to accept or reject your request. If it is rejected zipcube will respond to you with alternative options. <br><br>Over 50% of our booking requests receive a response within 1 hour.</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your booking request details </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} until {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Meeting type:</span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><br><div></div><div><br></div><p></p></td></tr><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Total price: {market_price} {currency_price}</span> </p></td></tr><tr> <td width=\"100%\" height=\"45\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Set up your password to create your account to download invoices, leave reviews and have the system remember you for next time:</span></div><div><br></div></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"{set_password_link}\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Set up your password!</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"><br></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"dcontrols removeme\" style=\"text-align: right;\"> <div style=\"background-image: url(assets/images/button1.png); cursor:pointer;\" class=\"img\" onclick=\"copyIt(this);\">&nbsp;</div><div style=\"background-image: url(assets/images/button2.png); cursor:pointer;\" class=\"img\" onclick=\"deleteIt(this);\">&nbsp;</div></div><table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"image195\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody> <tr> <td width=\"100%\" align=\"center\"> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 20px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(167, 169, 177);\"> <singleline>Frequently Asked Questions</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"25\"></td></tr><tr> <td width=\"100%\" align=\"left\" style=\"font-size: 14px; color: rgb(167, 169, 177); font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" t-style=\"textColor\" mc:edit=\"71\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;\"> <singleline>What is a booking request? Not every venue is integrated with zipcube, so we cannot guarantee that the venue''s calendar is 100% up to date. We are moving towards full integration, which will allow us to offer live booking, but in the interim booking requests are sent. The venue has 24 hours to either accept or decline the booking based on their availability. While 24 hours is the deadline for venues to respond, we are striving to ensure that every request receives a response within 20 minutes. If it is rejected zipcube will respond to you with alternative options. <br><br>What is an authorisation? An authorisation is a request to make sure your credit card is valid, and that the payment can be processed. If the booking request is accepted then the payment is made, if the request is declined or expires then the authorization is voided. The payment is only made once the venue accepts the request.</singleline> </span> </p></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody></table>' WHERE `id` = '94';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Hurrah - Your booking request has been accepted! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your booking request has been successfully accepted by {venue_name}. Please review the details of your reservation and contact {host_name} if you need to clarify anything. <br><br>If you require an invoice or receipt of payment please follow <a href=\"https://www.zipcube.com/dashboard/message_request/{reservation_id}\">this link</a>, click ‘print receipt’ and then you can save the file. Please note not all venues charge VAT on their rooms.<br/><br/>Please note that if you receive an invoice from the venue, this has been sent by them in error, and you should ignore it. Your room has been secured and paid for through Zipcube.<br/><br/>Thank you for using Zipcube.com</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your booking details to be shared with your attendees. </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_email}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Address:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_address}</span></div><br><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} until {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Add-ons</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{addons}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Comments</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{comments}</span></div><br><div></div><div><br></div><p> </p></td></tr><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Total price: {market_price} {currency_price}</span> </p></td></tr><tr> <td width=\"100%\" height=\"45\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: Our next Meeting on {checkin} - Zipcube.com &amp;body=Hi,%0D%0A%0D%0A Here are the details for our next meeting recently booked with Zipcube.com: %0D%0A%0D%0A Check-in: {checkin} from {time_in}%0D%0A%0D%0A Check out: {checkout} from {time_out}%0D%0A%0D%0A Address: {venue_address}. %0D%0A%0D%0A %0D%0A%0D%0A Need a meeting space, desk, event space? Compare and book online https://www.zipcube.com. &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Click to share with your attendees</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> </td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> </td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"image195\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody> <tr> <td width=\"100%\" align=\"center\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"30\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body=I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#1f253d\" c-style=\"darkBlueBG\" style=\"background-color: rgb(31, 37, 61);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td class=\"header-img\"> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"text-align: center; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"bigImage\"> <tbody> <tr> <td valign=\"middle\" width=\"100%\" style=\"text-align: center; font-family: Helvetica, Arial, sans-serif; font-size: 26px; color: rgb(255, 255, 255); font-weight: normal; line-height: 32px;\" t-style=\"whiteText\" class=\"fullCenter\" mc:edit=\"47\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight: normal;\"> <singleline>Your next Zipcube meeting</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"35\"></td></tr><tr> <td valign=\"middle\" width=\"100%\" style=\"text-align: center; font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: rgb(255, 255, 255); font-weight: normal; line-height: 22px;\" t-style=\"whiteText\" class=\"fullCenter\" mc:edit=\"48_1\"> </td></tr><tr> <td width=\"100%\" height=\"65\"></td></tr><tr> <td width=\"100%\" height=\"130\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <img src=\"{url_googlemap}\" alt=\"map\" width=\"300\" height=\"300\" border=\"0\" style=\"width: 100%; height: auto;\" class=\"hover\" mc:edit=\"49\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody></table>' WHERE `id`='51';

/*v1.15 release point 13/09/16 11:25*/

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody> <tr> <td width=\"100%\" valign=\"top\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"img185\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"70\"></td></tr></tbody> </table> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Hurrah - Your booking request has been accepted! </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname}, your booking request has been successfully accepted by {venue_name}. Please review the details of your reservation and contact {host_name} if you need to clarify anything. <br><br>If you require an invoice or receipt of payment please follow <a href=\"https://www.zipcube.com/dashboard/message_request/{reservation_id}\">this link</a>, click ‘print receipt’ and then you can save the file. Please note not all venues charge VAT on their rooms.<br/><br/>Please note that if you receive an invoice from the venue, this has been sent by them in error, and you should ignore it. Your room has been secured and paid for through Zipcube.<br/><br/>Thank you for using Zipcube.com</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div><div><br></div></td></tr><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Your booking details to be shared with your attendees. </span> </p></td></tr><tr> <td width=\"100%\" height=\"30\"></td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_email}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Address:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_address}</span></div><br><br><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{list_title}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} until {time_out}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Add-ons</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{addons}</span></div><div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Comments</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{comments}</span></div><br><div></div><div><br></div><p> </p></td></tr><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"> Total price: {market_price} {currency_price}</span> </p></td></tr><tr> <td width=\"100%\" height=\"45\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: Our next Meeting on {checkin} - Zipcube.com &amp;body=Hi,%0D%0A%0D%0A Here are the details for our next meeting recently booked with Zipcube.com: %0D%0A%0D%0A Check-in: {checkin} from {time_in}%0D%0A%0D%0A Check out: {checkout} from {time_out}%0D%0A%0D%0A Address: {venue_address}. %0D%0A%0D%0A %0D%0A%0D%0A Need a meeting space, desk, event space? Compare and book online https://www.zipcube.com. &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Click to share with your attendees</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"40\"></td></tr></tbody> </table> </td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> </td></tr><tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody> <tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody> <tr> <td> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody> <tr> <td width=\"100%\" class=\"image195\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"25\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody> <tr> <td width=\"100%\" align=\"center\"> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody> <tr> <td width=\"100%\" height=\"30\"></td></tr></tbody> </table> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> </span> </p></td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr><tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody> <tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body=I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc=&amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> </span> </td></tr></tbody> </table> </td></tr><tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td></tr></tbody> </table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody> <tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody></table>' WHERE `id`='51';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Check-in reminder<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {client_fname},<br> Today {host_name} welcomes you for your {list_title} ({venue_name}) booking. <br><br> Thank you for using Zipcube.com</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div> <div><br></div></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Reminder details.<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Venue:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_name}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_phone}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_email}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Address:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{venue_address}</span></div><br><br> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {list_title}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} until {time_out}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Add-ons</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{addons}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Comments</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{comments}</span></div> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> <i>We hope that you have a wonderful meeting and that the venue meets all of your expectations. Remember - clean pants and a winning smile go a long way! - Zipcube Team</i></span></p></td> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"mailto:?subject=FW: Our next Meeting on {checkin} - Zipcube.com &amp;body=Hi,%0D%0A%0D%0A Here are the details for our next meeting recently booked with Zipcube.com: %0D%0A%0D%0A Check-in: {checkin} from {time_in} %0D%0A%0D%0A Check out: {checkout} from {time_out} %0D%0A%0D%0A Address: {venue_address}. %0D%0A%0D%0A %0D%0A%0D%0A Need a meeting space, desk, event space? Compare and book online https://www.zipcube.com. &amp;cc= &amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Click to share with your attendees</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> <!------- Section 11 1 col CUM THREE COL-----------> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" object=\"drag-module\"> <tbody><tr mc:repeatable=\"\"> <td width=\"100%\" valign=\"top\" bgcolor=\"#f9f9f9\" c-style=\"greyBG\" style=\"background-color: rgb(249, 249, 249);\"> <div mc:hideable=\"\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"image195\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"25\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"mobile\"> <tbody><tr> <td width=\"100%\" align=\"center\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"30\"></td> </tr> </tbody></table><!-- End Space --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" align=\"left\" style=\"font-size: 20px; color: rgb(57, 66, 100); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 25px; font-weight: normal; vertical-align: top;\" t-style=\"headlines\" mc:edit=\"70\"> <p object=\"text-editable\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica;font-weight:normal;color: rgb(57, 66, 100);\"><!--<![endif]--> <singleline> \"Thank you for using zipcube, we hope that your booking experience has been quicker and easier than with any other website. We are a young company and every customer is of huge importance to us. If you have a friend who you think we could help find and book meeting rooms or venues, please refer Zipcube to them.\" - the Zipcube Team.</singleline> <!--[if !mso]><!--></span><!--<![endif]--> </p> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(46, 175, 255);\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"mailto:?subject=FW: I thought this might be useful for you ... &amp;body= I tought you might find this useful you can search, compare and book venues and meeting rooms online.%0D%0A%0D%0A All works pretty well. https://www.zipcube.com %0D%0A%0D%0AWhat do you think? &amp;cc= &amp;bcc=info@zipcube.com\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-identify=\"element_02023590081371367\">Refer a friend</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> </tr> </tbody></table><!-- End Wrapper 2 --> </div></td> </tr> </tbody></table><!-- End Wrapper --> <!-- End Wrapper 2 --> </td> </tr> </tbody></table>' WHERE `id`='69';

UPDATE `dev`.`email_templates` SET `email_body_html`='<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\" style=\"position: relative; z-index: 0; background-color: rgb(255, 255, 255);\"> <tbody><tr> <td width=\"100%\" valign=\"top\"> <!-- Wrapper --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"mobile\"> <tbody><tr> <td> <!-- Wrapper --> <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"full\"> <tbody><tr> <td width=\"100%\" class=\"img185\"> <!-- Space --> <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"border- collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"70\"></td> </tr> </tbody></table><!-- End Space --> <!-- Round Image 187_2 --> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border- collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> <!-- Text --> <table width=\"470\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" style=\"border- collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Check-in reminder<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\">Hi {host_name},<br> Today {client_fname} is arriving at {time_in} for their {list_title} ({venue_name}) booking. <br><br> Thank you for using Zipcube.com</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: large;\"><br></span></div> <div><br></div></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> Reminder details.<!--[if !mso]><!--></span><!--<![endif]--> </p></td> </tr> <tr> <td width=\"100%\" height=\"30\"></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <p cu-identify=\"element_027774083777330816\"></p> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Client name:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_fname}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Phone:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_phone}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Email:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{client_email}</span></div> <div></div><br><br> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Space:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\"> {list_title}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check-in:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkin} from {time_in}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Check out: </span><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{checkout} until {time_out}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Number of attendees:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{no_guest}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\">Room configuration:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{roomconf}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font-weight:bold\"><strong>Meeting type</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{meeting_type}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font- weight:bold\"><strong>Add-ons</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{addons}</span></div> <div><span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;font- weight:bold\"><strong>Comments</strong>:</span> <span style=\"font-family: proxima_nova_rgregular, Helvetica; font-size: medium;\">{comments}</span></div> <br> <div></div> <div><br></div><p> </p></td> </tr> <tr> <td width=\"100%\" style=\"font-size: 26px; color: rgb(57, 66, 100); font-family: Helvetica, Arial, sans-serif; line-height: 26px; vertical-align: top; font-weight: normal;\"> <p cu-identify=\"element_09541608470026404\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_nova_rgregular\', Helvetica; font-weight:normal;\"><!--<![endif]--> <i>We asked all of our guests to wipe their feet and check for doggy doo doo - Zipcube Team</i></span></p></td> </tr> <tr> <td width=\"100%\" height=\"45\"></td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" class=\"buttonScale\"> <tbody><tr> <td width=\"auto\" align=\"center\" height=\"36\" bgcolor=\"#17c3c6\" style=\"border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-left: 20px; padding-right: 20px; font-weight: 600; font-family: Helvetica, Arial, sans-serif; background-color: rgb(255, 46, 91);\"> <!--[if !mso]><!--><span style=\"font-family: \'proxima_novasemibold\', Helvetica; font-weight: normal;\"><!--<![endif]--> <a href=\"http://www.zipcube.com/users/signin\" style=\"color: #ffffff; font-size: 14px; text-decoration: none; line-height: 34px; width: 100%;\" cu-=\"\" identify=\"element_02023590081371367\">Log in your account</a> <!--[if !mso]><!--></span><!--<![endif]--> </td> </tr> </tbody></table> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> <!-- Space --> <table width=\"1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border- collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"full\"> <tbody><tr> <td width=\"100%\" height=\"40\"></td> </tr> </tbody></table><!-- End Space --> </td> </tr> <!----------------- Button Left, Scale Center -----------------> <tr> <td class=\"buttonScale\" width=\"auto\" align=\"left\"> </td> </tr> <!----------------- End Button Left, Scale Center -----------------> <tr> <td width=\"100%\" style=\"font-size: 14px; color: rgb(167, 169, 177); text-align: left; font-family: Helvetica, Arial, sans-serif; line-height: 22px; vertical-align: top;\" class=\"fullCenter\"> <br> </td> </tr> <tr> <td width=\"100%\" height=\"40\" class=\"h70\"></td> </tr> </tbody></table> <table width=\"85\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"right\" style=\"border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\" class=\"fullCenter\"> <tbody><tr> <td width=\"100%\" class=\"fullCenter\" style=\"line-height: 1px; text-align: center;\"> <!--<a href=\"#\" style=\"text-decoration: none;\"> <img src=\"\" width=\"185\" height=\"auto\" style=\"width: 185px; height:auto;\" alt=\"\" border=\"0\" class=\"hover\"> </a>--> </td> </tr> </tbody></table></td> </tr> </tbody></table><!-- End Wrapper 2 --> </td> </tr> </tbody></table><!-- End Wrapper --> </td> </tr> </tbody></table>' WHERE `id`='70';

/*v1.15.2 release point 13/09/16 18:30*/

CREATE TABLE `dev`.`currency_locations` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `currency_code` VARCHAR(3) NOT NULL,
  `country_code` VARCHAR(3) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `currency_code_UNIQUE` (`currency_code` ASC),
  UNIQUE INDEX `country_code_UNIQUE` (`country_code` ASC));

ALTER TABLE `dev`.`currency_locations`
CHANGE COLUMN `country_code` `country_code` VARCHAR(3) NOT NULL AFTER `id`,
DROP INDEX `currency_code_UNIQUE`;

INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('AL', 'ALL');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('AD', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('AT', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('BY', 'BYR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('BE', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('BA', 'BAM');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('BG', 'BGN');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('HR', 'HRK');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('CY', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('CZ', 'CZK');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('DK', 'DKK');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('EE', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('FI', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('FR', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('DE', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('GI', 'GIP');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('GR', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('GG', 'GBP');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('HU', 'HUF');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('IS', 'ISK');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('IE', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('IM', 'GBP');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('IT', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('JE', 'GBP');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('LV', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('LI', 'CHF');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('LT', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('LU', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('MK', 'MKD');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('MT', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('MD', 'MDL');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('MC', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('ME', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('NL', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('NO', 'NOK');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('PL', 'PLN');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('PT', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('RO', 'RON');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('RU', 'RUB');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('SM', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('RS', 'RSD');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('SK', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('SI', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('ES', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('SJ', 'NOK');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('SE', 'SEK');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('CH', 'CHF');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('GB', 'GBP');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('UA', 'UAH');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('VA', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('AX', 'EUR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('US', 'USD');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('CA', 'CAD');

ALTER TABLE `dev`.`venues`
ADD COLUMN `country_code` VARCHAR(3) NULL DEFAULT NULL AFTER `address`;

INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('IN', 'INR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('PK', 'PKR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('BZ', 'BZD');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('HK', 'CNY');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('IL', 'ILS');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('BR', 'BRL');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('ZA', 'ZAR');

ALTER TABLE `dev`.`venues`
ADD COLUMN `city` VARCHAR(255) NULL DEFAULT NULL AFTER `address`;

UPDATE `dev`.`venues`
SET `country_code` = 'GB'
WHERE `lat` IS NOT NULL AND `long` IS NOT NULL
AND `lat` >= 50.1195705 AND `lat` <= 58.6355081 AND `long` >= -5.5518866 AND `long` <= 1.6902961
AND country_code IS NULL;

UPDATE `dev`.`venues`
SET `country_code` = 'IE'
WHERE `lat` IS NOT NULL AND `long` IS NOT NULL
AND `lat` >= 51.7033561 AND `lat` <= 54.2466630 AND `long` >= -10.275864 AND `long` <= -6.1036980
AND country_code IS NULL;

INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('ID', 'IDR');
INSERT INTO `dev`.`currency_locations` (`country_code`, `currency_code`) VALUES ('AM', 'AMD');

/*v1.16 release point 19/09/16 10:45*/

ALTER TABLE `dev`.`venues`
ADD COLUMN `country` VARCHAR(255) NULL DEFAULT NULL AFTER `city`;

ALTER TABLE `dev`.`locations`
ADD COLUMN `country` VARCHAR(50) NULL AFTER `enabled`,
ADD COLUMN `locality` VARCHAR(50) NULL AFTER `country`,
ADD COLUMN `constituancy_unit` VARCHAR(100) NULL AFTER `locality`,
ADD COLUMN `location_type` VARCHAR(20) NULL AFTER `constituancy_unit`,
ADD COLUMN `bounds_sw_lat` DECIMAL(10,7) NULL AFTER `location_type`,
ADD COLUMN `bounds_sw_lon` DECIMAL(10,7) NULL AFTER `bounds_sw_lat`,
ADD COLUMN `bounds_ne_lat` DECIMAL(10,7) NULL AFTER `bounds_sw_lon`,
ADD COLUMN `bounds_ne_lon` DECIMAL(10,7) NULL AFTER `bounds_ne_lat`,
ADD COLUMN `rank` INT NOT NULL DEFAULT 0 AFTER `bounds_ne_lon`;

ALTER TABLE `dev`.`locations`
DROP FOREIGN KEY `cat_id`;
ALTER TABLE `dev`.`locations`
CHANGE COLUMN `location_categories_id` `locationcategorie_id` INT(11) UNSIGNED NOT NULL ;
ALTER TABLE `dev`.`locations`
ADD CONSTRAINT `cat_id`
  FOREIGN KEY (`locationcategorie_id`)
  REFERENCES `dev`.`location_categories` (`id`);

ALTER TABLE `dev`.`room_configuration`
CHANGE COLUMN `max_capacity` `max_capacity` INT(11) NOT NULL;

ALTER TABLE `dev`.`locations`
CHANGE COLUMN `url_desc_long` `url_desc_long` VARCHAR(45) NOT NULL AFTER `url_desc`,
CHANGE COLUMN `search_radius` `search_radius` DECIMAL(5,1) NOT NULL DEFAULT '2.0' AFTER `bounds_ne_lon`,
CHANGE COLUMN `in_sitemap` `in_sitemap` TINYINT(1) NULL DEFAULT '0' AFTER `search_radius`,
CHANGE COLUMN `venue_count` `venue_count` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `rank`,
CHANGE COLUMN `room_count` `room_count` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `venue_count`,
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `room_count`,
CHANGE COLUMN `rank` `rank` INT(11) UNSIGNED NOT NULL DEFAULT '1';

ALTER TABLE `dev`.`locations`
ADD COLUMN `place_id` VARCHAR(100) NULL AFTER `rank`;

ALTER TABLE `dev`.`locations`
DROP INDEX `url_desc_UNIQUE`,
ADD UNIQUE INDEX `location_UNIQUE` (`place_id` ASC, `url_desc` ASC, `country` ASC, `locality` ASC, `constituancy_unit` ASC);

ALTER TABLE `dev`.`locations`
ADD COLUMN `desc_text` VARCHAR(1000) NULL AFTER `human_desc`;

/*v1.17 release point 30/09/16 15:10*/

ALTER TABLE `dev`.`users` ADD COLUMN `hubspot_id` INT(11) NULL AFTER `twitter_id`;
ALTER TABLE `dev`.`reservations` ADD COLUMN `hubspot_id` INT(11) NULL AFTER `assigned_user`;

/*v1.18 release point 04/10/16 16:30*/

ALTER TABLE `dev`.`venues`
ADD COLUMN `street_number` VARCHAR(45) NULL DEFAULT NULL AFTER `country_code`,
ADD COLUMN `road` VARCHAR(255) NULL DEFAULT NULL AFTER `street_number`,
ADD COLUMN `town` VARCHAR(255) NULL DEFAULT NULL AFTER `road`,
ADD COLUMN `county` VARCHAR(255) NULL DEFAULT NULL AFTER `town`,
ADD COLUMN `post_code` VARCHAR(45) NULL DEFAULT NULL AFTER `county`;

/*v1.18.4 release point 07/10/16 11:00*/

UPDATE `dev`.`usageSupersets` SET `desc`='Meeting Rooms & Venues' WHERE `id`='2';
UPDATE `dev`.`usageSupersets` SET `desc`='Conference Rooms & Venues' WHERE `id`='3';
UPDATE `dev`.`usageSupersets` SET `desc`='Training Rooms & Venues' WHERE `id`='4';
UPDATE `dev`.`usageSupersets` SET `desc`='Coworking & Hot Desk Spaces' WHERE `id`='5';
UPDATE `dev`.`usageSupersets` SET `desc`='Event Spaces & Function Rooms' WHERE `id`='6';

ALTER TABLE `dev`.`usageSupersets`
ADD COLUMN `short_desc` VARCHAR(45) NULL DEFAULT NULL AFTER `desc`;

UPDATE `dev`.`usageSupersets` SET `short_desc`='All Rooms' WHERE `id`='1';
UPDATE `dev`.`usageSupersets` SET `short_desc`='Meeting Rooms' WHERE `id`='2';
UPDATE `dev`.`usageSupersets` SET `short_desc`='Conference Rooms' WHERE `id`='3';
UPDATE `dev`.`usageSupersets` SET `short_desc`='Training Rooms' WHERE `id`='4';
UPDATE `dev`.`usageSupersets` SET `short_desc`='Coworking/Hot Desks' WHERE `id`='5';
UPDATE `dev`.`usageSupersets` SET `short_desc`='Event Spaces/Function Rooms' WHERE `id`='6';

/*v1.19 release point 11/10/16 11:00*/

CREATE TABLE `dev`.`location_usage` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `location_id` INT(11) UNSIGNED NOT NULL,
  `usageSuperset_id` INT(11) UNSIGNED NOT NULL,
  `lang_code` CHAR(2) NOT NULL,
  `desc_text` VARCHAR(1000) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `location_id_idx` (`location_id` ASC),
  INDEX `loc_usage_usageSuperset_id_idx` (`usageSuperset_id` ASC),
  UNIQUE INDEX `loc_usage` (`location_id` ASC, `usageSuperset_id` ASC, `lang_code` ASC),
  CONSTRAINT `loc_usage_loc_id`
    FOREIGN KEY (`location_id`)
    REFERENCES `dev`.`locations` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `loc_usage_usageSuperset_id`
    FOREIGN KEY (`usageSuperset_id`)
    REFERENCES `dev`.`usageSupersets` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `dev`.`location_usage_media` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `location_id` INT(11) UNSIGNED NOT NULL,
  `usageSuperset_id` INT(11) UNSIGNED NOT NULL,
  `image1` VARCHAR(255) NULL DEFAULT NULL,
  `image2` VARCHAR(255) NULL DEFAULT NULL,
  `image3` VARCHAR(255) NULL DEFAULT NULL,
  `image4` VARCHAR(255) NULL DEFAULT NULL,
  `image5` VARCHAR(255) NULL DEFAULT NULL,
  `video` VARCHAR(255) NULL DEFAULT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `loca_usage_media_loc_id_idx` (`location_id` ASC),
  INDEX `loc_usage_media_usage_id_idx` (`usageSuperset_id` ASC),
  UNIQUE INDEX `loc_usage` (`location_id` ASC, `usageSuperset_id` ASC),
  CONSTRAINT `loc_usage_media_loc_id`
    FOREIGN KEY (`location_id`)
    REFERENCES `dev`.`locations` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `loc_usage_media_usage_id`
    FOREIGN KEY (`usageSuperset_id`)
    REFERENCES `dev`.`usageSupersets` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

/*v1.19.7 release point 21/10/16 17:00*/

CREATE TABLE `dev`.`enquiries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usageSuperset_id` INT(11) UNSIGNED NOT NULL,
  `eventDate` DATE NULL,
  `eventTime` DATETIME NULL,
  `duration` INT(11) NOT NULL,
  `unitTime` ENUM('hours', 'days', 'weeks', 'months', 'years') NOT NULL DEFAULT 'hours',
  `eventType` VARCHAR(45) NULL,
  `flexible` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
CONSTRAINT `room_type_id`
  FOREIGN KEY (`usageSuperset_id`)
  REFERENCES `dev`.`usageSupersets` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION);

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `user_id` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `id`,
ADD COLUMN `user_email` VARCHAR(100) NOT NULL AFTER `user_id`;

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `room_id` INT(11) UNSIGNED NOT NULL AFTER `user_email`,
ADD INDEX `enquiry_room_id_idx` (`room_id` ASC);
ALTER TABLE `dev`.`enquiries`
ADD CONSTRAINT `enquiry_room_id`
  FOREIGN KEY (`room_id`)
  REFERENCES `dev`.`rooms` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`enquiries`
CHANGE COLUMN `duration` `duration` ENUM('Not sure', '1 or more', '3 or more', '6 or more') NOT NULL DEFAULT 'Not sure',
ADD COLUMN `message` VARCHAR(1500) NULL AFTER `flexible`;

ALTER TABLE `dev`.`enquiries`
DROP COLUMN `eventType`;

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `user_phone` VARCHAR(45) NOT NULL AFTER `user_email`;

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `description` VARCHAR(45) NOT NULL DEFAULT 'Enquiry' AFTER `room_id`;

ALTER TABLE `dev`.`enquiries`
CHANGE COLUMN `unitTime` `unitTime` ENUM('hours', 'days', 'weeks', 'months', 'years') NULL;

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `hubspot_id` INT(11) NULL AFTER `usageSuperset_id`;

ALTER TABLE `dev`.`enquiries`
DROP COLUMN `unitTime`,
ADD COLUMN `tourDate` DATE NULL DEFAULT NULL AFTER `message`;

ALTER TABLE `dev`.`enquiries`
CHANGE COLUMN `tourDate` `tourDate` DATE NULL DEFAULT NULL AFTER `duration`;

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `deskCount` INT(11) NULL AFTER `message`;

ALTER TABLE `dev`.`enquiries`
CHANGE COLUMN `duration` `duration` VARCHAR(45) NOT NULL DEFAULT 'Not sure';

ALTER TABLE `dev`.`enquiries`
CHANGE COLUMN `duration` `duration` VARCHAR(45) NULL DEFAULT NULL;

ALTER TABLE `dev`.`enquiries`
DROP COLUMN `user_id`;

ALTER TABLE `dev`.`enquiries`
CHANGE COLUMN `eventTime` `eventTime` TIME NULL DEFAULT NULL;

/*v1.20 release point 21/10/16 18:00*/

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `created` DATETIME NOT NULL AFTER `deskCount`;

/*v1.20.4 release point 26/10/16 11:50*/

ALTER TABLE `dev`.`reservations`
ADD COLUMN `source` ENUM('Website Direct', 'Enquiry - Website', 'Enquiry - Call', 'Enquiry - Email', 'Enquiry - Chat') NULL DEFAULT 'Website Direct' AFTER `batch_id`;

ALTER TABLE `dev`.`bookings`
ADD COLUMN `requires_switch` TINYINT(1) NOT NULL DEFAULT 0 AFTER `journeyToken`;

/*v1.20.5 release point 27/10/16 11:00*/

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `created`;

ALTER TABLE `dev`.`enquiries`
CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
CHANGE COLUMN `flexible` `flexible` TINYINT(1) NOT NULL;

/*v1.20.6 release point 28/10/16 17:50*/

CREATE TABLE `dev`.`location_usages_venues` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `location_id` INT(11) UNSIGNED NOT NULL,
  `usageSuperset_id` INT(11) UNSIGNED NOT NULL,
  `venue_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `dev`.`location_usages_venues`
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC),
ADD INDEX `locusage_ven_location_id_idx` (`location_id` ASC),
ADD INDEX `locusage_ven_usageSuperset_id_idx` (`usageSuperset_id` ASC),
ADD INDEX `locusage_ven_venue_id_idx` (`venue_id` ASC);
ALTER TABLE `dev`.`location_usages_venues`
ADD CONSTRAINT `locusage_ven_location_id`
  FOREIGN KEY (`location_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `locusage_ven_usageSuperset_id`
  FOREIGN KEY (`usageSuperset_id`)
  REFERENCES `dev`.`usageSupersets` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `locusage_ven_venue_id`
  FOREIGN KEY (`venue_id`)
  REFERENCES `dev`.`venues` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`location_usage`
ADD COLUMN `h1` VARCHAR(255) NULL AFTER `enabled`,
ADD COLUMN `h2` VARCHAR(255) NULL AFTER `h1`,
ADD COLUMN `search_route_url` VARCHAR(255) NULL AFTER `h2`,
ADD COLUMN `enable_search_route` TINYINT(1) NULL AFTER `search_route_url`;

ALTER TABLE `dev`.`location_usage_media`
ADD COLUMN `video_enabled` TINYINT(1) NULL AFTER `enabled`;

CREATE TABLE `dev`.`location_usages_rooms` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `location_id` INT(11) UNSIGNED NOT NULL,
  `usageSuperset_id` INT(11) UNSIGNED NOT NULL,
  `room_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `dev`.`location_usages_rooms`
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC),
ADD INDEX `locusage_ven_location_id_idx` (`location_id` ASC),
ADD INDEX `locusage_ven_usageSuperset_id_idx` (`usageSuperset_id` ASC),
ADD INDEX `locusage_room_room_id_idx` (`room_id` ASC);
ALTER TABLE `dev`.`location_usages_rooms`
ADD CONSTRAINT `locusage_room_location_id`
  FOREIGN KEY (`location_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `locusage_room_usageSuperset_id`
  FOREIGN KEY (`usageSuperset_id`)
  REFERENCES `dev`.`usageSupersets` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `locusage_room_room_id`
  FOREIGN KEY (`room_id`)
  REFERENCES `dev`.`rooms` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`location_usage`
CHANGE COLUMN `enabled` `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `enable_search_route`;

ALTER TABLE `dev`.`location_usage_media`
CHANGE COLUMN `video_enabled` `video_enabled` TINYINT(1) NOT NULL DEFAULT '0' AFTER `video`;

ALTER TABLE `dev`.`location_usages_rooms`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `room_id`,
ADD UNIQUE INDEX `loc_usage` (`location_id` ASC, `usageSuperset_id` ASC, `room_id` ASC);

ALTER TABLE `dev`.`location_usages_venues`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `venue_id`,
ADD UNIQUE INDEX `loc_usage` (`location_id` ASC, `usageSuperset_id` ASC, `venue_id` ASC);

ALTER TABLE `dev`.`users` ADD `language_pref` CHAR(2)  NOT NULL  DEFAULT 'en'  AFTER `timezone`;

INSERT INTO `dev`.`contact_info` (`id`, `locale`, `phone`, `phone_clean`, `email`, `name`, `street`, `city`, `state`, `postcode`, `country`, `country_img_url`, `default`, `enabled`) VALUES ('3', 'fr', '', '', 'info@zipcube.com', 'Zipcube Ltd', '', '', '', '', 'France', '', '0', '1');
INSERT INTO `dev`.`contact_info` (`id`, `locale`, `phone`, `phone_clean`, `email`, `name`, `street`, `city`, `state`, `postcode`, `country`, `country_img_url`, `default`, `enabled`) VALUES ('4', 'de', '', '', 'info@zipcube.com', 'Zipcube Ltd', '', '', '', '', 'Deutschland', '', '0', '1');
INSERT INTO `dev`.`contact_info` (`id`, `locale`, `phone`, `phone_clean`, `email`, `name`, `street`, `city`, `state`, `postcode`, `country`, `country_img_url`, `default`, `enabled`) VALUES ('5', 'nl', '', '', 'info@zipcube.com', 'Zipcube Ltd', '', '', '', '', 'Nederland', '', '0', '1');
ALTER TABLE `dev`.`contact_info` DROP `country_img_url`;

INSERT INTO `dev`.`language` (`code`, `name`, `default`, `enabled`) VALUES ('nl', 'Dutch', '0', '1');
UPDATE `dev`.`language` SET `enabled` = '1' WHERE `code` = 'fr';
UPDATE `dev`.`language` SET `enabled` = '1' WHERE `code` = 'gr';

CREATE TABLE `dev`.`locale_language` (id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT);
ALTER TABLE `dev`.`locale_language` ADD `locale_code` CHAR(2)  NOT NULL  DEFAULT ''  AFTER `id`;
ALTER TABLE `dev`.`locale_language` ADD `lang_code` CHAR(2)  NOT NULL  DEFAULT ''  AFTER `locale_code`;
ALTER TABLE `dev`.`locale_language` ADD `enabled` TINYINT(1)  NOT NULL  DEFAULT '1'  AFTER `lang_code`;

INSERT INTO `dev`.`locale_language` (`id`, `locale_code`, `lang_code`, `enabled`) VALUES ('1', 'gb', 'en', '1');
INSERT INTO `dev`.`locale_language` (`id`, `locale_code`, `lang_code`, `enabled`) VALUES ('2', 'ie', 'en', '1');
INSERT INTO `dev`.`locale_language` (`id`, `locale_code`, `lang_code`, `enabled`) VALUES ('3', 'fr', 'fr', '1');
INSERT INTO `dev`.`locale_language` (`id`, `locale_code`, `lang_code`, `enabled`) VALUES ('4', 'de', 'gr', '1');
INSERT INTO `dev`.`locale_language` (`id`, `locale_code`, `lang_code`, `enabled`) VALUES ('5', 'nl', 'du', '1');

ALTER TABLE `dev`.`users`
ADD COLUMN `locale_pref` CHAR(2) NOT NULL DEFAULT 'gb' AFTER `language_pref`;

UPDATE `dev`.`contact_info` SET `locale`='gb' WHERE `id`='1';

UPDATE `dev`.`language` SET `code`='de' WHERE `code`='gr';
UPDATE `dev`.`language` SET `code`='pt' WHERE `code`='po';
UPDATE `dev`.`language` SET `code`='es' WHERE `code`='sp';

ALTER TABLE `dev`.`metas`
RENAME TO  `dev`.`metas_old`;

CREATE TABLE `dev`.`metas` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `controller_name` VARCHAR(100) NOT NULL,
  `method_name` VARCHAR(100) NOT NULL,
  `lang_code` CHAR(2) NOT NULL,
  `title` VARCHAR(300) NOT NULL,
  `meta_description` VARCHAR(300) NULL DEFAULT NULL,
  `meta_keyword` VARCHAR(300) NULL DEFAULT NULL,
  `meta_og_type` VARCHAR(300) NULL DEFAULT NULL,
  `meta_og_title` VARCHAR(300) NULL DEFAULT NULL,
  `meta_og_image` VARCHAR(300) NULL DEFAULT NULL,
  `meta_og_description` VARCHAR(300) NULL DEFAULT NULL,
  `meta_og_locale` VARCHAR(300) NULL DEFAULT NULL,
  `meta_og_url` VARCHAR(300) NULL DEFAULT NULL,
  `meta_og_latitude` VARCHAR(300) NULL DEFAULT NULL,
  `meta_og_longitude` VARCHAR(300) NULL DEFAULT NULL,
  `meta_twitter_title` VARCHAR(300) NULL DEFAULT NULL,
  `meta_twitter_description` VARCHAR(300) NULL DEFAULT NULL,
  `meta_twitter_image` VARCHAR(300) NULL DEFAULT NULL,
  `meta_twitter_card` VARCHAR(300) NULL DEFAULT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('home', 'index', 'en', 'Hire Conference Spaces and Meeting Rooms - London and the UK - Zipcube', 'Find & Hire meeting rooms, offices, shared offices, event & unique venues. Zipcube provides an easy instant booking for working and event spaces by the hour, day, or week.', 'meeting rooms, shared office, office space, temporary office space, event space, meeting room, hire meeting room, conference rooms, meeting room rental, event space rental, hire venue, meeting space, hire meeting room,');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('home', 'get_started', 'en', 'Get started with Zipcube!');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/backend', 'index', 'en', 'Admin', 'Admin Dashboard', 'Admin');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/enquiries', 'index', 'en', 'Enquiries | Administrator', 'Enquiries | Administrator Dashboard', 'Enquiries | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/enquiries', 'enquirykeyword', 'en', 'Enquiries | Administrator', 'Enquiries | Administrator Dashboard', 'Enquiries | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/exceptions', 'index', 'en', 'Exceptions | Administrator', 'Exceptions | Administrator Dashboard', 'Exceptions | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/import_calendar', 'index', 'en', 'Insert Calendar', 'Admin Dashboard', 'Admin');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/lists', 'rooms', 'en', 'Rooms | Administrator', 'Rooms | Administrator Dashboard', 'Rooms | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/lists', 'roomkeyword', 'en', 'Rooms | Administrator', 'Rooms | Administrator Dashboard', 'Rooms | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/locations', 'index', 'en', 'Locations | Administrator', 'Locations | Administrator Dashboard', 'Locations | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/locations', 'locationkeyword', 'en', 'Locations | Administrator', 'Locations | Administrator Dashboard', 'Locations | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/members', 'venues', 'en', 'Venues | Administrator', 'Venues | Administrator Dashboard', 'Venues | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/members', 'venuekeyword', 'en', 'Venues | Administrator', 'Venues | Administrator Dashboard', 'Venues | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/members', 'users', 'en', 'Users | Administrator', 'Users | Administrator Dashboard', 'Users | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/members', 'userkeyword', 'en', 'Users | Administrator', 'Users | Administrator Dashboard', 'Users | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/payments', 'bookings', 'en', 'Bookings | Administrator', 'Bookings | Administrator Dashboard', 'Bookings | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/payments', 'bookingkeyword', 'en', 'Bookings | Administrator', 'Bookings | Administrator Dashboard', 'Bookings | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/payments', 'summary', 'en', 'Finance | Administrator', 'Finance | Administrator Dashboard', 'Finance | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/photos', 'index', 'en', 'Photos | Administrator', 'Photos | Administrator Dashboard', 'Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/photos', 'photokeyword', 'en', 'Photos | Administrator', 'Photos | Administrator Dashboard', 'Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'index', 'en', 'Dashboard - Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'inbox', 'en', 'Inbox');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('dashboard', 'message_request', 'en', 'Reservation Request', 'Reservation_Request', 'Reservation_Request');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('dashboard', 'message_conversation', 'en', 'Conversations', 'Conversations', 'Conversations');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('dashboard', 'message_review', 'en', 'Review', 'Review', 'Review');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('dashboard', 'bookings', 'en', 'Bookings', 'Bookings', 'Bookings');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('dashboard', 'venue_bookings', 'en', 'Bookings', 'Bookings', 'Bookings');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('dashboard', 'schedule', 'en', 'Schedule', 'Schedule', 'Schedule');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'edit_room', 'en', 'Create New Room - Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'edit_venue', 'en', 'Create New Venue - Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'listing', 'en', 'Room Listing');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'listing_venue', 'en', 'Venue Listing');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'listing_amenities_services', 'en', 'Amenities and Services Listing');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'reviews', 'en', 'Reviews - Account - Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'request_reviews', 'en', 'Reviews - Account - Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'venue_team_members', 'en', 'Venue Team - Zipcube Dashboard');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'user_members', 'en', 'Members - Zipcube Dashboard');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'account_profile', 'en', 'Edit Profile - Account - Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'account_password', 'en', 'Change Password - Account - Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'account_widget', 'en', 'Widget - Account - Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('pages', 'contact', 'en', 'Contact Us', 'Contact Us', 'Contact Us');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('pages', 'faq', 'en', 'FAQs', 'FAQs', 'FAQs');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('pages', 'how_it_works', 'en', 'How it works', 'How it works', 'How it works');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('pages', 'how_to_share', 'en', 'How to share', 'How to share', 'How to share');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('pages', 'about', 'en', 'About', 'About', 'About');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('pages', 'legal', 'en', 'Legal', 'Legal', 'Legal');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('pages', 'survey_ts_and_cs', 'en', 'Terms and Conditions', 'Terms and Conditions for the Zipcube Amazon voucher giveaway.', 'Terms and Conditions');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('info', 'index', 'en', 'Access Deny', 'Access Deny', 'Access Deny');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('info', 'deny', 'en', 'Access Deny', 'Access Deny', 'Access Deny');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('info', 'admin_deny', 'en', 'Access Deny', 'Access Deny', 'Access Deny');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`) VALUES ('payments', 'index', 'en', 'Confirm Your Booking', 'Confirm Your Booking');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`) VALUES ('payments', 'save_details', 'en', 'Save your details', 'Save your details with Zipcube to make checking out easier next time.');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`) VALUES ('payments', 'booking_confirmed', 'en', 'Booking Confirmation', 'Confirmation of your booking from Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`) VALUES ('reviews', 'index', 'en', 'Write A Review', 'Write A Review');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`) VALUES ('users', 'signin', 'en', 'Sign In', 'Log in at Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`) VALUES ('users', 'request_new_password', 'en', 'Request password reset', 'Request password reset from Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`) VALUES ('users', 'token_login', 'en', 'Set Password', 'Password set by user token from Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`) VALUES ('users', 'signup', 'en', 'Sign up to Zipcube!', 'Sign up to Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_og_image`, `meta_twitter_image`, `meta_twitter_card`) VALUES ('search', 'landing_page', 'en', 'Landing Page', '', '', 'summary');

UPDATE `dev`.`language` SET `enabled`='0' WHERE `code`='de';
UPDATE `dev`.`language` SET `enabled`='0' WHERE `code`='fr';
UPDATE `dev`.`language` SET `enabled`='0' WHERE `code`='nl';

/*v1.21 release point 04/11/16 16:50*/

UPDATE `dev`.`locale_language` SET `lang_code`='de' WHERE `id`='4';
UPDATE `dev`.`locale_language` SET `lang_code`='nl' WHERE `id`='5';

CREATE TABLE `dev`.`popularlocations` (
  `id` INT(11) UNSIGNED NOT NULL  AUTO_INCREMENT,
  `usage_superset_id` INT(11) UNSIGNED NOT NULL,
  `location_id` INT(11) UNSIGNED NOT NULL,
  `lang_code` CHAR(2) NOT NULL,
  `desc_text` VARCHAR(1000) NOT NULL,
  `img` VARCHAR(255) NULL,
  `size` VARCHAR(45) NULL,
  `score` INT,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`popularlocations`
ADD INDEX `pop_loc_location_id_idx` (`location_id` ASC);
ALTER TABLE `dev`.`popularlocations`
ADD CONSTRAINT `pop_loc_location_id`
  FOREIGN KEY (`location_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`popularlocations`
ADD INDEX `pop_loc_usage_superset_id_idx` (`usage_superset_id` ASC);
ALTER TABLE `dev`.`popularlocations`
ADD CONSTRAINT `pop_loc_usage_superset_id`
  FOREIGN KEY (`usage_superset_id`)
  REFERENCES `dev`.`usageSupersets` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`popularlocations` ADD UNIQUE( `usage_superset_id`, `location_id`, `lang_code`);

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '2', 'en', 'London is the perfect choice for your meeting or event, being one of the top meeting destinations in the world and offering great value for money and an accessible location, as well as one of the world\'s most diverse ranges of spaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '2', 'en', 'London is the perfect choice for your conferences, being one of the top meeting destinations in the world and offering great value for money and an accessible location, as well as one of the world\'s most diverse ranges of spaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '2', 'en', 'London is the perfect choice for your trainings, being one of the top meeting destinations in the world and offering great value for money and an accessible location, as well as one of the world\'s most diverse ranges of spaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '2', 'en', 'London is the perfect choice for your coworkings, being one of the top meeting destinations in the world and offering great value for money and an accessible location, as well as one of the world\'s most diverse ranges of spaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '2', 'en', 'London is the perfect choice for your events, being one of the top meeting destinations in the world and offering great value for money and an accessible location, as well as one of the world\'s most diverse ranges of spaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '2', 'fr', 'Londres est le choix parfait pour votre réunion ou événement, étant l\'une des meilleures destinations de réunion dans le monde et offrant un excellent rapport qualité-prix et un emplacement accessible, ainsi que l\'un des plus variées du monde gammes d\'espaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '2', 'fr', 'Londres est le choix parfait pour votre conférences, étant l\'une des meilleures destinations de réunion dans le monde et offrant un excellent rapport qualité-prix et un emplacement accessible, ainsi que l\'un des plus variées du monde gammes d\'espaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '2', 'fr', 'Londres est le choix parfait pour votre formations, étant l\'une des meilleures destinations de réunion dans le monde et offrant un excellent rapport qualité-prix et un emplacement accessible, ainsi que l\'un des plus variées du monde gammes d\'espaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '2', 'fr', 'Londres est le choix parfait pour votre coworkings, étant l\'une des meilleures destinations de réunion dans le monde et offrant un excellent rapport qualité-prix et un emplacement accessible, ainsi que l\'un des plus variées du monde gammes d\'espaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '2', 'fr', 'Londres est le choix parfait pour votre événement, étant l\'une des meilleures destinations de réunion dans le monde et offrant un excellent rapport qualité-prix et un emplacement accessible, ainsi que l\'un des plus variées du monde gammes d\'espaces.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '2', 'de', 'London ist die perfekte Wahl für Ihre Tagung oder Veranstaltung, in der Welt eine der Top-Meeting-Destinationen und ein gutes Preis-Leistungs-Verhältnis und zugänglichen Lage, sowie einer der weltweit vielfältigsten Bereiche von Räumen.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '2', 'de', 'London ist die perfekte Wahl für Ihre Konferenzen, in der Welt eine der Top-Meeting-Destinationen und ein gutes Preis-Leistungs-Verhältnis und zugänglichen Lage, sowie einer der weltweit vielfältigsten Bereiche von Räumen.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '2', 'de', 'London ist die perfekte Wahl für Ihre Schulungen, in der Welt eine der Top-Meeting-Destinationen und ein gutes Preis-Leistungs-Verhältnis und zugänglichen Lage, sowie einer der weltweit vielfältigsten Bereiche von Räumen.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '2', 'de', 'London ist die perfekte Wahl für Ihre coworkings, in der Welt eine der Top-Meeting-Destinationen und ein gutes Preis-Leistungs-Verhältnis und zugänglichen Lage, sowie einer der weltweit vielfältigsten Bereiche von Räumen.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '2', 'de', 'London ist die perfekte Wahl für Ihre Veranstaltung, in der Welt eine der Top-Meeting-Destinationen und ein gutes Preis-Leistungs-Verhältnis und zugänglichen Lage, sowie einer der weltweit vielfältigsten Bereiche von Räumen.', '/css/images/home/top_locations/london.jpg', 'large', '1', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '623', 'en', 'Select meeting and conference venues nested amongst Birmingham\'s network of canals radiating from Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '623', 'en', 'Select conferences nested amongst Birmingham\'s network of canals radiating from Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '623', 'en', 'Select trainings nested amongst Birmingham\'s network of canals radiating from Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '623', 'en', 'Select coworkings nested amongst Birmingham\'s network of canals radiating from Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '623', 'en', 'Select events nested amongst Birmingham\'s network of canals radiating from Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '623', 'fr', 'Sélectionnez réunion et de conférence lieux nichés entre le réseau de Birmingham de canaux rayonnant à partir de Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '623', 'fr', 'Sélectionnez conférence lieux nichés entre le réseau de Birmingham de canaux rayonnant à partir de Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '623', 'fr', 'Sélectionnez formation lieux nichés entre le réseau de Birmingham de canaux rayonnant à partir de Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '623', 'fr', 'Sélectionnez coworking lieux nichés entre le réseau de Birmingham de canaux rayonnant à partir de Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '623', 'fr', 'Sélectionnez événement lieux nichés entre le réseau de Birmingham de canaux rayonnant à partir de Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '623', 'de', 'Wählen Sie Tagungs- und Konferenzräume unter Birmingham Netz von Kanälen verschachtelt strahl von Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '623', 'de', 'Wählen Sie Konferenzen unter Birmingham Netz von Kanälen verschachtelt strahl von Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '623', 'de', 'Wählen Sie Schulungen unter Birmingham Netz von Kanälen verschachtelt strahl von Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '623', 'de', 'Wählen Sie coworkings unter Birmingham Netz von Kanälen verschachtelt strahl von Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '623', 'de', 'Wählen Sie Veranstaltung unter Birmingham Netz von Kanälen verschachtelt strahl von Sherborne Wharf.', '/css/images/home/top_locations/birmingham.jpg', '', '2', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '601', 'en', 'England\'s northern cultural hub is the home of countless great meeting rooms available to book.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '601', 'en', 'England\'s northern cultural hub is the home of countless great conference rooms available to book.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '601', 'en', 'England\'s northern cultural hub is the home of countless great training rooms available to book.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '601', 'en', 'England\'s northern cultural hub is the home of countless great coworking rooms available to book.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '601', 'en', 'England\'s northern cultural hub is the home of countless great event rooms available to book.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '601', 'fr', 'Centre culturel du nord de l\'Angleterre est la maison d\'innombrables grands réunion lieux disponible pour réserver.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '601', 'fr', 'Centre culturel du nord de l\'Angleterre est la maison d\'innombrables grands conférence lieux disponible pour réserver.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '601', 'fr', 'Centre culturel du nord de l\'Angleterre est la maison d\'innombrables grands formation lieux disponible pour réserver.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '601', 'fr', 'Centre culturel du nord de l\'Angleterre est la maison d\'innombrables grands coworking lieux disponible pour réserver.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '601', 'fr', 'Centre culturel du nord de l\'Angleterre est la maison d\'innombrables grands événement lieux disponible pour réserver.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '601', 'de', 'Englands Nord kulturelle Zentrum ist die Heimat von unzähligen großen Tagungs zur Verfügung zu buchen.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '601', 'de', 'Englands Nord kulturelle Zentrum ist die Heimat von unzähligen großen Konferenzen zur Verfügung zu buchen.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '601', 'de', 'Englands Nord kulturelle Zentrum ist die Heimat von unzähligen großen Schulungen zur Verfügung zu buchen.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '601', 'de', 'Englands Nord kulturelle Zentrum ist die Heimat von unzähligen großen coworkings zur Verfügung zu buchen.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '601', 'de', 'Englands Nord kulturelle Zentrum ist die Heimat von unzähligen großen Veranstaltung zur Verfügung zu buchen.', '/css/images/home/top_locations/leeds.jpg', '', '3', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '624', 'en', 'Once a great maritime city, Liverpool now boasts world-class meeting rooms.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '624', 'en', 'Once a great maritime city, Liverpool now boasts world-class conference rooms.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '624', 'en', 'Once a great maritime city, Liverpool now boasts world-class training rooms.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '624', 'en', 'Once a great maritime city, Liverpool now boasts world-class coworking rooms.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '624', 'en', 'Once a great maritime city, Liverpool now boasts world-class event rooms.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '624', 'fr', 'Une fois une grande ville maritime, Liverpool dispose désormais de classe mondiale réunion lieux.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '624', 'fr', 'Une fois une grande ville maritime, Liverpool dispose désormais de classe mondiale conférence lieux.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '624', 'fr', 'Une fois une grande ville maritime, Liverpool dispose désormais de classe mondiale formation lieux.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '624', 'fr', 'Une fois une grande ville maritime, Liverpool dispose désormais de classe mondiale coworking lieux.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '624', 'fr', 'Une fois une grande ville maritime, Liverpool dispose désormais de classe mondiale événement lieux.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '624', 'de', 'Wenn eine große maritime Stadt, Liverpool verfügt nun über Weltklasse Tagungs.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '624', 'de', 'Wenn eine große maritime Stadt, Liverpool verfügt nun über Weltklasse Konferenzen.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '624', 'de', 'Wenn eine große maritime Stadt, Liverpool verfügt nun über Weltklasse Schulungen.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '624', 'de', 'Wenn eine große maritime Stadt, Liverpool verfügt nun über Weltklasse coworkings.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '624', 'de', 'Wenn eine große maritime Stadt, Liverpool verfügt nun über Weltklasse Veranstaltung.', '/css/images/home/top_locations/liverpool.jpg', '', '4', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '950', 'en', 'Choose from the many meeting rooms in Sheffield\'s city centre and along the River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '950', 'en', 'Choose from the many conference rooms in Sheffield\'s city centre and along the River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '950', 'en', 'Choose from the many training rooms in Sheffield\'s city centre and along the River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '950', 'en', 'Choose from the many coworking rooms in Sheffield\'s city centre and along the River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '950', 'en', 'Choose from the many event rooms in Sheffield\'s city centre and along the River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '950', 'fr', 'Choisissez parmi les nombreux réunion lieux dans le centre-ville de Sheffield et le long de la Rivière Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '950', 'fr', 'Choisissez parmi les nombreux conférence lieux dans le centre-ville de Sheffield et le long de la Rivière Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '950', 'fr', 'Choisissez parmi les nombreux formation lieux dans le centre-ville de Sheffield et le long de la Rivière Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '950', 'fr', 'Choisissez parmi les nombreux coworking lieux dans le centre-ville de Sheffield et le long de la Rivière Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '950', 'fr', 'Choisissez parmi les nombreux événement lieux dans le centre-ville de Sheffield et le long de la Rivière Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '950', 'de', 'Wählen Sie aus den vielen Tagungs in Sheffield Stadtzentrum und entlang des River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '950', 'de', 'Wählen Sie aus den vielen Konferenzen in Sheffield Stadtzentrum und entlang des River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '950', 'de', 'Wählen Sie aus den vielen Schulungen in Sheffield Stadtzentrum und entlang des River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '950', 'de', 'Wählen Sie aus den vielen coworkings in Sheffield Stadtzentrum und entlang des River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '950', 'de', 'Wählen Sie aus den vielen Veranstaltung in Sheffield Stadtzentrum und entlang des River Sheaf.', '/css/images/home/top_locations/sheffield.jpg', '', '5', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '671', 'en', 'In the foothills of the Pennines, Bradford has many meeting rooms options to offer.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '671', 'en', 'In the foothills of the Pennines, Bradford has many conference rooms options to offer.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '671', 'en', 'In the foothills of the Pennines, Bradford has many training rooms options to offer.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '671', 'en', 'In the foothills of the Pennines, Bradford has many coworking rooms options to offer.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '671', 'en', 'In the foothills of the Pennines, Bradford has many event rooms options to offer.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '671', 'fr', 'Dans les contreforts des Pennines, Bradford a beaucoup d\'options réunion lieux à offrir.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '671', 'fr', 'Dans les contreforts des Pennines, Bradford a beaucoup d\'options conférence lieux à offrir.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '671', 'fr', 'Dans les contreforts des Pennines, Bradford a beaucoup d\'options formation lieux à offrir.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '671', 'fr', 'Dans les contreforts des Pennines, Bradford a beaucoup d\'options coworking lieux à offrir.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '671', 'fr', 'Dans les contreforts des Pennines, Bradford a beaucoup d\'options événement lieux à offrir.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '671', 'de', 'In den Ausläufern der Penninen, Bradford viele Tagungsort Optionen zu bieten hat.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '671', 'de', 'In den Ausläufern der Penninen, Bradford viele Konferenzen Optionen zu bieten hat.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '671', 'de', 'In den Ausläufern der Penninen, Bradford viele Schulungen Optionen zu bieten hat.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '671', 'de', 'In den Ausläufern der Penninen, Bradford viele coworkings Optionen zu bieten hat.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '671', 'de', 'In den Ausläufern der Penninen, Bradford viele Veranstaltung Optionen zu bieten hat.', '/css/images/home/top_locations/bradford.jpg', '', '6', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '643', 'en', 'Find meeting rooms throughout Edinburgh\'s medieval Old Town and elegant Georgian New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '643', 'en', 'Find conference rooms throughout Edinburgh\'s medieval Old Town and elegant Georgian New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '643', 'en', 'Find training rooms throughout Edinburgh\'s medieval Old Town and elegant Georgian New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '643', 'en', 'Find coworking rooms throughout Edinburgh\'s medieval Old Town and elegant Georgian New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '643', 'en', 'Find event rooms throughout Edinburgh\'s medieval Old Town and elegant Georgian New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '643', 'fr', 'Trouver réunion lieux à travers la vieille ville médiévale d\'Édimbourg et élégante nouvelle ville géorgienne.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '643', 'fr', 'Trouver conférence lieux à travers la vieille ville médiévale d\'Édimbourg et élégante nouvelle ville géorgienne.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '643', 'fr', 'Trouver formation lieux à travers la vieille ville médiévale d\'Édimbourg et élégante nouvelle ville géorgienne.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '643', 'fr', 'Trouver coworking lieux à travers la vieille ville médiévale d\'Édimbourg et élégante nouvelle ville géorgienne.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '643', 'fr', 'Trouver événement lieux à travers la vieille ville médiévale d\'Édimbourg et élégante nouvelle ville géorgienne.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '643', 'de', 'Finde Tagungs Orten in Edinburgh der mittelalterlichen Altstadt und eleganten georgianischen New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '643', 'de', 'Finde Konferenz Orten in Edinburgh der mittelalterlichen Altstadt und eleganten georgianischen New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '643', 'de', 'Finde Schulungen Orten in Edinburgh der mittelalterlichen Altstadt und eleganten georgianischen New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '643', 'de', 'Finde coworkings Orten in Edinburgh der mittelalterlichen Altstadt und eleganten georgianischen New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '643', 'de', 'Finde Veranstaltung Orten in Edinburgh der mittelalterlichen Altstadt und eleganten georgianischen New Town.', '/css/images/home/top_locations/edinburgh.jpg', '', '7', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '620', 'en', 'Famed for its Victorian and art nouveau architecture, those looking for a space for a meeting will be spoilt for choice with Glasgow\'s many conference centres, castles, museums and beautiful galleries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '620', 'en', 'Famed for its Victorian and art nouveau architecture, those looking for a space for a conference will be spoilt for choice with Glasgow\'s many conference centres, castles, museums and beautiful galleries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '620', 'en', 'Famed for its Victorian and art nouveau architecture, those looking for a space for a training will be spoilt for choice with Glasgow\'s many conference centres, castles, museums and beautiful galleries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '620', 'en', 'Famed for its Victorian and art nouveau architecture, those looking for a space for a coworking will be spoilt for choice with Glasgow\'s many conference centres, castles, museums and beautiful galleries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '620', 'en', 'Famed for its Victorian and art nouveau architecture, those looking for a space for an event will be spoilt for choice with Glasgow\'s many conference centres, castles, museums and beautiful galleries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '620', 'fr', 'Célèbre pour son architecture de nouveau victorienne et de l\'art, ceux qui recherchent un espace pour une réunion aura l\'embarras du choix avec de nombreuses conférences centres de Glasgow, des châteaux, des musées et de belles galeries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '620', 'fr', 'Célèbre pour son architecture de nouveau victorienne et de l\'art, ceux qui recherchent un espace pour une conférence aura l\'embarras du choix avec de nombreuses conférences centres de Glasgow, des châteaux, des musées et de belles galeries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '620', 'fr', 'Célèbre pour son architecture de nouveau victorienne et de l\'art, ceux qui recherchent un espace pour une formation aura l\'embarras du choix avec de nombreuses conférences centres de Glasgow, des châteaux, des musées et de belles galeries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '620', 'fr', 'Célèbre pour son architecture de nouveau victorienne et de l\'art, ceux qui recherchent un espace pour un coworking aura l\'embarras du choix avec de nombreuses conférences centres de Glasgow, des châteaux, des musées et de belles galeries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '620', 'fr', 'Célèbre pour son architecture de nouveau victorienne et de l\'art, ceux qui recherchent un espace pour un événement aura l\'embarras du choix avec de nombreuses conférences centres de Glasgow, des châteaux, des musées et de belles galeries.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '620', 'de', 'Bekannt für seine viktorianischen und Jugendstil-Architektur, die für einen Raum der Suche nach einem Treffen wird mit Glasgow viele Konferenzzentren, Schlösser, Museen und schöne Galerien die Qual der Wahl.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '620', 'de', 'Bekannt für seine viktorianischen und Jugendstil-Architektur, die für einen Raum der Suche nach einem Konferenz wird mit Glasgow viele Konferenzzentren, Schlösser, Museen und schöne Galerien die Qual der Wahl.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '620', 'de', 'Bekannt für seine viktorianischen und Jugendstil-Architektur, die für einen Raum der Suche nach einem Schulungen wird mit Glasgow viele Konferenzzentren, Schlösser, Museen und schöne Galerien die Qual der Wahl.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '620', 'de', 'Bekannt für seine viktorianischen und Jugendstil-Architektur, die für einen Raum der Suche nach einem Coworking wird mit Glasgow viele Konferenzzentren, Schlösser, Museen und schöne Galerien die Qual der Wahl.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '620', 'de', 'Bekannt für seine viktorianischen und Jugendstil-Architektur, die für einen Raum der Suche nach einem Veranstaltung wird mit Glasgow viele Konferenzzentren, Schlösser, Museen und schöne Galerien die Qual der Wahl.', '/css/images/home/top_locations/glasgow.jpg', 'large', '8', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '613', 'en', 'The UK\'s second biggest city, Manchester hosts a diverse range of meeting rooms and venues.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '613', 'en', 'The UK\'s second biggest city, Manchester hosts a diverse range of conference rooms and venues.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '613', 'en', 'The UK\'s second biggest city, Manchester hosts a diverse range of training rooms and venues.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '613', 'en', 'The UK\'s second biggest city, Manchester hosts a diverse range of coworking rooms and venues.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '613', 'en', 'The UK\'s second biggest city, Manchester hosts a diverse range of event rooms and venues.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '613', 'fr', 'Deuxième plus grande ville du Royaume-Uni, Manchester accueille un large éventail de salles de réunion.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '613', 'fr', 'Deuxième plus grande ville du Royaume-Uni, Manchester accueille un large éventail de salles de conférence.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '613', 'fr', 'Deuxième plus grande ville du Royaume-Uni, Manchester accueille un large éventail de salles de formation.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '613', 'fr', 'Deuxième plus grande ville du Royaume-Uni, Manchester accueille un large éventail de salles de coworking.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '613', 'fr', 'Deuxième plus grande ville du Royaume-Uni, Manchester accueille un large éventail de salles d\'événement.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '613', 'de', 'Die zweitgrößte Stadt Großbritanniens beherbergt Manchester ein vielfältiges Angebot an Tagungs.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '613', 'de', 'Die zweitgrößte Stadt Großbritanniens beherbergt Manchester ein vielfältiges Angebot an Konferenzräume.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '613', 'de', 'Die zweitgrößte Stadt Großbritanniens beherbergt Manchester ein vielfältiges Angebot an Schulungen.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '613', 'de', 'Die zweitgrößte Stadt Großbritanniens beherbergt Manchester ein vielfältiges Angebot an Coworking.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '613', 'de', 'Die zweitgrößte Stadt Großbritanniens beherbergt Manchester ein vielfältiges Angebot an Veranstaltung.', '/css/images/home/top_locations/manchester.jpg', '', '9', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '598', 'en', 'Bristol, South-West England\'s most populous city, has a great range of meeting rooms to choose from.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '598', 'en', 'Bristol, South-West England\'s most populous city, has a great range of conference rooms to choose from.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '598', 'en', 'Bristol, South-West England\'s most populous city, has a great range of training rooms to choose from.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '598', 'en', 'Bristol, South-West England\'s most populous city, has a great range of coworking rooms to choose from.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '598', 'en', 'Bristol, South-West England\'s most populous city, has a great range of event rooms to choose from.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '598', 'fr', 'Bristol, ville la plus peuplée du Sud-Ouest de l\'Angleterre, a une grande gamme de rencontrer lieux à choisir.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '598', 'fr', 'Bristol, ville la plus peuplée du Sud-Ouest de l\'Angleterre, a une grande gamme de conférence lieux à choisir.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '598', 'fr', 'Bristol, ville la plus peuplée du Sud-Ouest de l\'Angleterre, a une grande gamme de formation lieux à choisir.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '598', 'fr', 'Bristol, ville la plus peuplée du Sud-Ouest de l\'Angleterre, a une grande gamme de coworking lieux à choisir.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '598', 'fr', 'Bristol, ville la plus peuplée du Sud-Ouest de l\'Angleterre, a une grande gamme d\'événement lieux à choisir.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('2', '598', 'de', 'Bristol, South-West England bevölkerungsreichsten Stadt, hat eine große Auswahl an Tagungs zur Auswahl.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('3', '598', 'de', 'Bristol, South-West England bevölkerungsreichsten Stadt, hat eine große Auswahl an Konferenzräume zur Auswahl.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('4', '598', 'de', 'Bristol, South-West England bevölkerungsreichsten Stadt, hat eine große Auswahl an Schulungen zur Auswahl.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('5', '598', 'de', 'Bristol, South-West England bevölkerungsreichsten Stadt, hat eine große Auswahl an Coworking zur Auswahl.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');
INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`, `enabled`) VALUES ('6', '598', 'de', 'Bristol, South-West England bevölkerungsreichsten Stadt, hat eine große Auswahl an Veranstaltung zur Auswahl.', '/css/images/home/top_locations/bristol.jpg', '', '10', '1');

/*v1.21.4 release point 10/11/16 12:50*/

ALTER TABLE `dev`.`location_usage`
ADD COLUMN `title` VARCHAR(1000) NULL AFTER `lang_code`;
ALTER TABLE `dev`.`location_usage` CHANGE `h2` `h2` VARCHAR(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;
ALTER TABLE `dev`.`location_usage` CHANGE `h1` `h1` VARCHAR(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;

update `dev`.`location_usage` lu join `dev`.`usageSupersets` us on lu.usageSuperset_id =us.id join `dev`.`locations` l on l.id=lu.location_id
set lu.h1 = concat(us.desc, ' in <strong>',l.human_desc,'</strong>'),
lu.h2=concat('Find & ',if(us.id=5,'Rent ','Hire '), '1000+ ',us.desc, ' in ', l.human_desc, if((l.parent_id=0),'',concat(', ', (select human_desc from `dev`.`locations` where id=l.parent_id)))),
lu.title=concat(l.venue_count,' in ',l.human_desc,if((l.parent_id=0),'',concat(', ', (select human_desc from `dev`.`locations` where id=l.parent_id))),' - Zipcube.com');

/*v1.21.7 release point 11/11/16 19:10*/

ALTER TABLE `dev`.`bookings`
ADD COLUMN `switch_datetime` DATETIME NULL DEFAULT NULL AFTER `requires_switch`;

update `dev`.`location_usage` lu join `dev`.`usageSupersets` us on lu.usageSuperset_id =us.id join `dev`.`locations` l on l.id=lu.location_id
set
lu.title=concat(us.short_desc,' in ',l.human_desc,if((l.parent_id=0),'',concat(', ', (select human_desc from `dev`.`locations` where id=l.parent_id))),' - Best Price Guarantee - Zipcube.com');

/*v1.21.9 release point 16/11/16 15:30*/

ALTER TABLE `dev`.`reservations`
ADD COLUMN `extra_fee` DECIMAL(10,4) NULL DEFAULT NULL AFTER `toVenue`;

ALTER TABLE `dev`.`reservations`
ADD COLUMN `token` VARCHAR(32) NULL AFTER `hubspot_id`;

ALTER TABLE `dev`.`reservations` ADD UNIQUE(`token`);

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('accept_requests', 'accept_decline_token', 'en', 'Accept/Decline request - Zipcube');

/*v1.22 release point 21/11/16 10:30*/

ALTER TABLE `dev`.`assetPhotos`
ADD COLUMN `url` VARCHAR(45) NULL DEFAULT NULL AFTER `comments`;

ALTER TABLE `dev`.`venues`
DROP FOREIGN KEY `venue_cancel_type_id`;
ALTER TABLE `dev`.`venues`
CHANGE COLUMN `cancellation_type_id` `cancellation_type_id_old` INT(11) UNSIGNED NULL DEFAULT NULL;
ALTER TABLE `dev`.`venues`
ADD CONSTRAINT `venue_cancel_type_id`
  FOREIGN KEY (`cancellation_type_id_old`)
  REFERENCES `dev`.`cancellation_types` (`id`);

ALTER TABLE `dev`.`assetPhotos`
DROP COLUMN `url`;

ALTER TABLE `dev`.`venues`
ADD COLUMN `address_extras` VARCHAR(100) NULL DEFAULT NULL AFTER `long`;

ALTER TABLE `dev`.`venues`
DROP FOREIGN KEY `venue_open_type_id`;
ALTER TABLE `dev`.`venues`
CHANGE COLUMN `opening_type_id` `opening_type_id_old` INT(11) UNSIGNED NULL DEFAULT NULL;
ALTER TABLE `dev`.`venues`
ADD CONSTRAINT `venue_open_type_id`
  FOREIGN KEY (`opening_type_id_old`)
  REFERENCES `dev`.`opening_types` (`id`);

ALTER TABLE `dev`.`rooms`
ADD COLUMN `num_of_desks` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `currency`,
ADD COLUMN `size` DECIMAL(10,2) NULL DEFAULT NULL AFTER `num_of_desks`,
ADD COLUMN `size_units` ENUM('m2', 'f2') NULL DEFAULT NULL AFTER `size`;

CREATE TABLE `dev`.`monthRates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `asset_id` int(11) unsigned NOT NULL,
  `month_rate` DECIMAL(10,4) NULL DEFAULT NULL,
  `minimum_term` int(11) unsigned DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `month_asset_id_idx` (`asset_id` ASC),
  CONSTRAINT `month_asset_id`
    FOREIGN KEY (`asset_id`)
    REFERENCES `dev`.`assetAudit` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `dev`.`room_incentives` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `room_id` INT(11) UNSIGNED NOT NULL,
  `term` ENUM('3 months', '6 months', '1 year') NULL DEFAULT NULL,
  `discount` DECIMAL(10,4) NULL DEFAULT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `inc_room_id_idx` (`room_id` ASC),
  CONSTRAINT `inc_room_id`
    FOREIGN KEY (`room_id`)
    REFERENCES `dev`.`rooms` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

ALTER TABLE `dev`.`dayRates`
ADD COLUMN `halfday_rate` DECIMAL(10,4) NULL DEFAULT NULL AFTER `standard_day_rate`,
ADD COLUMN `minimum_spend` DECIMAL(10,4) NULL DEFAULT NULL AFTER `daily_delegate_rate`;

UPDATE `dev`.`usages` SET `enabled`='0' WHERE `id`='2';
UPDATE `dev`.`usages` SET `desc`='Open Desk' WHERE `id`='5';
UPDATE `dev`.`usages` SET `desc`='Event Function' WHERE `id`='6';
UPDATE `dev`.`usages` SET `enabled`='0' WHERE `id`='7';
UPDATE `dev`.`usages` SET `enabled`='0' WHERE `id`='8';
UPDATE `dev`.`usages` SET `enabled`='0' WHERE `id`='9';
UPDATE `dev`.`usages` SET `enabled`='0' WHERE `id`='10';
UPDATE `dev`.`usages` SET `enabled`='0' WHERE `id`='11';
INSERT INTO `dev`.`usages` (`desc`, `enabled`) VALUES ('Training Room', '1');
INSERT INTO `dev`.`usages` (`desc`, `enabled`) VALUES ('Private Desk', '1');
INSERT INTO `dev`.`usages` (`desc`, `enabled`) VALUES ('Dedicated Desk', '1');

CREATE TABLE `dev`.`room_suitability` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `room_id` INT(11) NOT NULL,
  `suitable` ENUM('a', 'b', 'c') NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('venues', 'venue_listing', 'en', 'List Your Venue - Zipcube', 'List your venue on Zipcube.com', 'List Your Venue');

CREATE TABLE `dev`.`spacetypes` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `typedesc` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

INSERT INTO `dev`.`spacetypes` (`typedesc`) VALUES ('Hourly/Daily');
INSERT INTO `dev`.`spacetypes` (`typedesc`) VALUES ('Monthly');

CREATE TABLE `dev`.`usage_spacetypes` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `usage_id` INT(11) NOT NULL,
  `spacetype_id` INT(11) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

INSERT INTO `dev`.`usage_spacetypes` (`usage_id`, `spacetype_id`) VALUES ('3', '1');
INSERT INTO `dev`.`usage_spacetypes` (`usage_id`, `spacetype_id`) VALUES ('12', '1');
INSERT INTO `dev`.`usage_spacetypes` (`usage_id`, `spacetype_id`) VALUES ('4', '1');
INSERT INTO `dev`.`usage_spacetypes` (`usage_id`, `spacetype_id`) VALUES ('6', '1');
INSERT INTO `dev`.`usage_spacetypes` (`usage_id`, `spacetype_id`) VALUES ('5', '1');
INSERT INTO `dev`.`usage_spacetypes` (`usage_id`, `spacetype_id`) VALUES ('13', '1');
INSERT INTO `dev`.`usage_spacetypes` (`usage_id`, `spacetype_id`) VALUES ('14', '2');
INSERT INTO `dev`.`usage_spacetypes` (`usage_id`, `spacetype_id`) VALUES ('5', '2');
INSERT INTO `dev`.`usage_spacetypes` (`usage_id`, `spacetype_id`) VALUES ('1', '2');

CREATE TABLE `dev`.`room_favourites` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) UNSIGNED NOT NULL,
  `room_id` INT(11) UNSIGNED NOT NULL,
  `created` DATETIME NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fav_user_id_idx` (`user_id` ASC),
  INDEX `fav_room_id_idx` (`room_id` ASC),
  UNIQUE INDEX `fav_room_user` (`user_id` ASC, `room_id` ASC),
  CONSTRAINT `fav_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `dev`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fav_room_id`
    FOREIGN KEY (`room_id`)
    REFERENCES `dev`.`rooms` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

ALTER TABLE `dev`.`rooms`
ADD COLUMN `spacetype_id` INT(11) UNSIGNED NOT NULL DEFAULT '1' AFTER `hidden`,
ADD INDEX `room_spacetype_id_idx` (`spacetype_id` ASC);
ALTER TABLE `dev`.`rooms`
ADD CONSTRAINT `room_spacetype_id`
  FOREIGN KEY (`spacetype_id`)
  REFERENCES `dev`.`spacetypes` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`room_suitability`
CHANGE COLUMN `room_id` `room_id` INT(11) UNSIGNED NOT NULL ,
CHANGE COLUMN `suitable` `suitable_id` INT(11) UNSIGNED NOT NULL ,
ADD INDEX `roomsuit_suit_id_idx` (`suitable_id` ASC),
ADD INDEX `roomsuit_room_id_idx` (`room_id` ASC);
ALTER TABLE `dev`.`room_suitability`
ADD CONSTRAINT `roomsuit_suit_id`
  FOREIGN KEY (`suitable_id`)
  REFERENCES `dev`.`suitabilities` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `roomsuit_room_id`
  FOREIGN KEY (`room_id`)
  REFERENCES `dev`.`rooms` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`room_suitability`
ADD UNIQUE INDEX `room_suit` (`room_id` ASC, `suitable_id` ASC);

CREATE TABLE `dev`.`suitabilities` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(45) NOT NULL,
  `usage_id` INT(11) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`suitabilities`
CHANGE COLUMN `usage_id` `usage_id` INT(11) UNSIGNED NOT NULL ,
ADD INDEX `suit_usage_id_idx` (`usage_id` ASC);
ALTER TABLE `dev`.`suitabilities`
ADD CONSTRAINT `suit_usage_id`
  FOREIGN KEY (`usage_id`)
  REFERENCES `dev`.`usages` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`room_incentives`
CHANGE COLUMN `term` `month_terms` INT(11) UNSIGNED NULL DEFAULT NULL;

ALTER TABLE `dev`.`usage_spacetypes`
CHANGE COLUMN `usage_id` `usage_id` INT(11) UNSIGNED NOT NULL,
CHANGE COLUMN `spacetype_id` `spacetype_id` INT(11) UNSIGNED NOT NULL,
ADD INDEX `usagespace_usage_id_idx` (`usage_id` ASC),
ADD INDEX `usagespace_spacetype_id_idx` (`spacetype_id` ASC),
ADD UNIQUE INDEX `usage_spacetype` (`usage_id` ASC, `spacetype_id` ASC);
ALTER TABLE `dev`.`usage_spacetypes`
ADD CONSTRAINT `usagespace_usage_id`
  FOREIGN KEY (`usage_id`)
  REFERENCES `dev`.`usages` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `usagespace_spacetype_id`
  FOREIGN KEY (`spacetype_id`)
  REFERENCES `dev`.`spacetypes` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `dev`.`usage_configuration` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `usage_id` INT(11) UNSIGNED NOT NULL,
  `configuration_id` INT(11) UNSIGNED NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `usagecon_usage_id_idx` (`usage_id` ASC),
  INDEX `usagecon_con_id_idx` (`configuration_id` ASC),
  UNIQUE INDEX `usage_con` (`usage_id` ASC, `configuration_id` ASC),
  CONSTRAINT `usagecon_usage_id`
    FOREIGN KEY (`usage_id`)
    REFERENCES `dev`.`usages` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `usagecon_con_id`
    FOREIGN KEY (`configuration_id`)
    REFERENCES `dev`.`configurations` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

INSERT INTO `dev`.`configurations` (`desc`, `enabled`) VALUES ('Office', '1');
UPDATE `dev`.`configurations` SET `desc`='Desk' WHERE `id`='5';

INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('3', '1');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('3', '2');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('3', '3');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('3', '4');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('3', '6');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('3', '7');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('3', '8');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('4', '1');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('4', '2');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('4', '3');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('4', '4');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('4', '6');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('4', '7');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('4', '8');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('5', '5');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('1', '9');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('6', '3');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('6', '4');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('6', '6');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('6', '8');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('12', '1');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('12', '2');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('12', '3');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('12', '4');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('12', '6');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('12', '7');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('12', '8');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('13', '5');
INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('14', '5');

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `size_units` `size_units` ENUM('m2', 'ft2') NULL DEFAULT NULL;

UPDATE `dev`.`metas` SET `method_name`='listings' WHERE `id`='31';
UPDATE `dev`.`metas` SET `title`='Your Listings' WHERE `id`='31';

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `roomsViewed` VARCHAR(250) NULL DEFAULT NULL AFTER `deskCount`;

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('rooms', 'room_listing', 'en', 'List Your Room - Zipcube', 'List your room on Zipcube.com', 'List your Room');

ALTER TABLE `dev`.`enquiries`
DROP FOREIGN KEY `enquiry_room_id`;
ALTER TABLE `dev`.`enquiries`
CHANGE COLUMN `room_id` `room_id` INT(11) UNSIGNED NULL ;
ALTER TABLE `dev`.`enquiries`
ADD CONSTRAINT `enquiry_room_id`
  FOREIGN KEY (`room_id`)
  REFERENCES `dev`.`rooms` (`id`);

ALTER TABLE `dev`.`room_bookingType`
DROP INDEX `combo_UNIQUE`,
ADD UNIQUE INDEX `combo_UNIQUE` (`asset_id` ASC, `bookingType_id` ASC);

INSERT INTO `dev`.`room_bookingType` (`asset_id`, `bookingType_id`)
SELECT DISTINCT allrooms.asset_id, 3 FROM (SELECT `rooms`.`id`, `rooms`.`asset_id` FROM `dev`.`rooms` INNER JOIN `dev`.`room_bookingType` ON `room_bookingType`.`asset_id`=`rooms`.`asset_id`) allrooms
LEFT JOIN (SELECT `rooms`.`id` FROM `dev`.`rooms`
INNER JOIN `dev`.`room_bookingType` ON `room_bookingType`.`asset_id`=`rooms`.`asset_id`
WHERE `room_bookingType`.`bookingType_id` = 3) missingmeeting
ON allrooms.id=missingmeeting.id
WHERE missingmeeting.id IS NULL;

INSERT IGNORE INTO `dev`.`room_bookingType` (`asset_id`, `bookingType_id`)
SELECT DISTINCT allrooms.asset_id, `configuration_id` FROM (SELECT `rooms`.`id`, `rooms`.`asset_id` FROM `dev`.`rooms` INNER JOIN `dev`.`room_bookingType` ON `room_bookingType`.`asset_id`=`rooms`.`asset_id`) allrooms
INNER JOIN (SELECT `asset_id`, `configuration_id` FROM `dev`.`room_configuration` GROUP BY `asset_id` HAVING COUNT(`configuration_id`) = 1) hotdeskrooms ON allrooms.asset_id=hotdeskrooms.asset_id
WHERE configuration_id=5;

UPDATE `dev`.`room_bookingType` SET `enabled`=0 WHERE `bookingType_id` not in (3,5);

UPDATE `dev`.`room_bookingType`
INNER JOIN (SELECT `asset_id`, COUNT(`bookingType_id`)
FROM `dev`.`room_bookingType`
WHERE `enabled`=1
GROUP BY `asset_id`
HAVING COUNT(`bookingType_id`) > 1) alias ON `room_bookingType`.`asset_id`=alias.asset_id
SET `enabled`=0
WHERE `enabled`=1 AND `bookingType_id`=3;

INSERT INTO `dev`.`suitabilities` (`id`, `desc`, `usage_id`, `enabled`) VALUES ('1', 'Meetings', '3', '1');
INSERT INTO `dev`.`suitabilities` (`id`, `desc`, `usage_id`, `enabled`) VALUES ('2', 'Conferences', '4', '1');
INSERT INTO `dev`.`suitabilities` (`id`, `desc`, `usage_id`, `enabled`) VALUES ('3', 'Events', '6', '1');
INSERT INTO `dev`.`suitabilities` (`id`, `desc`, `usage_id`, `enabled`) VALUES ('4', 'Functions', '6', '1');
INSERT INTO `dev`.`suitabilities` (`id`, `desc`, `usage_id`, `enabled`) VALUES ('5', 'Training', '12', '1');

UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/london.jpg' WHERE `location_id`=2;
UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/birmingham.jpg' WHERE `location_id`=623;
UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/leeds.jpg' WHERE `location_id`=601;
UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/liverpool.jpg' WHERE `location_id`=624;
UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/sheffield.jpg' WHERE `location_id`=950;
UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/bradford.jpg' WHERE `location_id`=671;
UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/edinburgh.jpg' WHERE `location_id`=643;
UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/glasgow.jpg' WHERE `location_id`=620;
UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/manchester.jpg' WHERE `location_id`=613;
UPDATE `dev`.`popularlocations` SET img='/css/images/home/top_locations/bristol.jpg' WHERE `location_id`=598;

/*v1.23 release point 22/11/16 19:30*/

ALTER TABLE `dev`.`spacetypes`
RENAME TO `dev`.`spaceTypes`;

/*v1.23.3 release point 23/11/16 14:30*/

ALTER TABLE `dev`.`cancellation_types`
CHANGE COLUMN `cancel_percent` `cancel_percent` DECIMAL(10,2) UNSIGNED NOT NULL ;

UPDATE `dev`.`cancellation_types` SET `cancel_percent`='50.00' WHERE `id`='3';
UPDATE `dev`.`cancellation_types` SET `cancel_percent`='100.00' WHERE `id`='2';
UPDATE `dev`.`cancellation_types` SET `cancel_percent`='100.00' WHERE `id`='1';

INSERT INTO `dev`.`asset_amenity` (`asset_id`, `amenity_id`, `available`)
SELECT `rooms`.`asset_id`, venue_amenity.`amenity_id`, venue_amenity.`available` FROM `dev`.`rooms`
LEFT JOIN `asset_amenity` ON `asset_amenity`.`asset_id`=`rooms`.`asset_id`
INNER JOIN `venues` ON `rooms`.`venue_id`=`venues`.`id`
INNER JOIN `asset_amenity` AS venue_amenity ON venue_amenity.`asset_id`=`venues`.`asset_id`
WHERE `asset_amenity`.`asset_id` IS NULL;

update `dev`.`location_usage` lu
set lu.title=if (length(lu.title)>55, REPLACE(lu.title,' Best Price Guarantee -',''),lu.title);

/*v1.23.6 release point 24/11/16 12:50*/

update `dev`.`metas`
set `title` ="Book Meeting Rooms & Conference Venues Online - Zipcube",
`meta_description`='Welcome to Zipcube, the first name in meeting bookings. Browse over 18,000 meeting rooms, conference venues and find the guaranteed best price on meeting room hire.',
`meta_keyword`='meeting rooms, meeting room hire, book meeting room, conference venues, conference rooms, coworking, desks, hot desks, function rooms, meeting space'
where `controller_name`='home' and method_name='index';

/*v1.23.9 release point 24/11/16 12:50*/

update `dev`.`metas` set `meta_og_locale`='en-gb' where `lang_code`='en';

ALTER TABLE `dev`.`usages`
ADD COLUMN `ordering` INT(11) NOT NULL AFTER `desc`;

UPDATE `dev`.`usages` SET `ordering`='1' WHERE `id`='3';
UPDATE `dev`.`usages` SET `ordering`='2' WHERE `id`='4';
UPDATE `dev`.`usages` SET `ordering`='3' WHERE `id`='12';
UPDATE `dev`.`usages` SET `ordering`='4' WHERE `id`='6';
UPDATE `dev`.`usages` SET `ordering`='5' WHERE `id`='5';
UPDATE `dev`.`usages` SET `ordering`='6' WHERE `id`='13';
UPDATE `dev`.`usages` SET `ordering`='7' WHERE `id`='14';
UPDATE `dev`.`usages` SET `ordering`='8' WHERE `id`='1';

/*v1.23.11 release point 24/11/16 12:15*/

ALTER TABLE `dev`.`location_usages_rooms`
ADD COLUMN `enable_description` TINYINT(1) NULL DEFAULT 0 AFTER `room_id`,
ADD COLUMN `enable_company_name` TINYINT(1) NULL DEFAULT 0 AFTER `enable_description`;

CREATE TABLE `dev`.`amenities_usage` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `amenity_id` INT(11) UNSIGNED NOT NULL,
  `usage_id` INT(11) UNSIGNED NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `amenity_usage` (`amenity_id` ASC, `usage_id` ASC),
  INDEX `amen_usage_amen_id_idx` (`amenity_id` ASC),
  INDEX `amen_usage_usage_id_idx` (`usage_id` ASC),
  CONSTRAINT `amen_usage_amen_id`
    FOREIGN KEY (`amenity_id`)
    REFERENCES `dev`.`amenities` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `amen_usage_usage_id`
    FOREIGN KEY (`usage_id`)
    REFERENCES `dev`.`usages` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 1, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1;

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 15, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1;

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 22, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1;

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 23, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1;

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 18, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1 AND `id` not in (5, 13, 14);

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 19, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1 AND `id` not in (5, 13, 14);

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 20, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1 AND `id` not in (5, 13, 14);

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 24, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1 AND `id` not in (1, 5, 13, 14);

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 25, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1 AND `id` not in (1, 5, 13, 14);

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 26, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1 AND `id` not in (5, 13, 14);

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 27, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1 AND `id` not in (1, 5, 13, 14);

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 28, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1 AND `id` not in (1, 5, 13, 14);

INSERT INTO `dev`.`amenities_usage` (`amenity_id`, `usage_id`)
SELECT 32, `usages`.`id` FROM `dev`.`usages` WHERE `enabled` = 1 AND `id` not in (1, 5, 13, 14);

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `size` `size` DECIMAL(10,4) NULL DEFAULT NULL;

/*v1.23.14 release point 28/11/16 17:00*/

UPDATE `dev`.`usageSupersets`
SET `enabled`=0
WHERE `id` in (1,7,8,9);

UPDATE `dev`.`usageSuperset_usage`
INNER JOIN `usageSupersets` ON `usageSupersets`.`id`=`usageSuperset_usage`.`usageSuperset_id`
SET `usageSuperset_usage`.`enabled`=0
WHERE `usageSupersets`.`enabled`=0;

UPDATE `dev`.`usageSuperset_usage`
SET `usageSuperset_usage`.`enabled`=0
WHERE `usageSuperset_id`=2 AND `usage_id` <> 3;

UPDATE `dev`.`usageSuperset_usage`
SET `usageSuperset_usage`.`enabled`=0
WHERE `usageSuperset_id`=3 AND `usage_id` <> 4;

UPDATE `dev`.`usageSuperset_usage`
SET `usageSuperset_usage`.`enabled`=0
WHERE `usageSuperset_id`=4;

INSERT INTO `dev`.`usageSuperset_usage` (`usageSuperset_id`, `usage_id`) VALUES (4, 12);

UPDATE `dev`.`usageSuperset_usage`
SET `usageSuperset_usage`.`enabled`=0
WHERE `usageSuperset_id`=5;

INSERT INTO `dev`.`usageSuperset_usage` (`usageSuperset_id`, `usage_id`) VALUES (5, 5);
INSERT INTO `dev`.`usageSuperset_usage` (`usageSuperset_id`, `usage_id`) VALUES (5, 13);
INSERT INTO `dev`.`usageSuperset_usage` (`usageSuperset_id`, `usage_id`) VALUES (5, 14);

UPDATE `dev`.`usageSuperset_usage`
SET `usageSuperset_usage`.`enabled`=0
WHERE `usageSuperset_id`=6 AND `usage_id` <> 6;

INSERT INTO `dev`.`usageSuperset_usage` (`usageSuperset_id`, `usage_id`) VALUES (10, 1);

/*v1.23.16 release point 29/11/16 19:30*/

ALTER TABLE `dev`.`enquiries`
DROP FOREIGN KEY `room_type_id`;
ALTER TABLE `dev`.`enquiries`
DROP COLUMN `usageSuperset_id`,
DROP INDEX `room_type_id`;

/*v1.23.18 release point 01/12/16 18:50*/

INSERT INTO `dev`.`usageSupersets` (`desc`, `short_desc`, `alias`, `user_visible`, `item_name`, `collective_title`, `bot_visible`, `enabled`) VALUES ('Private Offices', 'Private Offices', 'private-offices', '1', 'Private Office', 'Private Office', '0', '1');

INSERT INTO `dev`.`popularlocations` (`usage_superset_id`, `location_id`, `lang_code`, `desc_text`, `img`, `size`, `score`)
SELECT 10, `location_id`, `lang_code`, '', `img`, `size`, `score` FROM `dev`.`popularlocations` WHERE `usage_superset_id` = 2;

/*v1.24 release point 06/12/16 14:30*/

ALTER TABLE `dev`.`rooms`
ADD COLUMN `usage_id` INT(11) UNSIGNED NOT NULL DEFAULT '3' AFTER `spacetype_id`,
ADD INDEX `room_usage_id_idx` (`usage_id` ASC);
ALTER TABLE `dev`.`rooms`
ADD CONSTRAINT `room_usage_id`
  FOREIGN KEY (`usage_id`)
  REFERENCES `dev`.`usages` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

UPDATE `dev`.`rooms`
INNER JOIN `dev`.`room_bookingType` ON `rooms`.`asset_id`=`room_bookingType`.`asset_id`
SET `rooms`.`usage_id` = `room_bookingType`.`bookingType_id`
WHERE `room_bookingType`.`enabled` = 1;

ALTER TABLE `dev`.`room_bookingType`
RENAME TO  `dev`.`room_bookingType_old`;

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
SELECT 'search', 'browse_page', `lang_code`, `title`, `meta_description`, `meta_keyword` FROM `dev`.`metas` WHERE `controller_name`='home' AND `method_name` = 'index';

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('dashboard', 'favourites', 'en', 'Your Favourites - Zipcube', 'View your favourite spaces on Zipcube.com', 'Favourite Spaces');

UPDATE `dev`.`metas` SET `method_name`='listings', `title`='Your Listings - Zipcube' WHERE `id`='31';
DELETE FROM `dev`.`metas` WHERE `id`='32';
DELETE FROM `dev`.`metas` WHERE `id`='33';
DELETE FROM `dev`.`metas` WHERE `id`='30';
DELETE FROM `dev`.`metas` WHERE `id`='29';

/*v1.24.4 release point 09/12/16 17:10*/

DROP TABLE `dev`.`searchAudit`;

/*v1.24.7 release point 13/12/16 18:00*/

UPDATE `dev`.`rooms`
INNER JOIN `room_configuration` ON `rooms`.`asset_id`=`room_configuration`.`asset_id`
SET `rooms`.`num_of_desks` = `room_configuration`.`max_capacity`
WHERE `rooms`.`usage_id` in (5,13,14) AND `rooms`.`num_of_desks` IS NULL;

/*v1.24.14 release point 20/12/16 10:10*/

INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Conferences', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Wedding Receptions', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Wedding Ceremonies', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Asian Weddings', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Christmas Parties', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Birthday Parties', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Corporate Events', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Other Events', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Summer Parties', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Filming', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Commercial Photo Shoot', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Non-Commercial Photo Shoot', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Private Dining Room', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Semi-Private Area/Table', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Private Venue', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Banqueting', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Cinema', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Screening Room', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Rehearsals', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Exhibitions - Gallery', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Performances', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('Dance Practice', '6');
INSERT INTO `dev`.`suitabilities` (`desc`, `usage_id`) VALUES ('IT Training', '12');

/*v1.24.21 release point 29/12/16 15:15*/

ALTER TABLE `dev`.`popularlocations`
DROP FOREIGN KEY `pop_loc_usage_superset_id`;
ALTER TABLE `dev`.`popularlocations`
DROP COLUMN `size`,
CHANGE COLUMN `usage_superset_id` `usageSuperset_id` INT(11) UNSIGNED NOT NULL,
CHANGE COLUMN `score` `ordering` INT(11) NULL DEFAULT NULL;
ALTER TABLE `dev`.`popularlocations`
ADD CONSTRAINT `pop_loc_usage_superset_id`
  FOREIGN KEY (`usageSuperset_id`)
  REFERENCES `dev`.`usageSupersets` (`id`);

ALTER TABLE `dev`.`reservations`
ADD COLUMN `cancel_insurance_fee` DECIMAL(10,4) NULL DEFAULT NULL AFTER `extra_fee`;

ALTER TABLE `dev`.`rooms`
ADD COLUMN `cancel_insurance_percent` DECIMAL(10,4) NULL DEFAULT NULL AFTER `currency`;

ALTER TABLE `dev`.`rooms`
ADD COLUMN `cancel_insurance_enabled` TINYINT(1) NOT NULL DEFAULT 0 AFTER `cancel_insurance_percent`;

UPDATE `dev`.`metas` SET `controller_name`='administrator/rooms', `method_name`='index' WHERE `id`='8';
UPDATE `dev`.`metas` SET `controller_name`='administrator/rooms' WHERE `id`='9';

INSERT INTO `dev`.`usage_configuration` (`usage_id`, `configuration_id`) VALUES ('6', '1');

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `cancel_insurance_percent` `cancel_insurance_percent` DECIMAL(10,2) NULL DEFAULT NULL;

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `discount_applied` `discount_applied` DECIMAL(10,2) NULL DEFAULT NULL;

ALTER TABLE `dev`.`room_incentives`
CHANGE COLUMN `discount` `discount` DECIMAL(10,2) NULL DEFAULT NULL;

ALTER TABLE `dev`.`user_asset_members`
CHANGE COLUMN `discount` `discount` DECIMAL(10,2) NOT NULL DEFAULT '0.00';

ALTER TABLE `dev`.`venues`
ADD COLUMN `location_id` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `long`,
ADD INDEX `venue_location_id_idx` (`location_id` ASC);
ALTER TABLE `dev`.`venues`
ADD CONSTRAINT `venue_location_id`
  FOREIGN KEY (`location_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

UPDATE `dev`.`venues`
INNER JOIN
(SELECT `venues`.`id`, `locations`.`id` AS loc_id FROM `dev`.`venues`
INNER JOIN `locations` ON `locations`.`human_desc` = (CASE WHEN `venues`.`city` IS NOT NULL THEN `venues`.`city` ELSE (CASE WHEN `venues`.`town` IS NOT NULL THEN `venues`.`town` ELSE (CASE WHEN `venues`.`county` IS NOT NULL THEN `venues`.`county` END) END) END)
OR `locations`.`locality` = (CASE WHEN city IS NOT NULL THEN `venues`.`city` ELSE (CASE WHEN `venues`.`town` IS NOT NULL THEN `venues`.`town` ELSE (CASE WHEN county IS NOT NULL THEN `venues`.`county` END) END) END)
OR `locations`.`constituancy_unit` = (CASE WHEN `venues`.`city` IS NOT NULL THEN `venues`.`city` ELSE (CASE WHEN `venues`.`town` IS NOT NULL THEN `venues`.`town` ELSE (CASE WHEN `venues`.`county` IS NOT NULL THEN `venues`.`county` END) END) END)
AND `locations`.`country` = `venues`.`country_code`
AND `locations`.`bounds_sw_lat` <= `venues`.`lat`
AND `locations`.`bounds_ne_lat` >= `venues`.`lat`
AND `locations`.`bounds_sw_lon` <= `venues`.`long`
AND `locations`.`bounds_ne_lon` >= `venues`.`long`
GROUP BY venues.id
ORDER BY ABS(bounds_ne_lat - bounds_sw_lat) ASC, ABS(bounds_ne_lon - bounds_sw_lon) ASC) loc_venue
ON loc_venue.id=`venues`.`id`
SET `venues`.`location_id`=loc_venue.loc_id;

/*v1.25 release point 30/12/16 19:40*/

ALTER TABLE `dev`.`rooms`
ADD COLUMN `last_booked` DATETIME NULL DEFAULT NULL AFTER `updated`;

DROP TABLE `dev`.`addOns_old`;
DROP TABLE `dev`.`admin`;
DROP TABLE `dev`.`asset_amenity_old`;
DROP TABLE `dev`.`calendar`;
DROP TABLE `dev`.`faq`;
DROP TABLE `dev`.`metas_old`;
DROP TABLE `dev`.`page`;
DROP TABLE `dev`.`parkingTypes`;
DROP TABLE `dev`.`price`;
DROP TABLE `dev`.`profile_picture`;
DROP TABLE `dev`.`reservations_old`;
DROP TABLE `dev`.`room_audio_visual`;
DROP TABLE `dev`.`room_bookingType_old`;
DROP TABLE `dev`.`room_capacity`;
DROP TABLE `dev`.`room_catring`;
DROP TABLE `dev`.`room_environment`;
DROP TABLE `dev`.`temp_venues_to_companies`;
DROP TABLE `dev`.`user_notification`;

ALTER TABLE `dev`.`rooms`
DROP COLUMN `legacy_special_comments`,
DROP COLUMN `legacy_other_specification`,
DROP COLUMN `legacy_room_catering`,
DROP COLUMN `legacy_room_audio`,
DROP COLUMN `legacy_room_envior_att`,
DROP COLUMN `legacy_selltime_days`,
DROP COLUMN `legacy_selltime_status`,
DROP COLUMN `legacy_setuptime_hourse`,
DROP COLUMN `legacy_setuptime_status`,
DROP COLUMN `legacy_end_date`,
DROP COLUMN `legacy_start_date`,
DROP COLUMN `legacy_startend_status`,
DROP COLUMN `legacy_twosets_status`,
DROP COLUMN `legacy_selectall_status`,
DROP COLUMN `legacy_room_uses`,
DROP COLUMN `legacy_comm_trav`,
DROP COLUMN `legacy_min_stay`,
DROP COLUMN `legacy_neighbor`,
DROP COLUMN `legacy_manual`,
DROP COLUMN `legacy_sublet_enddate`,
DROP COLUMN `legacy_sublet_startdate`,
DROP COLUMN `legacy_sublet_status`,
DROP COLUMN `legacy_sublet_price`,
DROP COLUMN `legacy_price`,
DROP COLUMN `legacy_street_view`,
DROP COLUMN `legacy_capacity`,
DROP COLUMN `legacy_amenities`,
DROP COLUMN `legacy_bathrooms`,
DROP COLUMN `legacy_bed_type`,
DROP COLUMN `legacy_beds`,
DROP COLUMN `legacy_bedrooms`,
DROP COLUMN `legacy_room_type`,
DROP COLUMN `legacy_property_id`,
DROP COLUMN `legacy_room_cancel_days`,
DROP COLUMN `legacy_room_cancel_percent`,
DROP COLUMN `legacy_long`,
DROP COLUMN `legacy_lat`,
DROP COLUMN `legacy_directions`,
DROP COLUMN `legacy_exact`,
DROP COLUMN `legacy_address`,
DROP COLUMN `legacy_phone`,
DROP COLUMN `legacy_email`,
DROP COLUMN `legacy_user_id`,
DROP COLUMN `area`,
DROP COLUMN `room_edit`,
DROP COLUMN `room_agreement_upload`,
DROP COLUMN `room_agreement_status`,
DROP COLUMN `comm_host`,
DROP COLUMN `comm`;

ALTER TABLE `dev`.`venues`
DROP FOREIGN KEY `venue_open_type_id`,
DROP FOREIGN KEY `venue_location_id`,
DROP FOREIGN KEY `venue_cancel_type_id`;
ALTER TABLE `dev`.`venues`
DROP COLUMN `cancellation_type_id_old`,
DROP COLUMN `opening_type_id_old`,
DROP COLUMN `street_view`,
DROP COLUMN `directions`,
DROP COLUMN `parking`,
DROP COLUMN `location_id`,
DROP INDEX `venue_location_id_idx` ,
DROP INDEX `venue_cancel_type_id_idx` ,
DROP INDEX `venue_open_type_id_idx` ;

/*v1.26 release point 04/01/17 18:35*/

UPDATE `dev`.`metas` SET `controller_name`='dashboard' WHERE `id`='60';

/*v1.26.3 release point 09/01/17 18:25*/

ALTER TABLE `dev`.`paymentTypes`
DROP COLUMN `note`,
DROP COLUMN `currency`,
DROP COLUMN `fees`,
DROP COLUMN `arrives_on`,
DROP COLUMN `is_payout`,
DROP COLUMN `is_live`;

INSERT INTO `dev`.`paymentTypes` (`payment_name`, `enabled`) VALUES ('BACS', '1');

ALTER TABLE `dev`.`payments`
ADD COLUMN `paid_date` DATE NULL DEFAULT NULL AFTER `paymentStatus_id`,
ADD COLUMN `account` ENUM('ePayment', 'Active Saver') NULL DEFAULT NULL AFTER `paid_date`;

/*v1.26.4 release point 10/01/17 18:55*/

ALTER TABLE `dev`.`reservations`
ADD COLUMN `cancel_insurance_applied` TINYINT(1) NULL DEFAULT 0 AFTER `cancel_insurance_fee`;

/*v1.26.5 release point 12/01/17 15:00*/

ALTER TABLE `dev`.`rooms`
ADD COLUMN `zipcube_favourite` TINYINT(1) NOT NULL DEFAULT 0 AFTER `hidden`;

DROP TABLE `dev`.`location_usages_rooms`;
DROP TABLE `dev`.`location_usages_venues`;

UPDATE `dev`.`usageSupersets` SET `short_desc`='Office Space' WHERE `id`='10';
UPDATE `dev`.`usageSupersets` SET `short_desc`='Event/Function Spaces' WHERE `id`='6';
UPDATE `dev`.`usageSupersets` SET `short_desc`='Desks/Coworking' WHERE `id`='5';
UPDATE `dev`.`usageSupersets` SET `short_desc`='Conference Venue' WHERE `id`='3';

DELETE FROM `dev`.`usageSuperset_usage` WHERE `enabled`=0;

ALTER TABLE `dev`.`usages`
ADD COLUMN `collective_desc` VARCHAR(45) NOT NULL AFTER `desc`;

UPDATE `dev`.`usages` SET `collective_desc`='Office Space' WHERE `id`='1';
UPDATE `dev`.`usages` SET `collective_desc`='Meeting Rooms' WHERE `id`='3';
UPDATE `dev`.`usages` SET `collective_desc`='Conference Venues' WHERE `id`='4';
UPDATE `dev`.`usages` SET `collective_desc`='Event Spaces & Function Rooms' WHERE `id`='6';
UPDATE `dev`.`usages` SET `collective_desc`='Open Desks' WHERE `id`='5';
UPDATE `dev`.`usages` SET `collective_desc`='Training Rooms' WHERE `id`='12';
UPDATE `dev`.`usages` SET `collective_desc`='Private Desks' WHERE `id`='13';
UPDATE `dev`.`usages` SET `collective_desc`='Dedicated Desks' WHERE `id`='14';

ALTER TABLE `dev`.`usages`
CHANGE COLUMN `collective_desc` `collective_desc` VARCHAR(45) NULL DEFAULT NULL,
CHANGE COLUMN `ordering` `ordering` INT(11) NULL DEFAULT NULL;

UPDATE `dev`.`usages` SET `collective_desc`=NULL, `ordering`=NULL WHERE `enabled`=0;

UPDATE `dev`.`usages` SET `collective_desc`='Conference Rooms' WHERE `id`='4';

UPDATE `dev`.`usageSupersets` SET `short_desc`='Conference Rooms' WHERE `id`='3';

/*v1.26.11 release point 02/02/17 16:40*/

ALTER TABLE `dev`.`venues`
CHANGE COLUMN `name` `name` VARCHAR(60) NOT NULL;

ALTER TABLE `dev`.`usageSupersets`
ADD COLUMN `order` INT(2) NULL DEFAULT NULL AFTER `short_desc`;
UPDATE `dev`.`usageSupersets` SET `order` = 1 WHERE `id` = 2;
UPDATE `dev`.`usageSupersets` SET `order` = 3 WHERE `id` = 3;
UPDATE `dev`.`usageSupersets` SET `order` = 6 WHERE `id` = 4;
UPDATE `dev`.`usageSupersets` SET `order` = 4 WHERE `id` = 5;
UPDATE `dev`.`usageSupersets` SET `order` = 5 WHERE `id` = 6;
UPDATE `dev`.`usageSupersets` SET `order` = 2 WHERE `id` = 10;

/*v1.26.12 release point 02/02/17 16:40*/

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`)
SELECT `controller_name`, `method_name`, 'fr' FROM `dev`.`metas` WHERE `controller_name` not like '%administrator/%';

/*v1.26.14 release point 14/02/17 16:25*/

ALTER TABLE `dev`.`locations`
ADD COLUMN `bounds_distance` DECIMAL(10,2) NULL DEFAULT NULL AFTER `bounds_ne_lon`;

ALTER TABLE `dev`.`location_categories`
ADD COLUMN `default_bounds_distance` DECIMAL(10,2) NULL DEFAULT NULL AFTER `location_category`;

UPDATE `dev`.`location_categories` SET `default_bounds_distance`='20' WHERE `id`='2';
UPDATE `dev`.`location_categories` SET `default_bounds_distance`='0.5' WHERE `id`='3';
UPDATE `dev`.`location_categories` SET `default_bounds_distance`='0.5' WHERE `id`='4';
UPDATE `dev`.`location_categories` SET `default_bounds_distance`='1' WHERE `id`='5';

CREATE TABLE `dev`.`location_assets` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `location_id` INT(11) UNSIGNED NOT NULL,
  `usageSuperset_id` INT(11) UNSIGNED NOT NULL,
  `room_count` INT(11) UNSIGNED NULL DEFAULT NULL,
  `venue_count` INT(11) UNSIGNED NULL DEFAULT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `loc_room_usagesuperset_id_idx` (`usageSuperset_id` ASC),
  INDEX `loc_room_location_id_idx` (`location_id` ASC),
  CONSTRAINT `loc_room_usagesuperset_id`
    FOREIGN KEY (`usageSuperset_id`)
    REFERENCES `dev`.`usageSupersets` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `loc_room_location_id`
    FOREIGN KEY (`location_id`)
    REFERENCES `dev`.`locations` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

/*v1.26.21 release point 23/02/17 18:35*/

ALTER TABLE `dev`.`location_assets`
DROP COLUMN `venue_count`, RENAME TO `dev`.`location_rooms`;

/*v1.26.22 release point 24/02/17 13:35*/

ALTER TABLE `dev`.`dayRates`
DROP INDEX `asset_id` ,
ADD UNIQUE INDEX `asset_id` (`asset_id` ASC);

ALTER TABLE `dev`.`monthRates`
DROP INDEX `month_asset_id_idx` ,
ADD UNIQUE INDEX `month_asset_id_idx` (`asset_id` ASC);

INSERT INTO `dev`.`assetCommissions` (`asset_id`, `bookingChannel_id`, `commissionPercentage`)
SELECT `venues`.`asset_id`, `assetCommissions`.`bookingChannel_id`, `assetCommissions`.`commissionPercentage` FROM `dev`.`assetCommissions`
INNER JOIN `companies` ON `companies`.`asset_id`=`assetCommissions`.`asset_id`
INNER JOIN `venues` ON `companies`.`id`=`venues`.`company_id`;

DELETE `dev`.`assetCommissions` FROM `dev`.`assetCommissions`
INNER JOIN `companies` ON `companies`.`asset_id`=`assetCommissions`.`asset_id`;

ALTER TABLE `dev`.`rooms`
ADD COLUMN `sponsored` TINYINT(1) NOT NULL DEFAULT 0 AFTER `zipcube_favourite`;

ALTER TABLE `dev`.`venues`
ADD COLUMN `agree_to_list` TINYINT(1) NOT NULL DEFAULT '1' AFTER `website`;

ALTER TABLE `dev`.`reservations`
ADD COLUMN `requires_switch` TINYINT(1) NOT NULL DEFAULT '0' AFTER `token`,
ADD COLUMN `switch_datetime` DATETIME NULL DEFAULT NULL AFTER `requires_switch`;

UPDATE `dev`.`reservations`
INNER JOIN `bookings` ON `bookings`.`id`=`reservations`.`booking_id`
LEFT JOIN (SELECT MAX(`id`) AS resID, `booking_id` FROM `dev`.`reservations` GROUP BY `booking_id`) alias ON alias.booking_id=`bookings`.`id` AND alias.resID = `reservations`.`id`
SET `reservations`.`requires_switch`=1, `reservations`.`switch_datetime` = `bookings`.`switch_datetime`
WHERE `bookings`.`requires_switch`=1 AND alias.resID IS NULL AND reservationStatus_id not in (0, -1);

UPDATE `dev`.`reservations`
INNER JOIN `bookings` ON `bookings`.`id`=`reservations`.`booking_id`
SET `reservations`.`requires_switch`=1, `reservations`.`switch_datetime` = `bookings`.`switch_datetime`
WHERE bookings.requires_switch=1 AND reservations.requires_switch = 0
AND reservationStatus_id not in (7,8,9,10);

ALTER TABLE `dev`.`bookings`
DROP COLUMN `switch_datetime`,
DROP COLUMN `requires_switch`;

/*v1.26.23 release point 01/03/17 19:10*/

CREATE TABLE `analytics`.`tracking_cookies` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(45) NOT NULL,
  `ga_client_id` VARCHAR(45) NULL DEFAULT NULL,
  `user_id` INT(11) NULL DEFAULT NULL,
  `is_admin` TINYINT(1) NOT NULL DEFAULT '0',
  `fi_date` DATETIME NOT NULL,
  `fi_source` VARCHAR(255) NULL DEFAULT NULL,
  `fi_landing_page` VARCHAR(255) NULL DEFAULT NULL,
  `li_date` DATETIME NOT NULL,
  `li_source` VARCHAR(255) NULL DEFAULT NULL,
  `li_landing_page` VARCHAR(255) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `analytics`.`booking_confirmed` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `journey_token` VARCHAR(45) NOT NULL,
  `room_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `venue_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `language` VARCHAR(10) NULL DEFAULT NULL,
  `reservation_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`booking_confirmed`
ADD INDEX `booking_confirmed_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`booking_confirmed`
ADD CONSTRAINT `booking_confirmed_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `analytics`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`browse` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL DEFAULT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `language` VARCHAR(10) NULL DEFAULT NULL,
  `country` VARCHAR(10) NULL DEFAULT NULL,
  `booking_type` VARCHAR(45) NULL DEFAULT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`browse`
ADD INDEX `browse_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`browse`
ADD CONSTRAINT `browse_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `analytics`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`checkout` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL DEFAULT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `journey_token` VARCHAR(45) NOT NULL,
  `room_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `venue_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `booking_type` TINYINT(1) NULL DEFAULT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  `guests` INT(11) NULL DEFAULT NULL,
  `base_price` DECIMAL(10,4) NULL DEFAULT NULL,
  `language` VARCHAR(10) NULL DEFAULT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`checkout`
ADD INDEX `checkout_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`checkout`
ADD CONSTRAINT `checkout_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `analytics`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`home` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL DEFAULT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `language` VARCHAR(10) NULL DEFAULT NULL,
  `country` VARCHAR(10) NULL DEFAULT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`home`
ADD INDEX `home_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`home`
ADD CONSTRAINT `home_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `analytics`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`location` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL DEFAULT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `language` VARCHAR(10) NULL DEFAULT NULL,
  `country` VARCHAR(10) NULL DEFAULT NULL,
  `booking_type` VARCHAR(45) NULL DEFAULT NULL,
  `location` VARCHAR(45) NULL DEFAULT NULL,
  `parent_location` VARCHAR(45) NULL DEFAULT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`location`
ADD INDEX `location_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`location`
ADD CONSTRAINT `location_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `analytics`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`room` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL DEFAULT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `room_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `venue_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `language` VARCHAR(10) NULL DEFAULT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`room`
ADD INDEX `room_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`room`
ADD CONSTRAINT `room_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `analytics`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`search` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL DEFAULT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `language` VARCHAR(10) NULL DEFAULT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  `lat` DECIMAL(10,7) NULL DEFAULT NULL,
  `long` DECIMAL(10,7) NULL DEFAULT NULL,
  `ne_lon` DECIMAL(10,7) NULL DEFAULT NULL,
  `ne_lat` DECIMAL(10,7) NULL DEFAULT NULL,
  `sw_lon` DECIMAL(10,7) NULL DEFAULT NULL,
  `sw_lat` DECIMAL(10,7) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `time` INT(11) UNSIGNED NULL DEFAULT NULL,
  `duration` INT(11) UNSIGNED NULL DEFAULT NULL,
  `guests` INT(11) UNSIGNED NULL DEFAULT NULL,
  `no_of_desks` INT(11) UNSIGNED NULL DEFAULT NULL,
  `minimum_duration` INT(11) UNSIGNED NULL DEFAULT NULL,
  `min_price` INT(11) UNSIGNED NULL DEFAULT NULL,
  `max_price` INT(11) UNSIGNED NULL DEFAULT NULL,
  `live_bookings` TINYINT(1) UNSIGNED NULL DEFAULT NULL,
  `page` INT(11) UNSIGNED NULL DEFAULT NULL,
  `zoom` TINYINT(2) UNSIGNED NULL DEFAULT NULL,
  `widget_token` VARCHAR(45) NULL DEFAULT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`search`
ADD INDEX `search_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`search`
ADD CONSTRAINT `search_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `analytics`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`venue` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL DEFAULT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `venue_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `language` VARCHAR(10) NULL DEFAULT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`venue`
ADD INDEX `venue_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`venue`
ADD CONSTRAINT `venue_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `analytics`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`checkout_slots` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `checkout_log_id` INT(11) UNSIGNED NOT NULL,
  `start` INT(11) UNSIGNED NOT NULL,
  `end` INT(11) UNSIGNED NOT NULL,
  `period_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `checkout_log_id_idx` (`checkout_log_id` ASC),
  CONSTRAINT `checkout_log_id`
    FOREIGN KEY (`checkout_log_id`)
    REFERENCES `analytics`.`checkout` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `analytics`.`search_usages` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `search_log_id` INT(11) UNSIGNED NOT NULL,
  `usage_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `search_log_id_idx` (`search_log_id` ASC),
  CONSTRAINT `search_log_id`
    FOREIGN KEY (`search_log_id`)
    REFERENCES `analytics`.`search` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `analytics`.`search_configurations` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `search_log_id` INT(11) UNSIGNED NOT NULL,
  `configuration_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `search_config_log_id_idx` (`search_log_id` ASC),
  CONSTRAINT `search_config_log_id`
    FOREIGN KEY (`search_log_id`)
    REFERENCES `analytics`.`search` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `analytics`.`search_amenities` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `search_log_id` INT(11) UNSIGNED NOT NULL,
  `amenity_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ud_UNIQUE` (`id` ASC),
  INDEX `search_amenities_log_id_idx` (`search_log_id` ASC),
  CONSTRAINT `search_amenities_log_id`
    FOREIGN KEY (`search_log_id`)
    REFERENCES `analytics`.`search` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/analytics', 'index', 'en', 'Analytics Dashboard', 'Zipcube Analytics Dashboard', 'Zipcube Analytics Dashboard');

CREATE TABLE `analytics`.`adwords_log` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL DEFAULT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `campaign_id` BIGINT(18) UNSIGNED NULL DEFAULT NULL,
  `ad_group_id` BIGINT(18) UNSIGNED NULL DEFAULT NULL,
  `creative` BIGINT(18) UNSIGNED NULL DEFAULT NULL,
  `keyword` VARCHAR(255) NULL DEFAULT NULL,
  `target_id` VARCHAR(45) NULL DEFAULT NULL,
  `loc_interest_ms` INT(30) UNSIGNED NULL DEFAULT NULL,
  `loc_physical_ms` INT(30) UNSIGNED NULL DEFAULT NULL,
  `match_type` VARCHAR(45) NULL DEFAULT NULL,
  `network` VARCHAR(45) NULL DEFAULT NULL,
  `placement` VARCHAR(45) NULL DEFAULT NULL,
  `ad_position` VARCHAR(45) NULL DEFAULT NULL,
  `gclid` VARCHAR(255) NULL DEFAULT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`adwords_log`
ADD INDEX `adwords_log_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`adwords_log`
ADD CONSTRAINT `adwords_log_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `analytics`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`facebook_log` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NULL DEFAULT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `utm_source` VARCHAR(45) NULL DEFAULT NULL,
  `utm_campaign` VARCHAR(255) NULL DEFAULT NULL,
  `utm_medium` VARCHAR(45) NULL DEFAULT NULL,
  `utm_content` VARCHAR(45) NULL DEFAULT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `facebook_log_tracking_cookie_id_idx` (`tracking_cookie_id` ASC),
  CONSTRAINT `facebook_log_tracking_cookie_id`
    FOREIGN KEY (`tracking_cookie_id`)
    REFERENCES `analytics`.`tracking_cookies` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

ALTER TABLE `dev`.`journeyTokens`
ADD COLUMN `ga_clientId` VARCHAR(45) NULL DEFAULT NULL AFTER `token`;

ALTER TABLE `dev`.`gadcons`
ADD COLUMN `ga_clientId` VARCHAR(45) NOT NULL AFTER `gclid`;

CREATE TABLE `analytics`.`bot_log` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`tracking_cookies`
ADD COLUMN `fi_medium` VARCHAR(255) NULL DEFAULT NULL AFTER `fi_source`,
ADD COLUMN `li_medium` VARCHAR(255) NULL DEFAULT NULL AFTER `li_source`;

CREATE TABLE `analytics`.`email_campaign_log` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NOT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `utm_source` VARCHAR(255) NULL DEFAULT NULL,
  `utm_campaign` VARCHAR(255) NULL DEFAULT NULL,
  `utm_medium` VARCHAR(45) NULL DEFAULT NULL,
  `utm_term` VARCHAR(255) NULL DEFAULT NULL,
  `ct` VARCHAR(255) NULL DEFAULT NULL,
  `goal` VARCHAR(255) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`adwords_log`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL ;

ALTER TABLE `analytics`.`facebook_log`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL ;

CREATE TABLE `analytics`.`system_email_log` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NOT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `analytics`.`shared_link_log` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NOT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `sharing_admin_id` INT(11) UNSIGNED NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`tracking_cookies`
CHANGE COLUMN `fi_date` `fi_date` DATETIME NOT NULL AFTER `fi_landing_page`,
CHANGE COLUMN `li_date` `li_date` DATETIME NOT NULL AFTER `li_landing_page`,
ADD COLUMN `fi_session_id` VARCHAR(45) NOT NULL AFTER `is_admin`,
ADD COLUMN `li_session_id` VARCHAR(45) NOT NULL AFTER `fi_date`;

ALTER TABLE `analytics`.`tracking_cookies`
CHANGE COLUMN `fi_source` `fi_source` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `li_source` `li_source` VARCHAR(45) NULL DEFAULT NULL ,
ADD COLUMN `fi_source_url` VARCHAR(255) NULL DEFAULT NULL AFTER `fi_source`,
ADD COLUMN `li_source_url` VARCHAR(255) NULL DEFAULT NULL AFTER `li_source`;

ALTER TABLE `analytics`.`search`
ADD COLUMN `num_rooms` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `live_bookings`;

/*v1.26.25 release point 09/03/17 17:40*/

CREATE TABLE `analytics`.`url_logs` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(45) NOT NULL,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `url_log_tracking_cookie_id_idx` (`tracking_cookie_id` ASC),
  CONSTRAINT `url_log_tracking_cookie_id`
    FOREIGN KEY (`tracking_cookie_id`)
    REFERENCES `analytics`.`tracking_cookies` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

ALTER TABLE `analytics`.`url_logs`
CHANGE COLUMN `url` `landing_url` VARCHAR(500) NULL,
ADD COLUMN `referring_url` VARCHAR(500) NULL AFTER `tracking_cookie_id`;

CREATE TABLE `dev`.`home_locations` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(45) NOT NULL,
  `location_1_id` INT(11) UNSIGNED NOT NULL,
  `location_2_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `location_3_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `location_4_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));
ALTER TABLE `dev`.`home_locations`
ADD INDEX `home_loc_1_idx` (`location_1_id` ASC),
ADD INDEX `home_loc_2_idx` (`location_2_id` ASC),
ADD INDEX `home_loc_3_idx` (`location_3_id` ASC),
ADD INDEX `home_loc_4_idx` (`location_4_id` ASC);
ALTER TABLE `dev`.`home_locations`
ADD CONSTRAINT `home_loc_1`
  FOREIGN KEY (`location_1_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `home_loc_2`
  FOREIGN KEY (`location_2_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `home_loc_3`
  FOREIGN KEY (`location_3_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `home_loc_4`
  FOREIGN KEY (`location_4_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;
ALTER TABLE `dev`.`home_locations`
ADD COLUMN `main_location_id` INT(11) UNSIGNED NOT NULL AFTER `country`,
ADD INDEX `home_main_loc_idx` (`main_location_id` ASC);
ALTER TABLE `dev`.`home_locations`
ADD CONSTRAINT `home_main_loc`
  FOREIGN KEY (`main_location_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`home_locations`
RENAME TO  `dev`.`lang_locations`;

ALTER TABLE `dev`.`locations`
ADD COLUMN `requires_determiner` TINYINT(1) NOT NULL DEFAULT 0 AFTER `room_count`;

UPDATE `dev`.`locations` SET `requires_determiner`='1' WHERE `id`='1';

/*v1.26.26 release point 13/03/17 11:30*/

ALTER TABLE `analytics`.`tracking_cookies`
ADD COLUMN `fi_ip_address` VARCHAR(45) NOT NULL AFTER `is_admin`,
ADD COLUMN `fi_language` VARCHAR(45) NOT NULL AFTER `fi_ip_address`,
ADD COLUMN `fi_country` VARCHAR(45) NOT NULL AFTER `fi_language`;

/*v1.26.31 release point 16/03/17 11:33*/

ALTER TABLE `dev`.`profiles`
ADD COLUMN `phnum_search` VARCHAR(255) NULL DEFAULT NULL AFTER `phnum`;

UPDATE `dev`.`profiles` SET `phnum_search` = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(`phnum`, '(0)', ''), '(', ''), ')', ''), ' ', ''), '+', '');

/*v1.26.34 release point 22/03/17 18:50*/

CREATE TABLE `dev`.`enquiries_rooms` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `enquiry_id` INT(11) UNSIGNED NOT NULL,
  `room_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`enquiries_rooms`
ADD INDEX `enquiries_room_enquiry_id_idx` (`enquiry_id` ASC);
ALTER TABLE `dev`.`enquiries_rooms`
ADD CONSTRAINT `enquiries_room_enquiry_id`
  FOREIGN KEY (`enquiry_id`)
  REFERENCES `dev`.`enquiries` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `tracking_cookie_id` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `id`,
ADD COLUMN `user_id` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `tracking_cookie_id`;

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `dateFlexible` TINYINT(1) NOT NULL DEFAULT 0 AFTER `flexible`,
ADD COLUMN `location` VARCHAR(255) NULL DEFAULT NULL AFTER `duration`,
ADD COLUMN `timeDurationFlexible` TINYINT(1) NOT NULL DEFAULT 0 AFTER `dateFlexible`,
ADD COLUMN `locationFlexible` TINYINT(1) NOT NULL DEFAULT 0 AFTER `timeDurationFlexible`,
ADD COLUMN `multipleDates` TINYINT(1) NOT NULL DEFAULT 0 AFTER `locationFlexible`,
ADD COLUMN `assignedAdmin` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `user_phone`,
ADD COLUMN `guests` INT(11) NULL DEFAULT NULL AFTER `location`;

CREATE TABLE `dev`.`enquiries_configurations` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `enquiry_id` INT(11) UNSIGNED NOT NULL,
  `configuration_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `enquiries_configuration_enquiry_id_idx` (`enquiry_id` ASC),
  INDEX `enquiries_configuration_configuration_id_idx` (`configuration_id` ASC),
  CONSTRAINT `enquiries_configuration_enquiry_id`
    FOREIGN KEY (`enquiry_id`)
    REFERENCES `dev`.`enquiries` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `enquiries_configuration_configuration_id`
    FOREIGN KEY (`configuration_id`)
    REFERENCES `dev`.`configurations` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

ALTER TABLE `dev`.`enquiries_rooms`
DROP FOREIGN KEY `enquiries_room_enquiry_id`;
ALTER TABLE `dev`.`enquiries_rooms`
ADD INDEX `enquiries_rooms_room_id_idx` (`room_id` ASC);
ALTER TABLE `dev`.`enquiries_rooms`
ADD CONSTRAINT `enquiries_rooms_enquiry_id`
  FOREIGN KEY (`enquiry_id`)
  REFERENCES `dev`.`enquiries` (`id`),
ADD CONSTRAINT `enquiries_rooms_room_id`
  FOREIGN KEY (`room_id`)
  REFERENCES `dev`.`rooms` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`enquiries_configurations`
ADD COLUMN `enabled` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1 AFTER `configuration_id`;

ALTER TABLE `dev`.`enquiries_rooms`
ADD COLUMN `enabled` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1 AFTER `room_id`;

ALTER TABLE `dev`.`enquiries`
DROP FOREIGN KEY `enquiry_room_id`;
ALTER TABLE `dev`.`enquiries`
DROP INDEX `enquiry_room_id_idx` ;

INSERT INTO `dev`.`enquiries_rooms` (`room_id`, `enquiry_id`)
SELECT `room_id`, `id` FROM `enquiries`
WHERE `room_id` IS NOT NULL;

ALTER TABLE `dev`.`enquiries`
DROP COLUMN `room_id`;

/*v1.26.36 release point 30/03/17 11:37*/

UPDATE `dev`.`metas` SET `title`='Zipcube: Location de Salles de Réunion, Conférence, Formation et Séminaire', `meta_description`='Des réductions incroyables sur la location de salles de reunion, salles de conférences, salles de formation et séminaire. Reservez instantanément pour votre prochaine réunion à Paris, Bordeaux, Lyon, Marseille, Nantes, Lilles avec Zipcube.com. Consultez les avis clients et profitez du meilleur tarif garanti sur des hôtels pour tous budgets.' WHERE `id`='66';
UPDATE `dev`.`metas` SET `title`='Louez votre Salle de réunion, Salle de conférence, Bureaux gratuitement sur Zipcube.com', `meta_description`='Créez votre annonce et louez de votre salle en quelques clics. Salles de réunion, de conférence, Salles évènement et bureaux.' WHERE `id`='67';
UPDATE `dev`.`metas` SET `title`='Tableau de bord | Zipcube' WHERE `id`='68';
UPDATE `dev`.`metas` SET `title`='Boite de réception | Zipcube' WHERE `id`='69';
UPDATE `dev`.`metas` SET `title`='FAQ | Zipcube' WHERE `id`='85';
UPDATE `dev`.`metas` SET `title`='Conditions d\'utilisation | Zipcube' WHERE `id`='89';
UPDATE `dev`.`metas` SET `title`='S\'enregistrer | Zipcube' WHERE `id`='101';
UPDATE `dev`.`metas` SET `title`='Demande de nouveau mot de passe | Zipcube' WHERE `id`='99';
UPDATE `dev`.`metas` SET `title`='Connexion | Zipcube' WHERE `id`='98';
UPDATE `dev`.`metas` SET `title`='Avis client | Zipcube' WHERE `id`='97';
UPDATE `dev`.`metas` SET `title`='A propos de Zipcube | Zipcube' WHERE `id`='88';
UPDATE `dev`.`metas` SET `title`='Avis clients  | Lisez les avis de clients et faites le bon choix' WHERE `id`='77';
UPDATE `dev`.`metas` SET `title`='Confirmation de réservation | Zipcube' WHERE `id`='96';
UPDATE `dev`.`metas` SET `title`='Confirmation de réservation | Zipcube' WHERE `id`='94';
UPDATE `dev`.`metas` SET `title`='Confirmation de réservation | Zipcube' WHERE `id`='95';
UPDATE `dev`.`metas` SET `title`='Contacts | Zipcube' WHERE `id`='84';
UPDATE `dev`.`metas` SET `title`='Calendrier de Réservation | Zipcube' WHERE `id`='75';
UPDATE `dev`.`metas` SET `title`='Message | Zipcube' WHERE `id`='71';
UPDATE `dev`.`metas` SET `title`='Avis client | Zipcube' WHERE `id`='72';
UPDATE `dev`.`metas` SET `title`='Vos réservations | Zipcube' WHERE `id`='73';
UPDATE `dev`.`metas` SET `title`='Vos réservations | Zipcube' WHERE `id`='74';
UPDATE `dev`.`metas` SET `title`='Vos salles et espaces | Zipcube' WHERE `id`='76';
UPDATE `dev`.`metas` SET `title`='Requête de réservation | Zipcube' WHERE `id`='70';
UPDATE `dev`.`metas` SET `title`='About Zipcube | Zipcube' WHERE `id`='45';
UPDATE `dev`.`metas` SET `title`='Accepter/ Decliner la requête de réservation | Zipcube' WHERE `id`='103';
UPDATE `dev`.`metas` SET `title`='Accept/Decline request | Zipcube' WHERE `id`='60';
UPDATE `dev`.`metas` SET `title`='Changement de mot de passe | Zipcube' WHERE `id`='82';
UPDATE `dev`.`metas` SET `title`='Editer votre profil utilisateur | Zipcube' WHERE `id`='81';
UPDATE `dev`.`metas` SET `title`='Edit Profile - Account | Zipcube' WHERE `id`='38';
UPDATE `dev`.`metas` SET `title`='Widget - Account | Zipcube' WHERE `id`='40';
UPDATE `dev`.`metas` SET `title`='Widget - Comtpe | Zipcube' WHERE `id`='83';
UPDATE `dev`.`metas` SET `title`='Accès refusé | Zipcube' WHERE `id`='93';
UPDATE `dev`.`metas` SET `title`='Booking Confirmation | Zipcube' WHERE `id`='53';
UPDATE `dev`.`metas` SET `title`='Access Deny | Zipcube' WHERE `id`='50';
UPDATE `dev`.`metas` SET `title`='Contact Us | Zipcube' WHERE `id`='41';
UPDATE `dev`.`metas` SET `title`='Access Deny | Zipcube' WHERE `id`='49';
UPDATE `dev`.`metas` SET `title`='Accès refusé | Zipcube' WHERE `id`='92';
UPDATE `dev`.`metas` SET `title`='FAQs | Zipcube' WHERE `id`='42';
UPDATE `dev`.`metas` SET `title`='Your Favourites | Zipcube' WHERE `id`='64';
UPDATE `dev`.`metas` SET `title`='Vos favoris | Zipcube' WHERE `id`='107';
UPDATE `dev`.`metas` SET `title`='Rent your meeting rooms, conference rooms, desks and office space on Zipcube Accès refusé | Zipcube' WHERE `id`='2';
UPDATE `dev`.`metas` SET `title`='How it works | Zipcube' WHERE `id`='43';
UPDATE `dev`.`metas` SET `title`='How to share | Zipcube' WHERE `id`='44';
UPDATE `dev`.`metas` SET `title`='Comment ça marche? | Zipcube' WHERE `id`='86';
UPDATE `dev`.`metas` SET `title`='Comment partager votre salle ou espace de travail | Zipcube' WHERE `id`='87';
UPDATE `dev`.`metas` SET `title`='Inbox | Zipcube' WHERE `id`='22';
UPDATE `dev`.`metas` SET `title`='Admin  | Zipcube' WHERE `id`='3';
UPDATE `dev`.`metas` SET `title`='Confirm Your Booking  | Zipcube' WHERE `id`='51';
UPDATE `dev`.`metas` SET `title`='Access Deny  | Zipcube' WHERE `id`='48';
UPDATE `dev`.`metas` SET `title`='Dashboard  | Zipcube' WHERE `id`='21';
UPDATE `dev`.`metas` SET `title`='Landing Page | Zipcube' WHERE `id`='59';

UPDATE `dev`.`message_type` SET `url`='dashboard/message-request' WHERE `id`='1';
UPDATE `dev`.`message_type` SET `url`='dashboard/message-conversation' WHERE `id`='2';
UPDATE `dev`.`message_type` SET `url`='dashboard/message-conversation' WHERE `id`='3';
UPDATE `dev`.`message_type` SET `enabled`='0' WHERE `id`='4';
UPDATE `dev`.`message_type` SET `url`='dashboard/message-review' WHERE `id`='5';
UPDATE `dev`.`message_type` SET `url`='dashboard/message-conversation' WHERE `id`='6';

UPDATE `dev`.`messages` SET `enabled`='0' WHERE `message_type_id`='4';

ALTER TABLE `dev`.`users`
CHANGE COLUMN `language_pref` `language_pref` CHAR(5) NOT NULL DEFAULT 'en';

ALTER TABLE `dev`.`locations`
ADD COLUMN `formatted_addr` VARCHAR(255) NULL DEFAULT NULL AFTER `bounds_distance`;

ALTER TABLE `dev`.`locations`
CHANGE COLUMN `formatted_addr` `search_url` VARCHAR(255) NOT NULL AFTER `url_desc_long`;

CREATE TABLE `dev`.`usageSuperset_language` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `usageSuperset_id` INT(11) UNSIGNED NOT NULL,
  `lang_code` CHAR(5) NOT NULL,
  `alias` VARCHAR(45) NOT NULL,
  `desc` VARCHAR(45) NOT NULL,
  `short_desc` VARCHAR(45) NOT NULL,
  `item_name` VARCHAR(45) NOT NULL,
  `collective_title` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `usage_super_lang_superid_idx` (`usageSuperset_id` ASC),
  CONSTRAINT `usage_super_lang_superid`
    FOREIGN KEY (`usageSuperset_id`)
    REFERENCES `dev`.`usageSupersets` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `enabled`)
SELECT `id`, 'en', `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `enabled` FROM `dev`.`usageSupersets`;

INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `enabled`)
SELECT `id`, 'fr', `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `enabled` FROM `dev`.`usageSupersets`;

INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `enabled`)
SELECT `id`, 'en_US', `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `enabled` FROM `dev`.`usageSupersets`;

ALTER TABLE `dev`.`usageSuperset_language`
ADD COLUMN `default` TINYINT(1) NOT NULL DEFAULT 0 AFTER `collective_title`;

DROP TABLE `dev`.`locale_language`;

ALTER TABLE `dev`.`location_usage`
CHANGE COLUMN `lang_code` `lang_code` CHAR(5) NOT NULL;

ALTER TABLE `dev`.`metas`
CHANGE COLUMN `lang_code` `lang_code` CHAR(5) NOT NULL;

ALTER TABLE `dev`.`popularlocations`
CHANGE COLUMN `lang_code` `lang_code` CHAR(5) NOT NULL;

ALTER TABLE `dev`.`language`
CHANGE COLUMN `code` `code` CHAR(5) NOT NULL;

ALTER TABLE `dev`.`lang_locations`
RENAME TO  `dev`.`location_country_places`;

UPDATE `dev`.`metas` SET `controller_name`='pages' WHERE `method_name`='get_started';

/*v1.27 release point 31/03/17 11:00*/

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `potentialValue` DECIMAL(10,4) NULL DEFAULT NULL AFTER `hubspot_id`;

UPDATE `dev`.`metas` SET `meta_og_locale`='en_GB' WHERE `meta_og_locale`='en-gb';

ALTER TABLE `dev`.`metas`
DROP COLUMN `meta_og_locale`;

/*v1.27.1 release point 05/04/17 12:10*/

CREATE TABLE `dev`.`location_redirects` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `location_url` VARCHAR(45) NULL,
  `location_id` INT(11) UNSIGNED NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `loc_redirect_location_id_idx` (`location_id` ASC),
  CONSTRAINT `loc_redirect_location_id`
    FOREIGN KEY (`location_id`)
    REFERENCES `dev`.`locations` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

/*v1.27.2 release point 07/04/17 16:30*/

CREATE TABLE `dev`.`enquiries_status` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `status` INT(11) UNSIGNED NOT NULL DEFAULT 1 AFTER `roomsViewed`;

INSERT INTO `dev`.`enquiries_status` (`name`) VALUES ('Pending');
INSERT INTO `dev`.`enquiries_status` (`name`) VALUES ('Won');
INSERT INTO `dev`.`enquiries_status` (`name`) VALUES ('Lost');

ALTER TABLE `dev`.`enquiries`
ADD CONSTRAINT `enquiry_status_id`
  FOREIGN KEY (`status`)
  REFERENCES `dev`.`enquiries_status` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `reservation_id` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `status`;

ALTER TABLE `dev`.`enquiries`
ADD INDEX `enquiry_reservation_id_idx` (`reservation_id` ASC);
ALTER TABLE `dev`.`enquiries`
ADD CONSTRAINT `enquiry_reservation_id`
  FOREIGN KEY (`reservation_id`)
  REFERENCES `dev`.`reservations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

UPDATE `dev`.`users` SET `hubspot_id` = 15928984 WHERE `email` = 'alistair@zipcube.com';
UPDATE `dev`.`users` SET `hubspot_id` = 16768952 WHERE `email` = 'andrew@zipcube.com';
UPDATE `dev`.`users` SET `hubspot_id` = 13345998 WHERE `email` = 'guillaume@zipcube.com';
UPDATE `dev`.`users` SET `hubspot_id` = 17034160 WHERE `email` = 'paul@zipcube.com';
UPDATE `dev`.`users` SET `hubspot_id` = 13802188 WHERE `email` = 'suril@zipcube.com';
UPDATE `dev`.`users` SET `hubspot_id` = 14628026 WHERE `email` = 'info@zipcube.com';

/*v1.27.3 release point 11/04/17 10:43*/

ALTER TABLE `dev`.`enquiries`
DROP COLUMN `user_email`;

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `budget` DECIMAL(10,4) NULL DEFAULT NULL AFTER `hubspot_id`;

/*v1.27.5 release point 13/04/17 10:03*/

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `creator` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `user_phone`;

/*v1.27.7 release point 18/04/17 17:50*/

ALTER TABLE `dev`.`enquiries`
DROP COLUMN `tracking_cookie_id`;

/*v1.27.8 release point 21/04/17 09:30*/

ALTER TABLE `analytics`.`search`
ADD COLUMN `city` VARCHAR(255) NULL DEFAULT NULL AFTER `location`,
ADD COLUMN `country` VARCHAR(255) NULL DEFAULT NULL AFTER `city`;

ALTER TABLE `analytics`.`search`
CHANGE COLUMN `city` `locality` VARCHAR(255) NULL DEFAULT NULL AFTER `created`,
CHANGE COLUMN `country` `country` VARCHAR(255) NULL DEFAULT NULL AFTER `locality`,
ADD COLUMN `street_number` VARCHAR(255) NULL DEFAULT NULL AFTER `country`,
ADD COLUMN `route` VARCHAR(255) NULL DEFAULT NULL AFTER `street_number`,
ADD COLUMN `postal_town` VARCHAR(255) NULL DEFAULT NULL AFTER `route`,
ADD COLUMN `administrative_area_level_1` VARCHAR(255) NULL DEFAULT NULL AFTER `postal_town`,
ADD COLUMN `administrative_area_level_2` VARCHAR(255) NULL DEFAULT NULL AFTER `administrative_area_level_1`,
ADD COLUMN `administrative_area_level_3` VARCHAR(255) NULL DEFAULT NULL AFTER `administrative_area_level_2`,
ADD COLUMN `administrative_area_level_4` VARCHAR(255) NULL DEFAULT NULL AFTER `administrative_area_level_3`,
ADD COLUMN `administrative_area_level_5` VARCHAR(255) NULL DEFAULT NULL AFTER `administrative_area_level_4`,
ADD COLUMN `neighborhood` VARCHAR(255) NULL DEFAULT NULL AFTER `administrative_area_level_5`,
ADD COLUMN `premise` VARCHAR(255) NULL DEFAULT NULL AFTER `neighborhood`,
ADD COLUMN `subpremise` VARCHAR(255) NULL DEFAULT NULL AFTER `premise`,
ADD COLUMN `airport` VARCHAR(255) NULL DEFAULT NULL AFTER `subpremise`,
ADD COLUMN `point_of_interest` VARCHAR(255) NULL DEFAULT NULL AFTER `airport`,
ADD COLUMN `bus_station` VARCHAR(255) NULL DEFAULT NULL AFTER `point_of_interest`,
ADD COLUMN `train_station` VARCHAR(255) NULL DEFAULT NULL AFTER `bus_station`,
ADD COLUMN `transit_station` VARCHAR(255) NULL DEFAULT NULL AFTER `train_station`,
ADD COLUMN `postal_code` VARCHAR(255) NULL DEFAULT NULL AFTER `transit_station`,
ADD COLUMN `sublocality` VARCHAR(255) NULL DEFAULT NULL AFTER `postal_code`,
ADD COLUMN `sublocality_level_1` VARCHAR(255) NULL DEFAULT NULL AFTER `sublocality`,
ADD COLUMN `sublocality_level_2` VARCHAR(255) NULL DEFAULT NULL AFTER `sublocality_level_1`,
ADD COLUMN `sublocality_level_3` VARCHAR(255) NULL DEFAULT NULL AFTER `sublocality_level_2`,
ADD COLUMN `sublocality_level_4` VARCHAR(255) NULL DEFAULT NULL AFTER `sublocality_level_3`,
ADD COLUMN `sublocality_level_5` VARCHAR(255) NULL DEFAULT NULL AFTER `sublocality_level_4`,
ADD COLUMN `political` VARCHAR(255) NULL DEFAULT NULL AFTER `sublocality_level_5`,
ADD COLUMN `geocoded` TINYINT(1) NOT NULL DEFAULT 0 AFTER `political`;

CREATE TABLE `analytics`.`adwords_keywords` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `ccId` varchar(45) NOT NULL,
    `currency` VARCHAR(45) NULL DEFAULT NULL,
    `account` VARCHAR(45) NULL DEFAULT NULL,
    `timeZone` VARCHAR(45) NULL DEFAULT NULL,
    `activeViewAvgCPM` VARCHAR(45) NULL DEFAULT NULL,
    `activeViewViewableCTR` VARCHAR(45) NULL DEFAULT NULL,
    `activeViewViewableImpressions` VARCHAR(45) NULL DEFAULT NULL,
    `activeViewMeasurableImprImpr` VARCHAR(45) NULL DEFAULT NULL,
    `activeViewMeasurableCost` VARCHAR(45) NULL DEFAULT NULL,
    `activeViewMeasurableImpr` VARCHAR(45) NULL DEFAULT NULL,
    `activeViewViewableImprMeasurableImpr` VARCHAR(45) NULL DEFAULT NULL,
    `adGroupID` varchar(45) NULL DEFAULT NULL,
    `adGroup` VARCHAR(255) NULL DEFAULT NULL,
    `adGroupState` VARCHAR(45) NULL DEFAULT NULL,
    `network` VARCHAR(45) NULL DEFAULT NULL,
    `networkWithSearchPartners` VARCHAR(45) NULL DEFAULT NULL,
    `allConvRate` VARCHAR(45) NULL DEFAULT NULL,
    `allConv` VARCHAR(45) NULL DEFAULT NULL,
    `allConvValue` VARCHAR(45) NULL DEFAULT NULL,
    `approvalStatus` VARCHAR(45) NULL DEFAULT NULL,
    `avgCost` VARCHAR(45) NULL DEFAULT NULL,
    `avgCPC` VARCHAR(45) NULL DEFAULT NULL,
    `avgCPE` VARCHAR(45) NULL DEFAULT NULL,
    `avgCPM` VARCHAR(45) NULL DEFAULT NULL,
    `avgCPV` VARCHAR(45) NULL DEFAULT NULL,
    `pagesSession` VARCHAR(45) NULL DEFAULT NULL,
    `avgPosition` VARCHAR(45) NULL DEFAULT NULL,
    `avgSessionDurationSeconds` VARCHAR(45) NULL DEFAULT NULL,
    `baseAdGroupID` varchar(45) NULL DEFAULT NULL,
    `baseCampaignID` varchar(45) NULL DEFAULT NULL,
    `bidStrategyID` varchar(45) NULL DEFAULT NULL,
    `bidStrategyName` VARCHAR(45) NULL DEFAULT NULL,
    `biddingStrategySource` VARCHAR(45) NULL DEFAULT NULL,
    `bidStrategyType` VARCHAR(45) NULL DEFAULT NULL,
    `conversionOptimizerBidType` VARCHAR(45) NULL DEFAULT NULL,
    `bounceRate` VARCHAR(45) NULL DEFAULT NULL,
    `campaignID` varchar(45) NULL DEFAULT NULL,
    `campaign` VARCHAR(45) NULL DEFAULT NULL,
    `campaignState` VARCHAR(45) NULL DEFAULT NULL,
    `clickAssistedConv` VARCHAR(45) NULL DEFAULT NULL,
    `clickAssistedConvLastClickConv` VARCHAR(45) NULL DEFAULT NULL,
    `clickAssistedConvValue` VARCHAR(45) NULL DEFAULT NULL,
    `clicks` VARCHAR(45) NULL DEFAULT NULL,
    `clickType` VARCHAR(45) NULL DEFAULT NULL,
    `conversionCategory` VARCHAR(45) NULL DEFAULT NULL,
    `convRate` VARCHAR(45) NULL DEFAULT NULL,
    `conversions` VARCHAR(45) NULL DEFAULT NULL,
    `conversionTrackerId` VARCHAR(45) NULL DEFAULT NULL,
    `conversionName` VARCHAR(45) NULL DEFAULT NULL,
    `totalConvValue` VARCHAR(45) NULL DEFAULT NULL,
    `cost` VARCHAR(45) NULL DEFAULT NULL,
    `costAllConv` VARCHAR(45) NULL DEFAULT NULL,
    `costConv` VARCHAR(45) NULL DEFAULT NULL,
    `costConvCurrentModel` VARCHAR(45) NULL DEFAULT NULL,
    `maxCPC` VARCHAR(45) NULL DEFAULT NULL,
    `maxCPCSource` VARCHAR(45) NULL DEFAULT NULL,
    `maxCPM` VARCHAR(45) NULL DEFAULT NULL,
    `adRelevance` VARCHAR(45) NULL DEFAULT NULL,
    `keyword` VARCHAR(255) NULL DEFAULT NULL,
    `destinationURL` VARCHAR(45) NULL DEFAULT NULL,
    `crossDeviceConv` VARCHAR(45) NULL DEFAULT NULL,
    `ctr` VARCHAR(45) NULL DEFAULT NULL,
    `conversionsCurrentModel` VARCHAR(45) NULL DEFAULT NULL,
    `convValueCurrentModel` VARCHAR(45) NULL DEFAULT NULL,
    `clientName` VARCHAR(45) NULL DEFAULT NULL,
    `day` DATE NULL DEFAULT NULL,
    `dayOfWeek` VARCHAR(45) NULL DEFAULT NULL,
    `device` VARCHAR(45) NULL DEFAULT NULL,
    `engagementRate` VARCHAR(45) NULL DEFAULT NULL,
    `engagements` VARCHAR(45) NULL DEFAULT NULL,
    `enhancedCPCEnabled` VARCHAR(45) NULL DEFAULT NULL,
    `estAddClicksWkFirstPositionBid` VARCHAR(45) NULL DEFAULT NULL,
    `estAddCostWkFirstPositionBid` VARCHAR(45) NULL DEFAULT NULL,
    `conversionSource` VARCHAR(45) NULL DEFAULT NULL,
    `customerID` varchar(45) NULL DEFAULT NULL,
    `appFinalURL` VARCHAR(45) NULL DEFAULT NULL,
    `mobileFinalURL` VARCHAR(45) NULL DEFAULT NULL,
    `finalURL` VARCHAR(45) NULL DEFAULT NULL,
    `firstPageCPC` VARCHAR(45) NULL DEFAULT NULL,
    `firstPositionCPC` VARCHAR(45) NULL DEFAULT NULL,
    `gmailForwards` VARCHAR(45) NULL DEFAULT NULL,
    `gmailSaves` VARCHAR(45) NULL DEFAULT NULL,
    `gmailClicksToWebsite` VARCHAR(45) NULL DEFAULT NULL,
    `hasQualityScore` VARCHAR(45) NULL DEFAULT NULL,
    `keywordID` varchar(45) NULL DEFAULT NULL,
    `imprAssistedConv` VARCHAR(45) NULL DEFAULT NULL,
    `imprAssistedConvLastClickConv` VARCHAR(45) NULL DEFAULT NULL,
    `imprAssistedConvValue` VARCHAR(45) NULL DEFAULT NULL,
    `impressions` VARCHAR(45) NULL DEFAULT NULL,
    `interactionRate` VARCHAR(45) NULL DEFAULT NULL,
    `interactions` VARCHAR(45) NULL DEFAULT NULL,
    `interactionTypes` VARCHAR(45) NULL DEFAULT NULL,
    `isNegative` VARCHAR(45) NULL DEFAULT NULL,
    `matchType` VARCHAR(45) NULL DEFAULT NULL,
    `labelIDs` varchar(45) NULL DEFAULT NULL,
    `labels` VARCHAR(255) NULL DEFAULT NULL,
    `month` DATE NULL DEFAULT NULL,
    `monthOfYear` VARCHAR(45) NULL DEFAULT NULL,
    `newSessions` VARCHAR(45) NULL DEFAULT NULL,
    `landingPageExperience` VARCHAR(45) NULL DEFAULT NULL,
    `companyName` VARCHAR(45) NULL DEFAULT NULL,
    `qualityScore` VARCHAR(45) NULL DEFAULT NULL,
    `quarter` VARCHAR(45) NULL DEFAULT NULL,
    `searchExactMatchIS` VARCHAR(45) NULL DEFAULT NULL,
    `searchImprShare` VARCHAR(45) NULL DEFAULT NULL,
    `expectedClickthroughRate` VARCHAR(45) NULL DEFAULT NULL,
    `searchLostISRank` VARCHAR(45) NULL DEFAULT NULL,
    `topVsOther` VARCHAR(45) NULL DEFAULT NULL,
    `keywordState` VARCHAR(45) NULL DEFAULT NULL,
    `criterionServingStatus` VARCHAR(45) NULL DEFAULT NULL,
    `topOfPageCPC` VARCHAR(45) NULL DEFAULT NULL,
    `trackingTemplate` VARCHAR(45) NULL DEFAULT NULL,
    `customParameter` VARCHAR(45) NULL DEFAULT NULL,
    `valueAllConv` VARCHAR(45) NULL DEFAULT NULL,
    `valueConv` VARCHAR(45) NULL DEFAULT NULL,
    `valueConvCurrentModel` VARCHAR(45) NULL DEFAULT NULL,
    `videoPlayedTo100` VARCHAR(45) NULL DEFAULT NULL,
    `videoPlayedTo25` VARCHAR(45) NULL DEFAULT NULL,
    `videoPlayedTo50` VARCHAR(45) NULL DEFAULT NULL,
    `videoPlayedTo75` VARCHAR(45) NULL DEFAULT NULL,
    `viewRate` VARCHAR(45) NULL DEFAULT NULL,
    `views` VARCHAR(45) NULL DEFAULT NULL,
    `viewThroughConv` VARCHAR(45) NULL DEFAULT NULL,
    `week` DATE NULL DEFAULT NULL,
    `year` INT(11) NULL DEFAULT NULL,
    `enabled` TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `analytics`.`adwords_clicks` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `ccId` varchar(45) NOT NULL,
    `account` VARCHAR(255) NULL DEFAULT NULL,
    `adType` VARCHAR(255) NULL DEFAULT NULL,
    `adGroupID` varchar(45) NULL DEFAULT NULL,
    `adGroup` VARCHAR(255) NULL DEFAULT NULL,
    `adGroupState` VARCHAR(255) NULL DEFAULT NULL,
    `network` VARCHAR(255) NULL DEFAULT NULL,
    `networkWithSearchPartners` VARCHAR(255) NULL DEFAULT NULL,
    `cityLocationOfInterest` VARCHAR(255) NULL DEFAULT NULL,
    `countryTerritoryLocationOfInterest` VARCHAR(255) NULL DEFAULT NULL,
    `metroAreaLocationOfInterest` VARCHAR(255) NULL DEFAULT NULL,
    `mostSpecificLocationTargetLocationOfInterest` VARCHAR(255) NULL DEFAULT NULL,
    `regionLocationOfInterest` VARCHAR(255) NULL DEFAULT NULL,
    `campaignID` varchar(45) NULL DEFAULT NULL,
    `campaignLocationTarget` VARCHAR(255) NULL DEFAULT NULL,
    `campaign` VARCHAR(255) NULL DEFAULT NULL,
    `campaignState` VARCHAR(255) NULL DEFAULT NULL,
    `clicks` VARCHAR(255) NULL DEFAULT NULL,
    `clickType` VARCHAR(255) NULL DEFAULT NULL,
    `adID` varchar(45) NULL DEFAULT NULL,
    `keywordID` varchar(45) NULL DEFAULT NULL,
    `keywordPlacement` VARCHAR(255) NULL DEFAULT NULL,
    `day` DATE NULL DEFAULT NULL,
    `device` VARCHAR(255) NULL DEFAULT NULL,
    `customerID` varchar(45) NULL DEFAULT NULL,
    `googleClickID` varchar(255) NULL DEFAULT NULL,
    `matchType` VARCHAR(255) NULL DEFAULT NULL,
    `cityPhysicalLocation` VARCHAR(255) NULL DEFAULT NULL,
    `countryTerritoryPhysicalLocation` VARCHAR(255) NULL DEFAULT NULL,
    `metroAreaPhysicalLocation` VARCHAR(255) NULL DEFAULT NULL,
    `mostSpecificLocationTargetPhysicalLocation` VARCHAR(255) NULL DEFAULT NULL,
    `regionPhysicalLocation` VARCHAR(255) NULL DEFAULT NULL,
    `monthOfYear` VARCHAR(255) NULL DEFAULT NULL,
    `page` VARCHAR(255) NULL DEFAULT NULL,
    `topVsOther` VARCHAR(255) NULL DEFAULT NULL,
    `userListID` varchar(45) NULL DEFAULT NULL,
    `enabled` TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`users`
ADD COLUMN `linkedin_id` VARCHAR(45) NOT NULL AFTER `fb_id`,
ADD COLUMN `google_id` BIGINT(20) NOT NULL AFTER `ref_id`,
ADD COLUMN `remember_me_token` VARCHAR(50) NOT NULL AFTER `token`;

ALTER TABLE `analytics`.`booking_confirmed`
ADD COLUMN `expected_revenue` DECIMAL(10,4) NULL DEFAULT NULL AFTER `reservation_id`;

ALTER TABLE `analytics`.`booking_confirmed`
ADD COLUMN `user_id` INT(11) NOT NULL AFTER `expected_revenue`;

/*v1.27.10 release point 10/05/17 16:10*/

ALTER TABLE `live`.`users`
CHANGE COLUMN `twitter_id` `twitter_id` DECIMAL(45,0) NOT NULL ,
CHANGE COLUMN `google_id` `google_id` DECIMAL(45,0) NOT NULL ,
CHANGE COLUMN `fb_id` `fb_id` DECIMAL(45,0) NOT NULL ;

ALTER TABLE `dev`.`location_usage`
DROP COLUMN `enable_search_route`,
DROP COLUMN `search_route_url`;

CREATE TABLE `dev`.`landing_page_types` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_desc` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `dev`.`landing_pages` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_id` INT(11) UNSIGNED NOT NULL,
  `location_id` INT(11) UNSIGNED NOT NULL,
  `lang_code` CHAR(5) NOT NULL,
  `title` VARCHAR(1000) NULL DEFAULT NULL,
  `desc_text` VARCHAR(1000) NOT NULL,
  `h1` VARCHAR(1000) NULL DEFAULT NULL,
  `h2` VARCHAR(1000) NULL DEFAULT NULL,
  `carousel_title` VARCHAR(45) NULL DEFAULT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  INDEX `lp_type_id_idx` (`type_id` ASC),
  INDEX `lp_loc_id_idx` (`location_id` ASC),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `lp_type_id`
    FOREIGN KEY (`type_id`)
    REFERENCES `dev`.`landing_page_types` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `lp_loc_id`
    FOREIGN KEY (`location_id`)
    REFERENCES `dev`.`locations` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

ALTER TABLE `dev`.`landing_pages`
CHANGE COLUMN `carousel_title` `type_title` VARCHAR(45) NULL DEFAULT NULL;

ALTER TABLE `dev`.`landing_pages`
CHANGE COLUMN `title` `title` VARCHAR(1000) NOT NULL ,
CHANGE COLUMN `h1` `h1` VARCHAR(1000) NOT NULL ,
CHANGE COLUMN `h2` `h2` VARCHAR(1000) NOT NULL ,
CHANGE COLUMN `type_title` `type_title` VARCHAR(45) NOT NULL ,
ADD COLUMN `meta_desc` VARCHAR(300) NOT NULL AFTER `type_title`;

CREATE TABLE `dev`.`landing_page_type_language` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_id` INT(11) UNSIGNED NOT NULL,
  `lang_code` CHAR(5) NOT NULL,
  `desc` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `landing_page_type_id_idx` (`type_id` ASC),
  CONSTRAINT `landing_page_type_id`
    FOREIGN KEY (`type_id`)
    REFERENCES `dev`.`landing_page_types` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

/*v1.27.11 release point 17/05/17 18:20*/

UPDATE `dev`.`contact_info` SET `country`='Germany', `enabled`='1' WHERE `locale`='de';
UPDATE `dev`.`contact_info` SET `country`='Netherlands' WHERE `locale`='nl';

INSERT INTO `dev`.`location_country_places` (`country`, `main_location_id`, `location_1_id`) VALUES ('de', '611', '611');

INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('1', 'de', 'alle-räume', 'Alle Räume', 'Alle Räume', 'Räume', 'Räum', '0', '0');
INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('2', 'de', 'meetingräume', 'Meetingräume', 'Meetingräume', 'Meetingraum', 'Meetingräume', '1', '1');
INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('3', 'de', 'tagungsräume', 'Tagungsräume', 'Tagungsräume', 'Tagungsraum', 'Tagungsräume', '0', '1');
INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('4', 'de', 'seminarräume', 'Seminarräume', 'Seminarräume', 'Seminarraum', 'Seminarräume', '0', '1');
INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('5', 'de', 'büro-coworking', 'Räume für Coworking', 'Büro/Coworking', 'Büroraum', 'Büros', '0', '1');
INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('6', 'de', 'veranstaltungsräume', 'Event & Veranstaltungsräume', 'Event/Veranstaltungsräume', 'Veranstaltungsraum', 'Veranstaltungsräume', '0', '1');
INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('7', 'de', 'small-meeting-rooms', 'Small Meeting Rooms', 'Meeting Rooms', 'Meeting Room', 'Meeting Rooms', '0', '0');
INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('8', 'de', 'medium-meeting-rooms', 'Medium-Sized Meeting Rooms', 'Meeting Rooms', 'Meeting Room', 'Meeting Rooms', '0', '0');
INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('9', 'de', 'large-meeting-rooms', 'Large Meeting Rooms', 'Meeting Rooms', 'Meeting Room', 'Meeting Rooms', '0', '0');
INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`) VALUES ('10', 'de', 'büros', 'Büros', 'Büroraum', 'Büro', 'Büros', '0', '1');

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
SELECT `controller_name`, `method_name`, 'de', `title`, `meta_description`, `meta_keyword` FROM `dev`.`metas` WHERE `lang_code` = 'en';

UPDATE `dev`.`contact_info` SET `country`='Deutschland' WHERE `locale`='de';

/*v1.27.12 release point 18/05/17 18:30*/

ALTER TABLE `analytics`.`booking_confirmed`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL,
CHANGE COLUMN `room_id` `room_id` INT(11) UNSIGNED NOT NULL,
CHANGE COLUMN `venue_id` `venue_id` INT(11) UNSIGNED NOT NULL,
CHANGE COLUMN `reservation_id` `reservation_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `analytics`.`browse`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL;

ALTER TABLE `analytics`.`checkout`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL,
CHANGE COLUMN `room_id` `room_id` INT(11) UNSIGNED NOT NULL,
CHANGE COLUMN `venue_id` `venue_id` INT(11) UNSIGNED NOT NULL,
CHANGE COLUMN `booking_type` `booking_type` TINYINT(1) NOT NULL;

ALTER TABLE `analytics`.`home`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL;

ALTER TABLE `analytics`.`location`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL;

ALTER TABLE `analytics`.`room`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL,
CHANGE COLUMN `room_id` `room_id` INT(11) UNSIGNED NOT NULL,
CHANGE COLUMN `venue_id` `venue_id` INT(11) UNSIGNED NOT NULL;

ALTER TABLE `analytics`.`search`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL;

ALTER TABLE `analytics`.`venue`
CHANGE COLUMN `session_id` `session_id` VARCHAR(45) NOT NULL,
CHANGE COLUMN `venue_id` `venue_id` INT(11) UNSIGNED NOT NULL;

/*v1.27.13 release point 22/05/17 18:15*/

ALTER TABLE `dev`.`popularlocations`
ADD COLUMN `child_location_id` INT(11) UNSIGNED NOT NULL AFTER `location_id`;

ALTER TABLE `dev`.`popularlocations`
DROP FOREIGN KEY `pop_loc_location_id`;
ALTER TABLE `dev`.`popularlocations`
CHANGE COLUMN `child_location_id` `location_id` INT(11) UNSIGNED NOT NULL AFTER `usageSuperset_id`,
CHANGE COLUMN `location_id` `child_location_id` INT(11) UNSIGNED NOT NULL ;
ALTER TABLE `dev`.`popularlocations`
ADD CONSTRAINT `pop_loc_location_id`
  FOREIGN KEY (`child_location_id`)
  REFERENCES `dev`.`locations` (`id`);

ALTER TABLE `dev`.`popularlocations`
DROP FOREIGN KEY `pop_loc_location_id`;
ALTER TABLE `dev`.`popularlocations`
DROP INDEX `pop_loc_location_id_idx` ;

ALTER TABLE `dev`.`popularlocations`
ADD INDEX `pop_loc_child_location_id_idx` (`child_location_id` ASC),
ADD INDEX `pop_loc_location_id_idx` (`location_id` ASC);

UPDATE `dev`.`popularlocations` SET `location_id` = 1;

ALTER TABLE `dev`.`popularlocations`
ADD CONSTRAINT `pop_loc_child_location_id`
  FOREIGN KEY (`child_location_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `pop_loc_location_id`
  FOREIGN KEY (`location_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

UPDATE `dev`.`popularlocations` SET `img`= REPLACE(img, 'top_locations/', 'top_locations/gb/');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '62', 'en', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '62', 'en', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '62', 'en', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '62', 'en', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '62', 'en', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '62', 'fr', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '62', 'fr', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '62', 'fr', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '62', 'fr', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '62', 'fr', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '62', 'de', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '62', 'de', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '62', 'de', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '62', 'de', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '62', 'de', '/css/images/home/top_locations/gb/london/kings-cross.jpg', '1');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '38', 'en', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '38', 'en', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '38', 'en', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '38', 'en', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '38', 'en', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '38', 'fr', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '38', 'fr', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '38', 'fr', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '38', 'fr', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '38', 'fr', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '38', 'de', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '38', 'de', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '38', 'de', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '38', 'de', '/css/images/home/top_locations/gb/london/euston.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '38', 'de', '/css/images/home/top_locations/gb/london/euston.jpg', '2');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '113', 'en', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '113', 'en', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '113', 'en', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '113', 'en', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '113', 'en', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '113', 'fr', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '113', 'fr', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '113', 'fr', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '113', 'fr', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '113', 'fr', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '113', 'de', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '113', 'de', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '113', 'de', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '113', 'de', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '113', 'de', '/css/images/home/top_locations/gb/london/waterloo.jpg', '3');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '440', 'en', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '440', 'en', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '440', 'en', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '440', 'en', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '440', 'en', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '440', 'fr', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '440', 'fr', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '440', 'fr', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '440', 'fr', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '440', 'fr', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '440', 'de', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '440', 'de', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '440', 'de', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '440', 'de', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '440', 'de', '/css/images/home/top_locations/gb/london/shoreditch.jpg', '4');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '85', 'en', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '85', 'en', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '85', 'en', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '85', 'en', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '85', 'en', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '85', 'fr', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '85', 'fr', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '85', 'fr', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '85', 'fr', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '85', 'fr', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '85', 'de', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '85', 'de', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '85', 'de', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '85', 'de', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '85', 'de', '/css/images/home/top_locations/gb/london/paddington.jpg', '5');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '69', 'en', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '69', 'en', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '69', 'en', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '69', 'en', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '69', 'en', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '69', 'fr', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '69', 'fr', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '69', 'fr', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '69', 'fr', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '69', 'fr', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '69', 'de', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '69', 'de', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '69', 'de', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '69', 'de', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '69', 'de', '/css/images/home/top_locations/gb/london/liverpool-street.jpg', '6');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '110', 'en', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '110', 'en', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '110', 'en', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '110', 'en', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '110', 'en', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '110', 'fr', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '110', 'fr', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '110', 'fr', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '110', 'fr', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '110', 'fr', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '110', 'de', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '110', 'de', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '110', 'de', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '110', 'de', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '110', 'de', '/css/images/home/top_locations/gb/london/victoria.jpg', '7');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '121', 'en', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '121', 'en', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '121', 'en', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '121', 'en', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '121', 'en', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '121', 'fr', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '121', 'fr', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '121', 'fr', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '121', 'fr', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '121', 'fr', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '121', 'de', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '121', 'de', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '121', 'de', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '121', 'de', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '121', 'de', '/css/images/home/top_locations/gb/london/stratford.jpg', '8');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '97', 'en', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '97', 'en', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '97', 'en', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '97', 'en', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '97', 'en', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '97', 'fr', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '97', 'fr', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '97', 'fr', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '97', 'fr', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '97', 'fr', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '97', 'de', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '97', 'de', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '97', 'de', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '97', 'de', '/css/images/home/top_locations/gb/london/soho.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '97', 'de', '/css/images/home/top_locations/gb/london/soho.jpg', '9');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '25', 'en', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '25', 'en', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '25', 'en', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '25', 'en', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '25', 'en', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '25', 'fr', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '25', 'fr', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '25', 'fr', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '25', 'fr', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '25', 'fr', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '25', 'de', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '25', 'de', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '25', 'de', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '25', 'de', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '25', 'de', '/css/images/home/top_locations/gb/london/canary-wharf.jpg', '10');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '119', 'en', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '119', 'en', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '119', 'en', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '119', 'en', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '119', 'en', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '119', 'fr', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '119', 'fr', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '119', 'fr', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '119', 'fr', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '119', 'fr', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '119', 'de', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '119', 'de', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '119', 'de', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '119', 'de', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '119', 'de', '/css/images/home/top_locations/gb/london/westminster.jpg', '11');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '82', 'en', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '82', 'en', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '82', 'en', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '82', 'en', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '82', 'en', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '82', 'fr', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '82', 'fr', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '82', 'fr', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '82', 'fr', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '82', 'fr', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '82', 'de', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '82', 'de', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '82', 'de', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '82', 'de', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '82', 'de', '/css/images/home/top_locations/gb/london/old-street.jpg', '12');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '76', 'en', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '76', 'en', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '76', 'en', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '76', 'en', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '76', 'en', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '76', 'fr', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '76', 'fr', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '76', 'fr', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '76', 'fr', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '76', 'fr', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '76', 'de', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '76', 'de', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '76', 'de', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '76', 'de', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '76', 'de', '/css/images/home/top_locations/gb/london/mayfair.jpg', '13');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '58', 'en', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '58', 'en', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '58', 'en', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '58', 'en', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '58', 'en', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '58', 'fr', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '58', 'fr', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '58', 'fr', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '58', 'fr', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '58', 'fr', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '58', 'de', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '58', 'de', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '58', 'de', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '58', 'de', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '58', 'de', '/css/images/home/top_locations/gb/london/kensington.jpg', '14');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '52', 'en', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '52', 'en', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '52', 'en', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '52', 'en', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '52', 'en', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '52', 'fr', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '52', 'fr', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '52', 'fr', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '52', 'fr', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '52', 'fr', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '52', 'de', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '52', 'de', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '52', 'de', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '52', 'de', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '52', 'de', '/css/images/home/top_locations/gb/london/holborn.jpg', '15');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '148', 'en', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '148', 'en', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '148', 'en', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '148', 'en', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '148', 'en', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '148', 'fr', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '148', 'fr', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '148', 'fr', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '148', 'fr', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '148', 'fr', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '2', '148', 'de', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '2', '148', 'de', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '2', '148', 'de', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '2', '148', 'de', '/css/images/home/top_locations/gb/london/camden.jpg', '16');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '2', '148', 'de', '/css/images/home/top_locations/gb/london/camden.jpg', '16');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1058', 'en', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1058', 'en', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1058', 'en', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1058', 'en', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1058', 'en', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1058', 'fr', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1058', 'fr', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1058', 'fr', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1058', 'fr', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1058', 'fr', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1058', 'de', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1058', 'de', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1058', 'de', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1058', 'de', '/css/images/home/top_locations/fr/paris.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1058', 'de', '/css/images/home/top_locations/fr/paris.jpg', '1');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1163', 'en', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1163', 'en', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1163', 'en', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1163', 'en', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1163', 'en', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1163', 'fr', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1163', 'fr', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1163', 'fr', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1163', 'fr', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1163', 'fr', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1163', 'de', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1163', 'de', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1163', 'de', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1163', 'de', '/css/images/home/top_locations/fr/marseille.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1163', 'de', '/css/images/home/top_locations/fr/marseille.jpg', '2');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1162', 'en', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1162', 'en', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1162', 'en', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1162', 'en', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1162', 'en', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1162', 'fr', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1162', 'fr', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1162', 'fr', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1162', 'fr', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1162', 'fr', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1162', 'de', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1162', 'de', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1162', 'de', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1162', 'de', '/css/images/home/top_locations/fr/lyon.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1162', 'de', '/css/images/home/top_locations/fr/lyon.jpg', '3');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1396', 'en', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1396', 'en', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1396', 'en', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1396', 'en', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1396', 'en', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1396', 'fr', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1396', 'fr', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1396', 'fr', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1396', 'fr', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1396', 'fr', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1396', 'de', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1396', 'de', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1396', 'de', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1396', 'de', '/css/images/home/top_locations/fr/toulouse.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1396', 'de', '/css/images/home/top_locations/fr/toulouse.jpg', '4');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1167', 'en', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1167', 'en', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1167', 'en', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1167', 'en', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1167', 'en', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1167', 'fr', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1167', 'fr', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1167', 'fr', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1167', 'fr', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1167', 'fr', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1167', 'de', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1167', 'de', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1167', 'de', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1167', 'de', '/css/images/home/top_locations/fr/nice.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1167', 'de', '/css/images/home/top_locations/fr/nice.jpg', '5');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1165', 'en', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1165', 'en', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1165', 'en', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1165', 'en', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1165', 'en', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1165', 'fr', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1165', 'fr', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1165', 'fr', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1165', 'fr', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1165', 'fr', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1165', 'de', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1165', 'de', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1165', 'de', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1165', 'de', '/css/images/home/top_locations/fr/nantes.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1165', 'de', '/css/images/home/top_locations/fr/nantes.jpg', '6');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1397', 'en', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1397', 'en', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1397', 'en', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1397', 'en', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1397', 'en', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1397', 'fr', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1397', 'fr', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1397', 'fr', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1397', 'fr', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1397', 'fr', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1397', 'de', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1397', 'de', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1397', 'de', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1397', 'de', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1397', 'de', '/css/images/home/top_locations/fr/strasbourg.jpg', '7');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1398', 'en', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1398', 'en', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1398', 'en', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1398', 'en', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1398', 'en', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1398', 'fr', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1398', 'fr', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1398', 'fr', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1398', 'fr', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1398', 'fr', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1398', 'de', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1398', 'de', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1398', 'de', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1398', 'de', '/css/images/home/top_locations/fr/montpellier.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1398', 'de', '/css/images/home/top_locations/fr/montpellier.jpg', '8');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1164', 'en', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1164', 'en', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1164', 'en', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1164', 'en', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1164', 'en', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1164', 'fr', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1164', 'fr', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1164', 'fr', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1164', 'fr', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1164', 'fr', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1164', 'de', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1164', 'de', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1164', 'de', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1164', 'de', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1164', 'de', '/css/images/home/top_locations/fr/bordeaux.jpg', '9');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1399', 'en', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1399', 'en', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1399', 'en', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1399', 'en', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1399', 'en', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1399', 'fr', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1399', 'fr', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1399', 'fr', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1399', 'fr', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1399', 'fr', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1399', 'de', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1399', 'de', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1399', 'de', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1399', 'de', '/css/images/home/top_locations/fr/lille.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1399', 'de', '/css/images/home/top_locations/fr/lille.jpg', '10');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1385', 'en', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1385', 'en', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1385', 'en', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1385', 'en', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1385', 'en', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1385', 'fr', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1385', 'fr', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1385', 'fr', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1385', 'fr', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1385', 'fr', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1385', 'de', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1385', 'de', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1385', 'de', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1385', 'de', '/css/images/home/top_locations/fr/rennes.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1385', 'de', '/css/images/home/top_locations/fr/rennes.jpg', '11');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1394', 'en', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1394', 'en', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1394', 'en', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1394', 'en', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1394', 'en', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1394', 'fr', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1394', 'fr', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1394', 'fr', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1394', 'fr', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1394', 'fr', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '1056', '1394', 'de', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '1056', '1394', 'de', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '1056', '1394', 'de', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '1056', '1394', 'de', '/css/images/home/top_locations/fr/reims.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '1056', '1394', 'de', '/css/images/home/top_locations/fr/reims.jpg', '12');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1400', 'en', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1400', 'en', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1400', 'en', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1400', 'en', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1400', 'en', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1400', 'fr', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1400', 'fr', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1400', 'fr', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1400', 'fr', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1400', 'fr', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1400', 'de', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1400', 'de', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1400', 'de', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1400', 'de', '/css/images/home/top_locations/de/berlin.jpg', '1');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1400', 'de', '/css/images/home/top_locations/de/berlin.jpg', '1');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1401', 'en', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1401', 'en', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1401', 'en', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1401', 'en', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1401', 'en', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1401', 'fr', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1401', 'fr', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1401', 'fr', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1401', 'fr', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1401', 'fr', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1401', 'de', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1401', 'de', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1401', 'de', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1401', 'de', '/css/images/home/top_locations/de/hamburg.jpg', '2');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1401', 'de', '/css/images/home/top_locations/de/hamburg.jpg', '2');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '611', 'en', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '611', 'en', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '611', 'en', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '611', 'en', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '611', 'en', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '611', 'fr', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '611', 'fr', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '611', 'fr', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '611', 'fr', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '611', 'fr', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '611', 'de', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '611', 'de', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '611', 'de', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '611', 'de', '/css/images/home/top_locations/de/munich.jpg', '3');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '611', 'de', '/css/images/home/top_locations/de/munich.jpg', '3');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1479', 'en', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1479', 'en', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1479', 'en', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1479', 'en', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1479', 'en', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1479', 'fr', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1479', 'fr', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1479', 'fr', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1479', 'fr', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1479', 'fr', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1479', 'de', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1479', 'de', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1479', 'de', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1479', 'de', '/css/images/home/top_locations/de/cologne.jpg', '4');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1479', 'de', '/css/images/home/top_locations/de/cologne.jpg', '4');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1404', 'en', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1404', 'en', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1404', 'en', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1404', 'en', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1404', 'en', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1404', 'fr', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1404', 'fr', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1404', 'fr', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1404', 'fr', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1404', 'fr', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1404', 'de', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1404', 'de', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1404', 'de', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1404', 'de', '/css/images/home/top_locations/de/frankfurt.jpg', '5');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1404', 'de', '/css/images/home/top_locations/de/frankfurt.jpg', '5');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1408', 'en', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1408', 'en', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1408', 'en', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1408', 'en', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1408', 'en', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1408', 'fr', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1408', 'fr', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1408', 'fr', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1408', 'fr', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1408', 'fr', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1408', 'de', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1408', 'de', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1408', 'de', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1408', 'de', '/css/images/home/top_locations/de/essen.jpg', '6');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1408', 'de', '/css/images/home/top_locations/de/essen.jpg', '6');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1407', 'en', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1407', 'en', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1407', 'en', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1407', 'en', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1407', 'en', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1407', 'fr', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1407', 'fr', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1407', 'fr', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1407', 'fr', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1407', 'fr', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1407', 'de', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1407', 'de', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1407', 'de', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1407', 'de', '/css/images/home/top_locations/de/dortmund.jpg', '7');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1407', 'de', '/css/images/home/top_locations/de/dortmund.jpg', '7');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1405', 'en', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1405', 'en', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1405', 'en', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1405', 'en', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1405', 'en', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1405', 'fr', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1405', 'fr', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1405', 'fr', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1405', 'fr', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1405', 'fr', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1405', 'de', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1405', 'de', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1405', 'de', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1405', 'de', '/css/images/home/top_locations/de/stuttgart.jpg', '8');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1405', 'de', '/css/images/home/top_locations/de/stuttgart.jpg', '8');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1406', 'en', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1406', 'en', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1406', 'en', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1406', 'en', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1406', 'en', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1406', 'fr', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1406', 'fr', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1406', 'fr', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1406', 'fr', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1406', 'fr', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1406', 'de', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1406', 'de', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1406', 'de', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1406', 'de', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1406', 'de', '/css/images/home/top_locations/de/dusseldorf.jpg', '9');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1410', 'en', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1410', 'en', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1410', 'en', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1410', 'en', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1410', 'en', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1410', 'fr', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1410', 'fr', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1410', 'fr', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1410', 'fr', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1410', 'fr', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1410', 'de', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1410', 'de', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1410', 'de', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1410', 'de', '/css/images/home/top_locations/de/bremen.jpg', '10');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1410', 'de', '/css/images/home/top_locations/de/bremen.jpg', '10');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1412', 'en', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1412', 'en', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1412', 'en', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1412', 'en', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1412', 'en', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1412', 'fr', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1412', 'fr', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1412', 'fr', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1412', 'fr', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1412', 'fr', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1412', 'de', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1412', 'de', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1412', 'de', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1412', 'de', '/css/images/home/top_locations/de/hannover.jpg', '11');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1412', 'de', '/css/images/home/top_locations/de/hannover.jpg', '11');

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1414', 'en', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1414', 'en', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1414', 'en', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1414', 'en', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1414', 'en', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1414', 'fr', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1414', 'fr', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1414', 'fr', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1414', 'fr', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1414', 'fr', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('2', '610', '1414', 'de', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('3', '610', '1414', 'de', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('4', '610', '1414', 'de', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('5', '610', '1414', 'de', '/css/images/home/top_locations/de/duisburg.jpg', '12');
INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `img`, `ordering`) VALUES ('6', '610', '1414', 'de', '/css/images/home/top_locations/de/duisburg.jpg', '12');

/*v1.27.15 release point 26/05/17 17:00*/

CREATE TABLE `analytics`.`adwords_paid_organic` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `ccId` varchar(45) NOT NULL,
    `currency` VARCHAR(255) NULL DEFAULT NULL,
    `account` VARCHAR(255) NULL DEFAULT NULL,
    `timeZone` VARCHAR(255) NULL DEFAULT NULL,
    `adGroupID` varchar(45) NULL DEFAULT NULL,
    `adGroup` VARCHAR(255) NULL DEFAULT NULL,
    `adGroupState` VARCHAR(255) NULL DEFAULT NULL,
    `adAvgCPC` VARCHAR(255) NULL DEFAULT NULL,
    `adAvgPosition` VARCHAR(255) NULL DEFAULT NULL,
    `campaignID` varchar(45) NULL DEFAULT NULL,
    `campaign` VARCHAR(255) NULL DEFAULT NULL,
    `campaignState` VARCHAR(255) NULL DEFAULT NULL,
    `adClicks` VARCHAR(255) NULL DEFAULT NULL,
    `combinedClicks` VARCHAR(255) NULL DEFAULT NULL,
    `combinedClicksQuery` VARCHAR(255) NULL DEFAULT NULL,
    `combinedQueries` VARCHAR(255) NULL DEFAULT NULL,
    `adCTR` VARCHAR(255) NULL DEFAULT NULL,
    `clientName` VARCHAR(255) NULL DEFAULT NULL,
    `day` DATE NULL DEFAULT NULL,
    `dayOfWeek` VARCHAR(255) NULL DEFAULT NULL,
    `customerID` varchar(45) NULL DEFAULT NULL,
    `adImpressions` VARCHAR(255) NULL DEFAULT NULL,
    `keywordID` varchar(45) NULL DEFAULT NULL,
    `keyword` VARCHAR(255) NULL DEFAULT NULL,
    `month` DATE NULL DEFAULT NULL,
    `monthOfYear` VARCHAR(255) NULL DEFAULT NULL,
    `organicAveragePosition` VARCHAR(255) NULL DEFAULT NULL,
    `organicClicks` VARCHAR(255) NULL DEFAULT NULL,
    `organicClicksQuery` VARCHAR(255) NULL DEFAULT NULL,
    `organicListings` VARCHAR(255) NULL DEFAULT NULL,
    `organicListingsQuery` VARCHAR(255) NULL DEFAULT NULL,
    `organicQueries` VARCHAR(255) NULL DEFAULT NULL,
    `companyName` VARCHAR(255) NULL DEFAULT NULL,
    `quarter` VARCHAR(255) NULL DEFAULT NULL,
    `matchType` VARCHAR(255) NULL DEFAULT NULL,
    `query` VARCHAR(255) NULL DEFAULT NULL,
    `searchResultType` VARCHAR(255) NULL DEFAULT NULL,
    `week` DATE NULL DEFAULT NULL,
    `year` INT(11) NULL DEFAULT NULL,
    `enabled` TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `analytics`.`adwords_search` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `ccId` varchar(45) NOT NULL,
    `currency` VARCHAR(255) NULL DEFAULT NULL,
    `account` VARCHAR(255) NULL DEFAULT NULL,
    `timeZone` VARCHAR(255) NULL DEFAULT NULL,
    `adType` VARCHAR(255) NULL DEFAULT NULL,
    `adGroupID` varchar(45) NULL DEFAULT NULL,
    `adGroup` VARCHAR(255) NULL DEFAULT NULL,
    `adGroupState` VARCHAR(255) NULL DEFAULT NULL,
    `network` VARCHAR(255) NULL DEFAULT NULL,
    `networkWithSearchPartners` VARCHAR(255) NULL DEFAULT NULL,
    `allConvRate` VARCHAR(255) NULL DEFAULT NULL,
    `allConv` VARCHAR(255) NULL DEFAULT NULL,
    `allConvValue` VARCHAR(255) NULL DEFAULT NULL,
    `avgCost` VARCHAR(255) NULL DEFAULT NULL,
    `avgCPC` VARCHAR(255) NULL DEFAULT NULL,
    `avgCPE` VARCHAR(255) NULL DEFAULT NULL,
    `avgCPM` VARCHAR(255) NULL DEFAULT NULL,
    `avgCPV` VARCHAR(255) NULL DEFAULT NULL,
    `avgPosition` VARCHAR(255) NULL DEFAULT NULL,
    `campaignID` varchar(45) NULL DEFAULT NULL,
    `campaign` VARCHAR(255) NULL DEFAULT NULL,
    `campaignState` VARCHAR(255) NULL DEFAULT NULL,
    `clicks` VARCHAR(255) NULL DEFAULT NULL,
    `conversionCategory` VARCHAR(255) NULL DEFAULT NULL,
    `convRate` VARCHAR(255) NULL DEFAULT NULL,
    `conversions` VARCHAR(255) NULL DEFAULT NULL,
    `conversionTrackerId` VARCHAR(255) NULL DEFAULT NULL,
    `conversionName` VARCHAR(255) NULL DEFAULT NULL,
    `totalConvValue` VARCHAR(255) NULL DEFAULT NULL,
    `cost` VARCHAR(255) NULL DEFAULT NULL,
    `costAllConv` VARCHAR(255) NULL DEFAULT NULL,
    `costConv` VARCHAR(255) NULL DEFAULT NULL,
    `adID` varchar(45) NULL DEFAULT NULL,
    `crossDeviceConv` VARCHAR(255) NULL DEFAULT NULL,
    `ctr` VARCHAR(255) NULL DEFAULT NULL,
    `clientName` VARCHAR(255) NULL DEFAULT NULL,
    `day` DATE NULL DEFAULT NULL,
    `dayOfWeek` VARCHAR(255) NULL DEFAULT NULL,
    `destinationURL` VARCHAR(255) NULL DEFAULT NULL,
    `device` VARCHAR(255) NULL DEFAULT NULL,
    `engagementRate` VARCHAR(255) NULL DEFAULT NULL,
    `engagements` VARCHAR(255) NULL DEFAULT NULL,
    `conversionSource` VARCHAR(255) NULL DEFAULT NULL,
    `customerID` varchar(45) NULL DEFAULT NULL,
    `finalURL` VARCHAR(255) NULL DEFAULT NULL,
    `impressions` VARCHAR(255) NULL DEFAULT NULL,
    `interactionRate` VARCHAR(255) NULL DEFAULT NULL,
    `interactions` VARCHAR(255) NULL DEFAULT NULL,
    `interactionTypes` VARCHAR(255) NULL DEFAULT NULL,
    `keywordID` varchar(45) NULL DEFAULT NULL,
    `keyword` VARCHAR(255) NULL DEFAULT NULL,
    `month` DATE NULL DEFAULT NULL,
    `monthOfYear` VARCHAR(255) NULL DEFAULT NULL,
    `companyName` VARCHAR(255) NULL DEFAULT NULL,
    `quarter` VARCHAR(255) NULL DEFAULT NULL,
    `searchTerm` VARCHAR(255) NULL DEFAULT NULL,
    `matchType` VARCHAR(255) NULL DEFAULT NULL,
    `trackingTemplate` VARCHAR(255) NULL DEFAULT NULL,
    `valueAllConv` VARCHAR(255) NULL DEFAULT NULL,
    `valueConv` VARCHAR(255) NULL DEFAULT NULL,
    `videoPlayedTo100` VARCHAR(255) NULL DEFAULT NULL,
    `videoPlayedTo25` VARCHAR(255) NULL DEFAULT NULL,
    `videoPlayedTo50` VARCHAR(255) NULL DEFAULT NULL,
    `videoPlayedTo75` VARCHAR(255) NULL DEFAULT NULL,
    `viewRate` VARCHAR(255) NULL DEFAULT NULL,
    `views` VARCHAR(255) NULL DEFAULT NULL,
    `viewThroughConv` VARCHAR(255) NULL DEFAULT NULL,
    `week` DATE NULL DEFAULT NULL,
    `year` INT(11) NULL DEFAULT NULL,
    `enabled` TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC));

UPDATE `dev`.`popularlocations` SET `ordering` = 1 WHERE `img` LIKE '%london.jpg%';
UPDATE `dev`.`popularlocations` SET `ordering` = 2 WHERE `img` LIKE '%birmingham.jpg%';
UPDATE `dev`.`popularlocations` SET `ordering` = 3 WHERE `img` LIKE '%manchester.jpg%';
UPDATE `dev`.`popularlocations` SET `ordering` = 4 WHERE `img` LIKE '%bristol.jpg%';
UPDATE `dev`.`popularlocations` SET `ordering` = 5 WHERE `img` LIKE '%leeds.jpg%';
UPDATE `dev`.`popularlocations` SET `ordering` = 6 WHERE `img` LIKE '%glasgow.jpg%';
UPDATE `dev`.`popularlocations` SET `ordering` = 7 WHERE `img` LIKE '%edinburgh.jpg%';
UPDATE `dev`.`popularlocations` SET `ordering` = 8 WHERE `img` LIKE '%liverpool.jpg%';
UPDATE `dev`.`popularlocations` SET `ordering` = 9 WHERE `img` LIKE '%sheffield.jpg%';
UPDATE `dev`.`popularlocations` SET `ordering` = 10 WHERE `img` LIKE '%bradford.jpg%';

/*v1.27.16 release point 30/05/17 12:20*/

ALTER TABLE `dev`.`locations`
DROP COLUMN `rank`,
DROP COLUMN `room_count`;

ALTER TABLE `dev`.`locations`
ADD COLUMN `redirect_loc_id` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `requires_determiner`,
ADD COLUMN `canonical` TINYINT(1) NOT NULL DEFAULT 0 AFTER `redirect_loc_id`;

/* remember to move the data over before doing this!*/
DROP TABLE `dev`.`location_redirects`;

ALTER TABLE `dev`.`landing_pages`
ADD UNIQUE INDEX `lp_type_loc_lang` (`type_id` ASC, `location_id` ASC, `lang_code` ASC);

ALTER TABLE `dev`.`landing_page_type_language`
ADD UNIQUE INDEX `lp_type_lang` (`type_id` ASC, `lang_code` ASC);

ALTER TABLE `dev`.`landing_page_type_language`
CHANGE COLUMN `desc` `url_desc` VARCHAR(45) NOT NULL,
ADD COLUMN `type_lang_desc` VARCHAR(45) NOT NULL AFTER `lang_code`;

ALTER TABLE `dev`.`landing_page_types`
ADD COLUMN `usageSuperset_id` INT(11) UNSIGNED NOT NULL AFTER `type_desc`,
ADD INDEX `lp_usage_superset_id_idx` (`usageSuperset_id` ASC);

UPDATE `dev`.`landing_page_types` SET `usageSuperset_id`='2' WHERE `id`='1';
UPDATE `dev`.`landing_page_types` SET `usageSuperset_id`='2' WHERE `id`='2';

ALTER TABLE `dev`.`landing_page_types`
ADD CONSTRAINT `lp_usage_superset_id`
  FOREIGN KEY (`usageSuperset_id`)
  REFERENCES `dev`.`usageSupersets` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`locations`
ADD COLUMN `search_redirect` TINYINT(1) NOT NULL DEFAULT 0 AFTER `canonical`;

/*v1.27.17 release point 02/06/17 16:50*/

INSERT INTO `dev`.`landing_page_type_language` (`type_id`, `lang_code`, `type_lang_desc`, `url_desc`)
SELECT `type_id`, 'en_IE', `type_lang_desc`, `url_desc` FROM `dev`.`landing_page_type_language` WHERE `lang_code`='en';

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`, `meta_og_type`, `meta_og_title`, `meta_og_image`, `meta_og_description`, `meta_og_url`, `meta_og_latitude`, `meta_og_longitude`, `meta_twitter_title`, `meta_twitter_description`, `meta_twitter_image`, `meta_twitter_card`)
SELECT `controller_name`, `method_name`, 'en_IE', `title`, `meta_description`, `meta_keyword`, `meta_og_type`, `meta_og_title`, `meta_og_image`, `meta_og_description`, `meta_og_url`, `meta_og_latitude`, `meta_og_longitude`, `meta_twitter_title`, `meta_twitter_description`, `meta_twitter_image`, `meta_twitter_card` FROM `dev`.`metas` WHERE `lang_code`='en';

INSERT INTO `dev`.`popularlocations` (`usageSuperset_id`, `location_id`, `child_location_id`, `lang_code`, `desc_text`, `img`, `ordering`)
SELECT `usageSuperset_id`, `location_id`, `child_location_id`, 'en_IE', `desc_text`, `img`, `ordering` FROM `dev`.`popularlocations` WHERE `lang_code`='en';

INSERT INTO `dev`.`usageSuperset_language` (`usageSuperset_id`, `lang_code`, `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled`)
SELECT `usageSuperset_id`, 'en_IE', `alias`, `desc`, `short_desc`, `item_name`, `collective_title`, `default`, `enabled` FROM `dev`.`usageSuperset_language` WHERE `lang_code`='en';

ALTER TABLE `dev`.`landing_pages`
ADD COLUMN `meta_keyword` VARCHAR(300) NOT NULL AFTER `meta_desc`;

/*v1.27.18 release point 05/06/17 17:50*/

DROP TABLE `dev`.`country`;
DROP TABLE `dev`.`amnities`;

CREATE TABLE `dev`.`country_suggest_text` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `locale_code` CHAR(2) NOT NULL,
  `suggest_text` VARCHAR(255) NOT NULL,
  `button_text` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

INSERT INTO `dev`.`country_suggest_text` (`locale_code`, `suggest_text`, `button_text`) VALUES ('gb', 'Looks like you’re in the UK? Visit your localised UK site:', 'Zipcube United Kingdom');
INSERT INTO `dev`.`country_suggest_text` (`locale_code`, `suggest_text`, `button_text`) VALUES ('de', 'Sieht aus wie in Deutschland? Besuchen Sie Ihre lokalisierte deutsche Seite:', 'Zipcube Deutschland');
INSERT INTO `dev`.`country_suggest_text` (`locale_code`, `suggest_text`, `button_text`) VALUES ('us', 'Looks like you’re in the US? Visit your localized US site:', 'Zipcube United States');
INSERT INTO `dev`.`country_suggest_text` (`locale_code`, `suggest_text`, `button_text`) VALUES ('ie', 'Looks like you’re in Ireland? Visit your localised Irish site:', 'Zipcube Ireland');
INSERT INTO `dev`.`country_suggest_text` (`locale_code`, `suggest_text`, `button_text`) VALUES ('fr', 'On dirait que vous êtes en France? Visitez votre site localisé français:', 'Zipcube France');

ALTER TABLE `dev`.`enquiries`
ADD COLUMN `lost_notes` VARCHAR(1000) NULL DEFAULT NULL AFTER `status`;

/*v1.27.19 release point 07/06/17 18:50*/

CREATE TABLE `dev`.`usageSuperset_language_history` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `usageSuperset_id` INT(11) UNSIGNED NOT NULL,
  `lang_code` CHAR(5) NOT NULL,
  `old_url` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `usage_super_lang_hist_superid_idx` (`usageSuperset_id` ASC),
  CONSTRAINT `usage_super_lang_hist_superid`
    FOREIGN KEY (`usageSuperset_id`)
    REFERENCES `dev`.`usageSupersets` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

/*v1.27.20 release point 14/06/17 09:50*/

CREATE TABLE `dev`.`service_review` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `rating` INT(11) NULL DEFAULT NULL,
  `comment` VARCHAR(255) NULL DEFAULT NULL,
  `site_version` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`service_review`
ADD COLUMN `user_id` INT(11) NULL DEFAULT NULL AFTER `id`,
ADD COLUMN `reservation_id` INT(11) NULL DEFAULT NULL AFTER `user_id`;

ALTER TABLE `dev`.`service_review`
RENAME TO  `dev`.`service_reviews` ;

ALTER TABLE `dev`.`service_reviews`
CHANGE COLUMN `user_id` `user_id` INT(11) NOT NULL ,
CHANGE COLUMN `reservation_id` `reservation_id` INT(11) NOT NULL ,
CHANGE COLUMN `rating` `rating` INT(11) NOT NULL ,
ADD COLUMN `created` DATETIME NOT NULL AFTER `site_version`;

ALTER TABLE `dev`.`service_reviews`
ADD COLUMN `enabled` TINYINT(1) NOT NULL DEFAULT '1' AFTER `created`;

ALTER TABLE `dev`.`service_reviews`
ADD UNIQUE INDEX `reservation_id_UNIQUE` (`reservation_id` ASC);

ALTER TABLE `dev`.`service_reviews`
CHANGE COLUMN `user_id` `user_id` INT(11) UNSIGNED NOT NULL ;

ALTER TABLE `dev`.`service_reviews`
CHANGE COLUMN `reservation_id` `reservation_id` INT(11) UNSIGNED NOT NULL ,
ADD INDEX `service_review_user_id_idx` (`user_id` ASC);
ALTER TABLE `dev`.`service_reviews`
ADD CONSTRAINT `service_review_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `dev`.`users` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `dev`.`service_reviews`
ADD CONSTRAINT `service_review_reservation_id`
  FOREIGN KEY (`reservation_id`)
  REFERENCES `dev`.`reservations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `analytics`.`booking_confirmed`
ADD COLUMN `booking_id` INT(11) UNSIGNED NOT NULL AFTER `language`;

UPDATE `analytics`.`booking_confirmed`
INNER JOIN `dev`.`reservations` ON `dev`.`reservations`.`id`=`analytics`.`booking_confirmed`.`reservation_id`
SET `analytics`.`booking_confirmed`.`booking_id`=`dev`.`reservations`.`booking_id`;

/*check before doing this!*/
ALTER TABLE `analytics`.`booking_confirmed`
DROP COLUMN `reservation_id`;

ALTER TABLE `analytics`.`checkout`
CHANGE COLUMN `start_date` `start_date_time` DATETIME NULL DEFAULT NULL,
CHANGE COLUMN `end_date` `end_date_time` DATETIME NULL DEFAULT NULL;

ALTER TABLE `analytics`.`booking_confirmed`
ADD COLUMN `creator` INT(11) NULL DEFAULT NULL AFTER `user_id`;

ALTER TABLE `dev`.`service_reviews`
RENAME TO  `dev`.`net_promoter_score`;

UPDATE `dev`.`assetCommissions`
INNER JOIN (SELECT `commissionPercentage`, `asset_id` FROM `dev`.`assetCommissions` WHERE `bookingChannel_id`=1) AS origComm ON origComm.asset_id = `assetCommissions`.`asset_id`
SET `assetCommissions`.`commissionPercentage`=origComm.commissionPercentage
WHERE `assetCommissions`.`bookingChannel_id`='3';

UPDATE `dev`.`bookingChannels` SET `defaultCommission`='15' WHERE `id`='3';

/*v1.28 release point 27/06/17 19:35*/

ALTER TABLE `analytics`.`booking_confirmed`
CHANGE COLUMN `journey_token` `journey_token_old` VARCHAR(45) NOT NULL;

ALTER TABLE `analytics`.`checkout`
CHANGE COLUMN `journey_token` `journey_token_old` VARCHAR(45) NOT NULL;

ALTER TABLE `dev`.`journeyTokens`
RENAME TO  `dev`.`journeyTokens_old`;

ALTER TABLE `dev`.`reservations`
CHANGE COLUMN `cancel_insurance_fee` `flexible_fee` DECIMAL(10,4) NULL DEFAULT NULL,
CHANGE COLUMN `cancel_insurance_applied` `flexible_applied` TINYINT(1) NULL DEFAULT '0';

ALTER TABLE `dev`.`rooms`
CHANGE COLUMN `cancel_insurance_percent` `flexible_percent` DECIMAL(10,2) NULL DEFAULT NULL,
CHANGE COLUMN `cancel_insurance_enabled` `flexible_enabled` TINYINT(1) NOT NULL DEFAULT '0';

ALTER TABLE `dev`.`users`
ADD COLUMN `unsubscribe_token` VARCHAR(50) NULL DEFAULT NULL AFTER `salt`,
ADD COLUMN `marketing_subscribed` TINYINT(1) NOT NULL DEFAULT 1 AFTER `unsubscribe_token`;

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'account_subscribe', 'en', 'Notifications - Dashboard | Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'account_subscribe', 'en_IE', 'Notifications - Dashboard | Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'account_subscribe', 'en_US', 'Notifications - Dashboard | Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'account_subscribe', 'fr', 'Notifications - Tableau de bord | Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('dashboard', 'account_subscribe', 'de', 'Mitteilungen - Konto - Zipcube');

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('users', 'unsubscribe', 'en', 'Unsubscribe | Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('users', 'unsubscribe', 'en_IE', 'Unsubscribe | Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('users', 'unsubscribe', 'en_US', 'Unsubscribe | Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('users', 'unsubscribe', 'fr', 'Désabonnez | Zipcube');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`) VALUES ('users', 'unsubscribe', 'de', 'Abbestellen | Zipcube');

ALTER TABLE `dev`.`assetAudit`
RENAME TO `dev`.`asset_audit`;

ALTER TABLE `dev`.`assetCommissions`
RENAME TO `dev`.`asset_commissions`;

ALTER TABLE `dev`.`assetPhotos`
RENAME TO `dev`.`asset_photos`;

ALTER TABLE `dev`.`bookingChannels`
RENAME TO `dev`.`booking_channels`;

ALTER TABLE `dev`.`dayRates`
RENAME TO `dev`.`day_rates`;

ALTER TABLE `dev`.`hourRates`
RENAME TO `dev`.`hour_rates`;

ALTER TABLE `dev`.`marketingChannels`
RENAME TO `dev`.`marketing_channels`;

ALTER TABLE `dev`.`monthRates`
RENAME TO `dev`.`month_rates`;

ALTER TABLE `dev`.`openingPeriods`
RENAME TO `dev`.`opening_periods`;

ALTER TABLE `dev`.`paymentAudits`
RENAME TO `dev`.`payment_audits`;

ALTER TABLE `dev`.`paymentTypes`
RENAME TO `dev`.`payment_types`;

ALTER TABLE `dev`.`reservationAudits`
RENAME TO `dev`.`reservation_audits`;

ALTER TABLE `dev`.`reservationPeriods`
RENAME TO `dev`.`reservation_periods`;

ALTER TABLE `dev`.`reviewAudit`
RENAME TO `dev`.`review_audit`;

ALTER TABLE `dev`.`roomAvailability`
RENAME TO `dev`.`room_availability`;

ALTER TABLE `dev`.`spaceTypes`
RENAME TO `dev`.`space_types`;

ALTER TABLE `dev`.`usageSuperset_configuration`
RENAME TO `dev`.`usage_superset_configuration`;

ALTER TABLE `dev`.`usageSuperset_language`
RENAME TO `dev`.`usage_superset_language`;

ALTER TABLE `dev`.`usageSuperset_language_history`
RENAME TO `dev`.`usage_superset_language_history`;

ALTER TABLE `dev`.`usageSupersets`
RENAME TO `dev`.`usage_supersets`;

ALTER TABLE `dev`.`usageSuperset_usage`
RENAME TO `dev`.`usage_superset_usage`;

ALTER TABLE `dev`.`venueTypes`
RENAME TO `dev`.`venue_types`;

/*v1.28.1 release point 07/07/17 14:10*/

CREATE TABLE `dev`.`enquiry_audits` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `enquiry_id` int(11) unsigned NOT NULL,
  `enquiryStatus_id` int(11) NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `dateTime` datetime NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `enquiry_id` (`enquiry_id`),
  KEY `status_id` (`enquiryStatus_id`)
);

UPDATE `dev`.`locations` SET `search_redirect` = 1 WHERE `country` = 'fr';

/*v1.28.2 release point 10/07/17 16:10*/

ALTER TABLE `dev`.`locations`
CHANGE COLUMN `venue_count` `approved_venue_count` INT(11) UNSIGNED NULL DEFAULT NULL,
ADD COLUMN `unapproved_venue_count` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `approved_venue_count`;

ALTER TABLE `dev`.`location_rooms`
CHANGE COLUMN `room_count` `approved_room_count` INT(11) UNSIGNED NULL DEFAULT NULL,
ADD COLUMN `unapproved_room_count` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `approved_room_count`;

/*v1.28.3 release point 11/07/17 12:35*/

ALTER TABLE `dev`.`rooms`
ADD COLUMN `admin_hidden` TINYINT(1) NOT NULL DEFAULT '0' AFTER `approver`;

ALTER TABLE `dev`.`venues`
ADD COLUMN `admin_hidden` TINYINT(1) NOT NULL DEFAULT '0' AFTER `approver`;

ALTER TABLE `dev`.`companies`
ADD COLUMN `admin_hidden` TINYINT(1) NOT NULL DEFAULT '0' AFTER `approver`;

/*v1.28.4 release point 12/07/17 17:45*/

CREATE TABLE `dev`.`location_similar_links` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_loc_id` INT(11) UNSIGNED NOT NULL,
  `first_loc_usagesuperset_id` INT(11) UNSIGNED NOT NULL,
  `second_loc_id` INT(11) UNSIGNED NOT NULL,
  `second_loc_usagesuperset_id` INT(11) UNSIGNED NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `dev`.`location_similar_links`
ADD INDEX `first_loc_similar_loc_id_idx` (`first_loc_id` ASC),
ADD INDEX `first_loc_similar_usagesuperset_id_idx` (`first_loc_usagesuperset_id` ASC),
ADD INDEX `second_loc_similar_loc_id_idx` (`second_loc_id` ASC),
ADD INDEX `second_loc_similar_usagesuperset_id_idx` (`second_loc_usagesuperset_id` ASC);
ALTER TABLE `dev`.`location_similar_links`
ADD CONSTRAINT `first_loc_similar_loc_id`
  FOREIGN KEY (`first_loc_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `first_loc_similar_usagesuperset_id`
  FOREIGN KEY (`first_loc_usagesuperset_id`)
  REFERENCES `dev`.`usage_supersets` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `second_loc_similar_loc_id`
  FOREIGN KEY (`second_loc_id`)
  REFERENCES `dev`.`locations` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
ADD CONSTRAINT `second_loc_similar_usagesuperset_id`
  FOREIGN KEY (`second_loc_usagesuperset_id`)
  REFERENCES `dev`.`usage_supersets` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('2', '2', '2', '4');
INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('2', '4', '2', '2');
INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('598', '2', '598', '4');
INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('598', '4', '598', '2');
INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('643', '2', '643', '4');
INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('643', '4', '643', '2');
INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('38', '2', '62', '2');
INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('62', '2', '38', '2');
INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('62', '2', '457', '2');
INSERT INTO `dev`.`location_similar_links` (`first_loc_id`, `first_loc_usagesuperset_id`, `second_loc_id`, `second_loc_usagesuperset_id`) VALUES ('457', '2', '62', '2');

CREATE TABLE `dev`.`trait_types` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

INSERT INTO `dev`.`trait_types` (`desc`) VALUES ('Quirky');
INSERT INTO `dev`.`trait_types` (`desc`) VALUES ('5 Stars/Luxury');
INSERT INTO `dev`.`trait_types` (`desc`) VALUES ('Casual/Corporate');
INSERT INTO `dev`.`trait_types` (`desc`) VALUES ('Pubs/Informal');
INSERT INTO `dev`.`trait_types` (`desc`) VALUES ('Corporate');
INSERT INTO `dev`.`trait_types` (`desc`) VALUES ('Hotel');
INSERT INTO `dev`.`trait_types` (`desc`) VALUES ('Affordable');

UPDATE `dev`.`trait_types` SET `desc`='Quirky/Cool/Creative' WHERE `id`='1';
UPDATE `dev`.`trait_types` SET `desc`='Contemporary' WHERE `id`='3';

CREATE TABLE `dev`.`room_trait` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `room_id` INT(11) UNSIGNED NOT NULL,
  `trait_id` INT(11) UNSIGNED NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `room_trait` (`room_id` ASC, `trait_id` ASC),
  INDEX `room_trait_room_id_idx` (`room_id` ASC),
  INDEX `room_trait_trait_id_idx` (`trait_id` ASC),
  CONSTRAINT `room_trait_room_id`
    FOREIGN KEY (`room_id`)
    REFERENCES `dev`.`rooms` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `room_trait_trait_id`
    FOREIGN KEY (`trait_id`)
    REFERENCES `dev`.`trait_types` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

INSERT INTO `dev`.`room_trait` (`room_id`, `trait_id`)
SELECT `rooms`.`id`, 6 FROM `dev`.`venues`
INNER JOIN `dev`.`rooms` ON `rooms`.`venue_id`=`venues`.`id`
WHERE `venue_type_id`=5;

INSERT INTO `dev`.`room_trait` (`room_id`, `trait_id`)
SELECT `rooms`.`id`, 4 FROM `dev`.`venues`
INNER JOIN `dev`.`rooms` ON `rooms`.`venue_id`=`venues`.`id`
WHERE `venue_type_id`=8;

/*v1.28.5 release point 17/07/17 18:55*/

UPDATE `dev`.`rooms` SET `enabled`=0 WHERE `admin_hidden`=1;
UPDATE `dev`.`venues` SET `enabled`=0 WHERE `admin_hidden`=1;
UPDATE `dev`.`companies` SET `enabled`=0 WHERE `admin_hidden`=1;

ALTER TABLE `dev`.`rooms`
DROP COLUMN `admin_hidden`;

ALTER TABLE `dev`.`venues`
DROP COLUMN `admin_hidden`;

ALTER TABLE `dev`.`companies`
DROP COLUMN `admin_hidden`;

ALTER TABLE `dev`.`asset_photos`
ADD COLUMN `cosmetic` TINYINT(1) NOT NULL DEFAULT '0' AFTER `flagged`;

/*v1.28.6 release point 20/07/17 11:20*/

CREATE TABLE `analytics`.`adwords_report_audit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `report_name` varchar(255) NOT NULL,
  `ccId` varchar(45) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `successful` tinyint(4) NOT NULL DEFAULT '0',
  `error_message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

UPDATE `analytics`.`booking_confirmed`
INNER JOIN `analytics`.`tracking_cookies` ON `booking_confirmed`.`tracking_cookie_id`=`tracking_cookies`.`id`
INNER JOIN (SELECT MIN(`id`) AS first_tc, `user_id` FROM `analytics`.`tracking_cookies` WHERE `tracking_cookies`.`user_id` IS NOT NULL GROUP BY `tracking_cookies`.`user_id`) alias ON `tracking_cookies`.`user_id`=alias.user_id
SET `booking_confirmed`.`tracking_cookie_id`=alias.first_tc
WHERE `tracking_cookies`.`user_id` IS NOT NULL;

UPDATE `analytics`.`browse`
INNER JOIN `analytics`.`tracking_cookies` ON `browse`.`tracking_cookie_id`=`tracking_cookies`.`id`
INNER JOIN (SELECT MIN(`id`) AS first_tc, `user_id` FROM `analytics`.`tracking_cookies` WHERE `tracking_cookies`.`user_id` IS NOT NULL GROUP BY `tracking_cookies`.`user_id`) alias ON `tracking_cookies`.`user_id`=alias.user_id
SET `browse`.`tracking_cookie_id`=alias.first_tc
WHERE `tracking_cookies`.`user_id` IS NOT NULL;

UPDATE `analytics`.`checkout`
INNER JOIN `analytics`.`tracking_cookies` ON `checkout`.`tracking_cookie_id`=`tracking_cookies`.`id`
INNER JOIN (SELECT MIN(`id`) AS first_tc, `user_id` FROM `analytics`.`tracking_cookies` WHERE `tracking_cookies`.`user_id` IS NOT NULL GROUP BY `tracking_cookies`.`user_id`) alias ON `tracking_cookies`.`user_id`=alias.user_id
SET `checkout`.`tracking_cookie_id`=alias.first_tc
WHERE `tracking_cookies`.`user_id` IS NOT NULL;

UPDATE `analytics`.`home`
INNER JOIN `analytics`.`tracking_cookies` ON `home`.`tracking_cookie_id`=`tracking_cookies`.`id`
INNER JOIN (SELECT MIN(`id`) AS first_tc, `user_id` FROM `analytics`.`tracking_cookies` WHERE `tracking_cookies`.`user_id` IS NOT NULL GROUP BY `tracking_cookies`.`user_id`) alias ON `tracking_cookies`.`user_id`=alias.user_id
SET `home`.`tracking_cookie_id`=alias.first_tc
WHERE `tracking_cookies`.`user_id` IS NOT NULL;

UPDATE `analytics`.`location`
INNER JOIN `analytics`.`tracking_cookies` ON `location`.`tracking_cookie_id`=`tracking_cookies`.`id`
INNER JOIN (SELECT MIN(`id`) AS first_tc, `user_id` FROM `analytics`.`tracking_cookies` WHERE `tracking_cookies`.`user_id` IS NOT NULL GROUP BY `tracking_cookies`.`user_id`) alias ON `tracking_cookies`.`user_id`=alias.user_id
SET `location`.`tracking_cookie_id`=alias.first_tc
WHERE `tracking_cookies`.`user_id` IS NOT NULL;

UPDATE `analytics`.`room`
INNER JOIN `analytics`.`tracking_cookies` ON `room`.`tracking_cookie_id`=`tracking_cookies`.`id`
INNER JOIN (SELECT MIN(`id`) AS first_tc, `user_id` FROM `analytics`.`tracking_cookies` WHERE `tracking_cookies`.`user_id` IS NOT NULL GROUP BY `tracking_cookies`.`user_id`) alias ON `tracking_cookies`.`user_id`=alias.user_id
SET `room`.`tracking_cookie_id`=alias.first_tc
WHERE `tracking_cookies`.`user_id` IS NOT NULL;

UPDATE `analytics`.`search`
INNER JOIN `analytics`.`tracking_cookies` ON `search`.`tracking_cookie_id`=`tracking_cookies`.`id`
INNER JOIN (SELECT MIN(`id`) AS first_tc, `user_id` FROM `analytics`.`tracking_cookies` WHERE `tracking_cookies`.`user_id` IS NOT NULL GROUP BY `tracking_cookies`.`user_id`) alias ON `tracking_cookies`.`user_id`=alias.user_id
SET `search`.`tracking_cookie_id`=alias.first_tc
WHERE `tracking_cookies`.`user_id` IS NOT NULL;

UPDATE `analytics`.`url_logs`
INNER JOIN `analytics`.`tracking_cookies` ON `url_logs`.`tracking_cookie_id`=`tracking_cookies`.`id`
INNER JOIN (SELECT MIN(`id`) AS first_tc, `user_id` FROM `analytics`.`tracking_cookies` WHERE `tracking_cookies`.`user_id` IS NOT NULL GROUP BY `tracking_cookies`.`user_id`) alias ON `tracking_cookies`.`user_id`=alias.user_id
SET `url_logs`.`tracking_cookie_id`=alias.first_tc
WHERE `tracking_cookies`.`user_id` IS NOT NULL;

UPDATE `analytics`.`venue`
INNER JOIN `analytics`.`tracking_cookies` ON `venue`.`tracking_cookie_id`=`tracking_cookies`.`id`
INNER JOIN (SELECT MIN(`id`) AS first_tc, `user_id` FROM `analytics`.`tracking_cookies` WHERE `tracking_cookies`.`user_id` IS NOT NULL GROUP BY `tracking_cookies`.`user_id`) alias ON `tracking_cookies`.`user_id`=alias.user_id
SET `venue`.`tracking_cookie_id`=alias.first_tc
WHERE `tracking_cookies`.`user_id` IS NOT NULL;

CREATE TABLE `analytics`.`event_types` (
  `id` VARCHAR(25) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `context_field_1_name` VARCHAR(255) NULL DEFAULT NULL,
  `context_field_2_name` VARCHAR(255) NULL DEFAULT NULL,
  `context_field_3_name` VARCHAR(255) NULL DEFAULT NULL,
  `context_field_4_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `analytics`.`journeys` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tracking_cookie_id` INT(11) UNSIGNED NOT NULL,
  `event_type` VARCHAR(25) NOT NULL,
  `language` VARCHAR(10) NULL DEFAULT NULL,
  `context_field_1_value` VARCHAR(255) NULL DEFAULT NULL,
  `context_field_2_value` VARCHAR(255) NULL DEFAULT NULL,
  `context_field_3_value` VARCHAR(255) NULL DEFAULT NULL,
  `context_field_4_value` VARCHAR(255) NULL DEFAULT NULL,
  `admin_id` INT(11) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `journey_event_idx` (`event_type` ASC),
  INDEX `journey_tracking_cookie_idx` (`tracking_cookie_id` ASC),
  CONSTRAINT `journey_event`
    FOREIGN KEY (`event_type`)
    REFERENCES `analytics`.`event_types` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `journey_tracking_cookie`
    FOREIGN KEY (`tracking_cookie_id`)
    REFERENCES `analytics`.`tracking_cookies` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

INSERT INTO `analytics`.`event_types` (`id`, `description`, `context_field_1_name`) VALUES ('ROOM_VIEW', 'room view', 'db.live.rooms.id');
INSERT INTO `analytics`.`event_types` (`id`, `description`, `context_field_1_name`) VALUES ('SEARCH_INTERACTION', 'search interaction', 'db.analytics.search.id');
INSERT INTO `analytics`.`event_types` (`id`, `description`, `context_field_1_name`) VALUES ('HIT_CHECKOUT', 'reaches checkout', 'db.analytics.checkout.id');
INSERT INTO `analytics`.`event_types` (`id`, `description`, `context_field_1_name`) VALUES ('MAKE_BOOKING_REQUEST', 'reaches booking confirmed', 'db.analytics.booking_confirmed.id');
INSERT INTO `analytics`.`event_types` (`id`, `description`, `context_field_1_name`) VALUES ('CONNECTION', 'reconnects to site after time', 'db.analytics.event_types.id');

INSERT INTO `analytics`.`journeys` (`tracking_cookie_id`, `event_type`, `language`, `context_field_1_value`, `created`)
SELECT `tracking_cookie_id`, 'ROOM_VIEW', `language`, `room_id`, `created` FROM `analytics`.`room`;

INSERT INTO `analytics`.`journeys` (`tracking_cookie_id`, `event_type`, `language`, `context_field_1_value`, `created`)
SELECT `tracking_cookie_id`, 'SEARCH_INTERACTION', `language`, `id`, `created` FROM `analytics`.`search`;

INSERT INTO `analytics`.`journeys` (`tracking_cookie_id`, `event_type`, `language`, `context_field_1_value`, `created`)
SELECT `tracking_cookie_id`, 'HIT_CHECKOUT', `language`, `id`, `created` FROM `analytics`.`checkout`;

INSERT INTO `analytics`.`journeys` (`tracking_cookie_id`, `event_type`, `language`, `context_field_1_value`, `admin_id`, `created`)
SELECT `tracking_cookie_id`, 'MAKE_BOOKING_REQUEST', `language`, `id`, `creator`, `created` FROM `analytics`.`booking_confirmed`;

DROP TABLE `analytics`.`room`;

ALTER TABLE `analytics`.`search`
DROP FOREIGN KEY `search_tracking_cookie_id`;
ALTER TABLE `analytics`.`search`
DROP COLUMN `created`,
DROP COLUMN `language`,
DROP COLUMN `tracking_cookie_id`,
DROP INDEX `search_tracking_cookie_id_idx`;

ALTER TABLE `analytics`.`checkout`
DROP FOREIGN KEY `checkout_tracking_cookie_id`;
ALTER TABLE `analytics`.`checkout`
DROP COLUMN `created`,
DROP COLUMN `language`,
DROP COLUMN `venue_id`,
DROP COLUMN `tracking_cookie_id`,
DROP INDEX `checkout_tracking_cookie_id_idx`;

ALTER TABLE `analytics`.`booking_confirmed`
DROP FOREIGN KEY `booking_confirmed_tracking_cookie_id`;
ALTER TABLE `analytics`.`booking_confirmed`
DROP COLUMN `created`,
DROP COLUMN `language`,
DROP COLUMN `venue_id`,
DROP COLUMN `tracking_cookie_id`,
DROP INDEX `booking_confirmed_tracking_cookie_id_idx`;

ALTER TABLE `analytics`.`checkout`
DROP COLUMN `session_id`;

ALTER TABLE `analytics`.`booking_confirmed`
DROP COLUMN `session_id`;

ALTER TABLE `analytics`.`search`
DROP COLUMN `session_id`;

ALTER TABLE `analytics`.`booking_confirmed`
DROP COLUMN `creator`;

INSERT INTO `analytics`.`event_types` (`id`, `description`, `context_field_1_name`) VALUES ('VENUE_VIEW', 'venue view', 'db.live.venues.id');

INSERT INTO `analytics`.`journeys` (`tracking_cookie_id`, `event_type`, `language`, `context_field_1_value`, `created`)
SELECT `tracking_cookie_id`, 'VENUE_VIEW', `language`, `venue_id`, `created` FROM `analytics`.`venue`;

DROP TABLE `analytics`.`venue`;

INSERT INTO `analytics`.`event_types` (`id`, `description`, `context_field_1_name`, `context_field_2_name`) VALUES ('LOCATION_VIEW', 'location view', 'db.live.locations.id', 'db.live.usageSupersets.id');

INSERT INTO `analytics`.`journeys` (`tracking_cookie_id`, `event_type`, `language`, `context_field_1_value`, `context_field_2_value`, `created`)
SELECT `analytics`.`location`.`tracking_cookie_id`, 'LOCATION_VIEW', `analytics`.`location`.`language`, `live`.`locations`.`id`, `live`.`usageSuperset_language`.`usageSuperset_id`, `analytics`.`location`.`created` FROM `analytics`.`location`
INNER JOIN `live`.`locations` ON `analytics`.`location`.`location`=`live`.`locations`.`human_desc` AND `analytics`.`location`.`country`=`live`.`locations`.`country`
INNER JOIN `live`.`usageSuperset_language` ON `analytics`.`location`.`booking_type`=`live`.`usageSuperset_language`.`alias` AND `analytics`.`location`.`language`=`live`.`usageSuperset_language`.`lang_code`;

DROP TABLE `analytics`.`location`;

INSERT INTO `analytics`.`event_types` (`id`, `description`, `context_field_1_name`) VALUES ('BROWSE_VIEW', 'browse view', 'db.live.usageSupersets.id');

INSERT INTO `analytics`.`journeys` (`tracking_cookie_id`, `event_type`, `language`, `context_field_1_value`, `created`)
SELECT `analytics`.`browse`.`tracking_cookie_id`, 'BROWSE_VIEW', `analytics`.`browse`.`language`, `live`.`usageSuperset_language`.`usageSuperset_id`, `analytics`.`browse`.`created` FROM `analytics`.`browse`
INNER JOIN `live`.`usageSuperset_language` ON `analytics`.`browse`.`booking_type`=`live`.`usageSuperset_language`.`alias` AND `analytics`.`browse`.`language`=`live`.`usageSuperset_language`.`lang_code`;

DROP TABLE `analytics`.`browse`;

INSERT INTO `analytics`.`event_types` (`id`, `description`) VALUES ('HOME_VIEW', 'home view');

INSERT INTO `analytics`.`journeys` (`tracking_cookie_id`, `event_type`, `language`, `created`)
SELECT `tracking_cookie_id`, 'HOME_VIEW', `language`, `created` FROM `analytics`.`home`;

DROP TABLE `analytics`.`home`;

UPDATE `analytics`.`event_types` SET `context_field_1_name` = 'db.live.bookings.id', `context_field_2_name` = 'db.live.users.id', `context_field_3_name` = 'keyword.expected_revenue' WHERE `id` = 'MAKE_BOOKING_REQUEST';

UPDATE `analytics`.`journeys`
INNER JOIN `analytics`.`booking_confirmed` ON `journeys`.`context_field_1_value`=`booking_confirmed`.`id`
SET `context_field_1_value` = `booking_confirmed`.`booking_id`, `context_field_2_value` = `booking_confirmed`.`user_id`, `context_field_3_value` = `booking_confirmed`.`expected_revenue`
WHERE `event_type`='MAKE_BOOKING_REQUEST';

DROP TABLE `analytics`.`booking_confirmed`;

ALTER TABLE `analytics`.`journeys`
ADD INDEX `journey_created` (`created` ASC);

ALTER TABLE `dev`.`users`
ADD COLUMN `last_contacted` DATETIME NULL DEFAULT NULL AFTER `last_login`;

CREATE TABLE `analytics`.`marketing_drives` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(45) NOT NULL,
  `priority` INT(11) NOT NULL,
  `affect_others` ENUM('wins', 'loses', 'shares') NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `analytics`.`marketing_stored_procedures` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `marketing_drive_id` INT(11) UNSIGNED NOT NULL,
  `proc_type` ENUM('COHORT', 'MAIL_DATA') NOT NULL,
  `proc_name` VARCHAR(45) NOT NULL,
  `label` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `analytics`.`marketing_stored_procedures`
ADD INDEX `marketing_sp_drive_id_idx` (`marketing_drive_id` ASC);
ALTER TABLE `analytics`.`marketing_stored_procedures`
ADD CONSTRAINT `marketing_sp_drive_id`
  FOREIGN KEY (`marketing_drive_id`)
  REFERENCES `analytics`.`marketing_drives` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

CREATE TABLE `analytics`.`marketing_mail_views` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `marketing_drive_id` INT(11) UNSIGNED NOT NULL,
  `view_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `marketing_view_drive_id_idx` (`marketing_drive_id` ASC),
  CONSTRAINT `marketing_view_drive_id`
    FOREIGN KEY (`marketing_drive_id`)
    REFERENCES `analytics`.`marketing_drives` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

INSERT INTO `analytics`.`marketing_drives` (`desc`, `priority`, `affect_others`, `active`) VALUES ('checkout but did not book', '1', 'wins', '1');

INSERT INTO `analytics`.`marketing_stored_procedures` (`marketing_drive_id`, `proc_type`, `proc_name`, `label`) VALUES ('1', 'COHORT', 'cohort_marketing', 'users');
INSERT INTO `analytics`.`marketing_stored_procedures` (`marketing_drive_id`, `proc_type`, `proc_name`, `label`) VALUES ('1', 'MAIL_DATA', 'cohort_user', 'user');
INSERT INTO `analytics`.`marketing_stored_procedures` (`marketing_drive_id`, `proc_type`, `proc_name`, `label`) VALUES ('1', 'MAIL_DATA', 'cohort_user_checkout', 'previous_checkouts');
INSERT INTO `analytics`.`marketing_stored_procedures` (`marketing_drive_id`, `proc_type`, `proc_name`, `label`) VALUES ('1', 'MAIL_DATA', 'cohort_admins', 'previous_admin');

CREATE TABLE `dev`.`tracking_cookies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(45) NOT NULL,
  `ga_client_id` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `fi_ip_address` varchar(45) NOT NULL,
  `fi_language` varchar(45) NOT NULL,
  `fi_country` varchar(45) NOT NULL,
  `fi_session_id` varchar(45) NOT NULL,
  `fi_source` varchar(45) DEFAULT NULL,
  `fi_source_url` varchar(255) DEFAULT NULL,
  `fi_medium` varchar(255) DEFAULT NULL,
  `fi_landing_page` varchar(255) DEFAULT NULL,
  `fi_date` datetime NOT NULL,
  `li_session_id` varchar(45) NOT NULL,
  `li_source` varchar(45) DEFAULT NULL,
  `li_source_url` varchar(255) DEFAULT NULL,
  `li_medium` varchar(255) DEFAULT NULL,
  `li_landing_page` varchar(255) DEFAULT NULL,
  `li_date` datetime NOT NULL,
  `created` datetime DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

INSERT INTO `dev`.`tracking_cookies`
SELECT * FROM `analytics`.`tracking_cookies`;

ALTER TABLE `analytics`.`adwords_log`
DROP FOREIGN KEY `adwords_log_tracking_cookie_id`;
ALTER TABLE `analytics`.`adwords_log`
DROP INDEX `adwords_log_tracking_cookie_id_idx`;
ALTER TABLE `analytics`.`adwords_log`
ADD INDEX `adwords_log_tracking_cookie_id_idx` (`tracking_cookie_id` ASC),
ADD CONSTRAINT `adwords_log_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `dev`.`tracking_cookies` (`id`);

ALTER TABLE `analytics`.`email_campaign_log`
ADD INDEX `email_campaign_log_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`email_campaign_log`
ADD CONSTRAINT `email_campaign_log_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `dev`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `analytics`.`facebook_log`
DROP FOREIGN KEY `facebook_log_tracking_cookie_id`;
ALTER TABLE `analytics`.`facebook_log`
DROP INDEX `facebook_log_tracking_cookie_id_idx`;
ALTER TABLE `analytics`.`facebook_log`
ADD INDEX `facebook_log_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`facebook_log`
ADD CONSTRAINT `facebook_log_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `dev`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `analytics`.`journeys`
DROP FOREIGN KEY `journey_tracking_cookie`;
ALTER TABLE `analytics`.`journeys`
DROP INDEX `journey_tracking_cookie_idx`;
ALTER TABLE `analytics`.`journeys`
ADD INDEX `journey_tracking_cookie_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`journeys`
ADD CONSTRAINT `journey_tracking_cookie`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `dev`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `analytics`.`shared_link_log`
ADD INDEX `shared_link_log_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`shared_link_log`
ADD CONSTRAINT `shared_link_log_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `dev`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `analytics`.`system_email_log`
ADD INDEX `system_email_log_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`system_email_log`
ADD CONSTRAINT `system_email_log_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `dev`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `analytics`.`url_logs`
DROP FOREIGN KEY `url_log_tracking_cookie_id`;
ALTER TABLE `analytics`.`url_logs`
DROP INDEX `url_log_tracking_cookie_id_idx` ;
ALTER TABLE `analytics`.`url_logs`
ADD INDEX `url_log_tracking_cookie_id_idx` (`tracking_cookie_id` ASC);
ALTER TABLE `analytics`.`url_logs`
ADD CONSTRAINT `url_log_tracking_cookie_id`
  FOREIGN KEY (`tracking_cookie_id`)
  REFERENCES `dev`.`tracking_cookies` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

ALTER TABLE `analytics`.`adwords_log`
CHANGE COLUMN `created` `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `analytics`.`bot_log`
CHANGE COLUMN `created` `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `analytics`.`email_campaign_log`
CHANGE COLUMN `created` `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `analytics`.`facebook_log`
CHANGE COLUMN `created` `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `analytics`.`journeys`
CHANGE COLUMN `created` `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `analytics`.`shared_link_log`
CHANGE COLUMN `created` `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `analytics`.`system_email_log`
CHANGE COLUMN `created` `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `analytics`.`url_logs`
CHANGE COLUMN `created` `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `analytics`.`url_logs`
ADD COLUMN `admin_id` INT(11) NULL DEFAULT NULL AFTER `landing_url`;

ALTER TABLE `analytics`.`bot_log`
ADD COLUMN `page_count` INT(11) NOT NULL DEFAULT 1 AFTER `name`,
ADD COLUMN `last_updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `created`;

CREATE TABLE `analytics`.`bot_log_original` SELECT * FROM `analytics`.`bot_log`;
TRUNCATE `analytics`.`bot_log`;

INSERT INTO `analytics`.`bot_log` (`name`, `page_count`) SELECT `name`, count(`id`) FROM `analytics`.`bot_log_original` GROUP BY `name`;

DROP TABLE `analytics`.`bot_log_original`;

/*v1.29 release point 31/07/17 10:00*/

CREATE TABLE `dev`.`promotions` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `dev`.`user_promotions` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) UNSIGNED NOT NULL,
  `promo_id` INT(11) UNSIGNED NOT NULL,
  `date_started` DATETIME NULL DEFAULT NULL,
  `date_expiry` DATETIME NULL DEFAULT NULL,
  `date_completed` DATETIME NULL DEFAULT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `user_promo_user_id_idx` (`user_id` ASC),
  INDEX `user_promo_promo_id_idx` (`promo_id` ASC),
  CONSTRAINT `user_promo_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `dev`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `user_promo_promo_id`
    FOREIGN KEY (`promo_id`)
    REFERENCES `dev`.`promotions` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

CREATE TABLE `dev`.`user_points` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) UNSIGNED NOT NULL,
  `promo_id` INT(11) NULL DEFAULT NULL,
  `amount` INT(11) UNSIGNED NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `user_points_user_id_idx` (`user_id` ASC),
  CONSTRAINT `user_points_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `dev`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

UPDATE `dev`.`metas`
SET `method_name`='rooms', `title` = 'Room Photos | Administrator', `meta_description` = 'Room Photos | Administrator Dashboard', `meta_keyword` = 'Room Photos | Administrator'
WHERE `controller_name`='administrator/photos' AND `method_name`='index';
UPDATE `dev`.`metas`
SET `method_name`='roomkeyword', `title` = 'Room Photos | Administrator', `meta_description` = 'Room Photos | Administrator Dashboard', `meta_keyword` = 'Room Photos | Administrator'
WHERE `controller_name`='administrator/photos' AND `method_name`='photokeyword';

INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venues', 'en', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venues', 'en_IE', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venues', 'en_US', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venues', 'de', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venues', 'fr', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venuekeyword', 'en', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venuekeyword', 'en_IE', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venuekeyword', 'en_US', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venuekeyword', 'de', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');
INSERT INTO `dev`.`metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`)
VALUES ('administrator/photos', 'venuekeyword', 'fr', 'Venue Photos | Administrator', 'Venue Photos | Administrator Dashboard', 'Venue Photos | Administrator');