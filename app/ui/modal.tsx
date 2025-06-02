'use client';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  onSuccess?: () => void;
  successButtonText?: string;
  dismissButtonText?: string;
  className?: string;
  overlayClassName?: string;
}

export default function Modal(props: ModalProps) {
  const {
    isOpen,
    onClose,
    title,
    content,
    footer,
    onSuccess,
    className,
    overlayClassName,
    successButtonText = 'Yes',
    dismissButtonText = 'Dismiss',
  } = props;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? 'block' : 'hidden'
      } ${overlayClassName} bg-black/50`}
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-lg ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl font-semibold font-mono mb-4'>{title}</h2>
        <div className='mb-4'>{content}</div>
        {footer && <div className='mt-4'>{footer}</div>}
        <div className='flex justify-end gap-2'>
          <button
            className='bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors'
            onClick={onClose}
          >
            {dismissButtonText}
          </button>
          {onSuccess && (
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
              onClick={() => {
                onSuccess?.();
                onClose();
              }}
            >
              {successButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
