import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state.kuehlfrankState || initialState;

export const selectUsername = createSelector(
  [selectDomain],
  kuehlfrankState => kuehlfrankState.username,
);

export const selectToken = createSelector(
  [selectDomain],
  kuehlfrankState => kuehlfrankState.token,
);

export const selectUserId = createSelector(
  [selectDomain],
  kuehlfrankState => kuehlfrankState.userId,
);

export const selectLoading = createSelector(
  [selectDomain],
  kuehlfrankState => kuehlfrankState.loading,
);
