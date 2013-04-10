/**
 * 自定义的MyJs对象 时间: 2010-01-01 描述: {1} 完成基本的验证 描述: {2} 完成表单的基本操作 作者: http://www.ynlf.net
 */
var MyJs = function() {
};

/** 定义一些便捷的变量 */
MyJs.prototype.randomNumber = new Date().getTime(); // 随机数
MyJs.prototype.version = "MyJs1.0 Beta"; // 当前MyJs的版本
MyJs.prototype.todayDate = ''; //今天的日期字符串
MyJs.prototype.SUCCESS = 'success'; //成功字符串 标记用
MyJs.prototype.FAILED = 'failed'; //失败字符串
MyJs.prototype.CHINESE = 1; //中文版本
/** 自定义空指针异常 * */
var NullPointerException = function(message) {
	alert(message);
};

/** 自定义一个Map对象 模拟JAVA的实现 * */
function Map() {
	function struct(key, value) {
		this.key = key;
		this.value = value;
	}
	this.put = function(key, value) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				this.arr[i].value = value;
				return;
			}
		}
		this.arr[this.arr.length] = new struct(key, value);
	}
	this.get = function(key) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				return this.arr[i].value;
			}
		}
		return null;
	}
	this.remove = function(key) {
		var v;
		for (var i = 0; i < this.arr.length; i++) {
			v = this.arr.pop();
			if (v.key === key) {
				continue;
			}
			this.arr.unshift(v);
		}
	}
	this.size = function() {
		return this.arr.length;
	}
	this.isEmpty = function() {
		return this.arr.length <= 0;
	}
	this.containsKey = function(key) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				return true;
			}
		}
		return false;
	}
	this.values = function() {
		var valueArr = new Array();
		for (var i = 0; i < this.arr.length; i++) {
			valueArr.push(this.arr[i].value);
		}
		return valueArr;
	}
	this.clear = function() {
		this.arr = [];
	}
	this.arr = new Array();
}

/** ***********************************基础类*************************************** */

/**
 * 根据指定的格式获取当前的日期字符串
 * 
 * @param value
 *            指定的日期格式
 * @result 返回指定的日期格式, 如果没有指定,则返回默认的日期格式
 */
MyJs.prototype.getDateString = function(format) {
	try {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		if (hour < 10) {
			hour = "0" + hour;
		}
		if (minute < 10) {
			minute = "0" + minute;
		}
		if (second < 10) {
			second = "0" + second;
		}
		if (month < 10) {
			month = month + 1;
			month = "0" + month;
		}
		if (day < 10) {
			day = day + 1;
			day = "0" + day;
		}

		if (this.isNull(format)) {
			return year + "-" + month + "-" + day;
		} else if('yyyy年MM月dd日' == format) {
			var temp = year + "年" + month + "月" + day + "日";
			var d = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
			var dd = d[date.getDay()];
			return temp + dd;
		} else {
			if ("yyyy-MM-dd" == format) {
				return year + "-" + month + "-" + day;
			} else if ("yyyy年MM月dd日" == format) {
				return year + "年" + month + "月" + day + "日";
			} else if ("yyyy-MM-dd hh:mm:ss" == format) {
				return year + "-" + month + "-" + day + " " + hour + ":"
						+ minute + ":" + second;
			} else if ("yyyy年MM月dd日 hh时mm分ss秒" == format) {
				return year + "年" + month + "月" + day + "日  " + hour
						+ "时" + minute + "分" + second + "秒";
			}
		}
	} catch (e) {
		return "";
	}
}

/**
 * 去除指定字符串前后的空格
 * 
 * @param value
 *            要去除空格的字符串
 * @result 返回去除空格后的字符串
 */
MyJs.prototype.trim = function(value) {
	try {
		var re = /\s/g;
		value = value.replace(re, "");
		return value;
	} catch (e) {
		return value;
	}
}

/**
 * 返回当前浏览器的类型
 */
MyJs.prototype.browserVersion = function() {
	try {
		if (jQuery.browser.msie) {
			return "IE";
		} else if (jQuery.browser.mozilla) {
			return "Mozilla FireFox";
		} else if (jQuery.browser.safari) {
			return "Safari";
		} else if (jQuery.browser.opera) {
			return "Opera";
		} else {
			return "unknow";
		}
	} catch (e) {
		return "unknow";
	}
}

/**
 * 获取指定字符串的长度
 * 
 * @param value
 *            指定的字符串
 * @param ignoreWhiteSpace
 *            是否忽略字符串前后的空格 ture为忽略 false不忽略
 * @result 返回指定的字符串的长度
 */
MyJs.prototype.getLength = function(value, ignoreWhiteSpace) {
	try {
		var sum = 0;
/** 返回的字符串长度 */

		if (ignoreWhiteSpace) {
			value = this.trim(value);
		}
		for (var i = 0; i < value.length; i++) {
			if ((value.charCodeAt(i) >= 0) && (value.charCodeAt(i) <= 255)) {
				sum = sum + 1;
			} else {
				sum = sum + 2;
			}
		}
		return sum;
	} catch (e) {
		return 0;
	}
}

/**
 * 根据指定的url打开一个页面
 * 
 * @param url
 *            要打开的页面地址
 */
MyJs.prototype.goPage = function(url) {
	try {
		if (!this.isNull(url)) {
			window.location.href = url;
		}
	} catch (e) {
	}
}

/** ***********************************验证类*************************************** */

/**
 * 验证指定的字符串是否为email格式的
 * 
 * @param email
 *            要验证的字符串
 * @result 如果验证合法则返回true, 否则返回false
 */
MyJs.prototype.isEmail = function(email) {
	try {
		var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
		if (myReg.test(email)) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为空或者全部都是空格,null,undefined
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是空格则返回true, 否则返回false
 */
MyJs.prototype.isNull = function(value) {
	try {
		if (value == "" || value == null || value == undefined) {
			return true;
		}
		return new RegExp("^[ ]+$").test(value);
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为为合法的IP地址
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是IP则返回true, 否则返回false
 */
MyJs.prototype.isIP = function(value) {
	try {
		if (this.isNull(value)) {
			return false;
		}
		var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g
		if (re.test(value)) {
			if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256
					&& RegExp.$4 < 256) {
				return true;
			}
		}
		return false;
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为int类型
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是整数类型则返回true, 否则返回false
 */
MyJs.prototype.isInteger = function(value) {
	try {
		var regu = /^[-]{0,1}[0-9]{1,}$/;
		return regu.test(value);
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为手机号码
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是则返回true, 否则返回false
 */
MyJs.prototype.isMobile = function(value) {
	try {
		var regu = /^([1][3]|[1][5])[0-9]{9}$/;
		var re = new RegExp(regu);
		if (re.test(value)) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为电话号码,小灵通,手机号码
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是则返回true, 否则返回false
 */
MyJs.prototype.isPhone = function(value) {
	try {
		if (this.isNull(value)) {
			return false;
		}
		var isSuc = false;
		var reg = /^(\({0,1}\d{3,4})\){0,1}(-){0,1}(\d{7,8})$/;
		if(reg.test(value)) {
			isSuc = true;
		} else {
			reg = /^1[3,5]\d{9}$/;
			if(reg.test(value)) {
				isSuc = true;
			}
		}
		return isSuc;
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为金额格式
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是则返回true, 否则返回false
 */
MyJs.prototype.isMoney = function(value) {
	try {
		var regu = "^[0-9]+[\.][0-9]{0,6}$";
		var re = new RegExp(regu);
		if (re.test(value)) {
			return true;
		}
		return false;
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为浮点数类型
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是则返回true, 否则返回false
 */
MyJs.prototype.isFloat = function(value) {
	try {
		var regu = "^[0-9]+[\.][0-9]{0,2}$";
		var re = new RegExp(regu);
		if (re.test(value)) {
			return true;
		}
		return false;
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为数字
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是则返回true, 否则返回false
 */
MyJs.prototype.isNumber = function(value) {
	try {
		var regu = /[0-9]$/;
		var re = new RegExp(regu);
		if (re.test(value)) {
			return true;
		}
		return false;
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为指定的长度
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是则返回true, 否则返回false
 */
MyJs.prototype.checkLength = function(value, minLength, maxLength) {
	try {
		if (this.isNull(value) || this.isNull(minLength)
				|| this.isNull(maxLength)) {
			return false;
		} else if (value.length < minLength || value.length > maxLength) {
			return false;
		} else {
			return true;
		}
	} catch (e) {
		return false;
	}
}

/**
 * 判断指定字符串是否为身份证号码
 * 
 * @param value
 *            要判断的字符串
 * @result 如果是则返回true, 否则返回false
 */
MyJs.prototype.isIdCard = function(value) {
	try {
		if (this.isNull(value)) {
			return false;
		}
		value = this.trim(value);
		if (this.getLength(value) == 15 || this.getLength(value) == 18) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

/** ***********************************表单类*************************************** */
/**
 * {1} 文本框只能输入数字代码(小数点也不能输入): onkeyup="this.value=this.value.replace(/\D/g,'')" *
 * {1} 文本框只能输入数字代码(小数点也不能输入):
 * onafterpaste="this.value=this.value.replace(/\D/g,'')"
 */

/**
 * 限制指定的objectElement只能输入数字
 * 
 * @param objectElement
 *            要绑定的元素ID
 * @result
 */
MyJs.prototype.OnlyInputNumber = function(objectElement) {
	try {
		var version = this.browserVersion();
		var element = document.getElementById(objectElement);

		if ("IE" == version) {
			element.attachEvent("onkeyup", function() {
						element.value = element.value.replace(/\D/g, '');
					});
			element.attachEvent("onafterpaste", function() {
						element.value = element.value.replace(/\D/g, '');
					});
		} else if ("Mozilla FireFox" == version) {
			element.addEventListener("keyup", function() {
						element.value = element.value.replace(/\D/g, '');
					}, false);
			element.addEventListener("afterpaste", function() {
						element.value = element.value.replace(/\D/g, '');
					}, false);
		} else {
			element.addEventListener("keyup", function() {
						element.value = element.value.replace(/\D/g, '');
					}, false);
			element.addEventListener("afterpaste", function() {
						element.value = element.value.replace(/\D/g, '');
					}, false);
		}
	} catch (e) {
		return false;
	}
}

/**
 * 限制指定的objectElement只能输入数字和小数点
 * 
 * @param objectElement
 *            要绑定的元素
 * @result
 */
MyJs.prototype.OnlyInputNumberAndPoint = function(objectElement) {
	try {
		var version = this.browserVersion();
		var element = document.getElementById(objectElement);

		if ("IE" == version) {
			element.attachEvent("onkeyup", function() {
				// 先把非数字的都替换掉，除了数字和.
				element.value = element.value.replace(/[^\d.]/g, "");
					// 必须保证第一个为数字而不是.
					element.value = element.value.replace(/^\./g,"");
					// 保证只有出现一个.而没有多个.
					element.value = element.value.replace(/\.{2,}/g,".");
					// 保证.只出现一次，而不能出现两次以上
					element.value =
					element.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
				});
			element.attachEvent("onafterpaste", function() {
				// 先把非数字的都替换掉，除了数字和.
				element.value = element.value.replace(/[^\d.]/g, "");
					// 必须保证第一个为数字而不是.
					 element.value = element.value.replace(/^\./g,"");
					// 保证只有出现一个.而没有多个.
					 element.value = element.value.replace(/\.{2,}/g,".");
					// 保证.只出现一次，而不能出现两次以上
					 element.value =
					 element.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
				});
		} else if ("Mozilla FireFox" == version) {
			element.addEventListener("keyup", function() {
				// 先把非数字的都替换掉，除了数字和.
				element.value = element.value.replace(/[^\d.]/g, "");
					// 必须保证第一个为数字而不是.
					 element.value = element.value.replace(/^\./g,"");
					// 保证只有出现一个.而没有多个.
					 element.value = element.value.replace(/\.{2,}/g,".");
					// 保证.只出现一次，而不能出现两次以上
					 element.value =
					 element.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
				}, false);
			element.addEventListener("afterpaste", function() {
				// 先把非数字的都替换掉，除了数字和.
				element.value = element.value.replace(/[^\d.]/g, "");
					// 必须保证第一个为数字而不是.
					 element.value = element.value.replace(/^\./g,"");
					// 保证只有出现一个.而没有多个.
					 element.value = element.value.replace(/\.{2,}/g,".");
					// 保证.只出现一次，而不能出现两次以上
					 element.value =
					 element.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
				}, false);
		} else {
			// do something here if you'd like
		}
	} catch (e) {
		return false;
	}
}

/**
 * 限制指定的objectElement只能输入字母和汉字
 * 
 * @param objectElement
 *            要绑定的元素ID
 * @result
 */
MyJs.prototype.OnlyInputLetterAndCharacter = function(objectElement) {
	try {
		var version = this.browserVersion();
		var element = document.getElementById(objectElement);

		if ("IE" == version) {
			element.attachEvent("onkeyup", function() {
						element.value = element.value.replace(/[\d]/g, '');
					});
			element.attachEvent("onbeforepaste", function() {
						clipboardData.setData('text', clipboardData
										.getData('text').replace(/[\d]/g, ''));
					});
		} else if ("Mozilla FireFox" == version) {
			element.addEventListener("keyup", function() {
						element.value = element.value.replace(/[\d]/g, '');
					}, false);
			element.addEventListener("onbeforepaste", function() {
						clipboardData.setData('text', clipboardData
										.getData('text').replace(/[\d]/g, ''));
					}, false);
		} else {
			// do something here if you'd like
		}
	} catch (e) {
		return false;
	}
}

/**
 * 限制指定的objectElement只能输入字母和汉字
 * 
 * @param objectElement
 *            要绑定的元素ID
 * @result
 */
MyJs.prototype.OnlyInputLetterAndNumber = function(objectElement) {
	try {
		var version = this.browserVersion();
		var element = document.getElementById(objectElement);

		if ("IE" == version) {
			element.attachEvent("onkeyup", function() {
						element.value = element.value
								.replace(/[^\w\.\@\/]/ig, '');
					});
		} else if ("Mozilla FireFox" == version) {
			element.addEventListener("keyup", function() {
						element.value = element.value
								.replace(/[^\w\.\@\/]/ig, '');
					}, false);
		} else {
			// do something here if you'd like
		}
	} catch (e) {
		return false;
	}
}

/**
 * 限制指定的objectElement只能输入数字和英文
 * 
 * @param objectElement
 *            要绑定的元素ID
 * @result
 */
MyJs.prototype.OnlyInputNumberAndEnglish = function(objectElement) {
	try {
		var version = this.browserVersion();
		var element = document.getElementById(objectElement);

		if ("IE" == version) {
			element.attachEvent("onkeyup", function() {
						element.value = element.value
								.replace(/[^\d|chun]/g, '');
					});
		} else if ("Mozilla FireFox" == version) {
			element.addEventListener("keyup", function() {
						element.value = element.value
								.replace(/[^\d|chun]/g, '');
					}, false);
		} else {
			// do something here if you'd like
		}
	} catch (e) {
		return false;
	}
}

/**
 * 限制指定的objectElement只能输入中文
 * 
 * @param objectElement
 *            要绑定的元素ID
 * @result
 */
MyJs.prototype.OnlyInputCharacter = function(objectElement) {
	try {
		var version = this.browserVersion();
		var element = document.getElementById(objectElement);

		if ("IE" == version) {
			element.attachEvent("onkeyup", function() {
						element.value = element.value.replace(
								/[^\u4E00-\u9FA5]/g, '');
					});
			element.attachEvent("onbeforepaste", function() {
						clipboardData.setData('text', clipboardData
										.getData('text').replace(
												/[^\u4E00-\u9FA5]/g, ''));
					});
		} else if ("Mozilla FireFox" == version) {
			element.addEventListener("keyup", function() {
						element.value = element.value.replace(
								/[^\u4E00-\u9FA5]/g, '');
					}, false);
			element.addEventListener("onbeforepaste", function() {
						clipboardData.setData('text', clipboardData
										.getData('text').replace(
												/[^\u4E00-\u9FA5]/g, ''));
					}, false);
		} else {
			// do something here if you'd like
		}
	} catch (e) {
		return false;
	}
}

/** ********************************************操作Cookie************************* */

/**
 * 根据传入的name,value,expire,path,domain,secure保存进客户端
 * 
 * @param name
 *            cookie的名称
 * @param value
 *            cookie的值
 * @param expire
 *            cookie的过期时间 以天为单位
 * @param path
 *            cookie的保存路径
 * @param domain
 *            cookie保存的域
 * @param secure
 *            cookie安全设置
 * @result 保存成功返回true 否则返回false
 */
MyJs.prototype.setCookie = function(name, value, expire, path, domain, secure) {
	try {
		var saveCookieByNameAndValue = false; // 根据name和value保存cookie
		var saveCookieByNameValueAndExpire = false; // 根据name,value和expire保存cookie
		var saveCookieByNameValueExpireAndPathDomain = false; // 根据name,value,expire,path和domain保存cookie
		var saveCookieByAll = false; // 根据所有属性保存cookie

		if (this.isNull(name) || this.isNull(value)) {
			return new NullPointerException("the value is null");
		} else {
			saveCookieByNameAndValue = true;
		}

		if (!this.isNull(expire)) {
			saveCookieByNameValueAndExpire = true;
		}

		if (!this.isNull(path) && !this.isNull(domain) && !this.isNull(expire)) {
			saveCookieByNameValueExpireAndPathDomain = true;
		}

		if (!this.isNull(path) && !this.isNull(domain) && !this.isNull(expire)
				&& !this.isNull(secure)) {
			saveCookieByAll = true;
		}

		if (saveCookieByAll) {
			/** 设置保存时间 * */
			var expireDate = new Date();
			expireDate.setTime(expireDate.getTime()
					+ (expire * 24 * 60 * 60 * 1000));
			document.cookie = name + "=" + escape(value) + ";"
			"expires=" + expireDate.toGMTString() + ";" + "path=" + path + ";"
					+ "domain=" + domain + ";" + "secure+" + "secure";
		}

		if (saveCookieByNameValueExpireAndPathDomain) {
			/** 设置保存时间 * */
			var expireDate = new Date();
			expireDate.setTime(expireDate.getTime()
					+ (expire * 24 * 60 * 60 * 1000));
			document.cookie = name + "=" + escape(value) + ";"
			"expires=" + expireDate.toGMTString() + ";" + "path=" + path + ";"
					+ "domain=" + domain;
		}

		if (saveCookieByNameValueAndExpire) {
			/** 设置保存时间 * */
			var expireDate = new Date();
			expireDate.setTime(expireDate.getTime()
					+ (expire * 24 * 60 * 60 * 1000));
			document.cookie = name + "=" + escape(value) + ";"
			"expires=" + expireDate.toGMTString();
		}

		if (saveCookieByNameAndValue) {
			document.cookie = name + "=" + escape(value);
		}

	} catch (e) {
	}
}

/**
 * 获取所有的cookies列表
 * 
 * @result 返回客户端所有的cookie列表
 */
MyJs.prototype.getCookies = function() {
	try {
		var allcookies = document.cookie;
		return allcookies
	} catch (e) {
	}
}

/**
 * 根据Cookie名称获得对应的值
 * 
 * @param value
 * @result 返回名称所对应的cookie值
 */
MyJs.prototype.getCookie = function(name) {
	try {
		var allcookies = document.cookie;
		var cookie_pos = allcookies.indexOf(name);
		if (cookie_pos != -1) {
			cookie_pos += name.length + 1;
			var cookie_end = allcookies.indexOf(";", cookie_pos);
			if (cookie_end == -1) {
				cookie_end = allcookies.length;
			}
			var value = unescape(allcookies.substring(cookie_pos, cookie_end));
			return value;
		}
	} catch (e) {
	}
}

/**
 * 根据Cookie名称获得对应的值
 * 
 * @param value
 * @result 返回名称所对应的cookie值
 */
MyJs.prototype.removeCookie = function(name) {
	try {
		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime() - 10000); // 设置为一个过去的时间就自动过期
		var value = this.getCookie(name);
		if (value != null) {
			document.cookie = name + "=" + escape(value) + ";expires="
					+ expireDate.toGMTString();
		}
	} catch (e) {
	}
}

/** ******************************************操作JSON*********************************** */

/**
 * 根据指定的字符串(符合json规范的)创建JSON字符串
 * 
 * @param value
 *            指定的符合json规范的字符串
 * @result 返回JSON对象的字符串
 */
MyJs.prototype.createJson = function(value) {
	try {
		if (this.isNull(value)) {
			return new NullPointerException("the value is null");
		}
		var jsonObject = JSON.parse(value);
		if (!this.isNull(jsonObject)) {
			return jsonObject;
		}
	} catch (e) {
	}
}

/**
 * 根据指定的JSON对象反转为JS字符串
 * 
 * @param value
 *            JSON对象
 * @result 返回JS语法的字符串
 */
MyJs.prototype.reverceJson = function(value) {
	try {
		if (this.isNull(value)) {
			return new NullPointerException("the value is null");
		}
		var tempValue = JSON.stringify(value);
		if (!this.isNull(tempValue)) {
			return tempValue;
		}
	} catch (e) {
	}
}

/** ***************************************自定义登陆**************** */

/**
 * 根据传递进来的用户ID/密码ID/验证码ID,进行登陆的封装
 * 
 * @param nameElementId
 *            登陆名称ID
 * @param passwordElementId
 *            登陆密码ID
 * @param codeElementId
 *            验证码ID
 * @return 如果登陆成功则返回true, 否则返回fales
 */
MyJs.prototype.login = function(nameElementId, passwordElementId,
		codeElementId, submitURL, toURL) {
	try {
		var username = jQuery("#" + nameElementId);
/** 获取用户名 */
		var password = jQuery("#" + passwordElementId);
/** 获取密码 */
		var code = jQuery("#" + codeElementId);
/** 获取验证码 */

		if (this.isNull(username.val())) {
			alert("请输入您的用户名(登陆ID)!");
			username.focus();
			return false;
		} else if (this.isNull(password.val())) {
			alert("请输入您的登陆密码!");
			password.focus();
			return false;
		} else if (this.isNull(code.val())) {
			alert("请输入您的验证码!");
			code.focus();
			return false;
		} else {
			jQuery.ajax({
						type : "POST",
						url : submitURL + "&username="
								+ encodeURI(encodeURI(username.val()))
								+ "&password="
								+ encodeURI(encodeURI(password.val()))
								+ "&code=" + encodeURI(encodeURI(code.val()))
								+ "&time=" + new Date().getTime() + "",
						dataType : "text",
						success : function(data) {
							if (data != null) {
								if ("success" == data) {
									alert("欢迎您登陆: " + username.val());
									window.location.href = toURL;
								} else {
									alert(data);
									username.attr("value", "");
									password.attr("value", "");
									code.attr("value", "");
									username.focus();
								}
							}
						}
					});
		}
		return false;
	} catch (e) {
		return false;
	}
}

/**
 * 对JQuery的encode方法进行二次封装
 */
MyJs.prototype.encodeByJQuery = function(value) {
	try {
		var value = $(value);
		return encodeURI(encodeURI(value.val()));
	}catch(e){}
}

MyJs.prototype.encode = function(value) {
	try {
		var value = $(value);
		return encodeURI(encodeURI(value.val()));
	}catch(e){}
}

/**
 * 对JQuery的encode方法进行二次封装
 */
MyJs.prototype.encodeByValue = function(value) {
	try {
		return encodeURI(encodeURI(value));
	}catch(e){}
}

/**
 * 验证指定的jQuery对象里面的value是否为空
 * @param value 要验证的jQuery对象
 * @result 如果结果为空,则返回true , 如果不为空,则返回false
 */
MyJs.prototype.isNullByJQuery = function(value) {
	try {
		var value = $(value);
		if($.trim(value.val()) == null || $.trim(value.val()) == "") {
			return true;
		} else {
			return false;
		}
	}catch(e){}
}

/**
 * RGB颜色对象转为16进制
 */
MyJs.prototype.RgbToHex = function(rgb) {
	try {
		if (rgb.charAt(0) == '#') {
			return rgb;
		}
		var n = Number(rgb);
		var ds = rgb.split(/\D+/);
		var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
		
		//转为16进制
		var s = decimal.toString(16);
		while (s.length < 6) {
			s = "0" + s;
		}
		
		return "#" + s;
	}catch(e){}
}

/**
 * 拷贝源内容到目标元素的内容
 */
MyJs.prototype.copyContent = function(source, target) {
	try {
		if(MyJs.isNull(source) || MyJs.isNull(target)) {
			return false;
		}
		
		var s1 = $("#"+source);
		var s2 = $("#"+target);
		
		s2.val(s1.val());
		return false;
	}catch(e) {
	}
}

/**
 * 截取sourceObject的length长度内容到targetObject
 */
MyJs.prototype.cutTheContentToObject = function(sourceObject, targetObject, length) {
	try {
		if(MyJs.isNull(sourceObject) || MyJs.isNull(targetObject) || MyJs.isNull(length)) {
			return false;
		}
		if(length <= 0) {
			return false;
		}
		
		var source = $("#"+sourceObject);
		var target = $("#"+targetObject);
		
		var content = source.val().substring(0, length);
		target.val(content);
		return false;
	}catch(e) {
		return false;
	}
}

/**
 * MyJs刷新验证码
 */
 MyJs.prototype.flushValidateCode = function(elementId, url) {
 	try {
 		if(url == null || url == "" || url == undefined) {
 			url = "/validateServlet?t="+new Date().getTime();
 		} else {
 			url = url + "&t="+new Date().getTime();
 		}
 		$("#"+elementId).attr("src", url);
 	}catch(e) {
 		return false;
 	}
 }
 
 /**
 * 根据传入的checked表单元素名称，获取该checked的所有记录的字符串
 */
 MyJs.prototype.getValueByName = function(checkedName) {
 	try {
 		var checked = $("input[name="+checkedName+"]");
		if(checked.size() <= 0) {
			return null;
		} else {
			var str = "";
			$("input[name="+checkedName+"]").each(function(){
				str+= $(this).val() + ",";
			});
			return str;
		}
 	}catch(e){
 		return null;
 	}
 }
 
 /**
  * 根据传入的checked表单元素名称，获取选中该checked的所有记录的字符串
  */
 MyJs.prototype.getValueByCheckedName = function(checkedName) {
 	try {
 		var checked = $("input[name="+checkedName+"]:checked");
		if(checked.size() <= 0) {
			return null;
		} else {
			var str = "";
			$("input[name="+checkedName+"]:checked").each(function(){
				str+= $(this).val() + ",";
			});
			return str;
		}
 	}catch(e){
 		return null;
 	}
 }
 
 /**
  * 根据传入的checked表单元素名称，获取选中该checked的所有记录的字符串
  */
 MyJs.prototype.getValueByCheckedNameAndSeparator = function(checkedName, separator) {
 	try {
 		var checked = $("input[name="+checkedName+"]:checked");
		if(checked.size() <= 0) {
			return '';
		} else {
			var str = "";
			$("input[name="+checkedName+"]:checked").each(function(){
				str+= $(this).val() + separator;
			});
			return str;
		}
 	}catch(e){
 		return '';
 	}
 }
 
 /**
  * 添加收藏
  */
 MyJs.prototype.addFavorite = function(sURL, sTitle) {
 	try {
      window.external.addFavorite(sURL, sTitle);
    } catch (e) {
      try {
          window.sidebar.addPanel(sTitle, sURL, "");
      } catch (e) {
          alert("加入收藏失败，请使用Ctrl+D进行添加");
      }
    }
 }
 
 /**
  * 设为首页
  */
 MyJs.prototype.setHome = function(obj,vrl) {
 	try {
      obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
    } catch(e){
      if(window.netscape) {
        try {
          netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
          alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage',vrl);
       }
    }
    //<a onclick="AddFavorite(window.location,document.title)">加入收藏</a>
	//<a onclick="SetHome(this,window.location)">设为首页</a>
 }
 
 /**
  * 设置字体
  */
 MyJs.prototype.setSize = function(id, size) {
 	try {
 		var obj = $("#" + id);
 		obj.css("font-size", size + "px");
 	} catch(e) {
 		return false;
 	}
 }
 
 /**
  * 按Enter键确认(提交)
  * enterFuc 按Enter键想提交的方法
  */
  MyJs.prototype.setEnterKey = function(enterFuc) {
  	try {
	  	$(document).bind("keypress", function(e){
			if(e.which == 13){
				eval(enterFuc);
				return false;
			}
		});
  	}catch(e){
  		return false;
  	}
  }
  
  /**
    * 选中select中的option
    * @param selectId 目标的select
    * @param value 目标value
    */
   MyJs.prototype.selectValue = function(selectId, value) {
   		try {
			var temp = $("#"+selectId)[0];
			for(var i=0; i<temp.length; i++) {
				if (temp.options[i].value == value){
					temp.options[i].selected = true;
					break;
				}
			}
		}catch(e) {
		}
   }
   
   /**
	 * 选中单选按钮
	 * @param radioName 单选按钮组的名称
	 * @param value 目标value
	 */
   MyJs.prototype.selectRadioValue = function(radioName, value) {
   		try {
			if(radioName != null && value != null && value != "" && radioName != "") {
				var temp = document.getElementsByName(radioName);
				for(var i=0; i<temp.length; i++) {
					if(value == temp[i].value) {
						temp[i].checked = true;
						break;
					}
				}
			}
		}catch(e) {
		}
   }
   
   /**
	 * 选中select中的option
	 * @param selectId 目标的select
	 * @param value 目标value
	 */
   MyJs.prototype.selectMultiValue = function(selectId, value) {
   		try {
			var array = new Array(); 
			array = value.split(',');
			
			var temp = $("#"+selectId)[0];
			for(var i=0; i<array.length; i++) {
				var t = array[i];
				for(var j=0; j<temp.length; j++) {
					var tt = parseInt(temp.options[j].value);
					if (tt == t){
						temp.options[j].selected = true;
						break;
					}
				}
				t = null;
			}
		}catch(e) {
		}
   }
   
   /**
	 * 选中所有的复选框
	 * @param ids 复选框的name属性
	 * @param type 按钮类型
	 */
   MyJs.prototype.checkAll = function(ids, id) {
   		try {
			var t = $("#" +id);
			if(t.html() == "全选中") {
				$("[name="+ids+"]:checkbox").each(function() { 
					$(this).attr("checked", "true"); 
				}) 
				t.html("全不选");
			} else {
				$("[name="+ids+"]:checkbox").each(function() { 
					$(this).attr("checked", ""); 
				})
				t.html("全选中");
			}
			return false;
		}catch(e) {
		}
   }
   
   /**
	 * 选中所有的复选框
	 * @param ids 复选框的name属性
	 * @param type 按钮类型
	 */
   MyJs.prototype.checkAllBtn = function(ids, id) {
   		try {
			var t = $("#" +id);
			if(t.val() == "全选中") {
				$("[name="+ids+"]:checkbox").each(function() { 
					$(this).attr("checked", "true"); 
				}) 
				t.val("全不选");
			} else {
				$("[name="+ids+"]:checkbox").each(function() { 
					$(this).attr("checked", ""); 
				})
				t.val("全选中");
			}
			return false;
		}catch(e) {
		}
   }
   
   /**
    * JS获取当前页面的版本标识
    */
   MyJs.prototype.flag = function() {
   		try {
   			return $("#flag").val();
   		}catch(e){
   			return this.CHINESE;
   		}
   }
   /**
    * 获取当前页面的URL
    */
   MyJs.prototype.currentUrl = function(){
   		window.location.href = document.URL;
   }
   /**
    * 获取上一页的URL
    */
   MyJs.prototype.prevUrl = function(){
   		window.location.href = document.referrer;
   }
   
   /**
    * 比较两个密码是否一致
    * 一致返回true, 不一致返回false
    * @param element1 元素ID
    * @param element2 元素ID
    */
   MyJs.prototype.equalPassword = function(element1, element2) {
   		try {
   			var e1 = $("#"+element1);
   			var e2 = $("#"+element2);
   			if(e1.val() == e2.val()) {
   				return true;
   			}
   			return false;
   		}catch(e){
   			return false;
   		}
   }
   
   /**
    * 验证值是否可以用, 可以用返回true, 不可以用返回false
    * @param validateUrl 验证的URL
    * @param elementId   验证的元素ID
    * @param requestName 请求的名称
    */
   MyJs.prototype.validateValue = function(validateUrl, elementId, requestName) {
   		try {
   			var isSuc = false;
   			var objV = $("#"+elementId);
   			$.ajax({
   			    async:false,
   				type:'POST',
   				dataType:'text',
   				url:''+validateUrl+'',
   				data:''+requestName+'='+MyJs.trim(objV.val())+'&t='+MyJs.randomNumber,
   				success:function(data){
   					if(MyJs.SUCCESS == data) {
   						isSuc = true;
   					} else {
   						isSuc = false;
   					}
   				}
   			});
   			return isSuc;
   		}catch(e){
   			return false;
   		}
   }
   
   MyJs.prototype.QQ = function(qq, status) {
   		try {
   			var message = '';
   			var imagePath  = '';
   			if(status == 0) {
   				message = '客服不在线，请留言';
   				imagePath = '/front/images/qq2.gif';
   			} else {
   				message = '在线即时交谈';
   				imagePath = '/front/images/qq1.gif';
   			}
   			document.write('<a target="_self" href="http://wpa.qq.com/msgrd?v=1&uin='+qq+'&site=qq&menu=yes"><img border="0" src="'+imagePath+'"  title="'+message+'"></a>')
   		}catch(e){
   		}
   }
   
   
/** 实例化JS对象,用于调用的页面用 */
var MyJs = new MyJs();

MyJs.todayDate = MyJs.getDateString('yyyy-MM-dd');