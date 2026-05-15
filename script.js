// Game Over
function gameOver() {

  gameRunning = false;

  cactus.style.animation = "none";

  // Stop jump sound completely
  jumpSound.pause();
  jumpSound.currentTime = 0;

  // Stop hit sound before replaying
  hitSound.pause();
  hitSound.currentTime = 0;

  // Play hit sound once
  hitSound.play();

  gameOverText.style.display = "block";
}

// Restart Game
function restartGame() {

  // Stop ALL sounds on restart
  jumpSound.pause();
  jumpSound.currentTime = 0;

  hitSound.pause();
  hitSound.currentTime = 0;

  score = 0;

  gameRunning = true;

  scoreText.innerText = "Score: 0";

  gameOverText.style.display = "none";

  // Restart cactus animation properly
  cactus.style.animation = "none";

  // Force reflow
  cactus.offsetHeight;

  cactus.style.animation = "moveCactus 2s linear infinite";
}