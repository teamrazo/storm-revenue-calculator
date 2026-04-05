'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Question as QuestionType } from '@/lib/questions';

interface QuestionProps {
  question: QuestionType;
  value: number | string | undefined;
  onAnswer: (value: number | string) => void;
}

export default function Question({ question, value, onAnswer }: QuestionProps) {
  const [sliderValue, setSliderValue] = useState<number>(
    typeof value === 'number' ? value : (question.defaultValue ?? question.min ?? 0)
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
  };

  const handleSliderCommit = () => {
    onAnswer(sliderValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
        {question.title}
      </h2>
      {question.subtitle && (
        <p className="text-slate-400 mb-8 text-base md:text-lg">{question.subtitle}</p>
      )}

      {question.type === 'slider' && (
        <div className="mt-8">
          <div className="text-center mb-6">
            <span className="text-5xl md:text-6xl font-bold text-blue-400 glow-text tabular-nums">
              {sliderValue >= (question.max ?? 500) ? `${sliderValue}+` : sliderValue}
            </span>
            {question.suffix && (
              <span className="text-xl text-slate-400 ml-1">{question.suffix}</span>
            )}
          </div>
          <input
            type="range"
            min={question.min}
            max={question.max}
            step={question.step}
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseUp={handleSliderCommit}
            onTouchEnd={handleSliderCommit}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-slate-500">
            <span>{question.min}{question.suffix}</span>
            <span>{question.max}+{question.suffix}</span>
          </div>
          <motion.button
            onClick={() => onAnswer(sliderValue)}
            className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-xl transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue →
          </motion.button>
        </div>
      )}

      {question.type === 'options' && (
        <div className="mt-6 space-y-3">
          {question.options?.map((option) => {
            const isSelected = value === option.value;
            return (
              <motion.button
                key={String(option.value)}
                onClick={() => onAnswer(option.value)}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all text-base md:text-lg font-medium ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-blue-500/50 hover:bg-slate-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.label}
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
