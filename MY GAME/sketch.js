var treasure;
var gameState = "play";
var water;
var score = 0;
function setup(){
    createCanvas(1200,800);
 
  
    water = createSprite(0,0,0,0);
    water.shapeColor = "white";
    water.addImage("water",bg);
    water.scale= 6;
    water.velocityX = -3;

    ground = createSprite(200,780,2000,20);
    ground.visible = false;


 //   water = createSprite(0,0,1200,800);
   // water.addImage(bg);
   // bg.velocityX = -3;

    //invisible.visible = false;

    plateformGroup = new Group();
    sharkGroup = new Group();
    invisibleBlockGroup = new Group();
    coinGroup = new Group();
    treasureGroup = new Group();

    fish = createSprite(100,745,20,50);
    fish.addImage(fishImg);
    fish.scale=0.2;
}
function preload(){
    bg = loadImage("bg 1.jpg");
    planks = loadImage("plank.jpg");
    fishImg = loadImage("mermaid 3.png");
    obstacleImg = loadImage("shark.png");
    coinImg = loadImage("coin.png");
    treasureImg = loadImage("treasure.png");
}
function draw(){
   background("blue");
    if(water.x<0){
        water.x = water.width/2;
    }
    if(gameState === "play"){
 //plateform.x = math.round(random(650,1200));
   if(keyDown("space")&&fish.y>=250){
       fish.velocityY = -12;
   }
   fish.velocityY = fish.velocityY+0.8;

   if(fish.isTouching(coinGroup)){
       score = score+10;
   }

   if(fish.isTouching(treasureGroup)){
       score = score+100;
   }

   fish.collide(ground); 
    spawnPlateforms();
   //spawnObstacles();
   spawnCoins();
   spawnTreasure();
   abc();
   
   if(invisibleBlockGroup.isTouching(fish) ){
     fish.velocityY = 0 ;
   }
   if(sharkGroup.isTouching(fish) ){
    fish.velocityY = 0 ;
    fish.destroy();
    gameState = "end";
  }

    drawSprites();
    fill("black");
    textSize(50);
    text("score : "+score,70,50);
}
if(gameState === "end"){
  stroke("red");
  fill("yellow");
  textSize(100);
  text("Oops You Lost!!",300,400);
}
}
function abc(){

    if(frameCount%150===0){
        obstacle = createSprite(1115,500,100,20);
        obstacle.addImage(obstacleImg);
        obstacle.scale = 0.7;
        obstacle.velocityX = -7;
        obstacle.y = Math.round(random(200,400));
        sharkGroup.add(obstacle);
    }
}

function spawnPlateforms(){
    if(frameCount%100===0){
    plateform = createSprite(1115,450,100,20);
    invisibleBlock = createSprite();
    invisibleBlock.width = plateform.width; 
    invisibleBlock.height = 2;
    invisibleBlock.velocityX = -5;
    invisibleBlockGroup.add(invisibleBlock);
    plateform.addImage(planks);
    plateform.scale=0.4;
    plateform.velocityX = -5;
    plateform.y = Math.round(random(400,600));
    invisibleBlock.x = plateform.x;
    invisibleBlock.y = plateform.y + 10;
    plateformGroup.add(plateform);
    invisibleBlock.debug = false;
    invisibleBlock.visible = false;
    plateform.depth = fish.depth;
    fish.depth = plateform.depth+1
}

}
function spawnTreasure(){
    if(frameCount%2000===0){
        treasure=createSprite(600,150,50,50);
        treasure.addImage(treasureImg);
        treasureGroup.add(treasure)
        treasure.velocityX = -3;
        treasure.scale = 0.5;
        treasure.depth = fish.depth;
        fish.depth = treasure.depth+1;
    }
}
function spawnCoins(){
if(frameCount%100===0){
    coin = createSprite();
    coin.x = plateform.x;
    coin.y = plateform.y - 15;
    coin.width = 15;
    coin.height = 10;
    coin.addImage(coinImg);
    coin.scale = 0.1;
    coin.velocityX = -5;
    coinGroup.add(coin);
}
}