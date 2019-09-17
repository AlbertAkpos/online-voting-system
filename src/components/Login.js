import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getVoters } from "../actions/voterActions";
import { Redirect } from "react-router-dom";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

const Login = ({ voter: { voters, loading }, getVoters }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [toDashboard, setToDashboard] = useState(false);
  useEffect(() => {
    getVoters();
    // eslint-disable-next-line
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      ToastsStore.error("Please fill in all fields");
    } else {
      let find = voters.find(x => x.email === email);
      if (find) {
        if (find.password === password) {
          setName(find.name);
          setIsAdmin(find.isAdmin);
          setToDashboard(true);
        } else {
          ToastsStore.warning(
            "Email and password does't match. Please register if you have'nt."
          );
        }
      } else {
        ToastsStore.warning("Email is not registered yet. Please register");
      }
    }
  };

  if (toDashboard) {
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: { name, email, password, isAdmin }
        }}
      />
    );
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => setEmail(e.target.value.toLowerCase())}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.TOP_LEFT}
      />
    </>
  );
};

Login.propTypes = {
  voter: PropTypes.object.isRequired,
  getVoters: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  voter: state.voter
});

export default connect(
  mapStateToProps,
  { getVoters }
)(Login);
