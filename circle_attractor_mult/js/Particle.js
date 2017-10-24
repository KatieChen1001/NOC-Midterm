"use strict";

class Particle {
  constructor() {
    this.pos = createVector();
    this.angle = random(2 * PI);
    this.R = random(80, 300);
    this.r = random(1, 8);
  }

  location(x, y) {
    translate(x, y);
  }

  update() {
    this.angle += 0.01;
  }
  display() {
    this.pos.x = cos(this.angle) * this.R;
    this.pos.y = sin(this.angle) * this.R;
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}