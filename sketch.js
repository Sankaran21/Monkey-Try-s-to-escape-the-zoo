var monkey,monkey_running;
var backImage,backG;
var score;
var ground;
var bananaImage,obstacleImage;
var ObstaclesGroup,bananaGroup;

function preload(){
  backImage= loadImage("jungle2.jpg");
  monkey_running=loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage=loadImage("Banana.png");
  obstacleImage=loadImage("stone.png");
  }
function setup(){
  createCanvas(800,400);
  
  backG=createSprite(0,0,800,400);
  backG.addImage(backImage);
  backG.velocityX=-5;
  backG.scale=1.6;
  
  monkey = createSprite(100,340,40,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  bananaGroup=new Group();
  ObstaclesGroup= new Group();
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;          
   
  score=0; 
  
}
function draw(){
  background(255);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
    
  if(backG.x<0){
    backG.x=backG.width/2;
  }
  
  if(bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
  score=score+2
}
  
 
                      
  switch(score){
    case 10: player.scale=0.12;
      break;
    case 20: player.scale=0.14;
      break;     
    case 30: player.scale=0.16;
      break;     
    case 40: player.scale=0.18;
    default:   break;     
}
  if(keyDown("space") && monkey.y >= 315){
    monkey.velocityY = -12 ;
  }
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
  
   banana();
   spawnObstacles();
 
  if(ObstaclesGroup.isTouching(monkey)){
     monkey.scale=0.08;
}
  drawSprites();
  
  stroke("white");
 textSize(20);
 fill("white")
 text("Score:    "+score,500,50);
}

function banana(){
  if(frameCount%80===0){
   var banana = createSprite(800,100,20,20); 
   banana.y = Math.round(random(50,150));
   banana.addImage(bananaImage);
   banana.scale=0.07;
   banana.velocityX = -3;
   
   banana.lifetime = 800/3;
   
   bananaGroup.add(banana);
  }
 
 
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,310,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
    
  }
}


