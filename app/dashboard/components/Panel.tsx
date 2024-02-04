import React, {useState, useEffect, useContext} from 'react'
import { PanelContext } from '../context/PanelContext';
import styles from "./panel.module.css"
import RawDataRow from "../types/raw-data-from-mountain-project";
import Dropdown from "./form-inputs/Dropdown";
import DatePicker from './form-inputs/DatePicker';
import ProcessingParams from '../types/chart-processors';

interface Props {
    data: RawDataRow[],
    includeDropdowns?: boolean,
    includeDatePicker?: boolean,
    dimensions?: {width: number, height: number},
    chartProcessor: (data: ProcessingParams) => any,
    children: React.ReactNode,
}

const Panel = ({data, includeDropdowns = false, includeDatePicker = false, chartProcessor, children}: Props) => {
  const {chartData, setChartData} = useContext(PanelContext)
  const [typeOfClimbing, setTypeOfClimbing] = useState<string>("Sport");
  const [styleOfClimbing, setStyleOfClimbing] = useState<string>("Onsight")
  const [fromDate, setFromDate] = useState<string>("")
  const [toDate, setToDate] = useState<string>("")
  
  useEffect(() => {
    setChartData(() => chartProcessor({data, typeOfClimbing, styleOfClimbing, fromDate, toDate}))
  }, [data, setChartData, chartProcessor, typeOfClimbing, styleOfClimbing, fromDate, toDate])

  return (
    <div className={styles.container}>
      {includeDropdowns && (
        <div>
          <Dropdown options={["Sport", "Trad"]} onChange={setTypeOfClimbing} />
          <Dropdown options={["Onsight", "Fell/Hung", "Redpoint"]}  onChange={setStyleOfClimbing} />
        </div>
      )}
      {includeDatePicker && (
        <div>
          <DatePicker date={fromDate} setDate={setFromDate} />
          <DatePicker date={toDate} setDate={setToDate} />
        </div>
      )}
      {!chartData ? (
        <div>Loading</div>
      ) : (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}

export default Panel;