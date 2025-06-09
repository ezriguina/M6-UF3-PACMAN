//mport { updateUserStats, getCurrentUser } from './user.js';

let pacman;
let ghosts = [];
let walls = [];
let dots = [];
let gridSize = 20;
let cols, rows;
let score = 0;
let lives = 3;
let level = 1;

let pacmanMoveDelay = 10;
let ghostMoveDelay = 30;
let frameCounter = 0;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent('game-container');

  cols = width / gridSize;
  rows = height / gridSize;

  initGame();
}

function initGame() {
  walls = [];
  dots = [];
  ghosts = [];
  frameCounter = 0;

  generateMap();

  pacman = new Pacman(1, 1);
  ghosts.push(new Ghost(cols - 2, rows - 2));
}

function draw() {
  background(0);

  drawWalls();
  drawDots();

  if (frameCounter % pacmanMoveDelay === 0) pacman.update();
  pacman.draw();

  for (let ghost of ghosts) {
    if (frameCounter % ghostMoveDelay === 0) ghost.update();
    ghost.draw();
  }

  checkCollisions();
  updateUI();

  if (lives <= 0) gameOver();

  frameCounter++;
}

function generateMap() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1 || (i % 5 === 0 && j % 5 === 0)) {
        walls.push({ x: i, y: j });
      } else {
        dots.push({ x: i, y: j, eaten: false });
      }
    }
  }
}

function updateUI() {
  document.getElementById("score").textContent = score;
  document.getElementById("lives").textContent = lives;
  document.getElementById("level").textContent = level;
}

function gameOver() {
  noLoop();
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
}

// ----------------------
// Clases
// ----------------------

class Pacman {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dirX = 0;
    this.dirY = 0;
  }

  update() {
    let nextX = this.x + this.dirX;
    let nextY = this.y + this.dirY;

    if (!isWall(nextX, nextY)) {
      this.x = nextX;
      this.y = nextY;

      for (let dot of dots) {
        if (!dot.eaten && dot.x === this.x && dot.y === this.y) {
          dot.eaten = true;
          score += 10;
        }
      }

      if (dots.every(dot => dot.eaten)) {
        level++;
        initGame();
      }
    }
  }

  draw() {
    fill(255, 255, 0);
    ellipse(this.x * gridSize + gridSize / 2, this.y * gridSize + gridSize / 2, gridSize * 0.8);
  }

  setDirection(x, y) {
    let nextX = this.x + x;
    let nextY = this.y + y;
    if (!isWall(nextX, nextY)) {
      this.dirX = x;
      this.dirY = y;
    }
  }
}

class Ghost {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    let directions = shuffle([
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ]);

    let bestDir = directions
      .filter(d => !isWall(this.x + d.x, this.y + d.y))
      .sort((a, b) => {
        let da = dist(this.x + a.x, this.y + a.y, pacman.x, pacman.y);
        let db = dist(this.x + b.x, this.y + b.y, pacman.x, pacman.y);
        return da - db;
      })[0];

    if (bestDir) {
      this.x += bestDir.x;
      this.y += bestDir.y;
    }

    this.x = constrain(this.x, 1, cols - 2);
    this.y = constrain(this.y, 1, rows - 2);
  }

  draw() {
    fill(255, 0, 0);
    ellipse(this.x * gridSize + gridSize / 2, this.y * gridSize + gridSize / 2, gridSize * 0.8);
  }
}

// ----------------------
// Utilidades de render
// ----------------------

function drawWalls() {
  fill(0, 0, 255);
  for (let wall of walls) {
    rect(wall.x * gridSize, wall.y * gridSize, gridSize, gridSize);
  }
}

function drawDots() {
  fill(255);
  for (let dot of dots) {
    if (!dot.eaten) {
      ellipse(dot.x * gridSize + gridSize / 2, dot.y * gridSize + gridSize / 2, 5);
    }
  }
}

function isWall(x, y) {
  return walls.some(w => w.x === x && w.y === y);
}

function checkCollisions() {
  for (let ghost of ghosts) {
    if (dist(pacman.x, pacman.y, ghost.x, ghost.y) < 0.5) {
      lives--;
      pacman.x = 1;
      pacman.y = 1;
      pacman.dirX = 0;
      pacman.dirY = 0;
    }
  }
}
/*
function saveGameStats(won) {
  const user = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
  if (!user) return;

  const stats = JSON.parse(localStorage.getItem('stats') || '{}');

  if (!stats[user.id]) {
    stats[user.id] = {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      totalPoints: 0
    };
  }

  stats[user.id].gamesPlayed++;
  stats[user.id].totalPoints += score;
  if (won) {
    stats[user.id].gamesWon++;
  } else {
    stats[user.id].gamesLost++;
  }

  localStorage.setItem('stats', JSON.stringify(stats));
}*/
function saveGameStats(score, won) {
    const user = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
    if (!user) return;

    const stats = JSON.parse(localStorage.getItem('stats') || '{}');

    if (!stats[user.id]) {
        stats[user.id] = {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            totalPoints: 0
        };
    }

    stats[user.id].gamesPlayed++;
    stats[user.id].totalPoints += score;
    if (won) {
        stats[user.id].gamesWon++;
    } else {
        stats[user.id].gamesLost++;
    }

    localStorage.setItem('stats', JSON.stringify(stats));
}

/**
 * Guarda o actualiza el ranking del usuario
 * @param {Object} user - Objeto con los datos del usuario actual
 * @param {number} points - Puntos obtenidos
 */
function updateRanking(user, points) {
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');

    const existing = ranking.find(entry => entry.id === user.id);

    if (existing) {
        // Solo actualizamos si ha superado su récord
        if (points > existing.points) {
            existing.points = points;
        }
    } else {
        ranking.push({ id: user.id, name: user.name, points });
    }

    // Ordenar por puntos descendente
    ranking.sort((a, b) => b.points - a.points);

    localStorage.setItem('ranking', JSON.stringify(ranking));
}
const user = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
const points = score; // Usa tu variable real de puntuación
const hasWon = true;  // O false según tu lógica

if (user) {
    updateRanking(user, points);
}



function gameOver() {
  saveGameStats(false); // Perdida
  noLoop();
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
}



// ----------------------
// Controles
// ----------------------

function keyPressed() {
  if (keyCode === UP_ARROW) pacman.setDirection(0, -1);
  else if (keyCode === DOWN_ARROW) pacman.setDirection(0, 1);
  else if (keyCode === LEFT_ARROW) pacman.setDirection(-1, 0);
  else if (keyCode === RIGHT_ARROW) pacman.setDirection(1, 0);
}
