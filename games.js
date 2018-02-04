var playerTotal = 0;
var playerTotal2 = 0;
var gameStatus = 0;
var game=0;
var player;
var player2;
var points=0;
var points2=0;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementsByTagName("body")[0].innerHTML += "<embed id=\"music\" loop=\"true\" src=\"bicycleTheme.mp3\" hidden=\"true\"></embed>";
    startChanseyGame();
  }
};

  // General Functions
  document.onkeydown=function(e){
    switch (e.keyCode){
      case 37:
      player2.moveLeft();
      break;
      case 38:
      player2.moveUp();
      break;
      case 39:
      player2.moveRight();
      break;
      case 40:
      player2.moveDown();
      break;
      case 65:
      player.moveLeft();
      break;
      case 87:
      player.moveUp();
      break;
      case 68:
      player.moveRight();
      break;
      case 83:
      player.moveDown();
      break;

    }
  };

function assignClick (){
  document.getElementById("start-button").onclick = function() {
    if (gameStatus===0){
      if (game===1){
    document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("canvas")[1]);
    document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("canvas")[0]);
    document.getElementsByTagName("body")[0].innerHTML += "<embed id=\"music\" loop=\"true\" src=\"pokemonCenter.mp3\" hidden=\"true\"></embed>";
    startClefairyGame();
      }
    }
  }
}
  

  // 1. Chansey Game
  
  // 1.1 Chansey Creator
  function PlayerChansey(x, y){
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = "images/chansey.png";
    this.moveLeft = function(){
      if (this.x>1){
      this.x-=100;
      }
    };

    this.moveRight = function(){
      if (this.x<199){
        this.x+=100;
        }
    };
    this.moveUp = function(){
    };
  
    this.moveUp = function(){
    };
  }
  PlayerChansey.prototype.left = function(){
    return this.x;
  }
  
  PlayerChansey.prototype.right = function(){
    return this.x+15;
  }

  PlayerChansey.prototype.top = function(){
    return this.y;
  }

  PlayerChansey.prototype.bottom = function(){
    return this.y+50;
  }

  PlayerChansey.prototype.crashWith = function(obstacle){
    return !((this.bottom()-50 < obstacle.top())    ||
    (this.top()+75    > obstacle.bottom()) ||
    (this.right()  < obstacle.left())   ||
    (this.left()   > obstacle.right()))
  }

  // 1.2 Egg/Voltorb Creator

  var myObstacles = [];
  var myObstacles2 = [];
  var explosion = new Image;
  explosion.src="images/explosion_gif_by_tatmione-d97lofa.gif";
  var exploX = 0;
  var exploY = 0;
  var exploX2 = 0;
  var exploY2 = 0;
  var exploFrames = "Hola";

  var exploFrames2 = "Hola";

  function Obstacle(x, y){
    this.x= x;
    this.y= y;
    this.img = new Image();
    this.type = Math.floor(Math.random()*5);
    if (this.type===1){
      this.img.src="images/voltorb.png"
    }else {
      this.img.src="images/egg.png"
    };
    this.update = function(){
      myGameArea.ctx.drawImage(this.img, this.x, this.y, 100, 100);
    };
    this.update2 = function(){
      myGameArea.ctx2.drawImage(this.img, this.x, this.y, 100, 100);
    }
  }

  Obstacle.prototype.left = function(){
    return this.x;
  }
  
  Obstacle.prototype.right = function(){
    return this.x+50;
  }

  Obstacle.prototype.top = function(){
    return this.y;
  }

  Obstacle.prototype.bottom = function(){
    return this.y+100
  }

 
//1.3 Canvas Updater
  
  function updateGameArea(){
    if (points2===1 || points ===1){
      clearInterval(myGameArea.interval)
      document.getElementById("music").parentNode.removeChild(document.getElementById("music"))
      if (points>points2){
        playerTotal+=3;
        myGameArea.ctx.font = "50px serif";
        myGameArea.ctx.fillStyle = "black";
        myGameArea.ctx.fillText("Winner!", 80, 300);
        document.getElementById("one").innerHTML+=playerTotal;
        document.getElementById("two").innerHTML+=playerTotal2;
        document.getElementById("start-button").innerHTML = "Next Game";
        gameStatus=0;
        game++;
        assignClick();
        return;
      } else if (points2===points){
        playerTotal+=1;
        playerTotal2+=1;
        myGameArea.ctx.font = "50px serif";
        myGameArea.ctx.fillStyle = "black";
        myGameArea.ctx.fillText("Tie!", 120, 300);
        myGameArea.ctx2.font = "50px serif";
        myGameArea.ctx2.fillStyle = "black";
        myGameArea.ctx2.fillText("Tie!", 120, 300);
        document.getElementById("one").innerHTML+=playerTotal;
        document.getElementById("two").innerHTML+=playerTotal2;
        document.getElementById("start-button").innerHTML = "Next Game";
        gameStatus=0;
        game++;
        assignClick();
      return;
      } else {
        playerTotal2+=3;
        myGameArea.ctx2.font = "50px serif";
        myGameArea.ctx2.fillStyle = "black";
        myGameArea.ctx2.fillText("Winner!", 80, 300);
        document.getElementById("one").innerHTML+=playerTotal;
        document.getElementById("two").innerHTML+=playerTotal2;
        document.getElementById("start-button").innerHTML = "Next Game";
        gameStatus=0;
        game++;
        assignClick();
      return 
      }

    }
    exploFrames++;
    exploFrames2++;
    myGameArea.clear();
    myGameArea.drawTrack();
    myGameArea.frames ++;
    if (myGameArea.frames %30 ===0){
      side = Math.floor(Math.random()*3);
      if (side===2){
      myObstacles.push(new Obstacle(200, 0 ));
      } else if (side===1) {
      myObstacles.push(new Obstacle(100, 0 ));
      } else{
      myObstacles.push(new Obstacle(0, 0 ));
      }
      side2 = Math.floor(Math.random()*3);
      if (side2===2){
      myObstacles2.push(new Obstacle(200, 0 ));
      } else if (side2===1) {
      myObstacles2.push(new Obstacle(100, 0 ));
      } else{
      myObstacles2.push(new Obstacle(0, 0 ));
      }
    }

    for (var i = 0; i< myObstacles.length; i++){
      myObstacles[i].y +=15;
      myObstacles[i].update();
    }
    for (var j = 0; j< myObstacles2.length; j++){
      myObstacles2[j].y +=15;
      myObstacles2[j].update2();
    }
    drawPlayer();
    for (var p = 0 ; p< myObstacles.length; p++){
      if (player.crashWith(myObstacles[p])) {
        if (myObstacles[p].type===1){
          points-=5;
          exploX =  myObstacles[p].x;
          exploY = myObstacles[p].y
          exploFrames = 1
          myGameArea.ctx.drawImage(explosion, exploX, exploY, 100, 100);
        } else {
        points++;
        }
        myObstacles.splice(p, 1);
        
      }
    }

    for (var p = 0 ; p< myObstacles2.length; p++){
      if (player2.crashWith(myObstacles2[p])) {
        if (myObstacles2[p].type===1){
          points2-=5;
          exploX2 =  myObstacles2[p].x;
          exploY2 = myObstacles2[p].y
          exploFrames2 = 1
          myGameArea.ctx2.drawImage(explosion, exploX2, exploY2, 100, 100);
        } else {
        points2++;
        }
        myObstacles2.splice(p, 1);
        
      }
    }

    if (exploFrames>0){
      if (exploFrames>11){
        exploFrames="Hola";
      }
      myGameArea.ctx.drawImage(explosion, exploX, exploY, 100, 100);
    }
    if (exploFrames2>0){
      if (exploFrames2>11){
        exploFrames2="Hola";
      }
      myGameArea.ctx2.drawImage(explosion, exploX2, exploY2, 100, 100);
    }
    myGameArea.score();
  }

//1.4 Chansey Canvas Creator

  var bgChansey = new Image();
  bgChansey.src= "images/background.png";

  var myGameArea = {
    canvas : document.createElement("canvas"),
    canvas2 : document.createElement("canvas"),
    frames : 0,
    drawTrack : function(){
      
      this.ctx2.drawImage(bgChansey, 0, 0, 300, 600);
      this.ctx.drawImage(bgChansey, 0, 0, 300, 600);
    },
    start : function() {
        this.canvas.width = 300;
        this.canvas.height = 600;

        this.canvas2.width = 300;
        this.canvas2.height = 600;
        this.ctx2 = this.canvas2.getContext("2d");
        this.ctx = this.canvas.getContext("2d");

        document.body.insertBefore(this.canvas2, document.body.childNodes[1]);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        
    },
    clear : function(){
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
      this.ctx2.clearRect(0,0, this.canvas2.width, this.canvas2.height);
    }, 
    stop : function(){
      clearInterval(this.interval);
      this.clear();
    },
    score: function(){
      this.ctx.font = "18px serif";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Score: "+points, 60, 30);
      this.ctx.fillText("Player 1", 160, 30);
      this.ctx2.font = "18px serif";
      this.ctx2.fillStyle = "white";
      this.ctx2.fillText("Score: "+points2, 60, 30);
      this.ctx2.fillText("Player 2", 160, 30);
    }   
  }

  function startChanseyGame() {
    myGameArea.start();
    player = new PlayerChansey(100,500);
    player2 = new PlayerChansey(100, 500);
  }

  function drawPlayer(){
    myGameArea.ctx.drawImage(player.img, player.x, player.y, 100,100);
    myGameArea.ctx2.drawImage(player2.img, player2.x, player2.y, 100,100);
  }

// 2. Clefairy Game

// 2.1 Clefairy Creator
function PlayerClefairy(x, y){
  this.x = x;
  this.y = y;
  this.img = new Image();
  this.img.src = "images/clefairy.png";
  this.context = "";
  this.counter= 0;
  this.sequence = [];

}

  PlayerClefairy.prototype.moveLeft = function(){
    if (instruc ===1 && this.counter<sequence.length){

    this.context.beginPath();
    this.context.fillStyle = "green";
    this.context.arc(100,500,15,0,2*Math.PI);
    this.context.fill();
    this.context.stroke();
    this.counter++;
    var ctxClef = this.context;
    this.sequence.push([leftArrow,4]);
    setTimeout(function(){
      ctxClef.beginPath();
      ctxClef.fillStyle = "white";
      ctxClef.arc(100,500,15,0,2*Math.PI);
      ctxClef.fill();
      ctxClef.stroke();
    }, 500)

    }
  };

  PlayerClefairy.prototype.moveRight = function(){
    if (instruc ===1 && this.counter<sequence.length){

      this.context.beginPath();
      this.context.fillStyle = "green";
      this.context.arc(200,500,15,0,2*Math.PI);
      this.context.fill();
      this.context.stroke();
      this.counter++;
      var ctxClef = this.context;
      this.sequence.push([rightArrow,1]);
      setTimeout(function(){
        ctxClef.beginPath();
        ctxClef.fillStyle = "white";
        ctxClef.arc(200,500,15,0,2*Math.PI);
        ctxClef.fill();
        ctxClef.stroke();
      }, 500)
  
      }
  };

  PlayerClefairy.prototype.moveDown = function(){
    if (instruc ===1 && this.counter<sequence.length){

      this.context.beginPath();
      this.context.fillStyle = "green";
      this.context.arc(150,550,15,0,2*Math.PI);
      this.context.fill();
      this.context.stroke();
      this.counter++;
      var ctxClef = this.context;
      this.sequence.push([downArrow, 2]);
  
      setTimeout(function(){
        ctxClef.beginPath();
        ctxClef.fillStyle = "white";
        ctxClef.arc(150,550,15,0,2*Math.PI);
        ctxClef.fill();
        ctxClef.stroke();
      }, 500)
  
      }
  };

  PlayerClefairy.prototype.moveUp = function(){
    if (instruc ===1 && this.counter<sequence.length){

      this.context.beginPath();
      this.context.fillStyle = "green";
      this.context.arc(150,450,15,0,2*Math.PI);
      this.context.fill();
      this.context.stroke();
      this.counter++;
      var ctxClef = this.context;
      this.sequence.push([upArrow, 0]);
  
      setTimeout(function(){
        ctxClef.beginPath();
        ctxClef.fillStyle = "white";
        ctxClef.arc(150,450,15,0,2*Math.PI);
        ctxClef.fill();
        ctxClef.stroke();
      }, 500)
  
      }
  };


//2.2 Arrow Creator

var upArrow = new Image();
upArrow.src= "images/upArrow.png";
var rightArrow = new Image();
rightArrow.src= "images/rightArrow.png";
var downArrow = new Image();
downArrow.src= "images/downArrow.png";
var leftArrow = new Image();
leftArrow.src= "images/leftArrow.png";

var Arrow = function(x, y, direction){
  this.x=x;
  this.y=y;
  this.direction = direction;
  switch(direction){
    case 0:
    this.img= upArrow;
    break;
    case 1:
    this.img= rightArrow;
    break;
    case 2:
    this.img= downArrow;
    break;
    case 3:
    this.img= leftArrow;
    break;
  };
  this.update = function(){
    myClefairyArea.ctx.drawImage(this.img, this.x, this.y, 30, 30);
  };
  this.update2 = function(){
    myClefairyArea.ctx2.drawImage(this.img, this.x, this.y, 30, 30);
  }
}

//2.3 Update Clefairy Area
var counterArrows = 4;
var sequence= [];
var instruc= 0;
var wrongX = new Image();
wrongX.src = "images/wrongX.png";
var check = new Image();
check.src = "images/check.png";

function updateClefairyArea(){
  myClefairyArea.frames++;
  myClefairyArea.clear();
  myClefairyArea.drawBackground();
  myClefairyArea.drawClefairy();
  if (myClefairyArea.frames >100){
    if (myClefairyArea.frames%50===0){
      direction = Math.floor(Math.random()*4);
      sequence.push(new Arrow(0, 170, direction));
    }
  }
  for (var j = 0; j< sequence.length; j++){
    sequence[j].x=30*j+30
    sequence[j].update();
    sequence[j].update2();
  }

  if (sequence.length===counterArrows){

    clearInterval(myClefairyArea.interval);
    myClefairyArea.ctx.font="50px sarif";
    myClefairyArea.ctx2.font="50px sarif";
    myClefairyArea.ctx.fillText("Memorize it!", 20, 100);
    myClefairyArea.ctx2.fillText("Memorize it!", 20, 100);

    setTimeout(function(){
      myClefairyArea.clear();
      myClefairyArea.drawBackground();
      myClefairyArea.drawClefairy();
      myClefairyArea.ctx.fillText("Repeat it!", 50, 100);
      myClefairyArea.ctx2.fillText("Repeat it!", 50, 100);
      drawCircles();
      instruc=1;
      setTimeout(function(){
        instruc=0;
        for (var j = 0; j< sequence.length; j++){
          sequence[j].x=30*j+30;
          sequence[j].update();
          sequence[j].update2();
          if(j<player.sequence.length){
            myClefairyArea.ctx.drawImage(player.sequence[j][0], 30*j+30, 205, 30, 30);
          }
          if(j<player2.sequence.length){
            myClefairyArea.ctx2.drawImage(player2.sequence[j][0], 30*j+30, 205, 30, 30);
          }
          if (j>=player.sequence.length || player.sequence[j][1]!=sequence[j].direction){
            myClefairyArea.ctx.drawImage(wrongX, 30*j+30, 240, 30, 30);
          } else{
            myClefairyArea.ctx.drawImage(check, 30*j+30, 240, 30, 30);
          };
          if (j>=player2.sequence.length || player2.sequence[j][1]!=sequence[j].direction){
            myClefairyArea.ctx2.drawImage(wrongX, 30*j+30, 240, 30, 30);
          } else{
            myClefairyArea.ctx2.drawImage(check, 30*j+30, 240, 30, 30);
          };
        }
      }, 5000)
    }, 3000)

  }
}

function drawCircles(){
  myClefairyArea.ctx.beginPath();
  myClefairyArea.ctx.fillStyle = "white";
  myClefairyArea.ctx.strokeStyle = "black";
  myClefairyArea.ctx.arc(100,500,15,0,2*Math.PI);
  myClefairyArea.ctx.fill();
  myClefairyArea.ctx.stroke();
  myClefairyArea.ctx.beginPath();
  myClefairyArea.ctx.fillStyle = "white";
  myClefairyArea.ctx.strokeStyle = "black";
  myClefairyArea.ctx.arc(200,500,15,0,2*Math.PI);
  myClefairyArea.ctx.fill();
  myClefairyArea.ctx.stroke();
  myClefairyArea.ctx.beginPath();
  myClefairyArea.ctx.fillStyle = "white";
  myClefairyArea.ctx.strokeStyle = "black";
  myClefairyArea.ctx.arc(150,550,15,0,2*Math.PI);
  myClefairyArea.ctx.fill();
  myClefairyArea.ctx.stroke();
  myClefairyArea.ctx.beginPath();
  myClefairyArea.ctx.fillStyle = "white";
  myClefairyArea.ctx.strokeStyle = "black";
  myClefairyArea.ctx.arc(150,450,15,0,2*Math.PI);
  myClefairyArea.ctx.fill();
  myClefairyArea.ctx.stroke();

  myClefairyArea.ctx2.beginPath();
  myClefairyArea.ctx2.fillStyle = "white";
  myClefairyArea.ctx2.strokeStyle = "black";
  myClefairyArea.ctx2.arc(100,500,15,0,2*Math.PI);
  myClefairyArea.ctx2.fill();
  myClefairyArea.ctx2.stroke();
  myClefairyArea.ctx2.beginPath();
  myClefairyArea.ctx2.fillStyle = "white";
  myClefairyArea.ctx2.strokeStyle = "black";
  myClefairyArea.ctx2.arc(200,500,15,0,2*Math.PI);
  myClefairyArea.ctx2.fill();
  myClefairyArea.ctx2.stroke();
  myClefairyArea.ctx2.beginPath();
  myClefairyArea.ctx2.fillStyle = "white";
  myClefairyArea.ctx2.strokeStyle = "black";
  myClefairyArea.ctx2.arc(150,550,15,0,2*Math.PI);
  myClefairyArea.ctx2.fill();
  myClefairyArea.ctx2.stroke();
  myClefairyArea.ctx2.beginPath();
  myClefairyArea.ctx2.fillStyle = "white";
  myClefairyArea.ctx2.strokeStyle = "black";
  myClefairyArea.ctx2.arc(150,450,15,0,2*Math.PI);
  myClefairyArea.ctx2.fill();
  myClefairyArea.ctx2.stroke();
}

// 2.4 Clefairy Canvas Creator

var bgClefairy = new Image();
bgClefairy.src= "images/clefairyBackground.png";

var myClefairyArea = {
  canvas : document.createElement("canvas"),
  canvas2 : document.createElement("canvas"),
  frames : 1,
  drawBackground : function(){
    
    this.ctx2.drawImage(bgClefairy, -450, 0, 1200, 600);
    this.ctx.drawImage(bgClefairy, -450, 0, 1200, 600);
  },
  start : function() {
      this.canvas.width = 300;
      this.canvas.height = 600;

      this.canvas2.width = 300;
      this.canvas2.height = 600;
      this.ctx2 = this.canvas2.getContext("2d");
      this.ctx = this.canvas.getContext("2d");

      document.body.insertBefore(this.canvas2, document.body.childNodes[1]);
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);

      this.interval = setInterval(updateClefairyArea, 20);
  },
  clear : function(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.ctx2.clearRect(0,0, this.canvas2.width, this.canvas2.height);
  },
  
  drawClefairy(){
    this.ctx.drawImage(player.img, player.x, player.y, 100,100);
    this.ctx2.drawImage(player2.img, player2.x, player2.y, 100,100);
  },
}

function startClefairyGame() {
  gameStatus=1;
  myClefairyArea.start();
  player = new PlayerClefairy(100,450);
  player.context = myClefairyArea.ctx;
  player2 = new PlayerClefairy(100, 450);
  player2.context = myClefairyArea.ctx2;
}







