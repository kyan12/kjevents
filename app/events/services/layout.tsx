import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Services',
  description: 'Full suite of event services: private events, cultural productions, corporate conferences, product launches, galas, and executive retreats.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
