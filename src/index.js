import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './scenes/App';

import GlobalStyle from './styles/globalStyles';

const root = createRoot(document.getElementById('app'));

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
);
