export function getLocalStorage() {
this.cityDisplay = this.searchArray[0].city
this.stateDisplay = this.searchArray[0].state
this.currently = this.searchArray[0].currently
this.daily = this.searchArray[0].daily
this.hourly = this.searchArray[0].hourly
this.alerts = this.searchArray[0].alerts
this.newHumidityNumber = this.searchArray[0].humidity
this.newPrecipValue = this.searchArray[0].precip
this.newIndexValue = this.searchArray[0].index

// console.log(this.imageHistory)
this.checkDuplicates()
}
