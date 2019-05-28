
function atkanimat(thisnumber,aimnumber){
	var conversion=57.29578;
	var thisgamer;
	var aimgamer;
	$('atkdebug').innerHTML+="<br>一次：";
	if(thisnumber==playerNumber){
		thisgamer=document.getElementsByClassName('gamebox')[0];
	}
	if(aimnumber==playerNumber){
		aimgamer=document.getElementsByClassName('gamebox')[0];
	}
	var gamerlist=document.getElementsByClassName('gamernum');
	for(var i=0;i<gamerlist.length;i++){
		if(gamerlist[i].innerHTML==aimnumber){
			aimgamer=gamerlist[i].parentNode;
		}
		if(gamerlist[i].innerHTML==thisnumber){
			thisgamer=gamerlist[i].parentNode;
		}
	}
	if(aimgamer==null||thisgamer==null){
		$('atkdebug').innerHTML+="数字："+thisnumber+" "+aimnumber+"<br>";
		if(aimgamer!=null){
			$('atkdebug').innerHTML+="aimgamer="+aimgamer;
		}
		if(thisgamer!=null){
			$('atkdebug').innerHTML+="thisgamer"+thisgamer;
		}
	}
	var thisx=thisgamer.getBoundingClientRect().left+thisgamer.getBoundingClientRect().width/2;
	var thisy=thisgamer.getBoundingClientRect().top+thisgamer.getBoundingClientRect().height;
	var aimx=aimgamer.getBoundingClientRect().left+aimgamer.getBoundingClientRect().width/2;
	var aimy=aimgamer.getBoundingClientRect().top+aimgamer.getBoundingClientRect().height/2;
	//$('atkdebug').innerHTML+=thisx+" <br> "+thisy+"  <br>"+aimx+" <br> "+aimy;
	var len=Math.sqrt((thisx-aimx)*(thisx-aimx)+(thisy-aimy)*(thisy-aimy));
	var animadiv=document.createElement('div');
	animadiv.style.width="3px";
	animadiv.style.height=len+"px";
	animadiv.style.position="absolute";
	animadiv.style.transform="rotate(10deg)";
	animadiv.style.left=(thisx+aimx)/2+"px";
	animadiv.style.top=(thisy+aimy)/2-len/2+"px";
	var animate1=document.createElement('div');
	animate1.style.animation="atkanimate 2s";
	animate1.style.background="red";
	animate1.className="animate";
	animadiv.appendChild(animate1);
	debug.innerHTML+="dfas ";
	if(thisx>aimx){//原点在右
		if(thisy>aimy){//原点在下
			var angle=Math.asin((thisy-aimy)/len);
			angle*=conversion;
			angle+=90;
			debug.innerHTML=angle;
			animadiv.style.transform="rotate("+angle+"deg)";
		}
		else{//原点在上
			var angle=Math.asin((thisx-aimx)/len);
			debug.innerHTML=angle;
			angle*=conversion;
			debug.innerHTML+="换算"+angle;
			animadiv.style.transform="rotate("+angle+"deg)";
		}
	}
	else{//原点在左
		if(thisy>aimy){//原点在下
			var angle=Math.asin((thisy-aimy)/len);
			angle*=conversion;
			angle=90-angle;
			debug.innerHTML=angle;
			animadiv.style.transform="rotate("+angle+"deg)";
		}
		else{//原点在上
			var angle=Math.asin((aimx-thisx)/len);
			angle=-angle;
			angle*=conversion;
			debug.innerHTML=angle;
			animadiv.style.transform="rotate("+angle+"deg)";
		}

	}
	document.body.appendChild(animadiv);

}