var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg1
var trex_score=0;
var jumpSound, collidedSound;

var gameOver, restart;
var game = "TREX"

//ANGRYBRID global variables
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var bg = "sprites/bg1.png";
var score=0;

var x = 220
var y = 200

function preload(){
  getTime();

  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")
  
  backgroundImg1 = loadImage("assets/OIP.jpeg")
  sunAnimation = loadImage("assets/moon.png");
  
  //trex_running = loadAnimation("assets/trex_2.png","assets/trex_1.png","assets/trex_3.png");
  trex_running = loadAnimation("assets/bird.png")
  trex_collided = loadAnimation("assets/bird.png");
  
  groundImage = loadImage("assets/ground.png");
  
  cloudImage = loadImage("assets/cloud.png");
  
  obstacle1 = loadImage("assets/obstacle1.png");
  obstacle2 = loadImage("assets/obstacle2.png");
  obstacle3 = loadImage("assets/obstacle3.png");
  obstacle4 = loadImage("assets/obstacle4.png");
  
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  sun = createSprite(width-200,155,10,10);
  sun.addAnimation("sun", sunAnimation);
  //sun.scale = 0.1
  
  trex = createSprite(50,height-70,20,50);
  
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  //trex.setCollider('circle',0,0,350)
  //trex.scale = 0.08
  // trex.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  trexground = createSprite(width/2,height,width,2);
  trexground.addImage("ground",groundImage);
  trexground.x = width/2
  trexground.velocityX = -(6 + 3*trex_score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

  //ANGRYBIRD setup
  engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,400,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw() {
  if (game ==="TREX"){

    background(backgroundImg1);
    textSize(20);
    fill("black")
    text("Score: "+ trex_score,30,50);
    
    
    if (gameState===PLAY){
      trex_score = trex_score + Math.round(getFrameRate()/60);
      trexground.velocityX = -(6 + 3*trex_score/100);
      
      if(keyDown("UP_ARROW")||touches.length > 0 && trex.y  >= height-120) {
        jumpSound.play()
        trex.velocityY = -10;
         touches = [];
      }
      
      trex.velocityY = trex.velocityY + 0.8
    
      if (trexground.x < 0){
        trexground.x = trexground.width/2;
      }
    
      trex.collide(invisibleGround);
      spawnClouds();
      spawnObstacles();
    
      if(obstaclesGroup.isTouching(trex)){
          collidedSound.play()
          gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      trexground.velocityX = 0;
      trex.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      
      //change the trex animation
      trex.changeAnimation("collided",trex_collided);
      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)||touches.length>0) {      
        reset();
        touches = []
      }
    }
    
    
    drawSprites();
  if (trex_score>100){
    game = "ANGRYBIRD"
  }

  }
  if (game === "ANGRYBIRD"){
    var canvas = createCanvas(1200,400);
    //ANGRYBIRD function draw

    if(backgroundImg)
    background(backgroundImg);
noStroke();
textSize(30);
fill("white");
text("Score : " + score, 10,50);

if (score===100){
textSize(60);
fill("red");
text("Game Over", x,y);

if (x>=width/2){
    x=width/2
}
else
x=x+5
}

Engine.update(engine);
//strokeWeight(4);
angleMode(RADIANS)
box1.display();
box2.display();
ground.display();
pig1.display();

log1.display();

box3.display();
box4.display();
pig3.display();

log3.display();

box5.display();
log4.display();
log5.display();

bird.display();
platform.display();

slingshot.display();  

  }
  

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*trex_score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  trex_score = 0;
  
}

//ANGRYBIRD functions
function mouseDragged(){
  Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
  slingshot.fly();
}
function keyPressed(){
  if(keyCode===32){

  bird.trajectory=[];
  Matter.Body.setPosition(bird.body,{x:200,y:50});
  slingshot.attach(bird.body);}

}

async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  console.log(responseJSON)
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  console.log(datetime);
  console.log(hour);

  if(hour>=06 && hour<=19){
      bg = "sprites/kat2.png";
  }
  else{
      bg = "sprites/kat1.png";
  }

  backgroundImg = loadImage(bg);
}