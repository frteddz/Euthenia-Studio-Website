import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    let nebulas: Nebula[] = [];
    let elapsed = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();

      const count = Math.min(200, Math.floor((canvas.width * canvas.height) / 5000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        size: Math.random() * 2.5 + 0.3,
        baseAlpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 2 + 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
      }));

      nebulas = [
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.3,
          radius: Math.max(canvas.width, canvas.height) * 0.3,
          color: 'rgba(100, 80, 200, 0.04)',
          vx: 0.02,
          vy: 0.01,
        },
        {
          x: canvas.width * 0.7,
          y: canvas.height * 0.6,
          radius: Math.max(canvas.width, canvas.height) * 0.25,
          color: 'rgba(200, 120, 80, 0.03)',
          vx: -0.015,
          vy: 0.02,
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.2,
          radius: Math.max(canvas.width, canvas.height) * 0.2,
          color: 'rgba(80, 180, 220, 0.025)',
          vx: 0.01,
          vy: -0.015,
        },
      ];
    };

    const draw = (time: number) => {
      elapsed += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const n of nebulas) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -n.radius) n.x = canvas.width + n.radius;
        if (n.x > canvas.width + n.radius) n.x = -n.radius;
        if (n.y < -n.radius) n.y = canvas.height + n.radius;
        if (n.y > canvas.height + n.radius) n.y = -n.radius;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const brightStars: Star[] = [];
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        const twinkle = 0.5 + 0.5 * Math.sin(elapsed * s.twinkleSpeed + s.twinklePhase);
        const alpha = s.baseAlpha * twinkle;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        if (s.baseAlpha > 0.5) {
          brightStars.push(s);
        }
      }

      for (let i = 0; i < brightStars.length; i++) {
        for (let j = i + 1; j < brightStars.length; j++) {
          const dx = brightStars[i].x - brightStars[j].x;
          const dy = brightStars[i].y - brightStars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const lineAlpha = 0.06 * (1 - dist / 180);
            const grad = ctx.createLinearGradient(
              brightStars[i].x, brightStars[i].y,
              brightStars[j].x, brightStars[j].y
            );
            grad.addColorStop(0, `rgba(251, 225, 52, ${lineAlpha * 0.3})`);
            grad.addColorStop(0.5, `rgba(251, 225, 52, ${lineAlpha})`);
            grad.addColorStop(1, `rgba(251, 225, 52, ${lineAlpha * 0.3})`);
            ctx.beginPath();
            ctx.moveTo(brightStars[i].x, brightStars[i].y);
            ctx.lineTo(brightStars[j].x, brightStars[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    init();
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
