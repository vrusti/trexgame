var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage, cloud_group;
var obstacle, obstacles1, obstacle_group, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6;
var score;

var PLAY =1;
var END =0;
var gameState = PLAY;
 
var restart, restartimg, gameOver, gameOverimg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png")  
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacles1 = loadImage("obstacle1.png");
  obstacles2 = loadImage("obstacle2.png");
  obstacles3 = loadImage("obstacle3.png");
   obstacles4 = loadImage("obstacle4.png");
  obstacles5 = loadImage("obstacle5.png");
  obstacles6 = loadImage("obstacle6.png");
  restartimg = loadImage("restart.png");
  gameOverimg= loadImage("gameOver.png"       );
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = - (6 + 3*score/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloud_group = new Group();
  obstacle_group = new Group();
  
  score = 0;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverimg);
  
  restart = createSprite(300,140);
  restart.addImage(restartimg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
 gameOver.visible = false;
 restart.visible = false;
  
  
}

function draw() {
  background(245);
  if(gameState===PLAY){
    
  
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  
  
  spawnClouds();
  spawnObstacles();
    
    if(obstacle_group.isTouching(trex)){
      gameState = END;
    }
}
  else
    if(gameState===END){
       gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacle_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
 
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  

  } 
    
   trex.collide(invisibleGround);
   text("score" + score,500,50);
  drawSprites();
   
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
   cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud_group.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1:obstacle.addImage(obstacles1);
        break;
      case 2:obstacle.addImage(obstacles2);
        break;
      case 3:obstacle.addImage(obstacles3);
        break;
      case 4:obstacle.addImage(obstacles4);
        break;
      case 5:obstacle.addImage(obstacles5);
        break;
      case 6:obstacle.addImage(obstacles6);
        break;
        default:text("rand "+ rand, 50,50);
        break
}
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
        obstacle_group.add(obstacle);
  }
}


