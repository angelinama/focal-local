import Chart from "react-google-charts";
import React from "react";

const MyPieChart = ({ data }) => {


  return (
    <div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: "My Daily Activities",
          // Just add this option
          is3D: true,
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default MyPieChart;