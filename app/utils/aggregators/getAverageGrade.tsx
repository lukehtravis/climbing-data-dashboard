import { RawDataList } from '@/app/dashboard/types/raw-data-from-mountain-project'
import { YDS_DICT } from '@/app/constants'
import { sum } from 'd3'
export const getAverageGrade = (data: RawDataList): string | undefined => {
  const numberOfClimbs: number = data.length
  let sumOfGrades: number = 0
  for (const row of data) {
    if (typeof row['Converted Grade'] === 'number') {
      sumOfGrades += row['Converted Grade']
    }
  }
  const averageRating = sumOfGrades / numberOfClimbs
  return Object.keys(YDS_DICT).find((key) => YDS_DICT[key] === Math.round(averageRating))
}

export const getAverageBoulderGrade = (data: RawDataList): string | undefined => {
  const numberOfClimbs: number = data.length
  let sumOfGrades: number = 0
  for (const row of data) {
    let rowRating = row['Rating'].replace('V', '')
    sumOfGrades += Number(rowRating)
  }
  const averageRating = sumOfGrades / numberOfClimbs
  return `V${Math.round(averageRating)}`
}
