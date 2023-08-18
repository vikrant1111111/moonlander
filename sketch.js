var background_img;
var lander_img;
var lander,ground;
var thrust,rightThrust,leftThrust
var normal;
var fuel=100;   

var vx = 0;
var g = 0.05;
var vy = 0;
var obstacle_image;
var obstacle;

function preload()
{
    background_img = loadImage("bg.png");
    lander_img = loadImage("normal.png");
    thrust=loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
    crash= loadAnimation("crash1.png","crash2.png","crash3.png");
    land = loadAnimation("landing1.png" ,"landing2.png","landing_3.png");
    rightThrust=loadAnimation("right_thruster_1.png","right_thruster_2.png");
    leftThrust=loadAnimation("left_thruster_1.png","left_thruster_2.png");
    normal=loadAnimation("normal.png");
    obstacle_image=loadImage("obstacle.png");
    lz_img = loadImage("lz.png");

    thrust.playing= true;
    thrust.looping= false;
    rightThrust.looping = false;
    leftThrust.looping = false;
    land.looping = false;
    crash.looping = false; 
}

function setup()
{
 createCanvas(1000,700);
 frameRate(80);
 timer = 1500;
 
 thrust.frameDelay = 5;
 leftThrust.frameDelay = 5;
 rightThrust.frameDelay = 5;
 crash.frameDelay = 10;
 
 lander = createSprite(100,50,30,30);
 lander.addImage(lander_img);
 lander.scale=0.15;

//lander animations
 lander.addAnimation("thrusting",thrust);
 lander.addAnimation("left",leftThrust);
 lander.addAnimation("right",rightThrust);
 lander.addAnimation("normal",normal); 
 lander.addAnimation("crash",crash);
 lander.addAnimation("land",land);
 
 ground = createSprite(500,690,1000,20);
 
obstacle = createSprite(320,530,50,100);
obstacle.addImage(obstacle_image);
obstacle.scale=0.5
obstacle.debug=true
obstacle.setCollider("rectangle",0,100,300,300)

lz = createSprite(880,610,50,30);
lz.addImage(lz_img);
lz.scale = 0.3;

lz.setCollider("rectangle",0,180,400,100)
rectMode(CENTER);
textSize(15);
}

function draw()
{
 background(51);
 image(background_img,0,0);

 push();
 fill(255);
 text("Vertical Velocity: "+round(vy),800,75);
 text("Horizontal Velocity"+round(vx,2),800,100);
 text("Fuel: "+fuel,800,50);
 pop();

 


vy+=g;
lander.position.y+=vy;
lander.position.x +=vx;

if (lander.collide(obstacle)==true){
    lander.changeAnimation("crash");
    stop();
}

 //landing detection;
 var d = dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y);
 console.log(d);

 if(d<=35 && (vy<2 && vy>-2 ) && (vx<2 && vx >-2) )
 {
   console.log("landed");
   vx = 0;
   vy = 0;
   g=0;
   lander.changeAnimation('landing');
 }

 if(lander.collide(ground)==true)
 {
   console.log("collided");
   lander.changeAnimation('crashing');
   vx = 0;
   vy = 0;
   g = 0;
 }

 drawSprites();
}

function keyPressed()
{
    if(keyCode==UP_ARROW  && fuel>0)
    {
        upWard_thrust();
        lander.changeAnimation("thrusting")
        thrust.nextFrame(); 
    }

    if(keyCode==RIGHT_ARROW  && fuel>0)
    {
        right_thrust();
        lander.changeAnimation("right");
    }
    
    if(keyCode==LEFT_ARROW  && fuel>0)
    {
        left_thrust();
        lander.changeAnimation("left");
        
    }
}

function upWard_thrust()
{
    vy=-1;
    fuel-=1;
}

function right_thrust()
{
    vx += 0.2;
    fuel-=1;
}

function left_thrust()
{
    vx -= 0.2;
    fuel-=1;
}

function stop()
{
  vx = 0;
  vy = 0;
  fuel = 0;
  g = 0;
}