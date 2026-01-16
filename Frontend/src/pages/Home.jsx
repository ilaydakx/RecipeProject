/*
import React, { useEffect, useState } from 'react';
import RecipeList from '../components/RecipeList';
import { getAllMeals } from '../services/recipeService';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllMeals();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Recipes</h3>
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default Home;
*/

import React, { useEffect, useState } from 'react';
import RecipeList from '../components/RecipeList';
import { getAllMeals } from '../services/recipeService';
import Header from '../components/Header';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getAllMeals();
        console.log('Fetch Response:', response.data); 
        const data = response.data.$values || response.data; // API yanıtını işliyoruz
        setRecipes(data);
        console.log('Updated recipes state:', data); // recipes değişkenini güncelliyoruz
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredRecipes = Array.isArray(recipes) 
    ? recipes.filter(recipe =>
        recipe.mealName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header onSearch={handleSearch} />
      <h3>Recipes</h3>
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}

export default Home;
