//Estados del Juego
var PLAY=1;
var END=0;
var gameState=1;

var sponge,plate ,cat,dog,plateGroup,petsGroup, score,r,randomPlate, position;
var spongeImage , pet1Img, pet2Img ,plate, gameOverImage;
var gameOverSound;

function preload(){
  spongeImage = loadImage("sponge.png");

  pet1Img = loadImage("Pet1.png");
  pet2Img = loadImage("Pet2.png");

  plateImg = loadImage("Plate.png");
  glassImg = loadImage("glass.png");
  skilletImg = loadImage("skillet.png");
  silverwareImg = loadImage("silverware.png");

  guitarImg = loadImage("Guitar.png")
  moneyImg = loadImage("Money.png");
  angryImg = loadImage("angryChef.png");

  backgroundImg = loadImage("bg2.png");
   
}

function setup() {
  createCanvas(800, 600);
  background(255);
  //crea la espada/cuchillo
   sponge=createSprite(200,200,20,20);
   sponge.addImage(spongeImage);
   sponge.scale=0.2;
  
  //establece la colisión para el cuchillo
  sponge.setCollider("rectangle",0,0,40,40);

  money = createSprite(580,40,20,20);
  money.addImage(moneyImg);
  money.scale = 0.1;

  angry = createSprite(350,45,20,20);
  angry.addImage(angryImg);
  angry.scale = 0.08;

  // Puntuación de Variables y Grupos
  score=0;
  life  = 4;
  plateGroup=createGroup();
  petsGroup=createGroup();
  
}

function draw() {
  background(255);
  background(backgroundImg)
  if(gameState===PLAY){
    
    //Llama la función de frutas y Monstruo
    showPlates();
    pets();
    
    //Mueve la espada/cuchillo con el ratón
    sponge.y=World.mouseY;
    sponge.x=World.mouseX;
  
    //Incrementa la puntuación si el cuchillo toca la fruta
    if(plateGroup.isTouching(sponge)){
      plateGroup.destroyEach();
      score=score+10;
    } else {
      // Ve al estado del juego: end, si el cuchillo toca al enemigo
      if(petsGroup.isTouching(sponge)){
        petsGroup.destroyEach();
        score = score -10;
        life = life - 1;
        if(life === 0){
          
          gameState=END;
                
          plateGroup.destroyEach();
          petsGroup.destroyEach();
          plateGroup.setVelocityXEach(0);
          petsGroup.setVelocityXEach(0);
          
          // Cambia la animación de la espada a gameover y reinicia su posición
          
        }
        
      }
    }
    if(score >= 20){
      console.log("Ganaste");
      gameState=END;
      plateGroup.destroyEach();
      petsGroup.destroyEach();
      plateGroup.setVelocityXEach(0);
      petsGroup.setVelocityXEach(0);

      sponge.addImage(guitarImg);
      sponge.scale=0.16;
      sponge.x=300;
      sponge.y=300;

    }
  }
  
  drawSprites();
  //Muestra la puntuación
  textSize(25);
  fill(255);
  text("Money : "+ score,620,50);
  text("Tries: "+ life,400,50);
}


function pets(){
  if(World.frameCount%200===0){
    pet =createSprite(300,100,100,100);
    
    pet.velocityX=-(8+(score/10));
    pet.scale = 0.2;
    r=Math.round(random(1,2));
    if (r == 1) {
      pet.addImage(pet1Img);
      pet.scale = 0.1;
    } else {
      pet.addImage(pet2Img);
      pet.scale = 0.1;
    }
    pet.y=Math.round(random(150,450));
    pet.setLifetime=50;
    
    petsGroup.add(pet);
  }
}

function showPlates(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    plate=createSprite(400,200,20,20);
   
    //utilizando la variable aleatoria, cambia la posición de la fruta para hacerlo más desafiante
    if(position==1){
      plate.x=500;
      plate.velocityX=-(7+(score/4));
      } else {
      if(position==2){
        plate.x=50;
        //Incrementa la velocidad de la fruta, después de que la puntuación sea 4 o 10
        plate.velocityX= (7+(score/4));
      }
    }
    
    plate.scale=0.2;
    
    r=Math.round(random(1,4));

    if (r == 1) {
      plate.addImage(glassImg);
      //plate.scale = 0.2;
    } else if (r == 2) {
      plate.addImage(skilletImg);
      plate.scale = 0.05;
    } else if (r == 3) {
      plate.addImage(silverwareImg);
      
    } else {
      plate.addImage(plateImg);
      plate.scale = 0.3;
    }
    
    plate.y=Math.round(random(50,450));
    plate.setLifetime=100;
    plateGroup.add(plate);
  }
}