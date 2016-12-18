import React from 'react'
import styles from './index.scss'
import Day from './components/day'
import DaySelector from './components/daySelector'
import AI from './components/AI'
import {get as getForecast} from './services/forecastService'
import background from './static/images/pixel_black.png'


export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      forecast:[],
      apiError:false,
      currentDay:0
    }
  }

  componentDidMount(){
    getForecast()
      .then(forecast=>{ this.setState({forecast}) })
      .catch(err=>{ this.setState({apiError:true}) })
  }

  changeCity(){
    alert("Woha woha woah, I had 4 hours to build this... aren't you in London anyway?")
  }

  getMoreForecast(){
    alert('The requirement was to use an endpoint for 5 days, why do you want more now? WHY? Are you becoming greedy?')
  }

  changeDay(dayIndex, evt){
    this.setState({currentDay:dayIndex})
  }

  render() {
    const { forecast } = this.state
    const isForecastReady = !!forecast[0]

    return (
      <div style={{backgroundImage:`url(./${background})`}} className={styles.background}>
        <div className={styles.phoneScreen}>
          {this.state.apiError && <h2>Error with Forecast api, please try reloading the page</h2>}
          <h1 className={styles.title} onClick={this.changeCity.bind(this)}>
            London
          </h1>

          <AI
            forecast={this.state.forecast}
            className={styles.flexboxFill}
          />

          <DaySelector
            forecast={this.state.forecast}
            currentDay={this.state.currentDay}
            changeDay={this.changeDay.bind(this)}
            getMoreForecast={this.getMoreForecast.bind(this)}
          />

          {isForecastReady &&
            <Day
              key={forecast[this.state.currentDay].time}
              time={forecast[this.state.currentDay].time}
              hours = {forecast[this.state.currentDay].hours}
            />
          }
        </div>
      </div>
    )
  }
}