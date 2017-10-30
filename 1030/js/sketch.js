var attractor;
var _width, _height; // size of the screen
var star = []; // shooting star array
var R;
var angle = 0;
var isGravityOn = true;
var min_numOfStar = 5;


var params = {
	numOfStar: 36,
	C_GRAVITY: 50,
	max_distance: 1000, //stars beyond this distance will be removed
	HoldDownSpacebarToAddStar: function () {},

	toggleGravity: function(){
		isGravityOn = !isGravityOn;
		for (var i = 0; i < star.length; i++){
			star[i].repel(attractor);
		}
	},

}

var gui = new dat.gui.GUI();
gui.add(params, 'numOfStar').listen();
gui.add(params, 'C_GRAVITY', 30,60,5);
gui.add(params, 'max_distance', 2000,3600,500);
gui.add(params, 'HoldDownSpacebarToAddStar');
gui.add(params, 'toggleGravity');



function setup(){
	//  ===== cavans setup ==== //
	_width = 500;
	_height = 500;
	createCanvas(_width,_height, WEBGL);

	R = _width/2 + 30;
	// ======= attractor ===== //
	attractor = new Particle(0,0,-600,3);
	// ====== initialize a circle of stars ===== //
	for (var i = 0; i < params.numOfStar; i++){
		if (angle <= 360){
			var x = R * cos(radians(angle));
			var y = R * sin(radians(angle));
		}

		var m = random(0.2,1)
		star[i] = new Particle(x,y,0,m); 
		angle += 360/params.numOfStar;
	}

	params.numOfStar = star.length;

}

function draw(){
	background(0);
	scale(1,-1,1);
	attractor.display();

	for (var i = 0; i < star.length; i++){
		if (isGravityOn){
			star[i].applyAttraction(attractor);
		}
		
		star[i].update();
		star[i].display();

		// check distance, if larger than the max_distance, 
		// then splice the particle from the array 
		if (star[i].checkDistance(attractor) >= params.max_distance) {
			star.splice(i,1);
			params.numOfStar = star.length;
		}
		
	}

	if (keyIsPressed){
		if (params.numOfStar < min_numOfStar){
			angle += 360/min_numOfStar;
			params.numOfStar = star.length;
		} else {
			angle += 360/params.numOfStar;
		}
		var x = R * cos(radians(angle));
		var y = R * sin(radians(angle));
		var m = random(0.2,1);
		star.push(new Particle(x,y,0,m));
		params.numOfStar = star.length;
	}
}



