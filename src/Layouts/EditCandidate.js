import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const EditCandidate = ({ id, onClick }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");

  const getCandidates = async () => {
    const res = await fetch(`http://localhost:5000/candidates/${id}`);
    const data = await res.json();
    setCandidateName(`${data.name}`);
    setCandidateParty(data.party);
  };
  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}
        onClick={() => {
          getCandidates();
          handleShow();
        }}
      >
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Edit name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Edit Candidate name'
                value={candidateName}
                onChange={e => setCandidateName(e.target.value.toUpperCase())}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Edit party</Form.Label>
              <Form.Control
                type='text'
                placeholder='Edit Candiatate party'
                value={candidateParty}
                onChange={e => setCandidateParty(e.target.value.toUpperCase())}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              handleClose();
              onClick(id, candidateName, candidateParty);
              setCandidateName("");
              setCandidateParty("");
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCandidate;
