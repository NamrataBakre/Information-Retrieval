import React from 'react';
import axios from 'axios';
import loader from './loader.gif';
import Chart from "react-google-charts";
import { Route, Switch } from "react-router";
import Trump from "./Trump";
import Home from "./Home";
import OverviewAnalysis from "./OverviewAnalysis";
import Post from "./Post";
import App from "./App";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class SearchBarTest extends React.Component {
  constructor(props){
    super(props);

    this.state={
      loading: false,
      query: '',
      message: '',
      results: {},
      renderList: null,
      results_tweets: {tweets:[]},
      sort_inf: 'no',
      isIndia: false,
      isUSA: false,
      isItaly: false
    };

    this.cancel = '';
  }


    componentDidMount(){
      this.setState({
        renderList: false
      })
    }

    onChangeIndia = () => {
       this.setState(initialState => ({
         isIndia: !initialState.isIndia,
       }));
    }

    onChangeUSA = () => {
       this.setState(initialState => ({
         isUSA: !initialState.isUSA,
       }));
    }

    onChangeItaly = () => {
       this.setState(initialState => ({
         isItaly: !initialState.isItaly,
       }));
    }

    onSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
    }

    fetchSearchResults = (query ) => {
        const url = `http://3.85.190.84:5000/get_results`;

        if (this.cancel){
          this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        axios.get(url, { params: { q: query, sort_inf: this.state.sort_inf} })

        .then(res => {
          
          
          const resultNotFoundMsgNews = !(res.data.news.length)
                                  ? 'These are the results for your search. If you were unable to find what you were looking for, please try a new search! Happy Searching!'
                                  : 'These are the results for your search. If you were unable to find what you were looking for, please try a new search! Happy Searching!'; 
          
           
          this.setState({
              results: res.data.news,
              results_tweets: res.data['all_tweets'],
              message: resultNotFoundMsgNews,
              
              loading: false
          })
          console.warn(res.data);
        })
        .catch(error => {
          if(axios.isCancel(error) ||  error){
            this.setState({
              loading: false,
              message: 'We are searching! Almost there...',
              result:[]
            })
          }
        })
    }


    handleOnSearch = (event) => {
      const query = this.state.query;
      console.log(query)
      this.state.sort_inf = 'no'
      
      if ( ! query ) {
        this.setState({ query, results: {}, results_tweets: {tweets:[]},  message: '' } );
      } else {
        this.setState({ query, loading: true, message: '', renderList: true }, () => {
          this.fetchSearchResults(query);
        });
      }
      
  }


  handleOnInfSearch = (event) => {
    const query = this.state.query;
    this.state.sort_inf = 'yes'
    console.log(query)
    
    if ( ! query ) {
      this.setState({ query, results: {}, results_tweets: {tweets:[]},  message: '' } );
    } else {
      this.setState({ query, loading: true, message: '', renderList: true }, () => {
        this.fetchSearchResults(query);
      });
    }
    
}

   handleOnInputChange = (event) => {
        const query = event.target.value;
        this.setState({ query, results: {}, results_tweets: {tweets:[]},  message: '' } );
        
    };

    renderSearchResults = () => {
      const {results} = this.state;
      const {results_tweets} = this.state;


      const items = []

      for (const [index, value] of results_tweets.tweets.entries()) {
        items.push(
            <div>
              <p style={{fontfamily: "arial", fontSize: 13}}> <b style={{color: "green"}}>Tweet by:</b> {results_tweets.tweets[index].user_handle} <br />
              <b style={{color: "green"}}>Date: </b> {results_tweets.tweets[index].date}<br /> 
              <b style={{color: "red"}}>Average Sentiment:</b> {results_tweets.tweets[index].sentiment}<br /> 
              <b style={{color: "blue"}}>Influencer Score:</b> {results_tweets.tweets[index].inf_score}<br /> 
              <b style={{color: "green"}}>Language of the Tweet:</b> {results_tweets.tweets[index].lang}<br />
              <b style={{color: "green"}}>Tweet:</b> {results_tweets.tweets[index].tweet_text}
              </p> <br />
          </div>
        )
      }


      if ((Object.keys(results).length && results.length) 
        && (Object.keys(results_tweets.tweets).length && results_tweets.tweets.length)  
        && (Object.keys(results_tweets.facet.country).length && results_tweets.facet.country.length) 
        && (Object.keys(results_tweets.facet.poi_name).length && results_tweets.facet.poi_name.length)
        && (Object.keys(results_tweets.top_words).length && results_tweets.top_words.length)) {


        return (
          <div>

              <div>
              <form onSubmit={this.onSubmit}>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox"
                        checked={this.state.isIndia}
                        onChange={this.onChangeIndia}
                        className="form-check-input"
                      />
                      India
                    </label>
                  </div>

                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox"
                        checked={this.state.isUSA}
                        onChange={this.onChangeUSA}
                        className="form-check-input"
                      />
                      USA
                    </label>
                  </div>

                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox"
                        checked={this.state.isItaly}
                        onChange={this.onChangeItaly}
                        className="form-check-input"
                      />
                      Italy
                    </label>
                  </div>

              <div className="form-group">
                  <button className="btn btn-success">
                    Apply
                  </button>
                </div>
              </form>
              </div>

              <div className="section">
                  <h3 className="underline"> Tweets Search Results </h3>
                  <h4 style={{color: "#4B111B"}}> <i>Total number of tweets found: <b>{results_tweets.numfound}</b></i></h4>
                  <div>
                  <h4 style={{color: "maroon"}}> Displaying top Tweets:</h4>

                  {items}
                  
                  </div>

                  <table className="t01">

                    <tr>
                      <th className="th">Top Words</th>
                      <th className="th">Total Number of Tweets</th> 
                    </tr>
                    <tr>
                      <td className="td">{results_tweets.top_words[0][0]}</td>
                      <td className="td">{results_tweets.top_words[0][1]}</td>
                      
                    </tr>
                    <tr>
                      <td className="td">{results_tweets.top_words[1][0]}</td>
                      <td className="td">{results_tweets.top_words[1][1]}</td>
                      
                    </tr>
                    <tr>
                      <td className="td">{results_tweets.top_words[2][0]}</td>
                      <td className="td">{results_tweets.top_words[2][1]}</td>
                      
                    </tr>
                    <tr>
                      <td className="td">{results_tweets.top_words[3][0]}</td>
                      <td className="td">{results_tweets.top_words[3][1]}</td>
                      
                    </tr>
                    <tr>
                      <td className="td">{results_tweets.top_words[4][0]}</td>
                      <td className="td">{results_tweets.top_words[4][1]}</td>
                      
                    </tr>
                  </table>
                  

                  
                  
              </div>

              <div className="section">
              
                  <h3 className="underline"> News Search Results </h3>
                  {results.map((result) => {
                    return (

                      <div>
                      <a href={result.link} >
                        <h6>{result.title}</h6>
                        

                      </a>
                       <h6>{result.content}</h6>
                      </div>

                    );
                  })}
              
              </div>


              

              <div className="section">
                  <h3 className="underline"> Analytics </h3>
                    <Chart
                        chartType="PieChart"
                        options={{
                          title: 'Regional Distribution',
                          titleTextStyle:{
                            fontSize: 26
                           } ,
                          is3D: true
                          
                        }}
                        data={[
                          ["Language", "Number of Tweets"],
                          [results_tweets.facet.country[0], results_tweets.facet.country[1]],
                          [results_tweets.facet.country[2], results_tweets.facet.country[3]],
                          [results_tweets.facet.country[4], results_tweets.facet.country[5]]
                        ]}
                        graph_id="PieChart"
                        width={"103%"}
                        height={"400px"}
                        legend_toggle
                        is3D = "true"
                    />


                    <Chart chartType="BarChart" 
                      options={{
                        title: 'Number of tweets per POI',
                       titleTextStyle:{
                        fontSize: 26
                       } 
                        }} 
                      width="103%" 
                      height="400px" 
                      data={[
                          ["POI", "Number of Tweets"],
                          [results_tweets.facet.poi_name[0], results_tweets.facet.poi_name[1]],
                          [results_tweets.facet.poi_name[2], results_tweets.facet.poi_name[3]],
                          [results_tweets.facet.poi_name[4], results_tweets.facet.poi_name[5]],
                          [results_tweets.facet.poi_name[6], results_tweets.facet.poi_name[7]],
                          [results_tweets.facet.poi_name[8], results_tweets.facet.poi_name[9]],
                          [results_tweets.facet.poi_name[10], results_tweets.facet.poi_name[11]],
                          [results_tweets.facet.poi_name[12], results_tweets.facet.poi_name[13]],
                          [results_tweets.facet.poi_name[14], results_tweets.facet.poi_name[15]],
                          [results_tweets.facet.poi_name[16], results_tweets.facet.poi_name[17]],
                          [results_tweets.facet.poi_name[18], results_tweets.facet.poi_name[19]],
                        ]} />


                    <Chart
                      chartType="ColumnChart"
                      width="103%"
                      is3D = "true"
                      options={{
                        title: 'Top 5 Words',
                       titleTextStyle:{
                        fontSize: 26
                       } 
                        }} 
                      height="400px"
                      data={[
                          ["Word", "Number of Tweets", { role: "style" }],
                          [results_tweets.top_words[0][0], results_tweets.top_words[0][1], "#b87333"],
                          [results_tweets.top_words[1][0], results_tweets.top_words[1][1], "silver"],
                          [results_tweets.top_words[2][0], results_tweets.top_words[2][1], "gold"],
                          [results_tweets.top_words[3][0], results_tweets.top_words[3][1], "color: #e5e4e2"],
                          [results_tweets.top_words[4][0], results_tweets.top_words[4][1], "green"]
                          
                        ]}
                    />
              </div>
          </div>

          
        
        );
      }
    };


    render(){
      const { query, loading, message } = this.state;
      return (
        <div> 
        
           <div className="container">
                <label className="search-label" htmlFor="search-input">
                  <input
                    
                    type="text"
                    name="query"
                    value={ query }
                    id="search-input"
                    placeholder="Search Tweets here..."
                    onChange={this.handleOnInputChange}
                  />
      
                  <button onClick={this.handleOnSearch}>
                  Search
                  </button>

                  <button onClick={this.handleOnInfSearch}>
                  Influence Search
                  </button>

                </label>

                {message && <p className="message"> { message } </p>}

                <img src={ loader } className={`search-loading  ${loading ? 'show' : 'hide'}`} alt="Loading Data!" />
              </div>
           
       
       {this.state.renderList ? this.renderSearchResults() : null}
       </div>
       );
    }

}




