interface RawDataRow {
  Date: string
  Route: string
  Rating: string
  Notes: string
  URL: string
  Pitches: string
  Location: string
  'Avg Stars': string
  'Your Stars': string
  Style: string
  'Lead Style': string
  'Route Type': string
  'Your Rating': string
  Length: string
  'Rating Code': string
  'Converted Grade': number
}

export type RawDataList = Array<RawDataRow>

export default RawDataRow
