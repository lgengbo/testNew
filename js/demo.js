// 思路

// 1、点击开始游戏-->startpage消失->游戏开始

// 2、随机出现食物，出现三节蛇开始运动
        //生成随机食物food()函数和生成固定位置的蛇snake()函数
// 3、上下左右->改变方向运动
        //定义一个move函数，里面有设置蛇的xy值和判断是否+20
        //move函数调用一个清除蛇的removeClass函数和重新调用生成新的蛇
        //顶一个键盘监听bindEvent函数获取按下的键值通过setDirect函数来判断游戏属性
        //定义游戏属性和定时器和速度
        //在snake()设置蛇头方向
// 4、判断吃到食物->食物消失，蛇加一
        //获取分数id，在move()中判断是否碰到食物消失分数加一
// 5、判断游戏结束，弹出框
        //在move中判断是否碰到边界和碰到蛇身，用reloadGame()定义清除结束游戏和重新加载属性
        //弹出框添加数据
// 6、点击X关闭弹出框 ,点击开始游戏-->startPage开始游戏按钮消失->游戏开始 ->开始/暂停控制蛇的运动
         //获取 关闭X图标、开始/暂停的按钮、开始游戏按钮父级、开始游戏按钮、是否开始游戏的判断、判断是否可以开始游戏，是否在启动游戏 的id
         //startGameBool、startPaushBool控制是否游戏开始和缓冲
         //bindEvent()中定义开始游戏按钮和开始/暂停的点击事件，里面放着相同的startAndPaush()
         //定义startAndPaush() 点击开始和暂停按钮时的游戏缓冲,判断
// 7、点击X后在点左上角开始按钮重新开始游戏
         //在reloadGame设置startGameBool、startPaushBool为true，和设置左上角的图片

//获取分数的id、弹框id、运动区id、失败玩弹框显示的分数、关闭X图标、开始/暂停的按钮、
//开始游戏按钮父级、开始游戏按钮、是否开始游戏的判断、判断是否可以开始游戏，是否在启动游戏
var scoreBox = document.getElementById('score')
var content = document.getElementById('content');
var loser = document.getElementById('loser');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var startPage = document.getElementById('startPage');
var startBtn = document.getElementById('startBtn');
var startP = document.getElementById('startP');
var startGameBool = true;
var startPaushBool = true;
//定义一个定时器和速度
var snakeMove;
var speed = 200;
//初始化
init();
function init() {
    //地图宽高
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    //蛇头和蛇身,[X坐标,Y坐标,蛇头/蛇身]
    this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
    //游戏属性
    this.direct = 'right'; //默认方向
    //让方向为右的时候，只能改变上下
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //定义分数
    this.score = 0;
    //调用键盘事件
    bindEvent();
}

//开始游戏
function startGame() {
    startPage.style.display = 'none';
    startP.style.display = 'block';
    //调用生成食物
   food();
   //调用生成蛇
   snake();
}

//生成随机食物
function food() {
   var food = document.createElement('div');
   food.style.width = this.foodW + 'px';
   food.style.height = this.foodH + 'px';
   food.style.position = 'absolute';
   //食物随机出现的坐标
   this.foodX = Math.floor(Math.random() * (this.mapW/20));
   this.foodY = Math.floor(Math.random() * (this.mapH/20));
   food.style.left = this.foodX * 20 + 'px';
   food.style.top = this.foodY * 20 + 'px';
   //插入到运动区域中，calss是设置食物的图片
   this.mapDiv.appendChild(food).setAttribute('class','food');
}

//生成蛇
function snake() {
    //根据snakeBody数组创建蛇身
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        //获取数组的x和y坐标
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        //设置蛇头和蛇身的图片，添加的类不一样.
        snake.classList.add(this.snakeBody[i][2]);
        //插入到运动区域中
        this.mapDiv.appendChild(snake).classList.add('snake');  
        //判断蛇头的方向
        switch (this.direct) {
            case 'right':
                break;
            case 'up':
            snake.style.transform =  'rotate(270deg)';
                break;
            case 'left':
            snake.style.transform =  'rotate(180deg)';
                break;
            case 'down':
            snake.style.transform =  'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}

//蛇运动
function move() {
    for (var i = this.snakeBody.length - 1;i > 0; i--) {
        //x和y都等于上一位的
        this.snakeBody[i][0] =   this.snakeBody[i-1][0];
        this.snakeBody[i][1] =   this.snakeBody[i-1][1];
    }
    //判断往哪个方向运动,改变蛇头就行
    switch (this.direct) {
        case 'right':
        this.snakeBody[0][0] += 1;
            break;
        case 'up':
        this.snakeBody[0][1] -= 1;
            break;
        case 'left':
        this.snakeBody[0][0] -= 1;
            break;
        case 'down':
        this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    //删除原来的蛇在生成新的snake是蛇头和蛇身共同的calss名
    removeClass('snake');
    snake();
    //判断蛇头与食物的坐标是不是一样的,吃到食物
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        //定义在蛇的尾部添加一个body
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        //根据运动的方向添加身体 
        switch (this.direct) {
            case 'right':
            this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
                break;
            case 'up':
            this.snakeBody.push([snakeEndX,snakeEndY -1,'body']);
                break;
            case 'left':
            this.snakeBody.push([snakeEndX -1,snakeEndY,'body']);
                break;
            case 'down':
            this.snakeBody.push([snakeEndX,snakeEndY +1,'body']);
                break;
            default:
                break;
        }
        //分数加1和插入数据
        this.score += 1;
        scoreBox.innerHTML = this.score;
        //食物消失在生成食物
        removeClass('food');
        food();
    }

    //判断蛇头是否碰到边界左右
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW/20) {
        //游戏结束重新加载函数
        reloadGame();
    }
    //判断蛇头是否碰到边界上下
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH/20) {
        reloadGame();
    }
   //获取蛇头坐标和身体做比较是否碰到,i=1是从遍历身体开始
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        //如果蛇头的XY坐标和身体一样结束游戏
       if (snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]) {
        reloadGame();
       }      
    }
}

//结束游戏时重新加载
function reloadGame() {
    //清除蛇、食物、定时器
    removeClass('food');
    removeClass('snake');
    clearInterval(snakeMove);
    //////重新加载游戏
    this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
    this.direct = 'right'; 
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //失败弹框出现
    loser.style.display = 'block';
    loserScore.innerHTML = this.score;
    this.score = 0;
    //顶部的分数为0
    scoreBox.innerHTML = this.score;
    //重新加载游戏必要的属性和图标,
    startGameBool = true;
    startPaushBool = true;
    startP.setAttribute('src','image/start.png');
}

//删除蛇,知道有calss名为snake的
function removeClass(className){  
    var ele = document.getElementsByClassName(className);
    //如果className有值,就移除
    while(ele.length > 0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}

//设置蛇运动方向,判断keyCode值
function setDirect(code) {
    switch (code) {
        //if(this.left) 判断是否为true能否按下
        case 37:
        if (this.left) {           
            this.direct = 'left';
            this.left = false;
            this.right = false;
            this.up = true;
            this.down = true;
        }
            break;
        case 38:
        if (this.up) {           
            this.direct = 'up';
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
        }
            break;
        case 39:
        if (this.right) {           
            this.direct = 'right';
            this.left = false;
            this.right = false;
            this.up = true;
            this.down = true;
        }
            break;
        case 40:
        if (this.down) {           
            this.direct = 'down';
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
        }
            break;
        default:
            break;
    }
}

//改变蛇运动的方向，鼠标按下的事件
function bindEvent() {
    //点击X号弹出框消失
    close.onclick = function () {
        loser.style.display = 'none';
    }   
    //定义点击开始游戏按钮的事件,一切逻辑由它来控制
    startBtn.onclick = function () {
        //游戏一切的开始和结束
        startAndPaush();
    }
    //开始/暂停按钮的点击事件
    startP.onclick = function () {
        startAndPaush();
    }
}

//点击开始和暂停按钮时的游戏缓冲
function startAndPaush() {
    //如果没有暂停游戏的时候
    if (startPaushBool) {
        //可以开始游戏的
        if (startGameBool) {
            //调用开始游戏
            startGame();
             //所以为fasle不能再开始游戏了
            startGameBool = false;
        }
        //暂停时按钮的图片
        startP.setAttribute('src','image/pause.png');
         //键盘事件
        document.onkeydown = function (e) {
            //获取鼠标按下的码
            var code = e.keyCode;
            //传值到设置方向的函数
            setDirect(code);
        }
        //每200毫秒调用move移动函数,暂时后在点击开始再调用
        snakeMove = setInterval(function () {
            move();
        },speed);
        startPaushBool = false;
    }else{  //暂停的时候
        //替换图片
        startP.setAttribute('src','image/start.png');
        //清除定时器,不让它动
        clearInterval(snakeMove);
         //清除键盘的按值
        document.onkeydown = function (e) {
            e.returnValue = false;
            //return false，事件处理函数会取消事件，不再继续向下执行。比如表单将终止提交。
            return false;
        }
        //继续点击暂停按钮可以继续开始
        startPaushBool = true;
    }
}



