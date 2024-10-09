import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
const Footer: React.FC = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">© Ariel Garfield 2024</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
