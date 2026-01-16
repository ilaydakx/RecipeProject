/*import React from 'react';
import Recipe from './Recipe';
import '../css/RecommendedRecipes.css';

  return (
    <div className="recommended-meals">
      <h3>Recommended Recipes</h3>
      {recommendedMeals.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recommendedMeals.map((meal) => (
            <li key={meal.mealID}>
              <Recipe recipe={meal} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendedRecipes;
*/
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/RecommendedRecipes.css';

const RecommendedRecipes = ({ recommendedMeals, selectedIngredients }) => {
  if (!recommendedMeals || recommendedMeals.length === 0) {
    return <div>No recommended recipes found.</div>;
  }

  
  
  return (
    <div className="recipe-list">
      {recommendedMeals.map((recipe) => (
        <Link to={`/Meals/${recipe.mealID}`} key={recipe.mealID}>
          <div className="recipe-card">
            <img src={`http://localhost:5274/${recipe.mealPicture}`} alt={recipe.mealName} />
            <h2>{recipe.mealName}</h2>
            
            </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedRecipes;
