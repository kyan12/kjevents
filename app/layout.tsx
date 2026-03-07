import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const helloParis = localFont({
  src: '../public/fonts/hello-paris-serif.ttf',
  variable: '--font-hello-paris',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
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
    <html lang="en" className={`${helloParis.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
