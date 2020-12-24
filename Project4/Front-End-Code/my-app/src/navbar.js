import React from "react";
import Chart from "react-google-charts";
import Home from "./Home";
import tweets from "./Test.json";
import SearchBar from "./SearchBar";
import { Component } from "react";
import { render } from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

//const IndiaData = require("./India.js");

const pieOptions = {
  title: "",
  pieHole: 0.6,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};
const data = [
  ["POI", "Number of Tweets", { role: "style" }],
  ["2010", 10, "color: gray"],
  ["2020", 14, "color: #76A7FA"],
  ["2030", 16, "color: blue"],
  ["2040", 22, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
  [
    "2050",
    28,
    "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2"
  ]
];

const countrydata = [
  ["Country", "Number of Tweets"],
  ["India", 20000],
  ["United States", 30000],
  ["Italy", 4000000]
];

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      isUserAuthenticated: true,
      data: "",
      search: ""
    };
  }

  handleClick() {
    this.setState({
      data: (
        <div className="App">
          <Chart chartType="BarChart" width="100%" height="400px" data={data} />
          <header className="h1">Pie Chart</header>

          <Chart
            chartType="PieChart"
            data={[
              ["Age", "Weight"],
              ["a", 12],
              ["b", 5.5]
            ]}
            options={pieOptions}
            graph_id="PieChart"
            width={"100%"}
            height={"400px"}
            legend_toggle
          />
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = countrydata[selection[0].row + 1];
                  console.log("Selected : " + region);
                }
              }
            ]}
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={countrydata}
          />
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        <Router>
          <ul className="menu">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  this.handleClick();
                }}
              >
                Overview Analysis
              </a>
            </li>

            <li>
              <a href="#s1">POI Name</a>
              <ul className="submenu">
                <li>
                  <a href="#">Donald Trump</a>
                </li>
                <li>
                  <a href="#">Andrew Cuomo</a>
                </li>
                <li>
                  <a href="#">Joe Biden</a>
                </li>
                <li>
                  <a href="#">Narendra Modi</a>
                </li>
              </ul>
            </li>
            <li className="active">
              <a href="#s2">Country</a>
              <ul className="submenu">
                <li>
                  <a href="#">India </a>
                </li>
                <li>
                  <a href="#">US</a>
                </li>
                <li>
                  <a href="#">Italy</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Language</a>
              <ul className="submenu">
                <li>
                  <a href="#">English</a>
                </li>
                <li>
                  <a href="#">Hindi</a>
                </li>
                <li>
                  <a href="#">Italian</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Topic</a>
              <ul className="submenu">
                <li>
                  <a href="#">Covid</a>
                </li>
                <li>
                  <a href="#">Community Spread</a>
                </li>
                <li>
                  <a href="#">Social Distancing</a>
                </li>
                <li>
                  <a href="#">Quarantine</a>
                </li>
                <li>
                  <a href="#">Pandemic</a>
                </li>
                <li>
                  <a href="#">Outbreak</a>
                </li>
                <li>
                  <a href="#">Vaccine</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Hashtags</a>
              <ul className="submenu">
                <li>
                  <a href="#">#covid</a>
                </li>
                <li>
                  <a href="#">#pandemic</a>
                </li>
                <li>
                  <a href="#">#communityspread</a>
                </li>
              </ul>
            </li>
          </ul>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return this.state.isUserAuthenticated ? (
                  <Redirect to="/home" />
                ) : (
                  <Redirect to="/test1" />
                );
              }}
            />
            <Route exact path="/home" component={Home} />
          </Switch>
          {this.state.data}
        </Router>
      </div>
    );
  }
}

export default Navbar;
