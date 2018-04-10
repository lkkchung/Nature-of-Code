// Daniel Shiffman
// http://codingtra.in

// Color Predictor
// https://youtu.be/KtPpoMThKUs

// Inspired by Jabril's SEFD Science
// https://youtu.be/KO7W0Qq8yUE
// https://youtu.be/iN3WAko2rL8

// pictures found on unsplash.com  
// Photo by Michael Spain on Unsplash
// Photo by Felix Russell-Saw on Unsplash

let r, g, b;
let brain;
let pic1;
let pic2;

let which = "black";

let wButton;
let bButton;

// function pickColor() {
//   r = random(255);
//   g = random(255);
//   b = random(255);
//   redraw();
// }

function preload(){
  pic1 = loadImage("michael-spain-118388-unsplash.jpg");
  pic2 = loadImage("felix-russell-saw-609919-unsplash.jpg");

  pic1.loadPixels();
  pic2.loadPixels();
}

function setup() {
  createCanvas(600, 300);
  noLoop();
  brain = new NeuralNetwork(pic1.pixels.length, 3, 3);

  for (let i = 0; i < pic1.height; i ++) {
    for (let j = 0; j < pic1.width; j ++){
      let offset = int(((i * pic1.width) + j) * 4);
      let r = pic1.pixels[this.offset];
      let g = pic1.pixels[this.offset + 1];
      let b = pic1.pixels[this.offset + 2];

      let targets = trainColor(r, g, b);
      let inputs = [r / 255, g / 255, b / 255];
      brain.train(inputs, targets);
    }
  }

  // pickColor();

}

function mousePressed() {
  let targets;
  if (mouseX > width / 2) {
    targets = [0, 1];
  } else {
    targets = [1, 0];
  }
  let inputs = [r / 255, g / 255, b / 255];
  
  brain.train(inputs, targets);


  // pickColor();
}


function colorPredictor(r, g, b) {
  // console.log(floor(r + g + b));
  let inputs = [r / 255, g / 255, b / 255];
  let outputs = brain.predict(inputs);
  //console.log(outputs);

  if (outputs[0] > outputs[1]) {
    return "black";
  } else {
    return "white";
  }

  // if (r + g + b > 300) {
  //   return "black";
  // } else {
  //   return "white";
  // }
}

function trainColor(r, g, b) {
  if (r + g + b > (255 * 3) / 2) {
    return [1, 0];
  } else {
    return [0, 1];
  }
}


function draw() {
  background(r, g, b);
  strokeWeight(4);
  stroke(0);
  line(width / 2, 0, width / 2, height);

  textSize(64);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("black", 150, 100);
  fill(255);
  text("white", 450, 100);

  let which = colorPredictor(r, g, b);
  if (which === "black") {
    fill(0);
    ellipse(150, 200, 60);
  } else {
    fill(255);
    ellipse(450, 200, 60);
  }


}