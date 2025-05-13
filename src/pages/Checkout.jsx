// src/pages/Checkout.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importamos el contexto del carrito
import './Checkout.css'; // Aseguramos que estamos importando los estilos

const Checkout = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Usamos useMemo para memorizar el arreglo de productos
  const allProducts = useMemo(() => [
    { id: 1, name: 'Pizza', description: 'Pizza deliciosa', price: 10, imgSrc: '/images/pizza.jpg' },
    { id: 2, name: 'Pasta', description: 'Pasta italiana', price: 12, imgSrc: '/images/pasta.jpg' },
    { id: 3, name: 'Ensalada', description: 'Ensalada fresca', price: 8, imgSrc: '/images/ensalada.jpg' },
    { id: 4, name: 'Hamburguesa', description: 'Hamburguesa clásica', price: 11, imgSrc: '/images/hamburguesa.jpg' },
    { id: 5, name: 'Tacos', description: 'Tacos mexicanos', price: 9, imgSrc: '/images/tacos.jpg' },
    { id: 6, name: 'Sushi', description: 'Sushi fresco', price: 15, imgSrc: '/images/sushi.jpg' },
    { id: 7, name: 'Paella', description: 'Paella tradicional', price: 20, imgSrc: '/images/paella.jpg' },
    { id: 8, name: 'Burrito', description: 'Burrito con carne', price: 10, imgSrc: '/images/burrito.jpg' },
    { id: 9, name: 'Enchiladas', description: 'Enchiladas mexicanas', price: 13, imgSrc: '/images/enchiladas.jpg' },
    { id: 10, name: 'Ceviche', description: 'Ceviche fresco', price: 12, imgSrc: '/images/ceviche.jpg' },
    { id: 11, name: 'Sopa', description: 'Sopa casera', price: 7, imgSrc: '/images/sopa.jpg' },
    { id: 12, name: 'Pizza Vegetariana', description: 'Pizza sin carne', price: 11, imgSrc: '/images/pizza-vegetariana.jpg' },
    { id: 13, name: 'Pollo Asado', description: 'Pollo al carbón', price: 14, imgSrc: '/images/pollo-asado.jpg' },
    { id: 14, name: 'Fajitas', description: 'Fajitas de pollo', price: 16, imgSrc: '/images/fajitas.jpg' },
    { id: 15, name: 'Steak', description: 'Bistec jugoso', price: 18, imgSrc: '/images/steak.jpg' },
    { id: 16, name: 'Tostadas', description: 'Tostadas mexicanas', price: 9, imgSrc: '/images/tostadas.jpg' },
    { id: 17, name: 'Lasaña', description: 'Lasaña italiana', price: 14, imgSrc: '/images/lasana.jpg' },
    { id: 18, name: 'Curry', description: 'Curry picante', price: 15, imgSrc: '/images/curry.jpg' },
    { id: 19, name: 'Waffles', description: 'Waffles dulces', price: 10, imgSrc: '/images/waffles.jpg' },
    { id: 20, name: 'Pancakes', description: 'Pancakes con miel', price: 8, imgSrc: '/images/pancakes.jpg' }
  ], []); // Dependencia vacía para que solo se calcule una vez

  // Cargar más productos cuando el usuario haga scroll
  const loadMoreProducts = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setProducts((prevProducts) => [
        ...prevProducts,
        ...allProducts, // Añadimos más productos
      ]);
      setLoading(false);
    }, 1000); // Simulamos un pequeño delay al cargar productos
  };

  // Detectamos cuando el usuario hace scroll al final de la página
  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    if (bottom) {
      loadMoreProducts(); // Cargar más productos al llegar al fondo
    }
  };

  useEffect(() => {
    setProducts(allProducts.slice(0, 10)); // Cargamos los primeros 10 productos
  }, [allProducts]); // Ahora solo se ejecutará una vez ya que allProducts está memorizado

  return (
    <div className="checkout-container" onScroll={handleScroll}>
      <h1>Recetas</h1>
      <div className="recipe-list">
        {products.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img
              src={recipe.imgSrc}
              alt={recipe.name}
              className="recipe-img"
            />
            <div className="recipe-info">
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <p className="price">${recipe.price}</p>
              <button className="add-to-cart" onClick={() => addToCart(recipe)}>
                Añadir al carrito
              </button>
              <Link to={`/recipe/${recipe.id}`} className="view-detail-link">Ver detalle</Link>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="loading">Cargando más productos...</p>}
    </div>
  );
};

export default Checkout;
