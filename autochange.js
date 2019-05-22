onload=autochange()
function $$(char){
  	return document.getElementsByClassName(char)[0];
}
var res;
function autochangetimer(){
        if (res){clearTimeout(res)}
        res = setTimeout(autochange,300);
}
function autochange(){
	if(phoneflag==false){
		phoneflag=check();
		return;
	}
	phoneflag=check();
  bgm.volume=musicvalue/MAx_musicvalue;
  se.volume=sevalue/MAx_musicvalue;

/*  $('body').innerHTML="";
  $('body').style.height=height;
  $('body').style.background="red";*/
  //online页面
  width=document.documentElement.clientWidth;
  height=document.documentElement.clientHeight;
  detectOrient1();
  var boheight=getheight('obottom');
  var theight=getheight('title');
  var roomlheight=39;
  $$('roomlist').style.height=height-theight-boheight-roomlheight-1+"px";
  //createroom
  var riheight=getheight('roominfo');
  var rcheight=getheight('roomcode');
  var rbtmheigt=getheight('btmbox');
  var cpadding=height-theight-riheight*2-rcheight-rbtmheigt;
  $$('croombox').style.paddingTop=cpadding/4+"px";
  $$('croombox').style.height=height-theight-cpadding/4+"px";
  //room
  var readybtmboxheight=getheight('readybtmbox');
  $('playerslist').style.height=height-theight-readybtmboxheight-10-1+"px";
  var playersul=document.getElementsByClassName('playersul');
  for(var i=0;i<playersul.length;i++){
  	playersul[i].style.width=(width-10)/8-10+"px";
  	playersul[i].style.height=(height-theight-readybtmboxheight-10-10)/2-10+"px";
  }
  //option
  var opcheight=getheight('opcenter');
  var btmheight=getheight('btm');
  var obpadding=(height-opcheight-btmheight)/4;
  $$('opbox').style.paddingTop=obpadding+"px";
  $$('opbox').style.height=height-theight-obpadding+"px";
  //ranking
  $$('ranking').style.height=height+"px";
  $$('recordbox').style.width=width/2.5+"px";
  //gamebox
  autochangegame();
  autogamebox();
  
}
function detectOrient1(){
	if(width<=height){
		document.body.style.transform="rotate(+90deg)";
			width=document.documentElement.clientHeight;
			height=document.documentElement.clientWidth;
	}
	else{
		document.body.style.transform="rotate(0)";
			width=document.documentElement.clientWidth;
  			height=document.documentElement.clientHeight;
	}
}

function autogamebox(){
  var leftboxheight=getheight('leftbox');
  var leftboxwidth=getwidth('leftbox');
  var atktipsheight=getheight('atktips');
  var atktipswidth=getwidth('atktips');
  var rightboxheight=getheight('rightbox');
  var rightboxwidth=getwidth('rightbox');
  var gameboxheight=getheight('gamebox');
  var gameboxwidth=getwidth('gamebox');
  $$('box').style.width=width+"px";
  $$('box').style.height=height+"px";
  $$('leftbox').style.width=(width-atktipswidth-gameboxwidth-8)/2+"px";
  $$('leftbox').style.height=height+"px";
  $$('gamebox').style.top=height-gameboxheight-4+"px";
  $$('rightbox').style.width=(width-atktipswidth-gameboxwidth-8)/2+"px";
  $$('rightbox').style.height=height+"px";
  //$('atkdebug').innerHTML+=width+" "+atktipswidth+" "+gameboxwidth+" "+getwidth('leftbox')+" "+getwidth('rightbox')+"<br>";
  var r1height=getheight('r1');
  var r2height=getheight('r2');
  $$('vbuttombox').style.top=(r1height+r2height)+50+"px";
  $$('vbuttombox').style.left=width-getwidth('rightbox')+30+"px";
  $$('vbuttombox').style.width=getwidth('rightbox')-30+"px";
  $$('vbuttombox').style.height=height-(r1height+r2height)-50+"px";
  var vbtmwidth=getwidth('vbuttombox')/6.1;
  var vbtmheight=getheight('vbuttombox')/3.2;
  var vbtmblock;

  if(vbtmheight>vbtmwidth){
  	vbtmblock=vbtmwidth;
  }
  else{
  	vbtmblock=vbtmheight;
  }
  var vbtminterval=0.2*vbtmblock;
  for(var i=0;i<4;i++){
  	var vbtm1=document.getElementsByClassName('vButtom')[i];
  	vbtm1.style.width=vbtmblock+"px";
  	vbtm1.style.height=vbtmblock+"px";
  	if(i==0){
  		vbtm1.style.top=0.5*vbtmblock+"px";
  		vbtm1.style.left=vbtmblock*3+2*vbtminterval+"px";
  	}
  	else{
  		vbtm1.style.top=vbtmblock*1.5+vbtminterval+"px";
  		vbtm1.style.left=i*vbtminterval+((i-1)+2)*vbtmblock+"px";
  	}
  }
  var vspace1=document.getElementsByClassName('vSpace')[0];
  vspace1.style.width=vbtmblock*1.5+"px";
  vspace1.style.height=vbtmblock+"px";
  vspace1.style.top=vbtmblock*1.5+vbtminterval+"px";
  vspace1.style.left=0.5*vbtmblock+"px";

}

function detectOrient() {
        var width = document.documentElement.clientWidth,
                height = document.documentElement.clientHeight,
                wrapper = document.body,
                style = "";
        if(width >= height) { // 竖屏
            style += "width:100%"; 
            style += "height:100%;";
            style += "-webkit-transform: rotate(0); transform: rotate(0);";
            style += "-webkit-transform-origin: 0 0;";
            style += "transform-origin: 0 0;";
        } else { // 横屏
            style += "width:" + height + "px;";// 注意旋转后的宽高切换
            style += "height:" + width + "px;";
            style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
            // 注意旋转中点的处理
            style += "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
            style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
        }
        wrapper.style.cssText = style;
}
function autochangegame(){
	//height=size * MAP_R + (MAP_R + 1) * 3 + 1 
	size=(height-4-1-3*(MAP_R + 1))/MAP_R;
	$('space').innerHTML="";
	$('nextBlocks').innerHTML="";
	nextBlocks
	init();
	if(gstart==true){
		drawMap();
		drawNext();
		$('atktips').innerHTML="";
		initatktips();
	}
}


function check() { 
  var userAgentInfo=navigator.userAgent; 
  var Agents =new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"); 
  var flag=true; 
  for(var v=0;v<Agents.length;v++) { 
     if(userAgentInfo.indexOf(Agents[v])>0) { 
       flag=false; 
       break; 
     } 
   } 
   return flag; 
  }