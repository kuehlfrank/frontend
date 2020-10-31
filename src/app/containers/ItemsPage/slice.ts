import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { CodeResult, ItemErrorType, ItemsPageState } from './types';
import { Item } from 'types/Item';
import { Unit } from 'types/Unit';
import { useSelector } from 'react-redux';
import { selectUserId } from '../KuehlfrankProvider/selectors';
import { select } from 'redux-saga/effects';

const API_URL: string = process.env.REACT_APP_API_SERVER_URL as string;
export const initialState: ItemsPageState = {
  formItem: {
    name: '',
    amount: 0,
    unit: undefined,
    alternative_names: undefined,
    imgSrc: undefined,
  },
  units: [],
  validated: false,
  items: [],
  loading: false,
  error: null,
  scanning: false,
  result: null,
  scanModalShow: false,
  showEditModal: false,
  ingredientNames: [],
};

const itemsFormSlice = createSlice({
  name: 'itemForm',
  initialState,
  reducers: {
    changeItemName(state, action: PayloadAction<string>) {
      state.formItem.name = action.payload;
    },
    changeItemUnit(state, action: PayloadAction<Unit>) {
      state.formItem.unit = action.payload;
    },
    setItemUnitById(state, action: PayloadAction<string>) {
      let unit = state.units.find(unit => unit.unitId === action.payload);
      state.formItem.unit = unit;
    },
    changeItemAmount(state, action: PayloadAction<number>) {
      state.formItem.amount = action.payload;
    },
    validateForm(state, action: PayloadAction<boolean>) {
      state.validated = action.payload;
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
      state.formItem.unit = action.payload[0];
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
    deleteItem(state, action: PayloadAction<string>) {
      if (state.items.findIndex(i => i.id === action.payload) !== -1) {
        state.itemIdToDelete = action.payload;
      }
    },
    showEditModal(state, action: PayloadAction<Item>) {
      state.showEditModal = true;
      state.updatedItem = action.payload;
    },
    hideEditModal(state) {
      state.showEditModal = false;
    },
    updateItemAmount(state, action: PayloadAction<number>) {
      if (state.updatedItem) {
        state.updatedItem.amount = action.payload;
      }
    },
    updateItemUnit(state, action: PayloadAction<Unit>) {
      if (state.updatedItem) {
        state.updatedItem.unit = action.payload;
      }
    },
    updateItem(state) {},
    typeaheadLoaded(state, action: PayloadAction<string[]>) {
      state.ingredientNames = action.payload;
    },
    addIngredientName(state, action: PayloadAction<string>) {
      state.ingredientNames?.push(action.payload);
    },
  },
});

export const { actions, reducer, name: sliceKey } = itemsFormSlice;
