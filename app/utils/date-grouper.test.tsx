import dateProcessor from './date-grouper';
import dummyRawData from './dummyDataList';

const rawData = dummyRawData
describe('dateProcessor', () => {

  it('handles an empty array', () => {
    expect(dateProcessor([])).toEqual([]);
  });

  it('groups rows from the same month and year correctly', () => {
    
    const result = dateProcessor(rawData);
    expect(result.length).toBe(3);
    expect(result[0].month).toBe('1');
    expect(result[0].year).toBe('2023');
    expect(result[0].dates.length).toEqual(2);

  });

  it('groups rows from different months in the same year correctly', () => {
    
    const result = dateProcessor(rawData);

    expect(result.length).toBe(3);
    expect(result[0].month).toBe('1');
    expect(result[0].year).toBe('2023');
    expect(result[0].dates.length).toEqual(2);
    
    expect(result[1].month).toBe('2');
    expect(result[1].year).toBe('2023');
    expect(result[1].dates.length).toEqual(1);

  });

  it('groups rows from different years correctly', () => {
    const result = dateProcessor(rawData);

    expect(result.length).toBe(3);
    expect(result[0].month).toBe('1');
    expect(result[0].year).toBe('2023');
    expect(result[0].dates.length).toEqual(2);
    
    expect(result[1].month).toBe('2');
    expect(result[1].year).toBe('2023');
    expect(result[1].dates.length).toEqual(1);

    expect(result.length).toBe(3);
    expect(result[2].month).toBe('12');
    expect(result[2].year).toBe('2022');
    expect(result[2].dates.length).toEqual(1);

  });

  it('handles invalid date formats gracefully', () => {
    // dateProcessor simply filters out bad dates, so this test makes
    // sure the number of returned results equals the number of valid rawDataRows
    // - the number of bad rawDataRows
    const result = dateProcessor(rawData);
    let totalDates:number = 0
    result.forEach(month => {
      totalDates = totalDates + month.dates.length
    })
    // this should change if we ever add new objects to the dummy data
    expect(totalDates).toEqual(4)
  });

  it('verifies the structure of GroupedMonth objects', () => {
   
    const [groupedMonth] = dateProcessor(rawData);
    expect(groupedMonth).toHaveProperty('month');
    expect(groupedMonth).toHaveProperty('year');
    expect(groupedMonth).toHaveProperty('dates');
    expect(Array.isArray(groupedMonth.dates)).toBe(true);
  });

});