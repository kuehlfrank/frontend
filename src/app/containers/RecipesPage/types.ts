import { Recipe, RecipeOverview } from 'types/Recipe';

/* --- STATE --- */
export interface RecipesState {
  randomRecipe?: RecipeOverview | null | undefined;
  suggestedRecipes?: RecipeOverview[] | null | undefined;
  loadingSuggestions: boolean;
  loadingRandom: boolean;
  recipeError?: RecipeError | null | undefined;
  currentRecipeId?: string;
  showDetailModal: boolean;
  detailRecipe?: Recipe;
}

export enum RecipeError {
  COULD_NOT_LOAD_RANDOM_RECIPE = 'Could not load random Recipe',
  COULD_NOT_LOAD_SUGGESTED_RECIPES = 'Could not load suggested Recipes',
}

export type ContainerState = RecipesState;
