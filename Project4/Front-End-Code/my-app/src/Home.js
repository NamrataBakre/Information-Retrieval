import React from "react";
import SearchBarTest from "./SearchBarTest";
import { BrowserRouter as Router, Link } from "react-router-dom";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
      	<SearchBarTest />
      </div>
    );
  }
}

export default Home;
