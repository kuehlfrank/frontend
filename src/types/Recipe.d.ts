import { Ingredient } from './Ingredient';
import { Unit } from './Unit';

export interface Recipe {
  recipeId: string;
  title: string;
  recipeIngredients: RecipeIngredient[];
  imgSrc: string;
  externalUrl: string;
  common: boolean;
  missingIngredientsCount: number;
  totalIngredientsCount: number;
}
export interface RecipeIngredient {
  amount: number;
  ingredient: Ingredient;
  missing: boolean;
  unit: Unit;
}

export interface RecipeOverview {
  recipeId: string;
  title: string;
  imgSrc: string;
  missingIngredientsCount: number;
  totalIngredientsCount: number;
  externalSource: string;
}
