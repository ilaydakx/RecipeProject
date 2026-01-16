import React, { useState, useEffect } from 'react';
import { createMeal, updateMeal } from '../services/recipeService';

const AdminRecipeForm = ({ fetchRecipes, selectedRecipe, setSelectedRecipe }) => {
  const [recipe, setRecipe] = useState({
    mealName: '',
    mealRecipe: '',
    mealPicture: '',
    ingredients: [{ ingredientName: '', quantity: '' }],
  });

  useEffect(() => {
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    } else {
      setRecipe({
        mealName: '',
        mealRecipe: '',
        mealPicture: '',
        ingredients: [{ ingredientName: '', quantity: '' }],
      });
    }
  }, [selectedRecipe]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...recipe.ingredients];
    list[index][name] = value;
    setRecipe({ ...recipe, ingredients: list });
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { ingredientName: '', quantity: '' }],
    });
  };

  const handleRemoveIngredient = (index) => {
    const list = [...recipe.ingredients];
    list.splice(index, 1);
    setRecipe({ ...recipe, ingredients: list });
  };

  const handleSaveRecipe = async () => {
    try {
      if (selectedRecipe) {
        await updateMeal(selectedRecipe.mealID, recipe);
        setSelectedRecipe(null);
      } else {
        await createMeal(recipe);
      }
      fetchRecipes();
      setRecipe({
        mealName: '',
        mealRecipe: '',
        mealPicture: '',
        ingredients: [{ ingredientName: '', quantity: '' }],
      });
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <div className="recipe-form">
      <h3>{selectedRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h3>
      <input
        type="text"
        placeholder="Meal Name"
        value={recipe.mealName}
        onChange={(e) => setRecipe({ ...recipe, mealName: e.target.value })}
      />
      <textarea
        placeholder="Meal Recipe"
        value={recipe.mealRecipe}
        onChange={(e) => setRecipe({ ...recipe, mealRecipe: e.target.value })}
      />
      {/* Image upload/dropzone can be added here */}
      <h4>Ingredients</h4>
      {recipe.ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient">
          <input
            type="text"
            placeholder="Ingredient Name"
            name="ingredientName"
            value={ingredient.ingredientName}
            onChange={(e) => handleInputChange(e, index)}
          />
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            value={ingredient.quantity}
            onChange={(e) => handleInputChange(e, index)}
          />
          <button onClick={() => handleRemoveIngredient(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <button onClick={handleSaveRecipe}>{selectedRecipe ? 'Update Recipe' : 'Save Recipe'}</button>
    </div>
  );
};

export default AdminRecipeForm;
