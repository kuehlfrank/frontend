import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { postPrivate, request, requestPrivate } from 'utils/request';
import {
  selectFormItemName,
  selectFormItemQuantity,
  selectFormItemUnit,
  selectScanResult,
  selectToken,
  selectUnits,
  selectUserId,
} from './selectors';
import { actions } from './slice';
import { Item } from 'types/Item';
import { CodeResult, ItemErrorType } from './types';
import { Inventory } from 'types/Inventory';
import { Unit } from 'types/Unit';
const API_URL: string = process.env.REACT_APP_API_SERVER_URL as string;

export function* getItems() {
  const token: string = yield select(selectToken);
  const userId: string = yield select(selectUserId);
  const requestURL = `${API_URL}/inventory/${encodeURIComponent(userId)}`;
  try {
    const inventory: Inventory = yield call(requestPrivate, requestURL, token);
    let items: Item[] = inventory.inventoryEntries.map(e => ({
      name: e.ingredient.name,
      quantity: e.amount,
      unit: e.unit,
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
  const requestURL = `${API_URL}/inventory/${userId}/inventoryEntry`;
  const unit = yield select(selectFormItemUnit);
  const item: any = {
    name: yield select(selectFormItemName),
    quantity: yield select(selectFormItemQuantity),
    unitId: unit.unitId,
    alternative_names: [],
  };

  try {
    const response = yield call(postPrivate, requestURL, token, item);
    yield put(actions.loadItems());
  } catch (err) {
    console.error(err);
  }
}

export function* getScannedItemInfo() {
  const codeResult = yield select(selectScanResult);

  const requestURL = `https://world.openfoodfacts.org/api/v0/product/${codeResult}.json`;

  try {
    const response = yield call(request, requestURL);

    yield put(actions.changeItemName(response.product.product_name));
    let quantity: string = response.product.quantity.split(' ') as string;
    yield put(actions.changeItemQuantity(parseInt(quantity[0])));
    let units = yield select(selectUnits);
    yield put(
      actions.changeItemUnit(units.find(unit => unit.label === quantity[1])),
    );
  } catch (err) {
    console.error(err);
  }
}

export function* getUnits() {
  const requestURL = `${API_URL}/units`;

  const token = yield select(selectToken);
  try {
    const response = yield call(requestPrivate, requestURL, token);
    yield put(actions.unitsLoaded(response));
  } catch (err) {
    console.error(err);
  }
}

export function* itemsRepoSaga() {
  yield takeLatest(actions.loadItems.type, getItems);
  yield takeLatest(actions.loadItems.type, getUnits);
  yield takeLatest(actions.loadItems.type, yield all([getItems, getUnits]));
  yield takeEvery(actions.addItem.type, addItem);
  yield takeLatest(actions.codeResultLoaded.type, getScannedItemInfo);
}
