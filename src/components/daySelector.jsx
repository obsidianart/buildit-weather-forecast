import React from 'react'
import styles from './daySelector.scss'
import { getDayOfTheWeek } from './../timeUtils'

export default function({forecast, changeDay, currentDay, getMoreForecast}) {
  console.log(forecast)
  return (
    <div className={styles.wrapper}>
      <ol id="day-selector" className={styles.days}>
        {forecast.map((day, idx)=>(
          <li 
            key={day.time} 
            className={currentDay==idx?styles.current:''}
            onClick={()=>changeDay(idx)}
          >
            {idx==0 && 'Today'}
            {idx==1 && 'Tomorrow'}
            {idx>1 && getDayOfTheWeek(day.time)}
          </li>
        ))}
        <li onClick={getMoreForecast}>
          More
        </li>
      </ol>
    </div>
  )
}