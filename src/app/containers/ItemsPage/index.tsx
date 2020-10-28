import React, { useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { itemsRepoSaga } from './saga';
import BarcodeScanner from 'app/components/BarcodeScanner/index';
import {
  selectItems,
  selectLoading,
  selectError,
  selectFormItemName,
  selectFormItemUnit,
  selectFormItemQuantity,
  selectValidated,
  selectScanning,
  selectUnits,
  selectScanModalShow,
  selectFormItem,
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
  Modal,
} from 'react-bootstrap';
import { sliceKey, reducer, actions } from './slice';
import { Item } from 'types/Item';
import { ItemElement } from './ItemElement';
import { Unit } from 'types/Unit';

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
  const scanning = useSelector(selectScanning);
  const units = useSelector(selectUnits);
  const scanModalShow = useSelector(selectScanModalShow);
  const scannerRef = useRef(null);

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
    console.log(evt.currentTarget.value);
    dispatch(actions.setItemUnitById(evt.currentTarget.value));
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

  function scan() {
    dispatch(actions.setScanning(!scanning));
  }

  function onDetected(result) {
    dispatch(actions.codeResultLoaded(result));
  }

  return (
    <>
      <Helmet>
        <title>Items</title>
      </Helmet>
      <Container className="mt-4">
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
                    as="select"
                    onChange={onChangeFormItemUnit}
                    required
                    value={formItemUnit?.unitId ?? 0}
                  >
                    {units.map(unit => (
                      <option value={unit.unitId}>{unit.label}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please give an unit.
                  </Form.Control.Feedback>
                </InputGroup>
              </FormGroup>
              <FormGroup as={Col} md="3" controlId="ValidationQuantity">
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
                <Button type="submit" className="float-left">
                  Add
                </Button>
                <Button
                  variant="success"
                  className="float-right"
                  onClick={() => dispatch(actions.setScanning(!scanning))}
                >
                  {scanning ? 'Stop' : 'Scan'}
                </Button>
              </FormGroup>
            </Form.Row>
          </Form>
        </Container>
        <Container>
          <Row>
            <Col md="11">
              <Modal
                show={scanModalShow}
                onHide={() => dispatch(actions.setScanning(false))}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Barcode Scanner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div ref={scannerRef}>
                    <video
                      style={{
                        width: '100%',
                        height: 'auto',
                        // border: '3px solid orange',
                      }}
                    />
                    <canvas
                      className="drawingBuffer"
                      style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        height: '100%',
                        width: '100%',
                      }}
                      width="480"
                      height="640"
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(actions.setScanning(false))}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
              {scanning ? (
                <BarcodeScanner
                  scannerRef={scannerRef}
                  onDetected={result => {
                    dispatch(actions.codeResultLoaded(result));
                  }}
                />
              ) : null}
            </Col>
          </Row>
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
                <ItemElement item={item} key={i} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
}
