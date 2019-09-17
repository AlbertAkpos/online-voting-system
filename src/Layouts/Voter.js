import React, { useState, useEffect } from "react";
import Gif from "../components/Gif";

const Voter = () => {
  const [voter, setVoter] = useState({});
  const [loading, setLoading] = useState(false);

  const getVoter = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/voters");
    const data = await res.json();
    setVoter(data);
    setLoading(false);
    console.log(voter);
  };

  if (loading) {
    return <Gif />;
  }
  return (
    <>
      <button onClick={getVoter}>Clickme</button>
    </>
  );
};

export default Voter;
