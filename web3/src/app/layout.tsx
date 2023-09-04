import type { Metadata } from 'next';
import ReduxProvider from '@/redux/ReduxProvider';
import { Header } from '@/layouts';
import './globals.css';

export const metadata: Metadata = {
  title: 'My wallet',
  description: 'My wallet',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="h-screen flex flex-col items-center justify-between">
        <Header />
        <main className="min-w-[680px] flex-grow flex flex-col items-center gap-8 pt-24">
          <ReduxProvider>{children}</ReduxProvider>
        </main>
      </body>
    </html>
  );
}
