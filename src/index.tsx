import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import ToastContainerProps from './utils/toastContainerProps';
import './theme/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer {...ToastContainerProps} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
