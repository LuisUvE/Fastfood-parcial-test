// src/components/RecipeList.jsx
import React from 'react';

const RecipeList = () => {
  const recipes = [
    { id: 1, name: 'Receta 1', description: 'Descripción de la receta 1' },
    { id: 2, name: 'Receta 2', description: 'Descripción de la receta 2' },
  ]; // Asegúrate de que haya datos para mostrar

  return (
    <div>
      <h1>Lista de Recetas</h1>
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No hay recetas disponibles.</p>
      )}
    </div>
  );
};

export default RecipeList;
