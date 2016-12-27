import { getDayOfTheWeek } from './../timeUtils'

const OPEN_WEATHER_API = '8e0c72bae0c35c716604410eb9f4a7f1'
const FORECAST_ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?q=London,UK&units=metric&APPID=${OPEN_WEATHER_API}`

/*
 * Return an array in the format [{...day1},{..day2}...]
 * This function isn't particularly performant but it is executed only when the api fetch the forecast
*/
const parseForecastApiResponse = forecast=> {
  let forecastObjByDay = forecast
    .list
    .map(byHour=>({
      time: byHour.dt * 1000, //timestamp comes in seconds format from api
      description: byHour.weather[0].main,
      temperature: byHour.main.temp,
      icon: byHour.weather[0].id,
      rain: byHour.rain,
      clouds: byHour.clouds
    }))
    .reduce((byDays, byHour)=>{
      let dayTimestamp = new Date(byHour.time).setHours(0, 0, 0, 0)

      if (!byDays[dayTimestamp]) {
        byDays[dayTimestamp] = {
          time: dayTimestamp,
          hours: [],
        }
      }

      byDays[dayTimestamp].hours.push(byHour)

      return byDays
    },{})

    return Object.keys(forecastObjByDay).map(key=>forecastObjByDay[key])
}

export function get() {
  return new Promise((resolve, reject)=>{
    fetch(FORECAST_ENDPOINT)
      .then(response => {
        if (response.ok) return response.json()
        throw('Response error')
      })
      .then(parseForecastApiResponse)
      .then(resolve)
      .catch(reject)
  })
}