import React from 'react';
import {
  Card,
  Button,
  CardImg,
  Modal,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { Item } from 'types/Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, actions, reducer } from './slice';
import { itemsRepoSaga } from './saga';
import { useDispatch, useSelector } from 'react-redux';
import { selectUnits } from './selectors';
import { selectShowDetailModal } from '../RecipesPage/selectors';

interface Props {
  item: Item;
  onDelete?: (string, any) => any;
  onEdit?: (item: Item, any) => any;
}

export function ItemElement({ item, onDelete, onEdit }: Props) {
  const dispatch = useDispatch();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({
    key: sliceKey,
    saga: itemsRepoSaga,
  });
  return (
    <>
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
        <Card.Footer>
          <Row className="justify-content-between">
            <Button
              size="sm"
              variant="primary"
              className="float-left"
              onClick={e => onEdit && onEdit(item, e)}
            >
              <FontAwesomeIcon icon={faBalanceScale} />
              &nbsp; Bearbeiten
            </Button>
            <Button
              size="sm"
              variant="danger"
              className="float-right"
              onClick={e => {
                if (onDelete) {
                  console.debug(item);
                  onDelete(item.id, e);
                }
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
}
