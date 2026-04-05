'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface LeadCaptureProps {
  onSubmit: (data: LeadData) => void;
}

export interface LeadData {
  name: string;
  email: string;
  company: string;
  phone: string;
}

export default function LeadCapture({ onSubmit }: LeadCaptureProps) {
  const [form, setForm] = useState<LeadData>({
    name: '',
    email: '',
    company: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const isValid = form.name.trim() && form.email.trim() && form.company.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    // POST to webhook if configured
    const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } catch (err) {
        console.error('Webhook error:', err);
      }
    } else {
      console.log('Lead captured:', form);
    }

    setLoading(false);
    onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
          <span className="text-blue-400 text-sm font-medium">✨ Your results are ready</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Where should we send your report?
        </h2>
        <p className="text-slate-400">
          Enter your details to unlock your Storm Revenue Recovery Score and see exactly how much you&apos;re leaving on the table.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-5 py-4 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-5 py-4 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Company Name *"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full px-5 py-4 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            required
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-5 py-4 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        <motion.button
          type="submit"
          disabled={!isValid || loading}
          className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold text-lg rounded-xl transition-colors"
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Calculating...
            </span>
          ) : (
            'Reveal My Revenue Gap →'
          )}
        </motion.button>

        <p className="text-center text-xs text-slate-500 mt-3">
          🔒 Your info is private. No spam, ever.
        </p>
      </form>
    </motion.div>
  );
}
