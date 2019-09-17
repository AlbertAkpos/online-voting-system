import { GET_VOTERS, SET_LOADING, VOTERS_ERROR, ADD_VOTER } from "./types";

// export const getVoters = () => {
//   return async dispatch => {
//     setLoading();
//     const res = await fetch("/voters");
//     const data = await res.json();

//     dispatch({
//       type: GET_VOTERS,
//       paylaod: data
//     });
//   };
// };

//Get Voters from server
export const getVoters = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch("http://localhost:5000/voters");
    const data = await res.json();
    console.log("data", data);

    dispatch({
      type: GET_VOTERS,
      payload: data
    });
    console.log("data", data);
  } catch (err) {
    dispatch({
      type: VOTERS_ERROR,
      payload: err.response.data
    });
  }
};

//Add New Voter
export const addVoter = voter => async dispatch => {
  try {
    setLoading();
    const res = await fetch("http://localhost:5000/voters", {
      method: "POST",
      body: JSON.stringify(voter),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log("data", data);

    dispatch({
      type: ADD_VOTER,
      payload: data
    });
    console.log("data", data);
  } catch (err) {
    dispatch({
      type: VOTERS_ERROR,
      payload: err.response.data
    });
  }
};
//SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
