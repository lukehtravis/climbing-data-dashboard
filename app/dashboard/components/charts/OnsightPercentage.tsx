"use client";

import React from "react";
import RawDataRow, { RawDataList } from "../../types/raw-data-from-mountain-project";
import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import { YDS_SCALE } from "../../../constants"

// We can define what this object will look like after we decide exactly what we want to pass in
interface Props {
    data: RawDataList
}

interface LineData {
  grade: string;
  percentage: number;
}

const OnsightPercentage: React.FC<Props> = ({ data }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width: number = 1000
  const height: number = 1000

  const sportStyleCombinations = ["Sport", "Sport, Alpine", "Trad", "TR", "Sport, TR"];
  const onsightLeadStyle = ["Onsight", "Flash"];
  const justSport = data.filter((oneRoute: RawDataRow) => sportStyleCombinations.includes(oneRoute["Route Type"]));
  const onsightSport = justSport.filter((oneRoute: RawDataRow) => onsightLeadStyle.includes(oneRoute["Lead Style"]));
  const groupAllSportByGrade = d3.rollup(justSport, d => d.length, (oneRoute: RawDataRow) => oneRoute.Rating);
  const groupOnsightSportByGrade = d3.rollup(onsightSport, d => d.length, (oneRoute: RawDataRow) => oneRoute.Rating);
  // console.log(groupAllSportByGrade)
  // console.log(groupOnsightSportByGrade)
  const chartArray:LineData[] = [];
  const item = groupAllSportByGrade.forEach((count, grade) => {
    if (groupOnsightSportByGrade.get(grade)) {
      chartArray.push ({
        grade: grade,
        percentage: groupOnsightSportByGrade.get(grade)/count * 100
      })
    }
    // else {
    //   console.log("Luke didn't onsight this grade")
    // }  
  },
  )
  chartArray.sort((a,b) => YDS_SCALE.indexOf(a.grade) - YDS_SCALE.indexOf(b.grade))

  console.log(chartArray)
  
  const margin = {top: 10, right: 30, bottom: 30, left: 60}; 

  const svg = d3.select(svgRef.current);
  svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // const x = d3
  //   .scaleLinear().domain(d3.extent(chartArray, d => d.grade))
  //   .range([0, width]);

  const xScale = d3
    .scaleBand()
    .domain(YDS_SCALE.map(function(d) { return d; }))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0,100])
    .range([height,0]);

  const yAxis = d3.axisLeft(y).ticks(null, "%")

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate("+ width + ", 0)")
    .call(d3.axisLeft(y));
  

  svg.append("path")
    .datum(chartArray)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", d3.line<LineData>()
      .x((chartArrayItem) => { return xScale(chartArrayItem.grade) })
      .y((chartArrayItem) => { return y(chartArrayItem.percentage) })
    )
  return (
    <div className="container">
      <svg ref={svgRef}></svg>
    </div>

  );
};

export default OnsightPercentage;

//   justSport.forEach((oneRoute: RawDataRow) => {
//     if (oneRoute["Lead Style"] === "N/A") {
//       justSport.splice(justSport.indexOf(oneRoute))
//     }

//   }
//   )
// soundas: the N/A is missing...