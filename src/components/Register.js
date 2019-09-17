import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

const Register = () => {
  const [voter, setVoter] = useState({
    fullName: "",
    email: "",
    isAdmin: false,
    password: ""
  });

  // useEffect(() => {
  //   getVoters();
  // }, []);

  // const getVoters = async () => {
  //   setLoading(true);
  //   const res = await fetch("http://localhost:5000/voters");
  //   const data = await res.json();

  //   console.log(data);
  // };

  const getNewVoter = async e => {
    e.preventDefault();
    // const res = await fetch("http://localhost:5000/voters");
    // const data = await res.json();
    if (
      voter.firstName === "" ||
      voter.lastName === "" ||
      voter.email === "" ||
      voter.password === ""
    ) {
      ToastsStore.error("Please fill in all fields");
    } else {
      setVoter({
        ...voter,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <>
      <Form onSubmit={getNewVoter}>
        <Form.Group controlId='formBasicFirstName'>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type='firstName'
            placeholder='Enter first name'
            onChange={getNewVoter}
          />
        </Form.Group>

        <Form.Group controlId='formBasicLastName'>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type='first-name'
            placeholder='Enter last name'
            onChange={getNewVoter}
          />
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={getNewVoter}
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
            onChange={getNewVoter}
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

export default Register;
