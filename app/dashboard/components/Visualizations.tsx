"use client";

import React from "react";
import MaxGradeChart from "./charts/MaxGrade";

// We can define what this object will look like after we decide exactly what we want to pass in
interface Props {
  data: any
}

const Visualizations: React.FC<Props> = ({ data }: Props) => {
  // In this file, we take in some of the processed data, and pass it into a series of vis charts we can create independently and import in here
  return (
    <div>
      <p>Successful upload! However, we dont have any processing functions yet. Once we do, visualizations will appear here after loading</p>
      
      <MaxGradeChart data={data} />
    </div>

  );
};

export default Visualizations;