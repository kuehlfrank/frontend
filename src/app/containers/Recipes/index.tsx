/**
 *
 * Recipes
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectRecipes } from './selectors';
import { recipesSaga } from './saga';

interface Props {}

export function Recipes(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: recipesSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const recipes = useSelector(selectRecipes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Recipes</title>
        <meta name="description" content="Description of Recipes" />
      </Helmet>
      <Div></Div>
    </>
  );
}

const Div = styled.div``;
