import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteCandidate = ({ id, onClick }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [candidateName, setCandidateName] = useState("");

  const getCandidates = async () => {
    const res = await fetch(`http://localhost:5000/candidates/${id}`);
    const data = await res.json();
    console.log(data.name);
    setCandidateName(`${data.name}`);
  };
  return (
    <>
      <Button
        variant='primary'
        className='bg-danger'
        onClick={() => {
          handleShow();
          getCandidates();
        }}
      >
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete {candidateName}?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            className='bg-danger'
            onClick={() => {
              handleClose();
              onClick(id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCandidate;
