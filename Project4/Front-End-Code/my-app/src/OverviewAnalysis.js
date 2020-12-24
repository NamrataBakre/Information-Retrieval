import React from "react";
import Chart from "react-google-charts";
import usa_cloud from './usa_cloud.png';
import india_cloud from './india_cloud.png';
import Italy_cloud from './Italy_cloud.png';
import in_curve from './in_curve.jpg';
import it_curve from './it_curve.jpg';
import us_curve from './us_curve.jpg';


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


const countrydata = [
  ["Country", "Number of Tweets"],
  ["India", 50514],
  ["United States", 118206],
  ["Italy", 57856]
];




function OverviewAnalysis() {
  return(
        <div className="App">
          <Chart
            chartType="PieChart"
            options={{
              title: 'Lingual Distribution',
              titleTextStyle:{
                fontSize: 26
               } ,
              is3D: true,
              pieOptions
            }}
            data={[
              ["Language", "Number of Tweets"],
              ["English", 121206],
              ["Hindi", 47514],
              ["Italian", 57856]
            ]}
            graph_id="PieChart"
            width={"100%"}
            height={"400px"}
            legend_toggle
            is3D = "true"
          />
          <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Regional Distribution</b> </h2>
          <Chart
          title="country"
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
            options={{
              
              is3D: true
              }}
            width="100%"
            height="400px"
            data={countrydata}
          />

          <br /> 
          <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Word Cloud for USA </b></h2>
          <img src={ usa_cloud } alt="US Word Cloud"  /> 

          <br /> 
          <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}><b>Word Cloud for India</b></h2>
          <img src={ india_cloud } alt="India Word Cloud"  /> 

          <br /> 
          <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Word Cloud for Italy</b></h2>
          <img src={ Italy_cloud } alt="Italy Word Cloud"  /> 

          <br /> 
          <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Time Series Curve for USA</b></h2>
          <img src={ us_curve } alt="Time Series Curve"  />

          <br /> 
          <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Time Series Curve for India</b></h2>
          <img src={ in_curve } alt="Time Series Curve"  /> 

          <br /> 
          <h2 style={{ position: "static", fontSize: 26, left: "30 px", backgroundColor: "cream", padding: "300 px 6000px", width: "40%", height: "400%" }}> <b>Time Series Curve for Italy</b></h2>
          <img src={ it_curve } alt="Time Series Curve"  />                                                                                                                         
          
        </div>
  )

}

 export default OverviewAnalysis;