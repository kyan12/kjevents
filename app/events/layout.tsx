import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Corporate events, brand activations, and milestone celebrations. Curated experiences at every scale.',
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
