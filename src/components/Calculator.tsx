'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { questions } from '@/lib/questions';
import { calculateResults, type Answers } from '@/lib/calculator';
import { generateInsights } from '@/lib/insights';
import ProgressBar from './ProgressBar';
import Question from './Question';
import LeadCapture, { type LeadData } from './LeadCapture';
import Results from './Results';
import RainEffect from './RainEffect';

type Step = 'questions' | 'capture' | 'results';

export default function Calculator() {
  const [step, setStep] = useState<Step>('questions');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});

  const handleAnswer = useCallback(
    (value: number | string) => {
      const question = questions[currentQuestion];
      const newAnswers = { ...answers, [question.id]: value };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setStep('capture');
      }
    },
    [currentQuestion, answers]
  );

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleLeadSubmit = (data: LeadData) => {
    // Merge lead data with answers for webhook
    const payload = { ...data, answers, timestamp: new Date().toISOString() };
    const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(console.error);
    } else {
      console.log('Full lead payload:', payload);
    }
    setStep('results');
  };

  const result = calculateResults(answers as unknown as Answers);
  const insights = generateInsights(answers as unknown as Answers);

  return (
    <div className="min-h-screen relative">
      <RainEffect />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-6 pb-4 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <span className="text-white font-semibold text-sm hidden sm:inline">
                Storm Revenue Calculator
              </span>
            </div>
            {step === 'questions' && currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center px-4 py-8">
          <div className="w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {step === 'questions' && (
                <motion.div
                  key={`question-${currentQuestion}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProgressBar current={currentQuestion} total={questions.length} />
                  <Question
                    question={questions[currentQuestion]}
                    value={answers[questions[currentQuestion].id]}
                    onAnswer={handleAnswer}
                  />
                </motion.div>
              )}

              {step === 'capture' && (
                <motion.div
                  key="capture"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <LeadCapture onSubmit={handleLeadSubmit} />
                </motion.div>
              )}

              {step === 'results' && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Results result={result} insights={insights} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 text-center">
          <p className="text-xs text-slate-600">
            Powered by{' '}
            <a
              href="https://razorsharpnetworks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
            >
              RazoRSharp Networks
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
