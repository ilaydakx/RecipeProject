
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/RecipeList.css';
import './Recipe';


const RecipeList = ({ recipes }) => {
    
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe.mealID}>
        <Link to={`/Meals/${recipe.mealID}`}>
          <div className="recipe-image-container">
            <img
              src={`http://localhost:5274${recipe.mealPicture}`}
              alt={recipe.mealName}
              className="recipe-image"
            />
          </div>
        </Link>
        <div className="recipe-info">
          <Link to={`/Meals/${recipe.mealID}`} className="recipe-title">
            {recipe.mealName}
          </Link>
      
    </div>
    </div>
    ))}
    </div>
  );
};

export default RecipeList;
