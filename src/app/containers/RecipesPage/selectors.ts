import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.recipes || initialState;

export const selectSuggestedRecipes = createSelector(
  [selectDomain],
  recipesState => recipesState.suggestedRecipes,
);
export const selectRandomRecipe = createSelector(
  [selectDomain],
  recipesState => recipesState.randomRecipe,
);
export const IsLoadingRandomRecipe = createSelector(
  [selectDomain],
  recipesState => recipesState.loadingRandom,
);

export const IsLoadingSuggestedRecipes = createSelector(
  [selectDomain],
  recipesState => recipesState.loadingSuggestions,
);
