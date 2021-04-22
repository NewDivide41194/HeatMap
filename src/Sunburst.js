// // install (please make sure versions match peerDependencies)
// // yarn add @nivo/core @nivo/waffle
// import React from "react";
// import { ResponsiveWaffleCanvas } from "@nivo/waffle";
// // make sure parent container have a defined height when using
// // responsive component, otherwise height will be 0 and
// // no chart will be rendered.
// // website examples showcase many properties,
// // you'll often use just a few of them.

// const MyResponsiveWaffleCanvas = ({ data /* see data tab */ }) => (
//   <div style={{ height: 500 }}>
//     <ResponsiveWaffleCanvas
//       data={data}
//       pixelRatio={1}
//       total={140}
//       rows={40}
//       columns={40}
//       padding={0.5}
//       margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
//       colors={{ scheme: "category10" }}
//       borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
//       enableLabels={true}

//       legends={[
//         {
//           anchor: "top-left",
//           direction: "column",
//           justify: false,
//           translateX: -100,
//           translateY: 0,
//           itemsSpacing: 4,
//           itemWidth: 100,
//           itemHeight: 20,
//           itemDirection: "left-to-right",
//           itemOpacity: 1,
//           itemTextColor: "#777",
//           symbolSize: 20,
//           effects: [
//             {
//               on: "hover",
//               style: {
//                 itemTextColor: "#000",
//                 itemBackground: "#f7fafb",
//               },
//             },
//           ],
//         },
//       ]}
//     />
//   </div>
// );

// export default MyResponsiveWaffleCanvas;

/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins from "@amcharts/amcharts4/plugins/sunburst";
import { Data } from "./data";

class Sunburst extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    am4core.useTheme(am4themes_animated);

    // Create the chart
    var chart = am4core.create("chartdiv", am4plugins.Sunburst);

    chart.radius = am4core.percent(90);
    chart.data = Data;

    // Define data fields
    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";
    chart.dataFields.color = "color";

    const totalSDG = Data[0].children.map(d => d.children.length).reduce((a, b) => a + b, 0)

    var level2 = chart.seriesTemplates.create("2");
    level2.labels.template.text = "{category}";
    level2.labels.template.disabled = true;
    level2.labels.template.scale = 0.8;
    level2.innerRadius = am4core.percent(65);
    level2.radius = am4core.percent(50);
    level2.slices.template.tooltipText = "{category}";
    level2.labels.template.wrap = true;

    var level0 = chart.seriesTemplates.create("0");
    level0.labels.template.text = `{category}`;
    level0.labels.template.text = `{category}`;

    level0.labels.template.axis = 45;
    level0.radius = am4core.percent(50);

    level0.slices.template.tooltipText = `{category}`;


    var level1 = chart.seriesTemplates.create("1");
    level1.labels.template.text = "{category}";
    level1.labels.template.fontSize = 12;

    level1.slices.template.tooltipText = "SDG:{category}";
    level1.innerRadius = am4core.percent(80);
  }

  // Add multi-level data
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  render() {
    console.log(Data[0].children.map(d => d.children.length).reduce((a, b) => a + b, 0));

    return (
      <div
        id="chartdiv"
        style={{
          width: "900px",
          height: "900px",
        }}
      />
    );
  }
}

export default Sunburst;
