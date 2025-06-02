'use client';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';

interface ModalState {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  footer?: ReactNode;
  onSuccess?: () => void;
  className?: string;
  overlayClassName?: string;
  successButtonText?: string;
  dismissButtonText?: string;
}

interface ModalContextType {
  modalState: ModalState;
  openModal: (state: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;
  queueModal: (state: Omit<ModalState, 'isOpen'>) => void;
}

const defaultState: ModalState = {
  isOpen: false,
  title: '',
  content: null,
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>(defaultState);
  const [queue, setQueue] = useState<Array<Omit<ModalState, 'isOpen'>>>([]);

  useEffect(() => {
    if (queue.length > 0 && !modalState.isOpen) {
      const nextModal = queue[0];
      setQueue((q) => q.slice(1));
      setModalState({ ...nextModal, isOpen: true });
    }
  }, [modalState.isOpen, queue]);

  const openModal = useCallback(
    (state: Omit<ModalState, 'isOpen'>) => {
      if (modalState.isOpen) {
        setQueue((prevQueue) => [...prevQueue, state]);
      } else {
        setModalState({ ...state, isOpen: true });
      }
    },
    [modalState.isOpen]
  );

  const queueModal = (state: Omit<ModalState, 'isOpen'>) => {
    setQueue((prevQueue) => [...prevQueue, state]);
  };

  const closeModal = useCallback(() => {
    if (queue.length > 0) {
      const nextModal = queue[0];
      setQueue((q) => q.slice(1));
      setModalState({ ...nextModal, isOpen: true });
    } else {
      setModalState(defaultState);
    }
  }, [queue]);

  return (
    <ModalContext.Provider
      value={{ modalState, openModal, closeModal, queueModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
