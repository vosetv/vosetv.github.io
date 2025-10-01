import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Document from './components/document';
import './main.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Document />
  </StrictMode>,
);
