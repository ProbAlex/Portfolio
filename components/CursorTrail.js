"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];
const PARTICLE_COUNT = 15;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 5;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.life = 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size = Math.max(0, this.size - 0.2);
    this.life -= 1;
  }

  draw(ctx) {
    ctx.globalAlpha = this.life / 100;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const cursor = { x: 0, y: 0, lastX: 0, lastY: 0 };
    const particles = [];
    let animationFrame;

    function resizeCanvas() {
      const section = canvas.parentElement;
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }

    function addParticle(x, y) {
      if (particles.length < PARTICLE_COUNT) {
        particles.push(new Particle(x, y));
      } else {
        particles.shift();
        particles.push(new Particle(x, y));
      }
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        cursor.x = e.clientX - rect.left;
        cursor.y = e.clientY - rect.top;

        if (Math.abs(cursor.x - cursor.lastX) > 5 || Math.abs(cursor.y - cursor.lastY) > 5) {
          addParticle(cursor.x, cursor.y);
          cursor.lastX = cursor.x;
          cursor.lastY = cursor.y;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);

        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      id="cursor-canvas"
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}
