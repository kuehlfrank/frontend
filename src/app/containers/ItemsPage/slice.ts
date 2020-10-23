import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ItemErrorType, ItemsPageState } from './types';
import { Item } from 'types/Item';

export const initialState: ItemsPageState = {
  formItem: { name: '', quantity: 0, unit: '' },
  validated: false,
  items: [],
  loading: false,
  error: null,
  token: null,
};

const itemsFormSlice = createSlice({
  name: 'itemForm',
  initialState,
  reducers: {
    changeItemName(state, action: PayloadAction<string>) {
      state.formItem.name = action.payload;
    },
    changeItemUnit(state, action: PayloadAction<string>) {
      state.formItem.unit = action.payload;
    },
    changeItemQuantity(state, action: PayloadAction<number>) {
      state.formItem.quantity = action.payload;
    },
    validateForm(state, action: PayloadAction<boolean>) {
      state.validated = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    loadItems(state) {
      state.loading = true;
      state.error = null;
      state.items = [];
    },
    itemsLoaded(state, action: PayloadAction<Item[]>) {
      const items = action.payload;
      state.items = items;
      state.loading = false;
    },
    itemError(state, action: PayloadAction<ItemErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
  },
});

export const { actions, reducer, name: sliceKey } = itemsFormSlice;
