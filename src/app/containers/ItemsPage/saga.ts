import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { postPrivate, request, requestPrivate } from 'utils/request';
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
  const userId: string = '';
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

export function* addItem() {
  const token: string = yield select(selectToken);
  const userId: string = '';
  const requestURL = `https://api.kuehlfrank.de/inventory?userId=${userId}`;
  const item: Item = {
    name: yield select(selectFormItemName),
    quantity: yield select(selectFormItemQuantity),
    unit: yield select(selectFormItemUnit),
  };

  try {
    const response = yield call(postPrivate, requestURL, token, item);
    yield put(actions.loadItems());
  } catch (err) {}
}

export function* itemsRepoSaga() {
  yield takeLatest(actions.loadItems.type, getItems);
  yield takeEvery(actions.addItem.type, addItem);
}
