function checkLogin()
{
	if (document.formlogin.userid.value.length<2)
	{
		 alert("对不起,请输入用户名!");
		 document.formlogin.userid.focus();
		 return false;
	}
        if (document.formlogin.padd.value.length<4)
	{
		 alert("对不起,请输入密码!");
		 document.formlogin.padd.focus();
		 return false;
	}
       
	document.formlogin.action="hklogin.asp";
	//document.formlogin.submit();
	return true;
}
function checkseah()
{
	if (document.formseah.title.value.length< 1)
	{
		 alert("对不起,请输入检索关键字!");
		 document.formseah.title.focus();
		 return false;
	}
	document.formseah.action="show_seach.asp";
	//document.formseah.submit();
	return true;
}
function checkData()
{
	if (findSchool.keyword.value.length< 1)
	{
		 alert("对不起,请输入校名关键字!");
		 findSchool.keyword.focus();
		 return false;
	}
	findSchool.action = "/class/xxname.asp";
	findSchool.submit();
	return false;
}
function checkhpData()
{
	if (findSchool.keyword.value.length< 1)
	{
		 alert("对不起,请输入校名关键字!");
		 findSchool.keyword.focus();
		 return false;
	}
	findSchool.action = "http://search.5460.net/gy5460/jsp/school/schoolhpList.jsp";
	findSchool.submit();
	return false;
}
applnname=navigator.appName;
var personwin=null;
if(applnname=="Microsoft Internet Explorer")
{
	a=true;}
else{
	a=false;
}
function navig() {
	document.netscapev.document.write('<DATA>'+window.content.value+'</DATA>');
	document.netscapev.document.close();	
}
function explore() {
	iexplorer.innerHTML=window.content.value;
}
function printData() {
	if(a) {explore();}
	else {navig(); }
}
function openmsg() {	
	i=i+1;  
	window.open("/gy5460/jsp/onlinecall/recmsg.htm", "messageWindow"+i, "status=yes,alwaysRaised=yes");
}
function openperson() {
	personwin=window.open("/gy5460/jsp/onlinecall/showperson.jsp?person="+window.person.value, "showperson", "status=yes,alwaysRaised=yes");		  
	//personwin=window.open("http://192.168.0.51:8080/online/classes/showperson.htm", "showperson", "status=yes,alwaysRaised=yes");
	//alert(window.TestApplet.onlinePerson);
}
