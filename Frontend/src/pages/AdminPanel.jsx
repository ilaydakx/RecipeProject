import React from 'react';
import RecipeManagement from './RecipeManagement';
import IngredientManagement from './IngredientManagement';

const AdminPanel = () => {
  return (
    <div className="admin-page">
      <RecipeManagement />
      <IngredientManagement />
    </div>
  );
};

export default AdminPanel;



/*
import React, { useState, useEffect } from 'react';
import AdminRecipeForm from '../components/AdminRecipeForm';
import RecipeList from '../components/RecipeList';
import { getAllMeals } from '../services/recipeService';

const AdminPanel = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const data = await getAllMeals();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <AdminRecipeForm
        fetchRecipes={fetchRecipes}
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
      />
      <RecipeList
        recipes={recipes}
        fetchRecipes={fetchRecipes}
        setSelectedRecipe={setSelectedRecipe}
      />
    </div>
  );
};

export default AdminPanel;*/
