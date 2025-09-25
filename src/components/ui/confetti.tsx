import { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
  intensity?: number;
  colors?: string[];
}

export function Confetti({
  active,
  duration = 3000,
  intensity = 15,
  colors = ['#a855f7', '#ec4899', '#06b6d4', '#10b981', '#f59e0b']
}: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    color: string;
    delay: number;
    left: string;
    size: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: intensity }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 1000,
        left: `${10 + Math.random() * 80}%`,
        size: Math.random() * 3 + 2,
        duration: 2000 + Math.random() * 2000,
      }));

      setParticles(newParticles);

      // Clear particles after duration
      const timeout = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [active, duration, intensity, colors]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            backgroundColor: particle.color,
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: '-10px',
            animationDelay: `${particle.delay}ms`,
            animationDuration: `${particle.duration}ms`,
          }}
        />
      ))}
    </div>
  );
}