"use client";

import React from "react";
import OnsightPercentage from "./OnsightPercentage";
import MaxGradeChart from "./charts/MaxGrade";
import { RawDataList } from "../types/raw-data-from-mountain-project";

// We can define what this object will look like after we decide exactly what we want to pass in
interface Props {
  data: RawDataList
}

const Visualizations: React.FC<Props> = ({ data }: Props) => {
  let sportClimbs: RawDataList = []
  let boulders: RawDataList = []
  let tradClimbs: RawDataList = []
  let topRope: RawDataList = []
  data ? data.forEach(row => {
    switch (row["Route Type"]) {
    case "Sport": 
      sportClimbs.push(row)
      break;
    case "Boulder":
      boulders.push(row)
      break;
    case "Trad":
      tradClimbs.push(row)
      break;
    case "Top-Rope":
      topRope.push(row)
      break;
    }
  }) : null
  // In this file, we take in some of the processed data, and pass it into a series of vis charts we can create independently and import in here
  return (
    <div>
      <p>Successful upload! However, we dont have any processing functions yet. Once we do, visualizations will appear here after loading</p>
      <OnsightPercentage data={data}/>
      <MaxGradeChart data={sportClimbs} />
    </div>

  );
};

export default Visualizations;