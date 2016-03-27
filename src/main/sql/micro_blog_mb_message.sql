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
-- Table structure for table `mb_message`
--

DROP TABLE IF EXISTS `mb_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mb_message` (
  `id` bigint(14) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` bigint(14) NOT NULL COMMENT '用户表id',
  `content` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '正文',
  `images` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '上传的照片(多个图片，逗号隔开)',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '发表时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `mb_message_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `mb_user_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT COMMENT='博文信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mb_message`
--

LOCK TABLES `mb_message` WRITE;
/*!40000 ALTER TABLE `mb_message` DISABLE KEYS */;
INSERT INTO `mb_message` VALUES (27,13,'我的第一条微博.......','upload/images/46db675fe75c4fa1a9f4ede54bce05db.jpeg','2016-03-27 14:19:06'),(28,13,'可以换头像和发微博','','2016-03-27 14:19:41'),(29,15,'wowowowow','','2016-03-27 14:21:14'),(30,13,'','','2016-03-27 14:36:56'),(31,13,'hello ','upload/images/796da2da16fa4784ab86a93e39bd084b.jpeg','2016-03-27 14:37:17');
/*!40000 ALTER TABLE `mb_message` ENABLE KEYS */;
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
