// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Mover {
  constructor() {

    this.r = 80

    this.body = Bodies.rectangle(400, 20, this.r, this.r);
    World.add(engine.world, this.body);
  }

  display() {
    let pos = this.body.position;
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    rectMode(CENTER);
    rect(pos.x, pos.y, this.r, this.r);
  }
  //
  // checkEdges() {
  //   if (this.position.x > width) {
  //     this.position.x = width;
  //     this.velocity.x *= -1;
  //   } else if (this.position.x < 0) {
  //     this.velocity.x *= -1;
  //     this.position.x = 0;
  //   }
  //   if (this.position.y > height) {
  //     this.velocity.y *= -1;
  //     this.position.y = height;
  //   }
  // }
}