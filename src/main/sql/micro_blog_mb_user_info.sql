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
-- Table structure for table `mb_user_info`
--

DROP TABLE IF EXISTS `mb_user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mb_user_info` (
  `id` bigint(14) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '名字',
  `username` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `password` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '密码',
  `sex` int(1) DEFAULT '0' COMMENT '性别 (0:无选择; 1:男; 2:女)',
  `birth` date DEFAULT NULL COMMENT '生日',
  `image` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `status` int(1) DEFAULT '1' COMMENT '状态（0:删除; 1:正常; 2:黑名单）',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mb_user_info`
--

LOCK TABLES `mb_user_info` WRITE;
/*!40000 ALTER TABLE `mb_user_info` DISABLE KEYS */;
INSERT INTO `mb_user_info` VALUES (13,'lyning','123123','3a15ecaac814993c268a2e8448dcd7b0',0,NULL,'upload/images/27aa2754a6c3471c974d38557b5298d8.jpeg',1,'2016-03-27 14:18:32'),(14,'blink','234234','f8911983ae773b28d6b71f512284b857',0,NULL,NULL,1,'2016-03-27 14:18:41'),(15,'345345','345345','7daab1af65754d37cddebc855dc9c57e',0,NULL,NULL,1,'2016-03-27 14:18:48');
/*!40000 ALTER TABLE `mb_user_info` ENABLE KEYS */;
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
