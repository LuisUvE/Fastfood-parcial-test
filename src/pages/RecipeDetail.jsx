import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Simula obtener datos, o usa tu API real
    const demoRecipe = {
      id,
      name: "Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Spaghetti", "Huevos", "Queso Pecorino", "Panceta", "Pimienta negra"],
      instructions: "Cocer la pasta. Mezclar huevos y queso. Freír panceta. Mezclar todo y servir."
    };
    setRecipe(demoRecipe);
  }, [id]);

  if (!recipe) return <p className="message">Cargando...</p>;

  return (
    <div className="container">
      <Link to="/" style={{color: "#ff5722", fontWeight: "600"}}>← Volver a recetas</Link>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} style={{width: '100%', borderRadius: '8px', marginBottom: '1rem'}} />
      <h2>Ingredientes</h2>
      <ul>
        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
      </ul>
      <h2>Instrucciones</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
