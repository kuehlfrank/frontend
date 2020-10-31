import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';

export function AboutUsPage() {
  return (
    <>
      <Container className="mt-4">
        <h4 className="display-4">Über uns</h4>
        <Container className="homepage-container" fluid>
          <Row>
            <Col md="1" className="about-image-box">
              <img className="about-image" src="/tom.jpg" />
            </Col>
            <Col md="9" className="info-box">
              <h5 className="info-header">Tom</h5>
              <p className="info-text">
                Hi, ich bin Tom. Ich studiere zurzeit an der TU Dortmund. Neben
                dem Studieren bin ich als Softwareentwickler im
                Fraunhofer-Institut tätig. IoT und neue Technologien im
                Allgemeinen interessieren mich besonders.
              </p>
            </Col>
            <Col md="1">&nbsp;</Col>
          </Row>
          <Row>
            <Col md="1" className="about-image-box">
              <img className="about-image" src="/linus.jpg" />
            </Col>
            <Col md="9" className="info-box">
              <h5 className="info-header">Linus</h5>
              <p className="info-text">
                Hey, ich bin Linus. Neben meinem dualen Studium bei der Fiducia
                & GAD IT AG vertreibe ich mir die Zeit mit Mountainbiking und
                Projekten mit Freunden.
              </p>
            </Col>
            <Col md="1">&nbsp;</Col>
          </Row>
          <Row>
            <Col md="1" className="about-image-box">
              <img className="about-image" src="/linus.jpg" />
            </Col>
            <Col md="9" className="info-box">
              <h5 className="info-header">Lars</h5>
              <p className="info-text">
                Moin, ich bin Lars. Zurzeit bin ich im Rahmen eines dualen
                Studiums bei der Fiducia & GAD IT AG als Softwareentwickler
                tätig. Ich interessiere mich für Schach, Sport und
                Programmierung von Algorithmen.
              </p>
            </Col>
            <Col md="1">&nbsp;</Col>
          </Row>
          <Row>
            <Col md="1" className="about-image-box">
              <img className="about-image" src="/alexander.jpg" />
            </Col>
            <Col md="9" className="info-box">
              <h5 className="info-header">Alexander</h5>
              <p className="info-text">
                Hi, ich bin Alexander. Ich studiere Informatik an der TU
                Dortmund. Neben der Programmierung von Algorithmen beschäftige
                ich mich mit Grafik- und Webdesign und spiele Tischtennis.
              </p>
            </Col>
            <Col md="1">&nbsp;</Col>
          </Row>
          <Row>
            <Col md="1" className="about-image-box">
              <img className="about-image" src="/nico.jpg" />
            </Col>
            <Col md="9" className="info-box">
              <h5 className="info-header">Nico</h5>
              <p className="info-text">
                Moin, ich bin Nico. Neben meinem DJ-Gewerbe arbeite ich als
                Softwareentwickler bei der Stadt Essen.
              </p>
            </Col>
            <Col md="1">&nbsp;</Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
