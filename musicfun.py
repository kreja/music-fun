#!/usr/bin/python
#coding=utf-8
import MySQLdb as mdb
import Image
import os
import sys
import random
from datetime import *  
import time
from flask import Flask,jsonify,request,render_template,session
from werkzeug import secure_filename

AVATAR_FOLDER = 'static/img/user_pic' #上传路径
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'gif', 'png', 'bmp']) #允许上传的格式

app = Flask(__name__)
app.config['AVATAR_FOLDER'] = AVATAR_FOLDER

import sys;
reload(sys);
sys.setdefaultencoding('gbk');

con = mdb.connect('127.0.0.1', 'root', '123456', 'dam',charset = "utf8")

#全局变量
music_no = str(1)
music_title = str(1)
path = str(1)
comments=[] #[名字，评论，时间，头像]
has_login = False
sum=0

#随机换歌并获取该歌信息
def rand_music():
    global music_no
    music_no = str(random.randint(1,16))

    with con:
        global music_title
        global path

        #歌名
        cur = con.cursor()
        cur.execute("SELECT music_title FROM music WHERE music_id='"+music_no+"'")
        row = cur.fetchone()
        music_title=row[0]
        
        #路径
        cur = con.cursor()
        cur.execute("SELECT music_path FROM music WHERE music_id='"+music_no+"'")
        row = cur.fetchone()
        path=row[0]
        
        #获取评论
        get_comm()
    return music_no

#获取评论
def get_comm():
    global music_no
    with con:
        global comments
        global sum
        del comments[0:sum]
        cur = con.cursor()
        sum=cur.execute("SELECT * FROM comment WHERE music_id='"+music_no+"' order by time asc")
        row = cur.fetchall()
        for i in range(sum):
            user_name=row[i][1]
            cur = con.cursor()
            cur.execute("SELECT user_pic FROM user WHERE user_name='"+user_name+"'")
            row1 = cur.fetchone()
            user_pic=row1[0]
            comments.append([row[i][1],row[i][2],row[i][3],user_pic,i])#comments[名字，评论，时间，头像，]
    return music_no
    


#登录页面
@app.route('/')
def login():
    return render_template('login.html')

#登录判断
@app.route('/_login')
def _login():
    user_name = request.args.get('a', 0, type=str)
    password = request.args.get('b', 0, type=str)
    print '1'
    with con:
        cur = con.cursor()
        cur.execute("SELECT Password FROM user WHERE user_name='"+user_name+"'")
        row = cur.fetchone()
    if row != None:
        if password != row[0]:
            return jsonify(result='0')
        else:#登陆成功
            session['user_name']= user_name
            global has_login
            has_login=True
            return jsonify(result='1')
    return jsonify(result='2')


#注册页面
@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')

#注册用户名是否已存在
@app.route('/_register_checkUsername')
def _register_checkUsername():
    user_name = request.args.get('Register_username', 0, type=str)
    with con:
        cur = con.cursor()
        sum=cur.execute("SELECT Password FROM user WHERE user_name='"+user_name+"'")
        row = cur.fetchone()
        
        if row == None:#这个名字可以注册
            return jsonify(result='1')

    return jsonify(result='0')

#注册判断，并加入数据库
@app.route('/_register')
def _register():
    user_name = request.args.get('Register_username', 0, type=str)
    password = request.args.get('Register_password', 0, type=str)
    print user_name
    print password
    with con:
        cur = con.cursor()
        sum=cur.execute("SELECT Password FROM user WHERE user_name='"+user_name+"'")
        row = cur.fetchone()
        
        if row == None:#这个名字可以注册
            cur = con.cursor()
            cur.execute("INSERT INTO user VALUES (%s,%s,%s,%s)",(user_name,password,"0","../static/img/user_pic/0.png"))#pic先给个默认的
            session['user_name']= user_name
            global has_login
            has_login=True
            return jsonify(result='1')

    return jsonify(result='0')


#猜歌页面
@app.route('/guess', methods=['GET', 'POST'])
def guess():
    with con:
        new_path=rand_music()
        global path
        if not 'user_name' in session:
            return render_template('login.html')
        
        user_name=session['user_name']
        
        cur = con.cursor()
        cur.execute("SELECT user_pic FROM user WHERE user_name='"+user_name+"'")
        row = cur.fetchone()
        user_pic=row[0]
        
    return render_template('guess.html', path=path,user_name=user_name,user_pic=user_pic)

#下一页，未完待续
def next_comment():
    global music_no
    music_no = str(random.randint(1,13))
    return music_no

#猜歌判断答案
@app.route('/_guess')
def _guess():
    a = request.args.get('answer', 0, type=str)
    with con:
        global music_title
    if a == music_title:
        #加分
        user_name=session['user_name']
        cur = con.cursor()
        cur.execute("UPDATE user SET money=money+1 WHERE user_name='"+user_name+"'")
        return jsonify(result='1')
    return jsonify(result='0')

#切歌 穿个参数过来 猜歌页面只返回路径 听歌页面还要返回歌名
@app.route('/_next')
def _next():
    page = request.args.get('page', 0, type=str)
    with con:
        new_path=rand_music()
        global path
        global music_title
        if page == "listen": #听歌页面
            return jsonify(path=path,musictitle=music_title)
    return jsonify(path=path)

#把评论传给前端
@app.route('/get_comment')
def get_comment():
    get_comm()
    return jsonify(comment=comments,sum=sum)

#提交评论
@app.route('/reply')
def reply():
    comment = request.args.get('comment', 0, type=str)
    with con:
        user_name=session['user_name']
        cur = con.cursor()
        cur.execute("INSERT INTO comment VALUES (%s,%s,%s,%s)",(music_no,user_name,comment,datetime.now()))
    return jsonify(result="1")



#个人主页
@app.route('/home', methods=['GET', 'POST'])
def home():
    with con:
        if not 'user_name' in session:
            return render_template('login.html')
        user_name=session['user_name']
        
        cur = con.cursor()
        cur.execute("SELECT money FROM user WHERE user_name='"+user_name+"'")
        row = cur.fetchone()
        leaves=row[0]

        cur = con.cursor()
        cur.execute("SELECT user_pic FROM user WHERE user_name='"+user_name+"'")
        row = cur.fetchone()
        user_pic=row[0]

        #我喜欢的歌曲
        cur = con.cursor()
        sum_songs=cur.execute("select music_title,music_like.music_id,user_name,music_artist from music,music_like where music.music_id=music_like.music_id and user_name ='"+user_name+"'")
        row = cur.fetchall()
        mysongs=row
        if sum_songs>7:
            sum_songs=7
        
        return render_template('home.html',user_name=user_name,leaves=leaves,user_pic=user_pic,mysongs=mysongs,sum_songs=sum_songs)

#退出登录
@app.route('/_logout')
def _logout():
    print '27777'
    session.pop('user_name',None)
    global has_login
    has_login=False
    return jsonify(result='1')



#选头像页面
@app.route('/choose', methods=['GET', 'POST'])
def choose():
    with con:
        if not 'user_name' in session:
            return render_template('login.html')
        if request.method == 'POST': #点击了上传头像
            file = request.files['file']
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['AVATAR_FOLDER'], filename)) #保存文件
            #向数据库更新头像
            user_name=session['user_name']
            cur = con.cursor()
            filename = "../static/img/user_pic/" + filename
            cur.execute("UPDATE user SET user_pic='"+filename+"'" + " WHERE user_name='"+user_name+"'")
    return render_template('choose.html')

#向数据库更新头像
@app.route('/_choose')
def _choose():
    picPath = request.args.get('picPath', 0, type=str)
    with con:
        user_name=session['user_name']
        cur = con.cursor()
        cur.execute("UPDATE user SET user_pic='"+picPath+"'" + " WHERE user_name='"+user_name+"'")
    return jsonify(result='1')


#听歌页面
@app.route('/listen', methods=['GET', 'POST'])
def listen():
    with con:
        new_path=rand_music()
        global path
        global music_title
        if not 'user_name' in session:
            return render_template('login.html')
        
        user_name=session['user_name']

        cur = con.cursor()
        cur.execute("SELECT user_pic FROM user WHERE user_name='"+user_name+"'")
        row = cur.fetchone()
        user_pic=row[0]
        
    return render_template('listen.html',user_name=user_name,user_pic=user_pic,path=path,music_title=music_title,music_list=_music_list())


#换一组的列表
def _music_list():
    music_list=[]
    for i in range(0,10):
        music_no = str(random.randint(1,16))
        cur = con.cursor()
        cur.execute("SELECT * FROM music WHERE music_id='"+music_no+"'")
        row = cur.fetchall()
        music_artist=row[0][2]
        music_title1=row[0][1]
        music_list.append([music_artist,music_title1,music_no])           
    return music_list

#换一组
@app.route('/_change_list')
def _change_list():
    return jsonify(result=_music_list())

#搜索
@app.route('/_search')
def _search():
    music_list=[]
    keyword = request.args.get('keyword', 0, type=str)
    print type(keyword)
    #keyword="逍遥叹"
    with con:
        cur = con.cursor()
        cur.execute("SELECT * FROM music WHERE music_title = '"+keyword+"'")
        row = cur.fetchall()
        print row
        if not row:
            music_list=[]
            error = 1
        else:
            music_artist=row[0][2]
            music_title1=row[0][1]
            music_no=row[0][0]
            music_list.append([music_artist,music_title1,music_no])
            print music_list
            error=0
    return jsonify(result=music_list, error=error)


#喜欢
@app.route('/_like')
def _like():
    with con:
        global music_no
        user_name=session['user_name']
        cur = con.cursor()
        #检查是否已喜欢过
        num=cur.execute("SELECT * FROM music_like WHERE music_id='"+music_no+"'and user_name='"+user_name+"'")
        
        if not num:#可以喜欢
            cur.execute("INSERT INTO music_like VALUES (%s,%s)",(music_no,user_name))
            return jsonify(result='ok')
    return jsonify(result='hasliked')


#选歌
@app.route('/_select')
def _select():
    selectedMusic = request.args.get('selectedMusic', 0, type=str)
    with con:
        global music_no
        music_no=selectedMusic
        global path
        global music_title
        cur = con.cursor()
        cur.execute("SELECT music_path,music_title FROM music WHERE music_id='"+music_no+"'")
        row = cur.fetchone()
        path=row[0]
        music_title=row[1]
    return jsonify(path=path,music_title=music_title)



#排行榜页面
@app.route('/top', methods=['GET', 'POST'])
def top():
    with con:
        if not 'user_name' in session:
            return render_template('login.html')
        #用户排行
        cur = con.cursor()
        sum=cur.execute("SELECT user_name,money FROM user order by money desc")
        row = cur.fetchall()
        topLeaves=row
        if sum>10:
            sum=10

        #歌曲喜欢排行
        cur = con.cursor()
        sum_songs=cur.execute("select music_title,count(music_like.music_id) as cc,music_like.music_id from music,music_like where music.music_id=music_like.music_id GROUP BY music_id ORDER BY cc DESC ")
        row = cur.fetchall()
        songs=row
        if sum_songs>10:
            sum_songs=10
    return render_template('top.html',sum=sum,topLeaves=topLeaves,sum_songs=sum_songs,songs=songs)



app.secret_key='ANBJHD'#这个怎么设？
if __name__ == '__main__':
    app.debug=True
    app.run()
