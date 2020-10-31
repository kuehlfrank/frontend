import { Ingredient } from './Ingredient';
import { Unit } from './Unit';

export interface Recipe {
  recipeId: string;
  name: string;
  recipeIngredients: RecipeIngredient[];
}

export interface RecipeOverview {
  recipeId: string;
  title: string;
  imgSrc: string;
  missingIngredientCount: number;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  amount: number;
  unit: Unit;
}
