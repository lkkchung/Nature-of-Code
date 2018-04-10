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

let yum = ["delicious!", "yummy!", "yes, please!", "tasty!"];
let gross = ["gross!", "no, thank you", "eww.", "disgusting.", "barf."];

let delicious;
let isTraining = 0;
let indices = [0, 1, 2, 3, 4, 5, 6];
let bLike;
let bDislike;
let sandwichGo = true;
let sand;

function setup() {
  brain = new NeuralNetwork(3, 6, 2);

  bLike = createButton(random(yum));
  bLike.position(20, 150);
  bLike.mousePressed(isDelicious);

  bDislike = createButton(random(gross));
  bDislike.position(150, 150);
  bDislike.mousePressed(notDelicious);

}

function draw() {
  if (sandwichGo == true){
    sand = makeSandwich();
  }
  
  let sB = sand[0];
  let sI1 = sand[1];
  let sI2 = sand[2];

  createCanvas(200, 600);
  background (255);

  fill(0);


  if(isTraining < 10){

    text("Do you like?", 20, 20);

  } else {
    let sandRec = sandwichPredictor();
    if (sandRec == true){
      text("I recommend this sandwich for you", 20, 20);
    } else {
      text("I don't recommend this sandwich for you", 20, 20);
    }
  }

  text(bases[sB], 20, 40);
  text(ings1[sI1], 20, 60);
  text(ings2[sI2], 20, 80);
  text(bases[sB], 20, 100);

}

function makeSandwich(){
  let sB = random(indices);
  let sI1 = random(indices);
  let sI2 = random(indices);

  sandwichGo = false;

  return [sB, sI1, sI2];
}

function sandwichPrefs(_t) {
  let targets;
  if (_t == true){
    targets = [0, 1];
  } else {
    targets = [1, 0];
  }

  let sB = sand[0];
  let sI1 = sand[1];
  let sI2 = sand[2];

  let inputs = [sB / bases.length, sI1 / ings1.length, sI2 / ings2.length];

  brain.train(inputs, targets);
}

function sandwichPredictor() {
  let trySand = brain.predict(sand);

  if (trySand[1] > trySand[0]){
    return true;
  } else {
    return false;
  }
}

function isDelicious() {
  delicious = true;
  sandwichGo = true;
  sandwichPrefs(delicious);
  isTraining++;
}

function notDelicious() {
  delicious = false;
  sandwichGo = true;
  sandwichPrefs(delicious);
  isTraining++;
}




// // Daniel Shiffman
// // http://codingtra.in

// // Color Predictor
// // https://youtu.be/KtPpoMThKUs

// // Inspired by Jabril's SEFD Science
// // https://youtu.be/KO7W0Qq8yUE
// // https://youtu.be/iN3WAko2rL8

// // pictures found on unsplash.com
// // Photo by Michael Spain on Unsplash
// // Photo by Felix Russell-Saw on Unsplash

// // function pickColor() {
// //   r = random(255);
// //   g = random(255);
// //   b = random(255);
// //   redraw();
// // }

// function setup() {
//   createCanvas(600, 300);
//   noLoop();
//   brain = new NeuralNetwork(pic1.pixels.length, 3, 3);

//   for (let i = 0; i < pic1.height; i++) {
//     for (let j = 0; j < pic1.width; j++) {
//       let offset = int(((i * pic1.width) + j) * 4);
//       let r = pic1.pixels[this.offset];
//       let g = pic1.pixels[this.offset + 1];
//       let b = pic1.pixels[this.offset + 2];

//       let targets = trainColor(r, g, b);
//       let inputs = [r / 255, g / 255, b / 255];
//       brain.train(inputs, targets);
//     }
//   }

//   // pickColor();

// }

// function mousePressed() {
//   let targets;
//   if (mouseX > width / 2) {
//     targets = [0, 1];
//   } else {
//     targets = [1, 0];
//   }
//   let inputs = [r / 255, g / 255, b / 255];

//   brain.train(inputs, targets);


//   // pickColor();
// }


// function colorPredictor(r, g, b) {
//   // console.log(floor(r + g + b));
//   let inputs = [r / 255, g / 255, b / 255];
//   let outputs = brain.predict(inputs);
//   //console.log(outputs);

//   if (outputs[0] > outputs[1]) {
//     return "black";
//   } else {
//     return "white";
//   }

//   // if (r + g + b > 300) {
//   //   return "black";
//   // } else {
//   //   return "white";
//   // }
// }

// function trainColor(r, g, b) {
//   if (r + g + b > (255 * 3) / 2) {
//     return [1, 0];
//   } else {
//     return [0, 1];
//   }
// }


// function draw() {
//   background(r, g, b);
//   strokeWeight(4);
//   stroke(0);
//   line(width / 2, 0, width / 2, height);

//   textSize(64);
//   noStroke();
//   fill(0);
//   textAlign(CENTER, CENTER);
//   text("black", 150, 100);
//   fill(255);
//   text("white", 450, 100);

//   let which = colorPredictor(r, g, b);
//   if (which === "black") {
//     fill(0);
//     ellipse(150, 200, 60);
//   } else {
//     fill(255);
//     ellipse(450, 200, 60);
//   }


// }