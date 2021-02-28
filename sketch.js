var wall1 , wall2 ,wall3 ,wall4, wall5 ,wall6 ,wall7;
var door1, door2, door3;
var player, star , starGroup;
var enemy1, enemy2, enemy3, enemy4;
var enemyImg1 , enemyImg2 , enemyImg3 , enemyImg4;
var gameState = 1;
var enemyWeapon1, enemyWeapon2, enemyWeapon3, enemyWeapon4;
var enemyWeapon, score = 0;
var enemyWeaponGroup1, enemyWeaponGroup2, enemyWeaponGroup3, enemyWeaponGroup4;
var  enemyLife1 = 2 , enemyLife2 = 3, enemyLife3 = 4 ,enemyLife4 = 5;
var enemyWeaponImg1,enemyWeaponImg2,enemyWeaponImg3,enemyweaponImg4;
var counter = 10000;
var flag = 0;

function preload(){
 enemyImg1 = loadImage("v1.png");
 enemyImg2 = loadImage("v3.png");
 enemyImg3 = loadImage("e3.png");
 enemyImg4 = loadImage("v4.png");
 starImg = loadImage("s2.png");
 bg = loadImage("bg.jpg");
 playerImg = loadAnimation("Player.gif");
 enemyWeaponImg1 = loadImage("w (1).png");
 enemyWeaponImg2 = loadImage("w (2).png");
 enemyWeaponImg3 = loadImage("w (3).png");
 enemyWeaponImg4 = loadImage("w (4).png");
 bgmusic = loadSound("BGMusic.mp3");


}

function setup() {
  createCanvas(1200,600);

  enemyWeaponGroup1 = new Group();
  enemyWeaponGroup2 = new Group();
  enemyWeaponGroup3 = new Group();
  enemyWeaponGroup4 = new Group();

  starGroup = new Group();
 // bgmusic.loop();
    
  wall1 = createSprite(8,300,15,1200);
  wall2 = createSprite(600, 8, 1200, 15);
  wall3 = createSprite(1192,300,15,1200);
  wall4 = createSprite(600,592,1200,15);
  wall5 = createSprite(600,300,15,300);
  wall6 = createSprite(300,300,650,15);
  wall7 = createSprite(800,300,385,15);
  
  door1 = createSprite(600,80,10,140);
  door1.shapeColor="red";
  door2 = createSprite(1085,300,200,10);
  door2.shapeColor="red";
  door3 = createSprite(600,520,10,140);
  door3.shapeColor="red";
 
  player = createSprite(100,100,40,40);
  player.addAnimation("player",playerImg);
  player.scale=0.1;
  star = createSprite(player.x,player.y,20,20);
  
  enemy1 =createSprite(400,150,40,40);
  enemy1.addImage(enemyImg1);
  enemy1.scale=0.5;
  enemy2 =createSprite(1100,150,40,40);
  enemy2.addImage(enemyImg2);
  enemy2.scale=0.6;
  enemy3 =createSprite(450,450,40,40);
  enemy3.addImage(enemyImg4);
  enemy3.scale=0.9;
  enemy4 =createSprite(1100,450,40,40);
  enemy4.addImage(enemyImg3);
  enemy4.scale=0.6;
}

function draw() {
  background("pink"); 
  fill("lime");
  textSize(50);
  text("Score:"+score,900,50); 
  drawSprites();

  Bouncing(player);
  Bouncing(enemy1);
  Bouncing(enemy2);
  Bouncing(enemy3);
  Bouncing(enemy4); 
  
  player.collide(enemy1);
  player.collide(enemy2);
  player.collide(enemy3);
  player.collide(enemy4);
  
  if(keyDown(RIGHT_ARROW)){
    player.x = player.x +20
  }

  if(keyDown(LEFT_ARROW)){
    player.x = player.x -20
  }

  if(keyDown(UP_ARROW)){
    player.y = player.y -20
  }

  if(keyDown(DOWN_ARROW)){
    player.y = player.y +20
  }
  


  if(keyDown("space") && frameCount%5 === 0){
    star = createSprite(player.x,player.y,20,20);
    star.velocityX = 20;
    star.addImage(starImg);
    star.scale = 0.3;
    starGroup.add(star);
  }

  if(star.isTouching(enemy1)){
    enemyLife1 = enemyLife1 - 1;
  }
  
  if(enemyLife1 === 0){
    enemy1.destroy();
    enemyWeaponGroup1.setVisibleEach(false);
    enemyWeaponGroup1.destroyEach();
    gameState = 2;
    if(flag === 0){
    score = score + 10;
    flag = 1;
    starGroup.destroyEach();
    }
    //destroy star group
    
    door1.destroy();
  }

  if(star.isTouching(enemy2)){
    enemyLife2 = enemyLife2 - 1;
    flag = 0;
  }

  if(enemyLife2 === 0){
    enemyWeaponGroup2.destroyEach();
    enemy2.destroy();
    starGroup.destroyEach();
    gameState = 3;
    if(flag ===0){
    score = score + 20;
    flag = 1;
    }
    door2.destroy();
  }

  if(star.isTouching(enemy3)){
    enemyLife3 = enemyLife3 - 1;
    flag = 0;
  }

  if(enemyLife3 === 0){
    enemyWeaponGroup3.destroyEach();
    enemy3.destroy();
    starGroup.destroyEach();
    gameState = 4;
    if(flag === 0){
    score = score + 30;
    flag = 1;
    }
    door3.destroy();
  }

  if(star.isTouching(enemy4)){
    enemyLife4 = enemyLife4 - 1;
    flag = 0;
  }

  if(enemyLife4 === 0){
    enemyWeaponGroup4.destroyEach();
    enemy4.destroy();
    starGroup.destroyEach();
    gameState = 5;
    if(flag === 0){
    score = score + 40;
    flag = 1;
    }
  }

  switch(gameState){
   case 1 : enemyWeapon1 = createWeapons(enemy1.x,enemy1.y);
           // enemyWeapon1.addImage(enemyWeaponImg1);
            enemyWeaponGroup1.add(enemyWeapon1);
            Bouncing(enemyWeaponGroup1);
   break;
   case 2 : enemyWeapon2 = createWeapons(enemy2.x,enemy2.y);
           // enemyWeapon2.addImage(enemyWeaponImg2);
            enemyWeaponGroup2.add(enemyWeapon2);
            Bouncing(enemyWeaponGroup2);
   break;
   case 3 : enemyWeapon3 = createWeapons(enemy3.x,enemy3.y);
            enemyWeapon3.addImage(enemyWeaponImg3);
            enemyWeaponGroup3.add(enemyWeapon3);
            Bouncing(enemyWeaponGroup3);
   break;
   case 4 : enemyWeapon4 = createWeapons(enemy4.x,enemy4.y);
            enemyWeapon4.addImage(enemyWeaponImg4);
            enemyWeaponGroup4.add(enemyWeapon4);
            Bouncing(enemyWeaponGroup4);
   break;
   case 5 : fill("red");
            stroke("red");
            textSize(80);
            text("YOU WIN",400,300);
   break;
  }

 if(counter === 0 && gameState !==5){
  fill("red");
  stroke("red");
  textSize(80);
  text("YOU LOSE",400,300);
  player.destroy();
  enemyWeaponGroup1.destroyEach();
  enemyWeaponGroup2.destroyEach();
  enemyWeaponGroup3.destroyEach();
  enemyWeaponGroup4.destroyEach();
  enemy1.destroy();
  enemy2.destroy();
  enemy3.destroy();
  enemy4.destroy();
  starGroup.destroyEach();
  score
 }
 else{
   timer();
 }
}

function Bouncing(obj){
 obj.bounceOff(wall1);
 obj.bounceOff(wall2);
 obj.bounceOff(wall3);
 obj.bounceOff(wall4);
 obj.bounceOff(wall5);
 obj.bounceOff(wall6);
 obj.bounceOff(wall7);
 obj.bounceOff(door1);
 obj.bounceOff(door2);
 obj.bounceOff(door3);
}

function createWeapons(x,y){
  enemyWeapon = createSprite(x,y,10,10);
  if(frameCount%100 === 0){
    enemyWeapon = createSprite(x,y,10,10);
    enemyWeapon.shapeColor = "lime";
    enemyWeapon.velocityX = -8;
    enemyWeapon.velocityY = random(-10,10);
    enemyWeapon.lifetime = 400;
   // enemyWeaponGroup.add(enemyWeapon);
    }
    //Bouncing(enemyWeapon);
    return enemyWeapon;
}

function timer(){
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) { 
  color += letters[Math.floor(Math.random() * 16)]; 
  }
  fill(color);
  stroke(color);
  textSize(50);
  text("Counter:"+counter,100,50)
  counter = counter - 1;
}