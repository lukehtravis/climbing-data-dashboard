import React, {useRef, useState} from "react";
import {RawDataList} from '../../types/raw-data-from-mountain-project';
import Dropdown from "../form-inputs/Dropdown";
import Table from './Table'
import {aggregatePitches} from '../../../utils/aggregators/aggregatePitches'
import {countDates} from '../../../utils/aggregators/countDates'
import {getAverageGrade, getAverageBoulderGrade} from '../../../utils/aggregators/getAverageGrade'

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
    [key:string]: RawDataList
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


const CounterTables = ({compartmentalizedData}:Props) => {
  
  // TODO - Make a time picker so people can look at their stats for specific ranges of time
  const sport: any[] = ["sport", compartmentalizedData['sport'].length, aggregatePitches(compartmentalizedData['sport']), countDates(compartmentalizedData.sport), getAverageGrade(compartmentalizedData.sport)]
  const trad: any[] = ["trad", compartmentalizedData['trad'].length, aggregatePitches(compartmentalizedData['trad']), countDates(compartmentalizedData.trad), getAverageGrade(compartmentalizedData.trad)]
  const boulders: any[] = ["boulders", compartmentalizedData['boulders'].length, aggregatePitches(compartmentalizedData['boulders']), countDates(compartmentalizedData.boulders), /*getAverageBoulderGrade(compartmentalizedData.boulders)*/ "TODO"]
  const topRope: any[] = ["top-rope: TODO", compartmentalizedData['TR'].length, aggregatePitches(compartmentalizedData['TR']), countDates(compartmentalizedData.TR), /* getAverageGrade(compartmentalizedData.TR)*/"0" ]
  const all: any[] = ["all", compartmentalizedData['all'].length, aggregatePitches(compartmentalizedData['all']), countDates(compartmentalizedData.all), "N/A"]
  const ropedOnly = [...compartmentalizedData['trad'], ...compartmentalizedData['sport'], ...compartmentalizedData['TR']]
  const allRoped: any[] = ["all-roped", ropedOnly.length,aggregatePitches(ropedOnly), countDates(ropedOnly), getAverageGrade(ropedOnly)]
  const data = [sport, trad, boulders, topRope, allRoped, all]
  return (
    <div>
      <Table data={data as []} columnNames={["Type",'#Climbs', '#Pitches', 'Climbing Days', 'Average Grade']} />
    </div>
  );
}

export default CounterTables