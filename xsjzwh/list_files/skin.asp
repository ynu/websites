
function SetCookie(name,value){
    var argv=SetCookie.arguments;
    var argc=SetCookie.arguments.length;
    var expires=(2<argc)?argv[2]:null;
    var path=(3<argc)?argv[3]:null;
    var domain=(4<argc)?argv[4]:null;
    var secure=(5<argc)?argv[5]:false;
    document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":""); 
}

function GetCookie(Name) {
    var search = Name + "=";
    var returnvalue = "";
    if (document.cookie.length > 0) {
          offset = document.cookie.indexOf(search);
          if (offset != -1) {      
                offset += search.length;
                end = document.cookie.indexOf(";", offset);                        
                if (end == -1)
                      end = document.cookie.length;
                returnvalue=unescape(document.cookie.substring(offset,end));
          }
    }
    return returnvalue;
}

var thisskin;
thisskin=GetCookie("nowskinhttp://www.xsjzwh.ynu.edu.cn//");
if(thisskin!="")
    skin.href=thisskin;
else
    skin.href="/images/css10.css";

function changecss(url){
    if(url!=""){
          skin.href=url;
          var expdate=new Date();
          expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
          //expdate=null;
                                  //��������COOKIESʱ��Ϊ1��,�Լ�������ø�ʱ��..
          SetCookie("nowskinhttp://www.xsjzwh.ynu.edu.cn//",url,expdate,"/",null,false);
    }
}