
function KillError()
{
return false;
}
window.onerror=KillError;
var web_url="/";
function $(id){return document.getElementById(id);}
//�����ı������
function runCode(obj) {
        var winname = window.open('', "_blank", '');
        winname.document.open('text/html', 'replace');
	winname.opener = null // ��ֹ�����ҳ���޸�
        winname.document.write(obj.value);
        winname.document.close();
}
function saveCode(obj) {
        var winname = window.open('', '_blank', 'top=10000');
        winname.document.open('text/html', 'replace');
        winname.document.write(obj.value);
        winname.document.execCommand('saveas','','code.htm');
        winname.close();
}
function copycode(obj) {
	obj.select(); 
	js=obj.createTextRange(); 
	js.execCommand("Copy")
}

function insertTags(tagOpen, tagClose, sampleText) {
    var txtarea = document.getElementById("memContent");
	// IE
	if(document.selection) {
		var theSelection = document.selection.createRange().text;
		if(!theSelection) { theSelection=sampleText;}
		txtarea.focus();
		if(theSelection.charAt(theSelection.length - 1) == " "){
			theSelection = theSelection.substring(0, theSelection.length - 1);
			document.selection.createRange().text = tagOpen + theSelection + tagClose + " ";
		} else {
			document.selection.createRange().text = tagOpen + theSelection + tagClose;
		}
	// Mozilla
	} else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
 		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		var myText = (txtarea.value).substring(startPos, endPos);
		if(!myText) { myText=sampleText;}
		if(myText.charAt(myText.length - 1) == " "){ // exclude ending space char, if any
			subst = tagOpen + myText.substring(0, (myText.length - 1)) + tagClose + " "; 
		} else {
			subst = tagOpen + myText + tagClose; 
		}
		txtarea.value = txtarea.value.substring(0, startPos) + subst + txtarea.value.substring(endPos, txtarea.value.length);
		txtarea.focus();
		var cPos=startPos+(tagOpen.length+myText.length+tagClose.length);
		txtarea.selectionStart=cPos;
		txtarea.selectionEnd=cPos;
	// All others
	} else {
		tagOpen=tagOpen.replace(/\n/g,"");
		tagClose=tagClose.replace(/\n/g,"");
		document.infoform.infobox.value=tagOpen+sampleText+tagClose;
		txtarea.focus();
	}
	if (txtarea.createTextRange) txtarea.caretPos = document.selection.createRange().duplicate();
}

//ͼƬ����
function resizeimg(ImgD,iwidth,iheight) {
     var image=new Image();
     image.src=ImgD.src;
     if(image.width>0 && image.height>0){
        if(image.width/image.height>= iwidth/iheight){
           if(image.width>iwidth){
               ImgD.width=iwidth;
               ImgD.height=(image.height*iwidth)/image.width;
           }else{
                  ImgD.width=image.width;
                  ImgD.height=image.height;
                }
               ImgD.alt=image.width+"��"+image.height;
        }
        else{
                if(image.height>iheight){
                       ImgD.height=iheight;
                       ImgD.width=(image.width*iheight)/image.height;
                }else{
                        ImgD.width=image.width;
                        ImgD.height=image.height;
                     }
                ImgD.alt=image.width+"��"+image.height;
            }
����������ImgD.style.cursor= "pointer"; //�ı����ָ��
����������ImgD.onclick = function() { window.open(this.src);} //����򿪴�ͼƬ
��������if (navigator.userAgent.toLowerCase().indexOf("ie") > -1) { //�ж�������������IE
������������ImgD.title = "��ʹ������������ͼƬ!";
������������ImgD.onmousewheel = function img_zoom() //��������
���������� {
��������������������var zoom = parseInt(this.style.zoom, 10) || 100;
��������������������zoom += event.wheelDelta / 12;
��������������������if (zoom> 0)��this.style.zoom = zoom + "%";
��������������������return false;
���������� }
������  } else { //�������IE
��������������     ImgD.title = "���ͼƬ�����´��ڴ�";
������������   }
    }
}

function Getcolor(img_val,input_val){
	var arr = showModalDialog("../images/selcolor.html?action=title", "", "dialogWidth:18.5em; dialogHeight:17.5em; status:0; help:0");
	if (arr != null){
		document.getElementById(input_val).value = arr;
		img_val.style.backgroundColor = arr;
		}
}

var flag=false;
function DrawImage(ImgD){
var image=new Image();
var iwidth = 750;
var iheight = 550; 
image.src=ImgD.src;
if(image.width>0 && image.height>0){
   flag=true;
   if(image.width/image.height>= iwidth/iheight){
    if(image.width>iwidth){ 
     ImgD.width=iwidth;
     ImgD.height=(image.height*iwidth)/image.width;
    }else{
     ImgD.width=image.width; 
     ImgD.height=image.height;
    }
   }else{
    if(image.height>iheight){ 
     ImgD.height=iheight;
     ImgD.width=(image.width*iheight)/image.height; 
    }else{
     ImgD.width=image.width; 
     ImgD.height=image.height;
    }
   }
}
}

function addfavorite()
{
 if (document.all)
 {
 window.external.addFavorite('http://http://www.xsjzwh.ynu.edu.cn/','���ϴ�ѧ�����Ļ���');
 }
 else if (window.sidebar)
 {
 window.sidebar.addPanel('���ϴ�ѧ�����Ļ���', 'http://http://www.xsjzwh.ynu.edu.cn/', "");
 }
} 

function nTabs(thisObj,Num){
if(thisObj.className == "active")return;
var tabObj = thisObj.parentNode.id;
var tabList = document.getElementById(tabObj).getElementsByTagName("li");
for(i=0; i <tabList.length; i++)
{
  if (i == Num)
  {
   thisObj.className = "active"; 
      document.getElementById(tabObj+"_Content"+i).style.display = "block";
  }else{
   tabList[i].className = "normal"; 
   document.getElementById(tabObj+"_Content"+i).style.display = "none";
  }
} 
}

var qi;var qt;var qp="parentNode";var qc="className";function ldc(sd,v,l){if(!l){l=1;sd=document.getElementById("ld"+sd);sd.onmouseover=function(e){x6(e)};document.onmouseover=x2;sd.style.zoom=1;}sd.style.zIndex=l;var lsp;var sp=sd.childNodes;for(var i=0;i<sp.length;i++){var b=sp[i];if(b.tagName=="A"){lsp=b;b.onmouseover=x0;if(l==1&&v){b.style.styleFloat="none";b.style.cssFloat="none";}}if(b.tagName=="DIV"){if(window.showHelp&&!window.XMLHttpRequest)sp[i].insertAdjacentHTML("afterBegin","<span style='display:block;font-size:1px;height:0px;width:0px;visibility:hidden;'></span>");x5("ldparent",lsp,1);lsp.cdiv=b;b.idiv=lsp;new ldc(b,null,l+1);}}};function x2(e){if(qi&&!qt)qt=setTimeout("x3()",100);};function x3(){var a;if((a=qi)){do{x1(a);}while((a=a[qp])&&!ld_a(a))}qi=null;};function ld_a(a){if(a[qc].indexOf("ldmc")+1)return 1;};function x1(a){if(window.ldad&&ldad.bhide)eval(ldad.bhide);a.style.visibility="";x5("ldactive",a.idiv);};function x0(e){if(qt){clearTimeout(qt);qt=null;}var a=this;if(a[qp].isrun)return;var go=true;while((a=a[qp])&&!ld_a(a)){if(a==qi)go=false;}if(qi&&go){a=this;if((!a.cdiv)||(a.cdiv&&a.cdiv!=qi))x1(qi);a=qi;while((a=a[qp])&&!ld_a(a)){if(a!=this[qp])x1(a);else break;}}var b=this;if(b.cdiv){var aw=b.offsetWidth;var ah=b.offsetHeight;var ax=b.offsetLeft;var ay=b.offsetTop;if(ld_a(b[qp])&&b.style.styleFloat!="none"&&b.style.cssFloat!="none")aw=0;else ah=0;if(!b.cdiv.ismove){b.cdiv.style.left=(ax+aw)+"px";b.cdiv.style.top=(ay+ah)+"px";}x5("ldactive",this,1);if(window.ldad&&ldad.bvis)eval(ldad.bvis);b.cdiv.style.visibility="inherit";qi=b.cdiv;}else  if(!ld_a(b[qp]))qi=b[qp];else qi=null;x6(e);};function x5(name,b,add){var a=b[qc];if(add){if(a.indexOf(name)==-1)b[qc]+=(a?' ':'')+name;}else {b[qc]=a.replace(" "+name,"");b[qc]=b[qc].replace(name,"");}};function x6(e){if(!e)e=event;e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation();}