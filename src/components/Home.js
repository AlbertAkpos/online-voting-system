import React from "react";
import NavBar from "./NavBar";
import Register from "./Register";
import Login from "./Login";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <Register />
          </Col>
          <Col>
            <Login />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
