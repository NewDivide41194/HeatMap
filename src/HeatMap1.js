import { useD3 } from "./hooks/useD3";
import React from "react";
import * as d3 from "d3";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { group: [] };
  }

  componentDidMount() {

    // const data=JSON.parse(Data)
    const mainData = this.props.data
    console.log(mainData);

    const data = mainData.map(v => v.categories)[0],
      baseId = mainData.map(v => v.targetId),
      yearRange = d3.extent(data, (d) => {
        return d.SDG;
      });
    console.log(yearRange);
    const legendData = [
      { interval: 1, color: "#9FF1CF" },
      { interval: 2, color: "#F6F38F" },
      { interval: 3, color: "mediumpurple" },
      { interval: 4, color: "#F06F9F" },
    ];

    const width = 1000,
      height = 500,
      margins = { top: 20, right: 50, bottom: 100, left: 100 };

    const yScale = d3.scaleLinear().range([height, 0]).domain([12, 0]);

    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain(
        d3.extent(data, (d) => {
          return d.SDG;
        })
      );

    //Setting chart width and adjusting for margins
    const chart = d3
      .select(".chart")
      .attr("width", width + margins.right + margins.left)
      .attr("height", height + margins.top + margins.bottom)
      .append("g")
      .attr(
        "transform",
        "translate(" + 200 + "," + margins.top + ")"
      );

    const tooltip = d3
      .select(".container")
      .append("div")
      .attr("class", "tooltip")
      .html("Tooltip");

    // const barWidth = width / (yearRange[1] - yearRange[0]),
    const barWidth = 5.5,
      barHeight = height / 24;
    //Return dynamic color based on intervals in legendData
    const colorScale = (d) => {
      for (let i = 0; i < legendData.length; i++) {
        console.log("+++++++++", d.alignedId, legendData[i].interval)
        if (d.alignedId <= legendData[i].interval) {
          return legendData[i].color;
        }
      }
      return "white";
    };

    //Return abbreviate month string from month decimal
    const timeParseFormat = (d) => {
      if (d === 0) return "";
      return d3.timeFormat("%b")(d3.timeParse("%m")(d));
    };

    //Append heatmap bars, styles, and mouse events
    // console.log(d.year-yearRange[0]);
    chart
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .append("rect")
      // .attr('x', d => { return (d.year - yearRange[0]) * barWidth })
      .attr("x", (d) => {
        console.log((d.subTarget - yearRange[0]) * barWidth);
        return (d.subTarget - yearRange[0]) * barWidth;
      })
      .attr("y", (d) => {
        return (d.DDID - 1) * barHeight;
      })
      .style("fill", colorScale)
      .attr("width", barWidth)
      .attr("height", barHeight)
      .on("mouseover", (d) => {
        tooltip
          .html(
            // timeParseFormat(d.digitalDevelopment) +
            " " +
            d.year +
            "<br/>" +
            d3.format(".4r")(d.alignedId) +
            " &degC<br/>" +
            d.variance +
            " &degC"
          )
          .style('left', function (event, d) { return event.pageX - 35 + 'px' })
          .style('top', function (event, d) { return event.pageY - 73 + 'px' })
          .style("opacity", 0.9);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0).style("left", "0px");
      });

    // Create the scale
    var x = d3.scaleBand()
      .domain(data.map(v => v.digitalDevelopment))         // This is what is written on the Axis: from 0 to 100
      .range([0, 500]);         // Note it is reversed

    //Append x axis
    chart
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickFormat(d3.format(".4")));

    //Append y axis
    chart
      .append("g")
      .attr("transform", "translate(0,-" + barHeight / 2 + ")")
      .call(d3.axisLeft(x))
      .attr("class", "yAxis")
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")

    //Append y axis label
    // chart
    //   .append("text")
    //   .attr("transform", "translate(-40," + height / 2 + ") rotate(-90)")
    //   .style("text-anchor", "middle")
    //   .text("Month");
    //Append x axis label
    chart
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + "," + (height + 40) + ")"
      )
      .style("text-anchor", "middle")
      .text("SDG Targets");

    //Append color legend using legendData
    chart
      .append("g")
      .selectAll("g")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("width", 30)
      .attr("height", 20)
      .attr("x", (d, i) => {
        return i * 30 + width * 0.7;
      })
      .attr('y', height + margins.top)

      .style("fill", (d) => {
        return d.color;
      });

    //Append text labels for legend from legendData
    chart
      .append("g")
      .selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", (d, i) => {
        return i * 30 + width * 0.7;
      })
      .attr("y", height + margins.top * 3)
      .text((d) => {
        return d.interval;
      });
    ;
  }
  render() {
    return (
      <div ref={this.myRef}>
        <svg className="chart"></svg>
      </div>
    );
  }
}
export default App;
