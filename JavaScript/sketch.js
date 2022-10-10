//adding variables
let credits_video;
let space_bg;
let gameobjects;
let s,p,a,c,e,biggie1,biggie2;
let s_img,p_img,a_img,c_img,e_img;
let gamestates = 0;
let playbutton;
let infobutton;
let backbutton;
let fighterjet,imageof
let t ="Empty";
let vid;
let missile,missile_group,missile_image,missile_image_random
let stars = [];
let shootingStar;
let missilegroup,npc_group;
let bomb_sound;
let missilenpcgroup


let x,y;
let score = 0;
//for not scrolling when pressing arrow keys
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
  }, false);


// loading all the assets
function preload() {
space_bg = loadImage("Images/Background/space_bg.png");
s_img = loadImage("Images/Assets/s.png");
p_img = loadImage("Images/Assets/p.png");
a_img = loadImage("Images/Assets/a.png");
c_img = loadImage("Images/Assets/c.png");
e_img = loadImage("Images/Assets/e.png");
biggie1 = loadImage("Images/Assets/biggie1.png");
biggie2 = loadImage("Images/Assets/biggie2.png");
backbutton = loadImage("Images/Assets/Back.png");
imageof =loadImage("Images/Assets/FighterJet.png")
missile_image = loadImage("Images/Assets/Missile.png");
missile_image_random = loadImage("Images/Assets/Missil.png");
}

function setup() {
createCanvas(windowWidth, windowHeight);
//creating groups
npc_group = new Group();
missilegroup = new Group();
missile_group = new Group();
missilenpcgroup = new Group();
//creating the play button
playbutton = createButton("PLAY");
playbutton.class('play');
playbutton.position(700,400);
playbutton.size(200,50);
//creating the info button
infobutton = createButton("INFO");
infobutton.class('info1');
infobutton.position(700,500);
infobutton.size(200,50);
//creating the jet sprite
fighterjet = {pos:createVector(200,200)}
fighterjet = createSprite(800,800,50,50);
  fighterjet.addImage(imageof);
  fighterjet.scale = 0.1;
  fighterjet.visible = false;
// making a array and adding s,p,a,c,e,biggie1,biggie2 to it
gameobjects = [s,p,a,c,e,biggie1,biggie2];
vid = createVideo(['Videos/loading.mov','Videos/loading.mp4']);
vid.position(0,0);
vid.size(windowWidth,windowHeight);
bomb_sound = createAudio("Sound/Bomb.mp3");

//vid.hide()
// make a for loop to make stars 
for (var i = 0; i < 50; i++) {
    stars.push(new Star());
};
}
function ScoreBoard(){ 
    fill("red");
    textSize(50);
    textFont("Nabla");
    text("Score: " + score, 1400, 100);
  }
function draw() {
    
background(space_bg);
playbutton.mousePressed(PressPlayButton);
infobutton.mousePressed(Pressbuttoninfo);
if(gamestates==0){
vid.play();
vid.onended(hidevied);
fill("red");
textSize(50);
textFont("Bungee Spice");
text("Project Rumble", 570, 100);


}
if(gamestates == 1){
    background(8,20,36);
    ellipse(this.x, this.y, this.w, this.h);
    ScoreBoard();
    spawnss();
    spawnsp();
   // missilehit();
   //remove();
 fighterjet.visible = true;
  //make it so that when the missile hit the npc_group the bomb sound plays
  if(missilegroup.overlap(npc_group)){
    bomb_sound.play();
  }
     move();
     if(keyWentDown("space")){
        shootmissile();
      }
      win();
      gameOver();
  }
  if(gamestates == 2){
  unmove()
background(space_bg);

  }
  for (var i = 0; i < 5; i++) {
    var x1 = random(windowWidth);
    var y1 = random(windowHeight-200);

    noStroke();
    fill(255, 255, 0);
    ellipse(x1, y1, 2, 2);
 }
 
  if(t==="info text"){
    fill("red"); 
    textSize(50);
    textFont("Bungee Spice");
    text("Made By Phat phan", 500, 500);
    }
  
 
   //text(mouseX + " , " + mouseY, mouseX,mouseY);
   remove12();
   remove21();
    drawSprites();
}

function PressPlayButton(){
    gamestates += 1;
    playbutton.hide();
    infobutton.hide();

  }
  function Pressbuttoninfo(){        
    playbutton.hide();
    infobutton.hide();
    t = "info text"
    // fill("red"); 
    // textSize(50);
    // text("Information", 660, 100);
    //create a button to go back to the main menu
    backbutton = createImg("./Images/Assets/Back.png");
    backbutton.position(50,50);
    backbutton.size(50,50);
    backbutton.mousePressed(Pressbuttonback);
  
  }
//make the fighter jet move with the arrow keys
function move(){
    if(keyDown("up")||keyDown("w")){
      fighterjet.position.y -= 10;
    }
    if(keyDown("down")||keyDown("s")){
      fighterjet.position.y += 10;
    }
    if(keyDown("left")||keyDown("a")){
      fighterjet.position.x -= 10;
    }
    if(keyDown("right")||keyDown("d")){
      fighterjet.position.x += 10;
    }
  }
  function unmove(){
    if(keyWentUp("up")||keyWentUp("w")){
      fighterjet.position.y += 0;
    }
    if(keyWentUp("down")||keyWentUp("s")){
      fighterjet.position.y -= 0;
    }
    if(keyWentUp("left")||keyWentUp("a")){
      fighterjet.position.x += 0;
    }
    if(keyWentUp("right")||keyWentUp("d")){
      fighterjet.position.x -= 0;
    }
  }

  function Pressbuttonback(){ 
    playbutton.show();
    infobutton.show();
    backbutton.hide();
    t = "Empty";
  }

  function shootmissile(){
    missile= createSprite(150, width/2, 50,20)
    missile.x= fighterjet.x
    missile.y= fighterjet.y+10
    missile.addImage(missile_image)
    missile.scale=0.12
    missile.velocityY=- 20
  missile_group.add(missile)
  }
  function hidevied(){
    vid.pause()
    vid.hide()
  }
  
//make functions to spawn diiferent object from the array gameobjects at every 10 seconds 
function spawnss(){
    if(frameCount%200==0){
      s = createSprite(100,100,2,2);
      s.addImage(s_img);
      s.scale = 0.5;
      s.visible = true;
      s.velocityY = 3;
      s.x = Math.round(random(100,1500));
      s.scale = 1.5
      npc_group.add(s)
      shootmissilerandom1();
    }
  }
  function spawnsp(){
    if(frameCount%150==0){
        p={pos:createVector(500,200)}
      p = createSprite(100,100,2,2);
      p.addImage(p_img);
      p.scale = 0.5;
      p.visible = true;
      p.velocityY = 3;
      p.x = Math.round(random(0,1500));
      p.scale = 1.5
      npc_group.add(p)
      shootmissilerandom();
    }
  }
function Star() {
    this.x = random(windowWidth);
    this.y = random(windowHeight-200);
    this.w = 2;
    this.h = 2;
 }
 Star.prototype.draw = function() {
    noStroke();
    fill(255, 255, 0);
    ellipse(this.x, this.y, 2, 2);
    this.x += (random(10) - 5);
    this.y += (random(10) - 5);
    if (this.w == 2) {
        this.w = 3;
        this.h = 3;
    } else {
        this.w = 2;
        this.h = 2;
    }
 }
 function shootmissilerandom(){
    if(frameCount%150==0){
    missilenpc= createSprite(150, width/2, 50,20);
    missilenpc.x= p.x;
    missilenpc.y= p.y+10;
    missilenpc.addImage(missile_image_random);
    missilenpc.scale=0.12;
    missilenpc.velocityY= 20;
    missilenpcgroup.add(missilenpc);
    }
  }
  function shootmissilerandom1(){
    if(frameCount%150==0){
    missilenpc= createSprite(150, width/2, 50,20);
    missilenpc.x= s.x;
    missilenpc.y= s.y+10;
    missilenpc.addImage(missile_image_random);
    missilenpc.scale=0.12;
    missilenpc.velocityY= 20;
    missilenpcgroup.add(missilenpc);
    }
  }

  
//make a function to remove npc if collision between the missile and the fighter jet is detected

function remove12(){
  if(missile_group.overlap(npc_group)){
   
    missile_group.destroyEach();
     //remove only npc that is hit by the missile
    npc_group.destroyEach();
      score += 1;
    bomb_sound.play();
      
  }
}
  
  
function remove21(){
if(missilenpcgroup.overlap(fighterjet)){
  missilenpcgroup.destroyEach();
  fighterjet.destroy();
  gamestates += 1;
  bomb_sound.play();
  }
}
function gameOver() {
  if(missilenpcgroup.overlap(fighterjet)){
    gamestates += 1;
  swal(
    {
      title: `You lose!`,
  text: "You were killed by the enemy",
  imageUrl: "https://github.com/aaditkumar2009/image/blob/main/emojipng.com-14665.png?raw=true",
  imageSize: "100x100",
  confirmButtonText: "Play Again?"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
}

function win() {
  if(score === 20){
  swal(
    {
      title: `You Win!`,
  text: "You killed all the enemys",
  imageUrl: "https://github.com/aaditkumar2009/image/blob/main/Vecteezy.com.png?raw=true",
  imageSize: "100x100",
  confirmButtonText: "Play Again?"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
}