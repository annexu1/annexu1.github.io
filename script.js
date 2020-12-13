

window.onload = function () {


    

let stockTesting; 


// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 650 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", 330 + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data


d3.csv("covidData.csv", function(data) {

console.log(data)

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 13000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 800])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));



  
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height + 32)
    .attr("font-family", "Roboto")
    .text("new Confirmed Cases");


    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 0)
    .attr("dy", "-2.3em")
    .attr("transform", "rotate(-90)")
    
    .attr("font-family", "Roboto")
    .text("new Fatality Cases");

    

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 4, 40]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
    .range(["#88CBDF","#7399C6","#E2D4D6","#9194B6","#4E917A"]);
    // .range(d3.schemeSet2);
  
    var colorTest = d3.scaleThreshold()
  .domain([40,75,90])
  .range(["#88CBDF","#4E917A","#E2D4D6","#9194B6"]);
    

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#my_dataviz")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#00355F")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")


   

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {
    //   :)


    var countryNames =  {
         "US": "United States",
        "AR" : "Argentina",
         "BR" : "Brazil",
        "CO": "Colombia",
         "FR":"France",
         "DE": "Germany",
        "IN":"India",
        "IT":"Italy",
         "MX":"Mexico",
         "RU":"Russia",
         "ES":"Spain",
        "GK" : "UK"} 
    

  

      let countryName = d.country

  


//       chart.setTitle({title: {text: 'new chart title' }});
// chart.redraw();


      stockTesting.series[0].setName('Index: ' +  hm[countryName]['stockName'] );
      stockTesting.series[0].setData( hm[countryName]['stockData'] );
            

      stockTesting.series[1].setName(d.country + ' cases ');
      stockTesting.series[1].setData( hm[countryName]['covidFData'] );


    //   stockTesting.xAxis[0].setExtremes( Date.UTC(2019, 12, 30), Date.UTC(2020, 12, 12));




    //   stockTesting.series[2].setName(d.country + ' new fatalities: ');
    //   stockTesting.series[2].setData( hm[countryName]['covidFData'] );
      






    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.country)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")


            stockTesting.setTitle({text:   countryNames[countryName] + " (" + countryName +  ") COVID Fatalities and Index Price"});




  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }



  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "bubbles")
      .attr("cx", function (d) { return x(d.newConfirmed)+30; } )
      .attr("cy", function (d) { return y(d.newFatalities)-30; } )
      .attr("r", function (d) { return z(d.population); } )
      .style("fill", function (d) { return myColor(d.totalFatalities); }   )

      // .style("fill", function(d) { return colorTest(d); })

    // -3- Trigger the functions
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )



  

  })




// var margin = {top: 10, right: 20, bottom: 30, left: 50},
// width = 500 - margin.left - margin.right,
// height = 420 - margin.top - margin.bottom;



let hm; 


Highcharts.getJSON('./countryJSON/covidIndex.json', function (data) {
    hm =  data ; 
    console.log(hm)
});


Highcharts.getJSON('./countryJSON/testJSON3.json', function (data) {

    console.log(data)
  // Create the chart
  stockTesting  = Highcharts.stockChart('containerStock', {


    rangeSelector: {
      selected: 1
    },

    title: {
      text: 'Index Price and COVID Cases',
      style: {
        fontFamily: 'EB Garamond',
        color: '#7399C6',
        fontSize:'24px',
    }

    },
    // subtitle:{
    //     text:"hm",

    // },

    yAxis: [{
        title: {
          text: 'New Confirmed Fatalities',
          style: { color:  '#8B0E04'},

        }
      }, {
        labels: {
          style: {
            color: 'green'
          }
        },
        title: {
          text: 'Index Price',
          style: {
            color:  '#2F6EB6'
           
          }
        },
        opposite: false 
      }],


    series: [{
      name: 'Stock 1 ',
      data: [],
      lineColor: '#2F6EB6',
      yAxis: 1,

      tooltip: {
        valuePrefix : "$",
        color: '#8B0E04',
        
        // xDateFormat: '%d/%m/%Y'
        // valueDecimals: 2
      }
    },

    {
        name: 'Stock 2 ',
        data: [],
        lineColor: '#8B0E04',

        tooltip: {
            color: '#2F6EB6',
            // xDateFormat: '%d/%m/%Y'
        //   valueDecimals: 2
        }
      },

      {
        name: 'Stock 3 ',
        data: [],
        tooltip: {
            // xDateFormat: '%d/%m/%Y'
        //   valueDecimals: 2
        }
      },


    


]
  });
});



 








}
 