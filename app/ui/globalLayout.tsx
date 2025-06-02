'use client';

import { PropsWithChildren } from 'react';
import { Roboto_Mono, Source_Serif_4 } from 'next/font/google';
import Footer from './footer';
import '../globals.css';
import { ModalProvider, useModal } from '../modal-provider';
import Modal from './modal';
import { ToastProvider } from '../toast-povider';

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
      className={`${robotoMono.className} ${sourceSerif.className}`}
    >
      <body
        className={`${theme} antialiased dark:bg-black dark:text-primary text-black bg-primary`}
      >
        <ToastProvider>
          <ModalProvider>
            <GlobalModal />
            <div className='container mx-auto flex flex-col h-full min-h-screen p-8 lg:px-0 w-full max-w-4xl'>
              <div className='flex-1'>{children}</div>
              <div>
                <Footer />
              </div>
            </div>
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
