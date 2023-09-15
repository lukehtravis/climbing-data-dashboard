import React, {useRef, useState} from "react";
import {RawDataList} from '../../types/raw-data-from-mountain-project';
import Dropdown from "../form-inputs/Dropdown";
import Table from './Table'


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
  compartmentalizedData: {
    sport: RawDataList,
    boulders: RawDataList,
    trad: RawDataList,
    TR: RawDataList
  }
}

interface RawDataRow {
    Date: string
    Route: string
    Rating: string
    Notes: string
    URL: string
    Pitches: string
    Location: string
    "Avg Stars": string
    "Your Stars": string
    Style: string
    "Lead Style": string
    "Route Type": string
    "Your Rating": string
    Length: string
    "Rating Code": string,
    "Converted Grade": number
}


const Tables = ({compartmentalizedData}:Props) => {
  const wrapperRef = useRef(null);
  const [climbingTypeToShow, setClimbingTypeToShow] = useState("all")
  
  return (
    <div>

      <Table sport={compartmentalizedData.sport} />
    </div>
  );
}

export default Tables