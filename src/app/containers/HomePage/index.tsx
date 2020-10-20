import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Jumbotron } from 'react-bootstrap';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Jumbotron fluid>
        <Container>
          <h1>Willkommen zu Kühlfrank</h1>
          <p>Dem smarten Kühlschrankmanagementsystem</p>
        </Container>
      </Jumbotron>
    </>
  );
}
