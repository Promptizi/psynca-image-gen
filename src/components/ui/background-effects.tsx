import { useEffect, useState } from 'react';

interface BackgroundEffectsProps {
  variant?: 'subtle' | 'celebration' | 'generating';
  active?: boolean;
}

export function BackgroundEffects({ variant = 'subtle', active = true }: BackgroundEffectsProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    let particleCount = 0;
    let colors: string[] = [];

    switch (variant) {
      case 'celebration':
        particleCount = 12;
        colors = ['#6f41b4', '#a687d4', '#06b6d4', '#10b981', '#f59e0b'];
        break;
      case 'generating':
        particleCount = 8;
        colors = ['#a687d4', '#8a61c7', '#6f41b4'];
        break;
      case 'subtle':
      default:
        particleCount = 5;
        colors = ['#a687d4', '#8a61c7'];
        break;
    }

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2000,
      duration: 3000 + Math.random() * 4000,
    }));

    setParticles(newParticles);
  }, [variant, active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-20 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}ms`,
            animationDuration: `${particle.duration}ms`,
          }}
        />
      ))}

      {/* Subtle gradient overlay for depth */}
      {variant === 'celebration' && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#a687d4]/5 animate-pulse" />
      )}
    </div>
  );
}
