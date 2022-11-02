function fxRandom(from = 0, to = 1) {
  // 可以傳或不傳參數，如果不傳，預設 from = 0, to = 1
  let diff = to - from;
  return from + fxrand() * diff;
}

let _draw;
let _drawWidth = 1600;
let _drawHeight = 2400;

let _canvasWidth = 0;
let _canvasHeight = 0;

function processCanvas() {
  let _drawRatio = _drawWidth / _drawHeight;
  let _windowRatio = windowWidth / windowHeight;
  if (_windowRatio > _drawRatio) {
    _canvasHeight = windowHeight;
    _canvasWidth = _canvasHeight * _drawRatio;
  } else {
    _canvasWidth = windowWidth;
    _canvasHeight = _canvasWidth / _drawRatio;
  }
}

function setup() {
  fxhash = "ooFojhyq8epd1nyEUMTnxciC9ZMSmVvsKVyhogPrDSGDNR1z7HJ";
  console.log(fxhash); // 若沒有指定則隨機產生

  let mainHue = fxRandom(0, 360);
  let backLines = fxRandom(1000, 20000);
  window.$fshashFeatures = {
    Color: mainHue,
    "Back Lines": backLines,
  };

  noiseSeed(fxRandom(-10000, 10000));

  console.log(fxrand);
  console.log(fxrand());
  console.log(fxRandom(2, 200));
  console.log(fxRandom(2, 200));

  processCanvas();
  createCanvas(_canvasWidth, _canvasHeight);
  background(250);

  _draw = createGraphics(_drawWidth, _drawHeight);

  let baseHue = fxRandom(0, 360);
  let noiseScale = fxRandom(0.0001, 0.01);
  console.log("noise Scale: " + noiseScale);

  // stroke lines
  for (let i = 0; i < 2000; i++) {
    let xPos = fxRandom(0, _drawWidth);
    let yPos = fxRandom(0, _drawHeight);

    let lineHeight = fxRandom(0.001, 0.03) * _drawHeight;

    _draw.colorMode(HSB);
    _draw.blendMode(ADD);
    let hue = baseHue + fxRandom(-30, 30);
    let sat = fxRandom(30, 80);
    let bright = fxRandom(60, 100);

    _draw.stroke(hue, sat, bright, 0.6);
    _draw.fill(hue, sat, bright, 0.3);

    _draw.strokeWeight(fxRandom(1, 3));

    let rotAngle = noise(xPos * noiseScale, yPos * noiseScale) * 180 + 90;

    _draw.push();

    _draw.translate(xPos, yPos);
    _draw.rotate(radians(rotAngle));
    _draw.line(0, -0.5 * lineHeight, 0, 0.5 * lineHeight);

    _draw.pop();
  }

  // rects
  for (let i = 0; i < 600; i++) {
    let xPos = fxRandom(0, _drawWidth);
    let yPos = fxRandom(0, _drawHeight);

    let rectWidth = fxRandom(0.01, 0.15) * _drawWidth;
    let rectHeight = fxRandom(0.2, 0.6) * rectWidth;

    _draw.colorMode(HSB);
    _draw.blendMode(ADD);
    let hue = baseHue + fxRandom(-30, 30);
    let sat = fxRandom(30, 80);
    let bright = fxRandom(60, 100);

    _draw.stroke(hue, sat, bright, 0.6);
    _draw.fill(hue, sat, bright, 0.3);

    _draw.strokeWeight(2);

    let rotAngle = noise(xPos * noiseScale, yPos * noiseScale) * 180;

    _draw.push();

    _draw.translate(xPos, yPos);
    _draw.rotate(radians(rotAngle));
    _draw.rect(-0.5 * rectWidth, -0.5 * rectHeight, rectWidth, rectHeight);
    // circle(0, 0, rectWidth);

    _draw.pop();
  }
  image(_draw, 0, 0, _canvasWidth, _canvasHeight);
}

function draw() {}
