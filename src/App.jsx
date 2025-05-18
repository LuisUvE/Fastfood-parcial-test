import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  return (
    <CartProvider>
      <Cart />
      <Router>
        <Routes>
          <Route path="/" element={<Checkout />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
