const bodies=Matter.Bodies;
const Engine=Matter.Engine;
const World=Matter.World;
var Arthur,arthur,boss1,boss1img,boss2,boss2img,boss3,boss3img,boss4,boss4img,nenemy1,nenemy2,ground
var engine,world,Monkey,backgroundImg;
var score=0
var ObstaclesGroup 
var gameState = "play"


function preload(){
  gettime();
nenemy1=loadImage("nenemy1.png")
arthur=loadImage("arthur.png")
boss1img=loadImage("boss1.png")
boss2img=loadImage("boss2.png")
boss3img=loadImage("boss3.png")
boss4img=loadImage("arthur.png")
}


function setup() {
engine=Engine.create();
world=engine.world
createCanvas(displayWidth-20,displayHeight-20)
Arthur=bodies.rectangle(displayWidth/8,0,50,50)
World.add(world,Arthur)
ground=bodies.rectangle(displayWidth/2,displayHeight-270,displayWidth,20,{isStatic:true})
World.add(world,ground)

ObstaclesGroup = createGroup();
bossGroup = createGroup();
bulletGroup = createGroup();
}

function draw() {
Engine.update(engine);
if(backgroundImg){
  background(backgroundImg);
}
  
rectMode(CENTER)
imageMode(CENTER)


image(arthur,Arthur.position.x,Arthur.position.y,50,50)
rect(ground.position.x,ground.position.y,displayWidth,20)


if(gameState==="play"){
 spawnObstacles() 

if(keyWentDown("SPACE")){
  push();
  bullet=createSprite(Arthur.position.x+20,Arthur.position.y-5,5,5)
  bullet.shapeColor = "black"
  bullet.velocityX=2;
  bulletGroup.add(bullet);
  pop();
}
if(bulletGroup.isTouching(ObstaclesGroup)){
  bulletGroup.destroyEach()
  ObstaclesGroup.destroyEach()
  score = score+20
}
if(bulletGroup.isTouching(bossGroup)){
  bossGroup.destroyEach();
  bulletGroup.destroyEach();
  
}
}
drawSprites();
fill(255,0,0)
textSize(30)
text("Score  "+  score,displayWidth-500,100)
}


function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(displayWidth-20,displayHeight-320,10,40);
    obstacle.velocityX = - 6
    obstacle.addImage(nenemy1)
    obstacle.scale=0.2;
    //generate random obstacles
    
    ObstaclesGroup.add(obstacle)
    //assign scale and lifetime to the obstacle           
    
  
  }
  }


function spawnBOSS() {
  if(frameCount % 300 === 0) {
    var boss1 = createSprite(displayWidth-20,displayHeight-300,10,40);
    boss1.velocityX = - 6
    obstacle.addImage(nenemy1)
    
    obstacle.scale=0.5;
    //generate random obstacles
    
    bossGroup.add(boss1)
    //assign scale and lifetime to the obstacle           
    
  
  }
}
async function gettime(){
  var response= await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON= await response.json()
  var datetime=responseJSON.datetime
  var hour=datetime.slice(11,13)
  if(hour>06&&hour<19){
bg="bg.png"

  }else{
    bg="bg2.jpg"  
  }
  backgroundImg= loadImage(bg);

}
