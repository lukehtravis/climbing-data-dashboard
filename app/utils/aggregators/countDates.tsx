import { RawDataList } from '@/app/dashboard/types/raw-data-from-mountain-project'
export const countDates = (data: RawDataList): number => {
  return [...new Set(data.map((item) => item.Date))].length
}
