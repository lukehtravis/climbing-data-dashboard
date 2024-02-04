import { RawDataList } from "../dashboard/types/raw-data-from-mountain-project";
import isValidDate from "./isValidDate";

interface GroupedMonth {
    month: string,
    year: string,
    dates: RawDataList
}

/**
 * Takes in a list of RawData objects from Mountain Project and groups the individual routes by year and month.
 */
const dateProcessor = (data: RawDataList): GroupedMonth[]|[] => {
 
  // data in the "grouped" variable will look like this
  // {
  //   "1-2023": RawDataRow[],
  //   "2-2023": RawDataRow[]
  // }

  const grouped = data.reduce((accumulator: {[key: string]: RawDataList}, row) => {
    const parsed = new Date(row.Date);
    if (isValidDate(parsed)) {
      const year = parsed.getFullYear();
      const month = parsed.getMonth() + 1; // JavaScript months are 0-indexed.
      const groupKey = `${month}-${year}`;
      if (!accumulator[groupKey]) {
        accumulator[groupKey] = [];
      }
      accumulator[groupKey].push(row);
    }
    return accumulator; // Always return the accumulator, even if the current row isn't added.
  }, {});

  // below code converts data in the "grouped" variable above into data that looks like this
  // [
  //   { month: '1', year: '2023', dates: RawDataRow[] },
  //   { month: '2', year: '2023', dates: RawDataRow[] },
  //   { month: '12', year: '2022', dates: RawDataRow[] }
  // ]
  
  // if something went wrong, return an empty array
  if (Object.prototype.toString.call(grouped) !== '[object Object]') {
    return []
  }
  
  return Object.entries(grouped).map(([key, dates]) => {
    const parts = key.split('-');
    const groupedMonth: GroupedMonth = {
      month: parts[0],
      year: parts[1],
      dates: dates as RawDataList
    }
    return groupedMonth;
    // Need to filter after because if something is broken about the date, it will come back looking like
    // { month: 'NaN', year: 'NaN', dates: RawDataRow[] }
    // so we need to check and make sure neither month or year is NaN
  }).filter(groupedMonth => !isNaN(Number(groupedMonth.month)) && !isNaN(Number(groupedMonth.year)));
}

export default dateProcessor;