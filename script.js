const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");

const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");

let score = 0;
let gameRunning = true;

// JUMP FUNCTION
function jump() {

  if (!gameRunning) return;

  // Prevent double jump
  if (dino.classList.contains("jump")) return;

  dino.classList.add("jump");

  // PLAY JUMP SOUND
  jumpSound.pause();
  jumpSound.currentTime = 0;
  jumpSound.play();

  setTimeout(() => {

    dino.classList.remove("jump");

  }, 600);
}

// GAME OVER
function gameOver() {

  gameRunning = false;

  // STOP CACTUS
  cactus.style.animation = "none";

  // STOP JUMP SOUND
  jumpSound.pause();
  jumpSound.currentTime = 0;

  // PLAY HIT SOUND ONCE
  hitSound.pause();
  hitSound.currentTime = 0;
  hitSound.play();

  gameOverText.style.display = "block";
}

// RESTART GAME
function restartGame() {

  // STOP ALL SOUNDS
  jumpSound.pause();
  jumpSound.currentTime = 0;

  hitSound.pause();
  hitSound.currentTime = 0;

  // IMPORTANT FIX
  hitSound.load();

  // RESET GAME
  score = 0;

  gameRunning = true;

  scoreText.innerText = "Score: 0";

  gameOverText.style.display = "none";

  // RESET CACTUS ANIMATION
  cactus.style.animation = "none";

  // FORCE REFLOW
  void cactus.offsetWidth;

  cactus.style.animation = "moveCactus 2s linear infinite";
}

// HANDLE INPUT
function handleAction() {

  if (!gameRunning) {

    restartGame();

  } else {

    jump();
  }
}

// PC KEYBOARD
document.addEventListener("keydown", (e) => {

  if (e.code === "Space") {

    e.preventDefault();

    handleAction();
  }
});

// MOBILE TOUCH
document.body.addEventListener("touchstart", (e) => {

  e.preventDefault();

  handleAction();

}, { passive:false });

// CLICK SUPPORT
document.body.addEventListener("click", () => {

  handleAction();

});

// COLLISION CHECK
setInterval(() => {

  if (!gameRunning) return;

  const dinoBottom =
    parseInt(window.getComputedStyle(dino)
    .getPropertyValue("bottom"));

  const cactusLeft =
    parseInt(window.getComputedStyle(cactus)
    .getPropertyValue("left"));

  // HIT DETECTION
  if (cactusLeft < 100 &&
      cactusLeft > 40 &&
      dinoBottom < 50) {

    gameOver();

  } else {

    score++;

    scoreText.innerText = "Score: " + score;
  }

}, 100);