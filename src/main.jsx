import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/React-Firebase-project/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.log('Service Worker registration failed:', err);
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));  // Updated code

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
