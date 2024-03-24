import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import ReactModal from 'react-modal';
import { Router } from '@/Router';
import { ModalManager } from '@/components/ModalManager';
import { SocketProvider } from '@/hooks/useSocket';
import { UserProvider } from '@/hooks/useUser';
import { SoundProvider } from '@/sound';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
ReactModal.setAppElement('#root');
root.render(
  <StrictMode>
    <UserProvider>
      <SocketProvider>
        <SoundProvider>
          <Router />
          <ModalManager />
        </SoundProvider>
      </SocketProvider>
    </UserProvider>
    <Toaster position="top-right" />
  </StrictMode>
);
