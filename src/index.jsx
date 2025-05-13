// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Para React 18
import './index.css';
import App from './App';

// Crear el contenedor raíz y renderizar la app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
