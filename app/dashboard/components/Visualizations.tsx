'use client'

import React from 'react'
import Card from './Card'
import Panel from './Panel'
import { RawDataList } from '../types/raw-data-from-mountain-project'
import CounterTables from './charts/CounterTables'
import styles from './visualizations.module.css'
import LineChart from './charts/LineChart'
import { maxGradeProcessor } from './charts/maxGradeProcessors'
import { maxOnsightProcessor } from './charts/maxOnsightProcessor'
import { PanelContextProvider } from '../context/PanelContext'

// We can define what this object will look like after we decide exactly what we want to pass in
interface Props {
  data: RawDataList
}

const Visualizations: React.FC<Props> = ({ data }: Props) => {
  let sportClimbs: RawDataList = []
  let boulders: RawDataList = []
  let tradClimbs: RawDataList = []
  let topRope: RawDataList = []
  let allRoped: RawDataList = []
  data
    ? data.forEach((row) => {
        switch (row['Route Type']) {
          case 'Sport':
            sportClimbs.push(row)
            allRoped.push(row)
            break
          case 'Boulder':
            boulders.push(row)
            break
          case 'Trad':
            tradClimbs.push(row)
            allRoped.push(row)
            break
        }
        if (row['Style'] === 'TR') {
          topRope.push(row)
          allRoped.push(row)
        }
      })
    : null
  // In this file, we take in some of the processed data, and pass it into a series of vis charts we can create independently and import in here
  return (
    <div>
      <CounterTables compartmentalizedData={{ sport: sportClimbs, boulders: boulders, trad: tradClimbs, TR: topRope, all: data }} />
      <div className={`${styles['line-charts']}`}>
        <Card>
          <PanelContextProvider>
            <Panel data={data} chartProcessor={maxOnsightProcessor}>
              <LineChart title='onsight' dimensions={{ width: 960, height: 800 }} axisLabels={{ x: 'Grade', y: 'Onsight Percentage' }} />
            </Panel>
          </PanelContextProvider>
        </Card>
        <Card>
          <PanelContextProvider>
            <Panel data={data} chartProcessor={maxGradeProcessor}>
              <LineChart title={'maxgrade'} dimensions={{ width: 960, height: 800 }} axisLabels={{ x: 'Grade', y: 'Date' }} />
            </Panel>
          </PanelContextProvider>
        </Card>
      </div>
    </div>
  )
}

export default Visualizations
