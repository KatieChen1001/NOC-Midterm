"use strict"

class Particle {
	constructor(x,y,z,m){
		this.pos = createVector(x,y,z);
		this.vel = createVector(0,0,0);
		this.acc = createVector(0,0,0);
		this.mass = m; 
		this.rad = this.mass * 5;

	}

	applyForce(f){
		f.div(this.mass);
		this.acc.add(f);

	}

	applyAttraction(other){
		var distance = this.pos.dist(other.pos);
		var magnitude = (params.C_GRAVITY * this.mass * other.mass) / (distance);
		var force = p5.Vector.sub(other.pos, this.pos);
		force.normalize();
		force.mult(magnitude);
		this.applyForce(force);
	}

	repel(other){
		var distance = this.pos.dist(other.pos);
		var toggleGravityMagnitude = 10; //how much of a repel to apply to the stars
		var force = p5.Vector.sub(this.pos, other.pos);
		force.normalize();
		force.mult(toggleGravityMagnitude);
		this.applyForce(force);	
	}

	checkDistance(other){
		var distance = other.pos.dist(this.pos);
		// dist(other.pos.x, other.pos.y, other.pos.z, this.pos.x, this.pos.y, this.pos.z);
		return distance;
	}


	update(){
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	display(){
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		noStroke();
		fill(255);
		sphere(this.rad*2);
		pop();
	}




}