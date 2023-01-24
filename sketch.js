let particles = [];
let repel;
let time = 0;
let size = 1;

function setup() {

  particles = [];
  repel = createVector(-100, height/2+15);
  time = 0;

  const res = 1, h = 200, w = 600;

  createCanvas(max(600, 600 * size), max(200, 200 * size));
  background(0);
  textAlign(CENTER, CENTER);
  textSize(100);
  fill(255);
  stroke(255);
  strokeWeight(4);
  const msg = 'M O N E Y';
  text(msg, w/2, h/2);
  fill(255);
  noStroke();

  for (let i = (h-textAscent())/2; i < (h+textAscent())/2-10; i += res) {
    for (let j = (w-textWidth(msg))/2+4; j < (w+textWidth(msg))/2; j += res) {
      if (red(get(j, i)) > 100) {
        particles.push(new Particle(j, i));
      }
    }
  }
  // print(particles.length);
  // noLoop();
}

let mouse;

function draw() {
  push();
  mouse = createVector(mouseX, mouseY);
  repel.set(-100 + time*15, 200/2+15 - time*0.6);

  background(0);
  scale(size);
  noStroke();
  fill(255);
  for (let p of particles) {
    rect(p.pos.x, p.pos.y, 1, 1);
    p.update();
  }
  pop();
  time ++;
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.spos = this.pos.copy();
    this.vel = createVector();
    this.acc = createVector();
  }

  update() {
    const d2 = p5.Vector.sub(this.pos, this.spos);
    if(d2.magSq() < sq(30)) {
      this.pos.y = lerp(this.pos.y, this.spos.y, 0.1);
      this.pos.x = lerp(this.pos.x, this.spos.x, 0.005);
    }
    
    const d = p5.Vector.sub(this.pos, repel);
    if(d.magSq() < sq(200)) {
      const rq = d.magSq();
      d.normalize();
      d.mult(800);
      d.div(rq);
      d.limit(50);
      this.pos.add(d);
    }
  }
}


function distSq(pos1, pos2) {
  const d = p5.Vector.sub(pos1, pos2);
  return d.x*d.x + d.y*d.y;
}

function keyPressed() {
  setup();
  // loop();
  // saveGif('money-sketch', 100, {units: 'frames', delay: 0});
}