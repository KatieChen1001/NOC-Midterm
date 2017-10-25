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
		var magnitude = (C_GRAVITY * this.mass * other.mass) / (distance);
		// var magnitude = map(mag,0.2,0.01,0.5,1);
		var force = p5.Vector.sub(other.pos, this.pos);
		force.normalize();
		force.mult(magnitude);
		this.applyForce(force);
	}

	reset(){
		this.vel.mult(0);
		this.acc.mult(0);
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