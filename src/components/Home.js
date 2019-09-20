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
      <div className='jumbotron jumbotron-fluid'>
        <div className='container'>
          <h1 className='display-4'>Nigeria Decides</h1>
          <p>Register and cast your vote now!</p>
        </div>
      </div>
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
