import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card } from 'react-bootstrap';

export function ItemsPage() {
  return (
    <>
      <Helmet>
        <title>Items</title>
      </Helmet>
      <Container fluid="md">
        <Row>
          <Col xs="3">
            <Card>
              <Card.Header>
                <Card.Title>Test</Card.Title>
              </Card.Header>
              <Card.Body>Yay</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
