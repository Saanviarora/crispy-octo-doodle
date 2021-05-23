var PLAY=1;
var END=0;
var gameState=1;
var fruit,fruit1, fruit2, fruit3, fruit4;
var fruit1Image, fruit2Image, fruit3Image, fruit4Image;
var sword, swordImage;
var fruitGroup;
var alien;
var alienImage;
var score=0;
var gameover, gameoverImage;
var backgroundT;
var knifeSword;
var gameOver;

function preload(){
  backgroundT= loadImage("tropical-summer-beach-vector-background.jpg")
  fruit1Image= loadImage("fruit1.png");
  fruit2Image= loadImage("fruit2.png");
  fruit3Image= loadImage("fruit3.png");
  fruit4Image= loadImage("fruit4.png");
  swordImage=  loadImage("sword.png");
  alienImage= loadImage("alien1.png");
  gameoverImage=loadImage("gameover.png")
  knifeSwoosh= loadSound("knifeSwooshSound.mp3");
  gameOver= loadSound("gameover.mp3");
 
  }
function setup(){
  createCanvas(600,600);
  sword=createSprite(40,200,20,20)
  sword.addImage(swordImage)
  sword.scale=0.7
  
  gameover=createSprite(300,200,20,20)
  gameover.addImage(gameoverImage)
  

fruitGroup=new Group();
alienGroup=new Group();
}

function draw(){
  background(backgroundT);
  
  if(gameState === PLAY){

    

    sword.y = World.mouseY
    sword.x= World.mouseX
     fruits();
    Enemy();
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2
      knifeSwoosh.play()
    }
   if(alienGroup.isTouching(sword)){
     gameState=END;}
    
    gameover.visible=false;
  
  }
  
  if(gameState===END){
    fruitGroup.setVelocityXEach(0);
    alienGroup.setVelocityXEach(0)
    fruitGroup.destroyEach()
    alienGroup.destroyEach()
    gameover.visible=true;
    gameOver.play()
    
  }
  

 
drawSprites();
   text("Score: "+ score, 500,50);
}
function fruits(){
  if(World.frameCount%80===0){
     var position= Math.round(random(1,2))
   
    fruit= createSprite(400,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    
    if(r==1){
      fruit.addImage(fruit1Image);
    }else if(r==2){
      fruit.addImage(fruit2Image);
    }else if(r==3){
      fruit.addImage(fruit3Image);
    }else {
      fruit.addImage(fruit4Image);
    }
    fruit.y= Math.round(random(50,340));
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
   
  
  if(position===1)
    {
      fruit.x=600;
      fruit.velocityX= -(7+(score/4));
    }
  else
    {
    
      if(position===2)
        {
        fruit.x = 0;
          fruit.velocityX= (7+(score/4));
        }
    }
  
        
    }
}

function Enemy(){
  if(World.frameCount%200==0){
    alien = createSprite(400,200,20,20);
    alien.addAnimation("moving", alienImage);
    alien.y=Math.round(random(300));
    alien.velocityX=-(8+(score/10));
    alien.velocityX=-8;
    alien.Lifetime=50;
    
    alienGroup.add(alien);
    
  }
  
}

