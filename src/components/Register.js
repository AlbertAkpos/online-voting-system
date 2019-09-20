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

const Register = ({ voter: { voters, loading }, getVoters, addVoter }) => {
  const [name, setName] = useState("");
  const [voterID, setVoterID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [voted, setVoted] = useState(false);
  const [toDashboard, setToDashboard] = useState(false);
  useEffect(() => {
    getVoters();
    // eslint-disable-next-line
  }, []);

  if (toDashboard) {
    ToastsStore.success("Registration successful. Please login");
  }
  const onSubmit = e => {
    e.preventDefault();
    if (voterID === "" || name === "" || email === "" || password === "") {
      ToastsStore.error("Please fill in all fields");
    } else {
      let find = voters.find(x => x.id == voterID);
      if (find) {
        if (find.name) {
          ToastsStore.warning("User already exist");
        } else {
          addVoter({
            name,
            email,
            password,
            isAdmin,
            voted,
            id: voterID
          });
          setEmail("");
          setName("");
          setPassword("");
          setVoterID("");
          setToDashboard(true);
        }
      } else {
        ToastsStore.warning("Voter's ID invalid");
      }
    }
  };

  return (
    <>
      <h3>Register</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='formBasicFirstName1'>
          <Form.Label>Voter's ID</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={voterID}
            placeholder='Enter Voter ID'
            onChange={e => setVoterID(e.target.value.toUpperCase())}
          />
        </Form.Group>

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
        <Button type='submit' className='bg-success'>
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
