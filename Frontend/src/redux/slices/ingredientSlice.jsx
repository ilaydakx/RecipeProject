
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5274/api';

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const response = await axios.get(`${BASE_URL}/Ingredients`);
  return response.data;
});

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState: {
    availableIngredients: [],
    selectedIngredients: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addIngredient: (state, action) => {
      state.selectedIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient !== action.payload
      );
    },
    clearIngredients: (state) => {
      state.selectedIngredients = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.availableIngredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addIngredient, removeIngredient, clearIngredients } = ingredientSlice.actions;
export default ingredientSlice.reducer;