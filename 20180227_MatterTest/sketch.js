// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Vector = Matter.Vector;

let mover;

let attractor;
let engine;
let world;

let bottom;

function setup() {
  let options = {

  }
  createCanvas(640, 360);
  engine = Engine.create();
  world = engine.world;
  // engine.run(engine);

  mover = new Mover();
  attractor = new Attractor();

  let bOptions = {
    isStatic: true
  }
  ground = Bodies.rectangle(width / 2, height, width, 1, bOptions);
  World.add(world, ground);

}

function draw() {
  background(51);

  Engine.run(engine);

  // let force = attractor.calculateAttraction(mover);
  // mover.applyForce(force);
  // mover.update();
  //
  // attractor.display();
  mover.display();

  if (mouseIsPressed) {
    let wind = Vector.create(0, -1);
    mover.applyForce(wind);
  }
}

// function mouseMoved() {
//   attractor.handleHover(mouseX, mouseY);
// }
//
// function mousePressed() {
//   attractor.handlePress(mouseX, mouseY);
// }
//
// function mouseDragged() {
//   attractor.handleHover(mouseX, mouseY);
//   attractor.handleDrag(mouseX, mouseY);
// }
//
// function mouseReleased() {
//   attractor.stopDragging();
// }