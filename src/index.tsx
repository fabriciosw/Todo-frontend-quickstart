import React from 'react';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import ToastContainerProps from './utils/toastContainerProps';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ToastContainer {...ToastContainerProps} />
    <App />
  </React.StrictMode>
);
