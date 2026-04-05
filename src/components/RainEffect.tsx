'use client';

import { useEffect, useState } from 'react';

interface Raindrop {
  id: number;
  left: number;
  height: number;
  duration: number;
  delay: number;
}

export default function RainEffect() {
  const [drops, setDrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const raindrops: Raindrop[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      height: 15 + Math.random() * 25,
      duration: 1.5 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
    setDrops(raindrops);
  }, []);

  return (
    <>
      <div className="rain-container">
        {drops.map((drop) => (
          <div
            key={drop.id}
            className="raindrop"
            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="lightning-overlay" />
    </>
  );
}
