import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import ReactModal, { Styles } from 'react-modal';

interface ModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
  readonly title: string;
  readonly width: string;
  readonly height: string;
  readonly onClose?: () => void;
}

const style: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.3rem 1.5rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  setIsOpen,
  title,
  width,
  height,
  onClose,
  children
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        if (onClose !== undefined) onClose();
      }}
      style={{ overlay: { ...style.overlay }, content: { ...style.content, width, height } }}
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button
            type="button"
            className="text-2xl"
            aria-label="닫기"
            onClick={() => {
              setIsOpen(false);
              if (onClose !== undefined) onClose();
            }}
          >
            <RiCloseFill />
          </button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};
