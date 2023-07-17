"use client";

import React, {useEffect, useRef} from "react";
import {RawDataList} from '../../types/raw-data-from-mountain-project';
import * as d3 from 'd3';
import dateProcessor from "@/app/utils/date-grouper";

interface Props {
  data: RawDataList
}

interface LineData {
    month: Date;
    grade: number;
}

const MaxGradeChart: React.FC<Props> = ({data}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width: number = 700
  const height: number = 500
  const datesByMonth = dateProcessor(data)
  
  // Convenience function to pass into xScale...We could get this form datesByMonth with some more work
  const dates:(Date)[] = data
    .map(row => d3.timeParse("%Y-%m-%d")(row.Date))
    .filter((date): date is Date => date !== null);

  const chartArray:LineData[] = datesByMonth.map(monthGroup => {
    let maxNumber = 0
    monthGroup.dates.forEach(row => {
      if (row["Converted Grade"] > maxNumber) {
        maxNumber = row["Converted Grade"]
      }
    })
    return {month: new Date(`${monthGroup.year}-${monthGroup.month}`), grade: maxNumber}
  })
  
  useEffect(() => {
    if (data.length === 0) return;
    const margin = {top: 10, right: 30, bottom: 30, left: 60}
    const svg = d3.select(svgRef.current);
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
    //   .attr("transform",
    //     "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dates) as unknown as [Date, Date])
      .range([0, width]);
  
    const yScale = d3
      .scaleLinear()
      .domain([0,34])
      .range([height,0]);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
    
    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate("+ width + ", 0)")
      .call(d3.axisLeft(yScale));

    svg.append("path")
      .datum(chartArray)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line<LineData>()
        .x((chartArrayItem) => { return xScale(chartArrayItem.month) })
        .y((chartArrayItem) => { return yScale(chartArrayItem.grade) })
      )
  }, [data, height, width, dates, chartArray]);
  
  return (
    <div className="container">
      <svg ref={svgRef}></svg>
    </div>
  );
} 

export default MaxGradeChart;