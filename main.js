let clearButton;
let canvas;

let doodleClassifier;
let resultsDiv;

function setup() {
  canvas = createCanvas(500, 400);
  background(255);

  clearButton = createButton('limpar');
  clearButton.mousePressed(clearCanvas);

  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  resultsDiv = createDiv(`<br /> Carregando, aguarde...`);
}

function modelReady() {
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  let content = results.map(result => `<br /> ${result.label} - ${nf(100 * result.confidence, 2, 1)}%`);

  resultsDiv.html(content);

  doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(16);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
