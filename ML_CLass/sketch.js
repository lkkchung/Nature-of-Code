let brain;

let bases = ["kaiser roll", "brioche bun", "wonder bread", "cookie",
  "focaccia", "hero", "whole weat bread"
];

let ings1 = ["ham", "roast beef", "peanut butter", "bologna", "chocolate ice cream",
  "hamburger", "veggie burger"
];
let ings2 = ["cheddar", "swiss cheese", "strawberry jelly", "mayonnaise",
  "vanilla ice cream", "arugula", "ketchup"
];

let delicious;
let isTraining = true;
let indices = [0, 1, 2, 3, 4, 5, 6, 7];
let bLike;
let bDislike;

function setup() {
  brain = new NeuralNetwork(3, 6, 3);

  bLike = createButton('👍');
  bLike.position(20, 150);
  bLike.mousePressed(isDelicious);

  bDislike = createButton('👎');
  bDislike.position(100, 150);
  bDislike.mousePressed(notDelicious);

}

function draw() {
  createCanvas(600, 600);
  let sB = random(indices);
  let sI1 = random(indices);
  let sI2 = random(indices);

  text("Is this delicious?", 20, 20);

  text(20, 40, bases[sB]);
  text(20, 60, ings1[sI1]);
  text(20, 80, ings2[sI2]);


  if (isTraining == true) {
    sandwichPrefs(sB, sI1, sI2);
  } else {
    sandwichPredictor();
  }

}

function sandwichPrefs() {

  for (let i = 0; i < 10; i++) {
    let sB = random(indices);
    let sI1 = random(indices);
    let sI2 = random(indices);

    let inputs = [sB / bases.length, sI1 / ings1.length, sI2 / ings2.length];

    brain.train(inputs, targets);
  }
}

function sandwichPredictor() {

}

function isDelicious() {
  delicious == true;
  sandwichPrefs(true);
}

function notDelicious() {
  delicious == false;
  sandwichPrefs(false);
}




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

// function pickColor() {
//   r = random(255);
//   g = random(255);
//   b = random(255);
//   redraw();
// }

function setup() {
  createCanvas(600, 300);
  noLoop();
  brain = new NeuralNetwork(pic1.pixels.length, 3, 3);

  for (let i = 0; i < pic1.height; i++) {
    for (let j = 0; j < pic1.width; j++) {
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