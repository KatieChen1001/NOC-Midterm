var attractor;
var _width, _height;
var star = [];
var R;
var numOfStar = 36;
var C_GRAVITY; 
var angle = 0;


function setup(){
	_width = 500;
	_height = 500;
	createCanvas(_width,_height, WEBGL);

	C_GRAVITY = 50;

	R = _width/2 + 30;
	attractor = new Particle(0,0,-600,3);
	for (var i = 0; i < numOfStar; i++){
		if (angle <= 360){
			var x = R * cos(radians(angle));
			var y = R * sin(radians(angle));
		}

		var m = random(0.2,1)
		star[i] = new Particle(x,y,0,m); 
		angle += 360/numOfStar;
	}

}

function draw(){
	background(0);
	scale(1,-1,1);
	attractor.display();

	for (var i = 0; i < star.length; i++){
		star[i].applyAttraction(attractor);
		star[i].update();
		star[i].display();
	}

	if (keyIsPressed){
		// a: add new stars - hold down "a" to add more star object - move in spiral direction
		if (keyCode === 65){
			angle += 360/numOfStar;
			var x = R * cos(radians(angle));
			var y = R * sin(radians(angle));
			var m = random(0.2,1);
			star.push(new Particle(x,y,0,m));
		}

		if (keyCode === 32){
			for (var i = 0; i < star.length; i++){
				star[i].reset();
			}
		}


	}




}
