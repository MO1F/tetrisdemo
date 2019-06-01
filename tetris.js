//定义按键
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_ROTATE = 38;
var KEY_ACCELERATE = 40;
var KEY_PAUSE = 13;
var KEY_ONE_STOP = 32;
var KEY_R=82;
var KEY_r=114;

//定义地图大小
var MAP_R = 18;
var MAP_C = 10;

var Grade=0;
var continGrade=50;
var nextType=0;
var nextDir=0;
//定义阴影判断变量
var enableShadow = true;
var shadow = {};//？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？

///灰色方块
var greyblock=7;
var size = 28;
var currR, currC; //方块左定点的坐标位置
var currType; //当前方块的类型
var currDir = 0; //当前方块的方向
var pause = false;//暂停判断符号
var addnum=0;//增加行数
var changeaddnum=0;
var addBlock=false;//判断是否增加行标记

//定义刷新时间变量
var gtime=1200;//方块速度
var gtime_default=1200;//默认速度
var hardgitime=600;//高难度初始速度
//定义方块大小
var BLOCK_R = 4;
var BLOCK_C = 4;
//定义方块图形，使用数组每个方块定义四个方向
var BLOCKS = [
//I
[
 [[0,0,0,0], 
  [1,1,1,1],
  [0,0,0,0],
  [0,0,0,0]],
 [[0,0,1,0], 
  [0,0,1,0],
  [0,0,1,0],
  [0,0,1,0]],
 [[0,0,0,0], 
  [1,1,1,1],
  [0,0,0,0],
  [0,0,0,0]],
 [[0,0,1,0], 
  [0,0,1,0],
  [0,0,1,0],
  [0,0,1,0]]
],

//L
[
 [[0,0,0,0], 
  [1,0,0,0],
  [1,1,1,0],
  [0,0,0,0]],
 [[0,1,1,0], 
  [0,1,0,0],
  [0,1,0,0],
  [0,0,0,0]],
 [[0,0,0,0], 
  [1,1,1,0],
  [0,0,1,0],
  [0,0,0,0]],
 [[0,1,0,0], 
  [0,1,0,0],
  [1,1,0,0],
  [0,0,0,0]]
],

//J
[
 [[0,0,0,0],
  [1,1,1,0],
  [1,0,0,0],
  [0,0,0,0]],
 [[1,1,0,0],
  [0,1,0,0],
  [0,1,0,0],
  [0,0,0,0]],
 [[0,0,0,0],
  [0,0,1,0],
  [1,1,1,0],
  [0,0,0,0]],
 [[0,1,0,0],
  [0,1,0,0],
  [0,1,1,0],
  [0,0,0,0]]
],

//O
[
 [[0,1,1,0], 
  [0,1,1,0],
  [0,0,0,0],
  [0,0,0,0]],
 [[0,1,1,0], 
  [0,1,1,0],
  [0,0,0,0],
  [0,0,0,0]],
 [[0,1,1,0], 
  [0,1,1,0],
  [0,0,0,0],
  [0,0,0,0]],
 [[0,1,1,0], 
  [0,1,1,0],
  [0,0,0,0],
  [0,0,0,0]]
],

//S
[
 [[0,0,0,0],
  [0,1,1,0],
  [1,1,0,0],
  [0,0,0,0]],
 [[1,0,0,0],
  [1,1,0,0],
  [0,1,0,0],
  [0,0,0,0]],
 [[0,0,0,0],
  [0,1,1,0],
  [1,1,0,0],
  [0,0,0,0]],
 [[1,0,0,0],
  [1,1,0,0],
  [0,1,0,0],
  [0,0,0,0]]
],

//T
[
 [[0,0,0,0],
  [0,1,0,0],
  [1,1,1,0],
  [0,0,0,0]],
 [[0,1,0,0],
  [0,1,1,0],
  [0,1,0,0],
  [0,0,0,0]],
 [[0,0,0,0],
  [1,1,1,0],
  [0,1,0,0],
  [0,0,0,0]],
 [[0,1,0,0],
  [1,1,0,0],
  [0,1,0,0],
  [0,0,0,0]]
],

//Z
[
 [[0,0,0,0],
  [1,1,0,0],
  [0,1,1,0],
  [0,0,0,0]],
 [[0,0,1,0],
  [0,1,1,0],
  [0,1,0,0],
  [0,0,0,0]],
 [[0,0,0,0],
  [1,1,0,0],
  [0,1,1,0],
  [0,0,0,0]],
 [[0,0,1,0],
  [0,1,1,0],
  [0,1,0,0],
  [0,0,0,0]]
]
];


var rBlocks=[0,1,2,3,4,5,6];
//定义地图，初值为0表示空；
var map = [];
for(var r = 0; r < MAP_R; r++) {
  map.push([]);
  for(var c = 0; c < MAP_C; c++) {
    map[r][c] = {};
    map[r][c].b = 0;
  }
}
var atktipmap=[];
for(var r=0;r<MAP_R;r++){
  atktipmap.push([]);
  atktipmap[r].b=0;
}
//定义颜色数组
var colors = ['#32b16c','#ec6100','#00a1e9','#eb68a3','#fff100','#e5004f','#7ecef4','#555'];

//判断是否可以下落
function canFall(currR, currC) {
  if(pause==1)
    return false;
  for(var c = 0; c < BLOCK_C; c++)
    for(var r = BLOCK_R - 1; r >= 0; r--) {//列从左到右行从下到上
      if(!BLOCKS[currType][currDir][r][c])
        continue;
      if(currR + r + 1<0)continue;
      if(currR + r + 1 > MAP_R - 1)//判断是否落地
        return false;
      if(map[currR + r + 1][currC + c].b)//判断是否和其他方块重合
        return false;
   }
  return true;
}

//寻找方块投影坐标
function makeShadow() {
  shadow.r = currR;
  shadow.c = currC;
  while(canFall(shadow.r, shadow.c)) {//循环调用canFall找到方块最终掉落位置
    shadow.r++;
  }
}

//下落后，状态写入map中
function fall(block) {
  if(gstart==false){
    return;
  }
  playse("fall");
  for(var r = 0; r < BLOCK_R; r++)
    for(var c = 0; c < BLOCK_C; c++)
      if(BLOCKS[currType][currDir][r][c]) {
        if(currR + r<0)continue;
        map[currR + r][currC + c].b = BLOCKS[currType][currDir][r][c];//方块位置的表示
        map[currR + r][currC + c].c = currType;//方块类型
      }
  if(onlinGameFlag==true){///////联机状态下发送当前状态
    socket.emit("flashmap",{
      playerNumber:playerNumber,
      playerMap:map
    });
  }
}

//可以左移
function canLeft() {
  if(pause==1)
    return false;
  playse("move");
  for(var r = 0; r < BLOCK_R; r++)
    for(var c = 0; c < BLOCK_C; c++) {
      if(!BLOCKS[currType][currDir][r][c])
        continue;
      if(currC + c - 1 < 0)
        return false;
      if(currR + r<0)continue;
      if(map[currR + r][currC + c - 1].b)
        return false;
   }
  return true;
}

//可以右移
function canRight() {
  if(pause==1)
    return false;
  playse("move");
  for(var r = 0; r < BLOCK_R; r++)
    for(var c = BLOCK_C - 1; c >= 0; c--) { 
      if(!BLOCKS[currType][currDir][r][c])
        continue;
      if(currC + c + 1 > MAP_C - 1)
        return false;
      if(currR + r<0)continue;
      if(map[currR + r][currC + c + 1].b)
        return false;
   }
  return true;
}

//可以旋转
function canRotate() {
  if(pause==1)
    return false;
  if(currType==3)//o形方块不旋转
    return true;
  if(currR<0)//上部边界检测
    return false;
  playse("move");
  saveR=currR;//保留初值用于还原
  saveC=currC;
  var newDir = [1,2,3,0][currDir];
  for(var r=0;r<BLOCK_R;r++){//踢墙   目前未实现
    for(var c=0;c<BLOCK_C;c++){
      if(currR + r<0)continue;
      if(!BLOCKS[currType][newDir][r][c])
        continue;
      if(currC+c< 0){
          //easeBlock();
          currC=-c;
      }
      if(currC+c+1>MAP_C-1){
          currC=MAP_C-1-c;
      }
    }
  }
  for(var r=0;r<BLOCK_R;r++){
    for(var c=0;c<BLOCK_C;c++){
      if(!BLOCKS[currType][newDir][r][c])
        continue;
      if(map[currR+r][currC+c].b==1){
        currR=saveR;
        currC=saveC;
        return false;
      }
    }
  }
  easeBlock();
  return true;
}
function checkblocknow(ncurrR,ncurrC,ncurrDir){//预定用于旋转目前未使用
  for(var r = 0; r < BLOCK_R; r++)
          for(var c = BLOCK_C - 1; c >= 0; c--) {
            if(!BLOCKS[currType][ncurrDir][r][c])
            continue;
            if(map[ncurrR + r][ncurrC + c + 1].b)
              return false;
          }
  return true;
}
//判断是否满一整行，满了就记录对应的行进数组
function checkFullRows() {
  var rows = [];
  var full;
  for(var r = currR; r < MAP_R; r++) {
    if(currR<0)continue;
    full = true;
    for(var c = 0; full && c < MAP_C; c++)
      full = map[r][c].b;
    if(full)
      rows.push(r);
    
  }
  return rows;
}
//实现消去一行的显示工作
function showPop(rows) {
  var baseGrade=100;
  continGrade=0;
  playse("clear");
  var rowlength=rows.length;
  for(var k=0;k<rows.length;k++){
      Grade+=baseGrade+continGrade;
      continGrade+=50;
  }
  if(addnum!=0){
    if(addnum>=rowlength){
      addnum-=rowlength;
      rowlength=0;
      showatktips();
    }
    else{
      rowlength-+addnum;
      addnum=0;
      showatktips();
    }
  }
  if(onlinGameFlag==true&&rowlength!=0){
    attackgamer(rowlength);
  }
  for(var i = 0; i < rows.length; i++)
    for(var c = 0; c < MAP_C; c++){
      //$(rows[i] + '-' + c).style.backgroundColor = 'transparent';
      $(rows[i] + '-' + c).style.border = '1px solid ' + "transparent";
    }
}
function switchaddrow(){
  if(addnum==0){
    return;
  }
  var staddtimer;
  if(staddtimer==null){
    showatktips();
    staddtimer=setTimeout(startaddRow,4000);
    changeaddnum=addnum;
  }
  if(changeaddnum<addnum){
    clearTimeout(ataddtimer);
    staddtimer=setTimeout(startaddRow,4000);
    showatktips();
    changeaddnum=addnum;
  }
  
}
function startaddRow(){
  addBlock=true;
}
function addRows(){
  var rblock=[];
  for(var i=0;i<addnum;i++){
    rblock.push(randInt(0,MAP_C));
  }
  upMap(addnum);
  var i=0;
  for(var r=MAP_R-addnum;r<MAP_R;r++){
    for(var c=0;c<MAP_C;c++){
      if(c!=rblock[i]){
        map[r][c].b=1;
        map[r][c].c=greyblock;
      }
      else{
        map[r][c].b=0;
      }
    }
  }
    for(var r = 0; r < MAP_R; r++)
    for(var c = 0; c < MAP_C; c++){
      var div = $(r + '-' + c);
      if(map[r][c].b) {
        //div.style.backgroundColor = colors[map[r][c].c];
        div.className="c"+colors[map[r][c].c].split('#')[1];
        div.style.border = '1px solid ' + "transparent";
      } else{
        //div.style.backgroundColor = 'transparent';
        div.className="";
        div.style.border = '1px solid ' + "transparent";
      }
    }
  addnum=0;
  changeaddnum=0;
  easeatktips();
}
function upMap(num){/////有bug
  for(var r=0;r<MAP_R;r++){
    for(var c=0;c<MAP_C;c++){
      if(map[r][c].b){
        if(r-num<0){
          gstart=false;
          ++r;
          c=0;
        }
        else{
          map[r-num][c].b=map[r][c].b;
          map[r-num][c].c=map[r][c].c;
        }
      }
      else{
          if(r-num<0){
            continue;
          }
          map[r-num][c].b=map[r][c].b;
          map[r-num][c].c=map[r][c].c;
      }
    }
  }
}
//在map中将满行的行消除
function popRows(rows) {
  for(var i = 0; i < rows.length; i++)
    for(var r = rows[i] - 1; r >= 0; r--)
      for(var c = 0; c < MAP_C; c++) {
        map[r + 1][c].b = map[r][c].b;
        map[r + 1][c].c = map[r][c].c;
      }
}
//键盘监听函数
document.onkeydown = function(event) {
  if(!gstart) return
  var keyCode = window .event?event.keyCode:event.which;

  if(keyCode == KEY_LEFT ||  keyCode == KEY_RIGHT) {
    easeBlock();
    if(enableShadow)//消除当前阴影
      easeShadow();
    if(keyCode == KEY_LEFT) {//左移
      if(canLeft())
        --currC;
    } else if(keyCode == KEY_RIGHT) {//右移
      if(canRight())
        ++currC;
    }
    drawBlock();
    if(enableShadow) {//显示移动后的阴影
      makeShadow();
      drawShadow();
    }
  } else if(keyCode == KEY_ROTATE) {
    if(canRotate()) {//是否能旋转
      easeBlock();
      if(enableShadow)
        easeShadow();
      currDir = [1,2,3,0][currDir];//数组[1,2,3,0][当前方向]实现循环0123方向
      drawBlock();
      if(enableShadow) {
        makeShadow();
        drawShadow();
      }
    }
  } else if(keyCode == KEY_ACCELERATE) {
    loop();
  } else if(keyCode == KEY_PAUSE) {
    pause = !pause;//暂停判断符号取反
    if(pause)
      clearInterval(timer);//清除计时器timer
    else
      timer = setInterval(loop, gtime);  //建立计时器timer
  } else if(keyCode == KEY_ONE_STOP) {
    easeBlock();//清除方块
    makeShadow();//重画阴影???
    currR = shadow.r;
    currC = shadow.c;
    drawBlock();  //绘制方块
    loop();
  }else if(keyCode==KEY_R||keyCode==KEY_r){
    pause=0;
    Grade=0;
    printGrade();
    clearInterval(timer);
    easemap();
    nextBlock();
    drawBlock();
    makeShadow();
    drawShadow();
    clearInterval(timer);
    timer = setInterval(loop, gtime);
    
  }
}
function hasplace(){
  for(var c = 0; c < BLOCK_C; c++)
    for(var r = BLOCK_R - 1; r >= 0; r--) {//列从左到右行从下到上
      if(!BLOCKS[currType][currDir][r][c])
        continue;
      if(currR + r<0)continue;
      if(currR + r > MAP_R - 1)//判断是否落地
        return false;
      if(map[currR + r][currC + c].b)//判断是否和其他方块重合
        return false;
   }
  return true;
}
function randInt(n, m) {
  return Math.floor(Math.random() * (m - n)) + n;//返回n到m之间的值n到m-1
}
function nextBlock() {//生成下下个方块
  currR = 0;
  currC = MAP_C / 2 - BLOCK_C / 2;
  currType = nextType;
  currDir = nextDir;
  var num=0;
  for(var c=0;c<BLOCK_C;c++){//每个方块都从第一行开始下落
    if(BLOCKS[currType][currDir][0][c]==0)
      num++;
    //console.log(num);
  }
  if(num==4){
    currR=-1;
  }
  while(!hasplace()){
    currR--;
  }

  nextType = randomBlock();
  nextDir = randInt(0, 4);
  easeNext();
  drawNext();

}
function easeNext(){//擦除当前下一个方块
      for(var r = 0; r < BLOCK_R; r++)
    for(var c = 0; c < BLOCK_C; c++) {
        var div = $(r + '#' + c);
        //div.style.backgroundColor = 'transparent';
        div.className="";
        div.style.border = '1px solid ' + 'transparent';
      }
}
function drawNext(){//画下一个方块
    for(var r = 0; r < BLOCK_R; r++)
    for(var c = 0; c < BLOCK_C; c++) {
      if(BLOCKS[nextType][nextDir][r][c]) {
        var div = $(r + '#' + c);
        //div.style.backgroundColor = colors[nextType];
        div.className="c"+colors[nextType].split('#')[1];
        div.style.border = '1px solid ' + 'transparent';//colors[nextType];
      }
    }
}
function printGrade() {//计分
  var grade = $('grade');
  grade.innerHTML = Grade;
}
function isfall(){
  for(var c=3;c < 6; c++){
    if(map[0][c].b){
      return true;
    }
  }
  return false;
}
function loop() {//游戏运行函数
  if(pause==1)
    return;
  if(canFall(currR, currC)) {//判断下落
    easeBlock();
    ++currR;
    drawBlock();
  } else {
    fall();//落地写入地图数组
    if( isfall()||!gstart) {//定义游戏结束
      drawBlock();
      clearInterval(timer);
      if(onlinGameFlag==true){
        socket.emit("gameOver",{
          roomnumber:roomnumber,
          playerNumber:playerNumber
        });
      }
      gstart=false;
      //onlinGameFlag==false;
     // $('atkdebug').innerHTML+="1次 ";
      gameOverDisplay();
      return;
    }
    var rows = checkFullRows();//检查是否满行消除
    if(rows.length > 0) {//当满行是进行消除
      showPop(rows);
      popRows(rows);
      printGrade();
      setTimeout(function(){
        drawMap();
      }, 200);
    }
    if(enableShadow)
      easeShadow();
    if(addBlock==true){
      addRows();
      addBlock=false;
    }
    nextBlock();
    drawBlock();
    if(enableShadow) {
      makeShadow();
      drawShadow();
    }
  }
}

function drawMap() {//绘制地图
  for(var r = 0; r < MAP_R; r++)
    for(var c = 0; c < MAP_C; c++) {
      var div = $(r + '-' + c);
      if(map[r][c].b) {
       //div.style.backgroundColor = colors[map[r][c].c];
        div.style.border = '1px solid'+'transparent';//colors[map[r][c].c];
        div.className="c"+colors[map[r][c].c].split('#')[1];
      } else{
        //div.style.backgroundColor = 'transparent';
        div.style.border = '1px solid '+' transparent';
        div.className="";
      }
    }
    drawBlock();
}

function drawBlock() {//绘制当前方块
  for(var r = 0; r < BLOCK_R; r++)
    for(var c = 0; c < BLOCK_C; c++) {
      if(BLOCKS[currType][currDir][r][c]) {
        if(currR+r<0)continue;
        var div = $((currR + r) + '-' + (currC + c));
        //div.style.backgroundColor = colors[currType];
        div.className="c"+colors[currType].split('#')[1];
        div.style.border = '1px solid ' + 'transparent';//colors[currType];
      }
    }
}

function easeBlock() {//清除当前方块的痕迹
  for(var r = 0; r < BLOCK_R; r++)
    for(var c = 0; c < BLOCK_C; c++) {
      if(currR + r<0)continue;
      if(BLOCKS[currType][currDir][r][c]) {
        var div = $((currR + r) + '-' + (currC + c));
        //div.style.backgroundColor = 'red';
        div.style.border = '1px solid ' + 'transparent';
        div.className="";
      }
      if(currC + c<0)continue;
      if(currC + c>=MAP_C)continue;
      if(currR + r>=MAP_R)continue;
      if(map[r+currR][c+currC].b==0){
        var div = $((currR + r) + '-' + (currC + c));
        div.style.border = '1px solid ' + 'transparent';
        div.className="";
      }
    }
}
//绘制阴影图形
function drawShadow() {
  for(var r = 0; r < BLOCK_R; r++)
    for(var c = 0; c < BLOCK_C; c++) {
      if(BLOCKS[currType][currDir][r][c]) {
        if(shadow.r + r<0)continue;
        var div = $((shadow.r + r) + '-' + (shadow.c + c));
        div.style.border = '1px solid #EEE';
      }
    }
}
//消除阴影
function easeShadow() {
  for(var r = 0; r < BLOCK_R; r++)
    for(var c = 0; c < BLOCK_C; c++) {
      if(BLOCKS[currType][currDir][r][c]) {
        if(shadow.r+r<0)continue;
        var div = $((shadow.r + r) + '-' + (shadow.c + c));
        div.style.border = '1px solid ' + 'transparent';
      }
    }
}
function easemap(){
  for(var r=0;r<MAP_R;r++){
    for(var c=0;c<MAP_C;c++){
      map[r][c] = {};
      map[r][c].b = 0;
      var div=$(r+'-'+c);
      div.style.backgroundColor = 'transparent';
      div.style.border = '1px solid ' + 'transparent';
      div.className="";
    }
  }
}
function initatktips(){
  $('atktips').style.height=height+"px";
  $('atktips').style.width=size+2+"px";
  for(var r = 0; r < MAP_R; r++) {
      var div = document.createElement('div');
      div.id = "tips"+'-' + r;
      div.style.position = 'absolute';
      div.style.top = size * r + (r + 1) * 3 + 'px';
      //div.style.left =  'px';
      div.style.width = size + 'px';
      div.style.height = size + 'px';
      
      div.style.border="1px solid transparent";
      $('atktips').appendChild(div);
    }
}
function showatktips(){
  for(r=MAP_R-1;r>=0;r--) {
    if(r>=MAP_R-addnum){
      var div=$("tips-"+r);
      div.className="c555";
    }
    else{
      var div=$("tips-"+r);
      div.className="";
    }
    
  }
}
function easeatktips(){
  for(r=0;r<MAP_R;r++){
    var div=$("tips-"+r);
    div.className="";
  }
}
function speedchange(){
  if(onlinGameFlag==true||gstart==false||pause==true){
    return;
  }
  if(gstart==false){
    return;
  }
  if(gtime<=150){
    return;
  }
  gtime-=5;
  clearInterval(timer);//清除计时器timer
  timer = setInterval(loop, gtime);  //建立计时器timer
}

function randomBlock(){
  if(rBlocks.length==0){
    rBlocks=[0,1,2,3,4,5,6];
    //$('atkdebug').innerHTML+="<br>";

  }
  var blocknum=randInt(0,rBlocks.length);
  var k=rBlocks[blocknum];
  //$('atkdebug').innerHTML+=k+" ";
  rBlocks.splice(blocknum, 1);
  return k;
}
function init() {//初始化  定义游戏截面大小 填充方格

  var space = $('space');
  space.style.position = 'relative';
  space.style.width = size * MAP_C + (MAP_C + 1) * 3 + 1 + 'px';
  space.style.height = size * MAP_R + (MAP_R + 1) * 3 + 1 + 'px';
  //space.style.backgroundColor = 'lavender';
  space.style.border = '2px solid #407afc';
  var nextspace = $('nextBlocks');
  nextspace.style.position = 'relative';
  nextspace.style.width = size * BLOCK_C + (BLOCK_C + 1) * 3 + 1 + 'px';
  nextspace.style.height = size * BLOCK_R + (BLOCK_R + 1) * 3 + 1 + 'px';
  //nextspace.style.border = '2px solid black';
  nextspace.style.borderRadius="2px";
  nextspace.style.boxShadow="0 10px 50px 0 rgba(0,20,180,.1)";
  for(var r = 0; r < MAP_R; r++) {
    for(var c = 0; c < MAP_C; c++) {
      var div = document.createElement('div');
      div.id = r + '-' + c;
      div.style.position = 'absolute';
      div.style.top = size * r + (r + 1) * 3 + 'px';
      div.style.left = size * c + (c + 1) * 3 + 'px';
      div.style.width = size + 'px';
      div.style.height = size + 'px';
      space.appendChild(div);
    }
  }
  for(var r=0;r<BLOCK_R;r++){
    for(var c=0;c<BLOCK_C;c++){
      var div = document.createElement('div');
      div.id = r + '#' + c;
      div.style.position = 'absolute';
      div.style.top = size * r + (r + 1) * 3 + 'px';
      div.style.left = size * c + (c + 1) * 3 + 'px';
      div.style.width = size + 'px';
      div.style.height = size + 'px';
      nextspace.appendChild(div);
    }
  }
}