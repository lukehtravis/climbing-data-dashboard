"use client";

import React from "react";
import RawDataRow, { RawDataList } from "../types/raw-data-from-mountain-project";
import * as d3 from 'd3';
import { useEffect, useRef } from "react";

// We can define what this object will look like after we decide exactly what we want to pass in
interface Props {
    data: any
}

const OnsightPercentage: React.FC<Props> = ({ data }: Props) => {
  const sportStyleCombinations = ["Sport", "Sport, Alpine", "Trad", "TR", "Sport, TR"];
  const onsightLeadStyle = ["Onsight", "Flash"];
  const justSport = data.filter((oneRoute: RawDataRow) => sportStyleCombinations.includes(oneRoute["Route Type"]));
  const onsightSport = justSport.filter((oneRoute: RawDataRow) => onsightLeadStyle.includes(oneRoute["Lead Style"]));
  const groupAllSportByGrade = d3.group(justSport, (oneRoute: RawDataRow) => oneRoute.Rating);
  console.log(groupAllSportByGrade);
  const margin = ({top: 20, right: 0, bottom: 30, left: 40}), width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
  const x = d3.scaleBand().domain(justSport.map((oneRoute: RawDataRow) => oneRoute.Rating)).range([margin.left, width - margin.right]).padding(0.1);
  const xAxis = d3.axisBottom(x).tickSizeOuter(0);
  const y = d3.scaleLinear().domain(justSport.map((oneRoute: RawDataRow) => oneRoute.Rating)).nice().range([height - margin.bottom, margin.top]);
  const yAxis = d3.axisLeft(y).ticks(null, "%")
    
    

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("style", `max-width: ${width}px; height: auto; font: 10px sans-serif; overflow: visible;`);

  svg.append("g")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(justSport);
    // .join("rect").attr("x", (d: string) => x(d.Rating)).attr("y", d => y(d.Rating)).attr("height", d => y(0) - y(d.Rating)).attr("width", x.bandwidth());

  svg.append("g")
    .call(xAxis);

  svg.append("g")
    .call(yAxis);
  svg.node();
  // In this file, we take in some of the processed data, and pass it into a series of vis charts we can create independently and import in here
  return (
    <div>

      {/* 
    group_all_sport_by_grade = just_sport.Rating.value_counts().rename_axis('Sport').copy()
    group_onsight_sport_by_grade = onsight_sport.Rating.value_counts().rename_axis('Onsight').copy() # count # of climbs for each grade */}
      <p>
        {JSON.stringify(groupAllSportByGrade)}
      </p>
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