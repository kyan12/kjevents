import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Bebas_Neue, DM_Sans, Geist } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { TransitionProvider } from '@/components/PageTransition/TransitionContext';
import TransitionOverlay from '@/components/PageTransition/TransitionOverlay';
import ThemeColorSync from '@/components/ThemeColorSync';
import SafeAreaTopFill from '@/components/SafeAreaTopFill';
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const helloParis = localFont({
  src: '../public/fonts/hello-paris-serif.ttf',
  variable: '--font-hello-paris',
  display: 'block',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kirajiaevents.com'),
  title: {
    default: 'Kira Jia Events | Refined, Intentional & Deeply Personal',
    template: '%s | Kira Jia Events',
  },
  description: 'Bespoke weddings blending Western elegance, Chinese heritage, and modern fusion storytelling. Curated experiences at every scale.',
  openGraph: {
    type: 'website',
    siteName: 'Kira Jia Events',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: 'transparent',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(helloParis.variable, cormorant.variable, jost.variable, bebas.variable, dmSans.variable, "font-sans", geist.variable)}>
      <body>
        <TransitionProvider>
          <ThemeColorSync />
          <SafeAreaTopFill />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <TransitionOverlay />
        </TransitionProvider>
      </body>
    </html>
  );
}
