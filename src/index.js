import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from 'firebase/app';

import App from './scenes/App';

import GlobalStyle from './styles/globalStyles';

const root = createRoot(document.getElementById('app'));

// Initialize Firebase
var config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: 'new-new-d75cb.firebaseapp.com',
  databaseURL: 'https://new-new-d75cb.firebaseio.com',
  projectId: 'new-new-d75cb',
  storageBucket: '',
  messagingSenderId: '254583637908',
};
initializeApp(config);

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
);
