import React from 'react';
import { deleteMeal } from '../services/recipeService';

const AdminRecipe = ({ recipes, fetchRecipes, setSelectedRecipe }) => {
  const handleDelete = async (mealID) => {
    try {
      await deleteMeal(mealID);
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="recipe-list">
      <h3>Existing Recipes</h3>
      {recipes.map((recipe) => (
        <div key={recipe.mealID} className="recipe-item">
          <h4>{recipe.mealName}</h4>
          <button onClick={() => setSelectedRecipe(recipe)}>Edit</button>
          <button onClick={() => handleDelete(recipe.mealID)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminRecipe;
