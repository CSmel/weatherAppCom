<template>
  <div id="app" class="modal-vue">
    <div class="grid-container fluid">
      <button v-if="!shown" class="large button" @click="switchView">
        {{ this.titleOfComponent }}
      </button>
      <button class="large button" v-if="shown" @click="switchView">
        <font-awesome-icon icon="arrow-left"/>
        {{ this.titleOfComponent }}
      </button>
      <!-- button show -->
      <button class="large button" @click="showModal = true">
        View Saved Locations
      </button>
      <!-- overlay -->
      <div class="overlay" v-if="showModal" @click="showModal = false"></div>
      <!-- modal -->
      <div class="modal" v-if="showModal">
        <button class="close" @click="showModal = false">
          <font-awesome-icon icon="times"></font-awesome-icon>
        </button>
        <ContainerPopular
            :currently="currently"
            :add-save-location="addSaveLocation"
            :delete-save-location="deleteSaveLocation"
            :saved-history-arr="savedHistoryArr"
            :new-saved-location-obj="newSavedLocationObj"
        />
      </div>

      <div class="grid-x grid-margin-x">
        <div class="cell medium-5 large-3">
          <h2>{{ cityDisplay }}</h2>
          <div class="grid-x grid-margin-x">
            <div class="cell">
              <ContainerSearch
                  :names="names"
                  :names-length="namesLength"
                  :c="c"
                  :b="b"
                  :check-duplicates="checkDuplicates"
                  :getLocalStorage="getLocalStorage"
                  :search="search"
                  :city-display="cityDisplay"
              />
            </div>
            <div class="cell"></div>
          </div>
        </div>
        <div class="cell medium-7 large-9 ">
          <div class="grid-y grid-margin-y">
            <div class="cell main-image-parent">
              <ContainerImage :images="images" v-if="!shown" />
              <ContainerCurrently
                :currently="currently"
                :cityDisplay="cityDisplay"
                :stateDisplay="stateDisplay"
                v-if="!shown"
              />
              <ContainerHourly :hourly="hourly" v-if="!shown" />
            </div>
            <ContainerDaily :daily="daily" v-if="!shown" />
            <ContainerGraphs
              :newHumidityNumber="newHumidityNumber"
              :newPrecipValue="newPrecipValue"
              :newIndexValue="newIndexValue"
              :indexValue="indexValue"
              v-if="!shown"
            />
            <ContainerAlerts :alerts="alerts" v-if="!shown" />
            <div class="cell main-image-parent">
              <ContainerHourlyDetail
                  :hourly="hourly"
                  :currently="currently"
                  :daily="daily"
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

import {
switchView,
fetchImages,
search,
globalPlacesearch,
addSaveLocation,
checkDuplicates,
deleteSaveLocation,
getLocalStorage,
addSearch,
createNewObject
} from './js/methods/exportFunctions.js'

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
    keys: {},
    showModal: false,
      mode: false,
      shown: false,
    titleOfComponent: "Today's detailed forecast",
    c: 0,
    b: 0,
      loading: '',
      newName: '',
    newSavedLocationObj: '',
      namesLength: 0,
      newHistoryObj: {},
    savedHistoryArr: [],

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

    searchArray: [],
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
      this.addSearch()
      })

    this.search()

  if (localStorage.getItem('searchArray')) {
  this.searchArray = JSON.parse(localStorage.getItem('searchArray'))
  }
  },

  updated: function () {
    this.$nextTick(function () {
    this.globalPlacesearch()
    })
  },

  watch: {
    cityDisplay: function () {
      this.search()
    this.addSearch()
    },
  searchArray: {
  handler() {
  localStorage.setItem('searchArray', JSON.stringify(this.searchArray))
  },
  deep: true
  }
  },
  methods: {
  addSearch,
  addSaveLocation,
  getLocalStorage,
  deleteSaveLocation,
  createNewObject,
  checkDuplicates,
  globalPlacesearch,
  search,
  fetchImages,
  switchView,
  // containerPopular

    newImageHistory () {
      this.namesLength = this.names.data.length
      this.names.data.push(this.newHistoryObj)

      return (this.newName = '')
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

.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .modal {
  position: absolute;
  width: 600px;
  top: 25%;
  left: 30%;
  z-index: 9999;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
