"use strict";

class Box {
	constructor(degrees){
		this.degree = degrees
	}
	
	drawBox(x,y,z,s){
		push();
		translate(x,y,z);
		box(s);
		pop();
	}

	drawSphere(){
		// 
		rotateY(radians(this.degree));
	}


}