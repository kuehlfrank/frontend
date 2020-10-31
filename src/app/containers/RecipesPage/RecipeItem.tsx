import React from 'react';
import { Card, Button, CardImg, Badge } from 'react-bootstrap';
import { Item } from 'types/Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { RecipeOverview } from 'types/Recipe';

interface Props {
  recipe: RecipeOverview;
}

export function RecipeItem({ recipe }: Props) {
  return (
    <Card className="mb-4">
      <Card.Header>
        <Card.Title>
          {recipe.title}{' '}
          <Badge variant="info">
            {recipe.missingIngredientCount} fehlende Zutaten
          </Badge>
        </Card.Title>
      </Card.Header>
      {/* {recipe.imgSrc !== null && recipe.imgSrc !== undefined ? (
        <CardImg src={recipe.imgSrc} />
      ) : null} */}
      <Card.Body>
        <Card.Img src={recipe.imgSrc}></Card.Img>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
}
