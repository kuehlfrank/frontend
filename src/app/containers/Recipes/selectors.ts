import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.recipes || initialState;

export const selectRecipes = createSelector(
  [selectDomain],
  recipesState => recipesState,
);
