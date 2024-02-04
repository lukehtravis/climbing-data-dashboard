import React, { useRef } from 'react'
import { Grid } from 'gridjs-react'
import 'gridjs/dist/theme/mermaid.css'

interface Props {
  data: [][]
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

const Table = ({ data, columnNames }: Props) => {
  const wrapperRef = useRef(null)

  return (
    <div>
      <Grid data={data} columns={columnNames} />
    </div>
  )
}

export default Table
