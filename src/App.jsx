// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Importamos el CartProvider
import Checkout from './pages/Checkout'; // Ruta principal de la aplicación
import RecipeDetail from './pages/RecipeDetail'; // Ruta al detalle de las recetas

function App() {
  return (
    <CartProvider> {/* Proveedor de carrito */}
      <Router>
        <Routes>
          <Route path="/" element={<Checkout />} /> {/* Ruta principal, mostrando Checkout.jsx */}
          <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* Ruta de detalle de receta */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
