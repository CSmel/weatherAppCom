/* global placeSearch */
/* eslint no-undef: "error" */

import axios from 'axios'

export function switchView() {
this.shown = !this.shown
if (this.shown) {
this.titleOfComponent = 'Home'
} else if (!this.shown) {
this.titleOfComponent = "Today's detailed forecast"
}
}

export function createNewObject() {
// create a new object from imageHistory array - original
const self = this

self.newHistoryObj = self.imageHistory

self.newHistoryObj = Object.assign({}, self.newHistoryObj[0], {
longitude: self.longNum,
latitude: self.latNum,
city: self.cityDisplay,
state: self.stateDisplay,
icon: self.currently.icon,
temp: self.currently.temperature
})
}

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

export function deleteSaveLocation(index) {
this.savedHistoryArr.splice(index, 1)
}

export function checkDuplicates() {
this.index = this.searchArray.findIndex(x => x.city === 'Bradenton')
if (this.searchArray[this.index].city === this.names.data[this.index].city) {
this.searchArray.splice(0, 1)
this.names.data.splice(0, 1)
// alert('contains')
} else alert('nope')
}

export function addSaveLocation() {
if (this.newHistoryObj === '') {
alert('Empty Object')
} else if (!this.savedHistoryArr.length) {
this.savedHistoryArr.push(this.newHistoryObj)
// console.log(this.newHistoryObj.city)
this.newHistoryObj = ''
console.log('First push')
} else if (!this.savedHistoryArr[0].city.includes(this.newHistoryObj.city)) {
this.savedHistoryArr.push(this.newHistoryObj)
// console.log(this.newHistoryObj.city)
this.newHistoryObj = ''
} else if (this.savedHistoryArr[0].city.includes(this.newHistoryObj.city)) {
alert('DUPLICATE')
} else {
console.log('WHAT?')
}
}

export function globalPlacesearch() {
this.ps = placeSearch({
key: 'dlWrWcvQDTvdOpJqrIkkepoKexYGixQa',
container: document.querySelector('#search-input'),
useDeviceLocation: false,
collection: ['poi', 'address', 'adminArea']
})
this.ps.on('change', e => {
this.latNum = e.result.latlng.lat
this.longNum = e.result.latlng.lng

// this.longNumGlobal = e.result.latlng.lng;
axios
  .get(
    'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/051b6680f036e325eecb49001964cdae/' +
    this.latNum +
    ',' +
    this.longNum
  )
  .then(response => {
  this.currently = response.data.currently
  this.daily = response.data.daily
  this.hourly = response.data.hourly
  this.alerts = response.data.alerts
  this.newHumidityNumber = this.currently.humidity * 100
  this.newPrecipValue = this.currently.precipProbability * 100
  this.newIndexValue = this.currently.uvIndex * 10

  this.indexValue = this.currently.uvIndex
  this.cityDisplay = e.result.city
  this.stateDisplay = e.result.state
  })
})
}

// flickr
export function search() {
this.loading = true
this.fetchImages().then(response => {
this.images = response.data.photos.photo
this.imageHistory = response.data.photos.photo
this.loading = false
this.createNewObject()
this.newImageHistory()
})
}

export function newImageHistory() {
this.namesLength = this.names.data.length
this.names.data.push(this.newHistoryObj)

return (this.newName = '')
}

export function fetchImages() {
return axios({
method: 'get',
url: 'https://api.flickr.com/services/rest',
params: {
method: 'flickr.photos.search',
api_key: '9e2afe6c0b729db22a911ea0aa55daaf',
text: this.tagSearch,
extras: 'url_n, owner_name, date_taken, views',
page: 1,
format: 'json',
nojsoncallback: 1,
per_page: 1,
sort: 'interestingness-desc'
}
})
}
