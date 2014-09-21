// 通用函数区 =============================================================
// 通用功能函数===========================
//加载函数
function addLoadEvent( func )
{
	var oldonload = window.onload;
	
	if(typeof window.onload != 'function')
	{
		window.onload = func;
	}
	else
	{
		window.onload = function()
		{
			oldonload();
			func();
		};
	}
};

//移动 obj 到 iTarget
function startMove ( obj, iTarget )
{
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){MoveTo(obj,iTarget)}, 30)
};

function MoveTo( obj, iTarget )
{
	var iSpeed = (iTarget - obj.offsetLeft) / 10;
	iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	iTarget == obj.offsetLeft ? clearInterval(obj.timer) : obj.style.left = iSpeed + obj.offsetLeft + "px";
}

//样式（获取-设置）
function css(obj, attr, value)
{
	switch (arguments.length)
	{
		case 2:
			if(typeof arguments[1] == "object")
			{	
				for (var i in attr) i == "opacity" ? (obj.style["filter"] = "alpha(opacity=" + attr[i] + ")", obj.style[i] = attr[i] / 100) : obj.style[i] = attr[i];
			}
			else
			{	
				return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
			}
			break;
		case 3:
			attr == "opacity" ? (obj.style["filter"] = "alpha(opacity=" + value + ")", obj.style[attr] = value / 100) : obj.style[attr] = value;
			break;
	}
};

//获取元素
var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};

//时间格式化，返回正确格式的时间
function fnFormatTime( argTime )
{
	var year;
	var time;
	var month;
	var day;
	
	//正则
	var regTime = new RegExp("[0-9]{2}:[0-9]{2}:[0-9]{2}"); //小时-分0秒
	var regYear = new RegExp("[0-9]{4}");
	var aMonth = ["Jan", "Feb", "Mar", "Apr","May", "Jun","Jul", "Aug","Sep", "Oct", "Nov", "Dec" ];
	var regDay = new RegExp("[0-9]{2}");
	
	//时间格式化
	//小时-分-秒
	time = regTime.exec( argTime );
	//年
	year = regYear.exec( argTime );
	//月
	for( var j = 0; j < aMonth.length; j++)
	{
		var regMonth = new RegExp(aMonth[j]);
		month = regMonth.exec( argTime );
		if( month )
		{
			month = format(j + 1);
			break;
		}
	}
	//日
	day = format( regDay.exec( argTime ) );
	//整合时间
	return year +"-"+ month +"-"+ day +" "+ time;
}
	
//如果为一位数时前面补0
function format(str)
{
	return str.toString().replace(/^(\d)$/,"0$1")
}

// 通用=旋转提示效果
// 旋转体,移动文字，插入的文字，旋转类，文字移动目标
function fnRotate( oTip, oTxt, sInnerHTML, sClassNameRotate, iLeft)
{
	//清除内联样式，保证回到最初
	oTxt.style.cssText = "";
	
	var iOriLeft = oTxt.offsetLeft; // 原始 left
	var resetClass = ( sClassNameRotate == "rotateRight" ? "rotateLeft" : "rotateRight");
	oTip.className = "nav-tip " + sClassNameRotate;
	if( sInnerHTML ) oTxt.innerHTML = sInnerHTML;
	startMove( oTxt, iLeft );
	
	//几秒后左旋转回
	setTimeout(function()
	{
		oTip.className = "nav-tip " + resetClass;
		startMove( oTxt, iOriLeft );
	},2400);
}



// 通用页面函数==============================================================
// 通用页面函数==============================================================

// 猜歌页面获得，全局=====
// 因为正式进入是猜歌页面，所以到了猜歌页面就会赋值了
if(document.getElementById("this-username"))
	var sThisUsername = document.getElementById("this-username").innerHTML; //记录用户名
if(document.getElementById("this-userpic"))
	var sThisUserPic = document.getElementById("this-userpic").innerHTML; //记录用户名

var iStaticPage = 0; //全局，记录当前页数

// 通用==退出登录========
function fnExit()
{
	var oExit = document.getElementById("exit");
	if( ! oExit ) return;
	
	oExit.onclick = function()
	{
		$.getJSON($SCRIPT_ROOT + '/_logout',{
		},function(data)
		{
			location.href="/";
		});	
	}
}
addLoadEvent( fnExit );

// 左侧通用导航===========================
function fNav()
{ 
	var oHomeLink = document.getElementById("home-link");
	if( ! oHomeLink ) return; //没有该导航，退出
	var oCloud = document.getElementById("cloud");
	
	var oListenTrigger = document.getElementById("nav-listen");
	var oListenTip = document.getElementById("listen-tip");
	var oListenTxt = document.getElementById("txt-listen");
	
	var oGuessTrigger = document.getElementById("nav-guess");
	var oGuessTip = document.getElementById("guess-tip");
	var oGuessTxt = document.getElementById("txt-guess");
	
	var oTopTrigger = document.getElementById("nav-top");
	var oTopTip = document.getElementById("top-tip");
	var oTopTxt = document.getElementById("txt-top");
	
	//移到眼睛上，移动云
	oHomeLink.onmouseover = function()
	{
		startMove( oCloud, -5 );
	}
	
	oHomeLink.onmouseout = function()
	{
		startMove( oCloud, -30 );
	}
	
	oListenTrigger.onmouseover = function()
	{
		oListenTip.className = "nav-tip rotateRight";
		startMove( oListenTxt, 85 )
	}
	
	oListenTrigger.onmouseout = function()
	{
		oListenTip.className = "nav-tip rotateLeft";
		startMove( oListenTxt, 55 )
	}
	
	oGuessTrigger.onmouseover = function()
	{
		oGuessTip.className = "nav-tip rotateLeft";
		startMove( oGuessTxt, -15 )
	}
	
	oGuessTrigger.onmouseout = function()
	{
		oGuessTip.className = "nav-tip rotateRight";
		startMove( oGuessTxt, 55 )
	}
	
	oTopTrigger.onmouseover = function()
	{
		oTopTip.className = "nav-tip rotateRight";
		startMove( oTopTxt, 85 )
	}
	
	oTopTrigger.onmouseout = function()
	{
		oTopTip.className = "nav-tip rotateLeft";
		startMove( oTopTxt, 55 )
	}
}
addLoadEvent( fNav );

// 通用=静音切换=音量调节======
function fnSwitchMute()
{
	var oVolumePic = document.getElementById("volume-pic");
	if( !oVolumePic ) return;
	var oSong = document.getElementById("songs"); //播放器
	var oVolume = document.getElementById("volume"); //音量
	var ilastVolume = oVolume.value; //上一次音量
	
	oVolumePic.onclick = function()
	{
		//音量开启着
		var regExpOn = new RegExp("volumeOn.png$");
		
		//开吗？ 关 : 开;
		regExpOn.test( oVolumePic.src ) ? fnVolumeOff() : fnVolumeOn( true );
	}
	
	function fnVolumeOff()
	{
		ilastVolume = oVolume.value; //记住上一次音量，以便恢复
		oVolumePic.src = "../static/img/volumeOff.png";
		oVolumePic.alt = "volume off";
		oVolume.value = 0;
		oSong.volume = 0;
		oVolume.style.backgroundColor = "#aaa";
	}
	
	function fnVolumeOn( bFromOff )
	{
		oVolumePic.src = "../static/img/volumeOn.png";
		oVolumePic.alt = "volume on";
		if( bFromOff ) oVolume.value = ilastVolume; //如果是静音后，恢复到静音前的音量
		oSong.volume = oVolume.value / 10;
		oVolume.style.backgroundColor = "#feb015";
	}
	
	oVolume.onchange = function()
	{
		oSong.volume = oVolume.value/10;
		if( oSong.volume == 0 )
		{
			fnVolumeOff();
		}
		else
		{
			fnVolumeOn();
		}
	}
}
addLoadEvent( fnSwitchMute );
	
// 通用=执行切歌======
function fnSwitchSong(argPage){
	//有参数就是听歌页面，要返回歌名的
	argPage = ( argPage == "listen" ? "listen" : "guess" );
	$.getJSON($SCRIPT_ROOT + '/_next',{
		page: argPage
	},function(data){
		var path = data.path;
		var musictitle = data.musictitle;
		document.getElementById("songs").src=path;
		
		if(musictitle)
		{
			document.getElementById("current_music").innerHTML = musictitle;
		}
	});	
	
	//切换评论
	fnGetComments();
}

// 通用=评论====================
function fnBtnSendComment()
{
	var oNewComment  =document.getElementById("new-comment"); //新评论
	if( !oNewComment ) return;
	var oSendBtn = document.getElementById("btn-comment"); //评论按钮
	if( !oSendBtn ) return;
	var oCommentResultTip = document.getElementById("comment-result-tip");
	var oTxtCommentResult = document.getElementById("txt-comment-result");
	
	oSendBtn.onclick = function()
	{
		if( ! oNewComment.value )
		{				
			//加个右旋转
			fnRotate( oCommentResultTip, oTxtCommentResult, false, "rotateRight", 75);
			oNewComment.focus();
		}
		else
		{// 上传评论
			$.getJSON($SCRIPT_ROOT + '/reply', {
				comment: oNewComment.value
			}, function(data) {
				if(data.result==1)
				{
					fnSendComment(oNewComment.value); //只要推下去就行，最后一条确实被盖住了，但是翻页的时候是从数据库重新取的
				}
			});
		}
		return false;
	}
}
addLoadEvent( fnBtnSendComment );

// 通用=显示发送的评论==============
function fnSendComment(sComment)
{
	var oCommentArea = document.getElementById("comment-area");
	if( !oCommentArea ) return;
	var oForm = oCommentArea.getElementsByTagName("form")[0];
	var oUl = document.getElementById("comment-list");
	var aLi = oUl.getElementsByTagName("li");
	var timer = null;
	var commentTime = fnFormatTime( new Date() );//评论时间，时间格式化
		
	//检查是否要显示下一页
	if( aLi.length >= 3)
	{//如果已经有三项，就显示下一页
		fnPageState(3);
	}
	
	//新建评论项
	var oLi = document.createElement("li");
	oLi.innerHTML = "<img id=\"avatar\" src=\""+ sThisUserPic +"\"/>\
					<div class=\"comment-txt-area\">\
						<p>\
							<span id=\"time\" class=\"time\">" + commentTime + "</span>\
							<span id=\"username\" class=\"username\">" + sThisUsername + "</span>\
						</p>\
						<p id=\"comment\" class=\"comment\">" + sComment + "</p>\
					</div>"

	//插入元素
	aLi.length ? oUl.insertBefore(oLi, aLi[0]) : oUl.appendChild(oLi);
	
	//重置表单
	oForm.reset();
	
	fnSliderDecoration( oLi );
}

// 滑动插入效果
function fnSliderDecoration( oLi )
{
	//将元素高度保存
	var iHeight = oLi.clientHeight - parseFloat(css(oLi, "paddingTop")) - parseFloat(css(oLi, "paddingBottom"));
	var alpah = count = 0;
	css(oLi, {"opacity" : "0", "height" : "0"});	
	timer = setInterval(function ()
	{
		css(oLi, {"display" : "block", "opacity" : "0", "height" : (count += 8) + "px"});
		if (count > iHeight)
		{
			clearInterval(timer);
			css(oLi, "height", iHeight + "px");
			timer = setInterval(function ()
			{
				css(oLi, "opacity", (alpah += 10));
				alpah > 100 && (clearInterval(timer), css(oLi, "opacity", 100))
			},30)
		}
	},30);
}
		
// 通用=获取评论 ============
function fnGetComments(argPage)
{	
	var oUl = document.getElementById("comment-list");
	if( !oUl ) return;
	var aLi = oUl.getElementsByTagName("li");
	var iShowNum = 3; //每页显示3条评论
	var iCurrentPage = ( argPage ? argPage : 0 ); //有参数就按参数，否则从0开始
	iStaticPage = iCurrentPage;
	var commentTime;
	
	$.getJSON($SCRIPT_ROOT + '/get_comment',{
	},function(data){
		aComment=data.comment; //评论 二维数组[[username,comment,time,avatar],[...]]
		sum=data.sum; //评论数	
		
		var iArg = sum - iCurrentPage * iShowNum -iShowNum;
		
		//清除旧评论
		while(aLi.length)
		{
			oUl.removeChild( aLi[0] );
		}
		
		//显示评论
		for( var i = 0; i < iShowNum; i++ )
		{
			//切换 上一页 下一页 按钮的状态
			fnPageState(iArg + i);
			//alert(iArg + i); //debug
			
			if( ! aComment[ iArg + i ]) 
			{
				continue; //没有评论了，下一个循环
			}

			//时间格式化
			commentTime = fnFormatTime( aComment[ iArg + i ][2] );

			//新建评论项
			var oLi = document.createElement("li");
			oLi.innerHTML = "<img id=\"avatar\" src=\"" + aComment[ iArg + i ][3] + "\"/>\
							<div class=\"comment-txt-area\">\
								<p>\
									<span id=\"time\" class=\"time\">" + commentTime + "</span>\
									<span id=\"username\" class=\"username\">" + aComment[ iArg + i ][0] + "</span>\
								</p>\
								<p id=\"comment\" class=\"comment\">" + aComment[ iArg + i ][1] + "</p>\
							</div>"


			//插入评论
			aLi.length ? oUl.insertBefore(oLi, aLi[0]) : oUl.appendChild(oLi);
		}					
	});	
}
addLoadEvent( fnGetComments );	

// 通用=上一页=下一页的状态
function fnPageState()
{
	var oPreviousPage = document.getElementById("previous-page");
	if( !oPreviousPage ) return;
	var oNextPage = document.getElementById("next-page");
	if( !oNextPage ) return;
	
	//最新页，不能上一页了
	//没好，还要禁止点击
	iStaticPage == 0 ? oPreviousPage.style.display="none": oPreviousPage.style.display="inline-block";
	
	arguments[0] <= 2 ? oNextPage.style.display="none": oNextPage.style.display="inline-block";
	
}

//上下翻页的时候其实不用再次获取评论了，这个还没好
// function fnAjaxGetComments()
// {
	// $.getJSON($SCRIPT_ROOT + '/get_comment',{
	// },function(data){
		// aComment=data.comment; //评论 二维数组[[username,comment,time,avatar],[...]]
		// sum=data.sum; //评论数			
	// });	
// }
	
// 通用=上一页
function fnPreviousPage()
{
	var oPreviousPage = document.getElementById("previous-page");
	if( !oPreviousPage ) return;
	
	oPreviousPage.onclick = function()
	{
		//alert("debug");
		//评论切到上一页
		fnGetComments(--iStaticPage);
		return false;
	}
}
addLoadEvent( fnPreviousPage );	

// 通用=下一页
function fnNextPage()
{
	var oNextPage = document.getElementById("next-page");
	if( !oNextPage ) return;
	
	oNextPage.onclick = function()
	{
		//alert("debug");
		//评论切到下一页
		fnGetComments(++iStaticPage);
		//alert(iStaticPage);
		return false;
	}
}
addLoadEvent( fnNextPage );	

// 通用=Ajax点击选歌
function fnAjaxChooseSong( obj )
{
	//最后一个 span
	var aSpan = obj.getElementsByTagName("span");
	var oSpan = aSpan[aSpan.length-1];
	var selectedMusic = oSpan.innerHTML;
	
	$.getJSON($SCRIPT_ROOT + '/_select',{
		selectedMusic:selectedMusic
	},function(data)
	{
		path=data.path;
		music_title=data.music_title;
		document.getElementById('songs').src = path;
		document.getElementById('current_music').innerHTML = music_title;
	});
	
	fnGetComments(); //获取评论
}

// 通用=听歌、排行榜页面=选歌
function fnChooseSong()
{
	var oUl = document.getElementById("song-list");
	if( ! oUl ) return;
	var aLi = oUl.getElementsByTagName("li");
	
	for( var i = 0; i < aLi.length; i++ )
	{
		aLi[i].onclick = function()
		{
			fnAjaxChooseSong( this );
		}
	}
}
addLoadEvent( fnChooseSong );



// 细分页面函数===================================================================
// 细分页面函数===================================================================

// 登录页面===========================
function fLogin()
{
	if( !document.getElementById("login")) return;//不是登录页面就退出
		
	var oUsername = document.getElementById("login-username");//用户名
	var oPassword = document.getElementById("login-password");//密码
	var oLogBtn = document.getElementById("login-btn");//登录按钮
	var oError = document.getElementById("login-error");
	var oUsernameError = document.getElementById("login-username-error");
	var oPasswordError = document.getElementById("login-password-error");
	
	oLogBtn.onclick =function()
	{
		if( !oUsername.value )
		{//用户名没输入
			oUsernameError.style.display = "inline";
		}
		else if( !oPassword.value )
		{//密码没输入
			oPasswordError.style.display = "inline";
		}
		else
		{//传到服务器
				$.getJSON($SCRIPT_ROOT + '/_login', {
					a: oUsername.value,
					b: oPassword.value
				}, function(data) {
					if(data.result==0)
					{
						oError.style.display = "inline";
						oError.innerHTML ="账号和密码不匹配";
					}
					if(data.result==1)
						location.href="/guess";
					if(data.result==2)
					{
						oError.style.display = "inline";
						oError.innerHTML ="该用户名不存在";
					}
				});
		}
		return false;
	}

	//自动检查用户名是否已输入
	oUsername.onkeyup = function()
	{
		if(oUsername.value)
		{
			oUsernameError.style.display = "none";
		}
	}
	//自动检查密码是否已输入
	oPassword.onkeyup = function()
	{
		if(oPassword.value)
		{
			oPasswordError.style.display = "none";
		}
	}
	
}
addLoadEvent( fLogin );

//注册页面============================
function fRegister()
{
	if( !document.getElementById("register")) return;//不是注册页面就退出
		
	var oUsername = document.getElementById("register-username");//用户名
	var oPassword1 = document.getElementById("register-password1");//密码
	var oPassword2 = document.getElementById("register-password2");//重复密码
	var oBtn = document.getElementById("register-btn");//注册按钮
	
	var oError = document.getElementById("register-error");
	var oUsernameError = document.getElementById("register-username-error");
	var oPasswordError1 = document.getElementById("register-password-error1");
	var oPasswordError2 = document.getElementById("register-password-error2");
	
	oBtn.onclick =function()
	{
		if( !oUsername.value )
		{//用户名没输入
			oUsernameError.innerHTML ="请输入用户名";
			oUsernameError.style.display = "inline";
		}
		else if( !oPassword1.value )
		{//密码没输入
			oPasswordError1.style.display = "inline";
		}
		else if( !oPassword2.value )
		{//重复密码没输入
			oPasswordError2.innerHTML = "请确认密码";
			oPasswordError2.style.display = "inline";
		}
		else if( oPassword1.value != oPassword2.value)
		{//两次密码不一致
			oPasswordError2.innerHTML = "两次密码不一致";
			oPasswordError2.style.display = "inline";
		}
		else
		{//传到服务器
				$.getJSON($SCRIPT_ROOT + '/_register', {
					Register_username: oUsername.value,
					Register_password: oPassword1.value,
				}, function(data) {
					if(data.result==0)
					{
						oError.style.display = "inline";
						oError.innerHTML ="用户名已存在";
					}
					else if(data.result==1)
						location.href="/choose";
				});
		}
		return false;
	}
		
	//自动检查用户名是否已输入
	oUsername.onkeyup = function()
	{
		if(oUsername.value)
		{
			oUsernameError.style.display = "none";
			
			//检查用户名是否已存在
			$.getJSON($SCRIPT_ROOT + '/_register_checkUsername', {
				Register_username: oUsername.value
			}, function(data) {
				if(data.result==0)
				{
					oUsernameError.innerHTML ="用户名已存在";
					oUsernameError.style.display = "inline";
				}
			});
			
		}
	}
	
	//自动检查密码是否已输入
	oPassword1.onkeyup = function()
	{
		if(oPassword1.value)
		{
			oPasswordError1.style.display = "none";
		}
	}
	//自动检查重复密码是否已输入
	oPassword2.onkeyup = function()
	{
		if(oPassword2.value)
		{
			oPasswordError2.style.display = "none";
		}
	}
	
}
addLoadEvent( fRegister );

//选择头像页面========================
function fChooseAvatar()
{
	//取得头像列表 循环
	var oAvatar = document.getElementById("avatar");
	if( !oAvatar ) return;//不是选择头像页面，退出
	var aImg = oAvatar.getElementsByTagName("img");//头像数组
	if( !aImg ) return;//不是选择头像页面，退出
	var oTitle = document.getElementById("title");
	if( !oTitle ) return;//不是选择头像页面，退出
	var aP = oTitle.getElementsByTagName("p");
	if( !aP ) return;//不是选择头像页面，退出
	
	//选择头像
	for( var i = 0; i < aImg.length; i++)
	{
		aImg[i].onclick = function()
		{//选择了该头像
			//title 晃动
			var path = this.getAttribute("src");
			oTitle.className = "title rotate rotate-3";
			countDown(3);//倒计时三秒
			aP[1].innerHTML = "猜歌走起！";
			
			setTimeout( function(){//上传服务器
				$.getJSON($SCRIPT_ROOT + '/_choose', {
					picPath: path
				}, function(data) {
					if(data.result==1)
					location.href="/guess";
				});
			},3100);
			
			return false;
		}
	}
	
	//倒计时
	function countDown(time)
	{
		aP[0].innerHTML = time;
		if( time > 1 )
			timer = setTimeout( function(){countDown(--time)}, 1000);
	}
	
	//上传头像	
	var oAvatarUploadForm = document.getElementById("avatar-upload-form");//提交的表单
	var oFile = document.getElementById("file"); //要上传的文件
	var oResult = document.getElementById("upload-result"); //上传结果
	
	oFile.onchange = function checkFile() //检查是否已选择文件
	{
		if( oFile.value ) //已选择文件，显示文件名
			oResult.innerHTML = oFile.files[0].name;
	}
	
	oAvatarUploadForm.onsubmit= function()
	{//上传头像判断	
		if( !oFile.value ) //未选择头像
		{
			oResult.innerHTML = "请选择头像文件";
			return false;
		}
		else
		{
			oTitle.className = "title rotate rotate-3";
			countDown(3);//倒计时三秒
			aP[1].innerHTML = "猜歌走起！";
		
			setTimeout( function(){//跳转
				location.href="/guess";
			},3100);
		
			return true;
		}
	}
}
addLoadEvent( fChooseAvatar );

// 猜歌页面===答题
function Answer()
{
	var oBtnAnswer = document.getElementById("btn-answer");
	if( ! oBtnAnswer ) return;
	var oAnswer = document.getElementById("answer"); //回答
	var oLight = document.getElementById("light"); //霓虹灯
	var oMusicArea = document.getElementById("music-area"); //音乐区，改边框
	var oAnswerResultTip = document.getElementById("answer-result-tip");//回答结果
	var oTxtAnwserResult = document.getElementById("txt-answer-result");
	
	oAnswer.focus(); //进入猜歌页面，获得焦点

	oBtnAnswer.onclick= function()
	{
		if( !oAnswer.value)
		{
			showResult("请回答");
			fnClearAndFocus();
		}
		else
		{//上传
			//alert("给你上传"); //调试
			$.getJSON( $SCRIPT_ROOT + '/_guess',{
				answer: oAnswer.value
			},function(data){
				if(data.result==0)
				{	
					showResult("回答错误");
					fnClearAndFocus();
					fnLight("spark-fail");
				}
				if(data.result==1)
				{
					showResult("回答正确");
					fnClearAndFocus();
					fnLight("spark-success");
					
					//切歌
					fnSwitchSong();
				}
			});
		}
		return false;
	}	
	
	function fnClearAndFocus()
	{
		oAnswer.value = "";
		oAnswer.focus();
	}
	
	function showResult(result)
	{
		//加个右旋转
		fnRotate( oAnswerResultTip, oTxtAnwserResult, result, "rotateRight", 80);
		// oAnswerResultTip.className = "nav-tip rotateRight";
		// startMove( oTxtAnwserResult, 80 )
		// oTxtAnwserResult.innerHTML = result;
		
		// //几秒后左旋转回
		// setTimeout(function()
		// {
			// oAnswerResultTip.className = "nav-tip rotateLeft";
			// startMove( oTxtAnwserResult, 40 )
		// },2400);
	}
	
	function fnLight(classname)
	{
		//关边框
		oMusicArea.style.border = "1px dashed rgba(0,0,0,0)";
		//亮灯
		oLight.className = classname;
		//2s 后恢复边框
		setTimeout( function()
		{ 
			oLight.className = "";
			oMusicArea.style.cssText = "";
		},3000);
		
	}
}
addLoadEvent( Answer );

// 听歌页面=切歌点了按钮===
function fnBtnSwitchSongListen()
{
	var oBtnSwitchSong = document.getElementById("btn-switch-song-listen");
	if( !oBtnSwitchSong ) return;
	
	//听歌页面，要加参数"listen"
	oBtnSwitchSong.onclick = function(){
		fnSwitchSong("listen");
	}
}
addLoadEvent( fnBtnSwitchSongListen );

// 猜歌页面=切歌点了按钮===
function fnBtnSwitchSong()
{
	var oBtnSwitchSong = document.getElementById("btn-switch-song");
	if( !oBtnSwitchSong ) return;
	
	//猜歌页面
	oBtnSwitchSong.onclick = fnSwitchSong;
}
addLoadEvent( fnBtnSwitchSong );
	
// 听歌页面=喜欢
function fnLike()
{
	var oBtnLike = document.getElementById("btn-like");
	if( !oBtnLike ) return;
	var oAnswerResultTip = document.getElementById("answer-result-tip");//喜欢结果
	var oTxtAnwserResult = document.getElementById("txt-answer-result");

	oBtnLike.onclick = function()
	{
		$.getJSON($SCRIPT_ROOT + '/_like',{
		},function(data)
		{
			var result = ( 
			data.result == "ok" ?
			"喜欢成功" :
			"喜欢过了" );
			
			//加个右旋转
			fnRotate( oAnswerResultTip, oTxtAnwserResult, result, "rotateRight", 80);
			
			// oAnswerResultTip.className = "nav-tip rotateRight";
			// startMove( oTxtAnwserResult, 80 )
			// oTxtAnwserResult.innerHTML = result;
			
			// //几秒后左旋转回
			// setTimeout(function()
			// {
				// oAnswerResultTip.className = "nav-tip rotateLeft";
				// startMove( oTxtAnwserResult, 40 )
			// },2400);
		});	
	}
}
addLoadEvent( fnLike );

// 听歌页面=搜索
function fnSearch()
{
	var oBtnSearch = document.getElementById("btn-search");
	if( ! oBtnSearch ) return;
	var oTxtSearch = document.getElementById("txt-search");
	var oUl = document.getElementById("song-list");
	var aLi = oUl.getElementsByTagName("li");
	var oSearchResultTip = document.getElementById("search-result-tip");
	var oTxtSearchResult = document.getElementById("txt-search-result");
	
	oBtnSearch.onclick = function()
	{
		if( ! oTxtSearch.value )
		{//没有输入		
			//加个右旋转
			fnRotate( oSearchResultTip, oTxtSearchResult, "请输入", "rotateLeft", 30);
			return false;
		}
		else
		{//上传
			$.getJSON($SCRIPT_ROOT + '/_search', {
				keyword: oTxtSearch.value
			}, function(data)
			{	 	
				if( data.result[0] )
				{//搜到了
					oTxtSearch.value = ""; // 清除关键词
					//删除最后一列
					oUl.removeChild( aLi[aLi.length-1] );

					//新建列表项
					var oLi = document.createElement("li");
					oLi.innerHTML = "<span>" + data.result[0][1] + "-" + data.result[0][0] + "</span>\
								<span>" + data.result[0][2] + "</span>"

					var oTitle = document.createAttribute("title");
					oTitle.value = data.result[0][1] + "-" + data.result[0][0];
					oLi.setAttributeNode(oTitle);
					
					//插入元素
					aLi.length ? oUl.insertBefore(oLi, aLi[0]) : oUl.appendChild(oLi);
					
					fnSliderDecoration( oLi );		
					
					//点击事件-选歌
					oLi.onclick = function()
					{
						fnAjaxChooseSong( this );
					}
				}
				else
				{
					fnRotate( oSearchResultTip, oTxtSearchResult, "没找到啊", "rotateLeft", 30);
				}
			});
		}
		return false;
	}
}
addLoadEvent( fnSearch );

// 听歌页面=换一组
function fnSwitchList()
{
	var oBtnSwitchList = document.getElementById("switch-list");
	if( ! oBtnSwitchList ) return;
	var oUl = document.getElementById("song-list");
	if( ! oUl ) return;
	var aLi = oUl.getElementsByTagName("li");
	
	oBtnSwitchList.onclick = function()
	{
		$.getJSON($SCRIPT_ROOT + '/_change_list',{
		},function(data)
		{
			music_list=data.result; //列表的数组
		
			// 删除旧歌单
			while(aLi.length)
			{
				oUl.removeChild( aLi[0] );
			}
		
			//循环插入
			for( var i = 0; i < 10; i++ )
			{
				//新建列表项
				var oLi = document.createElement("li");
				oLi.innerHTML = "<span>" + data.result[i][1] + "-" + data.result[i][0] + "</span>\
								<span>" + data.result[i][2] + "</span>"
								

				var oTitle = document.createAttribute("title");
				oTitle.value = data.result[i][1] + "-" + data.result[i][0];
				oLi.setAttributeNode(oTitle);
				
				//插入元素
				aLi.length ? oUl.insertBefore(oLi, aLi[0]) : oUl.appendChild(oLi);
				
				//fnSliderDecoration( oLi );		
				
				//点击事件-选歌
				oLi.onclick = function()
				{
					fnAjaxChooseSong( this );
				}
			}
		});	
	}
}
addLoadEvent( fnSwitchList );
	





















