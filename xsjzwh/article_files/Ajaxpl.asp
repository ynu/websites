
var xmlHttp;
var addNew;
function GetXmlHttpObject(handler)
{ 
	var objXmlHttp=null	
	if (navigator.userAgent.indexOf("MSIE")>=0)
	{ 
		var strName="Msxml2.XMLHTTP"
		if (navigator.appVersion.indexOf("MSIE 5.5")>=0)
		{
			strName="Microsoft.XMLHTTP"
		} 
		try
		{   
			objXmlHttp=new ActiveXObject(strName)
			objXmlHttp.onreadystatechange=handler 
			return objXmlHttp
		} 
		catch(e)
		{ 
			alert("Error. Scripting for ActiveX might be disabled") 
			return 
		} 
	}
	else
	{
		objXmlHttp=new XMLHttpRequest()
		objXmlHttp.onload=handler
		objXmlHttp.onerror=handler 
		return objXmlHttp
	}
}
/* ��ʾ���� */
function showre(id,no)
{   document.getElementById("list").innerHTML = "";
	var url = "/Ping.asp?id="+id+"&page="+no;
	xmlHttp=GetXmlHttpObject(showlist)
	xmlHttp.open("GET", url , true)
	xmlHttp.send(null)
}
function showlist()
{
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") {   
	    document.getElementById("list").innerHTML = ""
		xmlAuthor = xmlHttp.responseXML.getElementsByTagName("Author")
		xmlContent = xmlHttp.responseXML.getElementsByTagName("Content")
		xmlNoI = xmlHttp.responseXML.getElementsByTagName("NoI")
		xmlIP = xmlHttp.responseXML.getElementsByTagName("IP")
		xmlreContent = xmlHttp.responseXML.getElementsByTagName("reContent")
		//�������
		for (i=0;i<xmlContent.length;i++) {  
		    var Content = xmlContent[i].firstChild.data;
            var div = document.createElement("DIV");   
            div.id = i; 
			if (Content == "û������") {
			    //alert(1)
			    div.innerHTML = "<div style='padding:5px;color:#ff0000'>��ʱ��û������</div>"
			}
			else {
			    var Author = xmlAuthor[i].firstChild.data;
			    var PostTime = xmlAuthor[i].getAttribute('PostTime');
			    var ID = xmlNoI[i].firstChild.data;
			    var IP = xmlIP[i].firstChild.data;
				var reContent = xmlreContent[i].firstChild.data;
			    div.innerHTML = "<div class='plun' style='clear:both;'><div class='ptitle'><div class='pnoi'><b><font color='blue'>"+ID+"</font></b> ¥:</div><div class='pname'>"+Author+"</div><div class='pIP'>���ԣ�<a href='http://www.laoy8.net/Other/IP.asp?IP="+IP+"' target='_blank'>"+IP+"</a></div><div class='pltime'>������ "+PostTime+"</div></div><div class='pings'>"+Content+"</div><div class='repings'>"+reContent+"</div></div>"
			}
            document.getElementById("list").appendChild(div);
		}
		 //�����ҳ��Ϣ
		P_Nums = xmlHttp.responseXML.getElementsByTagName("data")[0].getAttribute('P_Nums');
		if (P_Nums>1) {
	    	var page = xmlHttp.responseXML.getElementsByTagName("data")[0].getAttribute('page');
	    	var ID = xmlHttp.responseXML.getElementsByTagName("data")[0].getAttribute('ID');
			var D_Nums = xmlHttp.responseXML.getElementsByTagName("data")[0].getAttribute('D_Nums');
		    var l1 = "<a class='total'>&nbsp;"+D_Nums+"&nbsp;</a><a class='pages'>&nbsp;"+page+"/"+P_Nums+"&nbsp;</a>"
			l1 = (page>1)?l1+"<a href='javascript:showre("+ID+",1)' class='redirect' title='��һҳ'><<&nbsp;</a>":l1;
			var l2 = "";
			for (var i =1;i<=P_Nums;i++) {
			     l2 += (i == page)?"<a class='curpage'>"+i+"</a>":"<a href='javascript:showre("+ID+","+i+")' class='num'>"+i+"</a>"
			}
			l2 = (page == P_Nums)?l2:l2+"<a href='javascript:showre("+ID+","+P_Nums+")' class='redirect' title='���ҳ'>>>&nbsp;</a>"
			document.getElementById("MultiPage").innerHTML = l1+l2;
		}
	}
	
}
/* �������� */
function AddNew() {
    document.getElementById("sendGuest").disabled = true;
    var Author = escape(document.getElementById("memAuthor").value);
    var Content = escape(document.getElementById("memContent").value);
	var ArticleID = escape(document.getElementById("ArticleID").value);
    if (Author == "" || Content == "") {
	    alert("����д������");
		document.getElementById("sendGuest").disabled = false;
		return false;
	}
    addNew = GetXmlHttpObject(sendGuest);
    var GuestInfo = "Author="+Author+"&ArticleID="+ArticleID+"&Content="+Content;
    addNew.open("POST","/AddNew.asp",false); 
    addNew.setRequestHeader("Content-Type","application/x-www-form-urlencoded") 
    addNew.send(GuestInfo); 
} 
function sendGuest() {
    if (addNew.readyState==4 || addNew.readyState=="complete") {
       alert(unescape(addNew.responseText));
	   document.getElementById("sendGuest").disabled = false;
	   //document.getElementById("memAuthor").value = "";
	   document.getElementById("memContent").value = "";
	   showre(document.getElementById("ArticleID").value,1);
	} 
}
function reSet() {
     document.getElementById("memAuthor").value = "";
	 document.getElementById("memContent").value = "";
}