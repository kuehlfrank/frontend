import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
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
  selectValidated,
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
  Spinner,
  Alert,
} from 'react-bootstrap';
import { sliceKey, reducer, actions } from './slice';
import { Item } from 'types/Item';
import { ItemElement } from './ItemElement';

export function ItemsPage() {
  const { getAccessTokenSilently, user } = useAuth0();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({
    key: sliceKey,
    saga: itemsRepoSaga,
  });

  const items = useSelector(selectItems);
  const formItemName = useSelector(selectFormItemName);
  const formItemUnit = useSelector(selectFormItemUnit);
  const formItemQuantity = useSelector(selectFormItemQuantity);
  const validated = useSelector(selectValidated);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  function loadItemsWithToken() {
    getAccessTokenSilently()
      .then(t => {
        dispatch(actions.setToken(t));
        dispatch(actions.setUserId(user.sub));
      })
      .then(() => {
        dispatch(actions.loadItems());
      });
  }

  useEffectOnMount(() => {
    loadItemsWithToken();
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

  const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    const form = evt.currentTarget;
    let item: Item = {
      name: formItemName,
      unit: formItemUnit,
      quantity: formItemQuantity,
    };
    if (evt !== undefined && evt.preventDefault) {
      if (form.checkValidity() === false) {
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        getAccessTokenSilently().then(t => {
          dispatch(actions.setToken(t));
        });
        dispatch(actions.addItem(item));
        dispatch(actions.loadItems());
        evt.preventDefault();
      }
      dispatch(actions.validateForm(true));
    } else {
    }
  };

  function errorString() {
    if (error !== null) {
      switch (error) {
        case 1:
          break;
        case 99:
          return 'Could not fetch data.';
        default:
          return '';
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Items</title>
      </Helmet>
      <Container>
        <Form onSubmit={onSubmitForm} noValidate validated={validated}>
          <Form.Row>
            <FormGroup as={Col} md="4" controlId="validationName">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Name</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  value={formItemName}
                  onChange={onChangeFormItemName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please give a name.
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <FormGroup as={Col} md="3" controlId="validationUnit">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="input-group-text">
                    Unit
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  value={formItemUnit}
                  onChange={onChangeFormItemUnit}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please give an unit.
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <FormGroup as={Col} md="4" controlId="ValidationQuantity">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Quantity</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  value={formItemQuantity}
                  onChange={onChangeFormItemQuantity}
                  min="0.001"
                  step="any"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Give a quantity greater than 0.
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <FormGroup as={Col}>
              <Button type="submit" className="float-right">
                Add
              </Button>
            </FormGroup>
          </Form.Row>
        </Form>
      </Container>
      <Container>
        <Row>
          {loading && (
            <Col md="3" key="-2">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          )}
          {error !== null && (
            <Col md="12" key="-1">
              <Alert variant="danger">{errorString()}</Alert>
            </Col>
          )}
          {items.map((item, i) => (
            <Col md="3" key={i}>
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
