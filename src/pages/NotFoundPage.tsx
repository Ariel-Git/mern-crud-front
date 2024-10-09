import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Container className="my-5">
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <Button variant="primary">Go to Home page</Button>
      </Link>
    </Container>
  );
};

export default NotFoundPage;
