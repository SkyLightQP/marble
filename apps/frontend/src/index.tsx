import './styles/global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Router } from './Router';
import { UserProvider } from './hooks/useUser';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router />
      <Toaster />
    </UserProvider>
  </React.StrictMode>
);
