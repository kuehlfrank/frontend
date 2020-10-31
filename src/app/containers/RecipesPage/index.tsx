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
import { selectRandomRecipe, selectSuggestedRecipes } from './selectors';
import { recipesSaga } from './saga';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { RecipeItem } from './RecipeItem';
import { select } from 'redux-saga/effects';
import { RecipeOverview } from 'types/Recipe';

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
  const suggestedRecipes = useSelector(selectSuggestedRecipes);
  console.log(randomRecipe);

  useEffectOnMount(() => {
    dispatch(actions.loadRandom());
    dispatch(actions.loadSuggestions());
  });

  return (
    <>
      <Container className="mt-4">
        <Helmet>
          <title>Recipes</title>
          <meta name="description" content="Description of Recipes" />
        </Helmet>
        <Row>
          <Container>
            {randomRecipe && (
              <Container>
                <h5>Zufälliges Rezept</h5>
                <Row>
                  <Col md="4">
                    <RecipeItem recipe={randomRecipe} />
                  </Col>
                </Row>
              </Container>
            )}
          </Container>
        </Row>
        <Row>
          <Container>
            {suggestedRecipes && (
              <Container>
                <Row>
                  {suggestedRecipes.map(recipe => (
                    <Col md="4">
                      <RecipeItem recipe={recipe} />
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </Container>
        </Row>
      </Container>
    </>
  );
}

const Div = styled.div``;
