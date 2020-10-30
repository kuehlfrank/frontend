import { Recipe } from 'types/Recipe';

/* --- STATE --- */
export interface RecipesState {
  randomRecipe?: Recipe | null | undefined;
  suggestedRecipes?: Recipe[] | null | undefined;
  loadingSuggestions: boolean;
  loadingRandom: boolean;
  recipeError?: RecipeError | null | undefined;
}

export enum RecipeError {
  COULD_NOT_LOAD_RECIPE = 'Could not load Recipe',
}

export type ContainerState = RecipesState;
