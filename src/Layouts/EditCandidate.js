import React, { useState } from "react";

const EditCandidate = ({ id, onClick }) => {
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");

  const getCandidates = async () => {
    const res = await fetch(`http://localhost:5000/candidates/${id}`);
    const data = await res.json();
    console.log(data.name);
    setCandidateName(`${data.name}`);
    // setCandidateParty(data.party);
  };
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type='button'
        className='btn btn-primary'
        data-toggle='modal'
        data-target='#exampleModal1'
        onClick={() => {
          onClick(id);
          getCandidates();
        }}
      >
        Edit
      </button>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='exampleModal1'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel1'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel1'>
                Edit Candidate
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
              <form>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>
                    Edit candidate name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    placeholder='Edit candidate name'
                    value={candidateName}
                    onChange={e =>
                      setCandidateName(e.target.value.toUpperCase())
                    }
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>
                    Edit candidate party
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='exampleInputPassword1'
                    placeholder='Edit Candidate party'
                    value={candidateParty}
                    onChange={e =>
                      setCandidateParty(e.target.value.toUpperCase())
                    }
                  />
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
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCandidate;
