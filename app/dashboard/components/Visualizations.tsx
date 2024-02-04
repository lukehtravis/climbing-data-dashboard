"use client";

import React from "react";
import { Box } from '@mui/material';
import OnsightPercentage from "./charts/OnsightPercentage";
import MaxGradeChart from "./charts/MaxGrade";
import Card from "./Card";
import Panel from "./Panel"
import { RawDataList } from "../types/raw-data-from-mountain-project";
import CounterTables from "./charts/CounterTables"
import styles from "./visualizations.module.css"
import LineChart from "./charts/LineChart"
import { maxGradeProcessor } from "./charts/maxGradeProcessors";
import { PanelContextProvider } from "../context/PanelContext";

// We can define what this object will look like after we decide exactly what we want to pass in
interface Props {
  data: RawDataList
}

const Visualizations: React.FC<Props> = ({ data }: Props) => {
  let sportClimbs: RawDataList = []
  let boulders: RawDataList = []
  let tradClimbs: RawDataList = []
  let topRope: RawDataList = []
  let allRoped: RawDataList = []
  data ? data.forEach(row => {
    switch (row["Route Type"]) {
    case "Sport": 
      sportClimbs.push(row)
      allRoped.push(row)
      break;
    case "Boulder":
      boulders.push(row)
      break;
    case "Trad":
      tradClimbs.push(row)
      allRoped.push(row)
      break;
    }
    if (row["Style"] === "TR") {
      topRope.push(row)
      allRoped.push(row)
    }
  }) : null
  // In this file, we take in some of the processed data, and pass it into a series of vis charts we can create independently and import in here
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <Box>
      <CounterTables compartmentalizedData={{sport: sportClimbs, boulders: boulders, trad: tradClimbs, TR: topRope, all: data}} />
      
      <div className={`${styles['line-charts']}`}>
        {/* <Card>
          <OnsightPercentage data={data}/>
        </Card> */}
        <PanelContextProvider>
          <Panel data={data} chartProcessor={maxGradeProcessor}>
            <LineChart dimensions={{width: 960, height: 800}}/>
          </Panel>
        </PanelContextProvider>
        
        {/* <Card>
          <MaxGradeChart data={data} />
        </Card> */}
      </div>
    </Box>
  );
};

export default Visualizations;