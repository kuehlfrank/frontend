import React from 'react';
import { Card, Button, CardImg } from 'react-bootstrap';
import { Item } from 'types/Item';

interface Props {
  item: Item;
  onDelete?: (string, any) => any;
}

export function ItemElement({ item, onDelete }: Props) {
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
        <Button
          variant="danger"
          className="float-right"
          onClick={e => {
            if (onDelete) {
              onDelete(item.id, e);
            }
          }}
        >
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}
