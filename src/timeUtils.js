export function getDayOfTheWeek(timestamp) {
  const date = new Date(timestamp)
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return weekday[date.getDay()]
}

export function getHoursFromTimestamp(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleTimeString(navigator.language, {hour: '2-digit', hour12: true})    
}

export function isTodayTimestamp(time){
  const d = new Date()
  const td = new Date(time)
  return td.getDate() == d.getDate() && td.getMonth() == d.getMonth() && td.getFullYear() == d.getFullYear()
}

export function prettyDate(time = '') {
	const date = new Date(time)
	const now = new Date()
	const diff = ((date.getTime() - now.getTime()) / 1000)
	const day_diff = Math.floor(diff / 86400)
			
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 ) return
			
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes" ||
			diff < 7200 && "in 1 hour" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours") ||
		day_diff == 1 && "Tomorrow" ||
		day_diff < 7 && day_diff + " days" ||
		day_diff < 31 &&  Math.ceil( day_diff / 7 ) + " weeks"
}