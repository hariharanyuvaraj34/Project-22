var bullet, wallthickness, wall, bulletweight, bulletspeed, damage1, damage2, damage3;
var bulletimage, simulationstate;


function preload(){
  bulletimage = loadImage("Bullet.png");
}


function setup() {
  createCanvas(1600, 400);
  
  simulationstate = "begin";
  
  bullet = createSprite(100, 200, 10, 10);
  bullet.addImage("bulletpic", bulletimage);
  bullet.scale = 0.5;

  wall = createSprite(1200, 200, wallthickness, height/2);
  wall.shapeColor = (80, 80, 80);

  wallthickness = random(22, 83);

  bulletweight = random(30, 52);
  bulletspeed = random(223, 321);
}

function draw() {
  background("black");
  drawSprites();

  if (simulationstate == "begin") {
    wall.visible = false;
    bullet.visible = false;
    stroke("red");
    fill("red");
    textSize(30);
    text("Press Space To See The Strength Of the Wall", 500, 200);
  }

  if (keyDown("space") && simulationstate == "begin"){
    simulationstate = "started";
    wall.visible = true;
    bullet.visible = true;
  }

  if (simulationstate == "started") {
    bullet.velocityX = bulletspeed;
    
    if (hasCollided(bullet, wall)){
      bullet.velocityX = 0;;
    
      damage1 =  bulletweight * bulletspeed * bulletspeed * 0.5;
      damage2 = wallthickness * wallthickness * wallthickness;
      damage3 = damage1/damage2;
    
      if (damage3 > 10){
        wall.shapeColor = "red";
      }

      if (damage3 < 10){
        wall.shapeColor = "green";
      }
    }
  }
}



function hasCollided(lbullet, lwall) {
  bulletRightEdge = lbullet.x + lbullet.width;
  wallLeftEdge = lwall.x;

  if (bulletRightEdge >= wallLeftEdge){
    return true;
  }
  return false;
}