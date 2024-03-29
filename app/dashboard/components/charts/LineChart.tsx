'use client'

import React, { useEffect, useRef, useContext } from 'react'
import { PanelContext } from '../../context/PanelContext'
import * as d3 from 'd3'
import styles from './line-chart.module.css'
import { LineData } from '../../types/line-data'
import { dateOrPrimitive } from '@/app/utils/dateOrPrimitive'

interface Props {
  dimensions: { width: number; height: number }
  title: string,
  axisLabels: AxisLabels
}

interface AxisLabels {
  x: string,
  y: string
}

const LineChart: React.FC<Props> = ({ dimensions = { width: 500, height: 500 }, title = 'Line Chart', axisLabels }: Props) => {
  const { chartData } = useContext(PanelContext)
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (Object.keys(chartData).length < 1) return
    const margin = { top: 30, right: 90, bottom: 50, left: 60 }
    const width = dimensions.width - margin.left - margin.right // Virtual width for drawing purposes
    const height = dimensions.height - margin.top - margin.bottom // Virtual height for drawing purposes

    // Grabs reference to the svg canvas, and sets the viewBox, which, in conjunction with PreserveAspectRatio, makes the chart scaleable
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')

    // in case we have already drawn this chart, erase existing lines and data points
    d3.selectAll(`.${title} .${styles['circle']}`).remove()
    d3.select(`.${title} .${styles['chart-line']}`).remove()
    d3.select(`.${title} .${styles['y-axis']}`).remove()
    d3.select(`.${title} .${styles['x-axis']}`).remove()

    // Creates an inner box which will represent the actual drawn chart. We seperate this from the svg variable because it's necessary to do so to get axis margins to work with d3
    const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    // Need to add range to the axis function in this file rather than in processor function because
    // we didn't want to have to pass dimensions in to the parent component
    chartData.xAxis.range([0, width])

    // Places the x axis
    chart
      .append('g')
      .attr('class', `${styles['x-axis']}`)
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(chartData.xAxis))

    // Need to add range to the axis function in this file rather than in processor function because
    // we didn't want to have to pass dimensions in to the parent component
    chartData.yAxis.range([height, 0])

    // Places the y axis
    chart.append('g').attr('class', `${styles['y-axis']}`).call(d3.axisLeft(chartData.yAxis))

    // Draws the line for the chart
    chart
      .append('path')
      .datum(chartData.lineData)
      .attr('fill', 'none')
      .attr('class', `${styles['chart-line']}`)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line<LineData>()
          .x((lineDataItem) => {
            return chartData.xAxis(lineDataItem.x)
          })
          .y((lineDataItem) => {
            return chartData.yAxis(lineDataItem.y)
          })
      )

    const circle = chart.selectAll(`.${title} .${styles['circle']}`).data(chartData.lineData)

    circle
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('class', `${styles['circle']}`)
      .attr('cx', (d) => {
        const dataItem = d as LineData;
        return chartData.xAxis(dataItem.x)
      })
      .attr('cy', (d) => {
        const dataItem = d as LineData;
        return chartData.yAxis(dataItem.y)
      })
      .on('mouseenter', (event:MouseEvent, d) => {
        const dataItem = d as LineData;
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '1'
          tooltipRef.current.innerHTML = `${dateOrPrimitive(dataItem.y)} | ${dateOrPrimitive(dataItem.x)}`
          tooltipRef.current.style.left = `${event.offsetX}px`
          tooltipRef.current.style.top = `${event.offsetY + 10}px`
        }
      })
      .on('mouseleave', (event:MouseEvent, d) => {
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '0'
        }
      })
  }, [chartData, title, dimensions.height, dimensions.width])

  return (
    <div className={`${styles['container']} ${title}`}>
      <div className={styles[`chart-container-max-grade`]}>
        <div className={styles['y-axis-label']}>{axisLabels.y}</div>
        <div className={styles['x-axis-label']}>{axisLabels.x}</div>
        <svg ref={svgRef}></svg>
        <div ref={tooltipRef} id={styles['tooltip']}></div>
      </div>
    </div>
  )
}

export default LineChart
