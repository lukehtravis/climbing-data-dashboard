"use client";

import React, {useEffect, useRef} from "react";
import {RawDataList} from '../../types/raw-data-from-mountain-project';
import * as d3 from 'd3';
import { YDS_DICT } from "@/app/constants";

interface Props {
  data: RawDataList
}



const MaxGradeChart: React.FC<Props> = ({data}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  console.log("MaxGrade:", data)
  var margin = {top: 10, right: 30, bottom: 30, left: 60}
  const width: number = 500
  const height: number = 500
  const dates:(Date | null | undefined)[] = data.map(row => d3.timeParse("%Y-%m-%d")(row.Date))
  const min: any = dates.reduce((a, b) => { 
    if (a && b) {
      return a < b ? a : b; 
    }    
  }); 
  const max : any = dates.reduce((a, b) => { 
    if (a && b) {
      return a > b ? a : b; 
    }    
  });
  let grades: string[] = []
  let gradeNumbers: (string | number)[] = []
  Object.entries(YDS_DICT).forEach(gradePair => {
    gradePair.push(grades[0])
    gradePair.push(gradeNumbers[1])
  })

  useEffect(() => {
    if (data.length === 0) return;
  
    const svg = d3.select(svgRef.current);
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
    //   .attr("transform",
    //     "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3
      .scaleTime()
      .domain([min,max])
      .range([ 0, width ]);
  
    console.log("xScale: ", xScale)
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
    
    const yScale = d3
      .scaleLinear()
      .domain([0,34])
      .range([height,0]);

    console.log("yScale: ", yScale)
    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(500, 0)")
      .call(d3.axisLeft(yScale));
  
  
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        // .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d["Converted Grade"]) })
      )
  }, [data, height, width]);
  
  return (
    <div className="container">
      <svg ref={svgRef}></svg>
    </div>
  );
} 

export default MaxGradeChart;