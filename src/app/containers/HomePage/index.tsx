import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Jumbotron fluid>
        <img src={process.env.PUBLIC_URL + '/mash.svg'} className="mash" />
        <Container>
          <h1>Kühlfrank</h1>
          <h2>Warum wegwerfen?</h2>
        </Container>
      </Jumbotron>
      <Container fluid>
        <Row>
          <Col md="2"></Col>
          <Col md="3" className="info-box">
            <h5>Was ist Kühlfrank</h5>
            <p>
              Kühlfrank hilft dir, deine Vorräte in Bewegung zu halten. Es ist
              agiles Management für deine Lebensmittel. Kühlfrank hilft deinem
              Essen, in Bewegung zu bleiben, damit du es auch kannst.
            </p>
          </Col>
          <Col md="2"></Col>
          <Col md="3" className="info-box">
            <h5>Was muss ich tun?</h5>
            <p>
              Freut uns, dass dir Kühlfrank gefällt. Um durchzustarten, klicke
              einfach oben auf "Login" und schon kann es losgehen. Willkommen in
              der schönen neuen Welt!
            </p>
          </Col>
        </Row>
      </Container>
      <footer className="mt-auto">
        <p className="love">
          Made with <FontAwesomeIcon icon={faHeart} /> based in Börnste
        </p>
      </footer>
    </>
  );
}
