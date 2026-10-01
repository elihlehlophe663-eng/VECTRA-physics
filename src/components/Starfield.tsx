import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: 'white' | 'blue' | 'warm';
}

interface StarfieldProps {
  density?: number;
  className?: string;
}

const HUE_COLORS: Record<Star['hue'], string> = {
  white: 'rgba(232, 237, 245,',
  blue: 'rgba(159, 184, 232,',
  warm: 'rgba(240, 224, 200,',
};

export function Starfield({ density = 1, className = '' }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      generateStars();
    }

    function generateStars() {
      const area = width * height;
      const count = Math.floor((area / 6000) * density);
      const hues: Star['hue'][] = ['white', 'white', 'white', 'blue', 'blue', 'warm'];
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.2,
        baseOpacity: Math.random() * 0.6 + 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: hues[Math.floor(Math.random() * hues.length)],
      }));
    }

    let time = 0;
    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 1;

      for (const star of stars) {
        const opacity =
          star.baseOpacity + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3;
        const clamped = Math.max(0.05, Math.min(1, opacity));
        const colorBase = HUE_COLORS[star.hue];

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${colorBase} ${clamped})`;
        ctx.fill();

        if (star.radius > 0.8) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${colorBase} ${clamped * 0.08})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(render);
    }

    resize();
    render();

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
