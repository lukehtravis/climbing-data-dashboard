"use client";

import React from "react";
import RawDataRow, { RawDataList } from "../../types/raw-data-from-mountain-project";
import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import { YDS_SCALE } from "../../../constants"
import './common.css'
import './onsight.css' 

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
  const width: number = 700
  const height: number = 500

  const sportStyleCombinations = ["Sport", "Sport, Alpine", "Trad", "TR", "Sport, TR"];
  const onsightLeadStyle = ["Onsight", "Flash"];
  const justSport = data.filter((oneRoute: RawDataRow) => sportStyleCombinations.includes(oneRoute["Route Type"]));
  const onsightSport = justSport.filter((oneRoute: RawDataRow) => onsightLeadStyle.includes(oneRoute["Lead Style"]));
  const groupAllSportByGrade = d3.rollup(justSport, d => d.length, (oneRoute: RawDataRow) => oneRoute.Rating);
  const groupOnsightSportByGrade = d3.rollup(onsightSport, d => d.length, (oneRoute: RawDataRow) => oneRoute.Rating);
  let mogo = [
    { name: "ABC", amount: "34.0", date: "11/12/2019" },
    { name: "DEF", amount: "120.11", date: "11/02/2020" },
    { name: "MNO", amount: "12.01", date: "01/04/2020" },
    { name: "DEF", amount: "34.05", date: "03/04/2020" }
  ]

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

  // console.log(chartArray)
  
  const margin = {top: 10, right: 30, bottom: 30, left: 60}; 

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    d3.select(".inner-chart-max-grade").remove();

    const actualChart = svg
      .append("g")
      .attr("class", "inner-chart-onsight")
      .attr("transform", "translate(" + (margin.left + margin.right - 15) + "," + margin.top + ")");

    const div = d3.select(".chart-container-onsight").append("div")	
      .attr("class", "tooltip")

    const indexOfHighestGradeOnsight = YDS_SCALE.indexOf(chartArray[chartArray.length - 1].grade) + 1

    const x = d3
      .scalePoint()
      .domain(YDS_SCALE.slice(0, indexOfHighestGradeOnsight).map(function(d) { return d; }))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0,100])
      .range([height,0]);

    actualChart.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    actualChart.append("g")
      .attr("class", "y-axis")
      // .attr("transform", "translate("+ width + ", 0)")
      .call(d3.axisLeft(y));
    

    actualChart.append("path")
      .datum(chartArray)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", d3.line<LineData>()
        .x((chartArrayItem) => { return x(chartArrayItem.grade) })
        .y((chartArrayItem) => { return y(chartArrayItem.percentage) })
      )

    const circle = actualChart.selectAll(".circle")
      .data(chartArray)

    circle.enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", (d) => {
        return x(d.grade)
      })
      .attr("cy", (d) => {
        return y(d.percentage)
      })  
      .on("mouseenter", (event, d) => {
        div		
          .style("opacity", 1);		
        div.html(`<div class="circle-text">${d.grade}</div>`)	
          .style("left", (x(d.grade)) + margin.left + margin.right + "px")		
          .style("top", (y(d.percentage)) + margin.top + "px");	
      })					
      .on("mouseleave", (event, d) => {		
        div		
          .style("opacity", 0);	
      });
  }, [chartArray, data.length, margin.bottom, margin.left, margin.right, margin.top]);
      

  return (
    <div className="container">
      <div className={`chart-container-onsight`}>
        <div className="y-axis-label">Percentage</div>
        <div className="x-axis-label">Grade</div>
        <svg ref={svgRef}></svg>
      </div>
    </div>

  );
}

export default OnsightPercentage;

//   justSport.forEach((oneRoute: RawDataRow) => {
//     if (oneRoute["Lead Style"] === "N/A") {
//       justSport.splice(justSport.indexOf(oneRoute))
//     }

//   }
//   )
// soundas: the N/A is missing...