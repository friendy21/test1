import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Navigation from '../components/common/Navigation/Navigation';
import Footer from '../components/common/Footer/Footer';
import '@/styles/reset.css';
import '@/styles/variables.css';  

// Load fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Glynac Workplace Analytics',
    default: 'Glynac Workplace Analytics | AI-Powered Insights for Healthier, More Productive Teams',
  },
  description: 'Glynac transforms workplace data into actionable insights that address critical business challenges, helping organizations improve employee wellbeing and optimize performance.',
  keywords: ['workplace analytics', 'employee wellbeing', 'team performance', 'AI analytics', 'burnout prevention'],
  openGraph: {
    title: 'Glynac Workplace Analytics',
    description: 'Transform your organization\'s understanding of workplace dynamics and drive measurable improvements.',
    url: 'https://glynac.com',
    siteName: 'Glynac',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Glynac Workplace Analytics',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}