/*
Navicat MySQL Data Transfer

Source Server         : kelly
Source Server Version : 50519
Source Host           : localhost:3306
Source Database       : dam

Target Server Type    : MYSQL
Target Server Version : 50519
File Encoding         : 65001

Date: 2013-11-24 11:29:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `music_id` varchar(11) CHARACTER SET utf8 DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`user_name`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', 'admin', '哈哈！你们都猜不到~~', '2013-11-21 15:41:21');
INSERT INTO `comment` VALUES ('2', 'admin', '嘿嘿~So easy~', '2013-11-21 15:47:20');
INSERT INTO `comment` VALUES ('1', 'admin', '怎么又是这首歌。。。', '2013-11-21 16:17:35');
INSERT INTO `comment` VALUES ('3', 'admin', '评论', '2013-11-21 17:41:54');
INSERT INTO `comment` VALUES ('1', 'admin', 'test', '2013-11-21 17:43:56');
INSERT INTO `comment` VALUES ('8', 'admin', '1', '2013-11-23 14:47:49');
INSERT INTO `comment` VALUES ('6', 'admin', 'bb', '2013-11-23 14:48:45');
INSERT INTO `comment` VALUES ('14', 'admin', 'huge!', '2013-11-23 15:22:19');
INSERT INTO `comment` VALUES ('7', 'admin', 'd', '2013-11-23 19:32:45');
INSERT INTO `comment` VALUES ('1', 'admin', 'd', '2013-11-23 19:33:18');
INSERT INTO `comment` VALUES ('4', 'admin', 'w', '2013-11-23 20:18:10');
INSERT INTO `comment` VALUES ('4', 'admin', 'good', '2013-11-23 20:18:53');
INSERT INTO `comment` VALUES ('5', 'admin', 'hu', '2013-11-23 20:22:55');
INSERT INTO `comment` VALUES ('9', 'admin', 'womenkanyixia', '2013-11-23 20:38:19');
INSERT INTO `comment` VALUES ('4', 'admin', 'wolai', '2013-11-24 00:20:37');
INSERT INTO `comment` VALUES ('4', 'admin2', 'hhghgg', '2013-11-23 15:18:43');
INSERT INTO `comment` VALUES ('1', 'kelly', 't', '2013-11-23 14:51:49');
INSERT INTO `comment` VALUES ('9', 'kelly', 'zheshishenme', '2013-11-23 22:55:20');
INSERT INTO `comment` VALUES ('12', 'sparkmorry', 'ruyan', '2013-11-23 20:49:59');
INSERT INTO `comment` VALUES ('1', 'test', '诶，好囧啊', '2013-11-23 15:16:34');

-- ----------------------------
-- Table structure for music
-- ----------------------------
DROP TABLE IF EXISTS `music`;
CREATE TABLE `music` (
  `music_id` varchar(11) NOT NULL,
  `music_title` varchar(255) DEFAULT NULL,
  `music_artist` varchar(255) DEFAULT NULL,
  `music_pic` varchar(255) DEFAULT NULL,
  `music_lrc_path` varchar(255) DEFAULT NULL,
  `music_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`music_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of music
-- ----------------------------
INSERT INTO `music` VALUES ('1', 'Best Of Me', 'Daniel Powter', null, '../static/music/Daniel Powter - Best Of Me.lrc', '../static/music/Daniel Powter - Best Of Me.mp3');
INSERT INTO `music` VALUES ('10', '倔强', '五月天', null, '../static/music/五月天 - 倔强.lrc', '../static/music/五月天 - 倔强.mp3');
INSERT INTO `music` VALUES ('11', '垃圾车', '五月天', null, '../static/music/五月天 - 垃圾车.lrc', '../static/music/五月天 - 垃圾车.mp3');
INSERT INTO `music` VALUES ('12', '如烟', '五月天', null, '../static/music/五月天 - 如烟.lrc', '../static/music/五月天 - 如烟.mp3');
INSERT INTO `music` VALUES ('13', '突然好想你', '五月天', null, '../static/music/五月天 - 突然好想你.lrc', '../static/music/五月天 - 突然好想你.mp3');
INSERT INTO `music` VALUES ('14', '逍遥叹', '胡歌', null, '../static/music/仙剑奇侠传 - 逍遥叹.lrc', '../static/music/仙剑奇侠传 - 逍遥叹.mp3');
INSERT INTO `music` VALUES ('15', '爱', '小虎队', null, '../static/music/小虎队 - 爱.lrc', '../static/music/小虎队 - 爱.mp3');
INSERT INTO `music` VALUES ('16', '简单快乐', '谢娜', null, '../static/music/谢娜 - 简单快乐.lrc', '../static/music/谢娜 - 简单快乐.mp3');
INSERT INTO `music` VALUES ('2', 'Stand', 'jewel', null, '../static/music/jewel-Stand.lrc', '../static/music/jewel-Stand.mp3');
INSERT INTO `music` VALUES ('3', 'Beautiful Disaster', 'Kelly Clarkson', null, '../static/music/Kelly Clarkson - Beautiful Disaster.lrc', '../static/music/Kelly Clarkson - Beautiful Disaster.mp3');
INSERT INTO `music` VALUES ('4', 'High歌', '黄龄', null, '../static/music/黄龄 - High歌.lrc', '../static/music/黄龄 - High歌.mp3');
INSERT INTO `music` VALUES ('5', '逍遥', '霍建华', null, '../static/music/霍建华 - 逍遥.lrc', '../static/music/霍建华 - 逍遥.mp3');
INSERT INTO `music` VALUES ('6', '原来你也在这里', '刘若英', null, '../static/music/刘若英 - 原来你也在这里.lrc', '../static/music/刘若英 - 原来你也在这里.mp3');
INSERT INTO `music` VALUES ('7', '好心分手', '卢巧音', null, '../static/music/卢巧音 - 好心分手.lrc', '../static/music/卢巧音 - 好心分手.mp3');
INSERT INTO `music` VALUES ('8', '牡丹江', '南拳妈妈', null, '../static/music/南拳妈妈 - 牡丹江.lrc', '../static/music/南拳妈妈 - 牡丹江.mp3');
INSERT INTO `music` VALUES ('9', '小镇姑娘', '陶喆', null, '../static/music/陶喆 - 小镇姑娘.lrc', '../static/music/陶喆 - 小镇姑娘.mp3');

-- ----------------------------
-- Table structure for music_like
-- ----------------------------
DROP TABLE IF EXISTS `music_like`;
CREATE TABLE `music_like` (
  `music_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  PRIMARY KEY (`music_id`,`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of music_like
-- ----------------------------
INSERT INTO `music_like` VALUES ('1', 'admin');
INSERT INTO `music_like` VALUES ('1', 'admin2');
INSERT INTO `music_like` VALUES ('11', 'admin');
INSERT INTO `music_like` VALUES ('14', 'admin');
INSERT INTO `music_like` VALUES ('15', 'admin');
INSERT INTO `music_like` VALUES ('4', 'kelly');
INSERT INTO `music_like` VALUES ('9', 'admin');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `money` varchar(255) DEFAULT NULL,
  `user_pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin', '123', '11', '../static/images/user_pic/2.png');
INSERT INTO `user` VALUES ('admin2', '123', '1', '../static/images/user_pic/3.png');
INSERT INTO `user` VALUES ('henry', '123', '1', '../static/images/user_pic/4.png');
INSERT INTO `user` VALUES ('kelly', '123', '4', '../static/images/user_pic/1.png');
INSERT INTO `user` VALUES ('sparkmorry', '123', '0', '../static/images/user_pic/2.png');
INSERT INTO `user` VALUES ('test', 'test', '0', '../static/images/user_pic/0.png');
