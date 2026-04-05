import { type Answers } from './calculator';

export interface Insight {
  icon: string;
  title: string;
  description: string;
  category: string;
}

export function generateInsights(answers: Answers): Insight[] {
  const insights: Insight[] = [];

  // Follow-up speed insights
  if (answers.follow_up_speed === 'week_plus' || answers.follow_up_speed === '2_3_days') {
    insights.push({
      icon: '⚡',
      title: 'Your Follow-Up Speed Is Costing You Jobs',
      description:
        'Storm leads go cold fast. Companies that follow up within 1 hour close 3x more than those waiting days. Every hour you wait, a competitor is knocking on that door.',
      category: 'speed',
    });
  } else if (answers.follow_up_speed === 'next_day') {
    insights.push({
      icon: '⏰',
      title: 'Next-Day Follow-Up Leaves Money on the Table',
      description:
        'You\'re faster than most, but "next day" in storm season means 3-5 competitors already made contact. Shaving your response to under an hour can boost close rates by 15-20%.',
      category: 'speed',
    });
  } else if (answers.follow_up_speed === 'same_day') {
    insights.push({
      icon: '👍',
      title: 'Good Speed — But There\'s Another Gear',
      description:
        'Same-day follow-up puts you ahead of 60% of competitors. But the top closers respond within 60 minutes. That gap is where the biggest deals live.',
      category: 'speed',
    });
  }

  // Automation insights
  if (answers.automation === 'none') {
    insights.push({
      icon: '🔄',
      title: 'You\'re Losing Leads That Said "Not Yet" — Not "No"',
      description:
        'Without automated follow-up, unconverted leads disappear forever. Industry data shows 35-50% of storm leads convert on the 3rd-7th touch. You\'re stopping at one.',
      category: 'automation',
    });
  } else if (answers.automation === 'partial') {
    insights.push({
      icon: '🤖',
      title: 'Partial Automation = Partial Revenue',
      description:
        'Manual follow-up is better than nothing, but it doesn\'t scale during storm season. When you\'re buried in jobs, those "maybe later" leads slip through the cracks.',
      category: 'automation',
    });
  }

  // Tracking insights
  if (answers.tracking === 'head' || answers.tracking === 'paper') {
    insights.push({
      icon: '📊',
      title: 'If It\'s Not Tracked, It Doesn\'t Exist',
      description:
        answers.tracking === 'head'
          ? 'Running lead tracking in your head means leads fall through the cracks daily. One forgotten callback on a $15K roof job wipes out a week of profit.'
          : 'Paper and whiteboards can\'t send reminders, trigger follow-ups, or show you which leads are going cold. You need systems that work when you\'re on the roof.',
      category: 'tracking',
    });
  } else if (answers.tracking === 'spreadsheets') {
    insights.push({
      icon: '📋',
      title: 'Spreadsheets Don\'t Follow Up For You',
      description:
        'Spreadsheets track data — they don\'t act on it. A CRM with automation can turn your lead list into a closing machine that works 24/7, even when you\'re on a job site.',
      category: 'tracking',
    });
  }

  // Close rate insights
  const closeRate = answers.close_rate / 100;
  if (closeRate < 0.15) {
    insights.push({
      icon: '🎯',
      title: 'Your Close Rate Has Massive Upside',
      description:
        `At ${answers.close_rate}%, you're closing well below the industry average of 35%. This isn't about working harder — it's about speed, follow-up systems, and tracking. Fix those three things and watch this number climb.`,
      category: 'close_rate',
    });
  } else if (closeRate < 0.25) {
    insights.push({
      icon: '📈',
      title: 'Close Rate Below Industry Average',
      description:
        `You're at ${answers.close_rate}% — the industry benchmark with proper systems is 35%. That gap represents thousands in revenue per month. Small improvements in your process can close it.`,
      category: 'close_rate',
    });
  }

  // Always ensure at least 3 insights
  if (insights.length < 3 && answers.follow_up_speed === 'within_1_hour') {
    insights.push({
      icon: '🏆',
      title: 'Your Speed Is a Competitive Advantage',
      description:
        'Responding within an hour puts you in the top 10% of storm restoration companies. Pair this with automated nurture sequences and you\'ll dominate your market.',
      category: 'speed',
    });
  }

  if (insights.length < 3 && answers.automation === 'full') {
    insights.push({
      icon: '✅',
      title: 'Automation Is Working For You',
      description:
        'Fully automated follow-up means you\'re recapturing leads that most competitors lose. Make sure your sequences are optimized — even small copy tweaks can boost conversions 10-15%.',
      category: 'automation',
    });
  }

  if (insights.length < 3 && answers.tracking === 'crm') {
    insights.push({
      icon: '💪',
      title: 'Your CRM Is Your Secret Weapon',
      description:
        'Having a CRM puts you ahead of 70% of storm restoration companies. Make sure it\'s integrated with your follow-up automation for maximum impact.',
      category: 'tracking',
    });
  }

  // Fallback if still < 3
  if (insights.length < 3) {
    insights.push({
      icon: '💰',
      title: 'Revenue Recovery Starts With Systems',
      description:
        'The highest-performing storm restoration companies share one thing: systems that run without them. Speed, automation, and tracking — nail those three and revenue follows.',
      category: 'general',
    });
  }

  return insights.slice(0, 3);
}
