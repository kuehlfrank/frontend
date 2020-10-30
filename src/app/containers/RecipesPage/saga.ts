import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { requestPrivate } from 'utils/request';
import { actions } from './slice';
import { selectUserId, selectToken } from '../KuehlfrankProvider/selectors';
import { Recipe } from 'types/Recipe';
import { RecipeError } from './types';
import { waitFor } from 'utils/wait-for';

const API_URL: string = process.env.REACT_APP_API_SERVER_URL as string;

export function* loadRandomRecipe() {
  const requestURL = `${API_URL}/recipes/random`;
  yield call(waitFor, state => selectToken(state) != null);
  const token = yield select(selectToken);
  try {
    const randomRecipe: Recipe = yield call(requestPrivate, requestURL, token);
    if (randomRecipe == undefined || randomRecipe == null) {
      yield put(actions.recipeError(RecipeError.COULD_NOT_LOAD_RECIPE));
    } else {
      yield put(actions.randomRecipeLoaded(randomRecipe));
    }
  } catch (err) {
    console.error(err);
    yield put(actions.recipeError(RecipeError.COULD_NOT_LOAD_RECIPE));
  }
}

export function* recipesSaga() {
  yield* [takeLatest(actions.loadRandom.type, loadRandomRecipe)];
}
