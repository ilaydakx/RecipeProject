/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/recipeService';
import CustomDropzone from './CustomDropzone';
import '../css/RecipeForm.css';

const RecipeForm = ({ fetchRecipes, selectedRecipe, setSelectedRecipe }) => {
  const [recipe, setRecipe] = useState({
    mealName: '',
    mealRecipe: [],
    mealPicture: '',
    ingredients: [{ ingredientName: '', quantity: '' }],
  });

  useEffect(() => {
    if (selectedRecipe) {
      const { mealName = '', mealRecipe = '', mealPicture = '', ingredients = [] } = selectedRecipe;
      setRecipe({
        mealName,
        mealRecipe: mealRecipe.split('. ').map(step => step.trim()).filter(step => step),
        mealPicture,
        ingredients: ingredients.$values
          ? ingredients.$values.map((i) => ({
              ingredientName: i.ingredient ? i.ingredient.ingredientName : '',
              quantity: i.quantity || '',
            }))
          : [{ ingredientName: '', quantity: '' }],
      });
    } else {
      setRecipe({
        mealName: '',
        mealRecipe: [],
        mealPicture: '',
        ingredients: [{ ingredientName: '', quantity: '' }],
      });
    }
  }, [selectedRecipe]);

  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    if (type === 'ingredient') {
      const list = [...recipe.ingredients];
      list[index][name] = value;
      setRecipe({ ...recipe, ingredients: list });
    } else if (type === 'mealRecipe') {
      const list = [...recipe.mealRecipe];
      list[index] = value;
      setRecipe({ ...recipe, mealRecipe: list });
    }
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

  const handleAddStep = () => {
    setRecipe({ ...recipe, mealRecipe: [...recipe.mealRecipe, ''] });
  };

  const handleRemoveStep = (index) => {
    const list = [...recipe.mealRecipe];
    list.splice(index, 1);
    setRecipe({ ...recipe, mealRecipe: list });
  };

  const handleSaveRecipe = async () => {
    const updatedRecipe = { ...recipe, mealRecipe: recipe.mealRecipe.join('. ') };
    try {
      if (selectedRecipe) {
        await axios.put(`${API_URL}/Meals/${selectedRecipe.mealID}`, updatedRecipe);
        setSelectedRecipe(null);
      } else {
        await axios.post(`${API_URL}/Meals`, updatedRecipe);
      }
      fetchRecipes();
      setRecipe({
        mealName: '',
        mealRecipe: [],
        mealPicture: '',
        ingredients: [{ ingredientName: '', quantity: '' }],
      });
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setRecipe({ ...recipe, mealPicture: reader.result });
    };
    reader.readAsDataURL(file);
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
      <h4>Meal Recipe</h4>
      {recipe.mealRecipe.map((step, index) => (
        <div key={index} className="meal-step">
          <textarea
            placeholder={`Step ${index + 1}`}
            value={step}
            onChange={(e) => handleInputChange(e, index, 'mealRecipe')}
          />
          <button onClick={() => handleRemoveStep(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddStep}>Add Step</button>
      <CustomDropzone onDrop={handleDrop} />
      {recipe.mealPicture && (
        <img src={recipe.mealPicture} alt="Meal" className="meal-picture-preview" />
      )}
      <h4>Ingredients</h4>
      {recipe.ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient">
          <input
            type="text"
            placeholder="Ingredient Name"
            name="ingredientName"
            value={ingredient.ingredientName}
            onChange={(e) => handleInputChange(e, index, 'ingredient')}
          />
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            value={ingredient.quantity}
            onChange={(e) => handleInputChange(e, index, 'ingredient')}
          />
          <button onClick={() => handleRemoveIngredient(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <button onClick={handleSaveRecipe}>{selectedRecipe ? 'Update Recipe' : 'Save Recipe'}</button>
    </div>
  );
};

export default RecipeForm;
*/
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/recipeService';
import CustomDropzone from './CustomDropzone';
import '../css/RecipeForm.css';

const RecipeForm = ({ fetchRecipes, selectedRecipe, setSelectedRecipe }) => {
  const [recipe, setRecipe] = useState({
    mealName: '',
    mealRecipe: '',
    mealPicture: '',
    ingredients: [{ ingredientName: '', quantity: '' }],
  });

  useEffect(() => {
    if (selectedRecipe) {
      const { mealName = '', preparation = '', mealPicture = '', ingredients = [] } = selectedRecipe;
      console.log('Selected Recipe:', selectedRecipe);
      console.log('Meal Recipe:', preparation); // Debugging

      setRecipe({
        mealName,
        mealRecipe: preparation,
        mealPicture: `http://localhost:5274${mealPicture}`,
        ingredients: Array.isArray(ingredients.$values) ? ingredients.$values.map((i) => ({
          ingredientName: i.ingredientName || '',
          quantity: i.quantity || '',
        })) : [{ ingredientName: '', quantity: '' }],
      });
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
    //setRecipe({ ...recipe, ingredients: list });
    setRecipe(prevState => ({ ...prevState, ingredients: list }));

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
      const uniqueIngredients = recipe.ingredients.reduce((acc, curr) => {
        if (!acc.find(item => item.ingredientName === curr.ingredientName)) {
          acc.push(curr);
        }
        return acc;
      }, []);

        const formData = new FormData();
        formData.append('MealID', selectedRecipe ? selectedRecipe.mealID : 0);
        formData.append('MealName', recipe.mealName);
        formData.append('MealRecipe', recipe.mealRecipe);

        if (recipe.mealPicture instanceof File) {
            formData.append('MealPicture', recipe.mealPicture);
        } else {
            formData.append('MealPictureUrl', recipe.mealPicture);
        }

        uniqueIngredients.forEach((ingredient, index) => {
          formData.append(`Ingredients[${index}].IngredientID`, ingredient.ingredientID || 0);
          formData.append(`Ingredients[${index}].IngredientName`, ingredient.ingredientName);
          formData.append(`Ingredients[${index}].Quantity`, ingredient.quantity);
      });

        console.log('FormData:', Array.from(formData.entries()));
        


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
        console.log("Response:", response.data); // Bu, API'den gelen cevabı kontrol etmenize yardımcı olur.

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
const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setRecipe({ ...recipe, mealPicture: file });

    
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
      <CustomDropzone onDrop={handleDrop} />
      {recipe.mealPicture && (
        <img 
        src={recipe.mealPicture instanceof File ? URL.createObjectURL(recipe.mealPicture) : recipe.mealPicture} 
        alt="Meal" 
        className="meal-picture-preview" />
      )}
      <h4>Ingredients</h4>
      {Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
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

export default RecipeForm;
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/recipeService';
import CustomDropzone from './CustomDropzone';
import '../css/RecipeForm.css';

const RecipeForm = ({ fetchRecipes, selectedRecipe, setSelectedRecipe }) => {
  const [recipe, setRecipe] = useState({
    mealName: '',
    mealRecipe: '',
    mealPicture: '',
    ingredients: [{ ingredientName: '', quantity: '' }],
  });

  useEffect(() => {
    if (selectedRecipe) {
      const { mealName = '', preparation = '', mealPicture = '', ingredients = [] } = selectedRecipe;
      console.log('Selected Recipe:', selectedRecipe);

      setRecipe({
        mealName,
        mealRecipe: preparation,
        mealPicture: `http://localhost:5274${mealPicture}`,
        ingredients: Array.isArray(ingredients.$values) ? ingredients.$values.map((i) => ({
          ingredientName: i.ingredientName || '',
          quantity: i.quantity || '',
          ingredientID: i.ingredientID || 0 // ingredientID'yi ekliyoruz
        })) : [{ ingredientName: '', quantity: '', ingredientID: 0 }],
      });
    } else {
      setRecipe({
        mealName: '',
        mealRecipe: '',
        mealPicture: '',
        ingredients: [{ ingredientName: '', quantity: '', ingredientID: 0 }],
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
      ingredients: [...recipe.ingredients, { ingredientName: '', quantity: '', ingredientID: 0 }],
    });
  };

  const handleRemoveIngredient = (index) => {
    const list = [...recipe.ingredients];
    list.splice(index, 1);
    setRecipe({ ...recipe, ingredients: list });
  };

  const handleSaveRecipe = async () => {
    try {
      const uniqueIngredients = recipe.ingredients.reduce((acc, curr) => {
        if (!acc.find(item => item.ingredientName === curr.ingredientName)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      const formData = new FormData();
      if (selectedRecipe) {
        formData.append('MealID', selectedRecipe.mealID);
      }
      formData.append('MealName', recipe.mealName);
      formData.append('MealRecipe', recipe.mealRecipe);

      if (recipe.mealPicture instanceof File) {
        formData.append('MealPicture', recipe.mealPicture);
      } else {
        formData.append('MealPictureUrl', recipe.mealPicture);
      }

      uniqueIngredients.forEach((ingredient, index) => {
        formData.append(`Ingredients.IngredientID`, ingredient.ingredientID || 0);
        formData.append(`Ingredients.IngredientName`, ingredient.ingredientName);
        formData.append(`Ingredients.Quantity`, ingredient.quantity);
      });

      console.log('FormData:', Array.from(formData.entries()));

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

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setRecipe({ ...recipe, mealPicture: file });
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
      <CustomDropzone onDrop={handleDrop} />
      {recipe.mealPicture && (
        <img src={recipe.mealPicture instanceof File ? URL.createObjectURL(recipe.mealPicture) : recipe.mealPicture} alt="Meal" className="meal-picture-preview" />
      )}
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

export default RecipeForm;

