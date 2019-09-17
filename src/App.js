import React from "react";
import "./App.css";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store";

import { Route, Switch } from "react-router-dom";
import Dashboard from "./Layouts/Dashboard";
function App() {
  return (
    <Provider store={store}>
      <>
        <Route exact path='/' component={Home} />
        <Route exact path='/dashboard' component={Dashboard} />
      </>
    </Provider>
  );
}

export default App;
