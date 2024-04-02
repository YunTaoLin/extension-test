var leave;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let col = {r: random(50, 100), g: random(50,100), b: random(25)};
  let tileSize = random(100, 300);
  let maxI = ceil(width/tileSize) + 1;
  let maxJ = ceil(height/tileSize) + 1;
  
  leave = [];
  for (let i = 0; i < maxI; ++i) {
    leave[i] = [];
    for (let j = 0; j < maxJ; ++ j) {
      let position = {x: (j % 2 == 0 ? tileSize*i : 0.5*tileSize + tileSize*i) + random(-0.1*tileSize, 0.1*tileSize),
                      y: 0.5*tileSize*sqrt(3)*j + random(-0.1*tileSize, 0.1*tileSize)};
      let direction = random(TWO_PI);
      let size = random(0.3*tileSize, 0.4*tileSize);

      leave[i][j] = new Leave(position, direction, col, size);
    }
  }
  
  noFill();
  noLoop();
}

function draw() {
  background("FloralWhite");

  let maxI = leave.length;
  let maxJ = leave[0].length;
  for (let i = 0; i < maxI; ++i) {
    for (let j = 0; j < maxJ; ++ j) {
      leave[i][j].draw();
    }
  } 
}

function mousePressed() {
  setup();
  redraw();
}

class Leave {
  constructor(center, direction, col, size) {
    this.center = center;
    this.direction = direction;
    this.color = col;
    this.size = size;

    this.begin = {x:0, y: this.size};
    this.end = {x: 0, y: -this.size};
    this.d = random(-0.75*this.size, 0.75*this.size);
    this.m = {left: -1.5*this.size + 0.2*this.d,
              right: 1.5*this.size + 0.2*this.d,
              center: this.d,
              up: random(-0.5*this.size,-this.size),
              bottom:random(0.5*this.size, this.size)};
  }

  draw() {
    push();
    translate(this.center.x, this.center.y);
    rotate(this.direction);
    
    // outline
    stroke(this.color.r, this.color.g, this.color.b);
    strokeWeight(0.03*this.size); 
    beginShape();
    vertex(this.begin.x, this.begin.y);
    bezierVertex(this.m.right, this.m.bottom,
                 this.m.center, this.m.up,
                 this.end.x, this.end.y);
    bezierVertex(this.m.center, this.m.up,
                 this.m.left, this.m.bottom,
                 this.begin.x, this.begin.y);
    endShape();

    // petiole
    strokeWeight(0.05*this.size);
    line(this.begin.x, this.begin.y, this.begin.x-0.1*this.d, this.begin.y+0.2*this.size);

    // ribs
    this.ribs("right", 40);
    this.ribs("left", 40);

    pop();
 
  }

  ribs(side, n) {
    for (let i = 0; i < n; ++i) {
      strokeWeight(random(0, 0.01)*this.size);
      stroke(this.color.r, this.color.g, this.color.b, random(255));
      
      let t = random(1);
      let x = bezierPoint(this.begin.x, side == "left" ? this.m.left : this.m.right, this.m.center, this.end.x, t);
      let y = bezierPoint(this.begin.y, this.m.bottom, this.m.up, this.end.y, t);
      bezier(this.begin.x, this.begin.y,
            map(y, this.begin.y, this.end.y, this.begin.x, this.m.center), y,
            x, y,
            x, y);
    }
  }
}