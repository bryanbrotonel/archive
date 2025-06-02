import React, { useEffect } from 'react';

interface ToastProps {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms
  onClose?: (id: number) => void;
}

const typeStyles: Record<string, string> = {
  success: 'bg-green-500 border-green-600',
  error: 'bg-red-500 border-red-600',
  info: 'bg-blue-500 border-blue-600',
  warning: 'bg-orange-500 border-orange-600',
};

export default function Toast(props: ToastProps) {
  const { id, message, type = 'info', duration = 3000, onClose } = props;

  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      key={id}
      className={`
        max-w-96 rounded-md shadow-lg font-medium text-white
        transition-opacity duration-300 opacity-0
        animate-fade-in-out text-center border-2 border-solid
        ${typeStyles[type]}
        break-words overflow-auto max-h-32 p-3 scrollbar
      `}
      // style={{
      //   animationDuration: `${duration}ms`, // override duration if needed
      // }}
    >
      <span className='block whitespace-pre-wrap break-words scrollbar'>
        {message}
      </span>
      <style jsx>{`
        @keyframes fade-in-out {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
