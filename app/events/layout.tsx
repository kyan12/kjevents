import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Corporate events, brand activations, and milestone celebrations. Curated experiences at every scale.',
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#363830',
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
