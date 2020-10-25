import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { postPrivate, request, requestPrivate } from 'utils/request';
import {
  selectFormItemName,
  selectFormItemQuantity,
  selectFormItemUnit,
  selectScanResult,
  selectToken,
  selectUserId,
} from './selectors';
import { actions } from './slice';
import { Item } from 'types/Item';
import { CodeResult, ItemErrorType } from './types';
import { Inventory } from 'types/Inventory';
const API_URL: string = process.env.REACT_APP_API_SERVER_URL as string;

export function* getItems() {
  const token: string = yield select(selectToken);
  const userId: string = encodeURIComponent(yield select(selectUserId));
  const requestURL = `${API_URL}/inventory?userId=${userId}`;
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
  const requestURL = `${API_URL}/inventory?userId=${userId}`;
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

export function* getScannedItemInfo() {
  const codeResult = yield select(selectScanResult);

  const requestURL = `https://world.openfoodfacts.org/api/v0/product/${codeResult}.json`;

  try {
    const response = yield call(request, requestURL);

    put(actions.changeItemName(response.product_name));
  } catch (err) {
    console.error(err);
  }
}

export function* itemsRepoSaga() {
  yield takeLatest(actions.loadItems.type, getItems);
  yield takeEvery(actions.addItem.type, addItem);
  yield takeLatest(actions.codeResultLoaded.type, getScannedItemInfo);
}
