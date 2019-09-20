import React, { useState, useEffect } from "react";
import VoteModal from "./VoteModal";

const Voter = ({ voter, message }) => {
  const [currentVoter, setCurrentVoter] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(message);
  useEffect(() => {
    getVoters();
  }, []);

  const getVoters = async () => {
    const res = await fetch("http://localhost:5000/voters");
    const data = await res.json();
    const find = data.filter(x => x.name === voter.name);
    console.log(find[0]);
    setCurrentVoter(find[0]);
    console.log(currentVoter);
    setLoading(false);
  };

  if (loading) {
    return <h5>Loading...</h5>;
  }

  return (
    <>
      <h3>
        {loading ? null : (
          <>
            <br />
            <div className='container'>
              <div className='row'>
                <div className='col-md-9'>
                  <div className='panel panel-default'>
                    <div className='panel-body'>
                      <div className='row'>
                        <div className='col-md-12 lead'>
                          User profile
                          <hr />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-4 text-center'>
                          <img
                            className='img-circle avatar avatar-original'
                            style={{
                              display: "block",
                              margin: " auto"
                            }}
                            src='http://robohash.org/sitsequiquia.png?size=120x120'
                          />
                        </div>
                        <div className='col-md-8'>
                          <div className='row'>
                            <div className='col-md-12'>
                              <h1 className='only-bottom-margin'>
                                Welcome, {currentVoter.name}
                              </h1>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-md-6'>
                              <span className='text-muted'>Email:</span>{" "}
                              {currentVoter.email}
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}{" "}
        {message ? <h3>{message}</h3> : null}
      </h3>

      {currentVoter.voted ? (
        <h4>You've cast your vote. Thanks</h4>
      ) : (
        <VoteModal voter={currentVoter} />
      )}
    </>
  );
};

export default Voter;
