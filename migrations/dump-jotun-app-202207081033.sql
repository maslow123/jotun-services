-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: jotun-app
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `confirm_invitation`
--

DROP TABLE IF EXISTS `confirm_invitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `confirm_invitation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `counter` int NOT NULL DEFAULT '0',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirm_invitation`
--

LOCK TABLES `confirm_invitation` WRITE;
/*!40000 ALTER TABLE `confirm_invitation` DISABLE KEYS */;
INSERT INTO `confirm_invitation` VALUES (25,25,1,'2022-07-04 20:22:31'),(26,26,0,'2022-07-04 20:33:12'),(27,27,0,'2022-07-04 20:47:22'),(28,28,0,'2022-07-04 20:48:50'),(29,29,0,'2022-07-04 20:50:45'),(30,30,0,'2022-07-04 20:51:07'),(31,31,0,'2022-07-04 20:52:56'),(32,32,0,'2022-07-04 20:53:56'),(33,33,0,'2022-07-04 20:57:06'),(34,34,0,'2022-07-04 20:57:07'),(35,35,0,'2022-07-05 10:21:20'),(36,36,0,'2022-07-06 11:12:53'),(37,37,0,'2022-07-06 11:21:17'),(38,38,0,'2022-07-06 11:23:34'),(39,39,0,'2022-07-06 20:57:18'),(40,40,0,'2022-07-07 11:10:52'),(41,41,0,'2022-07-07 11:11:22'),(42,42,0,'2022-07-07 11:34:10'),(43,43,0,'2022-07-07 11:35:06'),(44,44,1,'2022-07-07 20:52:50'),(45,45,0,'2022-07-08 10:06:12');
/*!40000 ALTER TABLE `confirm_invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `category_age` varchar(10) DEFAULT NULL,
  `banner` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (6,'LOMBA MEWARNAI','0-15','https://ik.imagekit.io/rie3o8hg6/painting_Iz9CThtaU.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1656986761655'),(7,'LOMBA MEWARNAI TOTEBAG','11-28','https://ik.imagekit.io/rie3o8hg6/totebag____hmw7Vp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656987474948'),(8,'LOMBA MERANGKAI PUZZLE','6-28','https://ik.imagekit.io/rie3o8hg6/banner_6Kyhb0Mwf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656987565260');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family`
--

DROP TABLE IF EXISTS `family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `age` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `family_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family`
--

LOCK TABLES `family` WRITE;
/*!40000 ALTER TABLE `family` DISABLE KEYS */;
INSERT INTO `family` VALUES (132,43,'xxx',0,0),(133,43,'Hasbiha',2,1);
/*!40000 ALTER TABLE `family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_branches`
--

DROP TABLE IF EXISTS `master_branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_branches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_branches`
--

LOCK TABLES `master_branches` WRITE;
/*!40000 ALTER TABLE `master_branches` DISABLE KEYS */;
INSERT INTO `master_branches` VALUES (1,'Jakarta & Tangerang'),(2,'Pekanbaru'),(3,'Palembang'),(4,'Makassar'),(5,'Medan'),(6,'Surabaya'),(7,'Batam'),(8,'Balikpapan');
/*!40000 ALTER TABLE `master_branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_departments`
--

DROP TABLE IF EXISTS `master_departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_departments`
--

LOCK TABLES `master_departments` WRITE;
/*!40000 ALTER TABLE `master_departments` DISABLE KEYS */;
INSERT INTO `master_departments` VALUES (1,'Decorative Project'),(2,'Decorative Retail'),(4,'Finance & IT'),(5,'HR & GA'),(6,'Marine'),(7,'Marketing'),(8,'Powder'),(9,'Protective'),(10,'Supply Chain'),(11,'TSS'),(12,'Factory Paints'),(13,'Factory Powder'),(14,'Maintenance'),(15,'Management'),(17,'QHSE'),(18,'Warehouse');
/*!40000 ALTER TABLE `master_departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_transportations`
--

DROP TABLE IF EXISTS `master_transportations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_transportations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_transportations`
--

LOCK TABLES `master_transportations` WRITE;
/*!40000 ALTER TABLE `master_transportations` DISABLE KEYS */;
INSERT INTO `master_transportations` VALUES (1,'Kendaraan Pribadi (Mobil)'),(2,'Kendaraan Pribadi (Motor)'),(3,'Bus Powder Factory'),(4,'Bus Jotun Plant 2 - JDC');
/*!40000 ALTER TABLE `master_transportations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rewards`
--

DROP TABLE IF EXISTS `rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rewards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `rewards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rewards`
--

LOCK TABLES `rewards` WRITE;
/*!40000 ALTER TABLE `rewards` DISABLE KEYS */;
/*!40000 ALTER TABLE `rewards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `pic` text NOT NULL,
  `date` date NOT NULL,
  `time_start` time NOT NULL,
  `time_end` time NOT NULL,
  `zoom_link` text NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (1,'Test 1','herman 1','2022-07-01','07:00:00','08:00:00','http://omama.xyz',0),(2,'Test 2','herman 2','2022-07-01','08:00:00','09:00:00','http://omama.xyz',0),(3,'Test 1','herman 1','2022-07-01','07:00:00','08:00:00','http://omama.xyz',0),(4,'Test 2','herman 2','2022-07-01','08:00:00','09:00:00','http://omama.xyz',0);
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_events`
--

DROP TABLE IF EXISTS `sub_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `slots` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `sub_events_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_events`
--

LOCK TABLES `sub_events` WRITE;
/*!40000 ALTER TABLE `sub_events` DISABLE KEYS */;
INSERT INTO `sub_events` VALUES (5,6,'2022-06-24 10:00:00','2022-06-24 10:30:00',99),(6,7,'2022-06-24 10:00:00','2022-06-24 10:30:00',99),(7,8,'2022-06-24 10:00:00','2022-06-24 10:30:00',99);
/*!40000 ALTER TABLE `sub_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_events`
--

DROP TABLE IF EXISTS `user_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family_id` int NOT NULL,
  `sub_event_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `family_id` (`family_id`),
  KEY `sub_event_id` (`sub_event_id`),
  CONSTRAINT `user_events_ibfk_1` FOREIGN KEY (`family_id`) REFERENCES `family` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_events_ibfk_2` FOREIGN KEY (`sub_event_id`) REFERENCES `sub_events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_events`
--

LOCK TABLES `user_events` WRITE;
/*!40000 ALTER TABLE `user_events` DISABLE KEYS */;
INSERT INTO `user_events` VALUES (23,133,5);
/*!40000 ALTER TABLE `user_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_scan_info`
--

DROP TABLE IF EXISTS `user_scan_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_scan_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `scan_time` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_scan_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_scan_info`
--

LOCK TABLES `user_scan_info` WRITE;
/*!40000 ALTER TABLE `user_scan_info` DISABLE KEYS */;
INSERT INTO `user_scan_info` VALUES (217,43,'KEHADIRAN','KEHADIRAN',NULL,0,NULL),(218,43,'SOUVENIR','SOUVENIR',NULL,0,NULL),(219,43,'VOUCHER_BERMAIN','VOUCHER BERMAIN',NULL,0,NULL),(220,43,'SNACK','SNACK',NULL,0,NULL),(221,43,'PAKET_SEKOLAH','PAKET SEKOLAH',NULL,0,NULL),(222,43,'FOTO_VIDEO','FOTO VIDEO',NULL,0,NULL),(223,44,'KEHADIRAN','KEHADIRAN',NULL,0,NULL),(224,44,'SOUVENIR','SOUVENIR',NULL,0,NULL),(225,44,'VOUCHER_BERMAIN','VOUCHER BERMAIN',NULL,0,NULL),(226,44,'SNACK','SNACK',NULL,0,NULL),(227,44,'PAKET_SEKOLAH','PAKET SEKOLAH',NULL,0,NULL),(228,44,'FOTO_VIDEO','FOTO VIDEO',NULL,0,NULL),(229,45,'KEHADIRAN','KEHADIRAN',NULL,0,NULL),(230,45,'SOUVENIR','SOUVENIR',NULL,0,NULL),(231,45,'VOUCHER_BERMAIN','VOUCHER BERMAIN',NULL,0,NULL),(232,45,'SNACK','SNACK',NULL,0,NULL),(233,45,'PAKET_SEKOLAH','PAKET SEKOLAH',NULL,0,NULL),(234,45,'FOTO_VIDEO','FOTO VIDEO',NULL,0,NULL);
/*!40000 ALTER TABLE `user_scan_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone_number` varchar(13) NOT NULL,
  `password` varchar(100) NOT NULL,
  `department` int NOT NULL,
  `branches` int NOT NULL,
  `transportation` int DEFAULT NULL,
  `level` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_attend` tinyint(1) NOT NULL DEFAULT '0',
  `qr_code_url` text NOT NULL,
  `invitation_url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (43,'Omama Olala','6287803824644','$2b$10$l3XUV.mTdtzFZTgaGoOZ4O1d2eTsSpgONnuz3fYDLuFuqboeCV1Ga',1,1,NULL,1,'2022-07-07 11:35:06','2022-07-07 11:35:06',0,'http://jotun-family-day.oss-ap-southeast-5.aliyuncs.com/qr-l5ajca0qtxm4fqvxxz.png','http://jotun-family-day.oss-ap-southeast-5.aliyuncs.com/inv-l5ajca0qtxm4fqvxxz.png'),(44,'asd','111','$2b$10$XQjJFYMCjwP3zKmKDpPuWexNVKM8zTCcm1lWRWUuTjqZRtWauoC0y',1,7,NULL,1,'2022-07-07 20:43:10','2022-07-07 20:43:10',0,'http://jotun-family-day.oss-ap-southeast-5.aliyuncs.com/qr-l5b2wtp7rv32kxfrni.png','http://jotun-family-day.oss-ap-southeast-5.aliyuncs.com/inv-l5b2wtp7rv32kxfrni.png'),(45,'tes','123','$2b$10$fTkvM.FmYnu54LFtxzubNenV/a6avKU.l9PnULQTscylQpllDR56O',13,7,NULL,1,'2022-07-08 10:06:12','2022-07-08 10:06:12',0,'http://jotun-family-day.oss-ap-southeast-5.aliyuncs.com/qr-l5bvljzo15pz0ez39yf.png','http://jotun-family-day.oss-ap-southeast-5.aliyuncs.com/inv-l5bvljzo15pz0ez39yf.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'jotun-app'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-08 10:33:30
