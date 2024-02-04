// inputs are date objects that represent a range (dateStart, dateEnd)
// output would be boolean that is true if its in the range, and false otherwise

export const dateIsInRange = (fromDate: Date, toDate: Date, targetDate: Date): boolean => {
  if (!fromDate?.getTime() || !toDate?.getTime()) {
    return false
  }
  if (targetDate.getTime() >= fromDate.getTime() && targetDate.getTime() <= toDate.getTime()) {
    return true
  }
  return false
}
