import ProcessingParams from '../../types/chart-processors'
import * as d3 from 'd3'
import RawDataRow from '../../types/raw-data-from-mountain-project'
import { YDS_SCALE } from '../../../constants'
import { LineData } from '../../types/line-data'

export const maxOnsightProcessor = ({ data, fromDate, toDate, typeOfClimbing, styleOfClimbing }: ProcessingParams) => {
  const sportStyleCombinations = ['Sport', 'Sport, Alpine', 'Trad', 'TR', 'Sport, TR']
  const onsightLeadStyle = ['Onsight', 'Flash']
  const justSport = data.filter((oneRoute: RawDataRow) => sportStyleCombinations.includes(oneRoute['Route Type']))
  const onsightSport = justSport.filter((oneRoute: RawDataRow) => onsightLeadStyle.includes(oneRoute['Lead Style']))
  const groupAllSportByGrade = d3.rollup(
    justSport,
    (d) => d.length,
    (oneRoute: RawDataRow) => oneRoute.Rating
  )
  const groupOnsightSportByGrade = d3.rollup(
    onsightSport,
    (d) => d.length,
    (oneRoute: RawDataRow) => oneRoute.Rating
  )

  const chartArray: LineData[] = []
  groupAllSportByGrade.forEach((count, grade) => {
    const onsightCount = groupOnsightSportByGrade.get(grade)
    if (onsightCount !== undefined) {
      chartArray.push({
        x: grade,
        y: (onsightCount / count) * 100,
      })
    }
    // Optionally, handle the case where onsightCount is undefined
    // else {
    // Since this can happen both when we've never climbed a grade at all and when we have simply failed to onsight a grade
    // eventually we will want to build logic into this chart to accommodate that
    // }
  })
  chartArray.sort((a, b) => YDS_SCALE.indexOf(a.x as string) - YDS_SCALE.indexOf(b.x as string))
  const indexOfHighestGradeOnsight = YDS_SCALE.indexOf(chartArray[chartArray.length - 1].x as string) + 1
  const xScale = d3.scalePoint().domain(
    YDS_SCALE.slice(0, indexOfHighestGradeOnsight).map(function (d) {
      return d
    })
  )

  const yScale = d3.scaleLinear().domain([0, 100])
  return { lineData: chartArray, xAxis: xScale, yAxis: yScale }
}
