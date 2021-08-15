var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');
var canvasJet = document.getElementById('canvasJet');
var ctxJet = canvasJet.getContext('2d');
var canvasEnemy = document.getElementById('canvasEnemy');
var ctxEnemy = canvasEnemy.getContext('2d');
var playerScore = document.getElementById('playerScore');
var ctxPlayer = playerScore.getContext('2d');

ctxPlayer.fillStyle = "rgba(14,80,203,0.6)";
ctxPlayer.font = "bold 20px Verdana";

var imgSprite = new Image();
imgSprite.src = 'images/apps/spac1.png';
imgSprite.addEventListener('load', init, false);

var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var jet1;
var btn = new Button(131,384,776-632+100,873+100-632);
var enemy1;

var isPlaying = false;
var reqAnimFrame = 	window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					function(callback){
						window.setInterval(callback, 1000/60);
					};

var enemies = [];
var spawnAmount = 5;


// move background
var basicWidth = 800;
var bgDrawX1 = 0;
var bgDrawX2 = basicWidth;

function moveBg(){
	bgDrawX1 -= 1;
	bgDrawX2 -= 1;
	if(bgDrawX1 <= -basicWidth)
		bgDrawX1 = basicWidth;
	else if(bgDrawX2 <= -basicWidth)
		bgDrawX2 = basicWidth;
	drawBg();
}

// end move background


// main
function init(){
	drawMenu();
	document.addEventListener('click', checkMouseClick, false);
}

function playGame(){
	spawnEnemy(spawnAmount);
	document.addEventListener('keyup', checkKeyUp, false);
	document.addEventListener('keydown', checkKeyDown, false);
	jet1 = new Jet();
	updateScore();
	startLoop();
}

function spawnEnemy(n){
	for(var i=0; i<n; i++){
		enemies[enemies.length] = new Enemy();
	}
}
 
function drawAllEnemies(){
	clearCtxEnemy();
	for(var i=0; i<enemies.length; i++){
		enemies[i].draw();
	}
}

function loop(){
	if(isPlaying === true){
		moveBg();
		jet1.draw();	// for our jet
		drawAllEnemies();
		reqAnimFrame(loop);
	}else{
		// show the blast screen and replay	
		window.setTimeout(function(){
				
			clearCtxBg();
			clearCtxEnemy();
			ctxJet.clearRect(0,0,gameWidth, gameHeight);
			init();
			jet1 = new Jet();
			enemies = [];
			playgame();
			
		}, 5000);
		
		ctxPlayer.clearRect(0,0,gameWidth, gameHeight);
		ctxJet.fillStyle = "rgba(14,80,203,1)";
		ctxJet.font = "bold 40px Verdana";
		ctxJet.fillText("GAME OVER" ,100,100);
		ctxJet.font = "bold 20px Verdana";
		ctxJet.fillText("OVER : "+jet1.score ,100,200);
	}
}

function startLoop(){
	isPlaying = true;
	loop();
} 

function stopLoop(){
	isPlaying = false;
}

function drawMenu(){
	ctxBg.drawImage(imgSprite, 71, 633, 625, 343, 0, 0, gameWidth, gameHeight);
}

function drawBg(){
	clearCtxBg();
	ctxBg.drawImage(imgSprite, 0, 0, gameWidth, gameHeight, bgDrawX1, 0, gameWidth, gameHeight);
	ctxBg.drawImage(imgSprite, 0, 0, gameWidth, gameHeight, bgDrawX2, 0, gameWidth, gameHeight);
}

function clearCtxBg(){
	ctxBg.clearRect(0,0,gameWidth, gameHeight);
}

function updateScore(){
	ctxPlayer.clearRect(0,0,gameWidth, gameHeight);
	ctxPlayer.fillText("SCORE : "+jet1.score , 20,20);
}

// end of main




// Button
function Button(xL, xR, yT, yB){
	this.xLeft = xL;
	this.xRight = xR;
	this.yTop = yT;
	this.yBottom = yB;
}

Button.prototype.checkClick = function(mouseX, mouseY){
	if(mouseX >= btn.xLeft && mouseX <= btn.xRight && mouseY >= btn.yTop && mouseY <= btn.yBottom)
		return true;
	return false;
};

// end of Button



// jet class
function Jet(){
	this.srcX = 1171;
	this.srcY = 109;
	this.drawX = 200;
	this.drawY = 200;
	this.width = 127;
	this.height = 95;
	this.speed = 4;
	this.score = 0;
	this.isUpKey = false;
	this.isDownKey = false;
	this.isRightKey = false;
	this.isLeftKey = false;

	// for positions
	this.right = this.drawX + this.width;
	this.left = this.drawX;
	this.top = this.drawY;
	this.bottom = this.drawY + this.height;

	// for the bullet
	this.noseX = this.drawX + 96;
	this.noseY = this.drawY + 20;
	this.currentBullet = 0;
	this.bullets = [];
	this.isSpaceBar = false;
	this.isShooting = false;

	for(var i=0; i<6; i++)
		this.bullets[i] = new Bullet();

}

Jet.prototype.updateCoors = function(){
	this.noseX = this.drawX + 100;
	this.noseY = this.drawY + 26;

	this.right = this.drawX + this.width;
	this.left = this.drawX;
	this.top = this.drawY;
	this.bottom = this.drawY + this.height;
}

Jet.prototype.draw = function(){
	clearCtxJet();
	this.updateCoors();
	this.checkKeys();
	this.checkShooting();
	this.drawAllBullets();
	ctxJet.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width,this.height);
}

Jet.prototype.drawAllBullets = function(){
	for(var i=0; i<this.bullets.length; i++){
		if(this.bullets[i].drawX >= 0)	this.bullets[i].draw();
		if(this.bullets[i].explosion.hasHit) this.bullets[i].explosion.draw();
	}
}

Jet.prototype.checkShooting = function() {
	if(this.isSpaceBar && !this.isShooting){
		this.isShooting = true;
		this.bullets[this.currentBullet].fire(this.noseX, this.noseY);
		this.currentBullet++;
		if(this.currentBullet >= this.bullets.length)
			this.currentBullet = 0;
	}else if(!this.isSpaceBar){
		this.isShooting = false;
	}
};

Jet.prototype.checkKeys = function(){

	if(this.isUpKey && this.top >= 0 ){
		this.drawY -= this.speed;
	}if(this.isDownKey && this.bottom <= gameHeight ){
		this.drawY += this.speed;
	}if(this.isRightKey && this.right <= gameWidth ){
		this.drawX += this.speed;
	}if(this.isLeftKey && this.left >= 0){
		this.drawX -= this.speed;
	}
};

function clearCtxJet(){
	ctxJet.clearRect(0,0,gameWidth, gameHeight);
}
// end of jet class



// bullet class

function Bullet(){
	this.srcX = 1209;
	this.srcY = 542;
	this.drawX = -50;
	this.drawY = 0;
	this.width = 34;
	this.height = 19;
	this.speed = 5;
	this.hasHit = false;
	this.explosion = new Explosion();
}

Bullet.prototype.draw = function(){
	this.drawX += this.speed;
	ctxJet.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width,this.height);
	this.checkHitEnemy();  
	if(this.drawX > gameWidth) this.reCycle();
}

Bullet.prototype.reCycle = function(){
	this.drawX = -50;
}

Bullet.prototype.fire = function(startX, startY){
	this.drawX = startX;
	this.drawY = startY;
}

Bullet.prototype.checkHitEnemy = function(){
	for(var i=0; i<enemies.length; i++){
		if(this.drawX >= enemies[i].drawX && this.drawX <= enemies[i].drawX+enemies[i].width &&this.drawY >= enemies[i].drawY &&this.drawY <= enemies[i].drawY+enemies[i].height){
				this.explosion.drawX = enemies[i].drawX - (this.explosion.width/2);
				this.explosion.drawY = enemies[i].drawY;
				this.explosion.hasHit = true;
				this.explosion.draw();
				this.reCycle();
				enemies[i].recyleEnemy();
				jet1.score += 5;
				updateScore();
		}
	}
};

// end of bullet class



// Explosion class
function Explosion(){
	this.srcX = 1365;
	this.srcY = 457;
	this.drawX = -50;
	this.drawY = -50;
	this.width = 50;
	this.height = 50;
	this.hasHit = false;
	this.currentFrame = 0;
	this.totalFrame = 10;
}

Explosion.prototype.draw = function(){
	if(this.currentFrame <= this.totalFrame){
		if(isPlaying)
			ctxJet.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width,this.height);
		else
			ctxJet.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width+50,this.height+50);
		this.currentFrame++;
	}else{
		this.hasHit = false;
		this.currentFrame = 0;
	}
}

// end of explosion class



// enemy class
function Enemy(){
	this.srcX = 1200;
	this.srcY = 293;
	this.drawX = Math.floor(Math.random() * 1400) + gameWidth;
	this.drawY = Math.floor(Math.random() * 360);
	this.width = 115;
	this.height = 106;
	this.speed = 2;
	this.hit = false;
}

Enemy.prototype.draw = function(){
	this.drawX -= this.speed;
	ctxEnemy.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width,this.height);
	this.checkBound();
	this.checkHit();
};

Enemy.prototype.checkBound = function(){
	if(this.drawX + this.width <= 0){
		this.recyleEnemy();
	}
};

Enemy.prototype.check = function(){
	if(jet1.drawX >= this.drawX && jet1.drawX <= this.drawX + this.width && jet1.drawY >= this.drawY && jet1.drawY <= this.drawY+this.height){
			return true;
	}else if(jet1.drawX+jet1.width >= this.drawX && jet1.drawX+jet1.width <= this.drawX + this.width && jet1.drawY >= this.drawY && jet1.drawY <= this.drawY+this.height){
		return true;
	}else if(jet1.drawX+jet1.width >= this.drawX && jet1.drawX+jet1.width <= this.drawX + this.width && jet1.drawY+jet1.height >= this.drawY && jet1.drawY+jet1.height <= this.drawY+this.height){
		return true;
	}else if(jet1.drawX >= this.drawX && jet1.drawX <= this.drawX + this.width && jet1.drawY+jet1.height >= this.drawY && jet1.drawY+jet1.height <= this.drawY+this.height)
		return true;
	return false;
};

Enemy.prototype.checkHit = function(){
	if(this.check()){
		var e = new Explosion();
		e.drawX = jet1.drawX + jet1.width/2;
		e.drawY = jet1.drawY;
		e.width = 100;
		e.height = 100;
		isPlaying = false;
		e.draw();
	}
};

Enemy.prototype.recyleEnemy = function(){
	//enemies.splice(enemies.indexOf(this),1);
	this.drawX = Math.floor(Math.random() * 200) + gameWidth;
	this.drawY = Math.floor(Math.random() * 360);
}

function clearCtxEnemy(){
	ctxEnemy.clearRect(0,0,gameWidth, gameHeight);
}
// end of enemy class




// events
function checkKeyUp(e){
	var keyCode = e.keyCode ? e.keyCode : e.which;
	if(keyCode ===  38 || keyCode === 87){			// up arrow or w
		jet1.isUpKey = false;
		e.preventDefault();
	}if(keyCode ===  39 || keyCode === 68){	// right arrow or d
		jet1.isRightKey = false;
		e.preventDefault();
	}if(keyCode ===  40 || keyCode === 83){	// down arrow or s
		jet1.isDownKey = false;
		e.preventDefault();
	}if(keyCode ===  37 || keyCode === 65){	// left arrow or a 
		jet1.isLeftKey = false;
		e.preventDefault();
	}if(keyCode ===  32){	// space bar
		jet1.isSpaceBar = false;
		e.preventDefault();
	}
}

function checkKeyDown(e){
	var keyCode = e.keyCode ? e.keyCode : e.which;
	if(keyCode ===  38 || keyCode === 87){			// up arrow or w
		jet1.isUpKey = true;
		e.preventDefault();
	}if(keyCode ===  39 || keyCode === 68){	// right arrow or d
		jet1.isRightKey = true;
		e.preventDefault();
	}if(keyCode ===  40 || keyCode === 83){	// down arrow or s
		jet1.isDownKey = true;
		e.preventDefault();
	}if(keyCode ===  37 || keyCode === 65){	// left arrow or a  
		jet1.isLeftKey = true;
		e.preventDefault();
	}if(keyCode ===  32){	// space bar
		jet1.isSpaceBar = true;
		e.preventDefault();
	}
}

function checkMouseClick(e){
	var mouseX = e.pageX - document.getElementById('can').offsetLeft;
	var mouseY = e.pageY - document.getElementById('can').offsetTop;

	if(!isPlaying && btn.checkClick(mouseX, mouseY))
		playGame();
}

// end of events
