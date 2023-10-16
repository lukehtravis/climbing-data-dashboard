export const getColumnsByName = (data: {[key:string]: any}[], columns: string[]) => {
  let consolidatedData: {[key:string]: any}[] = []
  data.forEach(row => {
    let returnableRow: {[key:string]: any} = {}
    columns.forEach(column => {
      if (row[column]) {
        returnableRow[column] = row[column]
      }
    })
    consolidatedData.push(returnableRow)
  })
  return consolidatedData
}
