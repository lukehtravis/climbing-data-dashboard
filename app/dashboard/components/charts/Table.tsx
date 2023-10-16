import React, {useEffect, useRef, useState} from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import {RawDataList} from '../../types/raw-data-from-mountain-project';
import {aggregatePitches} from '../../../utils/aggregators/aggregatePitches'
import {countDates} from '../../../utils/aggregators/countDates'
import {getAverageGrade} from '../../../utils/aggregators/getAverageGrade'

interface Props {

    data: [][],
    columnNames: string[]

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


const Table = ({data, columnNames}:Props) => {
  const wrapperRef = useRef(null);
    
  return (
    <div>
      <Grid
        data={data}
        columns={columnNames}
      />
    </div>
  )
    
  
  
}

export default Table