import RawDataRow, { RawDataList } from "../dashboard/types/raw-data-from-mountain-project";

interface GroupedMonth {
    month: string,
    year: string,
    dates: RawDataList
}

const dateProcessor = (data: RawDataList): GroupedMonth[] => {
  const grouped = data.reduce((accumulator: any, row) => {
    const parsed = new Date(row.Date);
    const year = parsed.getFullYear();
    const month = parsed.getMonth();
    const groupKey = `${month}-${year}`;
    accumulator[groupKey] = accumulator[groupKey] || [];
    accumulator[groupKey].push(row);
    return accumulator;
  }, {});
  return Object.entries(grouped).map(([key, dates]) => {
    const parts = key.split('-');
    const groupedMonth: GroupedMonth = {
      month: parts[0],
      year: parts[1],
      dates: dates as RawDataList
    }
    return groupedMonth;
  });
}

export default dateProcessor;