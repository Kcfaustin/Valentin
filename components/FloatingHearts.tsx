
import React, { useEffect, useState } from 'react';

const hearts = ['💖', '❤️', '💕', '💗', '💓', '💘'];

export const FloatingHearts: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; duration: string; content: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          duration: `${4 + Math.random() * 6}s`,
          content: hearts[Math.floor(Math.random() * hearts.length)]
        }
      ]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="heart-particle"
          style={{
            left: p.left,
            animationDuration: p.duration,
          }}
        >
          {p.content}
        </div>
      ))}
    </div>
  );
};
