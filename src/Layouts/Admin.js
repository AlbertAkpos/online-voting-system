import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AddCandidate from "./AddCandidate";
import EditCandidate from "./EditCandidate";
import DeleteCandidate from "./DeleteCandidate";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
const Admin = ({ message }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCandidates();
  }, []);

  const getCandidates = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/candidates");
    const data = await res.json();
    setCandidates(data);
    setLoading(false);
  };
  const submit = async (name, party) => {
    const res = await fetch(`http://localhost:5000/candidates`);
    const data = await res.json();
    let find = candidates.find(x => x.name === name);
    if (candidates.length < 2 && find === undefined && data.length < 2) {
      addCandidate(name, party);
    } else if (data.length >= 2) {
      ToastsStore.warning("Can't add more than two candidates");
    }
  };

  const addCandidate = async (name, party) => {
    let newCandidate = { name, party, votes: 0 };
    const res = await fetch(`http://localhost:5000/candidates`, {
      method: "POST",
      body: JSON.stringify(newCandidate),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    getCandidates();
  };

  const editCandidate = async (id, name, party) => {
    let updateCandidate = { name, party };
    const res = await fetch(`http://localhost:5000/candidates/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateCandidate),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    getCandidates();
  };

  const deleteCandidate = async id => {
    const res = await fetch(`http://localhost:5000/candidates/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();

    getCandidates();
  };

  return (
    <>
      <h3>{message}</h3>
      <AddCandidate submit={submit} />
      {!loading && candidates.length === 0 ? (
        <p className='text-center'>No Candidates to show</p>
      ) : (
        <>
          <table className='table table-striped table-dark m$3'>
            <thead>
              <tr>
                <th scope='col'>S/N</th>
                <th scope='col'>Name of candidate</th>
                <th scope='col'>Party</th>
                <th scope='col'>Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(candidate => (
                <tr key={candidate.id}>
                  <th scope='row'>{candidate.id}</th>
                  <td>{candidate.name}</td>
                  <td>{candidate.party}</td>
                  <td>{candidate.votes}</td>
                  <td>
                    <EditCandidate onClick={editCandidate} id={candidate.id} />
                  </td>
                  <td>
                    <DeleteCandidate
                      onClick={deleteCandidate}
                      id={candidate.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.TOP_LEFT}
      />
    </>
  );
};

export default Admin;
