import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request, requestPrivate } from 'utils/request';
import {
  selectFormItemName,
  selectFormItemQuantity,
  selectFormItemUnit,
  selectToken,
} from './selectors';
import { actions } from './slice';
import { Item } from 'types/Item';
import { ItemErrorType } from './types';

export function* getItems() {
  const token: string = yield select(selectToken);
  const requestURL = 'https://api.kuehlfrank.de/private/inventory';
  try {
    const items: Item[] = yield call(requestPrivate, requestURL, token);

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
