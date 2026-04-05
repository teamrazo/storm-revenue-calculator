'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-brand-muted">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-semibold text-brand-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-2 bg-brand-card rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #A83AC4, #C45FE0, #A83AC4)',
            backgroundSize: '200% 100%',
          }}
          initial={{ width: 0 }}
          animate={{
            width: `${progress}%`,
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            width: { duration: 0.5, ease: 'easeOut' },
            backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
          }}
        />
      </div>
    </div>
  );
}
