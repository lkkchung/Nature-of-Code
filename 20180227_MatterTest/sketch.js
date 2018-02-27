// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;

let mover;

let attractor;

function setup() {
  createCanvas(640, 360);
  mover = new Mover();
  attractor = new Attractor();
  engine = Engine.create();
}

function draw() {
  background(51);

  let force = attractor.calculateAttraction(mover);
  mover.applyForce(force);
  mover.update();

  attractor.display();
  mover.display();
}

function mouseMoved() {
  attractor.handleHover(mouseX, mouseY);
}

function mousePressed() {
  attractor.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  attractor.handleHover(mouseX, mouseY);
  attractor.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}