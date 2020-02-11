// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ProgressBar from 'vuejs-progress-bar'
import vueNumeralFilterInstaller from 'vue-numeral-filter'
import VueSkycons from 'vue-skycons'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faWind,
  faTemperatureHigh,
  faTint,
  faArrowCircleLeft,
  faArrowCircleRight
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const moment = require('moment')
require('moment/locale/en-au')
require('../node_modules/foundation-sites/dist/css/foundation.css')

library.add(
  faWind,
  faTemperatureHigh,
  faTint,
  faArrowCircleLeft,
  faArrowCircleRight
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' })
Vue.use(require('vue-moment'), { moment })

Vue.use(VueSkycons, { color: 'lightblue' }, ProgressBar)
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
