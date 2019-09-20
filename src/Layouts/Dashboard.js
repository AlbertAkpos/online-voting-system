import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Voter from "./Voter";
import Admin from "./Admin";
import Countdown, { calcTimeDelta } from "react-countdown-now";
import VoteFinished from "../components/VoteFinished";

const Dashboard = ({ location }) => {
  const [voter] = useState(location.state);
  const [votingCompleted, setVotingCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkVoting();
  });

  const checkVoting = async () => {
    const res = await fetch("http://localhost:5000/voting/1");
    const data = await res.json();
    setVotingCompleted(data.value);
    setLoading(false);
    if (data.value) {
      setVotingCompleted(true);
      setMessage(data.message);
    }
  };

  if (loading) {
    return (
      <div className='d-flex justify-content-center'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <VoteFinished completed={completed} votingDone={votingDone} />;
    } else {
      return (
        <>
          <h4>
            Voting ends in{" "}
            <span>
              {hours}:{minutes}:{seconds}
            </span>
          </h4>
        </>
      );
    }
  };

  const votingDone = async votingCompleted => {
    if (votingCompleted) {
      const res = await fetch(`http://localhost:5000/voting/1`, {
        method: "PATCH",
        body: JSON.stringify({ value: true }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setVotingCompleted(true);
      getWinner();
    }
  };

  const getWinner = async () => {
    const res = await fetch("http://localhost:5000/candidates");
    const data = await res.json();
    let outcome = "";
    let winner = data[0];
    for (let i = 1; i < data.length; i++) {
      if (winner.votes < data[i].votes) {
        winner = data[i];
        outcome = `Voting has ended. The winner is ${winner.name}`;
      } else if (winner.votes === data[i].votes) {
        outcome = "Voting has ended. The election is inconclusinve";
      } else {
        outcome = `Voting has ended. The winner is ${winner.name}`;
      }
    }
    setMessage(outcome);
    const response = await fetch("http://localhost:5000/voting/1", {
      method: "PATCH",
      body: JSON.stringify({ message: outcome }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const payload = response.json();
  };

  return (
    <>
      <NavBar />
      {votingCompleted ? null : (
        <Countdown date={Date.now() + 5000} renderer={renderer} />
      )}
      {voter.isAdmin ? (
        <Admin message={message} />
      ) : (
        <Voter voter={voter} message={message} />
      )}
    </>
  );
};

export default Dashboard;
