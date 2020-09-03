var gameState = "play";
var monkey , monkey_running, monkey_end;
var ground1, ground1Image, ground2, ground2Image, invisGround;
var banana ,bananaImage, obstacle, obstacleImage
var fruitGroup, obstacleGroup
var score, survival_time;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_end = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  ground1Image = loadImage("pixil-frame-0.png");
  
  ground2Image = loadImage("pixil-frame-0.png");
  
}

function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(80,220,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("end", monkey_end);
  monkey.scale = .1;
  
  ground1 = createSprite(300,290,600,20);
  ground1.addImage(ground1Image);
  ground1.scale = 1;
  
  ground2 = createSprite(900,290,600,20);
  ground2.addImage(ground2Image);
  ground2.scale =1;
  
  invisGround = createSprite(300,286,600,20);
  
  fruitGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  time_survived = 0;
  
}

function draw() {
  World.frameRate = 200;
  
  background("lightgray");
  
  invisGround.visible = false;
  
  monkey.collide(invisGround);
  
  monkey.depth = 5;
  monkey.velocityY = 2;
  
  fill("black");
  text("Score: " + score, 500,30);
  text("Time Survived: " + time_survived,300,30);
       
  if(gameState === "play"){
  ground1.velocityX = -6;
  ground2.velocityX = -6;

  if(ground1.x === -300){
    ground1.x = 900;
  }
  if(ground2.x === -300){
    ground2.x = 900;
  }
  
  if(keyWentDown("space")&& monkey.y >= 218){
    monkey.y = monkey.y - 100;
     }
    if(monkey.isTouching(fruitGroup)){
   fruitGroup.destroyEach();
      score = score + 1;
  }
     if(frameCount % 30 === 0){
    time_survived = time_survived + 1;
  }
  createObstacle();
  createBanana();
  }else if(gameState === "end"){
  fruitGroup.destroyEach();
  obstacleGroup.destroyEach();
  ground1.velocityX = 0;
  ground2.velocityX = 0;
  monkey.changeAnimation("end");
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState = "end";
    }
  drawSprites();
}
function createBanana() {
  if(frameCount % 80 === 0){
  randB = Math.round(random(150,220));
  banana = createSprite(620,randB,10,10);
  banana.addImage(bananaImage);
  banana.scale = .1;
  banana.velocityX = -7;
  banana.lifetime = 125;
  fruitGroup.add(banana);
  }
}
function createObstacle() {
  if(frameCount % 300 === 0){
  obstacle = createSprite(Math.round(random(620,1000)),250,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = .1;
  obstacle.velocityX = -7;
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
  }
}