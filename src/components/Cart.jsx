// Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';  // Asegúrate de que la ruta sea correcta

function Cart() {
    const { cartItems, totalPrice } = useContext(CartContext);

return (
<div>
    <h1>Shopping Cart</h1>
      {/* Muestra los productos en el carrito */}
</div>
);
}

export default Cart;
