import React, { useState, useEffect } from 'react';
import RecipeForm from '../components/RecipeForm';
import { API_URL, getAllMeals ,deleteMeal,createMeal} from '../services/recipeService';
import '../css/RecipeManagement.css';
import axios from 'axios';
import Header from '../components/Header';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await getAllMeals();
      console.log('Fetch Response:', response.data);
      setRecipes(response.data.$values || response.data || []);
      console.log('Updated recipes state:', response.data.$values || response.data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    }
  };

  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };
  const handleDeleteRecipe = async (id) => {
    try {
      await deleteMeal(id);
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };
  /*const handleSaveRecipe = async (recipe) => {
    try {
      let response;
      if (selectedRecipe) {
        response = await axios.put(`${API_URL}/Meals/${selectedRecipe.mealID}`, recipe, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Update Response:', response.data);
        setSelectedRecipe(null);
      } else {
        response = await axios.post(`${API_URL}/Meals`, recipe, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Save Response:', response.data);
      }
      fetchRecipes();
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };*/
  const handleSaveRecipe = async () => {
    try {
        const formData = new FormData();
        formData.append('MealID', selectedRecipe ? selectedRecipe.mealID : 0);
        formData.append('MealName', recipe.mealName);
        formData.append('MealRecipe', recipe.mealRecipe);

        if (recipe.mealPicture instanceof File) {
            formData.append('MealPicture', selectedRecipe.mealPicture);
        } else {
            formData.append('MealPictureUrl', selectedRecipe.mealPicture);
        }

        // Ingredient ID'leri doğru ayarlamak
        for (let i = 0; i < recipe.ingredients.length; i++) {
            let ingredient = recipe.ingredients[i];
            let ingredientID = ingredient.ingredientID;

            // Eğer ingredientID 0 ise, bu ingredient'i veritabanında bulmaya çalış
            if (!ingredientID || ingredientID === 0) {
                const existingIngredientResponse = await axios.get(`${API_URL}/Ingredients?name=${ingredient.ingredientName}`);
                if (existingIngredientResponse.data) {
                    ingredientID = existingIngredientResponse.data.ingredientID;
                } else {
                    // Ingredient veritabanında yoksa, yeni bir ingredient oluştur ve ID'yi al
                    const newIngredientResponse = await axios.post(`${API_URL}/Ingredients`, { ingredientName: ingredient.ingredientName });
                    ingredientID = newIngredientResponse.data.ingredientID;
                }
            }

            formData.append(`Ingredients[${i}].IngredientID`, ingredientID);
            formData.append(`Ingredients[${i}].IngredientName`, ingredient.ingredientName);
            formData.append(`Ingredients[${i}].Quantity`, ingredient.quantity);
        }

        let response;
        if (selectedRecipe) {
            response = await axios.put(`${API_URL}/Meals/${selectedRecipe.mealID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSelectedRecipe(null);
        } else {
            response = await axios.post(`${API_URL}/Meals`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        console.log("Response:", response.data);

        fetchRecipes();

    } catch (error) {
        console.error('Error saving recipe:', error);
        if (error.response) {
            console.log('Response Data:', error.response.data);
            console.log('Response Status:', error.response.status);
            console.log('Response Headers:', error.response.headers);
        }
    }
};


  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div><Header/>
    <div className="recipe-management">
      <h2>Recipe Management</h2>
      <RecipeForm
        fetchRecipes={fetchRecipes}
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
        handleSaveRecipe={handleSaveRecipe}
      />
      <h3>Recipes</h3>
      <ul>
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li key={recipe.mealID}>
              {recipe.mealName}
              <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteRecipe(recipe.mealID)}>Delete</button>

            </li>
          ))
        ) : (
          <li>No recipes found</li>
        )}
      </ul>
    </div>
    </div>
  );
};

export default RecipeManagement;
