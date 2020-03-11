CREATE DATABASE  IF NOT EXISTS `dev_server` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dev_server`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 95.138.155.46    Database: dev_server
-- ------------------------------------------------------
-- Server version	5.1.73-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `youtube` text,
  `google` text,
  `adsense` text,
  `youtube2` text,
  `desc` text,
  `author` text,
  `keywords` text,
  `peuser` varchar(100) DEFAULT NULL,
  `pepass` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `amnities`
--

DROP TABLE IF EXISTS `amnities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amnities` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(111) NOT NULL,
  `description` varchar(333) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `list_id` bigint(20) NOT NULL,
  `group_id` bigint(20) NOT NULL,
  `availability` varchar(31) NOT NULL,
  `value` varchar(30) NOT NULL,
  `currency` varchar(7) NOT NULL,
  `notes` text NOT NULL,
  `style` varchar(11) NOT NULL,
  `booked_using` varchar(30) NOT NULL,
  `booked_days` int(31) NOT NULL,
  `created` int(31) NOT NULL,
  `last_update_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=192 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cancellation_policy`
--

DROP TABLE IF EXISTS `cancellation_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cancellation_policy` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `site_name` varchar(155) NOT NULL,
  `cancellation_title` varchar(155) NOT NULL,
  `cancellation_content` text NOT NULL,
  `status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ci_sessions`
--

DROP TABLE IF EXISTS `ci_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ci_sessions` (
  `session_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  `ip_address` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  `user_agent` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_info`
--

DROP TABLE IF EXISTS `contact_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `street` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `country` varchar(30) NOT NULL,
  `pincode` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `country_symbol` varchar(3) CHARACTER SET utf8 NOT NULL,
  `country_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `phone_ind` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2001 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency_name` varchar(150) NOT NULL,
  `currency_code` varchar(5) NOT NULL,
  `currency_symbol` varchar(10) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `default` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `currency_change`
--

DROP TABLE IF EXISTS `currency_change`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency_change` (
  `currFrom` varchar(10) NOT NULL,
  `currInto` varchar(10) NOT NULL,
  `rate` float NOT NULL,
  PRIMARY KEY (`currFrom`,`currInto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `email_settings`
--

DROP TABLE IF EXISTS `email_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_settings` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(111) NOT NULL,
  `name` varchar(111) NOT NULL,
  `value` varchar(111) NOT NULL,
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `email_templates`
--

DROP TABLE IF EXISTS `email_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(64) CHARACTER SET utf8 NOT NULL,
  `title` text CHARACTER SET utf8 NOT NULL,
  `mail_subject` text CHARACTER SET utf8 NOT NULL,
  `email_body_text` text CHARACTER SET utf8 NOT NULL,
  `email_body_html` text CHARACTER SET ucs2 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faq` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(128) CHARACTER SET utf8 NOT NULL,
  `faq_content` text CHARACTER SET utf8 NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created` int(31) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ical_import`
--

DROP TABLE IF EXISTS `ical_import`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ical_import` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `list_id` int(50) NOT NULL,
  `url` varchar(500) NOT NULL,
  `last_sync` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(7) NOT NULL,
  `name` varchar(30) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '0',
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `is_enable` tinyint(4) NOT NULL DEFAULT '1',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `approved` tinyint(4) NOT NULL DEFAULT '0',
  `title` text CHARACTER SET utf8,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` text CHARACTER SET utf8,
  `exact` int(11) NOT NULL,
  `directions` text CHARACTER SET utf8,
  `lat` decimal(18,14) NOT NULL,
  `long` decimal(18,14) NOT NULL,
  `property_id` int(11) NOT NULL,
  `room_type` varchar(50) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `beds` int(11) NOT NULL,
  `bed_type` varchar(50) NOT NULL,
  `bathrooms` float NOT NULL,
  `amenities` varchar(111) NOT NULL,
  `desc` text CHARACTER SET utf8,
  `capacity` int(11) NOT NULL,
  `street_view` smallint(6) NOT NULL,
  `price` int(11) NOT NULL,
  `sublet_price` int(50) NOT NULL,
  `sublet_status` enum('0','1') NOT NULL,
  `sublet_startdate` varchar(150) NOT NULL,
  `sublet_enddate` varchar(150) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `manual` text CHARACTER SET utf8 NOT NULL,
  `page_viewed` bigint(20) NOT NULL,
  `review` int(11) NOT NULL DEFAULT '0',
  `created` int(31) NOT NULL,
  `updated` int(31) NOT NULL,
  `neighbor` varchar(60) NOT NULL,
  `min_stay` int(11) NOT NULL,
  `comm` int(11) NOT NULL,
  `comm_host` int(11) NOT NULL,
  `comm_trav` int(11) NOT NULL,
  `room_uses` varchar(255) NOT NULL,
  `selectall_status` enum('0','1') NOT NULL DEFAULT '0',
  `twosets_status` enum('0','1') NOT NULL DEFAULT '0',
  `startend_status` enum('0','1') NOT NULL DEFAULT '0',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `setuptime_status` enum('0','1') NOT NULL,
  `setuptime_hourse` varchar(20) NOT NULL,
  `selltime_status` enum('0','1') NOT NULL,
  `selltime_days` varchar(20) NOT NULL,
  `room_cancel_percent` int(11) NOT NULL,
  `room_cancel_days` int(11) NOT NULL,
  `room_agreement_status` enum('0','1') NOT NULL DEFAULT '0',
  `room_agreement_upload` varchar(255) NOT NULL,
  `room_envior_att` varchar(200) NOT NULL,
  `room_audio` varchar(200) NOT NULL,
  `room_catering` varchar(200) NOT NULL,
  `other_specification` varchar(200) NOT NULL,
  `special_comments` text NOT NULL,
  `room_edit` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=663 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `list_photo`
--

DROP TABLE IF EXISTS `list_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list_photo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `list_id` bigint(20) NOT NULL,
  `name` varchar(333) NOT NULL,
  `is_featured` tinyint(4) NOT NULL DEFAULT '0',
  `created` int(31) NOT NULL,
  `slider` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2625 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `login_attempts`
--

DROP TABLE IF EXISTS `login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_attempts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=526 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `message_type`
--

DROP TABLE IF EXISTS `message_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `url` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `list_id` bigint(20) unsigned NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL DEFAULT '0',
  `userby` int(11) NOT NULL,
  `userto` int(11) NOT NULL,
  `subject` varchar(70) NOT NULL,
  `message` text CHARACTER SET utf8 NOT NULL,
  `created` int(31) NOT NULL,
  `is_read` tinyint(4) NOT NULL DEFAULT '0',
  `is_starred` tinyint(4) NOT NULL,
  `message_type` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=170 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `metas`
--

DROP TABLE IF EXISTS `metas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(111) NOT NULL,
  `name` varchar(300) NOT NULL,
  `title` text NOT NULL,
  `meta_description` text NOT NULL,
  `meta_keyword` text NOT NULL,
  `title_name` text NOT NULL,
  `subtitle` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neighbor_area`
--

DROP TABLE IF EXISTS `neighbor_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neighbor_area` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `city_id` int(50) NOT NULL,
  `area` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neighbor_city`
--

DROP TABLE IF EXISTS `neighbor_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neighbor_city` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `Country` varchar(80) NOT NULL,
  `State` varchar(80) NOT NULL,
  `City` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `page`
--

DROP TABLE IF EXISTS `page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page` (
  `id` int(111) NOT NULL AUTO_INCREMENT,
  `page_name` varchar(111) NOT NULL,
  `page_title` varchar(111) NOT NULL,
  `page_url` varchar(111) NOT NULL,
  `is_footer` tinyint(4) NOT NULL,
  `page_content` text NOT NULL,
  `created` int(31) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paykey`
--

DROP TABLE IF EXISTS `paykey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paykey` (
  `paykey` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payment_details`
--

DROP TABLE IF EXISTS `payment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_id` smallint(6) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `value` varchar(111) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `payment_name` varchar(30) NOT NULL,
  `is_enabled` smallint(6) NOT NULL DEFAULT '0',
  `is_live` smallint(6) NOT NULL DEFAULT '0',
  `is_payout` smallint(6) NOT NULL DEFAULT '0',
  `arrives_on` varchar(111) NOT NULL,
  `fees` varchar(30) NOT NULL,
  `currency` varchar(5) NOT NULL,
  `note` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paymode`
--

DROP TABLE IF EXISTS `paymode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymode` (
  `id` tinyint(4) NOT NULL,
  `mod_name` varchar(111) NOT NULL,
  `is_premium` tinyint(4) NOT NULL DEFAULT '0',
  `is_fixed` tinyint(4) NOT NULL DEFAULT '0',
  `fixed_amount` float NOT NULL,
  `percentage_amount` float NOT NULL,
  `modified_date` varchar(111) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payout_preferences`
--

DROP TABLE IF EXISTS `payout_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payout_preferences` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `user_id` int(111) NOT NULL,
  `country` varchar(7) NOT NULL,
  `payout_type` smallint(6) NOT NULL,
  `email` varchar(50) NOT NULL,
  `currency` varchar(7) NOT NULL,
  `is_default` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paywhom`
--

DROP TABLE IF EXISTS `paywhom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paywhom` (
  `id` int(11) NOT NULL,
  `whom` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price` (
  `id` int(11) NOT NULL,
  `night` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `guests` smallint(6) NOT NULL,
  `addguests` int(11) NOT NULL,
  `cleaning` int(11) NOT NULL,
  `security` int(11) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `comm` int(11) NOT NULL,
  `comm_host` int(11) NOT NULL,
  `comm_trav` int(11) NOT NULL,
  `ranking` int(11) NOT NULL DEFAULT '50',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profile_picture`
--

DROP TABLE IF EXISTS `profile_picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_picture` (
  `email` text NOT NULL,
  `src` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `id` bigint(20) NOT NULL,
  `Fname` varchar(255) DEFAULT NULL,
  `Lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `live` text,
  `work` text,
  `phnum` varchar(255) DEFAULT NULL,
  `describe` text,
  `user_type` int(11) NOT NULL DEFAULT '0',
  `bus_first_name` varchar(200) CHARACTER SET utf8 NOT NULL,
  `bus_last_name` varchar(200) CHARACTER SET utf8 NOT NULL,
  `bus_email` varchar(200) CHARACTER SET utf8 NOT NULL,
  `bus_email_only` enum('0','1') CHARACTER SET utf8 DEFAULT NULL,
  `bus_phone` varchar(255) NOT NULL,
  `address_status` int(11) NOT NULL,
  `parking` int(11) NOT NULL,
  `bussiness_name` varchar(200) CHARACTER SET utf8 NOT NULL,
  `venue_type` varchar(200) CHARACTER SET utf8 NOT NULL,
  `website` varchar(200) CHARACTER SET utf8 NOT NULL,
  `address` text CHARACTER SET utf8,
  `neighbor` varchar(60) NOT NULL,
  `exact` int(11) NOT NULL,
  `directions` text CHARACTER SET utf8,
  `lat` decimal(18,14) NOT NULL,
  `long` decimal(18,14) NOT NULL,
  `street_view` smallint(6) NOT NULL,
  `room_cancel_percent` int(11) NOT NULL,
  `room_cancel_days` int(11) NOT NULL,
  `room_agreement_status` enum('0','1') NOT NULL DEFAULT '0',
  `room_agreement_upload` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recommends`
--

DROP TABLE IF EXISTS `recommends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recommends` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userby` bigint(20) NOT NULL,
  `userto` bigint(20) NOT NULL,
  `message` text NOT NULL,
  `created` int(31) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referrals`
--

DROP TABLE IF EXISTS `referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referrals` (
  `id` int(111) NOT NULL AUTO_INCREMENT,
  `invite_from` int(111) NOT NULL,
  `invite_to` int(111) NOT NULL,
  `join_date` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referrals_amount`
--

DROP TABLE IF EXISTS `referrals_amount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referrals_amount` (
  `id` int(111) NOT NULL AUTO_INCREMENT,
  `user_id` int(111) NOT NULL,
  `count_trip` int(111) NOT NULL,
  `count_book` int(111) NOT NULL,
  `amount` varchar(111) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referrals_booking`
--

DROP TABLE IF EXISTS `referrals_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referrals_booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payer_id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `ref_amount` int(11) NOT NULL,
  `is_full` int(1) NOT NULL,
  `date` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint(20) NOT NULL,
  `list_id` int(111) NOT NULL,
  `userby` int(11) NOT NULL,
  `userto` int(111) NOT NULL,
  `checkin` varchar(50) NOT NULL,
  `checkout` varchar(50) NOT NULL,
  `no_quest` tinyint(4) NOT NULL,
  `currency` varchar(11) NOT NULL,
  `price` float NOT NULL,
  `topay` float NOT NULL,
  `admin_commission` float NOT NULL,
  `credit_type` tinyint(4) NOT NULL,
  `ref_amount` int(111) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL,
  `is_payed` tinyint(4) NOT NULL DEFAULT '0',
  `payment_id` tinyint(4) NOT NULL,
  `payed_date` varchar(111) NOT NULL,
  `book_date` int(31) NOT NULL,
  `subtotal` varchar(255) NOT NULL,
  `hostemailpaypal` varchar(255) NOT NULL,
  `adminemailpaypal` varchar(255) NOT NULL,
  `hostamountpaypal` varchar(255) NOT NULL,
  `adminamountpaypal` varchar(255) NOT NULL,
  `comments` text CHARACTER SET utf8,
  `meeting_type` varchar(250) CHARACTER SET utf8 NOT NULL,
  `roomconf` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_lid_checkin` (`list_id`,`checkin`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation_status`
--

DROP TABLE IF EXISTS `reservation_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservation_status` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userby` bigint(20) NOT NULL,
  `userto` bigint(20) NOT NULL,
  `reservation_id` bigint(20) NOT NULL,
  `list_id` bigint(20) NOT NULL,
  `review` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `feedback` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `cleanliness` smallint(6) NOT NULL,
  `communication` smallint(6) NOT NULL,
  `house_rules` smallint(6) NOT NULL,
  `accuracy` tinyint(4) NOT NULL,
  `checkin` tinyint(4) NOT NULL,
  `location` tinyint(4) NOT NULL,
  `value` tinyint(4) NOT NULL,
  `created` int(31) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_ameniti_rent`
--

DROP TABLE IF EXISTS `room_ameniti_rent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_ameniti_rent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `aminty_name` varchar(200) NOT NULL,
  `aminty_rent` decimal(11,2) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3380 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_audio_visual`
--

DROP TABLE IF EXISTS `room_audio_visual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_audio_visual` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `short_name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_availability`
--

DROP TABLE IF EXISTS `room_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `day_id` int(11) NOT NULL,
  `start1` varchar(20) NOT NULL,
  `end1` varchar(20) NOT NULL,
  `start2` varchar(20) NOT NULL,
  `end2` varchar(20) NOT NULL,
  `select_status` int(11) NOT NULL,
  `time_block` varchar(250) NOT NULL,
  `time_block2` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_rid_did_ss` (`room_id`,`day_id`,`select_status`)
) ENGINE=MyISAM AUTO_INCREMENT=21426 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_capacity`
--

DROP TABLE IF EXISTS `room_capacity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_capacity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `boardroom` int(7) NOT NULL,
  `classroom` int(7) NOT NULL,
  `banquet` int(7) NOT NULL,
  `theatre` int(7) NOT NULL,
  `workspace` int(7) NOT NULL,
  `open` int(7) NOT NULL,
  `ushaped` int(7) NOT NULL,
  `room_size` int(7) NOT NULL,
  `parameter` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_room_id` (`room_id`,`boardroom`,`classroom`,`banquet`,`theatre`,`workspace`,`open`,`ushaped`)
) ENGINE=MyISAM AUTO_INCREMENT=609 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_catring`
--

DROP TABLE IF EXISTS `room_catring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_catring` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `short_name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_environment`
--

DROP TABLE IF EXISTS `room_environment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_environment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `short_name` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_new_calendar`
--

DROP TABLE IF EXISTS `room_new_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_new_calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `time_status` int(11) NOT NULL,
  `repeats` varchar(200) NOT NULL,
  `event_tiltle` varchar(200) NOT NULL,
  `room_space` varchar(200) NOT NULL,
  `host_name` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `notes` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `setting_type` char(1) CHARACTER SET utf8 NOT NULL,
  `value_type` char(1) CHARACTER SET utf8 NOT NULL,
  `int_value` int(12) DEFAULT NULL,
  `string_value` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `text_value` text CHARACTER SET utf8,
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settings_extra`
--

DROP TABLE IF EXISTS `settings_extra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings_extra` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `setting_type` char(1) CHARACTER SET utf8 NOT NULL,
  `value_type` char(1) CHARACTER SET utf8 NOT NULL,
  `int_value` int(12) DEFAULT NULL,
  `string_value` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `text_value` text CHARACTER SET utf8,
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `toplocation_categories`
--

DROP TABLE IF EXISTS `toplocation_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `toplocation_categories` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(111) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `toplocations`
--

DROP TABLE IF EXISTS `toplocations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `toplocations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` smallint(6) NOT NULL,
  `name` varchar(111) NOT NULL,
  `search_code` varchar(111) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_autologin`
--

DROP TABLE IF EXISTS `user_autologin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_autologin` (
  `key_id` char(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_id` mediumint(8) NOT NULL DEFAULT '0',
  `user_agent` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_ip` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_notification`
--

DROP TABLE IF EXISTS `user_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_notification` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `periodic_offers` smallint(5) NOT NULL,
  `company_news` smallint(5) NOT NULL,
  `upcoming_reservation` smallint(5) NOT NULL,
  `new_review` smallint(5) NOT NULL,
  `leave_review` smallint(5) NOT NULL,
  `standby_guests` smallint(5) NOT NULL,
  `rank_search` smallint(5) NOT NULL,
  `user_id` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=474 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `country` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `website` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=549 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_profile_new`
--

DROP TABLE IF EXISTS `user_profile_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile_new` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `con_first_name` varchar(200) NOT NULL,
  `con_last_name` varchar(200) NOT NULL,
  `con_email` varchar(200) NOT NULL,
  `con_phone` int(11) NOT NULL,
  `bus_first_name` varchar(200) NOT NULL,
  `bus_last_name` varchar(200) NOT NULL,
  `bus_email` varchar(200) NOT NULL,
  `bus_phone` int(11) NOT NULL,
  `address_status` int(11) NOT NULL,
  `parking` int(11) NOT NULL,
  `bussiness_name` varchar(200) NOT NULL,
  `venue_type` varchar(200) NOT NULL,
  `website` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_temp`
--

DROP TABLE IF EXISTS `user_temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(34) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `activation_key` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_ip` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL DEFAULT '1',
  `ref_id` varchar(50) NOT NULL,
  `fb_id` bigint(20) NOT NULL,
  `twitter_id` bigint(20) NOT NULL,
  `coupon_code` varchar(50) NOT NULL,
  `username` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `timezone` varchar(11) NOT NULL,
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `ban_reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `newpass` varchar(34) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `newpass_key` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `newpass_time` datetime DEFAULT NULL,
  `last_ip` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_login` int(31) NOT NULL,
  `created` int(31) NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `salt` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=474 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'dev_server'
--
/*!50003 DROP PROCEDURE IF EXISTS `make_intervals` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`GuillaumeZip`@`localhost` PROCEDURE `make_intervals`(startdate timestamp, enddate timestamp, intval integer, unitval varchar(10),  room_id integer)
BEGIN

   declare thisDate timestamp;
   declare nextDate timestamp;
   declare bookingsOn integer;
   declare hoursavailable integer;
   declare dayId integer;
   declare endofday timestamp;
   declare reservedTime integer;
   declare bookingsPossible boolean;
   declare timeRemaining integer;
   declare roomID integer;
  
   set thisDate = startdate;
   set roomID = room_id;

  

   -- *************************************************************************
   -- Drop / create the temp table
   -- *************************************************************************
   drop temporary table if exists time_intervals;
   create temporary table if not exists time_intervals
      (
      interval_start timestamp,
      interval_end timestamp,
      time_available integer,
      bookings_on integer,
      reserved_time integer,
      bookings_possible boolean,
      time_remaining integer
      );

   -- *************************************************************************
   -- Loop through the startdate adding each intval interval until enddate
   -- *************************************************************************
   repeat
      select
         case unitval
            when 'MICROSECOND' then timestampadd(MICROSECOND, intval, thisDate)
            when 'SECOND'      then timestampadd(SECOND, intval, thisDate)
            when 'MINUTE'      then timestampadd(MINUTE, intval, thisDate)
            when 'HOUR'        then timestampadd(HOUR, intval, thisDate)
            when 'DAY'         then timestampadd(DAY, intval, thisDate)
            when 'WEEK'        then timestampadd(WEEK, intval, thisDate)
            when 'MONTH'       then timestampadd(MONTH, intval, thisDate)
            when 'QUARTER'     then timestampadd(QUARTER, intval, thisDate)
            when 'YEAR'        then timestampadd(YEAR, intval, thisDate)
         end into nextDate;
         
      set endofday = timestampadd(MICROSECOND, -1, nextDate);   
         
      set dayId = DAYOFWEEK(thisDate)-1;
      
      set hoursavailable = (SELECT ((end1-start1) + (end2-start2))*60*60 from room_availability where room_availability.`room_id` = roomID and day_id = dayId and select_status = 1);
        
      set bookingsOn = 1;
      set bookingsOn = (SELECT IF(count(*)>0,1,0) FROM reservation WHERE  reservation.list_id = room_id  AND  (FROM_UNIXTIME(checkin) < endofday AND FROM_UNIXTIME(checkout) >  thisDate));
      
      set reservedTime = (SELECT (IFNULL((select SUM(TIME_TO_SEC(TIMEDIFF(FROM_UNIXTIME(checkout),FROM_UNIXTIME(checkin))))  FROM reservation WHERE (FROM_UNIXTIME(checkin) < endofday AND FROM_UNIXTIME(checkout) >  thisDate) AND reservation.list_id = room_id) ,0)+ 0) as reserved_time);

     set timeRemaining = (hoursavailable-reservedTime);

     IF reservedTime < hoursavailable THEN 
      set bookingsPossible = True; 
     ELSE 
       set bookingsPossible = False;
     END IF;
     
      insert into time_intervals select thisDate, timestampadd(MICROSECOND, -1, nextDate),hoursavailable,bookingsOn,reservedTime,bookingsPossible,timeRemaining;
      set thisDate = nextDate;
   until thisDate >= enddate
   end repeat;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-09-24 17:07:49
