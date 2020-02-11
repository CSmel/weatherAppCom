<template>
  <div id="app">
    <div class="grid-container fluid">
      <button class="large button" @click="switchView">Click Me</button>
      <div class="grid-x grid-margin-x">
        <div class="cell medium-4">
          <ContainerSearch
            :image-history="imageHistory"
            :names="names"
            :names-length="namesLength"
            :lat-num="latNum"
            :long-num="longNum"
            :wait-aminute="waitAminute"
            :create-new-object="createNewObject"
            :new-image-history="newImageHistory"
            :view-prev-history="viewPrevHistory"
            :newHistoryObj="newHistoryObj"
            :state-display="stateDisplay"
            :city-display="cityDisplay"
          />
          <ContainerPopular v-if="!shown" />
        </div>
        <div class="cell medium-6 large-8 ">
          <div class="grid-y grid-margin-y">
            <div class="cell main-image-parent">
              <ContainerImage :images="images" v-if="!shown" />
              <ContainerCurrently
                :currently="currently"
                :cityDisplay="cityDisplay"
                :stateDisplay="stateDisplay"
                :images="images"
                v-if="!shown"
              />
              <ContainerHourly :hourly="hourly" v-if="!shown" />
            </div>
            <ContainerDaily :daily="daily" v-if="!shown" />
            <ContainerGraphs
              :newHumidityNumber="newHumidityNumber"
              :currently="currently"
              :newPrecipValue="newPrecipValue"
              :newIndexValue="newIndexValue"
              :indexValue="indexValue"
              v-if="!shown"
            />
            <ContainerAlerts :alerts="alerts" v-if="!shown" />
            <div class="cell main-image-parent">
              <ContainerHourlyDetail
                :hourly="hourly"
                :cityDisplay="cityDisplay"
                :state-display="stateDisplay"
                :images="images"
                v-if="shown"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContainerSearch from './components/ContainerSearch'
import ContainerPopular from './components/ContainerPopular'

import ContainerImage from './components/ContainerImage'
import ContainerCurrently from './components/ContainerCurrently'
import ContainerAlerts from './components/ContainerAlerts'
import ContainerDaily from './components/ContainerDaily'
import ContainerGraphs from './components/ContainerGraphs'
import ContainerHourly from './components/ContainerHourly'
import ContainerHourlyDetail from './components/ContainerHourlyDetail'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    ContainerSearch,
    ContainerPopular,
    ContainerImage,
    ContainerCurrently,
    ContainerAlerts,
    ContainerDaily,
    ContainerGraphs,
    ContainerHourly,
    ContainerHourlyDetail
  },
  data () {
    return {
      mode: false,
      shown: false,
      loading: '',
      newName: '',
      namesLength: 0,
      newHistoryObj: {},
      names: {
        data: []
      },
      images: [],
      imageHistory: [],
      hourly: {
        data: []
      },
      daily: {
        data: []
      },
      currently: {
        data: []
      },
      alerts: {},
      longNum: -82.5748,
      latNum: 27.4799,

      cityDisplay: 'Bradenton',
      stateDisplay: 'Florida',
      newIndexValue: 0,
      newHumidityNumber: 0,
      newPrecipValue: 0,
      indexValue: 0
    }
  },
  mounted () {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/051b6680f036e325eecb49001964cdae/27.496,-82.594'
      )
      .then(response => {
        this.hourly = response.data.hourly
        this.currently = response.data.currently
        this.daily = response.data.daily
        this.alerts = response.data.alerts
        this.newHumidityNumber = this.currently.humidity * 100
        this.newPrecipValue = this.currently.precipProbability * 100
        this.newIndexValue = this.currently.uvIndex * 10
        this.indexValue = this.currently.uvIndex
      })
    this.search()
  },

  updated: function () {
    this.$nextTick(function () {
      this.waitAminute()
    })
  },

  watch: {
    cityDisplay: function () {
      this.search()
    }
  },
  methods: {
    switchView () {
      this.shown = !this.shown
    },

    // flickr
    search () {
      this.loading = true
      this.fetchImages().then(response => {
        this.images = response.data.photos.photo
        this.imageHistory = response.data.photos.photo
        this.loading = false
        this.createNewObject()
        this.newImageHistory()
      })
    },
    createNewObject () {
      // create a new object from imageHistory array - original
      const self = this

      self.newHistoryObj = self.imageHistory

      self.newHistoryObj = Object.assign({}, self.newHistoryObj[0], {
        longitude: self.longNum,
        latitude: self.latNum,
        city: self.cityDisplay,
        state: self.stateDisplay
      })
    },

    newImageHistory () {
      this.namesLength = this.names.data.length
      this.names.data.push(this.newHistoryObj)

      return (this.newName = '')
    },
    fetchImages () {
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
    },
    /* global placeSearch */
    /* eslint no-undef: "error" */
    waitAminute: function () {
      this.ps = placeSearch({
        key: 'dlWrWcvQDTvdOpJqrIkkepoKexYGixQa',
        container: document.querySelector('#search-input'),
        useDeviceLocation: false,
        collection: ['poi', 'address', 'adminArea']
      })
      this.ps.on('change', e => {
        this.latNum = e.result.latlng.lat
        this.longNum = e.result.latlng.lng
        this.city = e.result.city
        this.state = e.result.state
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
          })
        this.cityDisplay = e.result.city
        this.stateDisplay = e.result.state
      })
    },
    // History
    viewPrevHistory () {
      axios
        .get(
          'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/051b6680f036e325eecb49001964cdae/27.496,-82.594'
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
        })
    }
  },
  computed: {
    tagSearch () {
      return this.cityDisplay
    }
  }
}
</script>
<style>
.customGrid {
  margin-top: 10px;
}

#app {
  background-color: #444444;
  color: #fff;
  min-height: 100vh;
}

.grid-x {
}

.fakeInput {
  display: none;
}

.current-temp {
  min-height: 10vh;
  max-width: 40vw;
  background-color: transparent !important;
  text-align: left !important;
}

.no-center {
  text-align: left !important;
}

.cell {
  border-radius: 5px;
  padding: 10px;
  background-color: #545a5f;
  text-align: center;
}

.alternate-color:nth-child(odd) {
  background-color: #5c5c5c;
}

.main-image-parent {
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 500px;
}

.main {
  height: auto;
  width: 100%;
  position: absolute;
  left: 0;
  margin-left: 0;
  top: 0;
  margin-top: 0;
  min-height: 100%;
  margin-right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.3;
  z-index: -1;
}
.main-detail {
  height: 100vh;
  width: 100%;
  position: absolute;
  left: 0;
  margin-left: 0;
  top: 0;
  margin-top: 0;
  margin-right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.3;
  z-index: -1;
}

.progress-bar[data-v-8248d938] {
  width: auto;
}

img {
  display: inline !important;
}
</style>
