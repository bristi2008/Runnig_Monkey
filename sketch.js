var PLAY=1;
var END=0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var gameState = PLAY;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}




function setup() {
createCanvas(600,600);
  monkey = createSprite(50,445,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
  ground = createSprite(200,500,600,20);
  ground.x=ground.width/2;
  ground.velocityX=-6;
  
  obstaclesGroup = createGroup();
}


function draw() {
  background("white");
  
  if (gameState===PLAY) {
    
    if(ground.x<0) {
    ground.x=ground.width/2;
  }
    
    bananas();
  obstacles();
    
    if (keyDown("space")) {
    monkey.velocityY=-20;
      
  }
    
    monkey.velocityY=monkey.velocityY+0.8;
   
   if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      
    }
    
  survivalTime=Math.round(frameCount/frameRate());
  textSize(20)
  fill("black");
  text("Survival Time:"+survivalTime,200,50);
  
    
    
  }else if (gameState===END){
    
    ground.velocityX=0;
    obstacle.velocityX=0;
    banana.velocityX=0;
    textSize(15);
    text("Press r to restart",195,230);
    textSize(20);
    fill("black");
    text("Game Over",200,200);
    
    if(keyDown("r")) {
      reset();
    }
  }
    
  

  
  
  monkey.collide(ground);
  
  
  
  
  
  

  drawSprites();
}

function bananas() {
  
  if (frameCount%80===0) {
    banana = createSprite(598,Math.round(random(120,200)),20,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX=-5;
    banana.scale=0.15;
    banana.lifetime=200;
    
  }
}

function obstacles() {
  
  if (frameCount%300===0) {
    obstacle = createSprite(598,435,20,20);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.3;
    obstacle.lifetime=200;
    obstaclesGroup.add(obstacle);
    
      
  }
  }

function reset() {
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  banana.destroy();
  survivalTime = 0;
}