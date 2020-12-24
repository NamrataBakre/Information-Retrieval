import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.css";
import Header from "./header";
import NavBarNew from "./NavBarNew";
import Body from "./Body";
import SearchBarTest from "./SearchBarTest";
import { UserProvider } from "./UserContext";
import Home from "./Home";

import axios from 'axios';
import loader from './loader.gif';

const user = {
	  query:'',
	  loading: false,
      message: '',
      results: {},
      renderList: null,
      results_tweets: {}
}

var query = '';
export default class App extends React.Component {
	  constructor( props ) {
			super( props );
			this.state = {
			};
			this.cancel = '';
		}
		render(){
			  return (
			  <UserProvider value={query}>
			    <div>
			      <Router>
			        <Header />
			        <NavBarNew />
			        
			        <Body />
			        
			      	</Router>
			    	</div>
			  </UserProvider>
			  );
			}
}

