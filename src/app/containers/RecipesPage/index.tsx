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
import {
  detailRecipe,
  selectRandomRecipe,
  selectShowDetailModal,
  selectSuggestedRecipes,
} from './selectors';
import { recipesSaga } from './saga';
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  ModalProps,
} from 'react-bootstrap';
import { RecipeItem } from './RecipeItem';
import { select } from 'redux-saga/effects';
import { Recipe, RecipeOverview } from 'types/Recipe';

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

  function onDetails(id, e) {
    dispatch(actions.loadDetails(id));
  }

  const randomRecipe = useSelector(selectRandomRecipe);
  const suggestedRecipes = useSelector(selectSuggestedRecipes);
  const showDetails = useSelector(selectShowDetailModal);
  const currentDetailRecipe = useSelector(detailRecipe);

  useEffectOnMount(() => {
    dispatch(actions.loadRandom());
    dispatch(actions.loadSuggestions());
  });

  function RecipeDetailModal(props) {
    let recipe = props.recipe as Recipe;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {recipe.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {recipe.recipeIngredients?.map((ingredient, i) => (
              <li key={i}>
                <p className={ingredient.missing ? 'text-danger' : ''}>
                  {ingredient.amount !== 0 && ingredient.amount}{' '}
                  {ingredient.unit?.label} {ingredient.ingredient.name}
                </p>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="danger">
            Close
          </Button>

          <Button href={recipe.externalUrl} variant="primary">
            Zum Rezept
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Container className="mt-4">
        <Helmet>
          <title>Recipes</title>
          <meta name="description" content="Description of Recipes" />
        </Helmet>
        {/* <Row>
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
        </Row> */}
        <h4 className="display-4">Was koche ich heute?</h4>
        <Row>
          <Container>
            {suggestedRecipes && (
              <Container>
                <Row>
                  {suggestedRecipes.map((recipe, i) => (
                    <Col md="4" key={i}>
                      <RecipeItem
                        recipe={recipe}
                        onDetails={(id, e) => dispatch(actions.loadDetails(id))}
                      />
                    </Col>
                  ))}
                  {currentDetailRecipe !== undefined && (
                    <>
                      <RecipeDetailModal
                        show={showDetails}
                        recipe={currentDetailRecipe as Recipe}
                        onHide={() => dispatch(actions.hideDetails())}
                      />
                    </>
                  )}
                </Row>
              </Container>
            )}
          </Container>
        </Row>
      </Container>
    </>
  );
}
