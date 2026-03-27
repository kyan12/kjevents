import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Weddings',
  description: 'Bespoke wedding planning blending Western elegance, Chinese heritage, and modern fusion. Every detail, intentionally yours.',
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: 'transparent',
};

export default function WeddingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
