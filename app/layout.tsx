import type {Metadata} from 'next';
import { Nunito } from 'next/font/google';
import './globals.css'; // Global styles
import LiveChat from '@/components/LiveChat';

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito'
});

export const metadata: Metadata = {
  title: 'PREMDIGITAL | Premium Apps & Secure VPN',
  description: 'Access pro-tier applications and enterprise-grade VPN tunneling.',
  openGraph: {
    title: 'PREMDIGITAL | Premium Apps & Secure VPN',
    description: 'Access pro-tier applications and enterprise-grade VPN tunneling.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PREMDIGITAL | Premium Apps & Secure VPN',
    description: 'Access pro-tier applications and enterprise-grade VPN tunneling.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  // Trigger github sync
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${nunito.variable} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 selection:bg-sky-500/30 antialiased`} suppressHydrationWarning>
        {children}
        <LiveChat />
      </body>
    </html>
  );
}
