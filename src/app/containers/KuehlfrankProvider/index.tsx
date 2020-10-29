/**
 *
 * KuehlfrankProvider
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { selectLoading } from './selectors';
import { kuehlfrankSaga } from './saga';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {}

export function KuehlfrankProvider({ children }) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: kuehlfrankSaga });

  const dispatch = useDispatch();

  const { user, getAccessTokenSilently } = useAuth0();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.beginLoading());
    getAccessTokenSilently()
      .then(t => {
        dispatch(actions.setUserId(user.sub));
        dispatch(actions.setUsername(user.name));
        dispatch(actions.setToken(t));
      })
      .catch(console.error);
    dispatch(actions.loaded());
  });
  return <>{children}</>;
}
