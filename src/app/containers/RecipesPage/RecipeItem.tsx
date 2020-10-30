import React from 'react';
import { Card, Button, CardImg } from 'react-bootstrap';
import { Item } from 'types/Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from 'types/Recipe';

interface Props {
  recipe: Recipe;
}

export function RecipeItem({ recipe }: Props) {
  return (
    <Card className="mb-4">
      <Card.Header>
        <Card.Title>{recipe.name}</Card.Title>
      </Card.Header>
      {/* {recipe.imgSrc !== null && recipe.imgSrc !== undefined ? (
        <CardImg src={recipe.imgSrc} />
      ) : null} */}
      <Card.Body>
        <p>Zutaten:</p>
        <ul>
          {recipe.recipeIngredients.map(ingredient => {
            return (
              <li>
                {ingredient.amount !== 0 && ingredient.amount}{' '}
                {ingredient.unit?.label} {ingredient.ingredient.name}
              </li>
            );
          })}
        </ul>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
}
