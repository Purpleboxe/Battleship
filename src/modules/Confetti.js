const confetti = require('canvas-confetti');

function Confetti() {
  const canvas = document.createElement('canvas');
  const confettiCanvas = document.querySelector('.confettiCanvas');
  const createConfetti = confetti.create(canvas);

  canvas.classList.add('canvas');

  canvas.width = 800;
  canvas.height = 800;
  confettiCanvas.appendChild(canvas);
  createConfetti({
    particleCount: 200,
    spread: 200,
    gravity: 2,
  }).then(() => confettiCanvas.removeChild(canvas));
}

module.exports = Confetti;
