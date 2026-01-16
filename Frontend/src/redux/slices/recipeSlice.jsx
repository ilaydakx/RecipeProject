
import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    recipes: [],
    selectedRecipe: {},
    loading: false,
    error: null
  };
  const BASE_URL='http://localhost:5274/api';

export const getAllRecipes = createAsyncThunk('recipes/getAllRecipes', async()=>{
  try {
    const response = await axios.get(`${BASE_URL}/Meals`);
    return response.data.$values; // Adjust this if your response structure is different
  } catch (error) {
    throw Error('Failed to fetch recipes');
  }
    //const response = await axios.get(`${BASE_URL}/Meals`); 
    //return response.data;

});
  /*export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {

    },*/
    const recipeSlice = createSlice({
      name: 'recipe',
      initialState,
      reducers: {},
      extraReducers: (builder) => {
        builder.addCase(getAllRecipes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllRecipes.fulfilled, (state, action) =>{
            state.loading = false;
            state.recipes = action.payload;
        });
        builder.addCase(getAllRecipes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });

    },
  });
  
  //export const { } = recipeSlice.actions
  export default recipeSlice.reducer;
  