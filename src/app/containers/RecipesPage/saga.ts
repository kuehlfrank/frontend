import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { requestPrivate } from 'utils/request';
import { actions } from './slice';
import { selectUserId, selectToken } from '../KuehlfrankProvider/selectors';
import { Recipe, RecipeOverview } from 'types/Recipe';
import { RecipeError } from './types';
import { waitFor } from 'utils/wait-for';

const API_URL: string = process.env.REACT_APP_API_SERVER_URL as string;

export function* loadRandomRecipe() {
  const requestURL = `${API_URL}/recipes/random`;
  yield call(waitFor, state => selectToken(state) != null);
  const token = yield select(selectToken);
  try {
    const randomRecipe: RecipeOverview = yield call(
      requestPrivate,
      requestURL,
      token,
    );
    if (randomRecipe === undefined || randomRecipe == null) {
      yield put(actions.recipeError(RecipeError.COULD_NOT_LOAD_RANDOM_RECIPE));
    } else {
      yield put(actions.randomRecipeLoaded(randomRecipe));
    }
  } catch (err) {
    console.error(err);
    yield put(actions.recipeError(RecipeError.COULD_NOT_LOAD_RANDOM_RECIPE));
  }
}

export function* loadSuggestedRecipes() {
  const requestURL = `${API_URL}/recipes/suggestions`;
  yield call(waitFor, state => selectToken(state) != null);
  const token = yield select(selectToken);
  try {
    const recipes: RecipeOverview[] = yield call(
      requestPrivate,
      requestURL,
      token,
    );
    if (recipes === undefined || recipes == null) {
      yield put(
        actions.recipeError(RecipeError.COULD_NOT_LOAD_SUGGESTED_RECIPES),
      );
    } else {
      yield put(actions.suggestedRecipesLoaded(recipes));
    }
  } catch (err) {
    console.error(err);
    yield put(
      actions.recipeError(RecipeError.COULD_NOT_LOAD_SUGGESTED_RECIPES),
    );
  }
}

export function* recipesSaga() {
  yield* [
    takeLatest(actions.loadRandom.type, loadRandomRecipe),
    takeLatest(actions.loadSuggestions.type, loadSuggestedRecipes),
  ];
}
