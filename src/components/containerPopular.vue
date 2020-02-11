<template>
  <div>
    <div class="cell small2">
      <h5>Search For A Location</h5>
      <div class="container-popular">
        <div>
          <img v-for="pic in popularPictures.slice(0, 1)" :src="pic.url" v-bind:key="pic.url" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'containerPopular',
  data () {
    return {
      popularPictures: [
        { url: require('../assets/sanfrancisco.jpg') },
        { url: require('../assets/miami.jpg') },
        { url: require('../assets/seattle.jpg') }
      ]
    }
  },
  mounted: function () {
    this.shufflePictures()
  },
  methods: {
    shufflePictures () {
      this.popularPictures = _.shuffle(this.popularPictures)
    }
  }
}
</script>
<style scoped>
.container-popular {
  border: 2px solid red;
  height: 120px;
}
</style>
