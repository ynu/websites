<!--
/**
 * 会员登陆
 */
function topLogin() {
	try {
		var loginId = $("#topLoginId");
		var password = $("#topPassword");
		if(MyJs.isNullByJQuery(loginId)) {
			alert('用户名不能为空');
			loginId.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(password)) {
			alert('密码不能为空');
			password.focus();
			return false;
		}
		var submitData = '';
		    submitData+= 'loginId='+loginId.val()+'&password='+password.val()+'';
		    submitData+= '&t='+MyJs.randomNumber+'';
		$.ajax({
			type:'POST',
			dataType:'text',
			url:'/member!!login.xhtml',
			data:''+submitData+'',
			success:function(data) {
				if(MyJs.SUCCESS == data) {
					alert('会员登陆成功');
					window.location.reload();
				} else {
					alert(data);
					password.val("");
					loginId.val("").focus();
					return false;
				}
			}
		});
		return false;
	}catch(e){
		return false;
	}
}

/**
 * 会员登陆
 */
function login() {
	try {
		var loginId = $("#loginIdt");
		var password = $("#passwordt");
		if(MyJs.isNullByJQuery(loginId)) {
			alert('用户名不能为空');
			loginId.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(password)) {
			alert('密码不能为空');
			password.focus();
			return false;
		}
		var submitData = '';
		    submitData+= 'loginId='+loginId.val()+'&password='+password.val()+'';
		    submitData+= '&t='+MyJs.randomNumber+'';
		$.ajax({
			type:'POST',
			dataType:'text',
			url:'/member!!login.xhtml',
			data:''+submitData+'',
			success:function(data) {
				if(MyJs.SUCCESS == data) {
					alert('会员登陆成功');
					window.location.reload();
				} else {
					alert(data);
					password.val("");
					loginId.val("").focus();
					return false;
				}
			}
		});
		return false;
	}catch(e){
		return false;
	}
}

/**
 * 会员安全退出
 */
function topLogout() {
	try {
		$.ajax({
			type:'POST',
			dataType:'text',
			url:'/member!!quit.manager',
			data:'t='+MyJs.randomNumber,
			success:function(data) {
				if(MyJs.SUCCESS == data) {
					window.location.reload();
				}
			}
		});
		return false;
	}catch(e){
		return false;
	}
}

/**
 * 初始化会员注册参数
 */
function registerInit() {
	try {
		//加载省市
	  	init("province","","city","","hometown","");
	  	//选中性别
	  	$($("input[name=sex]").get(1)).attr("checked", true);
	  	//限制输入
	  	MyJs.OnlyInputLetterAndNumber('loginId');
	  	MyJs.OnlyInputLetterAndNumber('email');
	} catch(e){
	}
}

/**
 * 初始化会员登陆参数
 */
function loginInit() {
	try {
		//绑定登陆按钮的事件
		$("#loginBtn").bind("click", topLogin);
		$("#logoutBtn").bind("click", topLogout);
	} catch(e){
	}
}

/**
 * 注册验证
 */ 
function register() {
	try {
		var loginId = $("#loginId");
		var password = $("#password");
		var repassword = $("#repassword");
		var email = $("#email");
		var phone = $("#phone");
		var birthday = $("#birthday");
		var sex = $("input[name=sex]:checked");
		var province = $("#province");
		var city = $("#city");
		var hometown = $("#hometown");
		var code = $("#code");
		var type = $("#type");
		
		var validateUrl = '/member!!validateLoginId.xhtml';
		var validateCoeUrl = '/member!!validateCode.xhtml';
		var validateEmailUrl = '/member!!validateEmail.xhtml';
		
		if(MyJs.isNullByJQuery(loginId)) {
			alert('呢称不能为空');
			loginId.focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(password)) {
			alert('密码不能为空');
			password.focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(repassword)) {
			alert('确认密码不能为空');
			repassword.focus();
			return false;
		}
		else if(!MyJs.equalPassword('password', 'repassword')) {
			alert('两次密码输入不一致');
			repassword.val("").focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(email)) {
			alert('电子邮件不能为空');
			email.focus();
			return false;
		}
		else if(!MyJs.isEmail(email.val())) {
			alert('邮件格式不正确');
			email.val("").focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(phone)) {
			alert('手机号码不能为空');
			phone.val("").focus();
			return false;
		}
		else if(!MyJs.isPhone(phone.val())) {
			alert('手机号码格式有误');
			phone.val("").focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(birthday)) {
			alert('请选择您的生日');
			birthday.focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(province)) {
			alert('请选择省份');
			province.focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(city)) {
			alert('请选择城市');
			city.focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(hometown)) {
			alert('请选择区县');
			hometown.focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(code)) {
			alert('请输入验证码');
			code.focus();
			return false;
		}
		else if(!MyJs.validateValue(validateCoeUrl, 'code', 'code')) {
			alert('验证码输入不正确');
			code.val("").focus();
			return false;
		}
		else if(!MyJs.validateValue(validateUrl, 'loginId', 'loginId')) {
			alert('呢称已经被使用，请使用其他呢称。');
			loginId.val("").focus();
			return false;
		}
		else if(!MyJs.validateValue(validateEmailUrl, 'email', 'email')) {
			alert('邮箱地址已经被使用，请使用其他呢称。');
			email.val("").focus();
			return false;
		}
		
		var submitData = '';
		submitData += 'loginId='+loginId.val()+'&password='+password.val()+'';
		submitData += '&repassword='+password.val()+'&email='+email.val()+'';
		submitData += '&phone='+phone.val()+'&birthday='+birthday.val()+'';
		submitData += '&sex='+sex.val()+'';
		submitData += '&province='+MyJs.encodeByJQuery(province)+'&city='+MyJs.encodeByJQuery(city)+'';
		submitData += '&hometown='+MyJs.encodeByJQuery(hometown)+'';
		submitData += '&code='+code.val()+'';
		submitData += '&type=0';
		submitData += '&t='+MyJs.randomNumber+'&addFlag=1';
		
		if(confirm('是否确认提交注册信息')) {
			$.ajax({
				type:'POST',
				dataType:'text',
				url:'/member!!register.xhtml',
				data:''+submitData+'',
				success:function(data) {
					if(MyJs.SUCCESS == data) {
						alert('注册成功，请等待管理员审核');
						window.parent.location.reload();
					} else {
						alert(data);
						return false;
					}
				}
			});
		}
		return false;
	}catch(e){
	}
}

function showFindPassword() {
	try {
		J('#findPassword').dialog({btns: false, fixed:true, title:''+siteName+'会员找回密码', width:465, height:162, cover:true, page:'/member!!findPassword.xhtml'});
	} catch(e){
	}
}

function showRegister() {
	try{
		J('#registerBtn').dialog({btns: false, fixed:true, title:''+siteName+'会员注册', width:625, height:340, cover:true, page:'/member!!register.xhtml'});
	} catch(e){
		return false;
	}
}

function showLogin(id){
	try{
		J('#' + id).dialog({btns: false,  title:''+siteName+'会员登陆', width:390, height:185, cover:true, page:'/member!!loginPage.xhtml' });
	} catch(e){
		return false;
	}
}

function showInit() {
	try{
		$("#registerBtn").bind('click', showRegister);
		$("#findPassword").bind('click', showFindPassword);
	}catch(e){
	}
}

function markInit() {
	try{
		var m = mark;
		if(m == 1) {
			$("#menu1").addClass("hover");
			$("#menu1").mouseover();
		} else if(m == 2) {
			$("#menu2").addClass("hover");
			$("#menu2").mouseover();
		} else if(m == 3) {
			$("#menu3").addClass("hover");
			$("#menu3").mouseover();
		} else if(m == 4) {
			$("#menu4").addClass("hover");
			$("#menu4").mouseover();
		} else if(m == 5) {
			$("#menu5").addClass("hover");
			$("#menu5").mouseover();
		} else if(m == 6) {
			$("#menu6").addClass("hover");
			$("#menu6").mouseover();
		} else if(m == 7) {
			$("#menu7").addClass("hover");
			$("#menu7").mouseover();
		} else if(m == 8) {
			$("#menu8").addClass("hover");
			$("#menu8").mouseover();
		} else {
			$("#menu1").addClass("hover");
			$("#menu1").mouseover();
		}
	}catch(e){
	}
}

/**
 * 会员找回密码
 */
function findPassword() {
	try {
		var loginId = $("#loginId");
		var email = $("#email");
		var code = $("#code");
		var validateCoeUrl = '/member!!validateCode.xhtml';
		
		if(MyJs.isNullByJQuery(loginId)) {
			alert('呢称不能为空');
			loginId.focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(email)) {
			alert('电子邮件不能为空');
			email.focus();
			return false;
		}
		else if(!MyJs.isEmail(email.val())) {
			alert('邮件格式不正确');
			email.val("").focus();
			return false;
		}
		else if(MyJs.isNullByJQuery(code)) {
			alert('请输入验证码');
			code.focus();
			return false;
		}
		else if(!MyJs.validateValue(validateCoeUrl, 'code', 'code')) {
			alert('验证码输入不正确');
			code.val("").focus();
			return false;
		}
		
		var submitData = '';
		submitData += 'loginId='+loginId.val()+'';
		submitData += '&email='+email.val()+'';
		submitData += '&t='+MyJs.randomNumber+'&addFlag=1';
		$.ajax({
			type:'POST',
			dataType:'text',
			url:'/member!!findPassword.xhtml',
			data:''+submitData+'',
			success:function(data) {
				if(MyJs.SUCCESS == data) {
					alert('恭喜您，' + loginId.val() + '密码找回成功！您的登陆密码已经发送到您的注册邮箱（'+email.val()+'）。');
					window.parent.location.reload();
				} else {
					alert('信息验证失败，请您重新填写！');
					return false;
				}
			}
		});
		return false;
	}catch(e){
		return false;
	}
}

/**
 * 左边Hover导航标记
 */
function selectHover() {
	try {
		var leftDiv = $($("#leftDiv").children());
		leftDiv.each(function(){
			var tempId = $(this).attr("id");
			if(classId == tempId){
				$(this).addClass("hover");
			}
		});
	} catch(e){
		return false;
	}
}

/**
 * 留言添加
 */
function messageAdd() {
	try {
		var content = $("#replyContent");
		var name = $("#name");
		var code = $("#code");
		var isPrivate = $("input[name=isPrivate][checked]");
		var phone = $("#phone");
		var validateCoeUrl = '/member!!validateCode.xhtml';
		var messageMethod = $("#messageMethod");
		
		if(MyJs.isNullByJQuery(content)) {
			alert('留言内容不能为空');
			content.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(name)) {
			alert('留言呢称不能为空');
			name.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(code)) {
			alert('验证码不能为空');
			code.focus();
			return false;
		}
		
		if(!MyJs.validateValue(validateCoeUrl, 'code', 'code')) {
			alert('验证码输入不正确');
			code.val("").focus();
			return false;
		}
		$.ajax({
			type:'POST',
			dataType:'text',
			url:'/index!'+messageMethod.val()+'.xhtml',
			data:'content='+MyJs.encodeByJQuery(content)+'&addFlag=1&name='+MyJs.encodeByJQuery(name)+'&phone='+MyJs.encodeByJQuery(phone)+'&code='+MyJs.encodeByJQuery(code)+'&isPrivate='+MyJs.encodeByJQuery(isPrivate)+'&t='+MyJs.randomNumber,
			success:function(data){
				if(data == MyJs.SUCCESS) {
					alert('留言成功，请等待管理员审核!');
					window.location.reload();
				} else {
					alert(data);
					MyJs.flushValidateCode('vcode');
					return false;
				}
			}
		});
		return false;
	}catch(e) {
		return false;
	}
}

/**
 * 订单添加
 */
function orderAdd() {
	try {
		var remark = $("#remark");
		var name = $("#name");
		var sex = $("input[name=sex]:checked");
		var age = $("#age");
		var phone = $("#phone");
		var address = $("#address");
		var orderMethod = $("#orderMethod");
		
		if(MyJs.isNullByJQuery(name)) {
			alert('姓名不能为空');
			name.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(sex)) {
			alert('性别不能为空');
			sex.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(age)) {
			alert('年龄不能为空');
			age.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(phone)) {
			alert('电话不能为空');
			phone.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(address)) {
			alert('通讯地址不能为空');
			address.focus();
			return false;
		}
		
		if(confirm('是否确认提交?')){
			$.ajax({
				type:'POST',
				dataType:'text',
				url:'/index!'+orderMethod.val()+'.xhtml',
				data:'address='+MyJs.encodeByJQuery(address)+'&age='+MyJs.encodeByJQuery(age)+'&remark='+MyJs.encodeByJQuery(remark)+'&addFlag=1&name='+MyJs.encodeByJQuery(name)+'&phone='+MyJs.encodeByJQuery(phone)+'&sexValue='+MyJs.encodeByJQuery(sex)+'&t='+MyJs.randomNumber,
				success:function(data){
					if(data == MyJs.SUCCESS) {
						alert('提交成功，我们将尽快与您取得联系!');
						window.location.reload();
					} else {
						alert('提交失败，请您重试！');
						return false;
					}
				}
			});
		}
		return false;
	}catch(e) {
		return false;
	}
}

/**
 * 求职者添加
 */
function recruitAdd() {
	try {
		var positionId = $("#positionId");
		var name = $("#name");
		var phone = $("#phone");
		
		if(MyJs.isNullByJQuery(positionId)) {
			alert('请选择应聘职位');
			positionId.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(name)) {
			alert('姓名不能为空');
			name.focus();
			return false;
		}
		if(MyJs.isNullByJQuery(phone)) {
			alert('联系电话不能为空');
			phone.focus();
			return false;
		}
		
		if(confirm('是否确认提交?')){
			return true;
		}
		return false;
	}catch(e) {
		return false;
	}
}

/**
 * 搜索初始化
 */
function searchInit() {
	try{
		var KEYWORD_VALUE = "输入关键词快速检索";
		$("#frontKeyword").val(KEYWORD_VALUE)
		$("#frontKeyword").bind("click", function(){
			$(this).val("");
		}).bind("mouseout", function(){
			if($.trim($(this).val()) == "") {
				$(this).val(KEYWORD_VALUE);
			}
		});
		$("#frontSearchBtn").bind("click", frontSearch);
		if(!MyJs.isNull(frontKeyword)){
			$("#frontKeyword").val(decodeURI(decodeURI(frontKeyword)))
		}
	} catch(e){
		return false;
	}
}
/**
 * 搜索初始化
 */
function searchInit2() {
	try{
		var KEYWORD_VALUE = "输入关键词快速检索";
		$("#frontKeyword2").val(KEYWORD_VALUE)
		$("#frontKeyword2").bind("click", function(){
			$(this).val("");
		}).bind("mouseout", function(){
			if($.trim($(this).val()) == "") {
				$(this).val(KEYWORD_VALUE);
			}
		});
		$("#frontSearchBtn2").bind("click", frontSearch2);
		if(!MyJs.isNull(frontKeyword)){
			$("#frontKeyword2").val(decodeURI(decodeURI(frontKeyword)))
		}
	} catch(e){
		return false;
	}
}
/**
 * 前台搜索
 */
function frontSearch() {
	try{
	   var keyword = $("#frontKeyword");
	   if(MyJs.isNullByJQuery(keyword)){
	   	  alert('请输入要查询的关键词');
	   	  keyword.focus();
	   	  return false;
	   }
	   window.location.href = "/index!search.xhtml?keyword=" + MyJs.encodeByValue(keyword.val()) + "&t=" + MyJs.randomNumber;
	} catch(e){
		return false;
	}
}
/**
 * 前台搜索
 */
function frontSearch2() {
	try{
	   var keyword = $("#frontKeyword2");
	   if(MyJs.isNullByJQuery(keyword)){
	   	  alert('请输入要查询的关键词');
	   	  keyword.focus();
	   	  return false;
	   }
	   window.location.href = "/index!search.xhtml?keyword=" + MyJs.encodeByValue(keyword.val()) + "&t=" + MyJs.randomNumber;
	} catch(e){
		return false;
	}
}

function positionInit() {
	try {
		MyJs.selectValue('positionId', classId);
		initUploadifyJianLi("picture",1,"fileQueue",true,false,"preImage");
	} catch(e){
		return false;
	}
}

/**
 * 文章分页
 */
function getArticleContent(pageIndex, articleId, maxPage) {
	try {
		$.ajax({
			type:'POST',
			dataType:'text',
			url:'/index!getArticlePageContent.xhtml',
			data:'id='+articleId+'&pageIndex='+pageIndex+'&t='+MyJs.randomNumber,
			success:function(data){
				if(data != null){
					$("#articleContent").html(data);
					for(var i=0; i<maxPage; i++){
						$("#ap"+i).removeClass("hover");
					}
					$("#ap"+pageIndex).addClass("hover");
				}
			}
		});
		return false;
	}catch(e){
		return false;
	}
}

function initArticlePageContent() {
	try {
		$("#ap0").click();
	}catch(e){}
}

function initMessageBtn() {
	try {
		$("#messageBtn").bind("click", messageAdd);
		MyJs.setEnterKey('messageAdd()');
	}catch(e){}
}

/**
 * 添加文章评论
 */
 function replyAdd()  {
 	try {
 		var replyContent = $("#replyContent");
 		var code = $("#code");
 		var validateCoeUrl = '/member!!validateCode.xhtml';
 		var articleId = $("#articleId");
 		
 		if(MyJs.isNullByJQuery(replyContent)) {
 			alert('请输入您评论的内容？');
 			replyContent.focus();
 			return false;
 		}
 		else if(MyJs.isNullByJQuery(code)) {
			alert('请输入验证码');
			code.focus();
			return false;
		}
		else if(!MyJs.validateValue(validateCoeUrl, 'code', 'code')) {
			alert('验证码输入不正确');
			code.val("").focus();
			return false;
		}
 		$.ajax({
 			type:'POST',
 			dataType:'text',
 			url:'/index!addReply.xhtml',
 			data:'addFlag=1&id='+articleId.val()+'&content='+MyJs.encode(replyContent)+'&t='+MyJs.randomNumber+'',
 			success:function(data){
 				if(MyJs.SUCCESS == data) {
 					alert('提交评论成功！');
 					code.val("");
 					replyContent.val("");
 					window.location.reload();
 				} else {
 					alert('提交评论失败！');
 					return false;
 				}
 			}
 		});
 		return false;
 	}catch(e){
 		return false;
 	}
 }
 
 function replyAddInit() {
 	try {
 		var obj =  $("#addReplyBtn");
 		if(obj.attr("id") == 'addReplyBtn') {
 			obj.bind("click", replyAdd);
 			$(document).unbind("keypress");
 			MyJs.setEnterKey('replyAdd()');
 		}
 	}catch(e){
 		return false;
 	}
 }
 //--滚屏
var currentpos,timer;
function initialize() {
	timer=setInterval("scrollwindow()",10);
}
function sc(){
	clearInterval(timer);
}
function scrollwindow(){
	window.scrollBy(0,1);
}
document.onmousedown=sc
document.ondblclick=initialize
//--滚屏end



/**
 * 页面加载执行
 */
$(function(){
	registerInit();
	loginInit();
	markInit();
	showInit();
	selectHover();
	searchInit();
	searchInit2();
	positionInit();
	initMessageBtn();
	initArticlePageContent();
	replyAddInit();
});
//-->