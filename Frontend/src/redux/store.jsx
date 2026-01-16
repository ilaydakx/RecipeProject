import { configureStore } from '@reduxjs/toolkit';
//import appReducer from '../redux/slices/appSlice';
import recipeReducer from './slices/recipeSlice';

const store = configureStore({
  reducer: {
    //app: appReducer,
    recipe: recipeReducer,
  },
});

export default store;