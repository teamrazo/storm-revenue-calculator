'use client';

import { motion } from 'framer-motion';

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;

  const getColor = () => {
    if (score >= 70) return '#22c55e';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getLabel = () => {
    if (score >= 70) return 'Strong';
    if (score >= 40) return 'Needs Work';
    return 'Critical';
  };

  const color = getColor();

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 md:w-56 md:h-56">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(30, 58, 95, 0.5)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            style={{
              filter: `drop-shadow(0 0 8px ${color}80)`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-5xl md:text-6xl font-bold"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {score}
          </motion.span>
          <span className="text-sm text-slate-400 mt-1">out of 100</span>
        </div>
      </div>
      <motion.div
        className="mt-4 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide"
        style={{ backgroundColor: `${color}20`, color }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {getLabel()}
      </motion.div>
    </div>
  );
}
