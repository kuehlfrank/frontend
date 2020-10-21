import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { itemsRepoSaga } from './saga';
import {
  selectItems,
  selectLoading,
  selectError,
  selectFormItemName,
  selectFormItemUnit,
  selectFormItemQuantity,
} from './selectors';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  InputGroup,
} from 'react-bootstrap';
import { sliceKey, reducer, actions } from './slice';
import { Item } from 'types/Item';
import { ItemElement } from './ItemElement';

export function ItemsPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: itemsRepoSaga });

  const items = useSelector(selectItems);
  const formItemName = useSelector(selectFormItemName);
  const formItemUnit = useSelector(selectFormItemUnit);
  const formItemQuantity = useSelector(selectFormItemQuantity);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.loadItems());
  });

  const onChangeFormItemName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeItemName(evt.currentTarget.value));
  };

  const onChangeFormItemUnit = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeItemUnit(evt.currentTarget.value));
  };

  const onChangeFormItemQuantity = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(actions.changeItemQuantity(Number(evt.currentTarget.value)));
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLElement>) => {
    let item: Item = {
      name: formItemName,
      unit: formItemUnit,
      quantity: formItemQuantity,
    };
    if (evt !== undefined && evt.preventDefault) {
      dispatch(actions.addItem(item));
      evt.preventDefault();
    } else {
      //   dispatch(actions.loadItems);
    }
  };

  return (
    <>
      <Helmet>
        <title>Items</title>
      </Helmet>
      <Container fluid="md">
        <Row>
          <Col>
            <Form inline onSubmit={onSubmitForm}>
              <Form.Row>
                <FormGroup as={Col} md="4">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <Form.Label className="input-group-text">Name</Form.Label>
                    </InputGroup.Prepend>
                    <Form.Control
                      value={formItemName}
                      onChange={onChangeFormItemName}
                    ></Form.Control>
                  </InputGroup>
                </FormGroup>
                <FormGroup as={Col} md="3">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <Form.Label className="input-group-text">Unit</Form.Label>
                    </InputGroup.Prepend>
                    <Form.Control
                      value={formItemUnit}
                      onChange={onChangeFormItemUnit}
                    ></Form.Control>
                  </InputGroup>
                </FormGroup>
                <FormGroup as={Col} md="2">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <Form.Label className="input-group-text">
                        Quantity
                      </Form.Label>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="number"
                      value={formItemQuantity}
                      onChange={onChangeFormItemQuantity}
                    ></Form.Control>
                  </InputGroup>
                </FormGroup>
                <FormGroup as={Col} md="3">
                  <Button type="submit">Add item</Button>
                </FormGroup>
              </Form.Row>
            </Form>
          </Col>
        </Row>
        <Row>
          {items.map(item => (
            <Col xs="3">
              <ItemElement
                name={item.name}
                unit={item.unit}
                quantity={item.quantity}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
