// Recipe.jsx
import React from 'react';
import '../css/Recipe.css';

function Recipe({ recipe }) {
  const { mealName, mealPicture, ingredients, preparation ,matchPercentage } = recipe;
  fetch('http://localhost:5274/api/Meals')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    const imageUrl = `http://localhost:5274${recipe.mealPicture}`;
    const preparationSteps = preparation.split('.').map(step => step.trim()).filter(step => step);


  return (
    <div className="recipe-card">
      <img className="mealPicture" src={imageUrl} alt={mealName} />
      <div className="recipe-details">
        <h2>{mealName}</h2>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.$values.map((ingredient, index) => (
            <li key={index}>{ingredient.ingredientName} - {ingredient.quantity}</li>
          ))}
        </ul>
        <h3>Preparation:</h3>
        <p>{preparation}</p>
        

        

      </div>
    </div>
  );
}

export default Recipe;

/*import React from 'react';
import '../css/Recipe.css'

function Recipe({ recipe }) {
  const { mealName, preparation, mealPicture, ingredients } = recipe;
  const ingredientsArray = ingredients.$values || [];

  return (
    <div className="recipe-card">
      <img className="mealPicture" src={mealPicture} alt={mealName} />
      <div className="recipe-details">
        <h2>{mealName}</h2>
        <h3>Ingredients:</h3>
        <ul>
        {ingredientsArray.map((ingredient, index) => (
            <li key={index}>
              {ingredient.ingredientName} - {ingredient.quantity}
            </li>
          ))}
        </ul>
        <h3>Preparation:</h3>
        <p>{preparation}</p>
      </div>
    </div>
  );
}
export default Recipe;*/


  /*return (
    <div className="recipe">
      <h2>{mealName}</h2>
      <img src={mealPicture} alt={mealName} />
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.split(',').map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Preparation:</h3>
      <p>{mealRecipe}</p>
    </div>
  );
}*/
/*
return (
  <div className="recipe-card">
    <img className="mealPicture" src={mealPicture} alt={mealName} />
    <div className="recipe-details">
    <h2>{mealName}</h2>
    <h4>Ingredients:</h4>
    <ul>
      {Ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient.Quantity} - {ingredient.IngredientName}</li>
      ))}
    </ul>
    <h4>Preparation:</h4>
    <p>{mealRecipe}</p>
  </div>
  </div>
);
}

export default Recipe;
*/


/*import React from 'react'
import '../css/Recipe.css'
function Recipe({recipe}) {
  const {mealId, mealName, mealRecipe, mealPicture, mealDate} = recipe;
  const imageUrl = `http://localhost:5274${mealPicture}`; 
     
  return (
    <div>
      <img className='mealPicture' src={imageUrl} alt={mealName}/>
      <div>
        <p>{mealName}</p>
      </div>
    </div>
  )
}

export default Recipe
*/
