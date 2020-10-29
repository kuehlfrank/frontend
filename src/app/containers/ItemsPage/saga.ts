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
  request,
  requestPrivate,
} from 'utils/request';
import {
  selectFormItemAlternativeNames,
  selectFormItemName,
  selectFormItemQuantity,
  selectFormItemUnit,
  selectItemIdToDelete,
  selectItemImgSrc,
  selectScanResult,
  selectUnits,
} from './selectors';
import { selectUserId, selectToken } from '../KuehlfrankProvider/selectors';
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
      id: e.inventoryEntryId,
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
  const requestURL = `${API_URL}/inventory/${encodeURIComponent(
    userId,
  )}/inventoryEntry`;
  const unit = yield select(selectFormItemUnit);
  const item: any = {
    name: yield select(selectFormItemName),
    quantity: yield select(selectFormItemQuantity),
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

    let quantity: string = response.product.quantity;
    let unitLabel = quantity.match('\\D.*')![0];
    let quantityNum = quantity.match('.*\\d')![0];
    yield put(actions.changeItemQuantity(parseInt(quantityNum)));
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
  const userId = yield select(selectUserId);
  const itemId = yield select(selectItemIdToDelete);
  const token = yield select(selectToken);
  const requestURL = `${API_URL}/inventory/${encodeURIComponent(
    userId,
  )}/inventoryEntry/${encodeURIComponent(itemId)}`;
  try {
    yield call(deletePrivate, requestURL, token);
  } catch (err) {
    console.error(err);
  }
  yield put(actions.loadItems);
}

export function* itemsRepoSaga() {
  yield* [
    takeLatest(actions.loadItems.type, getItems),
    takeLatest(actions.loadItems.type, getUnits),
    takeEvery(actions.addItem.type, addItem),
    takeLatest(actions.codeResultLoaded.type, getScannedItemInfo),
    takeLatest(actions.deleteItem, deleteItem),
  ];
}
