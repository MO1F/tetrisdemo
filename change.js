var ocolor;
function mon(obj){
	var classname=obj.className;
	var bcolorvlaue=getStyle(obj,'background');
	ocolor=extractcolor(bcolorvlaue);
	var changecolor=[];
	changecolor[0]=ocolor[0];
	changecolor[1]=ocolor[1];
	changecolor[2]=ocolor[2];
	var cvalue=50;
	for(var i=0;i<3;i++){
		var cnum=changecolor[i]+cvalue;
		cvalue+=10;
		if(cnum>255){
			changecolor[i]=255;
		}
		else
			changecolor[i]=cnum;
	}
	obj.style.background='#'+changecolor[0].toString(16)+changecolor[1].toString(16)+changecolor[2].toString(16);
	//debug.innerHTML=ocolor+"    "+changecolor;
}
function moff(obj){
	obj.style.background='#'+ocolor[0].toString(16)+ocolor[1].toString(16)+ocolor[2].toString(16);
	//debug.innerHTML=ocolor;
}
function extractcolor(ocolor){
	var bcolor=[];
	var num=0;
	var i=4;//第四个字符开始查找
	var j=0;//color个数
	var c;
	for(var i=4;i<ocolor.length;i++){
		c=ocolor[i];
		if(c==')'){
			bcolor[j]=num;
			break;
		}
		if(c==','){
			bcolor[j]=num;
			num=0;
			j++;
			i++;
			c=ocolor[i];
		}
		else{
			num=num*10;
		}
		num+=c-'0';
	}
	return bcolor;
}

HTMLElement.prototype.__defineGetter__("currentStyle", function () { 
    return this.ownerDocument.defaultView.getComputedStyle(this, null); 
});

function getStyle(obj, attr){

    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];

}