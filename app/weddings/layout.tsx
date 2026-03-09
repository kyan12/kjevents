import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weddings',
  description: 'Bespoke wedding planning blending Western elegance, Chinese heritage, and modern fusion. Every detail, intentionally yours.',
};

export default function WeddingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
