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
  const [voter, setVoter] = useState("");
  const [voterID, setVoterID] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [toDashboard, setToDashboard] = useState(false);
  useEffect(() => {
    getVoters();
    // eslint-disable-next-line
  }, []);

  const formSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/voters");
    const data = await res.json();
    if (voterID === "" || password === "") {
      ToastsStore.error("Please fill in all fields");
    } else {
      let find = data.find(x => x.id == voterID);
      if (find) {
        console.log(find);
        if (find.password === password) {
          setVoter(find);
          setIsAdmin(find.isAdmin);
          setToDashboard(true);
        } else {
          ToastsStore.warning(
            "Voter's ID and password does't match. Please register if you have'nt."
          );
        }
      } else {
        ToastsStore.warning("Voter is not registered yet. Please register");
      }
    }
  };

  if (toDashboard) {
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: voter
        }}
      />
    );
  }

  return (
    <>
      <h3>Login</h3>
      <Form onSubmit={formSubmit}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Voter's ID</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Voter ID'
            value={voterID}
            onChange={e => setVoterID(e.target.value.toLowerCase())}
          />
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
        <Button variant='primary' type='submit' className='bg-success'>
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
