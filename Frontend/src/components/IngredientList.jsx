// src/components/IngredientList.jsx
import React from 'react';
import '../css/IngredientList.css';

const IngredientList = ({ ingredients, selectedIngredients, handleIngredientChange }) => {
  if (!ingredients || ingredients.length === 0) {
    return <div>No ingredients available.</div>;
  }
  return (
    <div className="ingredient-list">
      {ingredients.map((ingredient) => (
        <div key={ingredient.ingredientID} className="ingredient-item">
          <label>
            <input
              type="checkbox"
              value={ingredient.ingredientID}
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => handleIngredientChange(ingredient)}
            />
            {ingredient.ingredientName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
