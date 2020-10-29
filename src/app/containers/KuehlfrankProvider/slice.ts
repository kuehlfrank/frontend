import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KuehlfrankState } from './types';

export const initialState: KuehlfrankState = {
  loading: true,
};

const appSlice = createSlice({
  name: 'kuehlfrankState',
  initialState: initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    beginLoading(state) {
      state.loading = true;
    },
    loaded(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = appSlice;
