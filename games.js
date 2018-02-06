var playerTotal = 0;
var playerTotal2 = 0;
var gameStatus = 0;
var game=0;
var player;
var player2;
var points=0;
var points2=0;
var trophy = new Image;
trophy.src = "images/Trophy.png"

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementsByTagName("body")[0].innerHTML += "<embed id=\"music\" loop=\"true\" src=\"bicycleTheme.mp3\" hidden=\"true\"></embed>";
    startChanseyGame();
  }
};

  // General Functions

var fired = false;
var fired2 = false;

  document.onkeydown=function(e){
    if(!fired && e.keyCode>=37 && e.keyCode<=40) {
    fired = true;
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

      }
    } 
    
    if (!fired2 && (e.keyCode===65 || e.keyCode===87 || e.keyCode===68 || e.keyCode===83)){
      fired2 =true;
      switch(e.keyCode){
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
    }
    
  };

  
  document.onkeyup = function() {
    if (fired){

      fired = false;
    }
    if (fired2){

      fired2 = false;
    }
};

  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function assignClick (){
  document.getElementById("start-button").onclick = function() {
    if (gameStatus===0){
      if (game===1){
        document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("canvas")[1]);
        document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("canvas")[0]);
        document.getElementsByTagName("body")[0].innerHTML += "<embed id=\"music\" loop=\"true\" src=\"pokemonCenter.mp3\" hidden=\"true\"></embed>";
        startClefairyGame();
      } else if (game===2){
        document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("canvas")[1]);
        document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("canvas")[0]);
        startGolbatGame();
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
  
    this.moveDown = function(){
    };
  }
  PlayerChansey.prototype.left = function(){
    return this.x;
  }
  
  PlayerChansey.prototype.right = function(){
    return this.x+50;
  }

  PlayerChansey.prototype.top = function(){
    return this.y;
  }

  PlayerChansey.prototype.bottom = function(){
    return this.y+50;
  }

  PlayerChansey.prototype.crashWith = function(obstacle){
    return !((this.bottom() < obstacle.top())    ||
    (this.top()    > obstacle.bottom()) ||
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

  function Obstacle(x, y, type){
    this.x= x;
    this.y= y;
    this.img = new Image();
    this.type = type
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
    return this.y+50
  }

 
//1.3 Update Chansey Area
  
  function updateGameArea(){
    if (points2===1 || points ===1){
      clearInterval(myGameArea.interval)
      document.getElementById("music").parentNode.removeChild(document.getElementById("music"))
      if (points>points2){
        playerTotal+=3;
        myGameArea.ctx.font = "50px serif";
        myGameArea.ctx.fillStyle = "black";
        myGameArea.ctx.drawImage(trophy, 50, 100, 200, 200);
        myGameArea.ctx.fillText("Winner!", 65, 350);
        document.getElementById("one").innerHTML="Player 1: " +playerTotal;
        document.getElementById("two").innerHTML="Player 2: " +playerTotal2;
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
        document.getElementById("one").innerHTML="Player 1: " +playerTotal;
        document.getElementById("two").innerHTML="Player 2: " +playerTotal2;
        document.getElementById("start-button").innerHTML = "Next Game";
        gameStatus=0;
        game++;
        assignClick();
      return;
      } else {
        playerTotal2+=3;
        myGameArea.ctx2.font = "50px serif";
        myGameArea.ctx2.fillStyle = "black";
        myGameArea.ctx2.drawImage(trophy, 50, 100, 200, 200);
        myGameArea.ctx2.fillText("Winner!", 65, 350);
        document.getElementById("one").innerHTML="Player 1: " +playerTotal;
        document.getElementById("two").innerHTML="Player 2: " +playerTotal2;
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
      type = Math.floor(Math.random()*5);
      if (side===2){
      myObstacles.push(new Obstacle(200, 0, type ));
      } else if (side===1) {
      myObstacles.push(new Obstacle(100, 0, type ));
      } else{
      myObstacles.push(new Obstacle(0, 0, type ));
      }
      if (side===2){
      myObstacles2.push(new Obstacle(200, 0, type ));
      } else if (side===1) {
      myObstacles2.push(new Obstacle(100, 0, type ));
      } else{
      myObstacles2.push(new Obstacle(0, 0, type ));
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
    player = new PlayerChansey(100, 500);
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
    this.context.arc(30+30*this.counter,450,15,0,2*Math.PI);
    this.context.fill();
    this.context.stroke();
    this.counter++;
    var ctxClef = this.context;
    this.sequence.push([leftArrow,3]);
    }
  };

  PlayerClefairy.prototype.moveRight = function(){
    if (instruc ===1 && this.counter<sequence.length){

      this.context.beginPath();
      this.context.fillStyle = "green";
      this.context.arc(30+30*this.counter,450,15,0,2*Math.PI);
      this.context.fill();
      this.context.stroke();
      this.counter++;
      var ctxClef = this.context;
      this.sequence.push([rightArrow,1]);
  
      }
  };

  PlayerClefairy.prototype.moveDown = function(){
    if (instruc ===1 && this.counter<sequence.length){

      this.context.beginPath();
      this.context.fillStyle = "green";
      this.context.arc(30+30*this.counter,450,15,0,2*Math.PI);
      this.context.fill();
      this.context.stroke();
      this.counter++;
      var ctxClef = this.context;
      this.sequence.push([downArrow, 2]);
  
  
      }
  };

  PlayerClefairy.prototype.moveUp = function(){
    if (instruc ===1 && this.counter<sequence.length){

      this.context.beginPath();
      this.context.fillStyle = "green";
      this.context.arc(30+30*this.counter,450,15,0,2*Math.PI);
      this.context.fill();
      this.context.stroke();
      this.counter++;
      var ctxClef = this.context;
      this.sequence.push([upArrow, 0]);
  
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
var counterCorrect = 0;
var beep = new Audio('beep.mp3');
var wrongBuzzer = new Audio('wrong.mp3');

function updateClefairyArea(){
  myClefairyArea.frames++;
  myClefairyArea.clear();
  myClefairyArea.drawBackground();
  myClefairyArea.drawClefairy();
  myClefairyArea.score();
  if (myClefairyArea.frames >100){
    if (myClefairyArea.frames%50===0){
      direction = Math.floor(Math.random()*4);
      sequence.push(new Arrow(0, 170, direction));
      beep.play();
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
      myClefairyArea.score();
      myClefairyArea.ctx.fillText("Repeat it!", 50, 100);
      myClefairyArea.ctx2.fillText("Repeat it!", 50, 100);
      drawCircles();
      instruc=1;
      setTimeout(function(){
        instruc=0;
        checking = setInterval(function(){
          myClefairyArea.clear();
          myClefairyArea.drawBackground();
          myClefairyArea.score();
          sequence[counterCorrect].x=30*counterCorrect+30;
          sequence[counterCorrect].update();
          sequence[counterCorrect].update2();
          if(counterCorrect<player.sequence.length){
            myClefairyArea.ctx.drawImage(player.sequence[counterCorrect][0], 30*counterCorrect+30, 205, 30, 30);
          }
          if(counterCorrect<player2.sequence.length){
            myClefairyArea.ctx2.drawImage(player2.sequence[counterCorrect][0], 30*counterCorrect+30, 205, 30, 30);
          }
          if (counterCorrect>=player.sequence.length || player.sequence[counterCorrect][1]!=sequence[counterCorrect].direction){
            myClefairyArea.ctx.drawImage(wrongX, 30*counterCorrect+30, 240, 30, 30);
            wrongBuzzer.play();
            points--;
            myClefairyArea.score();
            if (counterCorrect<player.sequence.length){
              switch (player.sequence[counterCorrect][1]){
                case 0:
                myClefairyArea.ctx.drawImage(player.img, player.x, player.y-40, 50,50);
                break;
                case 1:
                myClefairyArea.ctx.drawImage(player.img, player.x+40, player.y, 50,50);
                break;
                case 2:
                myClefairyArea.ctx.drawImage(player.img, player.x, player.y+40, 50,50);
                break;
                case 3:
                myClefairyArea.ctx.drawImage(player.img, player.x-40, player.y,  50,50);
                break;
              }
            } else{
              myClefairyArea.ctx.drawImage(player.img, player.x, player.y, 50,50);
            }
          } else{
            switch (player.sequence[counterCorrect][1]){
            case 0:
            myClefairyArea.ctx.drawImage(player.img, player.x, player.y-40, 50,50);
            break;
            case 1:
            myClefairyArea.ctx.drawImage(player.img, player.x+40, player.y, 50,50);
            break;
            case 2:
            myClefairyArea.ctx.drawImage(player.img, player.x, player.y+40,  50,50);
            break;
            case 3:
            myClefairyArea.ctx.drawImage(player.img, player.x-40, player.y,  50,50);
            break;
          }
            myClefairyArea.ctx.drawImage(check, 30*counterCorrect+30, 240, 30, 30);
          };
          if (counterCorrect>=player2.sequence.length || player2.sequence[counterCorrect][1]!=sequence[counterCorrect].direction){
            myClefairyArea.ctx2.drawImage(wrongX, 30*counterCorrect+30, 240, 30, 30);
            wrongBuzzer.play();
            points2--;
            myClefairyArea.score();
            if (counterCorrect<player2.sequence.length){
              switch (player2.sequence[counterCorrect][1]){
                case 0:
                myClefairyArea.ctx2.drawImage(player2.img, player2.x, player2.y-40,  50,50);
                break;
                case 1:
                myClefairyArea.ctx2.drawImage(player2.img, player2.x+40, player2.y,  50,50);
                break;
                case 2:
                myClefairyArea.ctx2.drawImage(player2.img, player2.x, player2.y+40,  50,50);
                break;
                case 3:
                myClefairyArea.ctx2.drawImage(player2.img, player2.x-40, player2.y,  50,50);
                break;
              }
            } else{
              myClefairyArea.ctx2.drawImage(player2.img, player2.x, player2.y, 50,50);
            }
          } else{
            myClefairyArea.ctx2.drawImage(check, 30*counterCorrect+30, 240, 30, 30);
            switch (player2.sequence[counterCorrect][1]){
              case 0:
              myClefairyArea.ctx2.drawImage(player2.img, player2.x, player2.y-40, 50,50);
              break;
              case 1:
              myClefairyArea.ctx2.drawImage(player2.img, player2.x+40, player2.y, 50,50);
              break;
              case 2:
              myClefairyArea.ctx2.drawImage(player2.img, player2.x, player2.y+40, 50,50);
              break;
              case 3:
              myClefairyArea.ctx2.drawImage(player2.img, player2.x-40, player2.y, 50,50);
              break;
            }
          };
          counterCorrect++;
          if (counterCorrect>=counterArrows){
            clearInterval(checking);
            
            setTimeout(function(){
              if (points2<=0 || points <=0){
                myClefairyArea.stop();
                return;
              }
              counterArrows++;
              sequence=[];
              player.sequence=[];
              player2.sequence=[];
              player.counter=0;
              player2.counter=0;
              counterCorrect=0;
              myClefairyArea.clear();
              myClefairyArea.restart();
              return;
            }, 1000)
          }
        }, 2500)
      }, 1500*counterArrows)
    }, 3000)

  }
}

function drawCircles(){

  for (var i=0; i< sequence.length ; i++){
    myClefairyArea.ctx.beginPath();
    myClefairyArea.ctx.fillStyle = "white";
    myClefairyArea.ctx.strokeStyle = "black";
    myClefairyArea.ctx.arc(30+i*30,450,15,0,2*Math.PI);
    myClefairyArea.ctx.fill();
    myClefairyArea.ctx.stroke();
    myClefairyArea.ctx2.beginPath();
    myClefairyArea.ctx2.fillStyle = "white";
    myClefairyArea.ctx2.strokeStyle = "black";
    myClefairyArea.ctx2.arc(30+i*30,450,15,0,2*Math.PI);
    myClefairyArea.ctx2.fill();
    myClefairyArea.ctx2.stroke();
  }

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
      points = 1;
      points2 = 1;
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
  restart: function(){
    this.interval = setInterval(updateClefairyArea, 20);
  },
  clear : function(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.ctx2.clearRect(0,0, this.canvas2.width, this.canvas2.height);
  },
  
  drawClefairy(){
    this.ctx.drawImage(player.img, player.x, player.y, 50,50);
    this.ctx2.drawImage(player2.img, player2.x, player2.y, 50,50);
  },
  score(){
    this.ctx.fillStyle = "grey";
    this.ctx.strokeStyle = "black"
    this.ctx2.fillStyle = "grey";
    this.ctx2.strokeStyle = "black"
    for (var h=1; h<9; h++){    
      this.ctx.beginPath();
      this.ctx.moveTo(15+30*h, 570);
      this.ctx.bezierCurveTo(15+30*h, 569, 12+30*h, 565, 10+30*h, 565);
      this.ctx.bezierCurveTo(1+30*h, 565, 1+30*h, 577, 1+30*h, 577);
      this.ctx.bezierCurveTo(1+30*h, 583, 8+30*h, 591, 15+30*h, 597);
      this.ctx.bezierCurveTo(22+30*h, 591, 29+30*h, 583, 29+30*h, 577);
      this.ctx.bezierCurveTo(29+30*h, 577, 29+30*h, 565, 20+30*h, 565);
      this.ctx.bezierCurveTo(18+30*h, 565, 15+30*h, 569, 15+30*h, 570);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx2.beginPath();
      this.ctx2.moveTo(15+30*h, 570);
      this.ctx2.bezierCurveTo(15+30*h, 569, 12+30*h, 565, 10+30*h, 565);
      this.ctx2.bezierCurveTo(1+30*h, 565, 1+30*h, 577, 1+30*h, 577);
      this.ctx2.bezierCurveTo(1+30*h, 583, 8+30*h, 591, 15+30*h, 597);
      this.ctx2.bezierCurveTo(22+30*h, 591, 29+30*h, 583, 29+30*h, 577);
      this.ctx2.bezierCurveTo(29+30*h, 577, 29+30*h, 565, 20+30*h, 565);
      this.ctx2.bezierCurveTo(18+30*h, 565, 15+30*h, 569, 15+30*h, 570);
      this.ctx2.stroke();
      this.ctx2.fill();
    }
    this.ctx.fillStyle = "red";
    this.ctx2.fillStyle = "red";
    for (var h=1; h<=points; h++){    
      this.ctx.beginPath();
      this.ctx.moveTo(15+30*h, 570);
      this.ctx.bezierCurveTo(15+30*h, 569, 12+30*h, 565, 10+30*h, 565);
      this.ctx.bezierCurveTo(1+30*h, 565, 1+30*h, 577, 1+30*h, 577);
      this.ctx.bezierCurveTo(1+30*h, 583, 8+30*h, 591, 15+30*h, 597);
      this.ctx.bezierCurveTo(22+30*h, 591, 29+30*h, 583, 29+30*h, 577);
      this.ctx.bezierCurveTo(29+30*h, 577, 29+30*h, 565, 20+30*h, 565);
      this.ctx.bezierCurveTo(18+30*h, 565, 15+30*h, 569, 15+30*h, 570);
      this.ctx.stroke();
      this.ctx.fill();
    }
    for (var h=1; h<=points2; h++){    
      this.ctx2.beginPath();
      this.ctx2.moveTo(15+30*h, 570);
      this.ctx2.bezierCurveTo(15+30*h, 569, 12+30*h, 565, 10+30*h, 565);
      this.ctx2.bezierCurveTo(1+30*h, 565, 1+30*h, 577, 1+30*h, 577);
      this.ctx2.bezierCurveTo(1+30*h, 583, 8+30*h, 591, 15+30*h, 597);
      this.ctx2.bezierCurveTo(22+30*h, 591, 29+30*h, 583, 29+30*h, 577);
      this.ctx2.bezierCurveTo(29+30*h, 577, 29+30*h, 565, 20+30*h, 565);
      this.ctx2.bezierCurveTo(18+30*h, 565, 15+30*h, 569, 15+30*h, 570);
      this.ctx2.stroke();
      this.ctx2.fill();
    }
  },
  stop : function(){
    document.getElementById("music").parentNode.removeChild(document.getElementById("music"))
    this.clear();
    this.drawBackground();
    this.drawClefairy();
    this.ctx.fillStyle="Black"
    this.ctx2.fillStyle="Black"
    if (points>points2){
      this.ctx.font = "50px";
      myClefairyArea.ctx.drawImage(trophy, 50, 100, 200, 200);
      this.ctx.fillText("Winner!", 65, 350)
      playerTotal+=3;
    } else if (points2>points){
      this.ctx2.font = "50px";
      myClefairyArea.ctx2.drawImage(trophy, 50, 100, 200, 200);
      this.ctx2.fillText("Winner!", 65, 350)
      playerTotal2+=3;
    } else {
      this.ctx2.font = "50px";
      this.ctx2.fillText("Tie", 100, 300)
      playerTotal2++;
      this.ctx.font = "50px";
      this.ctx.fillText("Tie", 100, 300)
      playerTotal++;
    }
    document.getElementById("one").innerHTML="Player 1: " +playerTotal;
    document.getElementById("two").innerHTML="Player 2: " +playerTotal2;
    gameStatus=0;
    game=2;
    assignClick();
  }
}

function startClefairyGame() {
  gameStatus=1;
  myClefairyArea.start();
  player = new PlayerClefairy(115,475);
  player.context = myClefairyArea.ctx;
  player2 = new PlayerClefairy(115, 475);
  player2.context = myClefairyArea.ctx2;
}

// 3. Golbat Game

// 3.1 Golbat Creator

var golbatImg = new Image();
golbatImg.src = "images/golbat.png";

var golbatImg2 = new Image();
golbatImg2.src = "images/golbat2.png";

function PlayerGolbat(x, y){
  this.x = x;
    this.y = y;
    this.moveLeft = function(){
      this.x-=30;
    };
    this.moveRight = function(){
      this.x+=30;
    };
    this.moveUp = function(){
      this.y-=30;
    };
    this.moveDown = function(){
      this.y+=30;
    };
}

PlayerGolbat.prototype.left = function(){
  return this.x;
}

PlayerGolbat.prototype.right = function(){
  return this.x+100;
}

PlayerGolbat.prototype.top = function(){
  return this.y;
}

PlayerGolbat.prototype.bottom = function(){
  return this.y+35;
}

PlayerGolbat.prototype.crashWith = function(obstacle){
  return !((this.bottom() < obstacle.top())    ||
  (this.top()    > obstacle.bottom()) ||
  (this.right()  < obstacle.left())   ||
  (this.left()   > obstacle.right()))
}

// 3.2 Heart Creator

 var heart = new Image();
 heart.src = "images/hearts.png"

 var magnemite = new Image();
 magnemite.src = "images/magnemite.png"

function Heart(x, y, type){
  this.x = x;
  this.y = y;
  this.img = heart;
  this.type = type;
  this.update = function(){
    myGolbatArea.ctx.drawImage(this.img, this.x, this.y, 30, 30);
  }
}

Heart.prototype.left = function(){
  return this.x;
}

Heart.prototype.right = function(){
  return this.x+30;
}

Heart.prototype.top = function(){
  return this.y;
}

Heart.prototype.bottom = function(){
  return this.y+30;
}

function Magnemite(x,y,type){
  this.x = x;
  this.y = y;
  this.img = magnemite;
  this.type = type;
  this.update = function(){
    myGolbatArea.ctx.drawImage(this.img, this.x, this.y, 30, 30);
  }
}

Magnemite.prototype.left = function(){
  return this.x;
}

Magnemite.prototype.right = function(){
  return this.x+30;
}

Magnemite.prototype.top = function(){
  return this.y;
}

Magnemite.prototype.bottom = function(){
  return this.y+30;
}

// 3.3 Update Golbat Area

var xBg=0;
var myItems = []
var electrify = new Image();
electrify.src = "images/electrify.png"

var magneFrames = "Hola";

var magneFrames2 = "Hola";

function updateGolbatArea(){
  myGolbatArea.frames++;
  xBg++;
  if (xBg>900){
    xBg=0;
  }
  myGolbatArea.drawBackground();
  myGolbatArea.score();
  myGolbatArea.drawPlayer();
  if (myGolbatArea.frames %30 ===0){
    side = Math.floor(Math.random()*3);
    type = Math.floor(Math.random()*5);
    if (type===0){
      if (side===2){
        myItems.push(new Magnemite(0, 500, type));
        } else if (side===1) {
        myItems.push(new Magnemite(0, 300, type));
        } else{
        myItems.push(new Magnemite(0, 100, type));
        }
    } else{
      if (side===2){
        myItems.push(new Heart(0, 500, type));
        } else if (side===1) {
        myItems.push(new Heart(0, 300, type));
        } else{
        myItems.push(new Heart(0, 100, type));
        }
    }
  }
  for (var i = 0; i< myItems.length; i++){
    myItems[i].x +=5;
    if (myGolbatArea.frames%5===0){
      dirItem = Math.floor(Math.random()*2)
      if (dirItem===0){
        myItems[i].y +=15;
      } else{
        myItems[i].y -=15;
      }
    }
    myItems[i].update();
  }

  for (var p = 0 ; p< myItems.length; p++){
    if (player.crashWith(myItems[p])) {
      if (myItems[p].type===0){
        
        magneFrames = 1
        myGolbatArea.ctx.drawImage(electrify, player.x, player.y-35, 100, 100);
        if (points>=5){
          points-=5;
          myItems.push(new Heart(player.x+150, player.y, 1));
          myItems.push(new Heart(player.x+150, player.y+50, 1));
          myItems.push(new Heart(player.x+150, player.y+100, 1));
          myItems.push(new Heart(player.x+150, player.y-50, 1));
          myItems.push(new Heart(player.x+150, player.y-100, 1));
        } else if (points>0){
          points-=5;
          for (var i=0 ; i<points; i++){
          myItems.push(new Heart(player.x+150, player.y-50+i*50, 1)); 
        }
        console.log(myItems.length)
        }
      } else {
      points++;
      }
      myItems.splice(p, 1);
      
    }
  }

  for (var p = 0 ; p< myItems.length; p++){
    if (player2.crashWith(myItems[p])) {
      if (myItems[p].type===0){
        magneFrames2 = 1
        myGolbatArea.ctx.drawImage(electrify, player2.x, player2.y-35, 100, 100);
        if (points2>=5){
          points2-=5;
          myItems.push(new Heart(player2.x+150, player2.y, 1));
          myItems.push(new Heart(player2.x+150, player2.y+50, 1));
          myItems.push(new Heart(player2.x+150, player2.y+100, 1));
          myItems.push(new Heart(player2.x+150, player2.y-50, 1));
          myItems.push(new Heart(player2.x+150, player2.y-100, 1));
        } else if (points2>0){
          points2-=5;
          for (var i=0 ; i<points2; i++){
          myItems.push(new Heart(player2.x+150, player2.y-50+i*50, 1)); 
        }
        
        console.log(myItems.length)
        }
      } else {
      points2++;
      }
      myItems.splice(p, 1);
      
    }
  }
  if (magneFrames>0){
    if (magneFrames>11){
      magneFrames="Hola";
    }
    myGolbatArea.ctx.drawImage(electrify, player.x, player.y-35, 100, 100);
  }
  if (magneFrames2>0){
    if (magneFrames2>11){
      magneFrames2="Hola";
    }
    myGolbatArea.ctx.drawImage(electrify, player2.x, player2.y-35, 100, 100);
  }
  
  magneFrames++;
  magneFrames2++;
}

// 3.4 Golbat Canvas Creator

var backgroundCave = new Image;
backgroundCave.src="images/caveBackground.png"

var myGolbatArea = {
  canvas : document.createElement("canvas"),
  frames : 1,
  drawBackground : function(){
    this.ctx.drawImage(backgroundCave, xBg, 0, 900, 600);
    this.ctx.drawImage(backgroundCave, xBg-900, 0, 900, 600);
  },
  drawPlayer: function(){
    this.ctx.drawImage(player.img, player.x, player.y, 100, 35);

    this.ctx.drawImage(player2.img, player2.x, player2.y, 100, 35);
  },
  start : function() {
      points = 0;
      points2 = 0;
      this.canvas.width = 900;
      this.canvas.height = 600;

      this.ctx = this.canvas.getContext("2d");

      document.body.insertBefore(this.canvas, document.body.childNodes[0]);

      this.interval = setInterval(updateGolbatArea, 20);
  },
  score : function(){
    this.ctx.font = "18px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: "+points, 160, 30);
    this.ctx.fillText("Player 1", 60, 30);
    this.ctx.fillText("Score: "+points2, 460, 30);
    this.ctx.fillText("Player 2", 360, 30);
    if (points >=10 || points2>=10){
      clearInterval(this.interval);
      if (points>points2){
        playerTotal+=3;
        this.ctx.font = "50px serif";
        this.ctx.fillStyle = "black";
        this.ctx.drawImage(trophy, 350, 200, 200, 200);
        this.ctx.fillText("Player 1 Wins", 310, 500);
        document.getElementById("one").innerHTML="Player 1: " +playerTotal;
        document.getElementById("two").innerHTML="Player 2: " +playerTotal2;
      } else if (points2>points){
        this.ctx.font = "50px serif";
        this.ctx.fillStyle = "black";
        this.ctx.drawImage(trophy, 350, 200, 200, 200);
        this.ctx.fillText("Player 2 Wins", 310, 500);
        playerTotal2+=3;
        document.getElementById("one").innerHTML="Player 1: " +playerTotal;
        document.getElementById("two").innerHTML="Player 2: " +playerTotal2;
      } else{
        this.ctx.font = "50px serif";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Nobody wins!", 310, 500);
        playerTotal+=1;
        playerTotal2+=1;
        document.getElementById("one").innerHTML="Player 1: " +playerTotal;
        document.getElementById("two").innerHTML="Player 2: " +playerTotal2;
      }
    }
  }
}

function startGolbatGame() {
  gameStatus=1;
  myGolbatArea.start();
  player = new PlayerGolbat(800,150);
  player.img = golbatImg;
  player2 = new PlayerGolbat(800, 300);
  player2.img = golbatImg2;
  myGolbatArea.drawBackground();
  myGolbatArea.drawPlayer();
}








