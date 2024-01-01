import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import ReactModal from 'react-modal';
import { Router } from '@/Router';
import { SocketProvider } from '@/hooks/useSocket';
import { UserProvider } from '@/hooks/useUser';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
ReactModal.setAppElement('#root');
root.render(
  <React.StrictMode>
    <UserProvider>
      <SocketProvider>
        <Router />
      </SocketProvider>
    </UserProvider>
    <Toaster />
  </React.StrictMode>
);
