import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import {
  selectFormItemName,
  selectFormItemQuantity,
  selectFormItemUnit,
} from './selectors';
import { actions } from './slice';
import { Item } from 'types/Item';
import { ItemErrorType } from './types';

export function* getItems() {
  yield delay(500);

  const requestURL = 'http://google.com';

  try {
    const items: Item[] = yield call(request, requestURL);

    if (items?.length > 0) {
      yield put(actions.itemsLoaded(items));
    } else {
      yield put(actions.itemError(ItemErrorType.ITEMS_NOT_FOUND));
    }
  } catch (err) {
    yield put(actions.itemError(ItemErrorType.GENERIC_ERROR));
  }
}

export function* itemsRepoSaga() {
  yield takeLatest(actions.loadItems.type, getItems);
}
