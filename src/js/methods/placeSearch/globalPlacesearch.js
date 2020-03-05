/* global placeSearch */
/* eslint no-undef: "error" */

import axios from 'axios'

export default function globalPlacesearch() {
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
