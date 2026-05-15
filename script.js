const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");

const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");

let score = 0;
let gameRunning = true;

// Jump Function
function jump() {

  if (!gameRunning) return;

  // Prevent double jump
  if (!dino.classList.contains("jump")) {

    dino.classList.add("jump");

    // Jump sound
    jumpSound.pause();
    jumpSound.currentTime = 0;
    jumpSound.play();

    setTimeout(() => {
      dino.classList.remove("jump");
    }, 600);
  }
}

// Restart Game
function restartGame() {

  score = 0;
  gameRunning = true;

  scoreText.innerText = "Score: 0";

  cactus.style.animation = "moveCactus 2s linear infinite";

  gameOverText.style.display = "none";
}

// Handle Action (Jump / Restart)
function handleAction() {

  if (!gameRunning) {
    restartGame();
  } else {
    jump();
  }
}

// PC Keyboard Support
document.addEventListener("keydown", (e) => {

  if (e.code === "Space") {

    e.preventDefault();

    handleAction();
  }
});

// Mobile Touch Support
document.addEventListener("touchstart", () => {

  handleAction();

});

// Collision Detection
let checkCollision = setInterval(() => {

  if (!gameRunning) return;

  const dinoTop =
    parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

  const cactusLeft =
    parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  // Collision Detection
  if (cactusLeft < 100 && cactusLeft > 40 && dinoTop < 50) {

    gameOver();

  } else {

    score++;

    scoreText.innerText = "Score: " + score;
  }

}, 100);

// Game Over
function gameOver() {

  gameRunning = false;

  cactus.style.animation = "none";

  // Stop jump sound
  jumpSound.pause();
  jumpSound.currentTime = 0;

  // Play hit sound
  hitSound.currentTime = 0;
  hitSound.play();

  gameOverText.style.display = "block";
}