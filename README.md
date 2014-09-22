![logo](static/img/logo.png)

## 介绍
- 乐玩是一个以听歌为辅、猜歌为主的音乐网站。
- 目前功能：听歌、猜歌、切歌、歌曲搜索、评论、个人主页、排行榜。
- 涉及技术：html、css、javascript、jquery、数据库、flask、python。
- 新版演示视频：http://v.youku.com/v_show/id_XNzg3OTg0NTUy.html

## 安装说明
1. 需要安装 python、flask；
2. 导入Mysql数据库信息，请将 dam.sql 文件导入数据库，操作如下：
	- mysql> create database dam;
	- mysql> use dam;
	- mysql> source path/dam.sql
2. 双击运行 musicfun.py 文件；
3. 访问 127.0.0.1:5000 即可（请使用支持html5的浏览器）。

## 其他说明
乐玩最初是一个团队产物，当时做得比较仓促，之后我进行了重构和完善。
