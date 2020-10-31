import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  deletePrivate,
  postPrivate,
  putPrivate,
  request,
  requestPrivate,
} from 'utils/request';
import {
  selectFormItemAlternativeNames,
  selectFormItemName,
  selectFormItemAmount,
  selectFormItemUnit,
  selectItemIdToDelete,
  selectItemImgSrc,
  selectScanResult,
  selectUnits,
  selectUpdatedItem,
} from './selectors';
import { selectUserId, selectToken } from '../KuehlfrankProvider/selectors';
import { actions } from './slice';
import { Item } from 'types/Item';
import { CodeResult, ItemErrorType } from './types';
import { Inventory } from 'types/Inventory';
import { Unit } from 'types/Unit';
import { waitFor } from 'utils/wait-for';
const API_URL: string = process.env.REACT_APP_API_SERVER_URL as string;

export function* getItems() {
  yield call(
    waitFor,
    state => selectToken(state) != null && selectUserId(state) != null,
  );
  const token: string = yield select(selectToken);
  const userId: string = yield select(selectUserId);
  const requestURL = `${API_URL}/inventory`;
  try {
    const inventory: Inventory = yield call(requestPrivate, requestURL, token);
    let items: Item[] = inventory.inventoryEntries.map(e => ({
      id: e.inventoryEntryId,
      name: e.ingredient.name,
      amount: e.amount,
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
  yield call(waitFor, state => selectToken(state) != null);
  const token: string = yield select(selectToken);
  const requestURL = `${API_URL}/inventory/inventoryEntry`;
  const unit = yield select(selectFormItemUnit);
  const item: any = {
    name: yield select(selectFormItemName),
    amount: yield select(selectFormItemAmount),
    unitId: unit.unitId,
    imgSrc: yield select(selectItemImgSrc),
    alternative_names: yield select(selectFormItemAlternativeNames),
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
    if (response.product.product_name_de !== '')
      yield put(actions.changeItemName(response.product.product_name_de));
    else yield put(actions.changeItemName(response.product.product_name));

    let amount: string = response.product.amount;
    let unitLabel = amount.match('\\D.*')![0];
    let amountNum = amount.match('.*\\d')![0];
    yield put(actions.changeItemAmount(parseInt(amountNum)));
    const units = yield select(selectUnits);
    yield put(
      actions.changeItemUnit(units.find(unit => unit.label === unitLabel)),
    );
    yield put(actions.changeItemImgSrc(response.product.image_front_url));
    if (response.product.generic_name_de !== '') {
      yield put(
        actions.addItemAlternativeName(response.product.generic_name_de),
      );
      console.log(response.product.generic_name_de);
    }
    if (response.product.generic_name !== '') {
      console.log(response.product.generic_name);
      yield put(actions.addItemAlternativeName(response.product.generic_name));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* getUnits() {
  yield call(waitFor, state => selectToken(state) != null);
  const requestURL = `${API_URL}/units`;

  const token = yield select(selectToken);
  try {
    const response = yield call(requestPrivate, requestURL, token);
    yield put(actions.unitsLoaded(response));
  } catch (err) {
    console.error(err);
  }
}

export function* deleteItem() {
  yield call(waitFor, state => selectToken(state) != null);
  const itemId = yield select(selectItemIdToDelete);
  const token = yield select(selectToken);
  const requestURL = `${API_URL}/inventory/inventoryEntry/${encodeURIComponent(
    itemId,
  )}`;
  try {
    yield call(deletePrivate, requestURL, token);
  } catch (err) {
    console.error(err);
  }
  yield put(actions.loadItems());
}

export function* updateItem() {
  yield call(waitFor, state => selectToken(state) != null);
  const item: Item = yield select(selectUpdatedItem);
  const token = yield select(selectToken);
  if (item == null) return;
  if (item.amount === undefined && item.unit === undefined) return;
  const requestURL = `${API_URL}/inventory/inventoryEntry/${item.id}`;
  try {
    yield call(putPrivate, requestURL, token, item);
    yield put(actions.loadItems());
  } catch (err) {
    console.error(err);
  }
}

export function* itemsRepoSaga() {
  yield* [
    takeLatest(actions.loadItems.type, getItems),
    takeLatest(actions.loadItems.type, getUnits),
    takeEvery(actions.addItem.type, addItem),
    takeLatest(actions.codeResultLoaded.type, getScannedItemInfo),
    takeLatest(actions.deleteItem.type, deleteItem),
    takeLatest(actions.updateItem.type, updateItem),
  ];
}
