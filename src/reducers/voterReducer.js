import {
  GET_VOTERS,
  SET_LOADING,
  VOTERS_ERROR,
  ADD_VOTER
} from "../actions/types";

const initialState = {
  voters: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VOTERS:
      console.log("action payload", action.payload);
      return {
        ...state,
        voters: action.payload,
        loading: false
      };
    case ADD_VOTER:
      return {
        ...state,
        voters: [...state.voters, action.payload],
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case VOTERS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
