<template>
  <div
    class="grid-x customGrid  grid-padding-x small-up-1 medium-up-2 large-up-3"
  >
    <div class="cell alternate-color">
      <h4>Precipitation</h4>
      <progress-bar
        :options="options"
        v-bind:value="newPrecipValue"
      ></progress-bar>
    </div>
    <div class="cell alternate-color">
      <h4>Humidity</h4>
      <progress-bar
        ref="changeTheColor"
        :options="options"
        v-bind:value="newHumidityNumber"
      ></progress-bar>
    </div>
    <div class="cell alternate-color">
      <h4>UV Index</h4>
      <progress-bar
        :options="options"
        v-bind:value="newIndexValue"
      ></progress-bar>
    </div>
    <div>
      <!--<h2>Popular Location</h2>
      <div>
        <img v-for="pic in popularPictures.slice(0, 1)" :src="pic.url" v-bind:key="pic.url"/>
      </div> -->
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'ContainerGraphs',
  data () {
    return {
      popularPictures: [
        { url: require('../assets/sanfrancisco.jpg') },
        { url: require('../assets/miami.jpg') },
        { url: require('../assets/seattle.jpg') }
      ],
      options: {
        text: {
          color: '#fff',
          shadowEnable: true,
          shadowColor: '#000000',
          fontSize: 30,
          fontFamily: 'Helvetica',
          dynamicPosition: false,
          hideText: false
        },
        progress: {
          color: '#71F0FF',
          backgroundColor: '#444444'
        },
        layout: {
          height: 150,
          width: 150,
          verticalTextAlign: 90,
          horizontalTextAlign: 0,
          zeroOffset: 0,
          strokeWidth: 10,
          progressPadding: 90,
          type: 'circle'
        }
      }
    }
  },
  props: {
    newIndexValue: {
      type: Number
    },
    newHumidityNumber: {
      type: Number
    },
    newPrecipValue: {
      type: Number
    },
    indexValue: {
      type: Number
    }
  },
  mounted: function () {
    this.shufflePictures()
  },
  updated: function () {
    this.formatUvColor()
    this.formatNumber()
  },
  created: function () {},

  methods: {
    shufflePictures () {
      this.popularPictures = _.shuffle(this.popularPictures)
    },
    formatUvColor () {
      let bb = document.querySelectorAll(' circle')
      if (bb !== null) {
        if (this.newIndexValue <= 20) {
          bb[5].setAttribute('style', 'stroke:#289500')
        } else if (this.newIndexValue === 40) {
          bb[5].setAttribute('style', 'stroke:#F7E400')
        } else if (this.newIndexValue <= 50) {
          bb[5].setAttribute('style', 'stroke:#F85900')
        } else if (this.newIndexValue <= 70) {
          bb[5].setAttribute('style', 'stroke:blue')
        } else if (this.newIndexValue <= 100) {
          bb[5].setAttribute('style', 'stroke:#D80010')
        } else {
          bb[5].setAttribute('style', 'stroke:#6B49C8')
        }
      } else {
        alert('no bb')
      }
    },
    formatNumber () {
      let aa = document.querySelectorAll('.progress-bar  div')
      if (aa !== null) {
        for (let i = 0; i <= aa.length; i++) {
          aa[2].innerText = this.indexValue
        }
      } else {
        alert('not here')
      }
    }
  }
}
</script>
<style scoped></style>
