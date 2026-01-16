import axios from 'axios';

export const API_URL = 'http://localhost:5274/api';

export const getAllMeals = async () => {
  try {
    const response = await axios.get(`${API_URL}/Meals`);
    console.log('getAllMeals response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
};
export const getIngredients = async () => {
  const response = await axios.get(`${API_URL}/Ingredients`);
  return response.data.$values || response.data; // Ensure it returns an array
  //return response.data;
};
export const getMealById= async (id)=>{
  const response = await axios.get(`${API_URL}/Meals/${id}`);
  return response.data;
}

/*const getRecipesByIngredients = async (ingredients) => {
  const response = await axios.post(`${API_URL}/Meals`, { ingredients });
  return response.data;
};

const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/Meals/${id}`);
  return response.data;
};*/

const getRecommendedRecipes = async (ingredientIds) => {
  const response = await axios.post(`${API_URL}/Meals/recommendations`, ingredientIds);
  return response.data;
};
/*export const createMeal = async meal => {
  const response = await fetch(`${API_URL}/Meals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(meal)
  });
  if (!response.ok) {
    throw new Error('Failed to create recipe');
  }
  return await response.json();
};*/
export const createMeal = (formData) => {
  return axios.post(`${API_URL}/Meals`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
};


export const updateMeal = async (id, meal) => {
  const response = await fetch(`${API_URL}/Meals/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(meal)
  });
  if (!response.ok) {
    throw new Error('Failed to update recipe');
  }
  return await response.json();
};

export const deleteMeal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/Meals/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting meal:', error);
    throw error;
  }
};

export default {
  getAllMeals,
  getIngredients,
  //getRecipesByIngredients,
  //getRecipeById,
  getRecommendedRecipes,
  deleteMeal
};
/*
export const getRecipes = async () => {
  try {
    const response = await axios.get(`/api/recipes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes', error);
    throw error;
  }
  
};
export const getRecipeById = async (id) => {
  const response = await axios.get(`/api/recipes/${id}`);
  return response.data;
};
export default recipeService;
*/
/*
const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const getRecipesByIngredients = async (ingredients) => {
  const response = await axios.post(`${API_URL}/search`, { ingredients });
  return response.data;
};

const addRecipe = async (recipe) => {
  const response = await axios.post(API_URL, recipe);
  return response.data;
};

const updateRecipe = async (id, recipe) => {
  const response = await axios.put(`${API_URL}/${id}`, recipe);
  return response.data;
};

export default {
  getRecipes,
  getRecipeById,
  getRecipesByIngredients,
  addRecipe,
  updateRecipe,
};*/