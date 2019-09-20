import React, { useState } from "react";

const AddCandidate = ({ submit }) => {
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type='button'
        className='btn btn-primary m-4'
        data-toggle='modal'
        data-target='#exampleModal'
      >
        Add candidate
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
                Add Candidate
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
                    Enter candidate name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    placeholder='Name of candidate'
                    value={candidateName}
                    onChange={e =>
                      setCandidateName(e.target.value.toUpperCase())
                    }
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>
                    Enter candidate party
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='exampleInputPassword1'
                    placeholder='Candidate party'
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
                    onClick={() => {
                      submit(candidateName, candidateParty);
                      setCandidateName("");
                      setCandidateParty("");
                    }}
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

export default AddCandidate;
