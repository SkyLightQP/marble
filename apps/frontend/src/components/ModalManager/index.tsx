import { FC } from 'react';
import { useModalStore } from '@/stores/useModalStore';

export const ModalManager: FC = () => {
  const { modals, closeModal } = useModalStore();

  return (
    <>
      {modals.map(({ isOpen, component: Component, context }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Component key={`modals-${index}`} isOpen={isOpen} close={() => closeModal(Component)} {...context} />
      ))}
    </>
  );
};
