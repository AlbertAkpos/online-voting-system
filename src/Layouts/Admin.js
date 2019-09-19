import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AddCandidate from "./AddCandidate";
import EditCandidate from "./EditCandidate";

const Admin = () => {
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

  const editCandidate = async id => {};
  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <>
      <NavBar />
      <AddCandidate submit={submit} />
      {!loading && candidates.length === 0 ? (
        <p className='center'>No Candidates to show</p>
      ) : (
        <>
          <table className='table table-striped table-dark m$3'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>First</th>
                <th scope='col'>Last</th>
                <th scope='col'>Handle</th>
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
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Admin;
