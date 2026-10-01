// Floating Golden Dust Particle Canvas to give a rich, living video feel
const canvas = document.getElementById('motionCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class GoldParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2.2 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.45;
      this.speedY = -Math.random() * 0.6 - 0.2; // flows smoothly upwards
      this.alpha = Math.random() * 0.6 + 0.2;
      this.fade = Math.random() * 0.005 + 0.002;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= this.fade;
      if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
        this.y = height + 10;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#d4af37';
      ctx.fill();
    }
  }

  const particleCount = window.innerWidth < 768 ? 40 : 85;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new GoldParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Fallback utility for images (.jpeg to .jpg)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", function() {
      if (this.src.endsWith(".jpeg")) {
        this.src = this.src.replace(".jpeg", ".jpg");
      }
    });
  });
});