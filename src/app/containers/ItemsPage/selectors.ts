import { createSelector } from '@reduxjs/toolkit';
import { select } from 'redux-saga/effects';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.itemForm || initialState;

export const selectFormItem = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.formItem,
);

export const selectItems = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.items,
);

export const selectFormItemName = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.formItem.name,
);

export const selectValidated = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.validated,
);

export const selectFormItemUnit = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.formItem.unit,
);

export const selectFormItemAmount = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.formItem.amount,
);

export const selectLoading = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.error,
);

export const selectScanning = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.scanning,
);

export const selectScanResult = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.result,
);

export const selectUnits = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.units,
);

export const selectScanModalShow = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.scanModalShow,
);

export const selectItemImgSrc = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.formItem.imgSrc,
);

export const selectFormItemAlternativeNames = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.formItem.alternative_names,
);

export const selectItemIdToDelete = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.itemIdToDelete,
);

export const isShowEditModal = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.showEditModal,
);

export const selectUpdatedItem = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.updatedItem,
);

export const selectIngredientNames = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.ingredientNames,
);
