import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Voter from "./Voter";

const Dashboard = ({ location }) => {
  const [voter] = useState(location.state);

  return (
    <>
      <NavBar />
      <Voter voter={voter} />
    </>
  );
};

export default Dashboard;
