import React from 'react';
import { Card, Button, CardImg, Badge } from 'react-bootstrap';
import { Item } from 'types/Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { RecipeOverview } from 'types/Recipe';
import LazyLoad from 'react-lazyload';

interface Props {
  recipe: RecipeOverview;
  onDetails?: (string, any) => any;
}

export function RecipeItem({ recipe, onDetails }: Props) {
  return (
    <Card className="mb-4">
      <Card.Header>
        <Card.Title>{recipe.title} </Card.Title>
        <Badge variant="info" className="float-right">
          {recipe.missingIngredientsCount > 0 ? (
            <>{recipe.missingIngredientsCount} missing Ingredients</>
          ) : null}
        </Badge>
      </Card.Header>
      {recipe.imgSrc !== null && recipe.imgSrc !== undefined ? (
        <LazyLoad once height={337}>
          <CardImg src={recipe.imgSrc} />
        </LazyLoad>
      ) : null}
      <Card.Footer>
        <div className="d-flex align-items-center justify-content-between">
          <span className="text-muted align-bottom">
            {recipe.externalSource}{' '}
          </span>
          <Button
            className="float-right"
            onClick={e => {
              if (onDetails) {
                onDetails(recipe.recipeId, e);
              }
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
