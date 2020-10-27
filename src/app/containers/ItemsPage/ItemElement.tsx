import React from 'react';
import { Card, Button, CardImg } from 'react-bootstrap';
import { Item } from 'types/Item';

interface Props {
  item: Item;
}

export function ItemElement({ item }: Props) {
  return (
    <Card className="mb-4">
      <Card.Header>
        <Card.Title>{item.name}</Card.Title>
      </Card.Header>
      {item.imgSrc !== null && item.imgSrc !== undefined ? (
        <CardImg src={item.imgSrc} />
      ) : null}
      <Card.Body>
        <p>
          {item.quantity} {item.unit?.label}
        </p>
      </Card.Body>
      <Card.Footer>
        <Button variant="danger" className="float-right">
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}
