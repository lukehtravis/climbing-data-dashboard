import RawDataRow from "./raw-data-from-mountain-project"

// range is passed in to the d3 scale function, which is used to draw the axes 
// since range is dynamic and based on the height of the chart, we need to pass the 
// height or width values in to the processing function, and they must equal either the
// height or width that is passed into the chart view box
export default interface ProcessingParams {
    data: RawDataRow[],
    typeOfClimbing?: string,
    styleOfClimbing?: string,
    fromDate?: string,
    toDate?: string
}



