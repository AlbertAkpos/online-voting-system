import React from "react";
import "./App.css";
import Home from "./components/Home";

import { Route, Switch } from "react-router-dom";
import Voters from "./Layouts/Voters";
function App() {
  return (
    <>
      <Route exact path='/' component={Home} />
      <Route exact path='/voters' component={Voters} />
    </>
  );
}

export default App;
