import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import OverviewAnalysis from "./OverviewAnalysis";
import TopicAnalysis from "./TopicAnalysis";
import SearchBarTest from "./SearchBarTest";
import App from "./App";

function Body() {
  return (
    <Switch>
      <Route path="/" exact component={SearchBarTest} />
      <Route path="/overviewanalysis" component={OverviewAnalysis} />
      <Route path="/topic" component={TopicAnalysis} />
    </Switch>
  );
}

export default Body;
