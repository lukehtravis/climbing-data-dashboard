import React, {useEffect, useRef, useState} from "react";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import {RawDataList} from '../../types/raw-data-from-mountain-project';
import {aggregatePitches} from '../../../utils/aggregators/aggregatePitches'
import {countDates} from '../../../utils/aggregators/countDates'
import {getAverageGrade} from '../../../utils/aggregators/getAverageGrade'
import * as d3 from 'd3';
import dateProcessor from "@/app/utils/date-grouper";
import Dropdown from "../form-inputs/Dropdown";
import {YDS_ARRAY} from "@/app/constants";

// What do we want in this table

// We want number of climbs that have been done for a given set of times
// We want to break them out into lead types, and top rope, and trad
// want individual climbing days
// want pitches
// want average grade 


// columns
/* 
Climbing Style #Climbs #Pitches ClimbingDays AvgGrade  
Sport 
Onsight
Flash
Redpoint
Fell Hung
Trad
Top Rope
Boulder 




*/

interface Props {

    sport: RawDataList,

}

// interface RawDataRow {
//     Date: string
//     Route: string
//     Rating: string
//     Notes: string
//     URL: string
//     Pitches: string
//     Location: string
//     "Avg Stars": string
//     "Your Stars": string
//     Style: string
//     "Lead Style": string
//     "Route Type": string
//     "Your Rating": string
//     Length: string
//     "Rating Code": string,
//     "Converted Grade": number
// }


const Table = ({sport}:Props) => {
  const wrapperRef = useRef(null);
  
  const sportStats: any[] = [sport.length, aggregatePitches(sport), countDates(sport), getAverageGrade(sport)]

  const grid = new Grid({
    columns: ['#Climbs', '#Pitches', 'Climbing Days', 'Average Grade'],
    data: [sportStats]
  });
    
  useEffect(() => {
    grid.render(wrapperRef.current as unknown as Element);
  });
    
  return <div ref={wrapperRef} />;
}

export default Table