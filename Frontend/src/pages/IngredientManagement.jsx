import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/recipeService';
import '../css/IngredientManagement.css';

const IngredientManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ ingredientName: '' });

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(`${API_URL}/Ingredients`);
      setIngredients(response.data.$values || response.data || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleAddIngredient = async () => {
    try {
      const response = await axios.post(`${API_URL}/Ingredients`, newIngredient, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIngredients([...ingredients, response.data]);
      setNewIngredient({ ingredientName: '' });
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleDeleteIngredient = async (id) => {
    try {
      await axios.delete(`${API_URL}/Ingredients/${id}`);
      setIngredients(ingredients.filter((ingredient) => ingredient.ingredientID !== id));
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  const handleUpdateIngredient = async (id, updatedIngredient) => {
    try {
      await axios.put(`${API_URL}/Ingredients/${id}`, updatedIngredient, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIngredients(
        ingredients.map((ingredient) =>
          ingredient.ingredientID === id ? updatedIngredient : ingredient
        )
      );
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  return (
    <div className="ingredient-management">
      <h2>Ingredient Management</h2>
      <div className="add-ingredient">
        <input
          type="text"
          placeholder="Ingredient Name"
          value={newIngredient.ingredientName}
          onChange={(e) => setNewIngredient({ ingredientName: e.target.value })}
        />
        <button onClick={handleAddIngredient}>Add Ingredient</button>
      </div>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.ingredientID}>
            <input
              type="text"
              value={ingredient.ingredientName}
              onChange={(e) =>
                setIngredients(
                  ingredients.map((ing) =>
                    ing.ingredientID === ingredient.ingredientID
                      ? { ...ing, ingredientName: e.target.value }
                      : ing
                  )
                )
              }
              onBlur={() => handleUpdateIngredient(ingredient.ingredientID, ingredient)}
            />
            <button onClick={() => handleDeleteIngredient(ingredient.ingredientID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientManagement;
