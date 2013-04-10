/** 实现JS颜色选择器 **/
<!--
var ColorHex = new Array('00','33','66','99','CC','FF')
var SpColorHex = new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF')
var current=null
var targetObject = null; //目标元素
var targetHiddenObject = null; //隐藏表单域

function initcolor(evt) {
var colorTable=''
for (i=0;i<2;i++) {
	for (j=0;j<6;j++) {
		colorTable=colorTable+'<tr height=8>'
		colorTable=colorTable+'<td width=8 style="background-color:#000000">'
		if (i==0){
			colorTable=colorTable+'<td width=8 style="cursor:pointer;background-color:#'+ColorHex[j]+ColorHex[j]+ColorHex[j]+'" onmouseover="colorTip(this.style.backgroundColor)" onclick="doclick(this.style.backgroundColor)">'
		} else {
			colorTable=colorTable+'<td width=8 style="cursor:pointer;background-color:#'+SpColorHex[j]+'" onclick="doclick(this.style.backgroundColor)" onmouseover="colorTip(this.style.backgroundColor)">'
		}
		colorTable=colorTable+'<td width=8 style="background-color:#000000">'
		for (k=0;k<3;k++) {
			for (l=0;l<6;l++) {
				colorTable=colorTable+'<td width=8 style="cursor:pointer;background-color:#'+ColorHex[k+i*3]+ColorHex[l]+ColorHex[j]+'" onclick="doclick(this.style.backgroundColor)" onmouseover="colorTip(this.style.backgroundColor)">'
			}
		}
	}
}
colorTable='<table border="0" cellspacing="0" cellpadding="0" style="border:1px #000000 solid;border-bottom:none;border-collapse: collapse;width:190px;" bordercolor="000000">'
+'<tr height=10><td colspan=21 bgcolor=#ffffff style="font:10px tahoma;padding-left:2px;">'
+'<span id="colorText" style="float:left;color:#999999;">请选择相应的颜色</span>'
+'<span style="float:right;padding-right:3px;cursor:pointer;" onclick="colorclose()">×关闭</span>'
+'</td></table>'
+'<table border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse" bordercolor="000000" style="cursor:pointer;">'
+colorTable+'</table>';

document.getElementById("colorpane").innerHTML=colorTable;
var current_x = document.getElementById("inputcolor").offsetLeft;
var current_y = document.getElementById("inputcolor").offsetTop;
document.getElementById("colorpane").style.left = (current_x+135) + "px";
document.getElementById("colorpane").style.top = (current_y+90) + "px";
}
function colorTip(obj) {
	try {
		if("IE" == MyJs.browserVersion()) {
			document.getElementById("colorText").innerHTML = "当前颜色:" + obj;
		} else {
			document.getElementById("colorText").innerHTML = "当前颜色:" + MyJs.RgbToHex(obj);
		}
		if(targetObject != null && targetObject != "") {
			if("IE" == MyJs.browserVersion()) {
				$("#"+ targetObject).css("color", obj);
			} else {
				$("#"+ targetObject).css("color", MyJs.RgbToHex(obj));
			}
		}
		if(targetHiddenObject != null && targetHiddenObject != "") {
			if("IE" == MyJs.browserVersion()) {
				$("#" + targetHiddenObject).val(obj);
			} else {
				$("#" + targetHiddenObject).val(MyJs.RgbToHex(obj));
			}
		}
	}catch(e){
	}
}

function doclick(obj){
	colorclose();
}

function colorclose(){
	document.getElementById("colorpane").style.display = "none";
}

function coloropen(event, id, hiddenId){
	initcolor();
	targetObject = id;
	targetHiddenObject = hiddenId;
	document.getElementById("colorpane").style.display = "";
}