import { combineReducers } from "redux";
import voterReducer from "./voterReducer";

export default combineReducers({
  voter: voterReducer
});
