import ProcessingParams from '../../types/chart-processors'
import * as d3 from 'd3'
import RawDataRow from '../../types/raw-data-from-mountain-project'
import { dateIsInRange } from '@/app/utils/dateIsInRange'
import dateProcessor from '@/app/utils/date-grouper'
import { YDS_ARRAY } from '@/app/constants'
import { LineData } from '../../types/line-data'

export const maxGradeProcessor = ({ data, fromDate, toDate, typeOfClimbing, styleOfClimbing }: ProcessingParams) => {
  const dataFilteredByClimbingType = data.filter((oneRoute: RawDataRow) => {
    // use the below logic if we have received a time range
    if (fromDate && toDate) {
      return (
        dateIsInRange(new Date(fromDate), new Date(toDate), new Date(oneRoute.Date)) &&
        oneRoute['Route Type'] === typeOfClimbing &&
        oneRoute['Lead Style'] === styleOfClimbing &&
        oneRoute['Style'] !== 'TR'
      )
    }
    // use the below logic if we have no time range
    return oneRoute['Route Type'] === typeOfClimbing && oneRoute['Lead Style'] === styleOfClimbing && oneRoute['Style'] !== 'TR'
  })

  const datesByMonth = dateProcessor(dataFilteredByClimbingType)

  // Convenience function allowing us to pass the dates into xScale...
  const dates: Date[] = dataFilteredByClimbingType
    .map((row) => d3.timeParse('%Y-%m-%d')(row.Date))
    .filter((date): date is Date => date !== null)

  // This takes our input data and organizes it in a way that will allow us to pass it into the d3.line() function
  // Basically, here we grab the maximum Grade climbed in each month
  const chartArray: LineData[] = datesByMonth
    .map((monthGroup) => {
      let maxNumber = 0
      let rating = ''
      monthGroup.dates.forEach((row) => {
        if (row['Converted Grade'] > maxNumber) {
          rating = row['Rating']
          maxNumber = row['Converted Grade']
        }
      })
      return {
        x: new Date(`${monthGroup.year}-${monthGroup.month}-01 00:00:00`),
        y: rating,
      }
      // After returning all these items, we use .filter to make sure that if any of the dates were messed up, we omit those because they will break the chart
      // Gotta use !Number.isNaN here because if we just use groupedItem.month.getMonth() for our filter, it will return 0 for January, which is falsy, so it will be filtered out
    })
    .filter((groupedItem) => !Number.isNaN(groupedItem.x.getMonth()))

  // We want a modified min date. What was happening before was that we had set XScale to be based off earliest date in the list of dates
  // but we were packaging up dates by month in dateProcessor, and then re-creating date objects via month later on,
  // and this was causing the map to be skewed left, because the dates we would re-create at the first of the month would often be earlier
  // than the earliest date that would be present in the data. Here we account for that
  // TODO - Since getUTCMonth is zero-index(lame), we need to create some logic to make sure it behaves well when we get january (invalid date entry)
  // Will need to update the month to twelve in that case, and icnrement back the year one value
  const min = d3.min(dates)

  // this is zero indexed, but we don't want to add one because we actually want the previous month to accomodate above problem
  const minMonth = min?.getUTCMonth() as number
  const minYear = min?.getUTCFullYear()
  const newMin = new Date(`${minYear}-${minMonth}-01 00:00:00`)

  const xScale = d3.scaleTime().domain([newMin, d3.max(dates)] as [Date, Date])

  // This thing takes in numbers representing grades and converts them to y coordinates on our svg canvas
  const yScale = d3.scaleBand().domain(YDS_ARRAY)

  return { lineData: chartArray, xAxis: xScale, yAxis: yScale }
}
