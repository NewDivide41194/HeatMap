
import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = { group: [] }
    }
    componentDidMount() {
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", (data) => {
            // console.log(data);
            // var map = d3.map({ "Ram": 5, "Geeks": 10, "gfg": 15 });
            // console.log(map.keys());
            const data1 = Object.values(data.group)
            console.log(this.state.group);

            // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
            var myGroups = data ? d3.extent(data,  d=> { return d.group; }).keys() : ["A"]
            var myVars = data ? d3.extent( data,d=> { return d.variable; }).keys() : ["v1"]
            // var myGroups = ["A", "B", "C"]
            // var myVars = ["v1", "v2", "v3"]

            // Build X scales and axis:
            var x = d3.scaleBand()
                .range([0, width])
                .domain(myGroups)
                .padding(0.05);
            svg.append("g")
                .style("font-size", 15)
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickSize(0))
                .select(".domain").remove()

            // Build Y scales and axis:
            var y = d3.scaleBand()
                .range([height, 0])
                .domain(myVars)
                .padding(0.05);
            svg.append("g")
                .style("font-size", 15)
                .call(d3.axisLeft(y).tickSize(0))
                .select(".domain").remove()

            // Build color scale
            var myColor = d3.scaleSequential()
                .interpolator(d3.interpolateInferno)
                .domain([1, 100])

            // create a tooltip
            var tooltip = d3.select(this.myRef.current)
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")

            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function (d) {
                tooltip
                    .style("opacity", 1)
                d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1)
            }
            var mousemove = function (d) {
                tooltip
                    .html("The exact value of<br>this cell is: " + d.value)
                    .style("left", (d3.pointer(this)[0] + 70) + "px")
                    .style("top", (d3.pointer(this)[1]) + "px")
            }
            var mouseleave = function (d) {
                tooltip
                    .style("opacity", 0)
                d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 0.8)
            }

            // add the squares
            svg.selectAll()
                .data(data, function (d) { return d.group + ':' + d.variable; })
                .enter()
                .append("rect")
                .attr("x", function (d) { return x(d.group) })
                .attr("y", function (d) { return y(d.variable) })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("width", x.bandwidth())
                .attr("height", y.bandwidth())
                .style("fill", function (d) { return myColor(d.value) })
                .style("stroke-width", 4)
                .style("stroke", "none")
                .style("opacity", 0.8)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)
        })
  d3.select(this.myRef.current)
            .append('p')
            .text('Hello from D3');
        //set the dimensions and margins of the graph
        var margin = { top: 80, right: 25, bottom: 30, left: 40 },
            width = 450 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //Read the data


        // Add title to graph
        svg.append("text")
            .attr("x", 0)
            .attr("y", -50)
            .attr("text-anchor", "left")
            .style("font-size", "22px")
            .text("A d3.js heatmap");

        // Add subtitle to graph
        svg.append("text")
            .attr("x", 0)
            .attr("y", -20)
            .attr("text-anchor", "left")
            .style("font-size", "14px")
            .style("fill", "grey")
            .style("max-width", 400)
            .text("A short description of the take-away message of this chart.");
        
    }
    render() {
        return (
            <div ref={this.myRef}>
                <svg className='chart'></svg>
            </div>
        );
    }

}
export default App;