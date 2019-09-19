import React, { useState } from "react";
import { async } from "q";

const VoteModal = ({ voter }) => {
  const [candidates, setCandidates] = useState("");
  const [selected, setSelected] = useState("");
  const [voted, setVoted] = useState(voter.voted);

  const getCandidates = async () => {
    const res = await fetch("http://localhost:5000/candidates");
    const data = await res.json();
    setCandidates(data);
  };

  const vote = async () => {
    if (selected) {
      voter.voted = true;
      setVoted(true);
      const res = await fetch(`http://localhost:5000/voters/${voter.id}`, {
        method: "PUT",
        body: JSON.stringify(voter),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      countVote();
    }
  };

  const countVote = async () => {
    const res = await fetch(`http://localhost:5000/candidates`);
    const data = await res.json();
    let party = data.find(x => x.party === selected);
    if (party) {
      party.votes++;
      const res = await fetch(`http://localhost:5000/candidates/${party.id}`, {
        method: "PUT",
        body: JSON.stringify(party),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
    }
  };

  if (voted) {
    return <h4>Thanks, you've done your voting</h4>;
  }

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type='button'
        className='btn btn-primary'
        data-toggle='modal'
        data-target='#exampleModal'
        onClick={getCandidates}
      >
        Cast your vote
      </button>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Cast your vote
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='input-group'>
                {candidates ? (
                  <>
                    <select
                      className='custom-select'
                      id='inputGroupSelect04'
                      aria-label='Example select with button addon'
                      onChange={e => setSelected(e.target.value)}
                    >
                      <option defaultValue>Select candidate...</option>
                      <option value={candidates[0].party}>
                        {candidates[0].name}:: {candidates[0].party}
                      </option>
                      <option value={candidates[1].party}>
                        {candidates[1].name}:: {candidates[1].party}
                      </option>
                    </select>
                  </>
                ) : (
                  <h3>Loading...</h3>
                )}
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
                onClick={vote}
              >
                Vote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteModal;
