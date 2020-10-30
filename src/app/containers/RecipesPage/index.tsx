/**
 *
 * Recipes
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectRandomRecipe } from './selectors';
import { recipesSaga } from './saga';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { RecipeItem } from './RecipeItem';
import { select } from 'redux-saga/effects';
import { Recipe } from 'types/Recipe';

interface Props {}

export function Recipes(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: recipesSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  const randomRecipe = useSelector(selectRandomRecipe);
  console.log(randomRecipe);

  useEffectOnMount(() => {
    dispatch(actions.loadRandom());
  });

  return (
    <>
      <Container className="mt-4">
        <Helmet>
          <title>Recipes</title>
          <meta name="description" content="Description of Recipes" />
        </Helmet>
        {randomRecipe && (
          <Container>
            <h5>Zufälliges Rezept</h5>
            <Row>
              <Col md="4">
                <RecipeItem recipe={randomRecipe as Recipe} />
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
}

const Div = styled.div``;
