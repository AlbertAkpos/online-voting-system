import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modals from "../components/Modals";
const Voter = ({ voter }) => {
  return (
    <>
      <h3>Welcome, {voter.name}</h3>
      <button>Vote</button>
      <Modals />
    </>
  );
};

export default Voter;
