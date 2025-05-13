// src/components/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
return (
    <div>
        <h2>{recipe.name}</h2>
        <p>{recipe.description}</p>
        <Link to={`/recipe/${recipe.id}`}>Ver detalles</Link>
    </div>
    );
};

export default RecipeCard;
