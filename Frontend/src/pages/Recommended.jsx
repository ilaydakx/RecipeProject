
import React, { useState, useEffect } from 'react';
import '../css/Recommended.css'
import recipeService from '../services/recipeService';
import IngredientList from '../components/IngredientList';
import RecommendedRecipes from '../components/RecommendedRecipes';
import Header from '../components/Header';
const Recommended = () => {
  const [ingredients, setIngredients] = useState([]); 
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recommendedMeals, setRecommendedMeals] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
    try {
        const data = await recipeService.getIngredients();
        console.log('Fetched ingredients:', data);
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    
      //const data = await getIngredients();
      //setIngredients(data);
    };
    fetchIngredients();
  }, []);

  const handleIngredientChange = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };
  const handleSelectAll = () => {
    setSelectedIngredients(ingredients);
  };

  const handleClearAll = () => {
    setSelectedIngredients([]);
  };

  const findRecipes = async () => {
    try {
        const ingredientIds = selectedIngredients.map((i)=>i.ingredientID);
        console.log('Selected ingredient IDs:', ingredientIds);
        const response = await recipeService.getRecommendedRecipes(ingredientIds);
        console.log('API response:', response);

        if (response && response.$values) {
            setRecommendedMeals(response.$values);
            console.log('Recommended meals:', response.$values);
          } else {
            console.error('Invalid response format:', response);
          }
        } catch (error) {
          console.error('Error finding recipes:', error);
        }
  };

  return (
    <div>
      <Header/>
    <div className="recommended-page">
    <h2>What's in your fridge?</h2>
    <div className="ingredient-controls">
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleClearAll}>Clear All</button>
      </div>
    <IngredientList 
      ingredients={ingredients} 
      selectedIngredients={selectedIngredients} 
      handleIngredientChange={handleIngredientChange} 
    />
    <button className="find-recipes-button" onClick={findRecipes}>Find Recipes</button>
    <RecommendedRecipes recommendedMeals={recommendedMeals} selectedIngredients={selectedIngredients} />
    </div>
    </div>
  );
};

export default Recommended;
