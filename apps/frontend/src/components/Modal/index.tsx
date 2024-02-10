import React, { PropsWithChildren } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import ReactModal, { Styles } from 'react-modal';

interface ModalProps {
  readonly isOpen: boolean;
  readonly close: () => void;
  readonly title: string;
  readonly width: string;
  readonly height: string;
  readonly onClose?: () => void;
}

const style: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    cursor: 'no-drop'
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.3rem 1.5rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'auto'
  }
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  close,
  title,
  width,
  height,
  onClose,
  children
}) => {
  return (
    <ReactModal isOpen={isOpen} style={{ overlay: { ...style.overlay }, content: { ...style.content, width, height } }}>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button
            type="button"
            className="text-3xl"
            aria-label="닫기"
            onClick={() => {
              close();
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
