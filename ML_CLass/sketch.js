let brain;

function setup() {
  createCanvas(400, 400);
  //let color = colorPredictor(255, 100, 50);

  brain = new NeuralNetwork(3, 3, 2);
  //                      (inputs, number of hidden nodes, outputs)
  let inputs = [1, 0.9, 0.9];
  let outputs = brain.predict(inputs);

  console.log(outputs);

  let targets = [0, 1];
  brain.train(inputs, targets);
  outputs = brain.predict(inputs);

  console.log(outputs[0], outputs[1]);
  //
  // if (outputs[1] > outputs[0]) {
  //   console.log('use white');
  // } else {
  //   console.log('use black');
  // }


}

function colorPredictor(r, g, b) {
  if (r + g + b > 300) {
    return "black";
  }
}