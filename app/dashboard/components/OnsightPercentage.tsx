"use client";

import React from "react";
import RawDataRow, { RawDataList } from "../types/raw-data-from-mountain-project";
import * as d3 from 'd3';

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
  // In this file, we take in some of the processed data, and pass it into a series of vis charts we can create independently and import in here
  return (
    <div>

      {/* 
    group_all_sport_by_grade = just_sport.Rating.value_counts().rename_axis('Sport').copy()
    group_onsight_sport_by_grade = onsight_sport.Rating.value_counts().rename_axis('Onsight').copy() # count # of climbs for each grade */}
      <p>{JSON.stringify(groupAllSportByGrade)}</p>
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