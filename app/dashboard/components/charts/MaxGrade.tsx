"use client";

import React, {useEffect, useRef, useState} from "react";
import RawDataRow, {RawDataList} from '../../types/raw-data-from-mountain-project';
import * as d3 from 'd3';
import dateProcessor from "@/app/utils/date-grouper";
import Dropdown from "../form-inputs/Dropdown";
import DatePicker from "../form-inputs/DatePicker";
import {YDS_ARRAY} from "@/app/constants";
import { dateIsInRange } from "../../../utils/dateIsInRange";
import './common.css'
import './max-grade.css'

interface Props {
  data: RawDataList
}

interface LineData {
  month: Date;
  grade: string;
}

interface DateRange {
  fromDate?: string;
  toDate?: string;
}

const MaxGradeChart: React.FC<Props> = ({data}: Props) => {
  const [typeOfClimbing, setTypeOfClimbing] = useState<string>("Sport");
  const [styleOfClimbing, setStyleOfClimbing] = useState<string>("Onsight");
  const [fromDate, setFromDate] = useState<string>("")
  const [toDate, setToDate] = useState<string>("")
  const svgRef = useRef<SVGSVGElement>(null);
  const width: number = 700
  const height: number = 500

  useEffect(() => {
    if (data.length === 0) return;
    const dataFilteredByClimbingType = data.filter((oneRoute: RawDataRow) => {
      
      // use the below logic if we have received a time range
      if (fromDate && toDate) {
        return (dateIsInRange(new Date(fromDate), new Date(toDate), new Date(oneRoute.Date)) && oneRoute["Route Type"] === typeOfClimbing && oneRoute["Lead Style"] === styleOfClimbing && oneRoute["Style"] !== "TR")
      }
      // use the below logic if we have no time range
      return (oneRoute["Route Type"] === typeOfClimbing && oneRoute["Lead Style"] === styleOfClimbing && oneRoute["Style"] !== "TR")
    });

    const datesByMonth = dateProcessor(dataFilteredByClimbingType)
    
    // Convenience function allowing us to pass the dates into xScale...
    const dates:(Date)[] = dataFilteredByClimbingType
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
        month: new Date(`${monthGroup.year}-${monthGroup.month}-01 00:00:00`), 
        grade: rating
      }   
    // After returning all these items, we use .filter to make sure that if any of the dates were messed up, we omit those because they will break the chart
    // Gotta use !Number.isNaN here because if we just use groupedItem.month.getMonth() for our filter, it will return 0 for January, which is falsy, so it will be filtered out
    }).filter(groupedItem => !Number.isNaN(groupedItem.month.getMonth()))

    // Sets margins
    const margin = {top: 30, right: 60, bottom: 50, left: 20}
    
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

    // removing this line: since the onsight chart is added first, this line removes the tooltip div from that chart
    // d3.select(".tooltip").remove();
    
    // Creates an inner box which will represent the actual drawn chart. We seperate this from the svg variable because it's necessary to do so to get axis margins to work with d3
    const chart = svg
      .append("g")
      .attr("class", "inner-chart-max-grade")
      .attr("transform", "translate(" + 67 + "," + margin.top + ")");

    // For tooltip, creates tooltip as a div sibling of our svg element in the html tree. 
    // Bothsvg and tooltip sit directly under a parent div with class "chart-container-max-grade"
    const div = d3.select(".chart-container-max-grade").append("div")	
      .attr("class", "tooltip")
      .style("opacity", "0")

    // We want a modified min date. What was happening before was that we had set XScale to be based off earliest date in the list of dates
    // but we were packaging up dates by month in dateProcessor, and then re-creating date objects via month later on,
    // and this was causing the map to be skewed left, because the dates we would re-create at the first of the month would often be earlier 
    // than the earliest date that would be present in the data. Here we account for that
    // TODO - Since getUTCMonth is zero-index(lame), we need to create some logic to make sure it behaves well when we get january (invalid date entry)
    // Will need to update the month to twelve in that case, and icnrement back the year one value
    const min = d3.min(dates)
  
    // this is zero indexed, but we don't want to add one because we actually want the previous month to accomodate above problem
    const minMonth = min?.getUTCMonth() as number
    const minYear = min?.getUTCFullYear()
    const newMin = new Date(`${minYear}-${minMonth}-01 00:00:00`)
    // This thing takes in Date objects and converts them to x coordinates on our svg canvas
  
    const xScale = d3
      .scaleTime()
      .domain([newMin, d3.max(dates)] as [Date, Date])
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
        .x((chartArrayItem) => { return xScale(chartArrayItem.month) })
        .y((chartArrayItem) => { return yScale(chartArrayItem.grade) as number })
      )

    const circle = chart.selectAll(".circle")
      .data(chartArray)

    circle.enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", (d) => {
        return xScale(d.month) 
      })
      .attr("cy", (d) => {
        return yScale(d.grade) as number
      })  
      .on("mouseenter", (event, d) => {
        div.transition()
          .duration(500)
          .style("opacity", 1)
        div.html(`<div class="circle-text">${d.grade}</div>`)	
          .style("left", (xScale(d.month)) + addedMargins + "px")		
          .style("top", (yScale(d.grade) as number) + margin.top + "px");	
      })					
      .on("mouseleave", (event, d) => {		
        div.transition()
          .duration(500) 		
          .style("opacity", 0)
      });

  }, [data, height, width, typeOfClimbing, fromDate, toDate, styleOfClimbing]);

  return (
    <div className="container">
      <div className="dropdown-menus">
        <Dropdown options={["Sport", "Trad"]} onChange={setTypeOfClimbing} />
        {
        /* 
          TODO: Currently, in the data category "Style" inside of the mountain project data, one of the options is TR. The other options are Follow Lead and Solo
          However, Sport and Trad are listed as a "Type" of climbing, so we can't filter for toprope in our Type Dropdown.
          Top rope is not a "Lead Style" either, however. It is simply a "Style". So we need to figure out how to filter for top-rope ideally without needing another dropdown just for it.

          // Since we have already seperated data into TR and lead in parent Visualization component, we can just pass down the different data sets from the parent component.
       */
        }
        <Dropdown options={["Onsight", "Fell/Hung", "Redpoint"]} onChange={setStyleOfClimbing} />
        <DatePicker date={fromDate} setDate={setFromDate} />
        <DatePicker date={toDate} setDate={setToDate} />
      </div>

      <div className={`chart-container-max-grade`}>
        <div className="y-axis-label">Grade</div>
        <div className="x-axis-label">Date</div>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
} 

export default MaxGradeChart;