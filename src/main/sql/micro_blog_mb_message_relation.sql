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
-- Table structure for table `mb_message_relation`
--

DROP TABLE IF EXISTS `mb_message_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mb_message_relation` (
  `id` bigint(14) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `mid` bigint(14) NOT NULL COMMENT '信息表Id',
  `sid` bigint(14) NOT NULL COMMENT '选择人Id',
  `type` int(1) NOT NULL COMMENT '类型(1:转发; 2:喜欢)',
  `status` int(1) DEFAULT '1' COMMENT '状态(0:已读; 1:未读)',
  PRIMARY KEY (`id`),
  KEY `mid` (`mid`),
  KEY `sid` (`sid`),
  CONSTRAINT `mb_message_relation_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `mb_message` (`id`),
  CONSTRAINT `mb_message_relation_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `mb_user_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT COMMENT='博文信表相关信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mb_message_relation`
--

LOCK TABLES `mb_message_relation` WRITE;
/*!40000 ALTER TABLE `mb_message_relation` DISABLE KEYS */;
INSERT INTO `mb_message_relation` VALUES (49,28,13,2,1),(50,28,13,1,1),(51,28,13,1,1),(52,28,13,2,1),(53,29,15,2,1);
/*!40000 ALTER TABLE `mb_message_relation` ENABLE KEYS */;
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
