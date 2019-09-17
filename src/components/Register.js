import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import PropTypes from "prop-types";
import { getVoters, addVoter } from "../actions/voterActions";
import { Redirect } from "react-router-dom";

const Register = ({ voter: { voters, loading }, getVoters, addVoter }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [toDashboard, setToDashboard] = useState(false);
  useEffect(() => {
    getVoters();
    // eslint-disable-next-line
  }, []);

  if (loading || voters === null) {
    return <h2>Its Loading...</h2>;
  }

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
  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      ToastsStore.error("Please fill in all fields");
    } else {
      let find = voters.find(x => x.name === name);
      if (find) {
        ToastsStore.warning("name or email already exist");
      } else {
        addVoter({
          name,
          email,
          password,
          isAdmin
        });
        setToDashboard(true);
      }
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='formBasicFirstName'>
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={name}
            placeholder='Enter full name'
            onChange={e => setName(e.target.value.toUpperCase())}
          />
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            placeholder='Enter email'
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
            name='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Register
        </Button>
      </Form>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.TOP_LEFT}
      />
    </>
  );
};

Register.propTypes = {
  voter: PropTypes.object.isRequired,
  getVoters: PropTypes.func.isRequired,
  addVoter: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  voter: state.voter
});

export default connect(
  mapStateToProps,
  { getVoters, addVoter }
)(Register);
