import india_topic from './india_topic.jpg';
import italy_topic from './italy_topic.jpg';
import top_topics from './top_topics.png';
import us_topic from './us_topic.jpg';
import React from "react";

function TopicAnalysis(){
	return(
		<div className="App">
		<h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Top Topics</b> </h2>
          <img src={ top_topics } alt="Top Topics" width="80%" />


        <br />
        <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Topic Analysis for India</b> </h2>
          <img src={ india_topic } alt="India Top Topics" width="100%"  /> 


        <br />
        <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Topic Analysis for USA</b> </h2>
          <img src={ us_topic } alt="USA Top Topics" width="100%"  /> 


        <br />
        <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Topic Analysis for Italy</b> </h2>
          <img src={ italy_topic } alt="Italy Top Topics" width="100%" /> 
        </div>

		);
}

export default TopicAnalysis;