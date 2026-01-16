/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addIngredient } from '../redux/slices/ingredientSlice';

const IngredientSelector = ({ onIngredientsChange }) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const handleAddIngredient = () => {
        dispatch(addIngredient(ingredient));
        setIngredient('');

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await axios.get('http://localhost:5274/api/Ingredients');
            setIngredients(response.data);
        };

        fetchIngredients();
    }, []);

    const handleCheckboxChange = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            const newSelected = selectedIngredients.filter(i => i !== ingredient);
            setSelectedIngredients(newSelected);
            onIngredientsChange(newSelected);
        } else {
            const newSelected = [...selectedIngredients, ingredient];
            setSelectedIngredients(newSelected);
            onIngredientsChange(newSelected);
        }
    };

    const clearAll = () => {
        setSelectedIngredients([]);
        onIngredientsChange([]);
    }
    };
    return (
        <div>
            <h2>What's in your fridge?</h2>
            <div className='ingredient-list'>
                {ingredients.map((ingredient) => (
                    <label key={ingredient.ingredientID}>
                        <input
                            type="checkbox"
                            checked={selectedIngredients.includes(ingredient.ingredientName)}
                            onChange={() => handleCheckboxChange(ingredient.ingredientName)}
                        />
                        {ingredient.ingredientName}
                    </label>
                ))}
            </div>
            <div>
                <h3>Your Ingredients:</h3>
                {selectedIngredients.length === 0 ? (
                    <p>You don't have any selected ingredients.</p>
                ) : (
                    <ul>
                        {selectedIngredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient}
                                <button onClick={() => handleCheckboxChange(ingredient)}>x</button>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={clearAll}>Clear All</button>
            </div>
        </div>
    );
};

export default IngredientSelector;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function IngredientSelector({ onSelectIngredient }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5274/api/Ingredients')
      .then(response => {
        setIngredients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the ingredients!', error);
      });
  }, []);

  const handleChange = (e) => {
    onSelectIngredient(parseInt(e.target.value));
  };

  return (
    <div>
      <h2>What's in your fridge?</h2>
      {ingredients.map(ingredient => (
        <div key={ingredient.ingredientID}>
          <input
            type="checkbox"
            value={ingredient.ingredientID}
            onChange={handleChange}
          />
          <label>{ingredient.ingredientName}</label>
        </div>
      ))}
    </div>
  );
}

export default IngredientSelector;
