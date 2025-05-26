import { PropsWithChildren } from 'react';
import { Roboto_Mono, Source_Serif_4 } from 'next/font/google';
import Footer from './ui/footer';
import './globals.css';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
});

export default function GlobalLayout({
  darkMode = false,
  children,
}: PropsWithChildren<{
  darkMode?: boolean;
}>) {
  const theme = darkMode ? 'dark' : 'light';
  return (
    <html
      lang='en'
      className={`${robotoMono.className} ${sourceSerif.className}`}
    >
      <body
        className={` ${theme} antialiased dark:bg-black dark:text-primary text-black bg-primary`}
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
