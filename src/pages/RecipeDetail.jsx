// src/pages/RecipeDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importamos el contexto del carrito

const RecipeDetail = () => {
  const { id } = useParams(); // Obtenemos el id de la receta desde la URL
  const { addToCart } = useCart();

  // Lista de recetas (productos)
  const recipes = [
    { id: 1, name: 'Pizza', description: 'Pizza deliciosa', price: 10 },
    { id: 2, name: 'Pasta', description: 'Pasta italiana', price: 12 },
    { id: 3, name: 'Ensalada', description: 'Ensalada fresca', price: 8 }
  ];

  const recipe = recipes.find((r) => r.id === parseInt(id)); // Buscamos la receta por id

  const handleAddToCart = () => {
    addToCart(recipe);
  };

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <p>${recipe.price}</p>
      <button onClick={handleAddToCart}>Añadir al carrito</button>
    </div>
  );
};

export default RecipeDetail;
