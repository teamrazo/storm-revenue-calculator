import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Storm Revenue Recovery Calculator | How Much Are You Leaving on the Table?',
  description:
    '6 questions. 90 seconds. See the exact dollar amount your storm restoration business is missing after every storm event.',
  keywords: [
    'storm restoration',
    'hail repair',
    'roofing leads',
    'revenue calculator',
    'storm damage',
    'restoration business',
  ],
  openGraph: {
    title: 'Storm Revenue Recovery Calculator',
    description:
      'How much revenue are you leaving on the table after every storm? Find out in 90 seconds.',
    type: 'website',
    siteName: 'RazoRSharp Networks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storm Revenue Recovery Calculator',
    description:
      'How much revenue are you leaving on the table after every storm? Find out in 90 seconds.',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0A0A0F" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
