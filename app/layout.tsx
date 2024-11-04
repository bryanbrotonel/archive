import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from './ui/footer';

const robotoMono = localFont({
  src: './fonts/RobotoMonoVF.ttf',
  variable: '--font-roboto-mono',
  weight: '400 500 600 700',
});

const sourceSerif = localFont({
  src: './fonts/SourceSerif4VF.ttf',
  variable: '--font-source-serif',
  weight: '400 500 600 700',
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
