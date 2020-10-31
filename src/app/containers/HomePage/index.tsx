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
        <Container>
          <h1 className="brand-header">Kühlfrank</h1>
          <h2 className="brand-slogan">Warum wegwerfen?</h2>
        </Container>
      </Jumbotron>
      <Container className="homepage-container" fluid>
        <Row>
          <Col md="1"></Col>
          <Col md="4" className="info-box">
            <h5 className="info-header">Was ist Kühlfrank</h5>
            <p className="info-text">
              Agiles Management jetzt auch für'n Kühlschrank? Ja richtig gehört,
              Kühlfrank als all-in-one solution um Lebensmittelreste optimal zu
              verkochen
            </p>
          </Col>
          <Col md="1"></Col>
          <Col md="4" className="info-box">
            <h5 className="info-header">Was muss ich tun?</h5>
            <p className="info-text">
              Um jetzt durchzustarten, registriere dich und teile Kühlfrank mit,
              welche Lebensmittel zur Verfügung stehen. Dann bleibt nur noch
              dich für einen der Rezeptvorschläge zu entscheiden
            </p>
          </Col>
          <Col md="1">&nbsp;</Col>
        </Row>
      </Container>
      <footer className="mt-auto">
        <p className="love">
          Made with{' '}
          <FontAwesomeIcon style={{ color: '#A83F39' }} icon={faHeart} /> for{' '}
          <a target="_ref" href="https://it-talents.de">
            IT-Talents
          </a>{' '}
          by{' '}
          <span>
            <a target="_ref" href="https://github.com/ScholliYT">
              @Scholli
            </a>
            ,{' '}
            <a target="_ref" href="https://github.com/CapOfCave">
              @CapOfCave
            </a>
            ,{' '}
            <a target="_ref" href="https://github.com/lkIcom2000">
              @lkIcom2000
            </a>
            ,{' '}
            <a target="_ref" href="https://github.com/m0ddixx">
              @m0ddixx
            </a>{' '}
            and{' '}
            <a target="_ref" href="https://github.com/lxndio">
              @lxndio
            </a>
          </span>
        </p>
      </footer>
    </>
  );
}
