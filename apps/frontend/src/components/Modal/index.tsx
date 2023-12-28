import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import ReactModal from 'react-modal';

interface ModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
  readonly title: string;
  readonly width: string;
  readonly height: string;
}

const style = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.3rem 1.5rem',
    margin: 'auto'
  }
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  setIsOpen,
  title,
  width,
  height,
  children
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={{ ...style, content: { width, height } }}
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button type="button" className="text-2xl" aria-label="닫기" onClick={() => setIsOpen(false)}>
            <RiCloseFill />
          </button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};
