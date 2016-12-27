import React from 'react'
import styles from './day.scss'
import { getHoursFromTimestamp } from './../timeUtils'

const dayForecastWidth = 70

export default function({time, hours}) {
  //<img className={styles.icon} src={`http://openweathermap.org/img/w/${hour.icon}.png`} alt={hour.description} title={hour.description} /> //Default icon

  return (
    <div id="forecast-by-day" className={styles.wrapper}>
      <div className={styles.day} style={{width:`${hours.length*dayForecastWidth}px`}}>
        <i className="owf owf-200"></i>
        {hours.map(hour=>(
          <div className={styles.hour} key={hour.time} style={{width:`${dayForecastWidth}px`}}>
            <i className={[styles.owf,styles[`owf-${hour.icon}`],styles.icon].join(' ')}></i>
            <div className={styles.temperature}>{hour.temperature.toFixed(0)}°</div>
            <div className={styles.time}>{getHoursFromTimestamp(hour.time)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}