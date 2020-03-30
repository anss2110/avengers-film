import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

//Pages
import home from "./pages";
import detail from "./pages/detail";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/index" component={home} />
          <Route exact path="/detail/:id" component={detail} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    )
  }
}

export default App;
