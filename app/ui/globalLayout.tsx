'use client';

import { PropsWithChildren } from 'react';
import { Roboto_Mono, Source_Serif_4 } from 'next/font/google';
import Footer from './footer';
import '../globals.css';
import { ModalProvider, useModal } from '../hooks/modal-provider';
import { ToastProvider } from '../hooks/toast-povider';
import Modal from './modal';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
});

// Helper to render the modal from context
function GlobalModal() {
  const { modalState, closeModal } = useModal();
  return (
    <Modal
      isOpen={modalState.isOpen}
      onClose={closeModal}
      title={modalState.title}
      content={modalState.content}
      footer={modalState.footer}
      onSuccess={modalState.onSuccess}
      className={modalState.className}
      overlayClassName={modalState.overlayClassName}
      successButtonText={modalState.successButtonText}
      dismissButtonText={modalState.dismissButtonText}
    />
  );
}

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
      className={`h-full ${robotoMono.className} ${sourceSerif.className}`}
    >
      <meta name='apple-mobile-web-app-title' content="Bryan's Archive" />
      <link rel='icon' href='/favicon.ico' sizes='any' />
      <link
        rel='apple-touch-icon'
        href='/apple-icon?<generated>'
        type='image/<generated>'
        sizes='<generated>'
      />
      <body
        className={`min-h-full ${theme} highlight antialiased dark:bg-black dark:text-primary text-black bg-primary`}
      >
        <ToastProvider>
          <ModalProvider>
            <GlobalModal />
            <div className='min-h-screen h-full container mx-auto flex flex-1 flex-col p-8 lg:px-0'>
              <div className='flex-1'>{children}</div>
              <div className='mt-8'>
                <Footer />
              </div>
            </div>
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
