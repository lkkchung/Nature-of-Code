let brain;

function setup() {
  createCanvas(400, 400);
  //let color = colorPredictor(255, 100, 50);

  brain = new NeuralNetwork(3, 3, 2);

  let inputs = [1, 0.5, 0.20];
  let outputs = brain.predict(inputs);

  console.log(outputs);
}

function colorPredictor(r, g, b) {
  if (r + g + b > 300) {
    return "black";
  }
}