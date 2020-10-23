import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { postPrivate, request, requestPrivate } from 'utils/request';
import {
  selectFormItemName,
  selectFormItemQuantity,
  selectFormItemUnit,
  selectToken,
  selectUserId,
} from './selectors';
import { actions } from './slice';
import { Item } from 'types/Item';
import { ItemErrorType } from './types';
import { Inventory } from 'types/Inventory';

export function* getItems() {
  const token: string = yield select(selectToken);
  const userId: string = encodeURIComponent(yield select(selectUserId));
  const requestURL = `https://api.kuehlfrank.de/inventory?userId=${userId}`;
  try {
    const inventory: Inventory = yield call(requestPrivate, requestURL, token);
    let items: Item[] = inventory.inventoryEntries.map(e => ({
      name: e.ingredient.name,
      quantity: e.amount,
      unit: e.unit.label,
    }));

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
  const userId: string = yield select(selectUserId);
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
