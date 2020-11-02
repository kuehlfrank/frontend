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
  selectFormItemAmount,
  selectValidated,
  selectScanning,
  selectUnits,
  selectScanModalShow,
  isShowEditModal,
  selectUpdatedItem,
  selectIngredientNames,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { Typeahead } from 'react-bootstrap-typeahead';

export function EditModal(props) {
  const dispatch = useDispatch();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({
    key: sliceKey,
    saga: itemsRepoSaga,
  });
  const item = props.item as Item;
  const units = useSelector(selectUnits);
  return (
    <>
      <Modal {...props}>
        <Modal.Header>{item?.name} bearbeiten</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Menge</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  value={item?.amount}
                  onChange={e =>
                    dispatch(actions.updateItemAmount(parseInt(e.target.value)))
                  }
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="input-group-text">
                    Einheit
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  onChange={e => {
                    let unit = units.find(u => u.unitId === e.target.value);
                    if (unit) {
                      dispatch(actions.updateItemUnit(unit));
                    }
                  }}
                  required
                  value={item?.unit?.unitId ?? 0}
                >
                  {units.map((unit, i) => (
                    <option key={i} value={unit.unitId}>
                      {unit.label}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Bitte geben Sie eine Einheit an.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => dispatch(actions.hideEditModal())}
          >
            Abbrechen
          </Button>
          <Button
            variant="primary"
            onClick={() => dispatch(actions.updateItem())}
          >
            Speichern
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function ItemsPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({
    key: sliceKey,
    saga: itemsRepoSaga,
  });

  const items = useSelector(selectItems);
  const formItemName = useSelector(selectFormItemName);
  const formItemUnit = useSelector(selectFormItemUnit);
  const formItemAmount = useSelector(selectFormItemAmount);
  const validated = useSelector(selectValidated);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const scanning = useSelector(selectScanning);
  const units = useSelector(selectUnits);
  const scanModalShow = useSelector(selectScanModalShow);
  const editItem = useSelector(selectUpdatedItem);
  const showEditModal = useSelector(isShowEditModal);
  const ingredientNames = useSelector(selectIngredientNames);
  const scannerRef = useRef(null);
  const typeaheadRef = useRef(null);

  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.loadItems());
  });

  const onChangeFormItemName = (name: string, evt) => {
    dispatch(actions.changeItemName(name));
  };

  const onChangeFormItemUnit = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.currentTarget.value);
    dispatch(actions.setItemUnitById(evt.currentTarget.value));
  };

  const onChangeFormItemAmount = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeItemAmount(Number(evt.currentTarget.value)));
  };

  const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    const form = evt.currentTarget;
    let item: Item = {
      name: formItemName,
      unit: formItemUnit,
      amount: formItemAmount,
    };
    if (evt !== undefined && evt.preventDefault) {
      if (form.checkValidity() === false || formItemName === '') {
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        dispatch(actions.addItem(item));
        dispatch(actions.loadItems());
        evt.preventDefault();
      }
      dispatch(actions.validateForm(true));
    } else {
    }
  };

  interface errorObj {
    message?: string;
    variant?: string;
  }
  const errorObj = (): errorObj => {
    if (error !== null) {
      switch (error) {
        case 1:
          return {
            message: 'Keine Gegenstände im Kühlschrank.',
            variant: 'warning',
          };
        case 99:
          return {
            message: 'Fehler beim Laden der Daten.',
            variant: 'danger',
          };
        default:
          return { message: undefined, variant: undefined };
      }
    }
    return { message: undefined, variant: undefined };
  };

  function scan() {
    dispatch(actions.setScanning(!scanning));
  }

  function onDetected(result) {
    dispatch(actions.codeResultLoaded(result));
  }

  function onDeleteItem(id: string, e) {
    dispatch(actions.deleteItem(id));
  }

  return (
    <>
      <Helmet>
        <title>Items</title>
      </Helmet>
      <Container fluid className="mt-4">
        <Container>
          <Form onSubmit={onSubmitForm} noValidate validated={validated}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationName">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Name</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Typeahead
                    id="itemName"
                    options={ingredientNames}
                    onInputChange={onChangeFormItemName}
                    onChange={selected =>
                      onChangeFormItemName(selected[0], undefined)
                    }
                    renderInput={({
                      inputRef,
                      referenceElementRef,
                      ...inputProps
                    }) => (
                      <Form.Control
                        {...inputProps}
                        type="text"
                        value={formItemName}
                        ref={input => {
                          // Be sure to correctly handle these refs. In many cases, both can simply receive
                          // the underlying input node, but `referenceElementRef can receive a wrapper node if
                          // your custom input is more complex (See TypeaheadInputMulti for an example).
                          inputRef(input);
                          referenceElementRef(input);
                        }}
                      />
                    )}
                  />
                  {/* <Typeahead
                    selected={formItemName}
                    allowNew={true}
                    isValid={formItemName !== ''}
                    ref={typeaheadRef}
                  /> */}
                  <Form.Control.Feedback type="invalid">
                    Please give a name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationUnit">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className="input-group-text">
                      Einheit
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    as="select"
                    onChange={onChangeFormItemUnit}
                    required
                    value={formItemUnit?.unitId ?? 0}
                  >
                    {units.map((unit, i) => (
                      <option key={i} value={unit.unitId}>
                        {unit.label}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Bitte geben Sie eine Einheit an.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="ValidationAmount">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Menge</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="number"
                    value={formItemAmount}
                    onChange={onChangeFormItemAmount}
                    min="0"
                    step="any"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Bitte geben Sie eine Menge größer 0 an.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <div className="row justify-content-between">
                  <Button type="submit" className="float-left">
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp; Add
                  </Button>
                  <Button
                    variant="success"
                    className="float-right"
                    onClick={() => dispatch(actions.setScanning(!scanning))}
                  >
                    <FontAwesomeIcon icon={faBarcode} />
                    &nbsp;
                    {scanning ? 'Stop' : 'Scan'}
                  </Button>
                </div>
              </Form.Group>
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
                <Alert variant={errorObj().variant}>{errorObj().message}</Alert>
              </Col>
            )}
            {items.map((item, i) => (
              <Col md="3" key={i}>
                <ItemElement
                  item={item}
                  key={i}
                  onDelete={(id, e) => onDeleteItem(id, e)}
                  onEdit={(item, e) => dispatch(actions.showEditModal(item))}
                />
              </Col>
            ))}
            <EditModal show={showEditModal} item={editItem}></EditModal>
          </Row>
        </Container>
      </Container>
    </>
  );
}
