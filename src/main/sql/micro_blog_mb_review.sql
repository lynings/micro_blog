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
-- Table structure for table `mb_review`
--

DROP TABLE IF EXISTS `mb_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mb_review` (
  `id` bigint(14) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `mid` bigint(14) NOT NULL COMMENT '发表的博文信息表id',
  `rid` bigint(14) NOT NULL COMMENT '评论者id',
  `notify_id` bigint(14) DEFAULT NULL COMMENT '被通知用户id',
  `content` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '内容',
  `review_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  `status` int(1) DEFAULT '1' COMMENT '状态(0:已读; 1:未读)',
  PRIMARY KEY (`id`),
  KEY `mid` (`mid`),
  KEY `rid` (`rid`),
  KEY `notify_id` (`notify_id`),
  CONSTRAINT `mb_review_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `mb_message` (`id`),
  CONSTRAINT `mb_review_ibfk_2` FOREIGN KEY (`rid`) REFERENCES `mb_user_info` (`id`),
  CONSTRAINT `mb_review_ibfk_3` FOREIGN KEY (`notify_id`) REFERENCES `mb_user_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT COMMENT='博文评论表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mb_review`
--

LOCK TABLES `mb_review` WRITE;
/*!40000 ALTER TABLE `mb_review` DISABLE KEYS */;
INSERT INTO `mb_review` VALUES (24,28,14,13,'回复你','2016-03-27 14:20:15',1),(25,28,13,14,'收到','2016-03-27 14:20:41',1),(26,29,13,15,'shshshshs','2016-03-27 14:21:34',1),(27,28,13,13,'hellp','2016-03-27 14:22:19',1);
/*!40000 ALTER TABLE `mb_review` ENABLE KEYS */;
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
