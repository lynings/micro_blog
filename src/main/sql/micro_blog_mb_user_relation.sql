-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: localhost    Database: micro_blog
-- ------------------------------------------------------
-- Server version	5.6.25

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
-- Table structure for table `mb_user_relation`
--

DROP TABLE IF EXISTS `mb_user_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mb_user_relation` (
  `id` bigint(14) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` bigint(14) NOT NULL COMMENT '用户表id',
  `worship_id` bigint(14) NOT NULL COMMENT '崇拜者id',
  `type` int(1) DEFAULT '2' COMMENT '类型（1：粉丝；2：关注）',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `worship_id` (`worship_id`),
  CONSTRAINT `mb_user_relation_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `mb_user_info` (`id`),
  CONSTRAINT `mb_user_relation_ibfk_2` FOREIGN KEY (`worship_id`) REFERENCES `mb_user_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT COMMENT='关注表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mb_user_relation`
--

LOCK TABLES `mb_user_relation` WRITE;
/*!40000 ALTER TABLE `mb_user_relation` DISABLE KEYS */;
INSERT INTO `mb_user_relation` VALUES (175,14,13,2),(176,14,15,2),(177,15,14,2),(178,15,13,2),(179,13,15,2);
/*!40000 ALTER TABLE `mb_user_relation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-27 14:40:06
