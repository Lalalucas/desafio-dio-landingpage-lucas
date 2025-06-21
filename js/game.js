class Game {
  constructor(canvasId, scoreId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.scoreElem = document.getElementById(scoreId);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.running = false;
    this.score = 0;
    this.blocks = [];
    this.ralph = {
      x: 50,
      y: this.height - 100,
      width: 50,
      height: 80,
      color: '#e63946',
      dy: 0,
      gravity: 0.8,
      jumpStrength: -15,
      onGround: true
    };
    this.keys = {};
    this.initEvents();
  }

  initEvents() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
    document.getElementById('startBtn').addEventListener('click', () => {
      if(!this.running) this.start();
    });
    document.getElementById('resetBtn').addEventListener('click', () => {
      this.reset();
    });
  }

  start() {
    this.running = true;
    this.score = 0;
    this.blocks = [];
    this.ralph.x = 50;
    this.ralph.y = this.height - 100;
    this.gameLoop();
  }

  reset() {
    this.running = false;
    this.score = 0;
    this.blocks = [];
    this.clearCanvas();
    this.updateScore();
  }

  gameLoop() {
    if(!this.running) return;
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.applyPhysics();
    this.spawnBlocks();
    this.moveBlocks();
    this.checkCollisions();
    this.updateScore();
  }

  applyPhysics() {
    if(this.keys['Space'] && this.ralph.onGround) {
      this.ralph.dy = this.ralph.jumpStrength;
      this.ralph.onGround = false;
    }
    this.ralph.dy += this.ralph.gravity;
    this.ralph.y += this.ralph.dy;
    if(this.ralph.y >= this.height - this.ralph.height) {
      this.ralph.y = this.height - this.ralph.height;
      this.ralph.dy = 0;
      this.ralph.onGround = true;
    }
  }

  spawnBlocks() {
    if(this.blocks.length === 0 || this.blocks[this.blocks.length-1].x < this.width - 200) {
      const blockHeight = 30 + Math.random() * 50;
      this.blocks.push({
        x: this.width,
        y: this.height - blockHeight,
        width: 30,
        height: blockHeight,
        color: '#f1faee'
      });
    }
  }

  moveBlocks() {
    for(let i = this.blocks.length-1; i >= 0; i--) {
      this.blocks[i].x -= 5;
      if(this.blocks[i].x + this.blocks[i].width < 0) {
        this.blocks.splice(i,1);
        this.score++;
      }
    }
  }

  checkCollisions() {
    for(let block of this.blocks) {
      if(this.rectIntersect(this.ralph, block)) {
        this.reset();
        alert('Game Over! Sua pontuação foi: ' + this.score);
        break;
      }
    }
  }

  rectIntersect(r1, r2) {
    return !(r2.x > r1.x + r1.width ||
             r2.x + r2.width < r1.x ||
             r2.y > r1.y + r1.height ||
             r2.y + r2.height < r1.y);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  draw() {
    this.clearCanvas();
    this.drawRalph();
    this.drawBlocks();
  }

  drawRalph() {
    this.ctx.fillStyle = this.ralph.color;
    this.ctx.fillRect(this.ralph.x, this.ralph.y, this.ralph.width, this.ralph.height);
  }

  drawBlocks() {
    for(let block of this.blocks) {
      this.ctx.fillStyle = block.color;
      this.ctx.fillRect(block.x, block.y, block.width, block.height);
    }
  }

  updateScore() {
    this.scoreElem.textContent = this.score;
  }
}

window.onload = () => {
  window.game = new Game('gameCanvas', 'score');
};
