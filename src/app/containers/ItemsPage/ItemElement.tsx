import React from 'react';
import { Card, Button, CardImg } from 'react-bootstrap';
import { Item } from 'types/Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBalanceScale } from '@fortawesome/free-solid-svg-icons';

interface Props {
  item: Item;
  onDelete?: (string, any) => any;
  onEdit?: (string, any) => any;
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
          {item.amount} {item.unit?.label}
        </p>
      </Card.Body>
      <Card.Footer className="justify-content-between">
        <Button variant="primary" className="float-left" onClick={e => {}}>
          Menge anpassen
        </Button>
        <Button
          variant="danger"
          className="float-right"
          onClick={e => {
            if (onDelete) {
              onDelete(item.id, e);
            }
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
          &nbsp; Löschen
        </Button>
      </Card.Footer>
    </Card>
  );
}
