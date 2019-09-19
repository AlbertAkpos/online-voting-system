import {
  GET_VOTERS,
  SET_LOADING,
  VOTERS_ERROR,
  ADD_VOTER,
  GET_CANDIDATES,
  CANDIDATES_ERROR
} from "../actions/types";

const initialState = {
  voters: null,
  current: null,
  loading: false,
  error: null,
  candidates: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VOTERS:
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
    case GET_CANDIDATES:
      return {
        ...state,
        candidates: action.payload,
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
    case CANDIDATES_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
