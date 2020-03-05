export function addSearch() {
// add search history

this.newObjCurrently = this.currently
this.newObDaily = this.daily
this.newObHourly = this.hourly
this.newObAlerts = this.alerts
this.newObHumidityNumber = this.newHumidityNumber
this.newObPrecipValue = this.newPrecipValue
this.newObIndexValue = this.newIndexValue

this.searchArray.push({
city: this.cityDisplay,
state: this.stateDisplay,
currently: this.newObjCurrently,
daily: this.newObDaily,
hourly: this.newObHourly,
alerts: this.newObAlerts,
humidity: this.newObHumidityNumber,
precip: this.newObPrecipValue,
index: this.newObIndexValue
})
}
