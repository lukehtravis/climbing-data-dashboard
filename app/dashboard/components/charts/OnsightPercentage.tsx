"use client";

import React from "react";
import RawDataRow, { RawDataList } from "../../types/raw-data-from-mountain-project";
import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import { isTemplateExpression } from "typescript";

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

  // onsight_sport = just_sport.loc[just_sport["Lead Style"].isin(["Onsight", "Flash"])]
  // group_all_sport_by_grade = just_sport.Rating.value_counts().rename_axis('Sport').copy()
  // group_onsight_sport_by_grade = onsight_sport.Rating.value_counts().rename_axis('Onsight').copy() # count # of climbs for each grade

  // combined = pd.concat([group_onsight_sport_by_grade, group_all_sport_by_grade], keys=["Onsight", "Sport"], axis=1, sort=False).fillna(0)
  // combined.index.name = "Rating"
  // combined["Onsight Percentage"] = combined["Onsight"]/combined["Sport"]*100
  // combined.index = combined.index.astype(cat_grade_order)
  // combined.sort_index(inplace=True)

  const sportStyleCombinations = ["Sport", "Sport, Alpine", "Trad", "TR", "Sport, TR"];
  const onsightLeadStyle = ["Onsight", "Flash"];
  const justSport = data.filter((oneRoute: RawDataRow) => sportStyleCombinations.includes(oneRoute["Route Type"]));
  // const justSportd3 = d3.group(data, ((oneRoute: RawDataRow) => oneRoute[].))
  const onsightSport = justSport.filter((oneRoute: RawDataRow) => onsightLeadStyle.includes(oneRoute["Lead Style"]));
  const groupAllSportByGrade = d3.rollup(justSport, d => d.length, (oneRoute: RawDataRow) => oneRoute.Rating);
  const groupOnsightSportByGrade = d3.rollup(onsightSport, d => d.length, (oneRoute: RawDataRow) => oneRoute.Rating);
  // console.log(groupAllSportByGrade);
  // console.log(groupOnsightSportByGrade);
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

  // console.log(chartArray)
  
  const margin = ({top: 20, right: 0, bottom: 30, left: 40}); 

  const svg = d3.select(svgRef.current);
  const x = d3
    .scaleLinear().domain(d3.extent(chartArray, d => d.grade))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0,34])
    .range([height,0]);
  const yAxis = d3.axisLeft(y).ticks(null, "%")
    
  svg
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("style", `max-width: ${width}px; height: auto; font: 10px sans-serif; overflow: visible;`);

  svg.append("path")
    .datum(chartArray)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line<LineData>()
      .x((chartArrayItem) => { return x(chartArrayItem.grade) })
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