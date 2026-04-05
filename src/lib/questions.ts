export type QuestionType = 'slider' | 'options';

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  // Slider config
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  unit?: string;
  suffix?: string;
  // Options config
  options?: { label: string; value: string | number }[];
}

export const questions: Question[] = [
  {
    id: 'monthly_leads',
    title: 'How many storm-related leads do you get per month?',
    subtitle: 'Include door knocks, calls, referrals — all of them.',
    type: 'slider',
    min: 10,
    max: 500,
    step: 10,
    defaultValue: 50,
    suffix: ' leads',
  },
  {
    id: 'avg_ticket',
    title: "What's your average job ticket?",
    subtitle: 'Think about your typical completed storm job.',
    type: 'options',
    options: [
      { label: '$2,500 – $5,000', value: 3750 },
      { label: '$5,000 – $10,000', value: 7500 },
      { label: '$10,000 – $25,000', value: 17500 },
      { label: '$25,000+', value: 35000 },
    ],
  },
  {
    id: 'close_rate',
    title: 'What percentage of leads actually become paying customers?',
    subtitle: 'Be honest — most companies close between 15-30%.',
    type: 'slider',
    min: 5,
    max: 80,
    step: 1,
    defaultValue: 25,
    suffix: '%',
  },
  {
    id: 'follow_up_speed',
    title: 'How quickly do you follow up after a storm event?',
    subtitle: 'Speed kills — or in this case, speed closes.',
    type: 'options',
    options: [
      { label: 'Within 1 hour', value: 'within_1_hour' },
      { label: 'Same day', value: 'same_day' },
      { label: 'Next day', value: 'next_day' },
      { label: '2–3 days', value: '2_3_days' },
      { label: 'A week or more', value: 'week_plus' },
    ],
  },
  {
    id: 'automation',
    title: 'Do you have automated follow-up sequences for unconverted leads?',
    subtitle: 'Texts, emails, reminders — anything that runs without you.',
    type: 'options',
    options: [
      { label: 'Yes, fully automated', value: 'full' },
      { label: 'Partially — some manual follow-up', value: 'partial' },
      { label: "No — if they don't answer, we move on", value: 'none' },
    ],
  },
  {
    id: 'tracking',
    title: 'How do you currently track storm leads and job status?',
    subtitle: 'No judgment. We just need to know where you stand.',
    type: 'options',
    options: [
      { label: 'CRM / Software', value: 'crm' },
      { label: 'Spreadsheets', value: 'spreadsheets' },
      { label: 'Paper / Whiteboard', value: 'paper' },
      { label: "It's mostly in my head", value: 'head' },
    ],
  },
];
