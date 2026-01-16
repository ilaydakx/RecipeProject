/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeService from '../services/recipeService';
import axios from 'axios';
import '../css/RecipeDetail.css';
const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    recipeService.getRecipeById(id).then((data) => {
      setRecipe(data);
    });
  }, [id]);

  return (
    <div>
      {recipe ? (
        <div>
          <h1>{recipe.mealName}</h1>
          <img src={recipe.mealPicture} alt={recipe.mealName} />
          <p>{recipe.mealRecipe}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetail;
*/
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/RecipeDetail.css';
import { API_URL } from '../services/recipeService';
import axios from 'axios';
import ingr from '../images/ingredients.svg'
import prep from '../images/prep.svg'
const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${API_URL}/Meals/${id}`);
        console.log(response.data); 
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }
  const mealRecipeSteps = recipe.mealRecipe.split(/\d+\.\s+/).filter(step => step.trim());



  return (
    <div className="recipe-detail">
      <img src={`http://localhost:5274${recipe.mealPicture}`} alt={recipe.mealName} />
      <h2>{recipe.mealName}</h2>
    
      <div className='ingredients'>
        <img src={ingr} height="32" width="32"/>
        <h3>Ingredients for {recipe.mealName} Recipe:</h3>
      </div>
      <ul>
      {recipe.ingredients.$values.map((mi, index) => (
          <li key={index}>
            {mi.ingredientName} - {mi.quantity}
          </li>
          ))}
        </ul>

        <div className='prep'>
          <img src={prep} height="32" width="32"/>
          <h3>How to Make {recipe.mealName} Recipe?</h3>
        </div>
      <ol>
        {mealRecipeSteps.map((step, index) => (
          <li key={index}>{step.trim()}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
