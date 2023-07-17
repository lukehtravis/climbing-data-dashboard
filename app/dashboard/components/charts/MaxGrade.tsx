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
  
  // Convenience function to pass into xScale...We could get this form datesByMonth with some more work inside the function but this makes it look simpler below
  const dates:(Date)[] = data
    .map(row => d3.timeParse("%Y-%m-%d")(row.Date))
    .filter((date): date is Date => date !== null);

  // This takes our input data and organizes it in a way that will allow us to pass it into the d3.line() function
  const chartArray:LineData[] = datesByMonth.map(monthGroup => {
    let maxNumber = 0
    monthGroup.dates.forEach(row => {
      if (row["Converted Grade"] > maxNumber) {
        maxNumber = row["Converted Grade"]
      }
    })
    return {
      month: new Date(`${monthGroup.year}-${monthGroup.month}`), 
      grade: maxNumber
    }   
    // After returning all these items, we use .filter to make sure that if any of the dates were messed up, we omit those because they will break the chart
  }).filter(groupedItem => groupedItem.month.getMonth())
  
  useEffect(() => {
    if (data.length === 0) return;
    
    // Sets margins
    const margin = {top: 10, right: 30, bottom: 30, left: 60}

    // Does some funky react shit to grab the svg element and work with it from within the react component lifecycle
    const svg = d3.select(svgRef.current);

    // Designs the canvas and the axis locations
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // This thing takes in Date objects and converts them to x coordinates on our svg canvas
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dates) as unknown as [Date, Date])
      .range([0, width]);
  
    // This thing takes in numbers representing grades and converts them to y coordinates on our svg canvas
    const yScale = d3
      .scaleLinear()
      .domain([0,34])
      .range([height,0]);

    // Places the x axis
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
    
    // Places the y axis
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