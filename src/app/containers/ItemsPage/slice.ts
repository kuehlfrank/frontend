import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { CodeResult, ItemErrorType, ItemsPageState } from './types';
import { Item } from 'types/Item';
import { Unit } from 'types/Unit';

export const initialState: ItemsPageState = {
  formItem: {
    name: '',
    quantity: 0,
    unit: undefined,
    alternative_names: undefined,
    imgSrc: undefined,
  },
  units: [],
  validated: false,
  items: [],
  loading: false,
  error: null,
  token: null,
  scanning: false,
  result: null,
  scanModalShow: false,
};

const itemsFormSlice = createSlice({
  name: 'itemForm',
  initialState,
  reducers: {
    changeItemName(state, action: PayloadAction<string>) {
      state.formItem.name = action.payload;
    },
    changeItemUnit(state, action: PayloadAction<number>) {
      let unit = state.units.find(unit => unit.unitId === action.payload);
      state.formItem.unit = unit;
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
    setScanning(state, action: PayloadAction<boolean>) {
      state.scanning = action.payload;
      state.scanModalShow = action.payload;
    },
    codeResultLoaded(state, action: PayloadAction<string>) {
      state.scanning = false;
      state.scanModalShow = false;
      state.result = action.payload;
    },
    unitsLoaded(state, action: PayloadAction<Unit[]>) {
      state.units = action.payload;
    },
    changeItemImgSrc(state, action: PayloadAction<string>) {
      state.formItem.imgSrc = action.payload;
    },
    changeItemAlternativeName(state, action: PayloadAction<string[]>) {
      state.formItem.alternative_names = action.payload;
    },
    addItemAlternativeName(state, action: PayloadAction<string>) {
      if (
        state.formItem.alternative_names === undefined ||
        state.formItem.alternative_names === null
      ) {
        state.formItem.alternative_names = [] as string[];
      }
      state.formItem.alternative_names?.push(action.payload);
    },
  },
});

export const { actions, reducer, name: sliceKey } = itemsFormSlice;
