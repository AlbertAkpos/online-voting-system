import React from "react";

const VoteFinished = ({ completed, votingDone }) => {
  if (completed) {
    votingDone(completed);
  }
  return (
    <>
      <h3>Voting is completed. The winner is </h3>
    </>
  );
};

export default VoteFinished;
