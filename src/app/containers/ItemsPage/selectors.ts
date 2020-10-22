import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.itemForm || initialState;

export const selectToken = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.token,
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

export const selectFormItemQuantity = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.formItem.quantity,
);

export const selectLoading = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  itemsFormState => itemsFormState.error,
);
