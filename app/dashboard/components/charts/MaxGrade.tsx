"use client";

import React, {useEffect, useRef, useState} from "react";
import RawDataRow, {RawDataList} from '../../types/raw-data-from-mountain-project';
import * as d3 from 'd3';
import dateProcessor from "@/app/utils/date-grouper";
import Dropdown from "../form-inputs/Dropdown";
import {YDS_ARRAY} from "@/app/constants";
import './common.css'
import './max-grade.css'

interface Props {
  data: RawDataList
}

interface LineData {
    month: Date;
    grade: string;
}

const MaxGradeChart: React.FC<Props> = ({data}: Props) => {
  const [typeOfClimbing, setTypeOfClimbing] = useState<string>("Sport");
  const [styleOfClimbing, setStyleOfClimbing] = useState<string>("Onsight");
  const svgRef = useRef<SVGSVGElement>(null);
  const width: number = 700
  const height: number = 500
  const dataFilteredByClimbingType = data.filter((oneRoute: RawDataRow) => oneRoute["Route Type"] === typeOfClimbing);
  // TODO: Need to come up with a solution for what to do when a route has no exlicit Lead Style set. Which style should we default to in that case
  const dataFilteredByClimbingTypeAndStyle = dataFilteredByClimbingType.filter((oneRoute: RawDataRow) => oneRoute["Lead Style"] === styleOfClimbing);
  const datesByMonth = dateProcessor(dataFilteredByClimbingTypeAndStyle)
  
  // Convenience function to pass into xScale...We could get this from datesByMonth with some more work inside the function but this makes it look simpler below
  const dates:(Date)[] = dataFilteredByClimbingTypeAndStyle
    .map(row => d3.timeParse("%Y-%m-%d")(row.Date))
    .filter((date): date is Date => date !== null);

  // This takes our input data and organizes it in a way that will allow us to pass it into the d3.line() function
  const chartArray:LineData[] = datesByMonth.map(monthGroup => {
    let maxNumber = 0
    let rating = ""
    monthGroup.dates.forEach(row => {
      if (row["Converted Grade"] > maxNumber) {
        rating = row["Rating"]
        maxNumber = row["Converted Grade"]
      }
    })
    return {
      month: new Date(`${monthGroup.year}-${monthGroup.month}`), 
      grade: rating
    }   
    // After returning all these items, we use .filter to make sure that if any of the dates were messed up, we omit those because they will break the chart
    // Gotta use !Number.isNaN here because if we just use groupedItem.month.getMonth() for our filter, it will return 0 for January, which is falsy, so it will be filtered out
  }).filter(groupedItem => !Number.isNaN(groupedItem.month.getMonth()))

  // Sets margins
  const margin = {top: 30, right: 60, bottom: 50, left: 20}
  useEffect(() => {
    if (data.length === 0) return;
    
    

    // Does some funky react shit to grab the svg element and work with it from within the react component lifecycle
    const svg = d3.select(svgRef.current);

    // Creates the canvas upon which we can draw svg things
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    
    const addedMargins = margin.left + margin.right

    // If line has already been drawn and user changes dropdown menu, erase existing line. 
    // If no line has been drawn, this does nothing
    d3.select(".inner-chart-max-grade").remove();
    d3.select(".tooltip").remove();
    
    // Creates an inner box which will represent the actual drawn chart. We seperate this from the svg variable because it's necessary to do so to get axis margins to work with d3
    const chart = svg
      .append("g")
      .attr("class", "inner-chart-max-grade")
      .attr("transform", "translate(" + addedMargins + "," + margin.top + ")");

    // For tooltip, creates tooltip as a div sibling of our svg element in the html tree. 
    // Bothsvg and tooltip sit directly under a parent div with class "chart-container-max-grade"
    const div = d3.select(".chart-container-max-grade").append("div")	
      .attr("class", "tooltip")

    // This thing takes in Date objects and converts them to x coordinates on our svg canvas
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dates) as unknown as [Date, Date])
      .range([0, width]);
  
    // This thing takes in numbers representing grades and converts them to y coordinates on our svg canvas
    const yScale = d3
      .scaleBand()
      .domain(YDS_ARRAY)
      .range([height,0]);

    // Places the x axis
    chart.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
    
    // Places the y axis
    chart.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Draws the line for the chart
    chart.append("path")
      .datum(chartArray)
      .attr("fill", "none")
      .attr("class", "chart-line")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line<LineData>()
        .x((chartArrayItem) => { return xScale(chartArrayItem.month) - xScale(chartArray[chartArray.length -1].month) })
        .y((chartArrayItem) => { return yScale(chartArrayItem.grade) as number })
      )
    // it turned out the last item in the date array (which was the earliest date), was offset by negative 15 or so, skewing the chart to the left, 
    // so we subtract it's value from the x value of every x data point and it fixes the chart. Still kind of hacky but an improvement

    const circle = chart.selectAll(".circle")
      .data(chartArray)

    circle.enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", (d) => {
        return xScale(d.month) - xScale(chartArray[chartArray.length - 1].month)
      })
      .attr("cy", (d) => {
        return yScale(d.grade) as number
      })  
      .on("mouseenter", (event, d) => {
        div		
          .style("opacity", 1);		
        div.html(`<div class="circle-text">${d.grade}</div>`)	
          .style("left", (xScale(d.month) - xScale(chartArray[chartArray.length -1].month)) + addedMargins + "px")		
          .style("top", (yScale(d.grade) as number) + margin.top + "px");	
      })					
      .on("mouseleave", (event, d) => {		
        div		
          .style("opacity", 0);	
      });

  }, [data, height, width, dates, chartArray, typeOfClimbing]);
  
  return (
    <div className="container">
      <Dropdown options={["Sport", "Trad"]} onChange={setTypeOfClimbing} />
      {
        /* 
          TODO: Currently, in the data category "Style" inside of the mountain project data, one of the options is TR. The other options are Follow Lead and Solo
          However, Sport and Trad are listed as a "Type" of climbing, so we can't filter for toprope in our Type Dropdown.
          Top rope is not a "Lead Style" either, however. It is simply a "Style". So we need to figure out how to filter for top-rope ideally without needing another dropdown just for it.
       */
      }
      <Dropdown options={["Onsight", "Fell/Hung", "Redpoint"]} onChange={setStyleOfClimbing} />
      <div className={`chart-container-max-grade`}>
        <div className="y-axis-label">Grade</div>
        <div className="x-axis-label">Date</div>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
} 

export default MaxGradeChart;