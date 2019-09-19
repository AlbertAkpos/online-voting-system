import React, { useState } from "react";
import VoteModal from "./VoteModal";

const Voter = ({ voter }) => {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return <h5>Loading...</h5>;
  }
  return (
    <>
      <h3>Welcome, {voter.name}</h3>
      {voter.voted ? (
        <h4>You've cast your vote. Thanks</h4>
      ) : (
        <VoteModal voter={voter} />
      )}
    </>
  );
};

export default Voter;
