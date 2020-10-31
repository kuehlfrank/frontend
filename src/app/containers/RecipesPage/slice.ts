import { PayloadAction } from '@reduxjs/toolkit';
import { Recipe, RecipeOverview } from 'types/Recipe';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, RecipeError } from './types';

// The initial state of the Recipes container
export const initialState: ContainerState = {
  loadingRandom: true,
  loadingSuggestions: true,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    loadSuggestions(state) {
      state.loadingSuggestions = true;
    },
    loadRandom(state) {
      state.loadingRandom = true;
    },
    suggestedRecipesLoaded(state, action: PayloadAction<RecipeOverview[]>) {
      state.suggestedRecipes = action.payload;
      state.loadingSuggestions = false;
    },
    randomRecipeLoaded(state, action: PayloadAction<RecipeOverview>) {
      console.debug(action.payload);
      state.randomRecipe = action.payload;
      state.loadingRandom = false;
    },
    recipeError(state, action: PayloadAction<RecipeError>) {
      state.recipeError = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = recipesSlice;
