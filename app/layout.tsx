import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost, Bebas_Neue, DM_Sans, Geist } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const helloParis = localFont({
  src: '../public/fonts/hello-paris-serif.ttf',
  variable: '--font-hello-paris',
  display: 'swap',
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
  title: 'Kira Jia Events | Refined, Intentional & Deeply Personal',
  description: 'Bespoke weddings blending Western elegance, Chinese heritage, and modern fusion storytelling. Curated experiences at every scale.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(helloParis.variable, cormorant.variable, jost.variable, bebas.variable, dmSans.variable, "font-sans", geist.variable)}>
      <body className="font-sans antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
