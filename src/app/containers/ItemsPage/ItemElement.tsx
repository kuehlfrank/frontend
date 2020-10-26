import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface Props {
  name: string;
  unit: string;
  quantity: number;
}

export function ItemElement({ name, unit, quantity }: Props) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <p>
          {quantity} {unit}
        </p>
      </Card.Body>
      <Card.Footer>
        <Button variant="danger">Delete</Button>
      </Card.Footer>
    </Card>
  );
}
