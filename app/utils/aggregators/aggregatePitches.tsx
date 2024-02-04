import { RawDataList } from '../../dashboard/types/raw-data-from-mountain-project'
export const aggregatePitches = (data: RawDataList): number => {
  return data.reduce((accumulator, route) => accumulator + Number(route.Pitches), 0)
}
