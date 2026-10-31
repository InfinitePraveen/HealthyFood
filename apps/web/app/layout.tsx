import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HealthyFood | Medically Tailored Meals',
  description: 'A clinically governed meal delivery pilot platform.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
