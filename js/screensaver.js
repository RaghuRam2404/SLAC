/*************  SCREENSAVER  **************************/
var time = 10;
var timeCount = 1;
var screenSaverPlaying = false;
window.addEventListener("mousemove", acted, false);
window.addEventListener("mousedown", acted, false);
window.setInterval(noAction, 1000);
var canWidth = 0;
var canHeight = 0;
  var context;

var canvas;
var context;
var balls = [];
  // Create balls of Specific Color, Size and speeds 
  function Ball(color,x,y, radius,dx,dy,mass)
  {
  this.radius  = radius;
  this.x = x;
  this.y  = y;
  this.dx  = dx;
  this.dy  = dy;
  this.color   = color;
  this.mass = mass;
  }

  function checkCollision (ball)
  {
	  var collisionPointX, collisionPointY;
	  for (var n = 0; n < balls.length; n++) {
				if (balls[n] != ball) {
					if (ball.x + ball.radius + balls[n].radius > balls[n].x 
					&& ball.x < balls[n].x + ball.radius + balls[n].radius
					&& ball.y + ball.radius + balls[n].radius > balls[n].y 
					&& ball.y < balls[n].y + ball.radius + balls[n].radius) {
						if (distanceTo(ball, balls[n]) < ball.radius + balls[n].radius) {
							
							var newVelX1 = Number(Number(ball.dx)*Number(Number(ball.mass)-Number(balls[n].mass))+Number(2*Number(balls[n].mass) * Number(balls[n].dx)))/Number(Number(ball.mass) + Number(balls[n].mass));
							var newVelY1 = Number(Number(ball.dy)*Number(Number(ball.mass)-Number(balls[n].mass))+(2*Number(balls[n].mass) * Number(balls[n].dy)))/Number(Number(ball.mass) + Number(balls[n].mass));
							var newVelX2 = Number(Number(balls[n].dx )* Number(Number(balls[n].mass)-Number(ball.mass)) + Number(2 *Number( ball.mass) * Number(ball.dx))) / Number(Number(ball.mass) + Number(balls[n].mass));
							var newVelY2 = Number(Number(balls[n].dy )* Number(Number(balls[n].mass)-Number(ball.mass)) + Number(2 * Number(ball.mass) * Number(ball.dy))) / Number(Number(ball.mass) + Number(balls[n].mass));
							//console.log("collision"+" "+collisionPointX+" "+collisionPointY);
							ball.dx = newVelX1;
							ball.dy = newVelY1;
							balls[n].dx = newVelX2;
							balls[n].dy = newVelY2;
							
							ball.x = ball.x + newVelX1;
							ball.y = ball.y + newVelY1;
							balls[n].x = balls[n].x + newVelX2;
							balls[n].y = balls[n].y + newVelY2;
						}
					}
				}
			}
  }
  function Bounce(ball)	
  {
	  if (ball.x >= (canWidth - ball.radius) || ball.x <= ball.radius) ball.dx = -ball.dx;
	  if (ball.y >= (canHeight - ball.radius) || ball.y <= ball.radius) ball.dy = -ball.dy;
		ball.x += ball.dx;
		ball.y += ball.dy; 
    
	}
function Create (ball)
 {

	  context.beginPath();
	  context.fillStyle = ball.color;
	  var grd = context.createRadialGradient(ball.x, ball.y, 0,ball.x, ball.y, ball.radius);
      grd.addColorStop(0, 'transparent');
      grd.addColorStop(1, '#8ED6FF');
      context.fillStyle = grd;
	  context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,false);
	  context.fill();
   }
 function distanceTo(firstBall, secondBall){
	 var distance = Math.sqrt(Math.pow((firstBall.x-secondBall.x),2)+Math.pow((firstBall.y-secondBall.y),2));
	 return distance;
 }
 var canvas;
 var context;
function ssinit()
{
	balls = [];
	canvas  = document.getElementById("backgroundCanvas");
	context = canvas.getContext('2d');
	
	canWidth = document.documentElement.clientWidth ;
	canHeight = (document.documentElement.clientHeight == 0) ? window.innerHeight : document.documentElement.clientHeight;
	// Create an arry to store the balls info
	balls.push(new Ball('#ff0000',120,120, 100,5,3,10)); 
	balls.push(new Ball('#ff6600',300,300, 70,2,10,12));
	balls.push(new Ball('#ff0000',500,500, 60,7,3,10)); 
	balls.push(new Ball('#ff0000',300,500, 50,7,3,10)); 
	balls.push(new Ball('#ff0000',600, 120, 60,2,3,10)); 
	setInterval(draw,20);

}
function draw(){
	if(screenSaverPlaying){
		context.clearRect(0,0, canWidth ,canHeight);
		
		for (i in balls) {
			// Boundary checking
			checkCollision(balls[i]);
			Bounce(balls[i]);
			Create(balls[i]);
		}
		/*for(var i=0; i<balls.length; i++){
			balls[i].checkCollision();
			balls[i].Bounce();
			balls[i].Create();
		}*/
	}else
		context.clearRect(0,0, canWidth ,canHeight);
		
}

function noAction(){
	if(timeCount === time){
		if(screenSaverPlaying);
		else{
			screenSaverPlaying = true;
			$("#backgroundCanvas").css({"z-index":"100"});
			ssinit();	
		}
	}else{
		timeCount++;
		$("#backgroundCanvas").css({"z-index":"-1"});	
	}
}

function acted(){
	timeCount = 1;
	screenSaverPlaying = false;
	clearContext();
}

function clearContext(){
	canvas  = document.getElementById("backgroundCanvas")
	context = canvas.getContext('2d');
	context.clearRect(0,0, canWidth ,canHeight);
}

/**************************** end of screensaver   ***********************/
