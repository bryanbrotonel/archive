import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import Toast from './ui/toast';

type Toast = {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms
};

type ToastContextType = {
  showToast: (toast: Omit<Toast, 'id'>) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  }, []);

  const showToast: ToastContextType['showToast'] = useCallback(
    ({ message, type = 'info', duration = 3000 }) => {
      const id = ++toastId;
      setToasts((toasts) => [...toasts, { id, message, type, duration }]);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
        {toasts.map((toast) => (
          <Toast
            id={toast.id}
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
