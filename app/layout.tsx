import type { Metadata } from 'next';
import { Roboto_Mono, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import Footer from './ui/footer';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
});

export const metadata: Metadata = {
  title: "Bryan's Archive",
  description: "Bryan's home for music related stuff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${robotoMono.variable} ${sourceSerif.variable} antialiased dark`}
      >
        <div className='container mx-auto flex flex-col h-full min-h-screen p-8 lg:px-0 w-full max-w-4xl'>
          <div className='flex-1'>{children}</div>
          <div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
