/*
 Navicat Premium Data Transfer

 Source Server         : ThinkJSAdmin
 Source Server Type    : MySQL
 Source Server Version : 50644
 Source Host           : 39.106.88.8:3306
 Source Schema         : think_js_admin

 Target Server Type    : MySQL
 Target Server Version : 50644
 File Encoding         : 65001

 Date: 06/02/2023 20:24:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auth
-- ----------------------------
DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `type` int(11) DEFAULT NULL COMMENT '菜单类型 1目录 2菜单 3按钮',
  `pid` int(11) DEFAULT NULL COMMENT '上级菜单',
  `name` varchar(255) DEFAULT NULL COMMENT '菜单名称',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `layout` int(11) DEFAULT '1',
  `auth_name` varchar(255) DEFAULT NULL COMMENT '权限字段',
  `router_name` varchar(255) DEFAULT NULL COMMENT '路由名称',
  `router_url` varchar(255) DEFAULT NULL COMMENT '路由地址',
  `component_url` varchar(255) DEFAULT NULL COMMENT '组件路径',
  `sort` int(11) DEFAULT NULL COMMENT '菜单序号',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='权限表【目录、菜单、按钮】';

-- ----------------------------
-- Records of auth
-- ----------------------------
BEGIN;
INSERT INTO `auth` VALUES (1, 1, 0, '系统管理', 'setting', 1, 'sys:manage', 'system', '/system', NULL, 1, '2022-03-05 18:37:10', '2022-03-05 18:37:13');
INSERT INTO `auth` VALUES (2, 2, 1, '用户管理', 'user', 1, 'sys:user', 'user', '/system/user', 'user/index', 1, '2022-03-05 18:42:56', '2022-03-05 18:42:58');
INSERT INTO `auth` VALUES (3, 3, 2, '新增', NULL, 1, 'sys:user:add', NULL, NULL, NULL, NULL, '2022-03-05 18:45:46', '2022-03-05 18:45:48');
INSERT INTO `auth` VALUES (4, 3, 2, '编辑', NULL, 1, 'sys:user:edit', NULL, NULL, NULL, NULL, '2022-03-18 10:37:35', '2022-03-18 10:37:37');
INSERT INTO `auth` VALUES (5, 3, 2, '删除', NULL, 1, 'sys:user:del', NULL, NULL, NULL, NULL, '2022-03-18 10:37:41', '2022-03-18 10:37:43');
INSERT INTO `auth` VALUES (6, 3, 2, '分配角色', NULL, 1, 'sys:user:dist', NULL, NULL, NULL, NULL, '2022-03-18 10:37:47', '2022-03-18 10:37:50');
INSERT INTO `auth` VALUES (7, 2, 1, '部门管理', 'school', 1, 'sys:mech', 'mech', '/system/mech', 'mech/index', 2, '2022-03-18 10:37:29', '2022-03-18 10:37:31');
INSERT INTO `auth` VALUES (8, 3, 7, '新增', NULL, 1, 'sys:mech:add', NULL, NULL, NULL, NULL, '2022-03-18 10:39:35', '2022-03-18 10:39:38');
INSERT INTO `auth` VALUES (9, 3, 7, '编辑', NULL, 1, 'sys:mech:edit', NULL, NULL, NULL, NULL, '2022-03-18 10:40:13', '2022-03-18 10:40:15');
INSERT INTO `auth` VALUES (10, 3, 7, '删除', NULL, 1, 'sys:mech:del', NULL, NULL, NULL, NULL, '2022-03-18 10:40:48', '2022-03-18 10:40:50');
INSERT INTO `auth` VALUES (11, 2, 1, '角色管理', 'avatar', 1, 'sys:role', 'role', '/system/role', 'role/index', 2, '2022-03-18 22:45:30', '2022-03-18 22:45:32');
INSERT INTO `auth` VALUES (12, 3, 11, '新增', NULL, 1, 'sys:role:add', NULL, NULL, NULL, NULL, '2022-03-18 22:46:55', '2022-03-18 22:46:57');
INSERT INTO `auth` VALUES (13, 3, 11, '编辑', NULL, 1, 'sys:role:edit', NULL, NULL, NULL, NULL, '2022-03-18 22:47:24', '2022-03-18 22:47:26');
INSERT INTO `auth` VALUES (14, 3, 11, '删除', NULL, 1, 'sys:role:del', NULL, NULL, NULL, NULL, '2022-03-18 22:47:47', '2022-03-18 22:47:49');
INSERT INTO `auth` VALUES (15, 3, 11, '分配权限', NULL, 1, 'sys:role:dist', NULL, NULL, NULL, NULL, '2022-03-18 22:48:57', '2022-03-18 22:48:59');
INSERT INTO `auth` VALUES (16, 2, 1, '权限管理', 'lock', 1, 'sys:auth', 'auth', '/system/auth', 'auth/index', 2, '2022-03-18 23:03:22', '2022-03-18 23:03:24');
INSERT INTO `auth` VALUES (17, 3, 16, '新增', NULL, 1, 'sys:auth:add', NULL, NULL, NULL, NULL, '2022-03-18 23:04:51', '2022-03-18 23:04:53');
INSERT INTO `auth` VALUES (18, 3, 16, '编辑', NULL, 1, 'sys:auth:edit', NULL, NULL, NULL, NULL, '2022-03-18 23:05:18', '2022-03-18 23:05:20');
INSERT INTO `auth` VALUES (19, 3, 16, '删除', NULL, 1, 'sys:auth:del', NULL, NULL, NULL, NULL, '2022-03-18 23:05:41', '2022-03-18 23:05:43');
INSERT INTO `auth` VALUES (21, 3, 1, '1', '0', 1, '1', '0', '0', '0', 0, '2022-03-19 19:09:38', '2022-03-19 19:09:38');
COMMIT;

-- ----------------------------
-- Table structure for mech
-- ----------------------------
DROP TABLE IF EXISTS `mech`;
CREATE TABLE `mech` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门ID',
  `pid` int(11) DEFAULT '0' COMMENT '树结构ID，0代表根节点',
  `code` varchar(255) DEFAULT NULL COMMENT '部门编码',
  `name` varchar(255) DEFAULT NULL COMMENT '部门名称',
  `phone` varchar(255) DEFAULT NULL COMMENT '部门电话',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='部门表';

-- ----------------------------
-- Records of mech
-- ----------------------------
BEGIN;
INSERT INTO `mech` VALUES (1, 0, 'LBB', '龙宝宝网络科技', '17610086895', '2022-03-05 17:50:38', '2022-03-05 17:50:40');
INSERT INTO `mech` VALUES (2, 1, 'RJKF', '软件开发', '17610086895', '2022-03-05 17:51:50', '2022-03-18 15:43:37');
INSERT INTO `mech` VALUES (3, 2, 'QD', '前端', '17610086893', '2022-03-05 17:54:12', '2022-03-05 17:54:14');
INSERT INTO `mech` VALUES (4, 2, 'HD', '后端', '17610086892', '2022-03-05 17:54:29', '2022-03-05 17:54:31');
INSERT INTO `mech` VALUES (7, 0, '1', '龙宝宝餐饮有限公司', '1', '2022-03-18 16:04:50', '2022-03-18 16:05:33');
INSERT INTO `mech` VALUES (8, 4, 'TEST', '测试', '17610086895', '2022-03-18 21:31:09', '2022-03-18 22:17:38');
INSERT INTO `mech` VALUES (9, 4, '555', '555', '555', '2022-03-18 21:45:57', '2022-03-18 22:17:15');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `auth_ids` varchar(255) DEFAULT NULL COMMENT '权限ID',
  `name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  `remarks` varchar(255) DEFAULT NULL COMMENT '角色备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES (1, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,16,17,18,19', '超级管理员', '超级管理员的备注', '2022-03-05 18:27:53', '2022-03-19 13:18:58');
INSERT INTO `role` VALUES (3, '2,3,4,5,6,9,1,7', '测试', '测试', '2022-03-19 13:21:04', '2022-03-19 15:59:42');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `mech_id` int(11) DEFAULT NULL COMMENT '部门ID',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `account` varchar(255) DEFAULT NULL COMMENT '账号',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `name` varchar(255) DEFAULT NULL COMMENT '用户名称',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 1, 1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2F2021%2Fedpic%2Ff1%2F88%2F71%2Ff1887154048414c4134e8bf7a3262a19_1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637133950&t=d45d1500f8', '张三', '2022-03-05 18:28:53', '2022-03-05 18:28:55');
INSERT INTO `user` VALUES (2, 1, 1, '123456', '21232f297a57a5a743894a0e4a801fc3', NULL, '李四', '2022-03-18 21:28:34', '2022-03-18 21:28:34');
INSERT INTO `user` VALUES (5, 9, 1, '888', '21232f297a57a5a743894a0e4a801fc3', NULL, '888', '2022-03-18 22:32:07', '2022-03-18 22:32:07');
INSERT INTO `user` VALUES (6, 8, 3, 'ceshi', '21232f297a57a5a743894a0e4a801fc3', NULL, 'ceshi', '2023-02-06 16:31:17', '2023-02-06 16:31:17');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
