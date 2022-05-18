/*
Navicat MySQL Data Transfer

Source Server         : zx
Source Server Version : 50648
Source Host           : 47.110.68.110:3306
Source Database       : javaEE

Target Server Type    : MYSQL
Target Server Version : 50648
File Encoding         : 65001

Date: 2020-06-11 13:51:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_info`
-- ----------------------------
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info` (
  `admin_id` int(10) NOT NULL,
  `admin_name` char(30) NOT NULL,
  `admin_pwd` char(50) NOT NULL,
  `telephone` char(30) NOT NULL,
  `admin_status` int(2) NOT NULL,
  `cinema_id_list` char(10) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_info
-- ----------------------------

-- ----------------------------
-- Table structure for `cinema_info`
-- ----------------------------
DROP TABLE IF EXISTS `cinema_info`;
CREATE TABLE `cinema_info` (
  `cinema_id` int(10) NOT NULL,
  `cinema_name` char(50) NOT NULL,
  `address_city` char(20) NOT NULL,
  `address_area` char(20) NOT NULL,
  `address_detail` char(100) NOT NULL,
  `score` float(10,1) NOT NULL,
  `telephone` char(30) NOT NULL,
  `cinema_status` int(2) NOT NULL,
  PRIMARY KEY (`cinema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cinema_info
-- ----------------------------
INSERT INTO `cinema_info` VALUES ('1', 'OAC影城', '杭州', '富阳区', '富阳区富春街道桂花西路82号', '10.0', '0571-58977888', '1');
INSERT INTO `cinema_info` VALUES ('2', '万达影城（D32店）', '杭州', '拱墅区', '拱墅区小河路306号D32时尚购物街区A座5层', '9.9', '0571-88077073', '1');
INSERT INTO `cinema_info` VALUES ('3', '德信影城（蜗牛广场店）', '杭州', '余杭区', '余杭区东湖北路蜗牛广场F4德信影城', '9.8', '0571-86213285', '1');
INSERT INTO `cinema_info` VALUES ('4', '时代华纳国际影城', '杭州', '临安区', '临安区笤溪北路笤溪时代广场5楼（时代广场5楼）', '9.7', '0571-61093311/18258211353', '1');
INSERT INTO `cinema_info` VALUES ('5', '星汇时代影城（临安青山店）', '杭州', '临安区', '临安区青山湖街道大园路123号', '9.6', '0571-61099076', '1');

-- ----------------------------
-- Table structure for `movie_info`
-- ----------------------------
DROP TABLE IF EXISTS `movie_info`;
CREATE TABLE `movie_info` (
  `movie_id` int(10) NOT NULL,
  `movie_name` char(30) NOT NULL,
  `director` char(30) NOT NULL,
  `actor` char(80) NOT NULL,
  `type` char(10) NOT NULL,
  `country` char(20) NOT NULL,
  `movie_length` int(10) NOT NULL,
  `plot` varchar(1000) NOT NULL,
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  `score` float(10,1) NOT NULL,
  `main_photo` char(100) NOT NULL,
  `hot` int(10) NOT NULL,
  `movie_status` int(2) NOT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of movie_info
-- ----------------------------
INSERT INTO `movie_info` VALUES ('1', '厉鬼将映', '索分·沙达菲斯', '德·辰塔维西', '惊悚，恐怖', '泰国', '95', '电影放映员谦（德·辰塔维西 饰）因沉迷大麻而陷入经济危机，毒瘾发作之际甚至不惜典当女友诵（Punch-Vorakarn Rojjanavatchra 饰）的手表，为此诵愤然离开。决心洗心革面的谦此时仍在泥潭之中，为了还上欠款，他被黑道人物逼迫盗录还未上映的新片，以谋取不义之财。某晚，谦和好友育在影院盗录一部即将上映的恐怖片《厉鬼》。中途打瞌睡的谦醒来，却发现育已不见踪影，最后竟发现育的尸体出现在影片之中。不久后他得知，影片根据一个真实事件改编，片中死于吊颈的扶桑嫂竟然确有其人。他和诵共同走访案件发生地，却', '2020-05-06', '2020-05-30', '7.1', 'https://p1.meituan.net/movie/5195e003da21d77fc3e8b9783f388bea250967.jpg@464w_644h_1e_1c', '0', '1');
INSERT INTO `movie_info` VALUES ('2', '夏洛特烦恼', '闫非，彭大魔', '沈腾，马丽', '喜剧，爱情', '中国大陆', '104', '在学生时代的初恋秋雅（王智饰）的婚礼上，毕业后吃软饭靠老婆养的夏洛（沈腾饰）假充大款，出尽其丑，中间还被老婆马冬梅（马丽饰）戳穿暴捶。混乱之中，夏洛意外穿越时空，回到了1997年的学生时代的课堂里。他懵懵懂懂，以为是场真实感极强的梦，于是痛揍王老师，强吻秋雅，还尝试跳楼让自己醒来。当受伤的他从病床上苏醒时，他意识到自己真的穿越了时空。既然有机会重新来过，那不如好好折腾一回。他勇敢追求秋雅、奚落优等生袁华（尹正饰）、拒绝马冬梅的死缠烂打。后来夏洛凭借“创作”朴树、窦唯等人的成名曲而进入娱乐圈。他的人生发生翻', '2020-05-09', '2020-05-27', '9.3', 'https://p0.meituan.net/movie/04fd9542cb749fc824190933feacc5b0294181.jpg@464w_644h_1e_1c', '0', '1');
INSERT INTO `movie_info` VALUES ('3', '战狼2', '吴京', '吴京，余男', '动作，战争', '中国大陆', '90', '在南疆围捕贩毒分子的行动中，特种部队狙击手冷锋（吴京 饰）公然违抗上级的命令，开枪射杀伤害了战友的暴徒武吉（周晓鸥 饰）。这一行动令冷锋遭到军方禁闭甚至强制退伍的处罚，不过各特种部队精英组成超级特种部队战狼中队的中队长龙小云（余男 饰），却十分欣赏这个敢作敢为且业务过硬的血性男儿，于是将其召入自己的麾下。在新近的一次演习中，冷锋凭借冷静的判断力从老首长处拔得一城，并且成功击退了突然出现的狼群。谁知在毫无准备的情况下，战狼遭到了一伙荷枪实弹分子的袭击。原来武吉的哥哥敏登（倪大红 饰）是一个冷酷无情的国际通缉', '2020-05-05', '2020-05-27', '9.3', 'https://p1.meituan.net/movie/79357c0fdcbad30f9cc495949bd8b644376363.jpg@464w_644h_1e_1c', '0', '1');
INSERT INTO `movie_info` VALUES ('4', '恐怖电影院', '袁杰', '罗翔', '悬疑，惊悚', '中国大陆', '87', '女导演林欣雅（刘妍希 饰）最新一部恐怖电影刚刚完成，但是她却沉浸在莫大的恐惧和内疚气氛之中。原来在前期拍摄过程中，女演员同时也是欣雅弟弟小艺（罗翔 饰）的女朋友夏梦（张绮烟 饰）按导演要求做了一次危险表演，结果最终意外身亡。欣雅为此疑神疑鬼，总觉得周围有夏梦的身影徘徊。除此之外，主要演员田娟（余淼 饰）和周晴（唐成静 饰）互相倾轧，欣雅的男友阿沁（魏星宇 饰）与周晴似乎维持某种微妙联系，加上制作方要在一家恐怖的电影院里召开悼念夏梦的宣传仪式，这一切都让欣雅焦虑不安。 影片宣传仪式如期举行，而恐怖诡异的事件', '2020-05-20', '2020-05-30', '3.7', 'https://p0.meituan.net/movie/80869be0b2e66d471f93f1e575fbe1324981064.jpg@464w_644h_1e_1c', '0', '1');
INSERT INTO `movie_info` VALUES ('5', '师父', '徐浩峰', '廖凡，宋佳', '剧情，动作，武侠', '中国大陆', '109', '民国年间南派咏春传人陈识（廖凡饰）来到天津，结识了天津武术泰斗郑山傲（金士杰饰），为在武术界开馆立足，郑山傲建议陈识用教徒弟踢馆的传统方式达成目的。几经周折，陈识娶了一名天津绝色女子赵国卉（宋佳饰）为妻，还收下了本地青年耿良辰（宋洋饰）为徒代其踢馆，夫妻二人暂居在贫民窟，防被踢馆的仇家前来寻仇。陈识与妻子原本看不上好斗好色的耿良辰，但接触后也发觉了耿良辰的可取之处。但随着第八家武馆邹馆长（蒋雯丽饰）和军界人士林希文（黄觉饰）的介入，天津武术界面临着一场巨变，靠武术复兴家业的愿望、对妻子的爱意，以及作为师父', '2020-05-02', '2020-05-31', '8.0', 'https://p1.meituan.net/movie/fda819fcf8c7e0359167637ee68b0067303541.jpg@464w_644h_1e_1c', '0', '1');
INSERT INTO `movie_info` VALUES ('6', '大圣归来', '张晓鹏', '张磊，张欣', '动画，动作，奇幻', '中国大陆', '89', '大闹天宫后四百年多年，齐天大圣成了一个传说，在山妖横行的长安城，孤儿江流儿（林子杰 配音）与行脚僧法明（吴文伦 配音）相依为命，小小少年常常神往大闹天宫的孙悟空（张磊 配音）。 有一天，山妖（吴迪 配音）来劫掠童男童女，江流儿救了一个小女孩，惹得山妖追杀，他一路逃跑，跑进了五行山，盲打误撞地解除了孙悟空的封印。悟空自由之后只想回花果山，却无奈腕上封印未解，又欠江流儿人情，勉强地护送他回长安城。 一路上八戒（刘九容 配音）和白龙马也因缘际化地现身，但或落魄或魔性大发，英雄不再。妖王（童自荣 配音）为抢女童，', '2020-05-07', '2020-05-28', '9.3', 'https://p0.meituan.net/movie/07b4127cff2289cd91b65628f4417ac37666558.jpg@464w_644h_1e_1c', '0', '1');

-- ----------------------------
-- Table structure for `order_info`
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `order_id` int(10) NOT NULL,
  `order_money` int(10) NOT NULL,
  `use_id` int(50) NOT NULL,
  `order_status` int(2) NOT NULL,
  `movie_id` int(2) NOT NULL,
  `screeningroom_id` int(2) NOT NULL,
  `cinema_id` int(2) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES ('0', '60', '1', '1', '1', '1', '1');
INSERT INTO `order_info` VALUES ('1', '60', '1', '1', '1', '1', '1');
INSERT INTO `order_info` VALUES ('2', '30', '1', '1', '1', '1', '1');
INSERT INTO `order_info` VALUES ('3', '30', '1', '1', '1', '1', '1');
INSERT INTO `order_info` VALUES ('4', '30', '1', '1', '1', '1', '1');
INSERT INTO `order_info` VALUES ('5', '30', '1', '1', '2', '2', '1');
INSERT INTO `order_info` VALUES ('6', '60', '1', '1', '2', '2', '1');
INSERT INTO `order_info` VALUES ('7', '30', '1', '1', '2', '2', '1');
INSERT INTO `order_info` VALUES ('8', '60', '1', '1', '2', '2', '1');
INSERT INTO `order_info` VALUES ('9', '60', '1', '1', '2', '2', '1');
INSERT INTO `order_info` VALUES ('10', '30', '1', '1', '2', '2', '1');

-- ----------------------------
-- Table structure for `screeningroom_info`
-- ----------------------------
DROP TABLE IF EXISTS `screeningroom_info`;
CREATE TABLE `screeningroom_info` (
  `screeningroom_id` int(4) NOT NULL,
  `screeningroom_name` char(20) COLLATE utf8mb4_bin NOT NULL,
  `cinema_id` int(4) NOT NULL,
  `screeningroom_status` int(4) NOT NULL,
  `movie_id` int(4) NOT NULL,
  `data_name` char(20) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`screeningroom_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of screeningroom_info
-- ----------------------------
INSERT INTO `screeningroom_info` VALUES ('1', '1号放映厅', '1', '1', '1', 'seat_info_1_1');
INSERT INTO `screeningroom_info` VALUES ('2', '2号放映厅', '1', '1', '2', 'seat_info_1_2');
INSERT INTO `screeningroom_info` VALUES ('3', '3号放映厅', '1', '1', '3', 'seat_info_1_3');
INSERT INTO `screeningroom_info` VALUES ('4', '4号放映厅', '1', '1', '4', 'seat_info_1_4');

-- ----------------------------
-- Table structure for `seat_info_1_1`
-- ----------------------------
DROP TABLE IF EXISTS `seat_info_1_1`;
CREATE TABLE `seat_info_1_1` (
  `seat_id` int(4) NOT NULL,
  `seat_row` int(4) NOT NULL,
  `seat_col` int(4) NOT NULL,
  `seat_status` int(2) NOT NULL,
  `order_id` int(4) DEFAULT NULL,
  `screeningroom_id` int(4) NOT NULL,
  `cinema_id` int(4) NOT NULL,
  `movie_id` int(4) NOT NULL,
  PRIMARY KEY (`seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of seat_info_1_1
-- ----------------------------
INSERT INTO `seat_info_1_1` VALUES ('1', '1', '1', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('2', '1', '2', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('3', '1', '3', '2', '0', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('4', '1', '4', '2', '3', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('5', '1', '5', '2', '3', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('6', '1', '6', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('7', '1', '7', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('8', '1', '8', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('9', '2', '1', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('10', '2', '2', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('11', '2', '3', '2', '4', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('12', '2', '4', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('13', '2', '5', '2', '3', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('14', '2', '6', '2', '7', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('15', '2', '7', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('16', '2', '8', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('17', '3', '1', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('18', '3', '2', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('19', '3', '3', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('20', '3', '4', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('21', '3', '5', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('22', '3', '6', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('23', '3', '7', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('24', '3', '8', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('25', '4', '1', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('26', '4', '2', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('27', '4', '3', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('28', '4', '4', '2', '1', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('29', '4', '5', '2', '5', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('30', '4', '6', '2', '0', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('31', '4', '7', '2', '0', '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('32', '4', '8', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('33', '4', '9', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('34', '4', '10', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('35', '5', '1', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('36', '5', '2', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('37', '5', '3', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('38', '5', '4', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('39', '5', '5', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('40', '5', '6', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('41', '5', '7', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('42', '5', '8', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('43', '5', '9', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('44', '5', '10', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('45', '6', '1', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('46', '6', '2', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('47', '6', '3', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('48', '6', '4', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('49', '6', '5', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('50', '6', '6', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('51', '6', '7', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('52', '6', '8', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('53', '6', '9', '1', null, '1', '1', '1');
INSERT INTO `seat_info_1_1` VALUES ('54', '6', '10', '2', '0', '1', '1', '1');

-- ----------------------------
-- Table structure for `seat_info_1_2`
-- ----------------------------
DROP TABLE IF EXISTS `seat_info_1_2`;
CREATE TABLE `seat_info_1_2` (
  `seat_id` int(4) NOT NULL,
  `seat_row` int(4) NOT NULL,
  `seat_col` int(4) NOT NULL,
  `seat_status` int(2) NOT NULL,
  `order_id` int(4) DEFAULT NULL,
  `screeningroom_id` int(4) NOT NULL,
  `cinema_id` int(4) NOT NULL,
  `movie_id` int(4) NOT NULL,
  PRIMARY KEY (`seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of seat_info_1_2
-- ----------------------------
INSERT INTO `seat_info_1_2` VALUES ('1', '1', '1', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('2', '1', '2', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('3', '1', '3', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('4', '1', '4', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('5', '1', '5', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('6', '1', '6', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('7', '1', '7', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('8', '1', '8', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('9', '2', '1', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('10', '2', '2', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('11', '2', '3', '2', '10', '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('12', '2', '4', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('13', '2', '5', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('14', '2', '6', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('15', '2', '7', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('16', '2', '8', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('17', '3', '1', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('18', '3', '2', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('19', '3', '3', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('20', '3', '4', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('21', '3', '5', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('22', '3', '6', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('23', '3', '7', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('24', '3', '8', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('25', '4', '1', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('26', '4', '2', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('27', '4', '3', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('28', '4', '4', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('29', '4', '5', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('30', '4', '6', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('31', '4', '7', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('32', '4', '8', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('33', '4', '9', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('34', '4', '10', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('35', '5', '1', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('36', '5', '2', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('37', '5', '3', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('38', '5', '4', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('39', '5', '5', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('40', '5', '6', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('41', '5', '7', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('42', '5', '8', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('43', '5', '9', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('44', '5', '10', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('45', '6', '1', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('46', '6', '2', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('47', '6', '3', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('48', '6', '4', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('49', '6', '5', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('50', '6', '6', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('51', '6', '7', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('52', '6', '8', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('53', '6', '9', '1', null, '2', '1', '2');
INSERT INTO `seat_info_1_2` VALUES ('54', '6', '10', '1', null, '2', '1', '2');

-- ----------------------------
-- Table structure for `seat_info_2_1`
-- ----------------------------
DROP TABLE IF EXISTS `seat_info_2_1`;
CREATE TABLE `seat_info_2_1` (
  `seat_id` int(4) NOT NULL,
  `seat_row` int(4) NOT NULL,
  `seat_col` int(4) NOT NULL,
  `seat_status` int(2) NOT NULL,
  `order_id` int(4) DEFAULT NULL,
  `screeningroom_id` int(4) NOT NULL,
  `cinema_id` int(4) NOT NULL,
  `movie_id` int(4) NOT NULL,
  PRIMARY KEY (`seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of seat_info_2_1
-- ----------------------------
INSERT INTO `seat_info_2_1` VALUES ('1', '1', '1', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('2', '1', '2', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('3', '1', '3', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('4', '1', '4', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('5', '1', '5', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('6', '1', '6', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('7', '1', '7', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('8', '1', '8', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('9', '2', '1', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('10', '2', '2', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('11', '2', '3', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('12', '2', '4', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('13', '2', '5', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('14', '2', '6', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('15', '2', '7', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('16', '2', '8', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('17', '3', '1', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('18', '3', '2', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('19', '3', '3', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('20', '3', '4', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('21', '3', '5', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('22', '3', '6', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('23', '3', '7', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('24', '3', '8', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('25', '4', '1', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('26', '4', '2', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('27', '4', '3', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('28', '4', '4', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('29', '4', '5', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('30', '4', '6', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('31', '4', '7', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('32', '4', '8', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('33', '4', '9', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('34', '4', '10', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('35', '5', '1', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('36', '5', '2', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('37', '5', '3', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('38', '5', '4', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('39', '5', '5', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('40', '5', '6', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('41', '5', '7', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('42', '5', '8', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('43', '5', '9', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('44', '5', '10', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('45', '6', '1', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('46', '6', '2', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('47', '6', '3', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('48', '6', '4', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('49', '6', '5', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('50', '6', '6', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('51', '6', '7', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('52', '6', '8', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('53', '6', '9', '1', null, '1', '2', '3');
INSERT INTO `seat_info_2_1` VALUES ('54', '6', '10', '1', null, '1', '2', '3');

-- ----------------------------
-- Table structure for `seat_info_2_2`
-- ----------------------------
DROP TABLE IF EXISTS `seat_info_2_2`;
CREATE TABLE `seat_info_2_2` (
  `seat_id` int(4) NOT NULL,
  `seat_row` int(4) NOT NULL,
  `seat_col` int(4) NOT NULL,
  `seat_status` int(2) NOT NULL,
  `order_id` int(4) DEFAULT NULL,
  `screeningroom_id` int(4) NOT NULL,
  `cinema_id` int(4) NOT NULL,
  `movie_id` int(4) NOT NULL,
  PRIMARY KEY (`seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of seat_info_2_2
-- ----------------------------
INSERT INTO `seat_info_2_2` VALUES ('1', '1', '1', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('2', '1', '2', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('3', '1', '3', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('4', '1', '4', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('5', '1', '5', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('6', '1', '6', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('7', '1', '7', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('8', '1', '8', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('9', '2', '1', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('10', '2', '2', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('11', '2', '3', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('12', '2', '4', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('13', '2', '5', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('14', '2', '6', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('15', '2', '7', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('16', '2', '8', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('17', '3', '1', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('18', '3', '2', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('19', '3', '3', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('20', '3', '4', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('21', '3', '5', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('22', '3', '6', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('23', '3', '7', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('24', '3', '8', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('25', '4', '1', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('26', '4', '2', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('27', '4', '3', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('28', '4', '4', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('29', '4', '5', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('30', '4', '6', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('31', '4', '7', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('32', '4', '8', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('33', '4', '9', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('34', '4', '10', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('35', '5', '1', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('36', '5', '2', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('37', '5', '3', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('38', '5', '4', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('39', '5', '5', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('40', '5', '6', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('41', '5', '7', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('42', '5', '8', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('43', '5', '9', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('44', '5', '10', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('45', '6', '1', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('46', '6', '2', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('47', '6', '3', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('48', '6', '4', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('49', '6', '5', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('50', '6', '6', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('51', '6', '7', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('52', '6', '8', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('53', '6', '9', '1', null, '2', '2', '4');
INSERT INTO `seat_info_2_2` VALUES ('54', '6', '10', '1', null, '2', '2', '4');

-- ----------------------------
-- Table structure for `seat_info_3_1`
-- ----------------------------
DROP TABLE IF EXISTS `seat_info_3_1`;
CREATE TABLE `seat_info_3_1` (
  `seat_id` int(4) NOT NULL,
  `seat_row` int(4) NOT NULL,
  `seat_col` int(4) NOT NULL,
  `seat_status` int(2) NOT NULL,
  `order_id` int(4) DEFAULT NULL,
  `screeningroom_id` int(4) NOT NULL,
  `cinema_id` int(4) NOT NULL,
  `movie_id` int(4) NOT NULL,
  PRIMARY KEY (`seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of seat_info_3_1
-- ----------------------------
INSERT INTO `seat_info_3_1` VALUES ('1', '1', '1', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('2', '1', '2', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('3', '1', '3', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('4', '1', '4', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('5', '1', '5', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('6', '1', '6', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('7', '1', '7', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('8', '1', '8', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('9', '2', '1', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('10', '2', '2', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('11', '2', '3', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('12', '2', '4', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('13', '2', '5', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('14', '2', '6', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('15', '2', '7', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('16', '2', '8', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('17', '3', '1', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('18', '3', '2', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('19', '3', '3', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('20', '3', '4', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('21', '3', '5', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('22', '3', '6', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('23', '3', '7', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('24', '3', '8', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('25', '4', '1', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('26', '4', '2', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('27', '4', '3', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('28', '4', '4', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('29', '4', '5', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('30', '4', '6', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('31', '4', '7', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('32', '4', '8', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('33', '4', '9', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('34', '4', '10', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('35', '5', '1', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('36', '5', '2', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('37', '5', '3', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('38', '5', '4', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('39', '5', '5', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('40', '5', '6', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('41', '5', '7', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('42', '5', '8', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('43', '5', '9', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('44', '5', '10', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('45', '6', '1', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('46', '6', '2', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('47', '6', '3', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('48', '6', '4', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('49', '6', '5', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('50', '6', '6', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('51', '6', '7', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('52', '6', '8', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('53', '6', '9', '1', null, '1', '3', '1');
INSERT INTO `seat_info_3_1` VALUES ('54', '6', '10', '1', null, '1', '3', '1');

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `user_id` int(10) NOT NULL,
  `user_name` char(15) NOT NULL,
  `user_nickname` char(20) NOT NULL,
  `pwd` char(50) NOT NULL,
  `telephone` char(30) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '周祥', '大帅比', '123456', '12523453');
INSERT INTO `user_info` VALUES ('2', '林稼轩', '大傻比', '123456', '34252345');
INSERT INTO `user_info` VALUES ('3', '曾国丰', '大呆比', '123456', '25243532');
INSERT INTO `user_info` VALUES ('4', '陈石', '大懒比', '123456', '42435324');
INSERT INTO `user_info` VALUES ('5', '朱炬', '大蠢比', '123456', '13242341');
