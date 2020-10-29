import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions } from './slice';
import { selectToken, selectUserId, selectUsername } from './selectors';
import { postPrivate } from 'utils/request';
const API_URL: string = process.env.REACT_APP_API_SERVER_URL as string;

export function* ensureRegistered() {
  const token = yield select(selectToken);
  const userId = yield select(selectUserId);
  const data = {
    username: yield select(selectUsername),
  };

  yield call(postPrivate, `${API_URL}/ensureRegistered`, token, data);
}

export function* kuehlfrankSaga() {
  yield takeLatest(actions.setToken.type, ensureRegistered);
}
