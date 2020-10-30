import { Ingredient } from './Ingredient';
import { Unit } from './Unit';

export interface Recipe {
  recipeId: string;
  name: string;
  recipeIngredients: RecipeIngredient[];
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  amount: number;
  unit: Unit;
}
