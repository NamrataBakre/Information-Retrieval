import React from 'react';
import axios from 'axios';
import loader from './loader.gif';
import Chart from "react-google-charts";
import { Route, Switch } from "react-router";

import Home from "./Home";
import OverviewAnalysis from "./OverviewAnalysis";
import Post from "./Post";
import App from "./App";

export default class Matteo extends React.Component {
  constructor(props){
    super(props);

    this.state={
      loading: false,
      poi: '',
      message: '',
      results: {},
      
      renderList: null,
      results_tweets: {}
    };

    this.cancel = '';
  }


    componentDidMount = () => {
     
      const query = localStorage.getItem('query');
      const poi='matteorenzi';
      this.setState({ query, loading:true }, () => {
            this.fetchSearchResults(query);
          });
      console.log(query);

    }

  



    fetchSearchResults = (query) => {
        const url = `http://3.85.190.84:5000/get_results?q=${query}&&filter_country='usa'`;

        if (this.cancel){
          this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        axios.get(url, {
          cancelToken: this.cancel.token
        })

        .then(res => {
          
          
          const resultNotFoundMsgNews = !(res.data.news.length)
                                  ? ''
                                  : ''; 
          
           
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
              message: 'Wait! We are searching!',
              results:[]
            })
          }
        })
    }

    renderSearchResults = () => {
      const {results} = this.state;
      const {results_tweets} = this.state;
      if ((Object.keys(results).length && results.length) 
        && (Object.keys(results_tweets.tweets).length > 6 && results_tweets.tweets.length) > 6
        && (Object.keys(results_tweets.facet.country).length && results_tweets.facet.country.length) 
        && (Object.keys(results_tweets.facet.poi_name).length && results_tweets.facet.poi_name.length)
        && (Object.keys(results_tweets.top_words).length && results_tweets.top_words.length)) {
        return (
          <div>

              <div className="section">
                  <h3 className="underline"> Tweets Search Results </h3>
                  <h4 style={{color: "#4B111B"}}> <i>Total number of tweets found: <b>{results_tweets.numfound}</b></i></h4>
                  <div>
                  <h4 style={{color: "maroon"}}> Displaying top Tweets:</h4>
                  <p style={{fontfamily: "arial", fontSize: 13}}> <b style={{color: "green"}}>Tweet by:</b> {results_tweets.tweets[0].user_handle} <br />
                  <b style={{color: "green"}}>Date: </b> {results_tweets.tweets[0].date}<br /> 
                  <b style={{color: "red"}}>Average Sentiment:</b> {results_tweets.tweets[0].sentiment}<br />
                  <b style={{color: "blue"}}>Influencer Score:</b> {results_tweets.tweets[0].inf_score}<br /> 
                  <b style={{color: "green"}}>Language of the Tweet:</b> {results_tweets.tweets[0].lang}<br />
                  <b style={{color: "green"}}>Tweet:</b> {results_tweets.tweets[0].tweet_text}
                  </p> <br />
                  <p style={{fontfamily: "arial", fontSize: 13}}> <b style={{color: "green"}}>Tweet by:</b> {results_tweets.tweets[1].user_handle} <br />
                  <b style={{color: "green"}}>Date:</b> {results_tweets.tweets[1].date}<br /> 
                  <b style={{color: "red"}}>Average Sentiment:</b> {results_tweets.tweets[1].sentiment}<br />
                  <b style={{color: "blue"}}>Influencer Score:</b> {results_tweets.tweets[1].inf_score}<br /> 
                  <b style={{color: "green"}}>Language of the Tweet:</b> {results_tweets.tweets[1].lang}<br />
                  <b style={{color: "green"}}>Tweet:</b> {results_tweets.tweets[1].tweet_text}
                  </p> <br />
                  <p style={{fontfamily: "arial", fontSize: 13}}> <b style={{color: "green"}}>Tweet by:</b> {results_tweets.tweets[2].user_handle} <br />
                  <b style={{color: "green"}}>Date:</b> {results_tweets.tweets[2].date}<br /> 
                  <b style={{color: "red"}}>Average Sentiment:</b> {results_tweets.tweets[2].sentiment}<br />
                  <b style={{color: "blue"}}>Influencer Score:</b> {results_tweets.tweets[2].inf_score}<br /> 
                  <b style={{color: "green"}}>Language of the Tweet:</b> {results_tweets.tweets[2].lang}<br />
                  <b style={{color: "green"}}>Tweet:</b> {results_tweets.tweets[2].tweet_text}
                  </p> <br />
                  <p style={{fontfamily: "arial", fontSize: 13}}> <b style={{color: "green"}}>Tweet by:</b> {results_tweets.tweets[3].user_handle} <br />
                  <b style={{color: "green"}}>Date:</b> {results_tweets.tweets[3].date}<br /> 
                  <b style={{color: "red"}}>Average Sentiment:</b> {results_tweets.tweets[3].sentiment}<br />
                  <b style={{color: "blue"}}>Influencer Score:</b> {results_tweets.tweets[3].inf_score}<br /> 
                  <b style={{color: "green"}}>Language of the Tweet:</b> {results_tweets.tweets[3].lang}<br />
                  <b style={{color: "green"}}>Tweet:</b> {results_tweets.tweets[3].tweet_text}
                  </p> <br />
                  <p style={{fontfamily: "arial", fontSize: 13}}> <b style={{color: "green"}}>Tweet by:</b> {results_tweets.tweets[4].user_handle} <br />
                  <b style={{color: "green"}}>Date:</b> {results_tweets.tweets[4].date}<br /> 
                  <b style={{color: "red"}}>Average Sentiment:</b> {results_tweets.tweets[4].sentiment}<br />
                  <b style={{color: "blue"}}>Influencer Score:</b> {results_tweets.tweets[4].inf_score}<br /> 
                  <b style={{color: "green"}}>Language of the Tweet:</b> {results_tweets.tweets[4].lang}<br />
                  <b style={{color: "green"}}>Tweet:</b> {results_tweets.tweets[4].tweet_text}
                  </p> <br />
                  <p style={{fontfamily: "arial", fontSize: 13}}> <b style={{color: "green"}}>Tweet by:</b> {results_tweets.tweets[5].user_handle} <br />
                  <b style={{color: "green"}}>Date:</b> {results_tweets.tweets[5].date}<br /> 
                  <b style={{color: "red"}}>Average Sentiment:</b> {results_tweets.tweets[5].sentiment}<br />
                  <b style={{color: "blue"}}>Influencer Score:</b> {results_tweets.tweets[5].inf_score}<br /> 
                  <b style={{color: "green"}}>Language of the Tweet:</b> {results_tweets.tweets[5].lang}<br />
                  <b style={{color: "green"}}>Tweet:</b> {results_tweets.tweets[5].tweet_text}
                  </p> <br />
                  <p style={{fontfamily: "arial", fontSize: 13}}> <b style={{color: "green"}}>Tweet by:</b> {results_tweets.tweets[6].user_handle} <br />
                  <b style={{color: "green"}}>Date:</b> {results_tweets.tweets[6].date}<br /> 
                  <b style={{color: "red"}}>Average Sentiment:</b> {results_tweets.tweets[6].sentiment}<br />
                  <b style={{color: "blue"}}>Influencer Score:</b> {results_tweets.tweets[6].inf_score}<br /> 
                  <b style={{color: "green"}}>Language of the Tweet:</b> {results_tweets.tweets[6].lang}<br />
                  <b style={{color: "green"}}>Tweet:</b> {results_tweets.tweets[6].tweet_text}
                  </p> <br />
                  
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

      if ((Object.keys(results).length && results.length) 
        && (Object.keys(results_tweets.tweets).length <6 && results_tweets.tweets.length) < 6
        && (Object.keys(results_tweets.facet.country).length && results_tweets.facet.country.length) 
        && (Object.keys(results_tweets.facet.poi_name).length && results_tweets.facet.poi_name.length)
        && (Object.keys(results_tweets.top_words).length && results_tweets.top_words.length)) {
        return (
            <div>
                <h4>We couldn't find what you were looking for. Please try another search. </h4>
            </div>
          )
         }
    };


    render(){
      const {loading, message } = this.state;
      return (
        
        <div> 
        
        {message && <p className="message"> { message } </p>}
        <img src={ loader } className={`search-loading  ${loading ? 'show' : 'hide'}`} alt="Loading Data!" />
                
        {this.componentDidMount} 
       {this.renderSearchResults()}
       </div>
       );
    }

}