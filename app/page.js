"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const WARP_DURATION_MS = 1300;
const STAR_COUNT = 180;

function runWarpAnimation(canvas, onDone) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const cx = w / 2;
  const cy = h / 2;

  const stars = Array.from({ length: STAR_COUNT }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * 30,
    speed: 1.5 + Math.random() * 2.5,
  }));

  const start = performance.now();
  let frameId;

  function frame(now) {
    const elapsed = now - start;
    const t = Math.min(elapsed / WARP_DURATION_MS, 1);

    // Progressively fade everything to black: the "blasting into space" wash.
    ctx.fillStyle = `rgba(0, 0, 0, ${0.12 + t * 0.55})`;
    ctx.fillRect(0, 0, w, h);

    for (const star of stars) {
      const prevRadius = star.radius;
      star.speed *= 1.025 + t * 0.06;
      star.radius += star.speed;

      const x1 = cx + Math.cos(star.angle) * prevRadius;
      const y1 = cy + Math.sin(star.angle) * prevRadius;
      const x2 = cx + Math.cos(star.angle) * star.radius;
      const y2 = cy + Math.sin(star.angle) * star.radius;

      ctx.strokeStyle = `rgba(224, 236, 255, ${0.55 + t * 0.4})`;
      ctx.lineWidth = 1 + t * 2.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    if (elapsed < WARP_DURATION_MS) {
      frameId = requestAnimationFrame(frame);
    } else {
      onDone();
    }
  }

  frameId = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(frameId);
}

export default function LandingPage() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [warping, setWarping] = useState(false);
  const stopRef = useRef(null);

  useEffect(() => {
    router.prefetch("/home");
  }, [router]);

  const launch = useCallback(() => {
    if (warping) return;
    setWarping(true);
  }, [warping]);

  useEffect(() => {
    if (!warping) return;
    stopRef.current = runWarpAnimation(canvasRef.current, () => {
      router.push("/home");
    });
    return () => stopRef.current?.();
  }, [warping, router]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Enter") launch();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [launch]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[linear-gradient(135deg,#1f2937_0%,#111827_100%)] text-white">
      <div
        className={`flex h-full w-full flex-col items-center justify-center transition-all duration-700 ease-in ${
          warping ? "scale-90 opacity-0 blur-sm" : "scale-100 opacity-100"
        }`}
      >
        <div className="mb-12 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="block">Alexander</span>
            <span className="block">Dial</span>
          </h1>
          <p className="text-xl text-gray-300 mt-4">Portfolio</p>
        </div>

        <button
          type="button"
          onClick={launch}
          className="enter-button bg-dark border-2 border-primary rounded-lg px-12 py-4 text-xl font-bold shadow-sparkle-blue"
        >
          Enter
        </button>
        <p className="mt-4 text-sm text-gray-500">or press Enter</p>
      </div>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
